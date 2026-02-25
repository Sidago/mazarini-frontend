"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { LinkComponent, SubNavItem } from "@/lib/types/strapi";

interface MobileMenuProps {
  navLinks: LinkComponent[];
  subNavItems: SubNavItem[];
  ctaText: string;
  ctaUrl: string;
}

export function MobileMenu({
  navLinks,
  subNavItems,
  ctaText,
  ctaUrl,
}: MobileMenuProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden ml-auto">
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="p-2 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name={isOpen ? "close" : "menu"} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-20 z-100 bg-neutral-900/98 backdrop-blur-md overflow-y-auto">
          <div className="px-6 py-8 flex flex-col gap-6">
            {/* Main nav items */}
            {subNavItems.map((item) => (
              <div key={item.id} className="border-b border-white/10 pb-4">
                <p className="text-sm font-bold uppercase tracking-widest text-white mb-3">
                  {item.name}
                </p>
                {item.subItems.length > 0 && (
                  <div className="flex flex-col gap-2 pl-4">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.linkTo ?? "#"}
                        className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-wide"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Utility links */}
            <div className="border-b border-white/10 pb-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                  {...(link.isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.text}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={ctaUrl}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold uppercase tracking-widest text-neutral-900 bg-primary hover:bg-amber-500 transition-all"
              onClick={() => setIsOpen(false)}
            >
              {ctaText}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
