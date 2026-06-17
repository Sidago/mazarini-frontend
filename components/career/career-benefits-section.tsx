import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceAccordion } from "@/components/services/service-accordion";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

// Split the title around the highlight text to wrap it in a styled span
function renderTitle(text: string, highlight: string | null): React.ReactNode {
  if (!highlight) return text;
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) return text;
  const before = text.slice(0, index);
  const match = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);
  return (
    <>
      {before}
      <span className="text-primary">{match}</span>
      {after}
    </>
  );
}

export function CareerBenefitsSection({ data }: Props): React.ReactElement {
  const items = data?.benefitItems ?? [];
  const imageUrl = getStrapiMediaUrl(data?.benefitsImage ?? null);

  if (!data?.benefitsTitle && items.length === 0) return <></>;

  return (
    <section className="py-20 md:py-32 bg-black overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top — centered title */}
        <FadeIn>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-neutral-500 leading-tight text-center mb-16 lg:mb-24 whitespace-pre-line">
            {renderTitle(
              data?.benefitsTitle ?? "Competitive Benefits,\nA Culture of Care",
              data?.benefitsHighlight ?? null,
            )}
          </h2>
        </FadeIn>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
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
            {data?.benefitsText && (
              <FadeIn direction="right">
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white leading-snug mb-10">
                  {data.benefitsText}
                </h3>
              </FadeIn>
            )}

            {items.length > 0 && (
              <FadeIn direction="right" delay={0.1}>
                <ServiceAccordion items={items} />
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
