'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Force scroll to top on page load
    window.scrollTo(0, 0)
    
    // Prevent any automatic scrolling during initial render
    const preventScroll = (e: Event) => {
      e.preventDefault()
      return false
    }
    
    // Block scroll events briefly during page load
    window.addEventListener('scroll', preventScroll, { passive: false })
    
    // Re-enable scrolling and enable smooth scroll after page is fully loaded
    const timer = setTimeout(() => {
      window.removeEventListener('scroll', preventScroll)
      // Enable smooth scrolling for manual user interactions
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('smooth-scroll')
      }
    }, 100)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', preventScroll)
    }
  }, [])
  
  return <AuthProvider>{children}</AuthProvider>
}

