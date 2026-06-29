"use client";

import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerHeroSection({ data }: Props): React.ReactElement {
  return (
    <ImgOrVideoHero
      title={data?.heroTitle ?? "Build Your Career With Us"}
      text={data?.heroText ?? ""}
      heroVideo={data?.heroVideo ?? null}
      heroImage={data?.heroImage ?? null}
      ctaText={data?.heroCtaText}
      ctaUrl={data?.heroCtaUrl}
      openInBlank={true}
    />
  );
}
