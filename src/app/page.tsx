export default function Home() {
  return (
    <div className="overflow-scroll h-screen snap-y snap-mandatory">


      <div className="snap-center grid grid-rows-[2fr_5fr_2fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1>Hello World!</h1>
        <div className="grid grid-rows-[2fr_5fr] items-center justify-items-center" id="main">
          <p className="text-center">My name is Abishake!<br></br>Im a programmer/gamer B)</p>
          <p className="text-center">Welcome to my little corner of the internet</p>
        </div>
        <div id="footer">
          <a href="https://github.com/AbishakeSrithar" className="text-green-500 hover:text-green-500 active:text-blue-500 underline m-5" target="_blank">Github</a>
          <a href="https://www.youtube.com/@Lilshakee" className="text-red-500 hover:text-red-500 active:text-blue-500 underline m-5" target="_blank">YouTube</a>
          <p className="text-center mt-3 text-blue-500 underline">Discord:</p>
          <p className="text-center">Lil_shakee</p>
        </div>
      </div>

      
      <div className="snap-center flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-xs">
        <div>
          <h1 className="text-4xl">Gaming!</h1>
        </div>
        <div className="" id="main">
          <p className="m-5">Im an avid gamer and have been since I was 5yrs old</p>
          <div className="">
            <div className="w-[70vw] md:w-[40vw] aspect-video mx-auto overflow-x-auto snap-x snap-mandatory flex gap-4 p-4 scrollbar-hide">
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
            </div>
          <br></br>
          <div className="m-5">
            <p>Games Im currently playing:</p>
            <br></br>
            <ul>
              <li>- Valorant</li>
              <li>- Dead Cells</li>
            </ul>
            <br></br>
          </div>
          
          <div className="m-5">
            <p>Games Ive enjoyed in the past:</p>
            <br></br>
            <ul>
              <li>- Call of Duty (MW2/3, BO1/2/3)</li>
              <li>- Fortnite</li>
              <li>- Hollow Knight</li>
              <li>- Hades 1/2</li>
            </ul>
          </div>
        </div>
        <div id="footer" className="items-center justify-items-center">
          <h1 className="text-center text-xs">Checkout my Gaming Channel: </h1>
          <br></br>
          <a href="https://www.youtube.com/@Lilshakee" className="text-red-500 hover:text-red-500 active:text-blue-500 underline" target="_blank">YouTube</a>
        </div>
      </div>
    </div>
  );
}
