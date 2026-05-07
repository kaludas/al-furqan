import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Heart, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const DOUAA_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/douaa-recommendation`;

const SUGGESTIONS_FR = [
  "Je me sens triste sans raison apparente",
  "J'ai peur de l'avenir et je suis anxieux",
  "Je veux remercier Allah pour Ses bienfaits",
  "Je traverse une épreuve financière difficile",
  "Je sens que ma foi faiblit",
  "J'ai commis un péché et je veux me repentir",
];

const SUGGESTIONS_EN = [
  "I feel sad without clear reason",
  "I am anxious about my future",
  "I want to thank Allah for His blessings",
  "I am going through financial hardship",
  "I feel my faith is weakening",
  "I have sinned and want to repent",
];

// Parse the AI response into intro / douaa cards / outro
function parseDouaas(content: string) {
  const douaaRegex = /###\s*📿[\s\S]*?(?=###\s*📿|$)/g;
  const matches = content.match(douaaRegex) || [];

  let intro = content;
  let outro = "";

  if (matches.length > 0) {
    const firstIdx = content.indexOf(matches[0]);
    intro = content.slice(0, firstIdx).trim();
    const lastMatch = matches[matches.length - 1];
    const lastEnd = content.lastIndexOf(lastMatch) + lastMatch.length;
    outro = content.slice(lastEnd).replace(/^---+\s*/g, "").trim();
  }

  const douaas = matches.map((block) => {
    const cleaned = block.replace(/---+\s*$/g, "").trim();
    const titleMatch = cleaned.match(/###\s*📿\s*(.+)/);
    const title = titleMatch?.[1]?.trim() || "Du'a";

    const grab = (label: string) => {
      const re = new RegExp(`\\*\\*${label}:?\\*\\*\\s*([\\s\\S]*?)(?=\\n\\s*\\*\\*[A-ZÀ-Ÿ]|$)`, "i");
      const m = cleaned.match(re);
      return m?.[1]?.trim() || "";
    };

    return {
      title,
      arabic: grab("ARABE") || grab("ARABIC"),
      translit: grab("TRANSLITTÉRATION") || grab("TRANSLITERATION"),
      phonetic: grab("PHONÉTIQUE") || grab("PHONETIC"),
      translation: grab("TRADUCTION") || grab("TRANSLATION"),
      source: grab("SOURCE"),
      context: grab("CONTEXTE & CONSEIL") || grab("CONTEXT & ADVICE"),
    };
  });

  return { intro: intro.replace(/---+\s*$/g, "").trim(), douaas, outro };
}

export const DouaaCompass = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const isFr = language === "fr";
  const suggestions = isFr ? SUGGESTIONS_FR : SUGGESTIONS_EN;

  useEffect(() => {
    const el = endRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || isLoading) return;

    const userMsg: Msg = { role: "user", content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(DOUAA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages, language }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Stream failed");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let i: number;
        while ((i = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, i);
          buf = buf.slice(i + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) upsertAssistant(c);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e: any) {
      toast({
        title: isFr ? "Erreur" : "Error",
        description: e?.message || (isFr ? "Une erreur s'est produite." : "Something went wrong."),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyDouaa = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(id);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section id="douaa" className="relative py-20 px-4 overflow-hidden">
      {/* Ambient emerald/gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-3xl md:text-4xl font-arabic mb-3 bg-gradient-to-r from-emerald-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
            بوصلة الأدعية
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            {isFr ? "Boussole des Invocations" : "Compass of Invocations"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {isFr
              ? "Confiez votre état émotionnel, moral ou spirituel. L'IA vous recommandera une douaa authentique du Coran ou de la Sunna, avec sa prononciation, sa traduction et son contexte."
              : "Share your emotional, moral or spiritual state. The AI will recommend an authentic du'a from the Quran or Sunnah, with its pronunciation, translation and context."}
          </p>
        </div>

        {/* Chat area */}
        <div className="rounded-2xl border border-emerald-500/20 bg-card/40 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center">
              <Heart className="w-5 h-5 text-background" />
            </div>
            <div>
              <div className="font-semibold text-foreground">
                {isFr ? "Compagnon Spirituel" : "Spiritual Companion"}
              </div>
              <div className="text-xs text-muted-foreground">
                {isFr ? "Coran & Sunna authentique uniquement" : "Quran & authentic Sunnah only"}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-6 max-h-[600px] overflow-y-auto space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-emerald-400/60" />
                <p className="text-muted-foreground mb-6">
                  {isFr ? "Suggestions pour commencer :" : "Suggestions to start:"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => send(s)}
                      className="text-sm px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/15 text-foreground transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => {
              if (msg.role === "user") {
                return (
                  <div key={idx} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-emerald-500/30 text-foreground">
                      {msg.content}
                    </div>
                  </div>
                );
              }
              const { intro, douaas, outro } = parseDouaas(msg.content);
              return (
                <div key={idx} className="space-y-4">
                  {intro && (
                    <div className="prose prose-invert prose-sm max-w-none text-foreground/90 leading-relaxed">
                      <ReactMarkdown>{intro}</ReactMarkdown>
                    </div>
                  )}

                  {douaas.map((d, di) => {
                    const cardId = `${idx}-${di}`;
                    const fullText = `${d.title}\n\n${d.arabic}\n\n${d.translit}\n\n${d.translation}\n\n${d.source}`;
                    return (
                      <div
                        key={di}
                        className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-emerald-950/40 via-card/60 to-amber-950/30 p-5 shadow-lg shadow-emerald-500/5"
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <h3 className="font-semibold text-amber-200 flex items-center gap-2">
                            📿 {d.title}
                          </h3>
                          <button
                            onClick={() => copyDouaa(cardId, fullText)}
                            className="text-xs flex items-center gap-1 px-2 py-1 rounded-md border border-emerald-500/30 hover:bg-emerald-500/10 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                          >
                            {copiedIdx === cardId ? (
                              <><Check className="w-3 h-3" /> {isFr ? "Copié" : "Copied"}</>
                            ) : (
                              <><Copy className="w-3 h-3" /> {isFr ? "Copier" : "Copy"}</>
                            )}
                          </button>
                        </div>

                        {d.arabic && (
                          <div dir="rtl" lang="ar" className="mb-4 p-4 rounded-lg bg-background/40 border border-amber-500/20 text-right text-2xl md:text-3xl leading-loose font-arabic text-amber-100">
                            {d.arabic}
                          </div>
                        )}

                        <div className="space-y-3 text-sm">
                          {d.translit && (
                            <div>
                              <div className="text-xs uppercase tracking-wider text-emerald-300/80 mb-1">
                                {isFr ? "Translittération" : "Transliteration"}
                              </div>
                              <div className="italic text-foreground/90">{d.translit}</div>
                            </div>
                          )}

                          {d.phonetic && (
                            <div>
                              <div className="text-xs uppercase tracking-wider text-emerald-300/80 mb-1">
                                {isFr ? "Prononciation phonétique" : "Phonetic pronunciation"}
                              </div>
                              <div className="text-foreground/90 font-mono text-xs md:text-sm">{d.phonetic}</div>
                            </div>
                          )}

                          {d.translation && (
                            <div>
                              <div className="text-xs uppercase tracking-wider text-emerald-300/80 mb-1">
                                {isFr ? "Traduction" : "Translation"}
                              </div>
                              <div className="text-foreground/90">« {d.translation} »</div>
                            </div>
                          )}

                          {d.source && (
                            <div>
                              <div className="text-xs uppercase tracking-wider text-emerald-300/80 mb-1">
                                {isFr ? "Source" : "Source"}
                              </div>
                              <div className="text-amber-200/90 text-xs">{d.source}</div>
                            </div>
                          )}

                          {d.context && (
                            <div className="pt-3 border-t border-emerald-500/15">
                              <div className="text-xs uppercase tracking-wider text-emerald-300/80 mb-1">
                                {isFr ? "Contexte & Conseil" : "Context & Advice"}
                              </div>
                              <div className="text-foreground/80 leading-relaxed">{d.context}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {outro && (
                    <div className="prose prose-invert prose-sm max-w-none text-foreground/80 italic leading-relaxed">
                      <ReactMarkdown>{outro}</ReactMarkdown>
                    </div>
                  )}

                  {/* Fallback if parsing yielded nothing structured yet (still streaming) */}
                  {!intro && douaas.length === 0 && !outro && (
                    <div className="prose prose-invert prose-sm max-w-none text-foreground/90">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                {isFr ? "Recherche d'une douaa adaptée..." : "Searching for a suitable du'a..."}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-emerald-500/20 bg-background/30">
            <div className="flex gap-2 items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={isFr
                  ? "Décrivez votre état… (ex: « je n'arrive pas à dormir tellement je suis inquiet »)"
                  : "Describe your state… (e.g., \"I can't sleep, I'm so worried\")"}
                rows={2}
                disabled={isLoading}
                className="resize-none bg-background/50 border-emerald-500/30 focus-visible:ring-emerald-400/50"
              />
              <Button
                onClick={() => send()}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-br from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-background h-auto py-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              {isFr
                ? "⚠️ En cas de détresse profonde, consultez un professionnel de santé et un imam de confiance."
                : "⚠️ In case of deep distress, please consult a healthcare professional and a trusted imam."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
