import PostConstructionSections from "@/components/post-construction/post-construction-section";
import { getPostConstructionPage } from "@/lib/api/post-construction";



export default async function PostConstructionPageRoute(): Promise<React.ReactElement> {
  const data = await getPostConstructionPage().catch((error) => {
    console.error("Failed to fetch post construction page:", error);
    return null;
  });

  return <PostConstructionSections data={data} />;
}