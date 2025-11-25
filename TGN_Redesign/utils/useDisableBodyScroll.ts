import { useEffect } from 'react'

/**
 * Custom hook to disable body scroll when a modal is open
 * @param isOpen - Boolean indicating if the modal is open
 */
export function useDisableBodyScroll(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY
      
      // Disable scroll by setting overflow hidden and preserving scroll position
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Re-enable scroll and restore scroll position
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])
}

