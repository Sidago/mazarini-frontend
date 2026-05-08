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

async function getCards(): Promise<Card[]> {
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
      }),
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
      }),
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
      }),
    );
  }

  return shuffle(cards).slice(0, 3);
}

interface Props {
  title?: string;
}

export async function YouMightBeInterested({
  title = "You Might Be Interested In ...",
}: Props = {}): Promise<React.ReactElement> {
  const cards = await getCards();
  if (cards.length === 0) return <></>;

  return (
    <section className="bg-neutral-950 py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.url}
              className="group flex flex-col overflow-hidden bg-neutral-900 hover:bg-neutral-800 transition-colors">
              {/* Image */}
              <div className="relative w-full aspect-video overflow-hidden flex-none">
                {card.imageUrl ? (
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800" />
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                <span className="inline-block border border-white/30 text-white/60 text-xs font-bold uppercase tracking-widest px-2 py-0.5 mb-4 self-start">
                  {card.tag}
                </span>
                <h3 className="text-base font-serif font-semibold text-white leading-snug mb-3 flex-1">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="text-sm text-white/50 leading-relaxed mb-5 line-clamp-2">
                    {card.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                  Explore
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M13 8L8 3M13 8L8 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
