'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import GUI from 'lil-gui'

function MyGUI({ count, setCount }: { count: number; setCount: React.Dispatch<React.SetStateAction<number>> }) {
  const guiObjectRef = React.useRef({ count })

  useEffect(() => {
    const gui = new GUI()
    const guiObject = guiObjectRef.current
    const controller = gui.add(guiObject, 'count', 0, 50000).step(100)
    controller.onChange((value: number) => { setCount(value) })
    return () => gui.destroy()
  }, [setCount])

  return null
}

function useParticleTexture() {
  return useMemo(() => new THREE.TextureLoader().load('/images/textures/particles/1.png'), [])
}

function usePointsMaterial(texture: THREE.Texture, size = 0.02) {
  return useMemo(() => new THREE.PointsMaterial({
    size,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    alphaMap: texture,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [texture, size])
}

// ── Effect 1: Wave ───────────────────────────────────────────────────────────
function WaveParticles({ paused, colorKey, count }: { paused: boolean; colorKey: string; count: number }) {
  const particlesRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10
      if (arr[i] === 0) arr[i] = 0.00001
    }
    return arr
  }, [count])

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      switch (colorKey) {
        case 'red':   arr[i3] = 1; arr[i3+1] = 0;            arr[i3+2] = 0; break
        case 'blue':  arr[i3] = 0; arr[i3+1] = 0;            arr[i3+2] = 1; break
        case 'green': arr[i3] = 0; arr[i3+1] = 1;            arr[i3+2] = 0; break
        default:      arr[i3] = Math.random(); arr[i3+1] = Math.random(); arr[i3+2] = Math.random()
      }
    }
    return arr
  }, [count, colorKey])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const tex = useParticleTexture()
  const material = usePointsMaterial(tex)

  useFrame(({ clock }) => {
    if (!particlesRef.current || paused) return
    const t = clock.getElapsedTime()
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i += 2) {
      const i3 = i * 3
      pos[i3 + 1] = Math.sin(t + pos[i3])     + 2.5
      pos[i3 + 4] = Math.cos(t + pos[i3 + 3]) - 2.2
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={particlesRef} geometry={geometry} material={material} />
}

// ── Effect 2: Vortex Galaxy ──────────────────────────────────────────────────
function VortexParticles({ paused, colorKey, count }: { paused: boolean; colorKey: string; count: number }) {
  const particlesRef = useRef<THREE.Points>(null!)
  const metaRef = useRef<Float32Array>(new Float32Array(0))

  const { positions, colors, meta } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const col  = new Float32Array(count * 3)
    const meta = new Float32Array(count * 3) // [r, theta0, y0]

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r  = Math.pow(Math.random(), 0.5) * 5.5
      // Two spiral arms
      const arm      = Math.floor(Math.random() * 2)
      const armBase  = (arm / 2) * Math.PI * 2
      const spread   = 0.35 + r * 0.12
      const theta0   = armBase + r * 0.5 + (Math.random() - 0.5) * spread
      const y0       = (Math.random() - 0.5) * 0.9 * Math.exp(-r * 0.25)

      pos[i3]     = r * Math.cos(theta0)
      pos[i3 + 1] = y0
      pos[i3 + 2] = r * Math.sin(theta0)

      meta[i3]     = r
      meta[i3 + 1] = theta0
      meta[i3 + 2] = y0

      switch (colorKey) {
        case 'red':   col[i3] = 1; col[i3+1] = 0; col[i3+2] = 0; break
        case 'blue':  col[i3] = 0; col[i3+1] = 0; col[i3+2] = 1; break
        case 'green': col[i3] = 0; col[i3+1] = 1; col[i3+2] = 0; break
        default: {
          // cyan core → gold edge
          const t = r / 4.5
          col[i3]     = Math.min(1, t * 1.0 + (Math.random() - 0.5) * 0.25)
          col[i3 + 1] = Math.min(1, (t * 0.55 + (1 - t) * 0.85) + (Math.random() - 0.5) * 0.2)
          col[i3 + 2] = Math.min(1, (1 - t) + (Math.random() - 0.5) * 0.25)
        }
      }
    }
    return { positions: pos, colors: col, meta }
  }, [count, colorKey])

  metaRef.current = meta

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const tex = useParticleTexture()
  const material = usePointsMaterial(tex, 0.025)

  useFrame(({ clock }) => {
    if (!particlesRef.current || paused) return
    const t   = clock.getElapsedTime()
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array
    const m   = metaRef.current

    // Tilt ~54° around X, with a slow precession so it subtly rocks
    const tilt    = Math.PI * 0.3 + Math.sin(t * 0.04) * 0.06
    const cosTilt = Math.cos(tilt)
    const sinTilt = Math.sin(tilt)

    for (let i = 0; i < count; i++) {
      const i3     = i * 3
      const r      = m[i3]
      const theta0 = m[i3 + 1]
      const y0     = m[i3 + 2]
      const theta  = theta0 + t * (0.25 / (r + 0.3))

      const gx = r * Math.cos(theta)
      const gy = y0 + Math.sin(t * 0.5 + r) * 0.05
      const gz = r * Math.sin(theta)

      pos[i3]     = gx
      pos[i3 + 1] = gy * cosTilt - gz * sinTilt
      pos[i3 + 2] = gy * sinTilt + gz * cosTilt
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={particlesRef} geometry={geometry} material={material} />
}

// ── Effect 3: Breathing Sphere ───────────────────────────────────────────────
function SphereParticles({ paused, colorKey, count }: { paused: boolean; colorKey: string; count: number }) {
  const particlesRef = useRef<THREE.Points>(null!)
  const metaRef = useRef<Float32Array>(new Float32Array(0))

  const { positions, colors, meta } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const col  = new Float32Array(count * 3)
    const meta = new Float32Array(count * 3) // unit-sphere coords with noise

    for (let i = 0; i < count; i++) {
      const i3    = i * 3
      const phi   = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const rNoise = 0.85 + Math.random() * 0.3

      const xu = Math.sin(phi) * Math.cos(theta) * rNoise
      const yu = Math.cos(phi) * rNoise
      const zu = Math.sin(phi) * Math.sin(theta) * rNoise

      meta[i3]     = xu
      meta[i3 + 1] = yu
      meta[i3 + 2] = zu

      pos[i3] = xu * 2; pos[i3 + 1] = yu * 2; pos[i3 + 2] = zu * 2

      switch (colorKey) {
        case 'red':   col[i3] = 1; col[i3+1] = 0; col[i3+2] = 0; break
        case 'blue':  col[i3] = 0; col[i3+1] = 0; col[i3+2] = 1; break
        case 'green': col[i3] = 0; col[i3+1] = 1; col[i3+2] = 0; break
        default: {
          // cyan bottom → magenta top
          const t    = (yu + 1.15) / 2.3
          col[i3]     = Math.min(1, t)
          col[i3 + 1] = Math.min(1, 1 - t)
          col[i3 + 2] = 1
        }
      }
    }
    return { positions: pos, colors: col, meta }
  }, [count, colorKey])

  metaRef.current = meta

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const tex = useParticleTexture()
  const material = usePointsMaterial(tex)

  useFrame(({ clock }) => {
    if (!particlesRef.current || paused) return
    const t   = clock.getElapsedTime()
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array
    const m   = metaRef.current

    const pulse = 1.8 + Math.sin(t * 0.9) * 0.8
    const rotY  = t * 0.15

    for (let i = 0; i < count; i++) {
      const i3  = i * 3
      const xu  = m[i3]; const yu = m[i3 + 1]; const zu = m[i3 + 2]
      const xr  = xu * Math.cos(rotY) - zu * Math.sin(rotY)
      const zr  = xu * Math.sin(rotY) + zu * Math.cos(rotY)
      const scale = pulse + Math.sin(t * 2 + xu * 3 + yu * 3) * 0.15
      pos[i3]     = xr * scale
      pos[i3 + 1] = yu * scale
      pos[i3 + 2] = zr * scale
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={particlesRef} geometry={geometry} material={material} />
}

// ── Root ─────────────────────────────────────────────────────────────────────
export default function ThreeJSGame() {
  const [paused, setPaused]     = useState(false)
  const [colorKey, setColorKey] = useState<'default' | 'red' | 'blue' | 'green'>('default')
  const [count, setCount]       = useState(7000)
  const [showGUI, setShowGUI]   = useState(false)
  const [mode, setMode]         = useState<1 | 2 | 3>(1)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'p': setPaused(prev => !prev); break
        case 'b': setColorKey('blue');      break
        case 'g': setColorKey('green');     break
        case 'r': setColorKey('red');       break
        case 'd': setColorKey('default');   break
        case 'h': setShowGUI(v => !v);      break
        case '1': setMode(1);               break
        case '2': setMode(2);               break
        case '3': setMode(3);               break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        className="webgl w-full h-full pointer-events-auto"
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        {mode === 1 && <SphereParticles paused={paused} colorKey={colorKey} count={count} />}
        {mode === 2 && <VortexParticles paused={paused} colorKey={colorKey} count={count} />}
        {mode === 3 && <WaveParticles   paused={paused} colorKey={colorKey} count={count} />}
      </Canvas>
      {showGUI && <MyGUI count={count} setCount={setCount} />}
    </div>
  )
}
