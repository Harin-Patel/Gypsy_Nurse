'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { 
      name: 'Search Jobs', 
      href: '#jobs'
    },
    { 
      name: 'Resources', 
      href: '#resources',
      dropdown: [
        'Blog',
        'Compact License',
        'Continuing Education',
        'Discounts',
        'FAQs',
        'Hospital Directory',
        'Housing',
        'Mentors',
        'Member Benefits',
        'Nursing Boards',
        'Podcast',
        'Travel Nurse 101',
        'Agencies',
        'Professionals'
      ]
    },
    { 
      name: 'Events', 
      href: '#events',
      dropdown: [
        'Event Calendar',
        'Event Recaps',
        'Submit an Event',
        'TravCon'
      ]
    },
    { 
      name: 'For Employers', 
      href: '#employers',
      dropdown: [
        'Advertise With Us',
        'Benefits',
        'Contact Us',
        'Maximize ROI',
        'Sponsors'
      ]
    },
  ]

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Full Width Navigation Bar with Glass Effect */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-2xl shadow-2xl py-3' 
            : 'bg-white/90 backdrop-blur-xl shadow-lg py-4'
        } border-b border-white/20`}
        style={{
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
              {/* Logo with Glow Effect */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center cursor-pointer relative group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-primary-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <img 
                  src="/logo.svg" 
                  alt="The Gypsy Nurse Logo" 
                  className={`relative z-10 transition-all duration-300 ${
                    isScrolled ? 'h-10' : 'h-12'
                  } w-auto`}
                />
              </motion.div>

            {/* Desktop Navigation with Fancy Effects */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative py-1"
                  onMouseEnter={() => {
                    item.dropdown && setActiveDropdown(item.name)
                    setHoveredItem(item.name)
                  }}
                  onMouseLeave={() => {
                    setActiveDropdown(null)
                    setHoveredItem(null)
                  }}
                >
                  <motion.button
                    onClick={() => handleNavClick(item.href)}
                    className="relative text-gray-700 hover:text-primary-600 font-semibold transition-colors duration-300 flex items-center space-x-1 px-4 py-2.5 group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {item.dropdown && (
                      <motion.div
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={16} className="relative z-10" />
                      </motion.div>
                    )}
                    
                    {/* Animated Underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredItem === item.name ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Hover Glow */}
                    <motion.div
                      className="absolute -inset-1 bg-primary-50 rounded-xl -z-10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: hoveredItem === item.name ? 1 : 0,
                        scale: hoveredItem === item.name ? 1 : 0.9
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                  
                  {/* Enhanced Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-4 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden max-h-[70vh] overflow-y-auto"
                        style={{ zIndex: 100 }}
                      >
                        <div className="p-2">
                          {item.dropdown.map((subItem, idx) => (
                            <motion.a
                              key={subItem}
                              href="#"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                              className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium group"
                              whileHover={{ x: 4 }}
                            >
                              <span className="flex items-center justify-between">
                                {subItem}
                                <motion.span
                                  className="opacity-0 group-hover:opacity-100"
                                  initial={{ x: -5 }}
                                  whileHover={{ x: 0 }}
                                >
                                  →
                                </motion.span>
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Fancy Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3 py-1">
              {/* Log in Dropdown with Gradient Border */}
              <div 
                className="relative"
                onMouseEnter={() => setShowLoginDropdown(true)}
                onMouseLeave={() => setShowLoginDropdown(false)}
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="relative px-6 py-2.5 text-gray-700 font-semibold transition-all duration-200 ease-out flex items-center space-x-2 rounded-xl border-2 border-gray-200 bg-white group overflow-visible hover:text-primary-600 hover:border-primary-300 hover:bg-primary-50/50 hover:shadow-md"
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-xl"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Log in</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ rotate: showLoginDropdown ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>
                
                {/* Enhanced Login Dropdown Menu */}
                <AnimatePresence>
                  {showLoginDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
                      style={{ zIndex: 100 }}
                    >
                      <div className="p-2">
                        {['For Job Seeker', 'For Agency', 'For Recruiter', 'For Admin'].map((option, idx) => (
                          <motion.a
                            key={option}
                            href="#"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium group"
                            whileHover={{ x: 4 }}
                          >
                            <span className="flex items-center justify-between">
                              {option}
                              <motion.span
                                className="opacity-0 group-hover:opacity-100"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Fancy Join Button with Gradient and Sparkle */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-2.5 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 ease-out overflow-visible group"
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Sparkle Icon */}
                <span className="relative z-10 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span>Join Gypsy Nurse</span>
                </span>
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none rounded-xl"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.button>
            </div>

            {/* Fancy Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 hover:from-primary-100 hover:to-primary-200/50 border border-primary-200 text-primary-600 transition-all shadow-md hover:shadow-lg"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 glass-effect z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold gradient-text">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left px-4 py-3 rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors"
                      >
                        {item.name}
                      </button>
                      {item.dropdown && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem}
                              href="#"
                              className="block px-4 py-2 text-sm text-primary-600 hover:text-primary-700"
                            >
                              {subItem}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-6 space-y-3">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-700 px-4">Log in:</div>
                      <a
                        href="#"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors border border-primary-300"
                      >
                        For Job Seeker
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors border border-primary-300"
                      >
                        For Agency
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors border border-primary-300"
                      >
                        For Recruiter
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors border border-primary-300"
                      >
                        For Admin
                      </a>
                    </div>
                    <button className="w-full btn-primary">
                      Join Gypsy Nurse
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

