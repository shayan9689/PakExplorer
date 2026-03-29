import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, CheckCircle, Star, Tag, MapPin, Calendar } from 'lucide-react';
import { tourPackages } from '../data';
import { useAuth } from '../context/AuthContext';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

export default function PackageDetail() {
  const { slug } = useParams();
  const { user, openAuth } = useAuth();
  const pkg = tourPackages.find(p => p.slug === slug);

  if (!pkg) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-4">Package Not Found</h2>
            <Link to="/packages" className="btn-primary">Back to Packages</Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const { name, description, duration, price, originalPrice, image, destinations, includes, highlights, groupSize, difficulty, category, rating, reviews } = pkg;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  const handleBook = () => {
    if (!user) openAuth('login');
    else alert(`🎉 Booking request for "${name}" submitted! Our Pakistan travel specialist will call you within 2 hours.`);
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,14,28,0.35) 0%, rgba(8,14,28,0.9) 100%)' }} />
        <div className="absolute top-24 left-0 right-0 px-6 sm:px-8 max-w-7xl mx-auto">
          <Link to="/packages" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Packages
          </Link>
        </div>
        <div className="absolute bottom-0 px-4 sm:px-8 pb-10 max-w-7xl mx-auto left-0 right-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="badge badge-gold">{category}</span>
              <span className="badge badge-emerald">{difficulty}</span>
              {discount > 0 && <span className="badge text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.85)' }}>SAVE {discount}%</span>}
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-3">{name}</h1>
            <div className="flex items-center gap-5 text-sm text-gray-300">
              <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" />{rating} ({reviews} reviews)</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-emerald-400" />{duration}</span>
              <span className="flex items-center gap-1.5"><Users size={14} className="text-emerald-400" />{groupSize}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
            </div>

            {/* Destinations covered */}
            <div>
              <h3 className="text-white font-bold text-xl mb-5">Destinations Covered</h3>
              <div className="flex flex-wrap gap-3">
                {destinations.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 glass-light rounded-xl border border-[#1e2d4a]">
                    <MapPin size={14} className="text-emerald-400" />
                    <span className="text-gray-300 text-sm font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-white font-bold text-xl mb-5">Trip Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 p-4 glass-light rounded-xl"
                  >
                    <Star size={14} className="text-yellow-400 fill-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Includes */}
            <div>
              <h3 className="text-white font-bold text-xl mb-5">What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 glass-light rounded-xl">
                    <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Clock, label: 'Duration', value: duration },
                { icon: Users, label: 'Group Size', value: groupSize },
                { icon: Tag, label: 'Difficulty', value: difficulty },
                { icon: Calendar, label: 'Category', value: category },
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
          </div>

          {/* Booking Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass rounded-2xl p-6 sticky top-24"
              style={{ border: '1px solid rgba(10,102,64,0.3)' }}
            >
              <div className="text-center mb-6">
                {originalPrice && <div className="text-gray-500 text-sm line-through">PKR {originalPrice.toLocaleString()}</div>}
                <div className="text-4xl font-bold text-emerald-400">PKR {price.toLocaleString()}</div>
                <div className="text-gray-400 text-sm mt-1">per person • all inclusive</div>
                {discount > 0 && (
                  <div className="inline-block mt-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold border border-red-500/30">
                    You save PKR {(originalPrice - price).toLocaleString()}!
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between py-2 border-b border-[#1e2d4a]">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-medium">{duration}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1e2d4a]">
                  <span className="text-gray-400">Group Size</span>
                  <span className="text-white font-medium">{groupSize}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1e2d4a]">
                  <span className="text-gray-400">Difficulty</span>
                  <span className="text-white font-medium">{difficulty}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Rating</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" /> {rating}
                  </span>
                </div>
              </div>

              <button onClick={handleBook} className="btn-gold w-full justify-center py-4 text-base font-bold">
                Book This Package
              </button>

              <p className="text-center text-gray-500 text-xs mt-3">
                {user ? '✓ Ready to book — instant confirmation' : '🔒 Sign in required to complete booking'}
              </p>

              <div className="mt-5 pt-5 border-t border-[#1e2d4a] grid grid-cols-2 gap-3 text-center text-xs text-gray-400">
                <div className="glass-light rounded-lg p-2">✓ Free Cancellation</div>
                <div className="glass-light rounded-lg p-2">✓ 24/7 Support</div>
                <div className="glass-light rounded-lg p-2">✓ Expert Guides</div>
                <div className="glass-light rounded-lg p-2">✓ All Inclusive</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
