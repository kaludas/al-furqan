import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const FloatingChatButton = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentSection = typeof window !== "undefined" 
    ? document.querySelector("section:hover")?.id || "général"
    : "général";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const systemPrompt = language === "fr" 
        ? `Tu es Al-Furqan, un assistant expert en théologie comparée entre Islam, Christianisme, Judaïsme et traditions ésotériques.
      
Tu réponds de manière concise et éducative. Tu peux générer des tableaux comparatifs si l'utilisateur le demande.

Contexte actuel de l'utilisateur : Il navigue sur la section "${currentSection}" de l'application.

Règles :
- Sois objectif et respectueux de toutes les traditions
- Cite les sources (versets, textes) quand pertinent
- Propose des comparaisons structurées si utile
- Reste concis mais complet`
        : `You are Al-Furqan, an expert assistant in comparative theology between Islam, Christianity, Judaism and esoteric traditions.
      
You respond concisely and educationally. You can generate comparative tables if requested.

Current user context: They are browsing the "${currentSection}" section of the application.

Rules:
- Be objective and respectful of all traditions
- Cite sources (verses, texts) when relevant
- Offer structured comparisons if useful
- Stay concise but complete`;

      const { data, error } = await supabase.functions.invoke("theology-chat", {
        body: {
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
            { role: "user", content: userMessage },
          ],
        },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chat.error"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-muted text-muted-foreground rotate-90"
            : "bg-primary text-primary-foreground hover:scale-110"
        }`}
        aria-label={isOpen ? t("chat.close") : t("chat.open")}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Tooltip when closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-20 z-50 animate-fade-in">
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
            <p className="text-sm text-foreground whitespace-nowrap flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {t("chat.open")}
            </p>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md animate-scale-in">
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-primary/10 border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("chat.title")}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t("chat.subtitle")}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-3">
                  <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                  <div className="space-y-1">
                    <p className="text-muted-foreground">
                      {t("chat.askQuestion")}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {t("chat.example")}
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("chat.placeholder")}
                  className="min-h-[44px] max-h-[120px] resize-none"
                  rows={1}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
