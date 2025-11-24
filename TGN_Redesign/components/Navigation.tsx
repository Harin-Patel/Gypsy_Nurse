'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogOut, Bookmark, Lock, FileText, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useIsMobile } from '@/hooks/useIsMobile'
import toast from 'react-hot-toast'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  
  // Use real authentication
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  // Get page title for mobile
  const getPageTitle = () => {
    if (pathname === '/') return 'Home'
    if (pathname?.startsWith('/jobs')) return 'Jobs'
    if (pathname?.startsWith('/resources')) return 'Resources'
    if (pathname?.startsWith('/events')) return 'Events'
    if (pathname?.startsWith('/more')) return 'More'
    if (pathname?.startsWith('/login')) return isMobile ? 'Job Seeker Login' : 'Login'
    if (pathname?.startsWith('/register')) return 'Register'
    if (pathname?.startsWith('/agency-register')) return 'Create Agency Account'
    if (pathname?.startsWith('/agency-login')) return 'Agency Login'
    if (pathname?.startsWith('/recruiter-login')) return 'Recruiter Login'
    if (pathname?.startsWith('/admin-login')) return 'Admin Login'
    if (pathname?.startsWith('/profile')) return 'Profile'
    if (pathname?.startsWith('/applications')) return 'Applications'
    if (pathname?.startsWith('/bookmarks')) return 'Bookmarks'
    if (pathname?.startsWith('/change-password')) return 'Change Password'
    return 'The Gypsy Nurse'
  }

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    setShowProfileDropdown(false)
    // Explicitly redirect to job seeker login when logging out from main web app
    logout('/login')
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
      name: 'Find a job', 
      href: '/jobs',
      dropdown: [
        'View all jobs',
        'Jobs by State',
        'Nursing Specialties'
      ]
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
    if (isRoute || href.startsWith('/')) {
      window.location.href = href
    } else {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Backdrop for Profile Dropdown - Rendered at root level */}
      {showProfileDropdown && !isMobile && (
        <div 
          className="fixed inset-0 bg-transparent z-[40]" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}

      {/* Mobile Profile Dropdown */}
      <AnimatePresence>
        {showProfileDropdown && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[40]"
              onClick={() => setShowProfileDropdown(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 right-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-[50]"
            >
              {/* User Info Header */}
              <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-primary-50/50 to-purple-50/50">
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name || 'User'}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center ring-2 ring-primary-200">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-600">{user?.email || ''}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Link href="/profile" onClick={() => setShowProfileDropdown(false)}>
                  <button className="w-full px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-500" />
                    My Profile
                  </button>
                </Link>
                <Link href="/applications" onClick={() => setShowProfileDropdown(false)}>
                  <button className="w-full px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    My Applications
                  </button>
                </Link>
                <Link href="/bookmarks" onClick={() => setShowProfileDropdown(false)}>
                  <button className="w-full px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3">
                    <Bookmark className="w-4 h-4 text-gray-500" />
                    My Bookmarks
                  </button>
                </Link>
                <Link href="/change-password" onClick={() => setShowProfileDropdown(false)}>
                  <button className="w-full px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3">
                    <Lock className="w-4 h-4 text-gray-500" />
                    Change Password
                  </button>
                </Link>
                <div className="my-2 h-px bg-gray-200"></div>
                <button 
                  onClick={() => {
                    setShowLogoutConfirm(true)
                    setShowProfileDropdown(false)
                  }}
                  className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full Width Navigation Bar with Glass Effect */}
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ${
          isMobile
            ? 'bg-white border-b border-gray-200 shadow-sm py-3'
            : isScrolled 
              ? 'bg-white/80 backdrop-blur-2xl shadow-2xl py-3' 
              : 'bg-white/90 backdrop-blur-xl shadow-lg py-4'
        }`}
        style={!isMobile ? {
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        } : {}}
      >
        <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4' : 'px-4 sm:px-6 lg:px-8'}`}>
          {isMobile ? (
            /* Mobile App Standard Navigation */
            <div className="flex items-center justify-between h-14">
              {/* Left Side - Back Button or Logo */}
              {pathname?.startsWith('/login') || pathname?.startsWith('/register') || pathname?.startsWith('/agency-register') || pathname?.startsWith('/agency-login') || pathname?.startsWith('/recruiter-login') || pathname?.startsWith('/admin-login') || pathname?.startsWith('/forgot-password') || pathname?.startsWith('/change-password') ? (
                <button
                  onClick={() => {
                    // Always redirect to /more section for login/register pages
                    if (pathname?.startsWith('/login') || pathname?.startsWith('/agency-register') || pathname?.startsWith('/agency-login') || pathname?.startsWith('/recruiter-login') || pathname?.startsWith('/admin-login')) {
                      router.push('/more')
                    } else {
                      router.back()
                    }
                  }}
                  className="p-2 -ml-2 rounded-lg active:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
              ) : (
                <Link href="/">
                  <img 
                    src="/logo.svg" 
                    alt="The Gypsy Nurse Logo" 
                    className="h-10 w-auto"
                  />
                </Link>
              )}

              {/* Centered Page Title */}
              <h1 className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
                {getPageTitle()}
              </h1>

              {/* Right Side - Profile or Login (Hidden on auth pages) */}
              {!(pathname?.startsWith('/login') || pathname?.startsWith('/register') || pathname?.startsWith('/agency-register') || pathname?.startsWith('/agency-login') || pathname?.startsWith('/recruiter-login') || pathname?.startsWith('/admin-login') || pathname?.startsWith('/forgot-password') || pathname?.startsWith('/change-password')) && (
                <div className="flex items-center">
                  {isLoading ? (
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                  ) : isAuthenticated ? (
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className="relative"
                    >
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name || 'User'}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center ring-2 ring-primary-200">
                          {isMobile && user?.name ? (() => {
                            // Extract initials from name (first character of first name and first character of last name)
                            const nameParts = user.name.trim().split(/\s+/)
                            let initials = ''
                            if (nameParts.length >= 2) {
                              initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
                            } else if (nameParts.length === 1 && nameParts[0].length >= 2) {
                              initials = nameParts[0].substring(0, 2).toUpperCase()
                            } else if (nameParts.length === 1 && nameParts[0].length > 0) {
                              initials = nameParts[0][0].toUpperCase()
                            }
                            
                            return initials ? (
                              <span className="text-white font-semibold text-sm">{initials}</span>
                            ) : (
                              <User className="w-5 h-5 text-white" />
                            )
                          })() : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                      )}
                    </button>
                  ) : (
                    <Link href="/login">
                      <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center hover:from-primary-600 hover:to-primary-700 transition-colors shadow-sm">
                        <User className="w-5 h-5 text-white" />
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Desktop Navigation */
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
                  {item.href.startsWith('/') ? (
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
                      onClick={() => handleNavClick(item.href, item.href.startsWith('/'))}
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
                        style={{ zIndex: 101 }}
                      >
                        <div className="p-2">
                          {item.dropdown.map((subItem, idx) => {
                            let href = '#'
                            if (subItem === 'Advertise With Us') {
                              href = '/advertise-with-us'
                            } else if (subItem === 'View all jobs') {
                              href = '/jobs'
                            } else if (subItem === 'Jobs by State') {
                              href = '/jobs-by-state'
                            } else if (subItem === 'Nursing Specialties') {
                              href = '/nursing-specialties'
                            }
                            return (
                              <motion.a
                                key={subItem}
                                href={href}
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
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Auth Section - Show Profile or Login Buttons */}
            <div className="hidden lg:flex items-center space-x-3 py-1">
              {isLoading ? (
                /* Loading State */
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
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
                        src={user?.avatar || '/default-avatar.png'} 
                        alt={user?.name || 'User'}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-100 transition-all"
                      />
                    </div>
                    
                    {/* Username */}
                    <span className="relative z-10 text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                      {user?.name || 'User'}
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

                  {/* Profile Dropdown Menu - Desktop Only */}
                  <AnimatePresence>
                    {showProfileDropdown && !isMobile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-4 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
                        style={{ zIndex: 101 }}
                      >
                        {/* User Info Header */}
                        <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-primary-50/50 to-purple-50/50">
                          <div className="flex items-center gap-3">
                            <img 
                              src={user?.avatar || '/default-avatar.png'} 
                              alt={user?.name || 'User'}
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-200"
                            />
                            <div>
                              <p className="font-bold text-gray-900">{user?.name || 'User'}</p>
                              <p className="text-xs text-gray-600">{user?.email || ''}</p>
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
                            <span className="flex-1">Log Out</span>
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
                      style={{ zIndex: 101 }}
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

            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu - Slide from Left */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl"
              style={{
                paddingTop: 'env(safe-area-inset-top)',
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/logo.svg" 
                      alt="The Gypsy Nurse Logo" 
                      className="h-8 w-auto"
                    />
                    <span className="text-lg font-bold text-gray-900">Menu</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X size={24} className="text-gray-700" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.href.startsWith('/') ? (
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
                          onClick={() => handleNavClick(item.href, item.href.startsWith('/'))}
                        className="w-full text-left px-4 py-3 rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors"
                      >
                        {item.name}
                      </button>
                      )}
                      {item.dropdown && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((subItem) => {
                            let href = '#'
                            if (subItem === 'Advertise With Us') {
                              href = '/advertise-with-us'
                            } else if (subItem === 'View all jobs') {
                              href = '/jobs'
                            } else if (subItem === 'Jobs by State') {
                              href = '/jobs-by-state'
                            } else if (subItem === 'Nursing Specialties') {
                              href = '/nursing-specialties'
                            }
                            return (
                              <a
                                key={subItem}
                                href={href}
                                className="block px-4 py-2 text-sm text-primary-600 hover:text-primary-700"
                              >
                                {subItem}
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {!isLoading && (
                    <div className="pt-6 space-y-3">
                      {isAuthenticated ? (
                        /* Mobile Authenticated Menu */
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                            <img 
                              src={user?.avatar || '/default-avatar.png'} 
                              alt={user?.name || 'User'}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-200"
                            />
                            <div>
                              <p className="font-bold text-gray-900">{user?.name || 'User'}</p>
                              <p className="text-xs text-gray-600">{user?.email || ''}</p>
                            </div>
                          </div>
                          <Link href="/profile">
                            <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors flex items-center gap-3">
                              <User className="w-4 h-4" />
                              My Profile
                            </button>
                          </Link>
                          <Link href="/applications">
                            <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors flex items-center gap-3">
                              <FileText className="w-4 h-4" />
                              My Applications
                            </button>
                          </Link>
                          <Link href="/bookmarks">
                            <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors flex items-center gap-3">
                              <Bookmark className="w-4 h-4" />
                              My Bookmarks
                            </button>
                          </Link>
                          <Link href="/change-password">
                            <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors flex items-center gap-3">
                              <Lock className="w-4 h-4" />
                              Change Password
                            </button>
                          </Link>
                          <div className="my-2 h-px bg-gray-200"></div>
                          <button 
                            onClick={() => {
                              setShowLogoutConfirm(true)
                              setIsMobileMenuOpen(false)
                            }}
                            className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors flex items-center gap-3"
                          >
                            <LogOut className="w-4 h-4" />
                            Log Out
                          </button>
                        </div>
                      ) : (
                        /* Mobile Login/Register Buttons */
                        <>
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
                        </>
                      )}
                    </div>
                  )}
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
                      Log Out
                    </h3>
                    <p className="text-center text-gray-600 mb-6">
                      Are you sure you want to log out from your account?
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
                        <span className="relative z-10">Log Out</span>
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

