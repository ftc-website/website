'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { News } from '@/lib/content';

type Item = Omit<News, 'html'>;
const PAGE = 24;

const longDate = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// News with filters by kind, language, year and free text.
export default function NewsList({ items, kinds, languages }: { items: Item[]; kinds: Record<string, string>; languages: Record<string, string> }) {
  const [kind, setKind] = useState('');
  const [lang, setLang] = useState('');
  const [year, setYear] = useState('');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(PAGE);
  useEffect(() => setLimit(PAGE), [kind, lang, year, q]);

  const years = useMemo(() => Array.from(new Set(items.map((i) => i.date.slice(0, 4)))).sort().reverse(), [items]);
  const shown = items.filter(
    (i) =>
      (!kind || (i.kind ?? 'news') === kind) &&
      (!lang || (i.lang ?? 'en') === lang) &&
      (!year || i.date.startsWith(year)) &&
      (!q || `${i.title} ${i.summary}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="stack" style={{ gap: 32 }}>
      <div className="filters" role="search">
        <label>
          Search
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Title or keyword" />
        </label>
        <label>
          Type
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="">All types</option>
            {Object.entries(kinds).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label>
          Language
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="">All languages</option>
            {Object.entries(languages).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label>
          Year
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All years</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
      </div>
      <p className="muted" aria-live="polite">{shown.length} {shown.length === 1 ? 'item' : 'items'}</p>
      <div className="grid">
        {shown.slice(0, limit).map((n) => (
          <Link key={n.slug} href={`/news/${n.slug}/`} className="card">
            <div className="card-body">
              <span className="tag">{kinds[n.kind ?? 'news'] ?? 'News'}</span>
              <span className="card-title" lang={n.lang ?? 'en'}>{n.title}</span>
              <span className="muted" style={{ fontSize: 15 }}>{n.dateLabel || longDate(n.date)}</span>
              {n.summary && <p className="muted" style={{ fontSize: 16 }} lang={n.lang ?? 'en'}>{n.summary}</p>}
            </div>
          </Link>
        ))}
      </div>
      {shown.length > limit && (
        <div>
          <button type="button" className="btn btn-outline" onClick={() => setLimit((n) => n + PAGE)}>
            Show more ({shown.length - limit} left)
          </button>
        </div>
      )}
    </div>
  );
}
