import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Signed-out users stay on the current page and see the sign-in modal instead of navigating away.
 */
export default function GuardedLink({ to, onClick, ...props }) {
  const { user, openAuth } = useAuth();
  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      openAuth('login');
      return;
    }
    onClick?.(e);
  };
  return <Link to={to} onClick={handleClick} {...props} />;
}
