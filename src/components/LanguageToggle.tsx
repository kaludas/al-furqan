import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
        "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
      )}
      title={language === "fr" ? "Switch to English" : "Passer en Français"}
    >
      <Globe size={16} />
      <span className="uppercase font-semibold">{language === "fr" ? "EN" : "FR"}</span>
    </button>
  );
};
