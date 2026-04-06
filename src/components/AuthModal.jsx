import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, MapPin, Shield, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

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
  transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
};

export default function AuthModal() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { showAuthModal, authMode, authModalKey, closeAuth, submitCredentials } = useAuth();
  const [mode, setMode] = useState(authMode);

  useEffect(() => {
    setMode(authMode);
  }, [authModalKey, authMode]);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: '', text: '' });
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
      return;
    }
  };

  const fieldStyle = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? '#024950' : 'var(--surface-border)',
    boxShadow: focused === name ? '0 0 0 3px rgba(26,122,74,0.12)' : 'none',
    background: focused === name ? 'var(--surface-input-focus)' : 'var(--surface-input)',
  });

  return (
    <AnimatePresence>
      {showAuthModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,49,53,0.65)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          >
            <div style={{ width: '100%', maxWidth: '440px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.22)', position: 'relative' }}>

              {/* Gradient header */}
              <div style={{ background: 'linear-gradient(135deg, #003135 0%, #013d42 50%, #024950 100%)', padding: '32px 32px 40px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'rgba(34,165,95,0.2)', borderRadius: '50%', filter: 'blur(30px)' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '120px', height: '120px', background: 'rgba(212,136,26,0.2)', borderRadius: '50%', filter: 'blur(24px)' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                {/* Close button */}
                <button onClick={closeAuth} style={{ position: 'absolute', top: '14px', right: '14px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.2s', zIndex: 10 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <X size={15} />
                </button>

                {/* Logo icon */}
                <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '18px', marginBottom: '14px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                  <MapPin size={26} color="white" />
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '18px', border: '1.5px solid rgba(255,255,255,0.2)' }} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '6px', fontFamily: "'Inter', sans-serif" }}>
                      {mode === 'login' ? 'Welcome Back!' : 'Join PakExplorer'}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {mode === 'login' ? 'Sign in to book your dream Pakistan adventure' : 'Join 50,000+ Pakistan travelers today — it\'s free!'}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Form section */}
              <div style={{ padding: '28px 32px 32px' }}>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                    {mode === 'signup' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ position: 'relative' }}>
                        <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'name' ? '#024950' : 'var(--text-muted-2)' }} />
                        <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={fieldStyle('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} required />
                      </motion.div>
                    )}

                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'email' ? '#024950' : 'var(--text-muted-2)' }} />
                      <input type="email" placeholder="Email address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={fieldStyle('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} required />
                    </div>

                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focused === 'pass' ? '#024950' : 'var(--text-muted-2)' }} />
                      <input type={showPass ? 'text' : 'password'} placeholder="Password (min 6 chars)" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} style={{ ...fieldStyle('pass'), paddingRight: '44px' }} onFocus={() => setFocused('pass')} onBlur={() => setFocused('')} required minLength={6} />
                      <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted-2)', display: 'flex' }}>
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {formMessage.text && (
                    <p
                      role="alert"
                      style={{
                        marginTop: '12px',
                        fontSize: '0.85rem',
                        lineHeight: 1.45,
                        color: formMessage.type === 'error' ? '#b91c1c' : '#024950',
                        background: formMessage.type === 'error' ? '#fef2f2' : '#f0fdf4',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: `1px solid ${formMessage.type === 'error' ? '#fecaca' : '#bbf7d0'}`,
                      }}
                    >
                      {formMessage.text}
                    </p>
                  )}

                  <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '20px', padding: '14px', background: loading ? '#6b7280' : 'linear-gradient(135deg, #024950 0%, #0FA4AF 100%)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: loading ? 'none' : '0 4px 16px rgba(26,122,74,0.35)', transition: 'all 0.25s', fontFamily: 'Inter, sans-serif' }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,122,74,0.4)'; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 16px rgba(26,122,74,0.35)'; }}
                  >
                    {loading ? (
                      <>
                        <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        Please wait...
                      </>
                    ) : (
                      <>
                        {mode === 'login' ? 'Sign In' : 'Create Free Account'}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                {/* Toggle mode */}
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '20px' }}>
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ color: '#024950', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    {mode === 'login' ? 'Sign up free' : 'Sign in'}
                  </button>
                </p>

                {/* Trust badges */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--surface-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  {[{ icon: Shield, text: 'SSL Secure' }, { icon: Star, text: '4.9/5 Rating' }, { icon: MapPin, text: '50K+ Travelers' }].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted-2)', fontSize: '0.72rem', fontWeight: 500 }}>
                      <Icon size={12} color="#024950" />{text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
