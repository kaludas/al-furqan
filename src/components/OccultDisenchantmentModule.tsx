import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Eye, Search, ArrowRight, Sparkles, AlertTriangle, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Term {
  occult: string;
  meaning: string;
  quran: string;
  verse: string;
  analysis: string;
}

const terms: Term[] = [
  {
    occult: "Gnose",
    meaning: "Connaissance secrète réservée aux initiés",
    quran: "ʿIlm (العلم)",
    verse: "Dis: 'Mon Seigneur, accroît ma science' (20:114)",
    analysis: "L'Islam démocratise la connaissance. Pas de caste d'initiés, mais une invitation universelle à apprendre.",
  },
  {
    occult: "Illumination",
    meaning: "Éveil spirituel par des pratiques ésotériques",
    quran: "Nūr (النور)",
    verse: "Allah est la Lumière des cieux et de la terre (24:35)",
    analysis: "La vraie lumière vient d'Allah, non de rituels secrets. L'illumination est une grâce, pas une conquête.",
  },
  {
    occult: "Hermétisme",
    meaning: "Doctrine secrète attribuée à Hermès Trismégiste",
    quran: "Bayān (البيان)",
    verse: "Ceci est un exposé clair pour les gens (3:138)",
    analysis: "Le Coran rejette l'obscurantisme. Le message divin est clair, accessible, sans code secret.",
  },
  {
    occult: "Initiation",
    meaning: "Rites secrets pour accéder à la vérité cachée",
    quran: "Shahada (الشهادة)",
    verse: "Il n'y a de divinité que Dieu (47:19)",
    analysis: "L'entrée en Islam est une déclaration publique, non un rituel caché. Transparence vs. Secret.",
  },
];

const sampleTexts = [
  {
    author: "Aleister Crowley",
    text: "Do what thou wilt shall be the whole of the Law. Love is the law, love under will.",
  },
  {
    author: "Helena Blavatsky",
    text: "There is no religion higher than Truth. Man is the only god there is.",
  },
];

export const OccultDisenchantmentModule = () => {
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [mirrorText, setMirrorText] = useState("");
  const [analysis, setAnalysis] = useState<{ contradictions: string[]; liberation: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMirror = () => {
    if (!mirrorText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulated analysis (in production, this would call an AI)
    setTimeout(() => {
      setAnalysis({
        contradictions: [
          "\"Do what thou wilt\" — Contradiction : Si tous font ce qu'ils veulent, les volontés s'opposent inévitablement.",
          "\"Man is the only god\" — Servitude déguisée : L'homme devient esclave de ses propres désirs et ego.",
          "\"No religion higher than Truth\" — Ironie : Cette affirmation elle-même est un dogme religieux.",
        ],
        liberation: [
          "\"Et quiconque craint Allah, Il lui donnera une issue\" (65:2) — Libération par la soumission au Créateur.",
          "\"Allah n'impose à aucune âme une charge supérieure à sa capacité\" (2:286) — Cadre clair vs. chaos du 'fais ce que tu veux'.",
          "\"C'est Lui qui fait sortir le vivant du mort\" (30:19) — La vraie illumination vient de la Source de la Lumière.",
        ],
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const loadSample = (index: number) => {
    setMirrorText(sampleTexts[index].text);
    setAnalysis(null);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          arabicTitle="فك السحر"
          title="Désenchantement de l'Occulte"
          subtitle="Analyse linguistique : comment l'occultisme utilise des vérités partielles pour mener au Shirk"
        />

        {/* Term Analysis */}
        <div className="mt-12 space-y-6">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Lexique Comparé : Occultisme vs. Coran
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {terms.map((term, index) => (
              <button
                key={index}
                onClick={() => setSelectedTerm(selectedTerm === index ? null : index)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                  selectedTerm === index
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card/50 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold text-foreground">{term.occult}</span>
                </div>
                <p className="text-xs text-muted-foreground">{term.meaning}</p>
              </button>
            ))}
          </div>

          {selectedTerm !== null && (
            <GlassCard className="p-6 animate-fade-in" glow>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <h4 className="font-semibold text-destructive">Concept Occulte</h4>
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="font-bold text-foreground">{terms[selectedTerm].occult}</p>
                    <p className="text-sm text-muted-foreground mt-1">{terms[selectedTerm].meaning}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-semibold text-emerald-500">Alternative Coranique</h4>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <p className="font-bold text-foreground">{terms[selectedTerm].quran}</p>
                    <p className="text-sm text-muted-foreground mt-1 italic">"{terms[selectedTerm].verse}"</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">{terms[selectedTerm].analysis}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Mirror of Iblis */}
        <div className="mt-16 space-y-6">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Le Miroir d'Iblis
          </h3>
          <p className="text-muted-foreground">
            Collez un texte "illuminé" et découvrez ses contradictions internes face à la clarté coranique.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            <GlassCard className="p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => loadSample(index)}
                  >
                    {sample.author}
                  </Button>
                ))}
              </div>

              <Textarea
                placeholder="Collez ici un texte occulte ou ésotérique..."
                value={mirrorText}
                onChange={(e) => {
                  setMirrorText(e.target.value);
                  setAnalysis(null);
                }}
                className="min-h-[150px]"
              />

              <Button
                onClick={analyzeMirror}
                disabled={!mirrorText.trim() || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Activer le Miroir
                  </>
                )}
              </Button>
            </GlassCard>

            <GlassCard className="p-6" glow={!!analysis}>
              {!analysis ? (
                <div className="h-full flex items-center justify-center text-center py-12">
                  <div className="space-y-4">
                    <Eye className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                    <p className="text-muted-foreground">
                      Le miroir attend un texte à analyser
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-destructive flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Contradictions détectées
                    </h4>
                    {analysis.contradictions.map((item, index) => (
                      <p key={index} className="text-sm text-destructive/80 p-2 rounded bg-destructive/10">
                        {item}
                      </p>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-emerald-500 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Clarté libératrice du Coran
                    </h4>
                    {analysis.liberation.map((item, index) => (
                      <p key={index} className="text-sm text-emerald-500/80 p-2 rounded bg-emerald-500/10">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Verse of Light */}
        <GlassCard className="mt-8 p-6" glow>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-primary">Le Verset de la Lumière (24:35)</h3>
            <p className="text-lg text-foreground font-arabic leading-relaxed">
              اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ
            </p>
            <p className="text-muted-foreground italic">
              "Allah est la Lumière des cieux et de la terre"
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              L'occultisme promet une illumination par des chemins tortueux. Le Coran affirme 
              que la Source de toute lumière est unique et accessible — sans rituels secrets, 
              sans hiérarchies initiatiques, sans servitude cachée.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
