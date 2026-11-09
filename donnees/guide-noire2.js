// Guide de run Kaizo pour Noire 2, étape par étape.
// D'après le « Pokémon Black 2 Kaizo Ironmon Guide » de Kaiya KC (cartes et relecture : OnlySpaghettiCode ;
// mode Challenge : Pride), réécrit en français. Les niveaux des champions ne sont pas repris : ceux de la carte
// viennent de la ROM Kaizo. Les objets ramassés au sol restent anonymes (esprit Kaizo) ; seuls les objets
// DONNÉS par des personnages sont cités. « lieu » = un lieu de donnees/noire2.js (bouton « Voir sur la carte »).
window.GUIDES = window.GUIDES || {};
GUIDES.noire2 = {
  titre: "Guide de la run Noire 2",
  source: {
    nom: "Pokémon Black 2 Kaizo Ironmon Guide",
    auteur: "Kaiya KC (avec OnlySpaghettiCode et Pride)",
    url: ""
  },
  adapte: "réécrit en français pour la carte",
  intro: "Les étapes de la run dans l'ordre conseillé par l'auteur : où changer de Pokémon, quels combats sont obligatoires ou évitables, ce que les personnages donnent. Coche une étape quand elle est faite.",
  avertissement: "Le guide d'origine est fait pour Noire 2 : Blanche 2 diffère par endroits (Route 4, combat de Charles). Si un détail ne colle pas avec ton jeu, fie-toi au jeu.",
  regles: [
    "Enregistre les objets utiles (bouton Select dans le sac) : Cherch'Objet, Bicyclette. Range les Repousses dans la poche libre pour les trouver vite.",
    "Pokéwood impose une sauvegarde. Pour effacer une ancienne sauvegarde depuis l'écran titre : Select + B + Haut.",
    "Saison conseillée : l'automne (mars, juillet, novembre) donne plus d'objets au début et dans les Égouts de Volucité. Le dimanche soir est idéal pour Royal Unys.",
    "Dans BizHawk : NDS › Settings › Sync Settings. « Use Real Time » suit l'heure de l'ordinateur ; sinon le jeu démarre à l'« Initial time ». La nature du Pokémon dépend de l'horloge : évite de toujours partir de la même heure.",
    "Combats Rotatifs et Triples : il faut 3 Pokémon ; Duos : 2. Avec moins de Pokémon dans l'équipe, ils sont évités (sauf Charles au Pont Yoneuve et les Triples de l'Arène de Janusia, obligatoires).",
    "Éleveurs : ils te redéfient à chaque passage, ce qui compte comme une revanche interdite. Contourne-les : le guide indique un chemin pour presque chacun.",
    "Fausses Poké Balls : à partir de la Route 6, certaines balles au sol lancent un combat sauvage. Elles ne sont pas des objets.",
    "Super Bonbons : garde-les plutôt pour la fin, sauf vers le niveau 75 avant la 7e Arène. Utilise-les sur les niveaux impairs, qui demandent plus d'expérience.",
    "Mode Challenge : dresseurs plus malins, équipes plus fournies, niveaux augmentés (+1 jusqu'à Strykna, +2 jusqu'à Bardane, +3 jusqu'à Watson, +4 ensuite). L'auteur le déconseille."
  ],
  parties: [
    {
      nom: "Départ et premier badge",
      etapes: [
        { id: "pavonnay-debut", titre: "Pavonnay : premier combat de rival", lieu: "pavonnay", points: [
          "Matis t'affronte avec un seul Pokémon. Son IA ne cherche pas toujours le K.O. : elle lance souvent des attaques de statut quand tes PV sont bas."
        ] },
        { id: "route19", titre: "Route 19", lieu: "route19", points: [
          "Très bon endroit pour changer de Pokémon : avant tout dresseur, jusqu'au niveau 6.",
          "Même avec un bon starter, ça vaut le coup de regarder ce qu'on y trouve."
        ] },
        { id: "amaillide", titre: "Amaillide", lieu: "amaillide", points: [
          "Une Potion t'attend chez l'homme de la maison à côté du Centre Pokémon."
        ] },
        { id: "route20-1", titre: "Route 20 (premier passage)", lieu: "route20", points: [
          "Les deux premiers dresseurs sont obligatoires ; le troisième peut attendre.",
          "Possible pour changer de Pokémon, mais seulement si le Ranch d'Amaillide est décevant : niveau 6 rare et tu y arrives après deux dresseurs."
        ] },
        { id: "ranch", titre: "Ranch d'Amaillide", lieu: "ranchdamaillide", points: [
          "Ce n'est pas un donjon, et c'est le meilleur endroit du jeu pour changer de Pokémon (7 choix). Grâce au rattrapage d'expérience de la 5G, un niveau 8 suffit en général.",
          "Deuxième combat contre Matis. Une Potion t'est donnée après, et un sbire Plasma donne la CT21."
        ] },
        { id: "pavonnay-arene", titre: "Retour à Pavonnay : Goyah et l'Arène", lieu: "pavonnay", points: [
          "Chez Goyah : 2 enfants à battre (il te soigne entre les deux) pour 5 Baies Oran.",
          "Arène : un enfant donne une Défense Spé. Tcheren donne la CT83, la CT d'Arène. Avec le patch d'intro tu reçois une seconde CT : seule la CT83 compte comme CT d'Arène en Kaizo.",
          "Les Repousses sont maintenant en vente : fais-en un bon stock."
        ] }
      ]
    },
    {
      nom: "Ondes-sur-Mer",
      etapes: [
        { id: "route20-2", titre: "Route 20 : le premier choix", lieu: "route20", points: [
          "Besoin de changer encore de Pokémon ? Évite tout et file vers la zone industrielle au sud d'Ondes-sur-Mer : ce sont les dernières vraies options.",
          "Sinon, bats-toi pour l'expérience : tous les dresseurs sauf le premier sont évitables, et le Duo l'est avec un seul Pokémon.",
          "Le bâtiment de passage donne des Super Balls ; 3 Baies Pêcha sont aussi données sur la route."
        ] },
        { id: "ondes", titre: "Ondes-sur-Mer", lieu: "ondessurmer", points: [
          "Ramasse le butin de la ville.",
          "Dernière chance (médiocre) de changer de Pokémon si la zone industrielle n'a rien donné."
        ] },
        { id: "zi-ondes", titre: "Z.I. d'Ondes-sur-Mer", lieu: "zidondessurmer", points: [
          "Parle d'abord à l'homme au nord, sinon les ouvriers refusent de se battre.",
          "Le scientifique donne un Éther si tu lui parles 3 fois ; la CT94 est aussi donnée sur place.",
          "Attention en Kaizo : reparler à l'homme du nord après tous les ouvriers donne une CT, ce qui peut te faire perdre l'Écaille Cœur presque gratuite de Port Yoneuve.",
          "Vraie dernière occasion de changer de Pokémon : herbe claire, herbe sombre et herbe qui bouge."
        ] },
        { id: "arene-ondes", titre: "Arène d'Ondes-sur-Mer : Strykna", lieu: "arenedondessurmer", points: [
          "Le guide de l'entrée te donne une Eau Fraîche.",
          "Strykna peut être très facile ou très méchante selon son équipe. Elle donne la CT09."
        ] },
        { id: "ondes-suite", titre: "Coupe, Pokéwood et Route 20", lieu: "pokewood", points: [
          "Aux docks, bats un sbire Plasma : CS Coupe (elle ouvre un objet de plus dans la zone industrielle).",
          "Pokéwood (avec le patch d'intro) : accepte le tournage, perds ou gagne contre Zhu, peu importe. Sauvegarde quand on te le demande, sinon tu refais le combat.",
          "Au théâtre, le randonneur veut savoir la fin du film : dis-lui que tu as gagné. Il donne 5 Limonades, puis une Eau Fraîche si tu lui reparles.",
          "Retourne sur la Route 20 battre le sbire Plasma près de l'entrée d'Amaillide, puis prends le bateau aux docks pour Volucité."
        ] }
      ]
    },
    {
      nom: "Volucité",
      etapes: [
        { id: "volucite", titre: "Volucité : la récolte", lieu: "volucite", points: [
          "Vélo dès l'arrivée. Ordre libre ; voici celui du guide.",
          "Lait Meumeu au café de la ruelle étroite, une baie au studio si tu montres le bon type, un soda au centre de sondage (enchaîne les questionnaires).",
          "Trouve les 3 clowns pour un Super Bonbon : centre de sondage, 1er étage du bâtiment des Badges (rue de l'Arène), rez-de-chaussée de la Compagnie de Combat (pas de dresseurs à ce niveau).",
          "Mode Ultimate : plusieurs CT et objets donnés dans les immeubles (rockeur du 11e en face de Game Freak, fillette du 47e au nord, homme de la ruelle étroite…).",
          "Bianca te donne le Cherch'Objet dans le bâtiment de passage vers la Route 4."
        ] },
        { id: "route4-1", titre: "Route 4 (première partie)", lieu: "route4", points: [
          "Quelques dresseurs pour l'expérience.",
          "L'Éleveuse de la route principale te redéfie à chaque passage : longe le randonneur par la gauche pour passer sans être vu."
        ] },
        { id: "gamefreak", titre: "Game Freak, 22e étage", lieu: "volucite", points: [
          "Donjon facultatif : 2 dresseurs. L'un a des Baies Oran et une Super Potion, l'autre des Restes et une Super Potion.",
          "N'oublie pas l'objet sous le bureau de gauche."
        ] },
        { id: "compagnie", titre: "Compagnie de Combat", lieu: "volucite", points: [
          "Facultative, et plus facile que les autres donjons du coin.",
          "Multi Exp au 1er étage ; Chrono Ball, Rapide Ball et un objet tenu donnés au 47e."
        ] },
        { id: "egouts", titre: "Égouts de Volucité", lieu: "egoutsdevolucite", points: [
          "Va d'abord voir le guide devant l'Arène : Iris t'emmène aux égouts.",
          "Matis te suit au début : en Kaizo, file droit au Duo contre la Team Plasma sans toucher aux autres dresseurs. Il te soigne ensuite.",
          "Ne combats pas le médecin. N'entre pas dans la grotte d'où sort Nikolaï : c'est le Chemin Enfoui, pour plus tard.",
          "Beaucoup d'objets cachés ne sont pas encore accessibles (le Cherch'Objet sonne sans arrêt) : on reviendra après Surf."
        ] },
        { id: "royal", titre: "Royal Unys", lieu: "volucite", points: [
          "Seulement le soir : 17 h-18 h 59 en hiver, 17 h-19 h 59 au printemps et en automne, 19 h-20 h 59 en été.",
          "5 minutes pour battre tous les dresseurs ; seul le temps passé à marcher compte (lis le guide pendant un dialogue).",
          "Les employés près de la première salle bleue (gauche) et rouge (droite) disent où sont les dresseurs. Les supporters en orange ne sont jamais des dresseurs ; les bonnes le sont toujours.",
          "Nombre de dresseurs selon le jour : 3 le mardi, 4 les lundi, mercredi et vendredi, 5 le jeudi, 6 le samedi, 7 le dimanche. Petite récompense en semaine, Super Bonbon le dimanche.",
          "Pour abandonner, parle à l'homme de l'entrée : pas de récompense et les dresseurs restants sont perdus."
        ] },
        { id: "arene-volucite", titre: "Arène de Volucité : Artie", lieu: "arenedevolucite", points: [
          "Premier vrai mur : presque tous les Pokémon sont évolués et les PP comptent. Pense à l'Eau Fraîche du guide.",
          "Artie utilise une Hyper Potion et donne la CT76."
        ] }
      ]
    },
    {
      nom: "Méanville et le désert",
      etapes: [
        { id: "route4-2", titre: "Route 4 (deuxième partie)", lieu: "route4", points: [
          "Achète des Super Repousses avant. Évite toujours l'Éleveuse.",
          "Nikolaï t'attend près du mur et donne une Protéine.",
          "Une ceinture noire donne 33 Baies Sitrus dans le bâtiment de gauche."
        ] },
        { id: "meanville", titre: "Méanville", lieu: "meanville", points: [
          "N'entre pas encore dans les stades : ils valent mieux après la 7e Arène.",
          "Garde le dresseur de la Grande Roue pour après le désert, et ceux du Métro de Combat pour juste avant l'Arène.",
          "Donnés : 10 Tessons Jaunes (homme du Centre Pokémon), CT49 (théâtre musical), un objet clé dont un dresseur de la Route 5 a besoin, Pierre Soleil et Grelot Zen (maisons au nord du Centre).",
          "La boutique secondaire du Centre vend 4 CT."
        ] },
        { id: "desert", titre: "Désert Délassant", lieu: "desertdelassant", points: [
          "Plus facile que les Routes 5 et 16 : fais-le d'abord.",
          "Bats l'infirmière en premier (seul moment où combattre une soigneuse est permis).",
          "Les deux Rangers donnent une baie chacun, et un autre objet est donné dans le désert."
        ] },
        { id: "route5", titre: "Route 5", lieu: "route5", points: [
          "Bianca donne la CS Vol et montre les Trouées Cachées.",
          "Le Duo voit de très loin : méfie-toi. Le Ranger donne une Baie Kika."
        ] },
        { id: "route16", titre: "Route 16", lieu: "route16", points: [
          "Le Duo voit lui aussi de loin : évite-le en longeant le mur du bas au début.",
          "Eau Fraîche donnée dans le pavillon du pont."
        ] },
        { id: "bois", titre: "Bois des Illusions", lieu: "boisdesillusions", points: [
          "Un Éleveur parmi les dresseurs : attention en revenant.",
          "Deux Rangers donnent chacun une baie (dont une Baie Kika). Une Trouée Cachée est au nord du Ranger à la Baie Kika.",
          "Ignore le Cherch'Objet : les objets du haut de la cascade viendront plus tard."
        ] },
        { id: "chateau", titre: "Château Enfoui", lieu: "chteauenfoui", points: [
          "Donjon facultatif, pas difficile sur le papier, mais il a déjà coûté des runs à l'auteur."
        ] },
        { id: "montagnes", titre: "Ancienne Arène de Méanville (montagnes russes)", lieu: "meanville", points: [
          "Obligatoire : va au fond (où se tenait Inezia dans Noire) pour un Anti-Para et ouvrir la nouvelle Arène.",
          "Si ce n'est pas fait, va voir le randonneur devant la Grande Roue."
        ] },
        { id: "rotombourg", titre: "Rotombourg", points: [
          "En chemin, un Duo avec un allié : il peut mal tourner si les deux adversaires visent ton Pokémon.",
          "Super Bonbon dans la maison en bas à droite.",
          "Le week-end, l'homme d'affaires à droite du pont échange un Morceau d'Étoile contre un PP Plus."
        ] },
        { id: "arene-meanville", titre: "Arène de Méanville : Inezia", lieu: "arenedemeanville", points: [
          "Fais avant les Duos évités : l'écart de niveau est faible ici. Le guide donne l'Eau Fraîche tout seul.",
          "Inezia utilise une Hyper Potion sur le premier Pokémon dans le rouge, et donne la CT72."
        ] }
      ]
    },
    {
      nom: "Port Yoneuve et Parsemille",
      etapes: [
        { id: "pont-yoneuve", titre: "Sortie de Méanville et Pont Yoneuve", lieu: "route5", points: [
          "Deux sbires Plasma d'affilée à la sortie de la ville.",
          "Charles bloque le pont : il FAUT 3 Pokémon. Combat Rotatif en Noire 2 (Triple en Blanche 2). Capture un 3e Pokémon sur la Route 5 ou 16 si besoin.",
          "Les ombres qui volent sur le pont donnent des Ailes : elles ne sont pas aléatoires, inutile de t'y attarder."
        ] },
        { id: "portyoneuve", titre: "Port Yoneuve", lieu: "portyoneuve", points: [
          "Écaille Cœur au 1er étage de la maison au sud-ouest si tu montres la capacité demandée ; Ceinture Pro (homme à lunettes du marché) ; Grelot Coque dans la première maison où tu peux entrer ; Ballon dans la maison du maître des capacités au nord du marché.",
          "Charles peut être recombattu ici (l'autre type de combat).",
          "Carmine, dans la maison au nord, est obligatoire. Il te propose un Pokémon (tu peux refuser)."
        ] },
        { id: "route6", titre: "Route 6", lieu: "route6", points: [
          "8 dresseurs pour te préparer. L'Éleveuse s'évite en longeant le mur de gauche.",
          "Un Pokémon est donné au centre météo, une Pierre Éclat dans la maison de soins, une baie par un Ranger. Trouée Cachée juste au nord de l'Éleveuse.",
          "Les balles au sol qui ne sont pas des objets sur la carte sont des fausses.",
          "N'entre pas encore dans la Grotte Électrolithe."
        ] },
        { id: "arene-portyoneuve", titre: "Arène de Port Yoneuve : Bardane", lieu: "arenedeportyoneuve", points: [
          "Arène énorme où l'on se perd facilement : surveille tes PP, prends l'Eau Fraîche et bats bien les 7 dresseurs.",
          "Bardane utilise une Hyper Potion et donne la CT78."
        ] },
        { id: "pwt", titre: "PWT et Frégate Plasma (1re fois)", lieu: "pwt", points: [
          "Les combats du PWT sont au niveau 25 : simple formalité. Finale contre Nikolaï.",
          "Le professeur des capacités oubliées (stand de gauche) demande des Écailles Cœur. L'ouvrier de l'entrepôt frigorifique, à l'est, donne un objet tenu.",
          "Pas encore le Chemin Enfoui : il faut Surf.",
          "Frégate Plasma : donjon dur, tout est obligatoire, avec des combats à deux contre deux."
        ] },
        { id: "surf-debut", titre: "Surf et retour au début du jeu", lieu: "route19", points: [
          "Récupère Surf au centre météo de la Route 6. Repasse en automne si tu as changé de saison.",
          "Routes 19 et 20 : objets accessibles avec Surf ; sur la Route 20, les Rangers d'automne donnent une Baie Sitrus et deux autres baies.",
          "Trouée Cachée vers la fin du labyrinthe du Ranch d'Amaillide, puis un objet au nord-ouest du Centre d'Ondes-sur-Mer (absent de certaines cartes, mais bien là)."
        ] },
        { id: "grotte-parsemille", titre: "Route 6 avec Surf et Grotte Parsemille", lieu: "grotteparsemille", points: [
          "Route 6 : objets accessibles avec Surf, scène avec Cobaltium, Trouée Cachée juste avant la grotte.",
          "Grotte Parsemille : sombre, facultative, dresseurs forts et malins. Un seul est nécessaire pour ouvrir le gros du donjon."
        ] },
        { id: "chemin-enfoui", titre: "Chemin Enfoui", lieu: "cheminenfoui", points: [
          "Donjon facultatif, 10 dresseurs. N'oublie pas la partie qui ressemble au Château Enfoui : quelques objets.",
          "Au printemps ou en été, les Égouts de Volucité (vus comme la suite du même donjon, sans soin entre les deux) donnent encore objets et dresseurs. Les 3 derniers dresseurs se font d'affilée, à la fin, pour un objet unique.",
          "Le scientifique des égouts donne au hasard un Antidote, un Total Soin ou un Guérison."
        ] },
        { id: "electrolithe", titre: "Grotte Électrolithe", lieu: "grotteelectrolithe", points: [
          "Très long et dangereux, mais aucun combat obligatoire et aucun objet derrière un dresseur.",
          "Laisse tes autres Pokémon au PC : sans 3 Pokémon, les deux pires combats (Rotatif et Triple) disparaissent.",
          "Le médecin du sous-sol est interdit en Kaizo. Les Rangers donnent des baies ; une Pépite et une Grosse Pépite sont aussi données."
        ] },
        { id: "parsemille", titre: "Parsemille", lieu: "parsemille", points: [
          "Deux objets faciles à rater : la CT sous l'avion-cargo, la balle entre les serres au sud de la piste. Un objet caché est dans une poubelle du bâtiment au sud-est.",
          "Donnés : PV Plus (maison à côté du PC, plus si tu as des CT), Master Ball (la professeure), Bec Pointu (vétéran du hangar), 5 Filet Balls (employée du hangar si tu as un Pokémon Vol ou Psy)."
        ] },
        { id: "route7", titre: "Route 7", lieu: "route7", points: [
          "Beaucoup de dresseurs, dont des Duos et Triples dangereux : viens sans ami-CS.",
          "Évite l'Éleveur des hauteurs par les hautes herbes ou les ponts ; les passerelles évitent le Duo.",
          "Deux fausses balles. Trouée Cachée à côté de la maison à l'ouest."
        ] },
        { id: "tour-cieux", titre: "Tour des Cieux", lieu: "tourdescieux", points: [
          "Parle à la professeure au rez-de-chaussée : un engrais, et surtout ça ouvre la suite après l'Arène.",
          "Aucun dresseur obligatoire, mais quelques passages risqués devant des CT. Le médecin du 3e est interdit en Kaizo."
        ] },
        { id: "arene-parsemille", titre: "Arène de Parsemille : Carolina", lieu: "arenedeparsemille", points: [
          "Eau Fraîche au début. Les canons à vent demandent juste un peu de patience.",
          "Carolina utilise une Hyper Potion et donne la CT62."
        ] }
      ]
    },
    {
      nom: "Vers Janusia",
      etapes: [
        { id: "arpentieres", titre: "Arpentières", lieu: "arpentieres", points: [
          "Avion depuis le hangar de Parsemille (le garçon d'à côté signale une CT au bord sud de la piste).",
          "Un objet tenu donné par la vieille dame du Centre, CT57 dans la maison au sud-ouest. Le maître des capacités à Tesson Bleu est ici."
        ] },
        { id: "renenvers", titre: "Mont Renenvers", lieu: "montrenenvers", points: [
          "Dehors : une CT en haut à gauche du Manoir de l'Étrange (manoir à garder pour plus tard).",
          "Dedans : Bianca te soigne mais impose un Duo. En Kaizo, dès qu'elle te rejoint, file à droite vers la sortie (deux Techniciens forcés en route), parle-lui, puis reviens faire le reste.",
          "Un seul Duo est obligatoire ; les Triples et Rotatifs ont des trajets fixes. Les Rangers donnent des Baies Kika ; deux objets sont dehors près de la sortie."
        ] },
        { id: "vaguelone", titre: "Vaguelone", lieu: "vaguelone", points: [
          "Matis t'attend à la sortie nord : fais d'abord la baie et la Route 14.",
          "Un homme du Centre Pokémon donne une Bel'Écaille."
        ] },
        { id: "baie", titre: "Baie Vaguelone", lieu: "baievaguelone", points: [
          "Zone de Surf avec 6 dresseurs. Pas encore la Grotte Littorale."
        ] },
        { id: "route14", titre: "Route 14", lieu: "route14", points: [
          "Deux Triples : l'un est un passage risqué, l'autre s'évite par l'herbe (ou viens sans 3 Pokémon).",
          "Le Cherch'Objet s'affole : ces objets demandent Cascade, pour plus tard."
        ] },
        { id: "route13", titre: "Route 13", lieu: "route13", points: [
          "Très longue. L'ami-CS est utile pour plusieurs objets.",
          "Les deux Rangers (Baies Sitrus) sont des Triples : mieux vaut revenir plus tard. Un objet tenu est aussi donné sur la route."
        ] },
        { id: "entrelasque", titre: "Entrelasque", lieu: "entrelasque", points: [
          "Duo obligatoire avec Matis contre la Team Plasma.",
          "Un objet « visible » est en fait dans une maison tout au nord-est. La boutique secondaire vend 3 CT."
        ] },
        { id: "route12", titre: "Route 12", lieu: "route12", points: [
          "Bon moment pour utiliser des Super Bonbons (niveaux impairs) avant la 7e Arène.",
          "Le Duo peut être évité, pour l'instant ou pour toujours."
        ] },
        { id: "pont-hameau", titre: "Pont du Hameau", lieu: "pontduhameau", points: [
          "Pour tout éviter : passe au sud, esquive les joueurs de tennis (trajet fixe), traverse à la nage et sors à l'ouest. Aucun objet n'exige de combat.",
          "Interromps l'entraînement du chanteur sous le pont : la fille du pont donne 5 Baies Sitrus.",
          "L'homme qui bloque le pont et les joueurs de tennis peuvent attendre après la Route 9."
        ] },
        { id: "route11", titre: "Route 11", lieu: "route11", points: [
          "L'Éleveuse s'évite par le bas du pont. Le Ranger donne une baie.",
          "Beaucoup d'objets demandent Cascade."
        ] },
        { id: "janusia", titre: "Janusia", lieu: "janusia", points: [
          "Boule Fumée dans la maison à côté de l'Arène, et deux objets tenus chez Watson."
        ] },
        { id: "route9", titre: "Route 9 et Centre Commercial", lieu: "route9", points: [
          "Un objet est gardé par le Duo. Trouée Cachée à l'ouest du centre commercial.",
          "Centre Commercial : petit donjon facultatif ; son rayon vend 2 CT."
        ] },
        { id: "manoir", titre: "Manoir de l'Étrange", lieu: "manoirdeletrange", points: [
          "Facultatif : les salles changent à chaque passage par la bibliothèque. Visite tout ce qui est ouvert à chaque fois.",
          "Une Plume Lune est donnée."
        ] },
        { id: "arene-janusia", titre: "Arène de Janusia : Watson", lieu: "arenedejanusia", points: [
          "Les Triples sont obligatoires et ont tué beaucoup de runs : viens avec deux amis-CS et fais le Rotatif (à gauche au 3e) en premier.",
          "Au 2e étage : à gauche, le 2e Pokémon tient un Casque Brut ; à droite, il tient un Joyau Dragon.",
          "Astuce : déposer tes amis-CS au PC et les reprendre les soigne sans soigner ton Pokémon principal. Utile aussi pour t'en débarrasser plus tard.",
          "Watson utilise une Hyper Potion et donne la CT82."
        ] }
      ]
    },
    {
      nom: "Team Plasma et 8e badge",
      etapes: [
        { id: "janusia-gelee", titre: "Janusia gelée", lieu: "janusia", points: [
          "La Team Plasma gèle la ville : sols glissants et 5 combats (3 sbires, 2 admins).",
          "Soin offert par le scénario après Lilien, près de l'Arène."
        ] },
        { id: "papeloa", titre: "Papeloa (par l'Aquatube)", lieu: "papeloa", points: [
          "La dame à l'ombrelle à la sortie de l'Aquatube donne la CT42. Un Technicien de l'Aquatube donne une Boue Noire si ton Pokémon tient un Pic Venin.",
          "Un objet n'est pas sur toutes les cartes : près du bateau blanc au nord-ouest. Un objet caché est dans la maison au sud-ouest.",
          "Essaie d'entrer dans la première maison sur l'eau : Amana sort de l'eau et rejoint son Arène."
        ] },
        { id: "route21", titre: "Route 21", lieu: "chenal21", points: [
          "7 dresseurs. La sortie sud mène à la Grotte Littorale : pas avant que le scénario le demande."
        ] },
        { id: "route22", titre: "Route 22", lieu: "route22", points: [
          "Bon moment pour les Super Bonbons. Pas encore la Grotte Cyclopéenne au bout.",
          "Les balles absentes de la carte sont fausses (une sous une passerelle près du dernier randonneur). Trouée Cachée tout au nord-est."
        ] },
        { id: "stades", titre: "Stades de Méanville", lieu: "meanville", points: [
          "Deux donjons facultatifs de 4 combats (3 seuls, 1 Duo). Chaque athlète donne une Hyper Potion.",
          "Les équipes changent avec l'heure, le jour et la saison. Stade fermé pendant un match : décale l'horloge de quelques heures."
        ] },
        { id: "arene-papeloa", titre: "Arène de Papeloa : Amana", lieu: "arenedepapeloa", points: [
          "Beaucoup de dresseurs mais aucun combat multiple. Eau Fraîche à l'entrée.",
          "Amana donne la CT55."
        ] },
        { id: "littorale", titre: "Grotte Littorale et Frégate Plasma", lieu: "grottelittorale", points: [
          "Prends d'abord l'appareil de Nikolaï sur la Route 22, sinon tu restes bloqué au fond de la grotte.",
          "Grotte et frégate forment un seul gros donjon, sans soin entre les deux. Obligatoire : 4 combats, dont deux multiples.",
          "Les Rangers donnent des baies.",
          "Frégate : presque chaque dresseur hors trajet fixe est un passage risqué. Après le combat contre Lilien et son sbire, tu es éjecté et les dresseurs restants disparaissent."
        ] },
        { id: "cyclopeenne", titre: "Grotte Cyclopéenne", lieu: "grottecyclopeenne", points: [
          "Intérieur : quelques objets. L'extérieur sud (fermé par Force) a d'autres objets et une Trouée Cachée près des escaliers de la plage.",
          "Cratère : un dresseur, des Rappels Max donnés. Puis la frégate, encore."
        ] },
        { id: "fregate3", titre: "Frégate Plasma (la dernière)", lieu: "fregateplasma", points: [
          "Le Duo du début (6 Pokémon) se fait comme deux combats seuls si ton ami-CS est K.O. : provoque un Duo sauvage, laisse-le tomber, fuis. Sans ami-CS, tu rates 3 objets.",
          "Commence par la gauche : tous les objets avec un seul passage risqué.",
          "Mots de passe possibles : 2202, 7707, 9909, Reshiram ou Zekrom.",
          "Enchaînement obligatoire et brutal : Lilien, Nikolaï, puis le Trio de l'Ombre trois fois. Prévois soins et PP."
        ] },
        { id: "ghetis", titre: "Ghetis", lieu: "grottecyclopeenne", points: [
          "Tu dois battre le Pokémon sauvage : ça n'invalide pas la run.",
          "N te soigne avant Ghetis."
        ] },
        { id: "cratere-apres", titre: "Cratère après la Team Plasma", lieu: "grottecyclopeenne", points: [
          "Les objets sont maintenant accessibles. Trouée Cachée au sud-ouest de l'endroit où se tiennent Carmine et les anciens Plasma."
        ] },
        { id: "route23", titre: "Route 23", lieu: "route23", points: [
          "Longue route, l'écart de niveau disparaît. Les Rangers donnent des Baies Sitrus ; CT35 donnée.",
          "N donne la CS Cascade juste après le contrôle des badges (PC et point d'envol). Trouée au-dessus du début de la route."
        ] },
        { id: "cascade", titre: "Tournée avec Cascade", lieu: "route20", points: [
          "Remets l'automne : un Ranger de la Route 20 (Baie Sitrus) n'est là qu'à cette saison.",
          "Route 11 (Ranger et sa baie), Bois des Illusions et Route 14 : un dresseur et des objets chacun."
        ] },
        { id: "autel", titre: "Autel Abondance", lieu: "autelabondance", points: [
          "Derrière les cascades de la Route 14. Bas niveau, deux trouées.",
          "Le Duo est inévitable (ton ami-CS est forcément là) ; l'éviter fait rater 5 objets, une trouée et une CT."
        ] }
      ]
    },
    {
      nom: "Route Victoire et Ligue",
      etapes: [
        { id: "doubles", titre: "Avant la Route Victoire", lieu: "route23", points: [
          "Bon moment pour faire les Duos et Triples évités jusqu'ici, surtout si un niveau est proche."
        ] },
        { id: "route-victoire", titre: "Route Victoire", lieu: "routevictoire", points: [
          "La plus longue de la série : 25 combats, rival à la fin, sans médecin en Kaizo. Seuls 5 combats sont obligatoires.",
          "Itinéraire conseillé : sortie nord de la Grotte 2, traverse le noir de la Grotte 3, fonce au rival, puis reviens chercher le reste.",
          "Force obligatoire ; Surf, Coupe, Cascade et Flash ouvrent des objets ou des raccourcis. Le Duo garde une CT ; les Rangers donnent des Baies Fraive et Ceriz ; CT24 donnée."
        ] },
        { id: "ligue", titre: "Ligue Pokémon", lieu: "liguepokemon", points: [
          "Anis, Pieris, Kunz et Percila dans l'ordre que tu veux, sans aucun soin au PC pendant le défi.",
          "Puis Iris. Son 2e Pokémon tient un Orbe Vie, son dernier un Bandeau."
        ] },
        { id: "apres", titre: "Après la Ligue (facultatif)", lieu: "tourdragospire", points: [
          "Pas nécessaire pour gagner : seulement pour continuer avec ton Pokémon.",
          "N au château de la Team Plasma (suis le Zoroark dans la Route Victoire), puis Tour Dragospire et Grotte Cyclopéenne pour les légendaires.",
          "Renouet par le Pont Sagiciel, la Forêt d'Empoigne et les Routes 3, 2 et 1 : la professeure fait le bilan.",
          "Ensuite : Ruines des Abysses (Matis et Cynthia à Vaguelone), Routes 17-18 et Labo P2, Vestiges du Rêve, Veine Souterraine, Route 15 et Ville Noire, Mont Foré, Route Bardane, Goyah à Amaillide, Conseil 4 (2e fois), Tour Noire."
        ] }
      ]
    }
  ]
};
