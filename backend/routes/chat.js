import { Router } from 'express'
import { runConversation } from '../services/conversationAgent.js'
import { optionalAuth }    from '../middleware/authMiddleware.js'
import db                  from '../services/db.js'

const router = Router()
router.use(optionalAuth)

// ── Prepared statements ────────────────────────────────────────────────────────
const stmtGet    = db.prepare(`SELECT * FROM sessions WHERE id = ?`)
const stmtUpsert = db.prepare(`
  INSERT INTO sessions (id, user_id, history, last_query, last_products, last_source, cart, created_at, updated_at)
  VALUES (@id, @user_id, @history, @last_query, @last_products, @last_source, @cart, @created_at, @updated_at)
  ON CONFLICT(id) DO UPDATE SET
    user_id       = excluded.user_id,
    history       = excluded.history,
    last_query    = excluded.last_query,
    last_products = excluded.last_products,
    last_source   = excluded.last_source,
    cart          = excluded.cart,
    updated_at    = excluded.updated_at
`)
const stmtDelete  = db.prepare(`DELETE FROM sessions WHERE id = ?`)
const stmtEvict   = db.prepare(`DELETE FROM sessions WHERE updated_at < ?`)

// ── Session helpers ───────────────────────────────────────────────────────────
function rowToSession(row) {
  if (!row) return null
  return {
    id:           row.id,
    userId:       row.user_id,
    history:      JSON.parse(row.history       ?? '[]'),
    lastQuery:    row.last_query,
    lastProducts: row.last_products ? JSON.parse(row.last_products) : null,
    lastSource:   row.last_source,
    cart:         row.cart ? JSON.parse(row.cart) : [],
    createdAt:    row.created_at,
    updatedAt:    row.updated_at,
  }
}

function saveSession(session) {
  stmtUpsert.run({
    id:            session.id,
    user_id:       session.userId   ?? null,
    history:       JSON.stringify(session.history),
    last_query:    session.lastQuery    ?? null,
    last_products: session.lastProducts ? JSON.stringify(session.lastProducts) : null,
    last_source:   session.lastSource   ?? null,
    cart:          session.cart?.length ? JSON.stringify(session.cart) : null,
    created_at:    session.createdAt,
    updated_at:    session.updatedAt,
  })
}

function getOrCreateSession(id) {
  let session = rowToSession(stmtGet.get(id))
  if (!session) {
    const now = Date.now()
    session = { id, userId: null, history: [], lastQuery: null, lastProducts: null, lastSource: null, createdAt: now, updatedAt: now }
    saveSession(session)
  }
  return session
}

// Evict sessions older than 24 hours (runs every 30 minutes)
setInterval(() => {
  const cutoff  = Date.now() - 24 * 60 * 60 * 1000
  const { changes } = stmtEvict.run(cutoff)
  if (changes > 0) console.log(`[Chat] Evicted ${changes} stale sessions`)
}, 30 * 60 * 1000)

// ── POST /api/chat ─────────────────────────────────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const { message, sessionId } = req.body ?? {}

    if (!message?.trim()) return res.status(400).json({ error: '"message" is required' })

    const sid     = sessionId?.trim() || `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const session = getOrCreateSession(sid)
    const user    = req.user ?? null

    console.log(`[Chat] Session ${sid} | User: ${user?.name ?? 'guest'} | Turn ${Math.floor(session.history.length / 2) + 1} | "${message.slice(0, 60)}"`)

    if (user && !session.userId) session.userId = user.id

    const result = await runConversation(message.trim(), session, user)

    // Persist the updated session back to SQLite
    session.updatedAt = Date.now()
    saveSession(session)

    res.json({
      sessionId:   sid,
      message:     result.message,
      products:    result.products    ?? null,
      suggestions: result.suggestions ?? [],
      source:      result.source      ?? null,
      cart:        result.cart        ?? null,
      turnCount:   Math.floor(session.history.length / 2),
      user:        user ? { id: user.id, name: user.name, onboarded: user.onboarded } : null,
    })
  } catch (err) {
    console.error('[Chat] Unhandled error:', err.message)
    next(err)
  }
})

// ── GET /api/chat/:sessionId ───────────────────────────────────────────────────
router.get('/:sessionId', (req, res) => {
  const session = rowToSession(stmtGet.get(req.params.sessionId))
  if (!session) return res.status(404).json({ error: 'Session not found' })

  res.json({
    sessionId:    session.id,
    lastQuery:    session.lastQuery,
    lastProducts: session.lastProducts,
    source:       session.lastSource,
    turnCount:    Math.floor(session.history.length / 2),
    createdAt:    session.createdAt,
  })
})

// ── GET /api/chat/:sessionId/history ──────────────────────────────────────────
router.get('/:sessionId/history', (req, res) => {
  const session = rowToSession(stmtGet.get(req.params.sessionId))
  if (!session) return res.status(404).json({ error: 'Session not found' })

  const visible = []
  for (const msg of session.history) {
    if (msg.role === 'user') {
      const content = Array.isArray(msg.content)
        ? msg.content.filter(b => b.type === 'text').map(b => b.text).join('')
        : msg.content
      if (content) visible.push({ role: 'user', content })
    } else if (msg.role === 'assistant') {
      const content = Array.isArray(msg.content)
        ? msg.content.filter(b => b.type === 'text').map(b => b.text).join('')
        : msg.content
      if (content) visible.push({ role: 'assistant', content })
    }
  }

  res.json({ sessionId: session.id, messages: visible })
})

// ── DELETE /api/chat/:sessionId ────────────────────────────────────────────────
router.delete('/:sessionId', (req, res) => {
  const existed = !!stmtGet.get(req.params.sessionId)
  stmtDelete.run(req.params.sessionId)
  res.json({ ok: true, existed })
})

export default router
