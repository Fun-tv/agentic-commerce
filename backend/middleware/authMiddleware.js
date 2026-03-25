import jwt from 'jsonwebtoken'

// Supabase signs all its JWTs with SUPABASE_JWT_SECRET (found in
// Supabase dashboard → Project Settings → API → JWT Secret)
const secret = () => process.env.SUPABASE_JWT_SECRET || ''

// ── requireAuth — blocks if not authenticated ─────────────────────────────────
export function requireAuth(req, res, next) {
  const user = extractUser(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  req.user = user
  next()
}

// ── optionalAuth — attaches user if token present, continues either way ───────
export function optionalAuth(req, res, next) {
  req.user = extractUser(req) ?? null
  next()
}

// ── Internal: verify Supabase JWT, return minimal user object or null ─────────
function extractUser(req) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) return null
    const token = header.slice(7)
    // Supabase JWTs use HS256 with the project JWT secret
    const payload = jwt.verify(token, secret(), { algorithms: ['HS256'] })
    // payload.sub = Supabase user UUID; payload.email = user email
    return { id: payload.sub, email: payload.email ?? null, role: payload.role ?? 'authenticated' }
  } catch {
    return null
  }
}
