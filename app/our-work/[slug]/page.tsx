import { notFound } from 'next/navigation';
import { getProjects, getPublications } from '@/lib/content';
import { PageHead, PublicationCard } from '@/components/Cards';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProjects().find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

// Gives each "## X · Title" heading an anchor (#x) so the home page can link to each pillar.
const withAnchors = (html: string) =>
  html.replace(/<h2>([A-G]) · /g, (_m, l: string) => `<h2 id="${l.toLowerCase()}">${l} · `);

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) notFound();
  const related = getPublications().filter((p) => p.project === slug);
  return (
    <>
      <PageHead eyebrow="Our work" title={project.title} summary={project.summary} />
      <section className="section">
        <div className="container">
          <div className="prose" dangerouslySetInnerHTML={{ __html: withAnchors(project.html) }} />
        </div>
      </section>
      {related.length > 0 && (
        <section className="section section-tint">
          <div className="container stack" style={{ gap: 28 }}>
            <h2>Publications</h2>
            <div className="grid">{related.map((p) => <PublicationCard key={p.slug} p={p} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
