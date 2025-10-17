import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = "re_8m9hWETa_Nc3WvcRPjUrrTUBiabNMt6pM"; // ✅ Use your real API key here

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const appointmentData = await req.json();
    console.log("Received appointment request:", appointmentData);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0a1a3c; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
          New Appointment Booking
        </h1>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td><strong>Full Name:</strong></td><td>${appointmentData.fullName}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${appointmentData.email}</td></tr>
          <tr><td><strong>Mobile:</strong></td><td>${appointmentData.mobile}</td></tr>
          <tr><td><strong>Appointment Date:</strong></td><td>${appointmentData.appointmentDate}</td></tr>
          <tr><td><strong>Case Type:</strong></td><td>${appointmentData.caseType}</td></tr>
          <tr><td><strong>Case Details:</strong></td><td>${appointmentData.caseDetails}</td></tr>
        </table>
      </div>
    `;

    // ✅ Send email using Resend REST API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Advocate Rajkumar Saha <onboarding@resend.dev>",
        to: ["adv.rajkumarsha@gmail.com"],
        subject: `New Appointment Booking - ${appointmentData.fullName}`,
        html: emailHtml,
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(emailData)}`);
    }

    console.log("✅ Email sent successfully:", emailData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Appointment email sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("❌ Error sending appointment email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);