"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart";
import { BookCover } from "@/components/book-cover";
import { book, formatINR } from "@/content/book";

export function CartView() {
  const { items, ready, remove, add, totalPaise } = useCart();
  const payment = useSearchParams().get("payment");

  if (!ready) return <div className="mt-10 h-48 animate-pulse bg-cream" />;

  return (
    <div className="mt-10">
      {payment && (
        <p role="alert" className="mb-8 border border-ink bg-cream px-5 py-4 text-sm">
          We could not confirm your payment. If money left your account, write to us with your order ID and we will
          unlock the book. Otherwise, please try again.
        </p>
      )}
      {items.includes(book.id) ? (
        <div className="grid gap-10 md:grid-cols-[1fr_300px]">
          <div className="flex gap-6 border-y border-ink py-6">
            <BookCover className="w-24 shrink-0" />
            <div className="flex flex-1 flex-col">
              <p className="text-lg font-semibold">{book.title}</p>
              <p className="text-ink-2">{book.authorTitle}</p>
              <p className="annot mt-1">Ebook, read online</p>
              <div className="mt-auto flex items-end justify-between">
                <button type="button" onClick={() => remove()} className="text-sm text-ink-2 underline underline-offset-4 hover:text-ink">
                  Remove
                </button>
                <span className="font-semibold">{formatINR(book.pricePaise)}</span>
              </div>
            </div>
          </div>
          <div className="border border-ink bg-sheet p-6">
            <div className="flex justify-between text-ink-2">
              <span>Subtotal</span>
              <span>{formatINR(totalPaise)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-line pt-3 text-lg font-semibold">
              <span>Total</span>
              <span>{formatINR(totalPaise)}</span>
            </div>
            <p className="annot mt-1">Inclusive of GST</p>
            <Link href="/checkout" className="btn btn-solid mt-6 w-full">
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="border border-line bg-sheet px-6 py-16 text-center">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-1 text-ink-2">The book is waiting on the shelf.</p>
          <button type="button" onClick={() => add()} className="btn btn-solid mt-6">
            Buy the ebook <span className="font-normal opacity-80">₹{book.pricePaise / 100}</span>
          </button>
        </div>
      )}
    </div>
  );
}
