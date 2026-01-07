import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Prophet {
  name: string;
  arabic: string;
  year: number;
  yearLabel: string;
  message: string;
  location: string;
  details: string;
  sources: string[];
}

interface Myth {
  name: string;
  year: number;
  yearLabel: string;
  civilization: string;
  description: string;
  keyTeachings: string[];
  contrast: string;
  sources: string[];
}

const prophets: Prophet[] = [
  {
    name: "Adam",
    arabic: "آدم",
    year: -4000,
    yearLabel: "~4000 av. J.-C.",
    message: "Premier homme et prophète. Message du Tawhid pur.",
    location: "Paradis → Terre",
    details: "Adam fut le premier être humain créé par Allah à partir d'argile. Il reçut la connaissance des noms de toutes choses et fut le premier à enseigner le Tawhid à ses enfants. Sa désobéissance et son repentir illustrent la miséricorde divine.",
    sources: ["Sourate Al-Baqara 2:30-37", "Sourate Al-A'raf 7:11-25", "Tafsir Ibn Kathir"]
  },
  {
    name: "Idris (Énoch)",
    arabic: "إدريس",
    year: -3500,
    yearLabel: "~3500 av. J.-C.",
    message: "Véridique prophète, élevé à un haut rang.",
    location: "Mésopotamie",
    details: "Idris est mentionné dans le Coran comme un véridique prophète élevé à un haut rang. La tradition lui attribue l'invention de l'écriture et de la couture. Il enseigna l'astronomie et les sciences à son peuple.",
    sources: ["Sourate Maryam 19:56-57", "Sourate Al-Anbiya 21:85", "Al-Bidaya wa al-Nihaya d'Ibn Kathir"]
  },
  {
    name: "Noé (Nuh)",
    arabic: "نوح",
    year: -3000,
    yearLabel: "~3000 av. J.-C.",
    message: "Appel au monothéisme pendant 950 ans. Déluge.",
    location: "Mésopotamie",
    details: "Noé prêcha le Tawhid à son peuple pendant 950 ans. Face à leur obstination dans l'idolâtrie, Allah lui ordonna de construire l'Arche. Le Déluge détruisit les mécréants et Noé devint le 'second père de l'humanité'.",
    sources: ["Sourate Nuh 71:1-28", "Sourate Hud 11:25-49", "Sahih Al-Bukhari"]
  },
  {
    name: "Hud",
    arabic: "هود",
    year: -2800,
    yearLabel: "~2800 av. J.-C.",
    message: "Envoyé au peuple de 'Ad, bâtisseurs orgueilleux.",
    location: "Sud de l'Arabie (Ahqaf)",
    details: "Hud fut envoyé au peuple de 'Ad, connu pour sa force physique et ses constructions monumentales. Ils adoraient des idoles et opprimaient les faibles. Un vent violent les anéantit après leur refus du message.",
    sources: ["Sourate Hud 11:50-60", "Sourate Al-A'raf 7:65-72", "Sourate Al-Ahqaf 46:21-26"]
  },
  {
    name: "Salih",
    arabic: "صالح",
    year: -2600,
    yearLabel: "~2600 av. J.-C.",
    message: "Envoyé aux Thamud. Miracle de la chamelle.",
    location: "Al-Hijr (Madâ'in Sâlih)",
    details: "Salih fut envoyé aux Thamud, sculpteurs de demeures dans les montagnes. Ils demandèrent un miracle et Allah fit surgir une chamelle d'un rocher. Ils la tuèrent malgré les avertissements et furent détruits par un cri.",
    sources: ["Sourate Al-A'raf 7:73-79", "Sourate Hud 11:61-68", "Sourate Ash-Shu'ara 26:141-159"]
  },
  {
    name: "Abraham (Ibrahim)",
    arabic: "إبراهيم",
    year: -2000,
    yearLabel: "~2000 av. J.-C.",
    message: "Père du monothéisme. Détruit les idoles. Bâtisseur de la Ka'ba.",
    location: "Ur → Canaan → Mecque",
    details: "Ibrahim est le 'ami d'Allah' (Khalil Allah). Il brisa les idoles de son peuple, fut jeté au feu mais sauvé miraculeusement. Avec son fils Ismaël, il reconstruisit la Ka'ba. Il incarne la soumission totale (hanif).",
    sources: ["Sourate Al-Baqara 2:124-132", "Sourate Ibrahim 14:35-41", "Sourate Al-Anbiya 21:51-73"]
  },
  {
    name: "Loth (Lut)",
    arabic: "لوط",
    year: -1900,
    yearLabel: "~1900 av. J.-C.",
    message: "Prêcha contre l'immoralité de Sodome.",
    location: "Sodome (Mer Morte)",
    details: "Neveu d'Ibrahim, Lut fut envoyé au peuple de Sodome connu pour ses pratiques immorales. Malgré ses avertissements, ils persistèrent. La ville fut renversée et détruite par une pluie de pierres.",
    sources: ["Sourate Hud 11:77-83", "Sourate Al-A'raf 7:80-84", "Sourate Al-Ankabut 29:28-35"]
  },
  {
    name: "Ismaël (Isma'il)",
    arabic: "إسماعيل",
    year: -1850,
    yearLabel: "~1850 av. J.-C.",
    message: "Patriarche des Arabes. Co-bâtisseur de la Ka'ba.",
    location: "Mecque",
    details: "Fils aîné d'Ibrahim, Ismaël fut laissé avec sa mère Hajar dans le désert de Mecque. Le miracle de Zamzam jaillit pour eux. Il aida son père à reconstruire la Ka'ba et devint l'ancêtre du Prophète Muhammad ﷺ.",
    sources: ["Sourate As-Saffat 37:100-113", "Sourate Al-Baqara 2:127-129", "Sourate Ibrahim 14:37"]
  },
  {
    name: "Isaac (Ishaq)",
    arabic: "إسحاق",
    year: -1800,
    yearLabel: "~1800 av. J.-C.",
    message: "Prophète, père de Jacob.",
    location: "Canaan",
    details: "Deuxième fils d'Ibrahim, né miraculeusement de Sarah dans sa vieillesse. Isaac perpétua le message du Tawhid et fut le père de Jacob. La lignée prophétique des Bani Israël descend de lui.",
    sources: ["Sourate Hud 11:71-73", "Sourate As-Saffat 37:112-113", "Sourate Al-Anbiya 21:72"]
  },
  {
    name: "Jacob (Ya'qub)",
    arabic: "يعقوب",
    year: -1750,
    yearLabel: "~1750 av. J.-C.",
    message: "Israël - père des douze tribus.",
    location: "Canaan → Égypte",
    details: "Aussi appelé Israël, Jacob eut douze fils qui formèrent les douze tribus d'Israël. Son histoire avec son fils Joseph illustre la patience face à l'épreuve et la confiance en Allah.",
    sources: ["Sourate Yusuf 12:1-101", "Sourate Al-Baqara 2:132-133", "Sourate Al-An'am 6:84"]
  },
  {
    name: "Joseph (Yusuf)",
    arabic: "يوسف",
    year: -1700,
    yearLabel: "~1700 av. J.-C.",
    message: "De l'esclavage au pouvoir. Interprète des rêves.",
    location: "Canaan → Égypte",
    details: "La 'plus belle des histoires' (Ahsan al-Qasas). Vendu comme esclave par ses frères, emprisonné injustement, puis devenu ministre d'Égypte grâce à son don d'interprétation des rêves. Modèle de chasteté et de pardon.",
    sources: ["Sourate Yusuf 12:1-111", "Tafsir Al-Qurtubi", "Qisas al-Anbiya d'Ibn Kathir"]
  },
  {
    name: "Job (Ayyub)",
    arabic: "أيوب",
    year: -1600,
    yearLabel: "~1600 av. J.-C.",
    message: "Patience exemplaire face aux épreuves.",
    location: "Région de l'Édom",
    details: "Job fut éprouvé dans sa santé, sa richesse et sa famille. Sa patience légendaire (sabr) face à ces afflictions en fait un modèle pour les croyants. Allah lui rendit tout au double après son épreuve.",
    sources: ["Sourate Al-Anbiya 21:83-84", "Sourate Sad 38:41-44", "Tafsir Ibn Kathir"]
  },
  {
    name: "Chou'ayb (Jéthro)",
    arabic: "شعيب",
    year: -1500,
    yearLabel: "~1500 av. J.-C.",
    message: "Prêcha l'honnêteté commerciale.",
    location: "Madyan (Nord-Ouest Arabie)",
    details: "Envoyé au peuple de Madyan, connu pour la fraude dans le commerce. Chou'ayb leur ordonna de donner la pleine mesure et de ne pas diminuer les droits des gens. Il fut aussi le beau-père de Moïse.",
    sources: ["Sourate Hud 11:84-95", "Sourate Al-A'raf 7:85-93", "Sourate Ash-Shu'ara 26:176-191"]
  },
  {
    name: "Moïse (Musa)",
    arabic: "موسى",
    year: -1400,
    yearLabel: "~1400 av. J.-C.",
    message: "Torah révélée. Libération d'Égypte. Kalim Allah.",
    location: "Égypte → Sinaï",
    details: "Moïse est le prophète le plus mentionné dans le Coran. Il parla directement à Allah (Kalim Allah), reçut la Torah, accomplit des miracles devant Pharaon (bâton, main blanche, plaies), et mena les Bani Israël hors d'Égypte.",
    sources: ["Sourate Al-Qasas 28:1-88", "Sourate Ta-Ha 20:1-135", "Sourate Al-A'raf 7:103-162"]
  },
  {
    name: "Aaron (Harun)",
    arabic: "هارون",
    year: -1400,
    yearLabel: "~1400 av. J.-C.",
    message: "Frère et assistant de Moïse.",
    location: "Égypte → Sinaï",
    details: "Frère aîné de Moïse, réputé pour son éloquence. Il fut nommé prophète pour assister Moïse face à Pharaon. Il maintint les Bani Israël pendant l'absence de Moïse au mont Sinaï.",
    sources: ["Sourate Ta-Ha 20:29-36", "Sourate Al-A'raf 7:142", "Sourate Maryam 19:53"]
  },
  {
    name: "Dhul-Kifl",
    arabic: "ذو الكفل",
    year: -1300,
    yearLabel: "~1300 av. J.-C.",
    message: "Homme de patience et de dévotion.",
    location: "Région du Levant",
    details: "Mentionné parmi les endurants dans le Coran. Son nom signifie 'celui qui a une portion/garantie'. Certains exégètes l'identifient à Ézéchiel ou à un juge pieux d'Israël.",
    sources: ["Sourate Al-Anbiya 21:85-86", "Sourate Sad 38:48", "Tafsir Ibn Kathir"]
  },
  {
    name: "David (Dawud)",
    arabic: "داود",
    year: -1000,
    yearLabel: "~1000 av. J.-C.",
    message: "Roi-prophète. Zabur (Psaumes) révélé.",
    location: "Jérusalem",
    details: "Vainqueur de Goliath dans sa jeunesse, David devint roi d'Israël. Il reçut le Zabur (Psaumes), Allah lui soumit les montagnes et les oiseaux qui chantaient Ses louanges, et il savait façonner le fer.",
    sources: ["Sourate Al-Baqara 2:251", "Sourate Sad 38:17-26", "Sourate Saba 34:10-11"]
  },
  {
    name: "Salomon (Sulayman)",
    arabic: "سليمان",
    year: -950,
    yearLabel: "~950 av. J.-C.",
    message: "Royaume sans égal. Pouvoir sur les djinns.",
    location: "Jérusalem",
    details: "Fils de David, Salomon reçut un royaume sans précédent : il comprenait le langage des animaux, commandait aux djinns et au vent. Il construisit le Temple de Jérusalem. Malgré ce pouvoir, il resta un serviteur humble d'Allah.",
    sources: ["Sourate An-Naml 27:15-44", "Sourate Sad 38:30-40", "Sourate Al-Anbiya 21:81-82"]
  },
  {
    name: "Élie (Ilyas)",
    arabic: "إلياس",
    year: -870,
    yearLabel: "~870 av. J.-C.",
    message: "Combattit le culte de Ba'al.",
    location: "Royaume d'Israël Nord",
    details: "Élie fut envoyé aux Israélites qui adoraient Ba'al. Il les invita à revenir au Tawhid et à abandonner cette idole. Son message rencontra une forte opposition mais il resta ferme.",
    sources: ["Sourate As-Saffat 37:123-132", "Sourate Al-An'am 6:85", "Tafsir Al-Qurtubi"]
  },
  {
    name: "Élisée (Al-Yasa')",
    arabic: "اليسع",
    year: -850,
    yearLabel: "~850 av. J.-C.",
    message: "Successeur d'Élie dans la prophétie.",
    location: "Royaume d'Israël",
    details: "Disciple et successeur d'Élie, Élisée poursuivit la mission de rappeler les Bani Israël au monothéisme. Il accomplit de nombreux miracles selon les traditions.",
    sources: ["Sourate Al-An'am 6:86", "Sourate Sad 38:48", "Qisas al-Anbiya"]
  },
  {
    name: "Jonas (Yunus)",
    arabic: "يونس",
    year: -800,
    yearLabel: "~800 av. J.-C.",
    message: "Prophète du poisson. Le repentir sauve.",
    location: "Ninive (Irak actuel)",
    details: "Jonas quitta son peuple en colère avant qu'Allah ne le lui permette. Avalé par un poisson géant, il invoqua Allah dans les ténèbres. Son peuple se repentit et fut sauvé, unique exemple d'un peuple entier épargné après l'avertissement.",
    sources: ["Sourate Yunus 10:98", "Sourate As-Saffat 37:139-148", "Sourate Al-Anbiya 21:87-88"]
  },
  {
    name: "Zacharie (Zakariya)",
    arabic: "زكريا",
    year: -100,
    yearLabel: "~100 av. J.-C.",
    message: "Père de Jean, gardien de Marie.",
    location: "Jérusalem",
    details: "Prêtre âgé et gardien de Maryam (Marie), Zacharie invoqua Allah pour avoir un héritier. Allah lui accorda Yahya (Jean) malgré son âge avancé et la stérilité de son épouse. Il fut martyrisé selon certaines traditions.",
    sources: ["Sourate Maryam 19:2-11", "Sourate Al-Imran 3:37-41", "Sourate Al-Anbiya 21:89-90"]
  },
  {
    name: "Jean (Yahya)",
    arabic: "يحيى",
    year: -5,
    yearLabel: "~5 av. J.-C.",
    message: "Ascète, confirmateur de Jésus.",
    location: "Palestine",
    details: "Fils de Zacharie, Yahya reçut la sagesse dès l'enfance. Il était tendre, pur et pieux. Il confirma 'Issa (Jésus) comme le Messie et fut martyrisé pour avoir dénoncé l'immoralité du roi.",
    sources: ["Sourate Maryam 19:12-15", "Sourate Al-Imran 3:39", "Sourate Al-Anbiya 21:90"]
  },
  {
    name: "Jésus ('Issa)",
    arabic: "عيسى",
    year: 0,
    yearLabel: "~1 apr. J.-C.",
    message: "Messie. Évangile révélé. Miracles. Rappel du Tawhid.",
    location: "Palestine",
    details: "'Issa est le Messie (Al-Masih), né miraculeusement de la Vierge Marie. Il parla au berceau, guérit les aveugles et les lépreux, ressuscita les morts par la permission d'Allah. Il n'est pas mort sur la croix mais fut élevé au ciel.",
    sources: ["Sourate Al-Imran 3:45-55", "Sourate Maryam 19:16-36", "Sourate An-Nisa 4:157-158"]
  },
  {
    name: "Muhammad ﷺ",
    arabic: "محمد",
    year: 610,
    yearLabel: "610 apr. J.-C.",
    message: "Sceau des prophètes. Coran révélé. Message universel.",
    location: "Mecque → Médine",
    details: "Muhammad ﷺ est le dernier et sceau des prophètes. Orphelin devenu le plus influent des hommes, il reçut le Coran par l'ange Gabriel pendant 23 ans. Son message parachève et corrige les révélations précédentes pour toute l'humanité.",
    sources: ["Sourate Al-Ahzab 33:40", "Sourate Al-Anbiya 21:107", "Sahih Al-Bukhari et Muslim"]
  },
];

const myths: Myth[] = [
  {
    name: "Mythologie Sumérienne",
    year: -4000,
    yearLabel: "~4000 av. J.-C.",
    civilization: "Mésopotamie",
    description: "Panthéon d'Anu, Enlil, Enki. Épopée de Gilgamesh.",
    keyTeachings: ["Polythéisme", "Dieux capricieux", "Magie rituelle"],
    contrast: "Les dieux sumériens sont multiples et imparfaits. Le Tawhid affirme un Créateur unique et parfait.",
    sources: ["Tablettes de Nippur", "Épopée de Gilgamesh"]
  },
  {
    name: "Religion Égyptienne",
    year: -3500,
    yearLabel: "~3500 av. J.-C.",
    civilization: "Égypte",
    description: "Râ, Osiris, Isis. Pharaon comme dieu vivant.",
    keyTeachings: ["Panthéon complexe", "Pharaon divinisé", "Magie funéraire"],
    contrast: "La divinisation du Pharaon contredit le Tawhid.",
    sources: ["Textes des Pyramides", "Livre des Morts"]
  },
  {
    name: "Zoroastrisme",
    year: -1500,
    yearLabel: "~1500 av. J.-C.",
    civilization: "Perse",
    description: "Ahura Mazda vs Angra Mainyu. Dualisme cosmique.",
    keyTeachings: ["Dualisme Bien/Mal", "Combat cosmique", "Feu sacré"],
    contrast: "Le dualisme pose deux forces égales. Allah est Tout-Puissant.",
    sources: ["Avesta", "Gathas"]
  },
  {
    name: "Mythologie Grecque",
    year: -1200,
    yearLabel: "~1200 av. J.-C.",
    civilization: "Grèce",
    description: "Zeus, Olympe, dieux aux passions humaines.",
    keyTeachings: ["Polythéisme anthropomorphique", "Dieux immoraux", "Destin (Fatum)"],
    contrast: "Les dieux grecs mentent et trompent. Allah est Al-Quddus (Le Saint).",
    sources: ["Théogonie d'Hésiode", "Iliade d'Homère"]
  },
  {
    name: "Hermétisme",
    year: -300,
    yearLabel: "~300 av. J.-C.",
    civilization: "Alexandrie",
    description: "Hermès Trismégiste, Table d'Émeraude.",
    keyTeachings: ["Correspondances occultes", "Alchimie", "Gnose secrète"],
    contrast: "La connaissance cachée vs le Coran clair pour tous.",
    sources: ["Corpus Hermeticum", "Table d'Émeraude"]
  },
  {
    name: "Kabbale",
    year: 100,
    yearLabel: "~100 apr. J.-C.",
    civilization: "Judée",
    description: "Tradition mystique juive. Arbre de Vie, Sephiroth.",
    keyTeachings: ["Émanations divines", "Numérologie", "Magie des noms"],
    contrast: "Allah est Un, sans émanations ni hiérarchies célestes complexes.",
    sources: ["Sefer Yetzirah", "Zohar"]
  },
  {
    name: "Franc-maçonnerie",
    year: 1717,
    yearLabel: "1717 apr. J.-C.",
    civilization: "Europe",
    description: "Société initiatique. Grades secrets.",
    keyTeachings: ["Degrés initiatiques", "Symbolisme ésotérique", "Serments"],
    contrast: "L'Islam rejette les sociétés secrètes et les serments cachés.",
    sources: ["Constitutions d'Anderson", "Rituels maçonniques"]
  },
  {
    name: "New Age",
    year: 1970,
    yearLabel: "~1970 apr. J.-C.",
    civilization: "Occident",
    description: "Syncrétisme spirituel moderne.",
    keyTeachings: ["Tout est dieu (panthéisme)", "Canalisation d'esprits", "Cristaux"],
    contrast: "Le New Age mélange tout. L'Islam distingue clairement le Créateur de la création.",
    sources: ["Mouvement New Age", "Channeling"]
  }
];

// Group prophets by era for better display
const eras = [
  { name: "Ère Primitive", start: -4000, end: -2500, prophets: prophets.filter(p => p.year >= -4000 && p.year < -2500) },
  { name: "Ère Patriarcale", start: -2500, end: -1500, prophets: prophets.filter(p => p.year >= -2500 && p.year < -1500) },
  { name: "Ère Mosaïque", start: -1500, end: -500, prophets: prophets.filter(p => p.year >= -1500 && p.year < -500) },
  { name: "Ère Messianique", start: -500, end: 700, prophets: prophets.filter(p => p.year >= -500) },
];

export const ProphetTimeline = () => {
  const [showMyths, setShowMyths] = useState(false);
  const [selectedProphet, setSelectedProphet] = useState<Prophet | null>(null);
  const [selectedMyth, setSelectedMyth] = useState<Myth | null>(null);
  const [currentEra, setCurrentEra] = useState(0);

  const navigateEra = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentEra > 0) {
      setCurrentEra(currentEra - 1);
    } else if (direction === 'next' && currentEra < eras.length - 1) {
      setCurrentEra(currentEra + 1);
    }
  };

  return (
    <section id="timeline" className="relative py-24 px-4">
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container max-w-7xl relative z-10">
        <SectionTitle
          arabicTitle="خط التوحيد"
          title="Chronologie du Tawhid"
          subtitle="Les 25 prophètes de l'Islam : une chaîne ininterrompue de monothéisme."
        />

        {/* Toggle & Era Navigation */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="glass-card p-1 inline-flex rounded-xl">
            <button
              onClick={() => { setShowMyths(false); setSelectedMyth(null); }}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                !showMyths ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              25 Prophètes
            </button>
            <button
              onClick={() => setShowMyths(true)}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                showMyths ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              + Mythologies
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-gradient-gold">25</p>
            <p className="text-sm text-muted-foreground">Prophètes mentionnés</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-primary">1</p>
            <p className="text-sm text-muted-foreground">Message : Tawhid</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-accent">~6000</p>
            <p className="text-sm text-muted-foreground">Ans d'histoire</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-display text-destructive/70">{myths.length}</p>
            <p className="text-sm text-muted-foreground">Traditions ésotériques</p>
          </div>
        </div>

        {/* Era Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => navigateEra('prev')}
            disabled={currentEra === 0}
            className={cn(
              "p-2 rounded-lg transition-all",
              currentEra === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-secondary"
            )}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            {eras.map((era, idx) => (
              <button
                key={era.name}
                onClick={() => setCurrentEra(idx)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  currentEra === idx 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {era.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigateEra('next')}
            disabled={currentEra === eras.length - 1}
            className={cn(
              "p-2 rounded-lg transition-all",
              currentEra === eras.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-secondary"
            )}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Large Horizontal Timeline - School Style */}
        <GlassCard glow className="mb-8 overflow-hidden">
          <div className="p-6">
            {/* Era Title */}
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl text-gradient-gold">{eras[currentEra].name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {eras[currentEra].start < 0 ? `${Math.abs(eras[currentEra].start)} av. J.-C.` : `${eras[currentEra].start} apr. J.-C.`} 
                {' → '}
                {eras[currentEra].end < 0 ? `${Math.abs(eras[currentEra].end)} av. J.-C.` : `${eras[currentEra].end} apr. J.-C.`}
              </p>
            </div>

            {/* Timeline Line */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full -translate-y-1/2" />
              
              {/* Prophet Cards on Timeline */}
              <div className="relative flex justify-around items-center min-h-[300px] py-8">
                {eras[currentEra].prophets.map((prophet, idx) => (
                  <div
                    key={prophet.name}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => { setSelectedProphet(prophet); setSelectedMyth(null); }}
                  >
                    {/* Card above or below line alternating */}
                    <div className={cn(
                      "flex flex-col items-center",
                      idx % 2 === 0 ? "flex-col" : "flex-col-reverse"
                    )}>
                      {/* Connector Line */}
                      <div className={cn(
                        "w-0.5 bg-primary transition-all",
                        idx % 2 === 0 ? "h-8" : "h-8",
                        selectedProphet?.name === prophet.name && "bg-gradient-gold"
                      )} />
                      
                      {/* Prophet Card */}
                      <div className={cn(
                        "glass-card p-4 rounded-xl text-center transition-all hover:scale-105 w-32 md:w-40",
                        selectedProphet?.name === prophet.name && "ring-2 ring-primary shadow-lg shadow-primary/20"
                      )}>
                        <p className="text-2xl md:text-3xl font-arabic text-gradient-gold mb-1">{prophet.arabic}</p>
                        <p className="font-display text-sm md:text-base text-foreground">{prophet.name.split(' ')[0]}</p>
                        <p className="text-xs text-muted-foreground mt-1">{prophet.yearLabel}</p>
                        <p className="text-xs text-primary mt-2">📍 {prophet.location.split(' ')[0]}</p>
                      </div>
                    </div>
                    
                    {/* Dot on timeline */}
                    <div className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transition-all",
                      selectedProphet?.name === prophet.name && "scale-150 ring-4 ring-primary/30"
                    )} />
                  </div>
                ))}
              </div>
            </div>

            {/* Myths overlay - More visible */}
            {showMyths && (
              <div className="mt-8 pt-6 border-t-2 border-destructive/30">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-destructive/50" />
                  <h4 className="text-lg font-display text-destructive flex items-center gap-2">
                    <span className="text-2xl">☿</span>
                    Traditions Ésotériques de cette Période
                  </h4>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-destructive/50" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {myths
                    .filter(m => m.year >= eras[currentEra].start && m.year < eras[currentEra].end)
                    .map((myth) => (
                      <button
                        key={myth.name}
                        onClick={() => { setSelectedMyth(myth); setSelectedProphet(null); }}
                        className={cn(
                          "p-4 rounded-xl text-center transition-all border-2",
                          selectedMyth?.name === myth.name 
                            ? "bg-destructive/20 border-destructive text-foreground shadow-lg shadow-destructive/20" 
                            : "bg-destructive/5 border-destructive/30 text-foreground hover:bg-destructive/10 hover:border-destructive/50"
                        )}
                      >
                        <span className="text-3xl block mb-2">☿</span>
                        <p className="font-medium text-sm">{myth.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{myth.yearLabel}</p>
                        <p className="text-xs text-destructive/70 mt-1">{myth.civilization}</p>
                      </button>
                    ))}
                  {myths.filter(m => m.year >= eras[currentEra].start && m.year < eras[currentEra].end).length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">Aucune tradition ésotérique majeure enregistrée pour cette période</p>
                      <p className="text-xs text-muted-foreground mt-2">Le Tawhid des prophètes prédominait</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Details */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Prophet Detail */}
          <GlassCard className={cn("transition-all", selectedProphet ? "ring-2 ring-primary" : "")}>
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gradient-gold">☪</span> Prophète Sélectionné
            </h3>
            {selectedProphet ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-display text-gradient-gold">{selectedProphet.arabic}</span>
                  <div>
                    <p className="text-xl font-medium text-foreground">{selectedProphet.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedProphet.yearLabel}</p>
                    <p className="text-sm text-primary">📍 {selectedProphet.location}</p>
                  </div>
                </div>
                
                <p className="text-foreground/90">{selectedProphet.message}</p>
                
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="text-sm font-medium text-foreground mb-2">📖 Détails</h4>
                  <p className="text-sm text-muted-foreground">{selectedProphet.details}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">📚 Sources</h4>
                  <ul className="text-xs text-primary space-y-1">
                    {selectedProphet.sources.map((source, idx) => (
                      <li key={idx}>• {source}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-foreground">
                    <strong>Message constant :</strong> Tous les prophètes ont appelé au Tawhid — l'adoration exclusive d'Allah.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Cliquez sur un prophète pour voir les détails.</p>
            )}
          </GlassCard>

          {/* Myth Detail */}
          <GlassCard className={cn("transition-all", selectedMyth && showMyths ? "ring-2 ring-destructive/50" : "")}>
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-muted-foreground">☿</span> Tradition Ésotérique
            </h3>
            {selectedMyth && showMyths ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xl font-medium text-foreground">{selectedMyth.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMyth.yearLabel} • {selectedMyth.civilization}</p>
                </div>
                
                <p className="text-foreground/90">{selectedMyth.description}</p>
                
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">⚠️ Enseignements clés</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {selectedMyth.keyTeachings.map((teaching, idx) => (
                      <li key={idx}>• {teaching}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">⚖️ Contraste avec le Tawhid</h4>
                  <p className="text-sm text-foreground/90">{selectedMyth.contrast}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="text-sm font-medium text-foreground mb-2">📚 Sources</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {selectedMyth.sources.map((source, idx) => (
                      <li key={idx}>• {source}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {showMyths 
                  ? "Cliquez sur une tradition pour voir les détails."
                  : "Activez '+ Mythologies' pour comparer."}
              </p>
            )}
          </GlassCard>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-muted-foreground">Prophètes de l'Islam (25)</span>
          </div>
          {showMyths && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="text-muted-foreground">Traditions ésotériques ({myths.length})</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
