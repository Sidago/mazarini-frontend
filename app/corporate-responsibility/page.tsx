export const dynamic = "force-dynamic";

import React from "react";
import { notFound } from "next/navigation";
import { CrSections } from "@/components/corporate-responsibility/cr-sections";
import { getCorporateResponsibilityPage } from "@/lib/api/corporate-responsibility";

export default async function CorporateResponsibilityPage(): Promise<React.ReactElement> {
  const data = await getCorporateResponsibilityPage().catch(() => null);
  if (!data) return notFound();

  return <CrSections data={data} />;
}
