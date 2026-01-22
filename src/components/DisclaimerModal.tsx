import { useState } from "react";
import { Scale, BookOpen, FlaskConical, MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const DisclaimerModal = () => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  const content = {
    fr: {
      trigger: "Mentions Légales",
      title: "Disclaimers et Mentions Légales",
      sections: [
        {
          icon: BookOpen,
          title: "Clause de non-responsabilité théologique",
          content:
            "Cette plateforme est un outil éducatif basé sur des sources textuelles classiques (Tafsir Ibn Kathir, Al-Qurtubi, At-Tabari). Elle ne remplace en aucun cas l'avis d'un savant qualifié (Alim) ou d'un collège de juristes pour les questions de jurisprudence (Fatawa). L'IA reste un outil technologique sujet à l'erreur.",
        },
        {
          icon: FlaskConical,
          title: "Clause relative aux « Miracles Scientifiques »",
          content:
            "Les corrélations entre les versets coraniques et les découvertes scientifiques modernes sont présentées à titre de réflexion. Le Coran est avant tout un livre de guidance spirituelle et non un manuel de science. La science évolue, tandis que le texte coranique est fixe.",
        },
        {
          icon: MessageCircle,
          title: "Clause sur la confrontation des religions",
          content:
            "L'analyse comparative est menée dans un but d'étude théologique et apologétique. Le site respecte la liberté de conscience et ne vise pas à inciter à la haine, mais à proposer un dialogue basé sur la logique textuelle et les sources académiques.",
        },
      ],
    },
    en: {
      trigger: "Legal Notice",
      title: "Disclaimers and Legal Notices",
      sections: [
        {
          icon: BookOpen,
          title: "Theological Disclaimer",
          content:
            "This platform is an educational tool based on classical textual sources (Tafsir Ibn Kathir, Al-Qurtubi, At-Tabari). It does not replace the opinion of a qualified scholar (Alim) or a college of jurists for matters of jurisprudence (Fatawa). The AI remains a technological tool subject to error.",
        },
        {
          icon: FlaskConical,
          title: "Scientific Miracles Clause",
          content:
            "Correlations between Quranic verses and modern scientific discoveries are presented for reflection. The Quran is primarily a book of spiritual guidance and not a science manual. Science evolves, while the Quranic text is fixed.",
        },
        {
          icon: MessageCircle,
          title: "Comparative Religion Clause",
          content:
            "Comparative analysis is conducted for theological and apologetic study purposes. The site respects freedom of conscience and does not aim to incite hatred, but to propose a dialogue based on textual logic and academic sources.",
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.fr;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
          <Scale className="w-4 h-4" />
          {t.trigger}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto glass-card border-glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-display text-gradient-gold">
            <Scale className="w-6 h-6 text-primary" />
            {t.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {t.sections.map((section, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-background/30 border border-glass"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground">
                  {section.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-glass">
          <p className="text-xs text-muted-foreground text-center">
            {language === "en"
              ? "By using this platform, you acknowledge having read and understood these notices."
              : "En utilisant cette plateforme, vous reconnaissez avoir lu et compris ces avertissements."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
