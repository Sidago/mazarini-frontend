"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { AwardChallengeCard, AwardPage } from "@/lib/types/strapi";

interface Props {
  data: AwardPage | null;
}

function ChallengeCard({ card }: { card: AwardChallengeCard }): React.ReactElement {
  // Tap to reveal the solution on touch devices; hover handles desktop.
  const [open, setOpen] = useState(false);
  const imageUrl = getStrapiMediaUrl(card.image ?? null);

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className="group relative w-full h-96 lg:h-120 overflow-hidden cursor-pointer">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Challenge"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full bg-neutral-200" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Default — the challenge (hidden on hover, or when tapped open) */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 group-hover:opacity-0 ${
          open ? "opacity-0" : "opacity-100"
        }`}>
        <p className="text-primary text-lg font-semibold uppercase tracking-widest mb-3">
          Challenge
        </p>
        <p className="text-white text-lg lg:text-xl font-semibold leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Solution — shown on hover, or when tapped open */}
      {card.solution && (
        <div
          className={`absolute inset-0 bg-black/70 flex flex-col justify-end p-6 transition-opacity duration-300 group-hover:opacity-100 ${
            open ? "opacity-100" : "opacity-0"
          }`}>
          <p className="text-primary text-lg font-semibold uppercase tracking-widest mb-3">
            Solution
          </p>
          <p className="text-white text-lg leading-relaxed">{card.solution}</p>
        </div>
      )}
    </div>
  );
}

export function AwardChallengesSection({ data }: Props): React.ReactElement {
  const cards = data?.challengeCards ?? [];
  const title = data?.challengesTitle ?? null;
  const description = data?.challengesDescription ?? null;

  if (cards.length === 0) {
    return <></>;
  }

  return (
    <section className="bg-white text-black py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {(title || description) && (
          <FadeIn direction="up" className="text-center max-w-2xl mx-auto mb-14">
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-6 text-base lg:text-lg leading-relaxed text-neutral-600">
                {description}
              </p>
            )}
          </FadeIn>
        )}

        <div className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <FadeIn key={card.id} direction="up" delay={index * 0.1}>
              <ChallengeCard card={card} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
