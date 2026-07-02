import type { LucideIcon } from "lucide-react";
import {
  Home,
  ArrowLeftRight,
  Building2,
  Wallet,
  Layers,
} from "lucide-react";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceContent {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  summary: string;
  metaDescription: string;
  heroImage: string;
  intro: string[];
  benefits: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faqs: ServiceFaq[];
}

export const services: ServiceContent[] = [
  {
    slug: "credito-habitacao",
    icon: Home,
    title: "Crédito Habitação",
    shortTitle: "Habitação",
    summary:
      "Encontramos as melhores condições do mercado para comprar a sua casa, com acompanhamento completo do início ao fim.",
    metaDescription:
      "Simule o seu crédito habitação com a C&Q Finanças. Comparamos as melhores propostas do mercado e acompanhamos todo o processo, sem custos para si.",
    heroImage: "/images/services/credito-habitacao.jpg",
    intro: [
      "Comprar casa é uma das decisões financeiras mais importantes da sua vida — e escolher o crédito habitação certo pode significar a diferença entre poupar ou pagar milhares de euros a mais em juros.",
      "Como intermediários de crédito registados no Banco de Portugal, a C&Q Finanças analisa o seu perfil e negocia com múltiplas instituições financeiras para encontrar a proposta mais vantajosa para si — taxa fixa, variável ou mista, consoante o que melhor se adequa ao seu objetivo.",
    ],
    benefits: [
      { title: "Comparação imparcial", description: "Analisamos propostas de várias instituições financeiras parceiras, sem estar limitados a um único banco." },
      { title: "Sem custos para o cliente", description: "O nosso serviço de intermediação não tem qualquer custo direto para quem procura crédito." },
      { title: "Acompanhamento completo", description: "Da simulação à escritura, tratamos da documentação e acompanhamos cada etapa do processo." },
      { title: "Melhores condições negociadas", description: "A nossa relação com as instituições permite negociar spread, comissões e seguros associados." },
    ],
    process: [
      { title: "Simulação gratuita", description: "Preenche o formulário ou simulador online e recebe uma primeira estimativa em minutos." },
      { title: "Análise personalizada", description: "Um especialista C&Q analisa o seu perfil financeiro e o imóvel pretendido." },
      { title: "Comparação de propostas", description: "Apresentamos as melhores propostas de crédito disponíveis no mercado para o seu caso." },
      { title: "Acompanhamento até à escritura", description: "Tratamos da documentação e acompanhamos todo o processo até à assinatura final." },
    ],
    faqs: [
      { question: "Quanto custa o serviço da C&Q Finanças?", answer: "O nosso serviço de intermediação de crédito não tem qualquer custo para o cliente na maioria das soluções de crédito habitação — somos remunerados pelas instituições financeiras parceiras." },
      { question: "Quanto tempo demora o processo de aprovação?", answer: "Em média, entre 2 a 6 semanas, dependendo da complexidade do processo, da documentação disponível e da instituição financeira escolhida." },
      { question: "Posso simular sem compromisso?", answer: "Sim. A simulação é totalmente gratuita e sem qualquer compromisso de contratação." },
      { question: "Que documentos preciso para começar?", answer: "Tipicamente: documento de identificação, NIF, últimos recibos de vencimento, última declaração de IRS e Mapa de Responsabilidades de Crédito do Banco de Portugal. A nossa equipa indica a lista completa e ajuda a reunir tudo." },
    ],
  },
  {
    slug: "transferencia-de-credito",
    icon: ArrowLeftRight,
    title: "Transferência de Crédito",
    shortTitle: "Transferência",
    summary:
      "Tem um crédito habitação ativo? Avaliamos se vale a pena transferi-lo para condições mais vantajosas.",
    metaDescription:
      "Descubra quanto pode poupar transferindo o seu crédito habitação. Simulação gratuita com a C&Q Finanças, intermediários de crédito registados no Banco de Portugal.",
    heroImage: "/images/services/transferencia-credito.jpg",
    intro: [
      "Se contratou o seu crédito habitação há alguns anos, é muito provável que existam hoje condições mais vantajosas no mercado — spreads mais baixos, melhores seguros associados ou um regime de taxa mais adequado ao seu momento de vida.",
      "A transferência de crédito permite mudar o seu empréstimo para outra instituição financeira, mantendo o capital em dívida, mas com condições renegociadas. A C&Q Finanças analisa o seu contrato atual e calcula, de forma transparente, quanto poderia poupar.",
    ],
    benefits: [
      { title: "Poupança mensal e total", description: "Calculamos o impacto real na sua prestação mensal e no total de juros pagos até final do contrato." },
      { title: "Sem surpresas", description: "Apresentamos todos os custos associados à transferência antes de avançar com qualquer decisão." },
      { title: "Negociação ativa", description: "Usamos a nossa rede de parceiros para conseguir as melhores condições possíveis para o seu novo crédito." },
      { title: "Processo simplificado", description: "Tratamos de praticamente todo o processo burocrático junto das instituições envolvidas." },
    ],
    process: [
      { title: "Envio do contrato atual", description: "Partilha-nos as condições do seu crédito em vigor (capital, taxa, prazo)." },
      { title: "Simulação comparativa", description: "Calculamos o impacto de uma eventual transferência na sua prestação e nos juros totais." },
      { title: "Proposta de novas condições", description: "Negociamos com instituições parceiras as melhores condições para o seu perfil." },
      { title: "Formalização da transferência", description: "Acompanhamos todo o processo legal e burocrático até à conclusão." },
    ],
    faqs: [
      { question: "A transferência de crédito compensa sempre?", answer: "Não necessariamente. Depende do capital em dívida, prazo remanescente, taxa atual e custos de transferência. Por isso fazemos sempre uma simulação detalhada antes de avançar." },
      { question: "Quais os custos de uma transferência de crédito?", answer: "Podem existir comissões de transferência, despesas de registo e, em alguns casos, imposto de selo sobre o novo crédito. Apresentamos sempre o cálculo completo antes de qualquer decisão." },
      { question: "Posso transferir o crédito para qualquer banco?", answer: "Pode transferir para qualquer instituição que aceite o seu perfil de risco. A C&Q ajuda a identificar as opções mais vantajosas entre os parceiros disponíveis." },
    ],
  },
  {
    slug: "credito-construcao",
    icon: Building2,
    title: "Crédito Construção",
    shortTitle: "Construção",
    summary:
      "Vai construir ou remodelar a sua casa? Ajudamos a financiar o projeto com libertações de capital adaptadas à obra.",
    metaDescription:
      "Crédito construção com acompanhamento especializado. A C&Q Finanças ajuda a financiar a construção ou remodelação da sua casa com as melhores condições.",
    heroImage: "/images/services/credito-construcao.jpg",
    intro: [
      "O crédito construção tem características próprias: o capital não é entregue de uma só vez, mas libertado em fases, à medida que a obra avança e é fiscalizada pela instituição financeira.",
      "A C&Q Finanças acompanha promotores e particulares na estruturação deste tipo de financiamento, desde a aquisição do terreno até à conclusão da obra, garantindo que o plano de libertações de capital se ajusta ao cronograma da construção.",
    ],
    benefits: [
      { title: "Plano de libertações ajustado", description: "Estruturamos o calendário de libertações de capital de acordo com as fases reais da obra." },
      { title: "Apoio a particulares e promotores", description: "Trabalhamos tanto com quem constrói a sua própria casa como com pequenos promotores imobiliários." },
      { title: "Gestão da documentação técnica", description: "Ajudamos a reunir orçamentos, memórias descritivas e demais documentos exigidos pela banca." },
      { title: "Transição facilitada para crédito habitação", description: "No final da obra, apoiamos a passagem para o regime definitivo de crédito habitação." },
    ],
    process: [
      { title: "Análise do projeto", description: "Avaliamos o terreno, o orçamento de construção e o perfil financeiro do cliente." },
      { title: "Estruturação do financiamento", description: "Definimos o montante, o plano de libertações e as condições com a instituição financeira." },
      { title: "Acompanhamento da obra", description: "Apoiamos a gestão das libertações de capital ao longo das fases de construção." },
      { title: "Conclusão e transição", description: "No fim da obra, ajudamos na transição para as condições finais do crédito." },
    ],
    faqs: [
      { question: "O crédito construção financia também o terreno?", answer: "Em muitos casos sim, total ou parcialmente, dependendo da instituição financeira e do perfil do cliente." },
      { question: "Como funcionam as libertações de capital?", answer: "O capital é entregue em fases, normalmente após visitas de fiscalização que confirmam o avanço da obra face ao cronograma aprovado." },
      { question: "Posso converter o crédito construção em crédito habitação normal?", answer: "Sim, é o procedimento habitual após a conclusão da obra e emissão da licença de utilização." },
    ],
  },
  {
    slug: "credito-pessoal",
    icon: Wallet,
    title: "Crédito Pessoal",
    shortTitle: "Pessoal",
    summary:
      "Soluções de financiamento rápido para projetos pessoais, com resposta ágil e condições transparentes.",
    metaDescription:
      "Crédito pessoal com simulação gratuita e resposta rápida. A C&Q Finanças encontra a melhor solução de financiamento para o seu projeto pessoal.",
    heroImage: "/images/services/credito-pessoal.jpg",
    intro: [
      "Seja para um projeto pessoal, uma viagem, equipamento, saúde ou qualquer outra necessidade, o crédito pessoal é uma solução de financiamento flexível e com processos de aprovação mais rápidos do que o crédito habitação.",
      "A C&Q Finanças compara as condições disponíveis no mercado para lhe apresentar a solução com a taxa anual efetiva global (TAEG) mais vantajosa para o seu perfil.",
    ],
    benefits: [
      { title: "Resposta rápida", description: "Processos de decisão normalmente mais ágeis do que no crédito habitação." },
      { title: "Sem necessidade de garantia hipotecária", description: "Solução pensada para necessidades pontuais, sem exigir uma garantia real." },
      { title: "Comparação de TAEG", description: "Apresentamos sempre a Taxa Anual Efetiva Global para uma comparação justa entre propostas." },
      { title: "Flexibilidade de montantes e prazos", description: "Adaptamos a proposta ao valor necessário e à capacidade de pagamento do cliente." },
    ],
    process: [
      { title: "Pedido de simulação", description: "Indica o montante pretendido e a finalidade do crédito." },
      { title: "Análise de perfil", description: "Avaliamos rendimento, encargos atuais e histórico de crédito." },
      { title: "Apresentação de propostas", description: "Selecionamos as melhores condições disponíveis entre os parceiros financeiros." },
      { title: "Formalização", description: "Acompanhamos a assinatura do contrato e a disponibilização do montante." },
    ],
    faqs: [
      { question: "Qual o montante máximo de um crédito pessoal?", answer: "Varia por instituição e perfil do cliente, mas tipicamente situa-se entre alguns milhares de euros e os 75 000€." },
      { question: "Posso ter um crédito pessoal com crédito habitação em curso?", answer: "Sim, desde que a taxa de esforço global se mantenha dentro dos limites aceites pelas instituições financeiras." },
    ],
  },
  {
    slug: "credito-consolidado",
    icon: Layers,
    title: "Crédito Consolidado",
    shortTitle: "Consolidado",
    summary:
      "Reúna vários créditos numa só prestação mensal, mais baixa e mais fácil de gerir.",
    metaDescription:
      "Consolide os seus créditos numa única prestação mais baixa. A C&Q Finanças simula gratuitamente a sua poupança com o crédito consolidado.",
    heroImage: "/images/services/credito-consolidado.jpg",
    intro: [
      "Se tem vários créditos em simultâneo — pessoal, automóvel, cartões de crédito — é frequente que a soma das prestações represente um peso elevado no orçamento familiar.",
      "O crédito consolidado junta todas essas responsabilidades num único empréstimo, normalmente com um prazo mais alargado e uma prestação mensal mais baixa, simplificando a gestão financeira do agregado.",
    ],
    benefits: [
      { title: "Uma única prestação", description: "Substitua várias prestações dispersas por um único pagamento mensal." },
      { title: "Redução do encargo mensal", description: "Em muitos casos é possível reduzir significativamente a prestação total mensal." },
      { title: "Simplificação financeira", description: "Mais facilidade em planear o orçamento familiar com um único crédito a gerir." },
      { title: "Análise isenta da taxa de esforço", description: "Avaliamos o impacto real na sua taxa de esforço antes de avançar." },
    ],
    process: [
      { title: "Levantamento dos créditos atuais", description: "Reunimos a informação de todos os créditos e responsabilidades a consolidar." },
      { title: "Simulação de consolidação", description: "Calculamos o valor da nova prestação única e a poupança mensal estimada." },
      { title: "Proposta de consolidação", description: "Apresentamos a instituição e condições mais vantajosas para o seu caso." },
      { title: "Liquidação e formalização", description: "Tratamos da liquidação dos créditos antigos e formalização do novo contrato." },
    ],
    faqs: [
      { question: "O crédito consolidado aumenta o custo total do crédito?", answer: "Pode aumentar o total de juros pagos devido ao alargamento do prazo, mas reduz significativamente o encargo mensal. Apresentamos sempre ambos os cenários para uma decisão informada." },
      { question: "Posso consolidar crédito habitação com crédito pessoal?", answer: "Em alguns casos sim, dependendo das garantias associadas. A nossa equipa analisa a melhor estrutura para o seu caso." },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
