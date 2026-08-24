import Link from "next/link";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { getNews } from "@/lib/api/news";
import { getProjects } from "@/lib/api/projects";
import { getServices } from "@/lib/api/services";

interface Card {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  tag: string;
  url: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function getCards(limit: number = 3): Promise<Card[]> {
  const [news, projects, services] = await Promise.allSettled([
    getNews(),
    getProjects(),
    getServices(),
  ]);

  const cards: Card[] = [];

  if (news.status === "fulfilled") {
    news.value.forEach((item) =>
      cards.push({
        id: `news-${item.id}`,
        title: item.title,
        description: item.description,
        imageUrl: getStrapiMediaUrl(item.image ?? null),
        tag: item.category ?? "News",
        url: `/news/${item.slug}`,
      })
    );
  }

  if (projects.status === "fulfilled") {
    projects.value.forEach((item) =>
      cards.push({
        id: `project-${item.id}`,
        title: item.title,
        description: item.description,
        imageUrl: getStrapiMediaUrl(item.image?.[0] ?? null),
        tag: item.category ?? "Project",
        url: `/projects/${item.id}`,
      })
    );
  }

  if (services.status === "fulfilled") {
    services.value.forEach((item) =>
      cards.push({
        id: `service-${item.id}`,
        title: item.title,
        description: item.discriptions,
        imageUrl: getStrapiMediaUrl(item.image ?? null),
        tag: item.catagory ?? "Service",
        url: `/services/${item.slug}`,
      })
    );
  }

  return shuffle(cards).slice(0, limit);
}

interface Props {
  title?: string;
  limit?: number;
  count?: number;
  numberOfCards?: number;
}

export async function YouMightBeInterested({
  title = "You Might Be Interested In...",
  limit,
  count,
  numberOfCards,
}: Props = {}): Promise<React.ReactElement> {
  const cardCount = limit ?? count ?? numberOfCards ?? 3;
  const cards = await getCards(cardCount);
  if (cards.length === 0) return <></>;

  const gridColsClass =
    cards.length === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : cards.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : cards.length === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="w-full bg-neutral-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-10 sm:mb-12">
          {title}
        </h2>

        <div className={`grid ${gridColsClass} gap-6 lg:gap-8 w-full`}>
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.url}
              className="group relative w-full h-[380px] sm:h-[440px] lg:h-[480px] overflow-hidden bg-neutral-900 flex flex-col justify-end"
            >
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-neutral-800" />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

              <div className="relative z-10 flex items-center justify-between p-6 sm:p-8 gap-4">
                <div className="flex flex-col gap-1.5 min-w-0">
                  {card.tag && (
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      {card.tag}
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {card.title}
                  </h3>
                </div>

                <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-primary text-black flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
