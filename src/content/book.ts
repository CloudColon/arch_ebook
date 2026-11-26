// Everything a visitor reads about the book, the author and the business lives here.
// Values marked PLACEHOLDER must be replaced with the owner's real details before launch.

export const book = {
  id: "thresholds-ebook",
  title: "AI Blueprint",
  subtitle: "100 ready-to-use ChatGPT prompts for design, planning and project delivery",
  author: "Snehal Sontakke",
  authorTitle: "Ar. Snehal Sontakke",
  pitch:
    "Nine essays on how Indian homes hold light, air and family life, written from twenty years of building them.", // PLACEHOLDER
  pricePaise: 64900, // PLACEHOLDER (₹649, inclusive of GST)
  mrpPaise: 89900, // PLACEHOLDER (struck-through launch price, set to null to hide)
  pages: 212, // PLACEHOLDER
  readingTime: "About 5 hours", // PLACEHOLDER
  chaptersCount: 10,
  language: "English",
  format: "Read in your browser on phone, tablet or laptop",
  edition: "First digital edition, 2026", // PLACEHOLDER
  isbn: "Assigned at launch", // PLACEHOLDER
  publisher: "KnowledgeBag",
  typeset: "Cormorant Garamond, Newsreader and Archivo",
  cover: "Ar. Snehal Sontakke", // PLACEHOLDER
  editor: "Anjali Bhide", // PLACEHOLDER
} as const;

export type Book = typeof book;

// What every prompt in the book comes with, and who the book is for. Shown beside the contents.
export const promptIncludes = [
  "Purpose & ideal point of use",
  "Required inputs",
  "Copy-ready ChatGPT prompt",
  "Expected output",
  "Illustrative output preview",
  "Practical tips & refinement prompts",
] as const;

export const designedFor = [
  "Architects",
  "Interior Designers",
  "Civil Engineers",
  "3D Visualisers",
  "Students",
  "Design Consultants",
] as const;

// The band at the top of the footer.
export const footerBand = {
  headline: "100 Prompts. 10 Chapters. One Complete AI Workflow.",
  tagline: "Think better. Design smarter. Work faster.",
  stats: [
    { figure: "100", label: "Prompts", line: "Ready to use" },
    { figure: "10", label: "Chapters", line: "Complete workflow" },
    { figure: "100%", label: "Practical", line: "Copy-ready approach" },
  ],
} as const;

// The three figures under the hero title.
export const heroStats = [
  { figure: "100", label: "Ready-to-use prompts", line: "Practical, copy-and-paste ChatGPT prompts." },
  { figure: "10", label: "Professional chapters", line: "Covering architecture and interior design." },
  { figure: "One", label: "Complete workflow", line: "From initial concept to final presentation." },
] as const;

export const toc = [
  { n: 1, title: "Project Brief & Architectural Planning" },
  { n: 2, title: "Site Analysis & Zoning" },
  { n: 3, title: "Floor Plan Development" },
  { n: 4, title: "Interior Design & Space Planning" },
  { n: 5, title: "Architectural Visualisation & Plan Rendering" },
  { n: 6, title: "Elevations, Sections & Façade Design" },
  { n: 7, title: "Materials & Colour Palettes" },
  { n: 8, title: "Photorealistic Rendering & Image Enhancement" },
  { n: 9, title: "Technical Documentation & Detailing" },
  { n: 10, title: "Presentation & Professional Practice" },
] as const;

export const testimonials = [
  {
    quote: "I have read many books on the Indian house. This is the first one I keep on site, not on the shelf.",
    name: "Rohan Kelkar", // PLACEHOLDER
    role: "Partner, Kelkar Iyer Architects",
  },
  {
    quote: "Clear enough for a client, deep enough for a practice. The courtyard chapter changed how our studio writes every brief.",
    name: "Sana Qureshi", // PLACEHOLDER
    role: "Founder, Atelier Qureshi",
  },
  {
    quote: "She writes the way she builds. Nothing extra, and every line carries load.",
    name: "Prof. Dev Malhotra", // PLACEHOLDER
    role: "Professor of Architecture",
  },
] as const;

export const authorBio = {
  // PLACEHOLDER: the owner's real biography
  short:
    "Snehal Sontakke is an architect designing homes, schools and small public buildings across western India.",
  long: [
    "She trained in Ahmedabad and spent her first years on site, learning from masons and carpenters before she learnt from drawings. Her studio is known for houses that stay cool without machines and age without apology.",
    "Thresholds is her first book. It gathers the questions clients ask her most, and the answers buildings gave her over two decades.",
  ],
  facts: [
    { label: "In practice since", value: "2004" }, // PLACEHOLDER
    { label: "Studio", value: "Pune, Maharashtra" }, // PLACEHOLDER
    { label: "Work", value: "Homes, schools, civic" }, // PLACEHOLDER
  ],
};

// Business and legal details shown in the footer, contact page and policies.
export const business = {
  legalName: "KnowledgeBag", // PLACEHOLDER: registered business name as on GST / bank account
  brand: "KnowledgeBag",
  domain: "knowledgebag.in",
  url: "https://knowledgebag.in",
  addressLines: ["Office 4, Second Floor, Prabhat Road", "Erandwane, Pune 411004", "Maharashtra, India"], // PLACEHOLDER
  email: "hello@knowledgebag.in", // PLACEHOLDER: confirm mailbox exists
  phone: "+91 00000 00000", // PLACEHOLDER
  phoneHref: "+910000000000", // PLACEHOLDER
  hours: "Monday to Saturday, 10 am to 6 pm IST",
  gstin: "", // PLACEHOLDER: add GSTIN if registered, leave empty to hide
  jurisdiction: "Pune, Maharashtra",
  policiesUpdated: "24 November 2026",
} as const;

export function formatINR(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
  }).format(paise / 100);
}
