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
          <div className="prose" dangerouslySetInnerHTML={{ __html: n.html }} />
        </div>
      </section>
    </>
  );
}
