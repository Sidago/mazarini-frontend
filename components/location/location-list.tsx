import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import type { Location } from "@/lib/types/strapi";
import { LocationCard } from "./location-card";

interface LocationListProps {
  locations: Location[];
}

export function LocationList({
  locations,
}: LocationListProps): React.ReactElement {
  if (locations.length === 0) {
    return (
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-400 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg text-neutral-500 dark:text-neutral-400">
            No locations available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 bg-background-light dark:bg-background-dark">
      <div className="mx-auto max-w-400 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white sm:text-5xl">
              Our Offices
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Find us around the world. Each office is ready to help you with
              your next project.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <StaggerItem key={location.id}>
              <LocationCard location={location} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
