'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// Check if device is mobile immediately (client-side only)
function checkIsMobileImmediate(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 1024
}

export default function SplashScreen() {
  const pathname = usePathname()
  // Always start as visible - will be hidden if desktop or after timer
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(true) // Default to true to show splash initially

  useEffect(() => {
    // Check if we're on a job details page - if so, hide splash immediately
    if (pathname?.startsWith('/jobs/') && pathname !== '/jobs') {
      setIsVisible(false)
      // Ensure body styles are reset
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
      }
      return
    }

    // Check mobile status immediately on mount
    const mobile = checkIsMobileImmediate()
    setIsMobile(mobile)
    
    // If not mobile, hide immediately and return
    if (!mobile) {
      setIsVisible(false)
      return
    }

    // On mobile: Prevent body scrolling while splash screen is visible
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    const originalWidth = document.body.style.width
    
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'

    // Hide splash screen after 1 second
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Re-enable scrolling after splash screen hides
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = originalWidth
    }, 1000)

    return () => {
      clearTimeout(timer)
      // Cleanup: re-enable scrolling if component unmounts
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = originalWidth
    }
  }, [pathname])

  // Don't show on desktop
  if (!isMobile) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh', // Dynamic viewport height for mobile
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
              }}
              className="relative w-48 h-48 md:w-64 md:h-64"
            >
              <Image
                src="/logo.svg"
                alt="The Gypsy Nurse"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

