import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Eye, Search, ArrowRight, Sparkles, AlertTriangle, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

interface Term {
  occult: string;
  meaningFr: string;
  meaningEn: string;
  quran: string;
  verseFr: string;
  verseEn: string;
  analysisFr: string;
  analysisEn: string;
}

const terms: Term[] = [
  {
    occult: "Gnose",
    meaningFr: "Connaissance secrète réservée aux initiés",
    meaningEn: "Secret knowledge reserved for initiates",
    quran: "ʿIlm (العلم)",
    verseFr: "Dis: 'Mon Seigneur, accroît ma science' (20:114)",
    verseEn: "Say: 'My Lord, increase me in knowledge' (20:114)",
    analysisFr: "L'Islam démocratise la connaissance. Pas de caste d'initiés, mais une invitation universelle à apprendre.",
    analysisEn: "Islam democratizes knowledge. No caste of initiates, but a universal invitation to learn.",
  },
  {
    occult: "Illumination",
    meaningFr: "Éveil spirituel par des pratiques ésotériques",
    meaningEn: "Spiritual awakening through esoteric practices",
    quran: "Nūr (النور)",
    verseFr: "Allah est la Lumière des cieux et de la terre (24:35)",
    verseEn: "Allah is the Light of the heavens and the earth (24:35)",
    analysisFr: "La vraie lumière vient d'Allah, non de rituels secrets. L'illumination est une grâce, pas une conquête.",
    analysisEn: "True light comes from Allah, not secret rituals. Illumination is grace, not conquest.",
  },
  {
    occult: "Hermétisme",
    meaningFr: "Doctrine secrète attribuée à Hermès Trismégiste",
    meaningEn: "Secret doctrine attributed to Hermes Trismegistus",
    quran: "Bayān (البيان)",
    verseFr: "Ceci est un exposé clair pour les gens (3:138)",
    verseEn: "This is a clear statement for the people (3:138)",
    analysisFr: "Le Coran rejette l'obscurantisme. Le message divin est clair, accessible, sans code secret.",
    analysisEn: "The Quran rejects obscurantism. The divine message is clear, accessible, without secret codes.",
  },
  {
    occult: "Initiation",
    meaningFr: "Rites secrets pour accéder à la vérité cachée",
    meaningEn: "Secret rites to access hidden truth",
    quran: "Shahada (الشهادة)",
    verseFr: "Il n'y a de divinité que Dieu (47:19)",
    verseEn: "There is no deity except Allah (47:19)",
    analysisFr: "L'entrée en Islam est une déclaration publique, non un rituel caché. Transparence vs. Secret.",
    analysisEn: "Entry into Islam is a public declaration, not a hidden ritual. Transparency vs. Secrecy.",
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
  const { t, language } = useLanguage();
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [mirrorText, setMirrorText] = useState("");
  const [analysis, setAnalysis] = useState<{ contradictions: string[]; liberation: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMirror = () => {
    if (!mirrorText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulated analysis (in production, this would call an AI)
    setTimeout(() => {
      setAnalysis(language === "fr" ? {
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
      } : {
        contradictions: [
          "\"Do what thou wilt\" — Contradiction: If everyone does what they want, wills inevitably clash.",
          "\"Man is the only god\" — Disguised servitude: Man becomes slave to his own desires and ego.",
          "\"No religion higher than Truth\" — Irony: This statement itself is a religious dogma.",
        ],
        liberation: [
          "\"And whoever fears Allah, He will make for him a way out\" (65:2) — Liberation through submission to the Creator.",
          "\"Allah does not burden a soul beyond that it can bear\" (2:286) — Clear framework vs. chaos of 'do what you will'.",
          "\"It is He who brings the living out of the dead\" (30:19) — True illumination comes from the Source of Light.",
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
          arabicTitle={t("occult.arabicTitle")}
          title={t("occult.title")}
          subtitle={t("occult.subtitle")}
        />

        {/* Term Analysis */}
        <div className="mt-12 space-y-6">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            {t("occult.lexicon")}
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
                <p className="text-xs text-muted-foreground">
                  {language === "fr" ? term.meaningFr : term.meaningEn}
                </p>
              </button>
            ))}
          </div>

          {selectedTerm !== null && (
            <GlassCard className="p-6 animate-fade-in" glow>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <h4 className="font-semibold text-destructive">{t("occult.occultConcept")}</h4>
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="font-bold text-foreground">{terms[selectedTerm].occult}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === "fr" ? terms[selectedTerm].meaningFr : terms[selectedTerm].meaningEn}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-semibold text-emerald-500">{t("occult.quranicAlternative")}</h4>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <p className="font-bold text-foreground">{terms[selectedTerm].quran}</p>
                    <p className="text-sm text-muted-foreground mt-1 italic">
                      "{language === "fr" ? terms[selectedTerm].verseFr : terms[selectedTerm].verseEn}"
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      {language === "fr" ? terms[selectedTerm].analysisFr : terms[selectedTerm].analysisEn}
                    </p>
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
            {t("occult.mirrorTitle")}
          </h3>
          <p className="text-muted-foreground">
            {t("occult.mirrorDesc")}
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
                placeholder={t("occult.placeholder")}
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
                    {t("occult.analyzing")}
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {t("occult.activateMirror")}
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
                      {t("occult.waitingText")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-destructive flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {t("occult.contradictions")}
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
                      {t("occult.liberation")}
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
            <h3 className="text-xl font-bold text-primary">{t("occult.verseOfLight")}</h3>
            <p className="text-lg text-foreground font-arabic leading-relaxed">
              اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ
            </p>
            <p className="text-muted-foreground italic">
              {t("occult.verseOfLightText")}
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {t("occult.conclusion")}
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
