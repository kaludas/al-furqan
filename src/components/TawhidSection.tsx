import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Shield, Eye, Sparkles, Lock, Unlock, Sun, Moon } from "lucide-react";

export const TawhidSection = () => {
  return (
    <section className="relative py-24 px-4">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="التوحيد والحق"
          title="Tawhid : La Clé de la Vérité"
          subtitle="Comment l'Unicité absolue d'Allah dissipe les illusions du dualisme, de l'occultisme et du polythéisme déguisé."
        />

        {/* Main comparison grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Tawhid Card */}
          <GlassCard glow>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Sun className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-3xl text-gradient-gold mb-2">التوحيد</h3>
              <p className="font-display text-2xl text-foreground">Tawhid - L'Unicité</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h4 className="text-foreground font-medium">Unicité Absolue</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Allah est Un, sans partenaire, sans égal. Il n'y a pas de dualité, 
                  pas de force opposée équivalente. Le mal n'est pas une entité divine, 
                  mais un choix des créatures.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Unlock className="w-5 h-5 text-primary" />
                  <h4 className="text-foreground font-medium">Connaissance Publique</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Le message est accessible à tous, sans initiation secrète requise. 
                  Pas de hiérarchie d'illuminés, pas de degrés cachés. La vérité est universelle.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h4 className="text-foreground font-medium">Liberté Spirituelle</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Le Tawhid libère l'homme de toute servitude envers les créatures, les astres, 
                  les talismans ou les "énergies". Seul Allah mérite l'adoration.
                </p>
              </div>
              
              <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/90 mt-6">
                « Dis : Il est Allah, Unique. Allah, Le Seul à être imploré. 
                Il n'a pas engendré et n'a pas été engendré. Et nul n'est égal à Lui. »
                <footer className="text-primary text-xs mt-2 not-italic font-medium">
                  Sourate Al-Ikhlas (112:1-4)
                </footer>
              </blockquote>
            </div>
          </GlassCard>

          {/* Deviations Card */}
          <GlassCard>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-4">
                <Moon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-3xl text-muted-foreground mb-2">الشرك</h3>
              <p className="font-display text-2xl text-foreground">Shirk - L'Association</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <h4 className="text-foreground font-medium">Dualisme Occulte</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Le Baphomet d'Éliphas Lévi : figure androgyne symbolisant l'union des contraires. 
                  Lumière/ténèbres, bien/mal comme forces équivalentes. Une inversion de la vérité.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <h4 className="text-foreground font-medium">Savoir Réservé (Gnose)</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Connaissance cachée accessible uniquement aux initiés. 
                  Hiérarchie de degrés d'illumination. Secrets gardés = pouvoir sur les autres.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <h4 className="text-foreground font-medium">Auto-Déification</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  "Tu seras comme un dieu" - La promesse originelle de Satan. L'homme devient 
                  son propre dieu par la "connaissance secrète". L'ego remplace le Créateur.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-muted/30">
                <p className="text-muted-foreground text-sm italic">
                  « Ce qui est en haut est comme ce qui est en bas » — L'hermétisme relativise 
                  l'absolu et propose des correspondances cosmiques cryptiques qui éloignent de la simplicité du Tawhid.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Key Points */}
        <GlassCard>
          <h3 className="font-display text-2xl text-foreground mb-6 text-center">
            Pourquoi le Tawhid est la Clé ?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-400">1</span>
              </div>
              <h4 className="text-foreground font-medium mb-2">Simplicité Logique</h4>
              <p className="text-sm text-muted-foreground">
                Un seul Dieu = Une seule vérité. Pas de contradictions entre divinités rivales. 
                La cohérence absolue du monothéisme pur.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-400">2</span>
              </div>
              <h4 className="text-foreground font-medium mb-2">Libération Totale</h4>
              <p className="text-sm text-muted-foreground">
                Celui qui n'adore qu'Allah n'est esclave de personne d'autre. 
                Ni des astres, ni des prêtres, ni des "maîtres illuminés".
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-400">3</span>
              </div>
              <h4 className="text-foreground font-medium mb-2">Paix Intérieure</h4>
              <p className="text-sm text-muted-foreground">
                La certitude du Tawhid apporte la Sakina (sérénité). Plus de peur des forces occultes, 
                plus de confusion face aux contradictions.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
            <p className="text-foreground">
              <strong className="text-primary">Le Coran déclare :</strong> « Allah n'a jamais eu d'enfant, 
              et il n'y a aucune divinité avec Lui; sinon, chaque divinité s'en irait avec ce qu'elle a créé, 
              et certaines d'entre elles en domineraient d'autres. »
              <span className="text-primary text-sm ml-2">(23:91)</span>
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
