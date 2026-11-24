"use client";

import Link from "next/link";
import { Handbag } from "@phosphor-icons/react";
import { useCart } from "./cart";
import { business } from "@/content/book";

const links = [
  { href: "/#inside", label: "Inside" },
  { href: "/#sample", label: "Sample" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#author", label: "Author" },
  { href: "/#pricing", label: "Pricing" },
];

export function Wordmark() {
  return (
    <span className="flex items-center gap-2 text-[1.05rem] font-semibold tracking-[-0.01em]">
      <span aria-hidden className="grid size-5 place-items-center border-[1.5px] border-current">
        <span className="size-1.5 bg-current" />
      </span>
      {business.brand}
    </span>
  );
}

export function Nav() {
  const { items, ready, setOpen } = useCart();
  const count = ready ? items.length : 0;

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" aria-label={`${business.brand} home`}>
          <Wordmark />
        </Link>
        <nav aria-label="Sections" className="hidden items-center gap-7 text-sm text-ink-2 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#sample" className="px-3 py-2 text-sm text-ink-2 hover:text-ink md:hidden">
            Sample
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 items-center gap-2 border border-ink px-3.5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <Handbag size={18} weight="regular" />
            Cart
            <span className="min-w-4 font-mono text-xs">{count}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
