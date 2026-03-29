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
  { name: 'Ahmed Raza', role: 'Founder & CEO', image: '/ffaamunchy-IxhT8pyjveY-unsplash.jpg', bio: 'Former mountain guide with 15+ years exploring Pakistan.' },
  { name: 'Sara Malik', role: 'Head of Operations', image: '/kalen-emsley-Bkci_8qcdvQ-unsplash.jpg', bio: 'Travel logistics expert ensuring every trip runs perfectly.' },
  { name: 'Omar Farooq', role: 'Lead Adventure Guide', image: '/luke-richardson-dI7vfR1Bqcg-unsplash.jpg', bio: 'K2 summiteer and certified mountain guide since 2010.' },
  { name: 'Ayesha Siddiqui', role: 'Cultural Tourism Lead', image: '/paul-crook-vWpXyrKa0lU-unsplash.jpg', bio: 'Heritage specialist with deep expertise in Mughal history.' },
];

const values = [
  { icon: Heart, title: 'Passion for Pakistan', desc: 'We are Pakistani — we live and breathe this land. Every recommendation comes from personal experience and deep love for our country.' },
  { icon: Shield, title: 'Safety First', desc: 'Your safety is our top priority. All our guides are certified, vehicles are maintained, and safety protocols are strictly followed.' },
  { icon: Globe, title: 'Sustainable Tourism', desc: 'We work with local communities, use eco-friendly practices, and ensure tourism benefits are shared with local people.' },
  { icon: Star, title: 'Premium Experiences', desc: 'We do not settle for average. Every destination, package, and guide is carefully vetted to deliver exceptional quality.' },
];

const stats = [
  { value: '2018', label: 'Founded', icon: Target },
  { value: '50K+', label: 'Happy Travelers', icon: Users },
  { value: '18+', label: 'Destinations', icon: Globe },
  { value: '4.9★', label: 'Average Rating', icon: Award },
];

export default function About() {
  return (
    <PageWrapper>

      {/* ── Hero ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #003135 0%, #013d42 60%, #024950 100%)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/blake-verdoorn-cssvEZacHvQ-unsplash.jpg" alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,49,53,0.45), rgba(0,49,53,0.85))' }} />
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ maxWidth: '700px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#86efac', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
              <span style={{ width: '20px', height: '2px', background: '#86efac' }} /> Our Story
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, color: 'white', marginBottom: '20px', lineHeight: 1.1 }}>
              Born From a <span style={{ background: 'linear-gradient(135deg, #6ee7b7, #964734)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Love of Pakistan</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: 1.75, maxWidth: '580px' }}>
              PakExplorer was founded in 2018 by Pakistani travel enthusiasts tired of seeing their country underrepresented. We set out to change that — one extraordinary journey at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: 'white', borderBottom: '1px solid #f3f4f6' }}>
        <div className="container section-sm">
          <div id="about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '32px', textAlign: 'center' }}>
            <style>{`@media(min-width:640px){#about-stats{grid-template-columns:repeat(4,1fr)}}`}</style>
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#f0fdf4', border: '1.5px solid #d1fae5', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={20} color="#024950" />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section style={{ background: '#f9fafb' }}>
        <div className="container section">
          <div id="mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '56px', alignItems: 'center' }}>
            <style>{`@media(min-width:1024px){#mission-grid{grid-template-columns:1fr 1fr}}`}</style>

            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div style={{ position: 'relative' }}>
                <img src="/rohit-tandon-9wg5jCEPBsw-unsplash.jpg" alt="Mission" style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 16px 48px rgba(0,0,0,0.14)' }} />
                <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3 }} style={{ position: 'absolute', bottom: '-20px', right: '-12px', background: 'white', padding: '16px 18px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)', border: '1.5px solid #d1fae5', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #024950, #0FA4AF)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={18} color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>Our Mission</div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>Making Pakistan famous for the right reasons</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="section-label">What Drives Us</div>
              <h2 className="section-title">Changing Pakistan's Image, <span className="text-gradient-green">One Journey</span> at a Time</h2>
              <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.75, marginBottom: '16px' }}>
                For too long, Pakistan's extraordinary beauty has been overshadowed by negative narratives. We exist to tell a different story — of warm hospitality, breathtaking landscapes, and ancient civilizations that inspire awe.
              </p>
              <p style={{ color: '#6b7280', lineHeight: 1.75, marginBottom: '32px' }}>
                Every traveler we bring becomes an ambassador — sharing stories of Hunza sunsets, K2 majesty, Lahore's Mughal grandeur, and the warmth of Pakistani people.
              </p>
              <Link to="/destinations" className="btn-primary">Start Your Journey <ArrowRight size={16} /></Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background: 'white' }}>
        <div className="container section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>What We Stand For</div>
            <h2 className="section-title">Our Core <span className="text-gradient-amber">Values</span></h2>
          </motion.div>
          <div className="grid-2">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#d1fae5'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,122,74,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ width: '48px', height: '48px', background: '#f0fdf4', border: '1.5px solid #d1fae5', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <v.icon size={22} color="#024950" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ color: '#6b7280', lineHeight: 1.7, fontSize: '0.9rem' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: '#f9fafb' }}>
        <div className="container section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>The People Behind PakExplorer</div>
            <h2 className="section-title">Meet Our <span className="text-gradient-green">Team</span></h2>
          </motion.div>
          <div className="grid-4">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#d1fae5'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 14px' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', border: '3px solid #d1fae5' }} />
                  <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '18px', height: '18px', background: '#0FA4AF', borderRadius: '50%', border: '2px solid white' }} />
                </div>
                <h3 style={{ fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{member.name}</h3>
                <div style={{ color: '#024950', fontSize: '0.82rem', fontWeight: 600, marginBottom: '10px' }}>{member.role}</div>
                <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'white' }}>
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, #003135 0%, #013d42 50%, #024950 100%)', borderRadius: '24px', overflow: 'hidden', position: 'relative', padding: 'clamp(40px, 6vw, 72px) clamp(32px, 5vw, 64px)', textAlign: 'center' }}
          >
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', background: 'rgba(34,165,95,0.2)', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '240px', height: '240px', background: 'rgba(212,136,26,0.15)', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div style={{ position: 'relative' }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '14px' }}>Ready to Explore with Us?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
                Join 50,000+ travelers who have experienced Pakistan's magic with PakExplorer.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/packages" className="btn-amber" style={{ fontSize: '0.95rem', padding: '13px 28px' }}>View Packages <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn-outline-white" style={{ fontSize: '0.95rem', padding: '13px 28px' }}>Contact Us</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  );
}
