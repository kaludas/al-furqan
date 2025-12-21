import { useState, useRef } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Upload, Scan, Loader2, X, Camera, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const ANALYZE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-symbol`;

export const SymbolScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 5MB");
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
        throw new Error(errorData.error || "Erreur lors de l'analyse");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "Erreur lors de l'analyse");
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
          arabicTitle="فك رموز الباطل"
          title="Scanner de Symboles"
          subtitle="Uploadez une image d'un symbole occulte et l'IA analysera son origine historique et expliquera la perspective coranique du Tawhid."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <GlassCard glow>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <Scan className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">Analyser un Symbole</h3>
                <p className="text-sm text-muted-foreground">Pentagramme, Baphomet, Œil d'Horus...</p>
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
                  <p className="text-foreground font-medium">Cliquez pour uploader</p>
                  <p className="text-sm text-muted-foreground">ou glissez-déposez une image</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Camera size={14} />
                  <span>PNG, JPG jusqu'à 5MB</span>
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
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5" />
                    Analyser ce symbole
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
                <h3 className="font-display text-xl text-foreground">Perspective du Tawhid</h3>
                <p className="text-sm text-muted-foreground">Analyse et réfutation par la logique coranique</p>
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
                    <strong className="text-primary">Rappel du Tawhid :</strong> Allah est Un, sans associé ni image. 
                    Les symboles occultes sont des créations humaines qui ne possèdent aucun pouvoir. 
                    Le Coran libère l'homme de cette "servitude symbolique" pour le ramener au Créateur Unique.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground mb-2">
                  Uploadez un symbole pour l'analyser
                </p>
                <p className="text-sm text-muted-foreground/70">
                  L'IA expliquera son origine humaine et comment le Tawhid libère de la superstition.
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
              <h4 className="font-medium text-foreground mb-1">Tawhid</h4>
              <p className="text-sm text-muted-foreground">
                L'Unicité d'Allah dissipe les superstitions et libère l'esprit humain.
              </p>
            </div>
            <div>
              <p className="text-3xl font-display text-muted-foreground mb-2">⚠️</p>
              <h4 className="font-medium text-foreground mb-1">Origine Humaine</h4>
              <p className="text-sm text-muted-foreground">
                Tous les symboles occultes ont une origine historique documentée.
              </p>
            </div>
            <div>
              <p className="text-3xl font-display text-primary mb-2">🔓</p>
              <h4 className="font-medium text-foreground mb-1">Libération</h4>
              <p className="text-sm text-muted-foreground">
                Le Coran libère de la peur des symboles et des superstitions.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
