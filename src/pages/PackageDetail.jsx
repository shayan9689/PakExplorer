import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, CheckCircle, Star, Tag, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { tourPackages } from '../data';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

const cardStyle = {
  background: 'var(--surface-card)',
  borderRadius: '16px',
  padding: '28px',
  border: '1.5px solid var(--surface-border)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
};

export default function PackageDetail() {
  const { slug } = useParams();
  const { user, openAuth } = useAuth();
  const { showToast } = useToast();
  const pkg = tourPackages.find(p => p.slug === slug);

  if (!pkg) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-muted)' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--text-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Package Not Found</h2>
            <Link to="/packages" className="btn-primary">Back to Packages</Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const { name, description, duration, price, originalPrice, image, destinations, includes, highlights, groupSize, difficulty, category, rating, reviews } = pkg;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  const related = tourPackages
    .filter(p => p.slug !== slug && (p.category === category || p.destinations.some(d => destinations.includes(d))))
    .slice(0, 3);

  const handleBook = () => {
    if (!user) openAuth('login');
    else
      showToast({
        title: 'Booking request sent',
        message: `Your request for "${name}" is confirmed. A Pakistan travel specialist will reach out within 2 hours.`,
      });
  };

  return (
    <PageWrapper>
      {/* ── Hero (aligned with DestinationDetail) ── */}
      <section style={{ position: 'relative', height: 'clamp(420px, 70vh, 620px)', overflow: 'hidden' }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />

        <div className="container" style={{ position: 'absolute', top: '96px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <Link
            to="/packages"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
          >
            <ArrowLeft size={16} /> Back to Packages
          </Link>
        </div>

        <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', paddingBottom: '36px' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color: '#024950', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>{category}</span>
              <span style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color: '#964734', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>{difficulty}</span>
              {discount > 0 && (
                <span style={{ background: 'rgba(239,68,68,0.95)', color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>
                  SAVE {discount}%
                </span>
              )}
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 800, color: 'white', marginBottom: '12px', textShadow: '0 2px 20px rgba(0,0,0,0.35)', lineHeight: 1.1 }}>
              {name}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.88)', fontSize: '0.875rem' }}>
                <Star size={14} color="#964734" fill="#964734" />
                {rating} ({reviews?.toLocaleString?.() ?? reviews} reviews)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.88)', fontSize: '0.875rem' }}>
                <Clock size={14} color="#86efac" />
                {duration}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.88)', fontSize: '0.875rem' }}>
                <Users size={14} color="#86efac" />
                {groupSize}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main content (same grid + cards as DestinationDetail) ── */}
      <section style={{ background: 'var(--surface-muted)' }}>
        <div className="container section">
          <div id="pkg-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'start' }}>
            <style>{`@media(min-width:1024px){#pkg-detail-grid{grid-template-columns:2fr 1fr}}`}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

              <div style={cardStyle}>
                <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '14px' }}>Overview</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>{description}</p>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '18px' }}>Destinations Covered</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {destinations.map((d, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        background: 'var(--surface-card)',
                        border: '1.5px solid var(--surface-border)',
                        borderRadius: '10px',
                        fontSize: '0.875rem',
                        color: 'var(--text-body)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                      }}
                    >
                      <MapPin size={13} color="#024950" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '18px' }}>Trip Highlights</h3>
                <div id="pkg-highlights-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                  <style>{`@media(min-width:500px){#pkg-highlights-grid{grid-template-columns:1fr 1fr}}`}</style>
                  {highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 14px',
                        background: 'var(--surface-input-focus)',
                        border: '1px solid #d1fae5',
                        borderRadius: '10px',
                      }}
                    >
                      <Star size={15} color="#964734" fill="#964734" style={{ flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-body)', fontSize: '0.875rem', fontWeight: 500 }}>{h}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '18px' }}>What&apos;s Included</h3>
                <div id="pkg-includes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                  <style>{`@media(min-width:500px){#pkg-includes-grid{grid-template-columns:1fr 1fr}}`}</style>
                  {includes.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 14px',
                        background: 'var(--surface-muted)',
                        border: '1px solid var(--surface-border)',
                        borderRadius: '10px',
                      }}
                    >
                      <CheckCircle size={15} color="#024950" style={{ flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-body)', fontSize: '0.875rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...cardStyle, padding: '24px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '14px' }}>Package Details</h3>
                <div id="pkg-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
                  <style>{`@media(min-width:500px){#pkg-info-grid{grid-template-columns:repeat(4,1fr)}}`}</style>
                  {[
                    { icon: Clock, label: 'Duration', value: duration },
                    { icon: Users, label: 'Group Size', value: groupSize },
                    { icon: Tag, label: 'Difficulty', value: difficulty },
                    { icon: Calendar, label: 'Category', value: category },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'var(--surface-muted)',
                        border: '1px solid var(--surface-border)',
                        borderRadius: '12px',
                        padding: '14px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                        <div style={{ width: '34px', height: '34px', background: 'var(--surface-input-focus)', border: '1px solid #d1fae5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <item.icon size={15} color="#024950" />
                        </div>
                      </div>
                      <div style={{ color: 'var(--text-muted-2)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{item.label}</div>
                      <div style={{ color: 'var(--text-heading)', fontSize: '0.85rem', fontWeight: 600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — match DestinationDetail booking card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{
                  background: 'var(--surface-card)',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1.5px solid var(--surface-border)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  position: 'sticky',
                  top: '88px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '12px' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={14} color={i <= Math.round(rating) ? '#964734' : 'var(--surface-border)'} fill={i <= Math.round(rating) ? '#964734' : 'var(--surface-border)'} />
                  ))}
                  <span style={{ fontWeight: 700, color: 'var(--text-heading)', marginLeft: '5px', fontSize: '0.9rem' }}>{rating}</span>
                  <span style={{ color: 'var(--text-muted-2)', fontSize: '0.82rem' }}>({reviews?.toLocaleString?.() ?? reviews})</span>
                </div>

                <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-heading)', marginBottom: '4px' }}>{name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: 1.5 }}>
                  {category} · {duration} · {groupSize}
                </p>

                <div style={{ textAlign: 'center', marginBottom: '18px', paddingBottom: '18px', borderBottom: '1px solid var(--surface-border-subtle)' }}>
                  {originalPrice != null && (
                    <div style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: 'var(--text-muted-2)' }}>PKR {originalPrice.toLocaleString()}</div>
                  )}
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#024950', marginTop: '4px' }}>PKR {price.toLocaleString()}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>per person · all inclusive</div>
                  {discount > 0 && originalPrice != null && (
                    <div style={{ display: 'inline-block', marginTop: '10px', padding: '6px 12px', background: 'rgba(239,68,68,0.1)', color: '#dc2626', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600, border: '1px solid rgba(239,68,68,0.25)' }}>
                      You save PKR {(originalPrice - price).toLocaleString()}
                    </div>
                  )}
                </div>

                {[
                  { label: 'Duration', value: duration },
                  { label: 'Group Size', value: groupSize },
                  { label: 'Difficulty', value: difficulty },
                  { label: 'Destinations', value: `${destinations.length} stops` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--surface-border-subtle)', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted-2)' }}>{label}</span>
                    <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleBook}
                  style={{
                    width: '100%',
                    marginTop: '20px',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #964734, #b05742)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 16px rgba(212,136,26,0.3)',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,136,26,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,136,26,0.3)';
                  }}
                >
                  Book This Package
                </button>

                <p style={{ textAlign: 'center', color: 'var(--text-muted-2)', fontSize: '0.75rem', marginTop: '10px' }}>
                  {user ? '✓ Logged in — booking enabled' : '🔒 Sign in required to book'}
                </p>

                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--surface-border-subtle)', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-muted-2)', fontSize: '0.75rem' }}>✓ Free cancellation</span>
                  <span style={{ color: 'var(--text-muted-2)', fontSize: '0.75rem' }}>✓ 24/7 support</span>
                </div>
              </motion.div>

              <div style={{ background: 'var(--surface-card)', borderRadius: '16px', padding: '20px', border: '1.5px solid var(--surface-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--text-heading)', marginBottom: '14px', fontSize: '0.95rem' }}>Package at a glance</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    `${destinations.length} destinations on this route`,
                    `${includes.length} inclusions`,
                    `${highlights.length} highlighted experiences`,
                  ].map((fact, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      <ChevronRight size={13} color="#024950" style={{ flexShrink: 0 }} />
                      {fact}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ background: 'var(--surface-card)' }}>
          <div className="container section">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '28px' }}>Similar Packages</h3>
            <div className="grid-3">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/packages/${p.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                    <div className="destination-card">
                      <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="card-overlay" style={{ position: 'absolute', inset: 0 }} />
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                          <h4 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', marginBottom: '2px' }}>{p.name}</h4>
                          <p style={{ color: '#86efac', fontSize: '0.75rem' }}>PKR {p.price.toLocaleString()} · {p.duration}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
