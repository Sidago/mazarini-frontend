import { StatItem } from "@/components/home/stat-item";
import type { StatComponent } from "@/lib/types/strapi";

interface StatsBarProps {
  stats: StatComponent[];
  description?: string | null;
}

export function StatsBar({
  stats,
  description,
}: StatsBarProps): React.ReactElement {
  if (!stats.length) return <></>;

  return (
    <section className="bg-surface py-16">
      <div className="max-w-360 mx-auto px-8 md:px-16 py-24 flex flex-col gap-8 lg:gap-16">
        {description && (
          <div className="w-[60%]">
            <p className="font-headline leading-relaxed text-on-surface whitespace-pre-line">
              {description}
            </p>
          </div>
        )}

        <div className="lg:w-2/3 grid grid-cols-2 gap-y-12 w-[60%] ml-auto">
          {stats.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
