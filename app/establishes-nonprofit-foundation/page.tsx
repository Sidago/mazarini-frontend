export const revalidate = 300;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEstablishesNonprofitFoundationPage } from "@/lib/api/establishes-nonprofit-foundation";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getEstablishesNonprofitFoundationPage().catch(() => null);
    return buildMetadata({
      seo: data?.seo,
      fallbackTitle:
        data?.title ??
        "Mazarini Contracting Establishes Nonprofit Foundation | Mazarini Inc.",
      fallbackDescription:
        data?.subheading ??
        "The Mazarini Foundation will be focused on investing in education, health and wellness, and community building to impact the construction industry and local communities.",
      fallbackImage: data?.heroImage,
    });
  } catch {
    return buildMetadata({
      fallbackTitle:
        "Mazarini Contracting Establishes Nonprofit Foundation | Mazarini Inc.",
      fallbackDescription:
        "The Mazarini Foundation will be focused on investing in education, health and wellness, and community building to impact the construction industry and local communities.",
    });
  }
}

export default async function EstablishesNonprofitFoundation(): Promise<React.ReactElement> {
  const data = await getEstablishesNonprofitFoundationPage().catch(() => null);

  const heroImageUrl =
    getStrapiMediaUrl(data?.heroImage ?? null) ||
    "/images/foundation/hero.jpg";

  const gallery1Url =
    getStrapiMediaUrl(data?.galleryImage1 ?? null) ||
    "/images/foundation/feed-more.jpeg";

  const gallery2Url =
    getStrapiMediaUrl(data?.galleryImage2 ?? null) ||
    "/images/foundation/awareness.jpeg";

  const gallery3Url =
    getStrapiMediaUrl(data?.galleryImage3 ?? null) ||
    "/images/foundation/fundraiser.jpeg";

  const gallery4Url =
    getStrapiMediaUrl(data?.galleryImage4 ?? null) ||
    "/images/foundation/habitat.jpeg";

  const promoProjectsImgUrl =
    getStrapiMediaUrl(data?.promoProjectsImage ?? null) ||
    "/images/foundation/promo-projects.jpg";

  const promoExperienceImgUrl =
    getStrapiMediaUrl(data?.promoExperienceImage ?? null) ||
    "/images/foundation/promo-experience.jpg";

  return (
    <div className="bg-white dark:bg-background-dark min-h-screen text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* ── Main Article Container ── */}
      <article className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-40 pb-16">
        {/* Featured Hero Banner */}
        <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-md">
          <Image
            src={heroImageUrl}
            alt={
              data?.heroImage?.alternativeText ??
              "Mazarini team members packaging meals to support the community"
            }
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>

        {/* Article Meta Header */}
        <div className="mt-10 sm:mt-12">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase mb-3">
            {data?.category ?? "News"} | {data?.publishedDate ?? "Jan 5, 2022"}
          </p>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-neutral-900 dark:text-white leading-[1.15] tracking-tight mb-8">
            {data?.title ?? "Mazarini Contracting Establishes Nonprofit Foundation"}
          </h1>

          {/* Subheading / Mission statement */}
          <h2 className="font-serif font-bold italic text-xl sm:text-2xl md:text-[26px] text-neutral-900 dark:text-neutral-100 leading-snug mb-10">
            {data?.subheading ??
              "The Mazarini Foundation will be focused on investing in education, health and wellness, and community building to impact the construction industry and local communities"}
          </h2>
        </div>

        {/* Body Text */}
        <div className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-6">
          <p>
            {data?.paragraph1 ??
              "Mazarini is proud to announce the establishment of the Mazarini Foundation, a 501(c)(3) nonprofit that will allow the firm to further achieve its mission and purpose. The Mazarini Foundation was funded by a $10 million seed investment from the prior year’s earnings and a commitment from the estate of Chairman Emeritus Russell Mazarini."}
          </p>

          <p>
            {data?.paragraph2 ??
              "Russell was passionate about giving, both philanthropically and through volunteerism, and his spirit will live on through the impacts of the Mazarini Foundation. Russell’s generosity has helped shape Mazarini’s mission to improve the lives of Mazarini’s team members, partners, and subcontractors through investments in technology, education, relationships, and community."}
          </p>

          <p>
            {data?.paragraph3 ??
              "“Russell cared deeply about giving back to both the construction industry and the local community. As a result, a philanthropic commitment to our local communities is truly engrained in our team culture at Mazarini. I’m honored that we can continue his long legacy of giving and making a difference through this new foundation,” said CEO Kim Roy."}
          </p>

          <p>
            {data?.paragraph4 ??
              "The Foundation will invest in the three key areas, as defined by Mazarini’s corporate social responsibility program: education, health and wellness, and community building. The Foundation is committed to developing the next generation of builders and innovative practices through scholarships and endowments, supporting institutions that focus on improving collective wellbeing through treatment, awareness, and research and development, and supporting local and national organizations that impact the communities where Mazarini team members live and work."}
          </p>

          <p>
            {data?.paragraph5 ??
              "Forming the Mazarini Foundation will enable Mazarini to unify its philanthropic efforts and maximize giving impact in a time when it’s needed more than ever."}
          </p>

          <p>
            To learn more about Mazarini’s corporate responsibility efforts, visit{" "}
            <Link
              href={data?.crLinkUrl ?? "/corporate-responsibility"}
              className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 underline font-medium transition-colors"
            >
              {data?.crLinkText ?? "mazarini.com/corporate-responsibility"}
            </Link>
          </p>
        </div>

        {/* Divider */}
        <hr className="border-t border-neutral-200 dark:border-neutral-800 my-12" />

        {/* ── 2x2 Photo Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 dark:bg-neutral-900 group">
            <Image
              src={gallery1Url}
              alt={
                data?.galleryImage1?.alternativeText ??
                "Mazarini Richmond team volunteered with Feed More"
              }
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 dark:bg-neutral-900 group">
            <Image
              src={gallery2Url}
              alt={
                data?.galleryImage2?.alternativeText ??
                "Mazarini Atlanta team honors former team member Charlotte Smith for Breast Cancer Awareness Month"
              }
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 dark:bg-neutral-900 group">
            <Image
              src={gallery3Url}
              alt={
                data?.galleryImage3?.alternativeText ??
                "Mazarini Ft. Lauderdale team local 5k fundraiser in Miami"
              }
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 dark:bg-neutral-900 group">
            <Image
              src={gallery4Url}
              alt={
                data?.galleryImage4?.alternativeText ??
                "Mazarini Los Angeles team builds a house with Habitat for Humanity LA"
              }
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Grid Caption */}
        <p className="mt-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 italic leading-relaxed">
          {data?.galleryCaption ??
            "(L-R) Mazarini's Richmond team volunteered with Feed More, Mazarini's Atlanta team honors former team member Charlotte Smith for Breast Cancer Awareness Month, Mazarini's Ft. Lauderdale team gets together for a local 5k fundraiser in Miami, and Mazarini's Los Angeles team builds a house with Habitat for Humanity LA"}
        </p>
      </article>

      {/* ── Bottom Dual-Promo Section ("Projects" and "The Mazarini Experience") ── */}
      <section className="w-full bg-black text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/15">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Projects */}
            <Link
              href={data?.promoProjectsUrl ?? "/projects"}
              className="group relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-neutral-900 flex flex-col justify-end"
            >
              <Image
                src={promoProjectsImgUrl}
                alt={
                  data?.promoProjectsImage?.alternativeText ??
                  (data?.promoProjectsTitle ?? "Projects")
                }
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

              <div className="relative z-10 flex items-center justify-between p-6 sm:p-8">
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-primary transition-colors">
                  {data?.promoProjectsTitle ?? "Projects"}
                </h3>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-black flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Card 2: The Mazarini Experience */}
            <Link
              href={data?.promoExperienceUrl ?? "/experience"}
              className="group relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-neutral-900 flex flex-col justify-end"
            >
              <Image
                src={promoExperienceImgUrl}
                alt={
                  data?.promoExperienceImage?.alternativeText ??
                  (data?.promoExperienceTitle ?? "The Mazarini Experience")
                }
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

              <div className="relative z-10 flex items-center justify-between p-6 sm:p-8">
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-primary transition-colors">
                  {data?.promoExperienceTitle ?? "The Mazarini Experience"}
                </h3>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-black flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}