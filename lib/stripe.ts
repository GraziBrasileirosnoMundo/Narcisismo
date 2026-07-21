// lib/stripe.ts

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY não definida nas variáveis de ambiente');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export async function validateWebhookSignature(
  body: string,
  signature: string,
  secret: string
): Promise<Stripe.Event> {
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET não definida');
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    return event;
  } catch (error) {
    throw new Error(`Erro ao validar assinatura: ${error}`);
  }
}

export async function getPaymentDetails(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    throw new Error(`Erro ao buscar detalhes do pagamento: ${error}`);
  }
}
