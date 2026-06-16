import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerFeaturesSection({ data }: Props): React.ReactElement {
  const items = data?.featureItems ?? [];

  if (items.length === 0) return <></>;

  return (
    <section className="w-full py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {data?.featuresTitle && (
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-neutral-900 mb-16 text-center">
            {data.featuresTitle}
          </h2>
        )}

        <div className="flex flex-col gap-20 lg:gap-28">
          {items.map((item, index) => {
            const imageUrl = getStrapiMediaUrl(item.image ?? null);
            const reverse = index % 2 === 1;
            return (
              <div
                key={item.id}
                className={`flex flex-col gap-8 lg:gap-16 items-center ${
                  reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}>
                {imageUrl && (
                  <FadeIn
                    direction={reverse ? "right" : "left"}
                    className="w-full lg:w-1/2">
                    <div className="relative w-full aspect-4/3 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.image?.alternativeText ?? item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </FadeIn>
                )}

                <FadeIn
                  direction={reverse ? "left" : "right"}
                  className="w-full lg:w-1/2">
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-neutral-900 leading-tight mb-4">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-base lg:text-lg text-neutral-500 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
