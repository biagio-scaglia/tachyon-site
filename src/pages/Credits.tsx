import { NotebookPage, Section } from '../components/Notebook'

export function Credits() {
  return (
    <NotebookPage
      folio={5}
      title="Crediti"
      lead="Questo sito è un progetto fatto per passione. Ecco chi ha reso possibile cosa."
    >
      <Section
        id="modello"
        title="Modello 3D"
        note="Il modello originale è statico: le animazioni sono fatte via codice."
      >
        <p>
          <a
            href="https://sketchfab.com/3d-models/agnes-tachyon-uma-musume-9dbffc123efb40b6b2fcdabe5c648b50"
            target="_blank"
            rel="noreferrer"
          >
            Agnes Tachyon – Uma Musume
          </a>{' '}
          di{' '}
          <a href="https://sketchfab.com/ansaldotoys2" target="_blank" rel="noreferrer">
            ansaldotoys2
          </a>
          , pubblicato su Sketchfab con licenza{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
            Creative Commons Attribuzione 4.0
          </a>
          .
        </p>
        <p>
          Per il sito il modello è stato convertito ai materiali glTF standard e compresso. Geometrie e texture sono
          quelle originali, ridotte di dimensione.
        </p>
      </Section>

      <Section id="personaggio" title="Personaggio" note="Fan site non ufficiale.">
        <p>
          Agnes Tachyon e Uma Musume Pretty Derby sono di Cygames, Inc. Questo sito non è affiliato né approvato da
          Cygames. Le frasi e le note del diario sono scritte per il sito e non vengono dal gioco.
        </p>
      </Section>

      <Section id="tecnica" title="Com’è fatto" note="Tutto in TypeScript.">
        <ul className="plain-list">
          <li>React e React Router per le pagine</li>
          <li>three.js con React Three Fiber e drei per la scena 3D</li>
          <li>Vite per lo sviluppo e la build</li>
          <li>
            Caratteri Dela Gothic One e Zen Kaku Gothic New, da{' '}
            <a href="https://fonts.google.com" target="_blank" rel="noreferrer">
              Google Fonts
            </a>
          </li>
        </ul>
      </Section>
    </NotebookPage>
  )
}
