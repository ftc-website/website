import MarkdownPage, { pageMetadata } from '@/components/MarkdownPage';

export const metadata = pageMetadata('brand');

export default function Page() {
  return <MarkdownPage name="brand" eyebrow="About us" />;
}
