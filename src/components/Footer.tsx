import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-12 px-4 border-t border-glass">
      <div className="container max-w-6xl">
        <div className="text-center">
          <p className="text-2xl font-display text-gradient-gold mb-4">
            بسم الله الرحمن الرحيم
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            {t("footer.bismillah")}
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground text-xs">
            {t("footer.sources")}
          </p>
        </div>
      </div>
    </footer>
  );
};
