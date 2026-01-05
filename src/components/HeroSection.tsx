import { GlassCard } from "./GlassCard";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container max-w-5xl relative z-10">
        <div className="text-center animate-fade-up">
          <p className="text-primary text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6">
            {t("hero.subtitle")}
          </p>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-4 leading-tight">
            {t("hero.title")}
            <span className="block text-gradient-gold">{t("hero.titleGold")}</span>
          </h1>
          
          <p className="text-4xl md:text-5xl font-display text-primary/80 mb-8 animate-float">
            القرآن الكريم
          </p>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("hero.description")}
          </p>
        </div>

        <GlassCard glow className="mt-12 animate-fade-up-delayed">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl font-display text-gradient-gold mb-2">الإعجاز</p>
              <p className="text-foreground font-display text-xl mb-1">{t("hero.ijaz")}</p>
              <p className="text-muted-foreground text-sm">{t("hero.ijazDesc")}</p>
            </div>
            <div className="p-4 border-y md:border-y-0 md:border-x border-glass">
              <p className="text-3xl font-display text-gradient-gold mb-2">التوحيد</p>
              <p className="text-foreground font-display text-xl mb-1">{t("hero.tawhid")}</p>
              <p className="text-muted-foreground text-sm">{t("hero.tawhidDesc")}</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-display text-gradient-gold mb-2">العلم</p>
              <p className="text-foreground font-display text-xl mb-1">{t("hero.ilm")}</p>
              <p className="text-muted-foreground text-sm">{t("hero.ilmDesc")}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
