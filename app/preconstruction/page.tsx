import type { Metadata } from "next";
import { getPreconstructionPage } from "@/lib/api/preconstruction";
import { buildMetadata } from "@/lib/utils/seo";
import { PreconstructionSections } from "@/components/preconstruction/preconstruction-sections";
import type { PreconstructionPage } from "@/lib/types/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getPreconstructionPage();
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: data.heroTitle ?? "Preconstruction",
      fallbackDescription:
        data.heroText ??
        "Planning and preconstruction services that set every project up for success.",
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Preconstruction",
      fallbackDescription:
        "Planning and preconstruction services that set every project up for success.",
    });
  }
}

export default async function PreconstructionPageRoute(): Promise<React.ReactElement> {
  const data = await getPreconstructionPage().catch((error) => {
    console.error("Failed to fetch preconstruction page:", error);
    return null as PreconstructionPage | null;
  });

  return <PreconstructionSections data={data} />;
}
