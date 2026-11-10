import MarkdownPage, { pageMetadata } from '@/components/MarkdownPage';

export const metadata = pageMetadata('secretariat');

export default function Page() {
  return <MarkdownPage name="secretariat" eyebrow="About us" />;
}
