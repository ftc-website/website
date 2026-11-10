'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Publication } from '@/lib/content';

type Item = Omit<Publication, 'html'>;
type Props = {
  items: Item[];
  types: Record<string, string>;
  projects: { slug: string; title: string }[];
  languages: Record<string, string>;
};

const PAGE = 30;

const monthYear = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// Publications with filters by type, project, year and free text.
export default function PublicationList({ items, types, projects, languages }: Props) {
  const params = useSearchParams();
  const [type, setType] = useState(params.get('type') ?? '');
  const [project, setProject] = useState(params.get('project') ?? '');
  const [year, setYear] = useState('');
  const [q, setQ] = useState('');
  const [lang, setLang] = useState('');
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => setLimit(PAGE), [type, project, year, lang, q]);
  const years = useMemo(() => Array.from(new Set(items.map((i) => i.date.slice(0, 4)))).sort().reverse(), [items]);
  const shown = items.filter(
    (i) =>
      (!type || i.type === type) &&
      (!project || i.project === project) &&
      (!year || i.date.startsWith(year)) &&
      (!lang || (i.lang ?? 'en') === lang) &&
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
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            {Object.entries(types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label>
          Project
          <select value={project} onChange={(e) => setProject(e.target.value)}>
            <option value="">All projects</option>
            {projects.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
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

      <p className="muted" aria-live="polite">{shown.length} {shown.length === 1 ? 'publication' : 'publications'}</p>

      <div className="stack" style={{ gap: 0 }}>
        {shown.slice(0, limit).map((p) => (
          <Link
            key={p.slug}
            href={`/publications/${p.slug}/`}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: '22px 0', borderBottom: '1px solid var(--line)', textDecoration: 'none' }}
          >
            <span style={{ flex: '0 0 170px' }} className="stack">
              <span className="tag">{types[p.type] ?? p.type}</span>
              <span className="muted" style={{ fontSize: 15 }}>{p.dateLabel || monthYear(p.date)}</span>
            </span>
            <span className="stack" style={{ flex: '1 1 320px', gap: 6 }}>
              <span className="card-title">{p.title}</span>
              <span className="muted">{p.summary}</span>
            </span>
            {p.cover ? (
              <img src={p.cover} alt="" loading="lazy" className="pub-thumb" />
            ) : (
              <span className="pub-thumb pub-thumb-empty" aria-hidden="true" />
            )}
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
