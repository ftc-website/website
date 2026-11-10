// Reads site content from Markdown files in /content.
// Each file has a header ("front matter") with its data, then the body text.
// See README.md for the fields of each content type.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const root = path.join(process.cwd(), 'content');

export type PublicationType =
  | 'report' | 'briefing' | 'submission' | 'strategy' | 'statement'
  | 'factsheet' | 'newsletter' | 'infographic' | 'webinar';

export const publicationTypes: Record<PublicationType, string> = {
  report: 'Report',
  briefing: 'Briefing',
  submission: 'Submission or letter',
  strategy: 'Strategy',
  statement: 'Statement',
  factsheet: 'Factsheet',
  newsletter: 'Newsletter',
  infographic: 'Infographic',
  webinar: 'Webinar',
};

export const languageNames: Record<string, string> = { en: 'English', es: 'Español', fr: 'Français' };

export type Entry = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  cover?: string;
  html: string;
  draft?: boolean;
  dateLabel?: string; // overrides the shown date (e.g. while it is unknown)
};

export type Publication = Entry & {
  type: PublicationType;
  project?: string; // slug of a project page under /our-work/
  pillars?: string[]; // letters of the ABC-DEFG
  languages?: { lang: string; label: string; file: string }[]; // downloadable PDFs
  authors?: string[];
  partners?: string[];
  lang?: string; // language of the publication page (default en)
  archive?: boolean; // migrated from the old website
  legacyUrl?: string;
};

export type News = Entry & {
  kind?: 'news' | 'statement' | 'blog' | 'op-ed' | 'video';
  lang?: string;
  archive?: boolean;
  legacyUrl?: string;
};

export const newsKinds: Record<string, string> = {
  news: 'News', statement: 'Press release', blog: 'Blog', 'op-ed': 'Op-ed', video: 'Video',
};
export type Event = Entry & { start: string; end?: string; place?: string; link?: string; archive?: boolean };

function readDir<T extends Entry>(dir: string): T[] {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8');
      const { data, content } = matter(raw);
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '');
      return {
        ...data,
        slug: f.replace(/\.md$/, ''),
        date,
        html: marked.parse(content, { async: false }) as string,
      } as unknown as T;
    })
    .filter((e) => !e.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPublications = () => readDir<Publication>('publications');
export const getNews = () => readDir<News>('news');
export const getEvents = () =>
  readDir<Event>('events').map((e) => ({
    ...e,
    start: (e.start as unknown) instanceof Date ? (e.start as unknown as Date).toISOString().slice(0, 10) : String(e.start ?? e.date),
    end: (e.end as unknown) instanceof Date ? (e.end as unknown as Date).toISOString().slice(0, 10) : e.end ? String(e.end) : undefined,
  }));

export type Project = {
  slug: string;
  title: string;
  short?: string;
  summary: string;
  order: number;
  pillars?: string[];
  html: string;
};

export function getProjects(): Project[] {
  const dir = path.join(root, 'projects');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return { ...(data as Omit<Project, 'slug' | 'html'>), slug: f.replace(/\.md$/, ''), html: marked.parse(content, { async: false }) as string };
    })
    .sort((a, b) => a.order - b.order);
}

export function getPage(name: string) {
  const file = path.join(root, 'pages', `${name}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { ...(data as { title: string; summary?: string }), html: marked.parse(content, { async: false }) as string };
}

export function formatDate(iso: string, monthOnly = false) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', {
    ...(monthOnly ? {} : { day: 'numeric' as const }),
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const shownDate = (e: { date: string; dateLabel?: string }, monthOnly = false) =>
  e.dateLabel || formatDate(e.date, monthOnly);
