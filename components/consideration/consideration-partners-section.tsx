import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ConsiderationPage } from "@/lib/types/strapi";

interface Props {
  data: ConsiderationPage | null;
}

export function ConsiderationPartnersSection({
  data,
}: Props): React.ReactElement {
  const title = data?.partnersTitle ?? null;
  const subtitle = data?.partnersSubtitle ?? null;
  const partners = data?.partners ?? [];

  if (!title && partners.length === 0) {
    return <></>;
  }

  return (
    <section className="bg-neutral-950 text-white py-20 lg:py-28">
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

        {partners.length > 0 && (
          <FadeIn direction="up" delay={0.15} duration={0.7}>
            <div className="mt-14 lg:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-14 items-center">
              {partners.map((partner) => {
                const url = getStrapiMediaUrl(partner.logo ?? null);
                return (
                  <div
                    key={partner.id}
                    className="flex items-center justify-center py-4 opacity-60 hover:opacity-100 transition-opacity">
                    {url ? (
                      <Image
                        src={url}
                        alt={partner.logo?.alternativeText ?? partner.name}
                        width={partner.logo?.width ?? 160}
                        height={partner.logo?.height ?? 88}
                        className="max-h-16 w-auto object-contain grayscale"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-white/50">
                        {partner.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
