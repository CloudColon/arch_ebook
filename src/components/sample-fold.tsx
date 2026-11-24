"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

// Shows the opening of the sample and lets the reader unfold the rest in place.
export function SampleFold({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div id="sample-body" className={`relative ${open ? "" : "max-h-[70vh] overflow-hidden md:max-h-[880px]"}`}>
        {children}
        {!open && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-sheet to-transparent" />}
      </div>
      {!open && (
        <button type="button" onClick={() => setOpen(true)} className="btn btn-line mt-4" aria-expanded={open} aria-controls="sample-body">
          Continue reading chapter one
          <CaretDown size={16} />
        </button>
      )}
    </div>
  );
}
