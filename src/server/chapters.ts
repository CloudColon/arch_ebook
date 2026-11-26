import "server-only";
import { chapterOne, type Chapter } from "@/content/chapter-one";

// The full manuscript. Only imported by server code behind the purchase check, so none of this
// text reaches the landing page or the client bundle.
// PLACEHOLDER: chapters 2 to 10 are short stand-ins until the author's manuscript is added.

const p = (text: string) => ({ type: "p" as const, text });
const h = (text: string) => ({ type: "h" as const, text });
const quote = (text: string) => ({ type: "quote" as const, text });

const rest: Chapter[] = [
  {
    n: 2,
    title: "Site Analysis & Zoning",
    blocks: [
      p("Clients often ask me whether a courtyard is worth the space. On a small plot every square foot is counted, and an open square in the middle of the plan looks like a room that was never finished. I understand the worry. I also think it misreads what the courtyard does."),
      p("A courtyard is a machine for air. Warm air rises out of it in the afternoon and pulls cooler air through the rooms around it. It is a lamp: a single opening that lights four rooms at once, softly, without glare. And it is a clock. Children learn the time of day from where the shadow falls on the floor."),
      h("Size by use, not by ratio"),
      p("Textbooks give proportions. I prefer to size a courtyard by what will happen in it. Can a cot be laid out on a winter afternoon? Can two people dry a sari across it? Can a tulsi stand at the centre without blocking the path? If the answer to all three is yes, the courtyard is large enough, whatever the ratio says."),
      quote("The open middle does more work than any room around it."),
      p("In the chapters that follow, we will look at how to roof the edge of a courtyard so it stays usable in the rain, how to keep it from becoming a heat trap in May, and how to give a family privacy around it without closing it in."),
    ],
  },
  {
    n: 3,
    title: "Floor Plan Development",
    blocks: [
      p("A jaali is a wall that has decided to let some things through. Light, yes, but broken into pieces. Air, yes, but slowed and cooled. Sight, partly: you can see out more easily than anyone can see in."),
      p("This chapter walks through the jaalis we have built in terracotta, in cement, in stone and in brick laid with gaps, and what each one costs, weighs and asks of the mason."),
    ],
  },
  {
    n: 4,
    title: "Interior Design & Space Planning",
    blocks: [
      p("Before I draw a single wall, I draw the sun. Where it rises in June and in December, how high it climbs at noon, which façade will take the full force of the west at four in the afternoon."),
      p("The answers decide where the bedrooms go, how deep the overhangs must be, and which windows should never be made larger, however much the client asks."),
    ],
  },
  {
    n: 5,
    title: "Architectural Visualisation & Plan Rendering",
    blocks: [
      p("Materials are promises about time. Lime plaster promises to breathe and to be repaired. Exposed brick promises to darken and soften. Stone promises to outlast everyone who chose it."),
      p("Here I set out how we choose between them on a real budget, and where cement still earns its place."),
    ],
  },
  {
    n: 6,
    title: "Elevations, Sections & Façade Design",
    blocks: [
      p("In most homes the stair is a cost to be hidden. In the best homes it is the place where conversations happen, because it sits between floors and between people."),
      p("A wider landing, a window at sitting height, a tread long enough for a cup of tea. Small decisions, large consequences."),
    ],
  },
  {
    n: 7,
    title: "Materials & Colour Palettes",
    blocks: [
      p("We design for the photograph and forget the monsoon. Four months a year, a house in western India is mostly a roof and a set of gutters."),
      p("This chapter covers slopes, chajjas, spouts, and the joy of a verandah where you can watch the rain without getting wet."),
    ],
  },
  {
    n: 8,
    title: "Photorealistic Rendering & Image Enhancement",
    blocks: [
      p("Most families do not build on large plots. They build on thirty-foot frontages between neighbours who built first. Generosity on such sites comes from section, not from plan."),
      p("Double-height spaces, split levels and borrowed views: the tools we use to make a narrow house feel open."),
    ],
  },
  {
    n: 9,
    title: "Technical Documentation & Detailing",
    blocks: [
      p("My drawing sets have become shorter every year. Not because the buildings are simpler, but because I have learnt which drawings the site actually reads."),
      p("This last chapter is about working with contractors and craftspeople, and about the details that are better decided standing on the slab than sitting at a desk."),
    ],
  },
  {
    n: 10,
    title: "Presentation & Professional Practice",
    blocks: [
      p("The prompts in this chapter help you present the work: client presentations, design proposals, project emails and the everyday writing of running a practice."),
    ],
  },
];

export const chapters: Chapter[] = [chapterOne, ...rest];

export function getChapter(n: number): Chapter | undefined {
  return chapters.find((c) => c.n === n);
}
