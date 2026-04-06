import GuardedLink from './GuardedLink';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination, index = 0 }) {
  const { name, image, location, rating, reviews, bestTimeToVisit, category, difficulty, slug, tagline } = destination;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      style={{ height: '100%' }}
    >
      <GuardedLink to={`/destinations/${slug}`} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
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

            {/* Top badges */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="badge badge-green" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#024950' }}>
                {category}
              </span>
              <span className="badge badge-amber" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#964734' }}>
                {difficulty}
              </span>
            </div>

            {/* Bottom info overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Star size={13} color="#964734" fill="#964734" />
                <span style={{ color: 'white', fontSize: '0.82rem', fontWeight: 600 }}>{rating}</span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.77rem' }}>({reviews?.toLocaleString()})</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '16px 18px 18px', background: 'var(--surface-card)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '4px', lineHeight: 1.3 }}>{name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{tagline}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--surface-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <MapPin size={13} color="#024950" />
                {location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <Clock size={12} color="var(--text-muted-2)" />
                {bestTimeToVisit?.split(' ')[0]}
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted-2)' }}>Best time: {bestTimeToVisit}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#024950', fontSize: '0.82rem', fontWeight: 600 }}>
                Explore <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </GuardedLink>
    </motion.div>
  );
}
