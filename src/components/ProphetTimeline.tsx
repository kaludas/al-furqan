import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { cn } from "@/lib/utils";

interface Prophet {
  name: string;
  arabic: string;
  year: number;
  yearLabel: string;
  message: string;
  location: string;
  details: string;
  sources: string[];
}

interface Myth {
  name: string;
  year: number;
  yearLabel: string;
  civilization: string;
  description: string;
  keyTeachings: string[];
  contrast: string;
  sources: string[];
}

const prophets: Prophet[] = [
  {
    name: "Adam",
    arabic: "آدم",
    year: -4000,
    yearLabel: "~4000 av. J.-C.",
    message: "Premier homme et prophète. Message du Tawhid pur.",
    location: "Paradis → Terre",
    details: "Adam fut le premier être humain créé par Allah à partir d'argile. Il reçut la connaissance des noms de toutes choses et fut le premier à enseigner le Tawhid à ses enfants. Sa désobéissance et son repentir illustrent la miséricorde divine.",
    sources: ["Sourate Al-Baqara 2:30-37", "Sourate Al-A'raf 7:11-25", "Tafsir Ibn Kathir"]
  },
  {
    name: "Idris (Énoch)",
    arabic: "إدريس",
    year: -3500,
    yearLabel: "~3500 av. J.-C.",
    message: "Véridique prophète, élevé à un haut rang.",
    location: "Mésopotamie",
    details: "Idris est mentionné dans le Coran comme un véridique prophète élevé à un haut rang. La tradition lui attribue l'invention de l'écriture et de la couture. Il enseigna l'astronomie et les sciences à son peuple.",
    sources: ["Sourate Maryam 19:56-57", "Sourate Al-Anbiya 21:85", "Al-Bidaya wa al-Nihaya d'Ibn Kathir"]
  },
  {
    name: "Noé (Nuh)",
    arabic: "نوح",
    year: -3000,
    yearLabel: "~3000 av. J.-C.",
    message: "Appel au monothéisme pendant 950 ans. Déluge.",
    location: "Mésopotamie",
    details: "Noé prêcha le Tawhid à son peuple pendant 950 ans. Face à leur obstination dans l'idolâtrie, Allah lui ordonna de construire l'Arche. Le Déluge détruisit les mécréants et Noé devint le 'second père de l'humanité'.",
    sources: ["Sourate Nuh 71:1-28", "Sourate Hud 11:25-49", "Sahih Al-Bukhari"]
  },
  {
    name: "Hud",
    arabic: "هود",
    year: -2800,
    yearLabel: "~2800 av. J.-C.",
    message: "Envoyé au peuple de 'Ad, bâtisseurs orgueilleux.",
    location: "Sud de l'Arabie (Ahqaf)",
    details: "Hud fut envoyé au peuple de 'Ad, connu pour sa force physique et ses constructions monumentales. Ils adoraient des idoles et opprimaient les faibles. Un vent violent les anéantit après leur refus du message.",
    sources: ["Sourate Hud 11:50-60", "Sourate Al-A'raf 7:65-72", "Sourate Al-Ahqaf 46:21-26"]
  },
  {
    name: "Salih",
    arabic: "صالح",
    year: -2600,
    yearLabel: "~2600 av. J.-C.",
    message: "Envoyé aux Thamud. Miracle de la chamelle.",
    location: "Al-Hijr (Madâ'in Sâlih)",
    details: "Salih fut envoyé aux Thamud, sculpteurs de demeures dans les montagnes. Ils demandèrent un miracle et Allah fit surgir une chamelle d'un rocher. Ils la tuèrent malgré les avertissements et furent détruits par un cri.",
    sources: ["Sourate Al-A'raf 7:73-79", "Sourate Hud 11:61-68", "Sourate Ash-Shu'ara 26:141-159"]
  },
  {
    name: "Abraham (Ibrahim)",
    arabic: "إبراهيم",
    year: -2000,
    yearLabel: "~2000 av. J.-C.",
    message: "Père du monothéisme. Détruit les idoles. Bâtisseur de la Ka'ba.",
    location: "Ur → Canaan → Mecque",
    details: "Ibrahim est le 'ami d'Allah' (Khalil Allah). Il brisa les idoles de son peuple, fut jeté au feu mais sauvé miraculeusement. Avec son fils Ismaël, il reconstruisit la Ka'ba. Il incarne la soumission totale (hanif).",
    sources: ["Sourate Al-Baqara 2:124-132", "Sourate Ibrahim 14:35-41", "Sourate Al-Anbiya 21:51-73"]
  },
  {
    name: "Loth (Lut)",
    arabic: "لوط",
    year: -1900,
    yearLabel: "~1900 av. J.-C.",
    message: "Prêcha contre l'immoralité de Sodome.",
    location: "Sodome (Mer Morte)",
    details: "Neveu d'Ibrahim, Lut fut envoyé au peuple de Sodome connu pour ses pratiques immorales. Malgré ses avertissements, ils persistèrent. La ville fut renversée et détruite par une pluie de pierres.",
    sources: ["Sourate Hud 11:77-83", "Sourate Al-A'raf 7:80-84", "Sourate Al-Ankabut 29:28-35"]
  },
  {
    name: "Ismaël (Isma'il)",
    arabic: "إسماعيل",
    year: -1850,
    yearLabel: "~1850 av. J.-C.",
    message: "Patriarche des Arabes. Co-bâtisseur de la Ka'ba.",
    location: "Mecque",
    details: "Fils aîné d'Ibrahim, Ismaël fut laissé avec sa mère Hajar dans le désert de Mecque. Le miracle de Zamzam jaillit pour eux. Il aida son père à reconstruire la Ka'ba et devint l'ancêtre du Prophète Muhammad ﷺ.",
    sources: ["Sourate As-Saffat 37:100-113", "Sourate Al-Baqara 2:127-129", "Sourate Ibrahim 14:37"]
  },
  {
    name: "Isaac (Ishaq)",
    arabic: "إسحاق",
    year: -1800,
    yearLabel: "~1800 av. J.-C.",
    message: "Prophète, père de Jacob.",
    location: "Canaan",
    details: "Deuxième fils d'Ibrahim, né miraculeusement de Sarah dans sa vieillesse. Isaac perpétua le message du Tawhid et fut le père de Jacob. La lignée prophétique des Bani Israël descend de lui.",
    sources: ["Sourate Hud 11:71-73", "Sourate As-Saffat 37:112-113", "Sourate Al-Anbiya 21:72"]
  },
  {
    name: "Jacob (Ya'qub)",
    arabic: "يعقوب",
    year: -1750,
    yearLabel: "~1750 av. J.-C.",
    message: "Israël - père des douze tribus.",
    location: "Canaan → Égypte",
    details: "Aussi appelé Israël, Jacob eut douze fils qui formèrent les douze tribus d'Israël. Son histoire avec son fils Joseph illustre la patience face à l'épreuve et la confiance en Allah.",
    sources: ["Sourate Yusuf 12:1-101", "Sourate Al-Baqara 2:132-133", "Sourate Al-An'am 6:84"]
  },
  {
    name: "Joseph (Yusuf)",
    arabic: "يوسف",
    year: -1700,
    yearLabel: "~1700 av. J.-C.",
    message: "De l'esclavage au pouvoir. Interprète des rêves.",
    location: "Canaan → Égypte",
    details: "La 'plus belle des histoires' (Ahsan al-Qasas). Vendu comme esclave par ses frères, emprisonné injustement, puis devenu ministre d'Égypte grâce à son don d'interprétation des rêves. Modèle de chasteté et de pardon.",
    sources: ["Sourate Yusuf 12:1-111", "Tafsir Al-Qurtubi", "Qisas al-Anbiya d'Ibn Kathir"]
  },
  {
    name: "Job (Ayyub)",
    arabic: "أيوب",
    year: -1600,
    yearLabel: "~1600 av. J.-C.",
    message: "Patience exemplaire face aux épreuves.",
    location: "Région de l'Édom",
    details: "Job fut éprouvé dans sa santé, sa richesse et sa famille. Sa patience légendaire (sabr) face à ces afflictions en fait un modèle pour les croyants. Allah lui rendit tout au double après son épreuve.",
    sources: ["Sourate Al-Anbiya 21:83-84", "Sourate Sad 38:41-44", "Tafsir Ibn Kathir"]
  },
  {
    name: "Chou'ayb (Jéthro)",
    arabic: "شعيب",
    year: -1500,
    yearLabel: "~1500 av. J.-C.",
    message: "Prêcha l'honnêteté commerciale.",
    location: "Madyan (Nord-Ouest Arabie)",
    details: "Envoyé au peuple de Madyan, connu pour la fraude dans le commerce. Chou'ayb leur ordonna de donner la pleine mesure et de ne pas diminuer les droits des gens. Il fut aussi le beau-père de Moïse.",
    sources: ["Sourate Hud 11:84-95", "Sourate Al-A'raf 7:85-93", "Sourate Ash-Shu'ara 26:176-191"]
  },
  {
    name: "Moïse (Musa)",
    arabic: "موسى",
    year: -1400,
    yearLabel: "~1400 av. J.-C.",
    message: "Torah révélée. Libération d'Égypte. Kalim Allah.",
    location: "Égypte → Sinaï",
    details: "Moïse est le prophète le plus mentionné dans le Coran. Il parla directement à Allah (Kalim Allah), reçut la Torah, accomplit des miracles devant Pharaon (bâton, main blanche, plaies), et mena les Bani Israël hors d'Égypte.",
    sources: ["Sourate Al-Qasas 28:1-88", "Sourate Ta-Ha 20:1-135", "Sourate Al-A'raf 7:103-162"]
  },
  {
    name: "Aaron (Harun)",
    arabic: "هارون",
    year: -1400,
    yearLabel: "~1400 av. J.-C.",
    message: "Frère et assistant de Moïse.",
    location: "Égypte → Sinaï",
    details: "Frère aîné de Moïse, réputé pour son éloquence. Il fut nommé prophète pour assister Moïse face à Pharaon. Il maintint les Bani Israël pendant l'absence de Moïse au mont Sinaï.",
    sources: ["Sourate Ta-Ha 20:29-36", "Sourate Al-A'raf 7:142", "Sourate Maryam 19:53"]
  },
  {
    name: "Dhul-Kifl",
    arabic: "ذو الكفل",
    year: -1300,
    yearLabel: "~1300 av. J.-C.",
    message: "Homme de patience et de dévotion.",
    location: "Région du Levant",
    details: "Mentionné parmi les endurants dans le Coran. Son nom signifie 'celui qui a une portion/garantie'. Certains exégètes l'identifient à Ézéchiel ou à un juge pieux d'Israël.",
    sources: ["Sourate Al-Anbiya 21:85-86", "Sourate Sad 38:48", "Tafsir Ibn Kathir"]
  },
  {
    name: "David (Dawud)",
    arabic: "داود",
    year: -1000,
    yearLabel: "~1000 av. J.-C.",
    message: "Roi-prophète. Zabur (Psaumes) révélé.",
    location: "Jérusalem",
    details: "Vainqueur de Goliath dans sa jeunesse, David devint roi d'Israël. Il reçut le Zabur (Psaumes), Allah lui soumit les montagnes et les oiseaux qui chantaient Ses louanges, et il savait façonner le fer.",
    sources: ["Sourate Al-Baqara 2:251", "Sourate Sad 38:17-26", "Sourate Saba 34:10-11"]
  },
  {
    name: "Salomon (Sulayman)",
    arabic: "سليمان",
    year: -950,
    yearLabel: "~950 av. J.-C.",
    message: "Royaume sans égal. Pouvoir sur les djinns.",
    location: "Jérusalem",
    details: "Fils de David, Salomon reçut un royaume sans précédent : il comprenait le langage des animaux, commandait aux djinns et au vent. Il construisit le Temple de Jérusalem. Malgré ce pouvoir, il resta un serviteur humble d'Allah.",
    sources: ["Sourate An-Naml 27:15-44", "Sourate Sad 38:30-40", "Sourate Al-Anbiya 21:81-82"]
  },
  {
    name: "Élie (Ilyas)",
    arabic: "إلياس",
    year: -870,
    yearLabel: "~870 av. J.-C.",
    message: "Combattit le culte de Ba'al.",
    location: "Royaume d'Israël Nord",
    details: "Élie fut envoyé aux Israélites qui adoraient Ba'al. Il les invita à revenir au Tawhid et à abandonner cette idole. Son message rencontra une forte opposition mais il resta ferme.",
    sources: ["Sourate As-Saffat 37:123-132", "Sourate Al-An'am 6:85", "Tafsir Al-Qurtubi"]
  },
  {
    name: "Élisée (Al-Yasa')",
    arabic: "اليسع",
    year: -850,
    yearLabel: "~850 av. J.-C.",
    message: "Successeur d'Élie dans la prophétie.",
    location: "Royaume d'Israël",
    details: "Disciple et successeur d'Élie, Élisée poursuivit la mission de rappeler les Bani Israël au monothéisme. Il accomplit de nombreux miracles selon les traditions.",
    sources: ["Sourate Al-An'am 6:86", "Sourate Sad 38:48", "Qisas al-Anbiya"]
  },
  {
    name: "Jonas (Yunus)",
    arabic: "يونس",
    year: -800,
    yearLabel: "~800 av. J.-C.",
    message: "Prophète du poisson. Le repentir sauve.",
    location: "Ninive (Irak actuel)",
    details: "Jonas quitta son peuple en colère avant qu'Allah ne le lui permette. Avalé par un poisson géant, il invoqua Allah dans les ténèbres. Son peuple se repentit et fut sauvé, unique exemple d'un peuple entier épargné après l'avertissement.",
    sources: ["Sourate Yunus 10:98", "Sourate As-Saffat 37:139-148", "Sourate Al-Anbiya 21:87-88"]
  },
  {
    name: "Zacharie (Zakariya)",
    arabic: "زكريا",
    year: -100,
    yearLabel: "~100 av. J.-C.",
    message: "Père de Jean, gardien de Marie.",
    location: "Jérusalem",
    details: "Prêtre âgé et gardien de Maryam (Marie), Zacharie invoqua Allah pour avoir un héritier. Allah lui accorda Yahya (Jean) malgré son âge avancé et la stérilité de son épouse. Il fut martyrisé selon certaines traditions.",
    sources: ["Sourate Maryam 19:2-11", "Sourate Al-Imran 3:37-41", "Sourate Al-Anbiya 21:89-90"]
  },
  {
    name: "Jean (Yahya)",
    arabic: "يحيى",
    year: -5,
    yearLabel: "~5 av. J.-C.",
    message: "Ascète, confirmateur de Jésus.",
    location: "Palestine",
    details: "Fils de Zacharie, Yahya reçut la sagesse dès l'enfance. Il était tendre, pur et pieux. Il confirma 'Issa (Jésus) comme le Messie et fut martyrisé pour avoir dénoncé l'immoralité du roi.",
    sources: ["Sourate Maryam 19:12-15", "Sourate Al-Imran 3:39", "Sourate Al-Anbiya 21:90"]
  },
  {
    name: "Jésus ('Issa)",
    arabic: "عيسى",
    year: 0,
    yearLabel: "~1 apr. J.-C.",
    message: "Messie. Évangile révélé. Miracles. Rappel du Tawhid.",
    location: "Palestine",
    details: "'Issa est le Messie (Al-Masih), né miraculeusement de la Vierge Marie. Il parla au berceau, guérit les aveugles et les lépreux, ressuscita les morts par la permission d'Allah. Il n'est pas mort sur la croix mais fut élevé au ciel.",
    sources: ["Sourate Al-Imran 3:45-55", "Sourate Maryam 19:16-36", "Sourate An-Nisa 4:157-158"]
  },
  {
    name: "Muhammad ﷺ",
    arabic: "محمد",
    year: 610,
    yearLabel: "610 apr. J.-C.",
    message: "Sceau des prophètes. Coran révélé. Message universel.",
    location: "Mecque → Médine",
    details: "Muhammad ﷺ est le dernier et sceau des prophètes. Orphelin devenu le plus influent des hommes, il reçut le Coran par l'ange Gabriel pendant 23 ans. Son message parachève et corrige les révélations précédentes pour toute l'humanité.",
    sources: ["Sourate Al-Ahzab 33:40", "Sourate Al-Anbiya 21:107", "Sahih Al-Bukhari et Muslim"]
  },
];

const myths: Myth[] = [
  // Civilisations anciennes
  {
    name: "Mythologie Sumérienne",
    year: -4000,
    yearLabel: "~4000 av. J.-C.",
    civilization: "Mésopotamie",
    description: "Panthéon d'Anu, Enlil, Enki. Épopée de Gilgamesh. Déluge avec Utnapishtim.",
    keyTeachings: ["Polythéisme", "Dieux capricieux aux passions humaines", "Magie rituelle", "Divination par le foie"],
    contrast: "Les dieux sumériens sont multiples et imparfaits. Le Tawhid affirme un Créateur unique, parfait et transcendant.",
    sources: ["Tablettes de Nippur", "Épopée de Gilgamesh", "Enuma Elish"]
  },
  {
    name: "Religion Égyptienne Ancienne",
    year: -3500,
    yearLabel: "~3500 av. J.-C.",
    civilization: "Égypte",
    description: "Râ, Osiris, Isis, Horus. Cycle de mort et résurrection. Livre des Morts.",
    keyTeachings: ["Panthéon complexe", "Pharaon comme dieu vivant", "Magie funéraire", "Jugement par Osiris"],
    contrast: "La divinisation du Pharaon contredit directement le Tawhid où aucun humain ne peut être adoré.",
    sources: ["Textes des Pyramides", "Livre des Morts", "Textes des Sarcophages"]
  },
  {
    name: "Cultes à Mystères Égyptiens",
    year: -2500,
    yearLabel: "~2500 av. J.-C.",
    civilization: "Égypte",
    description: "Culte d'Osiris-Isis. Secrets réservés aux prêtres initiés. Rituels de momification.",
    keyTeachings: ["Savoir caché aux masses", "Initiation secrète", "Résurrection par rituels", "Magie opérative"],
    contrast: "Le savoir réservé aux prêtres vs. le Coran accessible à tous. L''Ilm universel vs. Gnose élitiste.",
    sources: ["Papyrus de Turin", "Rituels d'Abydos", "Textes d'Hermopolis"]
  },
  {
    name: "Zoroastrisme",
    year: -1500,
    yearLabel: "~1500 av. J.-C.",
    civilization: "Perse",
    description: "Ahura Mazda vs Angra Mainyu. Dualisme cosmique. Mages comme classe sacerdotale.",
    keyTeachings: ["Dualisme Bien/Mal", "Combat cosmique éternel", "Feu sacré", "Prêtrise héréditaire"],
    contrast: "Le dualisme pose deux forces égales. L'Islam affirme qu'Allah est Tout-Puissant, le mal n'étant qu'une épreuve.",
    sources: ["Avesta", "Gathas de Zarathoustra", "Bundahishn"]
  },
  {
    name: "Védisme & Brahmanisme",
    year: -1500,
    yearLabel: "~1500 av. J.-C.",
    civilization: "Inde",
    description: "Vedas, Brahmanes, système de castes. Brahman comme réalité ultime impersonnelle.",
    keyTeachings: ["Panthéon védique", "Rituels sacrificiels", "Castes sacrées", "Karma et réincarnation"],
    contrast: "Le système des castes contredit l'égalité des hommes devant Allah. L'Islam rejette l'idée d'un Dieu impersonnel.",
    sources: ["Rig Veda", "Upanishads", "Brahmanas"]
  },
  {
    name: "Mythologie Grecque",
    year: -1200,
    yearLabel: "~1200 av. J.-C.",
    civilization: "Grèce",
    description: "Zeus, Olympe, Titans. Dieux aux passions humaines. Héros demi-dieux.",
    keyTeachings: ["Polythéisme anthropomorphique", "Dieux jaloux et immoraux", "Destin (Fatum)", "Demi-dieux"],
    contrast: "Les dieux grecs mentent, trompent, commettent l'adultère. Allah est Al-Quddus (Le Saint, Le Pur).",
    sources: ["Théogonie d'Hésiode", "Iliade et Odyssée d'Homère", "Métamorphoses d'Ovide"]
  },
  {
    name: "Mystères d'Éleusis",
    year: -1000,
    yearLabel: "~1000 av. J.-C.",
    civilization: "Grèce",
    description: "Culte de Déméter et Perséphone. Initiation secrète promettant une meilleure vie après la mort.",
    keyTeachings: ["Rites secrets", "Expériences mystiques induites", "Boisson sacrée (kykeon)", "Silence imposé"],
    contrast: "L'Islam enseigne que le salut vient de la foi et des œuvres, non de rituels secrets ou d'expériences mystiques.",
    sources: ["Hymne homérique à Déméter", "Platon (Phèdre)", "Cicéron (De Legibus)"]
  },
  {
    name: "Orphisme",
    year: -600,
    yearLabel: "~600 av. J.-C.",
    civilization: "Grèce",
    description: "Culte d'Orphée et Dionysos. Cycle des réincarnations. L'âme divine prisonnière du corps.",
    keyTeachings: ["Métempsycose", "Corps = prison de l'âme", "Végétarisme rituel", "Textes sacrés secrets"],
    contrast: "L'Islam rejette la réincarnation. L'âme retourne à Allah une seule fois pour le Jugement.",
    sources: ["Tablettes d'or orphiques", "Papyrus de Derveni", "Fragments orphiques"]
  },
  {
    name: "Pythagorisme",
    year: -530,
    yearLabel: "~530 av. J.-C.",
    civilization: "Grèce",
    description: "Communauté ésotérique de Pythagore. Nombres sacrés. Transmigration des âmes.",
    keyTeachings: ["Mathématiques mystiques", "Réincarnation", "Règles alimentaires secrètes", "Silence initiatique"],
    contrast: "Les nombres ne sont pas sacrés en Islam. La création est un signe d'Allah, non une manifestation numérique.",
    sources: ["Vers d'Or pythagoriciens", "Vie de Pythagore (Jamblique)", "Fragments de Philolaos"]
  },
  {
    name: "Hermès Trismégiste",
    year: -300,
    yearLabel: "~300 av. J.-C.",
    civilization: "Égypte hellénistique",
    description: "Corpus Hermeticum. Fusion gréco-égyptienne. 'Ce qui est en bas est comme ce qui est en haut.'",
    keyTeachings: ["Syncrétisme", "Gnose élitiste", "Correspondances cosmiques", "Alchimie spirituelle"],
    contrast: "L'hermétisme mélange les traditions. L'Islam préserve la pureté du message prophétique original.",
    sources: ["Corpus Hermeticum", "Table d'Émeraude", "Asclepius"]
  },
  {
    name: "Cultes de Mithra",
    year: -100,
    yearLabel: "~100 av. J.-C.",
    civilization: "Perse → Rome",
    description: "Dieu solaire. Tauroctonie. 7 degrés d'initiation (Corax, Nymphus, Miles, Leo, Perses, Heliodromus, Pater).",
    keyTeachings: ["Hiérarchie secrète à 7 niveaux", "Banquet sacré", "Sacrifice du taureau", "Culte solaire"],
    contrast: "Les grades secrets vs. l'égalité des croyants. Le banquet mithraïque vs. la prière collective publique.",
    sources: ["Mithraea archéologiques", "Inscriptions latines", "Études de Franz Cumont"]
  },
  {
    name: "Gnosticisme",
    year: 100,
    yearLabel: "~100 apr. J.-C.",
    civilization: "Méditerranée",
    description: "Démiurge mauvais créateur du monde. Étincelle divine prisonnière. Salut par la connaissance cachée.",
    keyTeachings: ["Dualisme matière/esprit", "Démiurge ignorant", "Archontes", "Gnose secrète", "Docétisme"],
    contrast: "L'Islam rejette l'idée que la création soit mauvaise. Allah a créé le monde 'bi-l-haqq' (avec vérité).",
    sources: ["Bibliothèque de Nag Hammadi", "Évangile de Thomas", "Évangile de Philippe", "Pistis Sophia"]
  },
  {
    name: "Néoplatonisme",
    year: 250,
    yearLabel: "~250 apr. J.-C.",
    civilization: "Alexandrie",
    description: "L'Un ineffable. Émanations successives. Retour mystique à l'Un par l'extase.",
    keyTeachings: ["Hiérarchie des êtres", "Émanation (et non création)", "Extase mystique", "Théurgie"],
    contrast: "Allah crée ex nihilo, Il n'émane pas. La création est distincte du Créateur, pas une émanation de Lui.",
    sources: ["Ennéades de Plotin", "Éléments de Théologie de Proclus", "Vie de Plotin (Porphyre)"]
  },
  {
    name: "Manichéisme",
    year: 240,
    yearLabel: "240 apr. J.-C.",
    civilization: "Perse → Empire",
    description: "Mani comme 'Sceau des Prophètes'. Dualisme absolu Lumière/Ténèbres. Syncrétisme universel.",
    keyTeachings: ["Deux principes éternels", "Particules de lumière prisonnières", "Élus et Auditeurs", "Syncrétisme"],
    contrast: "Le mal n'est pas une force égale à Dieu. Allah est Al-Qahhar (Le Dominateur absolu).",
    sources: ["Manuscrits de Tourfan", "Kephalaia", "Psaumes manichéens"]
  },
  {
    name: "Ismaélisme Batiniyya",
    year: 765,
    yearLabel: "765 apr. J.-C.",
    civilization: "Monde islamique",
    description: "Interprétation ésotérique (batin) vs exotérique (zahir). Imam caché. Hiérarchie de da'is.",
    keyTeachings: ["Sens caché du Coran", "Imam infaillible", "Degrés d'initiation", "Cyclologie"],
    contrast: "Le Coran s'adresse à tous directement (mubin = clair). Pas besoin d'initié pour comprendre le message.",
    sources: ["Rasa'il Ikhwan al-Safa", "Da'a'im al-Islam", "Études de Henry Corbin"]
  },
  {
    name: "Templiers & Ésotérisme médiéval",
    year: 1119,
    yearLabel: "1119 apr. J.-C.",
    civilization: "Europe médiévale",
    description: "Ordre du Temple. Accusations de pratiques occultes, adoration du Baphomet, rituels secrets.",
    keyTeachings: ["Serments secrets", "Grades initiatiques", "Richesse cachée", "Pratiques hétérodoxes"],
    contrast: "Les sociétés secrètes vs. la transparence de la da'wa islamique (appel public à la vérité).",
    sources: ["Procès des Templiers (1307-1314)", "Bulles papales", "Chroniques médiévales"]
  },
  {
    name: "Kabbale",
    year: 1200,
    yearLabel: "~1200 apr. J.-C.",
    civilization: "Espagne → Europe",
    description: "Arbre de vie, 10 Sefirot, Ein Sof. Gematria. Interprétation mystique de la Torah.",
    keyTeachings: ["Ein Sof infini", "Sefirot comme émanations", "Gematria/numérologie", "Adam Kadmon"],
    contrast: "Les Sefirot suggèrent des intermédiaires. Le Tawhid rejette tout intermédiaire entre Allah et les humains.",
    sources: ["Sefer ha-Bahir", "Sefer ha-Zohar", "Écrits d'Isaac Louria"]
  },
  {
    name: "Alchimie Occidentale",
    year: 1300,
    yearLabel: "~1300 apr. J.-C.",
    civilization: "Europe",
    description: "Transmutation des métaux. Pierre philosophale. Grand Œuvre. Union des opposés.",
    keyTeachings: ["Solve et Coagula", "Mercure philosophique", "Mariage alchimique", "Symbolisme hermétique"],
    contrast: "L'alchimie cherche le pouvoir sur la matière. L'Islam enseigne la soumission au Créateur de la matière.",
    sources: ["Rosarium Philosophorum", "Turba Philosophorum", "Écrits de Paracelse"]
  },
  {
    name: "Rose-Croix",
    year: 1614,
    yearLabel: "1614 apr. J.-C.",
    civilization: "Europe",
    description: "Fama Fraternitatis. Christian Rosenkreutz. Réforme universelle du savoir. Secrets alchimiques.",
    keyTeachings: ["Fraternité invisible", "Guérison gratuite", "Sagesse cachée", "Illumination progressive"],
    contrast: "La fraternité secrète vs. l'Oumma (communauté) visible et ouverte de l'Islam.",
    sources: ["Fama Fraternitatis (1614)", "Confessio Fraternitatis (1615)", "Noces Chymiques (1616)"]
  },
  {
    name: "Franc-Maçonnerie",
    year: 1717,
    yearLabel: "1717 apr. J.-C.",
    civilization: "Europe → Monde",
    description: "Grande Loge de Londres. Degrés initiatiques (Apprenti, Compagnon, Maître). Temple de Salomon.",
    keyTeachings: ["Grand Architecte", "Rituels symboliques", "Secrets des grades", "Fraternité universelle"],
    contrast: "Le 'Grand Architecte' est vague et syncrétique. Allah a des noms et attributs révélés précisément.",
    sources: ["Constitutions d'Anderson", "Rituels maçonniques", "Discours de Ramsay"]
  },
  {
    name: "Illuminisme (Weishaupt)",
    year: 1776,
    yearLabel: "1776 apr. J.-C.",
    civilization: "Bavière → Europe",
    description: "Ordre des Illuminés. Adam Weishaupt. Infiltration des institutions. Rationalisme radical.",
    keyTeachings: ["Anti-monarchisme", "Anti-cléricalisme", "Grades secrets", "Illumination par la raison"],
    contrast: "L'Islam appelle à la raison publiquement, sans sociétés secrètes ni conspirations.",
    sources: ["Écrits de Weishaupt", "Documents saisis (1786)", "Enquête bavaroise"]
  },
  {
    name: "Baphomet (Éliphas Lévi)",
    year: 1856,
    yearLabel: "1856 apr. J.-C.",
    civilization: "France occultiste",
    description: "Figure androgyne. 'Solve et Coagula'. Représente l'équilibre des forces opposées.",
    keyTeachings: ["Dualité absolue", "Androgynie primordiale", "Magie dogmatique", "Syncrétisme total"],
    contrast: "La dualité égale bien/mal vs. le Tawhid où Allah est la source de tout. Le mal n'est qu'épreuve.",
    sources: ["Dogme et Rituel de la Haute Magie", "Clefs des Grands Mystères", "Histoire de la Magie"]
  },
  {
    name: "Théosophie (Blavatsky)",
    year: 1875,
    yearLabel: "1875 apr. J.-C.",
    civilization: "International",
    description: "Société Théosophique. Maîtres Ascensionnés. Syncrétisme Orient/Occident. Races-racines.",
    keyTeachings: ["Maîtres cachés", "Évolution spirituelle", "Akasha", "Syncrétisme universel"],
    contrast: "Les 'Maîtres Ascensionnés' vs. les prophètes mortels. L'Islam rejette la déification des humains.",
    sources: ["Isis Dévoilée", "La Doctrine Secrète", "La Voix du Silence"]
  },
  {
    name: "Golden Dawn",
    year: 1888,
    yearLabel: "1888 apr. J.-C.",
    civilization: "Angleterre",
    description: "Ordre Hermétique de l'Aube Dorée. Magie cérémonielle. Grades kabbalistiques. Tarot initiatique.",
    keyTeachings: ["Magie rituelle", "Kabbale occidentale", "Grades hermétiques", "Invocation d'entités"],
    contrast: "L'invocation d'entités = shirk (association). Le musulman n'invoque qu'Allah seul.",
    sources: ["Rituels de la Golden Dawn", "The Equinox", "Flying Rolls"]
  },
  {
    name: "Thelema (Crowley)",
    year: 1904,
    yearLabel: "1904 apr. J.-C.",
    civilization: "International",
    description: "'Fais ce que tu veux sera toute la Loi.' Liber AL. Ordo Templi Orientis.",
    keyTeachings: ["Volonté Vraie", "Éon d'Horus", "Magie sexuelle", "Invocation de 'démons'"],
    contrast: "'Fais ce que tu veux' vs. 'Soumets-toi à Allah'. L'Islam est libération par la soumission au Créateur.",
    sources: ["Liber AL vel Legis", "Magick in Theory and Practice", "The Book of Thoth"]
  },
  {
    name: "Nouvel Âge (New Age)",
    year: 1960,
    yearLabel: "~1960 apr. J.-C.",
    civilization: "Occident → Global",
    description: "Ère du Verseau. Channeling. Cristaux. 'Nous sommes tous Dieu.'",
    keyTeachings: ["Panthéisme", "Auto-déification", "Syncrétisme spirituel", "Réincarnation"],
    contrast: "'Nous sommes Dieu' = shirk suprême. Le Tawhid distingue clairement Créateur et créatures.",
    sources: ["A Course in Miracles", "Écrits de Shirley MacLaine", "Mouvement de Findhorn"]
  },
  {
    name: "Kabbale Moderne (Berg)",
    year: 1984,
    yearLabel: "1984 apr. J.-C.",
    civilization: "États-Unis → Global",
    description: "Centre de la Kabbale. Popularisation commerciale. Célébrités initiées. Fil rouge.",
    keyTeachings: ["Kabbale accessible", "Correction (tikkun)", "Fil rouge protecteur", "Lumière infinie"],
    contrast: "Commercialisation du sacré vs. gratuité de la guidance islamique. Le Coran est accessible à tous, sans paiement.",
    sources: ["The Zohar (Philip Berg)", "Kabbalah Centre International", "Publications du Centre"]
  },
  {
    name: "Occultisme Digital & Transhumanisme",
    year: 2010,
    yearLabel: "~2010 apr. J.-C.",
    civilization: "Global",
    description: "Techno-occultisme. Fusion homme-machine. Conscience uploadée. Immortalité digitale.",
    keyTeachings: ["Singularité", "Transcendance technologique", "IA comme dieu", "Post-humanisme"],
    contrast: "La quête d'immortalité technologique vs. l'Au-delà promis par Allah. L'humilité vs. l'hubris.",
    sources: ["Écrits de Ray Kurzweil", "Mouvement transhumaniste", "Silicon Valley mysticisme"]
  }
];

export const ProphetTimeline = () => {
  const [showMyths, setShowMyths] = useState(false);
  const [selectedProphet, setSelectedProphet] = useState<Prophet | null>(null);
  const [selectedMyth, setSelectedMyth] = useState<Myth | null>(null);

  const allYears = [...prophets.map(p => p.year), ...myths.map(m => m.year)];
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  const range = maxYear - minYear;

  const getPosition = (year: number) => ((year - minYear) / range) * 100;

  return (
    <section id="timeline" className="relative py-24 px-4">
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="خط التوحيد"
          title="Chronologie du Tawhid"
          subtitle="Les 25 prophètes de l'Islam face aux traditions ésotériques de l'histoire humaine."
        />

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-1 inline-flex rounded-xl">
            <button
              onClick={() => { setShowMyths(false); setSelectedMyth(null); }}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                !showMyths ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              25 Prophètes
            </button>
            <button
              onClick={() => setShowMyths(true)}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                showMyths ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Superposer Mythologies
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-gradient-gold">25</p>
            <p className="text-sm text-muted-foreground">Prophètes mentionnés</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-primary">1</p>
            <p className="text-sm text-muted-foreground">Message unique : Tawhid</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-accent">~6000</p>
            <p className="text-sm text-muted-foreground">Ans d'histoire</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-destructive/70">{myths.length}</p>
            <p className="text-sm text-muted-foreground">Traditions ésotériques</p>
          </div>
        </div>

        {/* Timeline */}
        <GlassCard glow className="mb-8 overflow-x-auto">
          <div className="min-w-[1200px] relative py-32 px-8">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full -translate-y-1/2" />

            {/* Prophets */}
            {prophets.map((prophet, idx) => (
              <div
                key={prophet.name}
                className="absolute -translate-x-1/2 cursor-pointer group"
                style={{ left: `${getPosition(prophet.year)}%`, top: "50%" }}
                onClick={() => { setSelectedProphet(prophet); setSelectedMyth(null); }}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-primary border-2 border-background transition-all group-hover:scale-150",
                  selectedProphet?.name === prophet.name && "scale-150 ring-4 ring-primary/30"
                )} />
                <div className={cn(
                  "absolute whitespace-nowrap text-center transition-all group-hover:scale-110",
                  idx % 2 === 0 ? "bottom-6" : "top-6"
                )}>
                  <p className="text-sm font-display text-gradient-gold">{prophet.arabic}</p>
                  <p className="text-xs text-foreground">{prophet.name.split(' ')[0]}</p>
                </div>
              </div>
            ))}

            {/* Myths (when toggled) */}
            {showMyths && myths.map((myth, idx) => (
              <div
                key={myth.name}
                className="absolute -translate-x-1/2 cursor-pointer group"
                style={{ left: `${getPosition(myth.year)}%`, top: "50%" }}
                onClick={() => { setSelectedMyth(myth); setSelectedProphet(null); }}
              >
                <div className={cn(
                  "w-3 h-3 rounded-full bg-destructive/70 border-2 border-background -translate-y-1/2 transition-all group-hover:scale-150",
                  selectedMyth?.name === myth.name && "scale-150 ring-4 ring-destructive/30"
                )} />
                <div className={cn(
                  "absolute whitespace-nowrap text-center transition-all group-hover:scale-110 max-w-[100px]",
                  idx % 3 === 0 ? "top-10" : idx % 3 === 1 ? "bottom-10" : "top-16"
                )}>
                  <p className="text-xs text-destructive/80 truncate">{myth.name.split(' ').slice(0, 2).join(' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Details */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Prophet Detail */}
          <GlassCard className={cn("transition-all", selectedProphet ? "ring-2 ring-primary" : "")}>
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gradient-gold">☪</span> Prophète Sélectionné
            </h3>
            {selectedProphet ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-display text-gradient-gold">{selectedProphet.arabic}</span>
                  <div>
                    <p className="text-xl font-medium text-foreground">{selectedProphet.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedProphet.yearLabel}</p>
                    <p className="text-sm text-primary">📍 {selectedProphet.location}</p>
                  </div>
                </div>
                
                <p className="text-foreground/90">{selectedProphet.message}</p>
                
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="text-sm font-medium text-foreground mb-2">📖 Détails</h4>
                  <p className="text-sm text-muted-foreground">{selectedProphet.details}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">📚 Sources</h4>
                  <ul className="text-xs text-primary space-y-1">
                    {selectedProphet.sources.map((source, idx) => (
                      <li key={idx}>• {source}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-foreground">
                    <strong>Message constant :</strong> Tous les prophètes ont appelé au Tawhid — l'adoration exclusive d'Allah, sans intermédiaire ni associé.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Cliquez sur un prophète dans la chronologie pour voir les détails.</p>
            )}
          </GlassCard>

          {/* Myth Detail */}
          <GlassCard className={cn("transition-all", selectedMyth && showMyths ? "ring-2 ring-destructive/50" : "")}>
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-muted-foreground">☿</span> Tradition Ésotérique
            </h3>
            {selectedMyth && showMyths ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xl font-medium text-foreground">{selectedMyth.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMyth.yearLabel} • {selectedMyth.civilization}</p>
                </div>
                
                <p className="text-foreground/90">{selectedMyth.description}</p>
                
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">⚠️ Enseignements clés</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {selectedMyth.keyTeachings.map((teaching, idx) => (
                      <li key={idx}>• {teaching}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">⚖️ Contraste avec le Tawhid</h4>
                  <p className="text-sm text-foreground/90">{selectedMyth.contrast}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="text-sm font-medium text-foreground mb-2">📚 Sources</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {selectedMyth.sources.map((source, idx) => (
                      <li key={idx}>• {source}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {showMyths 
                  ? "Cliquez sur un point rouge pour voir les détails de la tradition ésotérique."
                  : "Activez 'Superposer Mythologies' pour comparer avec les traditions ésotériques."}
              </p>
            )}
          </GlassCard>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-muted-foreground">Prophètes de l'Islam (25)</span>
          </div>
          {showMyths && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="text-muted-foreground">Traditions ésotériques ({myths.length})</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
