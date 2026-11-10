import MarkdownPage, { pageMetadata } from '@/components/MarkdownPage';

export const metadata = pageMetadata('contact');

export default function Page() {
  return <MarkdownPage name="contact" />;
}
