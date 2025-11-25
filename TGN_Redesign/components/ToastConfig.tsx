'use client'

import { Toaster } from 'react-hot-toast'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ToastConfig() {
  const isMobile = useIsMobile()

  // Mobile-specific toast styles (smaller)
  const mobileToastStyle = {
    background: 'linear-gradient(135deg, rgba(252, 231, 243, 0.95) 0%, rgba(249, 213, 232, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(127, 40, 96, 0.3)',
    boxShadow: '0 10px 20px rgba(127, 40, 96, 0.2), 0 0 0 1px rgba(127, 40, 96, 0.1) inset',
    color: '#7F2860',
    padding: '10px 16px',
    borderRadius: '12px',
    fontWeight: '500',
    fontSize: '13px',
    maxWidth: '280px',
  }

  // Desktop toast styles (larger)
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
      toastOptions={{
        duration: 4000,
        style: isMobile ? mobileToastStyle : desktopToastStyle,
        success: {
          iconTheme: {
            primary: '#7F2860',
            secondary: '#fff',
          },
          style: isMobile ? mobileToastStyle : desktopToastStyle,
        },
        error: {
          iconTheme: {
            primary: '#7F2860',
            secondary: '#fff',
          },
          style: isMobile ? mobileToastStyle : desktopToastStyle,
        },
        loading: {
          iconTheme: {
            primary: '#7F2860',
            secondary: '#fff',
          },
          style: isMobile ? mobileToastStyle : desktopToastStyle,
        },
      }}
    />
  )
}

