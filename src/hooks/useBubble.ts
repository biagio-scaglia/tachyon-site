import { useCallback, useEffect, useRef, useState } from 'react'
import type { Bubble } from '../scene/Tachyon'

const BUBBLE_MS = 4500

/** Speech bubble shown above Tachyon's head, cleared after a few seconds. */
export function useBubble() {
  const [bubble, setBubble] = useState<Bubble | null>(null)
  const nextId = useRef(1)

  useEffect(() => {
    if (!bubble) return
    const timer = window.setTimeout(() => setBubble(null), BUBBLE_MS)
    return () => window.clearTimeout(timer)
  }, [bubble])

  const say = useCallback((text: string) => {
    const id = nextId.current++
    setBubble({ id, text })
    return id
  }, [])

  return { bubble, say }
}

/** Picks a random item, never the same one twice in a row. */
export function useShuffle<T>(items: readonly T[]) {
  const last = useRef(-1)
  return useCallback(() => {
    let i = Math.floor(Math.random() * items.length)
    if (i === last.current) i = (i + 1) % items.length
    last.current = i
    return items[i]
  }, [items])
}
