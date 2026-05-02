"use client";

const row1 = ["wmUl96hXzGU", "cXvJV8O4bTw", "nYAQy4UoxvU", "dY_sSaFejxI"];
const row2 = ["us71WgK1UIA", "f_quWPxmgnc", "oWuubvRDKwE", "tU_Fvmqf9ww"];

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 w-full mb-2">
      <span className="text-[#00B8D8]/60 text-xs tracking-widest shrink-0">{label}</span>
      <div className="flex-1 h-px bg-[#00B8D8]/20" />
    </div>
  );
}

function VideoCard({ id }: { id: string }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      className="relative group aspect-video overflow-hidden rounded-lg
                 border border-[#00B8D8]/25 hover:border-[#00B8D8]/70
                 hover:shadow-[0_0_14px_rgba(0,184,216,0.2)] transition-all duration-300 block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt="Gameplay clip"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/55 transition-all duration-300">
        <span className="text-white/70 text-3xl transition-all duration-300 group-hover:text-[#00B8D8] group-hover:drop-shadow-[0_0_10px_rgba(0,184,216,0.9)]">
          ▶
        </span>
      </div>
    </a>
  );
}

function VideoRow({ ids }: { ids: string[] }) {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 scrollbar-hide pb-1">
      {ids.map((id) => (
        <div key={id} className="shrink-0 snap-start w-4/5 sm:w-[calc(50%-6px)]">
          <VideoCard id={id} />
        </div>
      ))}
    </div>
  );
}

export default function GamingCarousel() {
  return (
    <div className="snap-center flex flex-col items-center justify-center min-h-screen px-6 py-10 sm:px-12 gap-5">
      <h1 className="text-2xl glitch" data-text="GAMING">GAMING</h1>
      <p className="text-xs text-center opacity-50 -mt-2">
        Im an avid gamer and have been since I was 5yrs old XD
      </p>

      <div className="w-full max-w-5xl flex flex-col gap-4">
        {/* Mobile: two labeled carousel rows */}
        <div className="flex flex-col gap-4 md:hidden">
          <div>
            <SectionLabel label="// CLIPS & HIGHLIGHTS" />
            <VideoRow ids={row1} />
          </div>
          <div>
            <SectionLabel label="// MORE CLIPS" />
            <VideoRow ids={row2} />
          </div>
        </div>

        {/* Desktop: 3×2 grid (first 6) */}
        <div className="hidden md:block">
          <SectionLabel label="// CLIPS & HIGHLIGHTS" />
          <div className="grid grid-cols-3 gap-3">
            {[...row1, ...row2].slice(0, 6).map((id) => (
              <VideoCard key={id} id={id} />
            ))}
          </div>
        </div>
      </div>

      <a
        href="https://www.youtube.com/@Lilshakee"
        target="_blank"
        className="border border-red-500/60 text-red-400 px-6 py-1.5 text-xs tracking-widest
                   hover:bg-red-500 hover:text-black transition-all duration-200"
      >
        [ YOUTUBE ]
      </a>
    </div>
  );
}
