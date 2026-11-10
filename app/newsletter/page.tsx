import MarkdownPage, { pageMetadata } from '@/components/MarkdownPage';

export const metadata = pageMetadata('newsletter');

export default function Page() {
  return <MarkdownPage name="newsletter" eyebrow="Resources" />;
}
