import { strapiGet } from "@/lib/api/client";
import type { TimelineEntry, StrapiListResponse } from "@/lib/types/strapi";

export async function getTimelineEntries(): Promise<TimelineEntry[]> {
  const res = await strapiGet<StrapiListResponse<TimelineEntry>>(
    "/timeline-entries",
    {
      "populate[image]": "true",
      "sort[0]": "order:asc",
    },
  );
  return res.data;
}
