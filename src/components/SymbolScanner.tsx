import { useState, useRef } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Upload, Scan, Loader2, X, Camera, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const ANALYZE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-symbol`;

export const SymbolScanner = () => {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t("symbol.maxSizeError"));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSymbol = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(ANALYZE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t("common.error"));
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : t("common.error"));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section id="scanner" className="relative py-24 px-4">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-destructive/5 rounded-full blur-3xl" />
      
      <div className="container max-w-5xl relative z-10">
        <SectionTitle
          arabicTitle={t("symbol.arabicTitle")}
          title={t("symbol.title")}
          subtitle={t("symbol.subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <GlassCard glow>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <Scan className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">{t("symbol.analyzeTitle")}</h3>
                <p className="text-sm text-muted-foreground">{t("symbol.analyzeDesc")}</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {!image ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-64 border-2 border-dashed border-glass rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-foreground font-medium">{t("symbol.clickUpload")}</p>
                  <p className="text-sm text-muted-foreground">{t("symbol.dragDrop")}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Camera size={14} />
                  <span>{t("symbol.maxSize")}</span>
                </div>
              </button>
            ) : (
              <div className="relative">
                <img
                  src={image}
                  alt="Symbol to analyze"
                  className="w-full h-64 object-contain rounded-xl bg-secondary/30"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 border border-glass flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {image && (
              <button
                onClick={analyzeSymbol}
                disabled={isAnalyzing}
                className={cn(
                  "w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition-all",
                  "bg-primary text-primary-foreground hover:scale-[1.02]",
                  "disabled:opacity-50 disabled:hover:scale-100"
                )}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("symbol.analyzing")}
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5" />
                    {t("symbol.analyzeBtn")}
                  </>
                )}
              </button>
            )}

            {error && (
              <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}
          </GlassCard>

          {/* Analysis Result */}
          <GlassCard className={cn("transition-all", analysis ? "ring-2 ring-primary/30" : "")}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">{t("symbol.perspectiveTitle")}</h3>
                <p className="text-sm text-muted-foreground">{t("symbol.perspectiveDesc")}</p>
              </div>
            </div>

            {analysis ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-secondary/30 max-h-[400px] overflow-y-auto">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed text-sm">
                    {analysis}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm text-foreground">
                    <strong className="text-primary">{t("symbol.tawhidReminder")}</strong> {t("symbol.tawhidReminderText")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground mb-2">
                  {t("symbol.uploadPrompt")}
                </p>
                <p className="text-sm text-muted-foreground/70">
                  {t("symbol.uploadInfo")}
                </p>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Info Box */}
        <GlassCard className="mt-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-display text-gradient-gold mb-2">☪️</p>
              <h4 className="font-medium text-foreground mb-1">{t("symbol.tawhidTitle")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("symbol.tawhidDesc")}
              </p>
            </div>
            <div>
              <p className="text-3xl font-display text-muted-foreground mb-2">⚠️</p>
              <h4 className="font-medium text-foreground mb-1">{t("symbol.originTitle")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("symbol.originDesc")}
              </p>
            </div>
            <div>
              <p className="text-3xl font-display text-primary mb-2">🔓</p>
              <h4 className="font-medium text-foreground mb-1">{t("symbol.liberationTitle")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("symbol.liberationDesc")}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
