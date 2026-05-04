'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

const CELL = 22
const COLS = 22
const ROWS = 18
const W    = CELL * COLS
const H    = CELL * ROWS

type Point = { x: number; y: number }
type Dir   = { x: number; y: number }

const KEY_DIRS: Record<string, Dir> = {
  ArrowUp:    { x: 0,  y: -1 },
  ArrowDown:  { x: 0,  y:  1 },
  ArrowLeft:  { x: -1, y:  0 },
  ArrowRight: { x: 1,  y:  0 },
  w: { x: 0,  y: -1 },
  s: { x: 0,  y:  1 },
  a: { x: -1, y:  0 },
  d: { x: 1,  y:  0 },
}

const INIT_SNAKE: Point[] = [
  { x: 12, y: 9 }, { x: 11, y: 9 }, { x: 10, y: 9 },
]
const INIT_FOOD: Point = { x: 17, y: 9 }

function spawnFood(snake: Point[]): Point {
  let p: Point
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === p.x && s.y === p.y))
  return p
}

export default function SnakePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const gs = useRef({
    snake:   [...INIT_SNAKE.map(p => ({ ...p }))],
    dir:     { x: 1, y: 0 } as Dir,
    nextDir: { x: 1, y: 0 } as Dir,
    food:    { ...INIT_FOOD },
    score:   0,
    dead:    false,
    started: false,
  })

  const [score, setScore]   = useState(0)
  const [,      setDead]    = useState(false)
  const [,      setStarted] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { snake, food, dead: isDead, score: sc, started: isStarted } = gs.current

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, W, H)

    // subtle grid
    ctx.fillStyle = 'rgba(0,184,216,0.07)'
    for (let x = 0; x < COLS; x++)
      for (let y = 0; y < ROWS; y++)
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2)

    // food — glowing square
    ctx.shadowBlur  = 14
    ctx.shadowColor = '#00F0FF'
    ctx.fillStyle   = '#00F0FF'
    ctx.fillRect(food.x * CELL + 4, food.y * CELL + 4, CELL - 8, CELL - 8)

    // snake
    snake.forEach((seg, i) => {
      const t     = i / snake.length
      const alpha = i === 0 ? 1 : 0.85 - t * 0.5
      ctx.shadowBlur  = i === 0 ? 16 : 5
      ctx.shadowColor = `rgba(0,184,216,${alpha})`
      ctx.fillStyle   = i === 0 ? '#00F0FF' : `rgba(0,184,216,${alpha})`
      ctx.fillRect(seg.x * CELL + 2, seg.y * CELL + 2, CELL - 4, CELL - 4)
    })

    ctx.shadowBlur = 0

    if (!isStarted && !isDead) {
      ctx.fillStyle = 'rgba(0,0,0,0.55)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle   = '#00B8D8'
      ctx.shadowBlur  = 8
      ctx.shadowColor = '#00B8D8'
      ctx.font        = '14px kongtext, monospace'
      ctx.textAlign   = 'center'
      ctx.fillText('PRESS ANY ARROW / WASD', W / 2, H / 2 - 10)
      ctx.fillText('TO START', W / 2, H / 2 + 18)
      ctx.shadowBlur = 0
    }

    if (isDead) {
      ctx.fillStyle = 'rgba(0,0,0,0.65)'
      ctx.fillRect(0, 0, W, H)
      ctx.textAlign   = 'center'
      ctx.shadowBlur  = 10
      ctx.shadowColor = '#00B8D8'
      ctx.fillStyle   = '#00B8D8'
      ctx.font        = '18px kongtext, monospace'
      ctx.fillText('GAME OVER', W / 2, H / 2 - 24)
      ctx.font = '11px kongtext, monospace'
      ctx.fillText(`SCORE: ${sc}`, W / 2, H / 2 + 8)
      ctx.fillText('[ R ] RESTART', W / 2, H / 2 + 34)
      ctx.shadowBlur = 0
    }
  }, [])

  const reset = useCallback(() => {
    const s       = gs.current
    s.snake       = [...INIT_SNAKE.map(p => ({ ...p }))]
    s.dir         = { x: 1, y: 0 }
    s.nextDir     = { x: 1, y: 0 }
    s.food        = { ...INIT_FOOD }
    s.score       = 0
    s.dead        = false
    s.started     = false
    setScore(0)
    setDead(false)
    setStarted(false)
    draw()
  }, [draw])

  const handleDir = useCallback((d: Dir) => {
    const s = gs.current
    if (!s.started) { s.started = true; setStarted(true) }
    if (d.x === -s.dir.x && d.y === -s.dir.y) return
    s.nextDir = d
  }, [])

  useEffect(() => {
    draw()

    const interval = setInterval(() => {
      const s = gs.current
      if (s.dead || !s.started) { draw(); return }

      s.dir = s.nextDir
      const head: Point = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y }

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
          s.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        s.dead = true
        setDead(true)
        draw()
        return
      }

      s.snake.unshift(head)

      if (head.x === s.food.x && head.y === s.food.y) {
        s.score++
        setScore(s.score)
        s.food = spawnFood(s.snake)
      } else {
        s.snake.pop()
      }

      draw()
    }, 130)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') { reset(); return }
      const d = KEY_DIRS[e.key]
      if (!d) return
      handleDir(d)
      if (e.key.startsWith('Arrow')) e.preventDefault()
    }

    window.addEventListener('keydown', onKey)
    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', onKey)
    }
  }, [draw, reset, handleDir])

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-5 p-8 font-[kongtext]">
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      <h1 className="text-2xl text-[#00B8D8] glitch" data-text="SNAKE">SNAKE</h1>

      <div className="flex items-center gap-8 text-sm">
        <span className="text-[#00B8D8]">SCORE: {score}</span>
        <span className="text-[#00B8D8]/35 text-xs">WASD / ARROWS &nbsp;|&nbsp; R = RESTART</span>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="border border-[#00B8D8]/30 shadow-[0_0_40px_rgba(0,184,216,0.12)] max-w-full"
        style={{ touchAction: 'none' }}
      />

      {/* Mobile D-pad — hidden on desktop */}
      <div className="md:hidden flex flex-col items-center gap-2">
        <button
          className="w-14 h-14 rounded-lg bg-[#00B8D8]/10 border border-[#00B8D8]/40 text-[#00B8D8] text-2xl flex items-center justify-center active:bg-[#00B8D8]/25 select-none"
          style={{ touchAction: 'none' }}
          onTouchStart={e => { e.preventDefault(); handleDir({ x: 0, y: -1 }) }}
        >↑</button>
        <div className="flex gap-2">
          <button
            className="w-14 h-14 rounded-lg bg-[#00B8D8]/10 border border-[#00B8D8]/40 text-[#00B8D8] text-2xl flex items-center justify-center active:bg-[#00B8D8]/25 select-none"
            style={{ touchAction: 'none' }}
            onTouchStart={e => { e.preventDefault(); handleDir({ x: -1, y: 0 }) }}
          >←</button>
          <button
            className="w-14 h-14 rounded-lg bg-[#00B8D8]/10 border border-[#00B8D8]/40 text-[#00B8D8] text-2xl flex items-center justify-center active:bg-[#00B8D8]/25 select-none"
            style={{ touchAction: 'none' }}
            onTouchStart={e => { e.preventDefault(); handleDir({ x: 0, y: 1 }) }}
          >↓</button>
          <button
            className="w-14 h-14 rounded-lg bg-[#00B8D8]/10 border border-[#00B8D8]/40 text-[#00B8D8] text-2xl flex items-center justify-center active:bg-[#00B8D8]/25 select-none"
            style={{ touchAction: 'none' }}
            onTouchStart={e => { e.preventDefault(); handleDir({ x: 1, y: 0 }) }}
          >→</button>
        </div>
        <button
          className="mt-1 px-5 py-2 rounded bg-[#00B8D8]/10 border border-[#00B8D8]/40 text-[#00B8D8] text-xs tracking-widest active:bg-[#00B8D8]/25 select-none"
          style={{ touchAction: 'none' }}
          onTouchStart={e => { e.preventDefault(); reset() }}
        >[ RESTART ]</button>
      </div>

      <Link
        href="/"
        className="text-[#00B8D8]/40 text-xs hover:text-[#00B8D8] transition-colors duration-200 tracking-widest"
      >
        [ BACK TO SITE ]
      </Link>
    </main>
  )
}
