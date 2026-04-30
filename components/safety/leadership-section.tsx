"use client";

import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { Teams } from "@/lib/types/strapi";

interface LeadershipSectionProps {
  title: string;
  details: string | null;
  parallaxText: string | null;
  members: Teams[];
}

export function LeadershipSection({
  title,
  details,
  parallaxText,
  members,
}: LeadershipSectionProps): React.ReactElement {
  if (!title && members.length === 0) return <></>;

  return (
    <section className="text-black overflow-hidden py-24">
      {parallaxText && (
        <div className="pointer-events-none select-none w-full mb-14">
          <ParallaxText
            baseVelocity={0.15}
            color="rgba(0,0,0,0.12)"
            direction="horizontal">
            {parallaxText}
          </ParallaxText>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            {title}
          </h2>
          {details && (
            <p className="mt-4 text-black/70 max-w-xl leading-relaxed">
              {details}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => {
            const url = getStrapiMediaUrl(member.image ?? null);
            return (
              <div key={member.id}>
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-3">
                  {url ? (
                    <Image
                      src={url}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-700" />
                  )}
                </div>
                <p className="text-base font-semibold text-black/80">
                  {member.name}
                </p>
                <p className="text-sm text-black/70 mt-0.5">{member.position}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
