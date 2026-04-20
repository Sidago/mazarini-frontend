import Link from "next/link";
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

const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export function Footer({
  columns,
  socialLinks,
  copyright,
  bottomLinks,
}: FooterProps): React.ReactElement {
  return (
    <>
      {/*
      ── OLD FOOTER ─────────────────────────────────────────────────────────────
      Uncomment below (and comment the NEW FOOTER section) to restore old design.

      <footer className="bg-white dark:bg-background-dark border-t border-neutral-200 dark:border-neutral-800 pt-20 pb-10">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="mb-6"><Logo size="small" /></div>
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
                links={column.links.map((link) => ({ label: link.text, href: link.url }))}
              />
            ))}
            <NewsletterForm />
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
            <p>{copyright ?? "© 2024 Mazarini Group. All rights reserved."}</p>
            <div className="flex gap-6">
              {bottomLinks.map((link) => (
                <Link key={link.id} href={link.url} className="hover:text-primary transition-colors">
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
      ─────────────────────────────────────────────────────────────────────────── */}

      {/* ── NEW FOOTER ── */}
      <footer className="bg-black text-white border-t border-white/20">
        {/* Main section */}
        <div className="max-w-360 mx-auto px-8 md:px-16 py-20 flex flex-col lg:flex-row justify-between items-start gap-16">
          {/* Left: headline + circular contact CTA */}
          <div className="flex flex-col gap-10">
            <h2 className="font-headline font-semibold text-4xl lg:text-5xl text-white tracking-tight leading-none">
              Let&apos;s chat.
            </h2>

            <Link
              href="/contact"
              className="group relative w-42 h-42 flex items-center justify-center">
              {/* Rotating circle text */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow-ccw"
                viewBox="0 0 176 176">
                <defs>
                  <path
                    id="footer-circle-path"
                    d="M 88,88 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
                  />
                </defs>
                <text fill="white" fontSize="11.5" fontWeight="600">
                  <textPath
                    href="#footer-circle-path"
                    textLength="420"
                    lengthAdjust="spacing">
                    CONTACT US TODAY · CONTACT US TODAY · CONTACT US TODAY ·
                  </textPath>
                </text>
              </svg>

              {/* Arrow */}
              <svg
                className="w-9 h-9 text-primary group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right: nav columns */}
          {columns.length > 0 && (
            <div className="flex gap-16 lg:gap-24 items-start pt-4">
              {columns.map((column) => (
                <div key={column.id}>
                  <h4 className="text-xs text-white/70 uppercase tracking-widest mb-6">
                    {column.title}
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {column.links.map((link) => (
                      <li key={link.id}>
                        <Link
                          href={link.url}
                          className="text-sm font-bold text-white uppercase tracking-widest hover:text-primary transition-colors">
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/30">
          <div className="max-w-360 mx-auto px-8 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-white/70 uppercase tracking-widest">
              {bottomLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="hover:text-white transition-colors">
                  {link.text}
                </Link>
              ))}
              {copyright && <span>&copy; {copyright}</span>}
            </div>

            <div className="flex gap-5">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-primary transition-colors">
                  <span className="sr-only">{link.platform}</span>
                  {SOCIAL_ICONS[link.platform]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
