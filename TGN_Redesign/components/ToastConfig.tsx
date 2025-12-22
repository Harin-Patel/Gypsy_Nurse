'use client'

import { Toaster } from 'react-hot-toast'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useEffect } from 'react'

// Add global styles to hide left icon only
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    /* Hide left icon (success/error icon) */
    [data-testid="toast-icon"],
    [role="status"] > div:first-child > svg,
    [role="status"] svg:first-of-type {
      display: none !important;
    }
  `
  if (!document.head.querySelector('style[data-toast-hide-left-icon]')) {
    style.setAttribute('data-toast-hide-left-icon', 'true')
    document.head.appendChild(style)
  }
}

export default function ToastConfig() {
  const isMobile = useIsMobile()

  // Set z-index for toast container
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const updateToastStyles = () => {
        // Update all toast elements and their containers
        const toastElements = document.querySelectorAll('[role="status"]')
        toastElements.forEach((toast) => {
          const toastEl = toast as HTMLElement
          toastEl.style.zIndex = '100000' // Higher than onboarding modal (99999)
          
          // Update all parent containers up to body
          let parent = toastEl.parentElement
          while (parent && parent !== document.body) {
            const style = window.getComputedStyle(parent)
            if (style.position === 'fixed' || style.position === 'absolute') {
              parent.style.zIndex = '100000'
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
            htmlDiv.style.zIndex = '100000'
          }
        })
      }
      
      // Initial update with delay to ensure DOM is ready
      const timeoutId = setTimeout(updateToastStyles, 100)
      
      // Watch for new toasts
      const observer = new MutationObserver(() => {
        setTimeout(updateToastStyles, 50)
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
  }, [])

  // Native web toast styles - Clean, modern, standard web appearance
  const baseToastStyle = {
    background: '#FFFFFF',
    color: '#1F2937',
    padding: isMobile ? '14px 20px' : '16px 24px', // Increased right padding to fill space
    borderRadius: isMobile ? '8px' : '12px',
    fontWeight: '500',
    fontSize: isMobile ? '15px' : '16px',
    maxWidth: isMobile ? 'calc(100% - 32px)' : '500px',
    minWidth: isMobile ? '280px' : '320px',
    margin: isMobile ? '0 16px' : '0',
    boxShadow: isMobile 
      ? '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)' 
      : '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    zIndex: 100000,
  }

  // Theme color - Primary brand color
  const themeColor = '#7F2860'
  
  // Success toast style - Using theme color
  const successToastStyle = {
    ...baseToastStyle,
    background: '#FFFFFF',
    borderLeft: `4px solid ${themeColor}`,
    color: '#1F2937',
  }

  // Error toast style - Using theme color
  const errorToastStyle = {
    ...baseToastStyle,
    background: '#FFFFFF',
    borderLeft: `4px solid ${themeColor}`,
    color: '#1F2937',
  }

  // Default toast style
  const defaultToastStyle = {
    ...baseToastStyle,
  }

  return (
    <Toaster 
      position={isMobile ? "top-center" : "top-right"}
      containerStyle={{
        top: isMobile ? '20px' : '24px',
        right: isMobile ? 'auto' : '24px',
        bottom: 'auto',
        left: isMobile ? 'auto' : 'auto',
        zIndex: 100000, // Higher than onboarding modal (99999)
      }}
      toastOptions={{
        duration: 3000,
        style: defaultToastStyle,
        success: {
          icon: null, // Hide the left icon
          iconTheme: {
            primary: '#FFFFFF',
            secondary: themeColor,
          },
          style: successToastStyle,
        },
        error: {
          icon: null, // Hide the left icon
          iconTheme: {
            primary: '#FFFFFF',
            secondary: themeColor,
          },
          style: errorToastStyle,
        },
        loading: {
          icon: null, // Hide the left icon
          iconTheme: {
            primary: '#FFFFFF',
            secondary: themeColor,
          },
          style: defaultToastStyle,
        },
      }}
      gutter={8}
    />
  )
}

