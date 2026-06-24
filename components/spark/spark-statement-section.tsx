import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { SparkPage } from "@/lib/types/strapi";

interface Props {
  data: SparkPage | null;
}

// Split the heading around the highlight text to wrap it in a styled span
function renderHeading(
  text: string,
  highlight: string | null,
): React.ReactNode {
  if (!highlight) {
    return text;
  }
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return text;
  }
  const before = text.slice(0, index);
  const match = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);
  return (
    <>
      {before}
      <span className="text-primary">{match}</span>
      {after}
    </>
  );
}

export function SparkStatementSection({ data }: Props): React.ReactElement {
  const heading = data?.statementHeading ?? null;
  const highlightText = data?.statementHighlight ?? null;
  const imageUrl = getStrapiMediaUrl(data?.statementImage ?? null);

  if (!heading && !imageUrl) {
    return <></>;
  }

  return (
    <section className="bg-neutral-950 pt-10 pb-24 lg:pb-32">
      {heading && (
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn direction="up" duration={0.7}>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-semibold text-white text-center leading-[1.1] tracking-tight whitespace-pre-line">
              {renderHeading(heading, highlightText)}
            </h2>
          </FadeIn>
        </div>
      )}

      {imageUrl && (
        <FadeIn direction="up" delay={0.15} duration={0.7}>
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 mt-16 lg:mt-24">
            <div className="relative w-full aspect-video">
              <Image
                src={imageUrl}
                alt={heading ?? "Spark"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1152px"
              />
            </div>
          </div>
        </FadeIn>
      )}
    </section>
  );
}
