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
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-0 mx-auto w-fit">
          {/* Left — image */}
          <FadeIn direction="left">
            <div className="relative w-full lg:w-100 shrink-0 max-h-140 aspect-3/5 overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={image?.alternativeText ?? title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              )}
            </div>
          </FadeIn>

          {/* Right — content */}
          <div className="flex-1 lg:pl-16 pt-10 lg:pt-0 flex flex-col justify-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                {title}
              </h2>
            </FadeIn>

            {details && (
              <FadeIn direction="right" delay={0.1}>
                <p className="text-lg text-neutral-400 leading-relaxed mb-10">
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
