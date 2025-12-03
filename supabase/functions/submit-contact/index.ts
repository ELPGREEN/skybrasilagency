import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@skybrasil.com.br";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  userType?: string;
  message: string;
  source: "contact" | "vip";
  // VIP specific fields
  channel?: string;
  platform?: string;
  followers?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ContactRequest = await req.json();
    console.log("Received contact submission:", { ...body, email: "***" });

    const { name, email, userType, message, source, channel, platform, followers } = body;

    // Validação básica
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Nome, email e mensagem são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Criar cliente Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Salvar no banco de dados
    const submissionData = {
      name,
      email,
      user_type: userType || channel ? `${platform} - ${followers || 'N/A'} seguidores` : null,
      message: source === "vip" 
        ? `Canal: ${channel}\nPlataforma: ${platform}\nSeguidores: ${followers || 'N/A'}\n\n${message}`
        : message,
      source,
    };

    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert(submissionData)
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar mensagem" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Submission saved to database:", submission.id);

    // Enviar email de confirmação para o usuário
    const userEmailSubject = source === "vip" 
      ? "SKY BRASIL - Recebemos sua inscrição VIP!" 
      : "SKY BRASIL - Recebemos sua mensagem!";

    const userEmailContent = source === "vip" 
      ? `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #ff0080, #7928ca); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🌟 Lista VIP SKY BRASIL</h1>
          </div>
          <div style="padding: 40px; color: #e0e0e0;">
            <h2 style="color: #ff0080; margin-top: 0;">Olá, ${name}!</h2>
            <p style="font-size: 16px; line-height: 1.8;">
              Recebemos sua inscrição para a <strong style="color: #7928ca;">Lista VIP</strong>! 
              Nossa equipe irá analisar seu perfil e entraremos em contato em até <strong>7 dias úteis</strong>.
            </p>
            <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #ff0080;">
              <p style="margin: 0; color: #a0a0a0;"><strong>Canal:</strong> ${channel}</p>
              <p style="margin: 8px 0; color: #a0a0a0;"><strong>Plataforma:</strong> ${platform}</p>
              ${followers ? `<p style="margin: 0; color: #a0a0a0;"><strong>Seguidores:</strong> ${followers}</p>` : ''}
            </div>
            <p style="font-size: 14px; color: #888;">
              Enquanto isso, siga nossas redes sociais para ficar por dentro das novidades!
            </p>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} SKY BRASIL. Todos os direitos reservados.</p>
          </div>
        </div>
      `
      : `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #00d4ff, #7928ca); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">✉️ SKY BRASIL</h1>
          </div>
          <div style="padding: 40px; color: #e0e0e0;">
            <h2 style="color: #00d4ff; margin-top: 0;">Olá, ${name}!</h2>
            <p style="font-size: 16px; line-height: 1.8;">
              Recebemos sua mensagem e nossa equipe irá analisá-la. 
              Responderemos em até <strong>24 horas úteis</strong>.
            </p>
            <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #00d4ff;">
              <p style="margin: 0; color: #a0a0a0; font-style: italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
            </div>
            <p style="font-size: 14px; color: #888;">
              Se precisar de ajuda urgente, entre em contato pelo email: contato@skybrasil.com.br
            </p>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} SKY BRASIL. Todos os direitos reservados.</p>
          </div>
        </div>
      `;

    // Email para o usuário
    try {
      const userEmailResponse = await resend.emails.send({
        from: "SKY BRASIL <onboarding@resend.dev>",
        to: [email],
        subject: userEmailSubject,
        html: userEmailContent,
      });
      console.log("User confirmation email sent:", userEmailResponse);
    } catch (emailError) {
      console.error("Error sending user email:", emailError);
      // Não falha o request se o email não for enviado
    }

    // Email para o admin
    try {
      const adminEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nova ${source === 'vip' ? 'Inscrição VIP' : 'Mensagem de Contato'}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nome:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
            ${source === 'vip' ? `
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Canal:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${channel}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Plataforma:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${platform}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Seguidores:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${followers || 'N/A'}</td></tr>
            ` : `
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Tipo:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${userType || 'N/A'}</td></tr>
            `}
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Data:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleString('pt-BR')}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <strong>Mensagem:</strong>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            ID: ${submission.id}
          </p>
        </div>
      `;

      const adminEmailResponse = await resend.emails.send({
        from: "SKY BRASIL Forms <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `[SKY BRASIL] Nova ${source === 'vip' ? 'Inscrição VIP' : 'Mensagem'}: ${name}`,
        html: adminEmailContent,
      });
      console.log("Admin notification email sent:", adminEmailResponse);
    } catch (emailError) {
      console.error("Error sending admin email:", emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Mensagem enviada com sucesso!",
        id: submission.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
