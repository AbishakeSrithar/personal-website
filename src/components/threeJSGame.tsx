'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Particles() {
  const particlesRef = useRef<THREE.Points>(null!)

  const count = 10000
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = Math.random()
    }
    return arr
  }, [count])

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
    if (!particlesRef.current) return
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

function Box(props: ThreeElements['mesh'] & { toggleKeyPressed: boolean; toggleColorPressed: boolean }) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [colorToggled, setColorToggled] = useState(false)

  // Sync scale toggle from parent state
  useEffect(() => {
    setClicked(props.toggleKeyPressed)
  }, [props.toggleKeyPressed])

  // Sync color toggle from parent state
  useEffect(() => {
    setColorToggled(props.toggleColorPressed)
  }, [props.toggleColorPressed])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta
      ref.current.rotation.y += delta * 0.5
    }
  })

  // Determine color based on hover and toggle
  const color = hovered ? 'hotpink' : colorToggled ? 'skyblue' : 'orange'

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function ThreeJSGame() {
  const [toggleKeyPressed, setToggleKeyPressed] = useState(false)
  const [toggleColorPressed, setToggleColorPressed] = useState(false)
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 't') {
        setToggleKeyPressed((prev) => !prev)
      } else if (e.key === 'c') {
        setToggleColorPressed((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Just logging the actual canvas element for your info
  useEffect(() => {
    if (canvasElement) {
      console.log('Canvas element:', canvasElement)
    }
  }, [canvasElement])

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        className="webgl w-full h-full pointer-events-auto"
        onCreated={({ gl }) => setCanvasElement(gl.domElement)}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        {/* Orbit Controls */}
        <OrbitControls enableDamping={true} />

        {/* Particles */}
        <Particles />

        {/* Boxes */}
        {/* <Box position={[-1.5, 0, 0]} toggleKeyPressed={toggleKeyPressed} toggleColorPressed={toggleColorPressed} />
        <Box position={[1.5, 0, 0]} toggleKeyPressed={toggleKeyPressed} toggleColorPressed={toggleColorPressed} /> */}
      </Canvas>
    </div>
  )
}
