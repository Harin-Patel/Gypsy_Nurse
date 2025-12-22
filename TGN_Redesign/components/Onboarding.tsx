'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Calendar, BookOpen, User, Briefcase, Heart, ArrowRight, FileText, Send } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'

// Check if device is mobile immediately (client-side only)
function checkIsMobileImmediate(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 1024
}

interface OnboardingSlide {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
  image?: string
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to The Gypsy Nurse',
    description: 'Your ultimate travel nursing community. Discover jobs, connect with fellow travelers, and unlock unlimited resources.',
    icon: Heart,
    color: 'text-primary-600',
    gradient: 'from-primary-500 to-primary-600',
    image: '/group-doctors-standing-conference-portrait-medical-team.jpg',
  },
  {
    id: 2,
    title: 'Search & Filter Jobs',
    description: 'Browse thousands of travel nursing opportunities. Filter by location, specialty, pay rate, shift, and more to find your perfect assignment.',
    icon: Briefcase,
    color: 'text-primary-600',
    gradient: 'from-primary-500 to-primary-600',
    image: '/travel-nurse-mobile.png',
  },
  {
    id: 3,
    title: 'Access Resources',
    description: 'Get compact license info, continuing education, exclusive discounts, housing assistance, hospital directory, and expert guidance.',
    icon: BookOpen,
    color: 'text-primary-600',
    gradient: 'from-primary-500 to-primary-600',
    image: '/group-doctors-standing-conference-portrait-medical-team.jpg',
  },
  {
    id: 4,
    title: 'Apply for Jobs',
    description: 'Submit applications directly through the platform. Track your applications, save favorite jobs, and get matched with opportunities that fit your profile.',
    icon: Send,
    color: 'text-primary-600',
    gradient: 'from-primary-500 to-primary-600',
    image: '/travel-nurse-mobile.png',
  },
  {
    id: 5,
    title: 'Events & Community',
    description: 'Connect with fellow travel nurses at events, read blog articles, join TravCon, and be part of the largest travel nursing community.',
    icon: Calendar,
    color: 'text-primary-600',
    gradient: 'from-primary-500 to-primary-600',
    image: '/group-doctors-standing-conference-portrait-medical-team.jpg',
  },
  {
    id: 6,
    title: 'Build Your Profile',
    description: 'Create your professional profile, showcase your experience and specialties, and let recruiters find you for the perfect assignments.',
    icon: User,
    color: 'text-primary-600',
    gradient: 'from-primary-500 to-primary-600',
    image: '/group-doctors-standing-conference-portrait-medical-team.jpg',
  },
]

export default function Onboarding() {
  const { isAuthenticated, isLoading } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true) // Default to true to block immediately
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchEndY, setTouchEndY] = useState(0)
  
  // Preload all images
  useEffect(() => {
    if (typeof window !== 'undefined' && isMobile) {
      onboardingSlides.forEach((slide) => {
        if (slide.image) {
          const img = new window.Image()
          img.src = slide.image
        }
      })
    }
  }, [isMobile])

  useEffect(() => {
    // Immediately hide homepage content on mobile to prevent flash
    if (typeof window !== 'undefined') {
      const mobile = checkIsMobileImmediate()
      if (mobile) {
        document.body.setAttribute('data-onboarding-checking', 'true')
      }
    }
    
    setMounted(true)
    
    // Wait for auth to finish loading before making decision
    // This prevents showing onboarding incorrectly after logout when app is restarted
    if (isLoading) {
      return
    }
    
    // Check if onboarding was already completed
    if (typeof window !== 'undefined') {
      const onboardingCompleted = localStorage.getItem('onboarding_completed')
      const mobile = checkIsMobileImmediate()
      
      setIsMobile(mobile)
      
      // Only show onboarding if:
      // 1. User is on mobile
      // 2. Onboarding hasn't been completed
      // 3. User is not authenticated (and auth has finished loading)
      if (mobile && !onboardingCompleted && !isAuthenticated) {
        // Keep shouldShowOnboarding true and set attribute
        setShouldShowOnboarding(true)
        document.body.setAttribute('data-onboarding-active', 'true')
        // Wait for splash screen to finish (1 second display + 0.5s fade out = 1.5s total)
        const timer = setTimeout(() => {
          setIsVisible(true)
          document.body.removeAttribute('data-onboarding-checking')
          // Prevent body scrolling
          document.body.style.overflow = 'hidden'
          document.body.style.position = 'fixed'
          document.body.style.width = '100%'
        }, 1500) // Wait for splash screen to complete
        
        return () => clearTimeout(timer)
      } else {
        // Hide onboarding if user becomes authenticated or onboarding was completed
        setShouldShowOnboarding(false)
        setIsVisible(false)
        document.body.removeAttribute('data-onboarding-active')
        document.body.removeAttribute('data-onboarding-checking')
        // Re-enable scrolling
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
      }
    }

    return () => {
      // Cleanup: re-enable scrolling
      document.body.removeAttribute('data-onboarding-active')
      document.body.removeAttribute('data-onboarding-checking')
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isAuthenticated, isLoading])

  // Don't render anything on server to avoid hydration mismatch
  // Only render after component has mounted on client
  if (!mounted) {
    return null
  }
  
  // Show blocking screen on mobile if onboarding should be shown but not visible yet
  // This prevents homepage from flashing
  if (shouldShowOnboarding && !isVisible && isMobile) {
    return (
      <div 
        className="fixed inset-0 z-[99998] bg-white"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100dvh',
        }}
      />
    )
  }

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_completed', 'true')
    }
    setIsVisible(false)
    setShouldShowOnboarding(false)
    document.body.removeAttribute('data-onboarding-active')
    document.body.removeAttribute('data-onboarding-checking')
    // Re-enable scrolling
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
  }

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
    setTouchEnd(0) // Reset touchEnd on new touch
    setTouchEndY(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart) {
      setTouchEnd(e.targetTouches[0].clientX)
      setTouchEndY(e.targetTouches[0].clientY)
    }
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(0)
      setTouchEnd(0)
      setTouchStartY(0)
      setTouchEndY(0)
      return
    }
    
    const distanceX = touchStart - touchEnd
    const distanceY = Math.abs(touchStartY - touchEndY)
    const minSwipeDistance = 100 // Minimum horizontal swipe distance
    const maxVerticalDistance = 50 // Maximum vertical movement to consider it a horizontal swipe
    
    // Only trigger if it's a horizontal swipe (not vertical scroll or tap)
    const isHorizontalSwipe = Math.abs(distanceX) > minSwipeDistance && distanceY < maxVerticalDistance
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance

    // Only trigger navigation if it's a proper horizontal swipe
    if (isHorizontalSwipe) {
      if (isLeftSwipe && currentSlide < onboardingSlides.length - 1) {
        handleNext()
      } else if (isRightSwipe && currentSlide > 0) {
        handlePrevious()
      }
    }
    
    // Reset touch values
    setTouchStart(0)
    setTouchEnd(0)
    setTouchStartY(0)
    setTouchEndY(0)
  }

  // Don't show if not mobile, already completed, or user is authenticated
  if (!mounted || !isMobile || !shouldShowOnboarding || !isVisible) {
    return null
  }

  const currentSlideData = onboardingSlides[currentSlide]
  const Icon = currentSlideData.icon
  const isLastSlide = currentSlide === onboardingSlides.length - 1

  // Button text based on slide position
  const getButtonText = () => {
    if (currentSlide === 0) return "Let's Begin"
    if (isLastSlide) return 'Get Started'
    return 'Next'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99998] bg-white"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh',
            paddingTop: 'env(safe-area-inset-top)',
          }}
        >
          {/* Skip Button */}
          <div 
            className="absolute right-3 sm:right-4 z-10"
            style={{
              top: 'calc(env(safe-area-inset-top) + 0.75rem)',
            }}
          >
            <button
              onClick={handleSkip}
              className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-md rounded-full border border-gray-200/50 shadow-sm active:bg-white/90"
            >
              Skip
            </button>
          </div>

          {/* Main Content */}
          <div className="flex flex-col h-full">
            {/* Slide Content */}
            <div 
              className="flex-1 flex flex-col relative overflow-hidden"
              style={{ backgroundColor: 'white' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="flex-1 flex flex-col absolute inset-0 w-full h-full"
                  style={{ 
                    backgroundColor: 'white',
                    willChange: 'opacity',
                    zIndex: currentSlide
                  }}
                >
                  {/* Cover Image - Full width at top with safe area */}
                  {currentSlideData.image && (
                    <div 
                      className="relative w-full flex-1 min-h-[50vh] max-h-[60vh] bg-white"
                      style={{
                        marginTop: 'calc(-1 * env(safe-area-inset-top))',
                        height: 'calc(50vh + env(safe-area-inset-top))',
                        maxHeight: 'calc(60vh + env(safe-area-inset-top))',
                        backgroundColor: 'white'
                      }}
                    >
                      <Image
                        src={currentSlideData.image}
                        alt={currentSlideData.title}
                        fill
                        priority={currentSlide === 0}
                        className="object-cover"
                        sizes="100vw"
                        unoptimized={false}
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 30%, transparent 60%, transparent 100%)'
                        }}
                      />
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 flex-1 flex flex-col justify-center relative z-10">
                    <div className="w-full max-w-md mx-auto text-center space-y-4 sm:space-y-6">
                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight px-2">
                        {currentSlideData.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2 sm:px-4">
                        {currentSlideData.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Navigation */}
            <div 
              className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 space-y-4 sm:space-y-6 bg-white"
              style={{
                paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                paddingTop: '1.5rem',
              }}
            >
              {/* Progress Dots */}
              <div className="flex justify-center items-center gap-2">
                {onboardingSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-6 h-2 bg-primary-600'
                        : 'w-2 h-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Previous Button - Circular icon button */}
                {currentSlide > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm active:bg-gray-50"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700" />
                  </button>
                )}

                {/* Next/Get Started Button - Primary action */}
                <button
                  onClick={handleNext}
                  className={`${
                    currentSlide > 0 ? 'flex-1' : 'w-full'
                  } h-14 sm:h-14 md:h-16 bg-primary-600 text-white font-black rounded-full flex items-center justify-center text-lg sm:text-lg md:text-xl leading-tight shadow-lg active:bg-primary-700`}
                  style={{
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {getButtonText()}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

