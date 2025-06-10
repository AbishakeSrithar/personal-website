'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Particles({
  paused,
  colorKey,
}: {
  paused: boolean
  colorKey: 'default' | 'red' | 'blue' | 'green'
}) {
  const particlesRef = useRef<THREE.Points>(null!)

  const count = 3000

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  const colors = useMemo(() => {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    let color: [number, number, number]
    switch (colorKey) {
      case 'red':
        color = [1, 0, 0] // light bright blue
        break
      case 'blue':
        color = [0, 0, 1] // light bright blue
        break
      case 'green':
        color = [0, 1, 0]
        break
      default:
        color = [Math.random(), Math.random(), Math.random()]
        break
    }
    arr[i3] = color[0]
    arr[i3 + 1] = color[1]
    arr[i3 + 2] = color[2]
  }
  return arr
}, [count, colorKey])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const particleTexture = useMemo(() => new THREE.TextureLoader().load('/images/textures/particles/1.png'), [])

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      alphaMap: particleTexture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [particleTexture])

  useFrame(({ clock }) => {
    if (!particlesRef.current || paused) return
    const elapsedTime = clock.getElapsedTime()
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = posArray[i3]
      posArray[i3 + 1] = Math.cos(elapsedTime + x)
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={particlesRef} geometry={geometry} material={material} />
}

export default function ThreeJSGame() {
  const [toggleKeyPressed, setToggleKeyPressed] = useState(false)
  const [colorKey, setColorKey] = useState<'default' | 'red' | 'blue' | 'green'>('default')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'p') {
      setToggleKeyPressed((prev) => !prev) // toggle motion
    } else if (e.key === 'b') {
      setColorKey('blue')
    } else if (e.key === 'g') {
      setColorKey('green')
    } else if (e.key === 'r') {
      setColorKey('red')
    } else if (e.key === 'd') {
      setColorKey('default')
    }}
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        className="webgl w-full h-full pointer-events-auto"
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        {/* Orbit Controls */}
        <OrbitControls enableDamping={true} />

        {/* Particles */}
        <Particles paused={toggleKeyPressed} colorKey={colorKey} />
      </Canvas>
    </div>
  )
}
