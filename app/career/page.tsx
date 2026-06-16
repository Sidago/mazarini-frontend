import type { Metadata } from "next";
import { getCareerPage, getJobs } from "@/lib/api/career";
import { buildMetadata } from "@/lib/utils/seo";
import { CareerSections } from "@/components/career/career-sections";
import { YouMightBeInterested } from "@/components/common/you-might-be-interested";
import type { CareerPage as CareerPageType, Job } from "@/lib/types/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getCareerPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "Careers",
      fallbackDescription:
        data.heroText ??
        "Join our team and build with purpose, passion, and precision.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Careers",
      fallbackDescription:
        "Join our team and build with purpose, passion, and precision.",
    });
  }
}

export default async function CareerPage() {
  const [careerPage, jobs] = await Promise.all([
    getCareerPage().catch((error) => {
      console.error("Failed to fetch career page:", error);
      return null as CareerPageType | null;
    }),
    getJobs().catch((error) => {
      console.error("Failed to fetch jobs:", error);
      return [] as Job[];
    }),
  ]);

  return (
    <>
      <CareerSections data={careerPage} jobs={jobs} />
      <YouMightBeInterested />
    </>
  );
}
