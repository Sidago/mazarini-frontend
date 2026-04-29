import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import { QuoteCarousel } from "@/components/subcontractors/quote-carousel";
import { OnboardingSection } from "@/components/subcontractors/onboarding-section";
import { ContactForm } from "@/components/contact/contact-form";
import { TradePartnersSection } from "@/components/subcontractors/trade-partners-section";
import { FaqSection } from "@/components/subcontractors/faq-section";
import { getSubcontractorsPage } from "@/lib/api/subcontractors";
import type { SubcontractorsPage } from "@/lib/types/strapi";

export const dynamic = "force-dynamic";

export const metadata = {
  description:
    "Partner with Mazarini Group as a subcontractor. Learn about onboarding, requirements, and how we celebrate our trade partners.",
};

const FALLBACK: SubcontractorsPage = {
  id: 0,
  documentId: "",
  heroTitle: "Subcontractors",
  heroText: "Building together with our valued trade partners.",
  heroVideo: null,
  heroImage: null,
  heroCtaText: null,
  heroCtaUrl: null,
  quoteTitle: null,
  quotes: [],
  onboardingTitle: "Onboarding Information",
  onboardingCtaText: "Begin Onboarding Now",
  onboardingCtaUrl: "#",
  onboardingRequirements: [],
  onboardingExtraTitle: null,
  onboardingExtraRequirements: [],
  formTitle: "Get in Touch",
  formDescription: "Interested in partnering with us? Fill out the form below.",
  tradePartnersTitle: "Celebrating Our Trade Partners",
  tradePartnersDescription:
    "We celebrate the hardworking subcontractors who bring their knowledge and experience to each and every project we build together.",
  tradePartnerTabs: [],
  faqTitle: "Frequently Asked Questions",
  faqDescription:
    "We want to help you get to work with us, so here are some answers to common questions we hear.",
  faqItems: [],
};

export default async function SubcontractorsPage(): Promise<React.ReactElement> {
  let page: SubcontractorsPage = FALLBACK;

  try {
    page = await getSubcontractorsPage();
  } catch (error) {
    // Strapi unavailable — render with fallback data
    console.log(
      "Error patching Subcontractors page data, rendering with fallback content",
      error,
    );
  }

  return (
    <>
      {/* Hero */}
      <ImgOrVideoHero
        title={page.heroTitle}
        text={page.heroText}
        heroVideo={page.heroVideo}
        heroImage={page.heroImage}
        ctaText={page.heroCtaText}
        ctaUrl={page.heroCtaUrl}
      />

      {/* Quote Carousel */}
      {page.quotes.length > 0 && <QuoteCarousel quotes={page.quotes} />}

      {/* Onboarding Information */}
      <OnboardingSection
        title={page.onboardingTitle ?? "Onboarding Information"}
        ctaText={page.onboardingCtaText}
        ctaUrl={page.onboardingCtaUrl}
        requirements={page.onboardingRequirements}
        extraTitle={page.onboardingExtraTitle}
        extraRequirements={page.onboardingExtraRequirements}
      />

      {/* Contact Form */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-350 mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white italic leading-tight">
                {page.formTitle ?? "Get in Touch"}
              </h2>
              {page.formDescription && (
                <p className="mt-4 text-neutral-400 leading-relaxed max-w-md">
                  {page.formDescription}
                </p>
              )}
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Celebrating Our Trade Partners */}
      {page.tradePartnerTabs.length > 0 && (
        <TradePartnersSection
          title={page.tradePartnersTitle ?? "Celebrating Our Trade Partners"}
          description={page.tradePartnersDescription}
          tabs={page.tradePartnerTabs}
        />
      )}

      {/* FAQ */}
      {page.faqItems.length > 0 && (
        <FaqSection
          title={page.faqTitle ?? "Frequently Asked Questions"}
          description={page.faqDescription}
          items={page.faqItems}
        />
      )}
    </>
  );
}
