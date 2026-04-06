import { Link } from 'react-router-dom';
import GuardedLink from './GuardedLink';
import { MapPin, Phone, Mail, ArrowRight, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#003135', color: 'white' }}>
      <div style={{ paddingTop: '40px', paddingBottom: '24px', paddingLeft: 'clamp(16px, 4vw, 40px)', paddingRight: 'clamp(16px, 4vw, 40px)' }}>

        {/* 4-col: Brand | Destinations | Quick Links | Contact */}
        <div className="footer-grid" style={{ marginBottom: '20px' }}>

          {/* Col 1: Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg,#024950,#0FA4AF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={14} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                Pak<span style={{ background: 'linear-gradient(135deg,#964734,#b05742)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Explorer</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.78rem', lineHeight: 1.65, marginBottom: '12px', maxWidth: '200px' }}>
              Pakistan's premier travel platform since 2018.
            </p>
            <div style={{ display: 'flex', gap: '5px' }}>
              {[Globe, MessageCircle, MapPin].map((Icon, i) => (
                <a key={i} href="#" style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Destinations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Hunza Valley','Skardu','Swat Valley','Naran Kaghan','Fairy Meadows','Lahore'].map(d => (
                <GuardedLink key={d} to="/destinations" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', transition: 'color 0.18s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0FA4AF'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}
                >
                  <ArrowRight size={10} style={{ flexShrink: 0 }} />{d}
                </GuardedLink>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[{label:'Tour Packages',path:'/packages'},{label:'Travel Blog',path:'/blog'},{label:'About Us',path:'/about'},{label:'Contact',path:'/contact'},{label:'Privacy Policy',path:'/contact'}].map(item => (
                <GuardedLink key={item.label} to={item.path} style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', transition: 'color 0.18s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0FA4AF'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}
                >
                  <ArrowRight size={10} style={{ flexShrink: 0 }} />{item.label}
                </GuardedLink>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {[
                { Icon: MapPin, text: 'DHA Phase 8, Lahore, Pakistan' },
                { Icon: Phone, text: '+92 310 7679332' },
                { Icon: Mail, text: 'shayanumair.dev@gmail.com' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                  <Icon size={11} color="#0FA4AF" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.78rem', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.72rem' }}>© 2024 PakExplorer. Made with ❤️ for Pakistan.</p>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ padding: '2px 9px', background: 'rgba(26,122,74,0.18)', border: '1px solid rgba(26,122,74,0.25)', borderRadius: '100px', fontSize: '0.68rem', color: '#0FA4AF', fontWeight: 600 }}>Trusted Platform</span>
            <span style={{ padding: '2px 9px', background: 'rgba(212,136,26,0.12)', border: '1px solid rgba(212,136,26,0.25)', borderRadius: '100px', fontSize: '0.68rem', color: '#b05742', fontWeight: 600 }}>50K+ Travelers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
