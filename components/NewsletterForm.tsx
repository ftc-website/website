// Newsletter sign-up. When the Brevo account is ready, set
// NEXT_PUBLIC_BREVO_FORM_URL to the form action URL Brevo provides
// (Contacts > Forms > Share > HTML) and the form will post there.
const action = process.env.NEXT_PUBLIC_BREVO_FORM_URL;

export default function NewsletterForm() {
  return (
    <form action={action || undefined} method="post" target="_blank">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input id="nl-email" name="EMAIL" type="email" required placeholder="Your email address" autoComplete="email" />
      <button type="submit" className="btn btn-primary" style={{ border: 0 }} disabled={!action} title={action ? undefined : 'Sign-up will be enabled soon'}>
        Subscribe
      </button>
    </form>
  );
}
