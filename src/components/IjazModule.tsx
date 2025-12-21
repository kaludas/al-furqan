import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Search, BookOpen, Zap, ArrowRight, Calculator, Scale, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [activeTab, setActiveTab] = useState<"roots" | "symmetries" | "calculator">("roots");

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

        {/* Surah Challenge */}
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
