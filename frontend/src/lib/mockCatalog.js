const MOCK_PRODUCTS = [
  {
    id: 'm001',
    name: 'Mysore Pak Premium Box',
    category: 'sweets',
    subcategory: 'mithai',
    price: 420,
    priceUSD: 5,
    description: 'Ghee-rich traditional Mysore Pak from Karnataka.',
    image: 'https://images.unsplash.com/photo-1600326145359-3a44909d1a39?w=600&q=80&auto=format&fit=crop',
    city: 'Mysore',
    state: 'Karnataka',
    region: 'South India',
    tags: ['ghee', 'festive', 'mithai'],
    occasions: ['diwali', 'wedding'],
    material: null,
    rating: 4.8,
    reviews: 312,
    featured: true,
    available: true,
    weight: '500g',
    seller: 'Sri Mythri Sweets',
  },
  {
    id: 'm002',
    name: 'Kaju Katli Celebration Pack',
    category: 'sweets',
    subcategory: 'mithai',
    price: 680,
    priceUSD: 8,
    description: 'Premium cashew barfi with silver varak.',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&q=80&auto=format&fit=crop',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North India',
    tags: ['cashew', 'diwali', 'premium'],
    occasions: ['diwali', 'eid'],
    material: null,
    rating: 4.9,
    reviews: 521,
    featured: true,
    available: true,
    weight: '500g',
    seller: 'Kashi Mishthan Bhandar',
  },
  {
    id: 'm003',
    name: 'Kanjivaram Silk Saree Peacock Zari',
    category: 'sarees',
    subcategory: 'silk saree',
    price: 8500,
    priceUSD: 102,
    description: 'Classic Kanchipuram weave with rich zari border.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80&auto=format&fit=crop',
    city: 'Kanchipuram',
    state: 'Tamil Nadu',
    region: 'South India',
    tags: ['silk', 'kanjivaram', 'wedding'],
    occasions: ['wedding', 'engagement'],
    material: 'silk',
    rating: 4.9,
    reviews: 184,
    featured: true,
    available: true,
    weight: '1 item',
    seller: 'Lakshmi Silks',
  },
  {
    id: 'm004',
    name: 'Banarasi Tissue Saree Gold Buta',
    category: 'sarees',
    subcategory: 'banarasi saree',
    price: 6200,
    priceUSD: 74,
    description: 'Elegant Banarasi tissue saree for festive evenings.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80&auto=format&fit=crop',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North India',
    tags: ['banarasi', 'wedding', 'zari'],
    occasions: ['wedding', 'diwali'],
    material: 'silk blend',
    rating: 4.7,
    reviews: 129,
    featured: false,
    available: true,
    weight: '1 item',
    seller: 'Ganga Weaves',
  },
  {
    id: 'm005',
    name: 'Darjeeling First Flush FTGFOP1',
    category: 'tea',
    subcategory: 'black tea',
    price: 680,
    priceUSD: 8,
    description: 'Single-estate first flush with floral muscatel notes.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop',
    city: 'Darjeeling',
    state: 'West Bengal',
    region: 'East India',
    tags: ['tea', 'gift', 'darjeeling'],
    occasions: ['corporate gifting', 'festival'],
    material: null,
    rating: 4.8,
    reviews: 206,
    featured: true,
    available: true,
    weight: '250g',
    seller: 'Margarets Hope Collective',
  },
  {
    id: 'm006',
    name: 'Kashmiri Kahwa Herbal Tea Blend',
    category: 'tea',
    subcategory: 'herbal tea',
    price: 450,
    priceUSD: 5,
    description: 'Saffron, almond, and spice blend for soothing evenings.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80&auto=format&fit=crop',
    city: 'Srinagar',
    state: 'Jammu and Kashmir',
    region: 'North India',
    tags: ['kahwa', 'kashmir', 'herbal'],
    occasions: ['winter', 'gift'],
    material: null,
    rating: 4.6,
    reviews: 142,
    featured: false,
    available: true,
    weight: '200g',
    seller: 'Valley Aroma Foods',
  },
  {
    id: 'm007',
    name: 'Handcrafted Blue Pottery Vase',
    category: 'handicrafts',
    subcategory: 'decor',
    price: 1800,
    priceUSD: 22,
    description: 'Jaipur blue pottery decorative vase, artisan made.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80&auto=format&fit=crop',
    city: 'Jaipur',
    state: 'Rajasthan',
    region: 'West India',
    tags: ['pottery', 'artisan', 'decor'],
    occasions: ['housewarming', 'gift'],
    material: 'ceramic',
    rating: 4.7,
    reviews: 88,
    featured: false,
    available: true,
    weight: '1 item',
    seller: 'Pink City Craft House',
  },
  {
    id: 'm008',
    name: 'Kashmiri Walnut Dry Fruit Box',
    category: 'dry-fruits',
    subcategory: 'gift box',
    price: 2200,
    priceUSD: 26,
    description: 'Premium walnuts and almonds in a festive gift tin.',
    image: 'https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=600&q=80&auto=format&fit=crop',
    city: 'Srinagar',
    state: 'Jammu and Kashmir',
    region: 'North India',
    tags: ['dry fruits', 'gift', 'walnut'],
    occasions: ['diwali', 'wedding'],
    material: null,
    rating: 4.8,
    reviews: 164,
    featured: true,
    available: true,
    weight: '1kg',
    seller: 'Valley Dry Fruits',
  },
  {
    id: 'm009',
    name: 'Cotton Kurta Set for Men',
    category: 'clothing',
    subcategory: 'kurta',
    price: 1450,
    priceUSD: 17,
    description: 'Lightweight festive kurta set in breathable cotton.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80&auto=format&fit=crop',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North India',
    tags: ['kurta', 'cotton', 'menswear'],
    occasions: ['festive', 'family events'],
    material: 'cotton',
    rating: 4.5,
    reviews: 93,
    featured: false,
    available: true,
    weight: '1 item',
    seller: 'Awadhi Attire',
  },
  {
    id: 'm010',
    name: 'Malabar Spice Essentials Combo',
    category: 'spices',
    subcategory: 'masala set',
    price: 980,
    priceUSD: 12,
    description: 'Curated combo of pepper, cardamom, and turmeric.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format&fit=crop',
    city: 'Kochi',
    state: 'Kerala',
    region: 'South India',
    tags: ['spices', 'masala', 'kerala'],
    occasions: ['daily cooking', 'gift'],
    material: null,
    rating: 4.7,
    reviews: 208,
    featured: false,
    available: true,
    weight: '750g',
    seller: 'Malabar Spice Co.',
  },
]

function scoreProduct(product, queryWords, category) {
  let score = 0
  const cat = category?.toLowerCase()?.trim()

  if (cat && cat !== 'all' && product.category !== cat) return -1

  const haystack = [
    product.name,
    product.description,
    product.category,
    product.subcategory,
    product.city,
    product.state,
    product.region,
    ...(product.tags ?? []),
    ...(product.occasions ?? []),
    product.seller,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  for (const word of queryWords) {
    if (haystack.includes(word)) score += 3
    if (product.name.toLowerCase().includes(word)) score += 2
  }

  if (product.featured) score += 1
  score += (product.rating ?? 0) * 0.15

  return score
}

export function searchMockCatalog(query = '', category = null) {
  const words = String(query)
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  const ranked = MOCK_PRODUCTS
    .filter(p => p.available)
    .map(p => ({ product: p, score: scoreProduct(p, words, category) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product)

  const products = ranked.slice(0, 12)

  return {
    products,
    narration: products.length
      ? `Showing ${products.length} matches from local catalog mode while backend is offline.`
      : 'No local matches found for this query.',
    total: ranked.length,
    source: 'mock-local',
  }
}
