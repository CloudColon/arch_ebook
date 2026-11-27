// Chapter one is the free sample. It is safe to ship to the browser.
// The remaining chapters live in src/server/chapters.ts and are only rendered for paying readers.

export type Block =
  | { type: "p"; text: string; note?: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string }
  | { type: "figure"; src: string; alt: string; caption: string };

export type Chapter = { n: number; title: string; blocks: Block[] };

// PLACEHOLDER: replace with the author's manuscript.
export const chapterOne: Chapter = {
  n: 1,
  title: "Project Brief & Architectural Planning",
  blocks: [
    {
      type: "p",
      text: "Every house I have loved began before its front door. It began at a step, a ledge, a strip of shade where someone could stop without being asked in. My grandmother's house in Vadodara had an otla, a raised platform of Kota stone along the street, about knee high and wide enough to lie on. Nobody designed it as a room. It was the most used room in the house.",
      note: "Otla: a raised plinth along the street edge, common in the pols of Ahmedabad and Vadodara.",
    },
    {
      type: "p",
      text: "In the mornings the vegetable seller set his basket on it. In the afternoons my grandfather read the paper there, half in the house and half in the lane. In the evenings the women of three houses sat on adjoining otlas and the street became a long, informal drawing room. The front door stayed open, but the house behind it stayed private. The otla did that work.",
    },
    {
      type: "p",
      text: "When I started practice, I noticed that almost every brief I received began at the door. Clients described the living room, the kitchen, the number of bedrooms. Nobody described the place where you take off your shoes, greet a neighbour, or wait for a rickshaw in the rain. We had stopped drawing it because we had stopped naming it.",
    },
    { type: "h", text: "A threshold is a room with a job" },
    {
      type: "p",
      text: "I use the word threshold for any space whose purpose is to make a transition gentle. Outside to inside. Bright to dim. Public to family. Hot to cool. A threshold can be a verandah, a deep doorway, a step with a seat beside it, or a single neem tree that shades a gate. What makes it a threshold is that you slow down there.",
      note: "A useful test on site: where do people pause without being told to?",
    },
    {
      type: "p",
      text: "The traditional Indian house was full of them. The Kerala padippura, the Chettinad thinnai, the Bengali dawa, the Goan balcão. Each region invented its own, and each one solved three problems at once. It shaded the entrance wall, so the house stayed cooler. It gave the family a place to receive people without letting them all the way in. And it gave the street a reason to be friendly.",
    },
    {
      type: "figure",
      src: "https://picsum.photos/seed/knowledgebag-verandah-threshold/1200/800?grayscale",
      alt: "A shaded verandah opening onto a bright courtyard",
      caption: "A verandah one step above the yard. Placeholder image, replace with the author's photograph.",
    },
    {
      type: "p",
      text: "Modern plots rarely leave room for any of this. A thirty-foot frontage, a car, a gate, a staircase to the upper floor, and the front door ends up flush with the parking. You step out of the car and you are inside. There is no moment of arrival, and the house feels smaller than its area because it has no edge where it gently ends.",
    },
    { type: "quote", text: "A house without a threshold is a house that has to say no at the front door." },
    {
      type: "p",
      text: "The fix is rarely expensive. In one of our early projects, a narrow house in Kothrud, we pulled the front door back by four feet and widened the plinth into a ledge with a built-in seat of Shahabad stone. We lost a sliver of the living room. The family gained a place where the grandmother now spends most of her evenings, watching the lane, talking to whoever passes. The living room, oddly, feels larger, because you now enter it from shade instead of from glare.",
      note: "Four feet of depth is enough for a seat and a person standing beside it.",
    },
    {
      type: "p",
      text: "That project taught me to ask a different first question. Not how many rooms do you need, but where will you stand when you come home? Where will a guest wait? Where will the children leave their shoes and their bags and their bad moods? The answers usually point to the threshold, and once it is drawn, the rest of the plan arranges itself around it.",
    },
    { type: "h", text: "Three thresholds every home should have" },
    {
      type: "p",
      text: "Over time I have settled on three. The first is the street threshold, the edge where the house meets the city: a step, a ledge, a gate with shade. The second is the arrival threshold, inside the door but before the main room: a place for shoes, keys, a bench, a small window. The third is the sky threshold, the point where the inside meets the open air: a verandah, a balcony, the rim of a courtyard.",
    },
    {
      type: "p",
      text: "Each one is a change of pace. Each one is also a change of temperature, and in our climate that matters more than any finish we specify. A house with all three feels calm before you have noticed a single material. The rest of this book is about how to make them, and what happens to a family when you do.",
    },
  ],
};
