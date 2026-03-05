import { Location, LocationPage, StrapiResponse } from "../types/strapi";
import { strapiGet } from "./client";

export async function getLocationPage(): Promise<LocationPage> {
  const res = await strapiGet<StrapiResponse<LocationPage>>("/location", {
    "populate[heroVideo]": "true",
    "populate[heroImage]": "true",
  });
  return res.data;
}

export async function getLocations(): Promise<Location[]> {
  const res = await strapiGet<StrapiResponse<Location[]>>("/location-lists");
  return res.data;
}
