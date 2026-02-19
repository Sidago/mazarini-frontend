"use client";

import { type FormEvent, useState } from "react";

export function NewsletterForm(): React.ReactElement {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setEmail("");
  }

  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-6">
        Stay Updated
      </h4>
      <p className="text-neutral-500 dark:text-neutral-400 mb-4 text-sm">
        Subscribe to our quarterly report.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-neutral-100 dark:bg-neutral-800 border-none text-neutral-900 dark:text-white px-4 py-3 rounded focus:ring-2 focus:ring-primary outline-none text-sm"
        />
        <button
          type="submit"
          className="bg-primary text-white font-bold py-3 px-4 rounded hover:bg-blue-600 transition-colors uppercase text-sm tracking-wide"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
