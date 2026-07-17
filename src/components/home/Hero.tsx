import { MessageCircle, ShieldCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { HeroVisual } from "@/components/home/HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,154,63,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(58,96,134,0.35),transparent_45%)]" />

      <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:py-32">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-navy-200">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
            Intermediário de Crédito registado no Banco de Portugal
          </div>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
            O crédito certo, <span className="text-gold-400">com confiança</span> e sem complicações.
          </h1>

          <p className="mt-5 max-w-lg text-balance text-lg text-navy-300">
            A C&amp;Q Finanças &amp; Soluções negoceia com várias instituições financeiras para encontrar as melhores
            condições de crédito habitação e crédito pessoal — com acompanhamento próximo do início ao fim.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/simuladores/credito-habitacao" variant="gold" size="lg">
              Simular Gratuitamente
            </Button>
            <Button href={`https://wa.me/${siteConfig.contact.whatsapp}`} external variant="whatsapp" size="lg">
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-navy-300">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <p className="text-sm">Avaliado em excelência por centenas de clientes</p>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
