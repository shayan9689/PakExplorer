import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, X } from 'lucide-react';
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
      {/* ── Hero ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #002225 0%, #01363a 50%, #002225 100%)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/condor-wei-HKUOwPiO4z0-unsplash.jpg" alt="Blog" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,34,37,0.4), rgba(0,34,37,0.85))' }} />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#c4b5fd', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ width: '18px', height: '2px', background: '#c4b5fd' }} />Travel Insights<span style={{ width: '18px', height: '2px', background: '#c4b5fd' }} />
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
              Travel <span style={{ background: 'linear-gradient(135deg, #964734, #b05742)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Blog</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Expert guides, traveler stories, and insider tips to help you explore Pakistan like a pro.
            </p>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ position: 'relative', background: 'var(--surface-card)', borderRadius: '12px', boxShadow: '0 8px 40px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', color: '#9ca3af' }} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
                  style={{ flex: 1, padding: '15px 16px 15px 46px', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#111827' }} />
                {search && <button onClick={() => setSearch('')} style={{ padding: '0 16px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={16} /></button>}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Category filter ── */}
      <div className="sub-nav-strip" style={{ position: 'sticky', top: '72px', zIndex: 40, background: 'var(--nav-scrolled-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-header)' }}>
        <div className="container" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
          <div className="sub-nav-chips sub-nav-chips--wrap-xl" style={{ gap: '6px' }}>
          {blogCategories.map(c => (
            <button type="button" key={c} onClick={() => setCatFilter(c)} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: '100px', border: `1.5px solid ${catFilter === c ? '#6d28d9' : 'var(--surface-border)'}`, background: catFilter === c ? '#6d28d9' : 'var(--surface-card)', color: catFilter === c ? 'white' : 'var(--text-body)', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>{c}</button>
          ))}
          <span style={{ flexShrink: 0, marginLeft: 'auto', color: 'var(--text-muted-2)', fontSize: '0.82rem' }}>{filtered.length} articles</span>
          </div>
        </div>
      </div>

      {/* ── Featured post ── */}
      {catFilter === 'All' && !search && (
        <section style={{ background: 'var(--surface-muted)' }}>
          <div className="container" style={{ paddingTop: '48px', paddingBottom: '0' }}>
            <Link to={`/blog/${featured.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', height: 'clamp(280px, 40vw, 440px)', boxShadow: '0 16px 48px rgba(0,0,0,0.15)', cursor: 'pointer' }}
              >
                <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)' }} />
                <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                  <span style={{ background: '#964734', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '5px 12px', borderRadius: '100px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Featured</span>
                </div>
                <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px' }}>
                  <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color: '#6d28d9', fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', marginBottom: '12px' }}>{featured.category}</span>
                  <h2 className="font-display" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 800, color: 'white', marginBottom: '12px', lineHeight: 1.25 }}>{featured.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginBottom: '16px', maxWidth: '680px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{featured.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={featured.authorImage} alt={featured.author} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.5)' }} />
                      <div>
                        <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{featured.author}</div>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                      </div>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '0.82rem', fontWeight: 600, padding: '6px 14px', borderRadius: '100px' }}>
                      <Clock size={12} />{featured.readTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Blog Grid ── */}
      <section style={{ background: 'var(--surface-muted)' }}>
        <div className="container section">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h3 style={{ color: '#374151', fontWeight: 600, fontSize: '1.2rem', marginBottom: '8px' }}>No articles found</h3>
              <button onClick={() => { setSearch(''); setCatFilter('All'); }} className="btn-primary" style={{ marginTop: '16px' }}>Show All Articles</button>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.09, duration: 0.5 }}>
                  <Link to={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                    <div className="destination-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ position: 'relative', overflow: 'hidden', height: '210px' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                        <div className="card-overlay" style={{ position: 'absolute', inset: 0 }} />
                        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                          <span style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#6d28d9', fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: '100px' }}>{post.category}</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', color: 'white', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '100px' }}>
                          <Clock size={11} />{post.readTime}
                        </div>
                      </div>
                      <div style={{ padding: '18px 20px 20px', background: 'var(--surface-card)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#111827', marginBottom: '8px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={post.authorImage} alt={post.author} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>{post.author}</span>
                          </div>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#6d28d9', fontSize: '0.8rem', fontWeight: 600 }}>Read <ArrowRight size={12} /></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
