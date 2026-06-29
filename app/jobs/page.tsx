import type { Metadata } from "next";
import { getJobsPage, getAllJobs } from "@/lib/api/jobs";
import { buildMetadata } from "@/lib/utils/seo";
import { JobsHero } from "@/components/jobs/jobs-hero";
import { JobsBoard } from "@/components/jobs/jobs-board";
import type { Job, JobsPage } from "@/lib/types/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getJobsPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "Jobs",
      fallbackDescription:
        data.heroSubtitle ?? "Explore open roles and build your career with us.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Jobs",
      fallbackDescription: "Explore open roles and build your career with us.",
    });
  }
}

export default async function JobsPageRoute(): Promise<React.ReactElement> {
  const [jobsPage, jobs] = await Promise.all([
    getJobsPage().catch((error) => {
      console.error("Failed to fetch jobs page:", error);
      return null as JobsPage | null;
    }),
    getAllJobs().catch((error) => {
      console.error("Failed to fetch jobs:", error);
      return [] as Job[];
    }),
  ]);

  return (
    <>
      <JobsHero data={jobsPage} />
      <JobsBoard jobs={jobs} about={jobsPage} />
    </>
  );
}
