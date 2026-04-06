import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Sparkles, X } from 'lucide-react';

const DEFAULT_DISMISS_MS = 5500;

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const dismissToast = useCallback(() => setToast(null), []);

  const showToast = useCallback((input) => {
    const config = typeof input === 'string' ? { message: input } : input;
    setToast({
      id: Date.now(),
      title: config.title ?? "You're all set",
      message: config.message ?? '',
      durationMs: typeof config.durationMs === 'number' ? config.durationMs : DEFAULT_DISMISS_MS,
      floating: Boolean(config.floating),
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const ms = toast.durationMs ?? DEFAULT_DISMISS_MS;
    const t = setTimeout(dismissToast, ms);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 240,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '96px',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence mode="wait">
          {toast && (
            <motion.div
              key={toast.id}
              role="alert"
              initial={{ opacity: 0, y: -32, scale: 0.9, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.96,
                filter: 'blur(4px)',
                transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
              }}
              transition={{
                type: 'spring',
                damping: 24,
                stiffness: 320,
                mass: 0.85,
              }}
              style={{
                pointerEvents: 'auto',
                maxWidth: toast.floating
                  ? 'min(380px, calc(100vw - 32px))'
                  : 'min(440px, calc(100vw - 28px))',
                width: '100%',
                margin: '0 16px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  padding: '2px',
                  borderRadius: toast.floating ? '18px' : '20px',
                  background:
                    'linear-gradient(135deg, #024950 0%, #0FA4AF 45%, rgba(150, 71, 52, 0.75) 100%)',
                  boxShadow: toast.floating
                    ? '0 20px 50px rgba(0, 0, 0, 0.28), 0 8px 24px rgba(2, 73, 80, 0.22), 0 0 0 1px rgba(255,255,255,0.1) inset'
                    : '0 24px 56px rgba(0, 49, 53, 0.35), 0 0 0 1px rgba(255,255,255,0.12) inset, 0 1px 0 rgba(255,255,255,0.15) inset',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    background: 'var(--surface-card)',
                    borderRadius: toast.floating ? '16px' : '18px',
                    overflow: 'hidden',
                  }}
                >
                  {!toast.floating && (
                  <button
                    type="button"
                    onClick={dismissToast}
                    aria-label="Dismiss notification"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'var(--surface-muted)',
                      color: 'var(--text-muted-2)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    <X size={17} strokeWidth={2} />
                  </button>
                  )}

                  <div
                    style={{
                      padding: toast.floating
                        ? '16px 18px 14px 16px'
                        : '20px 48px 18px 20px',
                      display: 'flex',
                      gap: toast.floating ? '12px' : '14px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -25 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        delay: 0.08,
                        stiffness: 400,
                        damping: 18,
                      }}
                      style={{ flexShrink: 0 }}
                    >
                      <div
                        style={{
                          width: toast.floating ? '42px' : '48px',
                          height: toast.floating ? '42px' : '48px',
                          borderRadius: '16px',
                          background:
                            'linear-gradient(145deg, rgba(209, 250, 229, 0.95), rgba(167, 243, 208, 0.65))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 20px rgba(5, 150, 105, 0.2)',
                        }}
                      >
                        <CheckCircle size={toast.floating ? 22 : 26} color="#059669" strokeWidth={2.25} aria-hidden />
                      </div>
                    </motion.div>
                    <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                      <motion.div
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.35, ease: 'easeOut' }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginBottom: '6px',
                        }}
                      >
                        {!toast.floating && <Sparkles size={15} color="#0d9488" aria-hidden />}
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: toast.floating ? '0.92rem' : '1rem',
                            letterSpacing: '-0.02em',
                            color: 'var(--text-heading)',
                            fontFamily: 'Inter, system-ui, sans-serif',
                          }}
                        >
                          {toast.title}
                        </span>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16, duration: 0.35, ease: 'easeOut' }}
                        style={{
                          margin: 0,
                          fontSize: toast.floating ? '0.85rem' : '0.9rem',
                          lineHeight: 1.6,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {toast.message}
                      </motion.p>
                    </div>
                  </div>

                  <div
                    style={{
                      height: '3px',
                      margin: toast.floating ? '0 10px 8px' : '0 12px 10px',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      background: 'var(--surface-border-subtle)',
                    }}
                  >
                    <motion.div
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{
                        duration: (toast.durationMs ?? DEFAULT_DISMISS_MS) / 1000,
                        ease: 'linear',
                      }}
                      style={{
                        height: '100%',
                        borderRadius: '3px',
                        background: 'linear-gradient(90deg, #024950, #0FA4AF)',
                        transformOrigin: 'left center',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
