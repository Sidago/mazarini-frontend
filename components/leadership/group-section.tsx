"use client";

import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { LeadershipMember, StrapiMedia } from "@/lib/types/strapi";

interface GroupSectionProps {
  title: string;
  description: string | null;
  groupPhoto: StrapiMedia | null;
  members: LeadershipMember[];
}

export function GroupSection({
  title,
  description,
  groupPhoto,
  members,
}: GroupSectionProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(groupPhoto);

  const scrollToMember = (index: number) => {
    window.dispatchEvent(
      new CustomEvent("leadership:navigate", { detail: { index } }),
    );
  };

  return (
    <section className="bg-white pt-20 lg:pt-[25vh] pb-0">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-left lg:text-center px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-black font-serif text-neutral-900 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-4 font-serif text-neutral-500 text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Group photo with column overlays */}
      <div className="hidden lg:block relative mx-auto max-w-7xl w-[90%] lg:w-[80%] h-[70vh] min-h-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={groupPhoto?.alternativeText ?? title}
            fill
            className="object-cover object-top"
            sizes=""
            priority
          />
        ) : (
          <div className="w-full h-full bg-neutral-200" />
        )}

        {/* Dark gradient at bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {/* Equal columns — one per member */}
        <div className="absolute inset-0 flex">
          {members.map((member, index) => (
            <button
              key={member.id}
              type="button"
              onClick={() => scrollToMember(index)}
              className={`group relative flex-1 h-full text-left cursor-pointer transition-colors ${
                index < members.length - 1 ? "" : ""
              }`}>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />

              {/* Name + learn more */}
              <div className="absolute top-[50%] left-[25%]">
                <p className="text-white text-xl font-semibold font-serif leading-tight">
                  {member.name}
                </p>
                <p className="text-white/0 group-hover:text-white/80 text-sm mt-1 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Learn more about {member.name.split(" ")[0]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
