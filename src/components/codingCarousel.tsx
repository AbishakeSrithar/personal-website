"use client";

import Image from "next/image";

const selfProjects = [
  {
    href: "https://github.com/AbishakeSrithar/fitness-tracker-backend",
    img: "/images/fitnessTracker.png",
    name: "Fitness Tracker",
    tech: "Kotlin",
  },
  {
    href: "https://github.com/AbishakeSrithar/AimlabsVTTracker",
    img: "/images/aimlabsTracker.png",
    name: "Aim Training Tracker",
    tech: "TypeScript",
  },
  {
    href: "https://github.com/AbishakeSrithar/personal-website",
    img: "/images/newPersonalWebsite.png",
    name: "Personal Website",
    tech: "TypeScript",
  },
];

const guidedProjects = [
  {
    href: "https://github.com/AbishakeSrithar/pong-in-assembly",
    img: "/images/pongasm.png",
    name: "Pong",
    tech: "Assembly",
  },
  {
    href: "https://github.com/AbishakeSrithar/ChessProject",
    img: "/images/chess.png",
    name: "Chess",
    tech: "Java",
  },
  {
    href: "https://github.com/AbishakeSrithar/SpaceShooter",
    img: "/images/minigames.png",
    name: "Mini Games",
    tech: "Python",
  },
];

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 w-full mb-2">
      <span className="text-[#00B8D8]/60 text-xs tracking-widest shrink-0">{label}</span>
      <div className="flex-1 h-px bg-[#00B8D8]/20" />
    </div>
  );
}

function ProjectCarousel({ projects }: { projects: typeof selfProjects }) {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 scrollbar-hide w-full pb-1">
      {projects.map(({ href, img, name, tech }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          className="shrink-0 snap-start w-4/5 sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]
                     relative group aspect-video overflow-hidden rounded-lg
                     border border-[#00B8D8]/25 hover:border-[#00B8D8]/70
                     hover:shadow-[0_0_14px_rgba(0,184,216,0.2)] transition-all duration-300"
        >
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center
                       bg-black/0 group-hover:bg-black/80 opacity-0 group-hover:opacity-100
                       transition-all duration-300"
          >
            <span className="text-[#00B8D8] text-xs font-bold tracking-wide">{name}</span>
            <span className="text-white/60 text-[10px] mt-1">{tech}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function CodingCarousel() {
  return (
    <div className="snap-center flex flex-col items-center justify-center min-h-screen px-6 py-10 sm:px-12 gap-5">
      <h1 className="text-2xl glitch" data-text="CODING">CODING</h1>
      <p className="text-xs text-center opacity-50 -mt-2">
        Im a Fullstack Programmer! I also enjoy problem solving and maths! :)
      </p>

      <div className="w-full max-w-5xl flex flex-col gap-4">
        <div>
          <SectionLabel label="// SELF PROJECTS" />
          <ProjectCarousel projects={selfProjects} />
        </div>
        <div>
          <SectionLabel label="// GUIDED PROJECTS" />
          <ProjectCarousel projects={guidedProjects} />
        </div>
      </div>

<a
        href="https://github.com/AbishakeSrithar"
        target="_blank"
        className="border border-green-500/60 text-green-400 px-6 py-1.5 text-xs tracking-widest
                   hover:bg-green-500 hover:text-black transition-all duration-200"
      >
        [ GITHUB ]
      </a>
    </div>
  );
}
