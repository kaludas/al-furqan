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
}

interface Myth {
  name: string;
  year: number;
  yearLabel: string;
  description: string;
  contrast: string;
}

const prophets: Prophet[] = [
  { name: "Adam", arabic: "آدم", year: -4000, yearLabel: "~4000 av. J.-C.", message: "Premier homme et prophète. Message du Tawhid pur.", location: "Paradis → Terre" },
  { name: "Noé (Nuh)", arabic: "نوح", year: -3000, yearLabel: "~3000 av. J.-C.", message: "Appel au monothéisme pendant 950 ans. Déluge.", location: "Mésopotamie" },
  { name: "Abraham (Ibrahim)", arabic: "إبراهيم", year: -2000, yearLabel: "~2000 av. J.-C.", message: "Père du monothéisme. Détruit les idoles.", location: "Ur → Canaan → Mecque" },
  { name: "Moïse (Musa)", arabic: "موسى", year: -1400, yearLabel: "~1400 av. J.-C.", message: "Torah révélée. Libération d'Égypte.", location: "Égypte → Sinaï" },
  { name: "Jésus ('Issa)", arabic: "عيسى", year: 0, yearLabel: "~1 apr. J.-C.", message: "Évangile révélé. Rappel du Tawhid.", location: "Palestine" },
  { name: "Muhammad ﷺ", arabic: "محمد", year: 610, yearLabel: "610 apr. J.-C.", message: "Sceau des prophètes. Coran révélé.", location: "Mecque → Médine" },
];

const myths: Myth[] = [
  { name: "Cultes à Mystères Égyptiens", year: -2500, yearLabel: "~2500 av. J.-C.", description: "Osiris, Isis. Secrets réservés aux prêtres.", contrast: "Savoir caché aux masses" },
  { name: "Hermès Trismégiste", year: -300, yearLabel: "~300 av. J.-C.", description: "Corpus Hermeticum. Fusion gréco-égyptienne.", contrast: "Syncrétisme, gnose élitiste" },
  { name: "Cultes de Mithra", year: -100, yearLabel: "~100 av. J.-C.", description: "Dieu solaire. 7 degrés d'initiation.", contrast: "Hiérarchie secrète" },
  { name: "Gnosticisme", year: 100, yearLabel: "~100 apr. J.-C.", description: "Démiurge, émanations. Matière = mal.", contrast: "Dualisme, savoir caché" },
  { name: "Kabbale", year: 1200, yearLabel: "~1200 apr. J.-C.", description: "Arbre de vie, Sefirot, numérologie.", contrast: "Ésotérisme, interprétation cachée" },
  { name: "Baphomet (Éliphas Lévi)", year: 1856, yearLabel: "1856 apr. J.-C.", description: "Figure androgyne. Dualité des forces.", contrast: "Occultisme moderne, syncrétisme" },
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
          subtitle="Le message unique des prophètes à travers l'histoire, face aux traditions ésotériques."
        />

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-1 inline-flex rounded-xl">
            <button
              onClick={() => setShowMyths(false)}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                !showMyths ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Prophètes uniquement
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

        {/* Timeline */}
        <GlassCard glow className="mb-8 overflow-x-auto">
          <div className="min-w-[800px] relative py-20 px-8">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full -translate-y-1/2" />

            {/* Prophets */}
            {prophets.map((prophet, idx) => (
              <div
                key={prophet.name}
                className="absolute -translate-x-1/2 cursor-pointer group"
                style={{ left: `${getPosition(prophet.year)}%`, top: "50%" }}
                onClick={() => setSelectedProphet(prophet)}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-primary border-2 border-background transition-all group-hover:scale-150",
                  idx % 2 === 0 ? "-translate-y-1/2" : "-translate-y-1/2"
                )} />
                <div className={cn(
                  "absolute whitespace-nowrap text-center transition-all group-hover:scale-110",
                  idx % 2 === 0 ? "bottom-6" : "top-6"
                )}>
                  <p className="text-lg font-display text-gradient-gold">{prophet.arabic}</p>
                  <p className="text-xs text-foreground">{prophet.name}</p>
                  <p className="text-xs text-muted-foreground">{prophet.yearLabel}</p>
                </div>
              </div>
            ))}

            {/* Myths (when toggled) */}
            {showMyths && myths.map((myth, idx) => (
              <div
                key={myth.name}
                className="absolute -translate-x-1/2 cursor-pointer group"
                style={{ left: `${getPosition(myth.year)}%`, top: "50%" }}
                onClick={() => setSelectedMyth(myth)}
              >
                <div className="w-3 h-3 rounded-full bg-destructive/70 border-2 border-background -translate-y-1/2 transition-all group-hover:scale-150" />
                <div className={cn(
                  "absolute whitespace-nowrap text-center transition-all group-hover:scale-110",
                  idx % 2 === 0 ? "top-8" : "bottom-8"
                )}>
                  <p className="text-xs text-destructive/80">{myth.name}</p>
                  <p className="text-xs text-muted-foreground">{myth.yearLabel}</p>
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
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-display text-gradient-gold">{selectedProphet.arabic}</span>
                  <div>
                    <p className="text-lg font-medium text-foreground">{selectedProphet.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedProphet.yearLabel}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{selectedProphet.message}</p>
                <p className="text-sm text-primary">📍 {selectedProphet.location}</p>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-foreground">
                    <strong>Message constant :</strong> Tous les prophètes ont appelé au Tawhid — l'adoration exclusive d'Allah, sans intermédiaire.
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
              <div className="space-y-3">
                <div>
                  <p className="text-lg font-medium text-foreground">{selectedMyth.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMyth.yearLabel}</p>
                </div>
                <p className="text-muted-foreground">{selectedMyth.description}</p>
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-foreground">
                    <strong>Contraste :</strong> {selectedMyth.contrast}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground">
                    Contrairement aux prophètes qui prêchent publiquement, les traditions ésotériques cachent leur "vérité" aux non-initiés.
                  </p>
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
      </div>
    </section>
  );
};
