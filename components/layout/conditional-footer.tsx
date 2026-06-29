"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import type {
  FooterColumnComponent,
  SocialLinkComponent,
  LinkComponent,
} from "@/lib/types/strapi";

interface ConditionalFooterProps {
  description: string | null;
  columns: FooterColumnComponent[];
  socialLinks: SocialLinkComponent[];
  copyright: string | null;
  bottomLinks: LinkComponent[];
}

export function ConditionalFooter(props: ConditionalFooterProps) {
  const pathname = usePathname();
  if (
    pathname.startsWith("/experience") ||
    pathname.startsWith("/rd") ||
    pathname.startsWith("/corporate-responsibility") ||
    pathname.startsWith("/colab") ||
    pathname.startsWith("/you-belong-here")
  )
    return null;
  return <Footer {...props} />;
}
