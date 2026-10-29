import type { ReactNode } from 'react'

interface PageProps {
  /** Page number in the notebook, shown in the margin like a real lab book. */
  folio: number
  title: string
  lead?: ReactNode
  children: ReactNode
}

/** A ruled notebook page: margin on the left, writing column on the right. */
export function NotebookPage({ folio, title, lead, children }: PageProps) {
  return (
    <article className="page">
      <header className="page-head">
        <span className="folio" aria-label={`Pagina ${folio}`}>
          p. {folio}
        </span>
        <h1 className="page-title">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </header>
      {children}
    </article>
  )
}

interface EntryProps {
  /** Short note written in the margin, next to the section. */
  note?: ReactNode
  title?: string
  children: ReactNode
  id?: string
}

export function Section({ note, title, children, id }: EntryProps) {
  return (
    <section className="section" id={id} aria-labelledby={title && id ? `${id}-t` : undefined}>
      <div className="margin-note">{note}</div>
      <div className="section-body">
        {title && (
          <h2 className="section-title" id={id ? `${id}-t` : undefined}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}
