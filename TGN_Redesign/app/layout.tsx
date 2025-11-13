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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent auto-scroll on page load
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Chatbot />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: '#1f2937',
                padding: '16px 24px',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontWeight: '600',
                fontSize: '15px',
                maxWidth: '420px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
                style: {
                  background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.95) 0%, rgba(209, 250, 229, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25), 0 0 0 1px rgba(16, 185, 129, 0.1) inset',
                  color: '#065f46',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
                style: {
                  background: 'linear-gradient(135deg, rgba(254, 242, 242, 0.95) 0%, rgba(254, 226, 226, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  boxShadow: '0 20px 40px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(239, 68, 68, 0.1) inset',
                  color: '#991b1b',
                },
              },
              loading: {
                style: {
                  background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(219, 234, 254, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1) inset',
                  color: '#1e40af',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}

