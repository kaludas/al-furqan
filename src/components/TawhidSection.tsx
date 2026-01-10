import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Shield, Eye, Sparkles, Lock, Unlock, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const TawhidSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 px-4">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle={t("tawhid.arabicTitle")}
          title={t("tawhid.title")}
          subtitle={t("tawhid.subtitle")}
        />

        {/* Main comparison grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Tawhid Card */}
          <GlassCard glow>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Sun className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-3xl text-gradient-gold mb-2">{t("tawhid.oneness")}</h3>
              <p className="font-display text-2xl text-foreground">{t("tawhid.onenessTitle")}</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h4 className="text-foreground font-medium">{t("tawhid.absoluteOneness")}</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("tawhid.absoluteOnenessDesc")}
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Unlock className="w-5 h-5 text-primary" />
                  <h4 className="text-foreground font-medium">{t("tawhid.publicKnowledge")}</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("tawhid.publicKnowledgeDesc")}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h4 className="text-foreground font-medium">{t("tawhid.spiritualFreedom")}</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("tawhid.spiritualFreedomDesc")}
                </p>
              </div>
              
              <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/90 mt-6">
                {t("tawhid.ikhlas")}
                <footer className="text-primary text-xs mt-2 not-italic font-medium">
                  {t("tawhid.ikhlasRef")}
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
              <h3 className="font-display text-3xl text-muted-foreground mb-2">{t("tawhid.shirk")}</h3>
              <p className="font-display text-2xl text-foreground">{t("tawhid.shirkTitle")}</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <h4 className="text-foreground font-medium">{t("tawhid.occultDualism")}</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("tawhid.occultDualismDesc")}
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <h4 className="text-foreground font-medium">{t("tawhid.secretKnowledge")}</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("tawhid.secretKnowledgeDesc")}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <h4 className="text-foreground font-medium">{t("tawhid.selfDeification")}</h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("tawhid.selfDeificationDesc")}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-muted/30">
                <p className="text-muted-foreground text-sm italic">
                  {t("tawhid.hermeticism")}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Key Points */}
        <GlassCard>
          <h3 className="font-display text-2xl text-foreground mb-6 text-center">
            {t("tawhid.whyKey")}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-400">1</span>
              </div>
              <h4 className="text-foreground font-medium mb-2">{t("tawhid.logicalSimplicity")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("tawhid.logicalSimplicityDesc")}
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-400">2</span>
              </div>
              <h4 className="text-foreground font-medium mb-2">{t("tawhid.totalLiberation")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("tawhid.totalLiberationDesc")}
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-400">3</span>
              </div>
              <h4 className="text-foreground font-medium mb-2">{t("tawhid.innerPeace")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("tawhid.innerPeaceDesc")}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
            <p className="text-foreground">
              <strong className="text-primary">{t("tawhid.finalVerse")}</strong> {t("tawhid.finalVerseText")}
              <span className="text-primary text-sm ml-2">{t("tawhid.finalVerseRef")}</span>
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
