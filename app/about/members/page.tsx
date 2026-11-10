import MarkdownPage, { pageMetadata } from '@/components/MarkdownPage';

export const metadata = pageMetadata('members');

export default function Page() {
  return <MarkdownPage name="members" eyebrow="About us" />;
}
