'use client'

import { Toaster } from 'react-hot-toast'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useEffect } from 'react'

export default function ToastConfig() {
  const isMobile = useIsMobile()

  // Set z-index for toast container on mobile
  useEffect(() => {
    if (isMobile && typeof document !== 'undefined') {
      const updateToastZIndex = () => {
        // Update all toast elements and their containers
        const toastElements = document.querySelectorAll('[role="status"]')
        toastElements.forEach((toast) => {
          const toastEl = toast as HTMLElement
          toastEl.style.zIndex = '10001'
          
          // Update all parent containers up to body
          let parent = toastEl.parentElement
          while (parent && parent !== document.body) {
            const style = window.getComputedStyle(parent)
            if (style.position === 'fixed' || style.position === 'absolute') {
              parent.style.zIndex = '10000'
            }
            parent = parent.parentElement
          }
        })
        
        // Also check for react-hot-toast's wrapper divs
        const allDivs = Array.from(document.querySelectorAll('body > div'))
        allDivs.forEach((div) => {
          const htmlDiv = div as HTMLElement
          // Check if this div contains toast elements
          if (htmlDiv.querySelector('[role="status"]')) {
            htmlDiv.style.zIndex = '10000'
          }
        })
      }
      
      // Initial update with delay to ensure DOM is ready
      const timeoutId = setTimeout(updateToastZIndex, 100)
      
      // Watch for new toasts
      const observer = new MutationObserver(() => {
        setTimeout(updateToastZIndex, 50)
      })
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
      
      return () => {
        clearTimeout(timeoutId)
        observer.disconnect()
      }
    }
  }, [isMobile])

  // Mobile-specific toast styles - Native mobile app feel
  const mobileToastStyle = {
    background: '#1F2937', // Dark gray background like iOS/Android
    color: '#FFFFFF',
    padding: '12px 16px',
    borderRadius: '12px',
    fontWeight: '500',
    fontSize: '14px',
    maxWidth: 'calc(100% - 32px)',
    margin: '0 16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)',
    border: 'none',
  }

  // Mobile success toast style
  const mobileSuccessStyle = {
    ...mobileToastStyle,
    background: '#10B981', // Green for success
  }

  // Mobile error toast style
  const mobileErrorStyle = {
    ...mobileToastStyle,
    background: '#EF4444', // Red for error
  }

  // Desktop toast styles (keep existing)
  const desktopToastStyle = {
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
  }

  return (
    <Toaster 
      position={isMobile ? "top-center" : "top-right"}
      containerStyle={isMobile ? {
        top: '20px',
        bottom: 'auto',
        zIndex: 10000, // Higher than bottom nav (9999)
      } : {}}
      toastOptions={{
        duration: 3000,
        style: isMobile ? {
          ...mobileToastStyle,
          zIndex: 10000,
        } : desktopToastStyle,
        success: {
          iconTheme: {
            primary: '#FFFFFF',
            secondary: isMobile ? '#10B981' : '#7F2860',
          },
          style: isMobile ? {
            ...mobileSuccessStyle,
            zIndex: 10000,
          } : desktopToastStyle,
        },
        error: {
          iconTheme: {
            primary: '#FFFFFF',
            secondary: isMobile ? '#EF4444' : '#7F2860',
          },
          style: isMobile ? {
            ...mobileErrorStyle,
            zIndex: 10000,
          } : desktopToastStyle,
        },
        loading: {
          iconTheme: {
            primary: '#FFFFFF',
            secondary: isMobile ? '#1F2937' : '#7F2860',
          },
          style: isMobile ? {
            ...mobileToastStyle,
            zIndex: 10000,
          } : desktopToastStyle,
        },
      }}
    />
  )
}

