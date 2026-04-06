import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal, MapPin } from 'lucide-react';
import { destinations, regions, categories } from '../data';
import DestinationCard from '../components/DestinationCard';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
}

export default function Destinations() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [category, setCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return destinations.filter(d => {
      const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.location.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region === 'All' || d.region === region;
      const matchCat = category === 'All' || d.category === category;
      return matchSearch && matchRegion && matchCat;
    });
  }, [search, region, category]);

  const hasFilters = region !== 'All' || category !== 'All' || search;

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #003135 0%, #013d42 60%, #024950 100%)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/condor-wei-HKUOwPiO4z0-unsplash.jpg" alt="Pakistan" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,49,53,0.4), rgba(0,49,53,0.85))' }} />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#86efac', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ width: '18px', height: '2px', background: '#86efac' }} />
              Explore Pakistan
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
              All <span style={{ background: 'linear-gradient(135deg, #964734, #b05742)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Destinations</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Discover {destinations.length}+ extraordinary destinations — from glacial peaks to Mughal palaces.
            </p>
            {/* Search */}
            <div style={{ maxWidth: '520px', margin: '0 auto' }}>
              <div style={{ position: 'relative', background: 'var(--surface-card)', borderRadius: '12px', boxShadow: '0 8px 40px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted-2)' }} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mountains, cities, valleys..." style={{ flex: 1, padding: '16px 16px 16px 46px', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', color: 'var(--text-heading)' }} />
                {search && <button onClick={() => setSearch('')} style={{ padding: '0 16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted-2)' }}><X size={16} /></button>}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="sub-nav-strip" style={{ position: 'sticky', top: '72px', zIndex: 40, background: 'var(--nav-scrolled-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-header)' }}>
        <div className="container" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
          <div className="sub-nav-chips sub-nav-chips--wrap-xl">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: `1.5px solid ${showFilters ? '#024950' : 'var(--surface-border)'}`, background: showFilters ? '#024950' : 'var(--surface-card)', color: showFilters ? 'white' : 'var(--text-body)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <SlidersHorizontal size={14} />
              Filters {hasFilters && <span style={{ width: '7px', height: '7px', background: '#b05742', borderRadius: '50%', display: 'inline-block' }} />}
            </button>

            {regions.map(r => (
              <button type="button" key={r} onClick={() => setRegion(r)} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: '100px', border: `1.5px solid ${region === r ? '#024950' : 'var(--surface-border)'}`, background: region === r ? '#024950' : 'var(--surface-card)', color: region === r ? 'white' : 'var(--text-body)', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>{r}</button>
            ))}

            {hasFilters && (
              <button type="button" onClick={() => { setSearch(''); setRegion('All'); setCategory('All'); }} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '7px 12px', background: 'none', border: 'none', color: '#ef4444', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', marginLeft: 'auto' }}>
                <X size={13} /> Clear
              </button>
            )}

            <span style={{ flexShrink: 0, marginLeft: hasFilters ? '0' : 'auto', color: 'var(--text-muted-2)', fontSize: '0.82rem' }}>{filtered.length} results</span>
          </div>

          {/* Category row */}
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="sub-nav-strip" style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--surface-border-subtle)', overflow: 'hidden' }}>
              <div className="sub-nav-chips sub-nav-chips--wrap-xl" style={{ gap: '6px' }}>
              <span style={{ flexShrink: 0, color: 'var(--text-muted-2)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>Category:</span>
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: '100px', border: `1.5px solid ${category === c ? '#964734' : 'var(--surface-border)'}`, background: category === c ? '#964734' : 'var(--surface-card)', color: category === c ? 'white' : 'var(--text-body)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>{c}</button>
              ))}
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
              <MapPin size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ color: 'var(--text-body)', fontWeight: 600, fontSize: '1.2rem', marginBottom: '8px' }}>No destinations found</h3>
              <p style={{ color: 'var(--text-muted-2)', marginBottom: '24px' }}>Try adjusting your filters</p>
              <button onClick={() => { setSearch(''); setRegion('All'); setCategory('All'); }} className="btn-primary">Clear All Filters</button>
            </div>
          ) : (
            <div className="grid-4">
              {filtered.map((d, i) => (
                <DestinationCard key={d.id} destination={d} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
