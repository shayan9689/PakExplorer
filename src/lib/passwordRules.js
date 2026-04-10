const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
/** Symbols accepted for the “special character” rule */
const SPECIAL = '!@#$%^&*-_+=?';

export const SIGNUP_PASSWORD_MIN = 8;

function pickChar(set) {
  const i = crypto.getRandomValues(new Uint32Array(1))[0] % set.length;
  return set[i];
}

export function getPasswordRuleChecks(password) {
  return {
    length: password.length >= SIGNUP_PASSWORD_MIN,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

/** @returns {string | null} Error message or null if valid */
export function validateSignupPassword(password) {
  const c = getPasswordRuleChecks(password);
  if (!c.length) return `Use at least ${SIGNUP_PASSWORD_MIN} characters.`;
  if (!c.lower) return 'Include at least one lowercase letter (a–z).';
  if (!c.upper) return 'Include at least one uppercase letter (A–Z).';
  if (!c.special) return 'Include at least one special character (e.g. ! @ # $ %).';
  return null;
}

/** Strong random password that satisfies signup rules */
export function generateSignupPassword(length = 14) {
  const len = Math.max(length, SIGNUP_PASSWORD_MIN);
  const chars = [
    pickChar(LOWER),
    pickChar(UPPER),
    pickChar(SPECIAL),
    pickChar(DIGITS),
  ];
  const pool = LOWER + UPPER + DIGITS + SPECIAL;
  for (let i = chars.length; i < len; i += 1) {
    chars.push(pickChar(pool));
  }
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}
