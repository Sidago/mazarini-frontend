import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { StrapiBlocks } from "@/components/ui/strapi-blocks";

interface Props {
  detail_discriptions: unknown;
}

export function ProjectOverviewSection({
  detail_discriptions,
}: Props): React.ReactElement | null {
  if (!detail_discriptions) return null;
  return (
    <section className="relative py-20 md:py-32 bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <h2 className="text-3xl md:text-5xl font-black font-serif text-neutral-900 dark:text-white mb-8 leading-tight">
            Overview
          </h2>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <StrapiBlocks content={detail_discriptions} />
        </FadeIn>
      </div>
    </section>
  );
}
