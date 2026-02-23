import { getStrapiMediaUrl } from "@/lib/api/client";
import type { StrapiMedia } from "@/lib/types/strapi";

interface HeroVideoProps {
  video: StrapiMedia | null;
  fallbackImage: StrapiMedia | null;
}

export function HeroVideo({
  video,
  fallbackImage,
}: HeroVideoProps): React.ReactElement {
  const videoUrl = getStrapiMediaUrl(video);
  console.log("Hero video URL:", videoUrl);
  const imageUrl = getStrapiMediaUrl(fallbackImage);

  if (videoUrl) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    );
  }

  else if (imageUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={imageUrl}
        alt={fallbackImage?.alternativeText ?? "Hero background"}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return <div className="absolute inset-0 bg-neutral-900" />;
}
