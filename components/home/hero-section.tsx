import { HeroContent } from "@/components/home/hero-content";
import { HeroImage } from "@/components/home/hero-image";
import type {
  LinkComponent,
  StrapiMedia,
  HeroFeaturedComponent,
} from "@/lib/types/strapi";

interface HeroSectionProps {
  badge: string | null;
  title: string;
  highlightText: string | null;
  subtitle: string | null;
  ctas: LinkComponent[];
  heroImage: StrapiMedia | null;
  heroFeatured: HeroFeaturedComponent | null;
}

export function HeroSection({
  badge,
  title,
  highlightText,
  subtitle,
  ctas,
  heroImage,
  heroFeatured,
}: HeroSectionProps): React.ReactElement {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row border-b border-neutral-200 dark:border-neutral-800">
      <HeroContent
        badge={badge}
        title={title}
        highlightText={highlightText}
        subtitle={subtitle}
        ctas={ctas}
      />
      <HeroImage image={heroImage} featured={heroFeatured} />
    </section>
  );
}
