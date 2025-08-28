import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'THCa Catalog — Invite-only Buyer Portal',
  description: 'Sleek, professional invite-only catalog for premium THCa flower.',
  themeColor: '#1b2a22'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-brand-400/30 selection:text-white">
        {children}
      </body>
    </html>
  )
}