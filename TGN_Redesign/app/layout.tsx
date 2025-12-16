import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import Chatbot from '@/components/Chatbot'
import MobileBottomNav from '@/components/MobileBottomNav'
import ToastConfig from '@/components/ToastConfig'
import SplashScreen from '@/components/SplashScreen'
import Onboarding from '@/components/Onboarding'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Gypsy Nurse - Travel Nursing Community',
  description: 'Discover new travel nurse jobs, connect with fellow travelers, and unlock unlimited resources.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/logo.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    shortcut: '/logo.svg',
    apple: [
      { url: '/logo.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Gypsy Nurse',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <SplashScreen />
          <Onboarding />
          {children}
          <MobileBottomNav />
          <Chatbot />
          <ToastConfig />
        </Providers>
      </body>
    </html>
  )
}

