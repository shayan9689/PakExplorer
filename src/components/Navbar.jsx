import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Menu, X, MapPin, LogOut, Moon, Sun } from 'lucide-react';
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

  /** Hero only: light nav text over dark hero. Scrolled / inner pages: dark text on frosted glass. */
  const isOverHero = isHome && !scrolled;

  const headerBg = isDark
    ? 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(30,41,59,0.38) 42%, rgba(15,23,42,0.55) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.12) 100%)';
  const headerBlur = 'blur(28px) saturate(210%) brightness(1.03)';
  const headerShadow = isDark
    ? 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(255,255,255,0.06), inset 0 0 80px rgba(255,255,255,0.03), 0 10px 44px rgba(0,0,0,0.22)'
    : 'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.2), inset 0 0 100px rgba(255,255,255,0.15), 0 10px 40px rgba(0,0,0,0.06)';

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
          transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
          background: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          boxShadow: headerShadow,
        }}
      >
        <motion.div
          animate={{ height: scrolled ? 64 : 72 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.6 }}
          style={{
            padding: '0 clamp(16px, 4vw, 40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            overflow: 'visible',
          }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <motion.div
              className="pulse-glow"
              animate={{ width: scrolled ? 36 : 38, height: scrolled ? 36 : 38 }}
              whileHover={{ boxShadow: '0 6px 22px rgba(26,122,74,0.45)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              style={{
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #024950, #0FA4AF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(26,122,74,0.35)',
              }}
            >
              <MapPin size={scrolled ? 17 : 18} color="white" />
            </motion.div>
            <div style={{ lineHeight: 1 }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  letterSpacing: '-0.01em',
                  color: isOverHero ? 'white' : 'var(--text-heading)',
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
          </motion.div>

          {user ? (
          <nav style={{ display: 'none' }} className="hide-mobile">
            <LayoutGroup>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                const baseColor = isOverHero ? 'rgba(255,255,255,0.88)' : 'var(--text-body)';
                const activeColor = isOverHero ? '#fff' : '#024950';
                const pillBg = isOverHero
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(175,221,229,0.22) 100%)'
                  : isDark
                    ? 'linear-gradient(180deg, rgba(15,164,175,0.22) 0%, rgba(2,73,80,0.28) 100%)'
                    : 'linear-gradient(180deg, rgba(2,73,80,0.16) 0%, rgba(15,164,175,0.12) 100%)';
                const pillOutline = isOverHero
                  ? 'inset 0 0 0 1px rgba(255,255,255,0.35)'
                  : isDark
                    ? 'inset 0 0 0 1px rgba(15,164,175,0.35)'
                    : 'inset 0 0 0 1px rgba(2,73,80,0.18)';
                const linkClass = [
                  'nav-desktop-link',
                  isActive ? 'nav-desktop-link--active' : '',
                  isOverHero ? 'nav-desktop-link--hero' : '',
                  isDark && !isOverHero ? 'nav-desktop-link--dark' : '',
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <motion.div key={link.path} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  <Link
                    to={link.path}
                    className={linkClass}
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 500,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      color: isActive ? activeColor : baseColor,
                      background: 'transparent',
                      zIndex: 1,
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '8px',
                          background: pillBg,
                          zIndex: -1,
                          boxShadow: pillOutline,
                        }}
                      />
                    )}
                    {link.label}
                  </Link>
                  </motion.div>
                );
              })}
            </div>
            </LayoutGroup>
          </nav>
          ) : (
            <div className="hide-mobile" style={{ flex: 1 }} aria-hidden />
          )}

          <div style={{ display: 'none', alignItems: 'center', gap: '10px' }} className="hide-mobile">
            {user ? (
              <div ref={userMenuRef} style={{ position: 'relative', zIndex: 60, overflow: 'visible' }}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  aria-label={`Account menu, ${user.name}`}
                  title={user.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    borderRadius: '50%',
                    border: `2px solid ${
                      isOverHero
                        ? 'rgba(255,255,255,0.45)'
                        : isDark
                          ? 'rgba(255,255,255,0.2)'
                          : 'rgba(2,73,80,0.2)'
                    }`,
                    background: isOverHero
                      ? 'rgba(255,255,255,0.15)'
                      : isDark
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: userMenuOpen ? '0 0 0 3px rgba(15,164,175,0.35)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #024950, #0FA4AF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </div>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      role="menu"
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 'calc(100% + 10px)',
                        zIndex: 200,
                        width: '228px',
                        background: 'var(--nav-dropdown-bg)',
                        border: '1px solid var(--nav-dropdown-border)',
                        borderRadius: '12px',
                        padding: '8px',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
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
                    color: isOverHero ? 'rgba(255,255,255,0.88)' : 'var(--text-body)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isOverHero
                      ? 'rgba(255,255,255,0.1)'
                      : 'var(--surface-muted)';
                    e.currentTarget.style.color = isOverHero ? 'white' : 'var(--text-heading)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = isOverHero
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
                isOverHero
                  ? 'rgba(255,255,255,0.35)'
                  : isDark
                    ? 'rgba(255,255,255,0.14)'
                    : 'rgba(255,255,255,0.55)'
              }`,
              background: isOverHero
                ? 'rgba(255,255,255,0.12)'
                : isDark
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.45)',
              color: isOverHero ? 'white' : 'var(--text-body)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </motion.header>

      <style>{`
        @media(min-width:768px){
          header nav { display: block !important; }
          header .hide-mobile { display: flex !important; }
        }
        /* Only real pointers: avoid “stuck” hover boxes; teal-tinted hover (not white cards) */
        @media (hover: hover) and (pointer: fine) {
          .nav-desktop-link:not(.nav-desktop-link--active):hover {
            background: rgba(2, 73, 80, 0.1) !important;
            color: #024950 !important;
          }
          .nav-desktop-link--hero:not(.nav-desktop-link--active):hover {
            background: rgba(255, 255, 255, 0.16) !important;
            color: #fff !important;
          }
          .nav-desktop-link--dark:not(.nav-desktop-link--active):not(.nav-desktop-link--hero):hover {
            background: rgba(15, 164, 175, 0.14) !important;
            color: var(--text-heading) !important;
          }
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
