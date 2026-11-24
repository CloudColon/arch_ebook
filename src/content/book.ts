// Everything a visitor reads about the book, the author and the business lives here.
// Values marked PLACEHOLDER must be replaced with the owner's real details before launch.

export const book = {
  id: "thresholds-ebook",
  title: "Thresholds", // PLACEHOLDER
  subtitle: "On light, courtyards and the rooms in between", // PLACEHOLDER
  author: "Snehal Sontakke",
  authorTitle: "Ar. Snehal Sontakke",
  pitch:
    "Nine essays on how Indian homes hold light, air and family life, written from twenty years of building them.", // PLACEHOLDER
  pricePaise: 64900, // PLACEHOLDER (₹649, inclusive of GST)
  mrpPaise: 89900, // PLACEHOLDER (struck-through launch price, set to null to hide)
  pages: 212, // PLACEHOLDER
  readingTime: "About 5 hours", // PLACEHOLDER
  chaptersCount: 9,
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

export const toc = [
  { n: 1, title: "The Room Before the Room", line: "Otlas, verandahs and the step where a house begins." },
  { n: 2, title: "Courtyards Are Not Empty", line: "Why the open middle does more work than any room around it." },
  { n: 3, title: "A Wall That Breathes", line: "Jaalis, screens and the art of letting some things through." },
  { n: 4, title: "Working With the Sun", line: "Orientation, overhangs and the hours a room is lived in." },
  { n: 5, title: "Lime, Brick and Stone", line: "Choosing materials that age with the family, not against it." },
  { n: 6, title: "The Stair as a Place to Sit", line: "Circulation that doubles as conversation." },
  { n: 7, title: "Rain, Roofs and Runoff", line: "Designing for four months of monsoon, not four days of photos." },
  { n: 8, title: "Small Plots, Large Lives", line: "Thirty-foot frontages and how to make them generous." },
  { n: 9, title: "Drawing Less, Building Better", line: "What two decades of site visits taught about the drawing set." },
] as const; // PLACEHOLDER chapter titles

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
