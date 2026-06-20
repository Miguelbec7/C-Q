import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export function Partners() {
  return (
    <section className="border-y border-navy-100 bg-navy-50/40 py-12">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-navy-400">
          Instituições financeiras parceiras
        </p>
        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {siteConfig.partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-16 items-center justify-center rounded-xl border border-navy-100 bg-white text-sm font-semibold text-navy-400"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
