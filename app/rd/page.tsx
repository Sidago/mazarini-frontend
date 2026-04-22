export const dynamic = "force-dynamic";

import React from "react";
import { notFound } from "next/navigation";
import { RdSections } from "@/components/rd/rd-sections";
import { getRdPage } from "@/lib/api/rd";

export default async function RdPage(): Promise<React.ReactElement> {
  const data = await getRdPage().catch(() => null);
  if (!data) return notFound();

  return <RdSections data={data} />;
}
