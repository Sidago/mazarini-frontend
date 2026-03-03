"use client";

import { type FormEvent, useState, useRef } from "react";
import { submitContactForm } from "@/lib/api/contact";
import type { ContactSubmissionPayload } from "@/lib/types/strapi";

const INQUIRY_OPTIONS = [
  { value: "start-a-project", label: "Start a Project" },
  { value: "general-inquiry", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "careers", label: "Careers" },
  { value: "media", label: "Media" },
  { value: "other", label: "Other" },
];

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  inquiryType: string;
  notes: string;
}

const INITIAL_FORM_STATE: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  inquiryType: "start-a-project",
  notes: "",
};

const INPUT_CLASS =
  "w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-colors placeholder:text-neutral-500";

export function ContactForm(): React.ReactElement {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const selected = e.target.files;
    if (!selected) return;

    for (const file of Array.from(selected)) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(
          `File "${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB limit.`,
        );
        return;
      }
    }
    setFiles((prev) => [...prev, ...Array.from(selected)]);
    setErrorMessage("");
  }

  function removeFile(index: number): void {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const payload: ContactSubmissionPayload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        companyName: form.companyName.trim(),
        inquiryType: form.inquiryType,
        notes: form.notes.trim(),
      };

      await submitContactForm(payload, files);
      setSubmitStatus("success");
      setForm(INITIAL_FORM_STATE);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="bg-neutral-900 rounded-2xl p-8 md:p-12 text-center">
        <span className="material-icons-outlined text-primary text-5xl mb-4 block">
          check_circle
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-neutral-400 mb-6">
          Your message has been sent successfully. We&apos;ll get back to you
          shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus("idle")}
          className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-amber-600 transition-colors uppercase text-sm tracking-wide"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-900 rounded-2xl p-8 md:p-12 space-y-4"
    >
      {/* First Name + Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm text-neutral-400 mb-2"
          >
            First Name <span className="text-primary">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="John"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm text-neutral-400 mb-2"
          >
            Last Name <span className="text-primary">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm text-neutral-400 mb-2"
        >
          Email Address <span className="text-primary">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={INPUT_CLASS}
          placeholder="john@company.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm text-neutral-400 mb-2"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className={INPUT_CLASS}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {/* Company Name */}
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm text-neutral-400 mb-2"
        >
          Company Name <span className="text-primary">*</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          value={form.companyName}
          onChange={handleChange}
          className={INPUT_CLASS}
          placeholder="Acme Inc."
        />
      </div>

      {/* Inquiry Type */}
      <div>
        <label
          htmlFor="inquiryType"
          className="block text-sm text-neutral-400 mb-2"
        >
          Inquiry Type <span className="text-primary">*</span>
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          value={form.inquiryType}
          onChange={handleChange}
          className={`${INPUT_CLASS} appearance-none`}
        >
          {INQUIRY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm text-neutral-400 mb-2"
        >
          Notes <span className="text-primary">*</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          required
          rows={5}
          value={form.notes}
          onChange={handleChange}
          className={`${INPUT_CLASS} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>

      {/* Attachments */}
      <div>
        <label className="block text-sm text-neutral-400 mb-2">
          Attachments{" "}
          <span className="text-neutral-600">
            (max {MAX_FILE_SIZE_MB}MB per file)
          </span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full text-neutral-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-primary hover:file:bg-neutral-700 file:cursor-pointer file:transition-colors"
        />
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="flex items-center justify-between bg-neutral-800 px-3 py-2 rounded text-sm"
              >
                <span className="text-neutral-300 truncate mr-2">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-neutral-500 hover:text-red-400 transition-colors shrink-0"
                >
                  <span className="material-icons-outlined text-sm">
                    close
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-amber-600 transition-colors uppercase text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
