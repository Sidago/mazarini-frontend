import { getStrapiUrl, strapiGet } from "@/lib/api/client";
import type {
  Contact,
  ContactSubmissionPayload,
  StrapiResponse,
} from "@/lib/types/strapi";

export async function getContact(): Promise<Contact> {
  const res = await strapiGet<StrapiResponse<Contact>>("/contact", {
    "populate[heroVideo]": "true",
    "populate[heroImage]": "true",
  });
  return res.data;
}

const STRAPI_URL = getStrapiUrl();

export async function submitContactForm(
  data: ContactSubmissionPayload,
  files: File[],
): Promise<void> {
  let res: Response;

  if (files.length > 0) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    for (const file of files) {
      formData.append("files.attachments", file);
    }
    res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
      method: "POST",
      body: formData,
    });
  } else {
    res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(
      errorBody?.error?.message ?? `Submission failed: ${res.status} ${res.statusText}`,
    );
  }
}
