"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IPostConstructionPage, AccordionItem, StatComponent, CultureCard, CareerQuote } from "@/lib/types/strapi";
import { AwardHeroSection } from "../award/award-hero-section";
import { IntroSection } from "../home/intro-section";
import { AccordionSection } from "../safety/accordion-section";
import { StatsBar } from "../home/stats-bar";
import { CultureSection } from "../about/culture-section";

const FALLBACK_QUOTES: CareerQuote[] = [
  {
    id: 1,
    text: "MAZARINI has been a valued partner and trusted advocate to us and our clients for over a decade. Working with them as the project manager or engineer of record, we have come to expect value, honesty, commitment, and accountability. They are excellent communicators and are always willing to go the extra step to make our clients feel well cared for, even well after the project completion date.",
    authorName: "Michael R. Henderson",
    authorPosition: "Senior Project Director, Global Real Estate & Development",
    contactUrl: null,
    authorImage: null,
  },
  {
    id: 2,
    text: "We have a long-standing history with MAZARINI. They are great partners with vision and provide an exceptional quality of service. The team is consistently looking ahead to identify issues before they become problems. We trust them, and frankly, I sleep better at night knowing MAZARINI is managing our turnover and operations!",
    authorName: "Sarah Jenkins, AIA",
    authorPosition: "Principal Architect, Nexus Design Studio",
    contactUrl: null,
    authorImage: null,
  },
  {
    id: 3,
    text: "One of the best things about working with MAZARINI has been their willingness to step up and step in to help the whole project team. They are always solution-oriented, which creates enhanced collaboration and results in superior outcomes for all project stakeholders.",
    authorName: "David Vance",
    authorPosition: "Managing Director, Urban Horizon Properties",
    contactUrl: null,
    authorImage: null,
  },
  {
    id: 4,
    text: "MAZARINI has a special way of staying organized. In a market where project schedules are tighter and lead times are longer, MAZARINI properly manages expectations with owners and subcontractors to get the project done the right way.",
    authorName: "Robert Sterling",
    authorPosition: "Vice President of Facilities, Apex Enterprise Solutions",
    contactUrl: null,
    authorImage: null,
  },
];

const FALLBACK_ACCORDION_ITEMS: AccordionItem[] = [
  {
    id: 1,
    title: "A Lasting Relationship",
    description:
      "The sun is setting, we’ve unbuckled our hard hats one last time, and as we drive away we take one last look at our project in the rear-view mirror. It’s a MAZARINI tradition in that moment to connect with our client to express our gratitude and thanks for the trust you have placed in us. While the physical building is complete, our post-construction partnership has just begun.",
    image: null,
  },
  {
    id: 2,
    title: "Ongoing Support & Operations Manuals",
    description:
      "Buildings are complex, full of advanced technology and intricate systems, so it’s natural you’ll have operational questions. As part of our turnover process, MAZARINI provides a comprehensive close-out package that includes complete digital operations and maintenance (O&M) manuals, warranty registers, and subcontractor directories. We remain on-call to provide hands-on system training for your facility management and engineering teams.",
    image: null,
  },
  {
    id: 3,
    title: "Commercial Services & Building Maintenance",
    description:
      "Did you know MAZARINI provides ongoing maintenance and small-project service work? We want to be the only general contractor you ever need to call, even for specialized adjustments or minor capital improvements. You can expect the exact same MAZARINI quality, speed, and professionalism as we offer on major landmark builds. Our dedicated commercial services team handles ongoing building solutions for clients across both private and public sectors.",
    image: null,
  },
  {
    id: 4,
    title: "Continuous Improvement & Project Scorecards",
    description:
      "Open and honest conversations about our performance provide the insights we need to get better with every single build. We’ve formalized this commitment through structured post-occupancy reviews, milestone debriefs, and project performance scorecards. We're grateful for the insights our clients share, as they directly shape our strategic standards and help us elevate the business of building.",
    image: null,
  },
];

const FALLBACK_STATS: StatComponent[] = [
  {
    id: 1,
    value: "86%",
    suffix: "",
    label: "Extremely Easy Experience",
    description: "86% of our clients said their building experience with MAZARINI was extremely easy.",
  },
  {
    id: 2,
    value: "90%",
    suffix: "",
    label: "Top Technical Expertise",
    description: "90% of clients ranked our teams as the best in the business for technical expertise and communication.",
  },
  {
    id: 3,
    value: "90%",
    suffix: "",
    label: "Flawless Final Product",
    description: "90% of our clients ranked the quality of MAZARINI's final delivered space as nearly perfect.",
  },
  {
    id: 4,
    value: "83%",
    suffix: "",
    label: "Repeat Client Rate",
    description: "A referral or new opportunity is the best measure of our performance. Over 83% of our customers are repeat clients.",
  },
];

const FALLBACK_CARDS: CultureCard[] = [
  {
    id: 1,
    title: "Work With MAZARINI",
    description: "Explore our commercial building services, small project divisions, or start a conversation for an upcoming build.",
    url: "/contact",
    tag: "Commercial Services",
    image: null,
  },
  {
    id: 2,
    title: "Our Leadership Team",
    description: "Connect directly with our sector leaders, project executives, and post-construction specialists.",
    url: "/leadership",
    tag: "Leadership",
    image: null,
  },
  {
    id: 3,
    title: "Coast-to-Coast Reach",
    description: "Discover our regional offices and see how our traveling builder model delivers projects wherever you expand.",
    url: "/location",
    tag: "Locations",
    image: null,
  },
  {
    id: 4,
    title: "Featured Projects",
    description: "Browse our recent commercial, industrial, and specialized projects delivered on time and within budget.",
    url: "/projects",
    tag: "Portfolio",
    image: null,
  },
];

function PostConstructionQuotesSection({
  quotes,
}: {
  quotes: CareerQuote[];
}): React.ReactElement {
  const [index, setIndex] = useState(0);

  if (quotes.length === 0) return <></>;

  const active = quotes[index];

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + quotes.length) % quotes.length);
  };

  return (
    <section className="relative w-full bg-neutral-950 text-white overflow-hidden py-20 lg:py-32">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Big quote mark */}
        <div
          className="pointer-events-none text-[10rem] absolute left-0 top-0 lg:text-[14rem] leading-[0.6] font-serif text-primary/30 select-none"
          aria-hidden="true">
          &ldquo;
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id ?? index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="-mt-8">
            {active.text && (
              <blockquote className="font-serif leading-relaxed text-xl lg:text-2xl text-white mb-8 whitespace-pre-line">
                {active.text}
              </blockquote>
            )}

            <div>
              {active.authorName && (
                <p className="font-bold text-white uppercase tracking-widest text-sm">
                  {active.authorName}
                </p>
              )}
              {active.authorPosition && (
                <p className="text-white/60 text-sm mt-1">
                  {active.authorPosition}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / next arrow buttons */}
        {quotes.length > 1 && (
          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous quote"
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-neutral-900 hover:bg-amber-400 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12l7 7M5 12l7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next quote"
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-neutral-900 hover:bg-amber-400 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function PostConstructionSections({
  data,
}: {
  data: IPostConstructionPage | null;
}): React.ReactElement {
  const quotes = (data?.quotes && data.quotes.length > 0) ? data.quotes : FALLBACK_QUOTES;
  const accordionItems = (data?.accordionItems && data.accordionItems.length > 0) ? data.accordionItems : FALLBACK_ACCORDION_ITEMS;
  const stats = (data?.stats && data.stats.length > 0) ? data.stats : FALLBACK_STATS;
  const conversationCards = (data?.conversationBlock && data.conversationBlock.length > 0) ? data.conversationBlock : FALLBACK_CARDS;

  return (
    <main>
      <AwardHeroSection data={data} />
      
      <IntroSection
        heading={data?.trustTitle || "Your Trusted Advisor"}
        highlightText={"Trusted"}
        description={
          data?.trustText ||
          "Each project is a part of the greater whole – the long-lasting relationships, partnerships, and friendships we've built our business on. We want to learn from each experience and invite constructive feedback from our project stakeholders. Our goal is to always be better than we were yesterday, ensuring MAZARINI is the first call when you're ready to explore something new."
        }
      />

      <PostConstructionQuotesSection quotes={quotes} />

      <AccordionSection
        title="Support Beyond Completion"
        details="Buildings are complex environments with sophisticated mechanical, electrical, and structural systems. Our post-construction services ensure a seamless transition from final inspection to long-term operations."
        image={data?.heroImage ?? null}
        items={accordionItems}
      />

      <StatsBar
        description="Our commitment to seamless close-out, proactive communication, and lasting client relationships is reflected in our performance metrics."
        stats={stats}
      />

      <CultureSection
        heading={data?.conversationTitle || "Ready for What’s Next?"}
        description={
          data?.conversationText ||
          "There are many ways to get in touch with MAZARINI, whether you are looking for post-construction maintenance, subject matter expertise, or an exploratory conversation for your next project."
        }
        watermark={data?.conversationWatermark || "Let's Connect"}
        cards={conversationCards}
      />
    </main>
  );
}