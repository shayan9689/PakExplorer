import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { showAuthModal, authMode, closeAuth, login } = useAuth();
  const [mode, setMode] = useState(authMode);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Sync mode with context
  if (authMode !== mode && showAuthModal) setMode(authMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(form.email, form.name || form.email.split('@')[0]);
      setLoading(false);
      setForm({ name: '', email: '', password: '' });
    }, 1000);
  };

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
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="glass w-full max-w-md rounded-2xl p-8 relative shadow-2xl" style={{ border: '1px solid rgba(10,102,64,0.3)' }}>
              {/* Close */}
              <button onClick={closeAuth} className="absolute top-4 right-4 w-8 h-8 rounded-full glass-light flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <X size={16} />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <User size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-400 text-sm">
                  {mode === 'login' ? 'Sign in to book your dream Pakistan adventure' : 'Join 50,000+ Pakistan travelers today'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="input-dark pl-11"
                      required
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="input-dark pl-11"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    className="input-dark pl-11 pr-12"
                    required
                    minLength={6}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Please wait...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={16} />
                    </span>
                  )}
                </button>
              </form>

              {/* Toggle */}
              <p className="text-center text-gray-400 text-sm mt-6">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  {mode === 'login' ? 'Sign up free' : 'Sign in'}
                </button>
              </p>

              {/* Social proof */}
              <div className="mt-6 pt-6 border-t border-[#1e2d4a] flex items-center justify-center gap-6 text-xs text-gray-500">
                <span>🔒 SSL Encrypted</span>
                <span>✓ No spam</span>
                <span>⭐ 4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
