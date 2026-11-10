import Link from 'next/link';
import { getProjects } from '@/lib/content';
import { PageHead } from '@/components/Cards';

export const metadata = { title: 'Our work' };

export default function OurWork() {
  const projects = getProjects();
  return (
    <>
      <PageHead eyebrow="Our work" title="Building knowledge to build people's power" summary="Research and advocacy organised around the ABC-DEFG of financial transparency." />
      <section className="section">
        <div className="container grid">
          {projects.map((p) => (
            <Link key={p.slug} href={`/our-work/${p.slug}/`} className="project">
              <strong>{p.title}</strong>
              <span className="muted">{p.summary}</span>
              <span className="more">Learn more</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
