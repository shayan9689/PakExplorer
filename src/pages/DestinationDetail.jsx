import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowLeft, CheckCircle, Calendar, Users, Compass, ExternalLink, ChevronRight } from 'lucide-react';
import { destinations } from '../data';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useState } from 'react';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

export default function DestinationDetail() {
  const { slug } = useParams();
  const { user, openAuth } = useAuth();
  const { showToast } = useToast();
  const [activeImg, setActiveImg] = useState(0);
  const destination = destinations.find(d => d.slug === slug);

  if (!destination) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-muted)' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#111827', fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Destination Not Found</h2>
            <Link to="/destinations" className="btn-primary">Back to Destinations</Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const { name, tagline, description, images, heroImage, location, region, bestTimeToVisit, duration, rating, reviews, highlights, activities, difficulty, category, coordinates } = destination;

  const handleBook = () => {
    if (!user) openAuth('login');
    else
      showToast({
        title: 'Inquiry received',
        message: `Your inquiry for "${name}" has been received. Our team will contact you within 24 hours.`,
      });
  };

  const related = destinations.filter(d => d.slug !== slug && (d.region === region || d.category === category)).slice(0, 3);

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: 'clamp(420px, 70vh, 620px)', overflow: 'hidden' }}>
        <motion.img
          key={activeImg}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src={images[activeImg] || heroImage}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />

        {/* Back nav */}
        <div className="container" style={{ position: 'absolute', top: '96px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <Link to="/destinations" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >
            <ArrowLeft size={16} /> Back to Destinations
          </Link>
        </div>

        {/* Title block */}
        <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', paddingBottom: '36px' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color: '#024950', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>{category}</span>
              <span style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color: '#964734', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>{difficulty}</span>
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 800, color: 'white', marginBottom: '6px', textShadow: '0 2px 20px rgba(0,0,0,0.3)', lineHeight: 1.1 }}>{name}</h1>
            <p style={{ color: '#86efac', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '12px' }}>{tagline}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}><MapPin size={14} color="#86efac" />{location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}><Star size={14} color="#964734" fill="#964734" />{rating} ({reviews?.toLocaleString()} reviews)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}><Clock size={14} color="#86efac" />{bestTimeToVisit}</span>
            </div>
          </motion.div>
        </div>

        {/* Image thumbnails */}
        {images.length > 1 && (
          <div
            className="sub-nav-strip sub-nav-chips"
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              justifyContent: 'flex-end',
              gap: '6px',
            }}
          >
            {images.map((img, i) => (
              <button type="button" key={i} onClick={() => setActiveImg(i)}
                style={{ flexShrink: 0, width: '52px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${i === activeImg ? '#86efac' : 'transparent'}`, opacity: i === activeImg ? 1 : 0.6, cursor: 'pointer', padding: 0, transform: i === activeImg ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s' }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── Main Content ── */}
      <section style={{ background: 'var(--surface-muted)' }}>
        <div className="container section">
          <div id="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'start' }}>
            <style>{`@media(min-width:1024px){#detail-grid{grid-template-columns:2fr 1fr}}`}</style>

            {/* Left: Main */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

              {/* About */}
              <div style={{ background: 'var(--surface-card)', borderRadius: '16px', padding: '28px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111827', marginBottom: '14px' }}>About {name}</h2>
                <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1rem' }}>{description}</p>
              </div>

              {/* Highlights */}
              <div style={{ background: 'var(--surface-card)', borderRadius: '16px', padding: '28px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111827', marginBottom: '18px' }}>Top Highlights</h3>
                <div id="highlights-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                  <style>{`@media(min-width:500px){#highlights-grid{grid-template-columns:1fr 1fr}}`}</style>
                  {highlights.map((h, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: '10px' }}
                    >
                      <CheckCircle size={15} color="#024950" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#374151', fontSize: '0.875rem', fontWeight: 500 }}>{h}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div style={{ background: 'var(--surface-card)', borderRadius: '16px', padding: '28px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111827', marginBottom: '14px' }}>Activities</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activities.map((a, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'var(--surface-card)', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '0.875rem', color: '#374151', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                      <Compass size={13} color="#024950" />{a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Travel info grid */}
              <div style={{ background: 'var(--surface-card)', borderRadius: '16px', padding: '24px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111827', marginBottom: '14px' }}>Travel Information</h3>
                <div id="travel-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
                  <style>{`@media(min-width:500px){#travel-info{grid-template-columns:repeat(4,1fr)}}`}</style>
                  {[
                    { icon: Calendar, label: 'Best Time', value: bestTimeToVisit },
                    { icon: Clock, label: 'Duration', value: duration },
                    { icon: Users, label: 'Difficulty', value: difficulty },
                    { icon: MapPin, label: 'Region', value: region },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'var(--surface-muted)', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                        <div style={{ width: '34px', height: '34px', background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <item.icon size={15} color="#024950" />
                        </div>
                      </div>
                      <div style={{ color: '#9ca3af', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{item.label}</div>
                      <div style={{ color: '#111827', fontSize: '0.85rem', fontWeight: 600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <a href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', marginTop: '16px', padding: '10px 18px', background: '#f0fdf4', border: '1.5px solid #d1fae5', borderRadius: '10px', color: '#024950', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.borderColor = '#86efac'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.borderColor = '#d1fae5'; }}
                >
                  <MapPin size={14} /> View on Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Booking card */}
              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
                style={{ background: 'var(--surface-card)', borderRadius: '20px', padding: '24px', border: '1.5px solid #e5e7eb', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', position: 'sticky', top: '88px' }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '12px' }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} color={i <= Math.round(rating) ? '#964734' : '#e5e7eb'} fill={i <= Math.round(rating) ? '#964734' : '#e5e7eb'} />
                  ))}
                  <span style={{ fontWeight: 700, color: '#111827', marginLeft: '5px', fontSize: '0.9rem' }}>{rating}</span>
                  <span style={{ color: '#9ca3af', fontSize: '0.82rem' }}>({reviews?.toLocaleString()})</span>
                </div>

                <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#111827', marginBottom: '4px' }}>{name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.5 }}>{tagline}</p>

                {/* Info rows */}
                {[
                  { label: 'Location', value: location },
                  { label: 'Best Time', value: bestTimeToVisit },
                  { label: 'Duration', value: duration },
                  { label: 'Difficulty', value: difficulty },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '0.85rem' }}>
                    <span style={{ color: '#9ca3af' }}>{label}</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}

                <button onClick={handleBook}
                  style={{ width: '100%', marginTop: '20px', padding: '14px', background: 'linear-gradient(135deg, #964734, #b05742)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(212,136,26,0.3)', fontFamily: 'Inter, sans-serif', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,136,26,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,136,26,0.3)'; }}
                >
                  Book This Destination
                </button>

                <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.75rem', marginTop: '10px' }}>
                  {user ? '✓ Logged in — booking enabled' : '🔒 Sign in required to book'}
                </p>

                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>✓ Free cancellation</span>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>✓ 24/7 support</span>
                </div>
              </motion.div>

              {/* Quick facts */}
              <div style={{ background: 'var(--surface-card)', borderRadius: '16px', padding: '20px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h4 style={{ fontWeight: 700, color: '#111827', marginBottom: '14px', fontSize: '0.95rem' }}>Quick Facts</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    `Coordinates: ${coordinates.lat}°, ${coordinates.lng}°`,
                    `${highlights.length} key highlights`,
                    `${activities.length} activities available`,
                  ].map((fact, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.82rem' }}>
                      <ChevronRight size={13} color="#024950" style={{ flexShrink: 0 }} />{fact}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section style={{ background: 'var(--surface-card)' }}>
          <div className="container section">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '28px' }}>Similar Destinations</h3>
            <div className="grid-3">
              {related.map((d, i) => (
                <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/destinations/${d.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                    <div className="destination-card">
                      <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                        <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="card-overlay" style={{ position: 'absolute', inset: 0 }} />
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                          <h4 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', marginBottom: '2px' }}>{d.name}</h4>
                          <p style={{ color: '#86efac', fontSize: '0.75rem' }}>{d.location}</p>
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
