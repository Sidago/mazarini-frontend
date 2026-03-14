import React from "react";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import { RdSections } from "@/components/rd/rd-sections";
import { getRdPage } from "@/lib/api/rd";

export default async function RdPage(): Promise<React.ReactElement> {
  const data = await getRdPage();

  return (
    <>
      <ImgOrVideoHero
        title={data.heroTitle}
        text={data.heroText ?? ""}
        heroVideo={data.heroVideo}
        heroImage={data.heroImage}
      />
      <RdSections data={data} />
    </>
  );
}
