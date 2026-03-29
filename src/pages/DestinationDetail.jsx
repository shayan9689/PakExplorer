import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowLeft, CheckCircle, Calendar, Users, Compass, ExternalLink, ChevronRight } from 'lucide-react';
import { destinations } from '../data';
import { useAuth } from '../context/AuthContext';
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
  const [activeImg, setActiveImg] = useState(0);
  const destination = destinations.find(d => d.slug === slug);

  if (!destination) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-4">Destination Not Found</h2>
            <Link to="/destinations" className="btn-primary">Back to Destinations</Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const { name, tagline, description, images, heroImage, location, region, bestTimeToVisit, duration, rating, reviews, highlights, activities, difficulty, category, coordinates } = destination;

  const handleBook = () => {
    if (!user) openAuth('login');
    else alert(`Your inquiry for "${name}" has been received! Our team will contact you within 24 hours.`);
  };

  const related = destinations.filter(d => d.slug !== slug && (d.region === region || d.category === category)).slice(0, 3);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.img
          key={activeImg}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src={images[activeImg] || heroImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,14,28,0.3) 0%, rgba(8,14,28,0.85) 100%)' }} />

        {/* Back nav */}
        <div className="absolute top-24 left-0 right-0 px-4 sm:px-8">
          <Link to="/destinations" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Destinations
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-emerald">{category}</span>
              <span className="badge badge-gold">{difficulty}</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-2">{name}</h1>
            <p className="text-emerald-400 text-xl font-medium italic mb-4">{tagline}</p>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-emerald-400" />{location}</span>
              <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" />{rating} ({reviews?.toLocaleString()} reviews)</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-emerald-400" />{bestTimeToVisit}</span>
            </div>
          </motion.div>
        </div>

        {/* Image thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-8 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? 'border-emerald-400 scale-105' : 'border-transparent opacity-60 hover:opacity-90'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">About {name}</h2>
              <p className="text-gray-400 leading-relaxed text-lg">{description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-white font-bold text-xl mb-5">Top Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 p-4 glass-light rounded-xl"
                  >
                    <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm font-medium">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-white font-bold text-xl mb-5">Activities</h3>
              <div className="flex flex-wrap gap-3">
                {activities.map((a, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 glass-light rounded-xl text-sm text-gray-300 border border-[#1e2d4a]">
                    <Compass size={13} className="text-emerald-400" />
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Travel Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Calendar, label: 'Best Time', value: bestTimeToVisit },
                { icon: Clock, label: 'Duration', value: duration },
                { icon: Users, label: 'Difficulty', value: difficulty },
                { icon: MapPin, label: 'Region', value: region },
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-8 h-8 bg-emerald-900/40 rounded-lg flex items-center justify-center">
                      <item.icon size={15} className="text-emerald-400" />
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs mb-1">{item.label}</div>
                  <div className="text-white text-sm font-semibold">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Map Link */}
            <a
              href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass px-5 py-3 rounded-xl text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-800/40 hover:border-emerald-600"
            >
              <MapPin size={15} />
              View on Google Maps
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass rounded-2xl p-6 sticky top-24"
              style={{ border: '1px solid rgba(10,102,64,0.3)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                ))}
                <span className="text-white font-bold ml-1">{rating}</span>
                <span className="text-gray-400 text-sm">({reviews?.toLocaleString()})</span>
              </div>

              <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
              <p className="text-gray-400 text-sm mb-6">{tagline}</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white font-medium">{location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Best Time</span>
                  <span className="text-white font-medium">{bestTimeToVisit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-medium">{duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Difficulty</span>
                  <span className="text-white font-medium">{difficulty}</span>
                </div>
              </div>

              <button onClick={handleBook} className="btn-gold w-full justify-center py-4 text-base">
                Book This Destination
              </button>

              <p className="text-center text-gray-500 text-xs mt-3">
                {user ? '✓ Logged in — booking enabled' : '🔒 Sign in required to book'}
              </p>

              <div className="mt-4 pt-4 border-t border-[#1e2d4a] flex justify-center gap-6 text-xs text-gray-500">
                <span>✓ Free cancellation</span>
                <span>✓ 24/7 support</span>
              </div>
            </motion.div>

            {/* Quick facts */}
            <div className="glass rounded-2xl p-5">
              <h4 className="text-white font-semibold mb-4">Quick Facts</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-400">
                  <ChevronRight size={14} className="text-emerald-400" />
                  Lat/Lng: {coordinates.lat}, {coordinates.lng}
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <ChevronRight size={14} className="text-emerald-400" />
                  {highlights.length} key highlights
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <ChevronRight size={14} className="text-emerald-400" />
                  {activities.length} activities available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      {related.length > 0 && (
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h3 className="text-white font-bold text-2xl mb-8">Similar Destinations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((d, i) => (
              <Link key={d.id} to={`/destinations/${d.slug}`}>
                <div className="destination-card group overflow-hidden rounded-2xl">
                  <div className="relative h-48 overflow-hidden">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                    <div className="card-overlay" />
                    <div className="absolute bottom-3 left-3">
                      <h4 className="text-white font-bold">{d.name}</h4>
                      <p className="text-emerald-400 text-xs">{d.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
