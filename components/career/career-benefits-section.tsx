import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceAccordion } from "@/components/services/service-accordion";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerBenefitsSection({ data }: Props): React.ReactElement {
  const items = data?.benefitItems ?? [];
  const imageUrl = getStrapiMediaUrl(data?.benefitsImage ?? null);

  if (!data?.benefitsTitle && items.length === 0) return <></>;

  return (
    <section className="py-20 md:py-32 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — image */}
          {imageUrl && (
            <FadeIn direction="left">
              <div className="relative w-full lg:w-[420px] shrink-0 aspect-4/5 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={data?.benefitsImage?.alternativeText ?? "Benefits"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            </FadeIn>
          )}

          {/* Right — content */}
          <div className="flex-1 flex flex-col justify-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                {data?.benefitsTitle ?? "Competitive Benefits"}
              </h2>
            </FadeIn>

            {data?.benefitsText && (
              <FadeIn direction="right" delay={0.1}>
                <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-lg">
                  {data.benefitsText}
                </p>
              </FadeIn>
            )}

            {items.length > 0 && (
              <FadeIn direction="right" delay={0.2}>
                <ServiceAccordion items={items} />
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
