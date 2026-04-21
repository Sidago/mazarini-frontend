"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { LinkComponent, SubNavItem } from "@/lib/types/strapi";

interface MobileMenuProps {
  navLinks: LinkComponent[];
  subNavItems: SubNavItem[];
  ctaText: string;
  ctaUrl: string;
  scrolled?: boolean;
  onSearchOpen?: () => void;
}

export function MobileMenu({
  navLinks,
  subNavItems,
  ctaText,
  ctaUrl,
  scrolled = false,
  onSearchOpen,
}: MobileMenuProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const midpoint = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, midpoint);
  const rightLinks = navLinks.slice(midpoint);

  return (
    <>
      <div className="md:hidden ml-auto">
        <button
          aria-label="Open menu"
          className={`p-2 transition-colors ${scrolled ? "text-neutral-900" : "text-white"}`}
          onClick={() => setIsOpen(true)}>
          <Icon name="menu" />
        </button>
      </div>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-100 bg-neutral-950 flex flex-col transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            aria-hidden={!isOpen}>
            {/* Menu top bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <button
                aria-label="Search"
                className="p-1 text-white/70 hover:text-white transition-colors"
                onClick={() => {
                  onSearchOpen?.();
                  setIsOpen(false);
                }}>
                <Icon name="search" />
              </button>
              <span className="text-sm font-semibold uppercase tracking-widest text-white">
                Menu
              </span>
              <button
                aria-label="Close menu"
                className="p-1 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}>
                <Icon name="close" />
              </button>
            </div>

            {/* Main nav items */}
            <div className="flex-1 overflow-y-auto">
              {subNavItems.map((item, index) => {
                const hasSubItems = item.subItems?.length > 0;
                const isExpanded = expandedIndex === index;
                const slug = item?.slug ?? "/";

                return (
                  <div key={item.id} className="border-b border-white/10">
                    {hasSubItems ? (
                      <button
                        className="w-full flex items-center justify-between px-6 py-5 text-left"
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : index)
                        }>
                        <span className="text-sm font-semibold uppercase tracking-widest text-white">
                          {item.name}
                        </span>
                        <Icon
                          name={isExpanded ? "expand_less" : "chevron_right"}
                          className="text-white/60"
                        />
                      </button>
                    ) : (
                      <Link
                        href={slug === "home" ? "/" : `/${slug}`}
                        className="flex items-center justify-between px-6 py-5"
                        onClick={() => setIsOpen(false)}>
                        <span className="text-sm font-semibold uppercase tracking-widest text-white">
                          {item.name}
                        </span>
                      </Link>
                    )}

                    {hasSubItems && isExpanded && (
                      <div className="pb-3 bg-neutral-900">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.id}
                            href={sub.linkTo ?? "#"}
                            className="flex items-center px-6 py-2 font-medium text-white/70 hover:text-white transition-colors tracking-wide"
                            onClick={() => setIsOpen(false)}>
                            {/* <span className="w-3 h-px bg-primary mr-3 shrink-0" /> */}
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom links */}
            <div className="bg-neutral-900 px-6 py-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex flex-col gap-3">
                  {leftLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.url}
                      className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                      {...(link.isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}>
                      {link.text}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3 items-start">
                  {rightLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.url}
                      className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                      {...(link.isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}>
                      {link.text}
                    </Link>
                  ))}
                  <Link
                    href={ctaUrl}
                    className="mt-1 inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-neutral-900 bg-primary hover:bg-amber-500 transition-all"
                    onClick={() => setIsOpen(false)}>
                    {ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
