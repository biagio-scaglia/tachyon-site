import { Html, useGLTF } from '@react-three/drei'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { buildRig, facingDirection, setWorldDelta, type Rig } from './rig'

const MODEL_URL = `${import.meta.env.BASE_URL}tachyon.glb`
const HEIGHT = 1.7
const IDLE_AFTER = 5 // seconds without pointer movement before she looks back at you

export interface Bubble {
  id: number
  text: string
}

interface Props {
  bubble: Bubble | null
  onPoke: () => void
}

/** Toon-ish look: the textures already carry the shading, so keep lighting soft and matte. */
function prepareMaterials(root: THREE.Object3D): void {
  root.traverse((o) => {
    if (!(o instanceof THREE.Mesh)) return
    o.frustumCulled = false
    o.castShadow = true
    const mats = Array.isArray(o.material) ? o.material : [o.material]
    for (const m of mats) {
      if (m instanceof THREE.MeshStandardMaterial) {
        m.metalness = 0
        m.roughness = 1
        m.envMapIntensity = 0
      }
      if (m instanceof THREE.MeshPhysicalMaterial) m.specularIntensity = 0.15
    }
  })
}

function place(scene: THREE.Object3D): { root: THREE.Group; rig: Rig } {
  const root = new THREE.Group()
  root.add(scene)
  root.updateMatrixWorld(true)

  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const s = HEIGHT / size.y
  scene.scale.multiplyScalar(s)
  scene.position.set(-center.x * s, -box.min.y * s, -center.z * s)
  root.updateMatrixWorld(true)

  const f = facingDirection(scene)
  root.rotation.y = -Math.atan2(f.x, f.z)
  root.updateMatrixWorld(true)

  return { root, rig: buildRig(scene) }
}

const damp = THREE.MathUtils.damp

export function Tachyon({ bubble, onPoke }: Props) {
  const gltf = useGLTF(MODEL_URL, false, true)
  // Work on a clone: the cached gltf.scene must stay untouched, otherwise a second
  // run (StrictMode, HMR) would re-parent it and leave the rendered group empty.
  const { root, rig } = useMemo(() => {
    const scene = cloneSkinned(gltf.scene)
    prepareMaterials(scene)
    return place(scene)
  }, [gltf.scene])

  const anchor = useRef<THREE.Group>(null)
  const look = useRef({ yaw: 0, pitch: 0 })
  const pointerState = useRef({ x: 0, y: 0, movedAt: 0 })
  const ear = useRef({ next: 2.5, start: -10, side: 0 as 0 | 1 | 2 })
  const pokedAt = useRef(-10)
  const pokeRequested = useRef(false)

  const tmp = useMemo(
    () => ({
      ray: new THREE.Raycaster(),
      plane: new THREE.Plane(),
      head: new THREE.Vector3(),
      cam: new THREE.Vector3(),
      hit: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      n: new THREE.Vector3(),
      rootQ: new THREE.Quaternion(),
      rootQInv: new THREE.Quaternion(),
      q: new THREE.Quaternion(),
      e: new THREE.Euler(0, 0, 0, 'YXZ'),
    }),
    [],
  )

  /** Rotation expressed in the character's own frame (x right, y up, z towards viewer), as a world delta. */
  const localDelta = (x: number, y: number, z: number): THREE.Quaternion => {
    tmp.e.set(x, y, z, 'YXZ')
    return tmp.q.setFromEuler(tmp.e).premultiply(tmp.rootQ).multiply(tmp.rootQInv)
  }

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const { camera, pointer } = state
    root.getWorldQuaternion(tmp.rootQ)
    tmp.rootQInv.copy(tmp.rootQ).invert()

    const ps = pointerState.current
    if (pointer.x !== ps.x || pointer.y !== ps.y) {
      ps.x = pointer.x
      ps.y = pointer.y
      ps.movedAt = t
    }

    // --- where to look -------------------------------------------------------
    let yaw = 0
    let pitch = 0
    if (rig.head) {
      rig.head.bone.getWorldPosition(tmp.head)
      camera.getWorldPosition(tmp.cam)
      tmp.dir.copy(tmp.cam).sub(tmp.head) // eye contact by default

      if (t - ps.movedAt < IDLE_AFTER) {
        tmp.ray.setFromCamera(pointer, camera)
        camera.getWorldDirection(tmp.n)
        tmp.plane.setFromNormalAndCoplanarPoint(tmp.n, tmp.head)
        if (tmp.ray.ray.intersectPlane(tmp.plane, tmp.hit)) {
          // Aim at a point in front of her, offset by where the cursor is.
          tmp.dir.multiplyScalar(0.55).add(tmp.hit.sub(tmp.head))
        }
      }

      tmp.dir.applyQuaternion(tmp.rootQInv)
      if (tmp.dir.z > 0.05) {
        yaw = THREE.MathUtils.clamp(Math.atan2(tmp.dir.x, tmp.dir.z), -0.75, 0.75)
        pitch = THREE.MathUtils.clamp(Math.atan2(tmp.dir.y, Math.hypot(tmp.dir.x, tmp.dir.z)), -0.4, 0.45)
      }
    }
    const l = look.current
    l.yaw = damp(l.yaw, yaw, 4, dt)
    l.pitch = damp(l.pitch, pitch, 4, dt)

    // --- poke reaction: curious head tilt that decays ------------------------
    if (pokeRequested.current) {
      pokeRequested.current = false
      pokedAt.current = t
    }
    const pokeT = t - pokedAt.current
    const poke = pokeT < 1.4 ? Math.sin(Math.min(pokeT / 1.4, 1) * Math.PI) : 0

    // --- body ---------------------------------------------------------------
    const breath = Math.sin(t * 1.6)
    if (rig.chest) setWorldDelta(rig.chest, localDelta(breath * 0.012, Math.sin(t * 0.5) * 0.03, 0))
    if (rig.neck) setWorldDelta(rig.neck, localDelta(-l.pitch * 0.35, l.yaw * 0.35, 0))
    if (rig.head) setWorldDelta(rig.head, localDelta(-l.pitch * 0.65, l.yaw * 0.65, poke * 0.28))
    for (const eye of rig.eyes) setWorldDelta(eye, localDelta(-l.pitch * 0.25, l.yaw * 0.3, 0))

    // --- ears: random flicks, both perk up on poke --------------------------
    const e = ear.current
    if (t > e.next) {
      e.start = t
      e.side = Math.floor(Math.random() * 3) as 0 | 1 | 2
      e.next = t + 2 + Math.random() * 4
    }
    const flickT = (t - e.start) / 0.3
    const flick = flickT < 1 ? Math.sin(flickT * Math.PI) : 0
    rig.ears.forEach((rb, i) => {
      const out = i === 0 ? 1 : -1
      const active = e.side === 2 || e.side === i ? flick : 0
      setWorldDelta(rb, localDelta(-poke * 0.35, 0, out * (active * 0.3 - poke * 0.1)))
    })

    // --- tail: lazy wave down the chain -------------------------------------
    rig.tail.forEach((rb, i) => {
      const k = 1 + poke * 2
      setWorldDelta(rb, localDelta(Math.sin(t * 1.1 - i * 0.5) * 0.04, Math.sin(t * 1.7 * k - i * 0.6) * 0.1, 0))
    })

    // keep the speech bubble above her head
    if (anchor.current && rig.head) {
      rig.head.bone.getWorldPosition(anchor.current.position)
      anchor.current.position.y += 0.22
    }
  })

  const handleClick = (ev: ThreeEvent<MouseEvent>) => {
    ev.stopPropagation()
    pokeRequested.current = true
    onPoke()
  }

  return (
    <>
      <primitive
        object={root}
        onClick={handleClick}
        onPointerOver={(ev: ThreeEvent<PointerEvent>) => {
          ev.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => (document.body.style.cursor = '')}
      />
      <group ref={anchor}>
        {bubble && (
          <Html key={bubble.id} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
            <div className="bubble">{bubble.text}</div>
          </Html>
        )}
      </group>
    </>
  )
}

useGLTF.preload(MODEL_URL, false, true)
