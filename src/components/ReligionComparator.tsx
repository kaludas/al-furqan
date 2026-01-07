import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Cross, Star, Moon, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ComparisonTheme {
  id: string;
  title: { fr: string; en: string };
  titleArabic: string;
  christianity: {
    position: { fr: string; en: string };
    details: { fr: string; en: string };
    source: string;
  };
  judaism: {
    position: { fr: string; en: string };
    details: { fr: string; en: string };
    source: string;
  };
  islam: {
    position: { fr: string; en: string };
    details: { fr: string; en: string };
    source: string;
  };
}

const themes: ComparisonTheme[] = [
  {
    id: "god",
    title: { fr: "Nature de Dieu", en: "Nature of God" },
    titleArabic: "طبيعة الله",
    christianity: {
      position: { fr: "Trinité (Père, Fils, Saint-Esprit)", en: "Trinity (Father, Son, Holy Spirit)" },
      details: { fr: "Dieu est un en trois personnes distinctes mais consubstantielles. Le Fils est 'engendré, non créé'. Mystère de la foi accepté par les Conciles.", en: "God is one in three distinct but consubstantial persons. The Son is 'begotten, not made'. Mystery of faith accepted by the Councils." },
      source: "Credo de Nicée (325), Jean 1:1, Matthieu 28:19"
    },
    judaism: {
      position: { fr: "Monothéisme strict (YHWH)", en: "Strict Monotheism (YHWH)" },
      details: { fr: "Dieu est absolument Un, incorporel, éternel. Le Shema Israël est la profession de foi centrale. Aucune représentation de Dieu permise.", en: "God is absolutely One, incorporeal, eternal. The Shema Israel is the central profession of faith. No representation of God permitted." },
      source: "Deutéronome 6:4, Maïmonide (13 articles de foi)"
    },
    islam: {
      position: { fr: "Tawhid (Unicité absolue)", en: "Tawhid (Absolute Oneness)" },
      details: { fr: "Allah est Un, sans partenaire, sans enfant, sans égal. Il ne ressemble à rien de Sa création. L'association (shirk) est le péché impardonnable.", en: "Allah is One, without partner, without child, without equal. He resembles nothing of His creation. Association (shirk) is the unforgivable sin." },
      source: "Coran 112:1-4, 42:11, 4:48"
    }
  },
  {
    id: "jesus",
    title: { fr: "Jésus / Issa", en: "Jesus / Issa" },
    titleArabic: "عيسى المسيح",
    christianity: {
      position: { fr: "Fils de Dieu, Dieu incarné", en: "Son of God, God incarnate" },
      details: { fr: "Jésus est la deuxième personne de la Trinité, né de la Vierge Marie, mort crucifié pour racheter les péchés de l'humanité, ressuscité le 3ème jour.", en: "Jesus is the second person of the Trinity, born of the Virgin Mary, died crucified to redeem humanity's sins, resurrected on the 3rd day." },
      source: "Jean 3:16, Philippiens 2:6-8, Credo"
    },
    judaism: {
      position: { fr: "Faux messie ou prophète hérétique", en: "False messiah or heretical prophet" },
      details: { fr: "Jésus n'est pas reconnu comme le Messie car il n'a pas accompli les prophéties messianiques (paix mondiale, reconstruction du Temple). Le Talmud le critique.", en: "Jesus is not recognized as the Messiah because he did not fulfill messianic prophecies (world peace, Temple reconstruction). The Talmud criticizes him." },
      source: "Sanhédrin 43a, Maïmonide (Hilkhot Melakhim)"
    },
    islam: {
      position: { fr: "Prophète majeur et Messie", en: "Major Prophet and Messiah" },
      details: { fr: "Issa est né miraculeusement de la Vierge Marie, il est le Messie (Al-Masih), un Prophète puissant. Il n'est pas mort crucifié mais élevé par Allah. Il reviendra.", en: "Issa was born miraculously from the Virgin Mary, he is the Messiah (Al-Masih), a powerful Prophet. He did not die crucified but was raised by Allah. He will return." },
      source: "Coran 3:45-49, 4:157-158, 19:16-35"
    }
  },
  {
    id: "salvation",
    title: { fr: "Le Salut", en: "Salvation" },
    titleArabic: "الخلاص",
    christianity: {
      position: { fr: "Par la foi en Jésus-Christ", en: "Through faith in Jesus Christ" },
      details: { fr: "Le salut est obtenu par la grâce divine à travers la foi au sacrifice rédempteur du Christ. Les œuvres découlent de la foi mais ne sauvent pas seules.", en: "Salvation is obtained through divine grace through faith in Christ's redemptive sacrifice. Works flow from faith but do not save alone." },
      source: "Éphésiens 2:8-9, Romains 3:23-24"
    },
    judaism: {
      position: { fr: "Par l'observance de la Torah", en: "Through observance of the Torah" },
      details: { fr: "Le salut passe par le respect des 613 commandements (Mitsvot), la repentance (Teshouva), et la justice sociale. L'accent est sur l'action dans ce monde.", en: "Salvation comes through observance of the 613 commandments (Mitzvot), repentance (Teshuva), and social justice. The emphasis is on action in this world." },
      source: "Lévitique 18:5, Michée 6:8"
    },
    islam: {
      position: { fr: "Foi + Actions + Miséricorde divine", en: "Faith + Actions + Divine Mercy" },
      details: { fr: "Le salut vient de la croyance correcte (Iman), des bonnes actions ('Amal), et de la miséricorde d'Allah. Pas de péché originel à effacer, chaque âme naît pure.", en: "Salvation comes from correct belief (Iman), good deeds ('Amal), and Allah's mercy. No original sin to erase, every soul is born pure." },
      source: "Coran 2:62, 23:102-103, 103:1-3"
    }
  },
  {
    id: "original-sin",
    title: { fr: "Péché Originel", en: "Original Sin" },
    titleArabic: "الخطيئة الأصلية",
    christianity: {
      position: { fr: "Doctrine centrale", en: "Central doctrine" },
      details: { fr: "Adam et Ève ont transmis leur péché à toute l'humanité. Chaque humain naît dans le péché et a besoin du baptême et de la rédemption par le Christ.", en: "Adam and Eve transmitted their sin to all humanity. Every human is born in sin and needs baptism and redemption through Christ." },
      source: "Romains 5:12, Psaume 51:5, Saint Augustin"
    },
    judaism: {
      position: { fr: "Rejeté", en: "Rejected" },
      details: { fr: "Le péché d'Adam a eu des conséquences (mortalité, expulsion), mais chaque âme est créée pure. L'homme a le libre arbitre et peut choisir le bien (Yetser Hatov).", en: "Adam's sin had consequences (mortality, expulsion), but each soul is created pure. Man has free will and can choose good (Yetzer HaTov)." },
      source: "Ézéchiel 18:20, Genèse Rabbah"
    },
    islam: {
      position: { fr: "Totalement rejeté", en: "Totally rejected" },
      details: { fr: "Adam a péché mais s'est repenti et Allah lui a pardonné. Chaque enfant naît sur la Fitra (nature pure). Personne ne porte le fardeau d'autrui.", en: "Adam sinned but repented and Allah forgave him. Every child is born upon the Fitra (pure nature). No one bears another's burden." },
      source: "Coran 2:37, 6:164, Hadith sur la Fitra"
    }
  },
  {
    id: "messiah",
    title: { fr: "Le Messie Attendu", en: "The Expected Messiah" },
    titleArabic: "المسيح المنتظر",
    christianity: {
      position: { fr: "Le Christ est revenu (spirituellement)", en: "Christ has returned (spiritually)" },
      details: { fr: "Jésus est le Messie accompli. Son retour glorieux (Parousie) est attendu pour le Jugement Final et l'établissement définitif du Royaume de Dieu.", en: "Jesus is the fulfilled Messiah. His glorious return (Parousia) is awaited for the Final Judgment and the definitive establishment of God's Kingdom." },
      source: "Apocalypse 19, Matthieu 24:30"
    },
    judaism: {
      position: { fr: "Le Messie n'est pas encore venu", en: "The Messiah has not yet come" },
      details: { fr: "Le Mashiach sera un roi davidique humain qui restaurera Israël, reconstruira le Temple, et apportera la paix mondiale. Il n'est pas divin.", en: "The Mashiach will be a human Davidic king who will restore Israel, rebuild the Temple, and bring world peace. He is not divine." },
      source: "Isaïe 11:1-9, Maïmonide"
    },
    islam: {
      position: { fr: "Issa reviendra avant le Jour Dernier", en: "Issa will return before the Last Day" },
      details: { fr: "Le Messie Issa (Jésus) reviendra pour vaincre le Dajjal (Antéchrist), établir la justice, et confirmer l'Islam. Il mourra ensuite et sera enterré.", en: "The Messiah Issa (Jesus) will return to defeat the Dajjal (Antichrist), establish justice, and confirm Islam. He will then die and be buried." },
      source: "Coran 43:61, Hadiths sur le retour d'Issa"
    }
  },
  {
    id: "scripture",
    title: { fr: "Les Écritures", en: "The Scriptures" },
    titleArabic: "الكتب المقدسة",
    christianity: {
      position: { fr: "Bible (Ancien + Nouveau Testament)", en: "Bible (Old + New Testament)" },
      details: { fr: "La Bible est la Parole de Dieu inspirée. L'Ancien Testament est accompli par le Nouveau. Différents canons selon les traditions.", en: "The Bible is the inspired Word of God. The Old Testament is fulfilled by the New. Different canons according to traditions." },
      source: "2 Timothée 3:16"
    },
    judaism: {
      position: { fr: "Tanakh (Torah, Neviim, Ketouvim) + Talmud", en: "Tanakh (Torah, Neviim, Ketuvim) + Talmud" },
      details: { fr: "La Torah écrite est complétée par la Torah orale (Talmud). Le Tanakh est le texte sacré principal, le Talmud l'interprète.", en: "The written Torah is completed by the oral Torah (Talmud). The Tanakh is the main sacred text, the Talmud interprets it." },
      source: "Tradition rabbinique"
    },
    islam: {
      position: { fr: "Coran (révélation finale préservée)", en: "Quran (preserved final revelation)" },
      details: { fr: "Le Coran est la parole littérale d'Allah, révélée à Muhammad, préservée intégralement. Il confirme et corrige les révélations antérieures altérées.", en: "The Quran is the literal word of Allah, revealed to Muhammad, preserved in its entirety. It confirms and corrects previous altered revelations." },
      source: "Coran 15:9, 5:48"
    }
  },
  {
    id: "afterlife",
    title: { fr: "L'Au-delà", en: "The Afterlife" },
    titleArabic: "الآخرة",
    christianity: {
      position: { fr: "Paradis, Enfer, Purgatoire (catholique)", en: "Paradise, Hell, Purgatory (Catholic)" },
      details: { fr: "Jugement après la mort. Les croyants vont au Paradis, les pécheurs impénitents en Enfer. Le Purgatoire purifie certaines âmes (tradition catholique).", en: "Judgment after death. Believers go to Paradise, unrepentant sinners to Hell. Purgatory purifies certain souls (Catholic tradition)." },
      source: "Matthieu 25:31-46, Catéchisme"
    },
    judaism: {
      position: { fr: "Olam Ha-Ba (monde à venir)", en: "Olam Ha-Ba (world to come)" },
      details: { fr: "Moins défini que dans d'autres religions. L'accent est sur cette vie. Gehinnom est purificatif (max 12 mois). La résurrection des morts est une croyance.", en: "Less defined than in other religions. The emphasis is on this life. Gehinnom is purifying (max 12 months). Resurrection of the dead is a belief." },
      source: "Sanhédrin 90a, Maïmonide"
    },
    islam: {
      position: { fr: "Janna (Paradis) et Jahannam (Enfer)", en: "Jannah (Paradise) and Jahannam (Hell)" },
      details: { fr: "Jugement Dernier basé sur les actes. Janna est un jardin éternel de délices. Jahannam est un feu pour les mécréants. Intercession possible.", en: "Final Judgment based on deeds. Jannah is an eternal garden of delights. Jahannam is a fire for disbelievers. Intercession is possible." },
      source: "Coran 55:46-78, 56:1-56"
    }
  },
  {
    id: "prophets",
    title: { fr: "Les Prophètes", en: "The Prophets" },
    titleArabic: "الأنبياء",
    christianity: {
      position: { fr: "Prophètes de l'AT, Jésus est le dernier", en: "OT Prophets, Jesus is the last" },
      details: { fr: "Les prophètes de l'Ancien Testament ont annoncé le Christ. Jésus est le Verbe fait chair, supérieur aux prophètes.", en: "The prophets of the Old Testament announced Christ. Jesus is the Word made flesh, superior to the prophets." },
      source: "Hébreux 1:1-2"
    },
    judaism: {
      position: { fr: "Moïse est le plus grand prophète", en: "Moses is the greatest prophet" },
      details: { fr: "Moïse a reçu la Torah directement. Les Neviim (prophètes) transmettent la parole de Dieu. La prophétie a cessé après Malachie.", en: "Moses received the Torah directly. The Neviim (prophets) transmit God's word. Prophecy ceased after Malachi." },
      source: "Deutéronome 34:10, Talmud"
    },
    islam: {
      position: { fr: "Muhammad est le sceau des prophètes", en: "Muhammad is the seal of the prophets" },
      details: { fr: "Tous les prophètes (124 000) ont prêché le Tawhid. Muhammad confirme et clôt la chaîne prophétique avec un message universel.", en: "All prophets (124,000) preached Tawhid. Muhammad confirms and closes the prophetic chain with a universal message." },
      source: "Coran 33:40"
    }
  }
];

export const ReligionComparator = () => {
  const [expandedTheme, setExpandedTheme] = useState<string | null>("god");
  const { language, t } = useLanguage();

  return (
    <section id="comparator" className="relative py-24 px-4">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="مقارنة الأديان"
          title={t('religionComparator.title')}
          subtitle={t('religionComparator.subtitle')}
        />

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <Cross className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400">{t('religionComparator.christianity')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400">{t('religionComparator.judaism')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Moon className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">{t('religionComparator.islam')}</span>
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
                  <span className="text-lg font-display text-foreground">{theme.title[language]}</span>
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
                      <h4 className="font-display text-lg text-blue-400">{t('religionComparator.christianity')}</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">{theme.christianity.position[language]}</p>
                    <p className="text-sm text-muted-foreground mb-3">{theme.christianity.details[language]}</p>
                    <p className="text-xs text-blue-400/70 italic">📖 {theme.christianity.source}</p>
                  </div>

                  {/* Judaism */}
                  <div className="p-5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-display text-lg text-yellow-400">{t('religionComparator.judaism')}</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">{theme.judaism.position[language]}</p>
                    <p className="text-sm text-muted-foreground mb-3">{theme.judaism.details[language]}</p>
                    <p className="text-xs text-yellow-400/70 italic">📖 {theme.judaism.source}</p>
                  </div>

                  {/* Islam */}
                  <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Moon className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-display text-lg text-emerald-400">{t('religionComparator.islam')}</h4>
                    </div>
                    <p className="text-foreground font-medium mb-2">{theme.islam.position[language]}</p>
                    <p className="text-sm text-muted-foreground mb-3">{theme.islam.details[language]}</p>
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
            {t('religionComparator.middleWay')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <p className="text-blue-400 font-medium mb-2">{t('religionComparator.christianity')}</p>
              <p className="text-sm text-muted-foreground">
                {t('religionComparator.christianitySummary')}
              </p>
            </div>
            <div className="p-4 border-y md:border-y-0 md:border-x border-glass">
              <p className="text-emerald-400 font-medium mb-2">{t('religionComparator.islam')}</p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-primary">{t('religionComparator.perfectBalance')}</strong> : {t('religionComparator.islamSummary')}
              </p>
            </div>
            <div className="p-4">
              <p className="text-yellow-400 font-medium mb-2">{t('religionComparator.judaism')}</p>
              <p className="text-sm text-muted-foreground">
                {t('religionComparator.judaismSummary')}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
