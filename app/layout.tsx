import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import { Header } from "@/components/layout/header";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { PageLoader } from "@/components/ui/page-loader";
import { getGlobal } from "@/lib/api/global";
import { getServices } from "@/lib/api/services";
import { buildMetadata } from "@/lib/utils/seo";
import "./globals.css";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { SubNavItem } from "@/lib/types/strapi";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const global = await getGlobal();
    return buildMetadata({
      seo: global.defaultSeo,
      fallbackTitle: "Mazarini Inc. | Building America",
      fallbackDescription: global.siteDescription,
    });
  } catch {
    return buildMetadata({
      fallbackTitle: "Mazarini Inc. | Building America",
      fallbackDescription: "Mazarini Inc. delivers precision construction and architectural excellence across America. Building tomorrow's landmarks today.",
    });
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  let global = null;
  let fabIcon = undefined;
  try {
    global = await getGlobal();
    fabIcon = getStrapiMediaUrl(global?.favicon);
  } catch {
    // Strapi may be unavailable — render with fallback
  }

  // Auto-populate "Services" sub-nav with actual service entries
  let subNavItems: SubNavItem[] = global?.sub_nav_items ?? [];
  try {
    const services = await getServices();
    subNavItems = subNavItems.map((item) => {
      if (item.slug !== "services") return item;
      return {
        ...item,
        subItems: services.map((s) => ({
          id: s.id,
          name: s.title,
          linkTo: `/services/${s.slug}`,
          image: s.image,
        })),
      };
    });
  } catch {
    // Services unavailable — keep original sub-nav items
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={fabIcon} sizes="32x32" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${notoSerif.variable} font-display bg-background-light dark:bg-background-dark text-neutral-800 dark:text-neutral-100 antialiased selection:bg-primary selection:text-white`}>
        <PageLoader />
        <Header
          logo={global?.logo ?? null}
          navLinks={global?.navLinks ?? []}
          subNavItems={subNavItems}
          ctaText={global?.headerCtaText ?? "Work With Us"}
          ctaUrl={global?.headerCtaUrl ?? "/career"}
        />
        <main>{children}</main>
        <ConditionalFooter
          description={global?.footerDescription ?? null}
          columns={global?.footerColumns ?? []}
          socialLinks={global?.socialLinks ?? []}
          copyright={global?.copyright ?? null}
          bottomLinks={global?.bottomLinks ?? []}
        />
      </body>
    </html>
  );
}
