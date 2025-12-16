'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2,
  ChevronRight,
  User,
  FileText,
  Bookmark,
  Lock,
  LogOut,
  UserCircle,
  Briefcase,
  Users,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import MobileBottomNav from '@/components/MobileBottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useAuth } from '@/contexts/AuthContext'

// For Employers section
const forEmployersItems = [
  {
    id: 'advertise',
    title: 'Advertise With Us',
    icon: Building2,
    description: 'Promote your job openings to thousands of travel nurses',
    href: '/advertise-with-us',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'benefits',
    title: 'Benefits',
    icon: Briefcase,
    description: 'Discover the benefits of partnering with The Gypsy Nurse',
    href: '#employers',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: UserCircle,
    description: 'Get in touch with our team for employer inquiries',
    href: '#employers',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'maximize-roi',
    title: 'Maximize ROI',
    icon: Briefcase,
    description: 'Learn how to maximize your return on investment',
    href: '#employers',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'sponsors',
    title: 'Sponsors',
    icon: Users,
    description: 'Become a sponsor and support the travel nursing community',
    href: '#employers',
    color: 'from-orange-500 to-red-500',
  },
]

// Authentication sections (when not authenticated)
const authSections = [
  {
    id: 'job-seeker-login',
    title: 'For Job Seeker',
    icon: User,
    description: 'Log in to access your job seeker account',
    href: '/login',
    color: 'from-primary-500 to-primary-600',
  },
  {
    id: 'agency-login',
    title: 'For Agency',
    icon: Building2,
    description: 'Log in to your agency account',
    href: '/agency-login',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'recruiter-login',
    title: 'For Recruiter',
    icon: UserCircle,
    description: 'Log in to your recruiter account',
    href: '/recruiter-login',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'admin-login',
    title: 'For Admin',
    icon: Shield,
    description: 'Log in to your admin account',
    href: '/admin-login',
    color: 'from-red-500 to-pink-500',
  },
]

// Profile sections (when authenticated)
const profileSections = [
  {
    id: 'profile',
    title: 'My Profile',
    icon: User,
    description: 'View and edit your profile information',
    href: '/profile',
    color: 'from-primary-500 to-primary-600',
  },
  {
    id: 'applications',
    title: 'My Applications',
    icon: FileText,
    description: 'Track your job applications and status',
    href: '/applications',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'bookmarks',
    title: 'My Bookmarks',
    icon: Bookmark,
    description: 'View your saved job bookmarks',
    href: '/bookmarks',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'change-password',
    title: 'Change Password',
    icon: Lock,
    description: 'Update your account password',
    href: '/change-password',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function MorePage() {
  const isMobile = useIsMobile()
  const { isAuthenticated, logout } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleItemClick = (href: string) => {
    if (href.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
    // For actual hrefs, Link component will handle navigation
  }

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    logout('/login')
  }

  const renderSection = (items: typeof forEmployersItems, sectionTitle: string) => (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">{sectionTitle}</h2>
      <div className={`${isMobile ? 'space-y-3' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
        {items.map((item, index) => {
          const Icon = item.icon
          const content = (
            <>
              {item.href.startsWith('#') ? (
                <motion.button
                  onClick={() => handleItemClick(item.href)}
                  className={`w-full ${isMobile ? 'active:scale-[0.98]' : ''}`}
                  whileTap={isMobile ? { scale: 0.98 } : undefined}
                >
                  {isMobile ? (
                    <div 
                      className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-4 border border-white/80 shadow-lg active:shadow-xl transition-all overflow-hidden"
                      style={{
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 active:opacity-5 transition-opacity duration-300`} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 active:opacity-15 transition-opacity duration-300 blur-md`} />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 opacity-0 active:opacity-100 transition-opacity duration-300 blur-sm" />
                      
                      <div className="relative flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="relative w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shadow-sm active:shadow-md transition-all active:scale-105">
                            <Icon className="w-6 h-6 text-primary-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 mb-1 text-left active:text-primary-700 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-snug text-left line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-5 border border-white/80 shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                      <div className="relative flex flex-col">
                        <div className="relative mb-4">
                          <div className="relative w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                            <Icon className="w-7 h-7 text-primary-600" />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors text-left">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-left">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.button>
              ) : (
                <Link href={item.href} className="block">
                  {isMobile ? (
                    <div 
                      className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-4 border border-white/80 shadow-lg active:shadow-xl transition-all overflow-hidden"
                      style={{
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 active:opacity-5 transition-opacity duration-300`} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 active:opacity-15 transition-opacity duration-300 blur-md`} />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 opacity-0 active:opacity-100 transition-opacity duration-300 blur-sm" />
                      
                      <div className="relative flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="relative w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shadow-sm active:shadow-md transition-all active:scale-105">
                            <Icon className="w-6 h-6 text-primary-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 mb-1 text-left active:text-primary-700 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-snug text-left line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-5 border border-white/80 shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                      <div className="relative flex flex-col">
                        <div className="relative mb-4">
                          <div className="relative w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                            <Icon className="w-7 h-7 text-primary-600" />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors text-left">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-left">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </Link>
              )}
            </>
          )
          
          // Use regular div on mobile to prevent blinking, motion.div on desktop
          return isMobile ? (
            <div key={item.id}>
              {content}
            </div>
          ) : (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              {content}
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Desktop Header */}
      {!isMobile && (
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">More</h1>
            <p className="text-xl text-gray-600">Access additional features and account settings</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div 
        className={`${isMobile ? 'px-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'}`}
        style={isMobile ? {
          paddingTop: `calc(8.7rem + env(safe-area-inset-top))`,
          paddingBottom: `0`,
          marginTop: `calc(-2.5rem)`,
          marginBottom: `calc(-3rem - env(safe-area-inset-bottom))`,
        } : {}}
      >
        {/* Authentication Sections (when not authenticated) */}
        {!isAuthenticated && (
          <>
            {renderSection(authSections, 'Log In')}
            {/* Join Gypsy Nurse - Desktop Only */}
            {!isMobile && (
              <div className="mb-8">
              <Link href="/register" className="block">
                {isMobile ? (
                  <div className="w-full">
                    <div 
                      className="relative bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-4 border border-primary-500 shadow-lg active:shadow-xl transition-all overflow-hidden"
                    >
                      <div className="relative flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="relative w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-sm">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white mb-1 text-left">
                            Join Gypsy Nurse
                          </h3>
                          <p className="text-sm text-white/90 leading-snug text-left">
                            Create your account and start your travel nursing journey
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                          <ChevronRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-5 border border-primary-500 shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                      <div className="relative flex flex-col">
                        <div className="relative mb-4">
                          <div className="relative w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
                            <User className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 text-left">
                          Join Gypsy Nurse
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed text-left">
                          Create your account and start your travel nursing journey
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Link>
            </div>
            )}
          </>
        )}

        {/* Profile Sections (when authenticated) */}
        {isAuthenticated && (
          <>
            {renderSection(profileSections, 'My Account')}
            {/* Log Out Section */}
            <div className="mb-8">
              {isMobile ? (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full active:scale-[0.98]"
                >
                  <div 
                    className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-4 border border-red-200 shadow-lg active:shadow-xl transition-all overflow-hidden"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    <div className="relative flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="relative w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shadow-sm active:shadow-md transition-all active:scale-105">
                          <LogOut className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-red-600 mb-1 text-left">
                          Log Out
                        </h3>
                        <p className="text-sm text-gray-600 leading-snug text-left">
                          Sign out of your account
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </button>
              ) : (
                <motion.button
                  onClick={() => logout('/login')}
                  className="w-full"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-5 border border-red-200 shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                    <div className="relative flex flex-col">
                      <div className="relative mb-4">
                        <div className="relative w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                          <LogOut className="w-7 h-7 text-red-600" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-red-600 mb-2 text-left">
                        Log Out
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed text-left">
                        Sign out of your account
                      </p>
                    </div>
                  </div>
                </motion.button>
              )}
            </div>
          </>
        )}

        {/* For Employers Section */}
        {renderSection(forEmployersItems, 'For Employers')}
      </div>

      {/* Bottom Navigation - Hide when logout confirmation is shown */}
      {!showLogoutConfirm && <MobileBottomNav />}

      {/* Logout Confirmation Modal - Mobile Only */}
      {isMobile && (
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
      )}
    </div>
  )
}

