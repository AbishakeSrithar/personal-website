"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const selfProjects = [
  {
    href: "https://github.com/AbishakeSrithar/fitness-tracker-backend",
    img: "/images/fitnessTracker.png",
    alt: "Fitness Tracker [Self]",
  },
  {
    href: "https://github.com/AbishakeSrithar/personal-website",
    img: "/images/newPersonalWebsite.png",
    alt: "Personal Website [Self]",
  },
  {
    href: "https://github.com/AbishakeSrithar/OddsCheckerScraper",
    img: "/images/oddsScraper.png",
    alt: "Odds Scraper [Self]",
  },
];
const guidedProjects = [
  {
    href: "https://github.com/AbishakeSrithar/pong-in-assembly",
    img: "/images/pongasm.png",
    alt: "Pong in Assembly [Guided]",
  },
  {
    href: "https://github.com/AbishakeSrithar/ChessProject",
    img: "/images/chess.png",
    alt: "Chess in Java [Guided]",
  },
  {
    href: "https://github.com/AbishakeSrithar/SpaceShooter",
    img: "/images/minigames.png",
    alt: "Mini Games [Guided]",
  },
  {
    href: "https://abishakesrithar.github.io/abishake/",
    img: "/images/oldWebsite.png",
    alt: "Old Website [Guided]",
  },
];

export default function CodingCarousel() {
  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToSecondSlide = (
      ref: React.RefObject<HTMLDivElement | null>
    ) => {
      const node = ref.current;
      if (!node || node.children.length < 2) return;
      const secondSlide = node.children[1] as HTMLElement;
      node.scrollTo({ left: secondSlide.offsetLeft, behavior: "auto" });
    };
    scrollToSecondSlide(carouselRef1);
    scrollToSecondSlide(carouselRef2);
  }, []);

  return (
    <div className="w-full">
      {/* Mobile Carousel */}
      <div
        ref={carouselRef1}
        className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 p-4 scrollbar-hide w-[80vw] mx-auto"
      >
        {selfProjects.map(({ href, img, alt }) => (
          <a
            key={`self_${href}`}
            href={href}
            target="_blank"
            className="shrink-0 snap-center w-[60vw]"
          >
            <Image
              src={img}
              alt={alt}
              width={1280}
              height={720}
              className="object-cover w-full h-full rounded-md"
            />
          </a>
        ))}
      </div>
      <div
        ref={carouselRef2}
        className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 p-4 scrollbar-hide w-[80vw] mx-auto"
      >
        {guidedProjects.map(({ href, img, alt }) => (
          <a
            key={`guided_${href}`}
            href={href}
            target="_blank"
            className="shrink-0 snap-center w-[60vw]"
          >
            <Image
              src={img}
              alt={alt}
              width={1280}
              height={720}
              className="object-cover w-full h-full rounded-md"
            />
            
          </a>
        ))}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 p-4 w-[60vw] mx-auto">
        {[...selfProjects, ...guidedProjects].slice(0, 6).map(({ href, img, alt }) => (
          <a
            key={`comb_${href}`}
            href={href}
            target="_blank"
            className="relative group w-full overflow-hidden rounded-xl"
          >
            <Image
              src={img}
              alt={alt}
              width={1280}
              height={720}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-md"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center text-white text-sm md:text-lg text-center px-4">
              {alt}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
