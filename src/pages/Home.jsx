import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ArrowRight, Play, ChevronDown, Award, Shield, Users, Compass, Mountain, Camera, Globe } from 'lucide-react';
import { destinations, tourPackages, blogPosts, testimonials } from '../data';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';

// Animated counter
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

// Page wrapper with transition
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

// Hero images carousel
const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1612128952123-88ed13410495?w=1920&q=90",
    title: "Hunza Valley",
    subtitle: "Gilgit-Baltistan",
  },
  {
    url: "https://images.unsplash.com/photo-1636997209370-e2042d01d5a5?w=1920&q=90",
    title: "Fairy Meadows",
    subtitle: "Nanga Parbat Base",
  },
  {
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=90",
    title: "Lahore Fort",
    subtitle: "Punjab, Pakistan",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90",
    title: "Swat Valley",
    subtitle: "Khyber Pakhtunkhwa",
  },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Auto-cycle hero
  useEffect(() => {
    const t = setTimeout(() => setHeroIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearTimeout(t);
  }, [heroIndex]);

  const featuredDestinations = destinations.filter(d => d.featured).slice(0, 6);
  const featuredPackages = tourPackages.filter(p => p.featured).slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/destinations?q=${searchQuery}`;
  };

  return (
    <PageWrapper>
      {/* ══════════════════════════════════ HERO ══════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
        {/* Background Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ y: heroY }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[heroIndex].url}
              alt={heroImages[heroIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to bottom, rgba(8,14,28,0.4) 0%, rgba(8,14,28,0.2) 40%, rgba(8,14,28,0.85) 100%)'
            }} />
            <div className="noise-overlay" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Current location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <MapPin size={13} className="text-emerald-400" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-emerald-400 text-xs font-semibold tracking-wide"
                  >
                    {heroImages[heroIndex].subtitle}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight mb-4">
                Discover the{' '}
                <br />
                <span className="gradient-text">Soul of Pakistan</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-gray-300 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed"
            >
              From the glaciers of Gilgit-Baltistan to the Mughal splendors of Lahore — experience Pakistan's extraordinary beauty, culture, and adventure.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="glass rounded-2xl p-3 max-w-2xl"
            >
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, valleys, cities..."
                    className="input-dark pl-11 py-3.5 bg-transparent border-0 focus:ring-0"
                  />
                </div>
                <button type="submit" className="btn-primary py-3.5 px-6 rounded-xl">
                  <Search size={16} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </form>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link to="/destinations" className="btn-gold">
                Explore Destinations <ArrowRight size={16} />
              </Link>
              <Link to="/packages" className="btn-secondary">
                <Play size={16} className="fill-current" />
                View Tour Packages
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === heroIndex ? 'w-8 h-2 bg-emerald-400' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-10 right-8 z-10 hidden md:flex flex-col items-center gap-1 text-white/40"
        >
          <span className="text-xs tracking-widest rotate-90 origin-center" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ══════════════════════════════ STATS BAR ══════════════════════════════ */}
      <section className="py-12 border-y border-[#1e2d4a]" style={{ background: 'linear-gradient(135deg, rgba(10,102,64,0.08) 0%, rgba(15,24,41,0.9) 50%, rgba(201,151,59,0.05) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 18, suffix: '+', label: 'Destinations', icon: MapPin },
              { value: 50000, suffix: '+', label: 'Happy Travelers', icon: Users },
              { value: 12, suffix: '+', label: 'Tour Packages', icon: Compass },
              { value: 4.9, suffix: '★', label: 'Average Rating', icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center">
                    <stat.icon size={18} className="text-emerald-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ FEATURED DESTINATIONS ══════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="section-label">Curated Picks</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Featured <span className="gradient-text-gold">Destinations</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl">Handpicked by our travel experts — the most breathtaking places in Pakistan waiting to be discovered.</p>
          </div>
          <Link to="/destinations" className="btn-secondary flex-shrink-0 self-start md:self-auto">
            View All <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════ WHY PAKISTAN ══════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(10,102,64,0.05) 0%, rgba(8,14,28,1) 40%, rgba(201,151,59,0.04) 100%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image collage */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <img src="https://images.unsplash.com/photo-1612128952123-88ed13410495?w=600&q=85" alt="Hunza" className="w-full h-48 object-cover rounded-2xl" />
                  <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=85" alt="Lahore" className="w-full h-32 object-cover rounded-2xl" />
                </div>
                <div className="space-y-3 mt-8">
                  <img src="https://images.unsplash.com/photo-1636997209370-e2042d01d5a5?w=600&q=85" alt="Fairy Meadows" className="w-full h-32 object-cover rounded-2xl" />
                  <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85" alt="Gwadar" className="w-full h-48 object-cover rounded-2xl" />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -right-4 glass px-5 py-4 rounded-2xl shadow-2xl"
                style={{ border: '1px solid rgba(201,151,59,0.3)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center">
                    <Award size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Top Travel Destination</div>
                    <div className="text-gray-400 text-xs">Asia 2024 Award</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="section-label">Why Pakistan?</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
                A Land of <span className="gradient-text">Extraordinary</span> Contrasts
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Pakistan is home to 5 of the world's 14 eight-thousander peaks, 2,000+ year-old civilizations, ancient Mughal empires, and pristine Arabian coastlines — all within one remarkable country.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Mountain, title: "World's Highest Peaks", desc: "K2, Nanga Parbat & 3 more 8,000m summits" },
                  { icon: Globe, title: "UNESCO Heritage Sites", desc: "Mohenjo-daro, Lahore Fort & more" },
                  { icon: Camera, title: "Unmatched Photography", desc: "Landscapes unlike anywhere else on Earth" },
                  { icon: Shield, title: "Safe & Welcoming", desc: "Warm hospitality in every corner" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex gap-3 p-4 glass-light rounded-xl"
                  >
                    <div className="w-9 h-9 bg-emerald-900/50 border border-emerald-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{item.title}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link to="/destinations" className="btn-primary">
                Start Exploring <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ TOUR PACKAGES ══════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="section-label">Curated Experiences</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Featured <span className="gradient-text-green">Tour Packages</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl">All-inclusive packages designed by local experts for an unforgettable Pakistan experience.</p>
          </div>
          <Link to="/packages" className="btn-secondary flex-shrink-0 self-start md:self-auto">
            All Packages <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPackages.map((p, i) => (
            <PackageCard key={p.id} pkg={p} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'rgba(10,102,64,0.03)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="section-label justify-center">Traveler Stories</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              What Our <span className="gradient-text-gold">Travelers Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 hover:border-emerald-700/40 transition-all"
                style={{ border: '1px solid rgba(30,45,74,0.6)' }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.country} • {t.tour}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ RECENT BLOG ══════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="section-label">Travel Insights</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              From Our <span className="gradient-text-gold">Travel Blog</span>
            </h2>
          </div>
          <Link to="/blog" className="btn-secondary flex-shrink-0 self-start md:self-auto">
            All Articles <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="destination-card group">
                  <div className="relative overflow-hidden" style={{ height: '200px' }}>
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="card-overlay" />
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-emerald">{post.category}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-xs text-gray-300">{post.readTime}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-bold mb-2 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={post.authorImage} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-gray-400 text-xs">{post.author}</span>
                      </div>
                      <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ CTA BANNER ══════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #062a1e 0%, #0a4028 40%, #0f5c3a 100%)',
            border: '1px solid rgba(10,102,64,0.4)'
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" style={{ background: '#c9973b' }} />
          </div>
          <div className="relative p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="section-label text-emerald-400" style={{ color: '#4ade80' }}>Ready to Explore?</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                Your Pakistan<br />Adventure Awaits
              </h2>
              <p className="text-emerald-100/70 max-w-lg text-lg">
                Join thousands of travelers who have discovered the magic of Pakistan. Custom itineraries, expert guides, and memories that last a lifetime.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link to="/packages" className="btn-gold text-base py-4 px-8">
                Browse Packages <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary text-base py-4 px-8 justify-center border-white/20 text-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
