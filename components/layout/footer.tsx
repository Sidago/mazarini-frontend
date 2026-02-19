import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { FooterLinkColumn } from "@/components/layout/footer-link-column";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { SocialLinks } from "@/components/home/social-links";
import type {
  FooterColumnComponent,
  SocialLinkComponent,
  LinkComponent,
} from "@/lib/types/strapi";

interface FooterProps {
  description: string | null;
  columns: FooterColumnComponent[];
  socialLinks: SocialLinkComponent[];
  copyright: string | null;
  bottomLinks: LinkComponent[];
}

export function Footer({
  description,
  columns,
  socialLinks,
  copyright,
  bottomLinks,
}: FooterProps): React.ReactElement {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-neutral-200 dark:border-neutral-800 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6">
              <Logo size="small" />
            </div>
            {description && (
              <p className="text-neutral-500 dark:text-neutral-400 mb-6 text-sm leading-relaxed">
                {description}
              </p>
            )}
            <SocialLinks links={socialLinks} />
          </div>
          {columns.map((column) => (
            <FooterLinkColumn
              key={column.id}
              title={column.title}
              links={column.links.map((link) => ({
                label: link.text,
                href: link.url,
              }))}
            />
          ))}
          <NewsletterForm />
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
          <p>{copyright ?? "\u00a9 2024 Mazzarini Group. All rights reserved."}</p>
          <div className="flex gap-6">
            {bottomLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="hover:text-primary transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
