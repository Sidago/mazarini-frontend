export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { LeadershipSections } from "@/components/leadership/leadership-sections";
import { getLeadershipPage } from "@/lib/api/leadership";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getLeadershipPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.pageTitle ?? "Leadership",
      fallbackDescription: data.pageDescription ?? "Meet the leadership team driving Mazarini Inc.'s vision for innovation and excellence in construction.",
      fallbackImage: data.groupPhoto,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Leadership",
      fallbackDescription: "Meet the leadership team driving Mazarini Inc.'s vision for innovation and excellence in construction.",
    });
  }
}

export default async function LeadershipPage(): Promise<React.ReactElement> {
  const data = await getLeadershipPage().catch(() => null);
  if (!data) return notFound();

  return <LeadershipSections data={data} />;
}
