import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export const config = {
  api: {
    bodyParser: {
      raw: true,
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).json({ error: 'Assinatura do Stripe não encontrada' });
  }

  let event: Stripe.Event;

  try {
    const body = req.body instanceof Buffer ? req.body : Buffer.from(req.body);
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Erro ao validar webhook:', error);
    return res.status(400).json({ error: 'Webhook inválido' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== 'paid') {
      return res.status(200).json({ received: true });
    }

    const customerEmail =
      session.customer_details?.email || session.customer_email;

    const customerName = session.customer_details?.name || 'Cliente';

    if (!customerEmail) {
      console.error('E-mail do cliente não encontrado');
      return res.status(400).json({ error: 'E-mail não encontrado' });
    }

    const downloadUrl = process.env.URL_DE_DOWNLOAD_DO_EBOOK;

    if (!downloadUrl) {
      console.error('URL de download do ebook não configurada');
      return res.status(500).json({ error: 'URL de download não configurada' });
    }

    try {
      const { error } = await resend.emails.send({
        from: 'Grazi <noreply@graziellesilvasoares.com.br>',
        to: customerEmail,
        subject: '✓ Seu ebook está pronto para baixar!',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">✓ Pagamento Confirmado!</h1>
            </div>

            <div style="background: #f9fafb; padding: 40px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">
                Olá <strong>${customerName}</strong>,
              </p>

              <p style="font-size: 16px; margin-bottom: 30px;">
                Seu pagamento foi confirmado com sucesso! 🎉
              </p>

              <p style="font-size: 16px; margin-bottom: 30px;">
                Seu ebook "Como Lidar com Chefe Narcisista" está pronto para download. Clique no botão abaixo para baixar agora:
              </p>

              <div style="text-align: center; margin: 40px 0;">
                <a href="${downloadUrl}" style="
                  display: inline-block;
                  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
                  color: white;
                  padding: 16px 48px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: bold;
                  font-size: 18px;
                ">
                  📥 Baixe seu ebook agora
                </a>
              </div>

              <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #7c3aed; margin: 30px 0;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  <strong>💡 Dica:</strong> Se o link não funcionar, copie e cole no seu navegador
                </p>
              </div>

              <p style="font-size: 14px; color: #666; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                Se você tiver dúvidas ou problemas ao baixar, entre em contato comigo.
              </p>

              <p style="font-size: 14px; color: #666; margin-top: 20px;">
                Que sua jornada de recuperação comece agora! 💪
              </p>

              <p style="font-size: 14px; color: #999; margin-top: 30px;">
                Grazielle Soares
              </p>
            </div>

            <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
              <p style="margin: 0;">© 2026 Como Lidar com Chefe Narcisista. Todos os direitos reservados.</p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Erro ao enviar e-mail:', error);
        return res.status(500).json({ error: 'Erro no envio do e-mail' });
      }

      console.log(`✓ E-mail enviado para ${customerEmail}`);
    } catch (emailError) {
      console.error('Erro ao processar email:', emailError);
      return res.status(500).json({ error: 'Erro ao processar email' });
    }
  }

  return res.status(200).json({ received: true });
}
