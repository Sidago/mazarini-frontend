import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { SubNav } from "@/components/layout/sub-nav";
import { Icon } from "@/components/ui/icon";
import { MobileMenu } from "@/components/layout/mobile-menu";
import type { LinkComponent, StrapiMedia, SubNavItem } from "@/lib/types/strapi";

interface HeaderProps {
  logo: StrapiMedia | null;
  navLinks: LinkComponent[];
  subNavItems: SubNavItem[];
  ctaText: string;
  ctaUrl: string;
}

export function Header({
  logo,
  navLinks,
  subNavItems,
  ctaText,
  ctaUrl,
}: HeaderProps): React.ReactElement {
  const midpoint = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, midpoint);
  const rightLinks = navLinks.slice(midpoint);

  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left utility links */}
            <div className="hidden md:flex items-center gap-6">
              <button
                aria-label="Search"
                className="p-1 text-white/70 hover:text-white transition-colors"
              >
                <Icon name="search" />
              </button>
              {leftLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                  {...(link.isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.text}
                </Link>
              ))}
            </div>

            {/* Center logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Logo logo={logo} />
            </div>

            {/* Right utility links + CTA */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              {rightLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                  {...(link.isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.text}
                </Link>
              ))}
              <Link
                href={ctaUrl}
                className="inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-widest text-neutral-900 bg-primary hover:bg-amber-500 transition-all"
              >
                {ctaText}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <MobileMenu
              navLinks={navLinks}
              subNavItems={subNavItems}
              ctaText={ctaText}
              ctaUrl={ctaUrl}
            />
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <SubNav items={subNavItems} />
    </header>
  );
}
