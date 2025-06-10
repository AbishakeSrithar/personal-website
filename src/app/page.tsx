"use client";
import CodingCarousel from "@/components/codingCarousel";
import GamingCarousel from "@/components/gamingCarousel";
import HomePage from "@/components/homePage";
import ThreeJSGame from "@/components/threeJSGame";

export default function Home() {
  return (
    <main>
      {/* ------------------------ Home ----------------------- */}
      <ThreeJSGame />
      <div className="overflow-scroll h-screen snap-y snap-mandatory">
        <HomePage/>

        {/* ------------------------ Games ----------------------- */}
        <div className="snap-center flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 text-xs">
          <div>
            <h1 className="text-4xl">Gaming!</h1>
          </div>
          <GamingCarousel />
          <div id="footer" className="items-center justify-items-center">
            <h1 className="text-center text-xs">
              Checkout my YouTube:
            </h1>
            <a
              href="https://www.youtube.com/@Lilshakee"
              className="text-red-500 hover:text-red-500 active:text-blue-500 underline"
              target="_blank"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* ------------------------ Code ----------------------- */}
        <div className="snap-center flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 text-xs">
          <div>
            <h1 className="text-4xl">Coding!</h1>
          </div>
          <div className="items-center justify-items-center" id="main">
            <p className="text-center m-3">
              Im a Fullstack Programmer! Also quite enjoy problem solving and maths! :) 
            </p>
            <CodingCarousel />
            <div className="pt-7 text-center">
              <p>Personal Project Roadmap:</p>
              <br />
              <div className="flex justify-center">
                <ul className="list-disc text-left">
                  <li>[x] Personal Website</li>
                  <li>[x] Fitness Tracker</li>
                  <li>[ ] Habit Tracker</li>
                  <li>[ ] Platformer Game</li>
                </ul>
              </div>
            </div>
          </div>
          <div id="footer" className="items-center justify-items-center">
            <h1 className="text-center text-xs">Checkout my Github: </h1>
            <a
              href="https://github.com/AbishakeSrithar"
              className="text-green-500 active:text-blue-500 underline"
              target="_blank"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
