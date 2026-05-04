import React from "react";
import type { LeadershipPageData } from "@/lib/types/strapi";
import { GroupSection } from "./group-section";
import { MembersCarousel } from "./members-carousel";

interface LeadershipSectionsProps {
  data: LeadershipPageData;
}

export function LeadershipSections({
  data,
}: LeadershipSectionsProps): React.ReactElement {
  return (
    <>
      <GroupSection
        title={data.pageTitle}
        description={data.pageDescription}
        groupPhoto={data.groupPhoto}
        members={data.members}
      />
      <MembersCarousel members={data.members} />
    </>
  );
}
