"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LockSimple } from "@phosphor-icons/react";
import { useCart } from "@/components/cart";
import { BookCover } from "@/components/book-cover";
import { book, formatINR } from "@/content/book";
import { DEMO, createDemoOrder } from "@/lib/demo";
import { cleanBuyer } from "@/lib/validate";

type Start =
  | { kind: "redirect"; url: string }
  | { kind: "form"; action: string; method: "POST" | "GET"; fields: Record<string, string> };

export function CheckoutForm() {
  const { items, ready, clear } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [gateway, setGateway] = useState<Extract<Start, { kind: "form" }> | null>(null);
  const gatewayForm = useRef<HTMLFormElement>(null);
  const router = useRouter();

  if (!ready) return <div className="mt-10 h-72 animate-pulse bg-cream" />;
  if (!items.includes(book.id)) {
    return (
      <div className="mt-10 border border-line bg-sheet px-6 py-16 text-center">
        <p className="text-lg font-semibold">Nothing to check out yet</p>
        <Link href="/#pricing" className="btn btn-line mt-6">
          See pricing
        </Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (DEMO) {
      // Static demo: the order is kept in this browser and paid on a simulated gateway page.
      const { errors: invalid, ...buyer } = cleanBuyer(data);
      if (Object.keys(invalid).length) {
        setErrors(invalid);
        setBusy(false);
        return;
      }
      const id = createDemoOrder(buyer);
      clear();
      router.push(`/pay/mock?order=${encodeURIComponent(id)}`);
      return;
    }
    try {
      const res = await fetch("/api/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? { form: "Something went wrong. Please try again." });
        setBusy(false);
        return;
      }
      clear();
      const start = json.start as Start;
      if (start.kind === "redirect") {
        window.location.assign(start.url);
      } else {
        setGateway(start);
        requestAnimationFrame(() => gatewayForm.current?.submit());
      }
    } catch {
      setErrors({ form: "Could not reach the server. Check your connection and try again." });
      setBusy(false);
    }
  }

  return (
    <div className="mt-10 grid gap-12 md:grid-cols-[1fr_340px]">
      <form onSubmit={submit} noValidate className="grid content-start gap-6">
        <p className="text-ink-2">After payment you get an order ID on screen. Note it down: with it and this email you can read on any other device.</p>
        <Field name="name" label="Full name" autoComplete="name" error={errors.name} />
        <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
        <Field name="phone" label="Mobile number" type="tel" autoComplete="tel" inputMode="tel" helper="Required by the bank for payment." error={errors.phone} />
        <Consent error={errors.agree} />
        {errors.form && (
          <p role="alert" className="field-error">
            {errors.form}
          </p>
        )}
        <button type="submit" disabled={busy} className="btn btn-solid w-full disabled:opacity-60 md:w-auto md:justify-self-start">
          <LockSimple size={18} />
          {busy ? "Connecting to the bank" : `Pay ${formatINR(book.pricePaise)}`}
        </button>
      </form>

      <aside className="h-fit border border-ink bg-sheet p-6">
        <div className="flex gap-4">
          <BookCover className="w-16 shrink-0" />
          <div>
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm text-ink-2">{book.authorTitle}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between border-t border-line pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>{formatINR(book.pricePaise)}</span>
        </div>
        <p className="annot mt-1">Inclusive of GST. Instant access.</p>
      </aside>

      {gateway && (
        <form ref={gatewayForm} action={gateway.action} method={gateway.method} className="hidden">
          {Object.entries(gateway.fields).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
        </form>
      )}
    </div>
  );
}

// Required before paying. The links open in a new tab so the filled-in form is not lost.
function Consent({ error }: { error?: string }) {
  const policy = (href: string, label: string) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
      {label}
    </Link>
  );
  return (
    <div>
      <label htmlFor="agree" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-2">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          required
          aria-invalid={!!error}
          aria-describedby={error ? "agree-error" : undefined}
          className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-accent"
        />
        <span>
          I have read and agree to the {policy("/terms", "Terms & Conditions")}, {policy("/payment-policy", "Payment Policy")} and{" "}
          {policy("/refunds", "Refund & Cancellation Policy")}.
        </span>
      </label>
      {error && (
        <p id="agree-error" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  name,
  label,
  error,
  helper,
  ...rest
}: { name: string; label: string; error?: string; helper?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="field"
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : helper ? `${name}-help` : undefined}
        required
        {...rest}
      />
      {helper && !error && (
        <p id={`${name}-help`} className="mt-1.5 text-sm text-ink-2">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
