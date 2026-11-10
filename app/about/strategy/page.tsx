import MarkdownPage, { pageMetadata } from '@/components/MarkdownPage';

export const metadata = pageMetadata('strategy');

export default function Page() {
  return <MarkdownPage name="strategy" eyebrow="About us" />;
}
