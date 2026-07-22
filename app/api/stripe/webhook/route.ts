import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Assinatura do Stripe não encontrada' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Erro ao validar webhook:', error);
    return NextResponse.json({ error: 'Webhook inválido' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true });
    }

    const customerEmail =
      session.customer_details?.email || session.customer_email;

    const customerName = session.customer_details?.name || 'Cliente';

    if (!customerEmail) {
      console.error('E-mail do cliente não encontrado');
      return NextResponse.json(
        { error: 'E-mail não encontrado' },
        { status: 400 }
      );
    }

    const downloadUrl = process.env.EBOOK_DOWNLOAD_URL;

    if (!downloadUrl) {
      console.error('URL de download do ebook não configurada');
      return NextResponse.json(
        { error: 'URL de download não configurada' },
        { status: 500 }
      );
    }

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
      return NextResponse.json(
        { error: 'Erro no envio do e-mail' },
        { status: 500 }
      );
    }

    console.log(`✓ E-mail enviado para ${customerEmail}`);
  }

  return NextResponse.json({ received: true });
}
