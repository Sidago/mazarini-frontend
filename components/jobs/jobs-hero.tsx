import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { JobsPage } from "@/lib/types/strapi";

interface JobsHeroProps {
  data: JobsPage | null;
}

export function JobsHero({ data }: JobsHeroProps): React.ReactElement {
  const heroTitle = data?.heroTitle ?? "Mazarini";
  const heroSubtitle = data?.heroSubtitle ?? "BUILT FOR TEAM MEMBERS";
  const imageUrl = getStrapiMediaUrl(data?.heroImage ?? null);

  return (
    <section className="relative w-full h-64 lg:h-90 overflow-hidden bg-neutral-900">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={data?.heroImage?.alternativeText ?? heroTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
          {heroTitle}
        </h1>
        {heroSubtitle && (
          <p className="mt-4 text-sm md:text-base font-bold uppercase tracking-[0.25em] text-white/80">
            {heroSubtitle}
          </p>
        )}
      </div>
    </section>
  );
}
