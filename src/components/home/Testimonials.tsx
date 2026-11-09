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
    <section className="relative overflow-hidden bg-navy-50/60 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(200,154,63,0.10),transparent_40%)]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Avaliações Google"
          title="O que dizem os nossos clientes"
        />
        <div className="mt-12 rounded-3xl border border-navy-100 bg-white p-2 shadow-premium-sm sm:p-6">
          <div className="elfsight-app-a7e2b248-8491-44d2-afcb-d1f9b829fba7" />
        </div>
      </Container>
    </section>
  );
}
