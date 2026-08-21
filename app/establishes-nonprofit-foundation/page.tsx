import { buildMetadata } from "@/lib/utils/seo"
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  try {
    // const data = await getCorporateResponsibilityPage();
    const data:any = {}
    return buildMetadata({
      seo: data.seo,
      fallbackTitle: "Establishing a Nonprofit Foundation | Mazarini Inc.",
      fallbackDescription: "Establishing a Nonprofit Foundation: A Guide to Structuring and Operating a Charitable Entity",
      fallbackImage: null,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Establishing a Nonprofit Foundation | Mazarini Inc.",
      fallbackDescription: "Establishing a Nonprofit Foundation: A Guide to Structuring and Operating a Charitable Entity",
    });
  }
}

export default async function EstablishesNonprofitFoundation() {

    return <div className="flex justify-center pt-20 w-full h-full items-center text-3xl"> Establish non profit foundation  </div>
} 