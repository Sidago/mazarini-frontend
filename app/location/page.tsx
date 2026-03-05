import { ImgOrVideoHero } from "@/components/common/img-video-hero";
import { LocationList } from "@/components/location/location-list";
import { getLocationPage, getLocations } from "@/lib/api/location";
import { Location, type LocationPage } from "@/lib/types/strapi";
import React from "react";

export const metadata = {
  title: "Our Locations | Mazzarini Group",
  description:
    "Discover Mazzarini Group's global presence. Explore our offices and project locations worldwide.",
};

const FALLBACK_LOCATION: LocationPage = {
  id: 0,
  documentId: "",
  title: "Our Locations",
  heroTitle: "Our Locations",
  heroText:
    "Discover Mazzarini Group's global presence. Explore our offices and project locations worldwide.",
  heroVideo: null,
  heroImage: null,
};

export async function LocationPage(): Promise<React.ReactElement> {
  let locationPage: LocationPage = FALLBACK_LOCATION;
  let locations: Location[] = [];

  try {
    [locationPage, locations] = await Promise.all([
      getLocationPage().catch(() => FALLBACK_LOCATION),
      getLocations().catch(() => [] as Location[]),
    ]);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }

  return (
    <>
      <ImgOrVideoHero
        title={locationPage.heroTitle}
        text={locationPage.heroText}
        heroVideo={locationPage?.heroVideo}
        heroImage={locationPage?.heroImage}
      />
      <LocationList locations={locations} />
    </>
  );
}

export default LocationPage;
