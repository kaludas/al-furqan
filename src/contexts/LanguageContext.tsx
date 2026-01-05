import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.expert": "Expert IA",
    "nav.ijaz": "I'jaz",
    "nav.timeline": "Chronologie",
    "nav.laboratory": "Laboratoire",
    "nav.tawhid": "Tawhid",
    "nav.fitra": "Fitra",
    
    // Hero Section
    "hero.subtitle": "Analyse Théologique Comparative",
    "hero.title": "Al-Furqan",
    "hero.titleGold": "Le Discriminateur",
    "hero.description": "Théologie comparée : Islam, Christianisme, Judaïsme et Occultisme. Une analyse rigoureuse qui sépare la vérité de l'illusion.",
    "hero.ijaz": "I'jaz",
    "hero.ijazDesc": "L'Inimitable",
    "hero.tawhid": "Tawhid",
    "hero.tawhidDesc": "L'Unicité Divine",
    "hero.ilm": "'Ilm",
    "hero.ilmDesc": "La Connaissance",
    
    // Expert Chat
    "expert.arabicTitle": "بوصلة الحقيقة",
    "expert.title": "Interrogez Al-Furqan",
    "expert.subtitle": "Notre IA analyse chaque question à travers cinq prismes : le regard chrétien, juif, occultiste, agnostique et enfin coranique. Elle synthétise ensuite un verdict fondé sur la cohérence logique et textuelle. L'objectif n'est pas de convaincre, mais de comprendre avant de discerner.",
    "expert.placeholder": "Posez une question théologique...",
    "expert.analyze": "Analyser",
    "expert.analyzing": "Analyse en cours...",
    
    // Symbol Scanner
    "symbol.arabicTitle": "فك رموز الباطل",
    "symbol.title": "Scanner de Symboles",
    "symbol.subtitle": "Uploadez une image d'un symbole occulte et l'IA analysera son origine historique et expliquera la perspective coranique du Tawhid.",
    "symbol.analyzeTitle": "Analyser un Symbole",
    "symbol.analyzeDesc": "Pentagramme, Baphomet, Œil d'Horus...",
    "symbol.clickUpload": "Cliquez pour uploader",
    "symbol.dragDrop": "ou glissez-déposez une image",
    "symbol.maxSize": "PNG, JPG jusqu'à 5MB",
    "symbol.maxSizeError": "L'image ne doit pas dépasser 5MB",
    "symbol.analyzeBtn": "Analyser ce symbole",
    "symbol.analyzing": "Analyse en cours...",
    "symbol.perspectiveTitle": "Perspective du Tawhid",
    "symbol.perspectiveDesc": "Analyse et réfutation par la logique coranique",
    "symbol.uploadPrompt": "Uploadez un symbole pour l'analyser",
    "symbol.uploadInfo": "L'IA expliquera son origine humaine et comment le Tawhid libère de la superstition.",
    "symbol.tawhidTitle": "Tawhid",
    "symbol.tawhidDesc": "L'Unicité d'Allah dissipe les superstitions et libère l'esprit humain.",
    "symbol.originTitle": "Origine Humaine",
    "symbol.originDesc": "Tous les symboles occultes ont une origine historique documentée.",
    "symbol.liberationTitle": "Libération",
    "symbol.liberationDesc": "Le Coran libère de la peur des symboles et des superstitions.",
    "symbol.tawhidReminder": "Rappel du Tawhid :",
    "symbol.tawhidReminderText": "Allah est Un, sans associé ni image. Les symboles occultes sont des créations humaines qui ne possèdent aucun pouvoir. Le Coran libère l'homme de cette \"servitude symbolique\" pour le ramener au Créateur Unique.",
    
    // Religion Comparator
    "comparator.arabicTitle": "مقارنة الأديان",
    "comparator.title": "Comparateur des Religions Monothéistes",
    "comparator.subtitle": "Analyse comparative détaillée des trois grandes religions abrahamiques sur les thèmes théologiques essentiels.",
    "comparator.christianity": "Christianisme",
    "comparator.judaism": "Judaïsme",
    "comparator.islam": "Islam",
    "comparator.middleWay": "La Voie du Milieu (الوسطية)",
    "comparator.christianityNote": "Excès de divinisation humaine (Jésus = Dieu). Complexité théologique (Trinité). Médiation cléricale nécessaire.",
    "comparator.islamNote": "Équilibre parfait : Monothéisme pur sans complexité. Jésus honoré comme prophète. Relation directe avec Dieu.",
    "comparator.judaismNote": "Rejet excessif de Jésus. Loi parfois alourdie (Talmud). Concept de peuple élu ethnique.",
    
    // Haman Module
    "haman.arabicTitle": "هامان",
    "haman.title": "Le Miracle de Haman",
    "haman.subtitle": "L'argument archéologique définitif : comment le Coran mentionne un personnage historique que seuls les hiéroglyphes pouvaient révéler",
    "haman.contextTitle": "Le Contexte Historique",
    "haman.contextIntro": "Le Coran mentionne \"Haman\" comme un ministre de Pharaon en Égypte. Pendant des siècles, les critiques ont affirmé qu'il s'agissait d'une erreur grossière...",
    "haman.objection": "Objection classique : \"Dans la Bible, Haman est un Perse vivant 1000 ans après Pharaon ! Muhammad a confondu les deux récits.\"",
    "haman.until": "Cette critique semblait irréfutable... jusqu'au déchiffrement de la Pierre de Rosette au XIXe siècle.",
    "haman.verifyBible": "Vérifier la Bible",
    "haman.verifyQuran": "Vérifier le Coran",
    "haman.clickCompare": "Cliquez sur un bouton pour comparer les sources",
    "haman.inBible": "Dans la Bible",
    "haman.inQuran": "Dans le Coran",
    "haman.bookEsther": "Livre d'Esther (Ve siècle av. J.-C.)",
    "haman.estherQuote": "\"Après ces choses, le roi Assuérus [Xerxès Ier de Perse] éleva Haman, fils d'Hammedatha, l'Agaguite...\"",
    "haman.chronoProblem": "Problème chronologique",
    "haman.biblicalHaman": "Haman biblique : Perse, ~480 av. J.-C.",
    "haman.pharaohMoses": "Pharaon de Moïse : Égypte, ~1250 av. J.-C.",
    "haman.gap": "Écart : environ 800 ans et deux civilisations différentes",
    "haman.whyCopy": "Si Muhammad avait copié la Bible, pourquoi aurait-il placé Haman en Égypte plutôt qu'en Perse ?",
    "haman.surahQasas": "Sourate Al-Qasas (28:38)",
    "haman.qasasQuote": "\"Et Pharaon dit : 'Ô notables, je ne vous connais pas de divinité autre que moi. Allume-moi donc, ô Haman, un feu sur l'argile et construis-moi une tour...'\"",
    "haman.revealProof": "Révéler la preuve archéologique",
    "haman.hideProof": "Masquer",
    "haman.discoveryTitle": "Découverte au Musée Hofburg, Vienne",
    "haman.discoveryText": "Une inscription hiéroglyphique mentionne un fonctionnaire égyptien nommé \"Haman\" (Ha-Amen) comme chef des carrières de pierre — exactement le rôle décrit dans le Coran !",
    "haman.source": "Source :",
    "haman.sourceText": "\"Die Altaegyptischen Personennamen\" de H. Ranke, Institut Archéologique Allemand, 1935",
    "haman.correctName": "Nom correct : Haman",
    "haman.correctEra": "Époque correcte : Égypte pharaonique",
    "haman.correctRole": "Fonction correcte : Travaux de construction",
    "haman.decisiveQuestion": "La Question Décisive",
    "haman.conclusionQuestion": "Comment Muhammad ﷺ, au VIIe siècle en Arabie, pouvait-il connaître le nom d'un fonctionnaire égyptien antique que seul le déchiffrement des hiéroglyphes — réalisé 1200 ans plus tard — pouvait révéler ?",
    "haman.conclusion": "La Bible contenait une erreur. Le Coran contenait la vérité historique.",
    
    // Ring Composition
    "ring.arabicTitle": "البقرة",
    "ring.title": "Ring Composition : L'Architecture Miraculeuse",
    "ring.subtitle": "Comment 286 versets révélés sur 23 ans forment une structure en miroir mathématiquement parfaite",
    "ring.chiasmStructure": "Structure en Chiasme",
    "ring.visualization": "Visualisation de la Structure",
    "ring.ayatKursi": "Ayat al-Kursi (v.255)",
    "ring.ayatKursiDesc": "Le Verset du Trône se trouve au centre exact de la structure en anneau de Sourate Al-Baqara. Ce verset, considéré comme le plus grand du Coran, proclame l'Unicité absolue d'Allah — le cœur du message coranique.",
    "ring.shockArgument": "L'Argument Choc",
    "ring.shockText": "Le Coran a été révélé oralement, verset par verset, sur 23 ans, en réponse à des événements contemporains. Comment un homme prêchant dans ces conditions pourrait-il placer le cœur de son message au centre mathématique exact d'un texte de plusieurs centaines de pages ?",
    "ring.verses": "286 versets",
    "ring.years": "23 ans de révélation",
    "ring.structure": "1 structure parfaite",
    "ring.mirrorDesc": "Les versets {start} et {end} traitent du même thème avec une symétrie structurelle parfaite, comme un miroir littéraire.",
    
    // Entropy Module
    "entropy.arabicTitle": "الإنتروبيا",
    "entropy.title": "L'Agnostique face à l'Entropie",
    "entropy.subtitle": "La Deuxième Loi de la Thermodynamique démontre mathématiquement l'impossibilité du polythéisme",
    "entropy.simulation": "Simulation du Cosmos",
    "entropy.verse": "\"S'il y avait dans [les cieux et la terre] des divinités autres qu'Allah, ils seraient certainement dans le chaos.\"",
    "entropy.verseRef": "Sourate Al-Anbiya (21:22)",
    "entropy.godCount": "Nombre de divinités :",
    "entropy.start": "Lancer",
    "entropy.stop": "Arrêter",
    "entropy.theSimulation": "la simulation",
    "entropy.chaosLevel": "Niveau de chaos :",
    "entropy.cosmicOrder": "Ordre Cosmique",
    "entropy.growingDisorder": "Désordre Croissant",
    "entropy.singleWill": "Une Volonté Unique maintient l'harmonie des orbites et la précision des constantes physiques.",
    "entropy.multipleWills": "Avec {count} volontés concurrentes, chaque décision contradictoire accroît l'entropie du système.",
    "entropy.orderResult": "L'ordre cosmique résulte d'une Volonté Unique et cohérente",
    "entropy.chaosResult": "Les volontés concurrentes créent inévitablement le chaos",
    "entropy.againstAgnosticism": "Contre l'Agnosticisme",
    "entropy.againstAgnosticismText": "L'ordre n'est pas un accident. Les constantes physiques finement réglées et les lois mathématiques de l'univers témoignent d'une Intelligence.",
    "entropy.againstPolytheism": "Contre le Polythéisme",
    "entropy.againstPolytheismText": "Cet ordre ne peut être partagé. Deux volontés absolues sont logiquement contradictoires — confirmant le Tawhid coranique.",
    
    // Occult Disenchantment
    "occult.arabicTitle": "فك السحر",
    "occult.title": "Désenchantement de l'Occulte",
    "occult.subtitle": "Analyse linguistique : comment l'occultisme utilise des vérités partielles pour mener au Shirk",
    "occult.lexicon": "Lexique Comparé : Occultisme vs. Coran",
    "occult.occultConcept": "Concept Occulte",
    "occult.quranicAlternative": "Alternative Coranique",
    "occult.mirrorTitle": "Le Miroir d'Iblis",
    "occult.mirrorDesc": "Collez un texte \"illuminé\" et découvrez ses contradictions internes face à la clarté coranique.",
    "occult.placeholder": "Collez ici un texte occulte ou ésotérique...",
    "occult.activateMirror": "Activer le Miroir",
    "occult.analyzing": "Analyse en cours...",
    "occult.waitingText": "Le miroir attend un texte à analyser",
    "occult.contradictions": "Contradictions détectées",
    "occult.liberation": "Clarté libératrice du Coran",
    "occult.verseOfLight": "Le Verset de la Lumière (24:35)",
    "occult.verseOfLightText": "\"Allah est la Lumière des cieux et de la terre\"",
    "occult.conclusion": "L'occultisme promet une illumination par des chemins tortueux. Le Coran affirme que la Source de toute lumière est unique et accessible — sans rituels secrets, sans hiérarchies initiatiques, sans servitude cachée.",
    
    // Floating Chat
    "chat.title": "Al-Furqan",
    "chat.subtitle": "Assistant en théologie comparée",
    "chat.close": "Fermer le chat",
    "chat.open": "Interroger Al-Furqan",
    "chat.askQuestion": "Posez votre question",
    "chat.example": "Ex: \"Compare la Trinité et le Tawhid\"",
    "chat.placeholder": "Votre question...",
    "chat.error": "Une erreur s'est produite. Veuillez réessayer.",
    
    // Footer
    "footer.bismillah": "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux",
    "footer.sources": "Analyse basée sur les exégèses classiques (Tafsir Ibn Kathir, Al-Qurtubi, At-Tabari) et sources académiques en théologie comparée.",
    
    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.close": "Fermer",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.expert": "AI Expert",
    "nav.ijaz": "I'jaz",
    "nav.timeline": "Timeline",
    "nav.laboratory": "Laboratory",
    "nav.tawhid": "Tawhid",
    "nav.fitra": "Fitra",
    
    // Hero Section
    "hero.subtitle": "Comparative Theological Analysis",
    "hero.title": "Al-Furqan",
    "hero.titleGold": "The Criterion",
    "hero.description": "Comparative theology: Islam, Christianity, Judaism and Occultism. A rigorous analysis that separates truth from illusion.",
    "hero.ijaz": "I'jaz",
    "hero.ijazDesc": "The Inimitable",
    "hero.tawhid": "Tawhid",
    "hero.tawhidDesc": "Divine Oneness",
    "hero.ilm": "'Ilm",
    "hero.ilmDesc": "Knowledge",
    
    // Expert Chat
    "expert.arabicTitle": "بوصلة الحقيقة",
    "expert.title": "Consult Al-Furqan",
    "expert.subtitle": "Our AI analyzes each question through five prisms: Christian, Jewish, Occultist, Agnostic, and finally Quranic perspectives. It then synthesizes a verdict based on logical and textual coherence. The goal is not to convince, but to understand before discerning.",
    "expert.placeholder": "Ask a theological question...",
    "expert.analyze": "Analyze",
    "expert.analyzing": "Analyzing...",
    
    // Symbol Scanner
    "symbol.arabicTitle": "فك رموز الباطل",
    "symbol.title": "Symbol Scanner",
    "symbol.subtitle": "Upload an image of an occult symbol and the AI will analyze its historical origin and explain the Quranic perspective of Tawhid.",
    "symbol.analyzeTitle": "Analyze a Symbol",
    "symbol.analyzeDesc": "Pentagram, Baphomet, Eye of Horus...",
    "symbol.clickUpload": "Click to upload",
    "symbol.dragDrop": "or drag and drop an image",
    "symbol.maxSize": "PNG, JPG up to 5MB",
    "symbol.maxSizeError": "Image must not exceed 5MB",
    "symbol.analyzeBtn": "Analyze this symbol",
    "symbol.analyzing": "Analyzing...",
    "symbol.perspectiveTitle": "Tawhid Perspective",
    "symbol.perspectiveDesc": "Analysis and refutation through Quranic logic",
    "symbol.uploadPrompt": "Upload a symbol to analyze",
    "symbol.uploadInfo": "The AI will explain its human origin and how Tawhid liberates from superstition.",
    "symbol.tawhidTitle": "Tawhid",
    "symbol.tawhidDesc": "Allah's Oneness dispels superstitions and liberates the human mind.",
    "symbol.originTitle": "Human Origin",
    "symbol.originDesc": "All occult symbols have a documented historical origin.",
    "symbol.liberationTitle": "Liberation",
    "symbol.liberationDesc": "The Quran liberates from fear of symbols and superstitions.",
    "symbol.tawhidReminder": "Tawhid Reminder:",
    "symbol.tawhidReminderText": "Allah is One, without partner or image. Occult symbols are human creations that possess no power. The Quran liberates mankind from this \"symbolic servitude\" to return to the One Creator.",
    
    // Religion Comparator
    "comparator.arabicTitle": "مقارنة الأديان",
    "comparator.title": "Monotheistic Religions Comparator",
    "comparator.subtitle": "Detailed comparative analysis of the three major Abrahamic religions on essential theological themes.",
    "comparator.christianity": "Christianity",
    "comparator.judaism": "Judaism",
    "comparator.islam": "Islam",
    "comparator.middleWay": "The Middle Way (الوسطية)",
    "comparator.christianityNote": "Excess deification of human (Jesus = God). Theological complexity (Trinity). Clerical mediation necessary.",
    "comparator.islamNote": "Perfect balance: Pure monotheism without complexity. Jesus honored as prophet. Direct relationship with God.",
    "comparator.judaismNote": "Excessive rejection of Jesus. Law sometimes burdened (Talmud). Ethnic chosen people concept.",
    
    // Haman Module
    "haman.arabicTitle": "هامان",
    "haman.title": "The Haman Miracle",
    "haman.subtitle": "The definitive archaeological argument: how the Quran mentions a historical figure that only hieroglyphics could reveal",
    "haman.contextTitle": "The Historical Context",
    "haman.contextIntro": "The Quran mentions \"Haman\" as a minister of Pharaoh in Egypt. For centuries, critics claimed this was a gross error...",
    "haman.objection": "Classic objection: \"In the Bible, Haman is a Persian living 1000 years after Pharaoh! Muhammad confused the two stories.\"",
    "haman.until": "This criticism seemed irrefutable... until the decipherment of the Rosetta Stone in the 19th century.",
    "haman.verifyBible": "Verify Bible",
    "haman.verifyQuran": "Verify Quran",
    "haman.clickCompare": "Click a button to compare sources",
    "haman.inBible": "In the Bible",
    "haman.inQuran": "In the Quran",
    "haman.bookEsther": "Book of Esther (5th century BCE)",
    "haman.estherQuote": "\"After these things, King Ahasuerus [Xerxes I of Persia] promoted Haman, the son of Hammedatha the Agagite...\"",
    "haman.chronoProblem": "Chronological Problem",
    "haman.biblicalHaman": "Biblical Haman: Persia, ~480 BCE",
    "haman.pharaohMoses": "Pharaoh of Moses: Egypt, ~1250 BCE",
    "haman.gap": "Gap: about 800 years and two different civilizations",
    "haman.whyCopy": "If Muhammad had copied the Bible, why would he place Haman in Egypt rather than Persia?",
    "haman.surahQasas": "Surah Al-Qasas (28:38)",
    "haman.qasasQuote": "\"And Pharaoh said: 'O eminent ones, I have not known for you any god other than me. Then ignite for me, O Haman, [a fire] upon the clay and make for me a tower...'\"",
    "haman.revealProof": "Reveal archaeological proof",
    "haman.hideProof": "Hide",
    "haman.discoveryTitle": "Discovery at Hofburg Museum, Vienna",
    "haman.discoveryText": "A hieroglyphic inscription mentions an Egyptian official named \"Haman\" (Ha-Amen) as head of stone quarries — exactly the role described in the Quran!",
    "haman.source": "Source:",
    "haman.sourceText": "\"Die Altaegyptischen Personennamen\" by H. Ranke, German Archaeological Institute, 1935",
    "haman.correctName": "Correct name: Haman",
    "haman.correctEra": "Correct era: Pharaonic Egypt",
    "haman.correctRole": "Correct function: Construction works",
    "haman.decisiveQuestion": "The Decisive Question",
    "haman.conclusionQuestion": "How could Prophet Muhammad ﷺ, in 7th century Arabia, know the name of an ancient Egyptian official that only the decipherment of hieroglyphics — achieved 1200 years later — could reveal?",
    "haman.conclusion": "The Bible contained an error. The Quran contained historical truth.",
    
    // Ring Composition
    "ring.arabicTitle": "البقرة",
    "ring.title": "Ring Composition: The Miraculous Architecture",
    "ring.subtitle": "How 286 verses revealed over 23 years form a mathematically perfect mirror structure",
    "ring.chiasmStructure": "Chiastic Structure",
    "ring.visualization": "Structure Visualization",
    "ring.ayatKursi": "Ayat al-Kursi (v.255)",
    "ring.ayatKursiDesc": "The Throne Verse is located at the exact center of the ring structure of Surah Al-Baqara. This verse, considered the greatest in the Quran, proclaims Allah's absolute Oneness — the heart of the Quranic message.",
    "ring.shockArgument": "The Shock Argument",
    "ring.shockText": "The Quran was revealed orally, verse by verse, over 23 years, in response to contemporary events. How could a man preaching under these conditions place the heart of his message at the exact mathematical center of a text of several hundred pages?",
    "ring.verses": "286 verses",
    "ring.years": "23 years of revelation",
    "ring.structure": "1 perfect structure",
    "ring.mirrorDesc": "Verses {start} and {end} deal with the same theme with perfect structural symmetry, like a literary mirror.",
    
    // Entropy Module
    "entropy.arabicTitle": "الإنتروبيا",
    "entropy.title": "The Agnostic Facing Entropy",
    "entropy.subtitle": "The Second Law of Thermodynamics mathematically demonstrates the impossibility of polytheism",
    "entropy.simulation": "Cosmos Simulation",
    "entropy.verse": "\"Had there been within them [the heavens and earth] gods besides Allah, they both would have been ruined.\"",
    "entropy.verseRef": "Surah Al-Anbiya (21:22)",
    "entropy.godCount": "Number of deities:",
    "entropy.start": "Start",
    "entropy.stop": "Stop",
    "entropy.theSimulation": "simulation",
    "entropy.chaosLevel": "Chaos level:",
    "entropy.cosmicOrder": "Cosmic Order",
    "entropy.growingDisorder": "Growing Disorder",
    "entropy.singleWill": "A Single Will maintains the harmony of orbits and the precision of physical constants.",
    "entropy.multipleWills": "With {count} competing wills, each contradictory decision increases the system's entropy.",
    "entropy.orderResult": "Cosmic order results from a Single coherent Will",
    "entropy.chaosResult": "Competing wills inevitably create chaos",
    "entropy.againstAgnosticism": "Against Agnosticism",
    "entropy.againstAgnosticismText": "Order is not an accident. The finely tuned physical constants and mathematical laws of the universe testify to an Intelligence.",
    "entropy.againstPolytheism": "Against Polytheism",
    "entropy.againstPolytheismText": "This order cannot be shared. Two absolute wills are logically contradictory — confirming the Quranic Tawhid.",
    
    // Occult Disenchantment
    "occult.arabicTitle": "فك السحر",
    "occult.title": "Disenchantment of the Occult",
    "occult.subtitle": "Linguistic analysis: how occultism uses partial truths to lead to Shirk",
    "occult.lexicon": "Comparative Lexicon: Occultism vs. Quran",
    "occult.occultConcept": "Occult Concept",
    "occult.quranicAlternative": "Quranic Alternative",
    "occult.mirrorTitle": "The Mirror of Iblis",
    "occult.mirrorDesc": "Paste an \"illuminated\" text and discover its internal contradictions against Quranic clarity.",
    "occult.placeholder": "Paste an occult or esoteric text here...",
    "occult.activateMirror": "Activate the Mirror",
    "occult.analyzing": "Analyzing...",
    "occult.waitingText": "The mirror is waiting for a text to analyze",
    "occult.contradictions": "Contradictions detected",
    "occult.liberation": "Liberating clarity of the Quran",
    "occult.verseOfLight": "The Verse of Light (24:35)",
    "occult.verseOfLightText": "\"Allah is the Light of the heavens and the earth\"",
    "occult.conclusion": "Occultism promises illumination through tortuous paths. The Quran affirms that the Source of all light is unique and accessible — without secret rituals, without initiatic hierarchies, without hidden servitude.",
    
    // Floating Chat
    "chat.title": "Al-Furqan",
    "chat.subtitle": "Comparative theology assistant",
    "chat.close": "Close chat",
    "chat.open": "Consult Al-Furqan",
    "chat.askQuestion": "Ask your question",
    "chat.example": "E.g.: \"Compare the Trinity and Tawhid\"",
    "chat.placeholder": "Your question...",
    "chat.error": "An error occurred. Please try again.",
    
    // Footer
    "footer.bismillah": "In the name of Allah, the Most Gracious, the Most Merciful",
    "footer.sources": "Analysis based on classical exegeses (Tafsir Ibn Kathir, Al-Qurtubi, At-Tabari) and academic sources in comparative theology.",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.close": "Close",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('al-furqan-language');
      return (saved as Language) || "fr";
    }
    return "fr";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('al-furqan-language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
