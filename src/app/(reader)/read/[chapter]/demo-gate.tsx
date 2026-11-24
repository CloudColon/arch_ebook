"use client";

import { useEffect, useState } from "react";
import { demoReader } from "@/lib/demo";

// Static demo only: shows the chapter when this browser holds a paid demo order.
export function DemoGate({ locked, skeleton, children }: { locked: React.ReactNode; skeleton: React.ReactNode; children: React.ReactNode }) {
  const [state, setState] = useState<"checking" | "open" | "locked">("checking");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- access lives in localStorage, read after mount
    setState(demoReader() ? "open" : "locked");
  }, []);
  if (state === "checking") return skeleton;
  return state === "open" ? children : locked;
}
