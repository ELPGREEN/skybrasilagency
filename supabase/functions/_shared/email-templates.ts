// Email Templates for SKY BRASIL

const BRAND_COLOR = '#ff3399';
const BRAND_NAME = 'SKY BRASIL';

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #0a0a14; color: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: 700; color: ${BRAND_COLOR}; letter-spacing: -0.02em; }
    .content { background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%); border-radius: 12px; padding: 30px; border: 1px solid rgba(255, 51, 153, 0.2); }
    h1 { font-size: 24px; margin: 0 0 20px; color: #f8fafc; }
    p { font-size: 16px; line-height: 1.6; margin: 0 0 15px; color: #cbd5e1; }
    .highlight { color: ${BRAND_COLOR}; font-weight: 600; }
    .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #64748b; }
    .button { display: inline-block; background: linear-gradient(135deg, ${BRAND_COLOR}, #9933ff); color: white; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">${BRAND_NAME}</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${BRAND_NAME}. Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>
`;

export const contactConfirmationEmail = (name: string) => ({
  subject: 'Recebemos sua mensagem!',
  html: baseTemplate(`
    <h1>Olá ${name},</h1>
    <p>Agradecemos seu contato. Sua mensagem foi recebida com sucesso e entraremos em contato em até <span class="highlight">7 dias úteis</span>.</p>
    <p>Atenciosamente,</p>
    <p><strong>Equipe ${BRAND_NAME}</strong></p>
  `),
});

export const vipConfirmationEmail = (name: string) => ({
  subject: 'Inscrição confirmada!',
  html: baseTemplate(`
    <h1>Olá ${name},</h1>
    <p>Você já está na nossa <span class="highlight">lista VIP</span>!</p>
    <p>Em breve receberá novidades exclusivas e oportunidades especiais da ${BRAND_NAME}.</p>
    <p>Atenciosamente,</p>
    <p><strong>Equipe ${BRAND_NAME}</strong></p>
  `),
});

export const orderConfirmationEmail = (name: string, orderId: string, date: string, items: { name: string; value: number; amount: number }[], total: number) => ({
  subject: `Pedido #${orderId} confirmado!`,
  html: baseTemplate(`
    <h1>Olá ${name}, seu pagamento foi aprovado!</h1>
    <p>Pedido <span class="highlight">#${orderId}</span> recebido em ${date}.</p>
    <div style="background: rgba(255,51,153,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin: 0 0 15px; color: #f8fafc;">Itens do pedido:</h3>
      ${items.map(item => `
        <p style="margin: 5px 0; display: flex; justify-content: space-between;">
          <span>${item.name} x${item.amount}</span>
          <span>R$ ${(item.value * item.amount / 100).toFixed(2)}</span>
        </p>
      `).join('')}
      <hr style="border: none; border-top: 1px solid rgba(255,51,153,0.3); margin: 15px 0;">
      <p style="margin: 0; font-size: 18px; font-weight: 600; display: flex; justify-content: space-between;">
        <span>Total:</span>
        <span class="highlight">R$ ${(total / 100).toFixed(2)}</span>
      </p>
    </div>
    <p>Em breve enviaremos atualizações sobre seu pedido.</p>
    <p>Obrigado pela preferência!</p>
  `),
});

export const adminNotificationEmail = (type: string, data: Record<string, unknown>) => ({
  subject: `[${BRAND_NAME}] Nova ${type}`,
  html: baseTemplate(`
    <h1>Nova ${type} recebida</h1>
    <div style="background: rgba(255,51,153,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
      ${Object.entries(data).map(([key, value]) => `
        <p><strong>${key}:</strong> ${String(value)}</p>
      `).join('')}
    </div>
  `),
});
