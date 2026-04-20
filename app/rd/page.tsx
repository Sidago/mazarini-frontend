export const dynamic = "force-dynamic";

import React from "react";
import { notFound } from "next/navigation";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import { RdSections } from "@/components/rd/rd-sections";
import { getRdPage } from "@/lib/api/rd";

export default async function RdPage(): Promise<React.ReactElement> {
  const data = await getRdPage().catch(() => null);
  if (!data) return notFound();

  return (
    <>
      <ImgOrVideoHero
        title={data.heroTitle}
        text={data.heroText ?? ""}
        heroVideo={data.heroVideo}
        heroImage={data.heroImage}
        ctaText={data.heroCtaText}
        ctaUrl={data.heroCtaUrl}
      />
      <RdSections data={data} />
    </>
  );
}
