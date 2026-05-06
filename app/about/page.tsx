import Image from "next/image";
import type { Metadata } from "next";
import { getAbout } from "@/lib/api/about";
import { getTimelineEntries } from "@/lib/api/timeline";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const about = await getAbout();
    return buildMetadata({
      seo: about.seo,
      fallbackTitle: "About Us",
      fallbackDescription: about.introDiscription ?? about.heroText,
      fallbackImage: about.heroImage,
    });
  } catch {
    return buildMetadata({ fallbackTitle: "About Us" });
  }
}
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { TimelineSection } from "@/components/about/timeline-section";
import { NumbersMarquee } from "@/components/about/numbers-marquee";
import { LeadershipBlocksSection } from "@/components/about/leadership-blocks-section";
import { CultureSection } from "@/components/about/culture-section";
import { LifeSection } from "@/components/about/life-section";
import { IntroSection } from "@/components/home/intro-section";
import type {
  About as AboutType,
  ContentBlock,
  TimelineEntry,
} from "@/lib/types/strapi";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";

export const dynamic = "force-dynamic";

const FALLBACK_ABOUT: AboutType = {
  id: 0,
  documentId: "",
  title: "About Us",
  heroTitle: "About Us",
  heroText: "Learn more about who we are and what we do.",
  heroVideo: null,
  heroImage: null,
  heroCtaText: null,
  heroCtaUrl: null,
  introHeading: null,
  introHighlight: null,
  introDiscription: null,
  timelineHeading: null,
  timelineDescription: null,
  blocks: [],
  stats: [],
  leadershipBlocks: [],
  cultureHeading: null,
  cultureDescription: null,
  cultureWatermark: null,
  cultureCards: [],
  lifeHeading: null,
  lifeDescription: null,
  lifeImages: [],
};

export default async function About(): Promise<React.ReactElement> {
  let about: AboutType = FALLBACK_ABOUT;
  let timelineEntries: TimelineEntry[] = [];

  try {
    [about, timelineEntries] = await Promise.all([
      getAbout(),
      getTimelineEntries(),
    ]);
  } catch {
    // Strapi unavailable or permissions not set — render with fallback data
  }

  return (
    <>
      <ImgOrVideoHero
        title={about.heroTitle}
        text={about.heroText}
        heroVideo={about.heroVideo}
        heroImage={about.heroImage}
        ctaText={about.heroCtaText}
        ctaUrl={about.heroCtaUrl}
      />

      <IntroSection
        heading={about.introHeading}
        highlightText={about.introHighlight}
        description={about.introDiscription}
      />

      <NumbersMarquee stats={about.stats} />

      <TimelineSection
        heading={about.timelineHeading}
        description={about.timelineDescription}
        entries={timelineEntries}
      />

      <LeadershipBlocksSection blocks={about.leadershipBlocks} />
      
      <CultureSection
        heading={about.cultureHeading}
        description={about.cultureDescription}
        watermark={about.cultureWatermark}
        cards={about.cultureCards}
      />

      <LifeSection
        heading={about.lifeHeading}
        description={about.lifeDescription}
        images={about.lifeImages}
      />
    </>
  );
}
