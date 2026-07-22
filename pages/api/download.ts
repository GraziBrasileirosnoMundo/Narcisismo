import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';
import https from 'https';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { sessionId } = req.body;

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'Session ID inválido' });
  }

  try {
    // Verificar session no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verificar se o pagamento foi confirmado
    if (session.payment_status !== 'paid') {
      return res.status(403).json({ error: 'Pagamento não confirmado' });
    }

    // Obter URL do PDF das variáveis de ambiente
    const pdfUrl = process.env.URL_DE_DOWNLOAD_DO_EBOOK;

    if (!pdfUrl) {
      console.error('URL de download do ebook não configurada');
      return res.status(500).json({ error: 'PDF não disponível' });
    }

    // Se for URL (Google Drive, etc), fazer download e servir
    if (pdfUrl.startsWith('http')) {
      return downloadFromUrl(pdfUrl, res);
    }

    // Se for arquivo local, servir
    const filePath = path.join(process.cwd(), 'public', pdfUrl);
    if (fs.existsSync(filePath)) {
      return serveLocalFile(filePath, res);
    }

    return res.status(404).json({ error: 'PDF não encontrado' });
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    return res.status(500).json({ error: 'Erro ao processar download' });
  }
}

// Servir arquivo local
function serveLocalFile(filePath: string, res: NextApiResponse) {
  try {
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Como-Lidar-com-Chefe-Narcisista.pdf"');
    fileStream.pipe(res);
  } catch (error) {
    console.error('Erro ao servir arquivo:', error);
    res.status(500).json({ error: 'Erro ao servir arquivo' });
  }
}

// Fazer download de URL e servir
function downloadFromUrl(url: string, res: NextApiResponse) {
  https
    .get(url, (response) => {
      // Verificar se é Google Drive
      if (url.includes('drive.google.com')) {
        // Google Drive retorna HTML, precisamos extrair o download real
        // Adicionar parâmetro export=download
        const downloadUrl = url.replace(/\/edit.*/, '') + '?export=download';
        return downloadFromUrl(downloadUrl, res);
      }

      // Adicionar headers para o navegador fazer download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Como-Lidar-com-Chefe-Narcisista.pdf"');

      // Pipetar a resposta do servidor remoto
      response.pipe(res);
    })
    .on('error', (error) => {
      console.error('Erro ao fazer download da URL:', error);
      res.status(500).json({ error: 'Erro ao fazer download do PDF' });
    });
}
