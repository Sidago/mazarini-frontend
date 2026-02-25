import { FadeIn } from "@/components/ui/fade-in";

interface IntroSectionProps {
  heading: string | null;
  highlightText: string | null;
  description: string | null;
}

export function IntroSection({
  heading,
  highlightText,
  description,
}: IntroSectionProps): React.ReactElement {
  if (!heading && !description) {
    return <></>;
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

  return (
    <section className="bg-neutral-950 py-20 lg:py-28">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — large heading */}
          {heading && (
            <FadeIn direction="left" duration={0.7}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight">
                {renderHeading(heading, highlightText)}
              </h2>
            </FadeIn>
          )}

          {/* Right — description */}
          {description && (
            <FadeIn direction="right" delay={0.2} duration={0.7}>
              <div className="lg:pt-4">
                <p className="text-base lg:text-lg text-white/60 leading-relaxed">
                  {description}
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
