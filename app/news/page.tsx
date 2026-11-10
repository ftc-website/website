import { getNews, languageNames, newsKinds } from '@/lib/content';
import { PageHead } from '@/components/Cards';
import NewsList from '@/components/NewsList';

export const metadata = { title: 'News' };

export default function NewsIndex() {
  const news = getNews().map(({ html: _html, ...n }) => n);
  return (
    <>
      <PageHead eyebrow="Latest" title="News" summary="Statements, analysis and updates from the coalition and its members." />
      <section className="section">
        <div className="container">
          {news.length ? (
            <NewsList items={news} kinds={newsKinds} languages={languageNames} />
          ) : (
            <p className="muted">News will be published here soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
