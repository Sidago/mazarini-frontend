"use client";

import { useState } from "react";

interface InsightDownloadFormProps {
  fileUrl: string | null;
  fileName?: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
};

export function InsightDownloadForm({
  fileUrl,
  fileName = "report.pdf",
}: InsightDownloadFormProps): React.ReactElement {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [downloaded, setDownloaded] = useState(false);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Invalid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!fileUrl) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  }

  if (downloaded) {
    return (
      <div className="bg-neutral-900 p-8 text-white text-center">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-5">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Download Started</h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Thank you! Your report is downloading now.
        </p>
        <button
          type="button"
          onClick={() => setDownloaded(false)}
          className="mt-6 text-xs text-neutral-500 underline hover:text-white transition-colors"
        >
          Download again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-8">
      <h2 className="text-xl font-bold text-white mb-2">Download the Report</h2>
      <p className="text-neutral-400 text-sm mb-7 leading-relaxed">
        Fill in the details below to download the full report.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
        <Field
          name="firstName"
          placeholder="First Name*"
          value={form.firstName}
          error={errors.firstName}
          onChange={handleChange}
        />
        <Field
          name="lastName"
          placeholder="Last Name*"
          value={form.lastName}
          error={errors.lastName}
          onChange={handleChange}
        />
        <Field
          name="email"
          type="email"
          placeholder="Email Address*"
          value={form.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Field
          name="phone"
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Field
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={!fileUrl}
          className="mt-2 w-full bg-primary text-neutral-900 font-bold text-sm tracking-widest uppercase py-4 hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Download
        </button>
      </form>

      <p className="text-neutral-500 text-xs mt-5 leading-relaxed">
        *By submitting my information, I agree to receive updates from this
        company.
      </p>
      <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
        You may unsubscribe at any time. By clicking &ldquo;Download&rdquo; you
        consent to allow us to store and process the personal information
        submitted to provide you the content requested.
      </p>
    </div>
  );
}

interface FieldProps {
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Field({
  name,
  placeholder,
  value,
  error,
  type = "text",
  onChange,
}: FieldProps): React.ReactElement {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-neutral-800 text-white text-sm placeholder-neutral-500 px-4 py-3 outline-none focus:ring-1 transition-colors ${
          error
            ? "ring-1 ring-red-500"
            : "focus:ring-primary"
        }`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
