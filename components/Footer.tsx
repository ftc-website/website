import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="stack" style={{ flex: '1 1 260px', maxWidth: 340 }}>
            <img src="/brand/ftc-logo-horizontal-negativo.svg" alt="Financial Transparency Coalition" width={170} height={60} style={{ height: 60, width: 'auto', alignSelf: 'flex-start' }} />
            <p style={{ fontSize: 15 }}>{site.description}</p>
          </div>
          <div className="footer-cols">
            <div>
              <strong>About us</strong>
              <Link href="/about/">Who we are</Link>
              <Link href="/about/strategy/">Strategy 2026–2030</Link>
              <Link href="/about/members/">Members and allies</Link>
            </div>
            <div>
              <strong>Resources</strong>
              <Link href="/publications/">Publications</Link>
              <Link href="/news/">News</Link>
              <Link href="/events/">Events</Link>
            </div>
            <div>
              <strong>Contact</strong>
              <Link href="/contact/">Contact us</Link>
              <Link href="/newsletter/">Newsletter</Link>
              <Link href="/about/brand/">Brand and media kit</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {site.name}</span>
          <Link href="/privacy/">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
