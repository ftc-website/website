import { getEvents, formatDate } from '@/lib/content';
import { PageHead } from '@/components/Cards';

export const metadata = { title: 'Events' };

export default function Events() {
  const today = new Date().toISOString().slice(0, 10);
  const events = getEvents();
  const upcoming = events.filter((e) => (e.end || e.start) >= today).reverse();
  const past = events.filter((e) => (e.end || e.start) < today);
  const List = ({ items }: { items: typeof events }) => (
    <div className="stack" style={{ gap: 0 }}>
      {items.map((e) => (
        <article key={e.slug} style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
          <p style={{ flex: '0 0 180px', fontWeight: 700 }}>{formatDate(e.start)}</p>
          <div className="stack" style={{ flex: '1 1 320px', gap: 6 }}>
            <h3>{e.link ? <a href={e.link}>{e.title}</a> : e.title}</h3>
            {e.place && <p className="muted">{e.place}</p>}
            {e.summary && <p>{e.summary}</p>}
          </div>
        </article>
      ))}
    </div>
  );
  return (
    <>
      <PageHead eyebrow="Latest" title="Events" summary="Events organised by the coalition and its members." />
      <section className="section">
        <div className="container stack" style={{ gap: 40 }}>
          <div className="stack">
            <h2>Upcoming</h2>
            {upcoming.length ? <List items={upcoming} /> : <p className="muted">No upcoming events at the moment.</p>}
          </div>
          {past.length > 0 && (
            <div className="stack">
              <h2>Past events</h2>
              <List items={past} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
