// pages/api/webhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { stripe, validateWebhookSignature } from '@/lib/stripe';
import { sendPurchaseConfirmation } from '@/lib/resend';
import { PaymentEvent, WebhookError } from '@/lib/types';

// Desativar bodyParser para Stripe
export const config = {
  api: {
    bodyParser: {
      raw: true,
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).json({ error: 'Assinatura não encontrada' });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET não definida');
    return res.status(500).json({ error: 'Configuração interna inválida' });
  }

  try {
    // Validar assinatura do webhook
    const event = await validateWebhookSignature(
      req.body as string,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`Webhook recebido: ${event.type}`);

    // Processar eventos específicos
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as any);
        break;

      case 'payment_intent.payment_failed':
        console.log('Pagamento falhou:', event.data.object);
        break;

      default:
        console.log(`Evento não processado: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

async function handlePaymentSuccess(paymentIntent: any): Promise<void> {
  try {
    // Extrair email do pagamento
    const customerEmail =
      paymentIntent.receipt_email ||
      paymentIntent.billing_details?.email ||
      null;

    if (!customerEmail) {
      console.error('Email do cliente não encontrado');
      return;
    }

    console.log(`Processando pagamento bem-sucedido para ${customerEmail}`);

    // Preparar URLs
    const downloadUrl = process.env.EBOOK_DOWNLOAD_URL;
    const landingPageUrl = process.env.LANDING_PAGE_URL;

    if (!downloadUrl || !landingPageUrl) {
      console.error('URLs de configuração não encontradas');
      return;
    }

    // Enviar email de confirmação
    const emailResult = await sendPurchaseConfirmation(
      customerEmail,
      downloadUrl,
      landingPageUrl,
      'Narcissistic Boss Manual' // Nome do seu produto
    );

    if (emailResult.success) {
      console.log(`Email enviado com sucesso para ${customerEmail} (ID: ${emailResult.messageId})`);

      // Aqui você pode:
      // - Salvar registro em banco de dados
      // - Atualizar CRM
      // - Enviar para fila de processamento
      // - Registrar log
    } else {
      console.error(`Erro ao enviar email para ${customerEmail}:`, emailResult.error);
    }
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    throw error;
  }
}
