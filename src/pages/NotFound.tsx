import { Link } from 'react-router'
import { NotebookPage, Section } from '../components/Notebook'

export function NotFound() {
  return (
    <NotebookPage
      folio={0}
      title="Pagina strappata"
      lead="Questa pagina del quaderno non esiste, o è finita in un esperimento."
    >
      <Section>
        <p>
          <Link to="/">Torna al laboratorio</Link> o scegli una pagina dal menu in alto.
        </p>
      </Section>
    </NotebookPage>
  )
}
