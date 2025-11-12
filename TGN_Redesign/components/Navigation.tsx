'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogOut, Bookmark, Lock, FileText } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  
  // Use real authentication
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    setShowProfileDropdown(false)
    logout()
  }

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
      href: '/jobs',
      isRoute: true
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

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setIsMobileMenuOpen(false)
    if (isRoute) {
      window.location.href = href
    } else {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Backdrop for Profile Dropdown - Rendered at root level */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 bg-transparent z-[45]" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}

      {/* Full Width Navigation Bar with Glass Effect */}
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
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
              {/* Logo with Subtle Tilt Effect */}
              <Link href="/">
              <motion.div
                whileHover={{ rotateY: 5, rotateZ: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center cursor-pointer relative overflow-hidden rounded-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Shine Effect on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ x: '100%', opacity: 1 }}
                  transition={{
                    duration: 0.6,
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
              </Link>

            {/* Desktop Navigation with Fancy Effects */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <div
                  key={item.name}
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
                  {item.isRoute ? (
                    <Link href={item.href}>
                      <motion.div
                        className="relative text-gray-700 hover:text-primary-600 font-semibold transition-colors duration-300 flex items-center space-x-1 px-4 py-2.5 group cursor-pointer"
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
                        
                        {/* Glass Hover Effect */}
                        <motion.div
                          className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-xl border border-primary-200/50 shadow-lg -z-10 overflow-hidden"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ 
                            opacity: hoveredItem === item.name ? 1 : 0,
                            scale: hoveredItem === item.name ? 1 : 0.9
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Shine Effect */}
                          {hoveredItem === item.name && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{
                                duration: 0.6,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </motion.div>
                        
                        {/* Subtle Gradient Overlay */}
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-xl -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: hoveredItem === item.name ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </Link>
                  ) : (
                  <motion.button
                      onClick={() => handleNavClick(item.href, item.isRoute)}
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
                    
                    {/* Glass Hover Effect */}
                    <motion.div
                      className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-xl border border-primary-200/50 shadow-lg -z-10 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: hoveredItem === item.name ? 1 : 0,
                        scale: hoveredItem === item.name ? 1 : 0.9
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Shine Effect */}
                      {hoveredItem === item.name && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.div>
                    
                    {/* Subtle Gradient Overlay */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-xl -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredItem === item.name ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  )}
                  
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
                </div>
              ))}
            </div>

            {/* Auth Section - Show Profile or Login Buttons */}
            <div className="hidden lg:flex items-center space-x-3 py-1">
              {isAuthenticated ? (
                /* Profile Dropdown */
                <div className="relative">
                  <motion.button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    onMouseEnter={() => setIsProfileHovered(true)}
                    onMouseLeave={() => setIsProfileHovered(false)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-3 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl transition-all shadow-sm group"
                  >
                    {/* Profile Picture */}
                    <div className="relative z-10">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-100 transition-all"
                      />
                    </div>
                    
                    {/* Username */}
                    <span className="relative z-10 text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                      {user.name}
                    </span>
                    
                    {/* Chevron */}
                    <motion.div
                      className="relative z-10"
                      animate={{ rotate: showProfileDropdown ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} className="text-gray-500" />
                    </motion.div>
                    
                    {/* Glass Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-xl border-2 border-primary-200/50 shadow-lg -z-10 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: isProfileHovered ? 1 : 0,
                        scale: isProfileHovered ? 1 : 0.9
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Shine Effect */}
                      {isProfileHovered && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.div>
                    
                    {/* Subtle Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-xl -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: isProfileHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {showProfileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-4 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-[60]"
                      >
                        {/* User Info Header */}
                        <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-primary-50/50 to-purple-50/50">
                          <div className="flex items-center gap-3">
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-200"
                            />
                            <div>
                              <p className="font-bold text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link href="/profile">
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0 }}
                              className="w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3 group"
                              whileHover={{ x: 4 }}
                            >
                              <User className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors" />
                              <span className="flex-1">My Profile</span>
                              <motion.span
                                className="opacity-0 group-hover:opacity-100 text-primary-600"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </motion.button>
                          </Link>

                          <Link href="/applications" className="block">
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 }}
                              className="w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3 group"
                              whileHover={{ x: 4 }}
                            >
                              <FileText className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors" />
                              <span className="flex-1">My Applications</span>
                              <motion.span
                                className="opacity-0 group-hover:opacity-100 text-primary-600"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </motion.button>
                          </Link>

                          <Link href="/bookmarks">
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                              className="w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3 group"
                              whileHover={{ x: 4 }}
                            >
                              <Bookmark className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors" />
                              <span className="flex-1">My Bookmarks</span>
                              <motion.span
                                className="opacity-0 group-hover:opacity-100 text-primary-600"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </motion.button>
                          </Link>

                          <Link href="/change-password">
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 }}
                              className="w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3 group"
                              whileHover={{ x: 4 }}
                            >
                              <Lock className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors" />
                              <span className="flex-1">Change Password</span>
                              <motion.span
                                className="opacity-0 group-hover:opacity-100 text-primary-600"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </motion.button>
                          </Link>

                          <div className="my-2 h-px bg-gray-200"></div>

                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => {
                              setShowLogoutConfirm(true)
                              setShowProfileDropdown(false)
                            }}
                            className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3"
                            whileHover={{ x: 4 }}
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="flex-1">Sign Out</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Login Buttons */
                <>
              {/* Log in Dropdown with Glass Effect */}
              <div 
                className="relative"
                onMouseEnter={() => setShowLoginDropdown(true)}
                onMouseLeave={() => setShowLoginDropdown(false)}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-6 py-2.5 text-gray-700 font-semibold transition-all duration-200 flex items-center space-x-2 rounded-xl border-2 border-gray-200 bg-white group overflow-hidden hover:text-primary-600"
                >
                  <span className="relative z-10">Log in</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ rotate: showLoginDropdown ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                  
                  {/* Glass Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-xl border-2 border-primary-200/50 shadow-lg -z-10 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ 
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  
                  {/* Subtle Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
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
                        <Link href="/login">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0 }}
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium group cursor-pointer"
                            whileHover={{ x: 4 }}
                          >
                            <span className="flex items-center justify-between">
                              For Job Seeker
                              <motion.span
                                className="opacity-0 group-hover:opacity-100"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </span>
                          </motion.div>
                        </Link>
                        <Link href="/agency-login">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 }}
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium group cursor-pointer"
                            whileHover={{ x: 4 }}
                          >
                            <span className="flex items-center justify-between">
                              For Agency
                              <motion.span
                                className="opacity-0 group-hover:opacity-100"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </span>
                          </motion.div>
                        </Link>
                        <Link href="/recruiter-login">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium group cursor-pointer"
                            whileHover={{ x: 4 }}
                          >
                            <span className="flex items-center justify-between">
                              For Recruiter
                              <motion.span
                                className="opacity-0 group-hover:opacity-100"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </span>
                          </motion.div>
                        </Link>
                        <Link href="/admin-login">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                            className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium group cursor-pointer"
                            whileHover={{ x: 4 }}
                          >
                            <span className="flex items-center justify-between">
                              For Admin
                              <motion.span
                                className="opacity-0 group-hover:opacity-100"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </span>
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Fancy Join Button with Gradient and Sparkle */}
              <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg transition-all overflow-hidden group"
              >
                {/* Content */}
                <span className="relative z-10">Join Gypsy Nurse</span>
                
                {/* Glass Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl -z-10 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ 
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                {/* Darker Gradient Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              </Link>
              </>
              )}
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
      </nav>

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
                      {item.isRoute ? (
                        <Link href={item.href}>
                          <div
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-left px-4 py-3 rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors cursor-pointer"
                          >
                            {item.name}
                          </div>
                        </Link>
                      ) : (
                      <button
                          onClick={() => handleNavClick(item.href, item.isRoute)}
                        className="w-full text-left px-4 py-3 rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors"
                      >
                        {item.name}
                      </button>
                      )}
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
                      <Link
                        href="/login"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors border border-primary-300"
                      >
                        For Job Seeker
                      </Link>
                      <Link
                        href="/agency-login"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors border border-primary-300"
                      >
                        For Agency
                      </Link>
                      <Link
                        href="/recruiter-login"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors border border-primary-300"
                      >
                        For Recruiter
                      </Link>
                      <Link
                        href="/admin-login"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors border border-primary-300"
                      >
                        For Admin
                      </Link>
                    </div>
                    <Link href="/register">
                    <button className="w-full btn-primary">
                      Join Gypsy Nurse
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowLogoutConfirm(false)}
            />

            {/* Modal Container - Centered */}
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="w-full max-w-md pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glassmorphic Card */}
                <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-20 pointer-events-none" />
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-3xl p-8">
                    {/* Icon with Gradient Background */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-red-100 rounded-2xl blur-xl opacity-60" />
                        <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <LogOut className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Sign Out
                    </h3>
                    <p className="text-center text-gray-600 mb-6">
                      Are you sure you want to sign out from your account?
                    </p>

                    {/* Decorative Divider */}
                    <div className="mb-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowLogoutConfirm(false)}
                        className="flex-1 px-6 py-3.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all shadow-sm"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="relative flex-1 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all shadow-lg overflow-hidden group"
                      >
                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-200%', '200%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                          }}
                        />
                        <span className="relative z-10">Sign Out</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

