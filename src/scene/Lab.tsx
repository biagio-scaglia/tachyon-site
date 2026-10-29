import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Loader } from '../ui/Loader'
import type { Reagent } from '../data'
import { Tachyon, type Bubble } from './Tachyon'
import { Vials } from './Vials'

const INK = '#2b1a14'

export interface VialsConfig {
  reagents: Reagent[]
  activeId: string
  onPick: (r: Reagent) => void
}

interface Props {
  /** Colour of the reagent currently "in the air": tints the rim light and floor arc. */
  accent: string
  bubble: Bubble | null
  onPoke: () => void
  vials?: VialsConfig
}

/** Transparent canvas: the page's graph paper shows through behind her. */
export default function Lab({ accent, bubble, onPoke, vials }: Props) {
  return (
    <>
      <Canvas
        className="lab-canvas"
        dpr={[1, 2]}
        camera={{ position: [0, 1.15, 3.8], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <hemisphereLight args={['#ffffff', '#c9d6e0', 1.5]} />
        <directionalLight position={[2, 3.5, 3]} intensity={1.5} color="#fff8ee" />
        <directionalLight position={[-3, 2, -2.5]} intensity={1.1} color={accent} />

        <Suspense fallback={null}>
          <Tachyon bubble={bubble} onPoke={onPoke} />
        </Suspense>

        {vials && <Vials reagents={vials.reagents} activeId={vials.activeId} onPick={vials.onPick} />}

        <ContactShadows position={[0, 0.001, 0]} opacity={0.45} scale={4} blur={2.2} far={2} color={INK} />
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, 0]}>
          <ringGeometry args={[0.62, 0.635, 96]} />
          <meshBasicMaterial color={INK} transparent opacity={0.55} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.003, 0]}>
          <ringGeometry args={[0.68, 0.7, 96, 1, 0, Math.PI * 1.2]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>

        <OrbitControls
          target={[0, 0.82, 0]}
          enablePan={false}
          enableZoom={false}
          enableDamping
          minPolarAngle={1.0}
          maxPolarAngle={1.68}
          minAzimuthAngle={-1.1}
          maxAzimuthAngle={1.1}
        />
      </Canvas>
      <Loader />
    </>
  )
}
