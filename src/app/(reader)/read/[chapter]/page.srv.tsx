import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { readerOrder } from "@/server/access";
import { chapters, getChapter } from "@/server/chapters";
import { ChapterBody } from "@/components/chapter-body";
import { ReaderShell } from "./reader-shell";
import { Locked, ReaderSkeleton } from "./locked";

export const metadata: Metadata = { title: "Reader", robots: { index: false } };

export default function ReadPage(props: { params: Promise<{ chapter: string }> }) {
  return (
    <Suspense fallback={<ReaderSkeleton />}>
      <Reader params={props.params} />
    </Suspense>
  );
}

async function Reader({ params }: { params: Promise<{ chapter: string }> }) {
  const n = Number((await params).chapter);
  const order = await readerOrder();
  if (!order) return <Locked />;

  const chapter = getChapter(n);
  if (!chapter) notFound();

  const toc = chapters.map((c) => ({ n: c.n, title: c.title }));
  return (
    <ReaderShell chapterN={chapter.n} chapterTitle={chapter.title} toc={toc} reader={order.name.split(" ")[0]}>
      <ChapterBody chapter={chapter} sizeClass="text-[length:calc(1.16rem*var(--rs,1))] md:text-[length:calc(1.22rem*var(--rs,1))]" />
    </ReaderShell>
  );
}
