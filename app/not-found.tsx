import Link from 'next/link';
import { PageHead } from '@/components/Cards';

export default function NotFound() {
  return (
    <>
      <PageHead title="Page not found" summary="The page you are looking for may have moved with our new website." />
      <section className="section">
        <div className="container actions">
          <Link href="/" className="btn btn-primary">Go to the home page</Link>
          <Link href="/publications/" className="btn btn-outline">Browse publications</Link>
          <Link href="/search/" className="btn btn-outline">Search</Link>
        </div>
      </section>
    </>
  );
}
