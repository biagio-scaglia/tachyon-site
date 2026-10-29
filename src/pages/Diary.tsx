import { Link, useParams } from 'react-router'
import { NotebookPage, Section } from '../components/Notebook'
import { DIARY } from '../data'
import { NotFound } from './NotFound'

export function Diary() {
  return (
    <NotebookPage
      folio={4}
      title="Diario di ricerca"
      lead="Note scritte da Tachyon durante le sue ricerche. Inventate per questo sito, ma lei approverebbe. Probabilmente."
    >
      <ol className="diary-list">
        {DIARY.map((e) => (
          <li key={e.slug}>
            <Section note={`Giorno ${e.day}`}>
              <h2 className="section-title">
                <Link to={`/diario/${e.slug}`}>{e.title}</Link>
              </h2>
              <p>{e.summary}</p>
            </Section>
          </li>
        ))}
      </ol>
    </NotebookPage>
  )
}

export function DiaryEntryPage() {
  const { slug } = useParams()
  const index = DIARY.findIndex((e) => e.slug === slug)
  if (index < 0) return <NotFound />

  const entry = DIARY[index]
  const prev = DIARY[index - 1]
  const next = DIARY[index + 1]

  return (
    <NotebookPage folio={4} title={entry.title} lead={entry.summary}>
      <Section note={`Giorno ${entry.day}`}>
        {entry.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Section>
      <Section>
        <nav className="pager" aria-label="Altre note">
          {prev ? (
            <Link to={`/diario/${prev.slug}`} rel="prev">
              <span>Nota precedente</span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/diario/${next.slug}`} rel="next" className="pager-next">
              <span>Nota successiva</span>
              {next.title}
            </Link>
          ) : (
            <Link to="/diario" className="pager-next">
              <span>Fine del diario</span>
              Tutte le note
            </Link>
          )}
        </nav>
      </Section>
    </NotebookPage>
  )
}
