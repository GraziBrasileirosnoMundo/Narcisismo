// lib/resend.ts

import { Resend } from 'resend';
import { EmailPayload } from './types';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY não definida nas variáveis de ambiente');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const response = await resend.emails.send({
      from: fromEmail,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });

    if (response.error) {
      console.error('Erro ao enviar email:', response.error);
      return {
        success: false,
        error: response.error.message,
      };
    }

    console.log(`Email enviado com sucesso para ${payload.to}. ID: ${response.data?.id}`);
    return {
      success: true,
      messageId: response.data?.id,
    };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return {
      success: false,
      error: String(error),
    };
  }
}

export async function sendPurchaseConfirmation(
  email: string,
  downloadUrl: string,
  landingPageUrl: string,
  productName: string = 'Seu Produto Digital'
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Obrigado pela compra!</h1>
          </div>
          <div class="content">
            <p>Oi,</p>
            <p>Recebemos seu pagamento com sucesso. Seu <strong>${productName}</strong> está pronto para download!</p>

            <center>
              <a href="${downloadUrl}" class="button">📥 Baixar Agora</a>
            </center>

            <h3>Próximos passos:</h3>
            <ol>
              <li>Clique no botão acima para baixar seu ebook</li>
              <li>Verifique seu email de spam se não receber</li>
              <li>Aproveite o conteúdo! 🚀</li>
            </ol>

            <p style="margin-top: 30px; font-style: italic;">
              Dúvidas? Acesse nossa página: <a href="${landingPageUrl}">${landingPageUrl}</a>
            </p>

            <div class="footer">
              <p>Este é um email automático. Por favor, não responda.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `🎁 Seu ${productName} está pronto!`,
    html,
  });
}
