'use client'

import { useState, useEffect, useCallback } from 'react'
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
  ChevronDown,
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
  Sun,
  Stethoscope,
  Save,
  Trash2,
  BookmarkCheck,
  Pencil
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
import {
  getSavedFilters,
  saveFilter,
  deleteFilter,
  updateFilter,
  getFilterById,
  type FilterPreset
} from '@/utils/filterStorage'
import { getFacilityImageWithFallback } from '@/utils/stateImages'
import { useDisableBodyScroll } from '@/utils/useDisableBodyScroll'

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
  },
  {
    id: '7',
    title: 'Medical-Surgical Travel RN - Houston, TX',
    location: 'Houston',
    state: 'Texas',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$62',
    postedDate: 'Nov 13, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Medical-Surgical', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Houston Methodist Hospital',
    licenseSpecialty: 'RN - Medical-Surgical',
    payPerWeek: '$5,208.00',
    featured: true,
    daysAgo: 2,
    startDate: 'Dec 22'
  },
  {
    id: '8',
    title: 'Operating Room Travel Nurse - Miami, FL',
    location: 'Miami',
    state: 'Florida',
    shift: 'Day Shift',
    shiftHours: '10h',
    salary: '$75',
    postedDate: 'Nov 14, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Operating Room', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Jackson Memorial Hospital',
    licenseSpecialty: 'RN - Operating Room',
    payPerWeek: '$6,300.00',
    featured: true,
    daysAgo: 1,
    startDate: 'Dec 25'
  },
  {
    id: '9',
    title: 'Labor and Delivery Travel RN - New York, NY',
    location: 'New York',
    state: 'New York',
    shift: 'Night Shift',
    shiftHours: '12 Hours',
    salary: '$80',
    postedDate: 'Nov 15, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Night Shift', 'Labor and Delivery', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Mount Sinai Hospital',
    licenseSpecialty: 'RN - Labor and Delivery',
    payPerWeek: '$6,720.00',
    featured: true,
    daysAgo: 0,
    startDate: 'Dec 28'
  },
  {
    id: '10',
    title: 'Oncology Travel Nurse - Denver, CO',
    location: 'Denver',
    state: 'Colorado',
    shift: 'Day Shift',
    shiftHours: '8h',
    salary: '$66',
    postedDate: 'Nov 9, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Oncology', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'University of Colorado Hospital',
    licenseSpecialty: 'RN - Oncology',
    payPerWeek: '$5,544.00',
    featured: false,
    daysAgo: 6,
    startDate: 'Dec 12'
  },
  {
    id: '11',
    title: 'Pediatric ICU Travel RN - Charlotte, NC',
    location: 'Charlotte',
    state: 'North Carolina',
    shift: 'Night Shift',
    shiftHours: '12h',
    salary: '$64',
    postedDate: 'Nov 8, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Night Shift', 'Pediatric ICU', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Atrium Health Levine Children\'s Hospital',
    licenseSpecialty: 'RN - Pediatric Intensive Care Unit',
    payPerWeek: '$5,376.00',
    featured: false,
    daysAgo: 7,
    startDate: 'Dec 5'
  },
  {
    id: '12',
    title: 'Telemetry Travel Nurse - Atlanta, GA',
    location: 'Atlanta',
    state: 'Georgia',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$60',
    postedDate: 'Nov 5, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Telemetry', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Emory University Hospital',
    licenseSpecialty: 'RN - Telemetry',
    payPerWeek: '$5,040.00',
    featured: false,
    daysAgo: 10,
    startDate: 'Dec 3'
  },
  {
    id: '13',
    title: 'Emergency Department Travel RN - Chicago, IL',
    location: 'Chicago',
    state: 'Illinois',
    shift: 'Evening Shift',
    shiftHours: '12 Hours',
    salary: '$68',
    postedDate: 'Nov 4, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Evening Shift', 'Emergency Department', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Northwestern Memorial Hospital',
    licenseSpecialty: 'RN - Emergency Department',
    payPerWeek: '$5,712.00',
    featured: true,
    daysAgo: 11,
    startDate: 'Dec 1'
  },
  {
    id: '14',
    title: 'Post-Anesthesia Care Unit Travel Nurse - Philadelphia, PA',
    location: 'Philadelphia',
    state: 'Pennsylvania',
    shift: 'Day Shift',
    shiftHours: '10h',
    salary: '$70',
    postedDate: 'Nov 3, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'PACU', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Penn Presbyterian Medical Center',
    licenseSpecialty: 'RN - Post-Anesthesia Care Unit',
    payPerWeek: '$5,880.00',
    featured: false,
    daysAgo: 12,
    startDate: 'Nov 30'
  },
  {
    id: '15',
    title: 'Progressive Care Unit Travel RN - Portland, OR',
    location: 'Portland',
    state: 'Oregon',
    shift: 'Night Shift',
    shiftHours: '12h',
    salary: '$65',
    postedDate: 'Nov 2, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Night Shift', 'PCU', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Oregon Health & Science University Hospital',
    licenseSpecialty: 'RN - Progressive Care Unit',
    payPerWeek: '$5,460.00',
    featured: false,
    daysAgo: 13,
    startDate: 'Nov 28'
  },
  {
    id: '16',
    title: 'Cardiac Step-Down Travel Nurse - Las Vegas, NV',
    location: 'Las Vegas',
    state: 'Nevada',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$67',
    postedDate: 'Nov 1, 2025',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Cardiac Step-Down', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'University Medical Center of Southern Nevada',
    licenseSpecialty: 'RN - Cardiac Step-Down',
    payPerWeek: '$5,628.00',
    featured: true,
    daysAgo: 14,
    startDate: 'Nov 25'
  },
  {
    id: '17',
    title: 'Orthopedic Travel Nurse - Nashville, TN',
    location: 'Nashville',
    state: 'Tennessee',
    shift: 'Day Shift',
    shiftHours: '8h',
    salary: '$58',
    postedDate: 'Oct 30, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Orthopedic', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Vanderbilt University Medical Center',
    licenseSpecialty: 'RN - Orthopedic',
    payPerWeek: '$4,872.00',
    featured: false,
    daysAgo: 16,
    startDate: 'Nov 22'
  },
  {
    id: '18',
    title: 'Psychiatric Travel RN - Minneapolis, MN',
    location: 'Minneapolis',
    state: 'Minnesota',
    shift: 'Day Shift',
    shiftHours: '8h',
    salary: '$55',
    postedDate: 'Oct 28, 2025',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Psychiatric', 'Registered Nurse', '13 Weeks'],
    facilityImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    facilityName: 'Hennepin County Medical Center',
    licenseSpecialty: 'RN - Psychiatric',
    payPerWeek: '$4,620.00',
    featured: false,
    daysAgo: 18,
    startDate: 'Nov 20'
  }
]

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
  const [showQuickAccessDropdown, setShowQuickAccessDropdown] = useState(false)

  // Load job status from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedJobs(getBookmarkedJobs())
      setLikedJobs(getLikedJobs())
      setDislikedJobs(getDislikedJobs())
      setPendingJobs(getPendingJobs())
      
      // Check if we should show applied toast after redirect
      const showAppliedToast = sessionStorage.getItem('showAppliedToast')
      if (showAppliedToast === 'true') {
        sessionStorage.removeItem('showAppliedToast')
        toast.success('Job application submitted successfully', {
          duration: 3000,
        })
      }
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
  
  // Applied filters for display
  const [appliedFilters, setAppliedFilters] = useState<Array<{id: string, type: string, label: string, value: string}>>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(SAMPLE_JOBS)
  
  // Saved filter presets
  const [savedFilterPresets, setSavedFilterPresets] = useState<FilterPreset[]>([])
  const [showSaveFilterModal, setShowSaveFilterModal] = useState(false)
  const [filterPresetName, setFilterPresetName] = useState('')
  const [showSavedFilters, setShowSavedFilters] = useState(false)
  const [filterToDelete, setFilterToDelete] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentlyAppliedFilterId, setCurrentlyAppliedFilterId] = useState<string | null>(null)
  const [filterToEdit, setFilterToEdit] = useState<FilterPreset | null>(null)
  const [editFilterName, setEditFilterName] = useState('')
  
  // Disable body scroll when modals are open
  useDisableBodyScroll(showFilters)
  useDisableBodyScroll(showSavedFilters)
  useDisableBodyScroll(showSaveFilterModal)
  useDisableBodyScroll(showDeleteConfirm)
  
  // Load saved filters and currently applied filter on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedFilterPresets(getSavedFilters())
      
      // Load currently applied filter ID from localStorage
      const savedAppliedFilterId = localStorage.getItem('currentlyAppliedFilterId')
      if (savedAppliedFilterId) {
        // Verify the filter still exists
        const filter = getFilterById(savedAppliedFilterId)
        if (filter) {
          setCurrentlyAppliedFilterId(savedAppliedFilterId)
          // Restore the filter values
          setFilterCity(filter.filters.city || '')
          setFilterZipCode(filter.filters.zipCode || '')
          setFilterStates(filter.filters.states || [])
          setFilterFacility(filter.filters.facility || '')
          setFilterCertification(filter.filters.certification || '')
          setFilterSpecialty(filter.filters.specialty || '')
          setFilterMinSalary(filter.filters.minSalary || '')
          setFilterMaxSalary(filter.filters.maxSalary || '')
          setFilterShift(filter.filters.shift || 'all')
          setFilterDuration(filter.filters.duration || 'all')
          setFilterFeaturedOnly(filter.filters.featuredOnly || false)
          
          // Apply the filters after a short delay to ensure state is set
          setTimeout(() => {
            applyFilters()
          }, 100)
        } else {
          // Filter was deleted, clear the saved ID
          localStorage.removeItem('currentlyAppliedFilterId')
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // Persist currentlyAppliedFilterId to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentlyAppliedFilterId) {
        localStorage.setItem('currentlyAppliedFilterId', currentlyAppliedFilterId)
      } else {
        localStorage.removeItem('currentlyAppliedFilterId')
      }
    }
  }, [currentlyAppliedFilterId])

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

  // Filter jobs based on all active filters
  const applyFilters = useCallback(() => {
    let filtered = [...SAMPLE_JOBS]
    const newAppliedFilters: Array<{id: string, type: string, label: string, value: string}> = []

    // Search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.licenseSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.staffingCompany.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // City filter
    if (filterCity.trim()) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filterCity.toLowerCase())
      )
      newAppliedFilters.push({
        id: 'city',
        type: 'city',
        label: 'City',
        value: filterCity
      })
    }

    // Zip code filter
    if (filterZipCode.trim()) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filterZipCode.toLowerCase())
      )
      newAppliedFilters.push({
        id: 'zipcode',
        type: 'zipcode',
        label: 'Zip Code',
        value: filterZipCode
      })
    }

    // States filter
    if (filterStates.length > 0) {
      filtered = filtered.filter(job => 
        filterStates.some(state => job.state.toLowerCase() === state.toLowerCase())
      )
      filterStates.forEach(state => {
        newAppliedFilters.push({
          id: `state-${state}`,
          type: 'state',
          label: 'State',
          value: state
        })
      })
    }

    // Facility filter
    if (filterFacility.trim()) {
      filtered = filtered.filter(job => 
        job.facilityName.toLowerCase().includes(filterFacility.toLowerCase())
      )
      newAppliedFilters.push({
        id: 'facility',
        type: 'facility',
        label: 'Facility',
        value: filterFacility
      })
    }

    // Certification filter
    if (filterCertification.trim()) {
      filtered = filtered.filter(job => 
        job.licenseSpecialty.toLowerCase().includes(filterCertification.toLowerCase())
      )
      newAppliedFilters.push({
        id: 'certification',
        type: 'certification',
        label: 'Certification',
        value: filterCertification
      })
    }

    // Specialty filter
    if (filterSpecialty.trim()) {
      filtered = filtered.filter(job => 
        job.licenseSpecialty.toLowerCase().includes(filterSpecialty.toLowerCase())
      )
      newAppliedFilters.push({
        id: 'specialty',
        type: 'specialty',
        label: 'Specialty',
        value: filterSpecialty
      })
    }

    // Salary range filter
    if (filterMinSalary) {
      const minSalary = parseFloat(filterMinSalary.replace(/[^0-9.]/g, ''))
      filtered = filtered.filter(job => {
        const jobSalary = parseFloat(job.salary.replace(/[^0-9.]/g, ''))
        return jobSalary >= minSalary
      })
      newAppliedFilters.push({
        id: 'minsalary',
        type: 'minsalary',
        label: 'Min Salary',
        value: `$${filterMinSalary}`
      })
    }

    if (filterMaxSalary) {
      const maxSalary = parseFloat(filterMaxSalary.replace(/[^0-9.]/g, ''))
      filtered = filtered.filter(job => {
        const jobSalary = parseFloat(job.salary.replace(/[^0-9.]/g, ''))
        return jobSalary <= maxSalary
      })
      newAppliedFilters.push({
        id: 'maxsalary',
        type: 'maxsalary',
        label: 'Max Salary',
        value: `$${filterMaxSalary}`
      })
    }

    // Shift filter
    if (filterShift !== 'all') {
      filtered = filtered.filter(job => {
        const jobShift = job.shift.toLowerCase()
        if (filterShift === 'day') return jobShift.includes('day')
        if (filterShift === 'night') return jobShift.includes('night')
        if (filterShift === 'evening') return jobShift.includes('evening')
        return true
      })
      newAppliedFilters.push({
        id: 'shift',
        type: 'shift',
        label: 'Shift',
        value: filterShift.charAt(0).toUpperCase() + filterShift.slice(1)
      })
    }

    // Duration filter
    if (filterDuration !== 'all') {
      filtered = filtered.filter(job => 
        job.shiftHours.includes(filterDuration)
      )
      newAppliedFilters.push({
        id: 'duration',
        type: 'duration',
        label: 'Duration',
        value: `${filterDuration} Hours`
      })
    }

    // Featured only filter
    if (filterFeaturedOnly) {
      filtered = filtered.filter(job => job.featured === true)
      newAppliedFilters.push({
        id: 'featured',
        type: 'featured',
        label: 'Featured Only',
        value: 'Yes'
      })
    }

    // Sort filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'salary-high-to-low':
          return parseFloat(b.salary.replace(/[^0-9.]/g, '')) - parseFloat(a.salary.replace(/[^0-9.]/g, ''))
        case 'salary-low-to-high':
          return parseFloat(a.salary.replace(/[^0-9.]/g, '')) - parseFloat(b.salary.replace(/[^0-9.]/g, ''))
        case 'date-newest':
          return (b.daysAgo || 0) - (a.daysAgo || 0)
        case 'date-oldest':
          return (a.daysAgo || 0) - (b.daysAgo || 0)
        case 'title-a-z':
          return a.title.localeCompare(b.title)
        case 'title-z-a':
          return b.title.localeCompare(a.title)
        case 'facility-a-z':
          return a.facilityName.localeCompare(b.facilityName)
        case 'facility-z-a':
          return b.facilityName.localeCompare(a.facilityName)
        default:
          return 0
      }
    })

    setFilteredJobs(sorted)
    setAppliedFilters(newAppliedFilters)
  }, [searchQuery, sortBy, filterCity, filterZipCode, filterStates, filterFacility, filterCertification, filterSpecialty, filterMinSalary, filterMaxSalary, filterShift, filterDuration, filterFeaturedOnly])

  // Apply filters only when search query or sort changes (not when filter values change in advanced panel)
  // Advanced filters are only applied after saving
  useEffect(() => {
    applyFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy])
  
  // Apply filters when filter values change, but only if filters have already been applied
  // This handles the case when removing applied filters - the job list should refresh
  // We check if there are applied filters AND if the filter panel is closed (meaning filters were applied)
  useEffect(() => {
    // Only auto-apply if there are already applied filters (meaning they were saved/applied before)
    // AND the filter panel is closed (user is not editing)
    // This prevents applying filters while user is editing in the advanced panel
    if (appliedFilters.length > 0 && !showFilters) {
    applyFilters()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCity, filterZipCode, filterStates, filterFacility, filterCertification, filterSpecialty, filterMinSalary, filterMaxSalary, filterShift, filterDuration, filterFeaturedOnly, showFilters])

  const handleApplyFilters = () => {
    // If we're in edit mode, handle differently
    if (filterToEdit) {
      handleUpdateFilter()
      return
    }
    
    // Close the filter panel first
    setShowFilters(false)
    
    // Check if there are any active filters
    const hasActiveFilters = filterCity || filterZipCode || filterStates.length > 0 || 
                            filterFacility || filterCertification || filterSpecialty || 
                            filterMinSalary || filterMaxSalary || filterShift !== 'all' || 
                            filterDuration !== 'all' || filterFeaturedOnly
    
    // Only show save dialog if there are active filters to save
    // If no filters are active (all cleared), just apply the filters without saving
    if (hasActiveFilters) {
    setTimeout(() => {
      setShowSaveFilterModal(true)
    }, 300)
    } else {
      // No filters to save, just apply (which will clear all filters)
      setTimeout(() => {
        applyFilters()
        setCurrentlyAppliedFilterId(null) // Clear tracked filter since no filters are applied
      }, 100)
    }
  }

  // Handle update filter (for edit mode) - only updates, doesn't apply
  const handleUpdateFilter = () => {
    if (!filterToEdit) {
      return
    }

    const updatedFilterData = {
      name: filterToEdit.name, // Keep the original filter name
      filters: {
        city: filterCity,
        zipCode: filterZipCode,
        states: filterStates,
        facility: filterFacility,
        certification: filterCertification,
        specialty: filterSpecialty,
        minSalary: filterMinSalary,
        maxSalary: filterMaxSalary,
        shift: filterShift,
        duration: filterDuration,
        featuredOnly: filterFeaturedOnly,
      }
    }

    try {
      updateFilter(filterToEdit.id, updatedFilterData)
      
      const updatedFilters = getSavedFilters()
      setSavedFilterPresets(updatedFilters)
      
      // If this filter was currently applied, update the applied state as well
      if (currentlyAppliedFilterId === filterToEdit.id) {
        // Update the applied filter state to match the new values
        applyFilters()
        // Keep the same filter ID as currently applied
        setCurrentlyAppliedFilterId(filterToEdit.id)
      }
      
      // Reset edit state
      setEditFilterName('')
      setFilterToEdit(null)
      setShowFilters(false)
      
      toast.success('Filter updated successfully', {
        duration: 3000,
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update filter', {
        duration: 3000,
      })
    }
  }

  // Remove a specific applied filter
  const removeFilter = (filterId: string) => {
    const filter = appliedFilters.find(f => f.id === filterId)
    if (!filter) return

    // Check if removing this filter will clear all filters
    const willClearAll = appliedFilters.length === 1

    // Update filter state - the useEffect will automatically apply filters
    switch (filter.type) {
      case 'city':
        setFilterCity('')
        break
      case 'zipcode':
        setFilterZipCode('')
        break
      case 'state':
        setFilterStates(prev => prev.filter(s => s !== filter.value))
        break
      case 'facility':
        setFilterFacility('')
        break
      case 'certification':
        setFilterCertification('')
        break
      case 'specialty':
        setFilterSpecialty('')
        break
      case 'minsalary':
        setFilterMinSalary('')
        break
      case 'maxsalary':
        setFilterMaxSalary('')
        break
      case 'shift':
        setFilterShift('all')
        break
      case 'duration':
        setFilterDuration('all')
        break
      case 'featured':
        setFilterFeaturedOnly(false)
        break
    }
    
    // If all filters are cleared, reset the tracked applied filter ID
    if (willClearAll) {
      setCurrentlyAppliedFilterId(null)
    }
    
    toast.success('Filter removed', {
      duration: 2000,
    })
  }

  // Clear all applied filters
  const clearAllFilters = () => {
    handleResetFilters()
    setSearchQuery('')
    setCurrentlyAppliedFilterId(null) // Clear the tracked applied filter
    // The useEffect will automatically apply filters after state updates
    toast.success('All filters cleared', {
      duration: 2000,
    })
  }

  // Save current filter as preset
  const [isSavingFilter, setIsSavingFilter] = useState(false)
  
  const handleSaveFilter = () => {
    if (isSavingFilter) return // Prevent double-saving
    
    if (!filterPresetName.trim()) {
      toast.error('Please enter a name for this filter', {
        duration: 3000,
      })
      return
    }

    setIsSavingFilter(true)

    const filterData = {
      name: filterPresetName.trim(),
      filters: {
        city: filterCity,
        zipCode: filterZipCode,
        states: filterStates,
        facility: filterFacility,
        certification: filterCertification,
        specialty: filterSpecialty,
        minSalary: filterMinSalary,
        maxSalary: filterMaxSalary,
        shift: filterShift,
        duration: filterDuration,
        featuredOnly: filterFeaturedOnly,
      }
    }

    try {
      const newFilterId = saveFilter(filterData)
      const updatedFilters = getSavedFilters()
      setSavedFilterPresets(updatedFilters)
      setFilterPresetName('')
      setShowSaveFilterModal(false)
      
      // Track the newly saved filter as applied
      setCurrentlyAppliedFilterId(newFilterId)
      
      // Apply filters after successful save
      applyFilters()
      
      toast.success('Filter saved and applied successfully', {
        duration: 3000,
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save filter', {
        duration: 3000,
      })
    } finally {
      setTimeout(() => {
        setIsSavingFilter(false)
      }, 500)
    }
  }

  // Handle cancel save filter - reset filter name and close modal
  // Note: Filters are not applied if user cancels
  // Also reset filter values to match currently applied filters (or clear if none)
  const handleCancelSaveFilter = () => {
    setFilterPresetName('')
    setShowSaveFilterModal(false)
    
    // Reset filter values to match currently applied filters
    // If no filters are applied, clear all filter values
    if (appliedFilters.length === 0) {
      handleResetFilters()
    } else {
      // Restore filter values from applied filters
      const cityFilter = appliedFilters.find(f => f.type === 'city')
      const zipFilter = appliedFilters.find(f => f.type === 'zipcode')
      const stateFilters = appliedFilters.filter(f => f.type === 'state')
      const facilityFilter = appliedFilters.find(f => f.type === 'facility')
      const certFilter = appliedFilters.find(f => f.type === 'certification')
      const specialtyFilter = appliedFilters.find(f => f.type === 'specialty')
      const minSalaryFilter = appliedFilters.find(f => f.type === 'minsalary')
      const maxSalaryFilter = appliedFilters.find(f => f.type === 'maxsalary')
      const shiftFilter = appliedFilters.find(f => f.type === 'shift')
      const durationFilter = appliedFilters.find(f => f.type === 'duration')
      const featuredFilter = appliedFilters.find(f => f.type === 'featured')
      
      setFilterCity(cityFilter?.value || '')
      setFilterZipCode(zipFilter?.value || '')
      setFilterStates(stateFilters.map(f => f.value))
      setFilterFacility(facilityFilter?.value || '')
      setFilterCertification(certFilter?.value || '')
      setFilterSpecialty(specialtyFilter?.value || '')
      // Min/Max salary stored as "$1234", need to remove $ and parse
      setFilterMinSalary(minSalaryFilter?.value ? minSalaryFilter.value.replace(/[^0-9.]/g, '') : '')
      setFilterMaxSalary(maxSalaryFilter?.value ? maxSalaryFilter.value.replace(/[^0-9.]/g, '') : '')
      // Shift stored as "Day", "Night", etc. - convert to lowercase
      setFilterShift(shiftFilter?.value ? shiftFilter.value.toLowerCase() : 'all')
      // Duration stored as "12 Hours" - need to extract just the number
      setFilterDuration(durationFilter?.value ? durationFilter.value.replace(/\s*Hours?/i, '') : 'all')
      setFilterFeaturedOnly(featuredFilter ? true : false)
    }
  }

  // Check if a saved filter matches currently applied filters
  const isFilterCurrentlyApplied = (preset: FilterPreset): boolean => {
    // If we have a tracked applied filter ID, use that for exact match
    if (currentlyAppliedFilterId) {
      return preset.id === currentlyAppliedFilterId
    }
    
    // Otherwise, check if filter values match (for backwards compatibility)
    if (appliedFilters.length === 0) return false
    
    // Compare each filter value
    const cityMatch = (!preset.filters.city && !filterCity) || preset.filters.city === filterCity
    const zipMatch = (!preset.filters.zipCode && !filterZipCode) || preset.filters.zipCode === filterZipCode
    const statesMatch = JSON.stringify([...preset.filters.states].sort()) === JSON.stringify([...filterStates].sort())
    const facilityMatch = (!preset.filters.facility && !filterFacility) || preset.filters.facility === filterFacility
    const certMatch = (!preset.filters.certification && !filterCertification) || preset.filters.certification === filterCertification
    const specialtyMatch = (!preset.filters.specialty && !filterSpecialty) || preset.filters.specialty === filterSpecialty
    const minSalaryMatch = (!preset.filters.minSalary && !filterMinSalary) || preset.filters.minSalary === filterMinSalary
    const maxSalaryMatch = (!preset.filters.maxSalary && !filterMaxSalary) || preset.filters.maxSalary === filterMaxSalary
    const shiftMatch = preset.filters.shift === filterShift
    const durationMatch = preset.filters.duration === filterDuration
    const featuredMatch = preset.filters.featuredOnly === filterFeaturedOnly
    
    return cityMatch && zipMatch && statesMatch && facilityMatch && certMatch && 
           specialtyMatch && minSalaryMatch && maxSalaryMatch && shiftMatch && 
           durationMatch && featuredMatch
  }

  // Apply a saved filter preset
  const applySavedFilter = (preset: FilterPreset) => {
    setFilterCity(preset.filters.city)
    setFilterZipCode(preset.filters.zipCode)
    setFilterStates(preset.filters.states)
    setFilterFacility(preset.filters.facility)
    setFilterCertification(preset.filters.certification)
    setFilterSpecialty(preset.filters.specialty)
    setFilterMinSalary(preset.filters.minSalary)
    setFilterMaxSalary(preset.filters.maxSalary)
    setFilterShift(preset.filters.shift)
    setFilterDuration(preset.filters.duration)
    setFilterFeaturedOnly(preset.filters.featuredOnly)
    // Track which saved filter is currently applied
    setCurrentlyAppliedFilterId(preset.id)
    
    // Close the saved filters modal
    setShowSavedFilters(false)
    
    // Apply filters to refresh the job listing
    setTimeout(() => {
      applyFilters()
    }, 100)
    
    toast.success('Filter applied successfully', {
      duration: 3000,
    })
  }

  // Handle edit filter - open advanced filter modal with filter data in edit mode
  const handleEditFilter = (preset: FilterPreset) => {
    setFilterToEdit(preset)
    // Load filter values into the form
    setFilterCity(preset.filters.city)
    setFilterZipCode(preset.filters.zipCode)
    setFilterStates(preset.filters.states)
    setFilterFacility(preset.filters.facility)
    setFilterCertification(preset.filters.certification)
    setFilterSpecialty(preset.filters.specialty)
    setFilterMinSalary(preset.filters.minSalary)
    setFilterMaxSalary(preset.filters.maxSalary)
    setFilterShift(preset.filters.shift)
    setFilterDuration(preset.filters.duration)
    setFilterFeaturedOnly(preset.filters.featuredOnly)
    setShowSavedFilters(false)
    setShowFilters(true) // Open advanced filter modal in edit mode
  }

  // Cancel edit filter - restore original filter values or clear if not editing
  const handleCancelEditFilter = () => {
    if (filterToEdit) {
      // Restore to original filter values
      setFilterCity(filterToEdit.filters.city)
      setFilterZipCode(filterToEdit.filters.zipCode)
      setFilterStates(filterToEdit.filters.states)
      setFilterFacility(filterToEdit.filters.facility)
      setFilterCertification(filterToEdit.filters.certification)
      setFilterSpecialty(filterToEdit.filters.specialty)
      setFilterMinSalary(filterToEdit.filters.minSalary)
      setFilterMaxSalary(filterToEdit.filters.maxSalary)
      setFilterShift(filterToEdit.filters.shift)
      setFilterDuration(filterToEdit.filters.duration)
      setFilterFeaturedOnly(filterToEdit.filters.featuredOnly)
    } else {
      // If not editing, just reset filters
      handleResetFilters()
    }
    // Close the modal and reset edit state
    setShowFilters(false)
    setEditFilterName('')
    setFilterToEdit(null)
  }

  // Delete a saved filter preset - show confirmation first
  const handleDeleteSavedFilter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFilterToDelete(id)
    setShowDeleteConfirm(true)
  }

  // Confirm delete saved filter
  const confirmDeleteSavedFilter = () => {
    if (!filterToDelete) return
    
    // Check if the deleted filter is currently applied
    const isCurrentlyApplied = currentlyAppliedFilterId === filterToDelete
    
    deleteFilter(filterToDelete)
    const updatedFilters = getSavedFilters()
    setSavedFilterPresets(updatedFilters)
    setFilterToDelete(null)
    setShowDeleteConfirm(false)
    
    // If the deleted filter was currently applied, clear all filters and refresh job listing
    if (isCurrentlyApplied) {
      // Clear all filter values
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
      
      // Clear the currently applied filter ID
      setCurrentlyAppliedFilterId(null)
      localStorage.removeItem('currentlyAppliedFilterId')
      
      // Refresh job listing to show all jobs without filters
      setTimeout(() => {
        applyFilters()
      }, 100)
    }
    
    // Close the saved filters modal to redirect user to job listing page
    setShowSavedFilters(false)
    
    toast.success('Filter deleted successfully', {
      duration: 3000,
    })
  }

  // Cancel delete
  const cancelDeleteSavedFilter = () => {
    setFilterToDelete(null)
    setShowDeleteConfirm(false)
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
    setSearchQuery('')
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
                              {filterToEdit ? 'Edit Filter' : 'Advanced Job Filters'}
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                              {filterToEdit ? `Editing: ${filterToEdit.name}` : 'Refine your search to find the perfect job'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Close Button */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            if (filterToEdit) {
                              handleCancelEditFilter()
                            } else {
                              setShowFilters(false)
                            }
                          }}
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
                            className="relative"
                          >
                            <select
                              value=""
                              onChange={(e) => {
                                if (e.target.value && !filterStates.includes(e.target.value)) {
                                  setFilterStates([...filterStates, e.target.value])
                                }
                              }}
                              className="w-full px-4 py-2.5 pr-10 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 cursor-pointer appearance-none text-gray-400"
                            >
                              <option value="" disabled className="text-gray-400">Search and select states...</option>
                              <option value="California">California</option>
                              <option value="Texas">Texas</option>
                              <option value="Florida">Florida</option>
                              <option value="New York">New York</option>
                              <option value="Illinois">Illinois</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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
                            className="relative"
                          >
                            <select
                              value={filterShift}
                              onChange={(e) => setFilterShift(e.target.value)}
                              className={`w-full px-4 py-2.5 pr-10 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 cursor-pointer appearance-none ${
                                filterShift === 'all' ? 'text-gray-400' : 'text-gray-900'
                              }`}
                            >
                              <option value="all" className="text-gray-400">All Shifts</option>
                              <option value="day">Day Shift</option>
                              <option value="night">Night Shift</option>
                              <option value="evening">Evening Shift</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          </motion.div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="relative"
                          >
                            <select
                              value={filterDuration}
                              onChange={(e) => setFilterDuration(e.target.value)}
                              className={`w-full px-4 py-2.5 pr-10 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 cursor-pointer appearance-none ${
                                filterDuration === 'all' ? 'text-gray-400' : 'text-gray-900'
                              }`}
                            >
                              <option value="all" className="text-gray-400">All Durations</option>
                              <option value="8">8 Hours</option>
                              <option value="10">10 Hours</option>
                              <option value="12">12 Hours</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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
                          className="group relative flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all text-sm sm:text-base overflow-hidden"
                        >
                          {/* Glassmorphism overlay on hover */}
                          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                            style={{
                              backdropFilter: 'saturate(180%) blur(20px)',
                              WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                            }}
                          />
                          <span className="relative z-10 flex items-center gap-2 justify-center">
                            Reset
                          </span>
                        </motion.button>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
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
                              {filterToEdit ? 'Update Filter' : 'Save & Apply Filter'}
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
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-6">
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
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Find Your Next Travel Nursing Job
          </motion.h1>

          {/* All-in-One Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 lg:gap-3"
          >
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-primary-300 transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    applyFilters()
                  }
                }}
                placeholder="Search by job title, facility, location, certification..."
                className="flex-1 bg-transparent border-none outline-none text-base text-gray-900 placeholder-gray-400"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSearchQuery('')
                      applyFilters()
                    }}
                    className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Advanced Filters Button */}
            <motion.button
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowFilters(!showFilters)}
              className="relative inline-flex items-center gap-2.5 px-4 py-3 bg-white border border-gray-200 hover:border-primary-300 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
            >
              {/* Glassmorphism overlay on hover */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  backdropFilter: 'saturate(180%) blur(20px)',
                  WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                }}
              />
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:scale-110 relative z-10">
                <SlidersHorizontal className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors whitespace-nowrap relative z-10">
                Advanced Filters
              </span>
              <motion.div
                animate={{ rotate: showFilters ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </motion.div>
            </motion.button>

            {/* Divider */}
            <div className="hidden lg:block w-px h-6 bg-gray-300"></div>

            {/* Browse Dropdown - Jobs by State & Nursing Specialties */}
            <div className="relative">
              <motion.button 
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowQuickAccessDropdown(!showQuickAccessDropdown)}
                className="relative inline-flex items-center gap-2.5 px-4 py-3 bg-white border border-gray-200 hover:border-primary-300 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{
                    backdropFilter: 'saturate(180%) blur(20px)',
                    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                  }}
                />
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:scale-110 relative z-10">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors whitespace-nowrap relative z-10">
                  Explore Jobs
                </span>
                <motion.div
                  animate={{ rotate: showQuickAccessDropdown ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-all" />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showQuickAccessDropdown && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowQuickAccessDropdown(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {/* Jobs by State Option */}
                        <Link href="/jobs-by-state" onClick={() => setShowQuickAccessDropdown(false)}>
                          <motion.button
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors group"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:scale-110">
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                                Jobs by State
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                Browse by location
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </motion.button>
            </Link>

                        {/* Divider */}
                        <div className="h-px bg-gray-200 my-2" />

                        {/* Nursing Specialties Option */}
                        <Link href="/nursing-specialties" onClick={() => setShowQuickAccessDropdown(false)}>
              <motion.button 
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors group"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:scale-110">
                              <Stethoscope className="w-5 h-5 text-white" />
                </div>
                            <div className="flex-1 text-left">
                              <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                  Nursing Specialties
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                Explore specialties
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </motion.button>
            </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Results Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white sticky top-20 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-primary-600 rounded-full"
              />
              <span className="text-gray-700">
                Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs
                <span className="text-gray-500"> (of {SAMPLE_JOBS.length} total)</span>
              </span>
              
              
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Saved Filters Button - Only show when saved filters exist */}
              {savedFilterPresets.length > 0 && (
              <div className="relative">
                <motion.button
                  onClick={() => setShowSavedFilters(!showSavedFilters)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-primary-300 rounded-xl text-sm font-semibold text-gray-700 hover:text-primary-600 transition-all shadow-sm overflow-hidden group"
                >
                  {/* Glassmorphism overlay on hover */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    style={{
                      backdropFilter: 'saturate(180%) blur(20px)',
                      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                    }}
                  />
                  <BookmarkCheck className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Saved Filters</span>
                    <span className="relative z-10 px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                      {savedFilterPresets.length}
                    </span>
                  <motion.div
                    animate={{ rotate: showSavedFilters ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <ChevronRight size={16} className="rotate-90" />
                  </motion.div>
                </motion.button>

                                          </div>
                                        )}

              {/* Sort Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-primary-300 rounded-xl text-sm font-semibold text-gray-700 hover:text-primary-600 transition-all shadow-sm overflow-hidden group"
                >
                  {/* Glassmorphism overlay on hover */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    style={{
                      backdropFilter: 'saturate(180%) blur(20px)',
                      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                    }}
                  />
                  <SlidersHorizontal className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Sort: {
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
                    className="relative z-10"
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
        </div>
      </motion.div>


      {/* Save Filter Modal */}
      <AnimatePresence>
        {showSaveFilterModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Save className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Save Filter to Apply</h3>
                  </div>
                  <button
                    onClick={() => handleCancelSaveFilter()}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Please save your filter settings with a name to apply them. This will allow you to quickly access these filters later.
                </p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter Name
                  </label>
                  <input
                    type="text"
                    value={filterPresetName}
                    onChange={(e) => setFilterPresetName(e.target.value)}
                    placeholder="e.g., High Salary ER Jobs"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && filterPresetName.trim() && !isSavingFilter) {
                        handleSaveFilter()
                      }
                    }}
                    autoFocus
                  />
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCancelSaveFilter()}
                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveFilter}
                    disabled={!filterPresetName.trim() || isSavingFilter}
                    className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                  >
                    {isSavingFilter ? 'Saving...' : 'Save & Apply'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Saved Filters Modal */}
      <AnimatePresence>
        {showSavedFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
              onClick={() => setShowSavedFilters(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              >
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
                          <BookmarkCheck className="w-7 h-7 text-white" />
                        </div>
                      </motion.div>
                      
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                          Saved Filters
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Manage your saved filter presets
                        </p>
                      </div>
                    </div>
                    
                    {/* Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowSavedFilters(false)}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pb-6">
                  {savedFilterPresets.length === 0 ? (
                    <div className="text-center py-16">
                      <BookmarkCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved filters</h3>
                      <p className="text-sm text-gray-500">Save filters to quickly access them later</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedFilterPresets.map((preset, idx) => {
                        const isApplied = isFilterCurrentlyApplied(preset)
                        return (
                          <motion.div
                            key={preset.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="group relative"
                          >
                            {/* Main card */}
                            <div className={`relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border-2 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-xl ${
                              isApplied ? 'border-primary-300' : 'border-gray-200 hover:border-primary-300'
                            }`}>
                              {/* Decorative corner accent */}
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-[100px]" />
                              
                              <div className="flex items-start justify-between gap-4 relative">
                                {/* Left: Filter Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-4 mb-3">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-base font-semibold text-gray-900">
                                        {preset.name}
                                      </h3>
                                      {isApplied && (
                                        <span className="px-2 py-0.5 bg-primary-600 text-white text-xs font-medium rounded">
                                          Applied
                                        </span>
                                      )}
                                    </div>

                                    {/* Right: Actions - Aligned with filter name */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      {!isApplied && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            applySavedFilter(preset)
                                            setShowSavedFilters(false)
                                          }}
                                          className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
                                          aria-label="Apply filter"
                                        >
                                          Apply
                                        </button>
                                      )}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleEditFilter(preset)
                                        }}
                                        className="p-2 bg-white/90 backdrop-blur-md hover:bg-primary-50 border border-gray-200 hover:border-primary-300 text-primary-600 rounded-lg transition-colors shadow-md"
                                        aria-label="Edit filter"
                                        title="Edit filter"
                                      >
                                        <Pencil className="w-4 h-4" />
                                      </button>
                                      {!isApplied && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setFilterToDelete(preset.id)
                                            setShowDeleteConfirm(true)
                                          }}
                                          className="p-2 bg-white/90 backdrop-blur-md hover:bg-red-50 border border-gray-200 hover:border-red-300 text-red-600 rounded-lg transition-colors shadow-md"
                                          aria-label="Delete filter"
                                          title="Delete filter"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Filter Details - Label: Value format */}
                                  <div className="space-y-2">
                                    {preset.filters.city && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">City:</span>
                                        <span className="text-gray-900">{preset.filters.city}</span>
                                      </div>
                                    )}
                                    {preset.filters.zipCode && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">Zip Code:</span>
                                        <span className="text-gray-900">{preset.filters.zipCode}</span>
                                      </div>
                                    )}
                                    {preset.filters.states.length > 0 && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">States:</span>
                                        <span className="text-gray-900">{preset.filters.states.join(', ')}</span>
                                      </div>
                                    )}
                                    {preset.filters.facility && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">Facility:</span>
                                        <span className="text-gray-900">{preset.filters.facility}</span>
                                      </div>
                                    )}
                                    {preset.filters.certification && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">Certification:</span>
                                        <span className="text-gray-900">{preset.filters.certification}</span>
                                      </div>
                                    )}
                                    {preset.filters.specialty && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">Specialty:</span>
                                        <span className="text-gray-900">{preset.filters.specialty}</span>
                                      </div>
                                    )}
                                    {preset.filters.shift !== 'all' && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">Shift:</span>
                                        <span className="text-gray-900 capitalize">{preset.filters.shift}</span>
                                      </div>
                                    )}
                                    {preset.filters.duration !== 'all' && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">Duration:</span>
                                        <span className="text-gray-900">{preset.filters.duration} Hours</span>
                                      </div>
                                    )}
                                    {(preset.filters.minSalary || preset.filters.maxSalary) && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">Salary:</span>
                                        <span className="text-gray-900">
                                          {preset.filters.minSalary ? `$${preset.filters.minSalary}` : ''}
                                          {preset.filters.minSalary && preset.filters.maxSalary ? ' - ' : ''}
                                          {preset.filters.maxSalary ? `$${preset.filters.maxSalary}` : ''}
                                        </span>
                                      </div>
                                    )}
                                    {preset.filters.featuredOnly && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500 font-medium min-w-[60px]">Featured:</span>
                                        <span className="inline-flex items-center gap-1 text-amber-600">
                                          <Star className="w-4 h-4 fill-amber-600" />
                                          Yes
                                        </span>
                                      </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}
                </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>


          {/* Delete Confirmation Dialog */}
          <AnimatePresence>
            {showDeleteConfirm && filterToDelete && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[120] flex items-center justify-center p-4"
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setFilterToDelete(null)
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Delete Filter?</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                      Are you sure you want to delete this saved filter? This action cannot be undone.
                    </p>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowDeleteConfirm(false)
                          setFilterToDelete(null)
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => confirmDeleteSavedFilter()}
                        className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

      {/* Job Listings - Modern Card Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search criteria to find more jobs.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
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
                              <p className="text-xs font-semibold text-gray-900">{formatDateWithYear(job.startDate || job.postedDate)}</p>
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
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

