import React from "react";
import type { News, SustainabilityPage } from "@/lib/types/strapi";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import { AccordionSection } from "@/components/safety/accordion-section";
import { NumbersMarquee } from "@/components/about/numbers-marquee";
import { CarouselSection } from "@/components/safety/carousel-section";
import { LeadershipSection } from "@/components/safety/leadership-section";
import { YouMightBeInterested } from "@/components/common/you-might-be-interested";
import { NewsCard } from "../home/news-card";
import { getNews } from "@/lib/api/news";
import { NewsSection } from "../home/news-section";

interface Props {
  data: SustainabilityPage;
}

export async function SustainabilitySections({
  data,
}: Props): Promise<React.ReactElement> {
  const news: News[] = await getNews().catch(() => []);

  return (
    <>
      <ImgOrVideoHero
        title={data.heroTitle ?? "Sustainability"}
        text={data.heroText ?? ""}
        heroVideo={data.heroVideo}
        heroImage={data.heroImage}
        ctaText={null}
        ctaUrl={null}
      />

      {data.accordionTitle && (
        <AccordionSection
          title={data.accordionTitle}
          details={data.accordionDetails}
          image={data.accordionImage}
          items={data.accordionItems}
        />
      )}

      <NumbersMarquee stats={data.stats} />

      {data.carouselTitle && (
        <CarouselSection
          title={data.carouselTitle}
          description={data.carouselText ?? ""}
          cards={data.carouselCards}
        />
      )}

      <NewsSection news={news} />

      {data.leadershipTitle && (
        <LeadershipSection
          title={data.leadershipTitle}
          details={data.leadershipDetails}
          parallaxText={data.leadershipParallaxText}
          members={data.leadershipCards}
        />
      )}

      <YouMightBeInterested />
    </>
  );
}
