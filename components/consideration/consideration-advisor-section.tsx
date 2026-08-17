import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ScrollCircle } from "@/components/ui/scroll-circle";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ConsiderationPage } from "@/lib/types/strapi";

interface Props {
  data: ConsiderationPage | null;
}

// Split the body around the highlight phrase to wrap it in a muted span
function renderBody(text: string, highlight: string | null): React.ReactNode {
  if (!highlight) {
    return text;
  }
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return text;
  }
  return (
    <>
      {text.slice(0, index)}
      <span className="text-neutral-400">
        {text.slice(index, index + highlight.length)}
      </span>
      {text.slice(index + highlight.length)}
    </>
  );
}

export function ConsiderationAdvisorSection({
  data,
}: Props): React.ReactElement {
  const title = data?.alignedTitle ?? null;
  const description = data?.alignedDescription ?? null;
  const highlightText = data?.alignedHighlightText ?? null;
  const ctaText = data?.alignedCtaText ?? null;
  const ctaUrl = data?.alignedCtaUrl ?? null;
  const imageUrl = getStrapiMediaUrl(data?.alignedImage ?? null);

  if (!title) {
    return <></>;
  }

  return (
    <section className="bg-white text-neutral-900 py-20 lg:py-32">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-24">
          {/* Left — heading, body copy, CTA */}
          <FadeIn direction="right" duration={0.7} className="w-full lg:w-2/3">
            <div className="lg:pt-2">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight">
                {title}
              </h2>

              {description && (
                <p className="mt-8 text-base lg:text-lg text-neutral-700 whitespace-pre-line">
                  {renderBody(description, highlightText)}
                </p>
              )}

              {ctaText && ctaUrl && (
                <Link
                  href={ctaUrl}
                  className="inline-block mt-10 bg-primary text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                  {ctaText}
                </Link>
              )}
            </div>
          </FadeIn>

          {/* Right — portrait image with the thin arc sweeping behind its top-right */}
          {imageUrl && (
            <FadeIn
              direction="left"
              delay={0.15}
              duration={0.7}
              className="w-full lg:w-[42%]">
              <div className="relative w-full aspect-4/5 sm:aspect-5/8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-[13%] left-[25%] w-[94%] aspect-square">
                  <ScrollCircle
                    size={480}
                    strokeWidth={1.5}
                    trackColor="rgba(0, 0, 0, 0.15)"
                    arcColor="#1A1A1A"
                    className="h-full w-full overflow-visible"
                  />
                </div>
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
