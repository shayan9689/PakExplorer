/** Where Supabase redirects after the user clicks the email confirmation link. Must be listed in Supabase → Authentication → URL Configuration → Redirect URLs. */
export function getEmailConfirmationRedirectUrl() {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/auth/callback`;
}
