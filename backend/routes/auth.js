import { Router } from 'express'
import bcrypt from 'bcryptjs'
import {
  createUser,
  findByEmail,
  findById,
  updateUser,
  publicProfile,
} from '../services/userStore.js'
import { signToken, requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
const SALT_ROUNDS = 10

// ── POST /api/auth/register ───────────────────────────────────────────────────
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body ?? {}

    if (!email?.trim())    return res.status(400).json({ error: 'Email is required' })
    if (!password)         return res.status(400).json({ error: 'Password is required' })
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' })
    if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: 'Invalid email address' })

    if (findByEmail(email)) {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user  = createUser({ email, passwordHash, name })
    const token = signToken(user.id)

    console.log(`[Auth] New user registered: ${user.email}`)

    res.status(201).json({
      token,
      user: publicProfile(user),
    })
  } catch (err) {
    next(err)
  }
})

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {}

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = findByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = signToken(user.id)

    console.log(`[Auth] Login: ${user.email}`)

    res.json({
      token,
      user: publicProfile(user),
    })
  } catch (err) {
    next(err)
  }
})

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: publicProfile(req.user) })
})

// ── PUT /api/auth/profile ─────────────────────────────────────────────────────
// Updates user's personalization profile
router.put('/profile', requireAuth, (req, res, next) => {
  try {
    const {
      name,
      country,
      countryCode,
      homeState,
      dietary,
      budgetRange,
      occasions,
      onboarded,
    } = req.body ?? {}

    // Only update fields that were actually sent
    const updates = {}
    if (name         !== undefined) updates.name         = name?.trim()
    if (country      !== undefined) updates.country      = country
    if (countryCode  !== undefined) updates.countryCode  = countryCode
    if (homeState    !== undefined) updates.homeState    = homeState
    if (dietary      !== undefined) updates.dietary      = Array.isArray(dietary) ? dietary : []
    if (budgetRange  !== undefined) updates.budgetRange  = budgetRange
    if (occasions    !== undefined) updates.occasions    = Array.isArray(occasions) ? occasions : []
    if (onboarded    !== undefined) updates.onboarded    = Boolean(onboarded)

    const updated = updateUser(req.user.id, updates)
    res.json({ user: publicProfile(updated) })
  } catch (err) {
    next(err)
  }
})

export default router
