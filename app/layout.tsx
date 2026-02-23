import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getGlobal } from "@/lib/api/global";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const global = await getGlobal();
    return {
      title: global.defaultSeo?.metaTitle ?? global.siteName,
      description:
        global.defaultSeo?.metaDescription ?? global.siteDescription ?? "",
    };
  } catch {
    return {
      title: "Mazzarini Group",
      description:
        "Modern construction and real estate development company. Leading the way in sustainable commercial and residential development.",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  let global = null;
  try {
    global = await getGlobal();
  } catch {
    // Strapi may be unavailable — render with fallback
  }

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-display bg-background-light dark:bg-background-dark text-neutral-800 dark:text-neutral-100 antialiased selection:bg-primary selection:text-white`}
      >
        <Header
          logo={global?.logo ?? null}
          navLinks={global?.navLinks ?? []}
          subNavItems={global?.sub_nav_items ?? []}
          ctaText={global?.headerCtaText ?? "Work With Us"}
          ctaUrl={global?.headerCtaUrl ?? "#contact"}
        />
        <main>{children}</main>
        <Footer
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
