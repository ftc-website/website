'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Doc = { href: string; kind: string; title: string; text: string };

export default function SiteSearch({ index }: { index: Doc[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? index
        .map((d) => {
          const hay = `${d.title} ${d.text}`.toLowerCase();
          const score = terms.reduce((s, t) => s + (hay.includes(t) ? 1 : 0) + (d.title.toLowerCase().includes(t) ? 2 : 0), 0);
          return { d, score, all: terms.every((t) => hay.includes(t)) };
        })
        .filter((r) => r.all)
        .sort((a, b) => b.score - a.score)
    : [];

  return (
    <div className="stack" style={{ gap: 24, maxWidth: 820 }}>
      <label className="stack" style={{ gap: 6, fontWeight: 700 }}>
        Search the website
        <input
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. beneficial ownership"
          style={{ font: '18px var(--font)', padding: '14px 16px', border: '1px solid var(--sky-light)', borderRadius: 6, color: 'var(--navy)' }}
        />
      </label>
      {terms.length > 0 && <p className="muted" aria-live="polite">{results.length} results</p>}
      {results.map(({ d }) => (
        <Link key={d.href} href={d.href} className="stack" style={{ gap: 4, textDecoration: 'none', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
          <span className="tag">{d.kind}</span>
          <span className="card-title">{d.title}</span>
          <span className="muted">{d.text.slice(0, 180)}…</span>
        </Link>
      ))}
    </div>
  );
}
