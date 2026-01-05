import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Book, ScrollText, CheckCircle2, XCircle, Search, Landmark, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const HamanModule = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<"intro" | "bible" | "quran">("intro");
  const [showProof, setShowProof] = useState(false);

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          arabicTitle={t("haman.arabicTitle")}
          title={t("haman.title")}
          subtitle={t("haman.subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* Introduction Panel */}
          <GlassCard className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20">
                <Landmark className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t("haman.contextTitle")}</h3>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                {t("haman.contextIntro").split('"Haman"')[0]}
                <span className="text-primary font-semibold">"Haman"</span>
                {t("haman.contextIntro").split('"Haman"')[1]}
              </p>
              
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-destructive font-medium">
                  {t("haman.objection")}
                </p>
              </div>

              <p>
                {t("haman.until").split("Pierre de Rosette")[0]}
                <span className="text-primary font-semibold">Pierre de Rosette</span>
                {t("haman.until").split("Pierre de Rosette")[1]}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant={activeView === "bible" ? "default" : "outline"}
                onClick={() => setActiveView("bible")}
                className="flex-1"
              >
                <Book className="w-4 h-4 mr-2" />
                {t("haman.verifyBible")}
              </Button>
              <Button
                variant={activeView === "quran" ? "default" : "outline"}
                onClick={() => setActiveView("quran")}
                className="flex-1"
              >
                <ScrollText className="w-4 h-4 mr-2" />
                {t("haman.verifyQuran")}
              </Button>
            </div>
          </GlassCard>

          {/* Comparison Panel */}
          <GlassCard className="p-6" glow={activeView !== "intro"}>
            {activeView === "intro" && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                <Search className="w-16 h-16 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  {t("haman.clickCompare")}
                </p>
              </div>
            )}

            {activeView === "bible" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-destructive/20">
                    <XCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t("haman.inBible")}</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground mb-2">{t("haman.bookEsther")}</p>
                    <p className="text-foreground italic">
                      {t("haman.estherQuote").split("Haman")[0]}
                      <span className="text-destructive font-bold">Haman</span>
                      {t("haman.estherQuote").split("Haman")[1]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">— Esther 3:1</p>
                  </div>

                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">{t("haman.chronoProblem")}</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <span>{t("haman.biblicalHaman")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <span>{t("haman.pharaohMoses")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <span>{t("haman.gap")}</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {t("haman.whyCopy")}
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
                  <h3 className="text-xl font-bold text-foreground">{t("haman.inQuran")}</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground mb-2">{t("haman.surahQasas")}</p>
                    <p className="text-foreground italic">
                      {t("haman.qasasQuote").split("Haman")[0]}
                      <span className="text-emerald-500 font-bold">Haman</span>
                      {t("haman.qasasQuote").split("Haman")[1]}
                    </p>
                  </div>

                  <Button 
                    onClick={() => setShowProof(!showProof)}
                    variant="outline"
                    className="w-full"
                  >
                    {showProof ? t("haman.hideProof") : t("haman.revealProof")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {showProof && (
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 animate-fade-in">
                      <h4 className="font-semibold text-emerald-500 mb-3">{t("haman.discoveryTitle")}</h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        {t("haman.discoveryText").split('"Haman"')[0]}
                        <span className="text-emerald-500 font-bold">"Haman"</span>
                        {t("haman.discoveryText").split('"Haman"')[1]}
                      </p>
                      
                      <div className="p-3 rounded bg-background/50">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">{t("haman.source")}</span> {t("haman.sourceText")}
                        </p>
                      </div>

                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{t("haman.correctName")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{t("haman.correctEra")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{t("haman.correctRole")}</span>
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
            <h3 className="text-xl font-bold text-primary">{t("haman.decisiveQuestion")}</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {t("haman.conclusionQuestion")}
            </p>
            <p className="text-lg font-semibold text-foreground">
              {t("haman.conclusion")}
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
