import { AboutHero } from "@/components/about/about-hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { getGlobal } from "@/lib/api/global";
import { getContact } from "@/lib/api/contact";
import type { Contact, SocialLinkComponent } from "@/lib/types/strapi";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us | Mazzarini Group",
  description:
    "Get in touch with Mazzarini Group. Start a project, ask a question, or explore partnership opportunities.",
};

const FALLBACK_CONTACT: Contact = {
  id: 0,
  documentId: "",
  heroTitle: "Contact Us",
  heroText:
    "We'd love to hear from you. Get in touch and let's build something great together.",
  heroVideo: null,
  heroImage: null,
  formTitle: "Contact us",
  formDescription:
    "Have a project in mind or want to learn more about how we can help? Reach out to our team and we'll get back to you as soon as possible.",
};

export default async function ContactPage(): Promise<React.ReactElement> {
  let contact: Contact = FALLBACK_CONTACT;
  let socialLinks: SocialLinkComponent[] = [];

  try {
    [contact, socialLinks] = await Promise.all([
      getContact().catch(() => FALLBACK_CONTACT),
      getGlobal()
        .then((g) => g.socialLinks ?? [])
        .catch(() => [] as SocialLinkComponent[]),
    ]);
  } catch {
    // Strapi unavailable — render with fallback data
  }

  return (
    <>
      {/* Contact Hero Section like about hero page */}
      <AboutHero
        title={contact.heroTitle}
        text={contact.heroText}
        heroVideo={contact.heroVideo}
        heroImage={contact.heroImage}
      />

      <section className="py-20 md:py-32 bg-background-light">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ContactInfo
              title={contact.formTitle ?? "Contact us"}
              description={
                contact.formDescription ??
                "Have a project in mind or want to learn more about how we can help? Reach out to our team and we'll get back to you as soon as possible."
              }
              socialLinks={socialLinks}
            />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
