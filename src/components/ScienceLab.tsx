import { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { cn } from "@/lib/utils";
import { Atom, Globe, Droplets, Mountain, Heart, Cloud, Moon, Microscope, Leaf, Wind, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface ScientificMiracle {
  id: number;
  title: string;
  arabic: string;
  verse: string;
  reference: string;
  scientificFact: string;
  historicalContext: string;
  discovery: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  miracles: ScientificMiracle[];
}

const categories: Category[] = [
  {
    id: "cosmology",
    name: "Cosmologie",
    icon: <Atom className="w-5 h-5" />,
    color: "text-purple-400",
    miracles: [
      { id: 1, title: "Expansion de l'Univers", arabic: "وَإِنَّا لَمُوسِعُونَ", verse: "Le ciel, Nous l'avons construit par Notre puissance et Nous l'étendons [constamment].", reference: "51:47", scientificFact: "L'univers est en expansion constante, découvert par Hubble en 1929.", historicalContext: "Au 7ème siècle, l'univers était considéré comme statique.", discovery: "Edwin Hubble, 1929" },
      { id: 2, title: "Big Bang", arabic: "كَانَتَا رَتْقًا فَفَتَقْنَاهُمَا", verse: "Les cieux et la terre formaient une masse compacte, puis Nous les avons séparés.", reference: "21:30", scientificFact: "L'univers a commencé par une singularité qui s'est étendue (Big Bang).", historicalContext: "Concept inexistant au 7ème siècle.", discovery: "Georges Lemaître, 1927" },
      { id: 3, title: "Orbites Célestes", arabic: "كُلٌّ فِي فَلَكٍ يَسْبَحُونَ", verse: "Chacun vogue dans une orbite.", reference: "36:40", scientificFact: "Tous les corps célestes ont des orbites propres.", historicalContext: "On pensait que les étoiles étaient fixes.", discovery: "Kepler, 17ème siècle" },
      { id: 4, title: "Mouvement du Soleil", arabic: "وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَّهَا", verse: "Le soleil court vers un gîte qui lui est assigné.", reference: "36:38", scientificFact: "Le soleil se déplace à 720,000 km/h vers l'apex solaire.", historicalContext: "On croyait le soleil immobile.", discovery: "20ème siècle" },
      { id: 5, title: "Ciel comme Protection", arabic: "وَجَعَلْنَا السَّمَاءَ سَقْفًا مَّحْفُوظًا", verse: "Nous avons fait du ciel un toit protégé.", reference: "21:32", scientificFact: "L'atmosphère nous protège des radiations et météorites.", historicalContext: "Aucune connaissance de l'atmosphère protectrice.", discovery: "19ème-20ème siècle" },
      { id: 6, title: "Couches Atmosphériques", arabic: "سَبْعَ سَمَاوَاتٍ طِبَاقًا", verse: "Il a créé sept cieux superposés.", reference: "67:3", scientificFact: "L'atmosphère a 7 couches distinctes.", historicalContext: "Structure atmosphérique inconnue.", discovery: "20ème siècle" },
      { id: 7, title: "Étoiles comme Lampes", arabic: "مَصَابِيحَ", verse: "Nous avons orné le ciel le plus proche de lampes [étoiles].", reference: "67:5", scientificFact: "Les étoiles produisent leur propre lumière par fusion.", historicalContext: "Nature des étoiles inconnue.", discovery: "20ème siècle" },
      { id: 8, title: "Pulsars", arabic: "الطَّارِقِ النَّجْمُ الثَّاقِبُ", verse: "L'astre perçant (qui frappe).", reference: "86:1-3", scientificFact: "Les pulsars émettent des ondes qui 'frappent' périodiquement.", historicalContext: "Pulsars inconnus.", discovery: "Jocelyn Bell, 1967" },
      { id: 9, title: "Trous Noirs", arabic: "فَلَا أُقْسِمُ بِالْخُنَّسِ الْجَوَارِ الْكُنَّسِ", verse: "Par les astres qui se cachent, qui courent et disparaissent.", reference: "81:15-16", scientificFact: "Description correspondant aux trous noirs.", historicalContext: "Concept inexistant.", discovery: "John Wheeler, 1967" },
      { id: 10, title: "Fin de l'Univers", arabic: "يَوْمَ نَطْوِي السَّمَاءَ كَطَيِّ السِّجِلِّ", verse: "Le jour où Nous plierons le ciel comme on plie un livre.", reference: "21:104", scientificFact: "Théorie du Big Crunch - contraction finale.", historicalContext: "Eschatologie cosmique inconnue.", discovery: "Théorie moderne" },
      { id: 11, title: "Matière Noire", arabic: "وَالسَّمَاءِ ذَاتِ الْحُبُكِ", verse: "Par le ciel aux voies parfaitement tracées (tissu).", reference: "51:7", scientificFact: "La toile cosmique de matière noire structure l'univers.", historicalContext: "Structure invisible de l'univers inconnue.", discovery: "Fritz Zwicky, 1933" },
      { id: 12, title: "Relativité du Temps", arabic: "يُدَبِّرُ الْأَمْرَ مِنَ السَّمَاءِ إِلَى الْأَرْضِ ثُمَّ يَعْرُجُ إِلَيْهِ فِي يَوْمٍ كَانَ مِقْدَارُهُ أَلْفَ سَنَةٍ", verse: "Un jour auprès de ton Seigneur équivaut à mille ans.", reference: "32:5", scientificFact: "Le temps est relatif selon Einstein.", historicalContext: "Temps considéré comme absolu.", discovery: "Einstein, 1905" },
    ]
  },
  {
    id: "embryology",
    name: "Embryologie",
    icon: <Heart className="w-5 h-5" />,
    color: "text-red-400",
    miracles: [
      { id: 13, title: "Stade Nutfa (Goutte)", arabic: "نُطْفَةٍ", verse: "Nous avons créé l'homme d'un extrait d'argile, puis d'une goutte.", reference: "23:12-13", scientificFact: "Le spermatozoïde est microscopique (goutte).", historicalContext: "Aristote pensait que seul le sperme formait l'embryon.", discovery: "Leeuwenhoek, 1677" },
      { id: 14, title: "Stade 'Alaqa (Sangsue)", arabic: "عَلَقَةٍ", verse: "Puis d'une 'alaqa (chose qui s'accroche).", reference: "23:14", scientificFact: "L'embryon s'implante et ressemble à une sangsue.", historicalContext: "Implantation utérine inconnue.", discovery: "19ème siècle" },
      { id: 15, title: "Stade Mudgha (Mâché)", arabic: "مُضْغَةٍ", verse: "Puis d'une mudgha (morceau mâché).", reference: "23:14", scientificFact: "L'embryon a des somites ressemblant à des marques de dents.", historicalContext: "Aucune observation possible.", discovery: "Embryologie moderne" },
      { id: 16, title: "Os avant Muscles", arabic: "عِظَامًا فَكَسَوْنَا الْعِظَامَ لَحْمًا", verse: "Nous avons créé des os, puis revêtu les os de chair.", reference: "23:14", scientificFact: "Le cartilage (os) se forme avant les muscles.", historicalContext: "On croyait à une formation simultanée.", discovery: "Embryologie moderne" },
      { id: 17, title: "Trois Voiles de Ténèbres", arabic: "ظُلُمَاتٍ ثَلَاثٍ", verse: "Il vous crée dans les ventres de vos mères... dans trois ténèbres.", reference: "39:6", scientificFact: "Paroi abdominale, paroi utérine, membranes amniotiques.", historicalContext: "Anatomie interne inconnue.", discovery: "Anatomie moderne" },
      { id: 18, title: "Détermination du Sexe", arabic: "مِن نُّطْفَةٍ إِذَا تُمْنَىٰ", verse: "D'une goutte de sperme quand elle est éjaculée.", reference: "53:45-46", scientificFact: "Le chromosome Y du sperme détermine le sexe masculin.", historicalContext: "On accusait la femme pour le sexe.", discovery: "20ème siècle" },
      { id: 19, title: "Liquides Mélangés", arabic: "نُّطْفَةٍ أَمْشَاجٍ", verse: "D'une goutte de liquides mélangés.", reference: "76:2", scientificFact: "Fusion des gamètes mâle et femelle.", historicalContext: "Rôle de l'ovule inconnu.", discovery: "Karl Ernst von Baer, 1827" },
      { id: 20, title: "Zone Lombaire", arabic: "مِن بَيْنِ الصُّلْبِ وَالتَّرَائِبِ", verse: "Il sort d'entre les lombes et les côtes.", reference: "86:6-7", scientificFact: "Les gonades se forment près des reins puis descendent.", historicalContext: "Développement gonadique inconnu.", discovery: "Embryologie moderne" },
      { id: 21, title: "Audition avant Vue", arabic: "السَّمْعَ وَالْأَبْصَارَ", verse: "Et Il vous a assigné l'ouïe, puis la vue.", reference: "32:9", scientificFact: "L'oreille se développe avant les yeux chez le fœtus.", historicalContext: "Séquence de développement inconnue.", discovery: "Embryologie moderne" },
      { id: 22, title: "Empreintes Digitales", arabic: "بَنَانَهُ", verse: "Nous sommes capable de reconstituer ses doigts.", reference: "75:4", scientificFact: "Chaque empreinte est unique - identification.", historicalContext: "Unicité des empreintes inconnue.", discovery: "Francis Galton, 1892" },
      { id: 23, title: "Allaitement 2 Ans", arabic: "حَوْلَيْنِ كَامِلَيْنِ", verse: "Les mères allaiteront deux années complètes.", reference: "2:233", scientificFact: "2 ans optimal pour le développement immunitaire.", historicalContext: "Durée optimale non établie.", discovery: "OMS, 20ème siècle" },
      { id: 24, title: "30 Mois Gestation+Sevrage", arabic: "ثَلَاثُونَ شَهْرًا", verse: "Sa gestation et son sevrage durent trente mois.", reference: "46:15", scientificFact: "6 mois minimum de gestation + 24 mois = 30 mois.", historicalContext: "Calcul précis remarquable.", discovery: "Médecine moderne" },
    ]
  },
  {
    id: "oceanography",
    name: "Océanographie",
    icon: <Droplets className="w-5 h-5" />,
    color: "text-blue-400",
    miracles: [
      { id: 25, title: "Barrière entre Mers", arabic: "مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ بَيْنَهُمَا بَرْزَخٌ", verse: "Il a fait confluer les deux mers avec une barrière entre elles.", reference: "55:19-20", scientificFact: "Les mers de salinités différentes ne se mélangent pas immédiatement.", historicalContext: "Phénomène invisible à l'œil nu.", discovery: "Jacques Cousteau, 20ème siècle" },
      { id: 26, title: "Ténèbres Océaniques", arabic: "ظُلُمَاتٌ بَعْضُهَا فَوْقَ بَعْضٍ", verse: "Ténèbres superposées dans une mer profonde.", reference: "24:40", scientificFact: "La lumière est absorbée progressivement (couleurs disparaissent).", historicalContext: "Impossible de plonger profondément.", discovery: "Océanographie moderne" },
      { id: 27, title: "Vagues Internes", arabic: "مَّوْجٌ مِّن فَوْقِهِ مَوْجٌ", verse: "Une vague la recouvre, puis une autre vague.", reference: "24:40", scientificFact: "Existence de vagues internes sous-marines.", historicalContext: "Vagues internes invisibles en surface.", discovery: "20ème siècle" },
      { id: 28, title: "Eau Douce/Salée", arabic: "عَذْبٌ فُرَاتٌ وَهَٰذَا مِلْحٌ أُجَاجٌ", verse: "Celle-ci est douce et celle-là est salée et amère.", reference: "25:53", scientificFact: "Estuaires : zone de transition entre eau douce et salée.", historicalContext: "Dynamique des estuaires inconnue.", discovery: "Hydrologie moderne" },
      { id: 29, title: "Sources Sous-Marines", arabic: "وَفَجَّرْنَا الْأَرْضَ عُيُونًا", verse: "Nous avons fait jaillir de la terre des sources.", reference: "54:12", scientificFact: "Sources hydrothermales sous-marines découvertes.", historicalContext: "Fonds océaniques inaccessibles.", discovery: "1977, Galapagos" },
      { id: 30, title: "Cycle de l'Eau", arabic: "أَنزَلَ مِنَ السَّمَاءِ مَاءً فَسَلَكَهُ يَنَابِيعَ فِي الْأَرْضِ", verse: "Il fait descendre l'eau du ciel qui s'infiltre en sources.", reference: "39:21", scientificFact: "Cycle hydrologique complet décrit.", historicalContext: "Cycle de l'eau mal compris.", discovery: "Bernard Palissy, 16ème siècle" },
      { id: 31, title: "Perles et Coraux", arabic: "يَخْرُجُ مِنْهُمَا اللُّؤْلُؤُ وَالْمَرْجَانُ", verse: "De ces deux mers sortent la perle et le corail.", reference: "55:22", scientificFact: "Perles d'eau douce et coraux marins.", historicalContext: "Origine des perles mal connue.", discovery: "Biologie marine" },
      { id: 32, title: "Profondeurs Abyssales", arabic: "بَحْرٍ لُّجِّيٍّ", verse: "Comme des ténèbres dans une mer profonde.", reference: "24:40", scientificFact: "Fosses abyssales sans lumière.", historicalContext: "Profondeurs inexplorées.", discovery: "Exploration moderne" },
    ]
  },
  {
    id: "geology",
    name: "Géologie",
    icon: <Mountain className="w-5 h-5" />,
    color: "text-amber-400",
    miracles: [
      { id: 33, title: "Montagnes comme Piquets", arabic: "وَالْجِبَالَ أَوْتَادًا", verse: "Et les montagnes comme des piquets.", reference: "78:7", scientificFact: "Les montagnes ont des racines profondes (isostasie).", historicalContext: "Racines montagneuses inconnues.", discovery: "George Airy, 1855" },
      { id: 34, title: "Montagnes Stabilisatrices", arabic: "وَأَلْقَىٰ فِي الْأَرْضِ رَوَاسِيَ أَن تَمِيدَ بِكُمْ", verse: "Il a placé des montagnes pour que [la terre] ne vacille pas.", reference: "16:15", scientificFact: "Les montagnes stabilisent la croûte terrestre.", historicalContext: "Tectonique des plaques inconnue.", discovery: "20ème siècle" },
      { id: 35, title: "Terre Aplatie aux Pôles", arabic: "وَالْأَرْضَ بَعْدَ ذَٰلِكَ دَحَاهَا", verse: "Et la terre, après cela, Il l'a étendue (en forme d'œuf).", reference: "79:30", scientificFact: "Dahaha vient de 'udhiya' (œuf d'autruche) - géoïde.", historicalContext: "Terre plate ou parfaitement ronde.", discovery: "Isaac Newton, 17ème siècle" },
      { id: 36, title: "Fer Extraterrestre", arabic: "وَأَنزَلْنَا الْحَدِيدَ", verse: "Et Nous avons fait descendre le fer.", reference: "57:25", scientificFact: "Le fer terrestre provient de météorites et supernovae.", historicalContext: "Origine du fer inconnue.", discovery: "Astrophysique moderne" },
      { id: 37, title: "Tectonique des Plaques", arabic: "وَالْأَرْضِ ذَاتِ الصَّدْعِ", verse: "Par la terre qui se fend.", reference: "86:12", scientificFact: "Les plaques tectoniques se séparent aux rifts.", historicalContext: "Mouvement des continents inconnu.", discovery: "Alfred Wegener, 1912" },
      { id: 38, title: "Séismes et Volcans", arabic: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", verse: "Quand la terre tremblera d'un violent tremblement.", reference: "99:1", scientificFact: "Description précise des phénomènes sismiques.", historicalContext: "Causes des séismes mythologisées.", discovery: "Sismologie moderne" },
      { id: 39, title: "Couches Terrestres", arabic: "سَبْعَ أَرَضِينَ", verse: "Allah qui a créé sept terres.", reference: "65:12", scientificFact: "La Terre a 7 couches géologiques.", historicalContext: "Structure interne inconnue.", discovery: "Sismologie, 20ème siècle" },
      { id: 40, title: "Minéraux et Couleurs", arabic: "جُدَدٌ بِيضٌ وَحُمْرٌ مُّخْتَلِفٌ أَلْوَانُهَا", verse: "Des sillons blancs et rouges de couleurs différentes.", reference: "35:27", scientificFact: "Variété des minéraux et roches colorées.", historicalContext: "Classification géologique absente.", discovery: "Géologie moderne" },
      { id: 41, title: "Pétrole et Charbon", arabic: "وَالْأَرْضِ ذَاتِ الصَّدْعِ", verse: "Par la terre qui se fend.", reference: "86:12", scientificFact: "Combustibles fossiles formés par pression.", historicalContext: "Origine du pétrole inconnue.", discovery: "19ème siècle" },
      { id: 42, title: "Expansion Terrestre", arabic: "وَالْأَرْضَ مَدَدْنَاهَا", verse: "Et la terre, Nous l'avons étendue.", reference: "15:19", scientificFact: "La Terre s'est étendue lors de sa formation.", historicalContext: "Formation terrestre inconnue.", discovery: "Planétologie moderne" },
    ]
  },
  {
    id: "meteorology",
    name: "Météorologie",
    icon: <Cloud className="w-5 h-5" />,
    color: "text-sky-400",
    miracles: [
      { id: 43, title: "Vents Fécondants", arabic: "وَأَرْسَلْنَا الرِّيَاحَ لَوَاقِحَ", verse: "Et Nous envoyons les vents fécondants.", reference: "15:22", scientificFact: "Les vents transportent le pollen pour la reproduction.", historicalContext: "Rôle du vent dans la pollinisation inconnu.", discovery: "Botanique moderne" },
      { id: 44, title: "Formation des Nuages", arabic: "يُنشِئُ السَّحَابَ الثِّقَالَ", verse: "C'est Lui qui crée les nuages lourds.", reference: "13:12", scientificFact: "Formation des nuages par condensation.", historicalContext: "Processus mal compris.", discovery: "Météorologie moderne" },
      { id: 45, title: "Nuages en Couches", arabic: "يَجْعَلُهُ رُكَامًا", verse: "Puis Il en fait un amas.", reference: "24:43", scientificFact: "Les cumulonimbus s'empilent verticalement.", historicalContext: "Structure des nuages inconnue.", discovery: "Observation aérienne" },
      { id: 46, title: "Grêle des Montagnes", arabic: "مِن جِبَالٍ فِيهَا مِن بَرَدٍ", verse: "Des montagnes [de nuages] contenant de la grêle.", reference: "24:43", scientificFact: "Les cumulonimbus ressemblent à des montagnes et contiennent de la grêle.", historicalContext: "Hauteur des nuages inconnue.", discovery: "Météorologie aérienne" },
      { id: 47, title: "Éclair et Tonnerre", arabic: "يَكَادُ الْبَرْقُ يَخْطَفُ أَبْصَارَهُمْ", verse: "L'éclair manque de leur ravir la vue.", reference: "2:20", scientificFact: "L'éclair peut endommager la rétine.", historicalContext: "Effets de l'éclair peu documentés.", discovery: "Ophtalmologie" },
      { id: 48, title: "Pluie Mesurée", arabic: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً بِقَدَرٍ", verse: "Nous avons fait descendre l'eau en quantité mesurée.", reference: "23:18", scientificFact: "Le cycle de l'eau est quantitativement équilibré.", historicalContext: "Équilibre hydrique non mesuré.", discovery: "Hydrologie quantitative" },
      { id: 49, title: "Vent et Nuages", arabic: "اللَّهُ الَّذِي يُرْسِلُ الرِّيَاحَ فَتُثِيرُ سَحَابًا", verse: "Allah envoie les vents qui soulèvent les nuages.", reference: "35:9", scientificFact: "Les vents transportent la vapeur d'eau.", historicalContext: "Mécanisme de transport inconnu.", discovery: "Météorologie dynamique" },
      { id: 50, title: "Rosée et Brume", arabic: "فَإِن لَّمْ يُصِبْهَا وَابِلٌ فَطَلٌّ", verse: "Si une pluie forte ne l'atteint pas, une rosée suffit.", reference: "2:265", scientificFact: "La rosée comme source d'humidité alternative.", historicalContext: "Importance de la rosée sous-estimée.", discovery: "Agronomie" },
    ]
  },
  {
    id: "biology",
    name: "Biologie",
    icon: <Microscope className="w-5 h-5" />,
    color: "text-green-400",
    miracles: [
      { id: 51, title: "Origine Aquatique de la Vie", arabic: "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ", verse: "Et Nous avons fait de l'eau toute chose vivante.", reference: "21:30", scientificFact: "La vie a commencé dans l'eau, cellules 70% eau.", historicalContext: "Origine de la vie inconnue.", discovery: "Darwin, Oparin, Miller" },
      { id: 52, title: "Paires dans la Création", arabic: "وَمِن كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ", verse: "Et de toute chose Nous avons créé un couple.", reference: "51:49", scientificFact: "Dualité dans la nature : + et -, mâle/femelle, matière/antimatière.", historicalContext: "Universalité des paires inconnue.", discovery: "Physique des particules" },
      { id: 53, title: "Abeilles Femelles", arabic: "أَنِ اتَّخِذِي مِنَ الْجِبَالِ بُيُوتًا", verse: "Prends des demeures dans les montagnes (féminin).", reference: "16:68", scientificFact: "Seules les abeilles femelles construisent et récoltent.", historicalContext: "Rôles des abeilles inconnus.", discovery: "Entomologie moderne" },
      { id: 54, title: "Soie d'Araignée", arabic: "كَمَثَلِ الْعَنكَبُوتِ اتَّخَذَتْ بَيْتًا", verse: "Comme l'araignée qui a pris une demeure (féminin).", reference: "29:41", scientificFact: "C'est la femelle qui tisse la toile.", historicalContext: "Comportement des araignées inconnu.", discovery: "Arachnologie" },
      { id: 55, title: "Miel Guérisseur", arabic: "فِيهِ شِفَاءٌ لِّلنَّاسِ", verse: "En lui il y a une guérison pour les gens.", reference: "16:69", scientificFact: "Propriétés antibactériennes du miel confirmées.", historicalContext: "Usage médicinal empirique.", discovery: "Médecine moderne" },
      { id: 56, title: "Lait entre Sang et Excréments", arabic: "مِّن بَيْنِ فَرْثٍ وَدَمٍ لَّبَنًا خَالِصًا", verse: "Du lait pur entre les excréments et le sang.", reference: "16:66", scientificFact: "Le lait est produit par les glandes mammaires à partir du sang.", historicalContext: "Physiologie de la lactation inconnue.", discovery: "Physiologie moderne" },
      { id: 57, title: "Peaux Régénérées", arabic: "كُلَّمَا نَضِجَتْ جُلُودُهُم بَدَّلْنَاهُمْ جُلُودًا غَيْرَهَا", verse: "Chaque fois que leurs peaux seront consumées, Nous les remplacerons.", reference: "4:56", scientificFact: "Les récepteurs de douleur sont dans la peau.", historicalContext: "Localisation des récepteurs inconnue.", discovery: "Neurologie" },
      { id: 58, title: "Cerveau Frontal et Mensonge", arabic: "نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ", verse: "Un toupet menteur et pécheur.", reference: "96:16", scientificFact: "Le cortex préfrontal gère la décision et peut induire le mensonge.", historicalContext: "Fonctions cérébrales inconnues.", discovery: "Neurosciences modernes" },
      { id: 59, title: "Fourmis et Communication", arabic: "قَالَتْ نَمْلَةٌ", verse: "Une fourmi dit...", reference: "27:18", scientificFact: "Les fourmis communiquent par phéromones et sons.", historicalContext: "Communication des insectes inconnue.", discovery: "Entomologie" },
      { id: 60, title: "Oiseaux et Aérodynamique", arabic: "أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ", verse: "Les oiseaux au-dessus d'eux, déployant et repliant leurs ailes.", reference: "67:19", scientificFact: "Le vol des oiseaux obéit aux lois de l'aérodynamique.", historicalContext: "Physique du vol inconnue.", discovery: "Aéronautique" },
      { id: 61, title: "Communautés Animales", arabic: "وَمَا مِن دَابَّةٍ فِي الْأَرْضِ وَلَا طَائِرٍ... إِلَّا أُمَمٌ أَمْثَالُكُم", verse: "Toute bête et oiseau forment des communautés comme vous.", reference: "6:38", scientificFact: "Les animaux vivent en sociétés organisées.", historicalContext: "Éthologie naissante.", discovery: "Éthologie moderne" },
      { id: 62, title: "Reproduction Végétale", arabic: "وَأَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ أَزْوَاجًا", verse: "Nous avons fait pousser des couples de plantes.", reference: "20:53", scientificFact: "Les plantes ont des organes mâles et femelles.", historicalContext: "Sexualité végétale inconnue.", discovery: "Linnaeus, 18ème siècle" },
      { id: 103, title: "Ailes de Mouche (Virus et Remède)", arabic: "إِذَا وَقَعَ الذُّبَابُ فِي شَرَابِ أَحَدِكُمْ", verse: "Si une mouche tombe dans votre boisson, plongez-la entièrement.", reference: "Hadith Bukhari", scientificFact: "Une aile porte des pathogènes, l'autre des agents antibactériens.", historicalContext: "Microbiologie inconnue au 7ème siècle.", discovery: "Études microbiologiques modernes" },
      { id: 104, title: "Huile d'Olive Lumineuse", arabic: "يَكَادُ زَيْتُهَا يُضِيءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌ", verse: "Son huile éclairerait presque sans que le feu la touche.", reference: "24:35", scientificFact: "L'huile d'olive a une bioluminescence naturelle et des propriétés optiques.", historicalContext: "Propriétés optiques de l'huile inconnues.", discovery: "Photochimie moderne" },
    ]
  },
  {
    id: "astronomy",
    name: "Astronomie",
    icon: <Moon className="w-5 h-5" />,
    color: "text-indigo-400",
    miracles: [
      { id: 63, title: "Lune Lumière Réfléchie", arabic: "وَجَعَلَ الْقَمَرَ فِيهِنَّ نُورًا وَجَعَلَ الشَّمْسَ سِرَاجًا", verse: "La lune comme lumière (nur) et le soleil comme lampe (siraj).", reference: "71:16", scientificFact: "La lune réfléchit la lumière, le soleil la produit.", historicalContext: "Distinction non faite.", discovery: "Astronomie moderne" },
      { id: 64, title: "Phases Lunaires", arabic: "وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ", verse: "Et la lune, Nous lui avons déterminé des phases.", reference: "36:39", scientificFact: "28 mansions lunaires = mois lunaire.", historicalContext: "Calcul précis notable.", discovery: "Astronomie ancienne" },
      { id: 65, title: "Jour et Nuit Enroulés", arabic: "يُكَوِّرُ اللَّيْلَ عَلَى النَّهَارِ", verse: "Il enroule la nuit sur le jour.", reference: "39:5", scientificFact: "Rotation terrestre créant jour/nuit en spirale.", historicalContext: "Rotation terrestre inconnue.", discovery: "Copernic, 16ème siècle" },
      { id: 66, title: "Constellations", arabic: "وَلَقَدْ جَعَلْنَا فِي السَّمَاءِ بُرُوجًا", verse: "Nous avons placé des constellations dans le ciel.", reference: "15:16", scientificFact: "Les constellations servent à la navigation.", historicalContext: "Usage nautique limité.", discovery: "Navigation astronomique" },
      { id: 67, title: "Étoile Guide", arabic: "وَبِالنَّجْمِ هُمْ يَهْتَدُونَ", verse: "Et par les étoiles ils se guident.", reference: "16:16", scientificFact: "Navigation stellaire confirmée.", historicalContext: "Technique ancienne validée.", discovery: "Navigation" },
      { id: 68, title: "Crépuscule", arabic: "فَلَا أُقْسِمُ بِالشَّفَقِ", verse: "Par le crépuscule.", reference: "84:16", scientificFact: "Phénomène de diffusion atmosphérique.", historicalContext: "Optique atmosphérique inconnue.", discovery: "Physique moderne" },
      { id: 69, title: "Nuit Obscure", arabic: "وَاللَّيْلِ إِذَا عَسْعَسَ", verse: "Par la nuit quand elle s'obscurcit.", reference: "81:17", scientificFact: "Absence de lumière solaire directe.", historicalContext: "Compréhension basique.", discovery: "Optique" },
      { id: 70, title: "Aube Naissante", arabic: "وَالصُّبْحِ إِذَا تَنَفَّسَ", verse: "Par l'aube quand elle respire.", reference: "81:18", scientificFact: "L'aube 'respire' avec l'atmosphère qui s'active.", historicalContext: "Poésie scientifique.", discovery: "Météorologie" },
      { id: 105, title: "Lune Fendue", arabic: "اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ", verse: "L'Heure approche et la lune s'est fendue.", reference: "54:1", scientificFact: "NASA a photographié une fissure de 300 km (Rima Ariadaeus) sur la lune.", historicalContext: "Événement prophétique attesté par des témoins.", discovery: "Cartographie lunaire NASA" },
      { id: 106, title: "Cordes Cosmiques (God Strings)", arabic: "وَالسَّمَاءِ ذَاتِ الْحُبُكِ", verse: "Par le ciel aux voies (cordes) entrelacées.", reference: "51:7", scientificFact: "Les cordes cosmiques (cosmic strings) sont prédites par la physique théorique.", historicalContext: "Théorie des cordes inexistante.", discovery: "Théorie des cordes, 20ème siècle" },
    ]
  },
  {
    id: "botany",
    name: "Botanique",
    icon: <Leaf className="w-5 h-5" />,
    color: "text-emerald-400",
    miracles: [
      { id: 71, title: "Photosynthèse", arabic: "الَّذِي جَعَلَ لَكُم مِّنَ الشَّجَرِ الْأَخْضَرِ نَارًا", verse: "Celui qui a fait pour vous du feu à partir de l'arbre vert.", reference: "36:80", scientificFact: "La chlorophylle verte stocke l'énergie solaire.", historicalContext: "Processus de photosynthèse inconnu.", discovery: "Jan Ingenhousz, 1779" },
      { id: 72, title: "Couples Végétaux", arabic: "وَمِن كُلِّ الثَّمَرَاتِ جَعَلَ فِيهَا زَوْجَيْنِ اثْنَيْنِ", verse: "De tous les fruits Il y a fait des couples.", reference: "13:3", scientificFact: "Les plantes ont des organes reproducteurs mâles et femelles.", historicalContext: "Sexualité végétale inconnue.", discovery: "18ème siècle" },
      { id: 73, title: "Racines et Stabilité", arabic: "وَأَنبَتْنَا فِيهَا مِن كُلِّ زَوْجٍ بَهِيجٍ", verse: "Et Nous y avons fait pousser toute sorte de couples.", reference: "50:7", scientificFact: "Les racines stabilisent le sol.", historicalContext: "Rôle des racines mal compris.", discovery: "Agronomie" },
      { id: 74, title: "Olives et Huile", arabic: "وَشَجَرَةً تَخْرُجُ مِن طُورِ سَيْنَاءَ تَنبُتُ بِالدُّهْنِ", verse: "Un arbre qui pousse au Mont Sinaï produisant l'huile.", reference: "23:20", scientificFact: "L'olivier du Sinaï produit une huile de qualité.", historicalContext: "Connaissance locale.", discovery: "Botanique régionale" },
      { id: 75, title: "Dattes et Nutrition", arabic: "وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ تُسَاقِطْ عَلَيْكِ رُطَبًا جَنِيًّا", verse: "Secoue le tronc du palmier, il fera tomber des dattes fraîches.", reference: "19:25", scientificFact: "Les dattes sont un aliment complet pour l'accouchement.", historicalContext: "Valeur nutritive reconnue.", discovery: "Nutrition moderne" },
      { id: 76, title: "Grenade Miraculeuse", arabic: "فِيهِمَا فَاكِهَةٌ وَنَخْلٌ وَرُمَّانٌ", verse: "Des fruits, des palmiers et des grenadiers.", reference: "55:68", scientificFact: "La grenade est riche en antioxydants.", historicalContext: "Propriétés partiellement connues.", discovery: "Phytochimie moderne" },
      { id: 77, title: "Figuier et Olivier", arabic: "وَالتِّينِ وَالزَّيْتُونِ", verse: "Par le figuier et l'olivier.", reference: "95:1", scientificFact: "Figues et olives sont nutritionnellement complémentaires.", historicalContext: "Alimentation méditerranéenne.", discovery: "Nutrition" },
      { id: 78, title: "Raisin et Vin", arabic: "وَمِن ثَمَرَاتِ النَّخِيلِ وَالْأَعْنَابِ", verse: "Des fruits des palmiers et des vignes.", reference: "16:67", scientificFact: "Le raisin contient du resvératrol bénéfique.", historicalContext: "Propriétés partiellement connues.", discovery: "Œnologie moderne" },
    ]
  },
  {
    id: "physics",
    name: "Physique",
    icon: <Wind className="w-5 h-5" />,
    color: "text-cyan-400",
    miracles: [
      { id: 79, title: "Vitesse de la Lumière", arabic: "يُدَبِّرُ الْأَمْرَ... فِي يَوْمٍ كَانَ مِقْدَارُهُ أَلْفَ سَنَةٍ", verse: "En un jour équivalant à mille ans.", reference: "32:5", scientificFact: "Calcul donnant ~299,792 km/s (vitesse de la lumière).", historicalContext: "Lumière considérée instantanée.", discovery: "Ole Rømer, 1676" },
      { id: 80, title: "Atomes et Subatomique", arabic: "وَمَا يَعْزُبُ عَن رَّبِّكَ مِن مِّثْقَالِ ذَرَّةٍ", verse: "Rien n'échappe à ton Seigneur, fût-ce du poids d'un atome.", reference: "10:61", scientificFact: "Existence d'entités plus petites que l'atome.", historicalContext: "Atome = indivisible (Démocrite).", discovery: "Physique subatomique, 20ème siècle" },
      { id: 81, title: "Poids des Nuages", arabic: "السَّحَابَ الثِّقَالَ", verse: "Les nuages lourds.", reference: "13:12", scientificFact: "Un nuage peut peser des millions de tonnes.", historicalContext: "Les nuages semblaient légers.", discovery: "Météorologie" },
      { id: 82, title: "Gravité", arabic: "وَأَنزَلَ مِنَ السَّمَاءِ مَاءً", verse: "Et fait descendre l'eau du ciel.", reference: "Multiples", scientificFact: "La gravité fait 'descendre' les précipitations.", historicalContext: "Concept de gravité absent.", discovery: "Newton, 17ème siècle" },
      { id: 83, title: "Fer - Numéro Atomique", arabic: "الْحَدِيدَ", verse: "Le fer.", reference: "57:25", scientificFact: "Sourate 57, verset 25. Numéro atomique du fer = 26.", historicalContext: "Coïncidence numérique remarquable.", discovery: "Chimie moderne" },
      { id: 84, title: "Énergie du Soleil", arabic: "وَجَعَلَ الشَّمْسَ سِرَاجًا", verse: "Et a fait du soleil une lampe.", reference: "71:16", scientificFact: "Le soleil produit de l'énergie par fusion nucléaire.", historicalContext: "Source d'énergie solaire inconnue.", discovery: "Hans Bethe, 1938" },
      { id: 85, title: "Électricité Statique", arabic: "يَكَادُ سَنَا بَرْقِهِ يَذْهَبُ بِالْأَبْصَارِ", verse: "L'éclat de son éclair aveugle presque les regards.", reference: "24:43", scientificFact: "La foudre = décharge électrique intense.", historicalContext: "Nature de la foudre inconnue.", discovery: "Benjamin Franklin, 1752" },
      { id: 86, title: "Son et Espace", arabic: "تَكَادُ السَّمَاوَاتُ يَتَفَطَّرْنَ", verse: "Les cieux sont sur le point de se fendre.", reference: "19:90", scientificFact: "Le son ne se propage pas dans le vide spatial.", historicalContext: "Acoustique spatiale inconnue.", discovery: "Robert Boyle, 17ème siècle" },
    ]
  },
  {
    id: "geography",
    name: "Géographie",
    icon: <Globe className="w-5 h-5" />,
    color: "text-orange-400",
    miracles: [
      { id: 87, title: "Point le Plus Bas", arabic: "فِي أَدْنَى الْأَرْضِ", verse: "Dans la terre la plus basse.", reference: "30:3", scientificFact: "La mer Morte est le point le plus bas sur terre (-430m).", historicalContext: "Mesure altimétrique impossible.", discovery: "Cartographie moderne" },
      { id: 88, title: "Barrière Naturelle", arabic: "أَمَّن جَعَلَ الْأَرْضَ قَرَارًا وَجَعَلَ خِلَالَهَا أَنْهَارًا", verse: "Qui a fait de la terre un lieu stable avec des rivières.", reference: "27:61", scientificFact: "Géomorphologie des bassins fluviaux.", historicalContext: "Systèmes fluviaux mal compris.", discovery: "Géographie physique" },
      { id: 89, title: "Déserts et Oasis", arabic: "وَجَعَلْنَا فِيهَا جَنَّاتٍ مِّن نَّخِيلٍ وَأَعْنَابٍ وَفَجَّرْنَا فِيهَا مِنَ الْعُيُونِ", verse: "Nous y avons fait des jardins de palmiers et de vignes et y avons fait jaillir des sources.", reference: "36:34", scientificFact: "Les oasis sont alimentées par des nappes phréatiques.", historicalContext: "Hydrogéologie naissante.", discovery: "Hydrologie" },
      { id: 90, title: "Diversité Climatique", arabic: "وَفِي الْأَرْضِ قِطَعٌ مُّتَجَاوِرَاتٌ", verse: "Et sur la terre il y a des parcelles voisines.", reference: "13:4", scientificFact: "Microclimats et zones climatiques distinctes.", historicalContext: "Climatologie absente.", discovery: "Climatologie" },
      { id: 91, title: "Routes et Passages", arabic: "وَجَعَلْنَا فِيهَا فِجَاجًا سُبُلًا", verse: "Et Nous y avons fait des voies de passage.", reference: "21:31", scientificFact: "Cols de montagne et passages naturels.", historicalContext: "Géographie du terrain.", discovery: "Topographie" },
      { id: 92, title: "Terre Fertile", arabic: "وَالْبَلَدُ الطَّيِّبُ يَخْرُجُ نَبَاتُهُ", verse: "Le bon pays fait pousser sa végétation.", reference: "7:58", scientificFact: "Qualité du sol et fertilité.", historicalContext: "Pédologie naissante.", discovery: "Science des sols" },
    ]
  },
  {
    id: "history",
    name: "Histoire",
    icon: <BookOpen className="w-5 h-5" />,
    color: "text-rose-400",
    miracles: [
      { id: 93, title: "Roi vs Pharaon", arabic: "الْمَلِكُ vs فِرْعَوْنُ", verse: "Le Roi (pour Joseph) vs Pharaon (pour Moïse).", reference: "12:43 vs 28:4", scientificFact: "Les Hyksos utilisaient 'Malik', les Égyptiens 'Per-aa' (Pharaon).", historicalContext: "La Bible utilise Pharaon pour les deux époques.", discovery: "Égyptologie moderne" },
      { id: 94, title: "Corps de Pharaon Préservé", arabic: "فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ", verse: "Aujourd'hui Nous te sauvons en ton corps.", reference: "10:92", scientificFact: "La momie de Ramsès II est préservée au Caire.", historicalContext: "Momification connue mais pas cette promesse.", discovery: "Découverte de la momie" },
      { id: 95, title: "Haman en Égypte", arabic: "هَامَانَ", verse: "Haman, serviteur de Pharaon.", reference: "28:6", scientificFact: "Haman = titre égyptien de chef des carrières de pierre.", historicalContext: "La Bible place Haman en Perse (Esther).", discovery: "Hiéroglyphes déchiffrés" },
      { id: 96, title: "Peuple de 'Ad", arabic: "عَادٍ إِرَمَ ذَاتِ الْعِمَادِ", verse: "'Ad, Iram aux piliers.", reference: "89:7-8", scientificFact: "Découverte d'Ubar/Iram en Oman par satellite.", historicalContext: "Civilisation oubliée.", discovery: "Imagerie satellite, 1992" },
      { id: 97, title: "Thamud à Mada'in Salih", arabic: "ثَمُودَ الَّذِينَ جَابُوا الصَّخْرَ بِالْوَادِ", verse: "Thamud qui taillèrent le rocher dans la vallée.", reference: "89:9", scientificFact: "Tombeaux nabatéens identifiés comme traces des Thamud.", historicalContext: "Site archéologique confirmé.", discovery: "Archéologie saoudienne" },
      { id: 98, title: "Destruction de Pompéi", arabic: "فَجَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا عَلَيْهِم حِجَارَةً", verse: "Nous avons renversé [leur ville] et fait pleuvoir des pierres.", reference: "15:74", scientificFact: "Rappelle les destructions volcaniques historiques.", historicalContext: "Éruptions documentées.", discovery: "Volcanologie historique" },
      { id: 99, title: "Romains Vaincront", arabic: "غُلِبَتِ الرُّومُ... وَهُم مِّن بَعْدِ غَلَبِهِمْ سَيَغْلِبُونَ", verse: "Les Romains ont été vaincus... mais ils vaincront après.", reference: "30:2-4", scientificFact: "Prophétie accomplie : Byzance reconquit en 627.", historicalContext: "Prophétie vérifiable.", discovery: "Histoire byzantine" },
      { id: 100, title: "Manuscrits de la Mer Morte", arabic: "كُتُبِ", verse: "Livres/Écritures.", reference: "Général", scientificFact: "Les manuscrits de Qumran confirment l'altération des textes bibliques.", historicalContext: "Transmission textuelle.", discovery: "1947, Qumran" },
      { id: 101, title: "Absence de Croix", arabic: "وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ", verse: "Ils ne l'ont ni tué, ni crucifié.", reference: "4:157", scientificFact: "Débats historiques sur la crucifixion.", historicalContext: "Vision alternative documentée.", discovery: "Christologie critique" },
      { id: 102, title: "Préservation du Coran", arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ", verse: "C'est Nous qui avons fait descendre le Rappel et c'est Nous qui le préserverons.", reference: "15:9", scientificFact: "Manuscrits de Birmingham et Sanaa identiques au texte actuel.", historicalContext: "Préservation unique parmi les écritures.", discovery: "Études manuscrites modernes" },
    ]
  },
];

const embryologyStages = [
  { stage: 0, arabic: "نُطْفَة", transliteration: "Nutfa", meaning: "Goutte de sperme", quran: "Nous avons créé l'homme d'un extrait d'argile, puis Nous en fîmes une goutte dans un reposoir solide.", reference: "Sourate Al-Mu'minun (23:12-13)", modern: "Spermatozoïde fécondant l'ovule. Zygote formé.", historical: "Aristote pensait que le sperme seul formait l'embryon, l'utérus n'étant qu'un récipient.", week: "Semaine 1-2" },
  { stage: 1, arabic: "عَلَقَة", transliteration: "'Alaqa", meaning: "Substance qui s'accroche / Sangsue", quran: "Ensuite, Nous avons fait du sperme une 'alaqa (chose qui s'accroche).", reference: "Sourate Al-Mu'minun (23:14)", modern: "L'embryon s'implante dans l'utérus. Sa forme ressemble à une sangsue et il 'boit' le sang maternel.", historical: "Galien n'avait aucune connaissance de l'implantation utérine.", week: "Semaine 3-4" },
  { stage: 2, arabic: "مُضْغَة", transliteration: "Mudgha", meaning: "Morceau mâché", quran: "Et de l'adhérence Nous avons créé un embryon (mudgha).", reference: "Sourate Al-Mu'minun (23:14)", modern: "L'embryon développe des somites qui ressemblent à des marques de dents, comme un morceau de chewing-gum mâché.", historical: "Aucune observation microscopique n'était possible au 7ème siècle.", week: "Semaine 4-5" },
  { stage: 3, arabic: "عِظَام", transliteration: "'Izam", meaning: "Os", quran: "Puis, de cet embryon Nous avons créé des os.", reference: "Sourate Al-Mu'minun (23:14)", modern: "Le cartilage se forme d'abord, puis s'ossifie pour devenir des os.", historical: "On pensait que les muscles et os se formaient simultanément.", week: "Semaine 6-7" },
  { stage: 4, arabic: "لَحْم", transliteration: "Lahm", meaning: "Chair/Muscles", quran: "Et Nous avons revêtu les os de chair.", reference: "Sourate Al-Mu'minun (23:14)", modern: "Les muscles se développent autour du squelette cartilagineux, puis s'attachent aux os.", historical: "L'ordre précis (os → muscles) n'était pas connu avant l'embryologie moderne.", week: "Semaine 7-8" },
];

export const ScienceLab = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeMiracle, setActiveMiracle] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [universeExpansion, setUniverseExpansion] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];
  const currentMiracle = currentCategory.miracles[activeMiracle];

  const totalMiracles = categories.reduce((sum, cat) => sum + cat.miracles.length, 0);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setUniverseExpansion((prev) => prev >= 3 ? 1 : prev + 0.02);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const nextMiracle = () => {
    if (activeMiracle < currentCategory.miracles.length - 1) {
      setActiveMiracle(activeMiracle + 1);
    } else {
      const currentIndex = categories.findIndex(c => c.id === activeCategory);
      if (currentIndex < categories.length - 1) {
        setActiveCategory(categories[currentIndex + 1].id);
        setActiveMiracle(0);
      }
    }
  };

  const prevMiracle = () => {
    if (activeMiracle > 0) {
      setActiveMiracle(activeMiracle - 1);
    } else {
      const currentIndex = categories.findIndex(c => c.id === activeCategory);
      if (currentIndex > 0) {
        setActiveCategory(categories[currentIndex - 1].id);
        setActiveMiracle(categories[currentIndex - 1].miracles.length - 1);
      }
    }
  };

  return (
    <section id="laboratory" className="relative py-24 px-4">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="مختبر الخلق"
          title="Laboratoire de la Création"
          subtitle={`Plus de ${totalMiracles} miracles scientifiques du Coran classés par catégorie.`}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-gradient-gold">{totalMiracles}+</p>
            <p className="text-xs text-muted-foreground">Miracles documentés</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-primary">{categories.length}</p>
            <p className="text-xs text-muted-foreground">Catégories scientifiques</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-accent">1400</p>
            <p className="text-xs text-muted-foreground">Ans d'avance</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-foreground">100%</p>
            <p className="text-xs text-muted-foreground">Précision confirmée</p>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => { setActiveCategory(category.id); setActiveMiracle(0); }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
              )}
            >
              <span className={category.color}>{category.icon}</span>
              {category.name}
              <span className="text-xs opacity-70">({category.miracles.length})</span>
            </button>
          ))}
        </div>

        {/* Miracle Display */}
        <GlassCard glow className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className={currentCategory.color}>{currentCategory.icon}</span>
              <h3 className="font-display text-xl text-foreground">{currentCategory.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMiracle}
                className="p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-muted-foreground px-3">
                {activeMiracle + 1} / {currentCategory.miracles.length}
              </span>
              <button
                onClick={nextMiracle}
                className="p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {currentMiracle && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Arabic & Reference */}
              <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-3xl font-display text-gradient-gold mb-3">{currentMiracle.arabic}</p>
                <h4 className="text-lg font-medium text-foreground mb-2">{currentMiracle.title}</h4>
                <p className="text-sm text-primary font-medium">Sourate {currentMiracle.reference}</p>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h4 className="text-primary font-medium mb-2">📖 Verset Coranique</h4>
                  <p className="text-foreground/90 italic">"{currentMiracle.verse}"</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <h4 className="text-accent font-medium mb-2">🔬 Fait Scientifique</h4>
                    <p className="text-sm text-muted-foreground">{currentMiracle.scientificFact}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30">
                    <h4 className="text-muted-foreground font-medium mb-2">📜 Contexte Historique</h4>
                    <p className="text-sm text-muted-foreground">{currentMiracle.historicalContext}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-xs text-primary">
                    <strong>Découverte moderne :</strong> {currentMiracle.discovery}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Miracle Mini-List */}
          <div className="mt-6 pt-6 border-t border-glass">
            <p className="text-sm text-muted-foreground mb-3">Autres miracles dans cette catégorie :</p>
            <div className="flex flex-wrap gap-2">
              {currentCategory.miracles.map((miracle, idx) => (
                <button
                  key={miracle.id}
                  onClick={() => setActiveMiracle(idx)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs transition-all",
                    idx === activeMiracle
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                  )}
                >
                  {miracle.title}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Embryology Section */}
        <GlassCard className="mb-8">
          <h3 className="font-display text-2xl text-foreground mb-2">Embryologie Coranique</h3>
          <p className="text-muted-foreground mb-6">Faites glisser le curseur pour explorer les stades du développement embryonnaire.</p>

          <div className="mb-8">
            <input
              type="range"
              min={0}
              max={embryologyStages.length - 1}
              value={activeStage}
              onChange={(e) => setActiveStage(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              {embryologyStages.map((stage, idx) => (
                <span key={idx} className={cn(idx === activeStage && "text-primary font-medium")}>
                  {stage.week}
                </span>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-5xl font-display text-gradient-gold mb-2">{embryologyStages[activeStage].arabic}</p>
              <p className="text-xl font-display text-foreground mb-1">{embryologyStages[activeStage].transliteration}</p>
              <p className="text-muted-foreground">{embryologyStages[activeStage].meaning}</p>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="text-primary font-medium mb-2">📖 Verset Coranique</h4>
                <p className="text-foreground/90 italic">"{embryologyStages[activeStage].quran}"</p>
                <p className="text-xs text-primary mt-2">{embryologyStages[activeStage].reference}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <h4 className="text-accent font-medium mb-2">🔬 Science Moderne</h4>
                  <p className="text-sm text-muted-foreground">{embryologyStages[activeStage].modern}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30">
                  <h4 className="text-muted-foreground font-medium mb-2">📜 Croyance Historique</h4>
                  <p className="text-sm text-muted-foreground">{embryologyStages[activeStage].historical}</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Universe Expansion */}
        <GlassCard>
          <h3 className="font-display text-2xl text-foreground mb-2">Expansion de l'Univers</h3>
          <p className="text-muted-foreground mb-6">Le Coran a décrit l'expansion continue de l'univers 1300 ans avant Hubble.</p>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-background to-secondary/30">
              <div className="absolute w-4 h-4 rounded-full bg-primary/80 animate-pulse" style={{ transform: `scale(${universeExpansion})` }} />
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-2 h-2 rounded-full bg-primary/40" style={{ transform: `rotate(${i * 45}deg) translateX(${40 * universeExpansion}px) scale(${0.8 + universeExpansion * 0.2})`, transition: "transform 0.1s ease-out" }} />
              ))}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="absolute w-1 h-1 rounded-full bg-foreground/30" style={{ transform: `rotate(${i * 30}deg) translateX(${80 * universeExpansion}px)`, transition: "transform 0.1s ease-out" }} />
              ))}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-sm font-display text-gradient-gold">وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all",
                  isAnimating ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground hover:scale-105"
                )}
              >
                {isAnimating ? "Arrêter l'animation" : "Voir l'expansion"}
              </button>

              <blockquote className="border-l-2 border-primary pl-4 text-foreground/90 italic">
                « Le ciel, Nous l'avons construit par Notre puissance et Nous l'étendons [constamment]. »
                <footer className="text-primary text-xs mt-2 not-italic font-medium">Sourate Adh-Dhariyat (51:47)</footer>
              </blockquote>

              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="text-foreground font-medium mb-2">Le terme "مُوسِعُون" (Musi'un)</h4>
                <p className="text-sm text-muted-foreground">
                  Ce participe actif implique une action continue : "ceux qui étendent". L'expansion de l'univers fut découverte par Hubble en 1929, confirmant ce que le Coran affirmait depuis le 7ème siècle.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
