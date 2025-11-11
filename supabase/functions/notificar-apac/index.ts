import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificacaoAPACRequest {
  pacienteNome: string;
  pacienteEmail: string;
  pacienteWhatsApp: string;
  tipoNotificacao: "upload" | "vencimento";
  dataVencimento?: string;
  diasRestantes?: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      pacienteNome, 
      pacienteEmail, 
      pacienteWhatsApp, 
      tipoNotificacao,
      dataVencimento,
      diasRestantes
    }: NotificacaoAPACRequest = await req.json();

    // TODO: Implementar envio de e-mail usando Resend
    // Para usar Resend:
    // 1. Instalar: import { Resend } from "npm:resend@2.0.0";
    // 2. Adicionar RESEND_API_KEY nos secrets
    // 3. Configurar domínio em https://resend.com/domains
    
    // Exemplo de e-mail
    const emailBody = tipoNotificacao === "upload" 
      ? `
        <h1>Documento APAC Recebido</h1>
        <p>Olá ${pacienteNome},</p>
        <p>Recebemos seu documento APAC com sucesso!</p>
        <p>Nosso setor administrativo irá validar o documento em breve.</p>
        <p>Você será notificado quando a validação for concluída.</p>
        <p><strong>Vittalis - Centro de Infusão</strong></p>
      `
      : `
        <h1>Atenção: Documentação APAC Vencendo</h1>
        <p>Olá ${pacienteNome},</p>
        <p>Sua documentação APAC vence em <strong>${dataVencimento}</strong> (faltam ${diasRestantes} dias).</p>
        <p><strong>⚠️ IMPORTANTE:</strong> Sem a documentação atualizada, você não poderá realizar suas sessões de medicação/infusão.</p>
        <p>Por favor, atualize sua documentação o quanto antes através da área do paciente.</p>
        <p><strong>Vittalis - Centro de Infusão</strong></p>
      `;

    // TODO: Implementar envio de WhatsApp
    // Opções:
    // 1. Usar Twilio WhatsApp API
    // 2. Usar WhatsApp Business API oficial
    // 3. Usar serviço de terceiros como Evolution API
    
    const whatsappMessage = tipoNotificacao === "upload"
      ? `*Vittalis - Documento APAC Recebido*\n\nOlá ${pacienteNome}!\n\nRecebemos seu documento APAC com sucesso! ✅\n\nNosso setor administrativo irá validar o documento em breve. Você será notificado quando a validação for concluída.`
      : `*Vittalis - APAC Vencendo*\n\nOlá ${pacienteNome}!\n\n⚠️ Sua documentação APAC vence em *${dataVencimento}* (faltam ${diasRestantes} dias).\n\n*IMPORTANTE:* Sem a documentação atualizada, você não poderá realizar suas sessões de medicação/infusão.\n\nPor favor, atualize através da área do paciente.`;

    console.log("Notificações preparadas:");
    console.log("E-mail para:", pacienteEmail);
    console.log("WhatsApp para:", pacienteWhatsApp);
    console.log("Tipo:", tipoNotificacao);

    // Simular sucesso por enquanto
    // Quando implementar os serviços reais, descomentar e usar:
    // const emailResponse = await resend.emails.send({ ... });
    // const whatsappResponse = await enviarWhatsApp({ ... });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notificações enviadas com sucesso",
        email: pacienteEmail,
        whatsapp: pacienteWhatsApp
      }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Erro ao enviar notificações:", error);
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
