import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Send, Loader2, Sparkles, BookOpen, ShieldAlert, Lightbulb, RefreshCw, Cross, Star, Moon, Eye, HelpCircle, Volume2, Pause, Play, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Function to format AI response with doctrine colors
const formatDoctrineContent = (content: string) => {
  // Define patterns for each doctrine section
  const patterns = [
    { 
      regex: /(\*\*1\.\s*LE PRISME CHRÉTIEN[^*]*\*\*|1\.\s*LE PRISME CHRÉTIEN[^\n]*)/gi,
      header: "LE PRISME CHRÉTIEN",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      regex: /(\*\*2\.\s*LE PRISME JUDAÏQUE[^*]*\*\*|2\.\s*LE PRISME JUDAÏQUE[^\n]*)/gi,
      header: "LE PRISME JUDAÏQUE",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      regex: /(\*\*3\.\s*L['']ILLUSION OCCULTE[^*]*\*\*|3\.\s*L['']ILLUSION OCCULTE[^\n]*)/gi,
      header: "L'ILLUSION OCCULTE",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      regex: /(\*\*4\.\s*LA LUMIÈRE DE LA RÉVÉLATION[^*]*\*\*|4\.\s*LA LUMIÈRE DE LA RÉVÉLATION[^\n]*)/gi,
      header: "LA LUMIÈRE DE LA RÉVÉLATION",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    },
    {
      regex: /(\*\*5\.\s*LE VERDICT DE LA RAISON[^*]*\*\*|5\.\s*LE VERDICT DE LA RAISON[^\n]*)/gi,
      header: "LE VERDICT DE LA RAISON",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30"
    }
  ];

  // Split content into sections
  let sections: { type: string; content: string; color: string; bgColor: string; borderColor: string }[] = [];
  let remainingContent = content;
  let lastIndex = 0;

  // Simple approach: just render with highlighted headers
  return content;
};

// Parse response into sections
const parseResponseSections = (content: string) => {
  const sections: { id: string; title: string; content: string; color: string; icon: string }[] = [];
  
  // Split by numbered sections
  const sectionPatterns = [
    { regex: /(?:^|\n)\s*\*?\*?1\.\s*(?:✝️\s*)?LE PRISME CHRÉTIEN\*?\*?/i, id: 'chretien', title: 'Le Prisme Chrétien', color: 'blue', icon: '✝️' },
    { regex: /(?:^|\n)\s*\*?\*?2\.\s*(?:✡️\s*)?LE PRISME JUDAÏQUE\*?\*?/i, id: 'judaique', title: 'Le Prisme Judaïque', color: 'yellow', icon: '✡️' },
    { regex: /(?:^|\n)\s*\*?\*?3\.\s*(?:🌑\s*)?L['']ILLUSION OCCULTE\*?\*?/i, id: 'occulte', title: "L'Illusion Occulte", color: 'purple', icon: '🌑' },
    { regex: /(?:^|\n)\s*\*?\*?4\.\s*(?:❔\s*)?LE PRISME AGNOSTIQUE\*?\*?/i, id: 'agnostique', title: 'Le Prisme Agnostique', color: 'slate', icon: '❔' },
    { regex: /(?:^|\n)\s*\*?\*?5\.\s*(?:☀️\s*)?LA LUMIÈRE DE LA RÉVÉLATION\*?\*?/i, id: 'revelation', title: 'La Lumière de la Révélation', color: 'emerald', icon: '☀️' },
    { regex: /(?:^|\n)\s*\*?\*?6\.\s*(?:⚖️\s*)?LE VERDICT DE LA RAISON\*?\*?/i, id: 'verdict', title: 'Le Verdict de la Raison', color: 'primary', icon: '⚖️' },
  ];

  let positions: { start: number; end: number; pattern: typeof sectionPatterns[0] }[] = [];
  
  sectionPatterns.forEach((pattern) => {
    const match = content.match(pattern.regex);
    if (match && match.index !== undefined) {
      positions.push({ start: match.index, end: match.index + match[0].length, pattern });
    }
  });

  positions.sort((a, b) => a.start - b.start);

  for (let i = 0; i < positions.length; i++) {
    const current = positions[i];
    const nextStart = positions[i + 1]?.start || content.length;
    const sectionContent = content.slice(current.end, nextStart).trim();
    
    sections.push({
      id: current.pattern.id,
      title: current.pattern.title,
      content: sectionContent,
      color: current.pattern.color,
      icon: current.pattern.icon
    });
  }

  return sections;
};

// Component to render formatted message content
const FormattedMessage = ({ 
  content, 
  onSpeakSection,
  speakingSection,
  isPaused
}: { 
  content: string; 
  onSpeakSection?: (text: string, sectionId: string) => void;
  speakingSection?: string | null;
  isPaused?: boolean;
}) => {
  const sections = parseResponseSections(content);
  
  const colorClasses: Record<string, { text: string; bg: string; border: string; headerBg: string }> = {
    blue: { text: 'text-blue-300', bg: 'bg-gradient-to-br from-blue-950/60 to-blue-900/40', border: 'border-blue-400/40', headerBg: 'bg-blue-500/20' },
    yellow: { text: 'text-yellow-300', bg: 'bg-gradient-to-br from-yellow-950/60 to-amber-900/40', border: 'border-yellow-400/40', headerBg: 'bg-yellow-500/20' },
    purple: { text: 'text-purple-300', bg: 'bg-gradient-to-br from-purple-950/60 to-violet-900/40', border: 'border-purple-400/40', headerBg: 'bg-purple-500/20' },
    slate: { text: 'text-slate-300', bg: 'bg-gradient-to-br from-slate-800/60 to-slate-700/40', border: 'border-slate-400/40', headerBg: 'bg-slate-500/20' },
    emerald: { text: 'text-emerald-300', bg: 'bg-gradient-to-br from-emerald-950/60 to-green-900/40', border: 'border-emerald-400/40', headerBg: 'bg-emerald-500/20' },
    primary: { text: 'text-primary', bg: 'bg-gradient-to-br from-primary/20 to-primary/10', border: 'border-primary/40', headerBg: 'bg-primary/20' },
  };

  const formatSectionContent = (text: string, textColor: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Quran verses in quotes
      if (line.match(/«.*»/) || line.match(/".*"/)) {
        return <p key={idx} className="text-emerald-300 italic my-3 pl-4 border-l-2 border-emerald-400/60 text-base">{line}</p>;
      }
      // Sourate references
      if (line.match(/Sourate|Coran\s+\d+:\d+/i)) {
        return <p key={idx} className="text-emerald-400/90 text-sm my-1 font-medium">{line}</p>;
      }
      // Bold text - key arguments
      if (line.match(/\*\*[^*]+\*\*/)) {
        const formatted = line.replace(/\*\*([^*]+)\*\*/g, `<strong class="${textColor} font-bold">$1</strong>`);
        return <p key={idx} className="my-2 text-foreground/90" dangerouslySetInnerHTML={{ __html: formatted }} />;
      }
      // Table header detection - skip markdown tables
      if (line.match(/^\|.*\|$/) || line.match(/^[\-:|\s]+$/)) {
        return null;
      }
      // Bullet points
      if (line.match(/^[-•*]\s+/)) {
        return <p key={idx} className="my-1.5 pl-3 text-foreground/80">• {line.replace(/^[-•*]\s+/, '')}</p>;
      }
      return line.trim() ? <p key={idx} className="my-1.5 text-foreground/80">{line}</p> : null;
    });
  };

  // If no sections found, render plain content
  if (sections.length === 0) {
    const lines = content.split('\n');
    return (
      <div className="whitespace-pre-wrap text-sm leading-relaxed">
        {lines.map((line, index) => {
          if (line.match(/«.*»/) || line.match(/".*"/)) {
            return <p key={index} className="text-emerald-300 italic my-1">{line}</p>;
          }
          if (line.match(/\*\*[^*]+\*\*/)) {
            const formatted = line.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-bold">$1</strong>');
            return <p key={index} className="my-1" dangerouslySetInnerHTML={{ __html: formatted }} />;
          }
          return <p key={index} className="my-1">{line}</p>;
        })}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {sections.map((section) => {
        const colors = colorClasses[section.color] || colorClasses.primary;
        const isCurrentlySpeaking = speakingSection === section.id;
        
        return (
          <div 
            key={section.id} 
            className={cn(
              "rounded-2xl border-2 overflow-hidden transition-all shadow-lg",
              colors.bg,
              colors.border,
              isCurrentlySpeaking && "ring-2 ring-primary/50"
            )}
          >
            {/* Header with gradient */}
            <div className={cn("px-5 py-4 flex items-center justify-between", colors.headerBg)}>
              <h4 className={cn("text-lg font-bold flex items-center gap-3", colors.text)}>
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h4>
              {onSpeakSection && (
                <button
                  onClick={() => onSpeakSection(section.content, section.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    isCurrentlySpeaking 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-background/30 hover:bg-background/50",
                    colors.text
                  )}
                  title={isCurrentlySpeaking ? (isPaused ? "Reprendre" : "Pause") : `Écouter ${section.title}`}
                >
                  {isCurrentlySpeaking ? (
                    isPaused ? (
                      <>
                        <Play className="w-4 h-4" />
                        Reprendre
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    )
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      Écouter
                    </>
                  )}
                </button>
              )}
            </div>
            {/* Content */}
            <div className="px-5 py-4 text-sm leading-relaxed">
              {formatSectionContent(section.content, colors.text)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/theology-chat`;

const allSuggestedQuestions = [
  // Questions sur Jésus et le Christianisme
  "Qui est Jésus selon le Coran vs la Bible ?",
  "Comment la Trinité contredit-elle le Tawhid ?",
  "Le péché originel existe-t-il en Islam ?",
  "Jésus est-il mort sur la croix ?",
  "Qu'est-ce que le Paraclet annoncé dans l'Évangile ?",
  "Comment les Conciles ont-ils modifié le message de Jésus ?",
  "Pourquoi le Coran rejette-t-il la divinité de Jésus ?",
  "Quelle est la différence entre l'Injil et les Évangiles actuels ?",
  
  // Questions sur le Judaïsme et le Sionisme
  "Quelle est la différence entre Torah et Talmud ?",
  "Le peuple élu : vision juive vs vision coranique ?",
  "À qui appartient la Terre Sainte selon le Coran ?",
  "Comment le Coran critique-t-il les altérations de la Torah ?",
  "Qu'est-ce que la Kabbale et pourquoi l'Islam la rejette ?",
  "Le sionisme est-il religieux ou politique ?",
  "Pourquoi le Coran dit 'Roi' pour Joseph et 'Pharaon' pour Moïse ?",
  "Comment le Talmud diffère-t-il de la révélation originelle ?",
  
  // Questions sur l'Occultisme
  "Comment le Tawhid s'oppose-t-il au symbolisme du Baphomet ?",
  "Quelle est la différence entre 'Ilm et Gnose ?",
  "Qui était Hermès Trismégiste et pourquoi est-ce une illusion ?",
  "Comment le Coran traite-t-il la magie et la sorcellerie ?",
  "Quelle est la position islamique sur les sociétés secrètes ?",
  "Pourquoi l'Islam rejette-t-il l'astrologie ?",
  "Qu'est-ce que le shirk et comment se manifeste-t-il dans l'occultisme ?",
  "Comment le Tawhid libère-t-il de la superstition ?",
  
  // Questions sur le Coran et l'I'jaz
  "Qu'est-ce que l'I'jaz et pourquoi le Coran est-il inimitable ?",
  "Comment le Coran décrit-il le développement embryonnaire ?",
  "Expliquez le miracle de l'expansion de l'univers dans le Coran.",
  "Qu'est-ce que le Nazm coranique et pourquoi est-il unique ?",
  "Comment le Coran prouve-t-il son origine divine ?",
  "Pourquoi le Coran est-il resté préservé contrairement à la Bible ?",
  "Comment le Coran corrige-t-il les erreurs de la Bible ?",
  "Qu'est-ce que Al-Furqan (le Discriminateur) ?",
  
  // Questions comparatives générales
  "Comment obtenir le salut : Islam vs Christianisme vs Judaïsme ?",
  "Dieu peut-il avoir un fils ou un égal ?",
  "Quelle est la vraie nature du Messie ?",
  "Pourquoi l'Islam est-il la voie du milieu ?",
  "Comment le Coran restaure-t-il le message original des prophètes ?",
  "Qu'est-ce que la Fitra et comment la préserver ?",
  "Pourquoi le monothéisme pur est-il la seule logique ?",
  "Comment distinguer révélation divine et tradition humaine ?",
  
  // Questions sur l'Agnosticisme
  "Dieu existe-t-il ? Réponse à l'agnosticisme.",
  "Comment le Coran répond-il au doute ?",
  "Peut-on prouver l'existence de Dieu rationnellement ?",
  "Pourquoi l'incertitude n'est-elle pas une option logique ?",
  "Comment sortir du scepticisme spirituel ?",
  "Qu'est-ce que le raisonnement par l'absurde coranique ?",
  "Pourquoi l'Islam est une religion de preuve, pas de mystère ?",
  "Les signes de l'univers prouvent-ils un Créateur ?",
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const ExpertChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"response" | "sources" | "comparison">("response");
  const [questionSeed, setQuestionSeed] = useState(() => Math.random());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingSection, setSpeakingSection] = useState<string | null>(null);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const frenchVoices = voices.filter(v => v.lang.startsWith('fr'));
      setAvailableVoices(frenchVoices.length > 0 ? frenchVoices : voices.slice(0, 5));
      if (frenchVoices.length > 0) setCurrentVoice(frenchVoices[0]);
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakSection = useCallback((text: string, sectionId: string) => {
    if (!('speechSynthesis' in window)) {
      toast({ title: "Non supporté", description: "La synthèse vocale n'est pas supportée par ce navigateur.", variant: "destructive" });
      return;
    }
    
    // If already speaking this section, toggle pause/resume
    if (isSpeaking && speakingSection === sectionId) {
      if (isPaused) {
        speechSynthesis.resume();
        setIsPaused(false);
      } else {
        speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }
    
    // If speaking another section, stop it first
    speechSynthesis.cancel();
    setIsPaused(false);
    
    const cleanText = text.replace(/\*\*/g, '').replace(/[☀️✝️✡️🌑❔⚖️📖|:\-]/g, '').replace(/\n+/g, '. ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (currentVoice) utterance.voice = currentVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setSpeakingSection(sectionId);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingSection(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingSection(null);
    };
    speechSynthesis.speak(utterance);
  }, [currentVoice, toast, isSpeaking, isPaused, speakingSection]);

  const stopSpeaking = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingSection(null);
  }, []);

  const suggestedQuestions = useMemo(() => {
    return shuffleArray(allSuggestedQuestions).slice(0, 4);
  }, [questionSeed]);

  const refreshQuestions = () => {
    setQuestionSeed(Math.random());
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setActiveTab("response");

    let assistantContent = "";

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erreur de connexion");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) updateAssistant(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) updateAssistant(content);
          } catch {}
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Désolé, une erreur s'est produite: ${error instanceof Error ? error.message : "Erreur inconnue"}. Veuillez réessayer.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");

  return (
    <section id="expert" className="relative py-24 px-4">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-5xl relative z-10">
        <SectionTitle
          arabicTitle="الفرقان"
          title="Al-Furqan : Le Discriminateur"
          subtitle="Théologie comparée entre Islam, Christianisme, Judaïsme, Occultisme et Agnosticisme. L'IA analyse chaque question sous 5 prismes différents."
        />

        <GlassCard glow className="p-6 md:p-8">
          {/* Header with 5 pillars */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Sparkles size={16} />
              <span>Mode Confrontation à 5 Prismes</span>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <Cross className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                <p className="text-xs text-blue-400 font-medium">Christianisme</p>
              </div>
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                <Star className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                <p className="text-xs text-yellow-400 font-medium">Judaïsme</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                <Eye className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <p className="text-xs text-purple-400 font-medium">Occultisme</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 text-center">
                <HelpCircle className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                <p className="text-xs text-slate-400 font-medium">Agnosticisme</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-center col-span-3 md:col-span-1">
                <Moon className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-primary font-medium">Coran</p>
              </div>
            </div>
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Questions suggérées :</p>
                <button
                  onClick={refreshQuestions}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <RefreshCw size={14} />
                  Autres questions
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(question)}
                    className="text-left p-4 rounded-xl bg-secondary/30 border border-glass text-sm text-foreground/80 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages with Tabs */}
          {messages.length > 0 && (
            <div className="mb-6">
              {/* Conversation */}
              <div className="max-h-[400px] overflow-y-auto space-y-4 p-4 rounded-xl bg-secondary/20 mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[90%] rounded-2xl px-5 py-4",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card/80 text-foreground rounded-bl-md border border-glass"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <FormattedMessage 
                          content={message.content} 
                          onSpeakSection={speakSection}
                          speakingSection={speakingSection}
                          isPaused={isPaused}
                        />
                      ) : (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-card/80 border border-glass rounded-2xl rounded-bl-md px-5 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Analyse comparative en cours...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Tabs for last response */}
              {lastAssistantMessage && !isLoading && (
                <div className="rounded-xl border border-glass overflow-hidden">
                  <div className="flex border-b border-glass">
                    <button
                      onClick={() => setActiveTab("response")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                        activeTab === "response"
                          ? "bg-primary/10 text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Lightbulb size={16} />
                      Réponse
                    </button>
                    <button
                      onClick={() => setActiveTab("sources")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                        activeTab === "sources"
                          ? "bg-primary/10 text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <BookOpen size={16} />
                      Sources
                    </button>
                    <button
                      onClick={() => setActiveTab("comparison")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                        activeTab === "comparison"
                          ? "bg-primary/10 text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <ShieldAlert size={16} />
                      Verdict
                    </button>
                  </div>

                  <div className="p-5">
                    {activeTab === "response" && (
                      <div className="text-muted-foreground text-sm leading-relaxed">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-glass">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Voix :</span>
                            <select
                              value={currentVoice?.name || ''}
                              onChange={(e) => setCurrentVoice(availableVoices.find(v => v.name === e.target.value) || null)}
                              className="bg-secondary/50 text-xs rounded px-2 py-1 border border-glass"
                            >
                              {availableVoices.map(voice => (
                                <option key={voice.name} value={voice.name}>{voice.name}</option>
                              ))}
                            </select>
                          </div>
                          {isSpeaking && (
                            <button
                              onClick={stopSpeaking}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/20 text-destructive text-xs hover:bg-destructive/30 transition-colors"
                            >
                              <Square className="w-3 h-3" />
                              Arrêter la lecture
                            </button>
                          )}
                        </div>
                        <FormattedMessage 
                          content={lastAssistantMessage.content} 
                          onSpeakSection={speakSection}
                          speakingSection={speakingSection}
                          isPaused={isPaused}
                        />
                      </div>
                    )}
                    {activeTab === "sources" && (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Sources utilisées pour l'analyse comparative :
                        </p>
                        <div className="grid md:grid-cols-2 gap-2">
                          <div className="p-3 rounded-lg bg-primary/10 text-sm">
                            <span className="text-primary font-medium">📖 Tafsir Ibn Kathir</span>
                            <p className="text-muted-foreground text-xs mt-1">Exégèse classique du Coran</p>
                          </div>
                          <div className="p-3 rounded-lg bg-primary/10 text-sm">
                            <span className="text-primary font-medium">📖 Tafsir Al-Qurtubi</span>
                            <p className="text-muted-foreground text-xs mt-1">Exégèse juridique et linguistique</p>
                          </div>
                          <div className="p-3 rounded-lg bg-blue-500/10 text-sm">
                            <span className="text-blue-400 font-medium">✝️ Bible (AT & NT)</span>
                            <p className="text-muted-foreground text-xs mt-1">Ancien et Nouveau Testament</p>
                          </div>
                          <div className="p-3 rounded-lg bg-yellow-500/10 text-sm">
                            <span className="text-yellow-400 font-medium">✡️ Talmud & Mishna</span>
                            <p className="text-muted-foreground text-xs mt-1">Tradition rabbinique</p>
                          </div>
                          <div className="p-3 rounded-lg bg-purple-500/10 text-sm">
                            <span className="text-purple-400 font-medium">🔮 Corpus Hermeticum</span>
                            <p className="text-muted-foreground text-xs mt-1">Textes hermétiques</p>
                          </div>
                          <div className="p-3 rounded-lg bg-purple-500/10 text-sm">
                            <span className="text-purple-400 font-medium">🔮 Sefer ha-Zohar</span>
                            <p className="text-muted-foreground text-xs mt-1">Texte central de la Kabbale</p>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-500/10 text-sm">
                            <span className="text-slate-400 font-medium">❔ Philosophie Sceptique</span>
                            <p className="text-muted-foreground text-xs mt-1">Pyrrhon, Hume, Russell</p>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-500/10 text-sm">
                            <span className="text-slate-400 font-medium">❔ Arguments Cosmologiques</span>
                            <p className="text-muted-foreground text-xs mt-1">Kalam, Al-Ghazali, Ibn Rushd</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "comparison" && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Pourquoi le Coran est Al-Furqan (Le Discriminateur) :
                        </p>
                        
                        <div className="grid gap-3">
                          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                            <h4 className="text-sm font-medium text-primary mb-2">☀️ Préservation Textuelle</h4>
                            <p className="text-xs text-muted-foreground">
                              Le Coran est resté lettre pour lettre identique depuis 1400 ans, contrairement aux multiples versions de la Bible et aux débats talmudiques contradictoires.
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                            <h4 className="text-sm font-medium text-primary mb-2">⚖️ Arbitrage Divin</h4>
                            <p className="text-xs text-muted-foreground">
                              "Ce Coran raconte aux Enfants d'Israël la plupart des sujets sur lesquels ils divergent." (Sourate An-Naml, 27:76)
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                            <h4 className="text-sm font-medium text-primary mb-2">🎯 Précision Historique</h4>
                            <p className="text-xs text-muted-foreground">
                              Le Coran utilise "Malik" (Roi) pour l'Égypte de Joseph et "Fir'awn" (Pharaon) pour celle de Moïse - précision que la Bible ne fait pas.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Posez votre question comparative : Coran, Bible, Talmud, Occultisme..."
              className="flex-1 bg-secondary/30 border border-glass rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className={cn(
                "px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-2",
                "bg-primary text-primary-foreground font-medium",
                "hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              )}
            >
              <Send size={18} />
              <span className="hidden sm:inline">Envoyer</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
