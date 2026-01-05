import { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Atom, Plus, Minus, Play, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Planet {
  id: number;
  angle: number;
  speed: number;
  distance: number;
  color: string;
  chaos: number;
}

export const EntropyModule = () => {
  const { t } = useLanguage();
  const [godCount, setGodCount] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [time, setTime] = useState(0);

  const initializePlanets = () => {
    const initialPlanets: Planet[] = [
      { id: 1, angle: 0, speed: 2, distance: 60, color: "#60a5fa", chaos: 0 },
      { id: 2, angle: 120, speed: 1.5, distance: 90, color: "#f472b6", chaos: 0 },
      { id: 3, angle: 240, speed: 1, distance: 120, color: "#4ade80", chaos: 0 },
    ];
    setPlanets(initialPlanets);
    setChaosLevel(0);
    setTime(0);
  };

  useEffect(() => {
    initializePlanets();
  }, []);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTime((t) => t + 1);
      
      setPlanets((prev) =>
        prev.map((planet) => {
          // With multiple gods, introduce chaos
          const chaosMultiplier = godCount > 1 ? (godCount - 1) * 0.15 : 0;
          const randomChaos = godCount > 1 ? (Math.random() - 0.5) * chaosMultiplier * 20 : 0;
          
          const newChaos = Math.min(planet.chaos + (godCount > 1 ? 0.5 : -0.1), 100);
          const chaosDistance = godCount > 1 ? randomChaos : 0;
          
          return {
            ...planet,
            angle: (planet.angle + planet.speed + randomChaos) % 360,
            distance: Math.max(30, Math.min(150, planet.distance + chaosDistance)),
            chaos: Math.max(0, newChaos),
          };
        })
      );

      setChaosLevel((prev) => {
        if (godCount === 1) return Math.max(0, prev - 1);
        return Math.min(100, prev + godCount * 2);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isSimulating, godCount]);

  const resetSimulation = () => {
    setIsSimulating(false);
    setGodCount(1);
    initializePlanets();
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          arabicTitle={t("entropy.arabicTitle")}
          title={t("entropy.title")}
          subtitle={t("entropy.subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* Control Panel */}
          <GlassCard className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20">
                <Atom className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t("entropy.simulation")}</h3>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">{t("entropy.verseRef")}</p>
              <p className="text-foreground italic">
                {t("entropy.verse")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">{t("entropy.godCount")}</span>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setGodCount(Math.max(1, godCount - 1))}
                    disabled={godCount <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className={`text-2xl font-bold w-8 text-center ${
                    godCount === 1 ? "text-emerald-500" : "text-destructive"
                  }`}>
                    {godCount}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setGodCount(Math.min(5, godCount + 1))}
                    disabled={godCount >= 5}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className="flex-1"
                  variant={isSimulating ? "destructive" : "default"}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isSimulating ? t("entropy.stop") : t("entropy.start")} {t("entropy.theSimulation")}
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chaos meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("entropy.chaosLevel")}</span>
                <span className={`font-bold ${
                  chaosLevel < 30 ? "text-emerald-500" : 
                  chaosLevel < 70 ? "text-yellow-500" : "text-destructive"
                }`}>
                  {Math.round(chaosLevel)}%
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    chaosLevel < 30 ? "bg-emerald-500" : 
                    chaosLevel < 70 ? "bg-yellow-500" : "bg-destructive"
                  }`}
                  style={{ width: `${chaosLevel}%` }}
                />
              </div>
            </div>

            {/* Status */}
            <div className={`p-4 rounded-lg border ${
              godCount === 1 
                ? "bg-emerald-500/10 border-emerald-500/20" 
                : "bg-destructive/10 border-destructive/20"
            }`}>
              <div className="flex items-start gap-3">
                {godCount === 1 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                )}
                <div>
                  <h4 className={`font-semibold ${
                    godCount === 1 ? "text-emerald-500" : "text-destructive"
                  }`}>
                    {godCount === 1 ? t("entropy.cosmicOrder") : t("entropy.growingDisorder")}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {godCount === 1 
                      ? t("entropy.singleWill")
                      : t("entropy.multipleWills").replace("{count}", godCount.toString())
                    }
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Simulation Visualization */}
          <GlassCard className="p-6" glow={isSimulating}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Background stars */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-50"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Sun/Center */}
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full 
                  transition-all duration-500 ${
                    godCount === 1 
                      ? "w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50" 
                      : "w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 shadow-lg shadow-red-500/50"
                  }`}
              >
                {godCount > 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{godCount}</span>
                  </div>
                )}
              </div>

              {/* Planets */}
              {planets.map((planet) => {
                const x = Math.cos((planet.angle * Math.PI) / 180) * planet.distance;
                const y = Math.sin((planet.angle * Math.PI) / 180) * planet.distance;
                
                return (
                  <div
                    key={planet.id}
                    className="absolute w-4 h-4 rounded-full transition-all"
                    style={{
                      backgroundColor: planet.color,
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: "translate(-50%, -50%)",
                      boxShadow: `0 0 10px ${planet.color}`,
                      opacity: planet.chaos > 80 ? 0.3 : 1,
                    }}
                  />
                );
              })}

              {/* Chaos overlay */}
              {chaosLevel > 50 && (
                <div 
                  className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse"
                  style={{ opacity: (chaosLevel - 50) / 100 }}
                />
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {godCount === 1 
                ? t("entropy.orderResult")
                : t("entropy.chaosResult")
              }
            </p>
          </GlassCard>
        </div>

        {/* Conclusion */}
        <GlassCard className="mt-8 p-6" glow>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <h4 className="font-semibold text-emerald-500 mb-2">{t("entropy.againstAgnosticism")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("entropy.againstAgnosticismText")}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">{t("entropy.againstPolytheism")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("entropy.againstPolytheismText")}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
