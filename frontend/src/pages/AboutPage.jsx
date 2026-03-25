import { Link } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '100+',  label: 'Curated Products',  sub: 'across 10 categories'    },
  { value: '40+',   label: 'Countries Served',   sub: 'and growing every month' },
  { value: '50+',   label: 'Artisan Sellers',    sub: 'verified and vetted'     },
  { value: '4.8★',  label: 'Average Rating',     sub: 'from 2,000+ orders'      },
]

const TEAM = [
  {
    name:  'Arjun Sharma',
    role:  'Co-founder & CEO',
    bio:   'Grew up between Delhi and London. Spent a decade in fintech before starting haat to solve a problem he lived every day.',
    avatar:'1507003211169',   // Unsplash photo ID
  },
  {
    name:  'Priya Nair',
    role:  'Co-founder & CPO',
    bio:   "Former product lead at a major Indian e-commerce company. Built haat's AI agent architecture from the ground up.",
    avatar:'1494790108377',
  },
  {
    name:  'Rohan Mehta',
    role:  'Head of Seller Partnerships',
    bio:   'Spent five years travelling to artisan clusters in Rajasthan, Bengal, and Tamil Nadu building trusted relationships.',
    avatar:'1488161628813',
  },
  {
    name:  'Divya Krishnan',
    role:  'Head of Engineering',
    bio:   'Previously at a top AI startup. Leads the team building the LLM-powered shopping agent that makes haat unique.',
    avatar:'1438761681033',
  },
]

const VALUES = [
  {
    icon:  '✦',
    title: 'Authenticity first',
    desc:  'Every product is sourced from verified sellers. No mass-market replicas, no grey imports — only the real thing.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="rgba(249,115,22,0.85)" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    title: 'Support artisans',
    desc:  'We prioritise small-batch makers and traditional craft clusters. When you buy from haat, you buy directly from the hands that made it.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="rgba(249,115,22,0.85)" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    title: 'AI that actually works',
    desc:  'Our AI understands cultural context — the difference between Kanjivaram and Banarasi silk, Kashmiri walnut and regular walnut.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="rgba(249,115,22,0.85)" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
      </svg>
    ),
    title: 'For the diaspora',
    desc:  'We are diaspora ourselves. We built this for the moment you crave home and need someone who understands exactly what that means.',
  },
]

const TIMELINE = [
  { year: '2022', title: 'The idea', desc: 'Arjun ships a box of Diwali sweets to his mother in London. The package is delayed, damaged, and taxed at 40%. The frustration becomes the business plan.' },
  { year: '2023', title: 'First sellers', desc: 'Priya joins and the team spends six months on the ground in Jaipur, Varanasi, and Kolkata, signing 20 artisan partners and learning the supply chain.' },
  { year: '2024', title: 'AI agent launch', desc: "We launch haat's AI shopping assistant — the first product in the space that lets you describe what you want in natural language and get curated results." },
  { year: '2025', title: 'Going global', desc: 'Now serving 40+ countries with 100+ products. The vision is simple: every Indian abroad should be able to get anything from home, any time.' },
]

// ── Components ────────────────────────────────────────────────────────────────
function StatCard({ value, label, sub }) {
  return (
    <div style={{
      background:   'var(--bg-raised)',
      border:       '1px solid var(--border-faint)',
      borderRadius: 'var(--radius-xl)',
      padding:      'var(--space-6)',
      textAlign:    'center',
    }}>
      <div style={{
        fontSize:    'clamp(32px, 5vw, 48px)',
        fontWeight:   800,
        letterSpacing:'-1.5px',
        color:       'var(--brand-saffron)',
        lineHeight:   1,
        marginBottom: '8px',
      }}>
        {value}
      </div>
      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
        {sub}
      </div>
    </div>
  )
}

function TeamCard({ person }) {
  return (
    <div style={{
      background:   'var(--bg-raised)',
      border:       '1px solid var(--border-faint)',
      borderRadius: 'var(--radius-xl)',
      padding:      'var(--space-5)',
      display:      'flex',
      flexDirection:'column',
      gap:          'var(--space-3)',
    }}>
      <img
        src={`https://images.unsplash.com/photo-${person.avatar}?w=200&h=200&fit=crop&q=80`}
        alt={person.name}
        style={{
          width:        '64px',
          height:       '64px',
          borderRadius: '50%',
          objectFit:    'cover',
          border:       '2px solid var(--border-subtle)',
        }}
      />
      <div>
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{person.name}</div>
        <div style={{ fontSize: '12px', color: 'var(--brand-saffron)', fontWeight: 500 }}>{person.role}</div>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{person.bio}</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <style>{`
        @media (max-width: 640px) {
          .about-stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .about-team-grid   { grid-template-columns: 1fr !important; }
          .about-values-grid { grid-template-columns: 1fr !important; }
          .about-timeline    { grid-template-columns: 1fr !important; }
          .about-hero-h1     { font-size: clamp(34px, 10vw, 54px) !important; }
        }
        @media (max-width: 900px) {
          .about-team-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-timeline    { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────── */}
      <section style={{
        maxWidth:    '780px',
        margin:      '0 auto',
        padding:     'var(--space-16) var(--space-6) var(--space-12)',
        textAlign:   'center',
      }}>
        <div style={{
          display:     'inline-block',
          fontSize:    'var(--text-xs)',
          fontWeight:   600,
          letterSpacing:'0.1em',
          textTransform:'uppercase',
          color:       'var(--brand-gold-lt)',
          border:      '1px solid rgba(245,158,11,0.3)',
          borderRadius:'var(--radius-full)',
          padding:     '4px 16px',
          marginBottom:'var(--space-5)',
        }}>
          Our Story
        </div>

        <h1
          className="about-hero-h1"
          style={{
            fontSize:    'clamp(40px, 7vw, 64px)',
            fontWeight:   800,
            letterSpacing:'-2px',
            lineHeight:   1.05,
            marginBottom: 'var(--space-6)',
          }}
        >
          Bringing{' '}
          <span className="gradient-text">India</span>
          {' '}to wherever you call home
        </h1>

        <p style={{
          fontSize:    '18px',
          color:       'var(--text-secondary)',
          lineHeight:   1.7,
          maxWidth:    '620px',
          margin:      '0 auto',
        }}>
          haat is an AI-powered marketplace for the Indian diaspora — making it effortless to discover, buy, and receive authentic Indian products anywhere in the world.
        </p>
      </section>

      {/* ── Origin Story ─────────────────────────── */}
      <section style={{
        maxWidth:    'var(--container-lg)',
        margin:      '0 auto',
        padding:     '0 var(--space-6) var(--space-16)',
      }}>
        <div style={{
          background:   'var(--bg-raised)',
          border:       '1px solid var(--border-faint)',
          borderRadius: 'var(--radius-2xl)',
          padding:      'clamp(24px, 5vw, 56px)',
          display:      'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:          'var(--space-10)',
          alignItems:   'center',
        }}
          className="about-origin"
        >
          <style>{`.about-origin { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
          <div>
            <div style={{
              fontSize:    'var(--text-xs)',
              fontWeight:   600,
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              color:       'var(--text-tertiary)',
              marginBottom:'var(--space-4)',
            }}>
              Why we built this
            </div>
            <h2 style={{
              fontSize:    'clamp(22px, 4vw, 32px)',
              fontWeight:   700,
              letterSpacing:'-0.5px',
              lineHeight:   1.3,
              marginBottom: 'var(--space-4)',
            }}>
              Because home is a feeling,{' '}
              <span style={{ color: 'var(--brand-saffron)' }}>not just a place</span>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
              We are 32 million people. Indians living abroad — working, building, raising families in cities far from home. We carry two cultures at once, and sometimes the clearest way we express the one we grew up in is through food, clothing, craft, and ritual.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              haat was built so that the basmati you grew up with, the saree your mother wore at every celebration, the mukhwas after every meal — these aren't things you have to give up. They just need the right channel to reach you.
            </p>
          </div>
          <div style={{
            background:   'rgba(249,115,22,0.05)',
            border:       '1px solid rgba(249,115,22,0.12)',
            borderRadius: 'var(--radius-xl)',
            padding:      'var(--space-6)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: 'var(--space-4)' }}></div>
            <blockquote style={{
              fontSize:    '16px',
              fontStyle:   'italic',
              color:       'var(--text-primary)',
              lineHeight:   1.7,
              marginBottom: 'var(--space-4)',
            }}>
              "I wanted my daughter, born in Toronto, to taste the same Diwali laddoos I grew up with in Jaipur. That shouldn't be hard. With haat, it isn't."
            </blockquote>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
              — Arjun Sharma, co-founder
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '0 var(--space-6) var(--space-16)' }}>
        <div
          className="about-stats-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
        >
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────── */}
      <section style={{
        background:  'var(--bg-raised)',
        borderTop:   '1px solid var(--border-faint)',
        borderBottom:'1px solid var(--border-faint)',
        padding:     'var(--space-16) var(--space-6)',
      }}>
        <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <div style={{
              fontSize:    'var(--text-xs)',
              fontWeight:   600,
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              color:       'var(--text-tertiary)',
              marginBottom:'var(--space-3)',
            }}>
              Our journey
            </div>
            <h2 style={{
              fontSize:    'clamp(24px, 4vw, 36px)',
              fontWeight:   700,
              letterSpacing:'-1px',
            }}>
              From frustration to platform
            </h2>
          </div>

          <div
            className="about-timeline"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}
          >
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  fontSize:    'clamp(28px, 4vw, 40px)',
                  fontWeight:   800,
                  letterSpacing:'-1px',
                  color:       'var(--brand-saffron)',
                  lineHeight:   1,
                }}>
                  {t.year}
                </div>
                <div style={{ width: '24px', height: '2px', background: 'rgba(249,115,22,0.4)' }} />
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t.title}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────── */}
      <section style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{
            fontSize:    'var(--text-xs)',
            fontWeight:   600,
            letterSpacing:'0.1em',
            textTransform:'uppercase',
            color:       'var(--text-tertiary)',
            marginBottom:'var(--space-3)',
          }}>
            What we believe
          </div>
          <h2 style={{
            fontSize:    'clamp(24px, 4vw, 36px)',
            fontWeight:   700,
            letterSpacing:'-1px',
          }}>
            Our principles
          </h2>
        </div>

        <div
          className="about-values-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
        >
          {VALUES.map((v, i) => (
            <div
              key={i}
              style={{
                background:   'var(--bg-raised)',
                border:       '1px solid var(--border-faint)',
                borderRadius: 'var(--radius-xl)',
                padding:      'var(--space-5)',
                display:      'flex',
                flexDirection:'column',
                gap:          'var(--space-3)',
              }}
            >
              <div style={{
                fontSize:    '22px',
                width:       '44px',
                height:      '44px',
                display:     'flex',
                alignItems:  'center',
                justifyContent:'center',
                background:  'rgba(249,115,22,0.08)',
                border:      '1px solid rgba(249,115,22,0.15)',
                borderRadius:'var(--radius-lg)',
              }}>
                {v.icon}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{v.title}</div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ─────────────────────────────────── */}
      <section style={{
        background:  'var(--bg-raised)',
        borderTop:   '1px solid var(--border-faint)',
        padding:     'var(--space-16) var(--space-6)',
      }}>
        <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <div style={{
              fontSize:    'var(--text-xs)',
              fontWeight:   600,
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              color:       'var(--text-tertiary)',
              marginBottom:'var(--space-3)',
            }}>
              The people
            </div>
            <h2 style={{
              fontSize:    'clamp(24px, 4vw, 36px)',
              fontWeight:   700,
              letterSpacing:'-1px',
            }}>
              Built by diaspora, for diaspora
            </h2>
          </div>

          <div
            className="about-team-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
          >
            {TEAM.map(p => <TeamCard key={p.name} person={p} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{
        textAlign:   'center',
        padding:     'var(--space-20) var(--space-6)',
        maxWidth:    '640px',
        margin:      '0 auto',
      }}>
        <h2 style={{
          fontSize:    'clamp(26px, 5vw, 40px)',
          fontWeight:   800,
          letterSpacing:'-1.5px',
          marginBottom: 'var(--space-4)',
          lineHeight:   1.15,
        }}>
          Ready to find something from home?
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
          Tell haat AI what you're looking for. It understands the nuance.
        </p>
        <Link
          to="/chat"
          style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          '8px',
            background:   'var(--brand-saffron)',
            color:        '#fff',
            borderRadius: 'var(--radius-full)',
            padding:      '14px 32px',
            fontSize:     '15px',
            fontWeight:    700,
            textDecoration:'none',
            transition:   'opacity 150ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'    }}
        >
          ✦ Start chatting with haat
        </Link>
      </section>
    </div>
  )
}
