import { useCallback, useState, type CSSProperties } from 'react'
import { LabStage } from '../components/LabStage'
import { QUOTES, REAGENTS, mix, type MixResult, type Reagent } from '../data'
import { useBubble, useShuffle } from '../hooks/useBubble'

interface Trial {
  n: number
  a: Reagent
  b: Reagent
  result: MixResult
}

function blend(a: string, b: string): string {
  const ch = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16)
  const mid = [0, 1, 2].map((i) => Math.round((ch(a, i) + ch(b, i)) / 2))
  return `#${mid.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

interface SlotProps {
  name: string
  label: string
  value: Reagent | null
  onChange: (r: Reagent) => void
}

function ReagentSlot({ name, label, value, onChange }: SlotProps) {
  return (
    <fieldset className="slot">
      <legend>{label}</legend>
      {REAGENTS.map((r) => (
        <label key={r.id} className="reagent-option" style={{ '--chip': r.color } as CSSProperties}>
          <input type="radio" name={name} value={r.id} checked={value?.id === r.id} onChange={() => onChange(r)} />
          <span className="tube" aria-hidden="true" />
          <span className="reagent-name">{r.name}</span>
          <span className="reagent-code">{r.code}</span>
        </label>
      ))}
    </fieldset>
  )
}

export function Experiments() {
  const [a, setA] = useState<Reagent | null>(null)
  const [b, setB] = useState<Reagent | null>(null)
  const [trials, setTrials] = useState<Trial[]>([])
  const { bubble, say } = useBubble()
  const nextQuote = useShuffle(QUOTES)

  const latest = trials[0]
  const accent = latest ? blend(latest.a.color, latest.b.color) : '#e2b33b'

  const run = () => {
    if (!a || !b) return
    const result = mix(a, b)
    setTrials((t) => [{ n: (t[0]?.n ?? 0) + 1, a, b, result }, ...t])
    say(result.quote)
  }

  const poke = useCallback(() => say(nextQuote()), [say, nextQuote])

  return (
    <div className="bench">
      <LabStage className="bench-stage" accent={accent} bubble={bubble} onPoke={poke} />

      <div className="bench-panel">
        <span className="folio">p. 3</span>
        <h1 className="page-title">Esperimenti</h1>
        <p className="lead">Scegli due reagenti e mescolali. Tachyon commenta il risultato e lo annota nel registro.</p>

        <div className="slots">
          <ReagentSlot name="primo" label="Primo reagente" value={a} onChange={setA} />
          <ReagentSlot name="secondo" label="Secondo reagente" value={b} onChange={setB} />
        </div>

        <button type="button" className="button" onClick={run} disabled={!a || !b}>
          Mescola
        </button>
        {(!a || !b) && <p className="helper">Scegli un reagente in entrambe le colonne per poter mescolare.</p>}

        {latest && (
          <div key={latest.n} className="result" style={{ '--chip': accent } as CSSProperties} aria-live="polite">
            <p className="result-outcome">Esito: {latest.result.outcome}</p>
            <h2 className="result-name">{latest.result.name}</h2>
            <p>{latest.result.effect}</p>
          </div>
        )}

        <h2 className="section-title">Registro</h2>
        {trials.length === 0 ? (
          <p className="helper">Nessun esperimento ancora. Il primo che fai finisce qui.</p>
        ) : (
          <ol className="trials">
            {trials.map((t) => (
              <li key={t.n}>
                <span className="trial-n">n. {t.n}</span>
                <span>
                  {t.a.name} e {t.b.name}
                </span>
                <strong>{t.result.name}</strong>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
