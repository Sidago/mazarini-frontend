import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerPersonSection({ data }: Props): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(data?.personImage ?? null);

  if (!data?.personName) return <></>;

  return (
    <section className="w-full py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row bg-neutral-950 overflow-hidden">
          {/* Left — text */}
          <div className="flex-1 flex flex-col justify-center p-8 lg:p-12">
            <FadeIn direction="left">
              <p className="text-xl lg:text-2xl font-serif font-bold text-white leading-tight">
                {data.personName}
              </p>
              {data.personPosition && (
                <p className="text-sm text-primary uppercase tracking-widest mt-1 mb-6">
                  {data.personPosition}
                </p>
              )}
              {data.personQuote && (
                <p className="text-sm lg:text-base text-white/60 leading-relaxed mb-8 max-w-md">
                  {data.personQuote}
                </p>
              )}
              {data.personCtaUrl && (
                <Link
                  href={data.personCtaUrl}
                  className="inline-block self-start bg-primary px-7 py-3 text-xs font-bold uppercase tracking-widest text-neutral-900 hover:bg-amber-500 transition-colors">
                  {data.personCtaText ?? "Get in Touch"}
                </Link>
              )}
            </FadeIn>
          </div>

          {/* Right — image */}
          {imageUrl && (
            <div className="relative w-full md:w-[40%] shrink-0 h-72 md:h-auto md:min-h-[360px]">
              <Image
                src={imageUrl}
                alt={data?.personImage?.alternativeText ?? data.personName}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
