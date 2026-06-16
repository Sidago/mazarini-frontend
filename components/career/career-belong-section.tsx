"use client";

import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerBelongSection({ data }: Props): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(data?.belongImage ?? null);

  if (!data?.belongTitle && !imageUrl) return <></>;

  return (
    <section className="bg-white pt-20 lg:pt-28 pb-20 lg:pb-28">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-left lg:text-center px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-black font-serif text-neutral-900 leading-tight">
          {data?.belongTitle ?? "You Belong Here"}
        </h2>
        {data?.belongDescription && (
          <p className="mt-4 font-serif text-neutral-500 text-base leading-relaxed">
            {data.belongDescription}
          </p>
        )}
      </div>

      {/* Image with gradient overlay */}
      {imageUrl && (
        <div className="relative mx-auto max-w-7xl w-[90%] lg:w-[80%] h-[55vh] lg:h-[70vh] min-h-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={data?.belongImage?.alternativeText ?? data?.belongTitle ?? "You Belong Here"}
            fill
            className="object-cover object-top"
            sizes="80vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
        </div>
      )}
    </section>
  );
}
