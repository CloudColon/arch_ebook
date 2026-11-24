"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { useCart } from "./cart";
import { BookCover } from "./book-cover";
import { book, formatINR } from "@/content/book";

export function CartDrawer() {
  const { open, setOpen, items, remove, totalPaise } = useCart();
  const reduce = useReducedMotion();
  const has = items.includes(book.id);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-[rgb(var(--shadow)/0.35)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col border-l border-line bg-sheet"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-6">
              <h2 className="font-semibold">Your cart</h2>
              <button type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center hover:bg-cream" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {has ? (
              <>
                <div className="flex gap-5 p-6">
                  <BookCover className="w-24 shrink-0 shadow-[0_10px_30px_-12px_rgb(var(--shadow)/0.45)]" />
                  <div className="flex flex-1 flex-col">
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-sm text-ink-2">{book.authorTitle}</p>
                    <p className="annot mt-1">Ebook, read online</p>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <button type="button" onClick={() => remove()} className="text-sm text-ink-2 underline underline-offset-4 hover:text-ink">
                        Remove
                      </button>
                      <span className="font-semibold">{formatINR(book.pricePaise)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto border-t border-line p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-ink-2">Total</span>
                    <span className="text-xl font-semibold">{formatINR(totalPaise)}</span>
                  </div>
                  <p className="annot mt-1">Inclusive of GST. Instant access after payment.</p>
                  <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-solid mt-5 w-full">
                    Checkout
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <BookCover className="w-28 opacity-60" />
                <p className="mt-6 font-semibold">Your cart is empty</p>
                <p className="mt-1 text-sm text-ink-2">Add the ebook to start reading today.</p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    document.getElementById("pricing")?.scrollIntoView();
                  }}
                  className="btn btn-line mt-6"
                >
                  See pricing
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
