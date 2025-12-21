export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-glass">
      <div className="container max-w-6xl">
        <div className="text-center">
          <p className="text-2xl font-display text-gradient-gold mb-4">
            بسم الله الرحمن الرحيم
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground text-xs">
            Analyse basée sur les exégèses classiques (Tafsir Ibn Kathir, Al-Qurtubi, At-Tabari) 
            et sources académiques en théologie comparée.
          </p>
        </div>
      </div>
    </footer>
  );
};
