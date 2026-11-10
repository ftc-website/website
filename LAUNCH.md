# Launch guide: publishing the new site on Hostinger

This guide replaces the old WordPress site at financialtransparency.org with the new one, on the FTC's existing Hostinger Business plan. Email is not affected: only the website files change, not the domain's mail records.

Plan about one hour, at a quiet time (for example, a weekend morning in Lima). Nothing is deleted, so every step can be undone.

## 1. Before launch day

- [ ] The FTC Secretariat has approved the site, the privacy policy and the members and team pages.
- [ ] There is a full backup of the WordPress site (files and database). One already exists from 10 November 2026; take a fresh one if content has been added since.
- [ ] You know who manages the domain's DNS, and you have access to hPanel (Hostinger's control panel).
- [ ] Optional but recommended: a free Cloudflare account for visit statistics (step 5) and access to an FTC Google account for Search Console (step 7).

## 2. Build the site

On any computer with Node.js 20 or later:

```bash
git clone https://github.com/ftc-website/website.git
cd website
npm ci
```

Create a file called `.env.production.local` in that folder with:

```
NEXT_PUBLIC_PREVIEW=false
NEXT_PUBLIC_SITE_URL=https://financialtransparency.org
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=<token from step 5, or leave empty>
NEXT_PUBLIC_BREVO_FORM_URL=<Brevo form URL, or leave empty>
```

Then:

```bash
npm run build
```

The finished site is in the `out/` folder. `NEXT_PUBLIC_PREVIEW=false` is what lets Google index it: without it the site keeps asking search engines to stay away.

Zip the **contents** of `out/` (not the folder itself) into `site.zip`. Check that the hidden file `.htaccess` is inside: it holds the redirects from the old addresses.

## 3. Put the WordPress site aside

In hPanel → Websites → financialtransparency.org → **File Manager**:

1. Open `public_html`.
2. Create a folder called `_wordpress_old`.
3. Select everything else in `public_html` and **move** it into `_wordpress_old`.

The WordPress database stays untouched. Keep both for at least three months.

## 4. Upload the new site

1. Still in `public_html`, upload `site.zip`.
2. Right-click it → **Extract** into `public_html` itself.
3. Delete `site.zip`.

`public_html` should now contain `index.html`, `.htaccess`, `404.html`, and folders such as `about`, `publications`, `news`, `files`, `wp-content` and `_next`.

In hPanel → **Security → SSL**, check that the certificate is active, and turn on **Force HTTPS** if it is not already.

## 5. Visit statistics (Cloudflare Web Analytics)

No cookies and no consent banner are needed. The domain does not need to move to Cloudflare.

1. Sign in at dash.cloudflare.com → **Analytics & Logs → Web Analytics → Add a site**.
2. Enter `financialtransparency.org` and choose the **manual (JavaScript snippet)** option.
3. Copy the `token` value from the snippet.
4. Put it in `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`, build again (step 2) and upload again (step 4, skipping step 3).

Figures appear in the Cloudflare dashboard within a few minutes of the first visits.

## 6. Check the site

Open these in a private browser window, on a computer and on a phone:

- [ ] https://financialtransparency.org/ loads with the new design.
- [ ] The menus open, and the search page (`/search/`) finds a publication.
- [ ] An old report address redirects to its new page, e.g. `/reports/dark-webs-uncovering-behind-forced-labour-commerical-fishing-fleets/`.
- [ ] An old conference address redirects, e.g. `/conferences/tipping-point/`.
- [ ] A PDF opens, e.g. from the *Dark Webs* publication page.
- [ ] A page that doesn't exist shows the FTC "page not found" page.
- [ ] `https://financialtransparency.org/sitemap.xml` and `/robots.txt` load, and `robots.txt` says `Allow: /`.
- [ ] An email sent to info@financialtransparency.org still arrives.

## 7. Tell Google

With the FTC Google account:

1. Go to search.google.com/search-console → **Add property → Domain** → `financialtransparency.org`.
2. Add the TXT record Google shows to the domain's DNS, then click **Verify**.
3. In **Sitemaps**, submit `sitemap.xml`.

Google will replace the old pages in its results over the following weeks; the redirects keep old links working meanwhile.

## If something goes wrong

Move the contents of `_wordpress_old` back to `public_html` (after moving the new files into another folder). The old site returns as it was, since its database was never changed.

## Updating the site after launch

Every change (a new publication, news item or event) is a file in the GitHub repository; see README.md. After changes, repeat steps 2 and 4 (no need for step 3). To make this automatic, a GitHub Action can build the site and upload it to Hostinger by FTP on every change; ask the developers to set it up once the FTP account is created in hPanel.
