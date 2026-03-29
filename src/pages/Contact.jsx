import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

const contactInfo = [
  { icon: MapPin, label: 'Our Office', value: 'DHA Phase 8, Lahore, Pakistan', color: '#024950' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+92 310 7679332', color: '#024950' },
  { icon: Mail, label: 'Email', value: 'shayanumair.dev@gmail.com', color: '#024950' },
  { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9am – 8pm PKT', color: '#964734' },
];

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  background: '#f9fafb',
  border: '1.5px solid #e5e7eb',
  borderRadius: '10px',
  color: '#111827',
  fontSize: '0.9rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1500);
  };

  const handleFocus = e => { e.target.style.borderColor = '#024950'; e.target.style.boxShadow = '0 0 0 3px rgba(26,122,74,0.1)'; };
  const handleBlur = e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; };

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #003135 0%, #024950 60%, #024950 100%)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/dr-muhammad-amer-TXJEdxs5Hh4-unsplash.jpg" alt="Contact" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,49,53,0.4), rgba(0,49,53,0.85))' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#86efac', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ width: '18px', height: '2px', background: '#86efac' }} />Get in Touch<span style={{ width: '18px', height: '2px', background: '#86efac' }} />
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
              Plan Your <span style={{ background: 'linear-gradient(135deg, #964734, #b05742)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dream Trip</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Have questions about visas, itineraries, or pricing? Our Pakistan travel specialists are ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section style={{ background: '#f9fafb' }}>
        <div className="container section">
          <div id="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
            <style>{`@media(min-width:1024px){#contact-grid{grid-template-columns:2fr 3fr}}`}</style>

            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
              <h2 className="section-title" style={{ marginBottom: '8px' }}>We're Here to <span className="text-gradient-green">Help</span></h2>
              <p style={{ color: '#6b7280', marginBottom: '28px', lineHeight: 1.7, fontSize: '0.9rem' }}>
                Whether planning your first Pakistan trip or you're a seasoned explorer, our team provides personalized guidance every step of the way.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {contactInfo.map((info, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    style={{ display: 'flex', gap: '14px', padding: '16px', background: 'white', borderRadius: '14px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', alignItems: 'center', transition: 'all 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#d1fae5'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,122,74,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
                  >
                    <div style={{ width: '42px', height: '42px', background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <info.icon size={18} color={info.color} />
                    </div>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{info.label}</div>
                      <div style={{ color: '#111827', fontWeight: 500, fontSize: '0.88rem' }}>{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108870.5984856636!2d74.27432675!3d31.48003585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919051a8e2ffd91%3A0xe47fd6e8f41069a0!2sDHA%20Phase%208%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%" height="200" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy" title="PakExplorer Office"
                />
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/923107679332" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: '14px', background: 'linear-gradient(135deg, #128c7e, #25d366)', textDecoration: 'none', transition: 'opacity 0.2s', boxShadow: '0 4px 16px rgba(18,140,126,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <MessageSquare size={20} color="white" />
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>Chat on WhatsApp</div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem' }}>Typically replies within 1 hour</div>
                </div>
              </a>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: 'white', borderRadius: '20px', padding: '64px 40px', textAlign: 'center', border: '1.5px solid #d1fae5', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                  <div style={{ width: '72px', height: '72px', background: '#f0fdf4', border: '2px solid #d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <CheckCircle size={32} color="#024950" />
                  </div>
                  <h3 className="font-display" style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '14px' }}>Message Sent!</h3>
                  <p style={{ color: '#6b7280', marginBottom: '6px' }}>Thank you, <strong>{form.name}</strong>.</p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '32px' }}>Our travel specialist will reach out to <span style={{ color: '#024950' }}>{form.email}</span> within 2–4 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="btn-primary">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '20px', padding: 'clamp(24px, 5vw, 40px)', border: '1.5px solid #e5e7eb', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                  <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>Send Us a Message</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '28px' }}>Fill out the form and we'll get back to you within a few hours.</p>

                  <div id="form-row1" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '16px' }}>
                    <style>{`@media(min-width:480px){#form-row1{grid-template-columns:1fr 1fr}} #form-row2{grid-template-columns:1fr} @media(min-width:480px){#form-row2{grid-template-columns:1fr 1fr}}`}</style>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Full Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                  </div>

                  <div id="form-row2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Phone / WhatsApp</label>
                      <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+1 234 567 8900" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Subject *</label>
                      <select required value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur}>
                        <option value="">Select a topic...</option>
                        <option value="booking">Package Booking</option>
                        <option value="custom">Custom Itinerary</option>
                        <option value="visa">Visa Assistance</option>
                        <option value="groups">Group Tours</option>
                        <option value="other">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your travel plans, group size, dates, and any special requirements..." style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        Sending...
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Send size={16} />Send Message</span>
                    )}
                  </button>
                  <p style={{ color: '#9ca3af', fontSize: '0.78rem', textAlign: 'center', marginTop: '12px' }}>We typically respond within 2–4 hours during business hours.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
