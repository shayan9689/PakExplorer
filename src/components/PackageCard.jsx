import { motion } from 'framer-motion';
import GuardedLink from './GuardedLink';
import { Clock, Users, Mountain, Star, ArrowRight, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const DIFFICULTY_COLOR = {
  Easy: { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  Moderate: { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
  Challenging: { bg: '#fff1f2', color: '#be123c', border: '#fecdd3' },
};

export default function PackageCard({ pkg, index = 0 }) {
  const { name, image, price, duration, groupSize, difficulty, category, rating, reviews, slug, destinations: pkgDests, features } = pkg;
  const { user, openAuth } = useAuth();
  const { showToast } = useToast();
  const diffStyle = DIFFICULTY_COLOR[difficulty] || DIFFICULTY_COLOR['Moderate'];

  const handleBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) openAuth('login');
    else
      showToast({
        title: 'Inquiry received',
        message: `Your request for "${name}" is in. We'll contact you within 24 hours.`,
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
      style={{ height: '100%' }}
    >
      <GuardedLink to={`/packages/${slug}`} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
        <div className="destination-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
            <img
              src={image}
              alt={name}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <div className="card-overlay" style={{ position: 'absolute', inset: 0 }} />

            {/* Category badge */}
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#024950', fontWeight: 600 }}>
                {category}
              </span>
            </div>

            {/* Price badge */}
            <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
              <span style={{ background: 'linear-gradient(135deg, #964734, #b05742)', color: 'white', padding: '5px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, boxShadow: '0 4px 12px rgba(212,136,26,0.35)' }}>
                PKR {price?.toLocaleString()}
              </span>
            </div>

            {/* Rating */}
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', padding: '4px 10px', borderRadius: '100px' }}>
              <Star size={12} color="#964734" fill="#964734" />
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600 }}>{rating}</span>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem' }}>({reviews})</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '18px 20px 20px', background: 'var(--surface-card)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '6px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{name}</h3>

            {/* Destinations chips */}
            {pkgDests?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                {pkgDests.slice(0, 3).map((d, i) => (
                  <span key={i} style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'var(--surface-muted)', border: '1px solid var(--surface-border)', borderRadius: '100px', color: 'var(--text-muted)' }}>{d}</span>
                ))}
                {pkgDests.length > 3 && <span style={{ fontSize: '0.72rem', padding: '2px 8px', background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: '100px', color: '#024950' }}>+{pkgDests.length - 3}</span>}
              </div>
            )}

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--surface-muted)', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                <Calendar size={14} color="var(--text-muted)" style={{ margin: '0 auto 3px' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-body)' }}>{duration}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted-2)' }}>Days</div>
              </div>
              <div style={{ background: 'var(--surface-muted)', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                <Users size={14} color="var(--text-muted)" style={{ margin: '0 auto 3px' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-body)' }}>{groupSize}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted-2)' }}>People</div>
              </div>
              <div style={{ background: diffStyle.bg, border: `1px solid ${diffStyle.border}`, borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                <Mountain size={14} color={diffStyle.color} style={{ margin: '0 auto 3px' }} />
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: diffStyle.color }}>{difficulty}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted-2)' }}>Level</div>
              </div>
            </div>

            {/* CTA row */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
              <button
                onClick={handleBook}
                style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg, #024950, #0FA4AF)', color: 'white', border: 'none', borderRadius: '9px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 3px 10px rgba(26,122,74,0.25)' }}
              >
                Book Now
              </button>
              <div style={{ width: '38px', height: '38px', background: 'var(--surface-muted)', border: '1px solid var(--surface-border)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.2s' }}>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        </div>
      </GuardedLink>
    </motion.div>
  );
}
