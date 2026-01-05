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
    "expert.title": "Interrogez Al-Furqan",
    "expert.subtitle": "Notre IA analyse chaque question à travers cinq prismes : le regard chrétien, juif, occultiste, agnostique et enfin coranique. Elle synthétise ensuite un verdict fondé sur la cohérence logique et textuelle. L'objectif n'est pas de convaincre, mais de comprendre avant de discerner.",
    "expert.placeholder": "Posez une question théologique...",
    "expert.analyze": "Analyser",
    "expert.analyzing": "Analyse en cours...",
    
    // Symbol Scanner
    "symbol.title": "Scanner de Symboles",
    "symbol.subtitle": "Analysez n'importe quel symbole religieux ou ésotérique pour découvrir son histoire, sa signification et ses implications théologiques.",
    "symbol.placeholder": "Décrivez un symbole à analyser (ex: Croix de Lorraine, Pentagramme, Étoile de David...)",
    "symbol.scan": "Scanner le Symbole",
    "symbol.scanning": "Analyse en cours...",
    
    // Religion Comparator
    "comparator.title": "Comparateur des Religions Monothéistes",
    "comparator.subtitle": "Explorez les concepts fondamentaux à travers les trois grandes traditions abrahamiques.",
    
    // Haman Module
    "haman.title": "Le Miracle de Haman",
    "haman.subtitle": "La preuve archéologique qui réfute l'accusation de plagiat biblique.",
    "haman.verifyBible": "Vérifier la Bible",
    "haman.verifyQuran": "Vérifier le Coran",
    "haman.bibleTitle": "Haman dans la Bible",
    "haman.bibleContent": "Dans le livre d'Esther, Haman est présenté comme un ministre perse vivant vers 480 av. J.-C., soit environ 1000 ans après Moïse et le Pharaon de l'Exode.",
    "haman.quranTitle": "Haman dans le Coran",
    "haman.quranContent": "Le Coran mentionne Haman comme un proche de Pharaon, supervisant les constructions (28:38). Les critiques ont longtemps prétendu que c'était une erreur historique...",
    "haman.discovery": "La Découverte Archéologique",
    "haman.discoveryContent": "Après le déchiffrement des hiéroglyphes (Pierre de Rosette, 1822), des inscriptions au musée Hof à Vienne révèlent un \"Haman\" comme chef des carrières de pierre sous Pharaon - exactement comme décrit dans le Coran.",
    "haman.conclusion": "Comment le Prophète Muhammad ﷺ, au VIIe siècle, pouvait-il connaître ce détail historique invisible dans la Bible et indéchiffrable jusqu'au XIXe siècle ?",
    
    // Ring Composition
    "ring.title": "La Composition en Anneau",
    "ring.subtitle": "L'architecture miraculeuse de la Sourate Al-Baqara : un chiasme parfait.",
    "ring.intro": "La Sourate Al-Baqara (286 versets) est construite en miroir parfait. Le début répond à la fin, et le centre contient le message le plus important.",
    "ring.center": "Centre : Ayat al-Kursi",
    "ring.centerDesc": "Le Verset du Trône se trouve au centre exact de la structure chiasmatique, contenant le message central sur l'Unicité d'Allah.",
    "ring.question": "Comment un homme prêchant oralement pendant 23 ans, sous persécution, exil et guerres, pourrait-il placer le cœur de son message au centre mathématique exact d'un texte de 286 versets ?",
    
    // Entropy Module
    "entropy.title": "L'Argument de l'Entropie",
    "entropy.subtitle": "La Deuxième Loi de la Thermodynamique confirme le Tawhid.",
    "entropy.verse": "\"Si l'un d'eux [les cieux et la terre] contenait d'autres divinités qu'Allah, ils seraient certes dans le chaos.\"",
    "entropy.verseRef": "— Coran 21:22",
    "entropy.simulate": "Simuler avec 2 divinités",
    "entropy.reset": "Réinitialiser",
    "entropy.orderTitle": "Ordre Cosmique Actuel",
    "entropy.orderDesc": "Les constantes physiques sont réglées avec une précision de 1 sur 10^60. Les orbites planétaires restent stables depuis des milliards d'années.",
    "entropy.chaosTitle": "Simulation : Deux Volontés",
    "entropy.chaosDesc": "Avec deux centres de décision indépendants, les forces s'annulent, les orbites deviennent chaotiques, et l'entropie augmente vers le désordre total.",
    "entropy.conclusion": "La précision de l'univers nécessite une Volonté Unique. L'ordre ne peut être ni accidentel (contre l'agnosticisme) ni partagé (contre le polythéisme).",
    
    // Occult Disenchantment
    "occult.title": "Désenchantement de l'Occulte",
    "occult.subtitle": "Déconstruire le prestige des sociétés secrètes par l'analyse linguistique.",
    "occult.mirrorTitle": "Le Miroir d'Iblis",
    "occult.mirrorDesc": "Collez un texte \"illuminé\" pour révéler ses contradictions et les comparer à la clarté coranique.",
    "occult.placeholder": "Collez un texte ésotérique (Crowley, Blavatsky, textes gnostiques...)",
    "occult.analyze": "Analyser avec le Miroir",
    "occult.analyzing": "Analyse en cours...",
    
    // Floating Chat
    "chat.title": "Interroger Al-Furqan",
    "chat.placeholder": "Posez votre question théologique...",
    "chat.send": "Envoyer",
    
    // Footer
    "footer.rights": "Tous droits réservés",
    "footer.description": "Une analyse théologique comparative basée sur la raison et les textes sacrés.",
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
    "expert.title": "Consult Al-Furqan",
    "expert.subtitle": "Our AI analyzes each question through five prisms: Christian, Jewish, Occultist, Agnostic, and finally Quranic perspectives. It then synthesizes a verdict based on logical and textual coherence. The goal is not to convince, but to understand before discerning.",
    "expert.placeholder": "Ask a theological question...",
    "expert.analyze": "Analyze",
    "expert.analyzing": "Analyzing...",
    
    // Symbol Scanner
    "symbol.title": "Symbol Scanner",
    "symbol.subtitle": "Analyze any religious or esoteric symbol to discover its history, meaning, and theological implications.",
    "symbol.placeholder": "Describe a symbol to analyze (e.g., Lorraine Cross, Pentagram, Star of David...)",
    "symbol.scan": "Scan Symbol",
    "symbol.scanning": "Analyzing...",
    
    // Religion Comparator
    "comparator.title": "Monotheistic Religions Comparator",
    "comparator.subtitle": "Explore fundamental concepts across the three major Abrahamic traditions.",
    
    // Haman Module
    "haman.title": "The Haman Miracle",
    "haman.subtitle": "The archaeological evidence that refutes the claim of biblical plagiarism.",
    "haman.verifyBible": "Verify Bible",
    "haman.verifyQuran": "Verify Quran",
    "haman.bibleTitle": "Haman in the Bible",
    "haman.bibleContent": "In the Book of Esther, Haman is presented as a Persian minister living around 480 BCE, approximately 1000 years after Moses and the Pharaoh of the Exodus.",
    "haman.quranTitle": "Haman in the Quran",
    "haman.quranContent": "The Quran mentions Haman as a close associate of Pharaoh, overseeing constructions (28:38). Critics long claimed this was a historical error...",
    "haman.discovery": "The Archaeological Discovery",
    "haman.discoveryContent": "After the decipherment of hieroglyphics (Rosetta Stone, 1822), inscriptions at the Hof museum in Vienna reveal a \"Haman\" as head of stone quarries under Pharaoh - exactly as described in the Quran.",
    "haman.conclusion": "How could Prophet Muhammad ﷺ, in the 7th century, know this historical detail invisible in the Bible and undecipherable until the 19th century?",
    
    // Ring Composition
    "ring.title": "Ring Composition",
    "ring.subtitle": "The miraculous architecture of Surah Al-Baqara: a perfect chiasm.",
    "ring.intro": "Surah Al-Baqara (286 verses) is built in perfect mirror structure. The beginning responds to the end, and the center contains the most important message.",
    "ring.center": "Center: Ayat al-Kursi",
    "ring.centerDesc": "The Throne Verse is located at the exact center of the chiastic structure, containing the central message about Allah's Oneness.",
    "ring.question": "How could a man preaching orally for 23 years, under persecution, exile, and wars, place the heart of his message at the exact mathematical center of a 286-verse text?",
    
    // Entropy Module
    "entropy.title": "The Entropy Argument",
    "entropy.subtitle": "The Second Law of Thermodynamics confirms Tawhid.",
    "entropy.verse": "\"Had there been within them [the heavens and earth] gods besides Allah, they both would have been ruined.\"",
    "entropy.verseRef": "— Quran 21:22",
    "entropy.simulate": "Simulate with 2 deities",
    "entropy.reset": "Reset",
    "entropy.orderTitle": "Current Cosmic Order",
    "entropy.orderDesc": "Physical constants are tuned with a precision of 1 in 10^60. Planetary orbits have remained stable for billions of years.",
    "entropy.chaosTitle": "Simulation: Two Wills",
    "entropy.chaosDesc": "With two independent decision centers, forces cancel out, orbits become chaotic, and entropy increases toward total disorder.",
    "entropy.conclusion": "The precision of the universe requires a Single Will. Order can be neither accidental (against agnosticism) nor shared (against polytheism).",
    
    // Occult Disenchantment
    "occult.title": "Disenchantment of the Occult",
    "occult.subtitle": "Deconstructing the prestige of secret societies through linguistic analysis.",
    "occult.mirrorTitle": "The Mirror of Iblis",
    "occult.mirrorDesc": "Paste an \"illuminated\" text to reveal its contradictions and compare them to Quranic clarity.",
    "occult.placeholder": "Paste an esoteric text (Crowley, Blavatsky, Gnostic texts...)",
    "occult.analyze": "Analyze with the Mirror",
    "occult.analyzing": "Analyzing...",
    
    // Floating Chat
    "chat.title": "Consult Al-Furqan",
    "chat.placeholder": "Ask your theological question...",
    "chat.send": "Send",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.description": "A comparative theological analysis based on reason and sacred texts.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
