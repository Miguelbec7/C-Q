import { getAllPosts } from "@/lib/blog";
import { services } from "@/lib/data/services";
import { simulators } from "@/lib/data/simuladores";

/**
 * Base de conhecimento do chatbot — gerada a partir do blog, dos serviços e
 * dos simuladores já existentes no site, para injetar como contexto no
 * system prompt do modelo (em vez de manter um resumo duplicado e
 * desatualizado à parte).
 */
export function buildChatKnowledgeBase(): string {
  const blogSection = getAllPosts()
    .map(
      (post) =>
        `### Artigo do blog: ${post.title} (/blog/${post.slug})\n${post.content.trim()}`
    )
    .join("\n\n");

  const servicesSection = services
    .map((service) => {
      const faqs = service.faqs
        .map((faq) => `P: ${faq.question}\nR: ${faq.answer}`)
        .join("\n");
      return `### Serviço: ${service.title} (/servicos/${service.slug})\n${service.summary}\n${faqs}`;
    })
    .join("\n\n");

  const simulatorsSection = simulators
    .map((sim) => {
      const faqs = (sim.faqs ?? [])
        .map((faq) => `P: ${faq.question}\nR: ${faq.answer}`)
        .join("\n");
      return `### Simulador: ${sim.title} (/simuladores/${sim.slug})\n${sim.description}\n${faqs}`;
    })
    .join("\n\n");

  return [
    "# Artigos do blog",
    blogSection,
    "# Serviços",
    servicesSection,
    "# Simuladores",
    simulatorsSection,
  ].join("\n\n");
}
