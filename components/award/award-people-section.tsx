import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import type { AwardPage } from "@/lib/types/strapi";

interface Props {
  data: AwardPage | null;
}

export function AwardPeopleSection({ data }: Props): React.ReactElement {
  const title = data?.peopleTitle ?? null;
  const text = data?.peopleText ?? null;
  const ctaText = data?.peopleCtaText ?? null;
  const ctaUrl = data?.peopleCtaUrl ?? null;

  if (!title && !text) {
    return <></>;
  }

  return (
    <section className="bg-neutral-950 text-white py-20 lg:pt-30 lg:pb-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          <FadeIn direction="right" duration={0.7} className="w-full lg:flex-1">
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
                {title}
              </h2>
            )}
            {ctaText && ctaUrl && (
              <Link
                href={ctaUrl}
                className="inline-block mt-8 bg-primary text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                {ctaText}
              </Link>
            )}
          </FadeIn>

          {text && (
            <FadeIn
              direction="left"
              delay={0.15}
              duration={0.7}
              className="w-full lg:flex-1">
              <p className="text-base lg:text-lg leading-relaxed text-white/70">
                {text}
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
