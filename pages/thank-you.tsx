import React from 'react';

export default function ThankYou() {
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
        textAlign: 'center',
      }}>
        <h1 style={{
          color: '#333',
          fontSize: '32px',
          marginBottom: '16px',
        }}>
          ✓ Pagamento Confirmado!
        </h1>

        <p style={{
          color: '#666',
          fontSize: '18px',
          marginBottom: '24px',
          lineHeight: '1.6',
        }}>
          Obrigado pela sua compra!
        </p>

        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
        }}>
          <p style={{
            color: '#666',
            fontSize: '16px',
            marginBottom: '12px',
          }}>
            Um email de confirmação foi enviado com o link para baixar seu ebook.
          </p>
          <p style={{
            color: '#999',
            fontSize: '14px',
          }}>
            Verifique sua caixa de entrada (ou spam) em alguns segundos.
          </p>
        </div>

        <h2 style={{
          color: '#333',
          fontSize: '20px',
          marginTop: '32px',
          marginBottom: '16px',
        }}>
          Próximas Etapas:
        </h2>

        <ol style={{
          textAlign: 'left',
          color: '#666',
          fontSize: '16px',
          lineHeight: '1.8',
          marginBottom: '24px',
        }}>
          <li>Verifique seu email para o link de download</li>
          <li>Baixe o "Narcissistic Boss Manual"</li>
          <li>Comece a aprender e recupere seu poder!</li>
        </ol>

        <a href="/" style={{
          display: 'inline-block',
          backgroundColor: '#7c3aed',
          color: 'white',
          padding: '12px 32px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '24px',
        }}>
          Voltar ao Site
        </a>
      </div>
    </div>
  );
}
