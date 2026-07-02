import { FadeIn } from "@/components/ui/fade-in";
import type { AwardPage } from "@/lib/types/strapi";

interface Props {
  data: AwardPage | null;
}

export function AwardColumnsSection({ data }: Props): React.ReactElement {
  const columns = data?.textColumns ?? [];

  if (columns.length === 0) {
    return <></>;
  }

  return (
    <section className="bg-white text-black py-20 lg:py-35">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2">
          {columns.map((column, index) => (
            <FadeIn key={column.id} direction="up" delay={index * 0.1}>
              <h3 className="text-xl lg:text-2xl font-serif font-bold leading-tight mb-4">
                {column.title}
              </h3>
              {column.text && (
                <p className="text-base font-serif leading-relaxed text-neutral-600">
                  {column.text}
                </p>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
