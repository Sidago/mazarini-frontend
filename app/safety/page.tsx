export const dynamic = "force-dynamic";

import React from "react";
import { notFound } from "next/navigation";
import { SafetySections } from "@/components/safety/safety-sections";
import { getSafetyPage } from "@/lib/api/safety";

export default async function SafetyPage(): Promise<React.ReactElement> {
  const data = await getSafetyPage().catch(() => null);
  if (!data) return notFound();

  return <SafetySections data={data} />;
}
