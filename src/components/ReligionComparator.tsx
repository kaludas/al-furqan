import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Cross, Star, Moon, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ComparisonTheme {
  id: string;
  titleFr: string;
  titleEn: string;
  titleArabic: string;
  christianity: {
    positionFr: string;
    positionEn: string;
    detailsFr: string;
    detailsEn: string;
    source: string;
  };
  judaism: {
    positionFr: string;
    positionEn: string;
    detailsFr: string;
    detailsEn: string;
    source: string;
  };
  islam: {
    positionFr: string;
    positionEn: string;
    detailsFr: string;
    detailsEn: string;
    source: string;
  };
}

const themes: ComparisonTheme[] = [
  {
    id: "god",
    titleFr: "Nature de Dieu",
    titleEn: "Nature of God",
    titleArabic: "طبيعة الله",
    christianity: {
      positionFr: "Trinité (Père, Fils, Saint-Esprit)",
      positionEn: "Trinity (Father, Son, Holy Spirit)",
      detailsFr: "Dieu est un en trois personnes distinctes mais consubstantielles. Le Fils est 'engendré, non créé'. Mystère de la foi accepté par les Conciles.",
      detailsEn: "God is one in three distinct but consubstantial persons. The Son is 'begotten, not made'. Mystery of faith accepted by the Councils.",
      source: "Credo de Nicée (325), Jean 1:1, Matthieu 28:19"
    },
    judaism: {
      positionFr: "Monothéisme strict (YHWH)",
      positionEn: "Strict Monotheism (YHWH)",
      detailsFr: "Dieu est absolument Un, incorporel, éternel. Le Shema Israël est la profession de foi centrale. Aucune représentation de Dieu permise.",
      detailsEn: "God is absolutely One, incorporeal, eternal. The Shema Israel is the central profession of faith. No representation of God permitted.",
      source: "Deutéronome 6:4, Maïmonide (13 articles de foi)"
    },
    islam: {
      positionFr: "Tawhid (Unicité absolue)",
      positionEn: "Tawhid (Absolute Oneness)",
      detailsFr: "Allah est Un, sans partenaire, sans enfant, sans égal. Il ne ressemble à rien de Sa création. L'association (shirk) est le péché impardonnable.",
      detailsEn: "Allah is One, without partner, without child, without equal. He resembles nothing of His creation. Association (shirk) is the unforgivable sin.",
      source: "Coran 112:1-4, 42:11, 4:48"
    }
  },
  {
    id: "jesus",
    titleFr: "Jésus / Issa",
    titleEn: "Jesus / Issa",
    titleArabic: "عيسى المسيح",
    christianity: {
      positionFr: "Fils de Dieu, Dieu incarné",
      positionEn: "Son of God, God incarnate",
      detailsFr: "Jésus est la deuxième personne de la Trinité, né de la Vierge Marie, mort crucifié pour racheter les péchés de l'humanité, ressuscité le 3ème jour.",
      detailsEn: "Jesus is the second person of the Trinity, born of the Virgin Mary, died crucified to redeem humanity's sins, resurrected on the 3rd day.",
      source: "Jean 3:16, Philippiens 2:6-8, Credo"
    },
    judaism: {
      positionFr: "Faux messie ou prophète hérétique",
      positionEn: "False messiah or heretical prophet",
      detailsFr: "Jésus n'est pas reconnu comme le Messie car il n'a pas accompli les prophéties messianiques (paix mondiale, reconstruction du Temple). Le Talmud le critique.",
      detailsEn: "Jesus is not recognized as the Messiah because he did not fulfill messianic prophecies (world peace, Temple reconstruction). The Talmud criticizes him.",
      source: "Sanhédrin 43a, Maïmonide (Hilkhot Melakhim)"
    },
    islam: {
      positionFr: "Prophète majeur et Messie",
      positionEn: "Major Prophet and Messiah",
      detailsFr: "Issa est né miraculeusement de la Vierge Marie, il est le Messie (Al-Masih), un Prophète puissant. Il n'est pas mort crucifié mais élevé par Allah. Il reviendra.",
      detailsEn: "Issa was miraculously born of the Virgin Mary, he is the Messiah (Al-Masih), a powerful Prophet. He was not crucified but raised by Allah. He will return.",
      source: "Coran 3:45-49, 4:157-158, 19:16-35"
    }
  },
  {
    id: "salvation",
    titleFr: "Le Salut",
    titleEn: "Salvation",
    titleArabic: "الخلاص",
    christianity: {
      positionFr: "Par la foi en Jésus-Christ",
      positionEn: "Through faith in Jesus Christ",
      detailsFr: "Le salut est obtenu par la grâce divine à travers la foi au sacrifice rédempteur du Christ. Les œuvres découlent de la foi mais ne sauvent pas seules.",
      detailsEn: "Salvation is obtained through divine grace via faith in Christ's redemptive sacrifice. Works flow from faith but do not save alone.",
      source: "Éphésiens 2:8-9, Romains 3:23-24"
    },
    judaism: {
      positionFr: "Par l'observance de la Torah",
      positionEn: "Through observance of the Torah",
      detailsFr: "Le salut passe par le respect des 613 commandements (Mitsvot), la repentance (Teshouva), et la justice sociale. L'accent est sur l'action dans ce monde.",
      detailsEn: "Salvation comes through keeping the 613 commandments (Mitzvot), repentance (Teshuva), and social justice. Emphasis is on action in this world.",
      source: "Lévitique 18:5, Michée 6:8"
    },
    islam: {
      positionFr: "Foi + Actions + Miséricorde divine",
      positionEn: "Faith + Actions + Divine Mercy",
      detailsFr: "Le salut vient de la croyance correcte (Iman), des bonnes actions ('Amal), et de la miséricorde d'Allah. Pas de péché originel à effacer, chaque âme naît pure.",
      detailsEn: "Salvation comes from correct belief (Iman), good deeds ('Amal), and Allah's mercy. No original sin to erase, every soul is born pure.",
      source: "Coran 2:62, 23:102-103, 103:1-3"
    }
  },
  {
    id: "original-sin",
    titleFr: "Péché Originel",
    titleEn: "Original Sin",
    titleArabic: "الخطيئة الأصلية",
    christianity: {
      positionFr: "Doctrine centrale",
      positionEn: "Central doctrine",
      detailsFr: "Adam et Ève ont transmis leur péché à toute l'humanité. Chaque humain naît dans le péché et a besoin du baptême et de la rédemption par le Christ.",
      detailsEn: "Adam and Eve transmitted their sin to all humanity. Every human is born in sin and needs baptism and redemption through Christ.",
      source: "Romains 5:12, Psaume 51:5, Saint Augustin"
    },
    judaism: {
      positionFr: "Rejeté",
      positionEn: "Rejected",
      detailsFr: "Le péché d'Adam a eu des conséquences (mortalité, expulsion), mais chaque âme est créée pure. L'homme a le libre arbitre et peut choisir le bien (Yetser Hatov).",
      detailsEn: "Adam's sin had consequences (mortality, expulsion), but each soul is created pure. Man has free will and can choose good (Yetzer Hatov).",
      source: "Ézéchiel 18:20, Genèse Rabbah"
    },
    islam: {
      positionFr: "Totalement rejeté",
      positionEn: "Totally rejected",
      detailsFr: "Adam a péché mais s'est repenti et Allah lui a pardonné. Chaque enfant naît sur la Fitra (nature pure). Personne ne porte le fardeau d'autrui.",
      detailsEn: "Adam sinned but repented and Allah forgave him. Every child is born upon Fitra (pure nature). No one bears another's burden.",
      source: "Coran 2:37, 6:164, Hadith sur la Fitra"
    }
  },
  {
    id: "messiah",
    titleFr: "Le Messie Attendu",
    titleEn: "The Expected Messiah",
    titleArabic: "المسيح المنتظر",
    christianity: {
      positionFr: "Le Christ est revenu (spirituellement)",
      positionEn: "Christ has returned (spiritually)",
      detailsFr: "Jésus est le Messie accompli. Son retour glorieux (Parousie) est attendu pour le Jugement Final et l'établissement définitif du Royaume de Dieu.",
      detailsEn: "Jesus is the fulfilled Messiah. His glorious return (Parousia) is awaited for the Final Judgment and definitive establishment of God's Kingdom.",
      source: "Apocalypse 19, Matthieu 24:30"
    },
    judaism: {
      positionFr: "Le Messie n'est pas encore venu",
      positionEn: "The Messiah has not yet come",
      detailsFr: "Le Mashiach sera un roi davidique humain qui restaurera Israël, reconstruira le Temple, et apportera la paix mondiale. Il n'est pas divin.",
      detailsEn: "The Mashiach will be a human Davidic king who will restore Israel, rebuild the Temple, and bring world peace. He is not divine.",
      source: "Isaïe 11:1-9, Maïmonide"
    },
    islam: {
      positionFr: "Issa reviendra avant le Jour Dernier",
      positionEn: "Issa will return before the Last Day",
      detailsFr: "Le Messie Issa (Jésus) reviendra pour vaincre le Dajjal (Antéchrist), établir la justice, et confirmer l'Islam. Il mourra ensuite et sera enterré.",
      detailsEn: "The Messiah Issa (Jesus) will return to defeat the Dajjal (Antichrist), establish justice, and confirm Islam. He will then die and be buried.",
      source: "Coran 43:61, Hadiths sur le retour d'Issa"
    }
  },
  {
    id: "scripture",
    titleFr: "Les Écritures",
    titleEn: "The Scriptures",
    titleArabic: "الكتب المقدسة",
    christianity: {
      positionFr: "Bible (Ancien + Nouveau Testament)",
      positionEn: "Bible (Old + New Testament)",
      detailsFr: "La Bible est la Parole de Dieu inspirée. L'Ancien Testament est accompli par le Nouveau. Différents canons selon les traditions.",
      detailsEn: "The Bible is the inspired Word of God. The Old Testament is fulfilled by the New. Different canons according to traditions.",
      source: "2 Timothée 3:16"
    },
    judaism: {
      positionFr: "Tanakh (Torah, Neviim, Ketouvim) + Talmud",
      positionEn: "Tanakh (Torah, Neviim, Ketuvim) + Talmud",
      detailsFr: "La Torah écrite est complétée par la Torah orale (Talmud). Le Tanakh est le texte sacré principal, le Talmud l'interprète.",
      detailsEn: "The written Torah is completed by the oral Torah (Talmud). The Tanakh is the main sacred text, the Talmud interprets it.",
      source: "Tradition rabbinique"
    },
    islam: {
      positionFr: "Coran (révélation finale préservée)",
      positionEn: "Quran (preserved final revelation)",
      detailsFr: "Le Coran est la parole littérale d'Allah, révélée à Muhammad, préservée intégralement. Il confirme et corrige les révélations antérieures altérées.",
      detailsEn: "The Quran is the literal word of Allah, revealed to Muhammad, preserved integrally. It confirms and corrects altered previous revelations.",
      source: "Coran 15:9, 5:48"
    }
  },
  {
    id: "afterlife",
    titleFr: "L'Au-delà",
    titleEn: "The Afterlife",
    titleArabic: "الآخرة",
    christianity: {
      positionFr: "Paradis, Enfer, Purgatoire (catholique)",
      positionEn: "Heaven, Hell, Purgatory (Catholic)",
      detailsFr: "Jugement après la mort. Les croyants vont au Paradis, les pécheurs impénitents en Enfer. Le Purgatoire purifie certaines âmes (tradition catholique).",
      detailsEn: "Judgment after death. Believers go to Heaven, unrepentant sinners to Hell. Purgatory purifies some souls (Catholic tradition).",
      source: "Matthieu 25:31-46, Catéchisme"
    },
    judaism: {
      positionFr: "Olam Ha-Ba (monde à venir)",
      positionEn: "Olam Ha-Ba (world to come)",
      detailsFr: "Moins défini que dans d'autres religions. L'accent est sur cette vie. Gehinnom est purificatif (max 12 mois). La résurrection des morts est une croyance.",
      detailsEn: "Less defined than in other religions. Emphasis is on this life. Gehinnom is purificatory (max 12 months). Resurrection of the dead is a belief.",
      source: "Sanhédrin 90a, Maïmonide"
    },
    islam: {
      positionFr: "Janna (Paradis) et Jahannam (Enfer)",
      positionEn: "Jannah (Paradise) and Jahannam (Hell)",
      detailsFr: "Jugement Dernier basé sur les actes. Janna est un jardin éternel de délices. Jahannam est un feu pour les mécréants. Intercession possible.",
      detailsEn: "Last Judgment based on deeds. Jannah is an eternal garden of delights. Jahannam is a fire for disbelievers. Intercession is possible.",
      source: "Coran 55:46-78, 56:1-56"
    }
  },
  {
    id: "prophets",
    titleFr: "Les Prophètes",
    titleEn: "The Prophets",
    titleArabic: "الأنبياء",
    christianity: {
      positionFr: "Prophètes de l'AT, Jésus est le dernier",
      positionEn: "OT Prophets, Jesus is the last",
      detailsFr: "Les prophètes de l'Ancien Testament ont annoncé le Christ. Jésus est le Verbe fait chair, supérieur aux prophètes.",
      detailsEn: "The Old Testament prophets announced Christ. Jesus is the Word made flesh, superior to the prophets.",
      source: "Hébreux 1:1-2"
    },
    judaism: {
      positionFr: "Moïse est le plus grand prophète",
      positionEn: "Moses is the greatest prophet",
      detailsFr: "Moïse a reçu la Torah directement. Les Neviim (prophètes) transmettent la parole de Dieu. La prophétie a cessé après Malachie.",
      detailsEn: "Moses received the Torah directly. The Neviim (prophets) transmit God's word. Prophecy ceased after Malachi.",
      source: "Deutéronome 34:10, Talmud"
    },
    islam: {
      positionFr: "Muhammad est le sceau des prophètes",
      positionEn: "Muhammad is the seal of prophets",
      detailsFr: "Tous les prophètes (124 000) ont prêché le Tawhid. Muhammad confirme et clôt la chaîne prophétique avec un message universel.",
      detailsEn: "All prophets (124,000) preached Tawhid. Muhammad confirms and closes the prophetic chain with a universal message.",
      source: "Coran 33:40"
    }
  }
];

export const ReligionComparator = () => {
  const { t, language } = useLanguage();
  const [expandedTheme, setExpandedTheme] = useState<string | null>("god");

  return (
    <section id="comparator" className="relative py-24 px-4">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle={t("comparator.arabicTitle")}
          title={t("comparator.title")}
          subtitle={t("comparator.subtitle")}
        />

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <Cross className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400">{t("comparator.christianity")}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400">{t("comparator.judaism")}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Moon className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">{t("comparator.islam")}</span>
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
                  <span className="text-lg font-display text-foreground">
                    {language === "fr" ? theme.titleFr : theme.titleEn}
                  </span>
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
                      <h4 className="font-display text-lg text-blue-400">{t("comparator.christianity")}</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">
                      {language === "fr" ? theme.christianity.positionFr : theme.christianity.positionEn}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {language === "fr" ? theme.christianity.detailsFr : theme.christianity.detailsEn}
                    </p>
                    <p className="text-xs text-blue-400/70 italic">📖 {theme.christianity.source}</p>
                  </div>

                  {/* Judaism */}
                  <div className="p-5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-display text-lg text-yellow-400">{t("comparator.judaism")}</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">
                      {language === "fr" ? theme.judaism.positionFr : theme.judaism.positionEn}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {language === "fr" ? theme.judaism.detailsFr : theme.judaism.detailsEn}
                    </p>
                    <p className="text-xs text-yellow-400/70 italic">📖 {theme.judaism.source}</p>
                  </div>

                  {/* Islam */}
                  <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Moon className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-display text-lg text-emerald-400">{t("comparator.islam")}</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">
                      {language === "fr" ? theme.islam.positionFr : theme.islam.positionEn}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {language === "fr" ? theme.islam.detailsFr : theme.islam.detailsEn}
                    </p>
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
            {t("comparator.middleWay")}
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <p className="text-blue-400 font-medium mb-2">{t("comparator.christianity")}</p>
              <p className="text-sm text-muted-foreground">
                {t("comparator.christianityNote")}
              </p>
            </div>
            <div className="p-4 border-y md:border-y-0 md:border-x border-glass">
              <p className="text-emerald-400 font-medium mb-2">{t("comparator.islam")}</p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-primary">
                  {language === "fr" ? "Équilibre parfait" : "Perfect balance"}
                </strong>{" "}
                : {t("comparator.islamNote").replace("Équilibre parfait : ", "").replace("Perfect balance: ", "")}
              </p>
            </div>
            <div className="p-4">
              <p className="text-yellow-400 font-medium mb-2">{t("comparator.judaism")}</p>
              <p className="text-sm text-muted-foreground">
                {t("comparator.judaismNote")}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
