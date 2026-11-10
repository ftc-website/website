import Link from 'next/link';
import { newsKinds, publicationTypes, shownDate, type Publication, type News } from '@/lib/content';

export function PublicationCard({ p, cover = '' }: { p: Publication; cover?: '' | 'alt' | 'soft' }) {
  return (
    <Link href={`/publications/${p.slug}/`} className="card">
      {p.cover ? (
        <img src={p.cover} alt="" className="card-cover" style={{ objectPosition: 'top' }} />
      ) : (
        <div className={`card-cover ${cover}`} aria-hidden="true" />
      )}
      <div className="card-body">
        <span className="tag">{publicationTypes[p.type] ?? p.type}</span>
        <span className="card-title">{p.title}</span>
        <span className="muted" style={{ fontSize: 15 }}>{shownDate(p, true)}</span>
      </div>
    </Link>
  );
}

export function NewsCard({ n }: { n: News }) {
  return (
    <Link href={`/news/${n.slug}/`} className="card">
      <div className="card-body">
        <span className="tag">{newsKinds[n.kind ?? 'news'] ?? 'News'}</span>
        <span className="card-title" lang={n.lang ?? 'en'}>{n.title}</span>
        <span className="muted" style={{ fontSize: 15 }}>{shownDate(n)}</span>
        {n.summary && <p className="muted" style={{ fontSize: 16 }}>{n.summary}</p>}
      </div>
    </Link>
  );
}

export function PageHead({ eyebrow, title, summary }: { eyebrow?: string; title: string; summary?: string }) {
  return (
    <section className="page-head">
      <div className="container stack">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {summary && <p className="lead">{summary}</p>}
      </div>
    </section>
  );
}

export function Symbol({ size = 280, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" aria-hidden="true">
      <path fill={onDark ? '#FFFFFF' : '#263866'} fillOpacity={onDark ? 0.1 : 1} fillRule="evenodd" d="M0,0h58v58h-58z M30,30v28h28v-28z" />
      <path fill="#3D86AE" fillRule="evenodd" d="M30,30h58v58h-58z M30,30v28h28v-28z" />
    </svg>
  );
}
