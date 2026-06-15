import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Teams } from "@/lib/types/strapi";
import { FadeIn } from "@/components/ui/fade-in";

interface TeamListProps {
  teams: Teams[];
}

const SECTIONS = [
  "Key Leadership",
  "Executive Leadership",
  "Senior Leadership",
] as const;

export default function TeamList({ teams }: TeamListProps): React.ReactElement {
  return (
    <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
        {SECTIONS.map((section) => {
          const members = teams.filter((t) => t.catagory === section);
          if (members.length === 0) return null;
          return (
            <div key={section}>
              <FadeIn direction="up">
                <h2 className="font-serif text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-10 text-center">
                  {section}
                </h2>
              </FadeIn>
              <div className="flex flex-wrap justify-center gap-8">
                {members.map((member, i) => (
                  <FadeIn key={member.id} direction="up" delay={i * 0.05}>
                    <TeamCard member={member} />
                  </FadeIn>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

interface TeamCardProps {
  member: Teams;
}

function TeamCard({ member }: TeamCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(member.image);

  return (
    <div className="group flex flex-col justify-center items-center">
      <div className="relative w-65 h-75 overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 260px"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700" />
        )}
      </div>
      <h3 className="text-base font-serif font-bold text-neutral-900 dark:text-white leading-snug">
        {member.name}
      </h3>
      <p className="text-sm font-serif text-neutral-500 dark:text-neutral-400 mt-0.5">
        {member.position}
      </p>
      {member.location && (
        <p className="text-xs font-serif text-neutral-400 dark:text-neutral-500 mt-0.5">
          {member.location}
        </p>
      )}
    </div>
  );
}
