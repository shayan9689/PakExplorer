import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, Globe, Heart, ArrowRight, Star, Shield, Zap, Target } from 'lucide-react';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

const team = [
  { name: 'Ahmed Raza', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90', bio: 'Former mountain guide with 15+ years exploring Pakistan.' },
  { name: 'Sara Malik', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=90', bio: 'Travel logistics expert ensuring every trip runs perfectly.' },
  { name: 'Omar Farooq', role: 'Lead Adventure Guide', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=90', bio: 'K2 summiteer and certified mountain guide since 2010.' },
  { name: 'Ayesha Siddiqui', role: 'Cultural Tourism Lead', image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&q=90', bio: 'Heritage specialist with deep expertise in Mughal history.' },
];

const values = [
  { icon: Heart, title: 'Passion for Pakistan', desc: 'We are Pakistani — we live and breathe this land. Every recommendation comes from personal experience and deep love for our country.' },
  { icon: Shield, title: 'Safety First', desc: 'Your safety is our top priority. All our guides are certified, vehicles are maintained, and safety protocols are strictly followed.' },
  { icon: Globe, title: 'Sustainable Tourism', desc: 'We work with local communities, use eco-friendly practices, and ensure tourism benefits are shared with the people who call these places home.' },
  { icon: Star, title: 'Premium Experiences', desc: 'We do not settle for average. Every destination, every package, every guide is carefully vetted to deliver exceptional quality.' },
];

export default function About() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1612128952123-88ed13410495?w=1920&q=80" alt="About" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,14,28,0.5), rgba(8,14,28,1))' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="section-label">Our Story</div>
            <h1 className="font-display text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
              Born From a <span className="gradient-text">Love of Pakistan</span>
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              PakExplorer was founded in 2018 by a team of Pakistani travel enthusiasts who were tired of seeing their country underrepresented on the global stage. We set out to change that — one extraordinary journey at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[#1e2d4a]" style={{ background: 'rgba(10,102,64,0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2018', label: 'Founded', icon: Target },
              { value: '50K+', label: 'Happy Travelers', icon: Users },
              { value: '18+', label: 'Destinations', icon: Globe },
              { value: '4.9★', label: 'Average Rating', icon: Award },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-emerald-900/40 border border-emerald-700/30 rounded-xl flex items-center justify-center">
                    <s.icon size={20} className="text-emerald-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1636997209370-e2042d01d5a5?w=800&q=90" alt="Mission" className="w-full h-80 object-cover rounded-3xl" />
              <div className="absolute -bottom-6 -right-6 glass p-5 rounded-2xl" style={{ border: '1px solid rgba(201,151,59,0.3)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-700 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Our Mission</div>
                    <div className="text-gray-400 text-xs">Making Pakistan famous for the right reasons</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="section-label">What Drives Us</div>
            <h2 className="font-display text-4xl font-bold text-white mb-6">Changing Pakistan's Image, One Journey at a Time</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              For too long, Pakistan's extraordinary beauty has been overshadowed by negative narratives. We exist to tell a different story — of warm hospitality, breathtaking landscapes, and ancient civilizations that continue to inspire awe.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Every traveler we bring to Pakistan becomes an ambassador. They go home with stories of Hunza sunsets, K2 majesty, Lahore's Mughal grandeur, and the warmth of Pakistani people — and they tell those stories to the world.
            </p>
            <Link to="/destinations" className="btn-primary">
              Start Your Journey <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="section-label justify-center">What We Stand For</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Our Core <span className="gradient-text-gold">Values</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-8 hover:border-emerald-700/40 transition-all" style={{ border: '1px solid rgba(30,45,74,0.6)' }}>
              <div className="w-12 h-12 bg-emerald-900/40 border border-emerald-700/30 rounded-2xl flex items-center justify-center mb-5">
                <v.icon size={22} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{v.title}</h3>
              <p className="text-gray-400 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="section-label justify-center">The People Behind PakExplorer</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Meet Our <span className="gradient-text-green">Team</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center hover:border-emerald-700/40 transition-all" style={{ border: '1px solid rgba(30,45,74,0.6)' }}>
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-[#080e1c]" />
              </div>
              <h3 className="text-white font-bold mb-1">{member.name}</h3>
              <div className="text-emerald-400 text-sm font-medium mb-3">{member.role}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center glass rounded-3xl p-16" style={{ border: '1px solid rgba(10,102,64,0.3)' }}>
          <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to Explore with Us?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">Join 50,000+ travelers who have experienced Pakistan's magic with PakExplorer.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/packages" className="btn-gold py-4 px-8">View Packages <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-secondary py-4 px-8">Contact Us</Link>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
