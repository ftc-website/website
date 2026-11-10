import { Suspense } from 'react';
import { getProjects, getPublications, publicationTypes } from '@/lib/content';
import { PageHead } from '@/components/Cards';
import PublicationList from '@/components/PublicationList';

export const metadata = { title: 'Publications' };

export default function Publications() {
  const pubs = getPublications().map(({ html: _html, ...p }) => p);
  const projects = getProjects().map((p) => ({ slug: p.slug, title: p.short || p.title }));
  return (
    <>
      <PageHead eyebrow="Resources" title="Publications" summary="Reports, studies, briefings and statements from the coalition." />
      <section className="section">
        <div className="container">
          <Suspense>
            <PublicationList items={pubs} types={publicationTypes} projects={projects} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
