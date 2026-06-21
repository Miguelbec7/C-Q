import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export function Partners() {
  const track = [...siteConfig.partners, ...siteConfig.partners];

  return (
    <section className="border-y border-navy-100 bg-navy-50/40 py-12">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-navy-400">
          Instituições financeiras parceiras
        </p>
      </Container>
      <div className="group mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {track.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex w-44 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-navy-100 bg-white p-3"
              title={partner.name}
            >
              {"logo" in partner && partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="flex h-12 items-center text-center text-sm font-semibold text-navy-400">
                  {partner.name}
                </span>
              )}
              <span className="text-center text-[11px] leading-tight text-navy-400">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
