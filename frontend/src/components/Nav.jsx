import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const NAV_LINKS = [
  { label: 'Markets',  path: '/markets' },
  { label: 'About',    path: '/about' },
]

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const handler = () => setY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return y
}

export default function Nav() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const location   = useLocation()
  const navigate   = useNavigate()
  const scrollY    = useScrollY()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery]           = useState('')
  const [avatarOpen, setAvatarOpen] = useState(false)
  const searchRef = useRef(null)
  const avatarRef = useRef(null)

  const scrolled = scrollY > 8

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  // Close search on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setAvatarOpen(false) } }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Close avatar dropdown on outside click
  useEffect(() => {
    if (!avatarOpen) return
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [avatarOpen])

  const dropItemStyle = {
    display: 'block',
    width: '100%',
    padding: '9px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 400,
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background 0.12s ease',
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    setSearchOpen(false)
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          background: scrolled
            ? 'rgba(8,8,8,0.88)'
            : 'rgba(8,8,8,0.60)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        {/* ── LEFT: Wordmark ─────────────────────────── */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          {/* Geometric mark — 2×2 grid, descending opacity */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <rect x="0"  y="0"  width="10" height="10" rx="2" fill="rgba(255,255,255,1)"    />
            <rect x="12" y="0"  width="10" height="10" rx="2" fill="rgba(255,255,255,0.55)" />
            <rect x="0"  y="12" width="10" height="10" rx="2" fill="rgba(255,255,255,0.35)" />
            <rect x="12" y="12" width="10" height="10" rx="2" fill="rgba(255,255,255,0.18)" />
          </svg>
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            haat.
          </span>
        </Link>

        {/* ── CENTER: Nav links (desktop only) ─────── */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '4px',
          }}
          className="nav-center-links"
        >
          {NAV_LINKS.map(({ label, path }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                  transition: 'color 0.15s ease, background 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* ── RIGHT: Icons + CTA ───────────────────── */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Cart icon */}
          <Link
            to="/cart"
            data-cart-icon="true"
            aria-label={`Cart (${count} items)`}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {count > 0 && (
              <span
                data-cart-badge="true"
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--brand-saffron)',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  border: '1.5px solid var(--bg-base)',
                  transformOrigin: 'center',
                }}
              >
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* Chat CTA — desktop only */}
          <Link
            to="/chat"
            className="nav-cta"
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              background: location.pathname === '/chat' ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.10)',
              border: '1px solid rgba(249,115,22,0.25)',
              color: 'var(--brand-saffron)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,0.20)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.40)' }}
            onMouseLeave={e => { e.currentTarget.style.background = location.pathname === '/chat' ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.10)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.25)' }}
          >
            ✦ Chat
          </Link>

          {/* Auth controls — desktop only */}
          {user ? (
            /* ── Avatar + dropdown ── */
            <div ref={avatarRef} style={{ position: 'relative' }} className="nav-cta">
              <button
                onClick={() => setAvatarOpen(o => !o)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 10px 5px 5px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: avatarOpen ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Initials avatar */}
                <span style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--brand-saffron) 0%, var(--brand-gold) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {(user.name ?? user.email ?? '?')[0].toUpperCase()}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name?.split(' ')[0] ?? user.email}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: avatarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {/* Dropdown */}
              {avatarOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  width: '200px',
                  background: 'rgba(18,18,18,0.98)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '12px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                  animation: 'fadeUp 150ms ease both',
                }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{user.name ?? 'You'}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                  </div>
                  <div style={{ padding: '6px' }}>
                    <button
                      onClick={() => { setAvatarOpen(false); navigate('/chat') }}
                      style={dropItemStyle}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      💬  Chat with haat
                    </button>
                    <button
                      onClick={() => { setAvatarOpen(false); navigate('/onboarding') }}
                      style={dropItemStyle}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      ✦  Preferences
                    </button>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                    <button
                      onClick={() => { logout(); setAvatarOpen(false) }}
                      style={{ ...dropItemStyle, color: 'rgba(239,68,68,0.85)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Login / Sign up ── */
            <>
              <Link
                to="/login"
                className="nav-cta"
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="nav-cta"
                style={{
                  padding: '7px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: 'var(--brand-saffron)',
                  color: '#fff',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Sign up
              </Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="nav-hamburger"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'currentColor',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'currentColor',
                transition: 'opacity 0.25s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'currentColor',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────── */}
      <div
        className="nav-mobile-menu"
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'rgba(8,8,8,0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: menuOpen ? '16px 24px 24px' : '0 24px',
          maxHeight: menuOpen ? '380px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, padding 0.3s ease',
          display: 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link
            to="/chat"
            style={{
              padding: '12px 8px', fontSize: '16px', fontWeight: 600,
              color: 'var(--brand-saffron)', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            ✦ Chat with haat
          </Link>
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              style={{
                padding: '12px 8px', fontSize: '16px', fontWeight: 500,
                color: location.pathname === path ? 'var(--brand-saffron)' : 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <button
                onClick={() => { navigate('/chat'); setMenuOpen(false) }}
                style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, background: 'var(--brand-saffron)', color: '#fff', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'center' }}
              >
                💬 Chat with haat
              </button>
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                style={{ marginTop: '8px', padding: '12px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 500, background: 'rgba(239,68,68,0.12)', color: 'rgba(239,68,68,0.85)', border: '1px solid rgba(239,68,68,0.20)', cursor: 'pointer', width: '100%', textAlign: 'center' }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 500, background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', textDecoration: 'none', textAlign: 'center', display: 'block', border: '1px solid rgba(255,255,255,0.10)' }}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                style={{ marginTop: '8px', padding: '12px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, background: 'var(--brand-saffron)', color: '#fff', textDecoration: 'none', textAlign: 'center', display: 'block' }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Search overlay ───────────────────────────── */}
      {searchOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              margin: '0 16px',
              background: 'rgba(20,20,20,0.98)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search Indian markets… try 'silk saree for Diwali'"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: 'var(--text-primary)',
                  caretColor: 'var(--brand-saffron)',
                }}
              />
              <kbd
                style={{
                  padding: '3px 7px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
                onClick={() => setSearchOpen(false)}
              >
                ESC
              </kbd>
            </form>
            <div style={{ padding: '8px 20px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                Try: "Kanjivaram saree", "Diwali sweets under ₹500", "Kashmiri handicrafts"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Responsive styles ────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-center-links { display: none !important; }
          .nav-cta          { display: none !important; }
          .nav-hamburger    { display: flex !important; }
          .nav-mobile-menu  { display: block !important; }
        }
      `}</style>
    </>
  )
}
