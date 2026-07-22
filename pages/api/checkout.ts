import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { redirectUrl } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Como Lidar com Chefe Narcisista',
              description: 'Guia completo para recuperar seu poder e bem-estar',
            },
            unit_amount: 9700, // R$ 97 em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: redirectUrl || `${process.env.LANDING_PAGE_URL}/thank-you`,
      cancel_url: process.env.LANDING_PAGE_URL || 'https://narcissistic-boss-manual.vercel.app',
      customer_email_collection: {
        allowed: 'always',
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Erro ao criar sessão',
    });
  }
}
