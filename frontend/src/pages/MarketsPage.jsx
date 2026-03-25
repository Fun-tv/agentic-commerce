import { Link } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────────────────────────
const MARKETS = [
  {
    city:       'Jaipur',
    state:      'Rajasthan',
    market:     'Johari Bazaar',
    specialty:  ['Gemstones', 'Textiles', 'Lac Jewellery'],
    desc:       "The pink city's legendary market for precious gems, Rajasthani textiles, and hand-crafted lac bangles.",
    photo:      '1599422775',   // Unsplash photo ID
    query:      'Jaipur handicrafts and jewellery',
    color:      '#F97316',
  },
  {
    city:       'Delhi',
    state:      'NCT',
    market:     'Chandni Chowk',
    specialty:  ['Spices', 'Silver', 'Street Food'],
    desc:       "Old Delhi's iconic bazaar — a labyrinth of spice merchants, silversmiths, and century-old sweet shops.",
    photo:      '1587474257830',
    query:      'Delhi spices and silver',
    color:      '#EF4444',
  },
  {
    city:       'Varanasi',
    state:      'Uttar Pradesh',
    market:     'Vishwanath Gali',
    specialty:  ['Banarasi Silk', 'Brass Crafts', 'Rudraksha'],
    desc:       'Centuries of weaving tradition live in these narrow lanes, home to the finest Banarasi silk sarees.',
    photo:      '1561622339978',
    query:      'Banarasi silk sarees Varanasi',
    color:      '#8B5CF6',
  },
  {
    city:       'Kolkata',
    state:      'West Bengal',
    market:     'New Market',
    specialty:  ['Mishti', 'Cotton Sarees', 'Handicrafts'],
    desc:       "Kolkata's beloved New Market — from delicate mishti doi to fine muslin and terracotta crafts.",
    photo:      '1558618666',
    query:      'Kolkata sweets and Bengali handicrafts',
    color:      '#F59E0B',
  },
  {
    city:       'Mumbai',
    state:      'Maharashtra',
    market:     'Zaveri Bazaar',
    specialty:  ['Gold Jewellery', 'Diamonds', 'Silver'],
    desc:       "India's largest jewellery hub — a glittering warren of goldsmiths trading since the 1800s.",
    photo:      '1567157577867',
    query:      'gold jewellery Mumbai',
    color:      '#10B981',
  },
  {
    city:       'Chennai',
    state:      'Tamil Nadu',
    market:     'T. Nagar',
    specialty:  ['Silk Sarees', 'Temple Jewellery', 'Spices'],
    desc:       'T. Nagar is the mecca for Kanjivaram silk — every hue, every zari pattern, from heritage weavers.',
    photo:      '1567684014761',
    query:      'Kanjivaram silk sarees Chennai',
    color:      '#06B6D4',
  },
  {
    city:       'Hyderabad',
    state:      'Telangana',
    market:     'Laad Bazaar',
    specialty:  ['Pearls', 'Lac Bangles', 'Biryani Spices'],
    desc:       "Next to Charminar, this 400-year-old bazaar is the heartbeat of Hyderabad's pearl and bangle trade.",
    photo:      '1523592303958',
    query:      'Hyderabad pearls and bangles',
    color:      '#EC4899',
  },
  {
    city:       'Amritsar',
    state:      'Punjab',
    market:     'Hall Bazaar',
    specialty:  ['Phulkari', 'Dry Fruits', 'Punjabi Jutti'],
    desc:       "Golden Temple city's market — vibrant phulkari embroidery, premium dry fruits, and handmade juttis.",
    photo:      '1528360983277',
    query:      'Amritsar phulkari and dry fruits',
    color:      '#F97316',
  },
  {
    city:       'Mysore',
    state:      'Karnataka',
    market:     'Devaraja Market',
    specialty:  ['Sandal Wood', 'Silk', 'Incense'],
    desc:       'Fragrant pyramids of kumkum and jasmine garlands fill this beautiful market under the old arcades.',
    photo:      '1535535112186',
    query:      'Mysore sandalwood and silk',
    color:      '#84CC16',
  },
  {
    city:       'Lucknow',
    state:      'Uttar Pradesh',
    market:     'Hazratganj',
    specialty:  ['Chikankari', 'Awadhi Attar', 'Zardozi'],
    desc:       "The city of nawabs is home to India's finest chikankari embroidery — intricate white-thread stitchwork.",
    photo:      '1602615576820',
    query:      'Lucknow chikankari embroidery',
    color:      '#A78BFA',
  },
  {
    city:       'Kochi',
    state:      'Kerala',
    market:     'Jew Town Spice Market',
    specialty:  ['Cardamom', 'Pepper', 'Coconut Products'],
    desc:       "Fort Kochi's ancient spice warehouses line the waterfront — the original spice trade hub of the world.",
    photo:      '1590243741696',
    query:      'Kerala spices cardamom pepper',
    color:      '#34D399',
  },
  {
    city:       'Ahmedabad',
    state:      'Gujarat',
    market:     'Law Garden',
    specialty:  ['Bandhani', 'Patola Silk', 'Mirror Work'],
    desc:       "Gujarat's vibrant textile heritage shines here — tie-dye bandhani, double-ikat patola, and mirror embroidery.",
    photo:      '1596797882985',
    query:      'Gujarat bandhani textiles',
    color:      '#FB923C',
  },
]

const FEATURED_STORIES = [
  {
    title:   'The weavers of Varanasi',
    excerpt: 'Families who have woven Banarasi silk for twelve generations, keeping a 500-year tradition alive on wooden handlooms.',
    tag:     'Heritage Craft',
  },
  {
    title:   "How Jaipur's gem cutters work",
    excerpt: 'From rough stone to finished jewel — the intricate craft of gem cutting passed down in the lanes of Johari Bazaar.',
    tag:     'Artisan Story',
  },
  {
    title:   "Kolkata's mishti culture",
    excerpt: 'Why the sweetmeat shops of Bengal are more than stores — they are community hubs, memory-keepers, and living art.',
    tag:     'Food & Culture',
  },
]

// ── Components ────────────────────────────────────────────────────────────────
function MarketCard({ market }) {
  return (
    <Link
      to={`/chat?q=${encodeURIComponent(market.query)}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className="market-card"
        style={{
          borderRadius:  'var(--radius-xl)',
          overflow:      'hidden',
          border:        '1px solid var(--border-faint)',
          background:    'var(--bg-raised)',
          transition:    'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
          cursor:        'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform   = 'translateY(-3px)'
          e.currentTarget.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.3)'
          e.currentTarget.style.borderColor = `${market.color}44`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform   = 'translateY(0)'
          e.currentTarget.style.boxShadow   = 'none'
          e.currentTarget.style.borderColor = 'var(--border-faint)'
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
          <img
            src={`https://images.unsplash.com/photo-${market.photo}?w=600&q=80&auto=format`}
            alt={market.market}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div style={{
            position:   'absolute',
            inset:       0,
            background: `linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)`,
          }} />
          {/* City label */}
          <div style={{
            position:   'absolute',
            bottom:     '12px',
            left:       '14px',
            right:      '14px',
            display:    'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{market.city}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{market.state}</div>
            </div>
            <div style={{
              fontSize:    '11px',
              fontWeight:   600,
              color:       '#fff',
              background:  `${market.color}cc`,
              borderRadius:'var(--radius-full)',
              padding:     '3px 10px',
              backdropFilter: 'blur(8px)',
            }}>
              {market.market}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '16px' }}>
          {/* Specialty tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {market.specialty.map(s => (
              <span key={s} style={{
                fontSize:    '11px',
                color:       market.color,
                background:  `${market.color}18`,
                border:      `1px solid ${market.color}30`,
                borderRadius:'var(--radius-full)',
                padding:     '2px 9px',
                fontWeight:   500,
              }}>
                {s}
              </span>
            ))}
          </div>

          <p style={{
            fontSize:   '13px',
            color:      'var(--text-secondary)',
            lineHeight:  1.55,
            marginBottom:'12px',
          }}>
            {market.desc}
          </p>

          <div style={{
            fontSize:   '12px',
            fontWeight:  600,
            color:      market.color,
            display:    'flex',
            alignItems: 'center',
            gap:        '4px',
          }}>
            Shop this bazaar
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MarketsPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <style>{`
        @media (max-width: 640px) {
          .markets-grid { grid-template-columns: 1fr !important; }
          .markets-hero-h1 { font-size: clamp(36px, 10vw, 56px) !important; }
          .stories-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .markets-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────── */}
      <section style={{
        textAlign:    'center',
        padding:      'var(--space-16) var(--space-6) var(--space-10)',
        maxWidth:     '720px',
        margin:       '0 auto',
      }}>
        <div style={{
          display:     'inline-block',
          fontSize:    'var(--text-xs)',
          fontWeight:   600,
          letterSpacing:'0.1em',
          textTransform:'uppercase',
          color:       'var(--brand-saffron)',
          border:      '1px solid rgba(249,115,22,0.3)',
          borderRadius:'var(--radius-full)',
          padding:     '4px 16px',
          marginBottom:'var(--space-5)',
        }}>
          12 Cities · 100+ Markets
        </div>

        <h1
          className="markets-hero-h1"
          style={{
            fontSize:    'clamp(42px, 7vw, 64px)',
            fontWeight:   800,
            letterSpacing:'-2px',
            lineHeight:   1.05,
            marginBottom: 'var(--space-5)',
          }}
        >
          India's greatest{' '}
          <span className="gradient-text">bazaars</span>
          {' '}at your fingertips
        </h1>

        <p style={{
          fontSize:    '17px',
          color:       'var(--text-secondary)',
          lineHeight:   1.65,
          marginBottom: 'var(--space-8)',
        }}>
          From the gem lanes of Jaipur to the silk alleys of Varanasi — shop curated products from India's most iconic markets, delivered to your door anywhere in the world.
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
            padding:      '13px 28px',
            fontSize:     '15px',
            fontWeight:    700,
            textDecoration:'none',
            transition:   'opacity 150ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'    }}
        >
          ✦ Ask haat AI to find something
        </Link>
      </section>

      {/* ── Market Grid ──────────────────────────── */}
      <section style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '0 var(--space-6) var(--space-16)' }}>
        <div
          className="markets-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '24px',
          }}
        >
          {MARKETS.map(m => <MarketCard key={m.city} market={m} />)}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────── */}
      <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '0 var(--space-6)' }}>
        <div style={{ borderTop: '1px solid var(--border-faint)' }} />
      </div>

      {/* ── Stories ──────────────────────────────── */}
      <section style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{
            fontSize:    'var(--text-xs)',
            fontWeight:   600,
            letterSpacing:'0.1em',
            textTransform:'uppercase',
            color:       'var(--text-tertiary)',
            marginBottom:'var(--space-3)',
          }}>
            From our journal
          </div>
          <h2 style={{
            fontSize:    'clamp(24px, 4vw, 36px)',
            fontWeight:   700,
            letterSpacing:'-1px',
            color:       'var(--text-primary)',
          }}>
            Stories from the bazaar
          </h2>
        </div>

        <div
          className="stories-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
        >
          {FEATURED_STORIES.map((s, i) => (
            <div
              key={i}
              style={{
                background:   'var(--bg-raised)',
                border:       '1px solid var(--border-faint)',
                borderRadius: 'var(--radius-xl)',
                padding:      'var(--space-6)',
                display:      'flex',
                flexDirection:'column',
                gap:          'var(--space-3)',
              }}
            >
              <span style={{
                fontSize:    '11px',
                fontWeight:   600,
                color:       'var(--brand-saffron)',
                background:  'rgba(249,115,22,0.10)',
                border:      '1px solid rgba(249,115,22,0.20)',
                borderRadius:'var(--radius-full)',
                padding:     '3px 10px',
                alignSelf:   'flex-start',
              }}>
                {s.tag}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                {s.excerpt}
              </p>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Coming soon →</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────── */}
      <section style={{
        background:   'var(--bg-raised)',
        borderTop:    '1px solid var(--border-faint)',
        textAlign:    'center',
        padding:      'var(--space-16) var(--space-6)',
      }}>
        <h2 style={{
          fontSize:    'clamp(22px, 4vw, 32px)',
          fontWeight:   700,
          letterSpacing:'-1px',
          marginBottom: 'var(--space-3)',
        }}>
          Can't find your city?
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
          Tell our AI what you're looking for — it searches across all markets simultaneously.
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
            padding:      '12px 26px',
            fontSize:     '14px',
            fontWeight:    600,
            textDecoration:'none',
          }}
        >
          ✦ Start chatting
        </Link>
      </section>
    </div>
  )
}
