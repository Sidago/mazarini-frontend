import { FadeIn } from "@/components/ui/fade-in";
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

export function SparkIntroSection({ data }: Props): React.ReactElement {
  const heading = data?.introHeading ?? null;
  const description = data?.introText ?? null;
  const highlightText = data?.introHighlight ?? null;

  if (!heading) {
    return <></>;
  }

  return (
    <section className="bg-neutral-950 py-24 lg:py-40">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gap-12 lg:gap-20 items-start whitespace-pre-line">
          <FadeIn direction="left" duration={0.7}>
            <h2 className="md:w-[85%] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              {renderHeading(heading, highlightText)}
            </h2>
          </FadeIn>

          {description && (
            <div className="flex justify-beteen w-full items-start gap-12 lg:gap-20 mt-12">
              <div className="hidden md:block md:w-[60%]"></div>
              <FadeIn
                direction="right"
                className="w-full"
                delay={0.2}
                duration={0.7}>
                <div className="lg:pt-4 w-full">
                  <p className="text-base lg:text-lg text-white/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
