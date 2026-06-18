"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { SubNav } from "@/components/layout/sub-nav";
import { Icon } from "@/components/ui/icon";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchModal } from "@/components/ui/search-modal";
import type {
  LinkComponent,
  StrapiMedia,
  SubNavItem,
} from "@/lib/types/strapi";

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
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const FORCE_ACTIVE_PATHS = ["/leadership", "/insights/", "/contact"];
  const active = scrolled || hovered || FORCE_ACTIVE_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    function handleScroll(): void {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const midpoint = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, midpoint);
  const rightLinks = navLinks.slice(midpoint);

  return (
    <header
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        active ? "bg-white" : "bg-transparent"
      }`}>
      {/* Top utility bar */}
      <div
        className={`border-b ${active ? "border-black/20" : "border-white/15"}`}>
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-17">
            {/* Left utility links */}
            <div className="hidden md:flex items-center gap-6">
              <button
                aria-label="Search"
                className={`p-1 hover:text-white transition-colors ${active ? "text-black/70" : "text-white/70"}`}
                onClick={() => setIsSearchOpen(true)}>
                <Icon name="search" />
              </button>
              {leftLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors ${active ? "text-black/90 hover:text-black/60" : "text-white/90 hover:text-white/60"}`}
                  {...(link.isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}>
                  {link.text}
                </Link>
              ))}
            </div>

            {/* Mobile search button */}
            <button
              aria-label="Search"
              className={`md:hidden p-1 hover:text-white transition-colors ${active ? "text-black/70" : "text-white/70"}`}
              onClick={() => setIsSearchOpen(true)}>
              <Icon name="search" />
            </button>

            {/* Center logo */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 ${active ? "text-black/70" : "text-white/70"}`}>
              <Logo logo={logo} scrolled={active} />
            </div>

            {/* Right utility links + CTA */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              {rightLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className={`text-xs font-semibold uppercase tracking-widest ${active ? "text-black/90 hover:text-black/60" : "text-white/90 hover:text-white/60"} transition-colors`}
                  {...(link.isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}>
                  {link.text}
                </Link>
              ))}
              <Link
                href={ctaUrl}
                className="inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-widest text-neutral-900 bg-primary hover:bg-amber-500 transition-all">
                {ctaText}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <MobileMenu
              navLinks={navLinks}
              subNavItems={subNavItems}
              ctaText={ctaText}
              ctaUrl={ctaUrl}
              scrolled={active}
              onSearchOpen={() => setIsSearchOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <SubNav items={subNavItems} scrolled={active} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
