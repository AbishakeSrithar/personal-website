'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import GUI from 'lil-gui'; 

function MyGUI({ count, setCount }: { count: number; setCount: React.Dispatch<React.SetStateAction<number>> }) { // represents (value: T | ((prev: T) => T)) => void;
  const guiObjectRef = React.useRef({ count })

  useEffect(() => {
    const gui = new GUI()
    const guiObject = guiObjectRef.current

    const controller = gui.add(guiObject, 'count', 0, 50000).step(100)

    controller.onChange((value: number) => {
      setCount(value)
    })

    return () => gui.destroy()
  }, [setCount])

  return null
}

function Particles({
  paused,
  colorKey,
  count
}: {
  paused: boolean
  colorKey: 'default' | 'red' | 'blue' | 'green'
  count: number
}) {
  const particlesRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => { // react hook to cache vals + only re-render if [count] changes
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10
      if (arr[i] == 0) {
        arr[i] = 0.00001 // I may or may not divide by 0 in the future
      }
    }
    return arr
  }, [count])

  const colors = useMemo(() => { // react hook to cache vals + only re-render if [count, colorkey] changes
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    let color: [number, number, number]
    switch (colorKey) {
      case 'red':
        color = [1, 0, 0]
        break
      case 'blue':
        color = [0, 0, 1]
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

  const geometry = useMemo(() => { // react hook to cache vals + only re-render if [position, count] changes
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // groups of 3 for x,y,z coords
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3)) // groups of 3 for rgb vals
    return geo
  }, [positions, colors])

  const particleTexture = useMemo(() => new THREE.TextureLoader().load('/images/textures/particles/1.png'), []) // Dependent on [] so only runs once then never re-renders (as opposed to runnin on every state/prop change in React Comp)

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
  }, [particleTexture]) // not needed as partTex is one time but just in case of future change

  useFrame(({ clock }) => {
    if (!particlesRef.current || paused) return
    const elapsedTime = clock.getElapsedTime()
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i += 2) {
      const i3 = i * 3
      const x1 = posArray[i3]
      const x2 = posArray[i3 + 3]
      posArray[i3 + 1] = Math.cos(elapsedTime + x1) + 2.5
      posArray[i3 + 4] = Math.cos(elapsedTime + x2) - 1.7
      // const y = posArray[i3 + 2]
      // posArray[i3 + 1] = Math.tan(Math.sqrt(((x * elapsedTime * 0.05)**2 + (y * elapsedTime * 0.1)**2))) / (1/x + 1/y) // AKA THE SEIZURE INDUCER
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={particlesRef} geometry={geometry} material={material} />
}

export default function ThreeJSGame() {
  const [toggleKeyPressed, setToggleKeyPressed] = useState(false)
  const [colorKey, setColorKey] = useState<'default' | 'red' | 'blue' | 'green'>('default')
  const [count, setCount] = useState(7000)  
  const [showGUI, setShowGUI] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'p') {
      setToggleKeyPressed((prev) => !prev) // toggle pause
    } else if (e.key === 'b') {
      setColorKey('blue')
    } else if (e.key === 'g') {
      setColorKey('green')
    } else if (e.key === 'r') {
      setColorKey('red')
    } else if (e.key === 'd') {
      setColorKey('default')
    } else if (e.key === 'h') {
      setShowGUI((v) => !v);
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

        {/* Particles */}
        <Particles paused={toggleKeyPressed} colorKey={colorKey} count={count} />
      </Canvas>
      {showGUI && <MyGUI count={count} setCount={setCount} />}
    </div>
  )
}
