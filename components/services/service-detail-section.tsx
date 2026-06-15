import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceAccordion } from "@/components/services/service-accordion";
import type { Service } from "@/lib/types/strapi";

interface ServiceDetailSectionProps {
  service: Service;
}

export function ServiceDetailSection({
  service,
}: ServiceDetailSectionProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(service.image ?? null);

  return (
    <section className="py-20 md:py-32 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-0">
          {/* Left — image */}
          <FadeIn direction="left">
            <div className="relative w-full lg:w-[400px] shrink-0 aspect-3/5 overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={service.image?.alternativeText ?? service.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1200px) 100vw, 480px"
                />
              )}
            </div>
          </FadeIn>

          {/* Right — content */}
          <div className="flex-1 lg:pl-16 pt-10 lg:pt-0 flex flex-col justify-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-1">
                {service.title}
              </h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <p className="text-lg text-neutral-400 leading-relaxed mb-5">
                {service.discriptions}
              </p>
            </FadeIn>

            {/* Accordion detail items */}
            {Array.isArray(service.accordion_items) &&
              service.accordion_items.length > 0 && (
                <FadeIn direction="right" delay={0.2}>
                  <ServiceAccordion items={service.accordion_items} />
                </FadeIn>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
