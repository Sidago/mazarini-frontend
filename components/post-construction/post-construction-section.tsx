import { IPostConstructionPage } from "@/lib/types/strapi";
import { AwardHeroSection } from "../award/award-hero-section";
import { IntroSection } from "../home/intro-section";
import { AccordionSection } from "../safety/accordion-section";
import { StatsBar } from "../home/stats-bar";
import { CultureSection } from "../about/culture-section";

export default function PostConstructionSections({
  data,
}: {
  data: IPostConstructionPage | null;
}) {
  return (
    <main>
      <AwardHeroSection data={data} />
      <IntroSection
        heading={data?.trustTitle || "Your Trusted Advisor"}
        highlightText={"Trusted"}
        description={
          data?.trustText ||
          "Each project is a part of the greater whole - the long-lasting relationships, partnerships, and friendships we've built our business on. We want to learn from each experience and invite constructive feedback from our project stakeholders. Our goal is to always be better than we were yesterday, ensuring MAZARINI is the first call when you're ready to explore something new"
        }
      />
      <AccordionSection
        title={""}
        details={null}
        image={null}
        items={data?.accordionItems ?? []}
      />
      <StatsBar description={null} stats={data?.stats ?? []} />

      <CultureSection
        heading={data?.conversationTitle || "Ready for Conversation?"}
        description={
          data?.conversationText ||
          "There are many ways to get in touch with MAZARINI, whether you are looking for subject matter expertise or an exploratory conversation. "
        }
        watermark={data?.conversationWatermark || "Let's Talk"}
        cards={data?.conversationBlock ?? []}
          />
          
          
    </main>
  );
}