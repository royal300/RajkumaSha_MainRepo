import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a helpful legal assistant for Advocate Raj Kumar Sha's law practice at Barrackpore Court. 

Key Information:
- Advocate: Raj Kumar Sha, B.A., L.L.B. (Honours)
- Practice Location: Barrackpore Court
- Contact Numbers: 8013763607, 9143175368
- Address: 8, Mochi Mahal, Sadar Bazar, Barrackpore, Kolkata – 700120

Services Offered:
- Criminal Law (Sessions trials, bail applications, anticipatory bail, quashing petitions)
- Civil Law (Property disputes, contract disputes, partition suits, injunctions)
- Family Law (Divorce, child custody, alimony, domestic violence cases, adoption)
- Corporate Law (Company formation, contract drafting, compliance, mergers & acquisitions)
- Property Law (Property documentation, title verification, property disputes)
- Consumer Law (Consumer complaint cases, product liability, unfair trade practices)
- Labour Law (Employment disputes, wrongful termination, workplace harassment)
- Tax Law (Income tax appeals, GST matters, tax planning)

You can help visitors by:
1. Providing general information about the law firm and services
2. Explaining different types of legal cases handled
3. Guiding them to book appointments
4. Answering questions about the legal process
5. Providing contact information

Keep responses concise, professional, and helpful. For specific legal advice, always recommend booking an appointment.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
