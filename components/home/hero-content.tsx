import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/fade-in";
import type { LinkComponent } from "@/lib/types/strapi";

interface HeroContentProps {
  badge: string | null;
  title: string;
  highlightText: string | null;
  subtitle: string | null;
  ctas: LinkComponent[];
}

export function HeroContent({
  badge,
  title,
  highlightText,
  subtitle,
  ctas,
}: HeroContentProps): React.ReactElement {
  const titleBeforeHighlight = highlightText
    ? title.replace(highlightText, "")
    : title;

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-20 lg:py-0 bg-background-light dark:bg-background-dark grid-lines relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
      <div className="relative z-10 max-w-2xl">
        {badge && (
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-primary/30 rounded text-xs font-bold text-primary uppercase tracking-wider bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {badge}
            </div>
          </FadeIn>
        )}
        <FadeIn delay={0.2}>
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-8">
            {titleBeforeHighlight}
            {highlightText && (
              <>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  {highlightText}
                </span>
              </>
            )}
          </h1>
        </FadeIn>
        {subtitle && (
          <FadeIn delay={0.3}>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mb-10 leading-relaxed font-light">
              {subtitle}
            </p>
          </FadeIn>
        )}
        {ctas.length > 0 && (
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              {ctas.map((cta) =>
                cta.variant === "primary" ? (
                  <Link
                    key={cta.id}
                    href={cta.url}
                    className="inline-flex items-center justify-center px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold uppercase tracking-wide rounded hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all group"
                  >
                    {cta.text}
                    <Icon
                      name="arrow_forward"
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                ) : (
                  <Link
                    key={cta.id}
                    href={cta.url}
                    className="inline-flex items-center justify-center px-8 py-4 border border-neutral-300 dark:border-neutral-700 font-bold uppercase tracking-wide rounded hover:border-primary hover:text-primary transition-all"
                  >
                    {cta.text}
                  </Link>
                )
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
