import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  optionA: { text: string; isIslam: boolean };
  optionB: { text: string; isIslam: boolean };
  explanation: string;
}

const questions: Question[] = [
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
];

export const FitraTest = () => {
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
              <div className="p-5 rounded-xl bg-secondary/30 mb-6 animate-fade-up">
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
                {score.islam >= 4
                  ? "Votre Fitra (nature innée) penche fortement vers la clarté du Tawhid. Le message coranique résonne avec votre raison naturelle."
                  : score.islam >= 2
                  ? "Vous oscillez entre les deux visions. Le Coran vous invite à approfondir votre réflexion pour revenir à la clarté de la Fitra."
                  : "Les traditions ésotériques ont peut-être influencé votre pensée. Le Coran vous invite à redécouvrir la simplicité du lien direct avec le Créateur."}
              </p>
            </div>

            <button
              onClick={restart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors mx-auto"
            >
              <RotateCcw size={18} />
              Recommencer le test
            </button>
          </GlassCard>
        )}
      </div>
    </section>
  );
};
