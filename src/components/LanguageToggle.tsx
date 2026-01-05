import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/30 border border-primary/10">
      <button
        onClick={() => setLanguage("fr")}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300",
          language === "fr"
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        )}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300",
          language === "en"
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        )}
      >
        EN
      </button>
    </div>
  );
};
