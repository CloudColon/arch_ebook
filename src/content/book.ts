// Everything a visitor reads about the book, the author and the business lives here.
// Values marked PLACEHOLDER must be replaced with the owner's real details before launch.

export const book = {
  id: "thresholds-ebook",
  title: "AI Blueprint",
  subtitle: "100 ready-to-use ChatGPT prompts for design, planning and project delivery",
  author: "Snehal Sontakke",
  authorTitle: "Ar. Snehal Sontakke",
  pitch:
    "100 ready-to-use ChatGPT prompts that help architects, interior designers, civil engineers, 3D visualisers and students plan, design, document and deliver projects faster.",
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
    "AI Blueprint is her handbook for using ChatGPT as a working partner on real projects. The 100 prompts follow a project from briefing and site analysis through design development, interiors, documentation, visualisation, costing, approvals and delivery. Each one gives you the purpose, the inputs to prepare, a copy-ready prompt, a sample output and tips to refine it.",
  ],
  // Who the book helps, and how. Shown under the author's bio.
  helps: [
    { who: "Students", how: "Turn a studio brief into a clear programme, area schedule and concept, and learn how professionals structure each stage of a project." },
    { who: "Architects", how: "Draft briefs, site analyses, façade options, specifications and client presentations in minutes, and spend the saved hours on design." },
    { who: "Interior designers", how: "Build concepts, moodboards, material palettes and room-wise layouts from a client's needs, style and budget." },
    { who: "Civil engineers", how: "Prepare construction details, specifications, schedules and approval checklists faster, with prompts written for site realities." },
    { who: "3D visualisers", how: "Write render prompts for exteriors and interiors with the right lighting, mood, materials and seasons, and improve images for clients." },
    { who: "Consultants, firms and freelancers", how: "Standardise how your team briefs, documents and communicates, so every project starts from a proven workflow." },
  ],
  facts: [
    { label: "In practice since", value: "2004" }, // PLACEHOLDER
    { label: "Studio", value: "Pune, Maharashtra" }, // PLACEHOLDER
    { label: "Work", value: "Homes, schools, civic" }, // PLACEHOLDER
  ],
};

// Business and legal details shown in the footer, contact page and policies.
export const business = {
  legalName: "Zotohin Private Limited", // the company that operates the KnowledgeBag brand
  brand: "KnowledgeBag",
  domain: "knowledgebag.com",
  url: "https://www.knowledgebag.com",
  addressLines: ["247, Anoop Nagar", "Indore, Madhya Pradesh – 452018", "India"],
  email: "hello@knowledgebag.in", // PLACEHOLDER: confirm mailbox exists
  phone: "+91 98272 36590",
  phoneHref: "+919827236590",
  hours: "Monday to Saturday, 10 am to 6 pm IST",
  gstin: "", // PLACEHOLDER: add GSTIN if registered, leave empty to hide
  jurisdiction: "Indore, Madhya Pradesh",
  grievanceOfficer: "" as string, // PLACEHOLDER: name and designation, shown in the terms when set
  grievancePhone: "+91 98272 36590" as string, // shown in the terms when set
  policiesUpdated: "24 November 2026",
  termsUpdated: "27 November 2026",
} as const;

export function formatINR(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
  }).format(paise / 100);
}
