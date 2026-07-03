import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type {
  ConstructionPage,
  ConstructionSustainabilityCard,
} from "@/lib/types/strapi";

interface Props {
  data: ConstructionPage | null;
}

function Card({
  card,
  index,
}: {
  card: ConstructionSustainabilityCard;
  index: number;
}): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(card.image ?? null);

  const inner = (
    <div className="group relative aspect-[4/3] w-full overflow-hidden">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={card.image?.alternativeText ?? card.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6">
        <span className="text-lg lg:text-xl font-serif font-bold text-white">
          {card.title}
        </span>
        <span className="flex-none text-primary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );

  return (
    <FadeIn direction="up" delay={index * 0.1}>
      {card.url ? (
        <Link href={card.url} className="block">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </FadeIn>
  );
}

export function ConstructionSustainabilitySection({
  data,
}: Props): React.ReactElement {
  const title = data?.sustainabilityTitle ?? null;
  const text = data?.sustainabilityText ?? null;
  const cards = data?.sustainabilityCards ?? [];

  if (!title && cards.length === 0) {
    return <></>;
  }

  return (
    <section className="bg-white text-black py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {(title || text) && (
          <div className="max-w-3xl mb-14">
            {title && (
              <FadeIn direction="up" duration={0.7}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
                  {title}
                </h2>
              </FadeIn>
            )}
            {text && (
              <FadeIn direction="up" delay={0.1} duration={0.7}>
                <p className="mt-6 text-base lg:text-lg leading-relaxed text-neutral-600 whitespace-pre-line">
                  {text}
                </p>
              </FadeIn>
            )}
          </div>
        )}

        {cards.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
