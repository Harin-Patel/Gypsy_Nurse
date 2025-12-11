'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { X, Gift, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturedJobs from '@/components/FeaturedJobs'
import Events from '@/components/Events'
import Employers from '@/components/Employers'
import InstagramFeed from '@/components/InstagramFeed'
import Resources from '@/components/Resources'
import Blog from '@/components/Blog'
import Footer from '@/components/Footer'
// import { useDisableBodyScroll } from '@/utils/useDisableBodyScroll'

export default function Home() {
  // const [showChristmasModal, setShowChristmasModal] = useState(false)
  // const [isMobile, setIsMobile] = useState(false)
  
  // Disable body scroll when modal is open
  // useDisableBodyScroll(showChristmasModal)

  // Detect mobile screen size
  // useEffect(() => {
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth < 640)
  //   }
  //   
  //   checkMobile()
  //   window.addEventListener('resize', checkMobile)
  //   return () => window.removeEventListener('resize', checkMobile)
  // }, [])

  // Show Christmas modal on page load (once per session)
  // Appears 1.5 seconds after the homepage loads
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const hasSeenModal = sessionStorage.getItem('christmas-modal-seen')
  //     if (!hasSeenModal) {
  //       // Delay for better UX - allows page to load first
  //       const timer = setTimeout(() => {
  //         setShowChristmasModal(true)
  //         sessionStorage.setItem('christmas-modal-seen', 'true')
  //       }, 1500)
  //       return () => clearTimeout(timer)
  //     }
  //   }
  // }, [])

  // Handle ESC key to close modal
  // useEffect(() => {
  //   const handleEscape = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape' && showChristmasModal) {
  //       setShowChristmasModal(false)
  //     }
  //   }
  //   
  //   if (showChristmasModal) {
  //     window.addEventListener('keydown', handleEscape)
  //     return () => window.removeEventListener('keydown', handleEscape)
  //   }
  // }, [showChristmasModal])

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <FeaturedJobs />
      {/* Hidden sections - accessible via top menu bar */}
      {/* <Events /> */}
      {/* <Employers /> */}
      <InstagramFeed />
      {/* <Resources /> */}
      <Blog />
      <Footer />

      {/* Christmas Event Modal - Hidden */}
      {/* <AnimatePresence>
        {showChristmasModal && (
          <>
            {/* Backdrop */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6"
              onClick={() => setShowChristmasModal(false)}
            >
              {/* Animated snowflakes in background - reduced on mobile for performance */}
              {/* {[...Array(isMobile ? 10 : 20)].map((_, i) => (
                <motion.div
                  key={`snowflake-${i}`}
                  className="absolute text-white/30 text-xl sm:text-2xl pointer-events-none"
                  style={{
                    left: `${(i * 5) % 100}%`,
                    top: `${-10 + (i * 7) % 20}%`,
                  }}
                  animate={{
                    y: [0, 1200],
                    x: [0, Math.sin(i) * (isMobile ? 40 : 80)],
                    rotate: [0, 360],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 6 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear",
                  }}
                >
                  ❄
                </motion.div>
              ))}

              {/* Modal */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative w-full max-w-[95vw] sm:max-w-2xl mx-auto"
                style={{ 
                  maxHeight: 'calc(100vh - 2rem)',
                  height: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glow effect behind modal - Christmas themed - hidden on mobile for performance */}
                {/* <motion.div
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="hidden sm:block absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-red-500/25 via-green-500/25 to-red-500/25 rounded-3xl blur-2xl sm:blur-3xl"
                />
                
                {/* Main modal container */}
                {/* <div className="relative bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 border-red-200/40 flex flex-col"
                  style={{ 
                    maxHeight: 'calc(100vh - 2rem)',
                    minHeight: 'auto'
                  }}
                >
                  
                  {/* Festive Christmas Header */}
                  {/* <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-green-600 overflow-hidden flex-shrink-0">
                    {/* Animated sparkles overlay */}
                    {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          className="absolute w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-lg"
                          style={{
                            left: `${12 + (i * 9)}%`,
                            top: `${25 + (i % 3) * 30}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [0.9, 1.3, 0.9],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>

                    {/* Close button */}
                    {/* <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      onClick={() => setShowChristmasModal(false)}
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-2.5 hover:bg-white/30 active:bg-white/40 rounded-lg transition-all duration-200 z-20 bg-white/20 backdrop-blur-sm touch-manipulation"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                    </motion.button>

                    {/* Header content */}
                    {/* <div className="relative z-10 pt-4 pb-4 sm:pt-6 sm:pb-6 md:pt-7 md:pb-7 px-3 sm:px-4 md:px-6 lg:px-8">
                      <div className="flex flex-col items-center justify-center text-center w-full">
                        {/* Icons */}
                        {/* <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 0.2, 
                            type: "spring", 
                            stiffness: 200,
                            damping: 15
                          }}
                          className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4"
                        >
                          <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                          >
                            <Gift className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-yellow-300 drop-shadow-lg" />
                          </motion.div>
                          <motion.div
                            animate={{ 
                              scale: [1, 1.15, 1],
                              rotate: [0, 180, 360]
                            }}
                            transition={{ 
                              duration: 3.5, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-yellow-300 drop-shadow-lg" />
                          </motion.div>
                        </motion.div>
                        
                        {/* Title */}
                        {/* <motion.h2
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3 drop-shadow-lg leading-tight px-2"
                        >
                          🎄 Merry Christmas! 🎄
                        </motion.h2>
                        
                        {/* Subtitle */}
                        {/* <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                          className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium drop-shadow-md px-2"
                        >
                          Special Holiday Wishes from The Gypsy Nurse
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Content Area - Scrollable */}
                  {/* <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 overflow-y-auto flex-1 bg-gradient-to-b from-white via-red-50/30 to-green-50/30 min-h-0"
                    style={{ 
                      maxHeight: 'calc(100vh - 200px)',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                      {/* Main message */}
                      {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-center"
                      >
                        <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed font-medium px-1">
                          This holiday season, The Gypsy Nurse community wants to express our heartfelt gratitude to all the amazing travel nurses and travel healthcare professionals who are part of our #1 travel nursing community.
                        </p>
                      </motion.div>

                      {/* Decorative divider with animated sparkles */}
                      {/* <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3 md:my-4"
                      >
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-400 to-red-600"></div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
                        </motion.div>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-green-400 to-green-600"></div>
                      </motion.div>

                      {/* Holiday message box */}
                      {/* <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                        className="bg-gradient-to-br from-red-50 via-white to-green-50 rounded-lg sm:rounded-xl p-3 sm:p-3.5 md:p-4 border-2 border-red-300/50 shadow-lg relative overflow-hidden"
                      >
                        {/* Animated background sparkles - reduced on mobile */}
                        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          {[...Array(isMobile ? 4 : 6)].map((_, i) => (
                            <motion.div
                              key={`box-sparkle-${i}`}
                              className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
                              style={{
                                left: `${18 + i * 15}%`,
                                top: `${30 + (i % 3) * 25}%`,
                              }}
                              animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.6, 1.1, 0.6],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            />
                          ))}
                        </div>
                        <div className="text-center space-y-1.5 sm:space-y-2 md:space-y-2.5 relative z-10">
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-red-600" />
                            </motion.div>
                            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight px-1">
                              🎁 Special Holiday Message
                            </h3>
                            <motion.div
                              animate={{ rotate: [360, 0] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-green-600" />
                            </motion.div>
                          </div>
                          <p className="text-gray-800 text-xs sm:text-sm md:text-base font-medium leading-relaxed px-1">
                            May your holidays be filled with joy, peace, and well-deserved rest. Thank you for being the heart of healthcare and for being part of The Gypsy Nurse community!
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence> */}
    </main>
  )
}

