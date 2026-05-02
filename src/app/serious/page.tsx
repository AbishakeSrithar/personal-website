import Image from 'next/image'
import Link from 'next/link'

const selfProjects = [
  { href: 'https://github.com/AbishakeSrithar/fitness-tracker-backend',  img: '/images/fitnessTracker.png',      name: 'Fitness Tracker',      tech: 'Kotlin' },
  { href: 'https://github.com/AbishakeSrithar/AimlabsVTTracker',         img: '/images/aimlabsTracker.png',      name: 'Aim Training Tracker', tech: 'TypeScript' },
  { href: 'https://github.com/AbishakeSrithar/personal-website',          img: '/images/newPersonalWebsite.png',  name: 'Personal Website',     tech: 'TypeScript' },
]

const guidedProjects = [
  { href: 'https://github.com/AbishakeSrithar/pong-in-assembly', img: '/images/pongasm.png',   name: 'Pong',       tech: 'Assembly' },
  { href: 'https://github.com/AbishakeSrithar/ChessProject',     img: '/images/chess.png',     name: 'Chess',      tech: 'Java' },
  { href: 'https://github.com/AbishakeSrithar/SpaceShooter',     img: '/images/minigames.png', name: 'Mini Games', tech: 'Python' },
]

const videoIds = [
  'wmUl96hXzGU', 'cXvJV8O4bTw', 'nYAQy4UoxvU',
  'dY_sSaFejxI', 'us71WgK1UIA', 'f_quWPxmgnc',
]

export default function SeriousPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-slate-100 antialiased">

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-white">Abishake Srithar</span>
          <nav className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#gaming"   className="hover:text-white transition-colors">Gaming</a>
            <a
              href="https://github.com/AbishakeSrithar"
              target="_blank"
              className="px-3 py-1.5 rounded-md bg-white text-[#0d0d0d] text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="text-blue-400 text-sm font-medium tracking-wide mb-4">Hello World!</p>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 text-white">
          I&apos;m a Programmer<br className="hidden sm:block" /> &amp; Gamer.
        </h1>
        <p className="text-slate-400 text-lg max-w-xl leading-relaxed mb-10">
          Welcome to my little corner of the internet. I&apos;m a Java Backend Engineer
          with professional experience in AWS, Linux, TS, JS and Python.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/AbishakeSrithar"
            target="_blank"
            className="px-5 py-2.5 bg-white text-[#0d0d0d] text-sm font-semibold rounded-lg
                       hover:bg-slate-200 transition-colors"
          >
            View GitHub
          </a>
          <a
            href="https://www.youtube.com/@Lilshakee"
            target="_blank"
            className="px-5 py-2.5 border border-white/15 text-slate-300 text-sm font-medium rounded-lg
                       hover:border-white/40 hover:text-white transition-colors"
          >
            YouTube
          </a>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────── */}
      <section id="projects" className="border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-white">Projects</h2>
            <p className="text-slate-500 text-sm">Things I&apos;ve built</p>
          </div>

          <div className="mb-8">
            <p className="text-xs font-medium text-slate-600 uppercase tracking-widest mb-4">Self-directed</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selfProjects.map(p => <ProjectCard key={p.href} {...p} />)}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 uppercase tracking-widest mb-4">Guided</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guidedProjects.map(p => <ProjectCard key={p.href} {...p} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gaming ──────────────────────────────────────────────── */}
      <section id="gaming" className="border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-white">Gaming</h2>
            <p className="text-slate-500 text-sm">I&apos;ve been an avid gamer since I was 5</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {videoIds.map(id => (
              <a
                key={id}
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
                className="group relative aspect-video rounded-xl overflow-hidden bg-white/5
                           ring-1 ring-white/20 hover:ring-white/60 hover:shadow-[0_0_24px_rgba(255,255,255,0.1)]
                           transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                  alt="Gameplay clip"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300
                                flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <span className="text-[#0d0d0d] text-sm pl-0.5">▶</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://www.youtube.com/@Lilshakee"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
            >
              View channel →
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <span>Abishake Srithar</span>
          <div className="flex gap-5">
            <a href="https://github.com/AbishakeSrithar" target="_blank" className="hover:text-slate-300 transition-colors">GitHub</a>
            <a href="https://www.youtube.com/@Lilshakee"  target="_blank" className="hover:text-slate-300 transition-colors">YouTube</a>
            <Link href="/" className="hover:text-slate-300 transition-colors">Back to site</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}

function ProjectCard({ href, img, name, tech }: { href: string; img: string; name: string; tech: string }) {
  return (
    <a
      href={href}
      target="_blank"
      className="group relative aspect-video rounded-xl overflow-hidden bg-white/5
                 ring-1 ring-white/20 hover:ring-white/60 hover:shadow-[0_0_24px_rgba(255,255,255,0.1)]
                 transition-all duration-300"
    >
      <Image
        src={img}
        alt={name}
        fill
        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      flex flex-col justify-end p-4">
        <span className="text-white text-sm font-semibold">{name}</span>
        <span className="text-white/50 text-xs mt-0.5">{tech}</span>
      </div>
    </a>
  )
}
