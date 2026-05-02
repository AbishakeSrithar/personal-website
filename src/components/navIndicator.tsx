'use client'

import { useState, useEffect } from 'react'

const SECTIONS = ['HOME', 'CODING', 'GAMING', 'SHHH']

export default function NavIndicator() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const container = document.getElementById('snap-container')
    if (!container) return

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight)
      setActive(Math.min(index, SECTIONS.length - 1))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (index: number) => {
    const container = document.getElementById('snap-container')
    container?.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' })
  }

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[9997] flex flex-col gap-4">
      {SECTIONS.map((label, i) => (
        <button
          key={label}
          onClick={() => scrollTo(i)}
          className="group flex items-center justify-end gap-2.5 cursor-pointer w-full"
          aria-label={`Go to ${label}`}
        >
          {/* label — slides in from right on hover */}
          <span
            className={`text-[10px] tracking-widest transition-all duration-200
              ${i === active ? 'text-[#00B8D8] opacity-100' : 'text-[#00B8D8]/50 opacity-0 group-hover:opacity-100'}`}
          >
            {label}
          </span>

          {/* pixel dot */}
          <div
            className={`w-2 h-2 transition-all duration-300
              ${i === active
                ? 'bg-[#00B8D8] shadow-[0_0_8px_rgba(0,184,216,0.9)]'
                : 'bg-[#00B8D8]/25 group-hover:bg-[#00B8D8]/60'}`}
          />
        </button>
      ))}
    </div>
  )
}
