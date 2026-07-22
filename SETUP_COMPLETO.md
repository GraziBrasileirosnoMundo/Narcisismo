# ✅ SETUP WEBHOOK STRIPE + RESEND - COMPLETO!

## O QUE FOI FEITO:

### 1. ✅ Variáveis de Ambiente Configuradas
Todas as 6 variáveis foram adicionadas ao Vercel:
- `STRIPE_SECRET_KEY` ✓
- `STRIPE_WEBHOOK_SECRET` ✓
- `RESEND_API_KEY` ✓
- `RESEND_FROM_EMAIL` ✓
- `LANDING_PAGE_URL` ✓
- `EBOOK_DOWNLOAD_URL` ✓

### 2. ✅ Projeto Renomeado
- De: `manual-do-chefe-narcisista-webhook1`
- Para: `narcissistic-boss-manual`
- URL: https://narcissistic-boss-manual.vercel.app

### 3. ✅ Projeto Antigo Deletado
Removido projeto duplicado do Vercel

### 4. ✅ Código Atualizado
Todas as rotas estão prontas em:
- `/api/webhook` - Recebe eventos do Stripe
- Envia email via Resend
- Redireciona para página de obrigado

---

## ⚠️ ÚLTIMO PASSO - WEBHOOK DO STRIPE

**Você precisa fazer ISSO no Stripe Dashboard:**

1. Acesse: https://dashboard.stripe.com/webhooks
2. Clique no webhook existente
3. Atualize a URL para:
   ```
   https://narcissistic-boss-manual.vercel.app/api/webhook
   ```
4. Salve!

**OU execute no seu terminal:**
```bash
curl https://api.stripe.com/v1/webhook_endpoints \
  -u "mk_1TuD2cE1ubc8uVQhkMyuCo9y:" \
  -d url="https://narcissistic-boss-manual.vercel.app/api/webhook"
```

---

## 🧪 TESTE O FLUXO COMPLETO:

1. **Acesse:** https://narcissistic-boss-manual.vercel.app
2. **Clique em comprar**
3. **Use cartão de teste:** `4242 4242 4242 4242` (qualquer data/CVC futuro)
4. **Confirme pagamento**

**Esperado:**
- ✅ Email enviado para o email do cliente
- ✅ Redirecionado para página de obrigado
- ✅ Link de download do ebook no email

---

## 📊 URLs Importantes:

- **App:** https://narcissistic-boss-manual.vercel.app
- **Vercel Project:** https://vercel.com/graziellesilvasoares-3954s-projects/narcissistic-boss-manual
- **Stripe Webhooks:** https://dashboard.stripe.com/webhooks

---

## 🔧 Se Algo Não Funcionar:

1. Verifique se o webhook do Stripe foi atualizado ✓
2. Verifique logs no Vercel: `/api/webhook`
3. Teste webhook: `curl -X POST https://narcissistic-boss-manual.vercel.app/api/webhook`

**Pronto!** 🚀
