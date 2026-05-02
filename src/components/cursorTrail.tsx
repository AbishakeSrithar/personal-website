'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  opacity: number
  size: number
  vx: number
  vy: number
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const burst     = useRef<Particle[]>([])
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Trail ──────────────────────────────────────────────────────────────
    const spawnTrail = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          opacity: 0.7 + Math.random() * 0.3,
          size: 1.5 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
        })
      }
    }

    // ── Click burst ────────────────────────────────────────────────────────
    const spawnBurst = (x: number, y: number) => {
      const count = 20
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4
        const speed = 2 + Math.random() * 2.5
        burst.current.push({
          x,
          y,
          opacity: 0.9 + Math.random() * 0.1,
          size: 3 + Math.random() * 4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        })
      }
    }

    const onMouseMove  = (e: MouseEvent) => spawnTrail(e.clientX, e.clientY)
    const onMouseDown  = (e: MouseEvent) => spawnBurst(e.clientX, e.clientY)
    const onTouchMove  = (e: TouchEvent) => { const t = e.touches[0]; spawnTrail(t.clientX, t.clientY) }
    const onTouchStart = (e: TouchEvent) => { const t = e.touches[0]; spawnBurst(t.clientX, t.clientY) }

    // ── Animation loop ─────────────────────────────────────────────────────
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // trail
      particles.current = particles.current.filter(p => p.opacity > 0.01)
      ctx.shadowBlur = 8
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        p.opacity *= 0.91
        ctx.shadowColor = `rgba(0,184,216,${p.opacity * 0.6})`
        ctx.fillStyle   = `rgba(0,184,216,${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // burst sparks
      burst.current = burst.current.filter(p => p.opacity > 0.01)
      ctx.shadowBlur = 10
      for (const p of burst.current) {
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.opacity *= 0.983
        ctx.shadowColor = `rgba(0,216,255,${p.opacity * 0.7})`
        ctx.fillStyle   = `rgba(180,240,255,${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowBlur = 0
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('touchmove',  onTouchMove,  { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })

    return () => {
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchstart', onTouchStart)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9996]"
    />
  )
}
