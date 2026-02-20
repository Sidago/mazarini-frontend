import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { NavLinks } from "@/components/layout/nav-links";
import { Icon } from "@/components/ui/icon";
import type { LinkComponent, StrapiMedia } from "@/lib/types/strapi";

interface HeaderProps {
  logo: StrapiMedia | null;
  navLinks: LinkComponent[];
  ctaText: string;
  ctaUrl: string;
}

export function Header({
  logo,
  navLinks,
  ctaText,
  ctaUrl,
}: HeaderProps): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-[1px] transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Logo logo={logo} />
          </div>
          <NavLinks links={navLinks} />
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="p-2 text-neutral-300 hover:text-primary transition-colors">
              <Icon name="search" />
            </button>
            <Link
              href={ctaUrl}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold text-white bg-primary hover:bg-amber-600 transition-all rounded shadow-lg shadow-primary/20 uppercase tracking-wide">
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
