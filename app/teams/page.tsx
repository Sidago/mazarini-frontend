export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import TeamList from "@/components/team/team-list";
import { getTeams, getTeamsPage } from "@/lib/api/our-team";
import { buildMetadata } from "@/lib/utils/seo";
import { Teams, TeamsPage } from "@/lib/types/strapi";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getTeamsPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "Our Team",
      fallbackDescription: data.heroText,
      fallbackImage: data.heroImage,
    });
  } catch {
    return buildMetadata({ fallbackTitle: "Our Team" });
  }
}

export default async function TeamPage(): Promise<React.ReactElement> {
  let teams: Teams[] = [];
  let teamPage: TeamsPage = {
    id: 0,
    documentId: "",
    heroTitle: "Our Team",
    heroText: "Meet the people who make it all happen.",
    heroVedio: null,
    heroImage: null,
    heroCtaText: null,
    heroCtaUrl: null,
  };
  try {
    [teams, teamPage] = await Promise.all([
      await getTeams(),
      await getTeamsPage(),
    ]);
  } catch (error) {
    console.error("Error fetching team data:", error);
  }

  return (
    <>
      <ImgOrVideoHero
        title={teamPage.heroTitle}
        text={teamPage.heroText}
        heroVideo={teamPage?.heroVedio}
        heroImage={teamPage?.heroImage}
        ctaText={teamPage.heroCtaText}
        ctaUrl={teamPage.heroCtaUrl}
      />
      <TeamList teams={teams} />
    </>
  );
}
