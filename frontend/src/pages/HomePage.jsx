import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { searchProducts } from '../lib/api'
import { useReveal } from '../hooks/useReveal'

// ── Constants ──────────────────────────────────────────────────────────────────
const EXAMPLE_PROMPTS = [
  'Diwali sweets for my parents',
  'Kashmiri dry fruits gift box',
  'Kanjivaram saree for a wedding',
  "Darjeeling tea for my boss",
]

const CATEGORIES = [
  { slug: 'sweets',      label: 'Sweets & Mithai', icon: '🍬', count: '16',  img: '1558961363-fa8fdf82db35' },
  { slug: 'sarees',      label: 'Sarees',           icon: '🥻', count: '12',  img: '1583208770927-29f97ae41ad1' },
  { slug: 'clothing',    label: 'Clothing',          icon: '👘', count: '14',  img: '1583391733981-8498408ee4b6' },
  { slug: 'spices',      label: 'Spices',            icon: '🌶️', count: '13',  img: '1596040033229-a9821ebd058d' },
  { slug: 'handicrafts', label: 'Handicrafts',       icon: '🏺', count: '25',  img: '1594736797933-d0501ba2fe65' },
  { slug: 'dry-fruits',  label: 'Dry Fruits',        icon: '🥜', count: '5',   img: '1631209121750-a9f656d28f25' },
  { slug: 'tea',         label: 'Tea',               icon: '🍵', count: '5',   img: '1556679343-c7306c1976bc' },
  { slug: 'jewellery',   label: 'Jewellery',         icon: '💍', count: '5',   img: '1535632066927-ab7c9ab60908' },
]

const STATS = [
  { value: 500,  suffix: '+',  label: 'Local Markets'       },
  { value: 50,   suffix: '+',  label: 'Countries Delivered' },
  { value: 4.9,  suffix: '★',  label: 'Average Rating'     },
  { value: 10,   suffix: 'k+', label: 'Happy Customers'    },
]

const CONVERSATIONS = [
  {
    query: 'Diwali gift for my mother in London under ₹3,000',
    reply: 'Found 6 mithai hampers from Chandni Chowk and Mumbai — I\'d suggest the Kaju Katli & Mysore Pak box from Sri Mythri Sweets. Ships to UK in 8 days.',
    products: [
      { name: 'Kaju Katli Box', price: '₹680', img: '1558961363-fa8fdf82db35' },
      { name: 'Mysore Pak',     price: '₹420', img: '1606914469633-bd59cf36e82a' },
    ],
  },
  {
    query: 'Authentic Kanjivaram saree for a wedding — budget ₹8,000',
    reply: 'Showing 4 genuine Kanjivaram sarees from Kanchipuram weavers. The gold zari Peacock motif at ₹8,500 is outstanding — slightly over budget but worth it.',
    products: [
      { name: 'Kanjivaram Silk',  price: '₹8,500', img: '1583208770927-29f97ae41ad1' },
      { name: 'Banarasi Tissue',  price: '₹6,200', img: '1551488831-00ddcb6c6bd3' },
    ],
  },
  {
    query: 'Best Darjeeling first flush tea as a corporate gift',
    reply: 'Margaret\'s Hope estate first flush — muscatel notes, gorgeous golden liquor. Comes in a gift-ready wooden box. Classic choice that always impresses.',
    products: [
      { name: 'Darjeeling FTGFOP1', price: '₹680', img: '1556679343-c7306c1976bc' },
      { name: 'Kashmiri Kahwa',      price: '₹450', img: '1548013146-72479768bada' },
    ],
  },
]

// ── Animated counter ───────────────────────────────────────────────────────────
function useCountUp(target, duration = 1200, isFloat = false) {
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  const start = useCallback(() => {
    const startTime = performance.now()
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      const current  = isFloat ? +(eased * target).toFixed(1) : Math.round(eased * target)
      setValue(current)
      if (progress < 1) frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
  }, [target, duration, isFloat])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])
  return [value, start]
}

function StatItem({ stat, isLast }) {
  const isFloat  = !Number.isInteger(stat.value)
  const [count, startCount] = useCountUp(stat.value, 1400, isFloat)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        startCount()
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [startCount])

  return (
    <div ref={ref} style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      padding: '0 var(--space-8)',
      borderRight: isLast ? 'none' : '1px solid var(--border-faint)',
    }}>
      <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {count}{stat.suffix}
      </span>
      <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>{stat.label}</span>
    </div>
  )
}

// ── Category card ──────────────────────────────────────────────────────────────
function CategoryCard({ cat, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => onClick(cat.slug)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '200px', position: 'relative', overflow: 'hidden', cursor: 'pointer',
        borderRadius: 'var(--radius-xl)', background: 'var(--bg-raised)',
        border: `1px solid ${hovered ? 'rgba(249,115,22,0.25)' : 'var(--border-subtle)'}`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(249,115,22,0.08)' : 'none',
        transition: 'all 220ms var(--ease-default)',
      }}
    >
      <img
        src={`https://images.unsplash.com/photo-${cat.img}?w=600&q=80`}
        alt={cat.label} loading="lazy"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: 0.45, transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 400ms var(--ease-smooth)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(4,4,4,0.92) 0%, rgba(4,4,4,0.35) 60%, transparent 100%)',
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#fff', lineHeight: 1 }}>{cat.label}</span>
          <span style={{
            marginLeft: 'auto', color: 'var(--brand-saffron-lt)', fontSize: '16px',
            opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
            transition: 'all 180ms ease',
          }}>→</span>
        </div>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.40)', marginTop: '3px', display: 'block' }}>
          {cat.count} products
        </span>
      </div>
    </div>
  )
}

// ── Conversation preview card ──────────────────────────────────────────────────
function ConvoCard({ convo, delay }) {
  return (
    <div style={{
      background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-2xl)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px',
      animation: `fadeUp 500ms var(--ease-out) ${delay}ms both`,
      transition: 'border-color 200ms ease, box-shadow 200ms ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* User message */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          background: 'rgba(249,115,22,0.10)', border: '1px solid rgba(249,115,22,0.18)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)',
          padding: '10px 14px', fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5,
          maxWidth: '90%',
        }}>
          {convo.query}
        </div>
      </div>

      {/* AI response */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(249,115,22,0.20) 0%, rgba(251,191,36,0.15) 100%)',
          border: '1px solid rgba(249,115,22,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px',
        }}>हा</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {convo.reply}
          </p>
          {/* Mini product chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {convo.products.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--bg-subtle)', border: '1px solid var(--border-faint)',
                borderRadius: 'var(--radius-md)', padding: '6px 10px',
              }}>
                <img
                  src={`https://images.unsplash.com/photo-${p.img}?w=48&q=70`}
                  alt={p.name}
                  style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{p.name}</p>
                  <p style={{ margin: 0, fontSize: '10px', color: 'var(--brand-saffron)', fontWeight: 600 }}>{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── SkeletonCard ───────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-faint)' }}>
      <div className="skeleton" style={{ aspectRatio: '3/4' }} />
      <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="skeleton" style={{ height: '14px', width: '85%', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '12px', width: '60%', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '36px', width: '100%', borderRadius: '8px', marginTop: '8px' }} />
      </div>
    </div>
  )
}

// ── HomePage ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)

  const statsRef    = useReveal(0.15)
  const catsRef     = useReveal(0.10)
  const featuredRef = useReveal(0.08)
  const convoRef    = useReveal(0.10)

  useEffect(() => {
    searchProducts('featured Indian products', null)
      .then(data => setProducts((data.products ?? []).slice(0, 8)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* ══ SECTION 1 — HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Ambient orbs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-180px', left: '-220px', width: '780px', height: '780px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.16) 0%, transparent 60%)', filter: 'blur(90px)' }} />
          <div style={{ position: 'absolute', bottom: '-120px', right: '-160px', width: '680px', height: '680px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.13) 0%, transparent 60%)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', top: '25%', right: '2%', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.09) 0%, transparent 60%)', filter: 'blur(70px)' }} />
          <div style={{ position: 'absolute', top: '10%', left: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 60%)', filter: 'blur(60px)' }} />
        </div>

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 10%, black 0%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 10%, black 0%, transparent 80%)',
        }} />

        {/* Top spotlight beam */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '1px', height: '55%', zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0.08) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '520px', height: '480px', zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(249,115,22,0.10) 0%, transparent 70%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2, flex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          paddingTop: 'calc(var(--nav-height) + 72px)', paddingBottom: '80px',
          paddingLeft: '24px', paddingRight: '24px',
          maxWidth: '800px', margin: '0 auto', width: '100%',
        }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.20)',
            borderRadius: '999px', padding: '5px 16px',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em',
            color: 'var(--brand-saffron-lt)', textTransform: 'uppercase',
            animation: 'fadeUp 500ms var(--ease-out) 0ms both',
          }}>
            ✦ AI-Powered · 500+ Markets · 40+ Countries
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(46px, 7.5vw, 82px)', fontWeight: 800,
            lineHeight: 1.02, letterSpacing: '-0.04em',
            color: 'var(--text-primary)', margin: '24px 0 0',
            animation: 'fadeUp 500ms var(--ease-out) 80ms both',
          }}>
            Shop from India<br />
            <span className="gradient-text">like you never left.</span>
          </h1>

          {/* Subtext */}
          <p style={{
            maxWidth: '500px', fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 400,
            marginTop: '22px', animation: 'fadeUp 500ms var(--ease-out) 160ms both',
          }}>
            Describe what you want in plain English. Our AI searches real Indian markets —
            Chandni Chowk to Zaveri Bazaar — and ships authentic products to your door.
          </p>

          {/* Primary CTA */}
          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', animation: 'fadeUp 500ms var(--ease-out) 240ms both' }}>
            <Link
              to="/chat"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'var(--brand-saffron)',
                color: '#fff', textDecoration: 'none',
                borderRadius: '999px', padding: '15px 32px',
                fontSize: '16px', fontWeight: 600, letterSpacing: '-0.01em',
                boxShadow: '0 0 0 0 rgba(249,115,22,0.4)',
                transition: 'transform 150ms var(--ease-spring), box-shadow 200ms ease, background 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.35)'; e.currentTarget.style.background = 'var(--brand-saffron-dk)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 0 0 rgba(249,115,22,0)'; e.currentTarget.style.background = 'var(--brand-saffron)' }}
            >
              Start chatting with haat
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>

            {/* Example prompts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '540px' }}>
              {EXAMPLE_PROMPTS.map(p => (
                <button
                  key={p}
                  onClick={() => navigate(`/chat?q=${encodeURIComponent(p)}`)}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)',
                    borderRadius: '999px', padding: '6px 14px', fontSize: '12px',
                    color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 140ms ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,0.07)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.22)'; e.currentTarget.style.color = 'var(--brand-saffron-lt)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll caret */}
        <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, opacity: 0.3, animation: 'heroBounce 2s ease-in-out infinite' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      {/* ══ SECTION 2 — STATS ═════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)', padding: 'var(--space-6) 0' }}>
        <div ref={statsRef} style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className="reveal-child" style={{ '--stagger': i }}>
              <StatItem stat={stat} isLast={i === STATS.length - 1} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 3 — AI CONVERSATION PREVIEW ══════════════════════════════ */}
      <section style={{ padding: 'var(--space-20) 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 var(--space-6)' }}>

          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.10em', color: 'var(--brand-saffron)', marginBottom: 'var(--space-3)', textTransform: 'uppercase' }}>
              SEE IT IN ACTION
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>
              Just tell it what you need.
            </h2>
            <p style={{ marginTop: '10px', fontSize: '15px', color: 'var(--text-tertiary)', maxWidth: '380px', margin: '10px auto 0' }}>
              Natural language. Indian context. Real results.
            </p>
          </div>

          <div ref={convoRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {CONVERSATIONS.map((c, i) => (
              <div key={i} className="reveal-child">
                <ConvoCard convo={c} delay={i * 80} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link
              to="/chat"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '14px', fontWeight: 500, color: 'var(--brand-saffron)',
                textDecoration: 'none', transition: 'gap 140ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >
              Try it yourself →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — CATEGORIES ════════════════════════════════════════════ */}
      <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-raised)', borderTop: '1px solid var(--border-faint)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.10em', color: 'var(--brand-saffron)', marginBottom: '8px', textTransform: 'uppercase' }}>BROWSE</p>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>Everything India makes.</h2>
            </div>
            <Link to="/search" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 140ms ease' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
            >
              Browse all →
            </Link>
          </div>
          <div ref={catsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {CATEGORIES.map((cat, i) => (
              <div key={cat.slug} className="reveal-child">
                <CategoryCard cat={cat} onClick={slug => navigate(`/search?category=${slug}`)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — FEATURED PRODUCTS ════════════════════════════════════ */}
      <section style={{ padding: 'var(--space-16) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.10em', color: 'var(--brand-saffron)', marginBottom: '8px', textTransform: 'uppercase' }}>TRENDING NOW</p>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>Handpicked by AI.</h2>
            </div>
            <Link to="/search?q=featured" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 140ms ease' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
            >
              View all →
            </Link>
          </div>
          <div ref={featuredRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
            {loading
              ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
              : products.map((p, i) => (
                  <div key={p.id} className="reveal-child">
                    <ProductCard product={p} index={i} />
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — HOW IT WORKS ══════════════════════════════════════════ */}
      <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-raised)', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 var(--space-6)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.10em', color: 'var(--brand-saffron)', marginBottom: 'var(--space-3)', textTransform: 'uppercase' }}>HOW IT WORKS</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>An AI that knows India.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--border-faint)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            {[
              {
                num: '01',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.65)" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="2" width="6" height="11" rx="3"/>
                    <path d="M5 10a7 7 0 0 0 14 0"/>
                    <line x1="12" y1="17" x2="12" y2="22"/>
                    <line x1="8" y1="22" x2="16" y2="22"/>
                  </svg>
                ),
                title: 'You speak or type',
                body: "Say 'Diwali gifts for Amma under ₹3000' in English, Hindi, or Hinglish. Our AI understands context, occasion, and budget.",
              },
              {
                num: '02',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.65)" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                ),
                title: 'AI searches live markets',
                body: 'Agents visit real Indian e-commerce sites in real-time. Prices are live. Stock is live. We rank 100+ results for you.',
              },
              {
                num: '03',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.65)" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.29 7 12 12 20.71 7"/>
                    <line x1="12" y1="22" x2="12" y2="12"/>
                  </svg>
                ),
                title: 'Delivered to your door',
                body: 'From a halwai in Chandni Chowk to your doorstep in New York — 7–14 days, tracked, customs handled.',
              },
            ].map((step, i) => (
              <div key={step.num} style={{ background: 'var(--bg-raised)', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em',
                    background: 'rgba(249,115,22,0.10)', border: '1px solid rgba(249,115,22,0.18)',
                    borderRadius: '999px', padding: '3px 9px', color: 'var(--brand-saffron)',
                  }}>{step.num}</span>
                  <span style={{ display: 'flex', alignItems: 'center' }}>{step.icon}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — CLOSING CTA ═══════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'var(--space-24) var(--space-6)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            <span className="gradient-text">Discover your India.</span>
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
            Start with a question. No account needed.
          </p>
          <Link
            to="/chat"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'var(--brand-saffron)', color: '#fff', textDecoration: 'none',
              borderRadius: '999px', padding: '15px 32px',
              fontSize: '16px', fontWeight: 600, letterSpacing: '-0.01em',
              transition: 'transform 150ms var(--ease-spring), box-shadow 200ms ease, background 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.35)'; e.currentTarget.style.background = 'var(--brand-saffron-dk)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--brand-saffron)' }}
          >
            Open haat AI
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes heroBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .stat-divider { border-right: none !important; border-bottom: 1px solid var(--border-faint); }
        }
      `}</style>
    </>
  )
}
