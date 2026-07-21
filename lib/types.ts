// lib/types.ts

export interface PaymentEvent {
  id: string;
  amount: number;
  amount_received: number;
  currency: string;
  customer_email: string | null;
  description: string | null;
  metadata: Record<string, any>;
  receipt_email: string | null;
  status: 'succeeded' | 'processing' | 'requires_payment_method';
  created: number;
}

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export interface PurchaseData {
  customerEmail: string;
  productName: string;
  amount: number;
  paymentId: string;
  downloadUrl: string;
  landingPageUrl: string;
}

export interface WebhookError {
  code: string;
  message: string;
  details?: any;
}
