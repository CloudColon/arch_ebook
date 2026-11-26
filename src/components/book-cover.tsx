import { book } from "@/content/book";
import building from "@/assets/cover-building.jpg";

// The cover: a cream title panel over a photograph of a modern house, closed by a dark brown edition band.
// Scales with its container (cqw units), so it reads the same at hero size and as a cart thumbnail.

const RUST = "#b5471f";
const BROWN = "#3e2a21";
const INK = "#26211d";
const CREAM = "#f5f2ea";

const AUDIENCE = ["Architects", "Interior Designers", "Civil Engineers", "3D Visualisers"];
const EDITION = "2026–27";

export function BookCover({ className = "" }: { className?: string }) {
  const [first, ...rest] = book.title.split(" ");
  return (
    <div
      className={`@container relative flex aspect-[2/3] flex-col overflow-hidden font-sans ${className}`}
      style={{ backgroundColor: CREAM, color: INK }}
      aria-label={`${book.title} by ${book.authorTitle}, cover`}
      role="img"
    >
      {/* Title panel */}
      <div className="flex shrink-0 flex-col px-[8.5cqw] pb-[5cqw] pt-[8cqw]">
        <p className="text-[15cqw] font-extrabold leading-[0.95] tracking-[-0.01em]" style={{ color: RUST }}>
          {first}
        </p>
        <p className="mt-[1.5cqw] text-[13cqw] font-extrabold uppercase leading-[0.95] tracking-[0.005em]">{rest.join(" ")}</p>

        <p className="mt-[4.5cqw] text-[3.3cqw] font-bold uppercase leading-[1.45] tracking-[0.02em]">
          {AUDIENCE.slice(0, 2).join(" • ")} •
          <br />
          {AUDIENCE.slice(2).join(" • ")}
        </p>

        <div className="mt-[3.5cqw] h-[0.25cqw]" style={{ backgroundColor: INK }} />
        <div className="flex items-center gap-[2.5cqw] py-[2.8cqw]">
          <p className="text-[12cqw] font-extrabold leading-none tracking-[-0.02em]" style={{ color: RUST }}>
            100
          </p>
          <p className="text-[4.4cqw] font-extrabold uppercase leading-[1.15]">
            Ready-to-use
            <br />
            ChatGPT prompts
          </p>
        </div>
        <div className="h-[0.25cqw]" style={{ backgroundColor: INK }} />

        <p className="mt-[3cqw] text-[3.1cqw] leading-[1.45]">
          A Practical Handbook for Design, Planning, Documentation, 3D Visualisation and Project Delivery
        </p>
      </div>

      {/* Photograph */}
      <div className="relative min-h-0 flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element -- a plain img keeps the cover identical in the static demo build */}
        <img src={building.src} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_40%]" />
      </div>

      {/* Edition band */}
      <div
        className="flex h-[15cqw] shrink-0 items-center justify-center text-[4.2cqw] font-bold uppercase tracking-[0.06em]"
        style={{ backgroundColor: BROWN, color: CREAM }}
      >
        Edition <span className="mx-[2.5cqw] font-normal">|</span> {EDITION}
      </div>
    </div>
  );
}
