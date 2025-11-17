'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { 
  MapPin, Calendar, Briefcase, Heart,
  Building2, FileText, Clock, TrendingUp, Sparkles, ArrowUpRight, Trash2
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
  facilityAvailable: boolean
  jobType: string
  location: string
  salary?: string
  duration?: string
  savedDate: string
  staffingCompany: string
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                      // Prevent navigation if clicking on delete button's parent
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
                      delay: index * 0.1
                    }}
                    whileHover={{
                      y: -6,
                      boxShadow: '0 12px 24px rgba(127, 40, 96, 0.15)',
                      transition: { duration: 0.2 }
                    }}
                    className="group relative bg-white rounded-xl border-2 border-gray-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                    style={{
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                    }}
                  >
                  {/* Card Header */}
                  <div className="relative p-5 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      {/* Briefcase Icon */}
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center"
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        <Briefcase className="w-6 h-6 text-primary-600" />
                      </motion.div>

                      <div className="flex items-center gap-2">
                        {/* Bookmarked Badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-lg text-xs font-bold">
                          <Heart className="w-3.5 h-3.5 fill-current" />
                          <span>SAVED</span>
                        </div>
                        
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
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all border border-red-200 hover:border-red-300 relative z-10"
                          title="Remove from bookmarks"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                      {job.jobTitle}
                    </h3>

                    {/* Job Type */}
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {job.jobType}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Job Details */}
                    <div className="space-y-3 mb-4">
                      {job.facilityAvailable ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-xs">{job.facility}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{job.facility}</span>
                        </div>
                      )}

                      {job.salary && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-bold text-green-600">{job.salary}</span>
                          </div>
                          <span className="text-xs text-gray-500">{job.duration || 'per week'}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-xs">Saved {job.savedDate}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-auto w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>View Details</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
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

