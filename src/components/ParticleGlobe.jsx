import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  // Generate points on a sphere surface
  const { positions, originalPositions } = useMemo(() => {
    const count = 2800
    const pos = new Float32Array(count * 3)
    const orig = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const r = 2.2

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      pos[i * 3]     = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      orig[i * 3]     = x
      orig[i * 3 + 1] = y
      orig[i * 3 + 2] = z
    }
    return { positions: pos, originalPositions: orig }
  }, [])

  // Mouse tracking
  useMemo(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()

    // Slow rotation
    mesh.current.rotation.y = t * 0.12
    mesh.current.rotation.x = Math.sin(t * 0.08) * 0.15

    // Mouse influence — tilt
    mesh.current.rotation.y += mouse.current.x * 0.3
    mesh.current.rotation.x += mouse.current.y * 0.15

    // Breathe — subtle scale pulse
    const breathe = 1 + Math.sin(t * 0.6) * 0.015
    mesh.current.scale.setScalar(breathe)

    // Distort points near mouse
    const pos = mesh.current.geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const ox = originalPositions[i * 3]
      const oy = originalPositions[i * 3 + 1]
      const oz = originalPositions[i * 3 + 2]

      // Wave ripple
      const wave = Math.sin(ox * 1.5 + t * 1.2) * 0.04
             + Math.cos(oy * 1.5 + t * 0.9) * 0.04

      pos.setXYZ(i, ox + wave, oy + wave, oz + wave)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#5ed29c"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  )
}

function Ring() {
  const mesh = useRef(null)
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = 0.4 + Math.sin(t * 0.3) * 0.08
    mesh.current.rotation.y = t * 0.08
    mesh.current.rotation.z = t * 0.04
  })
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[2.65, 0.008, 4, 180]} />
      <meshBasicMaterial color="#5ed29c" transparent opacity={0.18} />
    </mesh>
  )
}

function Ring2() {
  const mesh = useRef(null)
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = -0.6
    mesh.current.rotation.y = -t * 0.06
    mesh.current.rotation.z = t * 0.05
  })
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[2.9, 0.005, 4, 180]} />
      <meshBasicMaterial color="#5ed29c" transparent opacity={0.10} />
    </mesh>
  )
}

export default function ParticleGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <Particles />
      <Ring />
      <Ring2 />
    </Canvas>
  )
}
