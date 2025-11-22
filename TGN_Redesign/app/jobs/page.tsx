'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Briefcase,
  Bookmark,
  ChevronRight,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  X,
  Award,
  Sparkles,
  Filter,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Star,
  Sun
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
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

export interface Job {
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

export const SAMPLE_JOBS: Job[] = [
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
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
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
    id: '3',
    title: 'Strike',
    location: 'Merrill',
    state: 'New Mexico',
    shift: 'Day Shift',
    shiftHours: '8h',
    salary: '$48',
    postedDate: 'Oct 11, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Strike', 'Clinical Lab Scientist', '8 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Gila Regional Medical Center',
    licenseSpecialty: 'CLS - Clinical Lab Scientist',
    payPerWeek: '$4,032',
    featured: false,
    daysAgo: 15,
    startDate: 'Dec 15'
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
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Banner University Medical Center',
    licenseSpecialty: 'RN - Intensive Care Unit',
    payPerWeek: '$5,460.25',
    featured: true,
    daysAgo: 5,
    startDate: 'Dec 10'
  },
  {
    id: '5',
    title: 'Cardiac Cath Lab Travel Nurse - Boston, MA',
    location: 'Boston',
    state: 'Massachusetts',
    shift: 'Day Shift',
    shiftHours: '10h',
    salary: '$72',
    postedDate: 'Nov 12, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Cardiac Cath Lab', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Massachusetts General Hospital',
    licenseSpecialty: 'RN - Cardiac Catheterization Laboratory and Interventional Cardiology Specialization',
    payPerWeek: '$6,048.80',
    featured: true,
    daysAgo: 3,
    startDate: 'Dec 20'
  },
  {
    id: '6',
    title: 'Neonatal Intensive Care Unit Travel Nurse - Seattle, WA',
    location: 'Seattle',
    state: 'Washington',
    shift: 'Night Shift',
    shiftHours: '12h',
    salary: '$70',
    postedDate: 'Nov 11, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Night Shift', 'NICU', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Seattle Children\'s Hospital',
    licenseSpecialty: 'RN - Neonatal Intensive Care Unit with Advanced Life Support Certification',
    payPerWeek: '$5,880.00',
    featured: false,
    daysAgo: 4,
    startDate: 'Dec 18'
  }
]

export default function JobsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [jobs] = useState<Job[]>(SAMPLE_JOBS)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [likedJobs, setLikedJobs] = useState<string[]>([])
  const [dislikedJobs, setDislikedJobs] = useState<string[]>([])
  const [pendingJobs, setPendingJobs] = useState<string[]>([])
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Load job status from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedJobs(getBookmarkedJobs())
      setLikedJobs(getLikedJobs())
      setDislikedJobs(getDislikedJobs())
      setPendingJobs(getPendingJobs())
    }
  }, [])

  // Advanced Filter States
  const [filterCity, setFilterCity] = useState('')
  const [filterZipCode, setFilterZipCode] = useState('')
  const [filterStates, setFilterStates] = useState<string[]>([])
  const [filterFacility, setFilterFacility] = useState('')
  const [filterCertification, setFilterCertification] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('')
  const [filterMinSalary, setFilterMinSalary] = useState('')
  const [filterMaxSalary, setFilterMaxSalary] = useState('')
  const [filterShift, setFilterShift] = useState('all')
  const [filterDuration, setFilterDuration] = useState('all')
  const [filterFeaturedOnly, setFilterFeaturedOnly] = useState(false)

  const toggleSaveJob = (jobId: string) => {
    // Check current state first
    const isCurrentlySaved = savedJobs.includes(jobId)
    
    // Update saved jobs
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
    // Check current state first
    const isCurrentlyLiked = likedJobs.includes(jobId)
    const wasDisliked = dislikedJobs.includes(jobId)
    
    // Update liked jobs
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
    
    // Remove from disliked if it was disliked (separate state update)
    if (wasDisliked) {
      setDislikedJobs(prev => prev.filter(id => id !== jobId))
      removeDislikedJob(jobId)
    }
  }

  const toggleDislikeJob = (jobId: string) => {
    // Check current state first
    const isCurrentlyDisliked = dislikedJobs.includes(jobId)
    const wasLiked = likedJobs.includes(jobId)
    
    // Update disliked jobs
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
    
    // Remove from liked if it was liked (separate state update)
    if (wasLiked) {
      setLikedJobs(prev => prev.filter(id => id !== jobId))
      removeLikedJob(jobId)
    }
  }

  const handleApplyFilters = () => {
    // Apply filters logic here
    toast.success('Filters applied successfully', {
      duration: 3000,
    })
    setShowFilters(false)
  }

  const handleResetFilters = () => {
    setFilterCity('')
    setFilterZipCode('')
    setFilterStates([])
    setFilterFacility('')
    setFilterCertification('')
    setFilterSpecialty('')
    setFilterMinSalary('')
    setFilterMaxSalary('')
    setFilterShift('all')
    setFilterDuration('all')
    setFilterFeaturedOnly(false)
  }

  const handleClearFilters = () => {
    handleResetFilters()
    setShowFilters(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      {/* Advanced Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6"
              onClick={() => setShowFilters(false)}
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative w-full max-w-4xl mx-4 sm:mx-0"
                style={{ maxHeight: '90vh' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glow effect behind modal */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
                
                {/* Main modal container */}
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
                  {/* Header Section */}
                  <div className="relative px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Animated Icon */}
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                            className="relative"
                          >
                            <div className="absolute inset-0 bg-primary-100 rounded-2xl blur-xl opacity-60" />
                            <div className="relative p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg">
                              <Filter className="w-7 h-7 text-white" />
                            </div>
                          </motion.div>
                          
                          <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                              Advanced Job Filters
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">Refine your search to find the perfect job</p>
                          </div>
                        </div>
                        
                        {/* Close Button */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowFilters(false)}
                          className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-600" />
                        </motion.button>
                      </div>
                      
                    </div>

                    {/* Divider */}
                    <div className="px-4 sm:px-6 md:px-8">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    {/* Content Area - Scrollable */}
                    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                      <div className="space-y-8">
                    {/* Location Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-primary-600" />
                        <h3 className="text-lg font-bold text-gray-900">Location</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <input
                              type="text"
                              value={filterCity}
                              onChange={(e) => setFilterCity(e.target.value)}
                              placeholder="Enter city name"
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            />
                          </motion.div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <input
                              type="text"
                              value={filterZipCode}
                              onChange={(e) => setFilterZipCode(e.target.value)}
                              placeholder="Enter zip code"
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            />
                          </motion.div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">States</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <select
                              value=""
                              onChange={(e) => {
                                if (e.target.value && !filterStates.includes(e.target.value)) {
                                  setFilterStates([...filterStates, e.target.value])
                                }
                              }}
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            >
                              <option value="">Search and select states...</option>
                              <option value="California">California</option>
                              <option value="Texas">Texas</option>
                              <option value="Florida">Florida</option>
                              <option value="New York">New York</option>
                              <option value="Illinois">Illinois</option>
                            </select>
                          </motion.div>
                          {filterStates.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {filterStates.map((state) => (
                                <motion.span
                                  key={state}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                                >
                                  {state}
                                  <button
                                    onClick={() => setFilterStates(filterStates.filter(s => s !== state))}
                                    className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </motion.span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Job Details Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="pt-6 border-t border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-5 h-5 text-primary-600" />
                        <h3 className="text-lg font-bold text-gray-900">Job Details</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <input
                              type="text"
                              value={filterFacility}
                              onChange={(e) => setFilterFacility(e.target.value)}
                              placeholder="Enter facility name"
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            />
                          </motion.div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <input
                              type="text"
                              value={filterCertification}
                              onChange={(e) => setFilterCertification(e.target.value)}
                              placeholder="Enter certification name"
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            />
                          </motion.div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <input
                              type="text"
                              value={filterSpecialty}
                              onChange={(e) => setFilterSpecialty(e.target.value)}
                              placeholder="Enter specialty name"
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Salary Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-6 border-t border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-5 h-5 text-primary-600" />
                        <h3 className="text-lg font-bold text-gray-900">Salary & Schedule</h3>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <input
                              type="number"
                              value={filterMinSalary}
                              onChange={(e) => setFilterMinSalary(e.target.value)}
                              placeholder="Min Salary ($)"
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            />
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <input
                              type="number"
                              value={filterMaxSalary}
                              onChange={(e) => setFilterMaxSalary(e.target.value)}
                              placeholder="Max Salary ($)"
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Work Schedule Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="pt-6 border-t border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-primary-600" />
                        <h3 className="text-lg font-bold text-gray-900">Work Schedule</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Shift</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <select
                              value={filterShift}
                              onChange={(e) => setFilterShift(e.target.value)}
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            >
                              <option value="all">All Shifts</option>
                              <option value="day">Day Shift</option>
                              <option value="night">Night Shift</option>
                              <option value="evening">Evening Shift</option>
                            </select>
                          </motion.div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <select
                              value={filterDuration}
                              onChange={(e) => setFilterDuration(e.target.value)}
                              className="w-full px-4 py-2.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50"
                            >
                              <option value="all">All Durations</option>
                              <option value="8">8 Hours</option>
                              <option value="10">10 Hours</option>
                              <option value="12">12 Hours</option>
                            </select>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Additional Options */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="pt-6 border-t border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary-600" />
                        <h3 className="text-lg font-bold text-gray-900">Additional Options</h3>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={filterFeaturedOnly}
                            onChange={(e) => setFilterFeaturedOnly(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                          Show Featured Jobs Only
                        </span>
                      </label>
                    </motion.div>
                  </div>
                </div>

                    {/* Footer Section */}
                    <div className="relative px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex-shrink-0">
                      {/* Divider */}
                      <div className="mb-4 sm:mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.9 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleResetFilters}
                          className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all text-sm sm:text-base"
                        >
                          Reset Form
                        </motion.button>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleClearFilters}
                            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-all text-sm sm:text-base"
                          >
                            Clear Filter
                          </motion.button>
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleApplyFilters}
                            className="group relative flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden text-sm sm:text-base"
                          >
                            <span className="relative z-10 flex items-center gap-2 justify-center">
                              Save & Apply Filter
                              <ArrowRight className="w-4 h-4" />
                            </span>
                            {/* Shine effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                              animate={{ x: ['-200%', '200%'] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-8">
          {/* Simple Glass Breadcrumb */}
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

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50/80 backdrop-blur-md border border-primary-200/60 rounded-full">
              <Briefcase className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                Job Search
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Find Your Next Travel Nursing Job
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-white rounded-xl shadow-md border border-gray-200 p-2 flex flex-col md:flex-row gap-2 overflow-hidden"
          >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-purple-50/30 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex-1 flex items-center gap-3 px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, facility, location, certification..."
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="relative flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(249, 250, 251, 1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors font-medium text-gray-700"
              >
                <motion.div
                  animate={{ rotate: showFilters ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </motion.div>
                <span className="hidden sm:inline">Advanced Filters</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
                <span className="relative z-10">Search</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white border-b border-gray-200 sticky top-20 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-primary-600 rounded-full"
              />
              <span className="text-gray-700">
                Showing <span className="font-semibold text-gray-900">{jobs.length}</span> jobs
                <span className="text-gray-500"> (of 48,091 total)</span>
              </span>
            </div>

            <div className="relative">
              <motion.button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-primary-300 rounded-xl text-sm font-semibold text-gray-700 hover:text-primary-600 transition-all shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Sort: {
                  sortBy === 'relevance' ? 'Relevance' : 
                  sortBy === 'salary-high-to-low' ? 'Salary: High to Low' :
                  sortBy === 'salary-low-to-high' ? 'Salary: Low to High' :
                  sortBy === 'date-newest' ? 'Date: Newest First' :
                  sortBy === 'date-oldest' ? 'Date: Oldest First' :
                  sortBy === 'title-a-z' ? 'Title: A-Z' :
                  sortBy === 'title-z-a' ? 'Title: Z-A' :
                  sortBy === 'facility-a-z' ? 'Facility: A-Z' :
                  'Facility: Z-A'
                }</span>
                <motion.div
                  animate={{ rotate: showSortDropdown ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight size={16} className="rotate-90" />
                </motion.div>
              </motion.button>

              {/* Enhanced Dropdown Menu */}
              <AnimatePresence>
                {showSortDropdown && (
                  <>
                    {/* Backdrop to close on outside click */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowSortDropdown(false)}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-4 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden max-h-[70vh] overflow-y-auto"
                      style={{ zIndex: 100 }}
                    >
                    <div className="p-2">
                      {[
                        { value: 'relevance', icon: '✅', label: 'Relevance' },
                        { value: 'salary-high-to-low', icon: '💰', label: 'Salary: High to Low' },
                        { value: 'salary-low-to-high', icon: '💰', label: 'Salary: Low to High' },
                        { value: 'date-newest', icon: '📅', label: 'Date: Newest First' },
                        { value: 'date-oldest', icon: '📅', label: 'Date: Oldest First' },
                        { value: 'title-a-z', icon: '📝', label: 'Title: A-Z' },
                        { value: 'title-z-a', icon: '📝', label: 'Title: Z-A' },
                        { value: 'facility-a-z', icon: '🏥', label: 'Facility: A-Z' },
                        { value: 'facility-z-a', icon: '🏥', label: 'Facility: Z-A' },
                      ].map((option, idx) => (
                        <motion.button
                          key={option.value}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          onClick={() => {
                            setSortBy(option.value)
                            setShowSortDropdown(false)
                          }}
                          className={`block w-full px-4 py-3 rounded-xl transition-all text-sm font-medium group text-left ${
                            sortBy === option.value 
                              ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700' 
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700'
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          <span className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <span>{option.icon}</span>
                              <span>{option.label}</span>
                            </span>
                            {sortBy === option.value ? (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-primary-600 font-bold"
                              >
                                ✓
                              </motion.span>
                            ) : (
                              <motion.span
                                className="opacity-0 group-hover:opacity-100"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            )}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Job Listings - Modern Card Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <a
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
                  src={job.facilityImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop'}
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
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md flex items-center gap-1.5 z-10 shadow-sm border border-white/50"
                  >
                    <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                    <span className="text-xs font-semibold text-gray-900">Featured</span>
                  </motion.div>
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
                      style={{ pointerEvents: 'auto', zIndex: 20 }}
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
                      style={{ pointerEvents: 'auto', zIndex: 20 }}
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
                      style={{ pointerEvents: 'auto', zIndex: 20 }}
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
                {pendingJobs.includes(job.id) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md font-semibold text-xs shadow-sm border border-white/50 flex items-center gap-1.5 z-10"
                  >
                    <AlertCircle className="w-3 h-3 text-orange-600" />
                    <span className="text-gray-900">PENDING</span>
                  </motion.div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-3 bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
                {/* Title and Days Ago */}
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words leading-tight">
                      {job.licenseSpecialty}
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

                  {/* Facility Name */}
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Facility</p>
                      <p className="text-xs font-semibold text-gray-900">{job.facilityName}</p>
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
            </a>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-primary-600 hover:bg-gray-50 text-gray-900 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            Load More Jobs
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
