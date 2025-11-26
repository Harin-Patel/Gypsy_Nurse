'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { 
  MapPin, Calendar, Briefcase, Eye, Heart, ThumbsDown,
  Building2, FileText, Clock, TrendingUp, Sparkles,
  CheckCircle2, XCircle, AlertCircle, ArrowUpRight,
  Sun, Star, Bookmark
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getLikedJobs,
  getDislikedJobs,
  getPendingJobs
} from '@/utils/jobStorage'
import {
  SAMPLE_JOBS,
  getJobById,
  jobToApplication
} from '@/utils/jobData'
import { getFacilityImageWithFallback } from '@/utils/stateImages'

interface Application {
  id: string
  jobTitle: string
  facility: string
  facilityName?: string
  facilityAvailable: boolean
  facilityImage?: string
  jobType: string
  appliedDate: string
  location: string
  state?: string
  status: 'pending' | 'approved' | 'rejected'
  coverLetter: string
  salary?: string
  duration?: string
  licenseSpecialty?: string
  payPerWeek?: string
  shift?: string
  shiftHours?: string
  startDate?: string
  postedDate?: string
  daysAgo?: number
  featured?: boolean
}

// Helper function to add year to date if not present
const formatDateWithYear = (date: string | undefined): string => {
  if (!date) return ''
  // Check if date already has a year (contains comma followed by 4 digits)
  if (/\d{4}/.test(date)) {
    return date
  }
  // Add current year if not present
  const currentYear = new Date().getFullYear()
  return `${date}, ${currentYear}`
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<'applied' | 'liked' | 'disliked'>('applied')
  const [appliedJobs, setAppliedJobs] = useState<Application[]>([])
  const [likedJobs, setLikedJobs] = useState<Application[]>([])
  const [dislikedJobs, setDislikedJobs] = useState<Application[]>([])

  // Function to load jobs from localStorage
  const loadJobs = () => {
    if (typeof window === 'undefined') return

    // Load pending jobs (applied)
    const pendingJobIds = getPendingJobs()
    const applied = pendingJobIds
      .map(jobId => {
        const job = getJobById(jobId)
        if (job) {
          return jobToApplication(job)
        }
        return null
      })
      .filter((job): job is Application => job !== null)
    setAppliedJobs(applied)

    // Load liked jobs
    const likedJobIds = getLikedJobs()
    const liked = likedJobIds
      .map(jobId => {
        const job = getJobById(jobId)
        if (job) {
          return jobToApplication(job)
        }
        return null
      })
      .filter((job): job is Application => job !== null)
    setLikedJobs(liked)

    // Load disliked jobs
    const dislikedJobIds = getDislikedJobs()
    const disliked = dislikedJobIds
      .map(jobId => {
        const job = getJobById(jobId)
        if (job) {
          return jobToApplication(job)
        }
        return null
      })
      .filter((job): job is Application => job !== null)
    setDislikedJobs(disliked)
  }

  // Load jobs from localStorage on mount and when page becomes visible
  useEffect(() => {
    loadJobs()

    // Reload when page becomes visible (user navigates back)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadJobs()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Also listen for storage changes (when localStorage is updated from other tabs)
    const handleStorageChange = () => {
      loadJobs()
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const tabs = [
    { key: 'applied' as const, label: 'Applied', count: appliedJobs.length, icon: Briefcase, color: 'from-primary-500 to-primary-600' },
    { key: 'liked' as const, label: 'Liked', count: likedJobs.length, icon: Heart, color: 'from-primary-500 to-primary-700' },
    { key: 'disliked' as const, label: 'Disliked', count: dislikedJobs.length, icon: ThumbsDown, color: 'from-primary-600 to-primary-800' }
  ]

  const getCurrentJobs = () => {
    switch (activeTab) {
      case 'applied': return appliedJobs
      case 'liked': return likedJobs
      case 'disliked': return dislikedJobs
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          icon: AlertCircle,
          gradient: 'from-primary-500 to-primary-600',
          bg: 'bg-orange-50',
          text: 'text-orange-900',
          iconColor: 'text-orange-600',
          border: 'border-orange-200'
        }
      case 'approved':
        return {
          label: 'Approved',
          icon: CheckCircle2,
          gradient: 'from-green-400 to-emerald-500',
          bg: 'bg-green-50',
          text: 'text-green-900',
          iconColor: 'text-green-600',
          border: 'border-green-200'
        }
      case 'rejected':
        return {
          label: 'Rejected',
          icon: XCircle,
          gradient: 'from-red-400 to-rose-500',
          bg: 'bg-red-50',
          text: 'text-red-900',
          iconColor: 'text-red-600',
          border: 'border-red-200'
        }
      default:
        return {
          label: 'Pending',
          icon: AlertCircle,
          gradient: 'from-primary-500 to-primary-600',
          bg: 'bg-orange-50',
          text: 'text-orange-900',
          iconColor: 'text-orange-600',
          border: 'border-orange-200'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 mt-20">
        {/* Enhanced Header with Better UX */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-10"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-3xl -z-10" />

          <div className="text-center">
            {/* Career Badge - Cleaner Design */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-5 bg-primary-50 border border-primary-200 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">Career Management</span>
            </motion.div>

            {/* Main Title - Better Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-3 tracking-tight"
            >
              My Applications
            </motion.h1>

            {/* Decorative Underline - More Prominent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-20 h-1 bg-primary-600 mx-auto mb-4 rounded-full"
            />

            {/* Subtitle - Better Readability */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-gray-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Track and manage all your job applications in one place
            </motion.p>
          </div>
        </motion.div>

        {/* Glass Tabs Navigation with Theme Color */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-10 flex justify-center"
        >
          <div className="relative inline-flex gap-3 p-3 bg-white/50 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60">
            {/* Ambient glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-1 bg-gradient-to-r from-primary-400/30 via-primary-600/30 to-primary-400/30 rounded-2xl blur-xl -z-10"
            />

            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.key
              const Icon = tab.icon
              
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileHover={{ scale: isActive ? 1 : 1.03, y: isActive ? 0 : -3 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + (0.1 * index), type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  <div className={`relative px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-700 hover:text-primary-600'
                  }`}>
                    {/* Active gradient background with glass effect */}
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl shadow-xl`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                        {/* Glass overlay */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl" />
                        {/* Animated glow for active tab */}
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={`absolute -inset-0.5 bg-gradient-to-r ${tab.color} rounded-xl blur-md -z-10`}
                        />
                      </>
                    )}

                    {/* Inactive hover background with glass */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-primary-50/50 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-3">
                      <motion.div
                        animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'}`} />
                      </motion.div>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <motion.span
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold transition-all ${
                          isActive 
                            ? 'bg-white/25 text-white backdrop-blur-sm shadow-lg' 
                            : 'bg-primary-100/80 text-primary-700 group-hover:bg-primary-200'
                        }`}
                      >
                        {tab.count}
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Job Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {getCurrentJobs().length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-xl"
                >
                  {activeTab === 'applied' && <Briefcase className="w-16 h-16 text-gray-400" />}
                  {activeTab === 'liked' && <Heart className="w-16 h-16 text-gray-400" />}
                  {activeTab === 'disliked' && <ThumbsDown className="w-16 h-16 text-gray-400" />}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No {activeTab === 'applied' ? 'Applications' : activeTab === 'liked' ? 'Liked Jobs' : 'Disliked Jobs'} Yet
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  {activeTab === 'applied' 
                    ? 'Start applying to jobs to see them here'
                    : activeTab === 'liked'
                    ? 'Like jobs you are interested in to save them for later'
                    : 'Jobs you dislike will appear here'}
                </p>
              </motion.div>
            ) : (
              getCurrentJobs().map((job, index) => {
                const statusConfig = getStatusConfig(job.status)
                const StatusIcon = statusConfig.icon

                return (
                  <Link key={job.id} href={`/jobs/${job.id}?from=applications`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="group relative bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden flex flex-col cursor-pointer h-full shadow-xl border border-gray-200/50 hover:border-primary-300/50 transition-all duration-300"
                      style={{
                        backdropFilter: 'saturate(180%) blur(20px)',
                        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                      }}
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(127, 40, 96, 0.15)',
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      {/* Facility Image Header with Gradient Overlay */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={getFacilityImageWithFallback(job.facilityImage, job.state || '')}
                          alt={job.facilityName || job.facility}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        
                        {/* Black Overlay from Four Corners (Vignette Effect) */}
                        <div className="absolute inset-0" 
                          style={{
                            background: `
                              radial-gradient(circle at top left, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
                              radial-gradient(circle at top right, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
                              radial-gradient(circle at bottom left, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
                              radial-gradient(circle at bottom right, rgba(0, 0, 0, 0.4) 0%, transparent 50%)
                            `
                          }}
                        />
                        
                        {/* Gradient Overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        
                        {/* Featured Tag - Top Left */}
                        {job.featured && (
                          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-md border border-amber-200 z-10">
                            <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                            <span className="text-xs font-semibold text-amber-900">Featured</span>
                          </div>
                        )}

                        {/* Status/Like/Dislike Badge - Top Right */}
                        <div className="absolute top-3 right-3 z-10">
                          {activeTab === 'applied' && (
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${statusConfig.bg} ${statusConfig.border}`}>
                              <StatusIcon className={`w-3 h-3 ${statusConfig.iconColor || statusConfig.text}`} />
                              <span className={`text-xs font-semibold ${statusConfig.text}`}>{statusConfig.label}</span>
                            </div>
                          )}
                          {activeTab === 'liked' && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-md border border-green-200">
                              <Heart className="w-3 h-3 text-green-600 fill-green-600" />
                              <span className="text-xs font-semibold text-green-900">Liked</span>
                            </div>
                          )}
                          {activeTab === 'disliked' && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-md border border-red-200">
                              <ThumbsDown className="w-3 h-3 text-red-600 fill-red-600" />
                              <span className="text-xs font-semibold text-red-900">Disliked</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-3 bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
                        {/* Title and Days Ago */}
                        <div className="flex items-center justify-between mb-1.5 gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words leading-tight">
                              {job.licenseSpecialty || job.jobTitle}
                            </h3>
                          </div>
                          {job.daysAgo !== undefined && (
                            <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 self-start pt-0.5">
                              {job.daysAgo} {job.daysAgo === 1 ? 'day' : 'days'} ago
                            </span>
                          )}
                        </div>

                        {/* Location */}
                        <div className="mb-2 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                          <p className="text-xs text-gray-700">
                            {job.location}{job.state ? `, ${job.state}` : ''}
                          </p>
                        </div>

                        {/* Details - Simple Three Rows */}
                        <div className="space-y-2 mb-3">
                          {/* Start Date */}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500">Start Date</p>
                              <p className="text-xs font-semibold text-gray-900">{(job.startDate || job.postedDate) ? formatDateWithYear(job.startDate || job.postedDate) : 'N/A'}</p>
                            </div>
                          </div>

                          {/* Shift Type with Hours */}
                          {job.shift && (
                            <div className="flex items-center gap-2">
                              <Sun className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500">Shift</p>
                                <p className="text-xs font-semibold text-gray-900">{job.shift}{job.shiftHours ? ` • ${job.shiftHours}` : ''}</p>
                              </div>
                            </div>
                          )}

                          {/* Facility Name */}
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500">Facility</p>
                              <p className="text-xs font-semibold text-gray-900">{job.facilityName || job.facility}</p>
                            </div>
                          </div>
                        </div>

                        {/* Pay - Simple Display */}
                        <div className="mt-auto pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-end gap-2">
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Weekly Pay</p>
                              <div className="flex items-baseline justify-end gap-1">
                                <span className="text-xl font-bold text-gray-900">{job.payPerWeek || job.salary || 'N/A'}</span>
                                {job.payPerWeek && <span className="text-sm font-medium text-gray-600">/week</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )
              })
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}
