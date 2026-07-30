import type { ConsiderationPage } from "@/lib/types/strapi";
import { ConsiderationHeroSection } from "./consideration-hero-section";
import { ConsiderationAdvisorSection } from "./consideration-advisor-section";
import { ConsiderationPartnersSection } from "./consideration-partners-section";
import { ConsiderationQuizSection } from "./consideration-quiz-section";
import { ConsiderationJourneySection } from "./consideration-journey-section";

interface Props {
  data: ConsiderationPage | null;
}

export function ConsiderationSections({ data }: Props): React.ReactElement {
  return (
    <main>
      <ConsiderationHeroSection data={data} />
      <ConsiderationAdvisorSection data={data} />
      <ConsiderationPartnersSection data={data} />
      <ConsiderationQuizSection data={data} />
      <ConsiderationJourneySection data={data} />
    </main>
  );
}
