'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Search,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  Calendar,
  Bookmark,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  X,
  AlertCircle,
  ArrowLeft,
  Star,
  Sun
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import toast from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'
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
import { SAMPLE_JOBS, Job } from '../jobs/page'
import { formatShiftHoursForMobile } from '@/utils/jobData'
import { getFacilityImageWithFallback } from '@/utils/stateImages'

// Format date with year
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

// All 50 US States
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

// State image URLs mapping from The Gypsy Nurse website
// Exact URLs extracted from https://www.thegypsynurse.com/states/
const STATE_IMAGE_URLS: Record<string, string> = {
  'Alabama': 'https://static.thegypsynurse.com/2019/12/AL.jpg.webp',
  'Alaska': 'https://static.thegypsynurse.com/2019/12/Alaska-thumbnail-1.jpg.webp',
  'Arizona': 'https://static.thegypsynurse.com/2019/12/Arizona-1.jpg.webp',
  'Arkansas': 'https://static.thegypsynurse.com/2019/12/AR.jpg.webp',
  'California': 'https://static.thegypsynurse.com/2019/12/Califonia.jpg.webp',
  'Colorado': 'https://static.thegypsynurse.com/2019/12/Colorado-1.jpg.webp',
  'Connecticut': 'https://static.thegypsynurse.com/2019/12/CT.jpg.webp',
  'Delaware': 'https://static.thegypsynurse.com/2019/12/DE.jpg.webp',
  'Florida': 'https://static.thegypsynurse.com/2019/12/florida-thumbnail.jpg.webp',
  'Georgia': 'https://static.thegypsynurse.com/2024/10/georgia-skyline.jpg.webp',
  'Hawaii': 'https://static.thegypsynurse.com/2019/12/Hawaii-thumbnail.jpg.webp',
  'Idaho': 'https://static.thegypsynurse.com/2019/12/ID.jpg.webp',
  'Illinois': 'https://static.thegypsynurse.com/2019/12/Illinois-1.jpg.webp',
  'Indiana': 'https://static.thegypsynurse.com/2019/12/IN-2.jpg.webp',
  'Iowa': 'https://static.thegypsynurse.com/2019/12/IA.jpg.webp',
  'Kansas': 'https://static.thegypsynurse.com/2019/12/KS.jpg.webp',
  'Kentucky': 'https://static.thegypsynurse.com/2019/12/KY.jpg.webp',
  'Louisiana': 'https://static.thegypsynurse.com/2019/12/LA.jpg.webp',
  'Maine': 'https://static.thegypsynurse.com/2019/12/ME.jpg.webp',
  'Maryland': 'https://static.thegypsynurse.com/2019/12/MD.jpg.webp',
  'Massachusetts': 'https://static.thegypsynurse.com/2019/12/MA.jpg.webp',
  'Michigan': 'https://static.thegypsynurse.com/2019/12/MI.jpg.webp',
  'Minnesota': 'https://static.thegypsynurse.com/2019/12/MN.jpg.webp',
  'Mississippi': 'https://static.thegypsynurse.com/2019/12/MS.jpg.webp',
  'Missouri': 'https://static.thegypsynurse.com/2019/12/MO.jpg.webp',
  'Montana': 'https://static.thegypsynurse.com/2019/12/MT.jpg.webp',
  'Nebraska': 'https://static.thegypsynurse.com/2019/12/NE.jpg.webp',
  'Nevada': 'https://static.thegypsynurse.com/2019/12/NV.jpg.webp',
  'New Hampshire': 'https://static.thegypsynurse.com/2019/12/NH.jpg.webp',
  'New Jersey': 'https://static.thegypsynurse.com/2019/12/NJ.jpg.webp',
  'New Mexico': 'https://static.thegypsynurse.com/2019/12/NM.jpg.webp',
  'New York': 'https://static.thegypsynurse.com/2019/12/NY.jpg.webp',
  'North Carolina': 'https://static.thegypsynurse.com/2019/12/NC.jpg.webp',
  'North Dakota': 'https://static.thegypsynurse.com/2019/12/ND.jpg.webp',
  'Ohio': 'https://static.thegypsynurse.com/2019/12/OH.jpg.webp',
  'Oklahoma': 'https://static.thegypsynurse.com/2019/12/OK.jpg.webp',
  'Oregon': 'https://static.thegypsynurse.com/2021/12/6938-filevibra-specialty-hospital-wide-portland-oregonjpg-scaled-1.jpg.webp',
  'Pennsylvania': 'https://static.thegypsynurse.com/2019/12/PA.jpg.webp',
  'Rhode Island': 'https://static.thegypsynurse.com/2019/12/RI.jpg.webp',
  'South Carolina': 'https://static.thegypsynurse.com/2019/12/SC.jpg.webp',
  'South Dakota': 'https://static.thegypsynurse.com/2019/12/SD.jpg.webp',
  'Tennessee': 'https://static.thegypsynurse.com/2019/12/TN.jpg.webp',
  'Texas': 'https://static.thegypsynurse.com/2019/12/TX.jpg.webp',
  'Utah': 'https://static.thegypsynurse.com/2019/12/UT.jpg.webp',
  'Vermont': 'https://static.thegypsynurse.com/2019/12/VT.jpg.webp',
  'Virginia': 'https://static.thegypsynurse.com/2019/12/VA.jpg.webp',
  'Washington': 'https://static.thegypsynurse.com/2019/12/WA.jpg.webp',
  'West Virginia': 'https://static.thegypsynurse.com/2019/12/WV.jpg.webp',
  'Wisconsin': 'https://static.thegypsynurse.com/2019/12/WI.jpg.webp',
  'Wyoming': 'https://static.thegypsynurse.com/2019/12/WY.jpg.webp',
}

// Get state image URL from The Gypsy Nurse website
const getStateImageUrl = (stateName: string) => {
  // First, check if we have a direct URL mapping from The Gypsy Nurse
  if (STATE_IMAGE_URLS[stateName]) {
    return STATE_IMAGE_URLS[stateName]
  }
  
  // Fallback: Generate URL using the same pattern if not in mapping
  // Convert state name to format: "New York" -> "New-York"
  const formattedName = stateName.replace(/\s+/g, '-')
  return `https://static.thegypsynurse.com/2019/12/${formattedName}-1.jpg.webp`
}

// Get consistent fallback image URL for a state (deterministic based on state name)
const getFallbackImageUrl = (stateName: string) => {
  // Use a deterministic hash based on state name to ensure same fallback image
  const stateHash = stateName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  // Use Unsplash with a deterministic seed based on state name
  return `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&seed=${stateHash}`
}

// State Card Component with Admin Portal hover animation
const StateCard = ({ 
  state, 
  index, 
  jobCount, 
  onSelect,
  isMobile = false
}: { 
  state: string
  index: number
  jobCount: number
  onSelect: () => void
  isMobile?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.4 }}
      whileHover={!isMobile ? { y: -8, scale: 1.02 } : undefined}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer h-full"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Glass Card - Mobile Native Style */}
      <div className={`relative bg-white ${isMobile ? 'rounded-2xl' : 'rounded-xl'} overflow-hidden ${isMobile ? 'shadow-lg border border-gray-200' : 'shadow-md border-2 border-gray-200'} h-full flex flex-col ${isMobile ? 'active:shadow-xl' : ''}`}
        style={isMobile ? {
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        } : {}}
      >
        {/* Glass Hover Effect - Same as Admin Portal */}
        <motion.div
          className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-xl border border-primary-200/50 shadow-lg -z-10 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Shine Effect */}
          {isHovered && (
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
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />

        {/* State Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageError ? getFallbackImageUrl(state) : getStateImageUrl(state)}
            alt={`${state} landscape`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={() => {
              // Use consistent fallback image if primary fails
              if (!imageError) {
                setImageError(true)
              }
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
          
          {/* Job Count Badge */}
          {jobCount > 0 && (
            <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-2 right-2'} px-2 py-1 bg-primary-600 text-white ${isMobile ? 'text-[10px]' : 'text-xs'} font-bold rounded-full shadow-lg z-10`}>
              {jobCount} {jobCount === 1 ? 'job' : 'jobs'}
            </div>
          )}
        </div>

        {/* State Name */}
        <div className={`${isMobile ? 'p-3' : 'p-4'} bg-white relative z-10`}>
          <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold text-gray-900 ${!isMobile ? 'group-hover:text-primary-600' : ''} transition-colors text-center`}>
            {state}
          </h3>
        </div>
      </div>
    </motion.button>
  )
}

// Get job count for a state
const getJobCountForState = (stateName: string) => {
  return SAMPLE_JOBS.filter(job => job.state.toLowerCase() === stateName.toLowerCase()).length
}

// Selected State Hero Component with consistent image handling
const SelectedStateHero = ({ 
  selectedState, 
  jobs, 
  isMobile 
}: { 
  selectedState: string
  jobs: Job[]
  isMobile: boolean
}) => {
  const [imageError, setImageError] = useState(false)
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedState}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`${isMobile ? 'bg-white w-full' : 'bg-gradient-to-br from-primary-50 via-purple-50 to-primary-50'} ${isMobile ? 'rounded-none' : 'rounded-2xl'} overflow-hidden ${isMobile ? 'shadow-none' : 'shadow-lg'} ${isMobile ? 'mb-0' : 'mb-8'}`}
        style={isMobile ? {
          margin: 0,
          padding: 0,
        } : {}}
      >
        <div className={`${isMobile ? 'flex flex-col w-full' : 'grid grid-cols-1 md:grid-cols-2'} ${isMobile ? 'gap-0' : 'gap-8'} ${isMobile ? 'p-0' : 'p-8'}`}>
          {/* State Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`relative ${isMobile ? 'rounded-none w-full' : 'rounded-xl'} overflow-hidden ${isMobile ? '' : 'shadow-2xl'}`}
            style={isMobile ? {
              width: '100%',
              margin: 0,
            } : {}}
          >
            <div className={`${isMobile ? 'h-64' : 'aspect-video'} relative w-full`}>
              <img
                src={imageError ? getFallbackImageUrl(selectedState) : getStateImageUrl(selectedState)}
                alt={`${selectedState} landscape`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => {
                  // Use consistent fallback image if primary fails
                  if (!imageError) {
                    setImageError(true)
                  }
                }}
              />
              {isMobile ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              )}
              <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-4' : 'p-6'}`}>
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-2`}>{selectedState}</h2>
                {isMobile ? (
                  <div className="inline-flex items-center px-2.5 py-1 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                    {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
                  </div>
                ) : (
                  <p className="text-white/90">
                    {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* State Info - Hidden on Mobile */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 flex items-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 w-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why {selectedState}?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-primary-600" />
                    </div>
                    <span>Diverse healthcare facilities across the state</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-primary-600" />
                    </div>
                    <span>Competitive travel nursing salaries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-primary-600" />
                    </div>
                    <span>Multiple specialty opportunities</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function JobsByStatePage() {
  const { isAuthenticated } = useAuth()
  const isMobile = useIsMobile()
  const searchParams = useSearchParams()
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [likedJobs, setLikedJobs] = useState<string[]>([])
  const [dislikedJobs, setDislikedJobs] = useState<string[]>([])
  const [pendingJobs, setPendingJobs] = useState<string[]>([])
  const mobileHeaderRef = useRef<HTMLDivElement>(null)
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(200)

  // Load job status from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedJobs(getBookmarkedJobs())
      setLikedJobs(getLikedJobs())
      setDislikedJobs(getDislikedJobs())
      setPendingJobs(getPendingJobs())
    }
  }, [])

  // Handle URL parameter for state selection (when navigating back from job details)
  useEffect(() => {
    const stateParam = searchParams?.get('state')
    if (stateParam && US_STATES.includes(stateParam)) {
      setSelectedState(stateParam)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [searchParams])

  // Measure mobile header height for accurate spacing
  useEffect(() => {
    if (isMobile && mobileHeaderRef.current) {
      const updateHeaderHeight = () => {
        if (mobileHeaderRef.current) {
          const height = mobileHeaderRef.current.offsetHeight || 200
          setMobileHeaderHeight(height)
        }
      }
      
      updateHeaderHeight()
      window.addEventListener('resize', updateHeaderHeight)
      
      return () => {
        window.removeEventListener('resize', updateHeaderHeight)
      }
    }
  }, [isMobile, selectedState, searchQuery])

  // Filter jobs by selected state
  useEffect(() => {
    if (!selectedState) {
      setJobs([])
      return
    }
    
    const filtered = SAMPLE_JOBS.filter(job => 
      job.state.toLowerCase() === selectedState.toLowerCase() &&
      (searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.staffingCompany.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setJobs(filtered)
  }, [selectedState, searchQuery])

  const toggleSaveJob = (jobId: string) => {
    const isCurrentlySaved = savedJobs.includes(jobId)
    
    if (isCurrentlySaved) {
      setSavedJobs(prev => prev.filter(id => id !== jobId))
      removeBookmarkedJob(jobId)
      toast.success('Job removed from bookmarks', { duration: 3000 })
    } else {
      setSavedJobs(prev => [...prev, jobId])
      addBookmarkedJob(jobId)
      toast.success('Job saved to bookmarks', { duration: 3000 })
    }
  }

  const toggleLikeJob = (jobId: string) => {
    const isCurrentlyLiked = likedJobs.includes(jobId)
    const wasDisliked = dislikedJobs.includes(jobId)
    
    if (isCurrentlyLiked) {
      setLikedJobs(prev => prev.filter(id => id !== jobId))
      removeLikedJob(jobId)
      toast.success('Job removed from liked jobs', { duration: 3000 })
    } else {
      setLikedJobs(prev => [...prev, jobId])
      addLikedJob(jobId)
      toast.success('Job added to liked jobs', { duration: 3000 })
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
      toast.error('Job removed from disliked jobs', { duration: 3000 })
    } else {
      setDislikedJobs(prev => [...prev, jobId])
      addDislikedJob(jobId)
      toast.error('Job added to disliked jobs', { duration: 3000 })
    }
    
    if (wasLiked) {
      setLikedJobs(prev => prev.filter(id => id !== jobId))
      removeLikedJob(jobId)
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${isMobile ? 'bg-white' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Mobile Header Wrapper - Fixed at Top (Native App Behavior) */}
      {isMobile && (
        <div 
          ref={mobileHeaderRef}
          className="fixed left-0 right-0 bg-white z-[99]"
          style={{ 
            position: 'fixed', 
            top: `calc(56px + env(safe-area-inset-top, 0px))`, 
            zIndex: 99,
            backgroundColor: '#ffffff',
            width: '100%',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Mobile Header Content */}
          <div className="px-4 pt-4 pb-4">
            {!selectedState ? (
              <>
                {/* Back Button and Title Row - Only show when no state selected */}
                <div className="flex items-center gap-3 mb-3">
                  <Link href="/jobs">
                    <motion.button
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 active:bg-gray-200 transition-colors -ml-1"
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-gray-900">
                      Find Jobs by State
                    </h1>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {(() => {
                        const filteredCount = US_STATES.filter(state => {
                          if (!searchQuery || !isMobile) return true
                          const query = searchQuery.toLowerCase()
                          return state.toLowerCase().includes(query)
                        }).length
                        return `${filteredCount} ${filteredCount === 1 ? 'state' : 'states'} available`
                      })()}
                    </p>
                  </div>
                </div>
                
                {/* Search Bar - Only show when no state selected */}
                <div className="relative bg-gray-50 rounded-lg border border-gray-200 p-0 flex items-center gap-0 mb-3">
                  <div className="relative flex-1 flex items-center gap-2.5 px-3 py-2.5">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search states..."
                      className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-base"
                      style={{ fontSize: '16px' }}
                    />
                    {searchQuery && (
                      <motion.button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors flex-shrink-0"
                        whileTap={{ scale: 0.9 }}
                        aria-label="Clear search"
                      >
                        <X className="w-3 h-3 text-white" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Back Button and Title Row - When state is selected */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.button
                    onClick={() => {
                      setSelectedState(null)
                      setSearchQuery('')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 active:bg-gray-200 transition-colors flex-shrink-0"
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </motion.button>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-gray-900">
                      Jobs in {selectedState}
                    </h1>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
                    </p>
                  </div>
                </div>
                
                {/* Search Bar - Only show when state is selected */}
                <div className={`relative ${isMobile ? 'bg-gray-50 rounded-lg border border-gray-200' : 'bg-white rounded-2xl shadow-md border border-gray-200'} ${isMobile ? 'p-0' : 'p-3'} flex items-center ${isMobile ? 'gap-0' : 'gap-2'} mb-3`}>
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-purple-50/30 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  )}
                  <div className={`relative flex-1 flex items-center ${isMobile ? 'gap-2.5 px-3 py-2.5' : 'gap-3 px-3 py-2.5'}`}>
                    <Search className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jobs..."
                      className={`flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 ${isMobile ? 'text-base' : 'text-base'}`}
                      style={{ fontSize: '16px' }}
                    />
                    {searchQuery && (
                      <motion.button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className={`flex items-center justify-center ${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded-full bg-gray-300 hover:bg-gray-400 transition-colors flex-shrink-0`}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Clear search"
                      >
                        <X className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-white`} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop Header Section */}
      {!isMobile && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 pt-32 pb-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <Link href="/" className="group">
                <span className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors relative">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/jobs" className="group">
                <span className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors relative">
                  Jobs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50/80 backdrop-blur-md border border-primary-200/60 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">
                  Jobs by State
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            >
              Find Travel Nursing Jobs by State
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 mb-6"
            >
              {selectedState 
                ? `Showing jobs in ${selectedState}` 
                : 'Explore nursing opportunities across all 50 states'}
            </motion.p>

            {/* Search Bar - Only show when state is selected */}
            {selectedState && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative bg-white rounded-xl shadow-md border border-gray-200 p-2 flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-purple-50/30 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex-1 flex items-center gap-3 px-4 py-2">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jobs in selected state..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Spacer for Fixed Mobile Header - Accounts for Navigation (56px) + Header height + Safe area */}
      {isMobile && (
        <div 
          className="bg-white"
          style={{
            height: `calc(56px + ${mobileHeaderHeight}px + env(safe-area-inset-top, 0px) + 8px)`,
            minHeight: `calc(56px + ${mobileHeaderHeight}px + env(safe-area-inset-top, 0px) + 8px)`,
          }}
        />
      )}

      {/* Main Content */}
      <main 
        className={`flex-1 ${isMobile ? 'px-0 bg-white' : 'max-w-7xl mx-auto px-4'} ${isMobile ? 'pb-0' : 'py-8'} w-full`}
        style={isMobile ? {
          position: 'relative',
          zIndex: 1,
          paddingTop: '0px',
          paddingBottom: '0px',
          backgroundColor: '#ffffff',
        } : {}}
      >
        {!selectedState ? (
          /* State Cards Grid */
          <>
            {!isMobile && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a State</h2>
                <p className="text-gray-600">Click on any state to view available jobs</p>
              </div>
            )}

            {(() => {
              const filteredStates = US_STATES.filter(state => {
                if (!searchQuery || !isMobile) return true
                const query = searchQuery.toLowerCase()
                return state.toLowerCase().includes(query)
              })

              if (filteredStates.length === 0 && searchQuery && isMobile) {
                return (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <MapPin className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2 text-center">
                      No states found
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                      We couldn't find any states matching "{searchQuery}". Try a different search term.
                    </p>
                  </div>
                )
              }

              return (
                <div className={`${isMobile ? 'grid grid-cols-2 gap-3 px-4 pt-4' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'}`}
                  style={isMobile ? {
                    paddingBottom: '0px',
                    marginBottom: '0px',
                  } : {}}
                >
                  {filteredStates.map((state, index) => {
                    const jobCount = getJobCountForState(state)
                    return (
                      <StateCard
                        key={state}
                        state={state}
                        index={index}
                        jobCount={jobCount}
                        isMobile={isMobile}
                        onSelect={() => {
                          setSelectedState(state)
                          // Scroll to top smoothly
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      />
                    )
                  })}
                </div>
              )
            })()}
          </>
        ) : (
          /* Selected State View with Jobs */
          <>
            {/* Desktop Back Button */}
            {!isMobile && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setSelectedState(null)
                  setSearchQuery('')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to All States</span>
              </motion.button>
            )}

            {/* Mobile: Native App Style State Details */}
            {isMobile ? (
              <>
                <div data-state-details="true" style={{ display: 'none' }} />
                {/* Job Listings - Compact Native Style */}
                <div className="px-4 pt-4 pb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Jobs</h2>
                  {jobs.length > 0 ? (
                    <div className="space-y-3">
                      {jobs.map((job, index) => (
                        <Link
                          key={job.id}
                          href={`/jobs/${job.id}?from=state&state=${encodeURIComponent(selectedState || '')}`}
                          className="block no-underline"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.03,
                            }}
                            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md active:bg-gray-50 transition-all"
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Card Body */}
                            <div className="p-4 flex gap-4">
                              {/* Left Content */}
                              <div className="flex-1 min-w-0">
                                {/* Header Row */}
                                <div className="mb-3">
                                  <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 mb-1.5">
                                    {job.licenseSpecialty || job.title}
                                  </h3>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="truncate">{job.location}, {job.state}</span>
                                  </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                    <div className="min-w-0">
                                      <p className="text-xs text-gray-500 truncate">Start Date</p>
                                      <p className="text-xs font-semibold text-gray-900 truncate">{formatDateWithYear(job.startDate || job.postedDate)}</p>
                                    </div>
                                  </div>
                        <div className="flex items-center gap-2">
                          <Sun className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500 truncate">Shift</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">
                              {job.shift}{job.shiftHours ? ` • ${formatShiftHoursForMobile(job.shiftHours)}` : ''}
                            </p>
                          </div>
                        </div>
                                  <div className="flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                    <div className="min-w-0">
                                      <p className="text-xs text-gray-500 truncate">Agency</p>
                                      <p className="text-xs font-semibold text-gray-900 truncate">{job.staffingCompany}</p>
                                    </div>
                                  </div>
                                  {job.daysAgo !== undefined && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                      <div className="min-w-0">
                                        <p className="text-xs text-gray-500 truncate">Posted</p>
                                        <p className="text-xs font-semibold text-gray-900 truncate">{job.daysAgo} {job.daysAgo === 1 ? 'day' : 'days'} ago</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right Side - Facility Image & Actions */}
                              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                {/* Facility Image */}
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
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

                                {/* Action Buttons */}
                                {isAuthenticated && !pendingJobs.includes(job.id) && (
                                  <div className="flex items-center gap-1">
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
                                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                      }`}
                                    >
                                      <ThumbsUp className={`w-3.5 h-3.5 ${likedJobs.includes(job.id) ? 'fill-current' : ''}`} />
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
                                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                      }`}
                                    >
                                      <Bookmark className={`w-3.5 h-3.5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                                    </motion.button>
                                  </div>
                                )}

                                {/* PENDING Badge */}
                                {pendingJobs.includes(job.id) && (
                                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded-md border border-orange-200">
                                    <AlertCircle className="w-3 h-3 text-orange-600" />
                                    <span className="text-xs font-semibold text-orange-900">Pending</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Pay Row - Full Width */}
                            <div className="px-4 pb-4 pt-3 border-t border-gray-100 flex justify-end">
                              <div className="text-right">
                                <p className="text-xs text-gray-500 mb-1">Weekly Pay</p>
                                <div className="flex items-baseline justify-end gap-1">
                                  <span className="text-xl font-bold text-gray-900">{job.payPerWeek}</span>
                                  <span className="text-sm font-medium text-gray-600">/week</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 min-h-[40vh]">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
                        <Briefcase className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 text-center px-4">
                        {searchQuery 
                          ? `No jobs found matching "${searchQuery}" in ${selectedState}`
                          : `We don't have any jobs available in ${selectedState} at the moment.`}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Desktop: Original Layout */}
                <SelectedStateHero 
                  selectedState={selectedState}
                  jobs={jobs}
                  isMobile={isMobile}
                />

                {/* Job Listings */}
                {jobs.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Available Jobs in {selectedState}
                      </h3>
                      <p className="text-gray-600">
                        Showing {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {jobs.map((job, index) => (
                        <Link key={job.id} href={`/jobs/${job.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="group relative bg-white rounded-xl border-2 border-gray-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer h-full"
                        style={{
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                        }}
                        whileHover={{
                          y: -6,
                          boxShadow: '0 12px 24px rgba(127, 40, 96, 0.15)',
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                      >
                        {/* Animated gradient border on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            padding: '2px',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-xl"
                            style={{
                              padding: '2px',
                              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              WebkitMaskComposite: 'xor',
                              maskComposite: 'exclude',
                            }}
                            animate={{
                              background: [
                                'linear-gradient(0deg, transparent, rgba(127, 40, 96, 0.8), transparent)',
                                'linear-gradient(90deg, transparent, rgba(127, 40, 96, 0.8), transparent)',
                                'linear-gradient(180deg, transparent, rgba(127, 40, 96, 0.8), transparent)',
                                'linear-gradient(270deg, transparent, rgba(127, 40, 96, 0.8), transparent)',
                                'linear-gradient(360deg, transparent, rgba(127, 40, 96, 0.8), transparent)',
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </motion.div>

                        {/* Card Header */}
                        <div className={`relative ${isMobile ? 'p-4' : 'p-5'} border-b border-gray-100`}>
                          <div className="flex items-start justify-between gap-3 mb-3">
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
                              {pendingJobs.includes(job.id) && (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-md border border-orange-200">
                                  <AlertCircle className="w-3 h-3 text-orange-600" />
                                  <span className="text-xs font-semibold text-orange-900">Pending</span>
                                </div>
                              )}

                              {isAuthenticated && !pendingJobs.includes(job.id) && (
                                <>
                                  <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      toggleLikeJob(job.id)
                                    }}
                                    className={`relative p-2 rounded-lg transition-all ${
                                      likedJobs.includes(job.id)
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600'
                                    }`}
                                  >
                                    <motion.div
                                      animate={likedJobs.includes(job.id) ? {
                                        scale: [1, 1.3, 1],
                                        rotate: [0, -15, 15, 0]
                                      } : {}}
                                      transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                      <ThumbsUp className={`w-4 h-4 transition-all ${likedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                                    </motion.div>
                                  </motion.button>

                                  <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      toggleDislikeJob(job.id)
                                    }}
                                    className={`relative p-2 rounded-lg transition-all ${
                                      dislikedJobs.includes(job.id)
                                        ? 'bg-red-50 text-red-600'
                                        : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600'
                                    }`}
                                  >
                                    <motion.div
                                      animate={dislikedJobs.includes(job.id) ? {
                                        scale: [1, 1.3, 1],
                                        rotate: [0, 15, -15, 0]
                                      } : {}}
                                      transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                      <ThumbsDown className={`w-4 h-4 transition-all ${dislikedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                                    </motion.div>
                                  </motion.button>
                                </>
                              )}

                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleSaveJob(job.id)
                                }}
                                className={`relative p-2 rounded-lg transition-all ${
                                  savedJobs.includes(job.id)
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                }`}
                              >
                                <motion.div
                                  animate={savedJobs.includes(job.id) ? {
                                    scale: [1, 1.3, 1],
                                    rotate: [0, -10, 10, 0]
                                  } : {}}
                                  transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                  <Bookmark className={`w-4 h-4 transition-all ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                                </motion.div>
                              </motion.button>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                            {job.title}
                          </h3>

                          <p className="text-sm font-medium text-gray-600 mb-1">
                            {job.staffingCompany}
                          </p>

                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{job.location}, {job.state}</span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{job.shift}</span>
                              </div>
                              <span className="text-xs text-gray-500">{formatShiftHoursForMobile(job.shiftHours)}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <DollarSign className="w-4 h-4 text-green-500" />
                                <span className="font-bold text-green-600">{job.salary}</span>
                              </div>
                              <span className="text-xs text-gray-500">per hour</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-xs">
                                {job.facilityAvailable ? 'Facility Available' : 'Facility TBD'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-xs">Posted {job.postedDate}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {job.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className={`px-2 py-0.5 text-xs font-medium rounded ${
                                  tag.includes('Shift')
                                    ? 'bg-blue-50 text-blue-700'
                                    : tag.includes('Nurse')
                                    ? 'bg-pink-50 text-pink-700'
                                    : 'bg-green-50 text-green-700'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative mt-auto w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 overflow-hidden group/btn"
                            style={{
                              boxShadow: '0 4px 12px rgba(127, 40, 96, 0.2)'
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                              animate={{
                                translateX: ['-100%', '100%']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut"
                              }}
                            />
                            <span className="relative z-10">View Details</span>
                            <motion.div
                              className="relative z-10"
                              animate={{
                                x: [0, 2, 0],
                                y: [0, -2, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </motion.div>
                          </motion.button>
                        </div>
                      </motion.div>
                    </Link>
                      ))}
                    </div>
                  </>
                ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No jobs found in {selectedState}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? 'Try adjusting your search terms' : 'Check back soon for new opportunities'}
                </p>
                {searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all"
                  >
                    Clear Search
                  </motion.button>
                )}
              </motion.div>
            )}
              </>
            )}
          </>
        )}
      </main>

      {!isMobile && <Footer />}
      {isMobile && !selectedState && <MobileBottomNav />}
    </div>
  )
}
