import Link from "next/link";
import { LockSimple } from "@phosphor-icons/react/dist/ssr";
import { book } from "@/content/book";
import { Wordmark } from "@/components/nav";

// Shown to visitors who have not bought the book.
export function Locked() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-paper">
      <header className="mx-auto flex h-16 w-full max-w-[1320px] items-center px-4 md:px-8">
        <Link href="/">
          <Wordmark />
        </Link>
      </header>
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center px-4 pb-24">
        <LockSimple size={36} weight="light" />
        <h1 className="mt-6 display text-5xl leading-[1.05]">This book is for readers who own it</h1>
        <p className="mt-4 leading-relaxed text-ink-2">
          Buy {book.title} to unlock all {book.chaptersCount} chapters, or restore access if you have already paid.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#pricing" className="btn btn-solid">
            Buy the ebook <span className="font-normal opacity-80">₹{book.pricePaise / 100}</span>
          </Link>
          <Link href="/restore" className="btn btn-line">
            Restore access
          </Link>
        </div>
        <Link href="/#sample" className="mt-6 text-sm text-ink-2 underline underline-offset-4">
          Read chapter one for free
        </Link>
      </div>
    </div>
  );
}

export function ReaderSkeleton() {
  return (
    <div className="min-h-[100dvh] bg-paper px-4 pt-28">
      <div className="mx-auto max-w-[38em] space-y-4">
        <div className="h-10 w-2/3 animate-pulse bg-cream" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse bg-cream" style={{ width: `${92 - (i % 3) * 9}%` }} />
        ))}
      </div>
    </div>
  );
}
