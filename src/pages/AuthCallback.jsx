import { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function parseTypeFromUrl() {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.replace(/^#/, '');
  const search = window.location.search.replace(/^\?/, '');
  const fromHash = new URLSearchParams(hash).get('type');
  const fromSearch = new URLSearchParams(search).get('type');
  return fromHash || fromSearch;
}

async function waitForSession(supabase, attempts = 12, delayMs = 200) {
  for (let i = 0; i < attempts; i += 1) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) return session;
    await new Promise((r) => {
      setTimeout(r, delayMs);
    });
  }
  return null;
}

export default function AuthCallback() {
  const navigate = useNavigate();
  const { openAuth } = useAuth();
  const { showToast } = useToast();
  /** Set in useLayoutEffect before parent useEffects run (Supabase may strip hash). */
  const urlTypeRef = useRef(null);
  const doneRef = useRef(false);

  useLayoutEffect(() => {
    urlTypeRef.current = parseTypeFromUrl();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const subRef = { current: null };

    const finish = (fn) => {
      if (cancelled || doneRef.current) return;
      doneRef.current = true;
      subRef.current?.unsubscribe();
      subRef.current = null;
      fn();
    };

    (async () => {
      const supabase = getSupabase();
      if (!supabase) {
        navigate('/', { replace: true });
        setTimeout(() => openAuth('login'), 0);
        return;
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (cancelled || doneRef.current) return;
        if (event === 'PASSWORD_RECOVERY' && session?.user) {
          finish(() => navigate('/auth/update-password', { replace: true }));
        }
      });
      subRef.current = subscription;

      const session = await waitForSession(supabase);
      if (cancelled) return;

      const urlType = urlTypeRef.current;
      const isRecovery =
        urlType === 'recovery' ||
        (typeof window !== 'undefined' &&
          (`${window.location.hash}${window.location.search}`.includes('type=recovery') ||
            `${window.location.hash}${window.location.search}`.includes('type%3Drecovery')));

      if (session?.user && isRecovery) {
        finish(() => navigate('/auth/update-password', { replace: true }));
        return;
      }

      if (doneRef.current) return;

      if (session?.user) {
        finish(() => {
          showToast({
            title: 'Email verified',
            message: 'You are signed in. Welcome to PakExplorer.',
            durationMs: 3500,
            floating: true,
          });
          navigate('/destinations', { replace: true });
        });
        return;
      }

      subRef.current?.unsubscribe();
      subRef.current = null;
      showToast({
        title: 'Almost there',
        message: 'Sign in with your email and password to continue.',
        durationMs: 4500,
        floating: true,
      });
      navigate('/', { replace: true });
      setTimeout(() => openAuth('login'), 100);
    })();

    return () => {
      cancelled = true;
      subRef.current?.unsubscribe();
      subRef.current = null;
    };
  }, [navigate, openAuth, showToast]);

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.95rem',
      }}
    >
      Verifying your link…
    </div>
  );
}
