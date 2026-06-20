import { NextResponse } from "next/server";

/**
 * Stub do Chat IA — pronto para ligar a um modelo (ex.: API da Anthropic).
 * Defina ANTHROPIC_API_KEY para ativar respostas reais; sem chave, devolve
 * respostas estáticas de apoio para que o widget funcione desde já.
 */
const FALLBACK_REPLIES = [
  "Posso ajudar a esclarecer dúvidas sobre crédito habitação, transferência de crédito, crédito pessoal ou seguros. Para uma análise ao seu caso, recomendo falar com a nossa equipa pelo WhatsApp.",
  "Essa é uma ótima pergunta para a nossa equipa especializada. Pode pedir uma simulação gratuita ou contactar-nos diretamente pelo WhatsApp para uma resposta detalhada.",
  "Posso indicar-lhe o simulador mais adequado: temos simuladores de crédito habitação, crédito pessoal, taxa de esforço, IMT e imposto do selo, todos gratuitos.",
];

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({ messages: [] }));
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const reply = FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    return NextResponse.json({ reply });
  }

  // Integração real fica pronta a ativar aqui quando ANTHROPIC_API_KEY estiver definida.
  const lastUserMessage = body.messages?.at(-1)?.content ?? "";
  return NextResponse.json({
    reply: `Recebi a sua mensagem: "${lastUserMessage}". (Integração com IA pendente de configuração da chave de API.)`,
  });
}
