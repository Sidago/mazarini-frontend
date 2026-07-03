import { FadeIn } from "@/components/ui/fade-in";
import type { ConstructionPage } from "@/lib/types/strapi";

interface Props {
  data: ConstructionPage | null;
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

export function ConstructionExperienceSection({
  data,
}: Props): React.ReactElement {
  const heading = data?.experienceTitle ?? null;
  const highlight = data?.experienceHighlight ?? null;
  const description = data?.experienceText ?? null;

  if (!heading && !description) {
    return <></>;
  }

  return (
    <section className="bg-neutral-950 text-white py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        {heading && (
          <FadeIn direction="up" duration={0.7}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black leading-tight tracking-tight whitespace-pre-line">
              {renderHeading(heading, highlight)}
            </h2>
          </FadeIn>
        )}

        {description && (
          <FadeIn direction="up" delay={0.15} duration={0.7}>
            <p className="mt-8 text-base lg:text-lg leading-relaxed text-white/60 whitespace-pre-line">
              {description}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
