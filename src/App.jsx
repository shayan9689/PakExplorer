import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import AuthCallback from './pages/AuthCallback';
import UpdatePassword from './pages/UpdatePassword';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';

function AuthModalGate() {
  const { authModalKey } = useAuth();
  return <AuthModal key={authModalKey} />;
}
import ScrollToTop from './components/ScrollToTop';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth/update-password" element={<UpdatePassword />} />
        <Route path="/destinations" element={<ProtectedRoute><Destinations /></ProtectedRoute>} />
        <Route path="/destinations/:slug" element={<ProtectedRoute><DestinationDetail /></ProtectedRoute>} />
        <Route path="/packages" element={<ProtectedRoute><Packages /></ProtectedRoute>} />
        <Route path="/packages/:slug" element={<ProtectedRoute><PackageDetail /></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="/blog/:slug" element={<ProtectedRoute><BlogPost /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <ScrollToTop />
            <Navbar />
            <AnimatedRoutes />
            <Footer />
            <AuthModalGate />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
