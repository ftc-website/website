'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { mainMenu } from '@/lib/site';

// Main navigation: each menu opens a panel on hover (desktop), on click/tap,
// and with the keyboard (Enter/Space to open, Escape to close).
export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (min-width: 961px)').matches;

  return (
    <header className="site-header" ref={headerRef} onMouseLeave={() => canHover() && setOpen(null)}>
      <div className="container header-bar">
        <Link href="/" className="brand" aria-label="Financial Transparency Coalition, home">
          <img src="/brand/ftc-logo-horizontal-color.svg" alt="Financial Transparency Coalition" width={150} height={52} />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls="main-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          Menu
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <nav id="main-nav" aria-label="Main" className={`nav${mobileOpen ? ' open' : ''}`}>
          {mainMenu.map((m) => {
            const isOpen = open === m.id;
            return (
              <div key={m.id} className="nav-item" onMouseEnter={() => canHover() && setOpen(m.id)}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`mega-${m.id}`}
                  onClick={() => setOpen(isOpen ? null : m.id)}
                >
                  {m.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="#3D86AE" strokeWidth="1.8" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="mega" id={`mega-${m.id}`}>
                    <div className="container mega-inner">
                      <div className="mega-intro">
                        <p>{m.label}</p>
                        <p className="muted">{m.intro}</p>
                      </div>
                      <ul className="mega-links">
                        {m.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} onClick={() => { setOpen(null); setMobileOpen(false); }}>
                              <strong>{l.label}</strong>
                              {l.desc && <span>{l.desc}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <Link href="/search/" aria-label="Search" style={{ padding: 12, display: 'flex' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="#263866" strokeWidth="1.8" />
              <path d="M13 13l5 5" stroke="#263866" strokeWidth="1.8" />
            </svg>
          </Link>
          <div className="lang" aria-label="Language">
            <span aria-current="true">EN</span>
            <span title="Spanish version coming soon">ES</span>
            <span title="French version coming soon">FR</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
