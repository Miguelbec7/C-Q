"use client";

import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="bg-navy-50/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Avaliações Google"
          title="O que dizem os nossos clientes"
        />
        <div className="mt-12">
          <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
          <div className="elfsight-app-a7e2b248-8491-44d2-afcb-d1f9b829fba7" data-elfsight-app-lazy />
        </div>
      </Container>
    </section>
  );
}
