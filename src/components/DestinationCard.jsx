import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination, index = 0 }) {
  const { name, slug, shortDescription, image, location, bestTimeToVisit, rating, reviews, category, difficulty } = destination;

  const difficultyColor = {
    Easy: 'badge-emerald',
    Moderate: 'badge-gold',
    Challenging: 'badge-blue',
  }[difficulty] || 'badge-emerald';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <Link to={`/destinations/${slug}`}>
        <div className="destination-card group h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: '240px' }}>
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="card-overlay" />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`badge ${difficultyColor} text-xs`}>{difficulty}</span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="badge badge-gold text-xs">{category}</span>
            </div>

            {/* Rating overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm font-bold">{rating}</span>
              <span className="text-gray-300 text-xs">({reviews.toLocaleString()})</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-white font-bold text-lg leading-tight group-hover:text-emerald-400 transition-colors">
                {name}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 mb-3">
              <MapPin size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="text-gray-400 text-sm">{location}</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{shortDescription}</p>

            <div className="flex items-center justify-between pt-3 border-t border-[#1e2d4a]">
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Clock size={12} />
                <span>{bestTimeToVisit}</span>
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-sm font-semibold group-hover:gap-2 transition-all">
                Explore <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
