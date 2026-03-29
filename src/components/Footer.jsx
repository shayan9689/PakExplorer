import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2, Link2, MessageCircle, PlayCircle, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050c18] border-t border-[#1e2d4a] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">Pak<span className="gradient-text-gold">Explorer</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Pakistan's premier travel platform, connecting adventurers with the country's most extraordinary destinations since 2018.
            </p>
            <div className="flex gap-3">
              {[Share2, Link2, MessageCircle, PlayCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-800/40 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-5">Top Destinations</h4>
            <ul className="space-y-3">
              {['Hunza Valley', 'Skardu', 'Swat Valley', 'Naran Kaghan', 'Fairy Meadows', 'Lahore'].map(d => (
                <li key={d}>
                  <Link to="/destinations" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Tour Packages', path: '/packages' },
                { label: 'Travel Blog', path: '/blog' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
                { label: 'Terms & Conditions', path: '/contact' },
                { label: 'Privacy Policy', path: '/contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-emerald-400" />
                </div>
                <span className="text-gray-400 text-sm">DHA Phase 8, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-emerald-400" />
                </div>
                <a href="tel:+923107679332" className="text-gray-400 hover:text-white text-sm transition-colors">+92 310 7679332</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-emerald-400" />
                </div>
                <a href="mailto:shayanumair.dev@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors">shayanumair.dev@gmail.com</a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-white text-sm font-medium mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="input-dark text-sm py-2.5 flex-1" />
                <button className="btn-primary py-2.5 px-4 text-sm">
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e2d4a] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 PakExplorer. Made with ❤️ for Pakistan's beauty.
          </p>
          <div className="flex gap-6">
            <span className="badge badge-emerald">Trusted Platform</span>
            <span className="badge badge-gold">50K+ Travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
