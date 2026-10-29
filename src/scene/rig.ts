import * as THREE from 'three'

/** A bone plus the local rotation it had before we started animating it. */
export interface RigBone {
  bone: THREE.Object3D
  rest: THREE.Quaternion
}

export interface Rig {
  chest?: RigBone
  neck?: RigBone
  head?: RigBone
  eyes: RigBone[]
  ears: RigBone[]
  tail: RigBone[]
}

function findBone(root: THREE.Object3D, pattern: RegExp): THREE.Object3D | undefined {
  let found: THREE.Object3D | undefined
  root.traverse((o) => {
    if (!found && pattern.test(o.name)) found = o
  })
  return found
}

function toRigBone(bone: THREE.Object3D | undefined): RigBone | undefined {
  return bone ? { bone, rest: bone.quaternion.clone() } : undefined
}

const _parent = new THREE.Quaternion()
const _parentInv = new THREE.Quaternion()
const _local = new THREE.Quaternion()

/**
 * Sets the bone to its rest pose rotated by `delta`, where `delta` is expressed
 * in world space. Working in world space means we don't need to know how each
 * bone's local axes are oriented in this rig.
 */
export function setWorldDelta(rb: RigBone, delta: THREE.Quaternion): void {
  const parent = rb.bone.parent
  if (!parent) return
  parent.getWorldQuaternion(_parent)
  _parentInv.copy(_parent).invert()
  // local = parent⁻¹ · delta · parent · rest
  _local.copy(_parent).premultiply(delta).premultiply(_parentInv)
  rb.bone.quaternion.copy(_local).multiply(rb.rest)
  rb.bone.updateMatrixWorld(true)
}

const _a = new THREE.Vector3()
const _b = new THREE.Vector3()
const _q = new THREE.Quaternion()

/** Rotates `bone` (in world space) so the direction towards `child` matches `target`. */
function aimBone(bone: THREE.Object3D, child: THREE.Object3D, target: THREE.Vector3): void {
  bone.getWorldPosition(_a)
  child.getWorldPosition(_b)
  const current = _b.sub(_a).normalize()
  _q.setFromUnitVectors(current, target.clone().normalize())
  setWorldDelta({ bone, rest: bone.quaternion.clone() }, _q)
}

/**
 * The model ships in a T-pose. Drop the arms along the body, slightly forward,
 * so she looks like she's standing rather than being scanned.
 */
function relaxArms(root: THREE.Object3D, forward: THREE.Vector3): void {
  for (const side of ['L', 'R'] as const) {
    const arm = findBone(root, new RegExp(`^Arm_${side}_\\d+$`))
    const elbow = findBone(root, new RegExp(`^Elbow_${side}_\\d+$`))
    const wrist = findBone(root, new RegExp(`^Wrist_${side}_\\d+$`))
    if (!arm || !elbow || !wrist) continue

    arm.getWorldPosition(_a)
    elbow.getWorldPosition(_b)
    const dir = _b.clone().sub(_a).normalize()
    if (dir.y < -0.6) continue // already hanging down

    const outward = Math.sign(dir.x) || 1
    const sideways = new THREE.Vector3(outward, 0, 0)
    aimBone(arm, elbow, new THREE.Vector3(0, -1, 0).addScaledVector(sideways, 0.22).addScaledVector(forward, 0.08))
    aimBone(elbow, wrist, new THREE.Vector3(0, -1, 0).addScaledVector(sideways, 0.12).addScaledVector(forward, 0.35))
  }
}

/** Direction the character faces, in world space (from the tail towards the hips). */
export function facingDirection(root: THREE.Object3D): THREE.Vector3 {
  const hip = findBone(root, /^Hip_\d+$/)
  const tail = findBone(root, /^Sp_Hi_Tail0_B_02_\d+$/)
  if (!hip || !tail) return new THREE.Vector3(0, 0, 1)
  const d = hip.getWorldPosition(new THREE.Vector3()).sub(tail.getWorldPosition(new THREE.Vector3()))
  d.y = 0
  return d.lengthSq() > 0 ? d.normalize() : new THREE.Vector3(0, 0, 1)
}

/** Must be called once the model is placed and facing +Z in world space. */
export function buildRig(root: THREE.Object3D): Rig {
  root.updateMatrixWorld(true)
  relaxArms(root, new THREE.Vector3(0, 0, 1))

  const tail: RigBone[] = []
  for (let i = 0; i < 5; i++) {
    const rb = toRigBone(findBone(root, new RegExp(`^Sp_Hi_Tail0_B_0${i}_\\d+$`)))
    if (rb) tail.push(rb)
  }

  return {
    chest: toRigBone(findBone(root, /^Chest_\d+$/)),
    neck: toRigBone(findBone(root, /^Neck_\d+$/)),
    head: toRigBone(findBone(root, /^Head_\d+$/)),
    eyes: [/^Eye_L_\d+$/, /^Eye_R_\d+$/].map((p) => toRigBone(findBone(root, p))).filter((b) => !!b),
    ears: [/^Sp_He_Ear0_L_00_\d+$/, /^Sp_He_Ear0_R_00_\d+$/]
      .map((p) => toRigBone(findBone(root, p)))
      .filter((b) => !!b),
    tail,
  }
}
