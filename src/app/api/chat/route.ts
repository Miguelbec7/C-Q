import { NextResponse } from "next/server";
import { buildChatKnowledgeBase } from "@/lib/chat-knowledge";
import { siteConfig } from "@/lib/site-config";

/**
 * Chat IA — com ANTHROPIC_API_KEY definida, responde com a API da Anthropic
 * (Claude), usando o conteúdo do blog, dos serviços e dos simuladores como
 * contexto. Sem chave, devolve respostas estáticas de apoio (deteção de
 * tópico por palavras-chave) para que o widget funcione desde já.
 */

interface Topic {
  keywords: string[];
  reply: string;
}

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

function buildSystemPrompt(): string {
  return `Você é o assistente virtual da ${siteConfig.name}, uma empresa de intermediação de crédito registada no Banco de Portugal (${siteConfig.banking.bdpRegistration}). Responda em português de Portugal, de forma clara, breve e simpática, baseando-se apenas no conteúdo abaixo (artigos do blog, serviços e simuladores do site).

Regras:
- Não invente valores de taxas, impostos ou condições de crédito que não estejam no conteúdo fornecido — remeta para o simulador relevante para um cálculo exato.
- Quando relevante, inclua o link do simulador, serviço ou artigo do blog mencionado no conteúdo (ex.: /simuladores/imi, /blog/...).
- Não é mediador de seguros; pode mencionar que existem parcerias para seguros associados ao crédito, mas remeta para contacto direto com a equipa para esse tema.
- Se a pergunta não tiver relação com crédito, imóveis, impostos associados ou os serviços da empresa, recuse com simpatia e sugira contactar a equipa pelo WhatsApp ou formulário de contacto.
- Nunca dê aconselhamento jurídico ou fiscal definitivo — apresente a informação como orientação geral e sugira confirmação com a equipa para o caso concreto.

Conteúdo do site:
${buildChatKnowledgeBase()}`;
}

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string;
}

async function callAnthropic(apiKey: string, messages: AnthropicMessage[]): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API respondeu ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.find((block: { type: string }) => block.type === "text")?.text;
  if (!text) {
    throw new Error("Resposta da Anthropic sem conteúdo de texto");
  }
  return text;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({ messages: [] }));
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const messages: AnthropicMessage[] = Array.isArray(body.messages) ? body.messages : [];
  const lastUserMessage: string = messages.at(-1)?.content ?? "";

  if (!apiKey) {
    const topicReply = findTopicReply(lastUserMessage);
    const reply = topicReply ?? FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    return NextResponse.json({ reply });
  }

  try {
    const reply = await callAnthropic(apiKey, messages);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Falha ao chamar a API da Anthropic", error);
    const topicReply = findTopicReply(lastUserMessage);
    const reply = topicReply ?? FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    return NextResponse.json({ reply });
  }
}
