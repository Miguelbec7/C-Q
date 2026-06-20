import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import testimonials from "../../../data/testimonials.json";

export function Testimonials() {
  return (
    <section className="bg-navy-50/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Testemunhos"
          title="O que dizem os nossos clientes"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col rounded-2xl bg-white p-6 shadow-premium-sm">
              <Quote className="h-6 w-6 text-gold-400" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-600">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-navy-950">{testimonial.name}</p>
                  <p className="text-xs text-navy-400">{testimonial.context}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
