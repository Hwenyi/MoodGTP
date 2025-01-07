import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MoodGPT',
  description: 'mood powered by Next.js and openai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} h-screen overflow-x-hidden overflow-y-auto`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
