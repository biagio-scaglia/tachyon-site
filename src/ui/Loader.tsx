import { useProgress } from '@react-three/drei'

export function Loader() {
  const { active, progress } = useProgress()
  return (
    <div className={`loader ${active ? '' : 'loader-done'}`} aria-hidden={!active}>
      <div className="loader-tube">
        <div className="loader-fill" style={{ height: `${progress}%` }} />
      </div>
      <p>sintesi in corso… {Math.round(progress)}%</p>
    </div>
  )
}
