import type { ConstructionPage } from "@/lib/types/strapi";
import { AccordionSection } from "@/components/safety/accordion-section";
import { NumbersMarquee } from "@/components/about/numbers-marquee";
import { FadeIn } from "@/components/ui/fade-in";
import { ConstructionHeroSection } from "./construction-hero-section";
import { ConstructionExperienceSection } from "./construction-experience-section";
import { ConstructionQuotesSection } from "./construction-quotes-section";
import { ConstructionSustainabilitySection } from "./construction-sustainability-section";
import { ConstructionInnovationSection } from "./construction-innovation-section";
import { ConstructionJourneySection } from "./construction-journey-section";

interface Props {
  data: ConstructionPage | null;
}

function ConstructionColumnsSection({ data }: Props): React.ReactElement {
  const columns = data?.textColumns ?? [];

  if (columns.length === 0) {
    return <></>;
  }

  return (
    <section className="bg-white text-black py-20 lg:py-32">
      <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {columns.map((column, index) => (
          <FadeIn key={column.id} direction="up" delay={index * 0.1}>
            <h3 className="text-xl lg:text-2xl font-serif font-bold leading-tight mb-4">
              {column.title}
            </h3>
            {column.text && (
              <p className="text-base font-serif leading-relaxed text-neutral-600 whitespace-pre-line">
                {column.text}
              </p>
            )}
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function ConstructionSections({ data }: Props): React.ReactElement {
  return (
    <main>
      <ConstructionHeroSection data={data} />
      <ConstructionExperienceSection data={data} />
      <ConstructionQuotesSection data={data} />
      <AccordionSection
        title={data?.accordionTitle ?? ""}
        details={data?.accordionDetails ?? null}
        image={data?.accordionImage ?? null}
        items={data?.accordionItems ?? []}
      />
      <NumbersMarquee
        title={data?.statsTitle ?? "Safety by the Numbers"}
        stats={data?.stats ?? []}
      />
      <ConstructionColumnsSection data={data} />
      <ConstructionSustainabilitySection data={data} />
      <ConstructionInnovationSection data={data} />
      <ConstructionJourneySection data={data} />
    </main>
  );
}
