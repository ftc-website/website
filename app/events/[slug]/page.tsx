import { notFound } from 'next/navigation';
import { getEvents, formatDate } from '@/lib/content';
import { PageHead } from '@/components/Cards';

// Events with their own text get a page; the rest link out or show only in the list.
const withPage = () => getEvents().filter((e) => !e.link && e.html.trim());

export function generateStaticParams() {
  const events = withPage();
  return events.length ? events.map((e) => ({ slug: e.slug })) : [{ slug: '_' }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = withPage().find((x) => x.slug === slug);
  return e ? { title: e.title, description: e.summary } : {};
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = withPage().find((x) => x.slug === slug);
  if (!e) notFound();
  const when = e.end && e.end !== e.start ? `${formatDate(e.start)} – ${formatDate(e.end)}` : formatDate(e.start);
  return (
    <>
      <PageHead eyebrow="Event" title={e.title} summary={[when, e.place].filter(Boolean).join(' · ')} />
      <section className="section">
        <div className="container">
          {e.archive && (
            <p className="muted" style={{ fontSize: 15, padding: '10px 14px', background: 'var(--mist)', borderRadius: 6, maxWidth: 760, marginBottom: 24 }}>
              From the FTC archive. This page was migrated from the previous website.
            </p>
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: e.html }} />
          <p style={{ marginTop: 32 }}><a href="/events/">← All events</a></p>
        </div>
      </section>
    </>
  );
}
