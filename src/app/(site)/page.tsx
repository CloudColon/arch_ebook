import { Hero } from "@/components/hero";
import { Elevation } from "@/components/elevation";
import { Sample } from "@/components/sample";
import { Testimonials } from "@/components/testimonials";
import { Author } from "@/components/author";
import { Pricing } from "@/components/pricing";
import { Colophon } from "@/components/colophon";

export default function Home() {
  return (
    <>
      <Hero />
      <Elevation />
      <Sample />
      <Testimonials />
      <Author />
      <Pricing />
      <Colophon />
    </>
  );
}
