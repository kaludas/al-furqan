import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { cn } from "@/lib/utils";
import { Check, X, Clock, BookOpen, Globe, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Prophecy {
  id: string;
  title: string;
  arabic?: string;
  source: string;
  prophecy: string;
  fulfillment: string;
  date: string;
  status: "fulfilled" | "ongoing" | "future";
  category: "quran" | "hadith";
}

interface OtherProphecy {
  id: string;
  title: string;
  source: string;
  religion: string;
  prophecy: string;
  analysis: string;
  status: "failed" | "ambiguous" | "unfulfilled";
}

const quranicProphecies: Prophecy[] = [
  {
    id: "romans",
    title: "Victoire des Romains",
    arabic: "غُلِبَتِ الرُّومُ",
    source: "Sourate Ar-Rum (30:1-4)",
    prophecy: "Les Romains ont été vaincus, dans le pays voisin, et après leur défaite ils seront les vainqueurs, dans quelques années (بِضْعِ سِنِينَ - 3 à 9 ans).",
    fulfillment: "En 614, les Perses ont écrasé les Byzantins. En 622, contre toute attente, l'empereur Héraclius a lancé une contre-offensive victorieuse, exactement dans la fenêtre de temps prédite.",
    date: "614-622 apr. J.-C.",
    status: "fulfilled",
    category: "quran"
  },
  {
    id: "pharaoh",
    title: "Préservation du corps de Pharaon",
    arabic: "فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ",
    source: "Sourate Yunus (10:92)",
    prophecy: "Aujourd'hui, Nous allons sauver ton corps, afin que tu sois un signe pour ceux qui viendront après toi.",
    fulfillment: "La momie de Ramsès II (identifié comme le Pharaon de l'Exode) a été découverte en 1881 et est exposée au Musée du Caire, préservée pour être un 'signe' comme le Coran l'a prédit.",
    date: "1881 - Découverte",
    status: "fulfilled",
    category: "quran"
  },
  {
    id: "abu-lahab",
    title: "Mort d'Abu Lahab en mécréance",
    arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
    source: "Sourate Al-Masad (111:1-5)",
    prophecy: "Que périssent les deux mains d'Abu Lahab et que lui-même périsse. Ni sa fortune ni ses gains ne lui serviront.",
    fulfillment: "Abu Lahab, oncle du Prophète ﷺ, aurait pu falsifier cette prophétie en se convertissant. Pourtant, il est mort mécréant en 624, prouvant l'origine divine de la prédiction.",
    date: "624 apr. J.-C.",
    status: "fulfilled",
    category: "quran"
  },
  {
    id: "mecca-conquest",
    title: "Conquête de La Mecque",
    arabic: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا",
    source: "Sourate Al-Fath (48:27)",
    prophecy: "Vous entrerez dans la Mosquée Sacrée, si Allah veut, en toute sécurité, la tête rasée ou les cheveux raccourcis, sans avoir peur.",
    fulfillment: "En 630, le Prophète ﷺ est entré à La Mecque avec 10 000 compagnons, sans effusion de sang, exactement comme prédit.",
    date: "630 apr. J.-C.",
    status: "fulfilled",
    category: "quran"
  },
  {
    id: "quran-preservation",
    title: "Préservation du Coran",
    arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
    source: "Sourate Al-Hijr (15:9)",
    prophecy: "C'est Nous qui avons fait descendre le Rappel (Coran), et c'est Nous qui en sommes les gardiens.",
    fulfillment: "1400 ans plus tard, le Coran reste inchangé. Aucun livre religieux au monde n'a cette propriété de préservation parfaite, vérifiable par les manuscrits anciens.",
    date: "632 → Aujourd'hui",
    status: "fulfilled",
    category: "quran"
  },
  {
    id: "bedouins",
    title: "Bédouins construisant des gratte-ciels",
    arabic: "رُعَاةُ الإِبِلِ يَتَطَاوَلُونَ فِي البُنْيَانِ",
    source: "Hadith Jibril (Sahih Muslim)",
    prophecy: "Tu verras les bergers de chameaux aux pieds nus, dévêtus et pauvres, rivaliser dans la construction de hauts édifices.",
    fulfillment: "Dubaï, Abu Dhabi, Riyad... Les Arabes du désert, autrefois bergers nomades, possèdent aujourd'hui les plus hauts gratte-ciels du monde (Burj Khalifa: 828m).",
    date: "XXe-XXIe siècle",
    status: "fulfilled",
    category: "hadith"
  },
  {
    id: "constantinople",
    title: "Conquête de Constantinople",
    arabic: "لَتُفْتَحَنَّ الْقُسْطَنْطِينِيَّةُ",
    source: "Musnad Ahmad",
    prophecy: "Constantinople sera certainement conquise. Quel excellent commandant sera son conquérant, et quelle excellente armée sera cette armée.",
    fulfillment: "En 1453, le Sultan Mehmet II a conquis Constantinople, réalisant la prophétie du Prophète ﷺ faite 800 ans plus tôt.",
    date: "1453 apr. J.-C.",
    status: "fulfilled",
    category: "hadith"
  },
  {
    id: "interest",
    title: "Généralisation de l'usure (Riba)",
    arabic: "لَيَأْتِيَنَّ عَلَى النَّاسِ زَمَانٌ لَا يَبْقَى أَحَدٌ إِلَّا أَكَلَ الرِّبَا",
    source: "Sunan Ibn Majah",
    prophecy: "Un temps viendra où personne ne pourra éviter de consommer de l'usure (intérêt bancaire), et celui qui ne la consomme pas sera touché par sa poussière.",
    fulfillment: "Aujourd'hui, le système bancaire mondial est entièrement basé sur l'intérêt. Prêts, cartes de crédit, hypothèques... impossible d'y échapper totalement.",
    date: "Ère moderne",
    status: "fulfilled",
    category: "hadith"
  },
  {
    id: "communication",
    title: "Communication instantanée mondiale",
    arabic: "حَتَّى تُكَلِّمَ الرَّجُلَ فَخِذُهُ",
    source: "Musnad Ahmad",
    prophecy: "... jusqu'à ce que la cuisse de l'homme lui parle (l'informe de ce que sa famille fait en son absence).",
    fulfillment: "Le smartphone, porté sur la cuisse/poche, nous permet de communiquer instantanément avec le monde entier et de savoir ce que font nos proches.",
    date: "XXIe siècle",
    status: "fulfilled",
    category: "hadith"
  },
  {
    id: "jerusalem",
    title: "Retour des Musulmans à Jérusalem",
    arabic: "لَا تَقُومُ السَّاعَةُ حَتَّى يُقَاتِلَ الْمُسْلِمُونَ الْيَهُودَ",
    source: "Sahih Muslim",
    prophecy: "La fin des temps ne viendra pas avant que les Musulmans ne combattent les Juifs...",
    fulfillment: "Prophétie en cours concernant les événements de la Terre Sainte.",
    date: "À venir",
    status: "ongoing",
    category: "hadith"
  },
  {
    id: "dajjal",
    title: "Apparition du Dajjal (Antéchrist)",
    arabic: "الْمَسِيحُ الدَّجَّالُ",
    source: "Sahih Bukhari & Muslim",
    prophecy: "Le Dajjal émergera... Il prétendra être Dieu, fera des miracles trompeurs, et régnera sur la Terre pendant 40 jours.",
    fulfillment: "Prophétie des fins des temps, signes précurseurs observés (système mondial de contrôle, désinformation généralisée).",
    date: "Fin des temps",
    status: "future",
    category: "hadith"
  },
  {
    id: "isa-return",
    title: "Retour de Jésus ('Issa)",
    arabic: "لَيَنْزِلَنَّ ابْنُ مَرْيَمَ حَكَمًا عَدْلًا",
    source: "Sahih Bukhari",
    prophecy: "Le fils de Marie descendra parmi vous en tant que juge équitable. Il brisera la croix, tuera le porc, et abolira la Jizyah.",
    fulfillment: "Prophétie des fins des temps. 'Issa reviendra pour établir la justice et vaincre le Dajjal.",
    date: "Fin des temps",
    status: "future",
    category: "hadith"
  }
];

const otherProphecies: OtherProphecy[] = [
  {
    id: "bible-end",
    title: "Retour imminent de Jésus",
    source: "Matthieu 24:34, 16:28",
    religion: "Christianisme",
    prophecy: "Cette génération ne passera pas que tout cela n'arrive... Il y en a ici présents qui ne goûteront pas la mort avant d'avoir vu le Fils de l'homme venir dans son Royaume.",
    analysis: "2000 ans se sont écoulés. Cette 'génération' est morte depuis longtemps. Les apologistes chrétiens tentent de réinterpréter le sens de 'génération', mais le texte est clair.",
    status: "failed"
  },
  {
    id: "bible-mustard",
    title: "La graine de moutarde",
    source: "Matthieu 13:31-32",
    religion: "Christianisme",
    prophecy: "Jésus dit que le grain de moutarde est 'la plus petite de toutes les graines'.",
    analysis: "C'est factuellement faux. Les graines d'orchidées sont bien plus petites. Erreur scientifique dans les paroles attribuées à Jésus.",
    status: "failed"
  },
  {
    id: "jewish-messiah",
    title: "Le Messie reconstruira le Temple",
    source: "Talmud, Maimonide",
    religion: "Judaïsme",
    prophecy: "Le Messie juif doit reconstruire le Temple de Jérusalem, rassembler tous les Juifs en Israël, et établir la paix mondiale.",
    analysis: "Après 2000 ans, le Temple n'est toujours pas reconstruit. Les Juifs ont rejeté Jésus car il n'a pas accompli ces critères, mais leur propre Messie attendu non plus.",
    status: "unfulfilled"
  },
  {
    id: "nostradamus",
    title: "Prophéties de Nostradamus",
    source: "Les Centuries (1555)",
    religion: "Occultisme",
    prophecy: "Quatrains vagues pouvant être interprétés de multiples façons après coup.",
    analysis: "Aucune prophétie vérifiable avant l'événement. Les interprétations sont toujours faites a posteriori. Langage volontairement ambigu et cryptique.",
    status: "ambiguous"
  },
  {
    id: "mayan-2012",
    title: "Fin du monde Maya",
    source: "Calendrier Maya",
    religion: "Paganisme",
    prophecy: "Le monde devait s'arrêter le 21 décembre 2012 selon le calendrier Maya.",
    analysis: "Échec complet. Le calendrier Maya indiquait simplement la fin d'un cycle, pas la fin du monde. Interprétation sensationnaliste occidentale.",
    status: "failed"
  },
  {
    id: "hindu-kalki",
    title: "Kalki Avatar",
    source: "Vishnu Purana, Bhagavata Purana",
    religion: "Hindouisme",
    prophecy: "Kalki viendra sur un cheval blanc pour détruire les méchants et restaurer le Dharma à la fin du Kali Yuga.",
    analysis: "Prophétie attendue depuis des millénaires, sans date ni critères vérifiables. Nombreux faux prétendants au titre de Kalki.",
    status: "ambiguous"
  },
  {
    id: "zoroaster-end",
    title: "Saoshyant Zoroastrien",
    source: "Avesta",
    religion: "Zoroastrisme",
    prophecy: "Un sauveur (Saoshyant) naîtra d'une vierge dans un lac sacré et vaincra le mal définitivement.",
    analysis: "Religion presque éteinte. Le 'lac sacré' n'existe plus. Prophétie impossible à vérifier avec des critères concrets.",
    status: "unfulfilled"
  }
];

export const PropheciesModule = () => {
  const [activeTab, setActiveTab] = useState<"quran" | "other">("quran");
  const [selectedProphecy, setSelectedProphecy] = useState<Prophecy | OtherProphecy | null>(null);
  const [filter, setFilter] = useState<"all" | "fulfilled" | "ongoing" | "future">("all");

  const filteredProphecies = quranicProphecies.filter(p => 
    filter === "all" || p.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "fulfilled": return <Check className="w-5 h-5 text-primary" />;
      case "ongoing": return <Clock className="w-5 h-5 text-yellow-500" />;
      case "future": return <Globe className="w-5 h-5 text-blue-400" />;
      case "failed": return <X className="w-5 h-5 text-destructive" />;
      case "ambiguous": return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case "unfulfilled": return <Clock className="w-5 h-5 text-muted-foreground" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case "fulfilled": return "Accomplie";
      case "ongoing": return "En cours";
      case "future": return "À venir";
      case "failed": return "Échec";
      case "ambiguous": return "Ambigu";
      case "unfulfilled": return "Non réalisée";
      default: return "";
    }
  };

  return (
    <section id="prophecies" className="relative py-24 px-4">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl relative z-10">
        <SectionTitle
          arabicTitle="النبوءات المحققة"
          title="Prophéties Accomplies"
          subtitle="Le Coran et le Prophète ﷺ ont annoncé des événements qui se sont réalisés avec une précision stupéfiante."
        />

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-1 inline-flex rounded-xl">
            <button
              onClick={() => { setActiveTab("quran"); setSelectedProphecy(null); }}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                activeTab === "quran" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Coran & Hadith
            </button>
            <button
              onClick={() => { setActiveTab("other"); setSelectedProphecy(null); }}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                activeTab === "other" 
                  ? "bg-destructive/80 text-white" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Autres Croyances
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {activeTab === "quran" ? (
            <>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-display text-primary">{quranicProphecies.filter(p => p.status === "fulfilled").length}</p>
                <p className="text-sm text-muted-foreground">Accomplies</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-display text-yellow-500">{quranicProphecies.filter(p => p.status === "ongoing").length}</p>
                <p className="text-sm text-muted-foreground">En cours</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-display text-blue-400">{quranicProphecies.filter(p => p.status === "future").length}</p>
                <p className="text-sm text-muted-foreground">Fins des temps</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-display text-gradient-gold">0</p>
                <p className="text-sm text-muted-foreground">Échecs</p>
              </div>
            </>
          ) : (
            <>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-display text-destructive">{otherProphecies.filter(p => p.status === "failed").length}</p>
                <p className="text-sm text-muted-foreground">Échouées</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-display text-orange-400">{otherProphecies.filter(p => p.status === "ambiguous").length}</p>
                <p className="text-sm text-muted-foreground">Ambiguës</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-display text-muted-foreground">{otherProphecies.filter(p => p.status === "unfulfilled").length}</p>
                <p className="text-sm text-muted-foreground">Non réalisées</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-display text-primary">0</p>
                <p className="text-sm text-muted-foreground">Confirmées</p>
              </div>
            </>
          )}
        </div>

        {/* Filter for Quran tab */}
        {activeTab === "quran" && (
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {["all", "fulfilled", "ongoing", "future"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as typeof filter)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm transition-all",
                  filter === f 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {f === "all" ? "Toutes" : getStatusLabel(f)}
              </button>
            ))}
          </div>
        )}

        {/* Prophecies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {activeTab === "quran" ? (
            filteredProphecies.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProphecy(p)}
                className={cn(
                  "glass-card p-5 cursor-pointer transition-all hover:scale-[1.02]",
                  selectedProphecy && (selectedProphecy as Prophecy).id === p.id && "ring-2 ring-primary"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-display text-foreground">{p.title}</h4>
                    {p.arabic && (
                      <p className="text-sm text-gradient-gold font-arabic mt-1">{p.arabic}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/50">
                    {getStatusIcon(p.status)}
                    <span className="text-xs text-muted-foreground">{getStatusLabel(p.status)}</span>
                  </div>
                </div>
                <p className="text-xs text-primary mb-2">{p.source}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.prophecy}</p>
              </div>
            ))
          ) : (
            otherProphecies.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProphecy(p)}
                className={cn(
                  "glass-card p-5 cursor-pointer transition-all hover:scale-[1.02]",
                  selectedProphecy && (selectedProphecy as OtherProphecy).id === p.id && "ring-2 ring-destructive/50"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-display text-foreground">{p.title}</h4>
                    <p className="text-xs text-muted-foreground">{p.religion}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/50">
                    {getStatusIcon(p.status)}
                    <span className="text-xs text-muted-foreground">{getStatusLabel(p.status)}</span>
                  </div>
                </div>
                <p className="text-xs text-destructive/70 mb-2">{p.source}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.prophecy}</p>
              </div>
            ))
          )}
        </div>

        {/* Selected Prophecy Details */}
        {selectedProphecy && (
          <GlassCard glow className="animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-2xl text-foreground">
                  {selectedProphecy.title}
                </h3>
                {'arabic' in selectedProphecy && selectedProphecy.arabic && (
                  <p className="text-xl text-gradient-gold font-arabic mt-2">{selectedProphecy.arabic}</p>
                )}
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
                {getStatusIcon('status' in selectedProphecy ? selectedProphecy.status : '')}
                <span className="text-sm font-medium">
                  {getStatusLabel('status' in selectedProphecy ? selectedProphecy.status : '')}
                </span>
              </div>
            </div>

            <p className="text-sm text-primary mb-4">{selectedProphecy.source}</p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {'prophecy' in selectedProphecy ? 'La Prophétie' : 'Affirmation'}
                </h4>
                <p className="text-foreground/90">{selectedProphecy.prophecy}</p>
              </div>

              {'fulfillment' in selectedProphecy && (
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Réalisation
                  </h4>
                  <p className="text-foreground/90">{selectedProphecy.fulfillment}</p>
                  <p className="text-sm text-primary mt-2">📅 {selectedProphecy.date}</p>
                </div>
              )}

              {'analysis' in selectedProphecy && (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    Analyse Critique
                  </h4>
                  <p className="text-foreground/90">{selectedProphecy.analysis}</p>
                </div>
              )}
            </div>

            {activeTab === "quran" && (
              <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-sm text-foreground">
                  <strong>⚖️ Le Critère :</strong> Une prophétie divine doit être spécifique, vérifiable, et accomplie exactement comme prédit. Le Coran remplit ces trois critères sans exception.
                </p>
              </div>
            )}

            {activeTab === "other" && (
              <div className="mt-6 p-4 rounded-xl bg-secondary/30">
                <p className="text-sm text-foreground">
                  <strong>⚖️ Conclusion :</strong> Contrairement aux prophéties coraniques, les prédictions des autres traditions échouent souvent, restent vagues, ou sont réinterprétées après coup pour correspondre aux événements.
                </p>
              </div>
            )}
          </GlassCard>
        )}

        {/* Verdict */}
        <GlassCard className="mt-8 text-center">
          <h3 className="font-display text-xl text-foreground mb-4">
            ⚖️ Le Verdict de la Raison
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-4xl mb-2">📖</p>
              <p className="font-display text-gradient-gold mb-2">Coran & Sunnah</p>
              <p className="text-sm text-muted-foreground">
                {quranicProphecies.filter(p => p.status === "fulfilled").length} prophéties accomplies avec précision.
                <br />0 échec en 1400 ans.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-4xl mb-2">❌</p>
              <p className="font-display text-destructive/70 mb-2">Autres Traditions</p>
              <p className="text-sm text-muted-foreground">
                Échecs, ambiguïtés, réinterprétations.
                <br />Aucune prophétie vérifiable accomplie.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
