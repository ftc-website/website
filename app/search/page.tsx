import { Suspense } from 'react';
import { getNews, getProjects, getPublications } from '@/lib/content';
import { PageHead } from '@/components/Cards';
import SiteSearch from '@/components/SiteSearch';

export const metadata = { title: 'Search' };

export default function SearchPage() {
  const strip = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 4000);
  const index = [
    ...getPublications().map((p) => ({ href: `/publications/${p.slug}/`, kind: 'Publication', title: p.title, text: `${p.summary} ${strip(p.html)}` })),
    ...getNews().map((n) => ({ href: `/news/${n.slug}/`, kind: 'News', title: n.title, text: `${n.summary} ${strip(n.html)}` })),
    ...getProjects().map((p) => ({ href: `/our-work/${p.slug}/`, kind: 'Our work', title: p.title, text: `${p.summary} ${strip(p.html)}` })),
  ];
  return (
    <>
      <PageHead title="Search" />
      <section className="section">
        <div className="container">
          <Suspense>
            <SiteSearch index={index} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
