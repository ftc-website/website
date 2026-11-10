import Link from 'next/link';
import { getProjects, getPublications, getNews } from '@/lib/content';
import { PublicationCard, NewsCard, Symbol } from '@/components/Cards';
import NewsletterForm from '@/components/NewsletterForm';

const pillars: [string, string][] = [
  ['A', 'Automatic exchange of information'],
  ['B', 'Beneficial owners'],
  ['C', 'Country-by-country reporting'],
  ['D', 'Data access and whistleblowers'],
  ['E', 'Enabler professionals'],
  ['F', 'Finance industry transparency'],
  ['G', 'Global Asset Registry'],
];

export default function Home() {
  const publications = getPublications().slice(0, 3);
  const news = getNews().slice(0, 3);
  const projects = getProjects().filter((p) => p.order >= 1 && p.order <= 3);
  const covers = ['', 'alt', 'soft'] as const;

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="eyebrow">Strategy 2026–2030</p>
            <h1>Ending the era of secrecy</h1>
            <p className="lead">
              Our vision is a world where we know who owns what, where and how, and whether they meet their tax obligations.
            </p>
            <div className="actions">
              <Link href="/about/strategy/" className="btn btn-primary">Read the strategy</Link>
              <Link href="/our-work/global-charter/" className="btn btn-ghost">The Global Charter</Link>
            </div>
          </div>
          <div className="hero-art"><Symbol size={260} onDark /></div>
        </div>
      </section>

      <section className="section">
        <div className="container stack" style={{ gap: 28 }}>
          <div className="row-between">
            <h2>Latest publications</h2>
            <Link href="/publications/" style={{ fontWeight: 700 }}>All publications</Link>
          </div>
          <div className="grid">
            {publications.map((p, i) => <PublicationCard key={p.slug} p={p} cover={covers[i % 3]} />)}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 10, maxWidth: 760 }}>
            <p className="eyebrow">Global Charter on Financial Transparency</p>
            <h2>The ABC-DEFG of financial transparency</h2>
            <p className="lead">Seven policy proposals to end financial secrecy, which we call on all States, regional and international bodies to adopt.</p>
          </div>
          <div className="pillars">
            {pillars.map(([l, t]) => (
              <Link key={l} href={`/our-work/global-charter/#${l.toLowerCase()}`} className="pillar">
                <b>{l}</b>
                <span>{t}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 10 }}>
            <p className="eyebrow">Our work</p>
            <h2>Building knowledge to build people&apos;s power</h2>
          </div>
          <div className="grid">
            {projects.map((p) => (
              <Link key={p.slug} href={`/our-work/${p.slug}/`} className="project">
                <strong>{p.title}</strong>
                <span className="muted">{p.summary}</span>
                <span className="more">Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="section section-tint">
          <div className="container stack" style={{ gap: 28 }}>
            <div className="row-between">
              <h2>News</h2>
              <Link href="/news/" style={{ fontWeight: 700 }}>All news</Link>
            </div>
            <div className="grid">{news.map((n) => <NewsCard key={n.slug} n={n} />)}</div>
          </div>
        </section>
      )}

      <section className="newsletter">
        <div className="container newsletter-inner">
          <div className="stack" style={{ flex: '1 1 360px', gap: 8 }}>
            <h2 style={{ color: '#fff' }}>Stay informed</h2>
            <p style={{ color: '#EEF5F8' }}>Our newsletter brings new research, events and advocacy updates from across the coalition.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
