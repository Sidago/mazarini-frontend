import type { PreconstructionPage } from "@/lib/types/strapi";
import { AccordionSection } from "@/components/safety/accordion-section";
import { PreconstructionHeroSection } from "./preconstruction-hero-section";
import { PreconstructionJourneySection } from "./preconstruction-journey-section";

interface Props {
  data: PreconstructionPage | null;
}

export function PreconstructionSections({ data }: Props): React.ReactElement {
  return (
    <main>
      <PreconstructionHeroSection data={data} />
      <AccordionSection
        title={data?.accordionTitle ?? ""}
        details={data?.accordionDetails ?? null}
        image={data?.accordionImage ?? null}
        items={data?.accordionItems ?? []}
      />
      <PreconstructionJourneySection data={data} />
    </main>
  );
}
