import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, ChevronDown, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Destinations', path: '/destinations' },
  { label: 'Packages', path: '/packages' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function ThemeSwitch({ showLabel = false, compact = false }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: showLabel ? '10px' : '0',
        padding: compact ? '8px' : '10px 12px',
        borderRadius: '10px',
        border: '1px solid var(--nav-dropdown-border)',
        background: 'var(--surface-muted)',
        cursor: 'pointer',
        width: showLabel ? '100%' : 'auto',
        justifyContent: showLabel ? 'space-between' : 'center',
      }}
    >
      {showLabel && (
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-body)' }}>
          Dark mode
        </span>
      )}
      <span
        style={{
          position: 'relative',
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          background: isDark ? '#024950' : '#cbd5e1',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: isDark ? '22px' : '2px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 0.2s ease',
          }}
        >
          {isDark ? <Moon size={11} color="#024950" /> : <Sun size={11} color="#ca8a04" />}
        </span>
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const { user, openAuth, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    window.location.href = '/';
  };
  const { isDark } = useTheme();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const close = () => setUserMenuOpen(false);
    const onPointerDown = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) close();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [userMenuOpen]);

  const isTransparent = isHome && !scrolled;

  const headerBg = isTransparent ? 'transparent' : 'var(--nav-scrolled-bg)';
  const headerShadow = isTransparent ? 'none' : 'var(--shadow-header)';
  const headerBlur = isTransparent ? 'none' : 'blur(20px)';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.4s ease',
          background: headerBg,
          backdropFilter: headerBlur,
          boxShadow: headerShadow,
        }}
      >
        <div
          style={{
            padding: '0 clamp(16px, 4vw, 40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
            width: '100%',
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div
              className="pulse-glow"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #024950, #0FA4AF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(26,122,74,0.35)',
              }}
            >
              <MapPin size={18} color="white" />
            </div>
            <div style={{ lineHeight: 1 }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  letterSpacing: '-0.01em',
                  color: isTransparent ? 'white' : 'var(--text-heading)',
                }}
              >
                Pak
              </span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  letterSpacing: '-0.01em',
                  background: 'linear-gradient(135deg, #964734, #b05742)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Explorer
              </span>
            </div>
          </Link>

          {user ? (
          <nav style={{ display: 'none' }} className="hide-mobile">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                const baseColor = isTransparent ? 'rgba(255,255,255,0.88)' : 'var(--text-body)';
                const activeColor = '#024950';
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
                      color: isActive ? activeColor : baseColor,
                      background: isActive ? 'rgba(26,122,74,0.12)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = isTransparent
                          ? 'rgba(255,255,255,0.12)'
                          : 'var(--surface-muted)';
                        e.currentTarget.style.color = isTransparent ? 'white' : 'var(--text-heading)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = baseColor;
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
          ) : (
            <div className="hide-mobile" style={{ flex: 1 }} aria-hidden />
          )}

          <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="hide-mobile">
            {user ? (
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: `1.5px solid ${
                      isTransparent ? 'rgba(255,255,255,0.3)' : 'var(--surface-border)'
                    }`,
                    background: isTransparent ? 'rgba(255,255,255,0.12)' : 'var(--surface-card)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #024950, #0FA4AF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </div>
                  <span
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      color: isTransparent ? 'white' : 'var(--text-body)',
                    }}
                  >
                    {user.name}
                  </span>
                  <ChevronDown
                    size={14}
                    color={isTransparent ? 'rgba(255,255,255,0.7)' : 'var(--text-muted-2)'}
                    style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 'calc(100% + 8px)',
                        width: '228px',
                        background: 'var(--nav-dropdown-bg)',
                        border: '1px solid var(--nav-dropdown-border)',
                        borderRadius: '12px',
                        padding: '8px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 12px',
                          fontSize: '0.875rem',
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? 'rgba(239,68,68,0.12)' : '#fef2f2';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                        }}
                      >
                        <LogOut size={14} /> Sign out
                      </button>
                      <div
                        style={{
                          height: '1px',
                          background: 'var(--surface-border)',
                          margin: '8px 4px',
                        }}
                      />
                      <div style={{ padding: '0 4px 4px' }}>
                        <ThemeSwitch showLabel />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    color: isTransparent ? 'rgba(255,255,255,0.88)' : 'var(--text-body)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isTransparent
                      ? 'rgba(255,255,255,0.1)'
                      : 'var(--surface-muted)';
                    e.currentTarget.style.color = isTransparent ? 'white' : 'var(--text-heading)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = isTransparent
                      ? 'rgba(255,255,255,0.88)'
                      : 'var(--text-body)';
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => openAuth('signup')}
                  className="btn-primary"
                  style={{ padding: '9px 20px', fontSize: '0.88rem', boxShadow: '0 3px 12px rgba(26,122,74,0.3)' }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hide-desktop"
            style={{
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              border: `1.5px solid ${
                isTransparent ? 'rgba(255,255,255,0.35)' : 'var(--surface-border)'
              }`,
              background: isTransparent ? 'rgba(255,255,255,0.12)' : 'var(--surface-card)',
              color: isTransparent ? 'white' : 'var(--text-body)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      <style>{`
        @media(min-width:768px){
          header nav { display: block !important; }
          header .hide-mobile { display: flex !important; }
        }
      `}</style>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              background: 'var(--surface-page)',
              display: 'flex',
              flexDirection: 'column',
              padding: '96px 24px 40px',
              overflowY: 'auto',
            }}
          >
            {user && (
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={link.path}
                      style={{
                        display: 'block',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        color: isActive ? '#024950' : 'var(--text-body)',
                        background: isActive ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                        border: isActive ? '1.5px solid rgba(16, 185, 129, 0.35)' : '1.5px solid transparent',
                        transition: 'all 0.2s',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            )}
            {user && (
              <div style={{ marginTop: '20px', marginBottom: '12px' }}>
                <p
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted-2)',
                    marginBottom: '8px',
                  }}
                >
                  Appearance
                </p>
                <ThemeSwitch showLabel />
              </div>
            )}
            <div style={{ marginTop: user ? '12px' : '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px',
                    borderRadius: '12px',
                    background: isDark ? 'rgba(239,68,68,0.12)' : '#fef2f2',
                    color: '#ef4444',
                    border: '1.5px solid rgba(239,68,68,0.25)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  <LogOut size={16} /> Sign out
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuth('login')}
                    className="btn-secondary"
                    style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuth('signup')}
                    className="btn-primary"
                    style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
                  >
                    Get Started Free
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
