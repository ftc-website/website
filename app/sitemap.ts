import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getNews, getProjects, getPublications } from '@/lib/content';

export const dynamic = 'force-static';

// Lists every public page for search engines. Regenerated on each build.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${site.url}${p}`;
  const fixed = [
    '/', '/about/', '/about/strategy/', '/about/members/', '/about/secretariat/',
    '/our-work/', '/publications/', '/news/', '/events/', '/newsletter/', '/contact/', '/privacy/',
  ].map((p) => ({ url: url(p) }));
  const projects = getProjects().map((p) => ({ url: url(`/our-work/${p.slug}/`) }));
  const pubs = getPublications().map((p) => ({ url: url(`/publications/${p.slug}/`), lastModified: p.date }));
  const news = getNews().map((n) => ({ url: url(`/news/${n.slug}/`), lastModified: n.date }));
  return [...fixed, ...projects, ...pubs, ...news];
}
