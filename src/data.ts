export interface Reagent {
  id: string
  code: string
  name: string
  color: string
  line: string
}

export const REAGENTS: Reagent[] = [
  {
    id: 'green',
    code: 'T-01',
    name: 'Accelerante',
    color: '#5fe03a',
    line: 'Il classico verde fluorescente. Quasi sicuro. Quasi.',
  },
  {
    id: 'violet',
    code: 'R-07',
    name: 'Ignoto',
    color: '#a35cff',
    line: 'Viola? Non ricordo di averlo sintetizzato. Ottimo, scopriamolo insieme.',
  },
  {
    id: 'amber',
    code: 'R-12',
    name: 'Tè concentrato',
    color: '#f0a020',
    line: 'Sette zollette, ridotte a essenza. Questa è scienza seria.',
  },
  {
    id: 'blue',
    code: 'S-03',
    name: 'Calmante',
    color: '#3aa8f0',
    line: 'Un calmante. Per te, non per me: io sono calmissima.',
  },
]

export const QUOTES: string[] = [
  'Oh? Ti sei offerto come cavia? Splendido.',
  'La velocità ha un limite. Voglio sapere dov’è, e poi superarlo.',
  'Dormire? Ho dormito martedì. Credo.',
  'Ogni dato è prezioso. Anche il tuo battito accelerato, adesso.',
  'Un’ipotesi interessante. Sbagliata, ma interessante.',
  'Passami la provetta. No, non quella che fuma.',
  'Non toccare le orecchie, sto ricevendo dati.',
  'Se una cosa esplode, è comunque un risultato.',
]

export interface Stat {
  label: string
  /** 0–100, drives the bar. */
  value: number
  readout?: string
}

export const STATS: Stat[] = [
  { label: 'Velocità', value: 92 },
  { label: 'Curiosità', value: 100 },
  { label: 'Prudenza', value: 11 },
  { label: 'Ore di sonno', value: 9, readout: '3 a settimana' },
  { label: 'Zollette nel tè', value: 70, readout: '7' },
]

export interface Swatch {
  name: string
  hex: string
  note: string
}

export const DESIGN_SWATCHES: Swatch[] = [
  { name: 'Capelli', hex: '#7a3424', note: 'castano, spettinati da notti in laboratorio' },
  { name: 'Occhi', hex: '#c0303c', note: 'rosso, sempre un po’ troppo interessati' },
  { name: 'Gilet', hex: '#e2b33b', note: 'senape, sotto il camice' },
  { name: 'Camice', hex: '#f2f2ee', note: 'bianco, maniche lunghissime' },
  { name: 'Collant', hex: '#25201e', note: 'neri' },
]

export interface RaceEvent {
  date: string
  title: string
  detail: string
}

/** The real racehorse the character is based on. */
export const REAL_HORSE: RaceEvent[] = [
  {
    date: '1998',
    title: 'Nascita',
    detail: 'Nasce in Giappone, a Hokkaido. Il fratello maggiore Agnes Flight vincerà il Derby giapponese.',
  },
  {
    date: 'Dicembre 2000',
    title: 'Debutto e Radio Tampa Hai Sansai Stakes',
    detail: 'Vince la corsa d’esordio e poi la sua prima corsa di gruppo, a due anni.',
  },
  { date: 'Marzo 2001', title: 'Yayoi Shō', detail: 'Terza vittoria su tre, contro i migliori della sua generazione.' },
  {
    date: 'Aprile 2001',
    title: 'Satsuki Shō',
    detail: 'Vince la prima corsa della Triple Crown giapponese. Resta imbattuto.',
  },
  {
    date: '2001',
    title: 'Ritiro',
    detail: 'Un infortunio al tendine chiude la carriera dopo quattro corse e quattro vittorie.',
  },
  {
    date: '2002–2009',
    title: 'Stallone',
    detail: 'Diventa uno stallone di grande successo: tra i suoi figli c’è Daiwa Scarlet.',
  },
]

export interface DiaryEntry {
  slug: string
  day: number
  title: string
  summary: string
  body: string[]
}

export const DIARY: DiaryEntry[] = [
  {
    slug: 'nuova-cavia',
    day: 1,
    title: 'Una nuova cavia',
    summary: 'L’allenatore ha firmato il modulo senza leggerlo. Promettente.',
    body: [
      'Oggi l’allenatore ha accettato di seguirmi. Ha firmato tutti i moduli, compreso quello che mi autorizza a fargli assaggiare i composti in fase di prova. Non l’ha letto. Lo considero un consenso informato a metà.',
      'Prima misurazione: frequenza cardiaca a riposo nella norma. Dopo avergli mostrato la provetta verde, molto meno nella norma.',
      'Obiettivo della ricerca invariato: capire fin dove può arrivare la velocità di una Uma Musume. Il mio corpo è il soggetto principale. Il suo, il gruppo di controllo.',
    ],
  },
  {
    slug: 'te-sette-zollette',
    day: 4,
    title: 'Sette zollette',
    summary: 'Studio sul rapporto tra zucchero nel tè e qualità del pensiero.',
    body: [
      'Ipotesi: lo zucchero nel tè migliora la concentrazione. Ho testato da una a dieci zollette.',
      'Con tre zollette il tè è bevibile ma il pensiero è banale. Con dieci il cucchiaino resta in piedi da solo. Sette è il punto ottimale, e lo sarà finché qualcuno non mi dimostrerà il contrario.',
      'L’allenatore ha provato il campione da sette e ha fatto una faccia che annoto come “dato significativo”.',
    ],
  },
  {
    slug: 'maniche',
    day: 9,
    title: 'Sulle maniche del camice',
    summary: 'Mi è stato chiesto perché non le arrotolo. Risposta lunga.',
    body: [
      'Qualcuno ha osservato che le maniche del mio camice sono troppo lunghe. È vero, ma è una scelta.',
      'Le maniche lunghe proteggono dagli schizzi, nascondono le provette e, soprattutto, impediscono agli altri di capire cosa sto tenendo in mano. Questo vantaggio tattico supera di gran lunga lo svantaggio di non riuscire ad aprire le porte.',
    ],
  },
  {
    slug: 'limite',
    day: 15,
    title: 'Il limite',
    summary: 'Le gambe sono veloci, ma sono anche fragili. Questa è la vera domanda.',
    body: [
      'Ogni Uma Musume ha un limite. Il problema non è raggiungerlo: è che le gambe spesso si rompono prima di arrivarci.',
      'Per questo non posso limitarmi a correre più forte. Devo capire il corpo, i tendini, il recupero. La velocità senza dati è solo fortuna, e la fortuna non si può replicare.',
      'Oggi ho corso tre giri di prova. Sensazioni ottime. Annoto tutto lo stesso.',
    ],
  },
  {
    slug: 'esplosione',
    day: 22,
    title: 'Un piccolo incidente',
    summary: 'Il laboratorio è di nuovo agibile. Quasi tutto.',
    body: [
      'Mescolare il reagente viola con quello verde produce una reazione vivace. “Vivace” è la parola che userò nel rapporto ufficiale.',
      'Danni: una finestra, due becher, le sopracciglia dell’allenatore (ricresceranno). Risultato: un colore che non avevo mai visto. Ne è valsa la pena.',
      'Nota per il futuro: fare i test di miscelazione fuori dal laboratorio. O con un allenatore di riserva.',
    ],
  },
]

export interface MixResult {
  name: string
  outcome: 'successo' | 'fallimento' | 'reazione vivace'
  effect: string
  quote: string
}

const MIXES: Record<string, MixResult> = {
  'green+violet': {
    name: 'Fosforo instabile',
    outcome: 'reazione vivace',
    effect: 'Il becher si illumina, poi fuma, poi è meglio non esserci.',
    quote: 'Ah ah! Esattamente come l’ultima volta. Riproducibile: è scienza!',
  },
  'amber+green': {
    name: 'Tè da corsa',
    outcome: 'successo',
    effect: 'Gusto dolcissimo, sensazione di poter correre fino a Kyoto.',
    quote: 'Finalmente un tè che fa qualcosa oltre a essere delizioso.',
  },
  'blue+green': {
    name: 'Neutro',
    outcome: 'fallimento',
    effect: 'L’accelerante e il calmante si annullano. Ne esce acqua tiepida.',
    quote: 'Acqua. Ho appena inventato l’acqua. Che noia.',
  },
  'amber+violet': {
    name: 'Infuso misterioso',
    outcome: 'successo',
    effect: 'Profumo di bergamotto e qualcos’altro che nessuno sa nominare.',
    quote: 'Non so cosa sia, ma lo berrò ogni mattina.',
  },
  'blue+violet': {
    name: 'Sonno lucido',
    outcome: 'reazione vivace',
    effect: 'Chi lo annusa si addormenta, ma continua a prendere appunti.',
    quote: 'Interessante… l’allenatore scrive meglio da addormentato.',
  },
  'amber+blue': {
    name: 'Camomilla al tè',
    outcome: 'successo',
    effect: 'Rilassa così tanto che sette zollette sembrano poche.',
    quote: 'Mi sento calma. Non mi piace. Prendine nota.',
  },
}

const SAME: MixResult = {
  name: 'Concentrato doppio',
  outcome: 'fallimento',
  effect: 'Due volte lo stesso reagente. Il risultato è lo stesso reagente, ma più triste.',
  quote: 'Due volte la stessa cosa non è un esperimento, è una ripetizione.',
}

export function mix(a: Reagent, b: Reagent): MixResult {
  if (a.id === b.id) return SAME
  return MIXES[[a.id, b.id].sort().join('+')]
}

export interface PageLink {
  to: string
  label: string
  blurb: string
}

export const PAGES: PageLink[] = [
  { to: '/', label: 'Laboratorio', blurb: 'Lei, in 3D. Ti segue con lo sguardo.' },
  { to: '/profilo', label: 'Profilo', blurb: 'Chi è, com’è fatta, e il cavallo vero da cui nasce.' },
  { to: '/esperimenti', label: 'Esperimenti', blurb: 'Mescola due reagenti e guarda cosa succede.' },
  { to: '/diario', label: 'Diario', blurb: 'Le sue note di ricerca, giorno per giorno.' },
  { to: '/crediti', label: 'Crediti', blurb: 'Chi ha fatto il modello e con cosa è costruito il sito.' },
]
