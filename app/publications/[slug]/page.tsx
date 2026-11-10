import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjects, getPublications, publicationTypes, shownDate } from '@/lib/content';
import { PageHead } from '@/components/Cards';

export function generateStaticParams() {
  return getPublications().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPublications().find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPublications().find((x) => x.slug === slug);
  if (!p) notFound();
  const project = p.project ? getProjects().find((x) => x.slug === p.project) : undefined;
  return (
    <>
      <PageHead eyebrow={publicationTypes[p.type] ?? p.type} title={p.title} summary={p.summary} />
      <section className="section">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          <div style={{ flex: '2 1 480px' }} className="stack">
            {p.archive && (
              <p className="muted" style={{ fontSize: 15, padding: '10px 14px', background: 'var(--mist)', borderRadius: 6 }}>
                From the FTC archive. This page was migrated from the previous website.
              </p>
            )}
            <div className="prose" lang={p.lang ?? 'en'} dangerouslySetInnerHTML={{ __html: p.html }} />
          </div>
          <aside style={{ flex: '1 1 260px' }} className="stack">
            {p.cover && (
              <img src={p.cover} alt={`Cover of ${p.title}`} style={{ width: '100%', maxWidth: 260, height: 'auto', border: '1px solid var(--line)' }} />
            )}
            {(p.languages ?? []).length > 0 && (
            <div className="stack" style={{ gap: 10, padding: 20, background: 'var(--mist)', borderRadius: 10 }}>
              <strong>Download</strong>
              {(p.languages ?? []).map((l) => (
                <a key={l.lang} href={l.file} className="btn btn-outline" {...(l.file.startsWith('/') ? { download: true } : { target: '_blank', rel: 'noopener' })}>
                  {l.file.toLowerCase().endsWith('.pdf') ? 'PDF · ' : ''}{l.label}
                </a>
              ))}
            </div>
            )}
            <dl className="stack" style={{ gap: 6, margin: 0 }}>
              <dt className="muted" style={{ fontSize: 14 }}>Published</dt>
              <dd style={{ margin: 0 }}>{shownDate(p, true)}</dd>
              {project && (
                <>
                  <dt className="muted" style={{ fontSize: 14, marginTop: 8 }}>Project</dt>
                  <dd style={{ margin: 0 }}><Link href={`/our-work/${project.slug}/`}>{project.title}</Link></dd>
                </>
              )}
              {p.pillars && (
                <>
                  <dt className="muted" style={{ fontSize: 14, marginTop: 8 }}>Global Charter</dt>
                  <dd style={{ margin: 0 }}>
                    {p.pillars.map((l, i) => (
                      <span key={l}>{i > 0 && ' · '}<Link href={`/our-work/global-charter/#${l.toLowerCase()}`}>{l}</Link></span>
                    ))}
                  </dd>
                </>
              )}
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
