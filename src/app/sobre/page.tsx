import Image from "next/image";
import { ShieldCheck, Target, HeartHandshake, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre Nós",
  description:
    "Conheça a C&Q Finanças & Soluções: a nossa história, missão, valores e o nosso registo como Intermediário de Crédito no Banco de Portugal.",
  path: "/sobre",
});

const values = [
  {
    icon: ShieldCheck,
    title: "Transparência",
    description: "Explicamos cada condição e custo de forma clara, sem letras pequenas escondidas.",
  },
  {
    icon: Target,
    title: "Rigor",
    description: "Analisamos cada processo com atenção ao detalhe para encontrar a melhor solução possível.",
  },
  {
    icon: HeartHandshake,
    title: "Proximidade",
    description: "Acompanhamos o cliente como pessoa, não como número, do primeiro contacto à escritura.",
  },
  {
    icon: Users,
    title: "Independência",
    description: "Trabalhamos para o cliente, não para um banco — comparamos várias instituições parceiras.",
  },
];

const team = [
  { name: "Miguel Conceição", role: "Gerente" },
  { name: "Daniel Quinta", role: "Gerente" },
];

export default function SobrePage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Sobre Nós", href: "/sobre" }]} />

      <section className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" />
        </div>
        <Container className="relative py-16 sm:py-24">
          <h1 className="max-w-2xl text-balance text-3xl font-bold text-white sm:text-4xl">
            Ajudamos famílias e empresas a tomar as melhores decisões de crédito
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-navy-300">
            Somos a C&amp;Q Finanças &amp; Soluções, uma equipa dedicada à intermediação de crédito e
            seguros, registada no Banco de Portugal.
          </p>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-navy-950">A nossa história</h2>
            {/* TODO(cliente): substituir pela história real da empresa. */}
            <p className="mt-4 leading-relaxed text-navy-600">
              A C&amp;Q Finanças &amp; Soluções nasceu da vontade de simplificar um processo que, para
              muitas famílias e empresas, é sinónimo de stress e incerteza: encontrar o crédito certo.
            </p>
            <p className="mt-4 leading-relaxed text-navy-600">
              Ao longo do nosso percurso, ajudámos clientes a comprar a primeira casa, a transferir
              créditos para condições mais vantajosas e a organizar as suas finanças com soluções de
              crédito pessoal e seguros adequadas a cada momento de vida.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-950">A nossa missão</h2>
            <p className="mt-4 leading-relaxed text-navy-600">
              Acreditamos que todos merecem acesso a informação clara e a condições de crédito justas,
              independentemente da sua experiência financeira. A nossa missão é negociar em nome dos
              nossos clientes, com total transparência, para que tomem decisões informadas e seguras.
            </p>
            <div className="mt-6 rounded-2xl border border-gold-200 bg-gold-50 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                <ShieldCheck className="h-5 w-5 text-gold-600" />
                Registo no Banco de Portugal
              </div>
              <p className="mt-2 text-sm text-navy-600">
                A C&amp;Q Finanças &amp; Soluções é um Intermediário de Crédito registado no Banco de
                Portugal, {siteConfig.banking.bdpRegistration}, ao abrigo do Decreto-Lei n.º 81-C/2017.
              </p>
              <a
                href={siteConfig.banking.bdpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-navy-900 underline"
              >
                Consultar registo no site do Banco de Portugal
              </a>
            </div>
          </div>
        </div>
      </Container>

      <section className="bg-navy-50/60 py-16 sm:py-20">
        <Container>
          <h2 className="text-center text-2xl font-bold text-navy-950">Os nossos valores</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-2xl border border-navy-100 bg-white p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-navy-950">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-navy-950">A nossa equipa</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-navy-500">
          Profissionais dedicados a encontrar a melhor solução de crédito para si.
        </p>
        <div className="mx-auto mt-10 max-w-md">
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/equipa-cq.jpg"
              alt="Miguel Conceição e Daniel Quinta, gerentes da C&Q Finanças & Soluções"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 flex justify-between gap-4 text-center">
            {team.map((member) => (
              <div key={member.name} className="flex-1">
                <p className="font-semibold text-navy-950">{member.name}</p>
                <p className="text-sm text-navy-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <section className="bg-navy-950 py-16 text-center sm:py-20">
        <Container>
          <h2 className="text-balance text-2xl font-bold text-white sm:text-3xl">
            O nosso compromisso consigo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-navy-300">
            Comprometemo-nos a defender sempre o seu interesse, com transparência total sobre custos,
            condições e prazos — do primeiro contacto à assinatura final.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contactos" variant="gold" size="lg">
              Fale com a nossa equipa
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
