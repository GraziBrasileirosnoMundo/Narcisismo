import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stripe from 'stripe';

interface SuccessPageProps {
  paymentStatus: 'paid' | 'unpaid' | 'error';
  customerEmail?: string;
  sessionId?: string;
}

export default function SuccessPage({ paymentStatus, customerEmail, sessionId }: SuccessPageProps) {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-download ao carregar a página
  useEffect(() => {
    if (paymentStatus === 'paid' && sessionId) {
      downloadPDF();
    }
  }, [paymentStatus, sessionId]);

  const downloadPDF = async () => {
    if (!sessionId) {
      setError('Session ID não encontrado');
      return;
    }

    try {
      setDownloading(true);
      setError(null);

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao baixar PDF');
      }

      // Criar blob do PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Criar link e fazer download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Como-Lidar-com-Chefe-Narcisista.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erro ao baixar PDF:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao baixar PDF');
    } finally {
      setDownloading(false);
    }
  };

  if (paymentStatus === 'error') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.errorTitle}>❌ Erro ao verificar pagamento</h1>
          <p style={styles.text}>Não conseguimos verificar seu pagamento. Por favor, entre em contato conosco.</p>
          <button onClick={() => router.push('/')} style={styles.button}>
            Voltar para Inicio
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus !== 'paid') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.errorTitle}>⏳ Pagamento não confirmado</h1>
          <p style={styles.text}>Seu pagamento ainda não foi confirmado. Por favor, tente novamente.</p>
          <button onClick={() => router.push('/')} style={styles.button}>
            Voltar para Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>✓ Pagamento Confirmado!</h1>
        </div>

        <div style={styles.content}>
          <p style={styles.text}>
            Seu pagamento foi confirmado com sucesso! 🎉
          </p>

          {customerEmail && (
            <p style={styles.email}>
              Email: <strong>{customerEmail}</strong>
            </p>
          )}

          <p style={styles.text}>
            Seu ebook "Como Lidar com Chefe Narcisista" está sendo preparado para download.
          </p>

          {error && (
            <div style={styles.errorBox}>
              <p style={styles.errorText}>⚠️ {error}</p>
            </div>
          )}

          <button
            onClick={downloadPDF}
            disabled={downloading}
            style={{
              ...styles.downloadButton,
              opacity: downloading ? 0.7 : 1,
              cursor: downloading ? 'not-allowed' : 'pointer',
            }}
          >
            {downloading ? '⏳ Baixando...' : '📥 Baixar Ebook Agora'}
          </button>

          <p style={styles.hint}>
            💡 Se o download não iniciar automaticamente, clique no botão acima
          </p>

          <button onClick={() => router.push('/')} style={styles.backButton}>
            Voltar para Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

// Server-side verification
export async function getServerSideProps(context: any) {
  const { session_id } = context.query;

  if (!session_id || typeof session_id !== 'string') {
    return {
      props: {
        paymentStatus: 'error',
      },
    };
  }

  try {
    const stripe = new (await import('stripe')).default(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return {
      props: {
        paymentStatus: session.payment_status === 'paid' ? 'paid' : 'unpaid',
        customerEmail: session.customer_email || session.customer_details?.email,
        sessionId: session_id,
      },
    };
  } catch (error) {
    console.error('Erro ao verificar session:', error);
    return {
      props: {
        paymentStatus: 'error',
      },
    };
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  } as React.CSSProperties,
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    maxWidth: '600px',
    width: '100%',
  } as React.CSSProperties,
  header: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    padding: '40px 20px',
    textAlign: 'center',
  } as React.CSSProperties,
  title: {
    color: 'white',
    margin: 0,
    fontSize: '28px',
  } as React.CSSProperties,
  content: {
    padding: '40px 20px',
  } as React.CSSProperties,
  text: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
    lineHeight: '1.6',
  } as React.CSSProperties,
  email: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
    padding: '10px',
    background: '#f5f5f5',
    borderRadius: '6px',
  } as React.CSSProperties,
  downloadButton: {
    width: '100%',
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  } as React.CSSProperties,
  backButton: {
    width: '100%',
    padding: '12px 24px',
    background: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  } as React.CSSProperties,
  hint: {
    fontSize: '14px',
    color: '#999',
    textAlign: 'center',
    marginBottom: '20px',
  } as React.CSSProperties,
  errorBox: {
    background: '#fee',
    border: '1px solid #fcc',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px',
  } as React.CSSProperties,
  errorText: {
    color: '#c33',
    margin: 0,
    fontSize: '14px',
  } as React.CSSProperties,
  errorTitle: {
    color: 'white',
    margin: 0,
    fontSize: '28px',
  } as React.CSSProperties,
};
