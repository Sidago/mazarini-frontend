import type { Metadata } from "next";
import PostConstructionSections from "@/components/post-construction/post-construction-section";
import { getPostConstructionPage } from "@/lib/api/post-construction";
import { buildMetadata } from "@/lib/utils/seo";
import type { IPostConstructionPage } from "@/lib/types/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getPostConstructionPage();
    return buildMetadata({
      seo: data?.seo,
      fallbackTitle: data?.heroTitle ?? "Post-construction",
      fallbackDescription:
        data?.heroText ??
        "After a construction project is done, there is always more work to do. Mazarini's post-construction phase includes ongoing support, commercial services, comprehensive operations and maintenance manuals, and a mindset of continuous improvement.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Post-construction",
      fallbackDescription:
        "After a construction project is done, there is always more work to do. Mazarini's post-construction phase includes ongoing support, commercial services, comprehensive operations and maintenance manuals, and a mindset of continuous improvement.",
    });
  }
}

export default async function PostConstructionPageRoute(): Promise<React.ReactElement> {
  const data = await getPostConstructionPage().catch((error) => {
    console.error("Failed to fetch post construction page:", error);
    return null as IPostConstructionPage | null;
  });

  return <PostConstructionSections data={data} />;
}