'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Link from 'next/link'

// ── Input ────────────────────────────────────────────────────────────────────
function useKeys() {
  const keys = useRef({ w: false, a: false, s: false, d: false })
  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      if (['w','W','ArrowUp'].includes(e.key))    { keys.current.w = true; if (e.key.startsWith('Arrow')) e.preventDefault() }
      if (['a','A','ArrowLeft'].includes(e.key))  { keys.current.a = true; if (e.key.startsWith('Arrow')) e.preventDefault() }
      if (['s','S','ArrowDown'].includes(e.key))  { keys.current.s = true; if (e.key.startsWith('Arrow')) e.preventDefault() }
      if (['d','D','ArrowRight'].includes(e.key)) { keys.current.d = true; if (e.key.startsWith('Arrow')) e.preventDefault() }
    }
    const up = (e: KeyboardEvent) => {
      if (['w','W','ArrowUp'].includes(e.key))    keys.current.w = false
      if (['a','A','ArrowLeft'].includes(e.key))  keys.current.a = false
      if (['s','S','ArrowDown'].includes(e.key))  keys.current.s = false
      if (['d','D','ArrowRight'].includes(e.key)) keys.current.d = false
    }
    window.addEventListener('keydown', dn)
    window.addEventListener('keyup',   up)
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up) }
  }, [])
  return keys
}

// ── Car ──────────────────────────────────────────────────────────────────────
const WHEEL_POS: [number, number, number][] = [
  [-0.88, -0.18,  1.15],
  [ 0.88, -0.18,  1.15],
  [-0.88, -0.18, -1.15],
  [ 0.88, -0.18, -1.15],
]

function Car({ keysRef }: { keysRef: ReturnType<typeof useKeys> }) {
  const carRef  = useRef<THREE.Group>(null!)
  const wheelFL = useRef<THREE.Mesh>(null!)
  const wheelFR = useRef<THREE.Mesh>(null!)
  const vel     = useRef({ speed: 0, angle: 0 })
  const { camera } = useThree()

  useFrame((_, dt) => {
    const v = vel.current
    const k = keysRef.current

    if (k.w) v.speed = Math.min(v.speed + 90 * dt, 75)
    if (k.s) v.speed = Math.max(v.speed - 83 * dt, -30)

    v.speed *= Math.pow(0.90, dt * 60)
    if (Math.abs(v.speed) < 0.05) v.speed = 0

    const grip    = Math.min(Math.abs(v.speed) / 12, 1)
    const steerDt = 2.6 * dt * Math.sign(v.speed || 1) * grip
    if (k.a) v.angle += steerDt
    if (k.d) v.angle -= steerDt

    const steerVisual = (k.a ? 1 : k.d ? -1 : 0) * 0.45
    if (wheelFL.current) wheelFL.current.rotation.y = steerVisual
    if (wheelFR.current) wheelFR.current.rotation.y = steerVisual

    const car = carRef.current
    car.position.x += Math.sin(v.angle) * v.speed * dt
    car.position.z += Math.cos(v.angle) * v.speed * dt
    car.rotation.y  = v.angle

    // Camera: pull back further at high speed
    const camDist = 14 + Math.abs(v.speed) * 0.35
    const camH    = 8  + Math.abs(v.speed) * 0.08
    const behind  = new THREE.Vector3(
      Math.sin(v.angle) * -camDist,
      camH,
      Math.cos(v.angle) * -camDist,
    ).add(car.position)
    camera.position.lerp(behind, 4.5 * dt)
    camera.lookAt(car.position.x, 1, car.position.z)
  })

  return (
    <group ref={carRef} position={[0, 0.32, 0]}>
      <mesh castShadow position={[0, 0.28, 0]}>
        <boxGeometry args={[1.7, 0.52, 3.6]} />
        <meshLambertMaterial color="#c0392b" />
      </mesh>
      <mesh castShadow position={[0, 0.76, -0.15]}>
        <boxGeometry args={[1.42, 0.52, 2.1]} />
        <meshLambertMaterial color="#96281b" />
      </mesh>
      <mesh position={[0, 0.76, 0.91]}>
        <boxGeometry args={[1.36, 0.46, 0.06]} />
        <meshLambertMaterial color="#85c1e9" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0.76, -1.21]}>
        <boxGeometry args={[1.36, 0.46, 0.06]} />
        <meshLambertMaterial color="#85c1e9" transparent opacity={0.75} />
      </mesh>
      {([-0.52, 0.52] as number[]).map(x => (
        <mesh key={x} position={[x, 0.28, 1.82]}>
          <boxGeometry args={[0.32, 0.16, 0.06]} />
          <meshLambertMaterial color="#fffde7" emissive="#fffacd" emissiveIntensity={1} />
        </mesh>
      ))}
      {([-0.52, 0.52] as number[]).map(x => (
        <mesh key={x} position={[x, 0.28, -1.82]}>
          <boxGeometry args={[0.32, 0.16, 0.06]} />
          <meshLambertMaterial color="#e74c3c" emissive="#c0392b" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {WHEEL_POS.slice(2).map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.24, 14]} />
          <meshLambertMaterial color="#1c2833" />
        </mesh>
      ))}
      <mesh ref={wheelFL} position={WHEEL_POS[0]} castShadow>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.24, 14]} />
          <meshLambertMaterial color="#1c2833" />
        </mesh>
      </mesh>
      <mesh ref={wheelFR} position={WHEEL_POS[1]} castShadow>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.24, 14]} />
          <meshLambertMaterial color="#1c2833" />
        </mesh>
      </mesh>
    </group>
  )
}

// ── Building types ───────────────────────────────────────────────────────────
function GlassTower({ x, z, w, d, h }: { x:number; z:number; w:number; d:number; h:number }) {
  const floors = Math.floor(h / 3)
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshLambertMaterial color="#1a3550" />
      </mesh>
      {/* Horizontal window bands */}
      {Array.from({ length: floors }, (_, i) => (
        <mesh key={i} position={[0, i * 3 + 1.8, d / 2 + 0.05]}>
          <planeGeometry args={[w - 0.3, 1.6]} />
          <meshLambertMaterial color="#4a90d9" emissive="#1155aa" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {Array.from({ length: floors }, (_, i) => (
        <mesh key={i} position={[0, i * 3 + 1.8, -d / 2 - 0.05]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[w - 0.3, 1.6]} />
          <meshLambertMaterial color="#4a90d9" emissive="#1155aa" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* Roof accent */}
      <mesh position={[0, h + 0.3, 0]}>
        <boxGeometry args={[w * 0.6, 0.6, d * 0.6]} />
        <meshLambertMaterial color="#5ba3e0" emissive="#2266bb" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function ConcreteBlock({ x, z, w, d, h, color = '#7f8c8d' }: { x:number; z:number; w:number; d:number; h:number; color?:string }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshLambertMaterial color={color} />
      </mesh>
      {/* Horizontal stripe detail */}
      <mesh position={[0, h * 0.6, d / 2 + 0.05]}>
        <planeGeometry args={[w, h * 0.08]} />
        <meshLambertMaterial color="#aab" />
      </mesh>
      <mesh position={[0, h * 0.3, d / 2 + 0.05]}>
        <planeGeometry args={[w, h * 0.08]} />
        <meshLambertMaterial color="#aab" />
      </mesh>
    </group>
  )
}

function ModernFlat({ x, z, w, d, h, color = '#c8cdd2' }: { x:number; z:number; w:number; d:number; h:number; color?:string }) {
  return (
    <group position={[x, 0, z]}>
      {/* Main body */}
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshLambertMaterial color={color} />
      </mesh>
      {/* Dark base band */}
      <mesh position={[0, 0.6, d / 2 + 0.05]}>
        <planeGeometry args={[w, 1.2]} />
        <meshLambertMaterial color="#444" />
      </mesh>
      {/* Roof overhang */}
      <mesh position={[0, h + 0.15, 0]}>
        <boxGeometry args={[w + 0.6, 0.3, d + 0.6]} />
        <meshLambertMaterial color="#555" />
      </mesh>
    </group>
  )
}

// ── Street lamp ──────────────────────────────────────────────────────────────
function Lamp({ x, z }: { x:number; z:number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 8, 6]} />
        <meshLambertMaterial color="#888" />
      </mesh>
      {/* Horizontal arm */}
      <mesh position={[0.7, 7.6, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 6]} />
        <meshLambertMaterial color="#888" />
      </mesh>
      {/* LED head */}
      <mesh position={[1.3, 7.2, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshLambertMaterial color="#e8f4f8" emissive="#cceeff" emissiveIntensity={1.5} />
      </mesh>
    </group>
  )
}

// ── Park tree ────────────────────────────────────────────────────────────────
function ParkTree({ x, z, h = 1 }: { x:number; z:number; h?:number }) {
  return (
    <group position={[x, 0, z]} scale={[h, h, h]}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 2.4, 7]} />
        <meshLambertMaterial color="#5d4037" />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <sphereGeometry args={[2, 8, 6]} />
        <meshLambertMaterial color="#388e3c" />
      </mesh>
    </group>
  )
}

// ── Pine tree ─────────────────────────────────────────────────────────────────
function PineTree({ x, z, s = 1 }: { x:number; z:number; s?:number }) {
  return (
    <group position={[x, 0, z]} scale={[s, s, s]}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.32, 2.8, 7]} />
        <meshLambertMaterial color="#4e342e" />
      </mesh>
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[2.4, 2.8, 8]} />
        <meshLambertMaterial color="#2e7d32" />
      </mesh>
      <mesh position={[0, 4.4, 0]} castShadow>
        <coneGeometry args={[1.8, 2.6, 8]} />
        <meshLambertMaterial color="#388e3c" />
      </mesh>
      <mesh position={[0, 5.8, 0]} castShadow>
        <coneGeometry args={[1.2, 2.2, 8]} />
        <meshLambertMaterial color="#43a047" />
      </mesh>
    </group>
  )
}

// ── Cactus ────────────────────────────────────────────────────────────────────
function Cactus({ x, z, s = 1 }: { x:number; z:number; s?:number }) {
  return (
    <group position={[x, 0, z]} scale={[s, s, s]}>
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.38, 6, 8]} />
        <meshLambertMaterial color="#558b2f" />
      </mesh>
      {/* left arm */}
      <mesh position={[-1.1, 2.2, 0]} rotation={[0, 0, Math.PI / 2.8]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 2.2, 7]} />
        <meshLambertMaterial color="#558b2f" />
      </mesh>
      <mesh position={[-2.0, 3.5, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 2.0, 7]} />
        <meshLambertMaterial color="#558b2f" />
      </mesh>
      {/* right arm */}
      <mesh position={[1.0, 3.2, 0]} rotation={[0, 0, -Math.PI / 2.8]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 2.0, 7]} />
        <meshLambertMaterial color="#558b2f" />
      </mesh>
      <mesh position={[1.8, 4.8, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 2.0, 7]} />
        <meshLambertMaterial color="#558b2f" />
      </mesh>
    </group>
  )
}

// ── Palm tree ─────────────────────────────────────────────────────────────────
function PalmTree({ x, z, s = 1, lean = 0 }: { x:number; z:number; s?:number; lean?:number }) {
  return (
    <group position={[x, 0, z]} scale={[s, s, s]}>
      <mesh position={[lean * 3, 5, 0]} rotation={[lean * 0.18, 0, lean * 0.18]} castShadow>
        <cylinderGeometry args={[0.18, 0.32, 10, 8]} />
        <meshLambertMaterial color="#8d6e63" />
      </mesh>
      {[0, 1.05, 2.1, 3.15, 4.2, 5.25].map((angle, i) => (
        <mesh key={i} castShadow
          position={[
            lean * 3 + Math.cos(angle) * 2.2,
            9.6,
            Math.sin(angle) * 2.2,
          ]}
          rotation={[0.55, angle, 0]}
        >
          <coneGeometry args={[0.35, 4, 5]} />
          <meshLambertMaterial color="#33691e" />
        </mesh>
      ))}
    </group>
  )
}

// ── Forest zone (north, z < -100) ─────────────────────────────────────────────
function ForestZone() {
  const rng = (n: number) => { const x = Math.sin(n * 127.1 + 1) * 43758.5; return x - Math.floor(x) }

  const trees = useMemo(() => {
    const out: { x:number; z:number; s:number }[] = []
    for (let i = 0; i < 180; i++) {
      const x = (rng(i * 4.1)  - 0.5) * 380
      const z = -115 - rng(i * 9.7)  * 270
      if (Math.abs(x) < 9) continue   // clear centre road
      out.push({ x, z, s: 0.6 + rng(i * 17.3) * 1.1 })
    }
    return out
  }, [])

  const boulders = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    x: (rng(i * 53.1) - 0.5) * 340,
    z: -120 - rng(i * 73.7) * 240,
    w: 2 + rng(i * 31) * 5,
    h: 1 + rng(i * 41) * 3,
    d: 2 + rng(i * 61) * 4,
  })), [])

  return (
    <group>
      {/* Forest floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -250]}>
        <planeGeometry args={[500, 300]} />
        <meshLambertMaterial color="#1b4d1e" />
      </mesh>
      {/* Dirt path continuing north road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, -200]}>
        <planeGeometry args={[9, 200]} />
        <meshLambertMaterial color="#5d4037" />
      </mesh>
      {/* Boulders */}
      {boulders.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]} castShadow>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshLambertMaterial color="#546e7a" />
        </mesh>
      ))}
      {/* Pine trees */}
      {trees.map((t, i) => <PineTree key={i} x={t.x} z={t.z} s={t.s} />)}
      {/* Small lake */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[70, 0.02, -220]}>
        <circleGeometry args={[22, 20]} />
        <meshLambertMaterial color="#1a6bb5" transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

// ── Desert zone (east, x > 100) ───────────────────────────────────────────────
function DesertZone() {
  const rng = (n: number) => { const x = Math.sin(n * 213.7 + 2) * 85432.1; return x - Math.floor(x) }

  const cacti = useMemo(() => {
    const out: { x:number; z:number; s:number }[] = []
    for (let i = 0; i < 65; i++) {
      const x = 115 + rng(i * 6.3) * 270
      const z = (rng(i * 11.7) - 0.5) * 380
      if (Math.abs(z) < 9) continue
      out.push({ x, z, s: 0.5 + rng(i * 23.1) * 0.9 })
    }
    return out
  }, [])

  const mesas = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    x: 130 + rng(i * 37) * 220,
    z: (rng(i * 53) - 0.5) * 340,
    w: 8  + rng(i * 11) * 20,
    h: 4  + rng(i * 17) * 14,
    d: 8  + rng(i * 23) * 18,
  })), [])

  return (
    <group>
      {/* Sand ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[250, 0.005, 0]}>
        <planeGeometry args={[300, 500]} />
        <meshLambertMaterial color="#c8a84b" />
      </mesh>
      {/* Road extension east */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[200, 0.018, 0]}>
        <planeGeometry args={[200, 13]} />
        <meshLambertMaterial color="#252525" />
      </mesh>
      {/* Mesas / rock formations */}
      {mesas.map((m, i) => (
        <group key={i} position={[m.x, 0, m.z]}>
          <mesh position={[0, m.h / 2, 0]} castShadow>
            <boxGeometry args={[m.w, m.h, m.d]} />
            <meshLambertMaterial color={['#a0522d','#8b4513','#cd853f','#b8860b'][i % 4]} />
          </mesh>
          {/* Flat mesa top */}
          <mesh position={[0, m.h + 0.2, 0]}>
            <boxGeometry args={[m.w * 0.85, 0.4, m.d * 0.85]} />
            <meshLambertMaterial color="#c19a6b" />
          </mesh>
        </group>
      ))}
      {/* Cacti */}
      {cacti.map((c, i) => <Cactus key={i} x={c.x} z={c.z} s={c.s} />)}
      {/* Dry riverbed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[200, 0.01, 80]}>
        <planeGeometry args={[200, 12]} />
        <meshLambertMaterial color="#b0936a" />
      </mesh>
    </group>
  )
}

// ── Beach zone (south, z > 100) ───────────────────────────────────────────────
function BeachZone() {
  const rng = (n: number) => { const x = Math.sin(n * 456.8 + 3) * 23456.7; return x - Math.floor(x) }

  const palms = useMemo(() => Array.from({ length: 32 }, (_, i) => ({
    x:    (rng(i * 8.3) - 0.5) * 360,
    z:    115 + rng(i * 14.1) * 120,
    s:    0.7 + rng(i * 21.7) * 0.6,
    lean: (rng(i * 33.1) - 0.5) * 1.6,
  })), [])

  return (
    <group>
      {/* Sand */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 210]}>
        <planeGeometry args={[500, 220]} />
        <meshLambertMaterial color="#d4b483" />
      </mesh>
      {/* Shallow water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 330]}>
        <planeGeometry args={[600, 60]} />
        <meshLambertMaterial color="#64b5f6" transparent opacity={0.75} />
      </mesh>
      {/* Ocean */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 430]}>
        <planeGeometry args={[1000, 280]} />
        <meshLambertMaterial color="#1565c0" />
      </mesh>
      {/* Road south */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 170]}>
        <planeGeometry args={[13, 140]} />
        <meshLambertMaterial color="#252525" />
      </mesh>
      {/* Boardwalk pier */}
      <mesh position={[55, 0.3, 320]} castShadow>
        <boxGeometry args={[5, 0.3, 80]} />
        <meshLambertMaterial color="#8d6e63" />
      </mesh>
      {[300, 320, 340].map((pz, i) => (
        <mesh key={i} position={[55, -1.5, pz]}>
          <cylinderGeometry args={[0.2, 0.2, 4, 6]} />
          <meshLambertMaterial color="#6d4c41" />
        </mesh>
      ))}
      {/* Palm trees */}
      {palms.map((p, i) => <PalmTree key={i} x={p.x} z={p.z} s={p.s} lean={p.lean} />)}
      {/* Beach umbrellas */}
      {[[-40,160],[30,170],[-80,180],[60,155]].map(([bx,bz],i) => (
        <group key={i} position={[bx, 0, bz]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 3, 6]} />
            <meshLambertMaterial color="#bbb" />
          </mesh>
          <mesh position={[0, 3, 0]} rotation={[0.1, 0, 0]}>
            <coneGeometry args={[2.2, 0.5, 12]} />
            <meshLambertMaterial color={['#e53935','#f57c00','#1976d2','#7b1fa2'][i]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ── World ─────────────────────────────────────────────────────────────────────
function World() {
  // Road grid: roads at -56, 0, 56 in both axes, width 13
  const ROAD_OFFSETS = [-56, 0, 56]
  const ROAD_W = 13
  const SIDEWALK_W = 3.5
  const MAP = 400

  const lamps = useMemo(() => {
    const out: { x: number; z: number }[] = []
    const ticks = [-80, -60, -40, -20, 20, 40, 60, 80]
    ROAD_OFFSETS.forEach(rz => ticks.forEach(x => out.push({ x, z: rz + ROAD_W / 2 + SIDEWALK_W })))
    ROAD_OFFSETS.forEach(rx => ticks.forEach(z => out.push({ x: rx + ROAD_W / 2 + SIDEWALK_W, z })))
    return out
  }, [])

  return (
    <>
      <color attach="background" args={['#a8c8e8']} />
      <fog   attach="fog"        args={['#b8d8f0', 80, 420]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[60, 100, 50]} intensity={1.1} castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-camera-far={600}   shadow-camera-left={-160}
        shadow-camera-right={160} shadow-camera-top={160}
        shadow-camera-bottom={-160}
      />

      {/* ── Ground (urban base) ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MAP, MAP]} />
        <meshLambertMaterial color="#303030" />
      </mesh>

      {/* ── Park grass patches ── */}
      {[[-28, -28], [28, 28], [-28, 28], [28, -28]].map(([px, pz], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[px, 0.01, pz]} receiveShadow>
          <planeGeometry args={[38, 38]} />
          <meshLambertMaterial color="#3a7d34" />
        </mesh>
      ))}

      {/* ── Roads (horizontal — run along Z axis) ── */}
      {ROAD_OFFSETS.map(rz => (
        <mesh key={rz} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, rz]}>
          <planeGeometry args={[MAP, ROAD_W]} />
          <meshLambertMaterial color="#252525" />
        </mesh>
      ))}
      {/* ── Roads (vertical — run along X axis) ── */}
      {ROAD_OFFSETS.map(rx => (
        <mesh key={rx} rotation={[-Math.PI / 2, 0, 0]} position={[rx, 0.015, 0]}>
          <planeGeometry args={[ROAD_W, MAP]} />
          <meshLambertMaterial color="#252525" />
        </mesh>
      ))}

      {/* ── Sidewalks ── */}
      {ROAD_OFFSETS.map(rz =>
        [-1, 1].map(side => (
          <mesh key={`${rz}-${side}`} rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.025, rz + side * (ROAD_W / 2 + SIDEWALK_W / 2)]}>
            <planeGeometry args={[MAP, SIDEWALK_W]} />
            <meshLambertMaterial color="#7a7a7a" />
          </mesh>
        ))
      )}
      {ROAD_OFFSETS.map(rx =>
        [-1, 1].map(side => (
          <mesh key={`${rx}-${side}`} rotation={[-Math.PI / 2, 0, 0]}
                position={[rx + side * (ROAD_W / 2 + SIDEWALK_W / 2), 0.025, 0]}>
            <planeGeometry args={[SIDEWALK_W, MAP]} />
            <meshLambertMaterial color="#7a7a7a" />
          </mesh>
        ))
      )}

      {/* ── Centre dashes ── */}
      {[-80,-60,-40,-20,20,40,60,80].map(t =>
        ROAD_OFFSETS.map(r => [
          <mesh key={`hd-${r}-${t}`} rotation={[-Math.PI/2,0,0]} position={[t, 0.03, r]}>
            <planeGeometry args={[6, 0.3]} /><meshLambertMaterial color="#e8e830" />
          </mesh>,
          <mesh key={`vd-${r}-${t}`} rotation={[-Math.PI/2,0,0]} position={[r, 0.03, t]}>
            <planeGeometry args={[0.3, 6]} /><meshLambertMaterial color="#e8e830" />
          </mesh>,
        ])
      )}

      {/* ── Glass towers — NW block ── */}
      <GlassTower x={-30} z={-35} w={10} d={10} h={50} />
      <GlassTower x={-42} z={-24} w={8}  d={8}  h={38} />
      <GlassTower x={-22} z={-45} w={7}  d={7}  h={44} />
      <GlassTower x={-38} z={-40} w={6}  d={6}  h={62} />

      {/* ── Concrete offices — NE block ── */}
      <ConcreteBlock x={28}  z={-36} w={14} d={10} h={20} color="#6d7b8d" />
      <ConcreteBlock x={42}  z={-28} w={10} d={12} h={26} color="#5d6b7d" />
      <ConcreteBlock x={24}  z={-46} w={9}  d={8}  h={14} color="#7a8a9a" />
      <ConcreteBlock x={44}  z={-44} w={8}  d={8}  h={18} color="#5a6878" />

      {/* ── Modern flats — SW block ── */}
      <ModernFlat x={-36} z={30}  w={16} d={10} h={10} color="#c2cdd6" />
      <ModernFlat x={-24} z={44}  w={12} d={12} h={8}  color="#b8c4ce" />
      <ModernFlat x={-44} z={44}  w={8}  d={10} h={12} color="#aab5c0" />
      <ModernFlat x={-30} z={24}  w={10} d={8}  h={7}  color="#ccd5dd" />

      {/* ── Mixed SE block ── */}
      <GlassTower x={34}  z={34}  w={9}  d={9}  h={30} />
      <ConcreteBlock x={44}  z={44}  w={8}  d={8}  h={16} color="#8a9aaa" />
      <ModernFlat x={24}  z={46}  w={10} d={8}  h={9}  color="#bdc8d2" />

      {/* ── Outer city sprawl ── */}
      <GlassTower  x={-90} z={0}   w={12} d={10} h={35} />
      <GlassTower  x={90}  z={0}   w={10} d={10} h={28} />
      <GlassTower  x={0}   z={-90} w={8}  d={8}  h={42} />
      <ConcreteBlock x={90}  z={-55} w={14} d={12} h={22} color="#6a7a8a" />
      <ConcreteBlock x={-90} z={55}  w={12} d={10} h={18} color="#707e8e" />
      <ModernFlat  x={90}  z={55}  w={16} d={12} h={8}  color="#c0c8d0" />
      <ModernFlat  x={-90} z={-55} w={14} d={10} h={10} color="#b5bfc8" />

      {/* ── Park trees ── */}
      {([
        [-20,-20,1.0], [-34,-20,0.8], [-20,-34,0.9], [-34,-34,1.1], [-28,-28,1.3],
        [ 20, 20,1.0], [ 34, 20,0.8], [ 20, 34,0.9], [ 34, 34,1.1], [ 28, 28,1.2],
        [-20, 20,1.0], [-34, 28,0.9], [-26, 36,1.1], [ 28,-20,1.0], [ 36,-34,0.8],
      ] as [number,number,number][]).map(([x,z,h],i) => <ParkTree key={i} x={x} z={z} h={h} />)}

      {/* ── Street lamps ── */}
      {lamps.map((l, i) => <Lamp key={i} x={l.x} z={l.z} />)}
    </>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene() {
  const keys = useKeys()
  return (
    <>
      <World />
      <ForestZone />
      <DesertZone />
      <BeachZone />
      <Car keysRef={keys} />
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CarPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#a8c8e8' }}>
      <Canvas shadows camera={{ position: [0, 9, -15], fov: 60, near: 0.1, far: 600 }}>
        <Scene />
      </Canvas>

      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.85)',
        background: 'rgba(0,0,0,0.4)', padding: '6px 18px', borderRadius: 4, letterSpacing: '0.05em',
      }}>
        WASD / ARROWS — drive
      </div>

      <Link href="/" style={{
        position: 'absolute', top: 20, left: 20, fontFamily: 'monospace', fontSize: 12,
        color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.4)',
        padding: '6px 14px', textDecoration: 'none', borderRadius: 4,
      }}>
        [ BACK ]
      </Link>
    </div>
  )
}
