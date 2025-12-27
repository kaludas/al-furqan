import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Book, ScrollText, CheckCircle2, XCircle, Search, Landmark, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const HamanModule = () => {
  const [activeView, setActiveView] = useState<"intro" | "bible" | "quran">("intro");
  const [showProof, setShowProof] = useState(false);

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          arabicTitle="هامان"
          title="Le Miracle de Haman"
          subtitle="L'argument archéologique définitif : comment le Coran mentionne un personnage historique que seuls les hiéroglyphes pouvaient révéler"
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* Introduction Panel */}
          <GlassCard className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20">
                <Landmark className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Le Contexte Historique</h3>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Le Coran mentionne <span className="text-primary font-semibold">"Haman"</span> comme 
                un ministre de Pharaon en Égypte. Pendant des siècles, les critiques ont affirmé 
                qu'il s'agissait d'une erreur grossière...
              </p>
              
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-destructive font-medium">
                  Objection classique : "Dans la Bible, Haman est un Perse vivant 1000 ans après 
                  Pharaon ! Muhammad a confondu les deux récits."
                </p>
              </div>

              <p>
                Cette critique semblait irréfutable... jusqu'au déchiffrement de la 
                <span className="text-primary font-semibold"> Pierre de Rosette</span> au XIXe siècle.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant={activeView === "bible" ? "default" : "outline"}
                onClick={() => setActiveView("bible")}
                className="flex-1"
              >
                <Book className="w-4 h-4 mr-2" />
                Vérifier la Bible
              </Button>
              <Button
                variant={activeView === "quran" ? "default" : "outline"}
                onClick={() => setActiveView("quran")}
                className="flex-1"
              >
                <ScrollText className="w-4 h-4 mr-2" />
                Vérifier le Coran
              </Button>
            </div>
          </GlassCard>

          {/* Comparison Panel */}
          <GlassCard className="p-6" glow={activeView !== "intro"}>
            {activeView === "intro" && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                <Search className="w-16 h-16 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Cliquez sur un bouton pour comparer les sources
                </p>
              </div>
            )}

            {activeView === "bible" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-destructive/20">
                    <XCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Dans la Bible</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Livre d'Esther (Ve siècle av. J.-C.)</p>
                    <p className="text-foreground italic">
                      "Après ces choses, le roi Assuérus [Xerxès Ier de Perse] éleva <span className="text-destructive font-bold">Haman</span>, 
                      fils d'Hammedatha, l'Agaguite..."
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">— Esther 3:1</p>
                  </div>

                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">Problème chronologique</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <span>Haman biblique : Perse, ~480 av. J.-C.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <span>Pharaon de Moïse : Égypte, ~1250 av. J.-C.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <span>Écart : environ 800 ans et deux civilisations différentes</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    Si Muhammad avait copié la Bible, pourquoi aurait-il placé Haman en Égypte 
                    plutôt qu'en Perse ?
                  </p>
                </div>
              </div>
            )}

            {activeView === "quran" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Dans le Coran</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Sourate Al-Qasas (28:38)</p>
                    <p className="text-foreground italic">
                      "Et Pharaon dit : 'Ô notables, je ne vous connais pas de divinité autre que moi. 
                      Allume-moi donc, ô <span className="text-emerald-500 font-bold">Haman</span>, un feu sur l'argile 
                      et construis-moi une tour...'"
                    </p>
                  </div>

                  <Button 
                    onClick={() => setShowProof(!showProof)}
                    variant="outline"
                    className="w-full"
                  >
                    {showProof ? "Masquer" : "Révéler"} la preuve archéologique
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {showProof && (
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 animate-fade-in">
                      <h4 className="font-semibold text-emerald-500 mb-3">Découverte au Musée Hofburg, Vienne</h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        Une inscription hiéroglyphique mentionne un fonctionnaire égyptien nommé 
                        <span className="text-emerald-500 font-bold"> "Haman"</span> (Ha-Amen) comme 
                        <span className="font-semibold"> chef des carrières de pierre</span> — 
                        exactement le rôle décrit dans le Coran !
                      </p>
                      
                      <div className="p-3 rounded bg-background/50">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">Source :</span> "Die Altaegyptischen 
                          Personennamen" de H. Ranke, Institut Archéologique Allemand, 1935
                        </p>
                      </div>

                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>Nom correct : Haman</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>Époque correcte : Égypte pharaonique</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>Fonction correcte : Travaux de construction</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Conclusion */}
        <GlassCard className="mt-8 p-6" glow>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-primary">La Question Décisive</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Comment Muhammad ﷺ, au VIIe siècle en Arabie, pouvait-il connaître le nom d'un 
              fonctionnaire égyptien antique que seul le déchiffrement des hiéroglyphes 
              — réalisé 1200 ans plus tard — pouvait révéler ?
            </p>
            <p className="text-lg font-semibold text-foreground">
              La Bible contenait une erreur. Le Coran contenait la vérité historique.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
