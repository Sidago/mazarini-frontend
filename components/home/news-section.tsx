import { Fragment } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { NewsCard } from "@/components/home/news-card";
import type { News } from "@/lib/types/strapi";

interface NewsSectionProps {
  heading: string | null;
  news: News[];
}

export function NewsSection({
  heading,
  news,
}: NewsSectionProps): React.ReactElement {
  if (news.length === 0 && !heading) return <></>;

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="max-w-300 mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* ── Left: sticky heading ── */}
          <div className="shrink-0 lg:self-stretch">
            <div className="lg:sticky lg:top-32">
              <FadeIn direction="left" duration={0.7}>
                {heading && (
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold italic font-serif text-neutral-900 text-right leading-[1.1] lg:[writing-mode:vertical-rl] lg:rotate-180">
                    {heading.split("\n").map((line, i) => (
                      <Fragment key={i}>
                        {i > 0 && <br />}
                        {line}
                      </Fragment>
                    ))}
                  </h2>
                )}
              </FadeIn>
            </div>
          </div>

          {/* ── Right: news cards ── */}
          <div className="flex-1 w-full">
            <div className="flex flex-col gap-16 lg:gap-20">
              {news.map((item, index) => (
                <FadeIn
                  key={item.id}
                  direction="up"
                  delay={index * 0.1}
                  duration={0.7}
                >
                  <NewsCard news={item} reversed={index % 2 !== 0} />
                </FadeIn>
              ))}
            </div>

            {/* VIEW ALL NEWS link */}
            {news.length > 0 && (
              <FadeIn direction="up" delay={0.3} duration={0.7}>
                <div className="mt-16">
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                  >
                    View All News
                    <span>&rsaquo;</span>
                  </Link>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
