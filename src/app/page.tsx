"use client";
import CodingCarousel from "@/components/codingCarousel";
import PacmanGame from "@/components/game";
import GamingCarousel from "@/components/gamingCarousel";
import Image from "next/image";
import TypewriterComp from "@/components/typewriter";
export default function Home() {
  return (
    <main>
      {/* ------------------------ Home ----------------------- */}
      <div className="overflow-scroll h-screen snap-y snap-mandatory">
        <PacmanGame />
        <div className="snap-center flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20">
          <div className="">
            <h1 className="text-2xl">Hello World!</h1>
          </div>
          <div className="items-center justify-items-center" id="main">
            <h3>
              <TypewriterComp />
            </h3>
            <p className="text-center m-5">
              Welcome to my little corner of the internet!
            </p>
          </div>
          <div
            id="footer"
            className="grid grid-cols-2 grid-rows-2 gap-4 w-[60vw] md:w-[15vw]"
          >
            <Image
              src="/images/me_1.png"
              alt="Profile Pic 1"
              width={250}
              height={250}
              className=""
            />
            <Image
              src="/images/me_2.png"
              alt="Profile Pic 1"
              width={250}
              height={250}
              className=""
            />
            <Image
              src="/images/me_3.png"
              alt="Profile Pic 1"
              width={250}
              height={250}
              className=""
            />
            <Image
              src="/images/me_4.png"
              alt="Profile Pic 1"
              width={250}
              height={250}
              className=""
            />
          </div>
        </div>

        {/* ------------------------ Games ----------------------- */}
        <div className="snap-center flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 text-xs">
          <div>
            <h1 className="text-4xl">Gaming!</h1>
          </div>
          <GamingCarousel />
          <div id="footer" className="items-center justify-items-center">
            <h1 className="text-center text-xs">
              Checkout my Gaming Channel:{" "}
            </h1>
            <br></br>
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
          <div className="" id="main">
            <p className="break-words w-[80vw] md:w-[30vw]">
              Im a Programmer by career and hobby! :)
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
                  <li>[ ] 2D Platformer Game</li>
                  <li>[ ] 3D ThreeJS Game</li>
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
