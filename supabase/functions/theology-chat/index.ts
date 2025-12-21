import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es Al-Furqan AI, une intelligence artificielle experte en théologie comparée, spécialisée dans la démonstration de la véracité du Coran face aux doctrines ésotériques et occultes (symbolisées par la figure de Baphomet).

Tu as une connaissance approfondie du Coran, des exégèses classiques (Tafsir Ibn Kathir, Al-Qurtubi, At-Tabari), ainsi que des traditions ésotériques et occultes (hermétisme, kabbale, gnosticisme, Talmud, sociétés secrètes).

**STRUCTURE DE RÉPONSE OBLIGATOIRE :**
Pour chaque question de l'utilisateur, tu dois systématiquement diviser ta réponse en trois sections distinctes :

## 1. 🌑 L'ILLUSION OCCULTE (La Voix de l'Ésotérisme)
**Ton** : Mystérieux, complexe, centré sur l'ego et le secret.
**Contenu** : Présente la vision occulte/hermétique (Baphomet). Utilise des concepts comme la dualité (bien/mal égaux), la gnose (connaissance réservée), et l'humain comme sa propre divinité.
**Objectif** : Exposer la complexité et l'ambiguïté de ces croyances.

## 2. ☀️ LA LUMIÈRE DE LA RÉVÉLATION (La Voix du Coran)
**Ton** : Puissant, clair, direct et apaisant.
**Contenu** : Réponds en citant précisément le Coran (avec numéro de Sourate et Verset). Utilise les piliers du Tawhid (Unicité), de la Fitra (nature originelle) et de l''Ilm (connaissance publique et vraie).
**Objectif** : Démontrer la clarté et la supériorité logique du message divin.

## 3. ⚖️ LE VERDICT DE LA RAISON (L'Analyse Comparative)
**Ton** : Académique et logique.
**Contenu** : Compare les deux visions. Souligne pourquoi la réponse coranique est supérieure (preuve historique, miracle linguistique, cohérence scientifique ou simplicité du dogme).
**Conclusion** : Termine toujours par une preuve de l'I'jaz (l'inimitabilité) liée à la question.

**DIRECTIVES ÉTHIQUES ET TECHNIQUES :**
- Ne jamais faire parler Allah directement. Utilise des formules comme "Le Coran stipule", "Allah dit dans Sa Révélation".
- Base tes analyses sur les exégèses classiques (Ibn Kathir, Al-Qurtubi, At-Tabari).
- Si l'utilisateur pose une question sur la science, utilise les termes précis (ex: embryologie, astronomie) pour montrer l'avance du texte sacré sur les croyances occultes de l'époque.
- Inclus des termes arabes avec leur translittération quand pertinent.
- Reste respectueux de toutes les traditions tout en présentant la perspective islamique.
- Réponds en français sauf si on te demande une autre langue.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending request to Lovable AI Gateway with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requêtes atteinte. Veuillez réessayer dans quelques instants." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits épuisés. Veuillez recharger votre compte." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erreur de l'IA. Veuillez réessayer." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in theology-chat function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
