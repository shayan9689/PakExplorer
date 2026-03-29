import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, User, X } from 'lucide-react';
import { blogPosts } from '../data';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

const blogCategories = ['All', 'Travel Guide', 'Tips', 'Adventure', 'City Guide', 'Culture', 'Road Trip'];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');

  const filtered = useMemo(() => {
    return blogPosts.filter(p => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === 'All' || p.category === catFilter;
      return matchSearch && matchCat;
    });
  }, [search, catFilter]);

  const featured = blogPosts[0];

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1611821824288-95e977eab064?w=1920&q=80" alt="Blog" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,14,28,0.6), rgba(8,14,28,1))' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label justify-center">Travel Insights</div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-5">
              Travel <span className="gradient-text-gold">Blog</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Expert guides, traveler stories, and insider tips to help you explore Pakistan like a pro.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="input-dark pl-12 py-4 w-full glass" />
              {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"><X size={16} /></button>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-16 z-30 bg-[#080e1c]/90 backdrop-blur-lg border-b border-[#1e2d4a] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 flex-wrap">
          {blogCategories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${catFilter === c ? 'bg-emerald-700 text-white' : 'text-gray-400 border border-[#1e2d4a] hover:border-emerald-700 hover:text-white'}`}>{c}</button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {catFilter === 'All' && !search && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link to={`/blog/${featured.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl group"
              style={{ height: '420px' }}
            >
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,14,28,0.95) 0%, rgba(8,14,28,0.3) 60%, transparent 100%)' }} />
              <div className="absolute top-6 left-6">
                <span className="badge badge-gold">FEATURED</span>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="badge badge-emerald mb-3">{featured.category}</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">{featured.title}</h2>
                <p className="text-gray-300 mb-4 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={featured.authorImage} alt={featured.author} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="text-white text-sm font-medium">{featured.author}</div>
                      <div className="text-gray-400 text-xs">{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-sm"><Clock size={13} />{featured.readTime}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-white text-xl font-semibold mb-2">No articles found</h3>
            <button onClick={() => { setSearch(''); setCatFilter('All'); }} className="btn-primary mt-4">Show All Articles</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="destination-card group h-full flex flex-col">
                    <div className="relative overflow-hidden" style={{ height: '210px' }}>
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="card-overlay" />
                      <div className="absolute top-4 left-4"><span className="badge badge-emerald text-xs">{post.category}</span></div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-1 text-gray-300 text-xs"><Clock size={11} />{post.readTime}</div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors leading-snug">{post.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#1e2d4a]">
                        <div className="flex items-center gap-2">
                          <img src={post.authorImage} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                          <span className="text-gray-400 text-xs">{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">Read <ArrowRight size={11} /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
