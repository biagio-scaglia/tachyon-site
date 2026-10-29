import { lazy, Suspense, type ComponentProps } from 'react'

// three.js is heavy: only pages that show her pay for it.
const Lab = lazy(() => import('../scene/Lab'))

type Props = ComponentProps<typeof Lab> & { className?: string }

export function LabStage({ className, ...props }: Props) {
  return (
    <div className={`stage ${className ?? ''}`}>
      <Suspense fallback={null}>
        <Lab {...props} />
      </Suspense>
    </div>
  )
}
