import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chapters, getChapter } from "@/server/chapters";
import { ChapterBody } from "@/components/chapter-body";
import { ReaderShell } from "./reader-shell";
import { Locked, ReaderSkeleton } from "./locked";
import { DemoGate } from "./demo-gate";

// Static demo reader: every chapter is prerendered and unlocked in the browser after a simulated payment.
export const metadata: Metadata = { title: "Reader", robots: { index: false } };

export function generateStaticParams() {
  return chapters.map((c) => ({ chapter: String(c.n) }));
}

export default async function DemoReadPage({ params }: { params: Promise<{ chapter: string }> }) {
  const chapter = getChapter(Number((await params).chapter));
  if (!chapter) notFound();
  const toc = chapters.map((c) => ({ n: c.n, title: c.title }));
  return (
    <DemoGate locked={<Locked />} skeleton={<ReaderSkeleton />}>
      <ReaderShell chapterN={chapter.n} chapterTitle={chapter.title} toc={toc} reader="demo reader">
        <ChapterBody chapter={chapter} sizeClass="text-[length:calc(1.16rem*var(--rs,1))] md:text-[length:calc(1.22rem*var(--rs,1))]" />
      </ReaderShell>
    </DemoGate>
  );
}
