import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { tourPackages } from '../data';
import PackageCard from '../components/PackageCard';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

const priceRanges = ['All', 'Under 50K', '50K–100K', '100K+'];
const difficultyLevels = ['All', 'Easy', 'Moderate', 'Challenging'];
const pkgCategories = ['All', 'Adventure', 'Cultural', 'Trekking', 'Heritage', 'Family', 'Coastal'];

export default function Packages() {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [pkgCat, setPkgCat] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return tourPackages.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.destinations.some(d => d.toLowerCase().includes(search.toLowerCase()));
      const matchPrice = priceRange === 'All'
        || (priceRange === 'Under 50K' && p.price < 50000)
        || (priceRange === '50K–100K' && p.price >= 50000 && p.price <= 100000)
        || (priceRange === '100K+' && p.price > 100000);
      const matchDiff = difficulty === 'All' || p.difficulty === difficulty;
      const matchCat = pkgCat === 'All' || p.category === pkgCat;
      return matchSearch && matchPrice && matchDiff && matchCat;
    });
  }, [search, priceRange, difficulty, pkgCat]);

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #002225 0%, #01363a 60%, #014950 100%)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/rohit-tandon-9wg5jCEPBsw-unsplash.jpg" alt="Tours" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,34,37,0.4), rgba(0,34,37,0.85))' }} />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#93c5fd', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ width: '18px', height: '2px', background: '#93c5fd' }} />Curated Experiences<span style={{ width: '18px', height: '2px', background: '#93c5fd' }} />
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
              Tour <span style={{ background: 'linear-gradient(135deg, #964734, #b05742)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Packages</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              All-inclusive, expertly curated packages for every type of traveler — from adrenaline-seekers to culture enthusiasts.
            </p>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ position: 'relative', background: 'var(--surface-card)', borderRadius: '12px', boxShadow: '0 8px 40px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', color: '#9ca3af' }} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packages or destinations..."
                  style={{ flex: 1, padding: '15px 16px 15px 46px', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#111827' }} />
                {search && <button onClick={() => setSearch('')} style={{ padding: '0 16px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={16} /></button>}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="sub-nav-strip" style={{ position: 'sticky', top: '72px', zIndex: 40, background: 'var(--nav-scrolled-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-header)' }}>
        <div className="container" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
          <div className="sub-nav-chips sub-nav-chips--wrap-xl">
            <button type="button" onClick={() => setShowFilters(!showFilters)} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: `1.5px solid ${showFilters ? '#024950' : 'var(--surface-border)'}`, background: showFilters ? '#024950' : 'var(--surface-card)', color: showFilters ? 'white' : 'var(--text-body)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
            {pkgCategories.map(c => (
              <button type="button" key={c} onClick={() => setPkgCat(c)} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: '100px', border: `1.5px solid ${pkgCat === c ? '#024950' : 'var(--surface-border)'}`, background: pkgCat === c ? '#024950' : 'var(--surface-card)', color: pkgCat === c ? 'white' : 'var(--text-body)', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>{c}</button>
            ))}
            <span style={{ flexShrink: 0, marginLeft: 'auto', color: 'var(--text-muted-2)', fontSize: '0.82rem' }}>{filtered.length} packages</span>
          </div>

          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="sub-nav-strip" style={{ overflow: 'hidden', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--surface-border-subtle)' }}>
              <div id="pkg-filter-rows" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                <style>{`@media(min-width:640px){#pkg-filter-rows{grid-template-columns:1fr 1fr}}`}</style>
                <div>
                  <span style={{ color: 'var(--text-muted-2)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>Price Range</span>
                  <div className="sub-nav-chips sub-nav-chips--wrap-xl" style={{ gap: '6px' }}>
                    {priceRanges.map(r => (
                      <button type="button" key={r} onClick={() => setPriceRange(r)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: '100px', border: `1.5px solid ${priceRange === r ? '#964734' : 'var(--surface-border)'}`, background: priceRange === r ? '#964734' : 'var(--surface-card)', color: priceRange === r ? 'white' : 'var(--text-body)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>{r}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted-2)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>Difficulty</span>
                  <div className="sub-nav-chips sub-nav-chips--wrap-xl" style={{ gap: '6px' }}>
                    {difficultyLevels.map(r => (
                      <button type="button" key={r} onClick={() => setDifficulty(r)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: '100px', border: `1.5px solid ${difficulty === r ? '#024950' : 'var(--surface-border)'}`, background: difficulty === r ? '#024950' : 'var(--surface-card)', color: difficulty === r ? 'white' : 'var(--text-body)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>{r}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <section style={{ background: 'var(--surface-muted)' }}>
        <div className="container section">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h3 style={{ color: '#374151', fontWeight: 600, fontSize: '1.2rem', marginBottom: '8px' }}>No packages found</h3>
              <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Try adjusting your filters</p>
              <button onClick={() => { setSearch(''); setPriceRange('All'); setDifficulty('All'); setPkgCat('All'); }} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
