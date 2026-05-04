export const dynamic = "force-dynamic";

import React from "react";
import { notFound } from "next/navigation";
import { LeadershipSections } from "@/components/leadership/leadership-sections";
import { getLeadershipPage } from "@/lib/api/leadership";

export default async function LeadershipPage(): Promise<React.ReactElement> {
  const data = await getLeadershipPage().catch(() => null);
  if (!data) return notFound();

  return <LeadershipSections data={data} />;
}
