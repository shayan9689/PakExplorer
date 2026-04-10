import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

async function waitForSession(supabase, attempts = 8, delayMs = 200) {
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
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const supabase = getSupabase();
      if (!supabase) {
        navigate('/', { replace: true });
        setTimeout(() => openAuth('login'), 0);
        return;
      }

      const session = await waitForSession(supabase);
      if (cancelled) return;

      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const isPasswordRecovery =
        hash.includes('type=recovery') || search.includes('type=recovery');

      if (session?.user && isPasswordRecovery) {
        navigate('/auth/update-password', { replace: true });
        return;
      }

      if (session?.user) {
        showToast({
          title: 'Email verified',
          message: 'You are signed in. Welcome to PakExplorer.',
          durationMs: 3500,
          floating: true,
        });
        navigate('/destinations', { replace: true });
        return;
      }

      showToast({
        title: 'Email verified',
        message: 'Sign in with your email and password to continue.',
        durationMs: 4500,
        floating: true,
      });
      navigate('/', { replace: true });
      setTimeout(() => openAuth('login'), 100);
    })();

    return () => {
      cancelled = true;
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
      Verifying your email…
    </div>
  );
}
