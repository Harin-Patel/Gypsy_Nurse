'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Briefcase,
  Building2,
  Bookmark,
  ChevronRight,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  X,
  Award,
  Sparkles,
  Filter,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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
}

const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Long Term Care Job',
    location: 'Harvard',
    state: 'Illinois',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$17.55',
    postedDate: 'Nov 10, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['DAY Shift', 'Registered Nurse', 'Long Term Care']
  },
  {
    id: '2',
    title: 'Interventional Radiology Job',
    location: 'Rockford',
    state: 'Illinois',
    shift: 'Mid Shift',
    shiftHours: '8 Hours',
    salary: '$25.74',
    postedDate: 'Nov 10, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['MID Shift', 'Registered Nurse', 'Interventional Radiology']
  },
  {
    id: '3',
    title: 'RN Job',
    location: 'Lake Isabella',
    state: 'California',
    shift: 'Day Shift',
    shiftHours: '8 Hours',
    salary: '$12.87',
    postedDate: 'Nov 10, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['DAY Shift', 'Registered Nurse', 'RN']
  },
  {
    id: '4',
    title: 'Ultrasound Technologist Job',
    location: 'Lawton',
    state: 'Oklahoma',
    shift: 'Day Shift',
    shiftHours: '8 Hours',
    salary: '$20.80',
    postedDate: 'Nov 10, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['DAY Shift', 'Registered Nurse', 'Ultrasound Technologist']
  }
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [jobs] = useState<Job[]>(SAMPLE_JOBS)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [likedJobs, setLikedJobs] = useState<string[]>([])
  const [dislikedJobs, setDislikedJobs] = useState<string[]>([])
  const [showSortDropdown, setShowSortDropdown] = useState(false)

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
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const toggleLikeJob = (jobId: string) => {
    setLikedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId)
      } else {
        // Remove from disliked if it was disliked
        setDislikedJobs(disliked => disliked.filter(id => id !== jobId))
        return [...prev, jobId]
      }
    })
  }

  const toggleDislikeJob = (jobId: string) => {
    setDislikedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId)
      } else {
        // Remove from liked if it was liked
        setLikedJobs(liked => liked.filter(id => id !== jobId))
        return [...prev, jobId]
      }
    })
  }

  const handleApplyFilters = () => {
    // Apply filters logic here
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={() => setShowFilters(false)}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-4xl pointer-events-auto"
                style={{ maxHeight: '90vh' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Main Card */}
                <div className="relative bg-white backdrop-blur-2xl rounded-3xl shadow-2xl border border-white overflow-hidden" style={{ maxHeight: '90vh' }}>
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-30" />
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-3xl flex flex-col" style={{ maxHeight: '90vh' }}>
                    {/* Header */}
                    <div className="px-8 pt-8 pb-6">
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
                      
                      {/* Decorative Divider */}
                      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative flex-1 overflow-y-auto px-8 pb-6">
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

                    {/* Footer Actions */}
                    <div className="relative px-8 pb-8 pt-6">
                      {/* Decorative Divider */}
                      <div className="mb-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
                      
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleResetFilters}
                          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
                        >
                          Reset Form
                        </motion.button>
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleClearFilters}
                            className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-all"
                          >
                            Clear Filter
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleApplyFilters}
                            className="relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg overflow-hidden group"
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
                            <span className="relative z-10 flex items-center gap-2">
                              Save & Apply Filter
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group relative bg-white rounded-xl border-2 border-gray-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
              onHoverStart={() => {}}
              whileHover={{
                y: -6,
                boxShadow: '0 12px 24px rgba(127, 40, 96, 0.15)',
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              {/* Animated gradient border on hover - Theme Color */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              >
                {/* Animated gradient sweep on border */}
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
              <div className="relative p-5 border-b border-gray-100">
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
                    {/* Like Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
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
                      {likedJobs.includes(job.id) && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 rounded-lg bg-green-400"
                          style={{ pointerEvents: 'none' }}
                        />
                      )}
                    </motion.button>

                    {/* Dislike Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
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
                      {dislikedJobs.includes(job.id) && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 rounded-lg bg-red-400"
                          style={{ pointerEvents: 'none' }}
                        />
                      )}
                    </motion.button>

                    {/* Bookmark Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
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
                      {savedJobs.includes(job.id) && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 rounded-lg bg-primary-400"
                          style={{ pointerEvents: 'none' }}
                        />
                      )}
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
                {/* Job Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{job.shift}</span>
                    </div>
                    <span className="text-xs text-gray-500">{job.shiftHours}</span>
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

                {/* Tags */}
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

                {/* View Details Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative mt-auto w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 overflow-hidden group/btn"
                  style={{
                    boxShadow: '0 4px 12px rgba(127, 40, 96, 0.2)'
                  }}
                >
                  {/* Shimmer effect */}
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
