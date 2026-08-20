import { getStrapiUrl } from "@/lib/api/client";
import type { ReportDownloadPayload } from "@/lib/types/strapi";

const STRAPI_URL = getStrapiUrl();

export async function submitReportDownload(
  data: ReportDownloadPayload,
): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/report-downloads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(
      errorBody?.error?.message ?? `Submission failed: ${res.status} ${res.statusText}`,
    );
  }
}
