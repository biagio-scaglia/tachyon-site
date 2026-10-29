import { useCallback, useState } from 'react'
import { Link } from 'react-router'
import { LabStage } from '../components/LabStage'
import { PAGES, QUOTES, REAGENTS, type Reagent } from '../data'
import { useBubble, useShuffle } from '../hooks/useBubble'
import { useIsTouch } from '../hooks/useMediaQuery'

export function Home() {
  const [reagent, setReagent] = useState<Reagent>(REAGENTS[0])
  const { bubble, say } = useBubble()
  const nextQuote = useShuffle(QUOTES)
  const touch = useIsTouch()

  const poke = useCallback(() => say(nextQuote()), [say, nextQuote])
  const pick = useCallback(
    (r: Reagent) => {
      setReagent(r)
      say(r.line)
    },
    [say],
  )

  return (
    <>
      <section className="hero">
        <h1 className="hero-name" aria-label="Agnes Tachyon">
          <span aria-hidden="true">Agnes</span>
          <span aria-hidden="true">Tachyon</span>
        </h1>
        <LabStage
          className="hero-stage"
          accent={reagent.color}
          bubble={bubble}
          onPoke={poke}
          vials={{ reagents: REAGENTS, activeId: reagent.id, onPick: pick }}
        />
        <div className="hero-foot">
          <p className="hero-intro">
            Studia il limite della velocità di una Uma Musume. Il primo soggetto dei suoi esperimenti è lei stessa, il
            secondo è chiunque entri nel laboratorio.
          </p>
          <ul className="hero-hints" aria-label="Cosa puoi fare">
            {touch ? (
              <>
                <li>
                  <strong>Tocca lo schermo</strong> e ti segue con lo sguardo
                </li>
                <li>
                  <strong>Toccala</strong> e dice qualcosa
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>Muovi il cursore</strong> e ti segue con lo sguardo
                </li>
                <li>
                  <strong>Cliccala</strong> e dice qualcosa
                </li>
              </>
            )}
            <li>
              <strong>Tocca una provetta</strong> per cambiare reagente
            </li>
          </ul>
        </div>
      </section>

      <section className="contents" aria-labelledby="contents-title">
        <h2 id="contents-title" className="contents-title">
          Indice del quaderno
        </h2>
        <ol className="toc">
          {PAGES.slice(1).map((p, i) => (
            <li key={p.to}>
              <Link to={p.to} className="toc-link">
                <span className="toc-label">{p.label}</span>
                <span className="toc-leader" aria-hidden="true" />
                <span className="toc-folio">p. {i + 2}</span>
              </Link>
              <p className="toc-blurb">{p.blurb}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
