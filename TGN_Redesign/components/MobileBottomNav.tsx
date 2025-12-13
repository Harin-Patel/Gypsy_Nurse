'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  MoreVertical,
  ChevronRight,
  X,
  User,
  LogOut,
  Bookmark,
  Lock,
  FileText,
  Building2
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useIsMobile } from '@/hooks/useIsMobile'

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  children?: NavItem[]
}

export default function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()
  const { user, isAuthenticated, logout } = useAuth()
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't show on desktop
  if (!isMobile) return null

  // Don't show on certain pages (login, register, etc.)
  const hiddenPages = ['/login', '/register', '/agency-login', '/agency-register', '/recruiter-login', '/admin-login', '/forgot-password', '/profile']
  if (hiddenPages.some(page => pathname?.startsWith(page))) return null

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    logout('/login')
  }

  // Resources items from hamburger menu
  const resourcesItems: NavItem[] = [
    { id: 'blog', label: 'Blog', icon: BookOpen, href: '/articles' },
    { id: 'compact-license', label: 'Compact License', icon: BookOpen, href: '/resources/compact-license' },
    { id: 'continuing-education', label: 'Continuing Education', icon: BookOpen, href: '#resources' },
    { id: 'discounts', label: 'Discounts', icon: BookOpen, href: '#resources' },
    { id: 'faqs', label: 'FAQs', icon: BookOpen, href: '#resources' },
    { id: 'hospital-directory', label: 'Hospital Directory', icon: BookOpen, href: '#resources' },
    { id: 'housing', label: 'Housing', icon: BookOpen, href: '#resources' },
    { id: 'mentors', label: 'Mentors', icon: BookOpen, href: '#resources' },
    { id: 'member-benefits', label: 'Member Benefits', icon: BookOpen, href: '#resources' },
    { id: 'nursing-boards', label: 'Nursing Boards', icon: BookOpen, href: '#resources' },
    { id: 'podcast', label: 'Podcast', icon: BookOpen, href: '#resources' },
    { id: 'travel-nurse-101', label: 'Travel Nurse 101', icon: BookOpen, href: '#resources' },
    { id: 'agencies', label: 'Agencies', icon: BookOpen, href: '#resources' },
    { id: 'professionals', label: 'Professionals', icon: BookOpen, href: '#resources' },
  ]

  // Events items from hamburger menu
  const eventsItems: NavItem[] = [
    { id: 'event-calendar', label: 'Event Calendar', icon: Calendar, href: '#events' },
    { id: 'event-recaps', label: 'Event Recaps', icon: Calendar, href: '#events' },
    { id: 'submit-event', label: 'Submit an Event', icon: Calendar, href: '#events' },
    { id: 'travcon', label: 'TravCon', icon: Calendar, href: '#events' },
  ]

  // More section items (For Employers + Profile items)
  const moreItems: NavItem[] = [
    { id: 'advertise', label: 'Advertise With Us', icon: Building2, href: '/advertise-with-us' },
    { id: 'benefits', label: 'Benefits', icon: Building2, href: '#employers' },
    { id: 'contact', label: 'Contact Us', icon: Building2, href: '#employers' },
    { id: 'maximize-roi', label: 'Maximize ROI', icon: Building2, href: '#employers' },
    { id: 'sponsors', label: 'Sponsors', icon: Building2, href: '#employers' },
  ]

  const navSections = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: '/',
      active: pathname === '/',
    },
    {
      id: 'jobs',
      label: 'Jobs',
      icon: Briefcase,
      href: '/jobs',
      active: pathname?.startsWith('/jobs'),
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: BookOpen,
      children: resourcesItems,
      active: pathname?.startsWith('/resources'),
    },
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      children: eventsItems,
      active: pathname?.startsWith('/events'),
    },
    {
      id: 'more',
      label: 'More',
      icon: MoreVertical,
      children: moreItems,
      active: pathname?.startsWith('/more'),
    },
  ]

  const handleSectionClick = (section: typeof navSections[0]) => {
    if (section.href) {
      // Navigate to href using router for client-side navigation
      router.push(section.href)
    } else if (section.children) {
      // For Resources, Events, and More, navigate to full page
      if (section.id === 'resources') {
        router.push('/resources')
      } else if (section.id === 'events') {
        router.push('/events')
      } else if (section.id === 'more') {
        router.push('/more')
      } else {
        // For other sections, toggle bottom sheet
        setActiveSection(activeSection === section.id ? null : section.id)
      }
    }
  }

  const handleChildClick = (item: NavItem) => {
    if (item.href) {
      if (item.href.startsWith('#')) {
        // Scroll to section
        const element = document.querySelector(item.href)
        element?.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Navigate to page
        window.location.href = item.href
      }
      setActiveSection(null)
    }
  }

  // Bottom Navigation Bar and Overlays (to be portaled)
  const bottomNavContent = (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Bottom Navigation Bar */}
      <div 
        className="lg:hidden"
        data-mobile-bottom-nav
        style={{
          position: 'relative',
          width: '100%',
          pointerEvents: 'auto',
          transform: 'translateZ(0)',
          willChange: 'transform',
          WebkitTransform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitPerspective: 1000,
          perspective: 1000,
          margin: 0,
          padding: 0,
        }}
      >
        {/* Safe area padding for devices with notches */}
        <div 
          className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl"
          style={{
            paddingBottom: `calc(1rem + env(safe-area-inset-bottom))`,
            paddingLeft: 'env(safe-area-inset-left)',
            paddingRight: 'env(safe-area-inset-right)',
          }}
        >
          <div className="flex items-center justify-around px-2 py-2">
            {navSections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section)}
                  className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${
                    section.active
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{section.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Section Overlay - Resources, Events, More */}
      <AnimatePresence>
        {activeSection && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setActiveSection(null)}
            />

            {/* Section Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-hidden"
              style={{
                paddingBottom: `calc(env(safe-area-inset-bottom) + 1rem)`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">
                  {navSections.find(s => s.id === activeSection)?.label}
                </h3>
                <button
                  onClick={() => setActiveSection(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
                {activeSection === 'resources' && (
                  <div className="p-4 space-y-2">
                    {resourcesItems.map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleChildClick(item)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <ItemIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                        </button>
                      )
                    })}
                  </div>
                )}

                {activeSection === 'events' && (
                  <div className="p-4 space-y-2">
                    {eventsItems.map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleChildClick(item)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <ItemIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                        </button>
                      )
                    })}
                  </div>
                )}

                {activeSection === 'more' && (
                  <div className="p-4 space-y-2">
                    {/* For Employers Items */}
                    {moreItems.map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleChildClick(item)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <ItemIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                        </button>
                      )
                    })}

                    {/* Divider */}
                    {isAuthenticated && (
                      <>
                        <div className="my-4 h-px bg-gray-200" />
                        
                        {/* Profile Items */}
                        <Link href="/profile">
                          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-all group">
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                              <span className="font-medium">My Profile</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                          </button>
                        </Link>

                        <Link href="/applications">
                          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-all group">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                              <span className="font-medium">My Applications</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                          </button>
                        </Link>

                        <Link href="/bookmarks">
                          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-all group">
                            <div className="flex items-center gap-3">
                              <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                              <span className="font-medium">My Bookmarks</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                          </button>
                        </Link>

                        <Link href="/change-password">
                          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition-all group">
                            <div className="flex items-center gap-3">
                              <Lock className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                              <span className="font-medium">Change Password</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                          </button>
                        </Link>

                        <div className="my-4 h-px bg-gray-200" />

                        <button
                          onClick={() => setShowLogoutConfirm(true)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Log Out</span>
                          </div>
                        </button>
                      </>
                    )}

                    {!isAuthenticated && (
                      <>
                        <div className="my-4 h-px bg-gray-200" />
                        <div className="px-4 space-y-2">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Log in:</div>
                          <Link href="/login" className="block">
                            <button className="w-full px-4 py-3 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium transition-all">
                              For Job Seeker
                            </button>
                          </Link>
                          <Link href="/agency-login" className="block">
                            <button className="w-full px-4 py-3 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium transition-all">
                              For Agency
                            </button>
                          </Link>
                          <Link href="/recruiter-login" className="block">
                            <button className="w-full px-4 py-3 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium transition-all">
                              For Recruiter
                            </button>
                          </Link>
                          <Link href="/admin-login" className="block">
                            <button className="w-full px-4 py-3 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium transition-all">
                              For Admin
                            </button>
                          </Link>
                          <Link href="/register" className="block mt-3">
                            <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold transition-all">
                              Join Gypsy Nurse
                            </button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="w-full max-w-md pointer-events-auto bg-white rounded-3xl shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-center mb-2">Log Out</h3>
                <p className="text-center text-gray-600 mb-6">
                  Are you sure you want to log out?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold"
                  >
                    Log Out
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )

  // Use portal to render bottom nav at document body level to avoid any parent transform issues
  if (!mounted) {
    // Return spacer only during SSR/hydration
    return (
      <div 
        className="lg:hidden"
        style={{
          height: `calc(5rem + env(safe-area-inset-bottom))`,
        }}
      />
    )
  }
  
  // Ensure we have a valid portal target
  const portalTarget = typeof document !== 'undefined' ? document.body : null
  
  if (!portalTarget) {
    return (
      <div 
        className="lg:hidden"
        style={{
          height: `calc(5rem + env(safe-area-inset-bottom))`,
        }}
      />
    )
  }
  
  return (
    <>
      {/* Spacer in normal flow */}
      <div 
        className="lg:hidden"
        style={{
          height: `calc(5rem + env(safe-area-inset-bottom))`,
        }}
      />
      {/* Portal bottom nav directly to body to ensure it's not affected by any parent containers */}
      {createPortal(bottomNavContent, portalTarget)}
    </>
  )
}

