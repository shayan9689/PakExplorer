import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GuardedLink from '../components/GuardedLink';
import { Search, MapPin, Star, ArrowRight, Play, ChevronDown, Award, Shield, Users, Compass, Mountain, Camera, Globe } from 'lucide-react';
import { destinations, tourPackages, blogPosts, testimonials } from '../data';
import { useAuth } from '../context/AuthContext';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';

// ── Animated counter ──────────────────────────────
function Counter({ value, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const target = typeof value === 'number' ? value : parseFloat(value);
    const step = target / (duration * 60);
    const hasDecimal = target % 1 !== 0;
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(hasDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (current >= target) clearInterval(interval);
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [started, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Page wrapper ──────────────────────────────────
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// ── Hero images ───────────────────────────────────
const heroImages = [
  { url: "/blake-verdoorn-cssvEZacHvQ-unsplash.jpg", title: "Hunza Valley", subtitle: "Gilgit-Baltistan" },
  { url: "/ffaamunchy-IxhT8pyjveY-unsplash.jpg", title: "Fairy Meadows", subtitle: "Nanga Parbat Base" },
  { url: "/fa-creation-XRoH4UMAE9g-unsplash.jpg", title: "Lahore Fort", subtitle: "Punjab, Pakistan" },
  { url: "/fa-creation-XRoH4UMAE9g-unsplash.jpg", title: "Swat Valley", subtitle: "Khyber Pakhtunkhwa" },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, openAuth } = useAuth();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setHeroIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearTimeout(t);
  }, [heroIndex]);

  useEffect(() => {
    if (user || !location.state?.from) return;
    openAuth('login');
    navigate('/', { replace: true, state: null });
  }, [user, location.state, openAuth, navigate]);

  const featuredDestinations = destinations.filter(d => d.featured).slice(0, 6);
  const featuredPackages = tourPackages.filter(p => p.featured).slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!user) {
      openAuth('login');
      return;
    }
    const q = searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : '';
    navigate(`/destinations${q}`);
  };

  return (
    <PageWrapper>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section
        ref={heroRef}
        style={{ position: 'relative', height: '100vh', minHeight: '680px', overflow: 'hidden', display: 'flex', alignItems: 'center', backgroundColor: '#111827' }}
      >
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, y: heroY }}
          >
            <img src={heroImages[heroIndex].url} alt={heroImages[heroIndex].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />
            <div className="noise-overlay" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 10, width: '100%' }}>
          <div className="container">
            <div style={{ maxWidth: '720px' }}>
              {/* Location badge */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '100px', marginBottom: '24px' }}>
                  <span style={{ width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                  <MapPin size={13} color="#86efac" />
                  <AnimatePresence mode="wait">
                    <motion.span key={heroIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} style={{ color: 'white', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                      {heroImages[heroIndex].subtitle}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="font-display"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '20px', textShadow: '0 2px 24px rgba(0,0,0,0.25)' }}
              >
                Discover the<br />
                <span style={{ background: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 50%, #964734 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Soul of Pakistan
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '36px', maxWidth: '560px', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
              >
                From the glaciers of Gilgit-Baltistan to the Mughal splendors of Lahore — experience Pakistan's extraordinary beauty, culture, and adventure.
              </motion.p>

              {/* Search bar */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(20px)', borderRadius: '12px', padding: '8px', maxWidth: '560px', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted-2)' }} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search destinations, valleys..."
                      style={{ width: '100%', padding: '11px 14px 11px 42px', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', color: 'var(--text-heading)' }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ padding: '10px 22px', borderRadius: '8px', fontSize: '0.88rem', boxShadow: 'none' }}>
                    <Search size={15} />
                    Search
                  </button>
                </form>
              </motion.div>

              {/* CTA buttons */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '28px' }}>
                <GuardedLink to="/destinations" className="btn-amber" style={{ fontSize: '0.9rem', padding: '12px 24px' }}>
                  Explore Destinations <ArrowRight size={16} />
                </GuardedLink>
                <GuardedLink to="/packages" className="btn-outline-white" style={{ fontSize: '0.9rem', padding: '12px 24px' }}>
                  <Play size={14} style={{ fill: 'white' }} />
                  View Packages
                </GuardedLink>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Slide dots */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '8px' }}>
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)} style={{ width: i === heroIndex ? '28px' : '8px', height: '8px', borderRadius: '100px', background: i === heroIndex ? 'white' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', bottom: '40px', right: '32px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.45)' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>SCROLL</span>
          <ChevronDown size={15} />
        </motion.div>
      </section>

      {/* ══════════════════════════ STATS ══════════════════════════ */}
      <section style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--surface-border)' }}>
        <div className="container section-sm">
          <div id="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
            <style>{`@media(min-width:640px){#stats-grid{grid-template-columns:repeat(4,1fr)}}`}</style>
            {[
              { value: 18, suffix: '+', label: 'Destinations', icon: MapPin, color: '#024950' },
              { value: 50000, suffix: '+', label: 'Happy Travelers', icon: Users, color: '#024950' },
              { value: 12, suffix: '+', label: 'Tour Packages', icon: Compass, color: '#024950' },
              { value: 4.9, suffix: '★', label: 'Average Rating', icon: Star, color: '#964734' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#f0fdf4', border: '1.5px solid #d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <stat.icon size={22} color={stat.color} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Responsive 4-col */}
        <style>{`@media(min-width:640px){ .stats-grid { grid-template-columns: repeat(4,1fr) !important; } }`}</style>
      </section>

      {/* ══════════════════ FEATURED DESTINATIONS ══════════════════ */}
      <section style={{ background: 'var(--surface-muted)' }}>
        <div className="container section">
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <div className="section-label">Curated Picks</div>
                <h2 className="section-title" style={{ margin: 0 }}>
                  Featured <span className="text-gradient-amber">Destinations</span>
                </h2>
                <p className="section-subtitle" style={{ marginTop: '10px' }}>Handpicked by our travel experts — the most breathtaking places waiting to be discovered.</p>
              </div>
              <GuardedLink to="/destinations" className="btn-secondary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                View All <ArrowRight size={15} />
              </GuardedLink>
            </div>
          </div>

          {/* Grid */}
          <div className="grid-3">
            {featuredDestinations.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY PAKISTAN ═══════════════════════ */}
      <section style={{ background: 'var(--surface-card)' }}>
        <div className="container section">
          <div id="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }}>
            <style>{`@media(min-width:1024px){#why-grid{grid-template-columns:1fr 1fr}}`}</style>
            {/* Image collage */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ position: 'relative' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <img src="/blake-verdoorn-cssvEZacHvQ-unsplash.jpg" alt="Hunza" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
                  <img src="/fa-creation-XRoH4UMAE9g-unsplash.jpg" alt="Lahore" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
                  <img src="/ffaamunchy-IxhT8pyjveY-unsplash.jpg" alt="Fairy Meadows" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
                  <img src="/zain-raza-vfJKqrzYwqo-unsplash.jpg" alt="Gwadar" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3 }} style={{ position: 'absolute', bottom: '-16px', right: '-16px', background: 'var(--surface-card)', padding: '16px 20px', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', border: '1.5px solid #fef3c7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #964734, #b05742)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Award size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-heading)' }}>Top Travel Destination</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Asia 2024 Award</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text content */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="section-label">Why Pakistan?</div>
              <h2 className="section-title">
                A Land of <span className="text-gradient-green">Extraordinary</span> Contrasts
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '32px' }}>
                Pakistan is home to 5 of the world's 14 eight-thousander peaks, 2,000+ year-old civilizations, ancient Mughal empires, and pristine Arabian coastlines — all within one remarkable country.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {[
                  { icon: Mountain, title: "World's Highest Peaks", desc: "K2, Nanga Parbat & 3 more 8,000m summits" },
                  { icon: Globe, title: "UNESCO Heritage Sites", desc: "Mohenjo-daro, Lahore Fort & more" },
                  { icon: Camera, title: "Unmatched Photography", desc: "Landscapes unlike anywhere else on Earth" },
                  { icon: Shield, title: "Safe & Welcoming", desc: "Warm hospitality in every corner" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ display: 'flex', gap: '12px', padding: '14px', background: 'var(--surface-muted)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                    <div style={{ width: '36px', height: '36px', background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={16} color="#024950" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-heading)' }}>{item.title}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <GuardedLink to="/destinations" className="btn-primary">
                Start Exploring <ArrowRight size={16} />
              </GuardedLink>
            </motion.div>
          </div>
        </div>

        {/* Make 2-col on lg */}
        <style>{`
          @media(min-width:1024px){
            .why-pakistan-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>

      {/* ══════════════════════ TOUR PACKAGES ═══════════════════════ */}
      <section style={{ background: 'var(--surface-muted)' }}>
        <div className="container section">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '48px' }}>
            <div>
              <div className="section-label">Curated Experiences</div>
              <h2 className="section-title" style={{ margin: 0 }}>
                Featured <span className="text-gradient-green">Tour Packages</span>
              </h2>
              <p className="section-subtitle" style={{ marginTop: '10px' }}>All-inclusive packages designed by local experts for an unforgettable Pakistan experience.</p>
            </div>
            <GuardedLink to="/packages" className="btn-secondary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              All Packages <ArrowRight size={15} />
            </GuardedLink>
          </div>

          <div className="grid-3">
            {featuredPackages.map((p, i) => (
              <PackageCard key={p.id} pkg={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ════════════════════════ */}
      <section style={{ background: 'var(--surface-card)' }}>
        <div className="container section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Traveler Stories</div>
            <h2 className="section-title">
              What Our <span className="text-gradient-amber">Travelers Say</span>
            </h2>
          </motion.div>

          <div className="grid-4">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: 'var(--surface-card)', borderRadius: '16px', padding: '24px', border: '1px solid var(--surface-border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} color="#964734" fill="#964734" />
                  ))}
                </div>
                <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '18px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d1fae5' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-heading)' }}>{t.name}</div>
                    <div style={{ color: 'var(--text-muted-2)', fontSize: '0.75rem' }}>{t.country} · {t.tour}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ BLOG ═════════════════════════════════*/}
      <section style={{ background: 'var(--surface-muted)' }}>
        <div className="container section">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '48px' }}>
            <div>
              <div className="section-label">Travel Insights</div>
              <h2 className="section-title" style={{ margin: 0 }}>
                From Our <span className="text-gradient-amber">Travel Blog</span>
              </h2>
            </div>
            <GuardedLink to="/blog" className="btn-secondary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              All Articles <ArrowRight size={15} />
            </GuardedLink>
          </div>

          <div className="grid-3">
            {recentPosts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GuardedLink to={`/blog/${post.slug}`}>
                  <div className="destination-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', height: '210px' }}>
                      <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      <div className="card-overlay" style={{ position: 'absolute', inset: 0 }} />
                      <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                        <span className="badge badge-green" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>{post.category}</span>
                      </div>
                      <div style={{ position: 'absolute', bottom: '14px', left: '14px', color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', padding: '3px 10px', borderRadius: '100px' }}>{post.readTime}</div>
                    </div>
                    <div style={{ padding: '20px', background: 'var(--surface-card)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '8px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.title}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--surface-border-subtle)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={post.authorImage} alt={post.author} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{post.author}</span>
                        </div>
                        <span style={{ color: '#024950', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </GuardedLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA BANNER ══════════════════════════ */}
      <section style={{ background: 'var(--surface-card)' }}>
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, #003135 0%, #013d42 50%, #024950 100%)', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}
          >
            {/* Decorations */}
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', background: 'rgba(34,165,95,0.2)', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '240px', height: '240px', background: 'rgba(212,136,26,0.15)', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div style={{ position: 'relative', padding: '64px 48px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#86efac', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  <span style={{ width: '18px', height: '2px', background: '#86efac' }} />
                  Ready to Explore?
                </div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '16px' }}>
                  Your Pakistan<br />Adventure Awaits
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px' }}>
                  Join thousands of travelers who have discovered the magic of Pakistan. Custom itineraries, expert guides, and memories that last a lifetime.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
                <GuardedLink to="/packages" className="btn-amber" style={{ fontSize: '0.95rem', padding: '14px 32px' }}>
                  Browse Packages <ArrowRight size={18} />
                </GuardedLink>
                <GuardedLink to="/contact" className="btn-outline-white" style={{ fontSize: '0.95rem', padding: '14px 32px', justifyContent: 'center' }}>
                  Contact Us
                </GuardedLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
