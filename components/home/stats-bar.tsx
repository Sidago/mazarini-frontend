import { FadeIn } from "@/components/ui/fade-in";
import { StatItem } from "@/components/home/stat-item";
import type { StatComponent } from "@/lib/types/strapi";

interface StatsBarProps {
  stats: StatComponent[];
}

export function StatsBar({ stats }: StatsBarProps): React.ReactElement {
  return (
    <section className="w-full bg-primary text-white border-b border-primary/20">
      <FadeIn direction="up" duration={0.5}>
        <div className="max-w-400 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20 border-x border-white/20">
            {stats.map((stat) => (
              <StatItem
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix ?? undefined}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
