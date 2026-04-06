import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-muted)' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#111827', fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Article Not Found</h2>
            <Link to="/blog" className="btn-primary">Back to Blog</Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: 'clamp(380px, 55vh, 520px)', overflow: 'hidden' }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,49,53,0.25) 0%, rgba(0,49,53,0.88) 100%)' }} />

        {/* Back nav */}
        <div className="container" style={{ position: 'absolute', top: '96px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >
            <ArrowLeft size={15} /> Back to Blog
          </Link>
        </div>

        {/* Title */}
        <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', paddingBottom: '40px' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <span style={{ display: 'inline-block', background: '#024950', color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', marginBottom: '12px', letterSpacing: '0.04em' }}>{post.category}</span>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.2, maxWidth: '800px' }}>{post.title}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={post.authorImage} alt={post.author} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)' }} />
                <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{post.author}</span>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem' }}>
                <Calendar size={13} />{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem' }}>
                <Clock size={13} />{post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ background: 'var(--surface-card)' }}>
        <div className="container" style={{ paddingTop: '56px', paddingBottom: '56px', maxWidth: '860px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <p style={{ color: '#374151', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px', fontWeight: 500, paddingLeft: '20px', borderLeft: '4px solid #024950', fontStyle: 'italic' }}>
              {post.excerpt}
            </p>
            <div>
              {post.content.split('\n\n').map((para, i) => (
                para.startsWith('**') && para.endsWith('**')
                  ? <h3 key={i} className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginTop: '36px', marginBottom: '16px' }}>{para.replace(/\*\*/g, '')}</h3>
                  : <p key={i} style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: '20px', fontSize: '1rem' }}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="sub-nav-strip" style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--surface-border)' }}>
              <div className="sub-nav-chips sub-nav-chips--wrap-xl" style={{ gap: '8px' }}>
              <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.875rem' }}><Tag size={14} /> Tags:</span>
              {post.tags.map(tag => (
                <span key={tag} className="badge badge-green" style={{ flexShrink: 0, fontSize: '0.78rem' }}>{tag}</span>
              ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Related posts ── */}
      <section style={{ background: 'var(--surface-muted)' }}>
        <div className="container section">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '28px' }}>More Articles</h3>
          <div className="grid-3">
            {related.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/blog/${p.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <div className="destination-card">
                    <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      <div className="card-overlay" style={{ position: 'absolute', inset: 0 }} />
                      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        <span style={{ background: 'rgba(255,255,255,0.9)', color: '#024950', fontSize: '0.7rem', fontWeight: 600, padding: '3px 8px', borderRadius: '100px' }}>{p.category}</span>
                      </div>
                    </div>
                    <div style={{ padding: '14px 16px 16px', background: 'var(--surface-card)' }}>
                      <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', lineHeight: 1.4, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.title}</h4>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#024950', fontSize: '0.8rem', fontWeight: 600 }}>Read More <ArrowRight size={12} /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
