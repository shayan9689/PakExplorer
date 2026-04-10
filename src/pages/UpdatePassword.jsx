import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, Check, Sparkles } from 'lucide-react';
import { getSupabase } from '../lib/supabaseClient';
import { useToast } from '../context/ToastContext';
import { validateSignupPassword, getPasswordRuleChecks, generateSignupPassword, SIGNUP_PASSWORD_MIN } from '../lib/passwordRules';

const inputStyle = {
  width: '100%',
  padding: '13px 16px 13px 44px',
  background: 'var(--surface-input)',
  border: '1.5px solid var(--surface-border)',
  borderRadius: '10px',
  color: 'var(--text-heading)',
  fontSize: '0.9rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
};

export default function UpdatePassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [sessionReady, setSessionReady] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [focused, setFocused] = useState('');

  useEffect(() => {
    let cancelled = false;
    const supabase = getSupabase();
    if (!supabase) {
      setSessionReady(false);
      navigate('/', { replace: true });
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (!session?.user) {
        setSessionReady(false);
        navigate('/', { replace: true });
        return;
      }
      setSessionReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const fieldStyle = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? '#024950' : 'var(--surface-border)',
    boxShadow: focused === name ? '0 0 0 3px rgba(26,122,74,0.12)' : 'none',
    background: focused === name ? 'var(--surface-input-focus)' : 'var(--surface-input)',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const err = validateSignupPassword(password);
    if (err) {
      setMessage({ type: 'error', text: err });
      return;
    }
    const supabase = getSupabase();
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase is not configured.' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }
    showToast({
      title: 'Password updated',
      message: 'You can continue exploring PakExplorer.',
      durationMs: 2500,
      floating: true,
    });
    navigate('/destinations', { replace: true });
  };

  if (sessionReady !== true) {
    return (
      <div className="container section" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>{sessionReady === null ? 'Loading…' : 'Redirecting…'}</p>
      </div>
    );
  }

  const c = getPasswordRuleChecks(password);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'var(--surface-muted)', minHeight: '70vh', paddingTop: '32px', paddingBottom: '48px' }}>
      <div className="container" style={{ maxWidth: '440px', margin: '0 auto' }}>
        <h1 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '8px' }}>
          Set a new password
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
          Choose a strong password for your account.
        </p>

        <form onSubmit={handleSubmit} style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'pass' ? '#024950' : 'var(--text-muted-2)' }} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...fieldStyle('pass'), paddingRight: '44px' }}
              onFocus={() => setFocused('pass')}
              onBlur={() => setFocused('')}
              required
              minLength={SIGNUP_PASSWORD_MIN}
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted-2)' }}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {password.length > 0 && (
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: c.length ? '#15803d' : 'var(--text-muted-2)' }}>
                  <Check size={12} strokeWidth={3} style={{ opacity: c.length ? 1 : 0.35 }} />
                  At least {SIGNUP_PASSWORD_MIN} characters
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPassword(generateSignupPassword());
                    setShowPass(true);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#024950',
                    background: 'var(--surface-muted)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <Sparkles size={14} />
                  Generate password
                </button>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { ok: c.lower, label: 'One lowercase letter (a–z)' },
                  { ok: c.upper, label: 'One uppercase letter (A–Z)' },
                  { ok: c.special, label: 'One special character (!, @, #, …)' },
                ].map(({ ok, label }) => (
                  <li key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: ok ? '#15803d' : 'var(--text-muted-2)' }}>
                    <Check size={12} strokeWidth={3} style={{ opacity: ok ? 1 : 0.35 }} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {message.text && (
            <p
              role="alert"
              style={{
                marginTop: '12px',
                fontSize: '0.85rem',
                color: message.type === 'error' ? '#b91c1c' : '#024950',
                background: message.type === 'error' ? '#fef2f2' : '#f0fdf4',
                padding: '10px 12px',
                borderRadius: '10px',
                border: `1px solid ${message.type === 'error' ? '#fecaca' : '#bbf7d0'}`,
              }}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', marginTop: '20px', padding: '14px', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Saving…' : (
              <>
                Update password
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
