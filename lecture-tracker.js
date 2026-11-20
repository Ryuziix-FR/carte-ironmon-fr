// Cimetière : lecture de l'historique d'un tracker IronMON DS (BizHawk), directement dans le navigateur.
// Mêmes règles que outils/defaites.py (serveur du stream de Ryuziix) : une défaite par seed perdue après le labo,
// avec le lieu, le Pokémon K.O., son adversaire et les badges, et les noms des Pokémon comme le tracker les affiche.
// Rien n'est envoyé nulle part : les fichiers sont lus sur le PC du joueur.
//
// Un « lecteur » donne accès aux fichiers du dossier du tracker (celui qui contient savedData) :
//   lecteur.texte(chemin)  -> Promise<string|null>    null : fichier absent
//   lecteur.liste(dossier) -> Promise<string[]|null>  null : ce lecteur ne sait pas lister (fichier OBS)
"use strict";
window.LectureTracker = (() => {
  // Nom du fichier d'historique -> jeu de la carte
  const JEUX = [[/HeartGold|SoulSilver/i, "hgss"], [/Platin/i, "platine"], [/(Black|White) ?2/i, "noire2"], [/Black|White/i, "noire"]];
  const GEN = { hgss: 4, platine: 4, noire: 5, noire2: 5 };
  // Sans liste du dossier (fichier OBS), on essaie les noms que donnent les trackers
  const FICHIERS_CONNUS = ["Pokemon HeartGold", "Pokemon SoulSilver", "Pokemon Platinum", "Pokemon Black", "Pokemon White",
    "Pokemon Black 2", "Pokemon White 2", "HeartGold Kaizo 9G FR"];
  const NIVEAU = 7, ESPECE = 18; // place des valeurs d'un Pokémon dans le fichier (SeedLogger.lua, POKEMON_KEY_LIST)
  // Le tracker Kaizo FR écrit les noms sans accents (« Salameche ») : on les remet
  const ACCENTS = {"aeromite":"Aéromite","aeropteryx":"Aéroptéryx","amovenus":"Amovénus","archeduc":"Archéduc","archeodong":"Archéodong","archeomire":"Archéomire","arkeapti":"Arkéapti","baggaid":"Baggaïd","balbaleze":"Balbalèze","batracne":"Batracné","bebecaille":"Bébécaille","bekaglacon":"Bekaglaçon","berasca":"Bérasca","betochef":"Bétochef","blindepique":"Blindépique","boguerisse":"Boguérisse","boreas":"Boréas","brasegali":"Braségali","brocelome":"Brocélôme","brutalibre":"Brutalibré","cablifere":"Câblifère","camerupt":"Camérupt","chetiflor":"Chétiflor","cleopsytra":"Cléopsytra","coleodome":"Coléodôme","corayome":"Corayôme","cornebre":"Cornèbre","crefadet":"Créfadet","crefollet":"Créfollet","crehelf":"Créhelf","cremy":"Crèmy","croaporal":"Croâporal","cryptero":"Cryptéro","deflaisan":"Déflaisan","delestin":"Délestin","demanta":"Démanta","demeteros":"Démétéros","demolosse":"Démolosse","desseliande":"Desséliande","dimocles":"Dimoclès","draieul":"Draïeul","ecaid":"Écaïd","ecayon":"Écayon","ecrapince":"Écrapince","ecremeuh":"Écrémeuh","effleche":"Efflèche","ekaiser":"Ékaïser","elecsprint":"Élecsprint","electhor":"Électhor","electrode":"Électrode","elekable":"Élekable","elekid":"Élekid","elektek":"Élektek","eoko":"Éoko","epine-de-fer":"Épine-de-Fer","ethernatos":"Éthernatos","etouraptor":"Étouraptor","etourmi":"Étourmi","etourvol":"Étourvol","evoli":"Évoli","felicanis":"Félicanis","felinferno":"Félinferno","ferosinge":"Férosinge","feu-percant":"Feu-Perçant","feuforeve":"Feuforêve","flabebe":"Flabébé","flamigator":"Flâmigator","floreclat":"Floréclat","flotte-meche":"Flotte-Mèche","funecire":"Funécire","geolithe":"Géolithe","germeclat":"Germéclat","goelise":"Goélise","grahyena":"Grahyèna","grelacon":"Grelaçon","guerilande":"Guérilande","hachecateur":"Hachécateur","heledelle":"Hélédelle","heliatronc":"Héliatronc","helionceau":"Hélionceau","hericendre":"Héricendre","hypocean":"Hypocéan","insecateur":"Insécateur","karaclee":"Karaclée","khelocrok":"Khélocrok","lakmecygne":"Lakmécygne","lamperoie":"Lampéroie","lancargot":"Lançargot","larmeleon":"Larméléon","leboulerou":"Léboulérou","leopardus":"Léopardus","lepidonille":"Lépidonille","leviator":"Léviator","lezargus":"Lézargus","libegon":"Libégon","lineon":"Linéon","lumineon":"Luminéon","magireve":"Magirêve","magneti":"Magnéti","magneton":"Magnéton","magnezone":"Magnézone","manzai":"Manzaï","mascaiman":"Mascaïman","medhyena":"Medhyèna","meditikka":"Méditikka","meganium":"Méganium","megapagos":"Mégapagos","meios":"Méios","melancolux":"Mélancolux","melo":"Mélo","melodelfe":"Mélodelfe","melofee":"Mélofée","melokrik":"Mélokrik","mesmerella":"Mesmérella","metalosse":"Métalosse","metamorph":"Métamorph","metang":"Métang","meteno":"Météno","monaflemit":"Monaflèmit","morpheo":"Morphéo","mustebouee":"Mustébouée","musteflott":"Mustéflott","nanmeouie":"Nanméouïe","negapi":"Négapi","nemelios":"Némélios","nenupiot":"Nénupiot","nucleos":"Nucléos","okeoke":"Okéoké","pandespiegle":"Pandespiègle","patachiot":"Pâtachiot","pechaminus":"Pêchaminus","pelage-sable":"Pelage-Sablé","peregrain":"Pérégrain","pietace":"Piétacé","pingoleon":"Pingoléon","poissirene":"Poissirène","polthegeist":"Polthégeist","predasterie":"Prédastérie","ptera":"Ptéra","qulbutoke":"Qulbutoké","remoraid":"Rémoraid","rhinoferos":"Rhinoféros","roselia":"Rosélia","salameche":"Salamèche","sarmurai":"Sarmuraï","seleroc":"Séléroc","seracrawl":"Séracrawl","seviper":"Séviper","siderella":"Sidérella","silvallie":"Silvallié","skelenox":"Skelénox","sorbebe":"Sorbébé","tapatoes":"Tapatoès","tenefix":"Ténéfix","teraclope":"Téraclope","tetampoule":"Têtampoule","tetarte":"Têtarte","tetes-de-fer":"Têtes-de-Fer","theffroi":"Théffroi","theffroyable":"Théffroyable","trepassable":"Trépassable","tutetekri":"Tutétékri","vemini":"Vémini","vipelierre":"Vipélierre","vorasterie":"Vorastérie","zapetrel":"Zapétrel","zebibron":"Zébibron","zeblitz":"Zéblitz","zeroid":"Zéroïd"};
  const sansAccent = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const nombre = (v) => Math.trunc(parseFloat(v)); // le tracker écrit parfois « 496.0 » (formes)

  // Version montrée sur la carte : la 9G à part, sinon le nom du jeu
  const NOMS_VERSIONS = { heartgold: "HeartGold", soulsilver: "SoulSilver", platinum: "Platine", "black 2": "Noire 2",
    "white 2": "Blanche 2", black: "Noire", white: "Blanche" };
  function version(fichier) {
    if (/9G/i.test(fichier)) return "9G FR";
    const m = fichier.match(/HeartGold|SoulSilver|Platinum|Black 2|White 2|Black|White/i);
    return m ? NOMS_VERSIONS[m[0].toLowerCase()] : fichier;
  }

  // Un fichier .pastlog : « log start », empreinte de la ROM, date, Pokémon K.O., adversaire, 2 lignes de badges, lieu, progression
  function lirePastlog(texte) {
    const l = texte.split(/\r?\n/), runs = [];
    for (let i = 0; i < l.length; i++) {
      if (l[i] !== "log start" || i + 8 >= l.length) continue;
      const moi = l[i + 3].split(","), lui = l[i + 4].split(",");
      const r = {
        t: nombre(l[i + 2].split(",").pop()), lieu: l[i + 7].trim(),
        moi: nombre(moi[ESPECE]), niv: nombre(moi[NIVEAU]), lui: nombre(lui[ESPECE]), nivLui: nombre(lui[NIVEAU]),
        badges: (l[i + 5] + "," + l[i + 6]).split(",").filter((v) => v.trim() === "1").length,
      };
      if (![r.t, r.moi, r.niv, r.lui, r.nivLui].every(Number.isFinite) || !r.lieu) continue;
      runs.push([l[i + 1].trim(), r]);
    }
    return runs.sort((a, b) => a[1].t - b[1].t);
  }

  // Le corps de la table Lua « nom = { … } » (accolades équilibrées)
  function tableLua(texte, nom) {
    const m = new RegExp(nom + "\\s*=\\s*\\{").exec(texte || "");
    if (!m) return "";
    let profondeur = 0;
    for (let j = m.index + m[0].length - 1; j < texte.length; j++) {
      if (texte[j] === "{") profondeur++;
      else if (texte[j] === "}" && --profondeur === 0) return texte.slice(m.index + m[0].length, j);
    }
    return "";
  }

  // Tracker hg-engine (9G FR) : le profil de la ROM (clé = numéro du Pokémon) et le nom d'affichage des formes
  function nomsHgEngine(profil, formes) {
    const noms = {};
    for (const m of profil.matchAll(/\[(\d+)\]=\{name="([^"]*)",nationalDex=/g)) noms[+m[1]] = m[2];
    for (const m of (formes || "").matchAll(/\[(\d+)\]="([^"]*)"/g)) {
      if (/\(forme \d+\)$/.test(noms[+m[1]] || "")) noms[+m[1]] = m[2];
    }
    return noms;
  }

  // Tracker classique : la liste du jeu (jusqu'à LAST_INDEX_GEN_x), puis les formes dans l'ordre de GameConfigurator
  function nomsClassiques(donnees, config, gen) {
    if (!donnees) return {};
    const coupe = donnees.indexOf("ALTERNATE_FORMS = {");
    const maitre = [...(coupe > 0 ? donnees.slice(0, coupe) : donnees).matchAll(/name\s*=\s*"([^"]*)"/g)].map((m) => m[1]);
    const fin = new RegExp(`LAST_INDEX_GEN_${gen}\\s*=\\s*(\\d+)`).exec(donnees);
    const noms = {};
    (fin ? maitre.slice(0, +fin[1]) : maitre).forEach((n, i) => { noms[i] = n; });
    const corps = tableLua(donnees, "ALTERNATE_FORMS");
    if (corps && config) {
      const bases = [...corps.matchAll(/^\s*\["([^"]+)"\]\s*=\s*\{/gm)];
      const formes = {};
      bases.forEach((b, i) => {
        const bloc = corps.slice(b.index + b[0].length, i + 1 < bases.length ? bases[i + 1].index : corps.length);
        formes[b[1]] = [...bloc.matchAll(/name\s*=\s*"([^"]*)"/g)].map((m) => m[1]);
      });
      const ordre = tableLua(config, `ALTERNATE_FORM_ORDER_GEN${gen}`).replace(/--\[\[[\s\S]*?\]\]/g, "");
      let i = Object.keys(noms).length;
      for (const m of ordre.matchAll(/"([^"]+)"/g)) for (const n of formes[m[1]] || []) noms[i++] = n;
    }
    return noms;
  }

  // Les noms ne changent pas pendant la visite : lus une fois par lecteur et par génération
  async function noms(lecteur, gen, empreintes) {
    lecteur.noms ??= {};
    if (lecteur.noms[gen]) return lecteur.noms[gen];
    let resultat = null;
    const formes = await lecteur.texte("ironmon_tracker/HGEngineFormNames.lua");
    for (const e of empreintes.slice(-3).reverse()) {
      const profil = await lecteur.texte(`ironmon_tracker/hg_engine_profiles/${e}.lua`);
      if (profil) { resultat = nomsHgEngine(profil, formes); break; }
    }
    if (!resultat && formes !== null) {
      // Tracker 9G dont le profil de ces seeds a été effacé : n'importe quel profil a les mêmes noms
      const liste = (await lecteur.liste("ironmon_tracker/hg_engine_profiles")) || [];
      const autre = liste.filter((n) => /\.lua$/i.test(n)).sort().pop();
      const profil = autre && await lecteur.texte(`ironmon_tracker/hg_engine_profiles/${autre}`);
      if (profil) resultat = nomsHgEngine(profil, formes);
    }
    if (!resultat) {
      resultat = nomsClassiques(await lecteur.texte("ironmon_tracker/constants/PokemonData.lua"),
        await lecteur.texte("ironmon_tracker/GameConfigurator.lua"), gen);
    }
    return (lecteur.noms[gen] = resultat);
  }

  // Toutes les défaites du tracker, rangées par jeu de la carte : { jeux: { hgss: { versions, defaites: [...] } } }
  async function lire(lecteur) {
    const liste = await lecteur.liste("savedData");
    const fichiers = liste ? liste.filter((n) => /\.pastlog$/i.test(n)).map((n) => n.replace(/\.pastlog$/i, "")) : FICHIERS_CONNUS;
    const jeux = {}, vus = new Set();
    let trouves = 0;
    // Sans liste du dossier, un fichier absent n'est recherché qu'une fois par minute (pas à chaque lecture)
    lecteur.absents ??= {};
    for (const fichier of fichiers) {
      const jeu = (JEUX.find(([motif]) => motif.test(fichier)) || [])[1];
      if (!jeu || (!liste && Date.now() - (lecteur.absents[fichier] || 0) < 60000)) continue;
      const texte = await lecteur.texte(`savedData/${fichier}.pastlog`);
      if (texte === null) { lecteur.absents[fichier] = Date.now(); continue; }
      delete lecteur.absents[fichier];
      trouves++;
      const runs = lirePastlog(texte);
      if (!runs.length) continue;
      const table = await noms(lecteur, GEN[jeu], runs.map(([e]) => e));
      const nom = (n) => { const x = table[n] ?? `n°${n}`; return ACCENTS[sansAccent(x)] || x; };
      const v = version(fichier);
      for (const [empreinte, r] of runs) {
        // Le même historique peut exister deux fois : une seed ne compte qu'une fois
        if (vus.has(jeu + empreinte)) continue;
        vus.add(jeu + empreinte);
        const j = (jeux[jeu] ??= { versions: {}, defaites: [] });
        j.versions[v] = (j.versions[v] || 0) + 1;
        j.defaites.push(Object.assign({}, r, { v, moi: nom(r.moi), lui: nom(r.lui) }));
      }
    }
    for (const j of Object.values(jeux)) j.defaites.sort((a, b) => a.t - b.t);
    // fichiers : nombre d'historiques trouvés (0 : ce n'est pas le dossier d'un tracker, ou aucune run encore)
    return { maj: Math.floor(Date.now() / 1000), jeux, fichiers: trouves };
  }

  // Dossier choisi avec « Relier mon tracker » (Chrome, Edge : accès aux fichiers du navigateur)
  function lecteurDossier(racine) {
    const dossier = async (parties) => {
      let d = racine;
      for (const p of parties) d = await d.getDirectoryHandle(p);
      return d;
    };
    return {
      async texte(chemin) {
        try {
          const p = chemin.split("/");
          const f = await (await dossier(p.slice(0, -1))).getFileHandle(p[p.length - 1]);
          return await (await f.getFile()).text();
        } catch (e) { return null; }
      },
      async liste(chemin) {
        try {
          const d = await dossier(chemin.split("/")), noms = [];
          for await (const [n, h] of d.entries()) if (h.kind === "file") noms.push(n);
          return noms;
        } catch (e) { return null; }
      },
    };
  }

  // Fichier OBS posé dans le dossier du tracker (source navigateur « fichier local ») : les autres fichiers se lisent
  // par leur adresse, à côté de lui. Pas de « ?t= » dans l'adresse : OBS chercherait un fichier de ce nom.
  function lecteurAdresse(base) {
    return {
      async texte(chemin) {
        try {
          const r = await fetch(new URL(chemin.split("/").map(encodeURIComponent).join("/"), base), { cache: "no-store" });
          return r.ok ? await r.text() : null;
        } catch (e) { return null; }
      },
      async liste() { return null; },
    };
  }

  return { lire, lecteurDossier, lecteurAdresse };
})();
