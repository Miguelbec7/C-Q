import { Hero } from "@/components/home/Hero";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Partners } from "@/components/home/Partners";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqHome } from "@/components/home/FaqHome";
import { ContactSection } from "@/components/home/ContactSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Intermediário de Crédito em Elvas e no Alentejo",
  description:
    "Intermediário de crédito registado no Banco de Portugal, em Elvas, a atuar em todo o Alentejo. Negoceiamos com várias instituições financeiras as melhores condições de crédito habitação e crédito pessoal. Simulação gratuita.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <ServicesShowcase />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Partners />
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <FaqHome />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
