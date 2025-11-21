'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { 
  MapPin, Calendar, Briefcase, Heart,
  Building2, FileText, Clock, TrendingUp, Sparkles, ArrowUpRight, Trash2,
  Sun, Star, Bookmark
} from 'lucide-react'
import {
  getBookmarkedJobs,
  removeBookmarkedJob
} from '@/utils/jobStorage'
import {
  getJobById,
  jobToBookmarkedJob
} from '@/utils/jobData'

interface BookmarkedJob {
  id: string
  jobTitle: string
  facility: string
  facilityName?: string
  facilityAvailable: boolean
  facilityImage?: string
  jobType: string
  location: string
  state?: string
  salary?: string
  duration?: string
  savedDate: string
  staffingCompany: string
  licenseSpecialty?: string
  payPerWeek?: string
  shift?: string
  shiftHours?: string
  startDate?: string
  postedDate?: string
  daysAgo?: number
  featured?: boolean
}

export default function BookmarksPage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<BookmarkedJob[]>([])

  // Function to load bookmarked jobs from localStorage
  const loadBookmarkedJobs = () => {
    if (typeof window === 'undefined') return

    const bookmarkedJobIds = getBookmarkedJobs()
    const bookmarked = bookmarkedJobIds
      .map(jobId => {
        const job = getJobById(jobId)
        if (job) {
          return jobToBookmarkedJob(job)
        }
        return null
      })
      .filter((job): job is BookmarkedJob => job !== null)
    setBookmarkedJobs(bookmarked)
  }

  // Load bookmarked jobs from localStorage on mount and when page becomes visible
  useEffect(() => {
    loadBookmarkedJobs()

    // Reload when page becomes visible (user navigates back)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadBookmarkedJobs()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Also listen for storage changes (when localStorage is updated from other tabs)
    const handleStorageChange = () => {
      loadBookmarkedJobs()
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  const handleDeleteClick = (jobId: string) => {
    setJobToDelete(jobId)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      setBookmarkedJobs(prevJobs => prevJobs.filter(job => job.id !== jobToDelete))
      removeBookmarkedJob(jobToDelete)
    }
    setShowDeleteModal(false)
    setJobToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setJobToDelete(null)
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
              <Heart className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">Saved Jobs</span>
            </motion.div>

            {/* Main Title - Better Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-3 tracking-tight"
            >
              My Bookmarks
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
              Your saved job opportunities in one place
            </motion.p>
          </div>
        </motion.div>

        {/* Job Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {bookmarkedJobs.length === 0 ? (
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
                <Heart className="w-16 h-16 text-gray-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No Bookmarks Yet
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                Start bookmarking jobs you're interested in to save them for later
              </p>
            </motion.div>
          ) : (
            bookmarkedJobs.map((job, index) => {
              return (
                <div key={job.id} className="relative group">
                  <Link 
                    href={`/jobs/${job.id}?from=bookmarks`} 
                    className="block"
                    onClick={(e) => {
                      // Prevent navigation if clicking on delete button
                      if ((e.target as HTMLElement).closest('button[title="Remove from bookmarks"]')) {
                        e.preventDefault()
                      }
                    }}
                  >
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
                          src={job.facilityImage || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop'}
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
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md flex items-center gap-1.5 z-10 shadow-sm border border-white/50"
                          >
                            <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                            <span className="text-xs font-semibold text-gray-900">Featured</span>
                          </motion.div>
                        )}

                        {/* Bookmarked Badge and Delete Button - Top Right */}
                        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                          {/* Bookmarked Badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md font-semibold text-xs shadow-sm border border-white/50 flex items-center gap-1.5 bg-primary-50 text-primary-700 border-primary-200"
                          >
                            <Bookmark className="w-3 h-3 fill-current" />
                            <span>SAVED</span>
                          </motion.div>
                          
                          {/* Delete Icon Button */}
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleDeleteClick(job.id)
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/90 backdrop-blur-sm hover:bg-red-50 text-red-600 rounded-md transition-all shadow-sm border border-white/50 hover:border-red-200 relative z-10"
                            title="Remove from bookmarks"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
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
                          {/* Saved Date / Start Date */}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500">Saved</p>
                              <p className="text-xs font-semibold text-gray-900">{job.savedDate}</p>
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
                </div>
              )
            })
          )}
        </motion.div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={handleCancelDelete}
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
                  <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-red-400 via-red-500 to-red-600 opacity-20 pointer-events-none" />
                  
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
                          <Trash2 className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Remove Bookmark
                    </h3>
                    <p className="text-center text-gray-600 mb-6">
                      Are you sure you want to remove this job from your bookmarks?
                    </p>

                    {/* Decorative Divider */}
                    <div className="mb-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCancelDelete}
                        className="flex-1 px-6 py-3.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all shadow-sm"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleConfirmDelete}
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
                        <span className="relative z-10">Remove</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
      <Chatbot />
    </div>
  )
}

