"use client";
import CodingCarousel from "@/components/codingCarousel";
import GamingCarousel from "@/components/gamingCarousel";
import HomePage from "@/components/homePage";
import ThreeJSGame from "@/components/threeJSGame";

export default function Home() {
  return (
    <main>
        {/* ------------------------ All Pages ----------------------- */}
      <ThreeJSGame />
      <div className="overflow-scroll h-screen snap-y snap-mandatory scrollbar-hide">
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
