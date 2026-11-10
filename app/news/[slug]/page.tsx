import { notFound } from 'next/navigation';
import { getNews, shownDate } from '@/lib/content';
import { PageHead } from '@/components/Cards';

export function generateStaticParams() {
  const news = getNews();
  // Static export needs at least one path; "_" renders a not-found page until news exists.
  return news.length ? news.map((n) => ({ slug: n.slug })) : [{ slug: '_' }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNews().find((x) => x.slug === slug);
  return n ? { title: n.title, description: n.summary } : {};
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNews().find((x) => x.slug === slug);
  if (!n) notFound();
  return (
    <>
      <PageHead eyebrow={shownDate(n)} title={n.title} summary={n.summary} />
      <section className="section">
        <div className="container">
          {n.archive && (
            <p className="muted" style={{ fontSize: 15, padding: '10px 14px', background: 'var(--mist)', borderRadius: 6, maxWidth: 760, marginBottom: 24 }}>
              From the FTC archive. This page was migrated from the previous website.
            </p>
          )}
          <div className="prose" lang={n.lang ?? 'en'} dangerouslySetInnerHTML={{ __html: n.html }} />
        </div>
      </section>
    </>
  );
}
