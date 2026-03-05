import Image from "next/image";
import { getAbout } from "@/lib/api/about";
import { getTimelineEntries } from "@/lib/api/timeline";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { TimelineSection } from "@/components/about/timeline-section";
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
  introHeading: null,
  introHighlight: null,
  introDiscription: null,
  timelineHeading: null,
  timelineDescription: null,
  blocks: [],
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
      />

      <IntroSection
        heading={about.introHeading}
        highlightText={about.introHighlight}
        description={about.introDiscription}
      />

      <TimelineSection
        heading={about.timelineHeading}
        description={about.timelineDescription}
        entries={timelineEntries}
      />
    </>
  );
}
