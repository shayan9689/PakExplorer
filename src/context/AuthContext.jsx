import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSupabase } from '../lib/supabaseClient';
import { getEmailConfirmationRedirectUrl, getPasswordRecoveryRedirectUrl } from '../lib/authRedirect';

const AuthContext = createContext(null);

/** First word of a display name for welcome messages. */
function firstDisplayToken(displayName) {
  const s = (displayName || '').trim();
  if (!s) return 'Traveler';
  return s.split(/\s+/)[0];
}

function mapSessionUser(sessionUser) {
  if (!sessionUser) return null;
  const meta = sessionUser.user_metadata || {};
  const name =
    meta.full_name ||
    meta.username ||
    meta.name ||
    sessionUser.email?.split('@')[0] ||
    'Traveler';
  return { email: sessionUser.email, name, id: sessionUser.id };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [pendingAction, setPendingAction] = useState(null);
  const [authModalKey, setAuthModalKey] = useState(0);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(mapSessionUser(session?.user ?? null));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapSessionUser(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuth = (mode = 'login', onSuccess = null) => {
    setAuthMode(mode);
    setPendingAction(() => onSuccess);
    setAuthModalKey((k) => k + 1);
    setShowAuthModal(true);
  };

  const closeAuth = () => {
    setShowAuthModal(false);
    setPendingAction(null);
  };

  const runPending = useCallback(() => {
    const fn = pendingAction;
    setPendingAction(null);
    if (fn) fn();
  }, [pendingAction]);

  /** Demo login when Supabase is not configured (no env vars). */
  const loginLocal = useCallback(
    (email, name) => {
      setUser({ email, name: name || email.split('@')[0] });
      setShowAuthModal(false);
      runPending();
    },
    [runPending]
  );

  /**
   * @param {{ mode: 'login' | 'signup', email: string, password: string, name?: string }} params
   * @returns {Promise<{ error?: string, info?: string, firstName?: string }>}
   */
  const submitCredentials = async ({ mode, email, password, name }) => {
    const supabase = getSupabase();
    const trimmedEmail = email.trim();

    if (!supabase) {
      const displayName = (name || '').trim() || trimmedEmail.split('@')[0];
      loginLocal(trimmedEmail, displayName);
      return { firstName: firstDisplayToken(displayName) };
    }

    if (mode === 'signup') {
      const displayName = (name || '').trim() || trimmedEmail.split('@')[0];
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: { full_name: displayName, username: displayName },
          emailRedirectTo: getEmailConfirmationRedirectUrl(),
        },
      });
      if (error) {
        const msg = (error.message || '').toLowerCase();
        if (
          msg.includes('already') ||
          msg.includes('registered') ||
          msg.includes('exists')
        ) {
          return {
            error:
              'This email is already registered. Sign in with your password instead.',
          };
        }
        return { error: error.message };
      }

      const identities = data.user?.identities;
      if (
        data.user &&
        Array.isArray(identities) &&
        identities.length === 0
      ) {
        return {
          error:
            'This email is already registered. Sign in with your password instead.',
        };
      }

      if (!data.session) {
        return {
          info: 'Check your email for a confirmation link before signing in.',
        };
      }
      if (data.user) setUser(mapSessionUser(data.user));
      setShowAuthModal(false);
      runPending();
      return { firstName: firstDisplayToken(displayName) };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    if (error) return { error: error.message };
    if (data.user) setUser(mapSessionUser(data.user));
    setShowAuthModal(false);
    runPending();
    const meta = data.user?.user_metadata || {};
    const displayName =
      meta.full_name ||
      meta.username ||
      meta.name ||
      trimmedEmail.split('@')[0];
    return { firstName: firstDisplayToken(displayName) };
  };

  const logout = async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  };

  /**
   * Sends Supabase password-reset email. Generic success copy avoids email enumeration.
   * @returns {Promise<{ error?: string, info?: string }>}
   */
  const requestPasswordReset = async (email) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return { error: 'Enter your email address.' };
    const supabase = getSupabase();
    if (!supabase) {
      return {
        info: 'Password reset requires Supabase. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: getPasswordRecoveryRedirectUrl(),
    });
    if (error) return { error: error.message };
    return {
      info: 'If an account exists for that email, we sent a link to reset your password.',
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        showAuthModal,
        authMode,
        authModalKey,
        openAuth,
        closeAuth,
        logout,
        submitCredentials,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useAuth() {
  return useContext(AuthContext);
}
