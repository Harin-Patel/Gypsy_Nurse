import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import Chatbot from '@/components/Chatbot'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Gypsy Nurse - Travel Nursing Community',
  description: 'Discover new travel nurse jobs, connect with fellow travelers, and unlock unlimited resources.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Chatbot />
          <Toaster 
            position="top-right"
            closeButton={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'linear-gradient(135deg, rgba(252, 231, 243, 0.95) 0%, rgba(249, 213, 232, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(127, 40, 96, 0.3)',
                boxShadow: '0 20px 40px rgba(127, 40, 96, 0.25), 0 0 0 1px rgba(127, 40, 96, 0.1) inset',
                color: '#7F2860',
                padding: '16px 24px',
                borderRadius: '16px',
                fontWeight: '600',
                fontSize: '15px',
                maxWidth: '420px',
              },
              success: {
                iconTheme: {
                  primary: '#7F2860',
                  secondary: '#fff',
                },
                style: {
                  background: 'linear-gradient(135deg, rgba(252, 231, 243, 0.95) 0%, rgba(249, 213, 232, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(127, 40, 96, 0.3)',
                  boxShadow: '0 20px 40px rgba(127, 40, 96, 0.25), 0 0 0 1px rgba(127, 40, 96, 0.1) inset',
                  color: '#7F2860',
                },
              },
              error: {
                iconTheme: {
                  primary: '#7F2860',
                  secondary: '#fff',
                },
                style: {
                  background: 'linear-gradient(135deg, rgba(252, 231, 243, 0.95) 0%, rgba(249, 213, 232, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(127, 40, 96, 0.3)',
                  boxShadow: '0 20px 40px rgba(127, 40, 96, 0.25), 0 0 0 1px rgba(127, 40, 96, 0.1) inset',
                  color: '#7F2860',
                },
              },
              loading: {
                style: {
                  background: 'linear-gradient(135deg, rgba(252, 231, 243, 0.95) 0%, rgba(249, 213, 232, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(127, 40, 96, 0.3)',
                  boxShadow: '0 20px 40px rgba(127, 40, 96, 0.25), 0 0 0 1px rgba(127, 40, 96, 0.1) inset',
                  color: '#7F2860',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}

