"use client"

import { useState } from 'react'
import { getBrowserSupabase } from '@/lib/supabase-browser'
import Logo from '@/components/Logo'
import Link from 'next/link'

export default function LoginPage() {
  const supabase = getBrowserSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      window.location.href = '/catalog'
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-brand-900 via-brand-800 to-black">
        <Logo className="text-white" />
        <div>
          <h1 className="text-4xl font-semibold leading-tight">Invite-only THCa Buyer Portal</h1>
          <p className="mt-4 text-white/70">Curated core selections and rotating harvests for approved buyers.</p>
        </div>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} Verdant Labs</p>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md card p-8">
          <div className="mb-8 flex flex-col items-center">
            <Logo />
            <p className="mt-2 text-sm text-white/60">Secure access for approved buyers only</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button className="button-primary w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/60">
            <span>Need access? Contact your rep to be invited.</span>
          </div>
        </div>
      </div>
    </div>
  )
}