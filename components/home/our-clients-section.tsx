"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { OurClient } from "@/lib/types/strapi";

interface OurClientsSectionProps {
  clients: OurClient[];
}

export function OurClientsSection({
  clients,
}: OurClientsSectionProps): React.ReactElement {
  if (clients.length === 0) {
    return <></>;
  }

  // Duplicate list to create seamless loop
  const duplicated = [...clients, ...clients];

  return (
    <section className="py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
              Our Clients
            </h2>
            <p className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-4">
              Trusted by Industry Leaders
            </p>
            <div className="h-1 w-24 bg-primary mx-auto" />
          </div>
        </FadeIn>
      </div>

      <div className="relative group">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee group-hover:[animation-play-state:paused]"> 
          {duplicated.map((client, i) => {
            const imageUrl = getStrapiMediaUrl(client.image ?? null);
            return (
              <div
                key={`${client.id}-${i}`}
                className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center w-[140px] md:w-[180px] h-[80px] md:h-[100px]"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={client.name ?? "Client logo"}
                    className="max-w-full max-h-full object-contain opacity-40 hover:opacity-100 transition-all duration-500 hover:scale-110"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
