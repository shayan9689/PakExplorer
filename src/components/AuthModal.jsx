import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, ArrowRight, MapPin, Check, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  SIGNUP_PASSWORD_MIN,
  getPasswordRuleChecks,
  validateSignupPassword,
  generateSignupPassword,
} from '../lib/passwordRules';

/** Site theme (matches src/index.css --green / --green-light / --amber) */
const THEME_PRIMARY = '#024950';
const THEME_ACCENT = '#0FA4AF';

const transitionPanels = { duration: 0.55, ease: [0.4, 0, 0.2, 1] };

function UnderlineInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  required,
  autoComplete,
  minLength,
  rightAdornment,
  placeholder,
  compact = false,
}) {
  const active = focused === name;
  return (
    <div style={{ marginBottom: compact ? '14px' : '22px' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: active ? 'var(--text-heading)' : 'var(--text-muted-2)',
          marginBottom: '6px',
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => onFocus(name)}
          onBlur={() => onBlur()}
          required={required}
          autoComplete={autoComplete}
          minLength={minLength}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            padding: '10px 0 8px',
            fontSize: '0.95rem',
            color: 'var(--text-heading)',
            background: 'transparent',
            fontFamily: 'Inter, sans-serif',
          }}
        />
        {rightAdornment}
      </div>
      <div
        style={{
          height: '2px',
          borderRadius: '2px',
          background: active
            ? `linear-gradient(90deg, ${THEME_PRIMARY}, ${THEME_ACCENT})`
            : `linear-gradient(90deg, rgba(2,73,80,0.35), rgba(15,164,175,0.4))`,
          transition: 'background 0.25s ease',
        }}
      />
    </div>
  );
}

export default function AuthModal() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { showAuthModal, authMode, authModalKey, closeAuth, submitCredentials, requestPasswordReset } = useAuth();
  const [mode, setMode] = useState(authMode);
  const [showForgot, setShowForgot] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const prevModeRef = useRef(null);

  useEffect(() => {
    setMode(authMode);
    setShowForgot(false);
  }, [authModalKey, authMode]);

  useEffect(() => {
    if (prevModeRef.current !== null && prevModeRef.current !== mode) {
      setFormMessage({ type: '', text: '' });
    }
    prevModeRef.current = mode;
  }, [mode]);

  const decoOnLeft = mode === 'login' || showForgot;
  const isSignup = mode === 'signup' && !showForgot;

  useEffect(() => {
    if (!showAuthModal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showAuthModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: '', text: '' });

    if (showForgot) {
      setLoading(true);
      const result = await requestPasswordReset(form.email);
      setLoading(false);
      if (result.error) {
        setFormMessage({ type: 'error', text: result.error });
        return;
      }
      showToast({
        title: 'Check your email',
        message: result.info,
        durationMs: 3000,
        floating: true,
      });
      setShowForgot(false);
      setMode('login');
      setForm((f) => ({ ...f, password: '' }));
      return;
    }

    if (mode === 'signup') {
      const pwErr = validateSignupPassword(form.password);
      if (pwErr) {
        setFormMessage({ type: 'error', text: pwErr });
        return;
      }
    }
    setLoading(true);
    const result = await submitCredentials({
      mode,
      email: form.email,
      password: form.password,
      name: form.name,
    });
    setLoading(false);
    if (result.error) {
      setFormMessage({ type: 'error', text: result.error });
      return;
    }
    if (result.info) {
      setForm({ name: '', email: '', password: '' });
      setFormMessage({ type: '', text: '' });
      setMode('login');
      showToast({
        title: 'Check your email',
        message: result.info,
        durationMs: 2000,
        floating: true,
      });
      return;
    }
    setForm({ name: '', email: '', password: '' });
    if (result.firstName != null) {
      setMode('login');
      showToast({
        title: 'Welcome back',
        message: `Successfully logged in as ${result.firstName}.`,
        durationMs: 2000,
        floating: true,
      });
      navigate('/destinations', { replace: true });
    }
  };

  const formTitle = showForgot ? 'Reset password' : mode === 'login' ? 'Sign In' : 'Sign Up';

  return (
    <AnimatePresence>
      {showAuthModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(0, 49, 53, 0.36)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 101,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              pointerEvents: 'none',
            }}
          >
            <style>{`
              @media (max-width: 768px) {
                .auth-modal-inner {
                  flex-direction: column !important;
                  max-height: min(92vh, 900px);
                  overflow-y: auto;
                }
                .auth-modal-inner.signup-stack .auth-panel-deco { order: 2; }
                .auth-modal-inner.signup-stack .auth-panel-form { order: 1; }
                .auth-panel-deco,
                .auth-panel-form {
                  position: relative !important;
                  left: 0 !important;
                  width: 100% !important;
                  min-height: unset !important;
                }
                .auth-panel-deco {
                  min-height: 200px !important;
                  flex-shrink: 0;
                }
                .auth-panel-form {
                  flex: 1;
                  min-height: 320px;
                }
                .auth-panel-form--signup {
                  overflow-y: auto !important;
                }
                .auth-signup-center {
                  justify-content: flex-start !important;
                }
              }
            `}</style>

            <div
              className={`auth-modal-inner ${!decoOnLeft && !showForgot ? 'signup-stack' : ''}`}
              style={{
                pointerEvents: 'auto',
                width: '100%',
                maxWidth: '920px',
                minHeight: isSignup ? '580px' : '560px',
                maxHeight: 'min(92vh, 720px)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                background: 'var(--surface-card)',
              }}
            >
              <button
                type="button"
                onClick={closeAuth}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.06)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  zIndex: 30,
                  transition: 'background 0.2s',
                }}
              >
                <X size={18} />
              </button>

              {/* Decorative panel — slides left ↔ right */}
              <motion.div
                className="auth-panel-deco"
                initial={false}
                animate={{ left: decoOnLeft ? '0%' : '50%' }}
                transition={transitionPanels}
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '50%',
                  height: '100%',
                  zIndex: 2,
                  overflow: 'hidden',
                  alignItems: isSignup ? 'center' : 'stretch',
                  background: `
                    radial-gradient(ellipse 100% 80% at 10% 20%, rgba(2,73,80,0.55), transparent 55%),
                    radial-gradient(ellipse 70% 60% at 90% 80%, rgba(150,71,52,0.38), transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(15,164,175,0.28), transparent 45%),
                    linear-gradient(155deg, #012a2e 0%, #024950 42%, #063239 100%)
                  `,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '36px 32px 28px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 60 Q25 40 50 60 T100 60 V100 H0Z\' fill=\'rgba(15,164,175,0.14)\'/%3E%3C/svg%3E")',
                    backgroundSize: '200% 120%',
                    backgroundPosition: '50% 100%',
                    opacity: 0.9,
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ position: 'absolute', top: '18%', right: '-8%', width: '140px', height: '140px', borderRadius: '50%', background: `linear-gradient(135deg, rgba(15,164,175,0.4), rgba(2,73,80,0.25))`, filter: 'blur(2px)' }} />
                <div style={{ position: 'absolute', bottom: '25%', left: '-6%', width: '100px', height: '100px', borderRadius: '50%', background: `linear-gradient(135deg, rgba(150,71,52,0.35), rgba(2,73,80,0.2))`, filter: 'blur(2px)' }} />

                <div
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSignup ? 'center' : 'flex-start',
                    gap: '10px',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.95)',
                        marginRight: '-8px',
                      }}
                    />
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.95)',
                      }}
                    />
                  </div>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.12em' }}>PAKEXPLORER</span>
                </div>

                <div
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingRight: isSignup ? 0 : '8px',
                    paddingLeft: isSignup ? 0 : 0,
                    alignItems: isSignup ? 'center' : 'stretch',
                    width: '100%',
                    minHeight: 0,
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${mode}-${showForgot}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%', maxWidth: isSignup ? '300px' : 'none', textAlign: isSignup ? 'center' : 'left' }}
                    >
                      <h2
                        style={{
                          fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
                          fontWeight: 800,
                          color: 'white',
                          lineHeight: 1.15,
                          margin: '0 0 12px',
                          fontFamily: 'Inter, sans-serif',
                          textAlign: isSignup ? 'center' : 'left',
                        }}
                      >
                        {showForgot
                          ? 'Reset access'
                          : mode === 'login'
                            ? 'Welcome back'
                            : 'Start your journey'}
                      </h2>
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.78)',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          margin: 0,
                          maxWidth: '320px',
                          marginLeft: isSignup ? 'auto' : 0,
                          marginRight: isSignup ? 'auto' : 0,
                          textAlign: isSignup ? 'center' : 'left',
                        }}
                      >
                        {showForgot
                          ? 'We’ll email you a secure link to set a new password.'
                          : mode === 'login'
                            ? 'Sign in to continue exploring Pakistan’s valleys, cities, and heritage.'
                            : 'Create a free account and unlock destinations, packages, and saved trips.'}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '0.72rem',
                    margin: 0,
                    width: '100%',
                    textAlign: isSignup ? 'center' : 'left',
                  }}
                >
                  pakexplorer.travel
                </p>
              </motion.div>

              {/* Form panel */}
              <motion.div
                className={`auth-panel-form${isSignup ? ' auth-panel-form--signup' : ''}`}
                initial={false}
                animate={{ left: decoOnLeft ? '50%' : '0%' }}
                transition={transitionPanels}
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '50%',
                  height: '100%',
                  zIndex: 1,
                  background: 'var(--surface-card)',
                  boxSizing: 'border-box',
                  padding: isSignup ? '40px 36px 20px' : '48px 40px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflowX: 'hidden',
                  overflowY: isSignup ? 'hidden' : 'auto',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className={isSignup ? 'auth-signup-center' : ''}
                    style={{
                      flex: 1,
                      minHeight: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: isSignup ? 'center' : 'flex-start',
                      overflowY: isSignup ? 'hidden' : 'auto',
                      overflowX: 'hidden',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: 'var(--text-heading)',
                        margin: isSignup ? '0 0 18px' : '0 0 28px',
                        fontFamily: 'Inter, sans-serif',
                        flexShrink: 0,
                        textAlign: isSignup ? 'center' : 'left',
                        width: '100%',
                      }}
                    >
                      {formTitle}
                    </h2>

                    <form
                      onSubmit={handleSubmit}
                      style={{
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: isSignup ? '340px' : 'none',
                        marginLeft: isSignup ? 'auto' : 0,
                        marginRight: isSignup ? 'auto' : 0,
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                    {mode === 'signup' && !showForgot && (
                      <UnderlineInput
                        label="Username"
                        name="username"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        focused={focused}
                        onFocus={setFocused}
                        onBlur={() => setFocused('')}
                        required
                        autoComplete="username"
                        placeholder="Your display name"
                        compact={isSignup}
                      />
                    )}

                    <UnderlineInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      focused={focused}
                      onFocus={setFocused}
                      onBlur={() => setFocused('')}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      compact={isSignup}
                    />

                    {!showForgot && (
                      <div>
                        <UnderlineInput
                          label="Password"
                          name="pass"
                          type={showPass ? 'text' : 'password'}
                          value={form.password}
                          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                          focused={focused}
                          onFocus={setFocused}
                          onBlur={() => setFocused('')}
                          required
                          minLength={mode === 'signup' ? SIGNUP_PASSWORD_MIN : 6}
                          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                          placeholder="••••••••"
                          compact={isSignup}
                          rightAdornment={
                            <button
                              type="button"
                              onClick={() => setShowPass(!showPass)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-muted-2)',
                                padding: '4px',
                                display: 'flex',
                                marginBottom: '4px',
                              }}
                              aria-label={showPass ? 'Hide password' : 'Show password'}
                            >
                              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          }
                        />

                        {mode === 'login' && (
                          <div style={{ textAlign: 'left', marginTop: '-12px', marginBottom: '8px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setShowForgot(true);
                                setFormMessage({ type: '', text: '' });
                              }}
                              style={{
                                color: 'var(--green)',
                                fontWeight: 600,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontFamily: 'Inter, sans-serif',
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px',
                              }}
                            >
                              Forgot password?
                            </button>
                          </div>
                        )}

                        {mode === 'signup' && form.password.length > 0 && (
                          <div style={{ marginTop: '4px', marginBottom: '4px' }}>
                            {(() => {
                              const c = getPasswordRuleChecks(form.password);
                              const lengthLabel = `At least ${SIGNUP_PASSWORD_MIN} characters`;
                              return (
                                <>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      gap: '8px',
                                      flexWrap: 'wrap',
                                      marginBottom: '6px',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '0.68rem',
                                        color: c.length ? '#15803d' : 'var(--text-muted-2)',
                                      }}
                                    >
                                      <Check size={12} strokeWidth={3} style={{ opacity: c.length ? 1 : 0.35 }} />
                                      {lengthLabel}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const p = generateSignupPassword();
                                        setForm((f) => ({ ...f, password: p }));
                                        setShowPass(true);
                                      }}
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '5px 10px',
                                        fontSize: '0.72rem',
                                        fontWeight: 600,
                                        color: 'var(--green)',
                                        background: 'var(--surface-input-focus)',
                                        border: '1px solid rgba(2,73,80,0.25)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontFamily: 'Inter, sans-serif',
                                      }}
                                    >
                                      <Sparkles size={13} />
                                      Generate password
                                    </button>
                                  </div>
                                  <ul
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      listStyle: 'none',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '2px',
                                      fontSize: '0.68rem',
                                    }}
                                  >
                                    {[
                                      { ok: c.lower, label: 'One lowercase letter (a–z)' },
                                      { ok: c.upper, label: 'One uppercase letter (A–Z)' },
                                      { ok: c.special, label: 'One special character (!, @, #, …)' },
                                    ].map(({ ok, label }) => (
                                      <li
                                        key={label}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '6px',
                                          color: ok ? '#15803d' : '#888',
                                        }}
                                      >
                                        <Check size={12} strokeWidth={3} style={{ opacity: ok ? 1 : 0.35 }} />
                                        {label}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {formMessage.text && (
                    <p
                      role="alert"
                      style={{
                        marginTop: '8px',
                        fontSize: '0.85rem',
                        lineHeight: 1.45,
                        color: formMessage.type === 'error' ? '#b91c1c' : '#15803d',
                        background: formMessage.type === 'error' ? '#fef2f2' : '#f0fdf4',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: `1px solid ${formMessage.type === 'error' ? '#fecaca' : '#bbf7d0'}`,
                      }}
                    >
                      {formMessage.text}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      marginTop: isSignup ? '14px' : '20px',
                      padding: '16px 20px',
                      background: loading ? '#9ca3af' : `linear-gradient(135deg, ${THEME_PRIMARY} 0%, ${THEME_ACCENT} 100%)`,
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      letterSpacing: '0.14em',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: loading ? 'none' : '0 8px 28px rgba(2, 73, 80, 0.35)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      fontFamily: 'Inter, sans-serif',
                      textTransform: 'uppercase',
                    }}
                  >
                    {loading ? (
                      <>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            border: '2px solid rgba(255,255,255,0.35)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                        Please wait
                      </>
                    ) : (
                      <>
                        <span style={{ flex: 1, textAlign: 'center' }}>
                          {showForgot ? 'Send reset link' : 'Continue'}
                        </span>
                        <ArrowRight size={18} style={{ flexShrink: 0 }} />
                      </>
                    )}
                  </button>
                </form>
                  </div>
                </div>

                <p
                  style={{
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    marginTop: isSignup ? '12px' : '20px',
                    flexShrink: 0,
                  }}
                >
                  {showForgot ? (
                    <>
                      Remember your password?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgot(false);
                          setFormMessage({ type: '', text: '' });
                        }}
                        style={{
                          color: 'var(--green)',
                          fontWeight: 700,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontFamily: 'Inter, sans-serif',
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px',
                        }}
                      >
                        Back to sign in
                      </button>
                    </>
                  ) : (
                    <>
                      {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode(mode === 'login' ? 'signup' : 'login');
                          setShowForgot(false);
                          setFormMessage({ type: '', text: '' });
                        }}
                        style={{
                          color: 'var(--green)',
                          fontWeight: 700,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontFamily: 'Inter, sans-serif',
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px',
                        }}
                      >
                        {mode === 'login' ? 'Sign up' : 'Sign in'}
                      </button>
                    </>
                  )}
                </p>

                <div
                  style={{
                    paddingTop: isSignup ? '10px' : '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: 'var(--text-muted-2)',
                    fontSize: '0.7rem',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={12} color={THEME_PRIMARY} />
                  Secure sign-in · Pakistan travel, simplified
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
