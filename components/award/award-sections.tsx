import type { AwardPage } from "@/lib/types/strapi";
import { AwardHeroSection } from "./award-hero-section";
import { AwardPeopleSection } from "./award-people-section";
import { AwardKnowledgeSection } from "./award-knowledge-section";
import { AwardChallengesSection } from "./award-challenges-section";
import { AwardColumnsSection } from "./award-columns-section";
import { AwardJourneySection } from "./award-journey-section";

interface Props {
  data: AwardPage | null;
}

export function AwardSections({ data }: Props): React.ReactElement {
  return (
    <main>
      <AwardHeroSection data={data} />
      <AwardPeopleSection data={data} />
      <AwardKnowledgeSection data={data} />
      <AwardChallengesSection data={data} />
      <AwardColumnsSection data={data} />
      <AwardJourneySection data={data} />
    </main>
  );
}
