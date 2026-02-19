import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import type { StrapiMedia, HeroFeaturedComponent } from "@/lib/types/strapi";

interface HeroImageProps {
  image: StrapiMedia | null;
  featured: HeroFeaturedComponent | null;
}

export function HeroImage({
  image,
  featured,
}: HeroImageProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(image);
  return (
    <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-auto relative bg-neutral-900 overflow-hidden group">
      {imageUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={image?.alternativeText ?? "Hero image"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/30" />
      {featured && (
        <FadeIn
          direction="up"
          delay={0.5}
          className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 text-white max-w-sm">
          <p className="text-sm font-bold text-primary mb-1 uppercase tracking-widest">
            Featured Project
          </p>
          {featured.projectName && (
            <h3 className="text-2xl font-bold mb-2">{featured.projectName}</h3>
          )}
          <p className="text-neutral-300 text-sm">
            {featured.location}
            {featured.location && featured.year && " \u2022 "}
            {featured.year && `Completed ${featured.year}`}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
