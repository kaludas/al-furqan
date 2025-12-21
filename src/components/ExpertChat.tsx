import { useState, useRef, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import { SectionTitle } from "./SectionTitle";
import { Send, Loader2, Sparkles, BookOpen, ShieldAlert, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/theology-chat`;

const suggestedQuestions = [
  "Qu'est-ce que l'I'jaz et pourquoi le Coran est-il considéré inimitable ?",
  "Comment le Tawhid s'oppose-t-il au symbolisme du Baphomet ?",
  "Quelle est la différence entre 'Ilm et Gnose ?",
  "Analysez le verset sur l'embryologie et comparez avec Aristote.",
];

export const ExpertChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"response" | "sources" | "refutation">("response");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-5xl relative z-10">
        <SectionTitle
          arabicTitle="بوصلة الحقيقة"
          title="Boussole de la Vérité"
          subtitle="Posez vos questions sur la théologie comparée. L'IA répond avec des sources vérifiables et des réfutations argumentées."
        />

        <GlassCard glow className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Sparkles size={16} />
              <span>Mode Preuve Activé</span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chaque réponse inclut des références aux Tafsir classiques et une analyse comparative avec les traditions ésotériques.
            </p>
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="mb-8">
              <p className="text-sm text-muted-foreground text-center mb-4">Questions suggérées :</p>
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
              <div className="max-h-[300px] overflow-y-auto space-y-4 p-4 rounded-xl bg-secondary/20 mb-4">
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
                        "max-w-[85%] rounded-2xl px-5 py-4",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card/80 text-foreground rounded-bl-md border border-glass"
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-card/80 border border-glass rounded-2xl rounded-bl-md px-5 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Analyse en cours...</span>
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
                      onClick={() => setActiveTab("refutation")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                        activeTab === "refutation"
                          ? "bg-primary/10 text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <ShieldAlert size={16} />
                      Réfutation
                    </button>
                  </div>

                  <div className="p-5">
                    {activeTab === "response" && (
                      <div className="text-muted-foreground text-sm leading-relaxed">
                        <p className="mb-4">{lastAssistantMessage.content}</p>
                      </div>
                    )}
                    {activeTab === "sources" && (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Sources utilisées pour cette réponse :
                        </p>
                        <div className="grid gap-2">
                          <div className="p-3 rounded-lg bg-secondary/30 text-sm">
                            <span className="text-primary font-medium">📖 Tafsir Ibn Kathir</span>
                            <p className="text-muted-foreground text-xs mt-1">Exégèse classique du 14ème siècle</p>
                          </div>
                          <div className="p-3 rounded-lg bg-secondary/30 text-sm">
                            <span className="text-primary font-medium">📖 Tafsir Al-Qurtubi</span>
                            <p className="text-muted-foreground text-xs mt-1">Exégèse juridique et linguistique</p>
                          </div>
                          <div className="p-3 rounded-lg bg-secondary/30 text-sm">
                            <span className="text-primary font-medium">📖 Tafsir At-Tabari</span>
                            <p className="text-muted-foreground text-xs mt-1">Exégèse historique la plus ancienne</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "refutation" && (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Pourquoi l'interprétation ésotérique est incorrecte :
                        </p>
                        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                          <p className="text-sm text-foreground">
                            Les traditions occultes présentent souvent une "vérité cachée" réservée aux initiés. 
                            Le Coran, au contraire, est un Livre clair (<span className="text-primary">كتاب مبين</span>) 
                            dont le message est accessible à tous. L'ésotérisme contredit le principe coranique 
                            de clarté et d'universalité du message divin.
                          </p>
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
              placeholder="Posez votre question sur le Coran, le Tawhid, l'occultisme..."
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
