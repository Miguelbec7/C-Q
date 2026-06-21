import { NextResponse } from "next/server";

/**
 * Stub do Chat IA — pronto para ligar a um modelo (ex.: API da Anthropic).
 * Defina ANTHROPIC_API_KEY para ativar respostas reais; sem chave, devolve
 * respostas estáticas de apoio (com deteção de tópico por palavras-chave)
 * para que o widget funcione desde já.
 */

interface Topic {
  keywords: string[];
  reply: string;
}

// Base de conhecimento usada tanto para respostas estáticas (sem API key)
// como, no futuro, como contexto a injetar num system prompt real.
const TOPICS: Topic[] = [
  {
    keywords: ["mais-valia", "mais valia", "mais-valias", "mais valias"],
    reply:
      "As mais-valias na venda de um imóvel correspondem ao lucro entre o valor de venda e o de aquisição (corrigido por um coeficiente de desvalorização), e 50% desse valor é tributado em sede de IRS. Há isenção se o imóvel era a sua habitação própria e permanente e reinvestir o valor de realização noutra habitação própria e permanente; na venda de uma segunda habitação não há, em regra, isenção. Pode simular o imposto estimado no nosso simulador de mais-valias imobiliárias (/simuladores/mais-valias-imoveis) ou ler mais no blog (/blog/mais-valias-na-venda-de-imoveis).",
  },
  {
    keywords: ["imi"],
    reply:
      "O IMI é o imposto municipal sobre imóveis, pago anualmente com base no Valor Patrimonial Tributário (VPT) e na taxa do município onde o imóvel se situa. Pode calcular o valor estimado no nosso simulador de IMI (/simuladores/imi), que já preenche a taxa automaticamente por distrito e concelho.",
  },
  {
    keywords: ["imt"],
    reply:
      "O IMT (Imposto Municipal sobre Transmissões Onerosas) é pago na compra de um imóvel, com taxas que variam segundo o valor, o tipo de imóvel e se é habitação própria e permanente ou não. Simule o valor no nosso simulador de IMT (/simuladores/imt).",
  },
  {
    keywords: ["imposto do selo", "imposto de selo"],
    reply:
      "O imposto do selo aplica-se tanto à aquisição do imóvel (0,8% do valor) como ao contrato de crédito habitação. Pode simular ambos no nosso simulador de imposto do selo (/simuladores/imposto-de-selo).",
  },
  {
    keywords: ["salário líquido", "salario liquido", "vencimento líquido", "ordenado líquido"],
    reply:
      "Pode calcular o seu salário líquido mensal, com a retenção de IRS e Segurança Social, no nosso simulador de salário líquido (/simuladores/salario-liquido).",
  },
  {
    keywords: ["taxa de esforço", "taxa de esforco"],
    reply:
      "A taxa de esforço é a percentagem do seu rendimento mensal usada para pagar créditos. Pode calcular a sua no simulador de taxa de esforço (/simuladores/taxa-de-esforco).",
  },
  {
    keywords: ["transferência de crédito", "transferencia de credito", "transferir o crédito", "mudar de banco"],
    reply:
      "Transferir o crédito habitação para outro banco pode reduzir a prestação mensal se conseguir uma taxa ou spread melhores. Veja a poupança estimada no simulador de poupança na transferência de crédito (/simuladores/poupanca-transferencia).",
  },
  {
    keywords: ["crédito habitação", "credito habitacao", "comprar casa"],
    reply:
      "Para comprar casa, pode simular o montante a pedir ao banco e a prestação estimada no nosso simulador de crédito habitação (/simuladores/credito-habitacao).",
  },
  {
    keywords: ["crédito pessoal", "credito pessoal"],
    reply:
      "Pode simular a prestação mensal estimada do seu crédito pessoal no nosso simulador de crédito pessoal (/simuladores/credito-pessoal).",
  },
  {
    keywords: ["seguro"],
    reply:
      "Trabalhamos com seguros associados ao crédito habitação (vida, multirriscos) e outros seguros pessoais. Para uma análise personalizada, fale com a nossa equipa pelo WhatsApp.",
  },
];

const FALLBACK_REPLIES = [
  "Posso ajudar a esclarecer dúvidas sobre crédito habitação, transferência de crédito, crédito pessoal, seguros, IMT, Imposto do Selo, IMI, mais-valias imobiliárias ou salário líquido. Para uma análise ao seu caso, recomendo falar com a nossa equipa pelo WhatsApp.",
  "Essa é uma ótima pergunta para a nossa equipa especializada. Pode pedir uma simulação gratuita ou contactar-nos diretamente pelo WhatsApp para uma resposta detalhada.",
  "Posso indicar-lhe o simulador mais adequado: temos simuladores de crédito habitação, crédito pessoal, taxa de esforço, IMT, imposto do selo, IMI, mais-valias imobiliárias e salário líquido, todos gratuitos.",
];

function findTopicReply(message: string): string | null {
  const normalized = message.toLowerCase();
  const topic = TOPICS.find((t) => t.keywords.some((kw) => normalized.includes(kw)));
  return topic?.reply ?? null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({ messages: [] }));
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const lastUserMessage: string = body.messages?.at(-1)?.content ?? "";

  if (!apiKey) {
    const topicReply = findTopicReply(lastUserMessage);
    const reply = topicReply ?? FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    return NextResponse.json({ reply });
  }

  // Integração real fica pronta a ativar aqui quando ANTHROPIC_API_KEY estiver definida.
  // TOPICS pode ser usado como contexto para um system prompt.
  return NextResponse.json({
    reply: `Recebi a sua mensagem: "${lastUserMessage}". (Integração com IA pendente de configuração da chave de API.)`,
  });
}
