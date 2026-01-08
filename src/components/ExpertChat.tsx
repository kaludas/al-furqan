import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Send, Loader2, Sparkles, BookOpen, ShieldAlert, Lightbulb, RefreshCw, Cross, Star, Moon, Eye, HelpCircle, Volume2, Pause, Play, Square, Plus, Copy, Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Prism progress tracking
type PrismProgress = {
  chretien: number;
  judaique: number;
  occulte: number;
  agnostique: number;
  coran: number;
  verdict: number;
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
  
  // Split by numbered sections - improved regex to match various formats including ##
  const sectionPatterns = [
    { regex: /(?:^|\n)\s*(?:#{1,3}\s*)?\*?\*?\s*1\.?\s*(?:✝️\s*)?(?:LE\s+)?PRISME\s+CHRÉTIEN[^\n]*/i, id: 'chretien', title: 'Le Prisme Chrétien', color: 'blue', icon: '✝️' },
    { regex: /(?:^|\n)\s*(?:#{1,3}\s*)?\*?\*?\s*2\.?\s*(?:✡️\s*)?(?:LE\s+)?PRISME\s+JUDAÏQUE[^\n]*/i, id: 'judaique', title: 'Le Prisme Judaïque', color: 'yellow', icon: '✡️' },
    { regex: /(?:^|\n)\s*(?:#{1,3}\s*)?\*?\*?\s*3\.?\s*(?:🌑\s*)?(?:L['\u2019]?\s*)?ILLUSION\s+OCCULTE[^\n]*/i, id: 'occulte', title: "L'Illusion Occulte", color: 'purple', icon: '🌑' },
    { regex: /(?:^|\n)\s*(?:#{1,3}\s*)?\*?\*?\s*4\.?\s*(?:❔\s*)?(?:LE\s+)?PRISME\s+AGNOSTIQUE[^\n]*/i, id: 'agnostique', title: 'Le Prisme Agnostique', color: 'slate', icon: '❔' },
    { regex: /(?:^|\n)\s*(?:#{1,3}\s*)?\*?\*?\s*5\.?\s*(?:☀️\s*)?(?:LA\s+)?LUMIÈRE\s+DE\s+LA\s+RÉVÉLATION[^\n]*/i, id: 'revelation', title: 'La Lumière de la Révélation', color: 'emerald', icon: '☀️' },
    { regex: /(?:^|\n)\s*(?:#{1,3}\s*)?\*?\*?\s*(?:6\.?\s*)?(?:⚖️\s*)?(?:LE\s+)?VERDICT\s+DE\s+LA\s+RAISON[^\n]*/i, id: 'verdict', title: 'Le Verdict de la Raison', color: 'primary', icon: '⚖️' },
    // Fallback patterns for simpler formats
    { regex: /(?:^|\n)\s*(?:#{1,3}\s*)?\*?\*?\s*CONCLUSION[^\n]*/i, id: 'conclusion', title: 'Conclusion', color: 'primary', icon: '⚖️' },
  ];

  let positions: { start: number; end: number; pattern: typeof sectionPatterns[0] }[] = [];
  
  sectionPatterns.forEach((pattern) => {
    const match = content.match(pattern.regex);
    if (match && match.index !== undefined) {
      // Check if this position is not already taken by another pattern
      const alreadyExists = positions.some(p => Math.abs(p.start - match.index!) < 10);
      if (!alreadyExists) {
        positions.push({ start: match.index, end: match.index + match[0].length, pattern });
      }
    }
  });

  positions.sort((a, b) => a.start - b.start);

  for (let i = 0; i < positions.length; i++) {
    const current = positions[i];
    const nextStart = positions[i + 1]?.start || content.length;
    const sectionContent = content.slice(current.end, nextStart).trim();
    
    if (sectionContent.length > 10) { // Only add sections with meaningful content
      sections.push({
        id: current.pattern.id,
        title: current.pattern.title,
        content: sectionContent,
        color: current.pattern.color,
        icon: current.pattern.icon
      });
    }
  }

  return sections;
};

// Extract verdict content from AI response
const extractVerdictContent = (content: string) => {
  const verdictMatch = content.match(/(?:#{1,3}\s*)?(?:\*?\*?)?\s*(?:6\.?\s*)?(?:⚖️\s*)?(?:LE\s+)?VERDICT\s+DE\s+LA\s+RAISON[^\n]*([\s\S]*?)(?=$)/i);
  if (!verdictMatch) return null;
  
  const verdictText = verdictMatch[1].trim();
  
  // Parse key points from the verdict
  const points: { title: string; content: string; icon: string; color: string }[] = [];
  
  // Look for bold headers or bullet points
  const lines = verdictText.split('\n');
  let currentPoint: { title: string; content: string; icon: string; color: string } | null = null;
  
  lines.forEach(line => {
    const boldMatch = line.match(/\*\*([^*]+)\*\*/);
    if (boldMatch && line.trim().startsWith('**')) {
      if (currentPoint && currentPoint.content.trim()) {
        points.push(currentPoint);
      }
      const title = boldMatch[1].replace(/[:\-–]/g, '').trim();
      let icon = '📌';
      let color = 'primary';
      
      if (/cohéren|logique|raison/i.test(title)) { icon = '🎯'; color = 'emerald'; }
      else if (/contradi|erreur|faille/i.test(title)) { icon = '⚠️'; color = 'red'; }
      else if (/preuve|ijaz|miracle/i.test(title)) { icon = '✨'; color = 'primary'; }
      else if (/tawhid|unicité/i.test(title)) { icon = '☀️'; color = 'emerald'; }
      else if (/conclu|final/i.test(title)) { icon = '⚖️'; color = 'primary'; }
      else if (/chrétien|trinité/i.test(title)) { icon = '✝️'; color = 'blue'; }
      else if (/juif|judaï/i.test(title)) { icon = '✡️'; color = 'yellow'; }
      else if (/occult|ésotér/i.test(title)) { icon = '🌑'; color = 'purple'; }
      else if (/agnost|doute/i.test(title)) { icon = '❔'; color = 'slate'; }
      else if (/islam|coran|révélation/i.test(title)) { icon = '☪️'; color = 'emerald'; }
      
      currentPoint = { title, content: '', icon, color };
    } else if (currentPoint) {
      currentPoint.content += (currentPoint.content ? '\n' : '') + line;
    }
  });
  
  if (currentPoint && currentPoint.content.trim()) {
    points.push(currentPoint);
  }
  
  // If no structured points found, create a single card with the content
  if (points.length === 0 && verdictText.length > 20) {
    points.push({
      title: 'Analyse Comparative',
      content: verdictText.replace(/\*\*/g, '').substring(0, 500),
      icon: '⚖️',
      color: 'primary'
    });
  }
  
  return points;
};

// Component to render dynamic verdict
const DynamicVerdict = ({ content, onSpeak, isSpeaking, isPaused, t }: { 
  content: string; 
  onSpeak?: (text: string, id: string) => void;
  isSpeaking?: boolean;
  isPaused?: boolean;
  t: (key: string) => string;
}) => {
  const points = extractVerdictContent(content);
  
  if (!points || points.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        <p>{t("expert.verdictWillGenerate")}</p>
      </div>
    );
  }

  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    slate: { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
    primary: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary' },
  };

  return (
    <div className="space-y-4">
      {/* Header with play button for entire verdict */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-medium">
          ⚖️ {t("expert.verdictBasedOn")}
        </p>
        {onSpeak && (
          <button
            onClick={() => onSpeak(points.map(p => p.title + ': ' + p.content).join('. '), 'verdict')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              isSpeaking ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary text-muted-foreground"
            )}
          >
            {isSpeaking ? (
              isPaused ? <><Play className="w-3 h-3" /> {t("expert.resume")}</> : <><Pause className="w-3 h-3" /> {t("expert.pause")}</>
            ) : (
              <><Volume2 className="w-3 h-3" /> {t("expert.listenVerdict")}</>
            )}
          </button>
        )}
      </div>

      {/* Dynamic verdict cards */}
      <div className="grid gap-3">
        {points.map((point, index) => {
          const colors = colorMap[point.color] || colorMap.primary;
          return (
            <div 
              key={index} 
              className={cn(
                "p-4 rounded-xl border-2 transition-all",
                colors.bg,
                colors.border
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{point.icon}</span>
                <div className="flex-1">
                  <h4 className={cn("text-sm font-bold mb-2", colors.text)}>
                    {point.title}
                  </h4>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {point.content.replace(/\*\*/g, '').substring(0, 300)}
                    {point.content.length > 300 && '...'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coherence indicators */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-primary/10 border border-emerald-500/20">
        <h5 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
          <span>📊</span> {t("expert.coherenceIndicators")}
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-2 rounded-lg bg-background/30">
            <div className="text-lg font-bold text-emerald-400">✓</div>
            <div className="text-xs text-muted-foreground">{t("expert.tawhidIndicator")}</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-background/30">
            <div className="text-lg font-bold text-emerald-400">✓</div>
            <div className="text-xs text-muted-foreground">{t("expert.preservationIndicator")}</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-background/30">
            <div className="text-lg font-bold text-emerald-400">✓</div>
            <div className="text-xs text-muted-foreground">{t("expert.ijazIndicator")}</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-background/30">
            <div className="text-lg font-bold text-emerald-400">✓</div>
            <div className="text-xs text-muted-foreground">{t("expert.logicIndicator")}</div>
          </div>
        </div>
      </div>
    </div>
  );
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
  
  // Questions sur la vie après la mort
  "Qu'est-ce que le Barzakh et comment y préparer ?",
  "Le Paradis et l'Enfer : différences entre Islam et Christianisme ?",
  "Que dit le Coran sur le jour du Jugement ?",
  "Comment le Coran décrit-il les anges et les djinns ?",
  
  // Questions sur les prophètes
  "Adam et Ève : version coranique vs biblique ?",
  "Qui était Dhul-Qarnayn mentionné dans le Coran ?",
  "L'histoire de Moïse : Coran vs Torah ?",
  "Pourquoi Abraham est-il le père du monothéisme ?",
  "Comment le Coran raconte-t-il l'histoire de Noé ?",
  
  // Questions sur la science et le Coran
  "Le Big Bang est-il mentionné dans le Coran ?",
  "Que dit le Coran sur les montagnes et la tectonique ?",
  "Comment le Coran décrit-il les océans et les barrières ?",
  "Le Coran et la création de l'univers en 6 jours ?",
  
  // Questions existentielles
  "Quel est le sens de la vie selon l'Islam ?",
  "Pourquoi Dieu a-t-il créé l'humanité ?",
  "Comment le libre arbitre fonctionne-t-il en Islam ?",
  "Qu'est-ce que le Qadr (destin) en Islam ?",
  
  // Questions sur l'Islam pratique
  "Pourquoi le porc est-il interdit en Islam ?",
  "Quelle est la sagesse derrière le jeûne du Ramadan ?",
  "Pourquoi les musulmans prient-ils vers La Mecque ?",
  "Qu'est-ce que la Zakat et pourquoi est-elle obligatoire ?",
  
  // Questions sur les femmes et la société
  "Le voile en Islam : obligation ou culture ?",
  "Quel est le statut de la femme en Islam vs autres religions ?",
  "Le mariage en Islam vs le mariage chrétien ?",
  "L'héritage en Islam : pourquoi des parts différentes ?",
  
  // Questions sur l'athéisme et le matérialisme
  "Comment répondre aux arguments de l'athéisme ?",
  "Le matérialisme peut-il expliquer la conscience ?",
  "L'évolution contredit-elle la création ?",
  "Pourquoi le hasard ne peut pas tout expliquer ?",
  
  // Questions sur l'histoire islamique
  "Le Prophète Muhammad était-il illettré ?",
  "Comment le Coran a-t-il été préservé ?",
  "Qui étaient les compagnons du Prophète ?",
  "L'âge d'or islamique : science et foi ?",
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
  const { language, t } = useLanguage();
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
  const [activePrism, setActivePrism] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [prismProgress, setPrismProgress] = useState<PrismProgress>({
    chretien: 0, judaique: 0, occulte: 0, agnostique: 0, coran: 0, verdict: 0
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const prismRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { toast } = useToast();

  // Detect which prism is currently being generated and calculate progress
  useEffect(() => {
    if (!isLoading) {
      setActivePrism(null);
      return;
    }
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role !== "assistant") return;
    
    const content = lastMessage.content;
    const totalLength = content.length;
    
    // Calculate progress for each prism based on content detection
    const newProgress: PrismProgress = { chretien: 0, judaique: 0, occulte: 0, agnostique: 0, coran: 0, verdict: 0 };
    
    const chretienMatch = content.match(/PRISME\s+CHRÉTIEN/i);
    const judaiqueMatch = content.match(/PRISME\s+JUDAÏQUE/i);
    const occulteMatch = content.match(/ILLUSION\s+OCCULTE/i);
    const agnostiqueMatch = content.match(/PRISME\s+AGNOSTIQUE/i);
    const coranMatch = content.match(/LUMIÈRE\s+DE\s+LA\s+RÉVÉLATION/i);
    const verdictMatch = content.match(/VERDICT\s+DE\s+LA\s+RAISON/i);
    
    // Estimate completion based on position of next section
    if (chretienMatch) {
      const start = content.search(/PRISME\s+CHRÉTIEN/i);
      const nextSection = content.search(/PRISME\s+JUDAÏQUE/i);
      if (nextSection > start) newProgress.chretien = 100;
      else newProgress.chretien = Math.min(95, Math.round(((totalLength - start) / 800) * 100));
    }
    if (judaiqueMatch) {
      const start = content.search(/PRISME\s+JUDAÏQUE/i);
      const nextSection = content.search(/ILLUSION\s+OCCULTE/i);
      if (nextSection > start) newProgress.judaique = 100;
      else newProgress.judaique = Math.min(95, Math.round(((totalLength - start) / 800) * 100));
      newProgress.chretien = 100;
    }
    if (occulteMatch) {
      const start = content.search(/ILLUSION\s+OCCULTE/i);
      const nextSection = content.search(/PRISME\s+AGNOSTIQUE/i);
      if (nextSection > start) newProgress.occulte = 100;
      else newProgress.occulte = Math.min(95, Math.round(((totalLength - start) / 800) * 100));
      newProgress.chretien = 100;
      newProgress.judaique = 100;
    }
    if (agnostiqueMatch) {
      const start = content.search(/PRISME\s+AGNOSTIQUE/i);
      const nextSection = content.search(/LUMIÈRE\s+DE\s+LA\s+RÉVÉLATION/i);
      if (nextSection > start) newProgress.agnostique = 100;
      else newProgress.agnostique = Math.min(95, Math.round(((totalLength - start) / 800) * 100));
      newProgress.chretien = 100;
      newProgress.judaique = 100;
      newProgress.occulte = 100;
    }
    if (coranMatch) {
      const start = content.search(/LUMIÈRE\s+DE\s+LA\s+RÉVÉLATION/i);
      const nextSection = content.search(/VERDICT\s+DE\s+LA\s+RAISON/i);
      if (nextSection > start) newProgress.coran = 100;
      else newProgress.coran = Math.min(95, Math.round(((totalLength - start) / 800) * 100));
      newProgress.chretien = 100;
      newProgress.judaique = 100;
      newProgress.occulte = 100;
      newProgress.agnostique = 100;
    }
    if (verdictMatch) {
      newProgress.verdict = Math.min(95, Math.round(((totalLength - content.search(/VERDICT\s+DE\s+LA\s+RAISON/i)) / 600) * 100));
      newProgress.chretien = 100;
      newProgress.judaique = 100;
      newProgress.occulte = 100;
      newProgress.agnostique = 100;
      newProgress.coran = 100;
    }
    
    setPrismProgress(newProgress);
    
    // Check which section is currently being written (last one mentioned)
    if (verdictMatch) setActivePrism("verdict");
    else if (coranMatch) setActivePrism("coran");
    else if (agnostiqueMatch) setActivePrism("agnostique");
    else if (occulteMatch) setActivePrism("occulte");
    else if (judaiqueMatch) setActivePrism("judaique");
    else if (chretienMatch) setActivePrism("chretien");
    else setActivePrism(null);
  }, [isLoading, messages]);

  // Scroll to keep the response section visible (not below it)
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isLoading && sectionRef.current) {
      // Scroll to keep the section in view, not past it
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading]);
  
  // Auto-scroll conversation container to show new content
  useEffect(() => {
    if (activePrism && conversationRef.current) {
      // Scroll within the conversation container only
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [activePrism, messages]);

  // Copy response to clipboard
  const copyToClipboard = useCallback(async () => {
    const lastMessage = messages.filter(m => m.role === "assistant").pop();
    if (!lastMessage) return;
    
    try {
      await navigator.clipboard.writeText(lastMessage.content);
      setCopied(true);
      toast({ title: t("expert.copied"), description: t("expert.copiedToClipboard") });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: t("common.error"), description: t("expert.copyError"), variant: "destructive" });
    }
  }, [messages, toast, t]);

  // Share functions
  const shareOnTwitter = useCallback(() => {
    const lastMessage = messages.filter(m => m.role === "assistant").pop();
    const userQuestion = messages.filter(m => m.role === "user").pop();
    if (!lastMessage || !userQuestion) return;
    
    const text = `📖 Question: ${userQuestion.content.substring(0, 100)}...\n\n🕌 Découvrez l'analyse comparative sur Al-Furqan`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  }, [messages]);

  const shareOnFacebook = useCallback(() => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }, []);

  const shareOnWhatsApp = useCallback(() => {
    const lastMessage = messages.filter(m => m.role === "assistant").pop();
    const userQuestion = messages.filter(m => m.role === "user").pop();
    if (!lastMessage || !userQuestion) return;
    
    const text = `📖 *Question:* ${userQuestion.content}\n\n🕌 *Réponse Al-Furqan:*\n${lastMessage.content.substring(0, 500)}...\n\n👉 ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }, [messages]);

  // Load appropriate voices based on language
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const langPrefix = language === "en" ? "en" : "fr";
      const langVoices = voices.filter(v => v.lang.startsWith(langPrefix));
      setAvailableVoices(langVoices.length > 0 ? langVoices : voices.slice(0, 5));
      if (langVoices.length > 0) setCurrentVoice(langVoices[0]);
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, [language]);

  const speakSection = useCallback((text: string, sectionId: string) => {
    if (!('speechSynthesis' in window)) {
      toast({ title: t("expert.notSupported"), description: t("expert.speechNotSupported"), variant: "destructive" });
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
          language: language,
        }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t("expert.connectionError"));
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
    <section id="expert" className="relative py-24 px-4" ref={sectionRef}>
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-5xl relative z-10">
        <SectionTitle
          arabicTitle={t("expert.arabicTitle")}
          title={t("expert.title")}
          subtitle={t("expert.subtitle")}
        />

        <GlassCard glow className="p-6 md:p-8">
          {/* Header with 5 pillars */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Sparkles size={16} />
              <span>{t("expert.fivePrisms")}</span>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6">
              <div 
                ref={el => prismRefs.current['chretien'] = el}
                className={cn(
                  "p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center transition-all duration-300 relative overflow-hidden",
                  activePrism === "chretien" && "ring-2 ring-blue-400 animate-pulse bg-blue-500/20 scale-105"
                )}
              >
                {isLoading && prismProgress.chretien > 0 && prismProgress.chretien < 100 && (
                  <div className="absolute bottom-0 left-0 h-1 bg-blue-400 transition-all duration-300" style={{ width: `${prismProgress.chretien}%` }} />
                )}
                {prismProgress.chretien === 100 && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-400" />}
                <Cross className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                <p className="text-xs text-blue-400 font-medium">{t("expert.christianity")}</p>
                {isLoading && prismProgress.chretien > 0 && <p className="text-[10px] text-blue-400/70 mt-1">{prismProgress.chretien}%</p>}
              </div>
              <div 
                ref={el => prismRefs.current['judaique'] = el}
                className={cn(
                  "p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center transition-all duration-300 relative overflow-hidden",
                  activePrism === "judaique" && "ring-2 ring-yellow-400 animate-pulse bg-yellow-500/20 scale-105"
                )}
              >
                {isLoading && prismProgress.judaique > 0 && prismProgress.judaique < 100 && (
                  <div className="absolute bottom-0 left-0 h-1 bg-yellow-400 transition-all duration-300" style={{ width: `${prismProgress.judaique}%` }} />
                )}
                {prismProgress.judaique === 100 && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-400" />}
                <Star className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                <p className="text-xs text-yellow-400 font-medium">{t("expert.judaism")}</p>
                {isLoading && prismProgress.judaique > 0 && <p className="text-[10px] text-yellow-400/70 mt-1">{prismProgress.judaique}%</p>}
              </div>
              <div 
                ref={el => prismRefs.current['occulte'] = el}
                className={cn(
                  "p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center transition-all duration-300 relative overflow-hidden",
                  activePrism === "occulte" && "ring-2 ring-purple-400 animate-pulse bg-purple-500/20 scale-105"
                )}
              >
                {isLoading && prismProgress.occulte > 0 && prismProgress.occulte < 100 && (
                  <div className="absolute bottom-0 left-0 h-1 bg-purple-400 transition-all duration-300" style={{ width: `${prismProgress.occulte}%` }} />
                )}
                {prismProgress.occulte === 100 && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-400" />}
                <Eye className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <p className="text-xs text-purple-400 font-medium">{t("expert.occultism")}</p>
                {isLoading && prismProgress.occulte > 0 && <p className="text-[10px] text-purple-400/70 mt-1">{prismProgress.occulte}%</p>}
              </div>
              <div 
                ref={el => prismRefs.current['agnostique'] = el}
                className={cn(
                  "p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 text-center transition-all duration-300 relative overflow-hidden",
                  activePrism === "agnostique" && "ring-2 ring-slate-400 animate-pulse bg-slate-500/20 scale-105"
                )}
              >
                {isLoading && prismProgress.agnostique > 0 && prismProgress.agnostique < 100 && (
                  <div className="absolute bottom-0 left-0 h-1 bg-slate-400 transition-all duration-300" style={{ width: `${prismProgress.agnostique}%` }} />
                )}
                {prismProgress.agnostique === 100 && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-slate-400" />}
                <HelpCircle className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                <p className="text-xs text-slate-400 font-medium">{t("expert.agnosticism")}</p>
                {isLoading && prismProgress.agnostique > 0 && <p className="text-[10px] text-slate-400/70 mt-1">{prismProgress.agnostique}%</p>}
              </div>
              <div 
                ref={el => prismRefs.current['coran'] = el}
                className={cn(
                  "p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center transition-all duration-300 relative overflow-hidden",
                  activePrism === "coran" && "ring-2 ring-emerald-400 animate-pulse bg-emerald-500/20 scale-105"
                )}
              >
                {isLoading && prismProgress.coran > 0 && prismProgress.coran < 100 && (
                  <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 transition-all duration-300" style={{ width: `${prismProgress.coran}%` }} />
                )}
                {prismProgress.coran === 100 && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />}
                <Moon className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <p className="text-xs text-emerald-400 font-medium">{t("expert.quran")}</p>
                {isLoading && prismProgress.coran > 0 && <p className="text-[10px] text-emerald-400/70 mt-1">{prismProgress.coran}%</p>}
              </div>
              <div 
                ref={el => prismRefs.current['verdict'] = el}
                className={cn(
                  "p-3 rounded-xl bg-primary/10 border border-primary/20 text-center transition-all duration-300 relative overflow-hidden",
                  activePrism === "verdict" && "ring-2 ring-primary animate-pulse bg-primary/20 scale-105"
                )}
              >
                {isLoading && prismProgress.verdict > 0 && prismProgress.verdict < 100 && (
                  <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300" style={{ width: `${prismProgress.verdict}%` }} />
                )}
                {prismProgress.verdict === 100 && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />}
                <ShieldAlert className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-primary font-medium">{t("expert.verdict")}</p>
                {isLoading && prismProgress.verdict > 0 && <p className="text-[10px] text-primary/70 mt-1">{prismProgress.verdict}%</p>}
              </div>
            </div>
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">{t("expert.suggested")}</p>
                <button
                  onClick={refreshQuestions}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <RefreshCw size={14} />
                  {t("expert.otherQuestions")}
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
              {/* New Question Button */}
              <div className="flex justify-end mb-3">
                <button
                  onClick={() => {
                    setMessages([]);
                    stopSpeaking();
                    refreshQuestions();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Plus size={16} />
                  Nouvelle question
                </button>
              </div>
              
              {/* Conversation */}
              <div ref={conversationRef} className="max-h-[400px] overflow-y-auto space-y-4 p-4 rounded-xl bg-secondary/20 mb-4 scroll-smooth">
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
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-glass flex-wrap gap-2">
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
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Share buttons */}
                            <div className="flex items-center gap-1 mr-2">
                              <span className="text-xs text-muted-foreground mr-1">Partager:</span>
                              <button
                                onClick={shareOnTwitter}
                                className="p-1.5 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors"
                                title="Partager sur Twitter"
                              >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                              </button>
                              <button
                                onClick={shareOnFacebook}
                                className="p-1.5 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors"
                                title="Partager sur Facebook"
                              >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                              </button>
                              <button
                                onClick={shareOnWhatsApp}
                                className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors"
                                title="Partager sur WhatsApp"
                              >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                              </button>
                            </div>
                            <button
                              onClick={copyToClipboard}
                              className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors",
                                copied 
                                  ? "bg-emerald-500/20 text-emerald-400" 
                                  : "bg-secondary/50 hover:bg-secondary text-muted-foreground"
                              )}
                            >
                              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {copied ? "Copié !" : "Copier"}
                            </button>
                            {isSpeaking && (
                              <button
                                onClick={stopSpeaking}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/20 text-destructive text-xs hover:bg-destructive/30 transition-colors"
                              >
                                <Square className="w-3 h-3" />
                                Arrêter
                              </button>
                            )}
                          </div>
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
                      <DynamicVerdict 
                        content={lastAssistantMessage.content}
                        onSpeak={speakSection}
                        isSpeaking={speakingSection === 'verdict'}
                        isPaused={isPaused}
                        t={t}
                      />
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
