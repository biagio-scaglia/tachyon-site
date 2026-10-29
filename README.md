# Laboratorio Tachyon

Fan site non ufficiale dedicato ad Agnes Tachyon di *Uma Musume Pretty Derby*, impaginato come il suo quaderno di laboratorio. Il modello 3D la mette al centro: segue il cursore con lo sguardo, muove orecchie e coda e reagisce ai clic.

## Pagine

| Percorso | Contenuto |
|---|---|
| `/` | Laboratorio: il modello 3D e l'indice del quaderno |
| `/profilo` | Chi è, scheda, colori del design, il cavallo vero |
| `/esperimenti` | Mini-gioco: mescola due reagenti e lei commenta il risultato |
| `/diario` | Note di ricerca, ognuna con la sua pagina |
| `/crediti` | Modello, licenze e tecnologie |

## Sviluppo

```bash
npm install
npm run dev        # server di sviluppo
npm run build      # controllo dei tipi + build in dist/
npm run preview    # anteprima della build
```

Tutto il codice è in TypeScript/TSX: React, React Router, three.js con React Three Fiber e drei, Vite.

Testi, reagenti, combinazioni e diario stanno in [`src/data.ts`](src/data.ts).

### Il modello

Il file originale (`agnes_tachyon_-_uma_musume.glb`) è statico e in T-pose, e usa un'estensione dei materiali deprecata. Quello servito dal sito, `public/tachyon.glb`, è stato ottenuto così:

```bash
npx @gltf-transform/cli metalrough agnes_tachyon_-_uma_musume.glb mr.glb
npx @gltf-transform/cli resize mr.glb rs.glb --width 1024 --height 1024
npx @gltf-transform/cli webp rs.glb wp.glb
npx @gltf-transform/cli meshopt wp.glb public/tachyon.glb --level medium
```

La posa a braccia abbassate e tutte le animazioni sono calcolate a runtime sulle ossa dello scheletro (`src/scene/rig.ts`).

### Pubblicazione

Ogni push su `main` pubblica il sito su GitHub Pages tramite [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): https://biagio-scaglia.github.io/tachyon-site/

La build usa il percorso base `/tachyon-site/` (vedi `vite.config.ts`); `npm run dev` resta alla radice. Pages non ha un fallback per le single page app, quindi il workflow copia `index.html` in `404.html`: così anche ricaricando una pagina interna come `/profilo` il sito si apre.

## Crediti

- Modello 3D: [Agnes Tachyon – Uma Musume](https://sketchfab.com/3d-models/agnes-tachyon-uma-musume-9dbffc123efb40b6b2fcdabe5c648b50) di [ansaldotoys2](https://sketchfab.com/ansaldotoys2), licenza [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Agnes Tachyon e Uma Musume Pretty Derby © Cygames, Inc. Questo progetto non è affiliato né approvato da Cygames.
- Frasi e note del diario sono scritte per il sito e non vengono dal gioco.
