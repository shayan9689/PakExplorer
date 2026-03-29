import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, MapPin, SlidersHorizontal } from 'lucide-react';
import { destinations, regions, categories } from '../data';
import DestinationCard from '../components/DestinationCard';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
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
      {/* Header Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1611821824288-95e977eab064?w=1920&q=85" alt="Pakistan" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,14,28,0.6), rgba(8,14,28,1))' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label justify-center">Explore Pakistan</div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-5">
              All <span className="gradient-text-gold">Destinations</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover {destinations.length}+ extraordinary destinations — from glacial peaks to Mughal palaces, Arabian beaches to ancient ruins.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search destinations..."
                className="input-dark pl-12 py-4 w-full glass"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-[#080e1c]/90 backdrop-blur-lg border-b border-[#1e2d4a] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${showFilters ? 'bg-emerald-800/40 border-emerald-600 text-white' : 'border-[#1e2d4a] text-gray-400 hover:border-emerald-700 hover:text-white'}`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasFilters && <span className="w-2 h-2 bg-emerald-400 rounded-full" />}
            </button>

            {/* Region Pills */}
            <div className="flex gap-2 flex-wrap">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${region === r ? 'bg-emerald-700 text-white' : 'text-gray-400 hover:text-white border border-[#1e2d4a] hover:border-emerald-700'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button
                onClick={() => { setSearch(''); setRegion('All'); setCategory('All'); }}
                className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors ml-auto"
              >
                <X size={13} /> Clear All
              </button>
            )}

            <span className="ml-auto text-gray-500 text-sm hidden md:block">
              {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Category filters (expandable) */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#1e2d4a]"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-500 text-xs uppercase tracking-wider mr-2">Category:</span>
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${category === c ? 'bg-gold text-[#080e1c] font-bold' : 'text-gray-400 hover:text-white border border-[#1e2d4a] hover:border-yellow-700'}`}
                    style={category === c ? { background: '#c9973b' } : {}}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <MapPin size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No destinations found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(''); setRegion('All'); setCategory('All'); }} className="btn-primary mt-6">
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
