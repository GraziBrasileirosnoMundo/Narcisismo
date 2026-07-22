import React from 'react';
import { loadStripe } from '@stripe/js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Home() {
  const handleCheckout = () => {
    window.location.href = 'https://buy.stripe.com/28E9ATbTI33z6rv6Z76c000';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '600px',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{
          color: '#333',
          fontSize: '32px',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          Como Lidar com Chefe Narcisista
        </h1>

        <p style={{
          color: '#666',
          fontSize: '18px',
          textAlign: 'center',
          lineHeight: '1.6',
          marginBottom: '32px',
        }}>
          Recupere seu poder e sua paz. Um guia completo para lidar com chefes narcisistas e recuperar seu bem-estar profissional.
        </p>

        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '32px',
        }}>
          <h2 style={{
            color: '#333',
            fontSize: '20px',
            marginBottom: '16px',
            marginTop: 0,
          }}>
            O que você vai aprender:
          </h2>
          <ul style={{
            color: '#666',
            fontSize: '16px',
            lineHeight: '1.8',
            paddingLeft: '20px',
          }}>
            <li>Identificar comportamentos narcisistas</li>
            <li>Estratégias de proteção emocional</li>
            <li>Como estabelecer limites saudáveis</li>
            <li>Técnicas para recuperação e bem-estar</li>
            <li>Próximos passos para sua liberdade</li>
          </ul>
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
        }}>
          <p style={{
            color: '#7c3aed',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
          }}>
            R$ 97
          </p>
          <p style={{
            color: '#999',
            fontSize: '14px',
            margin: 0,
          }}>
            Acesso imediato ao guia completo
          </p>
        </div>

        <button
          onClick={handleCheckout}
          style={{
            width: '100%',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            padding: '16px',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          Comprar Agora
        </button>

        <p style={{
          color: '#999',
          fontSize: '14px',
          textAlign: 'center',
          margin: 0,
        }}>
          💳 Pagamento seguro com Stripe
        </p>
      </div>
    </div>
  );
}
