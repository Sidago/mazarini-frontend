import type { CareerPage, Job } from "@/lib/types/strapi";
import { CareerHeroSection } from "./career-hero-section";
import { CareerMissionSection } from "./career-mission-section";
import { CareerStatsSection } from "./career-stats-section";
import { CareerQuotesSection } from "./career-quotes-section";
import { CareerJobsSection } from "./career-jobs-section";
import { CareerPeopleSection } from "./career-people-section";
import { CareerBenefitsSection } from "./career-benefits-section";
import { CareerCultureSection } from "./career-culture-section";
import { CareerFeaturesSection } from "./career-features-section";
import { CareerBelongSection } from "./career-belong-section";
import { CareerPersonSection } from "./career-person-section";
import { CareerResourcesSection } from "./career-resources-section";

interface Props {
  data: CareerPage | null;
  jobs: Job[];
}

export function CareerSections({ data, jobs }: Props): React.ReactElement {
  return (
    <main>
      <CareerHeroSection data={data} />
      <CareerMissionSection data={data} />
      <CareerStatsSection data={data} />
      <CareerQuotesSection data={data} />
      <CareerJobsSection data={data} jobs={jobs} />
      <CareerPeopleSection data={data} />
      <CareerBenefitsSection data={data} />
      <CareerCultureSection data={data} />
      <CareerFeaturesSection data={data} />
      <CareerBelongSection data={data} />
      <CareerPersonSection data={data} />
      <CareerResourcesSection data={data} />
    </main>
  );
}
