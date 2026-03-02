import Image from "next/image";
import { getAbout } from "@/lib/api/about";
import { getTimelineEntries } from "@/lib/api/timeline";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import { AboutHero } from "@/components/about/about-hero";
import { TimelineSection } from "@/components/about/timeline-section";
import { IntroSection } from "@/components/home/intro-section";
import type { About as AboutType, ContentBlock, TimelineEntry } from "@/lib/types/strapi";

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

function BlockRenderer({ block }: { block: ContentBlock }): React.ReactElement {
  switch (block.__component) {
    case "shared.rich-text":
      return (
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: block.body }}
        />
      );
    case "shared.media":
      return (
        <div className="relative w-full h-100 rounded-lg overflow-hidden">
          <Image
            src={getStrapiMediaUrl(block.file)}
            alt={block.file.alternativeText ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
      );
    case "shared.quote":
      return (
        <blockquote className="border-l-4 border-primary pl-6 py-4">
          {block.title && (
            <p className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {block.title}
            </p>
          )}
          <p className="text-neutral-600 dark:text-neutral-300 italic text-lg">
            {block.body}
          </p>
        </blockquote>
      );
  }
}

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
      <AboutHero
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

      {about.blocks?.length > 0 && (
        <div className="bg-neutral-950 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {about.blocks.map((block, index) => (
              <FadeIn key={block.id} delay={index * 0.1}>
                <BlockRenderer block={block} />
              </FadeIn>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
