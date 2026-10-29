import type { CSSProperties } from 'react'
import { NotebookPage, Section } from '../components/Notebook'
import { DESIGN_SWATCHES, QUOTES, REAL_HORSE, STATS } from '../data'

export function Profile() {
  return (
    <NotebookPage
      folio={2}
      title="Profilo"
      lead="Studentessa della Tracen Academy, ricercatrice per scelta, cavia per necessità. Soprattutto, molto veloce."
    >
      <Section id="chi" title="Chi è" note={<span lang="ja">アグネスタキオン</span>}>
        <p>
          Agnes Tachyon è una delle Uma Musume di <em>Uma Musume Pretty Derby</em>. Vive nel suo laboratorio più che nel
          dormitorio, beve tè con quantità di zucchero discutibili e porta un camice con le maniche così lunghe da
          coprirle le mani.
        </p>
        <p>
          La sua ossessione è una domanda: fin dove può arrivare la velocità di una Uma Musume prima che il corpo ceda?
          Per rispondere misura tutto, prova tutto e, quando serve, fa assaggiare i suoi composti all’allenatore.
        </p>
      </Section>

      <Section id="scheda" title="Scheda" note="Valori misurati a occhio dal sito, non dal gioco.">
        <dl className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                <span className="meter" role="img" aria-label={`${s.value} su 100`}>
                  <span style={{ width: `${s.value}%` }} />
                </span>
                <span className="stat-value">{s.readout ?? s.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="colori" title="Com’è fatta" note="Colori presi dalle texture del modello 3D.">
        <ul className="swatches">
          {DESIGN_SWATCHES.map((s) => (
            <li key={s.name} style={{ '--chip': s.hex } as CSSProperties}>
              <span className="chip" aria-hidden="true" />
              <strong>{s.name}</strong>
              <span>{s.note}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="cavallo"
        title="Il cavallo vero"
        note="Ogni Uma Musume prende il nome e la storia da un vero purosangue."
      >
        <p>
          Il personaggio nasce da Agnes Tachyon, purosangue giapponese che corse solo quattro volte e non perse mai. La
          sua carriera brevissima, chiusa da un infortunio, è il motivo per cui la versione Uma Musume è ossessionata
          dai limiti del corpo.
        </p>
        <ol className="timeline">
          {REAL_HORSE.map((e) => (
            <li key={e.title}>
              <span className="timeline-date">{e.date}</span>
              <strong>{e.title}</strong>
              <span>{e.detail}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="frasi" title="Cose che dice" note="Scritte per questo sito, nello spirito del personaggio.">
        <ul className="quotes">
          {QUOTES.map((q) => (
            <li key={q}>
              <blockquote>{q}</blockquote>
            </li>
          ))}
        </ul>
      </Section>
    </NotebookPage>
  )
}
