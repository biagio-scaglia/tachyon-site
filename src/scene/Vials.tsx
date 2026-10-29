import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'
import type { Reagent } from '../data'

const SLOTS: [number, number, number][] = [
  [-0.72, 1.2, -0.15],
  [0.68, 1.45, -0.3],
  [0.62, 0.6, 0.05],
]

interface VialProps {
  reagent: Reagent
  position: [number, number, number]
  phase: number
  active: boolean
  onPick: (r: Reagent) => void
}

function Vial({ reagent, position, phase, active, onPick }: VialProps) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const g = ref.current
    if (!g) return
    const t = clock.elapsedTime + phase
    g.position.y = position[1] + Math.sin(t * 0.9) * 0.05
    g.rotation.z = Math.sin(t * 0.6) * 0.18
    g.rotation.y += active ? 0.02 : 0.004
  })

  const click = (ev: ThreeEvent<MouseEvent>) => {
    ev.stopPropagation()
    onPick(reagent)
  }

  return (
    <group
      ref={ref}
      position={position}
      scale={active ? 0.68 : 0.58}
      onClick={click}
      onPointerOver={(ev) => {
        ev.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      {/* glass */}
      <mesh>
        <cylinderGeometry args={[0.055, 0.055, 0.32, 24, 1, true]} />
        <meshStandardMaterial color="#cfe9ff" transparent opacity={0.18} roughness={0.1} depthWrite={false} />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <sphereGeometry args={[0.055, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#cfe9ff" transparent opacity={0.18} roughness={0.1} depthWrite={false} />
      </mesh>
      {/* liquid */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.047, 0.047, 0.2, 20]} />
        <meshBasicMaterial color={reagent.color} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <sphereGeometry args={[0.047, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshBasicMaterial color={reagent.color} toneMapped={false} />
      </mesh>
      {/* cork */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.05, 0.045, 0.05, 16]} />
        <meshStandardMaterial color="#8a6a4a" roughness={0.9} />
      </mesh>
      <pointLight color={reagent.color} intensity={active ? 1.6 : 0.5} distance={1.2} decay={2} />
    </group>
  )
}

interface Props {
  reagents: Reagent[]
  activeId: string
  onPick: (r: Reagent) => void
}

export function Vials({ reagents, activeId, onPick }: Props) {
  return (
    <>
      {reagents.map((r, i) => (
        <Vial
          key={r.id}
          reagent={r}
          position={SLOTS[i % SLOTS.length]}
          phase={i * 2.1}
          active={r.id === activeId}
          onPick={onPick}
        />
      ))}
    </>
  )
}
