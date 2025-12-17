'use client'

import { motion } from 'framer-motion'
import { MapPin, DollarSign, ArrowRight, Bookmark, ThumbsUp, ThumbsDown, Star, AlertCircle, Calendar, Briefcase, Sun, Building2, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'
import {
  getLikedJobs,
  getDislikedJobs,
  getBookmarkedJobs,
  getPendingJobs,
  addLikedJob,
  removeLikedJob,
  addDislikedJob,
  removeDislikedJob,
  addBookmarkedJob,
  removeBookmarkedJob
} from '@/utils/jobStorage'
import { getFacilityImageWithFallback } from '@/utils/stateImages'
import { formatShiftHoursForMobile } from '@/utils/jobData'

interface Job {
  id: string
  title: string
  location: string
  state: string
  shift: string
  shiftHours: string
  salary: string
  postedDate: string
  facilityAvailable: boolean
  staffingCompany: string
  tags: string[]
  facilityImage?: string
  facilityName: string
  licenseSpecialty: string
  payPerWeek: string
  featured?: boolean
  daysAgo?: number
  startDate?: string
}

// Use the exact same sample jobs from the jobs listing page
const jobs: Job[] = [
  {
    id: '1',
    title: 'Travel ER (Emergency Room) RN (Registered Nurse)',
    location: 'Sioux Falls',
    state: 'South Dakota',
    shift: 'Day Shift',
    shiftHours: '8h',
    salary: '$58',
    postedDate: 'Nov 7, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Emergency Room', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
    facilityName: 'Sanford Medical Center',
    licenseSpecialty: 'RN - Emergency Room',
    payPerWeek: '$4,872.50',
    featured: true,
    daysAgo: 10,
    startDate: 'Dec 8'
  },
  {
    id: '2',
    title: 'Emergency Room Job in Greenbrae, CA',
    location: 'Greenbrae',
    state: 'California',
    shift: 'Day Shift',
    shiftHours: '8h',
    salary: '$68',
    postedDate: 'Nov 6, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Emergency Room', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Marin General Hospital',
    licenseSpecialty: 'RN - Emergency Department',
    payPerWeek: '$5,712.75',
    featured: true,
    daysAgo: 10,
    startDate: 'Dec 1'
  },
  {
    id: '4',
    title: 'ICU Travel Nurse - Phoenix, AZ',
    location: 'Phoenix',
    state: 'Arizona',
    shift: 'Night Shift',
    shiftHours: '12 Hours',
    salary: '$65',
    postedDate: 'Nov 10, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Night Shift', 'ICU', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop',
    facilityName: 'Banner University Medical Center',
    licenseSpecialty: 'RN - Intensive Care Unit',
    payPerWeek: '$5,460.25',
    featured: true,
    daysAgo: 5,
    startDate: 'Dec 10'
  },
]

export default function FeaturedJobs() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { isAuthenticated } = useAuth()
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [likedJobs, setLikedJobs] = useState<string[]>([])
  const [dislikedJobs, setDislikedJobs] = useState<string[]>([])
  const [pendingJobs, setPendingJobs] = useState<string[]>([])

  // Load job status from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedJobs(getBookmarkedJobs())
      setLikedJobs(getLikedJobs())
      setDislikedJobs(getDislikedJobs())
      setPendingJobs(getPendingJobs())
    }
  }, [])

  const toggleSaveJob = (jobId: string) => {
    const isCurrentlySaved = savedJobs.includes(jobId)
    
    if (isCurrentlySaved) {
      setSavedJobs(prev => prev.filter(id => id !== jobId))
      removeBookmarkedJob(jobId)
      toast.success('Job removed from bookmarks', {
        duration: 3000,
      })
    } else {
      setSavedJobs(prev => [...prev, jobId])
      addBookmarkedJob(jobId)
      toast.success('Job saved to bookmarks', {
        duration: 3000,
      })
    }
  }

  const toggleLikeJob = (jobId: string) => {
    const isCurrentlyLiked = likedJobs.includes(jobId)
    const wasDisliked = dislikedJobs.includes(jobId)
    
    if (isCurrentlyLiked) {
      setLikedJobs(prev => prev.filter(id => id !== jobId))
      removeLikedJob(jobId)
      toast.success('Job removed from liked jobs', {
        duration: 3000,
      })
    } else {
      setLikedJobs(prev => [...prev, jobId])
      addLikedJob(jobId)
      toast.success('Job added to liked jobs', {
        duration: 3000,
      })
    }
    
    if (wasDisliked) {
      setDislikedJobs(prev => prev.filter(id => id !== jobId))
      removeDislikedJob(jobId)
    }
  }

  const toggleDislikeJob = (jobId: string) => {
    const isCurrentlyDisliked = dislikedJobs.includes(jobId)
    const wasLiked = likedJobs.includes(jobId)
    
    if (isCurrentlyDisliked) {
      setDislikedJobs(prev => prev.filter(id => id !== jobId))
      removeDislikedJob(jobId)
      toast.error('Job removed from disliked jobs', {
        duration: 3000,
      })
    } else {
      setDislikedJobs(prev => [...prev, jobId])
      addDislikedJob(jobId)
      toast.error('Job added to disliked jobs', {
        duration: 3000,
      })
    }
    
    if (wasLiked) {
      setLikedJobs(prev => prev.filter(id => id !== jobId))
      removeLikedJob(jobId)
    }
  }

  return (
    <section id="jobs" className={`${isMobile ? 'py-6' : 'py-20'} bg-white`}>
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4' : 'px-4 sm:px-6 lg:px-8'}`}>
        {/* Section Header - Native Mobile Style */}
        {isMobile ? (
          <div className="mb-5">
            <h2 className="text-[22px] font-bold text-gray-900 mb-1 leading-[1.2]">
              Featured Opportunities
            </h2>
            <p className="text-[14px] text-gray-600 leading-[1.4]">
              Top-paying travel nursing positions
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-500 rounded-full text-sm font-semibold">
                Featured Opportunities
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next <span className="gradient-text">Adventure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore top-paying travel nursing positions across the country
            </p>
          </motion.div>
        )}

        {/* Jobs Grid */}
        {isMobile ? (
          <div 
            className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 mb-6 scrollbar-hide items-stretch" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none', 
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x'
            }}
          >
            {jobs.map((job, index) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block no-underline flex-shrink-0 w-[280px]"
                style={{ touchAction: 'manipulation', userSelect: 'none' }}
              >
                <div
                  className="bg-white rounded-xl border border-gray-200 shadow-sm active:bg-gray-50 transition-all overflow-hidden"
                  style={{ touchAction: 'manipulation' }}
                >
                  {/* Horizontal Layout: Image + Content */}
                  <div className="flex gap-3 p-3">
                    {/* Facility Image - Square */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={getFacilityImageWithFallback(job.facilityImage, job.state)}
                        alt={job.facilityName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Featured Badge */}
                      {job.featured && (
                        <div className="absolute top-0 right-0 inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-500 rounded-bl-lg rounded-tr-lg shadow-sm">
                          <Star className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      {/* Title */}
                      <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 mb-1.5 leading-tight">
                        {job.licenseSpecialty || job.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{job.location}, {job.state}</span>
                      </div>

                      {/* Key Details - Compact */}
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Sun className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{job.shift}{job.shiftHours ? ` • ${formatShiftHoursForMobile(job.shiftHours)}` : ''}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Building2 className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{job.staffingCompany}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full Width Separator - Extends to Left Edge */}
                  <div className="w-full border-t border-gray-100" style={{ marginLeft: '-12px', marginRight: '-12px', width: 'calc(100% + 24px)' }}></div>

                  {/* Pay - Right Aligned with Increased Area */}
                  <div className="px-3 py-3">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-lg font-bold text-gray-900">{job.payPerWeek}</span>
                      <span className="text-xs text-gray-500">/week</span>
                    </div>
                  </div>

                  {/* Action Buttons - Bottom Row */}
                  {isAuthenticated && !pendingJobs.includes(job.id) && (
                    <div className="px-3 pb-3 pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleLikeJob(job.id)
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          likedJobs.includes(job.id)
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${likedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleSaveJob(job.id)
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          savedJobs.includes(job.id)
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                    </div>
                  )}

                  {/* PENDING Badge - Bottom */}
                  {pendingJobs.includes(job.id) && (
                    <div className="px-3 pb-3 pt-2 border-t border-gray-100">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-md border border-orange-200">
                        <AlertCircle className="w-3 h-3 text-orange-600" />
                        <span className="text-xs font-semibold text-orange-900">Pending</span>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobs.map((job, index) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block h-full no-underline"
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
                    src={getFacilityImageWithFallback(job.facilityImage, job.state)}
                    alt={job.facilityName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Black Overlay from Four Corners (Vignette Effect) */}
                  <div 
                    className="absolute inset-0 pointer-events-none" 
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
                  
                  {/* Featured Tag - Top Left */}
                  {job.featured && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-md border border-amber-200 z-10">
                      <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                      <span className="text-xs font-semibold text-amber-900">Featured</span>
                    </div>
                  )}

                  {/* Action Buttons - Top Right (if authenticated) */}
                  {isAuthenticated && !pendingJobs.includes(job.id) && (
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                      {/* Like Button */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleLikeJob(job.id)
                        }}
                        className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${
                          likedJobs.includes(job.id)
                            ? 'bg-primary-500 text-white'
                            : 'bg-white/30 text-white hover:bg-primary-500'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${likedJobs.includes(job.id) ? 'fill-white' : 'text-white'}`} />
                      </motion.button>

                      {/* Dislike Button */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleDislikeJob(job.id)
                        }}
                        className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${
                          dislikedJobs.includes(job.id)
                            ? 'bg-primary-500 text-white'
                            : 'bg-white/30 text-white hover:bg-primary-500'
                        }`}
                      >
                        <ThumbsDown className={`w-4 h-4 ${dislikedJobs.includes(job.id) ? 'fill-white' : 'text-white'}`} />
                      </motion.button>

                      {/* Bookmark Button */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleSaveJob(job.id)
                        }}
                        className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${
                          savedJobs.includes(job.id)
                            ? 'bg-primary-500 text-white'
                            : 'bg-white/30 text-white hover:bg-primary-500'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-white' : 'text-white'}`} />
                      </motion.button>
                    </div>
                  )}

                  {/* PENDING Badge */}
                  {pendingJobs.includes(job.id) && index !== jobs.length - 1 && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-md border border-orange-200 z-10">
                      <AlertCircle className="w-3 h-3 text-orange-600" />
                      <span className="text-xs font-semibold text-orange-900">Pending</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-3 bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
                  {/* Title and Days Ago */}
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex-1 pr-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {job.licenseSpecialty}
                      </h3>
                    </div>
                    {job.daysAgo !== undefined && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {job.daysAgo} {job.daysAgo === 1 ? 'day' : 'days'} ago
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                    <p className="text-xs text-gray-700">
                      {job.location}, {job.state}
                    </p>
                  </div>

                  {/* Details - Simple Three Rows */}
                  <div className="space-y-2 mb-3">
                    {/* Posted Date */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="text-xs font-semibold text-gray-900">{job.startDate || job.postedDate}</p>
                      </div>
                    </div>

                    {/* Shift Type with Hours */}
                    <div className="flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Shift</p>
                        <p className="text-xs font-semibold text-gray-900">{job.shift} • {job.shiftHours}</p>
                      </div>
                    </div>

                    {/* Agency/Staffing Company */}
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Agency</p>
                        <p className="text-xs font-semibold text-gray-900">{job.staffingCompany}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pay - Simple Display */}
                  <div className="mt-auto pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-end gap-2">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Weekly Pay</p>
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-xl font-bold text-gray-900">{job.payPerWeek}</span>
                          <span className="text-sm font-medium text-gray-600">/week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        {isMobile ? (
          <div className="text-center">
            <Link href="/jobs">
              <button
                className="w-full py-3 px-4 bg-gray-50 rounded-xl text-sm font-medium text-gray-900 border border-gray-200 active:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                style={{ touchAction: 'manipulation' }}
              >
                <span>View All Jobs</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/jobs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <span>View All Jobs</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

