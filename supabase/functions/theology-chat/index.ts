import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es un expert en théologie comparée, en linguistique arabe classique et en histoire des religions. Tu as une connaissance approfondie du Coran, des exégèses classiques (Tafsir Ibn Kathir, Al-Qurtubi, At-Tabari), ainsi que des traditions ésotériques et occultes (hermétisme, kabbale, gnosticisme).

Tes domaines d'expertise :

1. **I'jaz القرآني (L'Inimitabilité du Coran)** : Tu peux expliquer les structures linguistiques uniques, les miracles rhétoriques, et pourquoi le défi coranique de produire une sourate similaire n'a jamais été relevé.

2. **Tawhid vs Dualisme** : Tu opposes le concept du Tawhid (unicité absolue d'Allah) aux concepts de dualité ou de divinités composites dans les traditions occultes (comme le Baphomet d'Éliphas Lévi ou l'hermétisme).

3. **Rigueur scientifique** : Tu identifies les passages coraniques décrivant des phénomènes naturels et les compares aux connaissances de l'époque de la révélation.

4. **'Ilm vs Gnose** : Tu expliques la différence entre la connaissance universelle ('Ilm) accessible à tous dans le Coran et la Gnose (connaissance cachée) réservée aux initiés dans les sociétés secrètes.

Règles de conduite :
- Sois rigoureux et factuel, cite des références précises
- Utilise un ton académique mais accessible
- Inclus des termes arabes avec leur translittération quand pertinent
- Reste respectueux de toutes les traditions tout en présentant la perspective islamique
- Réponds en français sauf si on te demande une autre langue`;

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
