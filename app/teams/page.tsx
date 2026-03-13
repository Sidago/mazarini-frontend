import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import TeamList from "@/components/team/team-list";
import { getTeams, getTeamsPage } from "@/lib/api/our-team";
import React from "react";

export default async function TeamPage(): Promise<React.ReactElement> {
  const [teams, teamPage] = await Promise.all([
    await getTeams(),
    await getTeamsPage(),
  ]);

  return (
    <>
      <ImgOrVideoHero
        title={teamPage.heroTitle}
        text={teamPage.heroText}
        heroVideo={teamPage?.heroVedio}
        heroImage={teamPage?.heroImage}
      />
      <TeamList teams={teams} />
    </>
  );
}
