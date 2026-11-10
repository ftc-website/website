import MarkdownPage, { pageMetadata } from '@/components/MarkdownPage';

export const metadata = pageMetadata('about');

export default function Page() {
  return <MarkdownPage name="about" eyebrow="About us" />;
}
