"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO, restoreDemo } from "@/lib/demo";

export function RestoreForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    if (DEMO) {
      const form = new FormData(e.currentTarget);
      if (restoreDemo(String(form.get("orderId") ?? ""), String(form.get("email") ?? ""))) {
        router.push("/read/1");
        return;
      }
      setError("We could not find a paid demo order with that ID and email in this browser.");
      setBusy(false);
      return;
    }
    const res = await fetch("/api/access/restore", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    }).catch(() => null);
    if (res?.ok) {
      router.push("/read/1");
      return;
    }
    const json = await res?.json().catch(() => null);
    setError(json?.error ?? "Could not reach the server. Please try again.");
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-6">
      <div>
        <label htmlFor="orderId" className="field-label">
          Order ID
        </label>
        <input id="orderId" name="orderId" required className="field font-mono uppercase" autoComplete="off" />
        <p className="mt-1.5 text-sm text-ink-2">Starts with KB-, for example KB-7F3K9Q2M.</p>
      </div>
      <div>
        <label htmlFor="email" className="field-label">
          Email
        </label>
        <input id="email" name="email" type="email" required className="field" autoComplete="email" aria-invalid={!!error} />
        {error && (
          <p role="alert" className="field-error">
            {error}
          </p>
        )}
      </div>
      <button type="submit" disabled={busy} className="btn btn-solid justify-self-start disabled:opacity-60">
        {busy ? "Checking" : "Unlock the book"}
      </button>
    </form>
  );
}
