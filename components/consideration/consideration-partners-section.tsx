import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ConsiderationPage } from "@/lib/types/strapi";

interface Props {
  data: ConsiderationPage | null;
}

// One half of the marquee track has to be wider than the viewport or the loop
// shows a gap, so short lists get repeated before the seamless duplication.
const MIN_LOGOS_PER_HALF = 8;

export function ConsiderationPartnersSection({
  data,
}: Props): React.ReactElement {
  const title = data?.partnersTitle ?? null;
  const subtitle = data?.partnersSubtitle ?? null;
  const partners = data?.partner ?? [];

  if (!title && partners.length === 0) {
    return <></>;
  }

  const repeats =
    partners.length > 0
      ? Math.max(1, Math.ceil(MIN_LOGOS_PER_HALF / partners.length))
      : 0;
  // Duplicated once more on top of that to create the seamless -50% loop
  const track = Array.from({ length: repeats * 2 }, () => partners).flat();

  return (
    <section className="bg-neutral-950 text-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <FadeIn direction="up" duration={0.7}>
          <div className="max-w-3xl mx-auto text-center">
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight whitespace-pre-line">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-6 text-base lg:text-lg leading-relaxed text-white/70 whitespace-pre-line">
                {subtitle}
              </p>
            )}
          </div>
        </FadeIn>
      </div>

      {partners.length > 0 && (
        <FadeIn direction="up" delay={0.15} duration={0.7}>
          <div className="relative group mt-14 lg:mt-20">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
              {track.map((partner, i) => {
                const url = getStrapiMediaUrl(partner.image ?? null);
                return (
                  <div
                    key={`${partner.id}-${i}`}
                    className="relative shrink-0 mx-8 md:mx-12 w-35 md:w-45 h-20 md:h-25 opacity-60 hover:opacity-100 transition-opacity">
                    {url ? (
                      <Image
                        src={url}
                        alt={partner.image?.alternativeText ?? partner.name}
                        fill
                        className="object-contain grayscale transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 768px) 140px, 180px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-sm font-semibold text-white/50">
                          {partner.name}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}
    </section>
  );
}
