import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Expertise } from "@/lib/types/strapi";

interface ExpertiseCardProps {
  expertise: Expertise;
}

export function ExpertiseCard({
  expertise,
}: ExpertiseCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(expertise.image);

  return (
    <div className="group relative h-115 overflow-hidden cursor-pointer">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={expertise.image.alternativeText ?? expertise.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="inline-block w-fit px-3 py-1 mb-3 border border-white/30 text-[11px] font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
          {expertise.icon}
        </span>
        <h3 className="text-2xl font-bold text-white leading-tight">
          {expertise.title}
        </h3>
      </div>
    </div>
  );
}
