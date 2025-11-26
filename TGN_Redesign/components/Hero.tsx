'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, Briefcase, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function Hero() {
  const isMobile = useIsMobile()
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
    }
    if (location.trim()) {
      params.set('location', location.trim())
    }
    const queryString = params.toString()
    router.push(`/jobs${queryString ? `?${queryString}` : ''}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          initial={isMobile ? { scale: 1 } : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={isMobile ? { duration: 0 } : { duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/travel-nurse-mobile.png')`,
          }}
        >
          {/* Dark Gradient Overlay for White Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 via-40% to-gray-900/40"></div>
          
          {/* Subtle Brand Tint */}
          <div className="absolute inset-0 bg-primary-900/20"></div>
        </motion.div>
        
        {/* Animated Accents - Hidden on Mobile */}
        {!isMobile && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"
            />
          </>
        )}
        
        {/* Decorative Shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-tr from-accent-300/10 to-primary-300/10 rounded-full blur-2xl"></div>
        
        {/* Floating Healthcare Icons - Hidden on Mobile */}
        {!isMobile && (
          <>
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/40 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
                <path d="M12 2v20M2 12h20"></path>
              </svg>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/5 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 10, 0], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 right-1/6 w-14 h-14 bg-white/35 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-600">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </motion.div>
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-6rem)]">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start h-full pt-8">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/30"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white">
                600,000+ Active Travel Nurses
              </span>
            </motion.div>

            <motion.h1
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
            >
              Manage your{' '}
              <span className="text-primary-400">entire travel</span> career, here.
            </motion.h1>

            <motion.p
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { delay: 0.4 }}
              className="text-xl text-gray-200 leading-relaxed"
            >
              Join the #1 travel nursing community. Discover opportunities, connect with peers, and access unlimited resources.
            </motion.p>

            {/* Search Bar */}
            <motion.form
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { delay: 0.5 }}
              onSubmit={handleSearch}
              className="bg-white/95 backdrop-blur-lg rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-xl border border-white/20"
            >
              <div className="flex-1 flex items-center space-x-2 px-4">
                <Search className="text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none py-3 text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <div className="flex-1 flex items-center space-x-2 px-4 border-t sm:border-t-0 sm:border-l border-gray-300">
                <MapPin className="text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="City, state, or zip..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none py-3 text-gray-900 placeholder-gray-500"
                />
              </div>

              <motion.button
                whileHover={isMobile ? undefined : { scale: 1.05 }}
                whileTap={isMobile ? { scale: 0.98 } : { scale: 0.95 }}
                type="submit"
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>Search Jobs</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.form>

            {/* Stats */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-6"
            >
              {[
                { value: '10K+', label: 'Active Jobs' },
                { value: '500+', label: 'Employers' },
                { value: '4.9★', label: 'Rating' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={isMobile ? undefined : { scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary-400">{stat.value}</div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative hidden xl:block">
            <div className="relative w-full h-[600px]">
              {/* Floating Card 1 */}
              <motion.div
                animate={isMobile ? { y: 0 } : { y: [0, -20, 0] }}
                transition={isMobile ? { duration: 0 } : { duration: 4, repeat: Infinity }}
                className="absolute top-0 left-0 glass-effect rounded-2xl p-6 w-64 shadow-2xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">ER RN</div>
                    <div className="text-sm text-gray-500">Las Vegas, NV</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weekly Pay</span>
                    <span className="font-semibold text-primary-600">$2,850</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">13 weeks</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                animate={isMobile ? { y: 0 } : { y: [0, 20, 0] }}
                transition={isMobile ? { duration: 0 } : { duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-40 right-0 glass-effect rounded-2xl p-6 w-64 shadow-2xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">ICU RN</div>
                    <div className="text-sm text-gray-500">Miami, FL</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weekly Pay</span>
                    <span className="font-semibold text-primary-600">$3,100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">8 weeks</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3 */}
              <motion.div
                animate={isMobile ? { y: 0 } : { y: [0, -15, 0] }}
                transition={isMobile ? { duration: 0 } : { duration: 4.5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 glass-effect rounded-2xl p-6 w-64 shadow-2xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Med-Surg RN</div>
                    <div className="text-sm text-gray-500">Chicago, IL</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weekly Pay</span>
                    <span className="font-semibold text-primary-600">$2,650</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">13 weeks</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      {!isMobile && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}

