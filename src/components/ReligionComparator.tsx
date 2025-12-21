import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Cross, Star, Moon, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonTheme {
  id: string;
  title: string;
  titleArabic: string;
  christianity: {
    position: string;
    details: string;
    source: string;
  };
  judaism: {
    position: string;
    details: string;
    source: string;
  };
  islam: {
    position: string;
    details: string;
    source: string;
  };
}

const themes: ComparisonTheme[] = [
  {
    id: "god",
    title: "Nature de Dieu",
    titleArabic: "طبيعة الله",
    christianity: {
      position: "Trinité (Père, Fils, Saint-Esprit)",
      details: "Dieu est un en trois personnes distinctes mais consubstantielles. Le Fils est 'engendré, non créé'. Mystère de la foi accepté par les Conciles.",
      source: "Credo de Nicée (325), Jean 1:1, Matthieu 28:19"
    },
    judaism: {
      position: "Monothéisme strict (YHWH)",
      details: "Dieu est absolument Un, incorporel, éternel. Le Shema Israël est la profession de foi centrale. Aucune représentation de Dieu permise.",
      source: "Deutéronome 6:4, Maïmonide (13 articles de foi)"
    },
    islam: {
      position: "Tawhid (Unicité absolue)",
      details: "Allah est Un, sans partenaire, sans enfant, sans égal. Il ne ressemble à rien de Sa création. L'association (shirk) est le péché impardonnable.",
      source: "Coran 112:1-4, 42:11, 4:48"
    }
  },
  {
    id: "jesus",
    title: "Jésus / Issa",
    titleArabic: "عيسى المسيح",
    christianity: {
      position: "Fils de Dieu, Dieu incarné",
      details: "Jésus est la deuxième personne de la Trinité, né de la Vierge Marie, mort crucifié pour racheter les péchés de l'humanité, ressuscité le 3ème jour.",
      source: "Jean 3:16, Philippiens 2:6-8, Credo"
    },
    judaism: {
      position: "Faux messie ou prophète hérétique",
      details: "Jésus n'est pas reconnu comme le Messie car il n'a pas accompli les prophéties messianiques (paix mondiale, reconstruction du Temple). Le Talmud le critique.",
      source: "Sanhédrin 43a, Maïmonide (Hilkhot Melakhim)"
    },
    islam: {
      position: "Prophète majeur et Messie",
      details: "Issa est né miraculeusement de la Vierge Marie, il est le Messie (Al-Masih), un Prophète puissant. Il n'est pas mort crucifié mais élevé par Allah. Il reviendra.",
      source: "Coran 3:45-49, 4:157-158, 19:16-35"
    }
  },
  {
    id: "salvation",
    title: "Le Salut",
    titleArabic: "الخلاص",
    christianity: {
      position: "Par la foi en Jésus-Christ",
      details: "Le salut est obtenu par la grâce divine à travers la foi au sacrifice rédempteur du Christ. Les œuvres découlent de la foi mais ne sauvent pas seules.",
      source: "Éphésiens 2:8-9, Romains 3:23-24"
    },
    judaism: {
      position: "Par l'observance de la Torah",
      details: "Le salut passe par le respect des 613 commandements (Mitsvot), la repentance (Teshouva), et la justice sociale. L'accent est sur l'action dans ce monde.",
      source: "Lévitique 18:5, Michée 6:8"
    },
    islam: {
      position: "Foi + Actions + Miséricorde divine",
      details: "Le salut vient de la croyance correcte (Iman), des bonnes actions ('Amal), et de la miséricorde d'Allah. Pas de péché originel à effacer, chaque âme naît pure.",
      source: "Coran 2:62, 23:102-103, 103:1-3"
    }
  },
  {
    id: "original-sin",
    title: "Péché Originel",
    titleArabic: "الخطيئة الأصلية",
    christianity: {
      position: "Doctrine centrale",
      details: "Adam et Ève ont transmis leur péché à toute l'humanité. Chaque humain naît dans le péché et a besoin du baptême et de la rédemption par le Christ.",
      source: "Romains 5:12, Psaume 51:5, Saint Augustin"
    },
    judaism: {
      position: "Rejeté",
      details: "Le péché d'Adam a eu des conséquences (mortalité, expulsion), mais chaque âme est créée pure. L'homme a le libre arbitre et peut choisir le bien (Yetser Hatov).",
      source: "Ézéchiel 18:20, Genèse Rabbah"
    },
    islam: {
      position: "Totalement rejeté",
      details: "Adam a péché mais s'est repenti et Allah lui a pardonné. Chaque enfant naît sur la Fitra (nature pure). Personne ne porte le fardeau d'autrui.",
      source: "Coran 2:37, 6:164, Hadith sur la Fitra"
    }
  },
  {
    id: "messiah",
    title: "Le Messie Attendu",
    titleArabic: "المسيح المنتظر",
    christianity: {
      position: "Le Christ est revenu (spirituellement)",
      details: "Jésus est le Messie accompli. Son retour glorieux (Parousie) est attendu pour le Jugement Final et l'établissement définitif du Royaume de Dieu.",
      source: "Apocalypse 19, Matthieu 24:30"
    },
    judaism: {
      position: "Le Messie n'est pas encore venu",
      details: "Le Mashiach sera un roi davidique humain qui restaurera Israël, reconstruira le Temple, et apportera la paix mondiale. Il n'est pas divin.",
      source: "Isaïe 11:1-9, Maïmonide"
    },
    islam: {
      position: "Issa reviendra avant le Jour Dernier",
      details: "Le Messie Issa (Jésus) reviendra pour vaincre le Dajjal (Antéchrist), établir la justice, et confirmer l'Islam. Il mourra ensuite et sera enterré.",
      source: "Coran 43:61, Hadiths sur le retour d'Issa"
    }
  },
  {
    id: "scripture",
    title: "Les Écritures",
    titleArabic: "الكتب المقدسة",
    christianity: {
      position: "Bible (Ancien + Nouveau Testament)",
      details: "La Bible est la Parole de Dieu inspirée. L'Ancien Testament est accompli par le Nouveau. Différents canons selon les traditions.",
      source: "2 Timothée 3:16"
    },
    judaism: {
      position: "Tanakh (Torah, Neviim, Ketouvim) + Talmud",
      details: "La Torah écrite est complétée par la Torah orale (Talmud). Le Tanakh est le texte sacré principal, le Talmud l'interprète.",
      source: "Tradition rabbinique"
    },
    islam: {
      position: "Coran (révélation finale préservée)",
      details: "Le Coran est la parole littérale d'Allah, révélée à Muhammad, préservée intégralement. Il confirme et corrige les révélations antérieures altérées.",
      source: "Coran 15:9, 5:48"
    }
  },
  {
    id: "afterlife",
    title: "L'Au-delà",
    titleArabic: "الآخرة",
    christianity: {
      position: "Paradis, Enfer, Purgatoire (catholique)",
      details: "Jugement après la mort. Les croyants vont au Paradis, les pécheurs impénitents en Enfer. Le Purgatoire purifie certaines âmes (tradition catholique).",
      source: "Matthieu 25:31-46, Catéchisme"
    },
    judaism: {
      position: "Olam Ha-Ba (monde à venir)",
      details: "Moins défini que dans d'autres religions. L'accent est sur cette vie. Gehinnom est purificatif (max 12 mois). La résurrection des morts est une croyance.",
      source: "Sanhédrin 90a, Maïmonide"
    },
    islam: {
      position: "Janna (Paradis) et Jahannam (Enfer)",
      details: "Jugement Dernier basé sur les actes. Janna est un jardin éternel de délices. Jahannam est un feu pour les mécréants. Intercession possible.",
      source: "Coran 55:46-78, 56:1-56"
    }
  },
  {
    id: "prophets",
    title: "Les Prophètes",
    titleArabic: "الأنبياء",
    christianity: {
      position: "Prophètes de l'AT, Jésus est le dernier",
      details: "Les prophètes de l'Ancien Testament ont annoncé le Christ. Jésus est le Verbe fait chair, supérieur aux prophètes.",
      source: "Hébreux 1:1-2"
    },
    judaism: {
      position: "Moïse est le plus grand prophète",
      details: "Moïse a reçu la Torah directement. Les Neviim (prophètes) transmettent la parole de Dieu. La prophétie a cessé après Malachie.",
      source: "Deutéronome 34:10, Talmud"
    },
    islam: {
      position: "Muhammad est le sceau des prophètes",
      details: "Tous les prophètes (124 000) ont prêché le Tawhid. Muhammad confirme et clôt la chaîne prophétique avec un message universel.",
      source: "Coran 33:40"
    }
  }
];

export const ReligionComparator = () => {
  const [expandedTheme, setExpandedTheme] = useState<string | null>("god");

  return (
    <section id="comparator" className="relative py-24 px-4">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="مقارنة الأديان"
          title="Comparateur des Religions Monothéistes"
          subtitle="Analyse comparative détaillée des trois grandes religions abrahamiques sur les thèmes théologiques essentiels."
        />

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <Cross className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400">Christianisme</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400">Judaïsme</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Moon className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">Islam</span>
          </div>
        </div>

        {/* Themes */}
        <div className="space-y-4">
          {themes.map((theme) => (
            <GlassCard
              key={theme.id}
              className={cn(
                "cursor-pointer transition-all duration-300",
                expandedTheme === theme.id && "ring-1 ring-primary/50"
              )}
            >
              <button
                onClick={() => setExpandedTheme(expandedTheme === theme.id ? null : theme.id)}
                className="w-full flex items-center justify-between p-2"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-display text-gradient-gold">{theme.titleArabic}</span>
                  <span className="text-lg font-display text-foreground">{theme.title}</span>
                </div>
                {expandedTheme === theme.id ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {expandedTheme === theme.id && (
                <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-glass">
                  {/* Christianity */}
                  <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Cross className="w-5 h-5 text-blue-400" />
                      <h4 className="font-display text-lg text-blue-400">Christianisme</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">{theme.christianity.position}</p>
                    <p className="text-sm text-muted-foreground mb-3">{theme.christianity.details}</p>
                    <p className="text-xs text-blue-400/70 italic">📖 {theme.christianity.source}</p>
                  </div>

                  {/* Judaism */}
                  <div className="p-5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-display text-lg text-yellow-400">Judaïsme</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">{theme.judaism.position}</p>
                    <p className="text-sm text-muted-foreground mb-3">{theme.judaism.details}</p>
                    <p className="text-xs text-yellow-400/70 italic">📖 {theme.judaism.source}</p>
                  </div>

                  {/* Islam */}
                  <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Moon className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-display text-lg text-emerald-400">Islam</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">{theme.islam.position}</p>
                    <p className="text-sm text-muted-foreground mb-3">{theme.islam.details}</p>
                    <p className="text-xs text-emerald-400/70 italic">📖 {theme.islam.source}</p>
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Summary Card */}
        <GlassCard glow className="mt-12">
          <h3 className="font-display text-2xl text-foreground mb-6 text-center">
            La Voie du Milieu (الوسطية)
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <p className="text-blue-400 font-medium mb-2">Christianisme</p>
              <p className="text-sm text-muted-foreground">
                Excès de divinisation humaine (Jésus = Dieu). Complexité théologique (Trinité). 
                Médiation cléricale nécessaire.
              </p>
            </div>
            <div className="p-4 border-y md:border-y-0 md:border-x border-glass">
              <p className="text-emerald-400 font-medium mb-2">Islam</p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-primary">Équilibre parfait</strong> : Monothéisme pur sans complexité. 
                Jésus honoré comme prophète. Relation directe avec Dieu.
              </p>
            </div>
            <div className="p-4">
              <p className="text-yellow-400 font-medium mb-2">Judaïsme</p>
              <p className="text-sm text-muted-foreground">
                Rejet excessif de Jésus. Loi parfois alourdie (Talmud). 
                Concept de peuple élu ethnique.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
