import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const SHOP_LINKS = [
  ['All Products',      '/search'],
  ['Sweets & Mithais',  '/search?category=sweets'],
  ['Clothing',          '/search?category=clothing'],
  ['Sarees',            '/search?category=sarees'],
  ['Spices & Masalas',  '/search?category=spices'],
  ['Handicrafts',       '/search?category=handicrafts'],
  ['Gift Collections',  '/search?q=gift'],
  ['Festival Specials', '/search?q=festival'],
]

const COMPANY_LINKS = [
  ['About haat',  '/about'],
  ['Our Story',   '/about#timeline'],
  ['Markets',     '/markets'],
  ['Chat with haat', '/chat'],
]

const LEGAL_LINKS = [
  ['Privacy Policy', '/privacy'],
  ['Terms of Use',   '/terms'],
  ['Contact Us',     'mailto:hello@haat.in'],
]

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}
function TwitterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function SocialBtn({ icon, href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: 'var(--bg-overlay)', border: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-secondary)', textDecoration: 'none', flexShrink: 0,
        transition: 'border-color 150ms ease, color 150ms ease, background 150ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-default)'
        e.currentTarget.style.color = 'var(--text-primary)'
        e.currentTarget.style.background = 'var(--bg-subtle)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.color = 'var(--text-secondary)'
        e.currentTarget.style.background = 'var(--bg-overlay)'
      }}
    >
      {icon}
    </a>
  )
}

function FooterLink({ to, children }) {
  const isExternal = to.startsWith('http') || to.startsWith('mailto:')
  const sharedStyle = { color: 'var(--text-tertiary)', fontSize: '14px', lineHeight: 2.2, display: 'block', transition: 'color 150ms ease', textDecoration: 'none' }
  const handlers = {
    onMouseEnter: e => { e.currentTarget.style.color = 'var(--text-secondary)' },
    onMouseLeave: e => { e.currentTarget.style.color = 'var(--text-tertiary)' },
  }
  if (isExternal) {
    return <a href={to} style={sharedStyle} {...handlers}>{children}</a>
  }
  return <Link to={to} style={sharedStyle} {...handlers}>{children}</Link>
}

function PoweredPill({ label }) {
  return (
    <span
      style={{
        background: 'var(--bg-overlay)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-full)', padding: '4px 12px',
        fontSize: '12px', color: 'var(--text-tertiary)',
        cursor: 'pointer', transition: 'color 150ms ease, border-color 150ms ease',
        userSelect: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
    >
      {label}
    </span>
  )
}

export default function Footer() {
  const revealRef = useReveal(0.05)

  return (
    <footer style={{
      background: 'var(--bg-raised)',
      borderTop: '1px solid var(--border-faint)',
      paddingTop: 'var(--space-16)',
    }}>
      <div
        ref={revealRef}
        style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '0 var(--space-6)' }}
      >
        {/* ── Upper 4-col grid ───────── */}
        <div className="footer-grid reveal-child" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-10)',
          paddingBottom: 'var(--space-12)',
        }}>
          {/* Brand col */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>
                haat.
              </span>
            </Link>
            <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', maxWidth: '220px', lineHeight: 1.65, margin: '0 0 var(--space-5)' }}>
              Connecting the Indian diaspora to authentic local markets.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <SocialBtn icon={<InstagramIcon />} href="https://instagram.com"  label="Instagram" />
              <SocialBtn icon={<TwitterIcon />}   href="https://twitter.com"    label="Twitter/X" />
              <SocialBtn icon={<YouTubeIcon />}   href="https://youtube.com"    label="YouTube" />
              <SocialBtn icon={<LinkedInIcon />}  href="https://linkedin.com"   label="LinkedIn" />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 var(--space-3)' }}>
              Shop
            </h4>
            {SHOP_LINKS.map(([label, to]) => <FooterLink key={label} to={to}>{label}</FooterLink>)}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 var(--space-3)' }}>
              Company
            </h4>
            {COMPANY_LINKS.map(([label, to]) => <FooterLink key={label} to={to}>{label}</FooterLink>)}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 var(--space-3)' }}>
              Legal
            </h4>
            {LEGAL_LINKS.map(([label, to]) => <FooterLink key={label} to={to}>{label}</FooterLink>)}
          </div>
        </div>

        {/* ── Lower bar ──────────────── */}
        <div className="reveal-child" style={{
          borderTop: '1px solid var(--border-faint)',
          paddingTop: 'var(--space-6)',
          paddingBottom: 'var(--space-8)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 'var(--space-4)',
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            © 2026 haat. Built for the Indian diaspora worldwide.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginRight: '4px' }}>Powered by</span>
            <PoweredPill label="TinyFish" />
            <PoweredPill label="ElevenLabs" />
            <PoweredPill label="Claude AI" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
