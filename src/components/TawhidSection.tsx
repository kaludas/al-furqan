import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";

export const TawhidSection = () => {
  return (
    <section className="relative py-24 px-4">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="التوحيد مقابل الثنائية"
          title="Tawhid vs Dualisme Occulte"
          subtitle="Opposition entre l'Unicité absolue d'Allah et les concepts de divinités composites dans les traditions ésotériques."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tawhid Card */}
          <GlassCard glow className="animate-fade-up">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                Islam
              </span>
              <h3 className="font-display text-3xl text-gradient-gold mb-2">التوحيد</h3>
              <p className="font-display text-2xl text-foreground">Tawhid</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30">
                <h4 className="text-foreground font-medium mb-2">Unicité Absolue</h4>
                <p className="text-muted-foreground text-sm">
                  Allah est Un, sans partenaire, sans égal. Il n'y a pas de dualité, 
                  pas de force opposée équivalente. Le mal n'est pas une entité divine.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/30">
                <h4 className="text-foreground font-medium mb-2">Clarté Doctrinale</h4>
                <p className="text-muted-foreground text-sm">
                  Le message est accessible à tous, sans initiation secrète requise. 
                  La vérité est publique et universelle.
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

          {/* Occultism Card */}
          <GlassCard className="animate-fade-up" delay={200}>
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4">
                Occultisme
              </span>
              <h3 className="font-display text-3xl text-muted-foreground mb-2">☿</h3>
              <p className="font-display text-2xl text-foreground">Dualisme</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="text-foreground font-medium mb-2">Baphomet d'Éliphas Lévi</h4>
                <p className="text-muted-foreground text-sm">
                  Figure androgyne symbolisant l'union des contraires : masculin/féminin, 
                  lumière/ténèbres, bien/mal comme forces équivalentes.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="text-foreground font-medium mb-2">Savoir Réservé</h4>
                <p className="text-muted-foreground text-sm">
                  Connaissance cachée (Gnose) accessible uniquement aux initiés. 
                  Hiérarchie de degrés d'illumination et secrets gardés.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="text-foreground font-medium mb-2">Hermétisme</h4>
                <p className="text-muted-foreground text-sm">
                  « Ce qui est en haut est comme ce qui est en bas » — relativisation 
                  de l'absolu et correspondances cosmiques cryptiques.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Analysis Box */}
        <GlassCard className="mt-12 animate-fade-up" delay={400}>
          <h3 className="font-display text-2xl text-foreground mb-4 text-center">
            Analyse Comparative
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-primary font-medium mb-2">Position Islamique</h4>
              <p className="text-muted-foreground text-sm">
                Le Coran rejette explicitement toute forme de shirk (associationnisme). 
                L'unité divine est non-négociable et fondamentale. Satan n'est pas l'égal 
                de Dieu mais une créature désobéissante.
              </p>
            </div>
            <div>
              <h4 className="text-accent font-medium mb-2">Contraste Occulte</h4>
              <p className="text-muted-foreground text-sm">
                Les traditions ésotériques présentent souvent un équilibre cosmique entre 
                forces opposées, suggérant une parité métaphysique étrangère au monothéisme 
                strict et une "vérité cachée" réservée aux élus.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
