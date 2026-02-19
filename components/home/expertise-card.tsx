import Image from "next/image";
import { Icon } from "@/components/ui/icon";
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
    <div className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-[500px] flex flex-col overflow-hidden rounded hover:border-primary transition-colors duration-300">
      <div className="h-2/3 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {imageUrl && (
          <img
            src={imageUrl}
            alt={expertise.image.alternativeText ?? expertise.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>
      <div className="h-1/3 p-8 flex flex-col justify-between relative bg-white dark:bg-neutral-900 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800 transition-colors">
        <div className="absolute top-0 right-0 w-12 h-12 bg-primary text-white flex items-center justify-center -mt-6 mr-8 rounded z-20 shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Icon name={expertise.icon} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            {expertise.title}
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
            {expertise.description}
          </p>
        </div>
        <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 mt-4 overflow-hidden rounded-full">
          <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </div>
  );
}
