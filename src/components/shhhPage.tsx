'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const COMMANDS: Record<string, string> = {
  snake:   '/snake',
  serious: '/serious',
}

export default function ShhhPage() {
  const [input,  setInput]  = useState('')
  const [status, setStatus] = useState<'idle' | 'granted' | 'denied'>('idle')
  const inputRef   = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // auto-focus input when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) inputRef.current?.focus() },
      { threshold: 0.6 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd   = input.trim().toLowerCase()
    const route = COMMANDS[cmd]
    if (route) {
      setStatus('granted')
      setTimeout(() => router.push(route), 900)
    } else {
      setStatus('denied')
      setTimeout(() => { setStatus('idle'); setInput('') }, 1400)
    }
  }

  return (
    <div
      ref={sectionRef}
      className="snap-center flex flex-col items-center justify-center min-h-screen px-6 gap-7"
    >
      <div className="text-center">
        <h1 className="text-2xl glitch" data-text="SHHH">SHHH</h1>
        <p className="text-[10px] tracking-widest text-[#00B8D8]/40 mt-2">
          some things aren&apos;t meant to be found
        </p>
      </div>

      <form
        onSubmit={submit}
        className="flex flex-col items-center gap-5 w-full max-w-xs"
      >
        {/* terminal input */}
        <div
          className="flex items-center gap-3 w-full px-4 py-3
                     border border-[#00B8D8]/25 bg-black/50
                     transition-all duration-300
                     focus-within:border-[#00B8D8]/60
                     focus-within:shadow-[0_0_18px_rgba(0,184,216,0.12)]"
        >
          <span className="text-[#00B8D8] font-[kongtext] text-sm select-none">&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value); setStatus('idle') }}
            disabled={status === 'granted'}
            autoComplete="off"
            spellCheck={false}
            placeholder="_ _ _"
            className="flex-1 bg-transparent font-[kongtext] text-sm text-[#00B8D8]
                       outline-none caret-[#00B8D8]
                       placeholder:text-[#00B8D8]/20
                       disabled:opacity-60"
          />
        </div>

        {/* feedback */}
        <div className="h-4 font-[kongtext] text-[10px] tracking-widest">
          {status === 'granted' && (
            <span className="text-[#00F0FF] animate-pulse">ACCESS GRANTED</span>
          )}
          {status === 'denied' && (
            <span className="text-red-400/80">UNKNOWN COMMAND</span>
          )}
        </div>
      </form>
    </div>
  )
}
