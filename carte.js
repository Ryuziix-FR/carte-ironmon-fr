// Carte IronMON FR : carte interactive des jeux Pokémon DS pour les runs IronMON (dresseurs, objets, passages),
// avec recherche, coches gardées, notes, progression et lien avec le tracker du stream.
"use strict";

const NATIF = 6; // niveau de zoom où 1 pixel de l'image = 1 pixel à l'écran
const ECHELLE = 2 ** NATIF;
const VIDE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const params = new URLSearchParams(location.search);
const OBS = params.has("obs");
const $ = (id) => document.getElementById(id);

// Pixel de l'image -> coordonnées de la carte (et inversement)
const ll = (x, y) => L.latLng(-y / ECHELLE, x / ECHELLE);
const px = (latlng) => ({ x: Math.round(latlng.lng * ECHELLE), y: Math.round(-latlng.lat * ECHELLE) });
const boite = (x, y, w, h) => L.latLngBounds(ll(x, y), ll(x + w, y + h));

// Clé de comparaison des lieux (même règle que outils/fabriquer_hgss.py) et des recherches
function cle(s) {
  s = String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/'/g, "");
  s = s.replace(/\brt\b/g, "route").replace(/\b(city|town|island)\b/g, "");
  return s.replace(/[^a-z0-9]/g, "");
}
const sansAccent = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['’\-]/g, " ");
const echap = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// Lieux que le tracker nomme autrement que la carte
const ALIAS = { lab: "newbark", elmslab: "newbark", playershouse: "newbark", newbarktown: "newbark",
  ssaqua: "ssaqua", willsroom: "indigoplateau", kogasroom: "indigoplateau", brunosroom: "indigoplateau",
  karensroom: "indigoplateau", lancesroom: "indigoplateau", championsroom: "indigoplateau", pokemonleague: "indigoplateau" };

// ---------- Mémoire (coches, étoiles, notes, réglages), un enregistrement par jeu ----------
const memoire = {
  cle: (jeu) => "carte-ironmon-" + jeu,
  lire(jeu) {
    try {
      return Object.assign({ fait: {}, etoile: {}, notes: [], vues: {} }, JSON.parse(localStorage.getItem(this.cle(jeu)) || "{}"));
    } catch (e) {
      return { fait: {}, etoile: {}, notes: [], vues: {} };
    }
  },
  ecrire(jeu, etat) {
    try { localStorage.setItem(this.cle(jeu), JSON.stringify(etat)); } catch (e) { /* navigation privée : tant pis */ }
  },
};
const reglagesParDefaut = { dresseurs: true, objets: true, ct: true, caches: true, faits: true, passages: false,
  liens: "jamais", itineraires: false, notes: true, suivre: true, autoReset: false };
let reglages;
try { reglages = Object.assign({}, reglagesParDefaut, JSON.parse(localStorage.getItem("carte-ironmon-reglages") || "{}")); }
catch (e) { reglages = Object.assign({}, reglagesParDefaut); }
const sauverReglages = () => { try { localStorage.setItem("carte-ironmon-reglages", JSON.stringify(reglages)); } catch (e) {} };

// ---------- La carte ----------
const map = L.map("carte", {
  crs: L.CRS.Simple, minZoom: 1, maxZoom: 8, zoomSnap: 0.5, zoomDelta: 0.5, wheelPxPerZoomLevel: 90,
  attributionControl: false, zoomControl: false, renderer: L.svg({ padding: 0.6 }),
  dragging: !OBS, scrollWheelZoom: !OBS, doubleClickZoom: !OBS, touchZoom: !OBS, keyboard: !OBS,
});
if (OBS) document.body.classList.add("obs");
else L.control.zoom({ position: "bottomright", zoomInTitle: "Zoomer", zoomOutTitle: "Dézoomer" }).addTo(map);

// Le niveau de zoom, pour que le style montre ou cache icônes et panneaux
const majZoom = () => { $("carte").dataset.zoom = Math.floor(map.getZoom()); };
map.on("zoomend", majZoom);

let jeuId = params.get("jeu");
try { jeuId = jeuId || localStorage.getItem("carte-ironmon-jeu"); } catch (e) { /* stockage bloqué */ }
jeuId = jeuId || "hgss";
if (!JEUX[jeuId]) jeuId = Object.keys(JEUX)[0];
let jeu, regionId, region, etat;
let fondCarte, couches = {}, entites = [], lieuxIndex = {}, ici = null, lieuActuel = null;

function cleEntite(type, i) { return `${regionId}-${type}-${i}`; }

// ---------- Lien de progression : un bit par dresseur et par objet du jeu (fait ou non) ----------
function bitsDuJeu(j) {
  const cles = [];
  for (const [rid, r] of Object.entries(j.regions)) {
    r.dresseurs.forEach((_, i) => cles.push(`${rid}-d-${i}`));
    r.objets.forEach((_, i) => cles.push(`${rid}-o-${i}`));
  }
  return cles;
}
function coderProgression(j, fait) {
  const cles = bitsDuJeu(j), octets = new Uint8Array(Math.ceil(cles.length / 8));
  cles.forEach((k, i) => { if (fait[k]) octets[i >> 3] |= 1 << (i & 7); });
  return btoa(String.fromCharCode(...octets)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decoderProgression(j, code) {
  const brut = atob(code.replace(/-/g, "+").replace(/_/g, "/")), fait = {};
  bitsDuJeu(j).forEach((k, i) => { if ((brut.charCodeAt(i >> 3) || 0) & (1 << (i & 7))) fait[k] = 1; });
  return fait;
}
// Ouvert avec ?jeu=…&prog=… : on montre la progression de quelqu'un d'autre, sans toucher à la sienne
const PROG = params.get("prog");
let LECTURE = !!PROG && !OBS;

function changerJeu(id) {
  jeuId = id;
  jeu = JEUX[id];
  // Changer de jeu pendant une progression partagée : on revient à la sienne
  if (LECTURE && id !== params.get("jeu")) quitterLecture();
  etat = memoire.lire(id);
  if (LECTURE) {
    try { etat = { fait: decoderProgression(JEUX[id], PROG), etoile: {}, notes: [], vues: {} }; }
    catch (e) { quitterLecture(); }
  }
  try { localStorage.setItem("carte-ironmon-jeu", id); } catch (e) {}
  $("choix-jeu").value = id;
  document.body.dataset.jeu = id;
  $("btn-jeu").querySelector(".nom-long").textContent = jeu.nom;
  $("btn-jeu").querySelector(".nom-court").textContent = jeu.court || jeu.nom;
  $("credit").textContent = jeu.credit || "";
  // Index des lieux de toutes les régions (noms anglais du tracker et noms français)
  lieuxIndex = {};
  for (const [rid, r] of Object.entries(jeu.regions)) {
    for (const [k, l] of Object.entries(r.lieux)) {
      const v = Object.assign({ region: rid }, l);
      lieuxIndex[k] = lieuxIndex[k] || v;
      lieuxIndex[cle(l.nom)] = lieuxIndex[cle(l.nom)] || v;
    }
  }
  const boutons = $("regions");
  boutons.innerHTML = "";
  for (const [rid, r] of Object.entries(jeu.regions)) {
    const b = document.createElement("button");
    b.textContent = r.nom.toUpperCase();
    b.dataset.region = rid;
    b.onclick = () => changerRegion(rid);
    boutons.appendChild(b);
  }
  changerRegion(params.get("region") && jeu.regions[params.get("region")] ? params.get("region")
    : etat.derniereRegion && jeu.regions[etat.derniereRegion] ? etat.derniereRegion : Object.keys(jeu.regions)[0]);
}

function changerRegion(rid, vue) {
  if (region && map.getZoom() !== undefined) etat.vues[regionId] = { c: map.getCenter(), z: map.getZoom() };
  regionId = rid;
  region = jeu.regions[rid];
  etat.derniereRegion = rid;
  enregistrer();
  for (const b of $("regions").children) b.classList.toggle("actif", b.dataset.region === rid);
  if (fondCarte) map.removeLayer(fondCarte);
  const limites = L.latLngBounds(ll(0, 0), ll(region.largeur, region.hauteur));
  // La version artefact (outils/demo.js) remplace les tuiles par quelques grandes images
  fondCarte = (window.FOND_CARTE ? window.FOND_CARTE(region) : L.tileLayer(region.tuiles + "/{z}/{x}_{y}.webp", {
    minZoom: 1, maxZoom: 8, minNativeZoom: 1, maxNativeZoom: NATIF, tileSize: 256, noWrap: true,
    bounds: limites, errorTileUrl: VIDE, keepBuffer: 3,
  })).addTo(map);
  map.setMaxBounds(limites.pad(0.25));
  const v = vue || etat.vues[rid];
  if (v) map.setView(v.c, v.z, { animate: false });
  else map.setView(ll(region.depart[0], region.depart[1]), 4, { animate: false });
  // Petit fondu des tuiles à chaque changement de région
  $("carte").classList.remove("fondu");
  void $("carte").offsetWidth;
  $("carte").classList.add("fondu");
  construire();
  if (ici && lieuActuel) placerIci(lieuActuel);
}

// ---------- Dresseurs, objets, passages, itinéraires, notes ----------
function bulleDresseur(d, k) {
  const fait = etat.fait[k] ? '<div class="ok">✔ Battu</div>' : "";
  const mouv = d.marche ? "🚶 Se déplace" : d.tourne ? "🔄 Se retourne" : "";
  return `<b>${echap(d.nom)}</b>${d.lieu ? `<div class="l">${echap(d.lieu)}</div>` : ""}`
    + `<div>${d.nb} Pokémon — niv. <span class="niv">${d.niv.join(", ")}</span></div>`
    + (mouv ? `<div class="l">${mouv}</div>` : "") + fait;
}
const NOMS_OBJETS = { objet: "Objet", ct: "CT", cache: "Objet caché" };
function bulleObjet(o, k) {
  return `<b>${NOMS_OBJETS[o.type]}</b>${o.lieu ? `<div class="l">${echap(o.lieu)}</div>` : ""}`
    + (etat.fait[k] ? '<div class="ok">✔ Ramassé</div>' : "");
}

function styleEntite(e) {
  const fait = !!etat.fait[e.cle];
  if (e.genre === "dresseur") {
    const coul = e.d.chef ? "#f4c542" : e.d.rival ? "#ff4d6d" : "#ff9f1c";
    return { color: fait ? "#47c46b" : coul, weight: e.d.chef ? 3 : 2, opacity: fait ? 0.9 : 1,
      fillColor: fait ? "#47c46b" : coul, fillOpacity: fait ? 0.35 : 0.12 };
  }
  const coul = { objet: "#3fa9f5", ct: "#b06cff", cache: "#ffe14d" }[e.o.type];
  return { color: fait ? "#47c46b" : coul, weight: 2, dashArray: e.o.type === "cache" && !fait ? "3 2" : null,
    fillColor: fait ? "#47c46b" : coul, fillOpacity: fait ? 0.35 : 0.15 };
}
function visible(e) {
  if (etat.fait[e.cle] && !reglages.faits) return false;
  if (e.genre === "dresseur") return reglages.dresseurs;
  return { objet: reglages.objets, ct: reglages.ct, cache: reglages.caches }[e.o.type];
}

// Petite icône posée au coin de chaque repère (visible de près)
function badge(e) {
  if (e.genre === "dresseur") {
    if (e.d.chef) return "<i>👑</i>";
    if (e.d.rival) return "<i>⚔️</i>";
    return '<img src="images/icones/dresseur.png" alt="">';
  }
  return `<img src="images/icones/${{ objet: "PokeballItem", ct: "TMItem", cache: "HiddenItem" }[e.o.type]}.png" alt="">`;
}

function decor(e, anime) {
  // L'icône, la coche et l'étoile posées sur l'élément
  for (const m of e.decor || []) couches.decor.removeLayer(m);
  e.decor = [];
  if (!visible(e)) return;
  const b = e.rect.getBounds();
  const pop = anime ? " pop" : "";
  if (!jeu.sansSprites) {
    e.decor.push(L.marker(b.getNorthWest(), { interactive: false, keyboard: false,
      icon: L.divIcon({ className: "badge" + (etat.fait[e.cle] ? " fait" : ""), html: badge(e), iconSize: [14, 14], iconAnchor: [9, 9] }) }));
  }
  // Cartes rendues sans personnages ni Poké Balls (Platine) : une icône dans chaque cadre
  if (jeu.sansSprites) {
    const img = e.genre === "dresseur" ? "dresseur" : { objet: "PokeballItem", ct: "TMItem", cache: "HiddenItem" }[e.o.type];
    e.decor.push(L.imageOverlay(`images/icones/${img}.png`, b, { className: "icone-carte", interactive: false,
      opacity: etat.fait[e.cle] ? 0.45 : 1 }));
  }
  if (etat.fait[e.cle]) {
    e.decor.push(L.marker(b.getCenter(), { interactive: false, keyboard: false,
      icon: L.divIcon({ className: "", html: `<div class="coche-icone${pop}">✔</div>`, iconSize: [16, 16], iconAnchor: [6, 9] }) }));
  }
  if (etat.etoile[e.cle]) {
    e.decor.push(L.marker(b.getNorthEast(), { interactive: false, keyboard: false,
      icon: L.divIcon({ className: "", html: `<div class="etoile-icone${pop}">⭐</div>`, iconSize: [16, 16], iconAnchor: [4, 12] }) }));
  }
  for (const m of e.decor) couches.decor.addLayer(m);
}

function construire() {
  for (const c of Object.values(couches)) map.removeLayer(c);
  couches = { entites: L.layerGroup(), decor: L.layerGroup(), passages: L.layerGroup(), liens: L.layerGroup(),
    itineraires: L.layerGroup(), notes: L.layerGroup(), marque: L.layerGroup(), etiquettes: L.layerGroup() };
  entites = [];
  const [dw, dh] = jeu.tailles.dresseur, [ow, oh] = jeu.tailles.objet;

  region.dresseurs.forEach((d, i) => entites.push({ genre: "dresseur", d, cle: cleEntite("d", i), rect: L.rectangle(boite(d.x, d.y, dw, dh)) }));
  region.objets.forEach((o, i) => entites.push({ genre: "objet", o, cle: cleEntite("o", i), rect: L.rectangle(boite(o.x, o.y, ow, oh)) }));
  for (const e of entites) {
    e.rect.setStyle(styleEntite(e));
    e.rect.bindTooltip(() => (e.genre === "dresseur" ? bulleDresseur(e.d, e.cle) : bulleObjet(e.o, e.cle)),
      { className: "bulle", direction: "top", offset: [0, -6] });
    e.rect.on("click", () => basculer(e, "fait"));
    e.rect.on("contextmenu", (ev) => { L.DomEvent.preventDefault(ev.originalEvent || ev); basculer(e, "etoile"); });
  }

  // Passages : un carré de couleur à chaque bout ; clic = aller à l'autre bout
  const t = jeu.tailles.passage;
  for (const g of region.passages) {
    g.liens.forEach((p, n) => {
      const a = L.rectangle(boite(p[0], p[1], t, t), { color: g.couleur, weight: 3, fillColor: g.couleur, fillOpacity: 0.35 });
      const b = L.rectangle(boite(p[2], p[3], t, t), { color: g.couleur, weight: 3, fillColor: g.couleur, fillOpacity: 0.35 });
      const ligne = L.polyline([ll(p[0] + t / 2, p[1] + t / 2), ll(p[2] + t / 2, p[3] + t / 2)],
        { color: g.couleur, weight: 3, dashArray: "8 6", interactive: false });
      for (const [r, autre] of [[a, b], [b, a]]) {
        r.bindTooltip(String(n + 1), { permanent: true, direction: "center", className: "etiquette-passage" });
        r.on("click", () => { map.panTo(autre.getBounds().getCenter()); eclair(autre); });
        r.on("mouseover", () => { if (reglages.liens === "survol") couches.liens.addLayer(ligne); });
        r.on("mouseout", () => { if (reglages.liens === "survol") couches.liens.removeLayer(ligne); });
        couches.passages.addLayer(r);
      }
      if (reglages.liens === "toujours") couches.liens.addLayer(ligne);
    });
  }

  // Portes (Platine) : chaque bout connaît sa destination, parfois dans l'autre région (extérieur <-> intérieurs)
  for (const p of region.portes || []) {
    const r = L.rectangle(boite(p.x, p.y, t, t), { color: p.couleur, weight: 3, fillColor: p.couleur, fillOpacity: 0.35 });
    const [rid, vx, vy] = p.vers;
    r.bindTooltip("→ " + p.nom, { className: "bulle", direction: "top" });
    r.on("click", () => {
      if (rid !== regionId) changerRegion(rid, { c: ll(vx, vy), z: Math.max(map.getZoom(), 5) });
      else map.panTo(ll(vx, vy));
      montrer(vx, vy);
    });
    if (rid === regionId) {
      const ligne = L.polyline([ll(p.x + t / 2, p.y + t / 2), ll(vx, vy)], { color: p.couleur, weight: 3, dashArray: "8 6", interactive: false });
      r.on("mouseover", () => { if (reglages.liens === "survol") couches.liens.addLayer(ligne); });
      r.on("mouseout", () => { if (reglages.liens === "survol") couches.liens.removeLayer(ligne); });
      if (reglages.liens === "toujours") couches.liens.addLayer(ligne);
    }
    couches.passages.addLayer(r);
  }

  // Noms des lieux posés sur la carte (les intérieurs)
  panneaux = [];
  const poserPanneau = (x, y, nom, classe) => {
    const m = L.marker(ll(x, y), { keyboard: false,
      icon: L.divIcon({ className: classe, html: `<span>${echap(nom)}</span>`, iconSize: null, iconAnchor: [0, 0] }) });
    m.bindTooltip(() => bulleLieu(nom), { className: "bulle", direction: "top", offset: [0, -10] });
    m.on("click", () => m.toggleTooltip());
    m.on("add", () => marquerFini(m, nom));
    panneaux.push({ m, nom });
    couches.etiquettes.addLayer(m);
  };
  for (const e of region.etiquettes || []) poserPanneau(e.x, e.y, e.texte, "etiquette-lieu");
  // Sur l'extérieur, un panneau par ville et par route (pas les étages ni les intérieurs)
  if (!(region.etiquettes || []).length) {
    const vus = new Set();
    for (const l of Object.values(region.lieux)) {
      if (vus.has(l.nom) || l.nom.includes("—")) continue;
      vus.add(l.nom);
      // Les villes se voient de loin ; routes, arènes, grottes… seulement de plus près
      const route = /^Route\b/.test(l.nom);
      const detail = route || /^(Arène|Sous-sol|Accès|Tour|Phare|Centre|Repaire|Ruines|Puits|Caves?|Grotte|Mont|Bois|Parc|Chemin|Lac|Labo|Maison|Zone|Pont|Château|Cave|Usine|Musée|Cascade|Forêt|Gouffre|Désert|Égouts|Bâtiment|Manoir|Mine)\b/i.test(l.nom)
        || /Pokéathlon|Safari|Sauvage|Ligue/i.test(l.nom);
      poserPanneau(l.x, l.y, l.nom, "panneau-lieu" + (route ? " route" : "") + (detail ? " detail" : ""));
    }
  }

  for (const [img, x, y, w, h] of region.itineraires || []) {
    couches.itineraires.addLayer(L.imageOverlay(img, boite(x, y, w, h), { className: "itineraire", interactive: false }));
  }

  dessinerNotes();
  for (const c of ["itineraires", "etiquettes", "entites", "decor", "liens", "passages", "notes", "marque"]) couches[c].addTo(map);
  appliquerFiltres();
  if (OBS && !params.has("reperes")) { map.removeLayer(couches.entites); map.removeLayer(couches.decor); }
  majPanneau();
}

function appliquerFiltres() {
  for (const e of entites) {
    const v = visible(e);
    if (v && !couches.entites.hasLayer(e.rect)) couches.entites.addLayer(e.rect);
    if (!v && couches.entites.hasLayer(e.rect)) couches.entites.removeLayer(e.rect);
    decor(e);
  }
  // Dans OBS, seulement la carte et « tu es ici », sauf si l'adresse contient &reperes=1
  const obsNu = OBS && !params.has("reperes");
  for (const [nom, couche] of [["passages", "passages"], ["passages", "liens"], ["itineraires", "itineraires"], ["notes", "notes"]]) {
    if (!couches[couche]) continue;
    const voir = reglages[nom] && !obsNu;
    if (voir && !map.hasLayer(couches[couche])) couches[couche].addTo(map);
    if (!voir && map.hasLayer(couches[couche])) map.removeLayer(couches[couche]);
  }
}

// ---------- Compteur par lieu : ce qu'il reste à faire sous chaque panneau ----------
let panneaux = [];
// « Route 3 » compte « Route 3 » et « Route 3 — … », jamais « Route 30 »
const dansLieu = (lieu, nom) => lieu === nom || (lieu || "").startsWith(nom + " —");
function compteLieu(nom) {
  const c = { d: 0, df: 0, o: 0, of: 0 };
  for (const e of entites) {
    const x = e.genre === "dresseur" ? e.d : e.o;
    if (!dansLieu(x.lieu, nom)) continue;
    const fait = etat.fait[e.cle] ? 1 : 0;
    if (e.genre === "dresseur") { c.d++; c.df += fait; } else { c.o++; c.of += fait; }
  }
  return c;
}
function bulleLieu(nom) {
  const c = compteLieu(nom);
  if (!c.d && !c.o) return `<b>${echap(nom)}</b><div class="l">Aucun dresseur ni objet ici.</div>`;
  const ligne = (titre, fait, total) => total
    ? `<span>${titre}</span><span class="${fait === total ? "vide" : "reste"}">${fait === total ? "✔ tout fait" : `${total - fait} restant${total - fait > 1 ? "s" : ""} sur ${total}`}</span>` : "";
  return `<b>${echap(nom)}</b><div class="compte">${ligne("Dresseurs", c.df, c.d)}${ligne("Objets", c.of, c.o)}</div>`;
}
function marquerFini(m, nom) {
  const el = m.getElement();
  if (!el) return;
  const c = compteLieu(nom);
  el.classList.toggle("fini", c.d + c.o > 0 && c.df + c.of === c.d + c.o);
}
const majPanneauxLieux = () => { for (const p of panneaux) marquerFini(p.m, p.nom); };

function basculer(e, quoi) {
  if (LECTURE) return; // progression partagée : on regarde sans toucher
  if (etat[quoi][e.cle]) delete etat[quoi][e.cle];
  else etat[quoi][e.cle] = 1;
  enregistrer();
  e.rect.setStyle(styleEntite(e));
  if (e.rect.isTooltipOpen()) e.rect.setTooltipContent(e.genre === "dresseur" ? bulleDresseur(e.d, e.cle) : bulleObjet(e.o, e.cle));
  if (!visible(e)) couches.entites.removeLayer(e.rect);
  decor(e, true);
  majPanneau();
  majPanneauxLieux();
}

function eclair(couche) {
  const el = couche.getElement && couche.getElement();
  if (!el) return;
  el.classList.remove("eclair");
  void el.getBoundingClientRect();
  el.classList.add("eclair");
}

function enregistrer() { if (!LECTURE) memoire.ecrire(jeuId, etat); }

// ---------- Notes ----------
function dessinerNotes() {
  couches.notes.clearLayers();
  etat.notes.forEach((n, i) => {
    if (n.r !== regionId) return;
    const m = L.marker(ll(n.x, n.y), { draggable: !OBS, title: n.t,
      icon: L.divIcon({ className: "", html: '<div class="note-icone">📌</div>', iconSize: [22, 22], iconAnchor: [6, 22] }) });
    const contenu = document.createElement("div");
    contenu.innerHTML = `<div style="max-width:220px;white-space:pre-wrap">${echap(n.t)}</div>`;
    const modif = document.createElement("button");
    modif.textContent = "Modifier";
    modif.onclick = () => { const t = prompt("Ta note :", n.t); if (t) { n.t = t; enregistrer(); dessinerNotes(); majPanneau(); } };
    const suppr = document.createElement("button");
    suppr.textContent = "Supprimer";
    suppr.onclick = () => { etat.notes.splice(i, 1); enregistrer(); dessinerNotes(); majPanneau(); };
    contenu.append(modif, " ", suppr);
    m.bindPopup(contenu);
    m.on("dragend", () => { Object.assign(n, px(m.getLatLng())); enregistrer(); });
    couches.notes.addLayer(m);
  });
}
let attenteNote = false;
$("ajouter-note").onclick = () => {
  attenteNote = true;
  $("mode-note").hidden = false;
  if (innerWidth <= 640) $("panneau").classList.add("ferme");
};
$("annuler-note").onclick = () => { attenteNote = false; $("mode-note").hidden = true; };
map.on("click", (ev) => {
  if (!attenteNote) return;
  attenteNote = false;
  $("mode-note").hidden = true;
  const t = prompt("Ta note (ex. « Rival ici », « attention Racaillou ») :");
  if (!t) return;
  etat.notes.push(Object.assign({ r: regionId, t }, px(ev.latlng)));
  reglages.notes = true;
  $("voir-notes").checked = true;
  sauverReglages();
  enregistrer();
  dessinerNotes();
  appliquerFiltres();
  majPanneau();
});

// ---------- Panneau : progression, chefs, notes ----------
function majPanneau() {
  const ds = entites.filter((e) => e.genre === "dresseur"), os = entites.filter((e) => e.genre === "objet");
  const n = (l) => l.filter((e) => etat.fait[e.cle]).length;
  const ligne = (titre, a, b) => `<div class="prog-ligne"><span>${titre}</span><span>${a} / ${b}</span></div>`
    + `<div class="barre-prog"><div style="width:${b ? (100 * a) / b : 0}%"></div></div>`;
  const pct = ds.length + os.length ? Math.round((100 * (n(ds) + n(os))) / (ds.length + os.length)) : 0;
  $("progression").innerHTML = `<h3>Progression — ${echap(region.nom)}</h3>`
    + `<div class="prog-tete"><div class="ball${pct === 100 ? " pleine" : ""}" style="--p:${pct}%"></div>`
    + `<div><div class="pct">${pct} %</div><small>de la région faite</small></div></div>`
    + ligne("Dresseurs battus", n(ds), ds.length) + ligne("Objets ramassés", n(os), os.length);

  const chefs = $("liste-chefs");
  chefs.innerHTML = "";
  // Dans l'ordre du jeu : du niveau max le plus bas au plus haut ; le premier chef pas encore battu est le prochain
  const max = (e) => Math.max(...e.d.niv);
  const liste = ds.filter((e) => e.d.chef || e.d.rival).sort((a, b) => max(a) - max(b));
  const prochain = liste.find((e) => e.d.chef && !etat.fait[e.cle]);
  if (!liste.length) chefs.innerHTML = '<li class="aide">Aucun dans cette région.</li>';
  let rang = 0;
  for (const e of liste) {
    const li = document.createElement("li");
    const fait = !!etat.fait[e.cle];
    if (e.d.chef) rang++;
    li.classList.toggle("fait-chef", fait);
    li.classList.toggle("prochain", e === prochain);
    li.innerHTML = `<span class="rang">${fait ? "✔" : e.d.chef ? rang : "⚔"}</span><span>${echap(e.d.nom)}`
      + (e === prochain ? '<span class="etiquette-prochain">Prochain</span>' : "")
      + (e.d.rival ? '<span class="rival-tag">Rival</span>' : "")
      + `<br><small class="aide">${echap(e.d.lieu || "")}</small></span><span class="niv">${max(e)}</span>`;
    li.onclick = () => allerA(e.rect.getBounds().getCenter(), 6, e.rect);
    chefs.appendChild(li);
  }

  const notes = $("liste-notes");
  notes.innerHTML = "";
  etat.notes.forEach((nt, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>📌</span><span>${echap(nt.t)}<br><small class="aide">${echap(jeu.regions[nt.r]?.nom || "")}</small></span>`;
    const x = document.createElement("button");
    x.className = "suppr";
    x.textContent = "✕";
    x.title = "Supprimer";
    x.onclick = (ev) => { ev.stopPropagation(); etat.notes.splice(i, 1); enregistrer(); dessinerNotes(); majPanneau(); };
    li.appendChild(x);
    li.onclick = () => { if (nt.r !== regionId) changerRegion(nt.r); allerA(ll(nt.x, nt.y), 6); };
    notes.appendChild(li);
  });
  if (!etat.notes.length) notes.innerHTML = '<li class="aide">Aucune note pour l\'instant.</li>';
}

function allerA(latlng, zoom, aEclairer) {
  map.flyTo(latlng, Math.max(map.getZoom(), zoom || 5), { duration: 0.6 });
  if (aEclairer) map.once("moveend", () => eclair(aEclairer));
}

// ---------- Recherche ----------
function indexRecherche() {
  const res = [];
  for (const [rid, r] of Object.entries(jeu.regions)) {
    for (const l of Object.values(r.lieux)) {
      res.push({ type: "Lieu", texte: l.nom, sous: r.nom, rid, x: l.x, y: l.y, zoom: 5, mots: sansAccent(l.nom + " " + l.en + " lieu") });
    }
    r.dresseurs.forEach((d, i) => {
      const type = d.chef ? "Chef" : d.rival ? "Rival" : "Dresseur";
      res.push({ type, texte: d.nom, sous: (d.lieu || r.nom) + " · niv. " + Math.max(...d.niv), rid, cle: `${rid}-d-${i}`,
        x: d.x + 9, y: d.y + 12, zoom: 6, mots: sansAccent(`${d.nom} ${d.en} ${d.lieu || ""} ${type} ${d.chef ? "arene champion chef" : ""}`) });
    });
    r.objets.forEach((o, i) => {
      res.push({ type: NOMS_OBJETS[o.type], texte: NOMS_OBJETS[o.type], sous: o.lieu || r.nom, rid, cle: `${rid}-o-${i}`,
        x: o.x + 6, y: o.y + 6, zoom: 6, mots: sansAccent(`${NOMS_OBJETS[o.type]} ${o.type} objet ${o.lieu || ""}`) });
    });
  }
  return res;
}
let index = [], choisi = -1, trouves = [];
function chercher() {
  const q = sansAccent($("recherche").value).trim();
  const ul = $("resultats");
  if (!q) { ul.hidden = true; return; }
  if (!index.length) index = indexRecherche();
  const mots = q.split(/\s+/);
  // Chaque mot tapé doit commencer un mot de l'élément (« ct » ne trouve pas « Victoire »)
  trouves = index.filter((e) => mots.every((m) => (" " + e.mots).includes(" " + m)))
    .sort((a, b) => (a.type === "Lieu" ? 0 : 1) - (b.type === "Lieu" ? 0 : 1) || (a.rid === regionId ? 0 : 1) - (b.rid === regionId ? 0 : 1))
    .slice(0, 40);
  ul.innerHTML = trouves.length ? "" : '<li class="aide">Rien trouvé.</li>';
  trouves.forEach((e, i) => {
    const li = document.createElement("li");
    const fait = e.cle && etat.fait[e.cle] ? " ✔" : "";
    li.innerHTML = `<span class="type">${e.type}</span><span>${echap(e.texte)}${fait}</span><span class="sous">${echap(e.sous)}</span>`;
    li.onclick = () => choisir(e);
    if (i === choisi) li.classList.add("choisi");
    ul.appendChild(li);
  });
  ul.hidden = false;
}
function choisir(e) {
  $("resultats").hidden = true;
  $("recherche").blur();
  if (e.rid !== regionId) changerRegion(e.rid);
  const cible = e.cle && entites.find((x) => x.cle === e.cle);
  if (cible && !visible(cible)) couches.entites.addLayer(cible.rect);
  allerA(ll(e.x, e.y), e.zoom, cible ? cible.rect : null);
  if (!cible) montrer(e.x, e.y);
}
// Un cercle qui disparaît, pour montrer un endroit
function montrer(x, y) {
  couches.marque.clearLayers();
  const c = L.circle(ll(x, y), { radius: 0.6, color: "#e0604a", weight: 4, fill: false });
  couches.marque.addLayer(c);
  setTimeout(() => couches.marque.removeLayer(c), 4000);
}
$("recherche").addEventListener("input", () => { choisi = -1; chercher(); });
$("recherche").addEventListener("focus", chercher);
$("recherche").addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowDown") { choisi = Math.min(choisi + 1, trouves.length - 1); chercher(); ev.preventDefault(); }
  else if (ev.key === "ArrowUp") { choisi = Math.max(choisi - 1, 0); chercher(); ev.preventDefault(); }
  else if (ev.key === "Enter" && trouves.length) choisir(trouves[Math.max(choisi, 0)]);
  else if (ev.key === "Escape") { $("resultats").hidden = true; $("recherche").blur(); }
});
document.addEventListener("click", (ev) => { if (!$("zone-recherche").contains(ev.target)) $("resultats").hidden = true; });

// ---------- Tracker : « tu es ici » ----------
function trouverLieu(nom) {
  let k = cle(nom);
  k = ALIAS[k] || k;
  if (lieuxIndex[k]) return lieuxIndex[k];
  const sansEtage = k.replace(/(b?\d+f|rooftop|outside|inside)$/, "");
  if (lieuxIndex[sansEtage]) return lieuxIndex[sansEtage];
  // « Sprout Tower Rooftop » -> « Sprout Tower », mais jamais « Route 22 » -> « Route 2 »
  const suite = (a, b) => a.startsWith(b) && !/^\d/.test(a.slice(b.length));
  for (const [kk, l] of Object.entries(lieuxIndex)) if (kk.length > 4 && (suite(k, kk) || suite(kk, k))) return l;
  return null;
}
function placerIci(l) {
  if (ici) map.removeLayer(ici);
  ici = null;
  if (!l || l.region !== regionId) return;
  ici = L.marker(ll(l.x, l.y), { interactive: false, keyboard: false, zIndexOffset: 1000,
    icon: L.divIcon({ className: "ici", html: `<div class="onde"></div><div class="onde deux"></div><div class="ombre"></div><div class="epingle"></div><div class="nom">${echap(l.nom)}</div>`, iconSize: [0, 0] }) }).addTo(map);
}
const JEU_DU_TRACKER = (j) => {
  const n = `${j?.nom || ""} ${j?.badges || ""}`;
  if (/HGSS|HeartGold|SoulSilver/i.test(n)) return "hgss";
  if (/Platin/i.test(n)) return "platine";
  if (/(Black|White|Noire|Blanche)\s*2/i.test(n)) return "noire2";
  if (/Black|White|Noire|Blanche/i.test(n)) return "noire";
  return null;
};
let dernierNomLieu = null, derniereRun = null, trackerOk = null;
async function lireTracker() {
  try {
    const r = await fetch("../tracker-twitch.json?t=" + Date.now(), { cache: "no-store" });
    if (!r.ok) throw new Error(r.status);
    const d = await r.json();
    if (trackerOk !== true) $("etat-tracker").textContent = "Tracker connecté ✔";
    trackerOk = true;
    // Le jeu du tracker, sauf si on a choisi un autre jeu soi-même (menu ou ?jeu= dans l'adresse)
    const jid = JEU_DU_TRACKER(d.jeu);
    if (jid && JEUX[jid] && jid !== jeuId && !jeuChoisi && (reglages.suivre || OBS)) changerJeu(jid);
    if (jid !== jeuId) return;
    // Nouvelle run : on peut tout décocher automatiquement
    const run = d.chrono?.debut;
    if (run && derniereRun && run !== derniereRun && reglages.autoReset) nouvelleRun(true);
    derniereRun = run || derniereRun;
    if (d.lieu && d.lieu !== dernierNomLieu) {
      dernierNomLieu = d.lieu;
      const l = trouverLieu(d.lieu);
      $("etat-tracker").textContent = "Tracker connecté ✔ — " + (l ? l.nom : d.lieu);
      if (l) {
        lieuActuel = l;
        if ((reglages.suivre || OBS) && l.region !== regionId) changerRegion(l.region);
        placerIci(l);
        if (reglages.suivre || OBS) map.flyTo(ll(l.x, l.y), OBS ? Number(params.get("zoom") || 4.5) : Math.max(map.getZoom(), 4), { duration: 1 });
      }
      $("bandeau").textContent = "📍 " + (l ? l.nom : d.lieu);
      $("bandeau").hidden = !OBS;
    }
  } catch (e) {
    if (trackerOk !== false) {
      $("etat-tracker").textContent = location.protocol === "file:"
        ? "Ouvre la carte via ton serveur (http://localhost:8080/carte-ironmon/) pour la relier au tracker."
        : "Tracker non trouvé : lance ton tracker et ton serveur du stream.";
    }
    trackerOk = false;
  }
}

function nouvelleRun(auto) {
  if (LECTURE) return;
  if (!auto && !confirm("Tout décocher pour une nouvelle run ? (Tes notes sont gardées.)")) return;
  etat.fait = {};
  etat.etoile = {};
  enregistrer();
  for (const e of entites) { e.rect.setStyle(styleEntite(e)); }
  appliquerFiltres();
  majPanneau();
  majPanneauxLieux();
}

// ---------- Réglages ----------
function brancher(id, nom) {
  const c = $(id);
  c.checked = !!reglages[nom];
  c.addEventListener("change", () => { reglages[nom] = c.checked; sauverReglages(); appliquerFiltres(); });
}
brancher("voir-dresseurs", "dresseurs");
brancher("voir-objets", "objets");
brancher("voir-ct", "ct");
brancher("voir-caches", "caches");
brancher("voir-faits", "faits");
brancher("voir-passages", "passages");
brancher("voir-itineraires", "itineraires");
brancher("voir-notes", "notes");
brancher("suivre", "suivre");
brancher("auto-reset", "autoReset");
for (const r of document.querySelectorAll('input[name="liens"]')) {
  r.checked = r.value === reglages.liens;
  r.addEventListener("change", () => { reglages.liens = r.value; sauverReglages(); construire(); });
}
$("btn-panneau").onclick = () => $("panneau").classList.toggle("ferme");
$("fermer-panneau").onclick = () => $("panneau").classList.add("ferme");
$("nouvelle-run").onclick = () => nouvelleRun(false);
$("ouvrir-aide").onclick = () => $("aide").showModal();
map.on("moveend", () => { etat.vues[regionId] = { c: map.getCenter(), z: map.getZoom() }; enregistrer(); });

// Choix du jeu (les autres jeux arrivent au fur et à mesure)
const TOUS_LES_JEUX = [["hgss", "HeartGold / SoulSilver"], ["platine", "Platine"], ["noire", "Noire / Blanche"], ["noire2", "Noire 2 / Blanche 2"]];
for (const [id, nom] of TOUS_LES_JEUX) {
  const o = document.createElement("option");
  o.value = id;
  o.textContent = JEUX[id] ? nom : nom + " (bientôt)";
  o.disabled = !JEUX[id];
  $("choix-jeu").appendChild(o);
}
let jeuChoisi = params.has("jeu");
$("choix-jeu").onchange = (ev) => { jeuChoisi = true; changerJeu(ev.target.value); index = []; };

// ---------- Progression partagée (lecture seule) ----------
function quitterLecture() {
  LECTURE = false;
  document.body.classList.remove("lecture-seule");
  $("bandeau-partage").hidden = true;
}
if (LECTURE) {
  document.body.classList.add("lecture-seule");
  $("bandeau-partage").hidden = false;
  $("quitter-partage").onclick = () => { location.href = location.pathname + "?jeu=" + jeuId; };
}
$("partager").onclick = () => {
  const lien = `${location.origin}${location.pathname}?jeu=${jeuId}&prog=${coderProgression(jeu, etat.fait)}`;
  $("partage-jeu").textContent = jeu.nom;
  $("lien-partage").value = lien;
  $("lien-copie").hidden = true;
  $("dialogue-partage").showModal();
  $("lien-partage").select();
};
$("copier-lien").onclick = async () => {
  try { await navigator.clipboard.writeText($("lien-partage").value); $("lien-copie").hidden = false; }
  catch (e) { $("lien-partage").select(); }
};

// ---------- Sauvegarder / charger : coches et notes de tous les jeux dans un fichier ----------
const messageSauvegarde = (t) => { $("etat-sauvegarde").textContent = t; $("etat-sauvegarde").hidden = false; };
$("sauver").onclick = () => {
  const donnees = { carte: "carte-ironmon-fr", version: 1, date: new Date().toISOString(), reglages, jeux: {} };
  for (const [id] of TOUS_LES_JEUX) donnees.jeux[id] = id === jeuId && !LECTURE ? etat : memoire.lire(id);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(donnees, null, 1)], { type: "application/json" }));
  a.download = `carte-ironmon-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  messageSauvegarde("Fichier créé : garde-le pour retrouver ta progression ailleurs.");
};
$("charger").onclick = () => $("fichier-sauvegarde").click();
$("fichier-sauvegarde").onchange = async (ev) => {
  const f = ev.target.files[0];
  ev.target.value = "";
  if (!f) return;
  try {
    const d = JSON.parse(await f.text());
    if (d.carte !== "carte-ironmon-fr" || !d.jeux) throw new Error("format");
    for (const [id, e] of Object.entries(d.jeux)) if (JEUX[id]) memoire.ecrire(id, e);
    if (d.reglages) { Object.assign(reglages, d.reglages); sauverReglages(); }
    quitterLecture();
    changerJeu(jeuId);
    index = [];
    messageSauvegarde("Progression chargée ✔");
  } catch (e) {
    messageSauvegarde("Ce fichier n'est pas une sauvegarde de la carte. Choisis le fichier .json créé par « Sauvegarder ».");
  }
};

// ---------- Légende ----------
function basculerLegende(ouvrir) {
  const voir = ouvrir ?? $("legende").hidden;
  $("legende").hidden = !voir;
  $("btn-legende").setAttribute("aria-expanded", String(voir));
}
$("btn-legende").onclick = () => basculerLegende();

// ---------- Raccourcis clavier ----------
document.addEventListener("keydown", (ev) => {
  if (ev.ctrlKey || ev.metaKey || ev.altKey || OBS) return;
  const t = ev.target;
  if (t.matches && t.matches("input, textarea, select")) return;
  if (document.querySelector("dialog[open]") || !$("accueil").hidden) return;
  const regions = Object.keys(jeu.regions);
  const k = ev.key;
  if (k === "/") { ev.preventDefault(); $("recherche").focus(); }
  else if (/^[1-9]$/.test(k) && regions[k - 1]) changerRegion(regions[k - 1]);
  else if (k === "r" || k === "R") {
    if (lieuActuel) { if (lieuActuel.region !== regionId) changerRegion(lieuActuel.region); allerA(ll(lieuActuel.x, lieuActuel.y), 5); }
    else allerA(ll(region.depart[0], region.depart[1]), 4);
  }
  else if (k === "p" || k === "P") $("panneau").classList.toggle("ferme");
  else if (k === "l" || k === "L") basculerLegende();
  else if (k === "j" || k === "J") ouvrirAccueil();
  else if (k === "?") $("aide").showModal();
  else if (k === "+" || k === "=") map.zoomIn(0.5);
  else if (k === "-") map.zoomOut(0.5);
  else if (k === "Escape") { basculerLegende(false); $("panneau").classList.add("ferme"); }
});

changerJeu(jeuId);
majZoom();
if (LECTURE) {
  const n = Object.keys(etat.fait).length;
  $("partage-info").textContent = `${jeu.nom}, ${n} dresseur${n > 1 ? "s" : ""} et objet${n > 1 ? "s" : ""} faits`;
}

// ---------- Écran d'accueil : une grande carte illustrée par jeu ----------
function ouvrirAccueil() {
  const boite = $("cartes-jeux");
  boite.innerHTML = "";
  for (const [id, nom] of TOUS_LES_JEUX) {
    const j = JEUX[id];
    if (!j) continue;
    const [rid, r] = Object.entries(j.regions)[0];
    // La tuile (zoom 4) de la première ville du jeu sert d'illustration
    const z = 4, f = 2 ** (NATIF - z) * 256;
    const l = Object.values(r.lieux)[0] || { x: r.depart[0], y: r.depart[1] };
    const tuile = `${r.tuiles}/${z}/${Math.floor(l.x / f)}_${Math.floor(l.y / f)}.webp`;
    let nd = 0, no = 0;
    for (const rr of Object.values(j.regions)) { nd += rr.dresseurs.length; no += rr.objets.length; }
    const b = document.createElement("button");
    b.className = "carte-jeu";
    b.dataset.jeu = id;
    b.innerHTML = `<div class="vue" style="background-image:url('${tuile}')"></div><div class="voile"></div>`
      + (id === jeuId ? '<span class="dernier">Dernier ouvert</span>' : "")
      + `<div class="infos"><div class="titre">${echap(nom)}</div><span class="bande"></span>`
      + `<div class="details">${Object.values(j.regions).map((x) => echap(x.nom)).join(" · ")}<br>${nd} dresseurs · ${no} objets</div></div>`;
    b.onclick = () => {
      $("accueil").hidden = true;
      jeuChoisi = true;
      if (id !== jeuId) { changerJeu(id); index = []; }
    };
    boite.appendChild(b);
  }
  $("accueil").hidden = false;
}
$("btn-jeu").onclick = ouvrirAccueil;
document.addEventListener("keydown", (ev) => { if (ev.key === "Escape" && !$("accueil").hidden) $("accueil").hidden = true; });

// Le tracker n'est lisible que sur le PC du stream : la version en ligne ne le cherche pas
const EN_LIGNE = !/^(localhost|127\.|\[::1\]|192\.168\.|10\.)/.test(location.hostname) && location.protocol !== "file:";
if (EN_LIGNE) {
  $("etat-tracker").textContent = "Le suivi de ta position marche avec la carte ouverte sur ton PC pendant le stream "
    + "(http://localhost:8080/carte-ironmon/). Ici, tout le reste fonctionne : coches, notes, recherche.";
  $("suivre").disabled = $("auto-reset").disabled = true;
  // En ligne, on arrive sur le choix du jeu (sauf lien direct ?jeu=…)
  if (!OBS && !params.has("jeu")) ouvrirAccueil();
} else {
  lireTracker();
  setInterval(lireTracker, 3000);
}
