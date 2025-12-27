import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Layers, ChevronRight, Sparkles, BookOpen, Target } from "lucide-react";
import { Button } from "./ui/button";

interface RingPair {
  start: number;
  end: number;
  theme: string;
  color: string;
}

const ringPairs: RingPair[] = [
  { start: 1, end: 286, theme: "Foi et guidance", color: "from-blue-500 to-blue-600" },
  { start: 8, end: 281, theme: "Commerce et usure", color: "from-purple-500 to-purple-600" },
  { start: 21, end: 260, theme: "Résurrection", color: "from-pink-500 to-pink-600" },
  { start: 40, end: 252, theme: "Épreuves et patience", color: "from-orange-500 to-orange-600" },
  { start: 122, end: 141, theme: "Ibrahim et la Kaaba", color: "from-emerald-500 to-emerald-600" },
];

export const RingCompositionModule = () => {
  const [selectedPair, setSelectedPair] = useState<number | null>(null);
  const [showCenter, setShowCenter] = useState(false);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              animation: `pulse ${3 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          arabicTitle="البقرة"
          title="Ring Composition : L'Architecture Miraculeuse"
          subtitle="Comment 286 versets révélés sur 23 ans forment une structure en miroir mathématiquement parfaite"
        />

        <div className="grid lg:grid-cols-5 gap-8 mt-12">
          {/* Left side - Ring pairs */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-primary" />
              Structure en Chiasme
            </h3>

            {ringPairs.map((pair, index) => (
              <button
                key={index}
                onClick={() => setSelectedPair(selectedPair === index ? null : index)}
                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                  selectedPair === index
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card/50 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${pair.color}`} />
                    <span className="font-mono text-sm text-muted-foreground">
                      v.{pair.start} ↔ v.{pair.end}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${
                    selectedPair === index ? "rotate-90" : ""
                  }`} />
                </div>
                <p className="text-foreground mt-1">{pair.theme}</p>
                
                {selectedPair === index && (
                  <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                    <p className="text-sm text-muted-foreground">
                      Les versets {pair.start} et {pair.end} traitent du même thème avec une 
                      symétrie structurelle parfaite, comme un miroir littéraire.
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Center - Visual representation */}
          <div className="lg:col-span-3">
            <GlassCard className="p-6 h-full" glow>
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-primary" />
                  Visualisation de la Structure
                </h3>

                {/* Ring visualization */}
                <div className="flex-1 flex items-center justify-center py-8">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    {ringPairs.map((pair, index) => {
                      const size = 100 - index * 15;
                      const isSelected = selectedPair === index;
                      return (
                        <div
                          key={index}
                          className={`absolute rounded-full border-2 transition-all duration-500 ${
                            isSelected 
                              ? "border-primary shadow-lg shadow-primary/30" 
                              : "border-muted-foreground/30"
                          }`}
                          style={{
                            width: `${size}%`,
                            height: `${size}%`,
                            top: `${(100 - size) / 2}%`,
                            left: `${(100 - size) / 2}%`,
                            opacity: isSelected ? 1 : 0.5,
                          }}
                        >
                          {isSelected && (
                            <>
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-primary whitespace-nowrap">
                                v.{pair.start}
                              </div>
                              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-primary whitespace-nowrap">
                                v.{pair.end}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}

                    {/* Center - Ayat al-Kursi */}
                    <button
                      onClick={() => setShowCenter(!showCenter)}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full 
                        bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center
                        transition-all duration-300 hover:scale-110 ${showCenter ? "ring-4 ring-primary/30" : ""}`}
                    >
                      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                    </button>
                  </div>
                </div>

                {/* Center explanation */}
                {showCenter && (
                  <div className="animate-fade-in mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Ayat al-Kursi (v.255)</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Le Verset du Trône se trouve au centre exact de la structure en anneau de 
                          Sourate Al-Baqara. Ce verset, considéré comme le plus grand du Coran, 
                          proclame l'Unicité absolue d'Allah — le cœur du message coranique.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Bottom argument */}
        <GlassCard className="mt-8 p-6" glow>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-primary">L'Argument Choc</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Le Coran a été révélé <span className="text-foreground font-semibold">oralement</span>, 
              verset par verset, sur <span className="text-foreground font-semibold">23 ans</span>, 
              en réponse à des événements contemporains. Comment un homme prêchant dans ces conditions 
              pourrait-il placer le cœur de son message au centre mathématique exact d'un texte 
              de plusieurs centaines de pages ?
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm">
                286 versets
              </div>
              <div className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm">
                23 ans de révélation
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                1 structure parfaite
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
