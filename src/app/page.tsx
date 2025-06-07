import PacmanGame from '@/components/game';

export default function Home() {
  return (
    <main>
      <div className="overflow-scroll h-screen snap-y snap-mandatory">
        <PacmanGame />
        <div className="snap-center flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <div className=''>
            <h1 className="text-2xl">Hello World!</h1>
          </div>
          <div className="items-center justify-items-center" id="main">
            <p className="text-center">My name is Abishake!<br></br>Im a programmer/gamer B)</p>
            <p className="text-center">Welcome to my little corner of the internet</p>
          </div>
          <div id="footer" className=''>
            <a href="https://github.com/AbishakeSrithar" className="text-green-500 hover:text-green-500 active:text-blue-500 underline m-5" target="_blank">Github</a>
            <a href="https://www.youtube.com/@Lilshakee" className="text-red-500 hover:text-red-500 active:text-blue-500 underline m-5" target="_blank">YouTube</a>
            <p className="text-center mt-3 text-blue-500 underline">Discord:</p>
            <p className="text-center">Lil_shakee</p>
          </div>
        </div>
        
        <div className="snap-center flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-xs">
          <div>
            <h1 className="text-4xl">Gaming!</h1>
          </div>
          <div className="" id="main">
            <p className="m-5">Im an avid gamer and have been since I was 5yrs old</p>
              <div className="w-[70vw] md:w-[30vw] aspect-video mx-auto overflow-x-auto snap-x snap-mandatory flex gap-4 p-4 scrollbar-hide">
                <iframe className="aspect-video snap-center"
                  src="https://www.youtube.com/embed/jODUBXovhy4"
                ></iframe>
                <iframe className="aspect-video snap-center block md:hidden"
                  src="https://www.youtube.com/embed/v=BLPdvGmxNE0"
                ></iframe>
                <iframe className="aspect-video snap-center block md:hidden"
                  src="https://www.youtube.com/embed/tU_Fvmqf9ww"
                ></iframe>
                <iframe className="aspect-video snap-center block md:hidden"
                  src="https://www.youtube.com/embed/_v_Gpn70BSQ"
                ></iframe>
                <iframe className="aspect-video snap-center block md:hidden"
                  src="https://www.youtube.com/embed/jafPUwXoUOs"
                ></iframe>
              </div>
            <br></br>
            <div className="m-5">
              <p>Games Im playing this year:</p>
              <br></br>
              <ul>
                <li>[x] Valorant</li>
                <li>[x] Dead Cells</li>
                <li>[?] Silksong</li>
              </ul>
              <br></br>
            </div>
          </div>
          <div id="footer" className="items-center justify-items-center">
            <h1 className="text-center text-xs">Checkout my Gaming Channel: </h1>
            <br></br>
            <a href="https://www.youtube.com/@Lilshakee" className="text-red-500 hover:text-red-500 active:text-blue-500 underline" target="_blank">YouTube</a>
          </div>
        </div>

        <div className="snap-center flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-xs">
          <div>
            <h1 className="text-4xl">Coding!</h1>
          </div>
          <div className="" id="main">
            <p className="break-words w-[80vw] md:w-[30vw]">Im a Programmer by career and hobby! :)</p>
              <div className="w-[70vw] md:w-[30vw] mx-auto overflow-x-auto snap-x snap-mandatory flex gap-4 p-4 scrollbar-hide">
                <a href='https://github.com/AbishakeSrithar/fitness-tracker-backend' target="_blank" className="snap-center shrink-0 w-full aspect-video"><img src="/images/fitnessTracker.png" alt="Fitness Tracker"></img></a>
                <a href='https://github.com/AbishakeSrithar/OddsCheckerScraper' target="_blank" className="snap-center shrink-0 w-full aspect-video"><img src="/images/oddsScraper.png" alt="Odds Scraper"></img></a>
              </div>
            <p className="break-words w-[80vw] md:w-[30vw]" >I've been programming for 4 years and have recently made it my mission to make some personal projects from scratch.
            </p>
            <div className="pt-10">
              <p>Projects I want to make by the end of 2025:</p>
              <br></br>
              <div className=''>
                <ul className="">
                  <li>[x] Personal Website</li>
                  <li>[x] Fitness Tracker</li>
                  <li>[ ] Habit Tracker</li>
                  <li>[ ] 2D Platformer Game</li>
                </ul>
              </div>
              <br></br>
            </div>
          </div>
          <div id="footer" className="items-center justify-items-center">
            <h1 className="text-center text-xs">Checkout my Github: </h1>
            <br></br>
            <a href="https://github.com/AbishakeSrithar" className="text-green-500 active:text-blue-500 underline" target="_blank">Github</a>
          </div>
        </div>
      </div>
    </main>
  );
}
