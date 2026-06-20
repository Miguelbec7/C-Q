import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,154,63,0.18),transparent_55%)]" />
      <Container className="relative py-16 text-center sm:py-20">
        <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
          Pronto para encontrar o crédito certo para si?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-navy-300">
          Simulação gratuita e sem compromisso. Em poucos minutos, sabe se pode poupar.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/simuladores" variant="gold" size="lg">
            Simular Gratuitamente
          </Button>
          <Button href={`https://wa.me/${siteConfig.contact.whatsapp}`} external variant="whatsapp" size="lg">
            <MessageCircle className="h-5 w-5" />
            Falar no WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
