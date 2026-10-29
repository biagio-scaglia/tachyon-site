import { useEffect, useState, type ReactNode } from 'react'

export interface PageSection {
  id: string
  label: string
}

interface PageProps {
  /** Page number in the notebook, shown in the margin like a real lab book. */
  folio: number
  title: string
  lead?: ReactNode
  /** Sections listed in the side index on wide screens. */
  sections?: PageSection[]
  children: ReactNode
}

/** Id of the section currently nearest the top of the viewport. */
function useCurrentSection(ids: string[]): string | undefined {
  const [current, setCurrent] = useState<string>()
  const key = ids.join(' ')

  useEffect(() => {
    if (!key) return
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        const first = key.split(' ').find((id) => visible.has(id))
        if (first) setCurrent(first)
      },
      { rootMargin: '0px 0px -55% 0px' },
    )
    for (const id of key.split(' ')) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [key])

  return current
}

/** A ruled notebook page: margin on the left, writing column on the right. */
export function NotebookPage({ folio, title, lead, sections, children }: PageProps) {
  const current = useCurrentSection(sections?.map((s) => s.id) ?? [])

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
      {sections && (
        <aside className="page-aside">
          <nav aria-label="In questa pagina">
            <p className="page-aside-title">In questa pagina</p>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={current === s.id ? 'location' : undefined}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
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
