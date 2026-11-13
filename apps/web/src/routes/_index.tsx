import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { Services } from "@/components/sections/services";

import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "نُورا | استوديو للإبداع والابتكار" },
    {
      name: "description",
      content:
        "نُورا استوديو للإبداع والابتكار: من الفكرة تبدأ الحكاية، وبالإبداع نصنع الأثر. هويات بصرية وتجارب رقمية تصنع فرقاً حقيقياً.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Approach />
      <Impact />
      <Faq />
      <Contact />
    </>
  );
}
