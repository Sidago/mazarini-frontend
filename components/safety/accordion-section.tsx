import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceAccordion } from "@/components/services/service-accordion";
import type { AccordionItem, StrapiMedia } from "@/lib/types/strapi";

interface AccordionSectionProps {
  title: string;
  details: string | null;
  image: StrapiMedia | null;
  items: AccordionItem[];
}

export function AccordionSection({
  title,
  details,
  image,
  items,
}: AccordionSectionProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(image);

  return (
    <section className="py-20 md:py-32 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — image */}
          <FadeIn direction="left">
            <div className="relative w-80 lg:w-96 shrink-0 aspect-4/5 overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={image?.alternativeText ?? title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 320px, 384px"
                />
              )}
            </div>
          </FadeIn>

          {/* Right — content */}
          <div className="w-full lg:w-[550px] shrink-0 flex flex-col justify-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 whitespace-pre-line">
                {title}
              </h2>
            </FadeIn>

            {details && (
              <FadeIn direction="right" delay={0.1}>
                <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-lg whitespace-pre-line">
                  {details}
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
