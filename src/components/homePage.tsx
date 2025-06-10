"use client";
import TypewriterComp from "@/components/typewriter";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
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
        {/* <div
          id="footer"
          className="grid grid-cols-2 grid-rows-2 gap-4 m-5 w-[60vw] md:w-[15vw]"
        >
          <Image
            src="/images/rgbpc.png"
            alt="Profile Pic 5"
            width={250}
            height={250}
            className=""
          />
          <Image
            src="/images/setup.png"
            alt="Profile Pic 5"
            width={250}
            height={250}
            className=""
          />
          <Image
            src="/images/posters.png"
            alt="Profile Pic 5"
            width={250}
            height={250}
            className=""
          />
          <Image
            src="/images/me_4.png"
            alt="Profile Pic 7"
            width={250}
            height={250}
            className=""
          />
        </div> */}
      </div>
    </div>
  );
}
