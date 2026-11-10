import { getPage } from '@/lib/content';
import { PageHead } from './Cards';

// Renders a page whose text lives in content/pages/<name>.md
export default function MarkdownPage({ name, eyebrow }: { name: string; eyebrow?: string }) {
  const page = getPage(name);
  return (
    <>
      <PageHead eyebrow={eyebrow} title={page.title} summary={page.summary} />
      <section className="section">
        <div className="container">
          <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      </section>
    </>
  );
}

export function pageMetadata(name: string) {
  const page = getPage(name);
  return { title: page.title, description: page.summary };
}
