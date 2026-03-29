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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  const contactInfo = [
    { icon: MapPin, label: 'Our Office', value: 'DHA Phase 8, Lahore, Pakistan' },
    { icon: Phone, label: 'Phone / WhatsApp', value: '+92 310 7679332' },
    { icon: Mail, label: 'Email', value: 'shayanumair.dev@gmail.com' },
    { icon: Clock, label: 'Working Hours', value: 'Mon-Sat: 9am – 8pm PKT' },
  ];

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80" alt="Contact" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,14,28,0.5), rgba(8,14,28,1))' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label justify-center">Get in Touch</div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-5">
              Plan Your <span className="gradient-text-gold">Dream Trip</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Have questions about visas, itineraries, or pricing? Our Pakistan travel specialists are ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="lg:col-span-2 space-y-5">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-3">We're Here to Help</h2>
              <p className="text-gray-400 leading-relaxed">Whether you're planning your first Pakistan trip or you're a seasoned explorer, our team provides personalized guidance every step of the way.</p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 p-4 glass-light rounded-2xl">
                  <div className="w-10 h-10 bg-emerald-900/40 border border-emerald-700/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-0.5">{info.label}</div>
                    <div className="text-white font-medium text-sm">{info.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map embed */}
            <div className="glass rounded-2xl overflow-hidden" style={{ height: '250px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108870.5984856636!2d74.27432675!3d31.48003585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919051a8e2ffd91%3A0xe47fd6e8f41069a0!2sDHA%20Phase%208%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="250"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                title="PakExplorer Office Location"
              />
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/923107679332" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #128c7e, #25d366)' }}>
              <MessageSquare size={22} className="text-white" />
              <div>
                <div className="text-white font-bold text-sm">Chat on WhatsApp</div>
                <div className="text-green-100 text-xs">Typically replies within 1 hour</div>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="lg:col-span-3">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center" style={{ border: '1px solid rgba(10,102,64,0.4)' }}>
                <div className="w-20 h-20 bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle size={36} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-gray-400 mb-2">Thank you for contacting us, <span className="text-white font-semibold">{form.name}</span>.</p>
                <p className="text-gray-400 text-sm mb-8">Our travel specialist will reach out to <span className="text-emerald-400">{form.email}</span> within 2–4 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="btn-primary">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5" style={{ border: '1px solid rgba(30,45,74,0.7)' }}>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Send Us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Full Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Smith" className="input-dark" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Email *</label>
                    <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" className="input-dark" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Phone / WhatsApp</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+1 234 567 8900" className="input-dark" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Subject *</label>
                    <select required value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="input-dark">
                      <option value="">Select a topic...</option>
                      <option value="booking">Package Booking</option>
                      <option value="custom">Custom Itinerary</option>
                      <option value="visa">Visa Assistance</option>
                      <option value="groups">Group Tours</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your travel plans, group size, dates, and any special requirements..." className="input-dark resize-none" />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base font-bold disabled:opacity-60">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2"><Send size={16} />Send Message</span>
                  )}
                </button>

                <p className="text-gray-500 text-xs text-center">We typically respond within 2–4 hours during business hours.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
