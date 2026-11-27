"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { book, toc } from "@/content/book";
import { useCart } from "./cart";
import ch1Img from "@/assets/open-ch1.jpg";
import ch2Img from "@/assets/open-ch2.jpg";
import ch3Img from "@/assets/open-ch3.jpg";
import plansImg from "@/assets/inside-plans.jpg";

// The pages inside the hero book. Each spread pairs a chapter opener (left) with a sample prompt from that
// chapter (right). Chapter names come from the table of contents in src/content/book.ts.
// PLACEHOLDER: the chapter intros, focus lists and sample prompts below were written for the demo. Replace
// them with the text from the manuscript. Every size is in cqw, so the pages scale with the book.

const RUST = "#b9572a";
const INK = "#26211d";
const PAPER = "#fbf8f2";
const TINT = "#f6ece0";
const RULE = "#e4dccd";

// Shading along the gutter: on the left edge of a right-hand page, the right edge of a left-hand page.
const gutter = {
  right: "shadow-[inset_12px_0_18px_-12px_rgb(38_33_29/0.35)]",
  left: "shadow-[inset_-12px_0_18px_-12px_rgb(38_33_29/0.35)]",
};

const pad = (n: number) => String(n).padStart(2, "0");

// eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static demo build identical
const Img = ({ src, className = "" }: { src: string; className?: string }) => <img src={src} alt="" className={className} />;

function Page({ side, children }: { side: "left" | "right"; children: ReactNode }) {
  return (
    <div className={`@container absolute inset-0 font-sans ${gutter[side]}`} style={{ backgroundColor: PAPER, color: INK }}>
      <div className="flex h-full flex-col px-[7cqw] pb-[6cqw] pt-[5cqw]">{children}</div>
    </div>
  );
}

function RunningHead({ right }: { right: string }) {
  return (
    <div
      className="flex items-center justify-between gap-[3cqw] border-b-[0.25cqw] pb-[2cqw] text-[2.3cqw] font-bold uppercase tracking-[0.04em]"
      style={{ borderColor: RULE }}
    >
      <p className="shrink-0">
        AI Blueprint <span className="mx-[1cqw] font-normal text-[#9a8f80]">|</span>
        <span className="font-medium">Edition 2026–27</span>
      </p>
      <p className="truncate font-medium text-[#7a7065]">{right}</p>
    </div>
  );
}

const Label = ({ children }: { children: ReactNode }) => <p className="text-[2.4cqw] font-bold">{children}</p>;

type Chapter = {
  n: number;
  image: string;
  intro: string;
  focus: string[];
  prompt: {
    title: string;
    purpose: string;
    stage: string;
    inputs: string[];
    text: string;
    output: ReactNode;
  };
};

function Rows({ rows, head }: { rows: [string, string][]; head?: [string, string] }) {
  return (
    <table className="w-full text-[2.1cqw] leading-[1.35]">
      {head && (
        <thead>
          <tr className="font-bold" style={{ backgroundColor: TINT }}>
            <td className="px-[1.2cqw] py-[0.7cqw]">{head[0]}</td>
            <td className="px-[1.2cqw] py-[0.7cqw]">{head[1]}</td>
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} className="border-b-[0.2cqw] border-[#ece4d6] align-top">
            <td className="w-[38%] px-[1.2cqw] py-[0.55cqw] font-semibold">{k}</td>
            <td className="px-[1.2cqw] py-[0.55cqw] text-[#4d463e]">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const CHAPTERS: Chapter[] = [
  {
    n: 1,
    image: ch1Img.src,
    intro: "Turn the first conversations with a client into a clear brief, a working programme and a plan for the project.",
    focus: [
      "Capturing client requirements",
      "Writing the design brief",
      "Space programme and area schedule",
      "Budget and timeline planning",
      "Scope of work and deliverables",
    ],
    prompt: {
      title: "Turn Client Meeting Notes into a Design Brief",
      purpose: "Organise rough notes from a client meeting into a clear, structured brief.",
      stage: "First client meeting / project start.",
      inputs: ["Meeting notes", "Plot details", "Budget range", "Who will use the building"],
      text: "Act as an architect. Using the client meeting notes below, write a structured design brief with these headings: project overview, site, users, room list, design style, budget, timeline and open questions. Put the room list in a table and flag anything the client still has to decide. Notes: [paste notes]",
      output: (
        <Rows
          head={["Design Brief", "Sample"]}
          rows={[
            ["Project", "Family residence, G+1"],
            ["Plot", "30 ft × 50 ft, north-facing"],
            ["Users", "Couple, two children, one parent"],
            ["Rooms", "3 bedrooms, study, puja, living, dining"],
            ["Style", "Contemporary, easy to maintain"],
            ["Budget", "₹80 lakh – 1 crore"],
            ["Timeline", "14 months"],
            ["Open questions", "Lift provision? Basement parking?"],
          ]}
        />
      ),
    },
  },
  {
    n: 2,
    image: ch2Img.src,
    intro: "Understand the plot before you draw: sun, wind, access, surroundings and the rules that shape what can be built.",
    focus: [
      "Sun path and prevailing wind",
      "Access, roads and approach",
      "Neighbours, views and noise",
      "Setbacks, FSI and local bylaws",
      "Zoning public, private and service areas",
    ],
    prompt: {
      title: "Prepare a Site Analysis and Zoning Strategy",
      purpose: "Summarise the site conditions and propose how to zone the plot.",
      stage: "Pre-design / concept stage.",
      inputs: ["Plot size and shape", "Road side and orientation", "City and climate", "Local setbacks and FSI"],
      text: "I am designing a house on a [30 ft × 50 ft] plot in [city], with the road on the [north] side. Prepare a site analysis covering sun path, prevailing wind, noise, views and access. List the setbacks and buildable area under typical local bylaws, then propose a zoning plan for public, private and service areas with a reason for each decision.",
      output: (
        <Rows
          head={["Zone", "Placement and reason"]}
          rows={[
            ["Public", "Entry, living, guest room on the road side"],
            ["Private", "Bedrooms to the south-east, away from the road"],
            ["Service", "Kitchen, utility, stair to the west, shading the afternoon sun"],
            ["Open", "Central courtyard for light and cross-ventilation"],
          ]}
        />
      ),
    },
  },
  {
    n: 3,
    image: ch3Img.src,
    intro: "Move from bubble diagrams to a plan that works: room sizes, adjacencies, circulation and furniture.",
    focus: [
      "Bubble diagrams and adjacencies",
      "Room sizes and proportions",
      "Circulation and staircase position",
      "Furniture layouts",
      "Comparing plan options",
    ],
    prompt: {
      title: "Develop Floor Plan Options from a Room List",
      purpose: "Generate and compare layout options that fit the brief and the plot.",
      stage: "Concept to schematic design.",
      inputs: ["Room list with sizes", "Buildable area", "Zoning decisions", "Must-haves (Vastu, parking, lift)"],
      text: "Using the room list and zoning below, suggest three floor plan options for a [30 ft × 50 ft] plot. For each option describe the layout room by room, give room sizes in feet, explain the circulation and staircase position, and list pros and cons. End with a comparison table and recommend one option.",
      output: (
        <div className="grid h-full grid-cols-[1fr_1.1fr] items-start gap-[2.5cqw]">
          <Rows
            head={["Room", "Size"]}
            rows={[
              ["Living", "14′ × 16′"],
              ["Dining", "11′ × 12′"],
              ["Kitchen", "9′ × 11′"],
              ["Bedroom 1", "12′ × 14′"],
              ["Bedroom 2", "11′ × 12′"],
              ["Puja", "5′ × 6′"],
              ["Staircase", "8′ × 14′"],
            ]}
          />
          <div className="relative min-h-0 self-stretch">
            <Img src={plansImg.src} className="absolute inset-0 h-full w-full object-contain object-top" />
          </div>
        </div>
      ),
    },
  },
];

// Left-hand page: the chapter opener.
export function ChapterOpener({ n }: { n: number }) {
  const c = CHAPTERS[n - 1];
  return (
    <Page side="left">
      <RunningHead right={`Chapter ${pad(n)}`} />
      <p className="mt-[6cqw] text-[2.6cqw] font-bold uppercase tracking-[0.12em]" style={{ color: RUST }}>
        Chapter {pad(n)}
      </p>
      <p className="mt-[1.5cqw] text-[6.6cqw] font-bold leading-[1.08]">{toc[n - 1].title}</p>
      <div className="mt-[3cqw] h-[0.7cqw] w-[7cqw]" style={{ backgroundColor: RUST }} />
      <p className="mt-[3.5cqw] font-serif text-[3cqw] leading-[1.5] text-[#3a342e]">{c.intro}</p>
      <div className="relative mt-[4cqw] min-h-0 flex-1">
        <Img src={c.image} className="absolute inset-0 h-full w-full object-cover" />
        {/* Chapter focus card over the picture, as in the printed opener */}
        <div className="absolute bottom-[3cqw] left-[3cqw] w-[62%] bg-[#fbf8f2]/95 px-[3cqw] py-[2.4cqw] shadow-[0_4px_14px_-6px_rgb(38_33_29/0.4)]">
          <Label>Chapter Focus</Label>
          <ul className="mt-[1cqw] list-disc space-y-[0.3cqw] pl-[2.6cqw] text-[2.15cqw] leading-[1.35] text-[#4d463e]">
            {c.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}

// Right-hand page: one sample prompt from the chapter.
export function PromptPage({ n }: { n: number }) {
  const p = CHAPTERS[n - 1].prompt;
  return (
    <Page side="right">
      <RunningHead right={toc[n - 1].title} />
      <div className="mt-[4.5cqw] flex items-start gap-[3cqw]">
        <p className="shrink-0 px-[2.2cqw] py-[1.2cqw] text-[3cqw] font-bold text-white" style={{ backgroundColor: RUST }}>
          Prompt {n}.1
        </p>
        <p className="text-[4.2cqw] font-bold leading-[1.15]">{p.title}</p>
      </div>

      <div
        className="mt-[3.5cqw] grid grid-cols-[1.1fr_0.9fr_1.2fr] border-y-[0.25cqw] text-[2.1cqw] leading-[1.4] text-[#4d463e]"
        style={{ borderColor: RULE }}
      >
        <div className="py-[2cqw] pr-[2cqw]">
          <Label>Purpose</Label>
          <p className="mt-[0.6cqw]">{p.purpose}</p>
        </div>
        <div className="border-x-[0.25cqw] px-[2cqw] py-[2cqw]" style={{ borderColor: RULE }}>
          <Label>Ideal Point of Use</Label>
          <p className="mt-[0.6cqw]">{p.stage}</p>
        </div>
        <div className="py-[2cqw] pl-[2cqw]">
          <Label>Inputs Required</Label>
          <ul className="mt-[0.6cqw] list-disc pl-[2.2cqw]">
            {p.inputs.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-[3cqw]">
        <Label>
          Copy-Ready Prompt <span className="font-normal text-[#7a7065]">(for ChatGPT)</span>
        </Label>
        <p className="mt-[1.2cqw] px-[2.5cqw] py-[2cqw] text-[2.3cqw] leading-[1.45]" style={{ backgroundColor: TINT }}>
          {p.text}
        </p>
      </div>

      <div className="mt-[3cqw] flex min-h-0 flex-1 flex-col">
        <Label>Illustrative Output (Sample)</Label>
        <div className="mt-[1.5cqw] min-h-0 flex-1">{p.output}</div>
      </div>
    </Page>
  );
}

// Last left-hand page: the full contents.
export function ContentsPage() {
  return (
    <Page side="left">
      <RunningHead right="Contents" />
      <p className="mt-[6cqw] text-[8cqw] font-bold leading-none">Contents</p>
      <div className="mt-[3cqw] h-[0.7cqw] w-[7cqw]" style={{ backgroundColor: RUST }} />
      <ol className="mt-[5cqw] divide-y-[0.2cqw] divide-[#ece4d6] border-y-[0.2cqw] border-[#ece4d6]">
        {toc.map((c) => (
          <li key={c.n} className="flex items-baseline gap-[3cqw] py-[1.9cqw] text-[3cqw] leading-tight">
            <span className="w-[4.5cqw] shrink-0 font-bold tabular-nums" style={{ color: RUST }}>
              {pad(c.n)}
            </span>
            {c.title}
          </li>
        ))}
      </ol>
    </Page>
  );
}

// Last right-hand page, under every leaf: the way to buy.
export function BuyPage({ onRead }: { onRead: () => void }) {
  const { add } = useCart();
  return (
    <Page side="right">
      <RunningHead right="Keep reading" />
      <div className="my-auto">
        <p className="text-[2.6cqw] font-bold uppercase tracking-[0.12em]" style={{ color: RUST }}>
          The full book
        </p>
        <p className="mt-[2cqw] text-[7cqw] font-bold leading-[1.08]">
          {book.chaptersCount} chapters.
          <br />
          100 ready-to-use prompts.
        </p>
        <div className="mt-[3.5cqw] h-[0.7cqw] w-[7cqw]" style={{ backgroundColor: RUST }} />
        <p className="mt-[4cqw] font-serif text-[3.2cqw] leading-[1.5] text-[#3a342e]">
          Every prompt comes with its purpose, when to use it, the inputs to gather, a copy-ready prompt and a sample of
          the output.
        </p>
        <div className="mt-[7cqw] grid gap-[2.5cqw]">
          <button
            type="button"
            onClick={() => add()}
            className="flex h-[10cqw] items-center justify-center text-[3.4cqw] font-semibold text-white hover:brightness-110"
            style={{ backgroundColor: RUST }}
          >
            Buy the ebook ₹{book.pricePaise / 100}
          </button>
          <Link
            href="/#sample"
            onClick={onRead}
            className="flex h-[10cqw] items-center justify-center border-[0.3cqw] text-[3.4cqw] font-semibold hover:bg-[#f1e7da]"
            style={{ borderColor: RUST, color: RUST }}
          >
            Read chapter one free
          </Link>
        </div>
      </div>
    </Page>
  );
}

// Turnable leaves, printed on both sides: the front is a right-hand page, the back the next left-hand page.
// The inside of the cover carries the Chapter 01 opener, so opening the book lands on Chapter 01.
export const LEAVES: { key: string; label: string; front: ReactNode; back: ReactNode }[] = [
  { key: "l1", label: "Chapter 02", front: <PromptPage n={1} />, back: <ChapterOpener n={2} /> },
  { key: "l2", label: "Chapter 03", front: <PromptPage n={2} />, back: <ChapterOpener n={3} /> },
  { key: "l3", label: "the contents", front: <PromptPage n={3} />, back: <ContentsPage /> },
];
