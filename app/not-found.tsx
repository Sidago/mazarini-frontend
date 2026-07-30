import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Mazarini Inc.",
  description: "The page you're looking for could not be found.",
};

export default function NotFound(): React.ReactElement {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background-dark text-white px-6 py-32 text-center">
      {/* Local public asset — plain img to bypass the custom Strapi next/image loader. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/Logo.png"
        alt="Mazarini"
        className="h-14 w-auto object-contain mb-12"
      />

      <p className="text-7xl sm:text-8xl lg:text-9xl font-serif font-black text-primary leading-none">
        404
      </p>

      <h1 className="mt-6 text-2xl sm:text-3xl font-serif font-bold">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-base text-white/60 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back on track.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-neutral-900 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-neutral-900 transition-colors">
          Contact Us
        </Link>
      </div>
    </main>
  );
}
