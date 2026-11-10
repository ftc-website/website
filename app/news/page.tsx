import { getNews } from '@/lib/content';
import { NewsCard, PageHead } from '@/components/Cards';

export const metadata = { title: 'News' };

export default function NewsIndex() {
  const news = getNews();
  return (
    <>
      <PageHead eyebrow="Latest" title="News" summary="Statements, analysis and updates from the coalition and its members." />
      <section className="section">
        <div className="container">
          {news.length ? (
            <div className="grid">{news.map((n) => <NewsCard key={n.slug} n={n} />)}</div>
          ) : (
            <p className="muted">News will be published here soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
