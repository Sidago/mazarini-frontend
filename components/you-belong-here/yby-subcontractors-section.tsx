"use client";

import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { YouBelongHerePage } from "@/lib/types/strapi";

interface Props {
  data: YouBelongHerePage;
}

export function YbySubcontractorsSection({ data }: Props): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(data.subcontractorsImage ?? null);

  return (
    <section
      id="subcontractors"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden">
      {/* Background image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Subcontractors"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-800" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full px-8 lg:pl-[18vw] lg:pr-[10vw] py-20 lg:py-0 flex flex-col justify-center max-w-4xl">
        {data.subcontractorsText && (
          <p className="text-white font-serif text-xl font-semibold leading-snug mb-10 max-w-3xl">
            {data.subcontractorsText}
          </p>
        )}
        {data.subcontractorsCtaUrl && (
          <Link
            href={data.subcontractorsCtaUrl}
            className="inline-block self-start bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-neutral-900 hover:bg-amber-500 transition-colors">
            {data.subcontractorsCtaText ?? "Learn More"}
          </Link>
        )}
      </div>
    </section>
  );
}
