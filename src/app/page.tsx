"use client";
import CodingCarousel from "@/components/codingCarousel";
import CursorTrail from "@/components/cursorTrail";
import GamingCarousel from "@/components/gamingCarousel";
import HomePage from "@/components/homePage";
import NavIndicator from "@/components/navIndicator";
import ThreeJSGame from "@/components/threeJSGame";

export default function Home() {
  return (
    <main>
      <div className="crt-overlay" />
      <div className="crt-vignette" />
        {/* ------------------------ All Pages ----------------------- */}
      <ThreeJSGame />
      <CursorTrail />
      <NavIndicator />
      <div id="snap-container" className="overflow-scroll h-screen snap-y snap-mandatory scrollbar-hide">
        {/* ------------------------ Home Page ----------------------- */}
          <HomePage />
        {/* ------------------------ Code Page ----------------------- */}
          <CodingCarousel />
        {/* ------------------------ Games Page ---------------------- */}
          <GamingCarousel />
      </div>
    </main>
  );
}
