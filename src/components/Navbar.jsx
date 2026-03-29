import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Destinations', path: '/destinations' },
  { label: 'Packages', path: '/packages' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, openAuth, logout } = useAuth();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'all 0.4s ease',
          background: isTransparent ? 'transparent' : 'rgba(255,255,255,0.97)',
          backdropFilter: isTransparent ? 'none' : 'blur(20px)',
          boxShadow: isTransparent ? 'none' : '0 1px 0 rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ padding: '0 clamp(16px, 4vw, 40px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px', width: '100%' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div className="pulse-glow" style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #024950, #0FA4AF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(26,122,74,0.35)' }}>
              <MapPin size={18} color="white" />
            </div>
            <div style={{ lineHeight: 1 }}>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.01em', color: isTransparent ? 'white' : '#111827' }}>Pak</span>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.01em', background: 'linear-gradient(135deg, #964734, #b05742)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Explorer</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none' }} className="hide-mobile" >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navLinks.map(link => {
                const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      color: isActive
                        ? '#024950'
                        : isTransparent ? 'rgba(255,255,255,0.88)' : '#374151',
                      background: isActive
                        ? 'rgba(26,122,74,0.1)'
                        : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = isTransparent ? 'rgba(255,255,255,0.12)' : '#f3f4f6';
                        e.currentTarget.style.color = isTransparent ? 'white' : '#111827';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,0.88)' : '#374151';
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Auth area */}
          <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="hide-mobile">
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', border: `1.5px solid ${isTransparent ? 'rgba(255,255,255,0.3)' : '#e5e7eb'}`, background: isTransparent ? 'rgba(255,255,255,0.12)' : 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #024950, #0FA4AF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.78rem', fontWeight: 700 }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500, color: isTransparent ? 'white' : '#374151' }}>{user.name}</span>
                  <ChevronDown size={14} color={isTransparent ? 'rgba(255,255,255,0.7)' : '#9ca3af'} style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.15 }}
                      style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '180px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                    >
                      <button onClick={() => { logout(); setUserMenuOpen(false); }}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', fontSize: '0.875rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button onClick={() => openAuth('login')}
                  style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 500, color: isTransparent ? 'rgba(255,255,255,0.88)' : '#374151', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = isTransparent ? 'rgba(255,255,255,0.1)' : '#f3f4f6'; e.currentTarget.style.color = isTransparent ? 'white' : '#111827'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,0.88)' : '#374151'; }}
                >
                  Sign In
                </button>
                <button onClick={() => openAuth('signup')} className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.88rem', boxShadow: '0 3px 12px rgba(26,122,74,0.3)' }}>
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hide-desktop"
            style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', border: `1.5px solid ${isTransparent ? 'rgba(255,255,255,0.35)' : '#e5e7eb'}`, background: isTransparent ? 'rgba(255,255,255,0.12)' : 'white', color: isTransparent ? 'white' : '#374151', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Make nav visible on md+ */}
      <style>{`
        @media(min-width:768px){
          header nav { display: block !important; }
          header .hide-mobile { display: flex !important; }
        }
      `}</style>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'white', display: 'flex', flexDirection: 'column', paddingTop: '96px', padding: '96px 24px 40px', overflowY: 'auto' }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link to={link.path} style={{ display: 'block', padding: '14px 18px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', color: isActive ? '#024950' : '#374151', background: isActive ? '#f0fdf4' : 'transparent', border: isActive ? '1.5px solid #d1fae5' : '1.5px solid transparent', transition: 'all 0.2s' }}>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {user ? (
                <button onClick={logout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', background: '#fef2f2', color: '#ef4444', border: '1.5px solid #fee2e2', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>
                  <LogOut size={16} /> Sign Out
                </button>
              ) : (
                <>
                  <button onClick={() => openAuth('login')} className="btn-secondary" style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>Sign In</button>
                  <button onClick={() => openAuth('signup')} className="btn-primary" style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>Get Started Free</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
