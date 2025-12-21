import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";

export const IlmGnoseSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="العلم مقابل الغنوص"
          title="'Ilm vs Gnose"
          subtitle="La connaissance universelle du Coran face à la 'connaissance cachée' des sociétés secrètes."
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 'Ilm Card */}
          <GlassCard glow className="animate-fade-up">
            <div className="text-center mb-8">
              <p className="text-4xl font-display text-gradient-gold mb-2">العِلم</p>
              <h3 className="font-display text-2xl text-foreground">'Ilm — La Connaissance</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-primary font-medium mb-2">Universelle et Accessible</h4>
                <p className="text-muted-foreground text-sm">
                  « Lis, au nom de ton Seigneur qui a créé » (96:1). Le premier ordre coranique 
                  est de lire, d'apprendre. Le savoir est un droit et un devoir pour tous.
                </p>
              </div>
              
              <div>
                <h4 className="text-primary font-medium mb-2">Publique et Vérifiable</h4>
                <p className="text-muted-foreground text-sm">
                  Le Coran invite à la réflexion, au raisonnement ('aql), à observer la création. 
                  Pas de secrets réservés à une élite initiatique.
                </p>
              </div>
              
              <div>
                <h4 className="text-primary font-medium mb-2">Source Divine Claire</h4>
                <p className="text-muted-foreground text-sm">
                  La connaissance vient d'Allah et est transmise par les prophètes à toute l'humanité. 
                  Chaque musulman a accès direct au texte sacré.
                </p>
              </div>

              <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/90 mt-4">
                « Dis : Mon Seigneur, accrois ma science. »
                <footer className="text-primary text-xs mt-2 not-italic font-medium">
                  Sourate Ta-Ha (20:114)
                </footer>
              </blockquote>
            </div>
          </GlassCard>

          {/* Gnose Card */}
          <GlassCard className="animate-fade-up" delay={200}>
            <div className="text-center mb-8">
              <p className="text-4xl font-display text-muted-foreground mb-2">γνῶσις</p>
              <h3 className="font-display text-2xl text-foreground">Gnose — Savoir Caché</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-muted-foreground font-medium mb-2">Réservée aux Initiés</h4>
                <p className="text-muted-foreground text-sm">
                  La vraie connaissance est cachée aux profanes. Seuls les initiés, 
                  après des rituels et degrés, accèdent aux "mystères".
                </p>
              </div>
              
              <div>
                <h4 className="text-muted-foreground font-medium mb-2">Secrète et Hiérarchique</h4>
                <p className="text-muted-foreground text-sm">
                  Loges, grades, serments de silence. La vérité est voilée intentionnellement. 
                  L'élitisme est structurel et assumé.
                </p>
              </div>
              
              <div>
                <h4 className="text-muted-foreground font-medium mb-2">Sources Multiples et Syncrétiques</h4>
                <p className="text-muted-foreground text-sm">
                  Mélange de traditions égyptiennes, grecques, kabbalistiques. 
                  Pas de source unique et vérifiable.
                </p>
              </div>

              <div className="border-l-2 border-muted pl-4 italic text-muted-foreground/90 mt-4 text-sm">
                « Savoir, c'est pouvoir. Et ce pouvoir doit être gardé. »
                <footer className="text-muted-foreground text-xs mt-2 not-italic">
                  Principe ésotérique traditionnel
                </footer>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Conclusion */}
        <GlassCard glow className="animate-fade-up" delay={400}>
          <h3 className="font-display text-2xl text-center text-foreground mb-6">
            Conclusion : Lumière vs Ombre
          </h3>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              Le Coran s'adresse à <strong className="text-foreground">l'intelligence de tous</strong> — 
              le savant comme l'illettré, le riche comme le pauvre. Son message est clair, 
              public, et invérifiable par quiconque lit le texte.
            </p>
            <p className="text-muted-foreground mb-4">
              L'occultisme, par définition, <strong className="text-foreground">cache sa "vérité"</strong> à la majorité, 
              créant une aristocratie spirituelle où seuls quelques "éveillés" 
              détiendraient les clés de la réalité.
            </p>
            <p className="text-primary font-display text-xl">
              « Allah est la Lumière des cieux et de la terre. »
              <span className="block text-sm text-muted-foreground mt-1">
                Sourate An-Nur (24:35)
              </span>
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
