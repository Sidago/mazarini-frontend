import { FadeIn } from "@/components/ui/fade-in";
import type { StatComponent } from "@/lib/types/strapi";

interface ServiceByTheNumbersProps {
  stats: StatComponent[];
}

export function ServiceByTheNumbers({
  stats,
}: ServiceByTheNumbersProps): React.ReactElement | null {
  if (!stats.length) return null;

  return (
    <section className="py-20 md:py-32 bg-neutral-950 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-20">
            By the Numbers
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14">
          {stats.map((stat, i) => (
            <FadeIn key={stat.id} direction="up" delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                <span className="font-black text-5xl md:text-6xl lg:text-7xl text-primary leading-none mb-3">
                  {stat.value}
                  {stat.suffix}
                </span>
                <p className="text-sm md:text-base font-bold text-white uppercase tracking-wide leading-snug max-w-48">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="text-xs text-neutral-400 mt-1 max-w-48">
                    {stat.description}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
