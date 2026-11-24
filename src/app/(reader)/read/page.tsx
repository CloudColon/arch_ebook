"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Sends the reader back to the chapter they last had open.
export default function ReadIndex() {
  const router = useRouter();
  useEffect(() => {
    let n = 1;
    try {
      n = Number(localStorage.getItem("kb_last_chapter")) || 1;
    } catch {}
    router.replace(`/read/${n}`);
  }, [router]);
  return <div className="min-h-[100dvh] bg-paper" />;
}
