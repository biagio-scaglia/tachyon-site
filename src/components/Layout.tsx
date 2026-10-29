import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { PAGES } from '../data'

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="shell">
      <a className="skip" href="#main">
        Vai al contenuto
      </a>
      <header className="masthead">
        <Link to="/" className="wordmark">
          <span className="wordmark-kana" lang="ja">
            タキオン研究室
          </span>
          <span>Laboratorio Tachyon</span>
        </Link>
        <nav aria-label="Pagine">
          <ul className="nav">
            {PAGES.map((p) => (
              <li key={p.to}>
                <NavLink to={p.to} end={p.to === '/'}>
                  {p.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="colophon">
        <p>
          Fan site non ufficiale. Agnes Tachyon e Uma Musume Pretty Derby appartengono a Cygames. Modello 3D di{' '}
          <a href="https://sketchfab.com/ansaldotoys2" target="_blank" rel="noreferrer">
            ansaldotoys2
          </a>
          , licenza CC BY 4.0. <Link to="/crediti">Tutti i crediti</Link>
        </p>
      </footer>
    </div>
  )
}
