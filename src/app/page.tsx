import { Hero } from "@/components/home/Hero";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Partners } from "@/components/home/Partners";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqHome } from "@/components/home/FaqHome";
import { ContactSection } from "@/components/home/ContactSection";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Intermediário de Crédito Habitação e Crédito Pessoal",
  description:
    "A C&Q Finanças negoceia com várias instituições financeiras para encontrar as melhores condições de crédito habitação e crédito pessoal. Simulação gratuita.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesShowcase />
      <HowItWorks />
      <WhyChooseUs />
      <Partners />
      <Testimonials />
      <FaqHome />
      <ContactSection />
      <FinalCta />
    </>
  );
}
