// Guide de run Kaizo pour Soleil / Lune, étape par étape.
// D'après le « Gen 7 Ironmon Guide » d'accruenewblue (avec l'aide de DogRay), écrit pour Ultra-Soleil / Ultra-Lune :
// seulement ce qui vaut pour Soleil / Lune, réécrit en français. Les niveaux ne sont pas repris (ceux de la carte
// viennent du mod Kaizo). « lieu » = un lieu de donnees/soleil.js (bouton « Voir sur la carte »).
window.GUIDES = window.GUIDES || {};
GUIDES.soleil = {
  titre: "Guide de la run Soleil",
  source: {
    nom: "Gen 7 Ironmon Guide",
    auteur: "accruenewblue (avec DogRay)",
    url: "https://docs.google.com/document/d/1rbznMPAEpWMFdAUiYKOfoRHyizBbG86mtL1ofR2DfhM/"
  },
  intro: "Les étapes de la run dans l'ordre, avec ce qu'il faut savoir à chaque endroit : combats obligatoires, dresseurs qui ne se battent qu'à certaines conditions, objets donnés par des personnages. Coche une étape quand elle est faite.",
  avertissement: "Le guide d'origine est écrit pour Ultra-Soleil : ce qui n'existe que dans Ultra a été retiré. Quelques noms français de personnages sont donnés avec leur nom anglais entre parenthèses quand ils diffèrent beaucoup ; si un détail ne colle pas avec ton jeu, fie-toi au jeu.",
  regles: [
    "CT autorisées en Kaizo (Soleil / Lune) : 01, 29, 43, 54, 67, 95, 96.",
    "Changer l'heure du jeu : dans Citra, Émulation › Configurer › Système, après avoir sauvegardé, puis relancer le jeu. Préfère les sauvegardes du jeu aux sauvegardes instantanées de Citra, parfois capricieuses.",
    "Pluie entre 17 h et 18 h (heure du jeu) à la Colline Clapotis et à la Jungle Sombrefeuille : certains dresseurs n'apparaissent qu'à ce moment.",
    "Pokémon Dominants : un bonus aléatoire de +1 à +3 sur une statistique (parfois toutes). Ils peuvent appeler des renforts.",
    "Donjons (pour les règles qui en tiennent compte, d'après l'auteur) : École des Dresseurs, Grotte Verdoyante, Grotte Verlamer, Buffet de combat, Colline Dicarat, Colline Clapotis, haut du Parc Volcanique, Jungle Sombrefeuille, Tunnel Taupiqueur, Arène de Kanto, Observatoire, Supermarché abandonné, Kokohio, Paradis Æther, Mont Lanakila."
  ],
  parties: [
    {
      nom: "Mele-Mele",
      etapes: [
        { id: "debut", titre: "Début et Route 1", lieu: "route1", points: [
          "Choisis ton apparence et ton nom, passe les scènes, puis pars vers la Route 1 par la gauche.",
          "La première nuit dans ton lit après avoir reçu le sac, Miaouss te laisse un Réveil.",
          "Un objet en longeant le bord de l'herbe au nord, un autre derrière l'herbe au nord-ouest."
        ] },
        { id: "mahalo", titre: "Sentier de Mahalo et Lili'i", lieu: "sentierdemahalo", points: [
          "Sauvegarde après le sentier : c'est là que se fait le premier combat contre Tili (Hau).",
          "Tutoriel de capture : 5 Potions et 10 Poké Balls.",
          "Les deux carrés d'herbe sont deux zones différentes pour le randomizer (Pokémon différents).",
          "Le 2e dresseur se contourne par derrière (un objet derrière lui) ; celui devant l'herbe se contourne sans entrer dans l'herbe.",
          "Deuxième combat contre Tili à Lili'i, puis une scène au laboratoire (au sud de ta maison)."
        ] },
        { id: "ecole", titre: "École des Dresseurs", lieu: "ekaeka", points: [
          "Donjon dans les règles qui en utilisent.",
          "La fille du hall donne une Vive Griffe.",
          "La dresseuse de la salle de gauche (rez-de-chaussée) donne 3 Baies Oran une fois battue.",
          "Le dresseur des terrains dehors ne se bat qu'après les 3 autres : il donne la CT01.",
          "1er étage, salle de gauche : l'élève en haut à droite donne une Potion. Prends-la avant le professeur, tu es sorti de l'école juste après.",
          "Le professeur ne se bat qu'après les 4 autres dresseurs : 5 Super Balls."
        ] },
        { id: "ekaeka", titre: "Ekaeka", lieu: "ekaeka", points: [
          "Althéo (Ilima) et le sbire Skull de la rue du sud ne se battent que si tu leur parles (et réponds oui), mais ils sont obligatoires pour avancer."
        ] },
        { id: "route2", titre: "Route 2", lieu: "route2", points: [
          "L'homme aux Baies Oran donne aussi une Baie Sitrus si tu as une Baie Kika (Persim).",
          "Arbres à baies : n'y touche que s'ils ne t'imposent pas de combat (celui des champs n'en impose jamais).",
          "Scène des Miaouss du motel : parle à l'homme à droite du motel, trouve Miaouss sous la voiture, puis sous l'arbre au sud du motel : Vitesse +, Spécial + et Attaque +."
        ] },
        { id: "verdoyante", titre: "Grotte Verdoyante (épreuve d'Althéo)", lieu: "grotteverdoyante", points: [
          "Donjon même dans le jeu : impossible d'en sortir.",
          "Regarde dans les trous : 3 Pokémon à battre, puis un sbire Skull.",
          "Pokémon Dominant tout en haut ; Althéo donne 10 Super Balls après.",
          "Les Pokémon sauvages n'apparaissent qu'après le Dominant."
        ] },
        { id: "route3", titre: "Route 3, Jardin de Mele-Mele, Grotte Verlamer", lieu: "route3", points: [
          "Les ombres qui volent au sol sont des Pokémon sauvages en embuscade.",
          "Euphorbe (Kukui) bloque le pont tant que le Jardin n'est pas fait.",
          "Le Topdresseur ne se bat qu'après tous les autres : CT19.",
          "En passant devant Lilie au Jardin, le Motisma active un bonus d'expérience de 3 minutes : tu peux garder des dresseurs pour ce moment.",
          "Grotte Verlamer : vide-la avant de parler à Cosmog. Lui parler lance des scènes qui finissent par un combat contre Tili dehors."
        ] },
        { id: "pectorius", titre: "Grande épreuve : Pectorius (Hala)", lieu: "lilii", points: [
          "Combat contre Pectorius à Lili'i ; son dernier Pokémon tient le Fightinium Z, qu'il te donne ensuite.",
          "Tu reçois Tauros (Poké Monture, il casse les rochers ; bouton Y) et la CT54.",
          "Boutique photo d'Ekaeka (sud-est) : une scène. Hôtel de ville (sud-ouest) : un combat (Pépite) ; l'accueil donne un Grelot Coque."
        ] },
        { id: "nettoyage1", titre: "Nettoyage de Mele-Mele avec Tauros", lieu: "collinedicarat", points: [
          "Rochers au sud de Lili'i : 2 objets.",
          "Colline Dicarat (à côté du labo) : plusieurs objets ; celui en bas à gauche demande seulement Force en Soleil.",
          "Terminal du ferry, coin en haut à droite : une Eau Fraîche.",
          "Rochers au sud-ouest de la Route 2 (près d'Ekaeka) : un objet.",
          "Cimetière d'Ekaeka : CT56. Est de la Route 3 : une CT. Grotte Verdoyante, derrière des rochers : une CT.",
          "Centre commercial d'Ekaeka (ouvert après la grande épreuve) : le mini-jeu des déchets en haut à gauche donne la CT48 (la nuit). Juste en face de l'escalier, le Buffet de combat : 10 tours contre des dresseurs à un seul Pokémon (tu peux le garder pour après l'épreuve de Néphie)."
        ] }
      ]
    },
    {
      nom: "Akala",
      etapes: [
        { id: "hoohale", titre: "Ho'ohale", lieu: "hoohale", points: [
          "Magasin de droite du Centre Pokémon : CT16, 17, 20, 33 et 70.",
          "Va au sud depuis la plage (scène), puis à l'est (scène), puis au nord : combat contre Dexio et Sina, qui soignent ton équipe et donnent un Guérison.",
          "Une bouteille sur la plage, puis une danseuse de l'hôtel : une Écaille Cœur.",
          "Hôtel, 3e étage : chambre de gauche (un objet, un autre sur le balcon à droite) ; chambre à droite de l'ascenseur (une Baie Oran la première fois, puis 2 objets en revenant).",
          "La partie de la ville à l'est du Centre reste fermée jusqu'à l'épreuve de Néphie (Lana)."
        ] },
        { id: "route4", titre: "Route 4", lieu: "route4", points: [
          "Aucun dresseur obligatoire tout de suite : tu peux filer au ranch d'Ohana (2 dresseurs seulement) pour Ponchien Flair, qui aide à trouver les objets cachés."
        ] },
        { id: "ohana", titre: "Ohana et son ranch", lieu: "ohana", points: [
          "Combat contre Tili dès l'entrée de la ville (Muscle + après).",
          "L'Écrémeuh à côté de la CT10 soigne ton équipe si tu lui parles."
        ] },
        { id: "route5", titre: "Route 5", lieu: "route5", points: [
          "L'homme le plus proche de l'entrée ne se bat qu'après les autres dresseurs du sud de la route.",
          "Le nord de la route n'est accessible que depuis la Route 8."
        ] },
        { id: "clapotis", titre: "Colline Clapotis (épreuve de Néphie)", lieu: "collineclapotis", points: [
          "Lokhlass (surf) t'est prêté au début de l'épreuve ; reviens ensuite pour le pêcheur du premier lac.",
          "Quelques dresseurs et objets en plus des combats sauvages de l'épreuve. Néphie donne son cristal Z, une canne à pêche et 10 Scuba Balls.",
          "Elle te propose de partir tout de suite : refuse si tu veux battre un dresseur de plus.",
          "Le Vétéran du milieu ne se bat qu'après l'épreuve et sous la pluie (17 h-18 h)."
        ] },
        { id: "retour1", titre: "Petit retour vers Mele-Mele", lieu: "hoohale", points: [
          "Bureau de Game Freak à Ho'ohale (à l'est du Centre, 2e étage) : la fille en haut à gauche donne une Limonade.",
          "Retour à Mele-Mele par le ferry. Sur la plage d'Ekaeka, Corayon (à l'est) donne une Mousse Lumineuse (Défense Spéciale +1 quand on reçoit une attaque Eau)."
        ] },
        { id: "route6", titre: "Route 6", lieu: "route6", points: [
          "Le chemin à côté du dresseur du milieu mène à quelques objets."
        ] },
        { id: "domeroyal", titre: "Rue du Dôme Royal", lieu: "ruedudomeroyal", points: [
          "Boutique : CT07, 11, 18 et 37.",
          "Supermarché : Baudrok (en haut à droite) donne une Limonade ; 1000 ₽ à Hypnomade pour la CT44 ; l'employé en bas à gauche donne une baie au hasard.",
          "Dôme Royal : il suffit de mettre K.O. un Pokémon pour sortir du combat. Obligatoire avant l'épreuve de Kiawe.",
          "Un homme donne un Fer si tu parles au lac avec une Protéine dans le sac.",
          "La dame près de la fontaine n'est là que si tu l'as battue au Jardin de Mele-Mele."
        ] },
        { id: "volcan", titre: "Parc Volcanique (épreuve de Kiawe)", lieu: "parcvolcanique", points: [
          "Réponses de l'épreuve : celle du milieu, puis « souriant ».",
          "L'épreuve commence après les deux personnes et la porte, une fois passé le premier tunnel. La dame à droite de l'entrée de l'épreuve soigne.",
          "Kiawe donne son cristal Z, 10 Rapide Balls et Dracaufeu (vol)."
        ] },
        { id: "route8", titre: "Route 8", lieu: "route8", points: [
          "Bats l'écolier à côté du Centre Pokémon pour une Baie Prine."
        ] },
        { id: "jungle", titre: "Jungle Sombrefeuille (épreuve de Barbara)", lieu: "junglesombrefeuille", points: [
          "En Soleil : 4 objets à rapporter ; les 3 premiers imposent un combat contre un Pokémon sauvage.",
          "Il pleut entre 17 h et 18 h.",
          "Après l'épreuve : CT67 et 10 Faiblo Balls."
        ] },
        { id: "taupiqueur", titre: "Tunnel Taupiqueur", lieu: "tunneltaupiqueur", points: [
          "Le combat double au bout se fait avec Tili ; il donne un Huile Max après, et ton équipe est soignée."
        ] },
        { id: "konikoni", titre: "Konikoni", lieu: "konikoni", points: [
          "Tu peux passer derrière le policier de la Route 9 pour arriver plus vite.",
          "Boutiques à gauche de l'avenue, du sud au nord : encens, CT (09, 40, 47, 51, 78), Écailles Cœur (au restaurant), pierres d'évolution (une Potion Max en entrant)."
        ] },
        { id: "alyxia", titre: "Route 9, Colline Memento, grande épreuve d'Alyxia (Olivia)", lieu: "route9", points: [
          "Bellocchio (Looker) donne une Pierre Foudre en arrivant sur la route.",
          "Lilie soigne ton équipe avant le combat contre Alyxia.",
          "Après Alyxia, au centre commercial d'Ekaeka (en haut à gauche, le jour) : une dame lance une scène (5 Super Balls). Ressors, reviens, reparle-lui : combat contre un Pokémon sauvage de haut niveau ; fuir suffit (seule option en Kaizo) pour une Potion Max. Tu peux le garder pour plus tard."
        ] },
        { id: "hanohano", titre: "Club Hano-Hano", lieu: "clubhanohano", points: [
          "Saubohne (Faba) veut t'emmener au Paradis Æther dès l'entrée : refuse pour combattre les dresseurs de l'hôtel d'abord.",
          "Le combat double donne la CT45."
        ] },
        { id: "aether1", titre: "Paradis Æther (1re visite)", lieu: "paradisther", points: [
          "Parle à Saubohne à l'hôtel pour y aller. Après les scènes, prends l'ascenseur jusqu'au sous-sol 1 pour un objet au nord.",
          "Remonte, fais-toi soigner : combat contre Zéroïd (Nihilego), boosté comme un Dominant. Fuis : il ne peut pas être capturé et s'en va après 5 tours.",
          "CT29 ensuite."
        ] }
      ]
    },
    {
      nom: "Ula-Ula",
      etapes: [
        { id: "malie", titre: "Malié", lieu: "malie", points: [
          "Combat contre Tili juste après le Centre Pokémon.",
          "Boutique du Centre : CT42, 65, 69, 77 et 89. Bibliothèque : la dame à la table donne la CT76.",
          "Le dresseur au nord-est du cap ne se bat qu'après avoir lu la bouteille de la plage d'Ula-Ula.",
          "Herbe Mental : la fille à gauche de la bibliothèque, après avoir reçu une Ball au bureau Æther de Ho'ohale (3e étage, même bâtiment que Game Freak).",
          "Arène de Kanto (bâtiment au toit doré, facultative) : un Soda Cool en entrant, 10 de plus si tu bats le chef."
        ] },
        { id: "route11", titre: "Routes 10 et 11", lieu: "route11", points: [
          "Route 11 : le premier dresseur donne la CT66 après le combat.",
          "Route 10 : le Vétéran ne se bat qu'après les autres dresseurs et donne la CT95. Quelques Balls Noigrume posées sur la route ne sont pas mélangées par le randomizer."
        ] },
        { id: "observatoire", titre: "Observatoire de Hokulani (épreuve de Chrys)", lieu: "observatoire", points: [
          "Entre dans la salle à côté de l'entrée, puis ressors du bâtiment : scène. Touche les rochers du parking à côté du Centre, puis le Chrysapile en haut à gauche près du bus.",
          "Énigme des insectes (boutons à presser) : 1re : haut gauche, haut droite. 2e : bas droite, bas gauche, bas gauche. 3e : haut droite, haut gauche, bas gauche ×2, bas droite ×3. Chaque étape fait venir des Pokémon à combattre."
        ] },
        { id: "parcmalie", titre: "Parc de Malié", lieu: "parcdemalie", points: [
          "Après l'épreuve de Chrys, reviens au parc : combat contre Guzma (son premier Pokémon tiendrait un Piquants). Reviens encore pour quelques combats de plus."
        ] },
        { id: "route12", titre: "Routes 12 et 13", lieu: "route12", points: [
          "Route 12 : le dresseur aux deux Pokémon ne se bat qu'une fois toute la route battue, et donne la CT82.",
          "Route 13 : garde au moins une Eau Fraîche jusqu'après l'épreuve de Margie (Acerola). En la donnant à un homme du Désert Haina (après avoir parlé au Pokémon de la chambre au nord-est du motel), tu récupères 10 Eaux Fraîches plus tard dans sa chambre."
        ] },
        { id: "route14", titre: "Route 14 et Supermarché abandonné (épreuve de Margie)", lieu: "route14", points: [
          "Le phare en mer est bloqué par une scène avec Viskuse : fuis, la scène se termine quand même.",
          "Fais d'abord le début de la Route 15 (Maison Æther), puis reviens ici pour l'épreuve ; le Désert Haina s'ouvre après.",
          "Supermarché : photographie les Pokémon dans le bâtiment. Une fausse Margie essaie de te faire partir : refuse, sinon l'épreuve recommence.",
          "Comme à la Grotte Verdoyante, les Pokémon sauvages n'apparaissent qu'après le Dominant."
        ] },
        { id: "route15", titre: "Route 15 et Maison Æther", lieu: "route15", points: [
          "Avant l'épreuve de Margie : entre dans la Maison Æther pour la débloquer ; un combat en entrant et un autre en sortant. Deux dresseurs à l'ouest sont aussi accessibles.",
          "Après l'épreuve : soigne-toi et retourne à la Maison Æther. Combat contre Apocyne (Plumeria), puis Pieris (Grimsley) te donne Sharpedo Jet sur la plage, qui permet de passer les rochers au sud.",
          "Sharpedo Jet débloque aussi une CT dans la mer de Mele-Mele, à l'ouest."
        ] },
        { id: "route16", titre: "Route 16 et Jardin d'Ula-Ula", lieu: "route16", points: [
          "Combat contre un sbire Skull au Centre Pokémon : un Lait Meumeu après.",
          "L'arrière de la caravane s'atteint en passant par derrière.",
          "Le Golfeur à l'entrée du Jardin ne se bat qu'après tous les autres dresseurs du jardin ; ses deux Pokémon tiennent un Orbe Flamme, et il t'en donne un.",
          "Lac de la Lune (en haut à droite du jardin) : seulement une CT."
        ] },
        { id: "kokohio", titre: "Route 17, Kokohio et Manoir Chelou", lieu: "kokohio", points: [
          "Après le double devant Kokohio, Danh (Nanu) propose de t'y emmener : réponds non, sinon il t'y envoie tout de suite. Il soigne ton équipe quand tu sors du Manoir.",
          "Seul le premier dresseur de Kokohio est obligatoire avant Guzma.",
          "Deux dresseurs ne se battent qu'après Guzma ; celui du nord-ouest donne un Guérison. Tous les autres partent après.",
          "Mots de passe du Manoir (donnés en anglais dans le guide, à vérifier dans ta version) : Poison Jab (Direct Toxik), Bounsweet (Croquine), Tapu Cocoa (Tapu Cacao), non."
        ] },
        { id: "danh", titre: "Fin d'Ula-Ula : Gladio et Danh", lieu: "kokohio", points: [
          "Combat contre Gladio (Gladion), puis grande épreuve contre Danh, qui soigne ton équipe après."
        ] },
        { id: "aether2", titre: "Paradis Æther (2e visite)", lieu: "paradisther", points: [
          "L'objet au nord du sous-sol 1 était déjà là la première fois : s'il n'y est plus, tu l'as pris.",
          "Wicke soigne ton équipe plusieurs fois : après le sous-sol 2, entre les combats en duo et autour du combat contre Elsa-Mina (Lusamine).",
          "Tous les combats doubles sont en duo avec Tili ou Gladio ; les trois derniers s'enchaînent sans pause.",
          "Après Danh, 9 objets cachés apparaissent autour d'Ekaeka (en Kaizo, seulement accessibles après le Paradis)."
        ] }
      ]
    },
    {
      nom: "Poni et la Ligue",
      etapes: [
        { id: "flottant", titre: "Village Flottant", lieu: "villageflottant", points: [
          "Boutique : CT04, 14, 15, 22, 25, 34, 38, 52, 68 et 71."
        ] },
        { id: "poni", titre: "Côte, vieille route et île aux Noadkoko", lieu: null, points: [
          "La dresseuse à la Ceinture Force ne se bat qu'après tous les autres dresseurs du coin ; tous ses Pokémon tiennent une Ceinture Force, et elle t'en donne une.",
          "Dormir dans le lit de Paulie (Hapu) : Miaouss te laisse un autre Réveil.",
          "Le livre vert en bas à gauche de la bibliothèque, puis la grand-mère de Paulie : une Écaille Cœur.",
          "Île aux Noadkoko : parle aux Noadkoko pour avancer ; tu peux fuir les combats sauvages qu'ils lancent."
        ] },
        { id: "canyon", titre: "Grand Canyon de Poni", lieu: "grandcanyondeponi", points: [
          "En Soleil, combat contre Paulie à l'entrée du canyon.",
          "Lilie soigne ton équipe avant la première grotte, au pont après la deuxième grotte, avant et après l'épreuve, et à chaque fois que tu lui parles."
        ] },
        { id: "autel", titre: "Autel du Soleil et Ultra-Dimension", lieu: null, points: [
          "Capture Solgaleo avec la Master Ball, puis entre dans le passage.",
          "Combat contre Elsa-Mina : ses Pokémon sont boostés comme des Dominants."
        ] },
        { id: "paulie", titre: "Grande épreuve de Paulie", lieu: null, points: [
          "Retourne sur l'île aux Noadkoko pour combattre Paulie."
        ] },
        { id: "lanakila", titre: "Mont Lanakila", lieu: "montlanakila", points: [
          "Gladio se bat au milieu de la première zone et donne un PP Max après.",
          "En Soleil, le seul autre combat est contre Tili tout en haut."
        ] },
        { id: "ligue", titre: "Ligue Pokémon", lieu: "liguepokemon", points: [
          "Conseil 4 en Soleil : Pectorius, Alyxia, Margie et Kahili, dans l'ordre que tu veux (Molène n'y est que dans Ultra).",
          "En Soleil, le Maître est le professeur Euphorbe (Kukui), pas Tili.",
          "Après la Ligue, la run Kaizo est finie ; la suite (Ultra-Chimères avec Bellocchio) est en bonus."
        ] }
      ]
    }
  ]
};
