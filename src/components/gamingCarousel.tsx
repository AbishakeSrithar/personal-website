'use client';

import { useEffect, useRef } from "react";

export default function GamingCarousel() {
  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToSecondSlide = (ref: React.RefObject<HTMLDivElement | null>) => {
      const node = ref.current;
      if (!node || node.children.length < 2) return;
      const secondSlide = node.children[1] as HTMLElement;
      node.scrollTo({ left: secondSlide.offsetLeft, behavior: "auto" });
    };

    scrollToSecondSlide(carouselRef1);
    scrollToSecondSlide(carouselRef2);
  }, []);
  return (
    <div className="items-center justify-items-center" id="main">
      <p className="text-center m-5">Im an avid gamer and have been since I was 5yrs old XD</p>
      <div
       ref={carouselRef1}
        className="flex md:hidden w-[80vw] mx-auto overflow-x-auto snap-x snap-mandatory gap-4 p-4 scrollbar-hide"
      >
        {[
          "wmUl96hXzGU",
          "cXvJV8O4bTw",
          "nYAQy4UoxvU",
          "dY_sSaFejxI",
        ].map((id) => (
          <iframe
            key={id}
            className="aspect-video w-[60vw] snap-center rounded-md"
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen
          />
        ))}
      </div>
      <div 
       ref={carouselRef2}
      className="flex md:hidden w-[80vw] mx-auto overflow-x-auto snap-x snap-mandatory gap-4 p-4 scrollbar-hide">
        {[
         "us71WgK1UIA",
           "f_quWPxmgnc",
          "oWuubvRDKwE",
           "tU_Fvmqf9ww",
          ].map(
          (id) => (
            <iframe
              key={id}
              className="aspect-video w-[60vw] snap-center rounded-md"
              src={`https://www.youtube.com/embed/${id}`}
              allowFullScreen
            />
          )
        )}
      </div>

      {/* Desktop grid (hidden on mobile) */}
      <div
       className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 p-4 w-[60vw]">
        {[
          "wmUl96hXzGU",
          "cXvJV8O4bTw",
          "nYAQy4UoxvU",
          "us71WgK1UIA",
          "f_quWPxmgnc",
          "oWuubvRDKwE",
        ].map((id) => (
          <iframe
            key={id}
            className="aspect-video w-[18vw] h-[9vw] rounded-md"
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen
          />
        ))}
      </div>
      <div className="pt-7 text-center">
              <p>2025 Favourites:</p>
              <br />
              <div className="flex justify-center">
                <ul className="list-disc text-left">
                  <li>Valorant</li>
                  <li>Dead Cells</li>
                  <li>Hades 2</li>
                  <li>SilkSong (plz)</li>
                </ul>
              </div>
            </div>
    </div>
  );
}
