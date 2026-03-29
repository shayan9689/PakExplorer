import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, ArrowRight, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PackageCard({ pkg, index = 0 }) {
  const { name, slug, description, duration, price, originalPrice, image, destinations, difficulty, rating, reviews, category, groupSize } = pkg;
  const { openAuth, user } = useAuth();
  const discount = Math.round((1 - price / originalPrice) * 100);

  const handleBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openAuth('login');
    } else {
      // In a real app, redirect to booking flow
      alert(`Booking confirmed for "${name}"! Our team will contact you shortly.`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <Link to={`/packages/${slug}`}>
        <div className="destination-card group h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: '220px' }}>
            <img src={image} alt={name} loading="lazy" className="w-full h-full object-cover" />
            <div className="card-overlay" />
            <div className="absolute top-4 left-4">
              <span className="badge badge-gold text-xs">{category}</span>
            </div>
            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-lg">
                -{discount}% OFF
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-emerald-400 transition-colors">
              {name}
            </h3>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {destinations.slice(0, 3).map(d => (
                <span key={d} className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-800/40">
                  {d}
                </span>
              ))}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{description}</p>

            <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-emerald-400" />
                {duration}
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={12} className="text-emerald-400" />
                {groupSize}
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                {rating} ({reviews} reviews)
              </div>
              <div className="flex items-center gap-1.5">
                <Tag size={12} className="text-emerald-400" />
                {difficulty}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1e2d4a]">
              <div>
                {originalPrice && (
                  <div className="text-gray-500 text-xs line-through">PKR {originalPrice.toLocaleString()}</div>
                )}
                <div className="text-emerald-400 font-bold text-lg">
                  PKR {price.toLocaleString()}
                </div>
                <div className="text-gray-500 text-xs">per person</div>
              </div>
              <button
                onClick={handleBook}
                className="btn-primary text-sm py-2 px-4"
              >
                Book Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
