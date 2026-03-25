import axios from 'axios'
import { supabase } from './supabase'

// Local dev: Vite proxies /api → localhost:3001 (no VITE_API_URL needed)
// Production: set VITE_API_URL=https://haat-backend.onrender.com in Netlify env vars
const BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api'

const client = axios.create({ baseURL: BASE, timeout: 60_000 })

// Attach Supabase access token to every request automatically
client.interceptors.request.use(async config => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

export const searchProducts = (query, mode = 'catalog') =>
  client.post('/search', { query, mode }).then(r => r.data)

export const agentShop = (query, sessionId) =>
  client.post('/agent/shop', { query, sessionId }).then(r => r.data)

export const transcribeAudio = audioBlob => {
  const form = new FormData()
  form.append('audio', audioBlob, 'recording.webm')
  return client.post('/voice/transcribe', form).then(r => r.data)
}

export const speakText = text =>
  client.post('/voice/speak', { text }, { responseType: 'arraybuffer' })
    .then(r => r.data)
