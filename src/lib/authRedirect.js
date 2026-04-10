const callbackPath = '/auth/callback';

/**
 * Public origin of your deployed app (no trailing slash).
 * Set `VITE_SITE_URL` in `.env` / hosting env so Supabase email links always point at your live site.
 * If unset, falls back to `window.location.origin` (only correct when the user requests the email from that same origin — e.g. localhost links break on other devices).
 */
export function getPublicSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

/** Supabase redirects here after email confirmation. Must be listed under Authentication → URL Configuration → Redirect URLs. */
export function getEmailConfirmationRedirectUrl() {
  const base = getPublicSiteUrl();
  if (!base) return '';
  return `${base}${callbackPath}`;
}

/** Same callback; Supabase adds hash/query (e.g. type=recovery) for password reset. Must be in Redirect URLs. */
export function getPasswordRecoveryRedirectUrl() {
  const base = getPublicSiteUrl();
  if (!base) return '';
  return `${base}${callbackPath}`;
}
