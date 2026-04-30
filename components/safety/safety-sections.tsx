import React from "react";
import type { News, SafetyPage } from "@/lib/types/strapi";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import { AccordionSection } from "./accordion-section";
import { StatsBar } from "@/components/home/stats-bar";
import { CarouselSection } from "./carousel-section";
import { LeadershipSection } from "./leadership-section";
import { NumbersMarquee } from "../about/numbers-marquee";
import { NewsSection } from "../home/news-section";

interface SafetySectionsProps {
  data: SafetyPage;
  newsHeading: string;
  news: News[];
}

export function SafetySections({
  data,
  newsHeading,
  news,
}: SafetySectionsProps): React.ReactElement {
  return (
    <>
      <ImgOrVideoHero
        title={data.heroTitle}
        text={data.heroText}
        heroVideo={data.heroVedio}
        heroImage={data.heroImage}
        ctaText={null}
        ctaUrl={null}
      />

      <AccordionSection
        title={data.accordianTitle}
        details={data.accordianDetails}
        image={data.accordionImage}
        items={data.accordionItems}
      />

      {/* <StatsBar stats={data.stats} /> */}
      <NumbersMarquee stats={data.stats} />

      <CarouselSection
        title={data.carouselTitle}
        description={data.carouselText}
        cards={data.carouselCard}
      />

      <NewsSection heading={newsHeading} news={news} />

      <LeadershipSection
        title={data.leadershipTitle}
        details={data.leadershipDetails}
        parallaxText={data.leadershipParallaxText}
        members={data.leadership_cards}
      />
    </>
  );
}
