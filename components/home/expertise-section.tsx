import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ExpertiseCard } from "@/components/home/expertise-card";
import { FadeIn } from "@/components/ui/fade-in";
import { ScaleReveal, ParallaxSection } from "@/components/ui/scroll-animations";
import type { Expertise } from "@/lib/types/strapi";

interface ExpertiseSectionProps {
  heading: string | null;
  subheading: string | null;
  expertises: Expertise[];
}

export function ExpertiseSection({
  heading,
  subheading,
  expertises,
}: ExpertiseSectionProps): React.ReactElement {
  return (
    <section
      id="expertise"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark max-w-[1600px] mx-auto"
    >
      <ParallaxSection offset={20}>
        <FadeIn>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-8">
            <div>
              {heading && (
                <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white max-w-2xl">
                  {subheading}
                </p>
              )}
            </div>
            <Link
              href="#"
              className="hidden md:inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              View All Services{" "}
              <Icon name="arrow_forward" className="ml-1 text-lg" />
            </Link>
          </div>
        </FadeIn>
      </ParallaxSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertises.map((item, index) => (
          <ScaleReveal key={item.id} delay={index * 0.15}>
            <ExpertiseCard expertise={item} />
          </ScaleReveal>
        ))}
      </div>
      <div className="mt-8 text-center md:hidden">
        <Link
          href="#"
          className="inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
        >
          View All Services{" "}
          <Icon name="arrow_forward" className="ml-1 text-lg" />
        </Link>
      </div>
    </section>
  );
}
