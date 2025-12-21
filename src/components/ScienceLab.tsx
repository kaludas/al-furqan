import { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { cn } from "@/lib/utils";

const embryologyStages = [
  {
    stage: 0,
    arabic: "نُطْفَة",
    transliteration: "Nutfa",
    meaning: "Goutte de sperme",
    quran: "Nous avons créé l'homme d'un extrait d'argile, puis Nous en fîmes une goutte dans un reposoir solide.",
    reference: "Sourate Al-Mu'minun (23:12-13)",
    modern: "Spermatozoïde fécondant l'ovule. Zygote formé.",
    historical: "Aristote pensait que le sperme seul formait l'embryon, l'utérus n'étant qu'un récipient.",
    week: "Semaine 1-2",
  },
  {
    stage: 1,
    arabic: "عَلَقَة",
    transliteration: "'Alaqa",
    meaning: "Substance qui s'accroche / Sangsue",
    quran: "Ensuite, Nous avons fait du sperme une 'alaqa (chose qui s'accroche).",
    reference: "Sourate Al-Mu'minun (23:14)",
    modern: "L'embryon s'implante dans l'utérus. Sa forme ressemble à une sangsue et il 'boit' le sang maternel.",
    historical: "Galien n'avait aucune connaissance de l'implantation utérine.",
    week: "Semaine 3-4",
  },
  {
    stage: 2,
    arabic: "مُضْغَة",
    transliteration: "Mudgha",
    meaning: "Morceau mâché",
    quran: "Et de l'adhérence Nous avons créé un embryon (mudgha).",
    reference: "Sourate Al-Mu'minun (23:14)",
    modern: "L'embryon développe des somites qui ressemblent à des marques de dents, comme un morceau de chewing-gum mâché.",
    historical: "Aucune observation microscopique n'était possible au 7ème siècle.",
    week: "Semaine 4-5",
  },
  {
    stage: 3,
    arabic: "عِظَام",
    transliteration: "'Izam",
    meaning: "Os",
    quran: "Puis, de cet embryon Nous avons créé des os.",
    reference: "Sourate Al-Mu'minun (23:14)",
    modern: "Le cartilage se forme d'abord, puis s'ossifie pour devenir des os.",
    historical: "On pensait que les muscles et os se formaient simultanément.",
    week: "Semaine 6-7",
  },
  {
    stage: 4,
    arabic: "لَحْم",
    transliteration: "Lahm",
    meaning: "Chair/Muscles",
    quran: "Et Nous avons revêtu les os de chair.",
    reference: "Sourate Al-Mu'minun (23:14)",
    modern: "Les muscles se développent autour du squelette cartilagineux, puis s'attachent aux os.",
    historical: "L'ordre précis (os → muscles) n'était pas connu avant l'embryologie moderne.",
    week: "Semaine 7-8",
  },
];

export const ScienceLab = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [universeExpansion, setUniverseExpansion] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setUniverseExpansion((prev) => {
          if (prev >= 3) {
            return 1;
          }
          return prev + 0.02;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  return (
    <section id="laboratory" className="relative py-24 px-4">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="مختبر الخلق"
          title="Laboratoire de la Création"
          subtitle="Visualisez les miracles scientifiques du Coran à travers des animations interactives."
        />

        {/* Embryology Section */}
        <GlassCard glow className="mb-8">
          <h3 className="font-display text-2xl text-foreground mb-2">Embryologie Coranique</h3>
          <p className="text-muted-foreground mb-6">Faites glisser le curseur pour explorer les stades du développement embryonnaire.</p>

          {/* Slider */}
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

          {/* Stage Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Arabic Term */}
            <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-5xl font-display text-gradient-gold mb-2">
                {embryologyStages[activeStage].arabic}
              </p>
              <p className="text-xl font-display text-foreground mb-1">
                {embryologyStages[activeStage].transliteration}
              </p>
              <p className="text-muted-foreground">
                {embryologyStages[activeStage].meaning}
              </p>
            </div>

            {/* Comparison */}
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
        <GlassCard className="animate-fade-up">
          <h3 className="font-display text-2xl text-foreground mb-2">Expansion de l'Univers</h3>
          <p className="text-muted-foreground mb-6">Le Coran a décrit l'expansion continue de l'univers 1300 ans avant Hubble.</p>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Animation */}
            <div className="relative h-64 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-background to-secondary/30">
              <div
                className="absolute w-4 h-4 rounded-full bg-primary/80 animate-pulse"
                style={{ transform: `scale(${universeExpansion})` }}
              />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/40"
                  style={{
                    transform: `rotate(${i * 45}deg) translateX(${40 * universeExpansion}px) scale(${0.8 + universeExpansion * 0.2})`,
                    transition: "transform 0.1s ease-out",
                  }}
                />
              ))}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-foreground/30"
                  style={{
                    transform: `rotate(${i * 30}deg) translateX(${80 * universeExpansion}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                />
              ))}
              
              {/* Verse Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-sm font-display text-gradient-gold">
                  وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all",
                  isAnimating
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-primary text-primary-foreground hover:scale-105"
                )}
              >
                {isAnimating ? "Arrêter l'animation" : "Voir l'expansion"}
              </button>

              <blockquote className="border-l-2 border-primary pl-4 text-foreground/90 italic">
                « Le ciel, Nous l'avons construit par Notre puissance et Nous l'étendons [constamment]. »
                <footer className="text-primary text-xs mt-2 not-italic font-medium">
                  Sourate Adh-Dhariyat (51:47)
                </footer>
              </blockquote>

              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="text-foreground font-medium mb-2">Le terme "مُوسِعُون" (Musi'un)</h4>
                <p className="text-sm text-muted-foreground">
                  Ce participe actif implique une action continue : "ceux qui étendent". 
                  L'expansion de l'univers fut découverte par Hubble en 1929, confirmant 
                  ce que le Coran affirmait depuis le 7ème siècle.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
