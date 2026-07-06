"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  useEffect(() => {
    if (document.querySelector('script[src*="elfsightcdn.com"]')) return;
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <section className="bg-navy-50/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Avaliações Google"
          title="O que dizem os nossos clientes"
        />
        <div className="mt-12">
          <div className="elfsight-app-a7e2b248-8491-44d2-afcb-d1f9b829fba7" />
        </div>
      </Container>
    </section>
  );
}
