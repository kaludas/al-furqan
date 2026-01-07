import { useState, useMemo } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Check, X, ArrowRight, RotateCcw, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface Question {
  question: string;
  optionA: { text: string; isIslam: boolean };
  optionB: { text: string; isIslam: boolean };
  explanation: string;
}

const allQuestions: Question[] = [
  {
    question: "Comment accéder à la vérité spirituelle ?",
    optionA: { text: "Par la raison et la réflexion, accessible à tous", isIslam: true },
    optionB: { text: "Par des rituels secrets réservés aux initiés", isIslam: false },
    explanation: "Le Coran invite chacun à réfléchir (تَفَكَّرُوا). Il n'y a pas de clergé en Islam, ni de connaissance cachée aux 'profanes'.",
  },
  {
    question: "Quelle est la nature du mal dans l'univers ?",
    optionA: { text: "Le mal est une force égale au bien (dualisme)", isIslam: false },
    optionB: { text: "Le mal est un test, Satan est une créature désobéissante", isIslam: true },
    explanation: "En Islam, Iblis n'est pas l'égal d'Allah mais une créature qui a désobéi. Le bien et le mal ne sont pas des forces cosmiques équivalentes.",
  },
  {
    question: "Qui peut intercéder auprès de Dieu ?",
    optionA: { text: "Des maîtres secrets ou des entités spirituelles", isIslam: false },
    optionB: { text: "Personne sans Sa permission - lien direct avec Allah", isIslam: true },
    explanation: "Le Tawhid établit un lien direct entre le croyant et son Créateur, sans intermédiaire obligatoire.",
  },
  {
    question: "Comment le cosmos fonctionne-t-il ?",
    optionA: { text: "Par des correspondances magiques et astrologiques", isIslam: false },
    optionB: { text: "Par des lois naturelles créées par Allah", isIslam: true },
    explanation: "Le Coran invite à étudier la création ('Ayat' - signes) mais rejette l'astrologie et la magie comme shirk.",
  },
  {
    question: "Quel est le but de la connaissance spirituelle ?",
    optionA: { text: "Adorer Allah et améliorer la société", isIslam: true },
    optionB: { text: "Acquérir des pouvoirs et une élévation personnelle", isIslam: false },
    explanation: "L'Islam lie le 'Ilm (connaissance) à l'action vertueuse et au service de l'humanité, non à la quête de pouvoir.",
  },
  {
    question: "Quelle est la source de la guidance spirituelle ?",
    optionA: { text: "Les textes révélés clairs et accessibles à tous", isIslam: true },
    optionB: { text: "Des symboles cachés à décoder par des initiés", isIslam: false },
    explanation: "Le Coran se décrit comme 'Kitab Mubin' (كتاب مبين) - un Livre clair. Sa guidance n'est pas cryptée.",
  },
  {
    question: "Comment atteindre l'élévation spirituelle ?",
    optionA: { text: "Par des grades initiatiques et des degrés secrets", isIslam: false },
    optionB: { text: "Par la foi, les bonnes actions et la piété (Taqwa)", isIslam: true },
    explanation: "En Islam, c'est la Taqwa (conscience de Dieu) qui élève l'individu, pas des grades rituels.",
  },
  {
    question: "Quelle est la nature de Dieu ?",
    optionA: { text: "Allah est Un, sans associé, sans image ni représentation", isIslam: true },
    optionB: { text: "Le divin s'exprime à travers des émanations et des dualités", isIslam: false },
    explanation: "La Sourate Al-Ikhlas (112) résume le Tawhid : Allah est Un, Il n'engendre pas et n'est pas engendré.",
  },
  {
    question: "Quel rôle jouent les symboles dans la spiritualité ?",
    optionA: { text: "Les symboles ont des pouvoirs magiques et protecteurs", isIslam: false },
    optionB: { text: "Seul Allah protège, les symboles n'ont aucun pouvoir", isIslam: true },
    explanation: "Le Coran rejette les amulettes et talismans (tamima) comme formes de shirk.",
  },
  {
    question: "Qui détient la connaissance ultime ?",
    optionA: { text: "Allah seul connaît l'Invisible (Ghayb)", isIslam: true },
    optionB: { text: "Les maîtres secrets accèdent aux mystères cachés", isIslam: false },
    explanation: "Le Coran affirme que seul Allah connaît le Ghayb (5:109). Prétendre le contraire est du kufr.",
  },
  {
    question: "Comment interpréter les textes sacrés ?",
    optionA: { text: "Par plusieurs niveaux de sens, réservés aux élus", isIslam: false },
    optionB: { text: "Par le sens apparent et le contexte, accessible à tous", isIslam: true },
    explanation: "L'exégèse islamique (Tafsir) utilise des méthodes claires, pas des interprétations secrètes.",
  },
  {
    question: "Quelle est la relation entre l'homme et le cosmos ?",
    optionA: { text: "L'homme doit soumettre le cosmos par la magie", isIslam: false },
    optionB: { text: "L'homme est vicaire (khalifa) responsable sur Terre", isIslam: true },
    explanation: "Le Coran établit l'homme comme khalifa (2:30), non comme magicien manipulant des forces occultes.",
  },
  {
    question: "Quelle est la voie vers le salut ?",
    optionA: { text: "La foi en Allah, les bonnes œuvres et le repentir sincère", isIslam: true },
    optionB: { text: "L'illumination par des rituels et des connaissances secrètes", isIslam: false },
    explanation: "Le salut en Islam passe par la foi et les œuvres, pas par des rituels ésotériques.",
  },
  {
    question: "Comment traiter les forces du mal ?",
    optionA: { text: "Par des invocations magiques et des talismans", isIslam: false },
    optionB: { text: "Par le refuge en Allah et la récitation du Coran", isIslam: true },
    explanation: "Le Prophète ﷺ enseignait de chercher refuge en Allah (Sourates Al-Falaq et An-Nas), pas par la magie.",
  },
  {
    question: "Quel est le statut des prophètes ?",
    optionA: { text: "Des hommes choisis par Allah pour transmettre Son message", isIslam: true },
    optionB: { text: "Des initiés parmi d'autres maîtres de sagesse", isIslam: false },
    explanation: "Les prophètes sont élus par Allah (اصْطَفَى), non des initiés parmi d'autres 'maîtres' humains.",
  },
  {
    question: "Comment acquérir la sagesse ?",
    optionA: { text: "Par l'étude, la réflexion et l'action vertueuse", isIslam: true },
    optionB: { text: "Par des épreuves initiatiques et des serments secrets", isIslam: false },
    explanation: "La sagesse (Hikma) en Islam vient d'Allah et s'acquiert par l'étude et la pratique, pas par des rites secrets.",
  },
  {
    question: "Quelle est la nature de la création ?",
    optionA: { text: "Le monde est une illusion à transcender", isIslam: false },
    optionB: { text: "La création est un signe (Ayat) d'Allah à étudier", isIslam: true },
    explanation: "Le Coran invite à observer la création comme signes d'Allah, pas à la rejeter comme illusion.",
  },
  {
    question: "Comment atteindre la paix intérieure ?",
    optionA: { text: "Par la soumission à Allah et le dhikr (rappel)", isIslam: true },
    optionB: { text: "Par la maîtrise des forces cosmiques et astrales", isIslam: false },
    explanation: "'C'est par le rappel d'Allah que les cœurs s'apaisent' (13:28), pas par des pratiques occultes.",
  },
  {
    question: "Quel est le but de la vie humaine ?",
    optionA: { text: "Atteindre des pouvoirs supranaturels", isIslam: false },
    optionB: { text: "Adorer Allah et faire le bien sur Terre", isIslam: true },
    explanation: "'Je n'ai créé les djinns et les hommes que pour qu'ils M'adorent' (51:56).",
  },
  {
    question: "Comment distinguer le vrai du faux ?",
    optionA: { text: "Par la raison, la révélation et la cohérence", isIslam: true },
    optionB: { text: "Par l'intuition des initiés et les visions mystiques", isIslam: false },
    explanation: "Le Coran appelle à la réflexion rationnelle et offre des preuves claires, pas des révélations secrètes.",
  },
  // Nouvelles questions ajoutées
  {
    question: "Peut-on vraiment savoir si Dieu existe ?",
    optionA: { text: "Non, c'est impossible à prouver ou infirmer", isIslam: false },
    optionB: { text: "Oui, par l'observation de l'univers et la réflexion", isIslam: true },
    explanation: "Le Coran répond à l'agnosticisme : 'Ont-ils été créés de rien ? Se sont-ils créés eux-mêmes ?' (52:35-36).",
  },
  {
    question: "Que se passe-t-il après la mort ?",
    optionA: { text: "Nul ne peut savoir, c'est le mystère absolu", isIslam: false },
    optionB: { text: "Chaque âme sera jugée selon ses actes", isIslam: true },
    explanation: "Le Coran détaille clairement le Jour du Jugement. Ce n'est pas un mystère mais une réalité annoncée.",
  },
  {
    question: "Pourquoi existe-t-il le mal et la souffrance ?",
    optionA: { text: "C'est une épreuve d'Allah pour purifier et élever", isIslam: true },
    optionB: { text: "Cela prouve l'absence ou l'indifférence de Dieu", isIslam: false },
    explanation: "Les épreuves expient les péchés et élèvent le rang du croyant. Allah est Al-Hakîm (Le Sage).",
  },
  {
    question: "Toutes les religions mènent-elles au même but ?",
    optionA: { text: "Oui, ce sont des chemins différents vers la même vérité", isIslam: false },
    optionB: { text: "Non, la vérité est objective et le Tawhid est le critère", isIslam: true },
    explanation: "Le relativisme spirituel nie la notion de vérité. L'Islam affirme que le Tawhid est le message de tous les prophètes.",
  },
  {
    question: "Quelle preuve avons-nous de la prophétie ?",
    optionA: { text: "Aucune preuve tangible, seulement la foi aveugle", isIslam: false },
    optionB: { text: "Les miracles, les prophéties accomplies, et la préservation du Coran", isIslam: true },
    explanation: "L'Islam est une religion de preuves (Burhan), pas de mystères insondables.",
  },
  {
    question: "L'homme peut-il contacter les esprits des morts ?",
    optionA: { text: "Non, les âmes sont dans le Barzakh jusqu'au Jour Dernier", isIslam: true },
    optionB: { text: "Oui, par des médiums et des séances spirites", isIslam: false },
    explanation: "Le spiritisme est interdit en Islam. Les 'esprits' contactés sont en réalité des djinns trompeurs.",
  },
  {
    question: "Quelle est la source de la moralité ?",
    optionA: { text: "La révélation divine qui transcende les époques", isIslam: true },
    optionB: { text: "La société qui évolue et définit le bien et le mal", isIslam: false },
    explanation: "Sans référence transcendante, la moralité devient relative et arbitraire.",
  },
  {
    question: "Comment connaître la volonté de Dieu ?",
    optionA: { text: "Par des révélations personnelles et des signes mystiques", isIslam: false },
    optionB: { text: "Par le Coran et la Sunnah, clairs et préservés", isIslam: true },
    explanation: "La révélation est close avec Muhammad ﷺ. La guidance est dans les textes, pas dans des visions personnelles.",
  },
  {
    question: "L'astrologie peut-elle prédire l'avenir ?",
    optionA: { text: "Oui, les astres influencent nos destinées", isIslam: false },
    optionB: { text: "Non, seul Allah connaît le Ghayb (l'Invisible)", isIslam: true },
    explanation: "L'astrologie est une forme de shirk car elle attribue le pouvoir de l'Invisible à des créatures.",
  },
  {
    question: "La méditation peut-elle remplacer la prière ?",
    optionA: { text: "Non, la Salat est un acte d'adoration prescrit", isIslam: true },
    optionB: { text: "Oui, toutes les formes de spiritualité se valent", isIslam: false },
    explanation: "La méditation sans direction vers Allah est un exercice mental, pas une adoration.",
  },
  {
    question: "Qui a le droit de pardonner les péchés ?",
    optionA: { text: "Des prêtres ou des saints peuvent absoudre", isIslam: false },
    optionB: { text: "Allah seul pardonne, directement, sans intermédiaire", isIslam: true },
    explanation: "Le Tawbah (repentir) se fait directement entre l'homme et Allah. Nul humain ne peut absoudre.",
  },
  {
    question: "La trinité est-elle compatible avec le monothéisme ?",
    optionA: { text: "Non, 3 personnes divines = polytheisme déguisé", isIslam: true },
    optionB: { text: "Oui, c'est un mystère au-delà de la raison", isIslam: false },
    explanation: "Le Coran rejette clairement la trinité : 'Ne dites pas trois... Allah est un Dieu unique' (4:171).",
  },
  {
    question: "Peut-on adorer Dieu à travers des statues ou images ?",
    optionA: { text: "Oui, ce sont des supports pour la dévotion", isIslam: false },
    optionB: { text: "Non, c'est de l'idolâtrie interdite", isIslam: true },
    explanation: "L'Islam interdit toute représentation du divin et toute adoration par des intermédiaires matériels.",
  },
  {
    question: "La science contredit-elle la foi ?",
    optionA: { text: "Non, le Coran encourage la recherche scientifique", isIslam: true },
    optionB: { text: "Oui, il faut choisir entre raison et religion", isIslam: false },
    explanation: "Le premier mot révélé fut 'Iqra' (Lis). L'Islam intègre science et foi.",
  },
  {
    question: "Que penser des 'miracles' des saints ?",
    optionA: { text: "Ils prouvent leur sainteté et leur intercession", isIslam: false },
    optionB: { text: "Seuls les miracles des prophètes sont des preuves", isIslam: true },
    explanation: "Les karamat (prodiges) peuvent exister mais ne sont pas des preuves de sainteté ni de pouvoir d'intercession.",
  },
  {
    question: "L'évolution contredit-elle la création ?",
    optionA: { text: "Allah est le Créateur, Il crée comme Il veut", isIslam: true },
    optionB: { text: "La vie est apparue par hasard sans Créateur", isIslam: false },
    explanation: "L'Islam affirme qu'Allah est le Créateur. Les mécanismes de la création sont Ses outils.",
  },
  {
    question: "Pourquoi tant de religions différentes ?",
    optionA: { text: "Les hommes ont altéré le message unique du Tawhid", isIslam: true },
    optionB: { text: "Chaque peuple crée ses propres dieux", isIslam: false },
    explanation: "Tous les prophètes ont prêché le Tawhid. Les différences viennent des altérations humaines.",
  },
  {
    question: "La Kabbale révèle-t-elle des vérités cachées ?",
    optionA: { text: "C'est une tradition ésotérique altérée", isIslam: true },
    optionB: { text: "Elle contient des secrets divins", isIslam: false },
    explanation: "La Kabbale mélange des éléments du monothéisme avec du paganisme et de la magie.",
  },
  {
    question: "Les anges peuvent-ils désobéir à Allah ?",
    optionA: { text: "Non, ils sont programmés pour obéir", isIslam: true },
    optionB: { text: "Oui, certains sont 'déchus'", isIslam: false },
    explanation: "En Islam, les anges n'ont pas de libre arbitre. Iblis était un djinn, pas un ange.",
  },
  {
    question: "Le yoga spirituel est-il compatible avec l'Islam ?",
    optionA: { text: "Oui, c'est juste de l'exercice", isIslam: false },
    optionB: { text: "Ses aspects spirituels contiennent du shirk", isIslam: true },
    explanation: "Le yoga traditionnel inclut des invocations de divinités hindoues et des concepts incompatibles avec le Tawhid.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const NUM_QUESTIONS = 7;

export const FitraTest = () => {
  const [sessionSeed, setSessionSeed] = useState(() => Math.random());
  
  const questions = useMemo(() => {
    return shuffleArray(allQuestions).slice(0, NUM_QUESTIONS);
  }, [sessionSeed]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ islam: 0, occult: 0 });
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (isIslam: boolean) => {
    if (answered !== null) return;
    
    setAnswered(isIslam);
    if (isIslam) {
      setScore((prev) => ({ ...prev, islam: prev.islam + 1 }));
    } else {
      setScore((prev) => ({ ...prev, occult: prev.occult + 1 }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswered(null);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setSessionSeed(Math.random());
    setCurrentQuestion(0);
    setScore({ islam: 0, occult: 0 });
    setAnswered(null);
    setShowResults(false);
  };

  const q = questions[currentQuestion];

  return (
    <section id="fitra" className="relative py-24 px-4">
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container max-w-4xl relative z-10">
        <SectionTitle
          arabicTitle="اختبار الفطرة"
          title="Test de la Fitra"
          subtitle="La Fitra est la disposition naturelle de l'homme vers le vrai. Découvrez quelle vision du monde correspond à votre nature profonde."
        />

        {!showResults ? (
          <GlassCard glow>
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} / {questions.length}
              </span>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-8 h-1 rounded-full transition-colors",
                        idx < currentQuestion
                          ? "bg-primary"
                          : idx === currentQuestion
                          ? "bg-primary/50"
                          : "bg-secondary"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Question */}
            <h3 className="font-display text-2xl text-foreground text-center mb-8">
              {q.question}
            </h3>

            {/* Options */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => handleAnswer(q.optionA.isIslam)}
                disabled={answered !== null}
                className={cn(
                  "p-6 rounded-xl border text-left transition-all",
                  answered === null
                    ? "bg-secondary/30 border-glass hover:border-primary/50 hover:bg-secondary/50"
                    : answered === q.optionA.isIslam
                    ? q.optionA.isIslam
                      ? "bg-primary/20 border-primary"
                      : "bg-destructive/20 border-destructive"
                    : "bg-secondary/20 border-glass opacity-50"
                )}
              >
                <div className="flex items-start gap-3">
                  {answered !== null && (
                    <span className="mt-1">
                      {q.optionA.isIslam ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                    </span>
                  )}
                  <div>
                    <p className="text-foreground font-medium">{q.optionA.text}</p>
                    {answered !== null && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {q.optionA.isIslam ? "Vision Islamique" : "Vision Occulte"}
                      </p>
                    )}
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAnswer(q.optionB.isIslam)}
                disabled={answered !== null}
                className={cn(
                  "p-6 rounded-xl border text-left transition-all",
                  answered === null
                    ? "bg-secondary/30 border-glass hover:border-primary/50 hover:bg-secondary/50"
                    : answered === q.optionB.isIslam
                    ? q.optionB.isIslam
                      ? "bg-primary/20 border-primary"
                      : "bg-destructive/20 border-destructive"
                    : "bg-secondary/20 border-glass opacity-50"
                )}
              >
                <div className="flex items-start gap-3">
                  {answered !== null && (
                    <span className="mt-1">
                      {q.optionB.isIslam ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                    </span>
                  )}
                  <div>
                    <p className="text-foreground font-medium">{q.optionB.text}</p>
                    {answered !== null && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {q.optionB.isIslam ? "Vision Islamique" : "Vision Occulte"}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </div>

            {/* Explanation */}
            {answered !== null && (
              <div className="p-5 rounded-xl bg-secondary/30 mb-6 animate-fade-in">
                <p className="text-foreground">{q.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {answered !== null && (
              <div className="flex justify-center">
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform"
                >
                  {currentQuestion < questions.length - 1 ? "Question suivante" : "Voir les résultats"}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </GlassCard>
        ) : (
          <GlassCard glow className="text-center">
            <h3 className="font-display text-3xl text-foreground mb-4">Résultats</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-5xl font-display text-gradient-gold mb-2">{score.islam}</p>
                <p className="text-foreground font-medium">Réponses Islamiques</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Clarté, raison, lien direct avec le Créateur
                </p>
              </div>
              <div className="p-6 rounded-xl bg-muted/30">
                <p className="text-5xl font-display text-muted-foreground mb-2">{score.occult}</p>
                <p className="text-foreground font-medium">Réponses Occultes</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Secrets, intermédiaires, complexité
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-secondary/30 mb-8">
              <p className="text-foreground leading-relaxed">
                {score.islam >= 6
                  ? "Votre Fitra (nature innée) penche fortement vers la clarté du Tawhid. Le message coranique résonne avec votre raison naturelle."
                  : score.islam >= 4
                  ? "Vous avez une bonne compréhension du Tawhid. Continuez à approfondir pour renforcer votre Fitra."
                  : score.islam >= 2
                  ? "Vous oscillez entre les deux visions. Le Coran vous invite à approfondir votre réflexion pour revenir à la clarté de la Fitra."
                  : "Les traditions ésotériques ont peut-être influencé votre pensée. Le Coran vous invite à redécouvrir la simplicité du lien direct avec le Créateur."}
              </p>
            </div>

            <button
              onClick={restart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors mx-auto"
            >
              <Shuffle size={18} />
              Nouvelles questions
            </button>
          </GlassCard>
        )}
      </div>
    </section>
  );
};
