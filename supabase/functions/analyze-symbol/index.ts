import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es un expert en histoire des religions, symbolisme et théologie islamique. 
Ton rôle est d'analyser les symboles occultes et ésotériques et d'expliquer :

1. **Origine Historique** : D'où vient ce symbole, qui l'a créé, dans quel contexte.
2. **Signification Ésotérique** : Ce que les occultistes prétendent qu'il représente.
3. **Analyse Critique** : Pourquoi ces prétentions sont humaines et non divines.
4. **Perspective du Tawhid** : Comment le concept coranique de l'Unicité d'Allah (التوحيد) 
   libère l'homme de ces superstitions.

Règles :
- Sois factuel et cite des sources historiques
- Utilise un ton académique mais accessible
- Montre que ces symboles sont des créations humaines sans pouvoir réel
- Rappelle que le Coran appelle à la raison et rejette la magie et les superstitions
- Réponds en français`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!image) {
      return new Response(JSON.stringify({ error: "Aucune image fournie" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Analyzing symbol image with Lovable AI Gateway");

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
          { 
            role: "user", 
            content: [
              {
                type: "text",
                text: "Analyse ce symbole occulte ou ésotérique. Explique son origine historique, sa signification dans les traditions ésotériques, et comment la perspective du Tawhid islamique déconstruit et libère de cette superstition."
              },
              {
                type: "image_url",
                image_url: { url: image }
              }
            ]
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requêtes atteinte. Veuillez réessayer." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits épuisés." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erreur lors de l'analyse" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "Analyse non disponible";

    console.log("Symbol analysis completed successfully");

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-symbol function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
