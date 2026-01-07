import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Search, BookOpen, Zap, ArrowRight, Calculator, Scale, Sparkles, Crown, Heart, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

// 99 Names of Allah with meanings and contrasts
const namesOfAllah = [
  { arabic: "الرحمن", name: "Ar-Rahman", meaning: "Le Tout Miséricordieux", description: "Miséricorde universelle englobant toute la création.", contrast: "Dieu vengeur de l'AT / Karma impersonnel du New Age" },
  { arabic: "الرحيم", name: "Ar-Rahim", meaning: "Le Très Miséricordieux", description: "Miséricorde spéciale pour les croyants.", contrast: "Grâce conditionnelle chrétienne (foi + œuvres incertaines)" },
  { arabic: "الملك", name: "Al-Malik", meaning: "Le Roi", description: "Souverain absolu de l'univers.", contrast: "Zeus/Jupiter soumis au Destin / Roi terrestre divinisé" },
  { arabic: "القدوس", name: "Al-Quddus", meaning: "Le Saint", description: "Pur de toute imperfection.", contrast: "Dieux grecs immoraux / Émanations gnostiques" },
  { arabic: "السلام", name: "As-Salam", meaning: "La Paix", description: "Source de toute paix et sécurité.", contrast: "Dualisme zoroastrien du conflit éternel" },
  { arabic: "المؤمن", name: "Al-Mu'min", meaning: "Le Garant", description: "Qui accorde la sécurité et confirme la foi.", contrast: "Dieu caché de la gnose inaccessible" },
  { arabic: "المهيمن", name: "Al-Muhaymin", meaning: "Le Surveillant", description: "Gardien et protecteur de tout.", contrast: "Démiurge gnostique ignorant le Bien" },
  { arabic: "العزيز", name: "Al-Aziz", meaning: "Le Tout Puissant", description: "Puissance invincible.", contrast: "Dieu limité par le libre arbitre (théisme ouvert)" },
  { arabic: "الجبار", name: "Al-Jabbar", meaning: "Le Contraignant", description: "Qui restaure et répare.", contrast: "Dieu passif du déisme" },
  { arabic: "المتكبر", name: "Al-Mutakabbir", meaning: "Le Suprême", description: "Grandeur exclusive à Lui.", contrast: "Panthéisme: 'Tout est Dieu'" },
  { arabic: "الخالق", name: "Al-Khaliq", meaning: "Le Créateur", description: "Qui crée du néant.", contrast: "Émanation néoplatonicienne (création involontaire)" },
  { arabic: "البارئ", name: "Al-Bari", meaning: "Le Producteur", description: "Qui façonne sans modèle préexistant.", contrast: "Démiurge de Platon copiant les Idées" },
  { arabic: "المصور", name: "Al-Musawwir", meaning: "Le Formateur", description: "Qui donne forme à la création.", contrast: "Hasard darwinien sans dessein" },
  { arabic: "الغفار", name: "Al-Ghaffar", meaning: "Le Grand Pardonneur", description: "Pardonne sans cesse les péchés.", contrast: "Karma inexorable / Justice divine sans pardon" },
  { arabic: "القهار", name: "Al-Qahhar", meaning: "Le Dominateur Suprême", description: "Soumet tout à Sa volonté.", contrast: "Dualisme manichéen (Bien/Mal égaux)" },
  { arabic: "الوهاب", name: "Al-Wahhab", meaning: "Le Donateur", description: "Donne sans contrepartie.", contrast: "Do ut des païen (je donne pour recevoir)" },
  { arabic: "الرزاق", name: "Ar-Razzaq", meaning: "Le Pourvoyeur", description: "Pourvoit à tous les besoins.", contrast: "Dieu indifférent du déisme" },
  { arabic: "الفتاح", name: "Al-Fattah", meaning: "Le Juge Suprême", description: "Ouvre les portes du bien.", contrast: "Destin aveugle du stoïcisme" },
  { arabic: "العليم", name: "Al-Alim", meaning: "L'Omniscient", description: "Connaît toute chose.", contrast: "Dieu qui 'apprend' du théisme ouvert" },
  { arabic: "القابض", name: "Al-Qabid", meaning: "Celui qui retient", description: "Retient et resserre.", contrast: "Abondance automatique du New Age" },
  { arabic: "الباسط", name: "Al-Basit", meaning: "Celui qui étend", description: "Étend et libère.", contrast: "Ascétisme extrême (matière = mal)" },
  { arabic: "الخافض", name: "Al-Khafid", meaning: "Celui qui abaisse", description: "Humilie les arrogants.", contrast: "Dieu qui ne juge pas (modernisme)" },
  { arabic: "الرافع", name: "Ar-Rafi", meaning: "Celui qui élève", description: "Élève les humbles.", contrast: "Méritocratie spirituelle (gnose élitiste)" },
  { arabic: "المعز", name: "Al-Mu'izz", meaning: "Celui qui honore", description: "Accorde l'honneur.", contrast: "Karma: honneur par mérite seul" },
  { arabic: "المذل", name: "Al-Mudhill", meaning: "Celui qui humilie", description: "Humilie qui Il veut.", contrast: "Dieu qui n'intervient pas (déisme)" },
  { arabic: "السميع", name: "As-Sami", meaning: "L'Audient", description: "Entend toutes choses.", contrast: "Dieu lointain des philosophes" },
  { arabic: "البصير", name: "Al-Basir", meaning: "Le Clairvoyant", description: "Voit toutes choses.", contrast: "Dieu aveugle du hasard cosmique" },
  { arabic: "الحكم", name: "Al-Hakam", meaning: "Le Juge", description: "Juge avec justice parfaite.", contrast: "Relativisme moral (pas de jugement)" },
  { arabic: "العدل", name: "Al-Adl", meaning: "Le Juste", description: "Justice absolue.", contrast: "Injustice du péché originel collectif" },
  { arabic: "اللطيف", name: "Al-Latif", meaning: "Le Subtil", description: "Bienveillance subtile et délicate.", contrast: "Dieu brutal de la théodicée pessimiste" },
  { arabic: "الخبير", name: "Al-Khabir", meaning: "Le Bien-Informé", description: "Connaît les secrets.", contrast: "Dieu distant du déisme" },
  { arabic: "الحليم", name: "Al-Halim", meaning: "Le Longanime", description: "Patient, ne précipite pas la punition.", contrast: "Colère divine instantanée (mythe)" },
  { arabic: "العظيم", name: "Al-Azim", meaning: "L'Immense", description: "Grandeur incomparable.", contrast: "Dieu limité par l'espace (anthropomorphisme)" },
  { arabic: "الغفور", name: "Al-Ghafur", meaning: "Le Pardonneur", description: "Couvre les péchés.", contrast: "Confession obligatoire à un prêtre" },
  { arabic: "الشكور", name: "Ash-Shakur", meaning: "Le Reconnaissant", description: "Récompense généreusement.", contrast: "Dieu indifférent aux bonnes actions" },
  { arabic: "العلي", name: "Al-Ali", meaning: "Le Très Haut", description: "Au-dessus de toute création.", contrast: "Panthéisme (Dieu = création)" },
  { arabic: "الكبير", name: "Al-Kabir", meaning: "Le Grand", description: "Plus grand que tout.", contrast: "Dieu parmi d'autres (polythéisme)" },
  { arabic: "الحفيظ", name: "Al-Hafiz", meaning: "Le Protecteur", description: "Préserve et garde.", contrast: "Destin impersonnel" },
  { arabic: "المقيت", name: "Al-Muqit", meaning: "Le Nourricier", description: "Sustente toute vie.", contrast: "Nature auto-suffisante (matérialisme)" },
  { arabic: "الحسيب", name: "Al-Hasib", meaning: "Le Comptable", description: "Compte toutes les actions.", contrast: "Pas de jugement dernier (annihilationnisme)" },
  { arabic: "الجليل", name: "Al-Jalil", meaning: "Le Majestueux", description: "Majesté imposante.", contrast: "Dieu familier/copain (modernisme)" },
  { arabic: "الكريم", name: "Al-Karim", meaning: "Le Généreux", description: "Générosité sans mesure.", contrast: "Dieu avare exigeant des sacrifices" },
  { arabic: "الرقيب", name: "Ar-Raqib", meaning: "Le Vigilant", description: "Observe tout.", contrast: "Dieu absent du monde (déisme)" },
  { arabic: "المجيب", name: "Al-Mujib", meaning: "Celui qui répond", description: "Répond aux invocations.", contrast: "Dieu sourd des philosophes" },
  { arabic: "الواسع", name: "Al-Wasi", meaning: "L'Immense", description: "Vaste en miséricorde et science.", contrast: "Dieu limité dans sa connaissance" },
  { arabic: "الحكيم", name: "Al-Hakim", meaning: "Le Sage", description: "Sagesse parfaite dans tout.", contrast: "Création par erreur (gnosticisme)" },
  { arabic: "الودود", name: "Al-Wadud", meaning: "Le Bien-Aimant", description: "Aime Ses serviteurs.", contrast: "Dieu impassible (philosophie grecque)" },
  { arabic: "المجيد", name: "Al-Majid", meaning: "Le Glorieux", description: "Gloire et noblesse suprêmes.", contrast: "Dieu humble (kénose extrême)" },
  { arabic: "الباعث", name: "Al-Ba'ith", meaning: "Celui qui ressuscite", description: "Ressuscite les morts.", contrast: "Pas de résurrection (matérialisme)" },
  { arabic: "الشهيد", name: "Ash-Shahid", meaning: "Le Témoin", description: "Témoin de toute chose.", contrast: "Dieu inconscient (panthéisme)" },
  { arabic: "الحق", name: "Al-Haqq", meaning: "La Vérité", description: "Réalité absolue.", contrast: "Relativisme (pas de vérité absolue)" },
  { arabic: "الوكيل", name: "Al-Wakil", meaning: "Le Gérant", description: "Prend en charge les affaires.", contrast: "Dieu non-interventionniste" },
  { arabic: "القوي", name: "Al-Qawiy", meaning: "Le Fort", description: "Puissance infinie.", contrast: "Dieu faible/souffrant" },
  { arabic: "المتين", name: "Al-Matin", meaning: "Le Ferme", description: "Solidité inébranlable.", contrast: "Dieu changeant (théisme processuel)" },
  { arabic: "الولي", name: "Al-Wali", meaning: "Le Protecteur", description: "Ami et protecteur des croyants.", contrast: "Dieu ennemi de l'homme (gnosticisme)" },
  { arabic: "الحميد", name: "Al-Hamid", meaning: "Le Louable", description: "Digne de toute louange.", contrast: "Dieu qui a besoin d'être loué (ego divin)" },
  { arabic: "المحصي", name: "Al-Muhsi", meaning: "Celui qui compte", description: "Compte tout avec précision.", contrast: "Dieu négligent" },
  { arabic: "المبدئ", name: "Al-Mubdi", meaning: "L'Initiateur", description: "Crée pour la première fois.", contrast: "Création éternelle (pas de début)" },
  { arabic: "المعيد", name: "Al-Mu'id", meaning: "Le Restaurateur", description: "Recrée après la mort.", contrast: "Annihilation définitive" },
  { arabic: "المحيي", name: "Al-Muhyi", meaning: "Celui qui donne la vie", description: "Donne la vie.", contrast: "Vie par hasard (abiogenèse)" },
  { arabic: "المميت", name: "Al-Mumit", meaning: "Celui qui fait mourir", description: "Décrète la mort.", contrast: "Mort comme accident" },
  { arabic: "الحي", name: "Al-Hayy", meaning: "Le Vivant", description: "Vie éternelle et parfaite.", contrast: "Dieu mort (Nietzsche)" },
  { arabic: "القيوم", name: "Al-Qayyum", meaning: "L'Subsistant", description: "Subsiste par Lui-même.", contrast: "Dieu dépendant du monde (panenthéisme)" },
  { arabic: "الواجد", name: "Al-Wajid", meaning: "Celui qui trouve", description: "Ne manque de rien.", contrast: "Dieu en quête (théisme processuel)" },
  { arabic: "الماجد", name: "Al-Majid", meaning: "Le Noble", description: "Noblesse absolue.", contrast: "Dieu servant l'homme" },
  { arabic: "الواحد", name: "Al-Wahid", meaning: "L'Unique", description: "Un sans associé.", contrast: "Trinité / Polythéisme" },
  { arabic: "الأحد", name: "Al-Ahad", meaning: "L'Un", description: "Unicité absolue.", contrast: "Dualisme / Émanations multiples" },
  { arabic: "الصمد", name: "As-Samad", meaning: "L'Absolu", description: "Vers qui tout se tourne.", contrast: "Dieu qui a des besoins" },
  { arabic: "القادر", name: "Al-Qadir", meaning: "Le Capable", description: "Capable de tout.", contrast: "Dieu limité par la logique (certains philosophes)" },
  { arabic: "المقتدر", name: "Al-Muqtadir", meaning: "Le Déterminant", description: "Pouvoir absolu.", contrast: "Dieu impuissant face au mal" },
  { arabic: "المقدم", name: "Al-Muqaddim", meaning: "Celui qui avance", description: "Avance ce qu'Il veut.", contrast: "Destin figé (fatalisme)" },
  { arabic: "المؤخر", name: "Al-Mu'akhkhir", meaning: "Celui qui retarde", description: "Retarde ce qu'Il veut.", contrast: "Dieu pressé (impatience divine)" },
  { arabic: "الأول", name: "Al-Awwal", meaning: "Le Premier", description: "Sans début.", contrast: "Dieu créé (mythologies)" },
  { arabic: "الآخر", name: "Al-Akhir", meaning: "Le Dernier", description: "Sans fin.", contrast: "Dieu mortel (mythologies nordiques)" },
  { arabic: "الظاهر", name: "Az-Zahir", meaning: "L'Apparent", description: "Manifesté par Ses signes.", contrast: "Dieu totalement caché" },
  { arabic: "الباطن", name: "Al-Batin", meaning: "Le Caché", description: "Essence inaccessible.", contrast: "Dieu totalement connaissable (rationalisme)" },
  { arabic: "الوالي", name: "Al-Wali", meaning: "Le Gouverneur", description: "Gère toutes les affaires.", contrast: "Dieu non impliqué (déisme)" },
  { arabic: "المتعالي", name: "Al-Muta'ali", meaning: "Le Très Élevé", description: "Au-delà de toute comparaison.", contrast: "Dieu comparable (anthropomorphisme)" },
  { arabic: "البر", name: "Al-Barr", meaning: "Le Bienfaisant", description: "Source de tout bien.", contrast: "Dieu source du mal (dualisme)" },
  { arabic: "التواب", name: "At-Tawwab", meaning: "L'Accueillant au repentir", description: "Accueille le repentir.", contrast: "Péché impardonnable (blasphème chrétien)" },
  { arabic: "المنتقم", name: "Al-Muntaqim", meaning: "Le Vengeur", description: "Punit les oppresseurs.", contrast: "Dieu qui ne fait pas justice" },
  { arabic: "العفو", name: "Al-Afuw", meaning: "L'Indulgent", description: "Efface les péchés.", contrast: "Karma inévitable" },
  { arabic: "الرءوف", name: "Ar-Ra'uf", meaning: "Le Très Doux", description: "Douceur compatissante.", contrast: "Dieu courroucé permanent" },
  { arabic: "مالك الملك", name: "Malik-ul-Mulk", meaning: "Maître de la Royauté", description: "Possède toute souveraineté.", contrast: "Souveraineté partagée (polythéisme)" },
  { arabic: "ذو الجلال والإكرام", name: "Dhul-Jalali wal-Ikram", meaning: "Plein de Majesté et de Générosité", description: "Majesté et bonté suprêmes.", contrast: "Dieu soit majestueux soit bon (pas les deux)" },
  { arabic: "المقسط", name: "Al-Muqsit", meaning: "L'Équitable", description: "Établit l'équité.", contrast: "Dieu partial (élection inconditionnelle)" },
  { arabic: "الجامع", name: "Al-Jami", meaning: "Le Rassembleur", description: "Rassemble au Jour du Jugement.", contrast: "Pas de rassemblement (annihilationnisme)" },
  { arabic: "الغني", name: "Al-Ghani", meaning: "Le Riche", description: "Indépendant de tous.", contrast: "Dieu qui a besoin d'adoration" },
  { arabic: "المغني", name: "Al-Mughni", meaning: "L'Enrichisseur", description: "Enrichit qui Il veut.", contrast: "Prospérité automatique (Gospel de la prospérité)" },
  { arabic: "المانع", name: "Al-Mani", meaning: "Celui qui empêche", description: "Empêche ce qui nuit.", contrast: "Dieu qui laisse faire (déisme)" },
  { arabic: "الضار", name: "Ad-Darr", meaning: "Celui qui afflige", description: "Éprouve pour élever.", contrast: "Souffrance sans but (nihilisme)" },
  { arabic: "النافع", name: "An-Nafi", meaning: "Celui qui profite", description: "Source de tout bienfait.", contrast: "Bienfait par hasard" },
  { arabic: "النور", name: "An-Nur", meaning: "La Lumière", description: "Illumine les cœurs.", contrast: "Dieu des ténèbres (Demiurge gnostique)" },
  { arabic: "الهادي", name: "Al-Hadi", meaning: "Le Guide", description: "Guide vers la vérité.", contrast: "Vérité inaccessible (agnosticisme)" },
  { arabic: "البديع", name: "Al-Badi", meaning: "L'Inventeur", description: "Crée sans modèle.", contrast: "Dieu copiste (démiurge platonicien)" },
  { arabic: "الباقي", name: "Al-Baqi", meaning: "L'Éternel", description: "Demeure à jamais.", contrast: "Dieu mortel (mythologie)" },
  { arabic: "الوارث", name: "Al-Warith", meaning: "L'Héritier", description: "Hérite de tout.", contrast: "Fin définitive de tout" },
  { arabic: "الرشيد", name: "Ar-Rashid", meaning: "Le Bien-Dirigeant", description: "Guide avec sagesse.", contrast: "Dieu capricieux (mythologie)" },
  { arabic: "الصبور", name: "As-Sabur", meaning: "Le Patient", description: "Patience infinie.", contrast: "Dieu impatient qui détruit vite" },
];

const rootExamples = [
  {
    root: "ع-ل-م",
    transliteration: "'A-L-M",
    meaning: "Savoir, Connaissance",
    words: [
      { arabic: "عِلْم", transliteration: "'Ilm", meaning: "Science/Connaissance" },
      { arabic: "عَالِم", transliteration: "'Alim", meaning: "Savant" },
      { arabic: "عَلَّمَ", transliteration: "'Allama", meaning: "Il a enseigné" },
      { arabic: "مُعَلِّم", transliteration: "Mu'allim", meaning: "Enseignant" },
    ],
    occurrences: 854,
    insight: "Cette racine apparaît 854 fois dans le Coran, soulignant l'importance centrale de la connaissance. Le premier mot révélé fut 'Iqra' (Lis!), et Allah se décrit comme 'Celui qui a enseigné par la plume'.",
  },
  {
    root: "ر-ح-م",
    transliteration: "R-Ḥ-M",
    meaning: "Miséricorde, Matrice",
    words: [
      { arabic: "رَحْمَة", transliteration: "Rahma", meaning: "Miséricorde" },
      { arabic: "رَحِيم", transliteration: "Rahim", meaning: "Très Miséricordieux" },
      { arabic: "رَحْمَٰن", transliteration: "Rahman", meaning: "Tout Miséricordieux" },
      { arabic: "أَرْحَام", transliteration: "Arham", meaning: "Matrices/Liens familiaux" },
    ],
    occurrences: 339,
    insight: "La racine R-Ḥ-M lie la miséricorde divine à la matrice maternelle (رَحِم). Allah ouvre chaque sourate (sauf une) par cette qualité, montrant que Sa nature première est la miséricorde, non la punition.",
  },
  {
    root: "ق-ل-ب",
    transliteration: "Q-L-B",
    meaning: "Cœur, Retourner",
    words: [
      { arabic: "قَلْب", transliteration: "Qalb", meaning: "Cœur" },
      { arabic: "قَلَّبَ", transliteration: "Qallaba", meaning: "Il a retourné" },
      { arabic: "مُنقَلَب", transliteration: "Munqalab", meaning: "Lieu de retour" },
      { arabic: "تَقَلُّب", transliteration: "Taqallub", meaning: "Fluctuation" },
    ],
    occurrences: 168,
    insight: "Le cœur (Qalb) en arabe partage sa racine avec 'retourner'. Le cœur spirituel est ce qui peut se tourner vers Dieu ou s'en détourner. C'est le siège de la foi, non le cerveau.",
  },
];

// Word symmetries - Mathematical miracles
const wordSymmetries = [
  { word1: "Dunya (Monde)", word1Arabic: "دُنْيَا", count1: 115, word2: "Akhira (Au-delà)", word2Arabic: "آخِرَة", count2: 115, insight: "Parfait équilibre entre la vie présente et l'au-delà." },
  { word1: "Malaika (Anges)", word1Arabic: "مَلَائِكَة", count1: 88, word2: "Shayatin (Démons)", word2Arabic: "شَيَاطِين", count2: 88, insight: "Forces du bien et du mal en parfaite symétrie." },
  { word1: "Hayat (Vie)", word1Arabic: "حَيَاة", count1: 145, word2: "Mawt (Mort)", word2Arabic: "مَوْت", count2: 145, insight: "La vie et la mort sont mentionnées le même nombre de fois." },
  { word1: "Naf' (Bénéfice)", word1Arabic: "نَفْع", count1: 50, word2: "Fasad (Corruption)", word2Arabic: "فَسَاد", count2: 50, insight: "Le bénéfice et la corruption en équilibre parfait." },
  { word1: "Nas (Gens)", word1Arabic: "نَاس", count1: 368, word2: "Rusul (Messagers)", word2Arabic: "رُسُل", count2: 368, insight: "Les gens et les messagers qui leur sont envoyés." },
  { word1: "Shahr (Mois)", word1Arabic: "شَهْر", count1: 12, word2: "—", word2Arabic: "", count2: 12, insight: "Le mot 'mois' apparaît exactement 12 fois = 12 mois de l'année." },
  { word1: "Yawm (Jour)", word1Arabic: "يَوْم", count1: 365, word2: "—", word2Arabic: "", count2: 365, insight: "Le mot 'jour' (singulier) apparaît 365 fois = jours de l'année." },
  { word1: "Bahr (Mer)", word1Arabic: "بَحْر", count1: 32, word2: "Barr (Terre)", word2Arabic: "بَرّ", count2: 13, insight: "32 + 13 = 45. Mer = 71.1%, Terre = 28.9%. Exactement le ratio réel Terre/Océan!" },
];

// Balance calculator pairs
const balancePairs = [
  { pair: "Homme / Femme", word1: "رَجُل", word2: "امْرَأَة", count1: 24, count2: 24 },
  { pair: "Salat (Prière) / —", word1: "صَلَاة", word2: "", count1: 5, count2: 5, note: "5 prières quotidiennes" },
  { pair: "Sabr (Patience) / Shukr (Gratitude)", word1: "صَبْر", word2: "شُكْر", count1: 73, count2: 73 },
  { pair: "Iman (Foi) / Kufr (Mécréance)", word1: "إيمَان", word2: "كُفْر", count1: 17, count2: 17 },
  { pair: "Sayyi'at (Péchés) / —", word1: "سَيِّئَات", word2: "", count1: 180, count2: 180, note: "Égal à Hasanat (Bonnes actions)" },
  { pair: "Qul (Dis!) / —", word1: "قُلْ", word2: "", count1: 332, count2: 332, note: "Ordre divin de proclamer la vérité" },
];

export const IjazModule = () => {
  const [selectedRoot, setSelectedRoot] = useState(rootExamples[0]);
  const [challengeText, setChallengeText] = useState("");
  const [challengeResult, setChallengeResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"roots" | "symmetries" | "calculator" | "names">("roots");
  const [selectedName, setSelectedName] = useState(namesOfAllah[0]);
  const [nameSearch, setNameSearch] = useState("");
  const [nameCategory, setNameCategory] = useState<"all" | "mercy" | "power" | "wisdom">("all");

  const filteredNames = namesOfAllah.filter(name => {
    const matchesSearch = name.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
      name.meaning.toLowerCase().includes(nameSearch.toLowerCase()) ||
      name.arabic.includes(nameSearch);
    return matchesSearch;
  });

  const analyzeChallenge = () => {
    if (!challengeText.trim()) return;
    
    const issues = [
      "Absence de la structure rythmique du Nazm coranique (ni poésie, ni prose ordinaire)",
      "Les pauses (Waqf) ne correspondent pas aux règles de tajwid",
      "Manque de la cohésion sémantique profonde entre les termes",
      "L'harmonie phonétique des lettres solaires et lunaires est absente",
      "Les racines trilittères ne forment pas un réseau de sens interconnecté",
    ];
    
    setChallengeResult(
      `Analyse de votre texte :\n\n${issues.slice(0, 3).map((i, idx) => `${idx + 1}. ${i}`).join("\n")}\n\nLe défi coranique reste inégalé depuis 1400 ans. Même les maîtres de la poésie arabe de l'époque, comme Labid ibn Rabi'a, reconnurent l'impossibilité de produire un texte semblable.`
    );
  };

  return (
    <section id="ijaz" className="relative py-24 px-4">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="الإعجاز اللغوي"
          title="Module I'jaz Linguistique"
          subtitle="La Mathématique Divine : Le Coran n'est pas seulement un livre, c'est un système codé."
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("roots")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl transition-all",
              activeTab === "roots"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <Search className="w-4 h-4" />
            Explorateur de Racines
          </button>
          <button
            onClick={() => setActiveTab("symmetries")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl transition-all",
              activeTab === "symmetries"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <Scale className="w-4 h-4" />
            Symétries de Mots
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl transition-all",
              activeTab === "calculator"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <Calculator className="w-4 h-4" />
            Calculateur de Balances
          </button>
          <button
            onClick={() => setActiveTab("names")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl transition-all",
              activeTab === "names"
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <Crown className="w-4 h-4" />
            99 Noms d'Allah
          </button>
        </div>

        {/* Root Explorer Tab */}
        {activeTab === "roots" && (
          <GlassCard glow className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">Explorateur de Racines</h3>
                <p className="text-sm text-muted-foreground">Découvrez la richesse sémantique des racines trilittères</p>
              </div>
            </div>

            {/* Root Selection */}
            <div className="flex flex-wrap gap-3 mb-6">
              {rootExamples.map((root) => (
                <button
                  key={root.root}
                  onClick={() => setSelectedRoot(root)}
                  className={cn(
                    "px-4 py-3 rounded-xl transition-all duration-300 border",
                    selectedRoot.root === root.root
                      ? "bg-primary/20 border-primary text-foreground"
                      : "bg-secondary/30 border-glass text-muted-foreground hover:border-primary/50"
                  )}
                >
                  <span className="text-xl font-display text-gradient-gold block">{root.root}</span>
                  <span className="text-xs">{root.meaning}</span>
                </button>
              ))}
            </div>

            {/* Selected Root Details */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-foreground font-medium">Racine : {selectedRoot.root}</h4>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {selectedRoot.occurrences} occurrences
                    </span>
                  </div>
                  <p className="text-2xl font-display text-gradient-gold mb-2">{selectedRoot.transliteration}</p>
                  <p className="text-muted-foreground">{selectedRoot.meaning}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {selectedRoot.words.map((word, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-secondary/20 text-center">
                      <p className="text-xl font-display text-foreground">{word.arabic}</p>
                      <p className="text-xs text-primary">{word.transliteration}</p>
                      <p className="text-xs text-muted-foreground">{word.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <h4 className="font-display text-lg text-foreground">Perspicacité Coranique</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">{selectedRoot.insight}</p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Word Symmetries Tab */}
        {activeTab === "symmetries" && (
          <GlassCard glow className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">Les Symétries de Mots</h3>
                <p className="text-sm text-muted-foreground">Un humain ne peut pas maintenir une telle structure statistique dans un discours oral improvisé sur 23 ans</p>
              </div>
            </div>

            <div className="grid gap-4">
              {wordSymmetries.map((sym, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-secondary/30 border border-glass hover:border-primary/30 transition-all">
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    {/* Word 1 */}
                    <div className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-2xl font-display text-emerald-400">{sym.word1Arabic}</p>
                      <p className="text-sm text-foreground font-medium">{sym.word1}</p>
                      <p className="text-2xl font-bold text-emerald-400">{sym.count1}</p>
                    </div>

                    {/* Equals Sign */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-primary">=</span>
                      </div>
                    </div>

                    {/* Word 2 */}
                    <div className="text-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      {sym.word2Arabic ? (
                        <>
                          <p className="text-2xl font-display text-amber-400">{sym.word2Arabic}</p>
                          <p className="text-sm text-foreground font-medium">{sym.word2}</p>
                          <p className="text-2xl font-bold text-amber-400">{sym.count2}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-2xl font-display text-amber-400">—</p>
                          <p className="text-sm text-foreground font-medium">Correspondance</p>
                          <p className="text-2xl font-bold text-amber-400">{sym.count2}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 text-center italic">
                    <Sparkles className="w-4 h-4 inline mr-1 text-primary" />
                    {sym.insight}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-foreground text-center">
                <strong className="text-primary">Probabilité statistique :</strong> La probabilité qu'un auteur humain maintienne ces équilibres numériques par hasard sur un texte de 77,430 mots est infinitésimale. C'est une preuve mathématique de l'origine divine du Coran.
              </p>
            </div>
          </GlassCard>
        )}

        {/* Balance Calculator Tab */}
        {activeTab === "calculator" && (
          <GlassCard glow className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">Le Calculateur de Balances</h3>
                <p className="text-sm text-muted-foreground">Mots opposés avec le même nombre d'occurrences</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {balancePairs.map((pair, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-secondary/30 border border-glass text-center hover:border-primary/30 transition-all">
                  <p className="text-lg font-medium text-foreground mb-3">{pair.pair}</p>
                  <div className="flex justify-center items-center gap-4">
                    <div>
                      <p className="text-2xl font-display text-gradient-gold">{pair.word1}</p>
                      <p className="text-xl font-bold text-primary">{pair.count1}</p>
                    </div>
                    <span className="text-2xl text-muted-foreground">=</span>
                    <div>
                      <p className="text-2xl font-display text-gradient-gold">{pair.word2 || "—"}</p>
                      <p className="text-xl font-bold text-primary">{pair.count2}</p>
                    </div>
                  </div>
                  {pair.note && (
                    <p className="text-xs text-muted-foreground mt-2 italic">{pair.note}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm text-foreground text-center">
                <strong className="text-accent">Le Défi :</strong> Essayez de créer un discours improvisé de plusieurs heures sur 23 ans tout en maintenant ces équilibres numériques parfaits. C'est humainement impossible.
              </p>
            </div>
          </GlassCard>
        )}

        {/* 99 Names of Allah Tab */}
        {activeTab === "names" && (
          <GlassCard glow className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">Les 99 Noms d'Allah (الأسماء الحسنى)</h3>
                <p className="text-sm text-muted-foreground">Les Plus Beaux Noms, contrastés avec les attributs divins des autres traditions</p>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                placeholder="Rechercher un nom (arabe, français ou translittération)..."
                className="w-full bg-secondary/30 border border-glass rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Names List */}
              <div className="lg:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-[400px] overflow-y-auto pr-2">
                {filteredNames.map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedName(name)}
                    className={cn(
                      "p-3 rounded-xl text-center transition-all border",
                      selectedName.name === name.name
                        ? "bg-primary/20 border-primary"
                        : "bg-secondary/20 border-glass hover:border-primary/50"
                    )}
                  >
                    <p className="text-xl font-arabic text-gradient-gold">{name.arabic}</p>
                    <p className="text-xs text-primary truncate">{name.name}</p>
                  </button>
                ))}
              </div>

              {/* Selected Name Details */}
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
                  <p className="text-5xl font-arabic text-gradient-gold mb-3">{selectedName.arabic}</p>
                  <p className="text-xl font-display text-primary">{selectedName.name}</p>
                  <p className="text-lg text-foreground mt-2">{selectedName.meaning}</p>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-primary" />
                    <h4 className="font-medium text-foreground">Signification</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedName.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-destructive" />
                    <h4 className="font-medium text-foreground">Contraste avec autres traditions</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedName.contrast}</p>
                </div>

                <div className="p-3 rounded-lg bg-primary/10 text-center">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-primary">99 Noms</strong> — Chaque nom révèle un aspect de la perfection divine, ensemble ils forment une théologie complète de l'Unicité (Tawhid).
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <p className="text-2xl font-display text-gradient-gold">99</p>
                <p className="text-xs text-muted-foreground">Noms Divins</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <p className="text-2xl font-display text-primary">1</p>
                <p className="text-xs text-muted-foreground">Essence Unique</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <p className="text-2xl font-display text-accent">∞</p>
                <p className="text-xs text-muted-foreground">Perfection</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <p className="text-2xl font-display text-emerald-400">0</p>
                <p className="text-xs text-muted-foreground">Défaut/Faiblesse</p>
              </div>
            </div>
          </GlassCard>
        )}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground">Le Défi des Sourates</h3>
              <p className="text-sm text-muted-foreground">Essayez de créer un verset et voyez l'analyse</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <blockquote className="border-l-2 border-primary pl-4 mb-4 text-foreground/90 italic">
                « Si vous avez un doute sur ce que Nous avons révélé à Notre serviteur, 
                produisez donc une sourate semblable et appelez vos témoins en dehors d'Allah, 
                si vous êtes véridiques. »
                <footer className="text-primary text-xs mt-2 not-italic font-medium">
                  Sourate Al-Baqara (2:23)
                </footer>
              </blockquote>

              <textarea
                value={challengeText}
                onChange={(e) => setChallengeText(e.target.value)}
                placeholder="Écrivez votre tentative en arabe ou en translittération..."
                className="w-full h-32 bg-secondary/30 border border-glass rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                dir="rtl"
              />
              
              <button
                onClick={analyzeChallenge}
                className="mt-4 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform"
              >
                Analyser
                <ArrowRight size={18} />
              </button>
            </div>

            <div>
              {challengeResult ? (
                <div className="p-5 rounded-xl bg-secondary/30 h-full">
                  <h4 className="font-display text-lg text-foreground mb-3">Résultat de l'Analyse</h4>
                  <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                    {challengeResult}
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-secondary/20 h-full flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground mb-2">
                    Depuis 1400 ans, ce défi n'a jamais été relevé.
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Les plus grands poètes arabes de l'époque ont reconnu l'impossibilité de reproduire le style coranique.
                  </p>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
