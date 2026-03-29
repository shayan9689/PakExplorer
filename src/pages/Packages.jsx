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
      const matchPrice = priceRange === 'All' || (priceRange === 'Under 50K' && p.price < 50000) || (priceRange === '50K–100K' && p.price >= 50000 && p.price <= 100000) || (priceRange === '100K+' && p.price > 100000);
      const matchDiff = difficulty === 'All' || p.difficulty === difficulty;
      const matchCat = pkgCat === 'All' || p.category === pkgCat;
      return matchSearch && matchPrice && matchDiff && matchCat;
    });
  }, [search, priceRange, difficulty, pkgCat]);

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1636997209370-e2042d01d5a5?w=1920&q=80" alt="Tours" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,14,28,0.5), rgba(8,14,28,1))' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label justify-center">Curated Experiences</div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-5">
              Tour <span className="gradient-text-gold">Packages</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              All-inclusive, expertly curated packages for every type of traveler — from adrenaline-seekers to culture enthusiasts.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packages or destinations..." className="input-dark pl-12 py-4 w-full glass" />
              {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"><X size={16} /></button>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-[#080e1c]/90 backdrop-blur-lg border-b border-[#1e2d4a] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${showFilters ? 'bg-emerald-800/40 border-emerald-600 text-white' : 'border-[#1e2d4a] text-gray-400 hover:border-emerald-700 hover:text-white'}`}>
              <SlidersHorizontal size={14} /> Filters
            </button>
            {pkgCategories.map(c => (
              <button key={c} onClick={() => setPkgCat(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pkgCat === c ? 'bg-emerald-700 text-white' : 'text-gray-400 border border-[#1e2d4a] hover:border-emerald-700 hover:text-white'}`}>{c}</button>
            ))}
            <span className="ml-auto text-gray-500 text-sm hidden md:block">{filtered.length} packages</span>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-[#1e2d4a] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-2">Price Range</span>
                <div className="flex gap-2 flex-wrap">
                  {priceRanges.map(r => (
                    <button key={r} onClick={() => setPriceRange(r)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${priceRange === r ? 'text-[#080e1c] font-bold' : 'text-gray-400 border border-[#1e2d4a]'}`} style={priceRange === r ? { background: '#c9973b' } : {}}>{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-2">Difficulty</span>
                <div className="flex gap-2 flex-wrap">
                  {difficultyLevels.map(r => (
                    <button key={r} onClick={() => setDifficulty(r)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${difficulty === r ? 'bg-emerald-700 text-white' : 'text-gray-400 border border-[#1e2d4a]'}`}>{r}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-white text-xl font-semibold mb-2">No packages found</h3>
            <button onClick={() => { setSearch(''); setPriceRange('All'); setDifficulty('All'); setPkgCat('All'); }} className="btn-primary mt-4">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <PackageCard key={p.id} pkg={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
