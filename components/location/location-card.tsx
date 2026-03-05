import { Icon } from "@/components/ui/icon";
import type { Location } from "@/lib/types/strapi";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({
  location,
}: LocationCardProps): React.ReactElement {
  return (
    <div className="group relative flex flex-col rounded-xl border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
      {/* Map embed */}
      {location.mapEmbedUrl && (
        <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
          <iframe
            src={location.mapEmbedUrl}
            title={`Map of ${location.city}, ${location.state}`}
            className="h-full w-full border-0 grayscale transition-all duration-500 group-hover:grayscale-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* City & State */}
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            {location.city}
          </h3>
          <p className="mt-0.5 text-sm font-medium uppercase tracking-wider text-primary">
            {location.state}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700" />

        {/* Details */}
        <div className="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-start gap-3">
            <Icon
              name="location_on"
              className="mt-0.5 text-lg text-neutral-400 dark:text-neutral-500"
            />
            <span className="leading-relaxed">{location.address}</span>
          </div>

          <a
            href={`tel:${location.phoneNumber}`}
            className="flex items-center gap-3 transition-colors duration-200 hover:text-primary">
            <Icon
              name="phone"
              className="text-lg text-neutral-400 dark:text-neutral-500"
            />
            <span>{location.phoneNumber}</span>
          </a>

          {location?.email && (
            <a
              href={`mailto:${location.email}`}
              className="flex items-center gap-3 transition-colors duration-200 hover:text-primary">
              <Icon
                name="mail"
                className="text-lg text-neutral-400 dark:text-neutral-500"
              />
              <span>{location.email}</span>
            </a>
          )}
        </div>

        {/* Get Directions CTA */}
        {location.mapEmbedUrl && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold uppercase tracking-wider text-primary transition-colors duration-200 hover:text-primary/80">
            Get Directions
            <Icon name="arrow_forward" className="text-base" />
          </a>
        )}
      </div>
    </div>
  );
}
