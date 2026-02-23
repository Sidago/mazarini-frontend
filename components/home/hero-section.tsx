import { HeroContent } from "@/components/home/hero-content";
import { HeroVideo } from "@/components/home/hero-video";
import type { LinkComponent, StrapiMedia } from "@/lib/types/strapi";

interface HeroSectionProps {
  title: string;
  highlightText: string | null;
  ctas: LinkComponent[];
  heroImage: StrapiMedia | null;
  heroVideo: StrapiMedia | null;
}

export function HeroSection({
  title,
  highlightText,
  ctas,
  heroImage,
  heroVideo,
}: HeroSectionProps): React.ReactElement {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video / Image background */}
      <HeroVideo video={heroVideo} fallbackImage={heroImage} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content overlay */}
      <HeroContent title={title} highlightText={highlightText} ctas={ctas} />
    </section>
  );
}
