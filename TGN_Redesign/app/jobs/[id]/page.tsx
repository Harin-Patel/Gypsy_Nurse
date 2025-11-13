'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Briefcase,
  Building2,
  Bookmark,
  Share2,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Globe,
  ThumbsUp,
  ThumbsDown,
  Send,
  Award,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

interface JobDetails {
  id: string
  title: string
  location: string
  state: string
  city: string
  zipCode: string
  shift: string
  shiftHours: string
  salary: string
  weeklyPay: string
  grossWeeklyPay: string
  taxFreeStipend: string
  postedDate: string
  facilityName?: string
  facilityType: string
  facilityAvailable: boolean
  staffingCompany: string
  tags: string[]
  description: string
  requirements: string[]
  benefits: string[]
  contactEmail: string
  contactPhone: string
  website: string
  duration: string
  startDate: string
  endDate?: string
  specialtyRequired: string
  profession: string
  certifications: string[]
  jobType: string
  experienceLevel: string
  patientPopulation?: string
  patientRatio?: string
  beds?: number
  scrubColor?: string
  floatRequirements?: string
  callRequirements?: string
  weekendRequirements?: string
  guaranteedHours?: number
  overtimeAvailable?: boolean
  emrSystem?: string
  licensureRequired: string[]
  vaccineRequirements?: string[]
  parkingInfo?: string
  orientationPeriod?: string
  housingStipend?: string
  travelReimbursement?: boolean
  mealAllowance?: string
  extensionOptions?: string
  shiftDifferential?: string
}

// Sample job data - in production, this would come from an API
const SAMPLE_JOB_DATA: Record<string, JobDetails> = {
  '1': {
    id: '1',
    title: 'Travel ER (Emergency Room) RN (Registered Nurse)',
    location: 'Sioux Falls, SD 57101',
    state: 'South Dakota',
    city: 'Sioux Falls',
    zipCode: '57101',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$58/hr',
    weeklyPay: '$2,800',
    grossWeeklyPay: '$3,200',
    taxFreeStipend: '$1,400/week',
    postedDate: 'Nov 7, 2025',
    facilityName: 'Facility information not available',
    facilityType: 'Hospital',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Emergency Room', 'Registered Nurse', '13 Weeks'],
    description: 'Travel Emergency Room Registered Nurse position in South Dakota. This is an excellent opportunity for experienced ER nurses to work in a dynamic emergency department setting. You will be responsible for providing high-quality emergency care to patients of all ages, working alongside a dedicated team of healthcare professionals.',
    requirements: [
      'Valid RN license in South Dakota (or compact state license)',
      'Minimum 1 year of Emergency Room experience required',
      'BLS and ACLS certification required',
      'PALS certification preferred',
      'Strong triage and assessment skills',
      'Experience with trauma patients',
      'Ability to work in fast-paced environment',
      'EMR experience preferred'
    ],
    benefits: [
      'Competitive compensation package with weekly pay',
      'Comprehensive health, dental, and vision insurance',
      'Housing assistance available',
      'Travel reimbursement',
      'Continuing education opportunities',
      '401(k) retirement plan with company match',
      'Referral bonus program',
      'License reimbursement'
    ],
    contactEmail: 'er-jobs@abstaffing.com',
    contactPhone: '(555) 123-4567',
    website: 'www.abstaffing.com',
    duration: '13 weeks',
    startDate: 'November 15, 2025',
    endDate: 'February 14, 2026',
    specialtyRequired: 'Emergency Room - Registered Nurse',
    profession: 'Registered Nurse (RN)',
    certifications: ['RN License', 'BLS', 'ACLS', 'PALS (Preferred)'],
    jobType: 'Travel Contract',
    experienceLevel: 'Experienced (1+ years)',
    patientPopulation: 'All Ages',
    patientRatio: '1:4-5 patients',
    beds: 300,
    scrubColor: 'Hospital Provided',
    floatRequirements: 'No floating required',
    callRequirements: 'No on-call required',
    weekendRequirements: 'Every other weekend',
    guaranteedHours: 36,
    overtimeAvailable: true,
    emrSystem: 'EPIC',
    licensureRequired: ['South Dakota RN License or Compact License'],
    vaccineRequirements: ['COVID-19', 'Flu (seasonal)', 'MMR', 'Hepatitis B'],
    parkingInfo: 'Free employee parking',
    orientationPeriod: '3-5 days paid orientation',
    housingStipend: '$1,400/week tax-free',
    travelReimbursement: true,
    mealAllowance: 'Cafeteria available',
    extensionOptions: 'Available',
    shiftDifferential: 'Evening: $3/hr, Night: $5/hr, Weekend: $4/hr'
  },
  '2': {
    id: '2',
    title: 'Emergency Room Job in Greenbrae, CA',
    location: 'Greenbrae, CA 94904',
    state: 'California',
    city: 'Greenbrae',
    zipCode: '94904',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$68/hr',
    weeklyPay: '$3,200',
    grossWeeklyPay: '$3,600',
    taxFreeStipend: '$1,600/week',
    postedDate: 'Nov 6, 2025',
    facilityName: 'Facility information not available',
    facilityType: 'Hospital',
    facilityAvailable: false,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Emergency Room', 'Registered Nurse', '13 Weeks'],
    description: "Emergency Room Registered Nurse position in Greenbrae, California. I'm an experienced registered nurse with a background in Medical-Surgical nursing, seeking a travel opportunity with Travel Nurse. This position offers the chance to work in beautiful Northern California while providing excellent emergency care to patients.",
    requirements: [
      'Valid RN license in California',
      'Minimum 1 year of Emergency Room experience required',
      'BLS and ACLS certification required',
      'PALS certification preferred',
      'Medical-Surgical nursing background preferred',
      'Strong assessment and communication skills',
      'Experience with trauma and critical care',
      'Ability to work in fast-paced environment'
    ],
    benefits: [
      'Excellent compensation package',
      'Comprehensive health, dental, and vision insurance',
      'Housing assistance available',
      'Travel reimbursement',
      'Continuing education opportunities',
      '401(k) retirement plan with company match',
      'Referral bonus program',
      'License reimbursement',
      'Completion bonus'
    ],
    contactEmail: 'er-jobs@abstaffing.com',
    contactPhone: '(555) 234-5678',
    website: 'www.abstaffing.com',
    duration: '13 weeks',
    startDate: 'November 20, 2025',
    endDate: 'February 19, 2026',
    specialtyRequired: 'Emergency Room - Registered Nurse',
    profession: 'Registered Nurse (RN)',
    certifications: ['RN License', 'BLS', 'ACLS', 'PALS (Preferred)'],
    jobType: 'Travel Contract',
    experienceLevel: 'Experienced (1+ years)',
    patientPopulation: 'All Ages',
    patientRatio: '1:4-5 patients',
    beds: 250,
    scrubColor: 'Hospital Provided',
    floatRequirements: 'No floating required',
    callRequirements: 'No on-call required',
    weekendRequirements: 'Every other weekend',
    guaranteedHours: 36,
    overtimeAvailable: true,
    emrSystem: 'EPIC',
    licensureRequired: ['California RN License'],
    vaccineRequirements: ['COVID-19', 'Flu (seasonal)', 'MMR', 'Hepatitis B', 'Tdap'],
    parkingInfo: 'Free employee parking',
    orientationPeriod: '3-5 days paid orientation',
    housingStipend: '$1,600/week tax-free',
    travelReimbursement: true,
    mealAllowance: 'Cafeteria available',
    extensionOptions: 'Available',
    shiftDifferential: 'Evening: $4/hr, Night: $6/hr, Weekend: $5/hr'
  },
  '3': {
    id: '3',
    title: 'Strike',
    location: 'Merrill, NM',
    state: 'New Mexico',
    city: 'Merrill',
    zipCode: '87000',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$48/hr',
    weeklyPay: '$2,500',
    grossWeeklyPay: '$2,800',
    taxFreeStipend: '$1,300/week',
    postedDate: 'Oct 11, 2025',
    facilityName: 'Aspirus Merrill',
    facilityType: 'Hospital',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Strike', 'Clinical Lab Scientist', '8 Weeks'],
    description: 'Strike assignment for Clinical Lab Scientist at Aspirus Merrill. This is a short-term strike assignment with competitive pay and immediate start. Join our team during this critical period and help maintain quality patient care.',
    requirements: [
      'Valid Clinical Lab Scientist license in New Mexico',
      'Minimum 1 year of clinical lab experience',
      'ASCP or equivalent certification required',
      'Ability to work in fast-paced environment',
      'Flexible schedule availability',
      'Strong attention to detail'
    ],
    benefits: [
      'Competitive strike pay rates',
      'Weekly pay with guaranteed hours',
      'Housing assistance available',
      'Travel reimbursement',
      'Completion bonus available',
      'Professional liability insurance'
    ],
    contactEmail: 'strike-jobs@abstaffing.com',
    contactPhone: '(555) 345-6789',
    website: 'www.abstaffing.com',
    duration: '8 weeks',
    startDate: 'October 15, 2025',
    endDate: 'December 10, 2025',
    specialtyRequired: 'Strike - Clinical Lab Scientist',
    profession: 'Clinical Lab Scientist',
    certifications: ['ASCP Certification', 'State License'],
    jobType: 'Strike Assignment',
    experienceLevel: 'Experienced (1+ years)',
    patientPopulation: 'All Ages',
    beds: 200,
    scrubColor: 'Hospital Provided',
    floatRequirements: 'May float to other lab areas',
    callRequirements: 'No on-call required',
    weekendRequirements: 'As needed',
    guaranteedHours: 40,
    overtimeAvailable: true,
    emrSystem: 'EPIC',
    licensureRequired: ['New Mexico Clinical Lab Scientist License'],
    vaccineRequirements: ['COVID-19', 'Flu (seasonal)', 'MMR', 'Hepatitis B'],
    parkingInfo: 'Free employee parking',
    orientationPeriod: '1-2 days orientation',
    housingStipend: '$1,300/week tax-free',
    travelReimbursement: true,
    mealAllowance: 'Cafeteria available',
    extensionOptions: 'Not available (strike assignment)',
    shiftDifferential: 'Evening: $3/hr, Night: $5/hr, Weekend: $4/hr'
  },
  '4': {
    id: '4',
    title: 'ICU Travel Nurse - Phoenix, AZ',
    location: 'Phoenix, AZ 85001',
    state: 'Arizona',
    city: 'Phoenix',
    zipCode: '85001',
    shift: 'Night Shift',
    shiftHours: '12 Hours',
    salary: '$65/hr',
    weeklyPay: '$3,500',
    grossWeeklyPay: '$3,900',
    taxFreeStipend: '$1,500/week',
    postedDate: 'Nov 10, 2025',
    facilityName: 'Banner Health System',
    facilityType: 'Level I Trauma Center',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Night Shift', 'ICU', 'Registered Nurse', '13 Weeks'],
    description: 'Join our Intensive Care Unit team at Banner Health System in Phoenix, Arizona. This is an excellent opportunity for experienced ICU nurses to work in a state-of-the-art facility with cutting-edge technology and a collaborative team environment. Phoenix offers year-round sunshine and a vibrant city life.',
    requirements: [
      'Valid RN license in Arizona (or compact state license)',
      'Minimum 2 years of ICU experience required',
      'BLS and ACLS certification required',
      'CCRN certification preferred',
      'Experience with ventilators, vasoactive drips, and critical care protocols',
      'Strong critical thinking and assessment skills',
      'Ability to work in high-stress environment'
    ],
    benefits: [
      'Excellent compensation package',
      'Comprehensive health, dental, and vision insurance',
      'Housing assistance or stipend available',
      'Travel reimbursement',
      'Continuing education opportunities',
      '401(k) retirement plan with company match',
      'Referral bonus program',
      'License reimbursement',
      'Completion bonus'
    ],
    contactEmail: 'icu-jobs@abstaffing.com',
    contactPhone: '(555) 456-7890',
    website: 'www.abstaffing.com',
    duration: '13 weeks',
    startDate: 'November 20, 2025',
    endDate: 'February 19, 2026',
    specialtyRequired: 'ICU - Registered Nurse',
    profession: 'Registered Nurse (RN)',
    certifications: ['RN License', 'BLS', 'ACLS', 'CCRN (Preferred)'],
    jobType: 'Travel Contract',
    experienceLevel: 'Expert (2+ years)',
    patientPopulation: 'Adult (18+ years)',
    patientRatio: '1:2 patients',
    beds: 600,
    scrubColor: 'Ceil Blue',
    floatRequirements: 'May float to step-down units',
    callRequirements: 'No on-call required',
    weekendRequirements: 'Every other weekend',
    guaranteedHours: 36,
    overtimeAvailable: true,
    emrSystem: 'Cerner',
    licensureRequired: ['Arizona RN License or Compact License'],
    vaccineRequirements: ['COVID-19', 'Flu (seasonal)', 'MMR', 'Hepatitis B', 'Tdap'],
    parkingInfo: 'Free covered parking',
    orientationPeriod: '5-7 days paid orientation',
    housingStipend: '$1,500/week tax-free',
    travelReimbursement: true,
    mealAllowance: '$12/shift meal voucher',
    extensionOptions: 'Available',
    shiftDifferential: 'Evening: $4/hr, Night: $6/hr, Weekend: $5/hr'
  },
  '5': {
    id: '5',
    title: 'Med-Surg RN - Seattle, WA',
    location: 'Seattle, WA 98101',
    state: 'Washington',
    city: 'Seattle',
    zipCode: '98101',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$58/hr',
    weeklyPay: '$3,000',
    grossWeeklyPay: '$3,400',
    taxFreeStipend: '$1,400/week',
    postedDate: 'Nov 9, 2025',
    facilityName: 'Seattle Medical Center',
    facilityType: 'Acute Care Hospital',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Day Shift', 'Medical-Surgical', 'Registered Nurse', '13 Weeks'],
    description: 'Medical-Surgical Registered Nurse position at Seattle Medical Center in the beautiful Pacific Northwest. This position offers the opportunity to work in a progressive healthcare facility while enjoying all that Seattle has to offer - from coffee culture to outdoor recreation.',
    requirements: [
      'Valid RN license in Washington (or compact state license)',
      'Minimum 1 year of Med-Surg experience required',
      'BLS certification required',
      'Strong assessment and communication skills',
      'Ability to manage multiple patients',
      'Experience with EPIC EMR preferred'
    ],
    benefits: [
      'Competitive compensation with housing stipend',
      'Comprehensive health, dental, and vision insurance',
      'Housing assistance available',
      'Travel reimbursement',
      'Paid time off',
      'Continuing education opportunities',
      '401(k) retirement plan',
      'Referral bonus program'
    ],
    contactEmail: 'medsurg-jobs@abstaffing.com',
    contactPhone: '(555) 567-8901',
    website: 'www.abstaffing.com',
    duration: '13 weeks',
    startDate: 'November 25, 2025',
    endDate: 'February 24, 2026',
    specialtyRequired: 'Medical-Surgical - Registered Nurse',
    profession: 'Registered Nurse (RN)',
    certifications: ['RN License', 'BLS'],
    jobType: 'Travel Contract',
    experienceLevel: 'Experienced (1+ years)',
    patientPopulation: 'Adult (18+ years)',
    patientRatio: '1:5-6 patients',
    beds: 350,
    scrubColor: 'Navy Blue',
    floatRequirements: 'May float to other Med-Surg units',
    callRequirements: 'No on-call required',
    weekendRequirements: 'Every other weekend',
    guaranteedHours: 36,
    overtimeAvailable: true,
    emrSystem: 'EPIC',
    licensureRequired: ['Washington RN License or Compact License'],
    vaccineRequirements: ['COVID-19', 'Flu (seasonal)', 'MMR', 'Hepatitis B'],
    parkingInfo: 'Discounted parking available',
    orientationPeriod: '3-5 days paid orientation',
    housingStipend: '$1,400/week tax-free',
    travelReimbursement: true,
    mealAllowance: 'Cafeteria discount available',
    extensionOptions: 'Available',
    shiftDifferential: 'Evening: $3/hr, Night: $5/hr, Weekend: $4/hr'
  },
  '6': {
    id: '6',
    title: 'ER Night Shift - Remote Location',
    location: 'Billings, MT 59101',
    state: 'Montana',
    city: 'Billings',
    zipCode: '59101',
    shift: 'Night Shift',
    shiftHours: '12 Hours',
    salary: '$52/hr',
    weeklyPay: '$2,600',
    grossWeeklyPay: '$3,000',
    taxFreeStipend: '$1,200/week',
    postedDate: 'Nov 8, 2025',
    facilityName: 'Rural Community Hospital',
    facilityType: 'Community Hospital',
    facilityAvailable: true,
    staffingCompany: 'AB Staffing Solutions',
    tags: ['Night Shift', 'Emergency Room', 'Registered Nurse', '13 Weeks'],
    description: 'Emergency Room Registered Nurse position at Rural Community Hospital in Montana. This position offers a unique opportunity to work in a smaller community setting with a close-knit team. Perfect for nurses who enjoy a slower pace and more personal patient interactions.',
    requirements: [
      'Valid RN license in Montana (or compact state license)',
      'Minimum 1 year of ER experience required',
      'BLS and ACLS certification required',
      'PALS certification preferred',
      'Strong triage and assessment skills',
      'Ability to work independently',
      'Experience with trauma patients'
    ],
    benefits: [
      'Competitive compensation package',
      'Housing assistance available',
      'Travel reimbursement',
      'Weekly pay',
      'Continuing education opportunities',
      'Professional liability insurance',
      'License reimbursement'
    ],
    contactEmail: 'er-jobs@abstaffing.com',
    contactPhone: '(555) 678-9012',
    website: 'www.abstaffing.com',
    duration: '13 weeks',
    startDate: 'November 18, 2025',
    endDate: 'February 17, 2026',
    specialtyRequired: 'Emergency Room - Registered Nurse',
    profession: 'Registered Nurse (RN)',
    certifications: ['RN License', 'BLS', 'ACLS', 'PALS (Preferred)'],
    jobType: 'Travel Contract',
    experienceLevel: 'Experienced (1+ years)',
    patientPopulation: 'All Ages',
    patientRatio: '1:4-5 patients',
    beds: 50,
    scrubColor: 'Hospital Provided',
    floatRequirements: 'No floating required',
    callRequirements: 'No on-call required',
    weekendRequirements: 'Every other weekend',
    guaranteedHours: 36,
    overtimeAvailable: false,
    emrSystem: 'Meditech',
    licensureRequired: ['Montana RN License or Compact License'],
    vaccineRequirements: ['COVID-19', 'Flu (seasonal)', 'MMR', 'Hepatitis B'],
    parkingInfo: 'Free employee parking',
    orientationPeriod: '3-5 days paid orientation',
    housingStipend: '$1,200/week tax-free',
    travelReimbursement: true,
    mealAllowance: 'Cafeteria available',
    extensionOptions: 'Available',
    shiftDifferential: 'Evening: $3/hr, Night: $6/hr, Weekend: $4/hr'
  },
  '7': {
    id: '7',
    title: 'ER Nurse - Boston, MA',
    location: 'Boston, MA 02114',
    state: 'Massachusetts',
    city: 'Boston',
    zipCode: '02114',
    shift: 'Day Shift',
    shiftHours: '12 Hours',
    salary: '$66/hr',
    weeklyPay: '$3,200',
    grossWeeklyPay: '$3,600',
    taxFreeStipend: '$1,500/week',
    postedDate: 'Nov 8, 2025',
    facilityName: 'Massachusetts General Hospital',
    facilityType: 'Level I Trauma Center',
    facilityAvailable: true,
    staffingCompany: 'Travel Nurse Solutions',
    tags: ['Day Shift', 'Emergency Room', 'Registered Nurse', '13 Weeks'],
    description: 'Emergency Room Registered Nurse position at Massachusetts General Hospital in Boston, Massachusetts. This is an excellent opportunity to work at one of the nation\'s top-ranked hospitals in the heart of historic Boston. You will be part of a world-class emergency department team providing exceptional care to a diverse patient population.',
    requirements: [
      'Valid RN license in Massachusetts',
      'Minimum 1 year of Emergency Room experience required',
      'BLS and ACLS certification required',
      'PALS certification preferred',
      'Trauma experience preferred',
      'Strong assessment and triage skills',
      'Ability to work in fast-paced, high-acuity environment',
      'Experience with EPIC EMR preferred'
    ],
    benefits: [
      'Competitive compensation package',
      'Comprehensive health, dental, and vision insurance',
      'Housing assistance available',
      'Travel reimbursement',
      'Continuing education opportunities',
      '401(k) retirement plan with company match',
      'Referral bonus program',
      'License reimbursement',
      'Completion bonus'
    ],
    contactEmail: 'er-jobs@travelnursesolutions.com',
    contactPhone: '(555) 789-0123',
    website: 'www.travelnursesolutions.com',
    duration: '13 weeks',
    startDate: 'November 25, 2025',
    endDate: 'February 24, 2026',
    specialtyRequired: 'Emergency Room - Registered Nurse',
    profession: 'Registered Nurse (RN)',
    certifications: ['RN License', 'BLS', 'ACLS', 'PALS (Preferred)', 'TNCC (Preferred)'],
    jobType: 'Travel Contract',
    experienceLevel: 'Experienced (1+ years)',
    patientPopulation: 'All Ages',
    patientRatio: '1:3-4 patients',
    beds: 1000,
    scrubColor: 'Hospital Provided',
    floatRequirements: 'No floating required',
    callRequirements: 'No on-call required',
    weekendRequirements: 'Every other weekend',
    guaranteedHours: 36,
    overtimeAvailable: true,
    emrSystem: 'EPIC',
    licensureRequired: ['Massachusetts RN License'],
    vaccineRequirements: ['COVID-19', 'Flu (seasonal)', 'MMR', 'Hepatitis B', 'Tdap'],
    parkingInfo: 'Discounted parking available',
    orientationPeriod: '5-7 days paid orientation',
    housingStipend: '$1,500/week tax-free',
    travelReimbursement: true,
    mealAllowance: 'Cafeteria discount available',
    extensionOptions: 'Available',
    shiftDifferential: 'Evening: $4/hr, Night: $6/hr, Weekend: $5/hr'
  }
}

// Job status lists - in production, these would come from API/user context
const APPLIED_JOB_IDS = ['1', '2', '3']
const LIKED_JOB_IDS = ['4', '5']
const DISLIKED_JOB_IDS = ['6']
const BOOKMARKED_JOB_IDS = ['4', '5', '7']

function JobDetailsContent({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuth()
  
  // Check if user came from applications or bookmarks page
  const fromApplications = searchParams?.get('from') === 'applications'
  const fromBookmarks = searchParams?.get('from') === 'bookmarks'
  
  const job = params?.id ? SAMPLE_JOB_DATA[params.id] : null
  
  // Check job status from lists
  const isApplied = job ? APPLIED_JOB_IDS.includes(job.id) : false
  const isLikedFromList = job ? LIKED_JOB_IDS.includes(job.id) : false
  const isDislikedFromList = job ? DISLIKED_JOB_IDS.includes(job.id) : false
  const isBookmarkedFromList = job ? BOOKMARKED_JOB_IDS.includes(job.id) : false
  
  // Initialize state based on job status
  const [isSaved, setIsSaved] = useState(isBookmarkedFromList)
  const [isLiked, setIsLiked] = useState(isLikedFromList)
  const [isDisliked, setIsDisliked] = useState(isDislikedFromList)
  const [activeTab, setActiveTab] = useState('overview')
  const [isTabBarFixed, setIsTabBarFixed] = useState(false)
  
  // Refs for scroll tracking
  const overviewRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const weatherRef = useRef<HTMLDivElement>(null)
  const transportationRef = useRef<HTMLDivElement>(null)
  const costOfLivingRef = useRef<HTMLDivElement>(null)
  const tabBarRef = useRef<HTMLDivElement>(null)
  const tabBarPlaceholderRef = useRef<HTMLDivElement>(null)

  // Update state when job ID changes (user navigates to different job)
  useEffect(() => {
    if (!job) return
    
    // Re-check job status from lists and update state
    const newIsLiked = LIKED_JOB_IDS.includes(job.id)
    const newIsDisliked = DISLIKED_JOB_IDS.includes(job.id)
    const newIsBookmarked = BOOKMARKED_JOB_IDS.includes(job.id)
    
    setIsLiked(newIsLiked)
    setIsDisliked(newIsDisliked)
    setIsSaved(newIsBookmarked)
    setActiveTab('overview') // Reset to overview tab when job changes
    setIsTabBarFixed(false) // Reset tab bar fixed state
  }, [job?.id]) // Re-run when job ID changes

  // Scroll detection for fixed tab bar and active tab
  useEffect(() => {
    if (!job) return

    // Store initial tab bar position - calculate from placeholder
    let tabBarInitialTop = 0
    
    const updateTabBarPosition = () => {
      if (tabBarPlaceholderRef.current) {
        // Get the absolute position of the placeholder from the top of the page
        const rect = tabBarPlaceholderRef.current.getBoundingClientRect()
        tabBarInitialTop = rect.top + window.scrollY
      }
    }

    const handleScroll = () => {
      // Recalculate if needed
      if (!isTabBarFixed && tabBarInitialTop === 0) {
        updateTabBarPosition()
      }

      // Check if tab bar should be fixed
      const scrollPosition = window.scrollY
      // Tab bar should become fixed when its natural position would be at 80px from viewport top
      const shouldBeFixed = scrollPosition >= tabBarInitialTop - 80
      
      if (shouldBeFixed !== isTabBarFixed) {
        setIsTabBarFixed(shouldBeFixed)
      }

      // Update active tab based on scroll position
      const sections = [
        { ref: overviewRef, id: 'overview' },
        { ref: aboutRef, id: 'about' },
        { ref: weatherRef, id: 'weather' },
        { ref: transportationRef, id: 'transportation' },
        { ref: costOfLivingRef, id: 'cost-of-living' }
      ]

      // Account for navigation (80px) + tab bar (64px) = 144px + buffer
      const scrollPos = window.scrollY + 164

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop
          if (scrollPos >= sectionTop) {
            setActiveTab(section.id)
            break
          }
        }
      }
    }

    // Delay initial check to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      updateTabBarPosition()
      handleScroll()
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateTabBarPosition, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateTabBarPosition)
    }
  }, [isTabBarFixed, job])

  // Smooth scroll to section
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      // Navigation (80px) + Tab Bar (64px) = 144px
      const offset = 154
      const elementPosition = sectionRef.current.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Job unsaved!' : 'Job saved successfully!', {
      icon: isSaved ? '🗑️' : '✅',
    })
  }

  const handleShare = () => {
    if (!job) return
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.staffingCompany}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Job link copied to clipboard!', {
        icon: '📋',
      })
    }
  }

  const handleApply = () => {
    if (!job) return
    if (!isAuthenticated) {
      toast.error('Please log in to apply for jobs.', {
        icon: '🔒',
      })
      router.push('/login')
      return
    }
    toast.success(`Successfully applied for ${job.title}!`, {
      icon: '🚀',
    })
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to like jobs.', {
        icon: '🔒',
      })
      router.push('/login')
      return
    }
    if (isLiked) {
      setIsLiked(false)
      toast('You un-liked this job.', {
        icon: '👍',
      })
    } else {
      setIsLiked(true)
      setIsDisliked(false)
      toast.success('You liked this job!', {
        icon: '❤️',
      })
    }
  }

  const handleDislike = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to dislike jobs.', {
        icon: '🔒',
      })
      router.push('/login')
      return
    }
    if (isDisliked) {
      setIsDisliked(false)
      toast('You un-disliked this job.', {
        icon: '👎',
      })
    } else {
      setIsDisliked(true)
      setIsLiked(false)
      toast.error('You disliked this job.', {
        icon: '🚫',
      })
    }
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
        <p className="text-lg mb-8">The job you are looking for does not exist.</p>
        <Link href={fromApplications ? "/applications" : fromBookmarks ? "/bookmarks" : "/jobs"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-colors"
          >
            {fromApplications ? "Back to My Applications" : fromBookmarks ? "Back to My Bookmarks" : "Back to Job Listings"}
          </motion.button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      {/* Hero Section with Job Title */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Back Button */}
          <Link href={fromApplications ? "/applications" : fromBookmarks ? "/bookmarks" : "/jobs"}>
            <motion.button
              whileHover={{ scale: 1.02, x: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white mb-8 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-semibold text-sm">
                {fromApplications ? "Back to My Applications" : fromBookmarks ? "Back to My Bookmarks" : "Back to Jobs"}
              </span>
            </motion.button>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-5 mb-6"
              >
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">{job.title}</h1>
                  <p className="text-lg text-white/95 font-medium">{job.staffingCompany}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-5 text-white/90"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{job.shift} • {job.shiftHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>{job.salary}/hour</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Posted {job.postedDate}</span>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons - Only show when tab bar is NOT fixed */}
            <AnimatePresence>
              {!isTabBarFixed && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  {/* Applied Badge - Show if job is applied */}
                  {isApplied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-4 py-2 bg-green-500/90 backdrop-blur-md text-white rounded-xl font-semibold text-sm shadow-lg border border-green-400/50 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>APPLIED</span>
                    </motion.div>
                  )}

                  {/* Like/Dislike - Only show if NOT applied */}
                  {isAuthenticated && !isApplied && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLike}
                        className={`p-4 rounded-xl transition-all shadow-lg ${
                          isLiked
                            ? 'bg-green-500 text-white shadow-green-500/50'
                            : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDislike}
                        className={`p-4 rounded-xl transition-all shadow-lg ${
                          isDisliked
                            ? 'bg-red-500 text-white shadow-red-500/50'
                            : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        <ThumbsDown className={`w-5 h-5 ${isDisliked ? 'fill-current' : ''}`} />
                      </motion.button>
                    </>
                  )}

                  {/* Bookmark - Always show */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className={`p-4 rounded-xl transition-all shadow-lg ${
                      isSaved
                        ? 'bg-white text-primary-600 shadow-white/50'
                        : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  </motion.button>

                  {/* Share - Always show */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="p-4 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all border border-white/20 shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-lg text-sm font-semibold text-white border border-white/20 shadow-lg"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tab Bar Container - maintains position in document flow */}
      <div ref={tabBarPlaceholderRef} className="relative">
        <motion.div 
          ref={tabBarRef}
          animate={{
            backdropFilter: isTabBarFixed ? 'blur(20px) saturate(180%)' : 'blur(0px)',
            WebkitBackdropFilter: isTabBarFixed ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`transition-all duration-300 border-b-2 ${
            isTabBarFixed 
              ? 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-2xl'
              : 'bg-white border-gray-200 shadow-md'
          }`}
          style={
            isTabBarFixed 
              ? { 
                  position: 'fixed', 
                  top: '80px', 
                  left: 0, 
                  right: 0, 
                  zIndex: 51,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.08)',
                }
              : { position: 'relative' }
          }
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex gap-1 overflow-x-auto flex-1">
                {[
                  { id: 'overview', label: 'Overview', ref: overviewRef },
                  { id: 'about', label: 'About', ref: aboutRef },
                  { id: 'weather', label: 'Weather', ref: weatherRef },
                  { id: 'transportation', label: 'Transportation and Crime', ref: transportationRef },
                  { id: 'cost-of-living', label: 'Cost of Living', ref: costOfLivingRef }
                ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.ref)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {/* Background glow on active tab */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-primary-50/50 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  
                  <span className="relative z-10">{tab.label}</span>
                  
                  {/* Active indicator line */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 rounded-t-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      style={{
                        boxShadow: '0 -2px 10px rgba(127, 40, 96, 0.3)',
                      }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gray-100/50 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: activeTab === tab.id ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
              </div>

              {/* Action Buttons - Only show when tab bar IS fixed */}
              <AnimatePresence>
                {isTabBarFixed && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2.5 flex-shrink-0 -ml-8 mr-2"
                  >
                    {/* Applied Badge - Show if job is applied */}
                    {isApplied && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-green-500/90 backdrop-blur-md text-white rounded-lg font-semibold text-xs shadow-lg border border-green-400/50 flex items-center gap-1.5"
                        style={{
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>APPLIED</span>
                      </motion.div>
                    )}

                    {/* Like/Dislike - Only show if NOT applied */}
                    {isAuthenticated && !isApplied && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleLike}
                          className={`p-2.5 rounded-xl transition-all shadow-lg ${
                            isLiked
                              ? 'bg-green-500 text-white shadow-green-500/50'
                              : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white/90 border border-white/60'
                          }`}
                          style={{
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          }}
                        >
                          <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleDislike}
                          className={`p-2.5 rounded-xl transition-all shadow-lg ${
                            isDisliked
                              ? 'bg-red-500 text-white shadow-red-500/50'
                              : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white/90 border border-white/60'
                          }`}
                          style={{
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          }}
                        >
                          <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-current' : ''}`} />
                        </motion.button>
                      </>
                    )}

                    {/* Bookmark - Always show */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className={`p-2.5 rounded-xl transition-all shadow-lg ${
                        isSaved
                          ? 'bg-primary-600 text-white shadow-primary-500/50'
                          : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white/90 border border-white/60'
                      }`}
                      style={{
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </motion.button>

                    {/* Share - Always show */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="p-2.5 bg-white/80 backdrop-blur-xl rounded-xl text-gray-700 hover:bg-white/90 transition-all border border-white/60 shadow-lg"
                      style={{
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        
        {/* Invisible spacer to maintain layout when tab bar is fixed */}
        {isTabBarFixed && <div style={{ height: '64px' }} aria-hidden="true"></div>}
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <div ref={overviewRef} id="overview" className="scroll-mt-44 space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              
              {/* Job Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary-600" />
                  </div>
                  Job Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">{job.description}</p>
              </motion.div>

              {/* Compensation Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  Compensation Package
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white rounded-xl p-5 border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
                    <p className="text-2xl font-bold text-green-600">{job.salary}</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Weekly Pay</p>
                    <p className="text-2xl font-bold text-green-600">{job.weeklyPay}</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Gross Weekly Pay</p>
                    <p className="text-2xl font-bold text-green-600">{job.grossWeeklyPay}</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Tax-Free Stipend</p>
                    <p className="text-2xl font-bold text-green-600">{job.taxFreeStipend}</p>
                  </div>
                </div>
              {job.shiftDifferential && (
                <div className="mt-5 p-4 bg-white rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Shift Differentials</p>
                  <p className="text-gray-600 text-sm">{job.shiftDifferential}</p>
                </div>
              )}
            </motion.div>

            {/* Requirements & Qualifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                Required Qualifications
              </h3>
              <ul className="space-y-4">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-base">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications Required */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-indigo-600" />
                </div>
                Certifications Required
              </h3>
              <div className="flex flex-wrap gap-3">
                {job.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-5 py-3 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-semibold border border-indigo-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Benefits & Perks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary-600" />
                </div>
                Comprehensive Benefits
              </h3>
              <ul className="space-y-4">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-gray-700 text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                </div>
                Additional Information
              </h2>
              
              {/* Licensure Requirements */}
              {job.licensureRequired && job.licensureRequired.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Licensure Required</p>
                  <div className="flex flex-wrap gap-2">
                    {job.licensureRequired.map((license, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-200"
                      >
                        {license}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Vaccine Requirements */}
              {job.vaccineRequirements && job.vaccineRequirements.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Vaccine Requirements</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {job.vaccineRequirements.map((vaccine, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{vaccine}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Perks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.housingStipend && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Housing Stipend</p>
                      <p className="text-base font-semibold text-gray-900">{job.housingStipend}</p>
                    </div>
                  </div>
                )}
                {job.travelReimbursement !== undefined && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {job.travelReimbursement ? (
                        <CheckCircle2 className="w-5 h-5 text-purple-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Travel Reimbursement</p>
                      <p className="text-base font-semibold text-gray-900">{job.travelReimbursement ? 'Available' : 'Not Available'}</p>
                    </div>
                  </div>
                )}
                {job.mealAllowance && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Meal Allowance</p>
                      <p className="text-base font-semibold text-gray-900">{job.mealAllowance}</p>
                    </div>
                  </div>
                )}
                {job.extensionOptions && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Extension Options</p>
                      <p className="text-base font-semibold text-gray-900">{job.extensionOptions}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            </div>

            {/* About Section */}
            <div ref={aboutRef} id="about" className="scroll-mt-44 space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Position</h2>
              
              {/* Position Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-primary-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary-600" />
                  </div>
                  Position Summary
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {job.description}
                </p>
              </motion.div>

              {/* Position Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Position Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Profession</p>
                    <p className="text-gray-900">{job.profession}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Specialty</p>
                    <p className="text-gray-900">{job.specialtyRequired}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Duration</p>
                    <p className="text-gray-900">{job.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Start Date</p>
                    <p className="text-gray-900">{job.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Experience Level</p>
                    <p className="text-gray-900">{job.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Job Type</p>
                    <p className="text-gray-900">{job.jobType}</p>
                  </div>
                </div>
              </motion.div>

              {/* Facility Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  Facility Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.facilityName && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Facility Name</p>
                      <p className="text-gray-900">{job.facilityName}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Facility Type</p>
                    <p className="text-gray-900">{job.facilityType}</p>
                  </div>
                  {job.beds && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Number of Beds</p>
                      <p className="text-gray-900">{job.beds}</p>
                    </div>
                  )}
                  {job.emrSystem && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">EMR System</p>
                      <p className="text-gray-900">{job.emrSystem}</p>
                    </div>
                  )}
                  {job.patientPopulation && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Patient Population</p>
                      <p className="text-gray-900">{job.patientPopulation}</p>
                    </div>
                  )}
                  {job.patientRatio && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Patient Ratio</p>
                      <p className="text-gray-900">{job.patientRatio}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Schedule & Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.63 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Schedule & Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.guaranteedHours && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Guaranteed Hours</p>
                      <p className="text-gray-900">{job.guaranteedHours}/week</p>
                    </div>
                  )}
                  {job.weekendRequirements && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Weekend Requirements</p>
                      <p className="text-gray-900">{job.weekendRequirements}</p>
                    </div>
                  )}
                  {job.callRequirements && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Call Requirements</p>
                      <p className="text-gray-900">{job.callRequirements}</p>
                    </div>
                  )}
                  {job.floatRequirements && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Float Requirements</p>
                      <p className="text-gray-900">{job.floatRequirements}</p>
                    </div>
                  )}
                  {job.scrubColor && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Scrub Color</p>
                      <p className="text-gray-900">{job.scrubColor}</p>
                    </div>
                  )}
                  {job.overtimeAvailable !== undefined && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Overtime</p>
                      <p className="text-gray-900">{job.overtimeAvailable ? 'Available' : 'Not Available'}</p>
                    </div>
                  )}
                  {job.orientationPeriod && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Orientation Period</p>
                      <p className="text-gray-900">{job.orientationPeriod}</p>
                    </div>
                  )}
                  {job.parkingInfo && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Parking</p>
                      <p className="text-gray-900">{job.parkingInfo}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Things to Do & Local Attractions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.66 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-amber-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  Things to Do & Local Attractions
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {job.city} offers a variety of activities and attractions to explore during your time off. 
                  From outdoor recreation to cultural experiences, there's something for everyone to enjoy!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-2">🌳 Outdoor Activities</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Local parks and nature trails</li>
                      <li>• Fishing and boating on nearby lakes</li>
                      <li>• Seasonal farmers markets</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-2">🍽️ Dining & Entertainment</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Diverse local restaurants</li>
                      <li>• Movie theaters and entertainment venues</li>
                      <li>• Local breweries and wineries</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-2">🏛️ Culture & History</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Historical downtown district</li>
                      <li>• Local museums and galleries</li>
                      <li>• Community events and festivals</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-2">🏋️ Fitness & Recreation</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Local gyms and fitness centers</li>
                      <li>• Community sports leagues</li>
                      <li>• Golf courses and recreation centers</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Weather Section */}
            <div ref={weatherRef} id="weather" className="scroll-mt-44 space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Weather</h2>
              
              {/* Climate Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.53 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Climate Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {job.city}, {job.state} experiences a humid continental climate with four distinct seasons. 
                  Summers are warm and humid, while winters can be quite cold with significant snowfall.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Spring</p>
                    <p className="text-lg font-bold text-blue-600">45-70°F</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Summer</p>
                    <p className="text-lg font-bold text-blue-600">70-85°F</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Fall</p>
                    <p className="text-lg font-bold text-blue-600">50-70°F</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Winter</p>
                    <p className="text-lg font-bold text-blue-600">20-35°F</p>
                  </div>
                </div>

                {/* Additional Climate Data */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Annual Precipitation</p>
                    <p className="text-base font-bold text-gray-900">38 inches</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Sunny Days</p>
                    <p className="text-base font-bold text-gray-900">190 days/year</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Average Humidity</p>
                    <p className="text-base font-bold text-gray-900">68%</p>
                  </div>
                </div>
              </motion.div>

              {/* What to Pack & Prepare */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.76 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">What to Pack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Summer Essentials</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Light, breathable clothing
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Sunscreen and sunglasses
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Rain jacket for sudden showers
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Winter Essentials</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Heavy winter coat and boots
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Gloves, hat, and scarf
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Ice scraper and snow shovel
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Transportation and Crime Section */}
            <div ref={transportationRef} id="transportation" className="scroll-mt-44 space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Transportation and Crime</h2>
              
              {/* Transportation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Transportation Options</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {job.city} is a small city with limited public transportation. Most residents rely on personal vehicles for commuting.
                  The area is well-connected by highways, with easy access to larger cities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Average Commute</p>
                    <p className="text-lg font-bold text-gray-900">15-20 minutes</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Parking</p>
                    <p className="text-lg font-bold text-gray-900">{job.parkingInfo || 'Available on-site'}</p>
                  </div>
                </div>
              </motion.div>

              {/* Crime Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.73 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Safety & Crime</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {job.city} is a relatively safe community with lower crime rates compared to national averages. 
                  The area has an active police department and community watch programs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-green-700 mb-1">Overall Crime Rate</p>
                    <p className="text-lg font-bold text-green-600">Below National Average</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-green-700 mb-1">Safety Rating</p>
                    <p className="text-lg font-bold text-green-600">7.5/10</p>
                  </div>
                </div>
              </motion.div>

              {/* Public Transportation & Rideshare */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Getting Around</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Rideshare Services</p>
                      <p className="text-sm text-gray-600">Uber and Lyft available throughout the area</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Local Taxi Service</p>
                      <p className="text-sm text-gray-600">24/7 taxi service with reasonable rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Bike-Friendly</p>
                      <p className="text-sm text-gray-600">Multiple bike paths and lanes throughout the city</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Cost of Living Section */}
            <div ref={costOfLivingRef} id="cost-of-living" className="scroll-mt-44 space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost of Living</h2>
              
              {/* Housing Costs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  Housing & Living Expenses
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {job.city}, {job.state} offers a moderate cost of living compared to larger metropolitan areas. 
                  Housing and daily expenses are generally affordable, making it easier to save while on assignment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white rounded-xl p-5 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Rent (1BR Apartment)</p>
                    <p className="text-2xl font-bold text-purple-600">$800-1,200/mo</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Rent (2BR Apartment)</p>
                    <p className="text-2xl font-bold text-purple-600">$1,000-1,500/mo</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Utilities (Electric, Gas, Water)</p>
                    <p className="text-2xl font-bold text-purple-600">$100-150/mo</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Internet & Cable</p>
                    <p className="text-2xl font-bold text-purple-600">$60-100/mo</p>
                  </div>
                </div>
              </motion.div>

              {/* Daily Expenses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Daily Expenses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Groceries (per month)</p>
                    <p className="text-xl font-bold text-gray-900">$250-400</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Dining Out (average meal)</p>
                    <p className="text-xl font-bold text-gray-900">$12-25</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Gas (per gallon)</p>
                    <p className="text-xl font-bold text-gray-900">$3.20-3.80</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Movie Ticket</p>
                    <p className="text-xl font-bold text-gray-900">$10-15</p>
                  </div>
                </div>
              </motion.div>

              {/* Transportation Costs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.84 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Transportation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Car Insurance</p>
                      <p className="text-base font-semibold text-gray-900">$80-150/month</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Parking</p>
                      <p className="text-base font-semibold text-gray-900">{job.parkingInfo || 'Free on-site'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Cost Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.86 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Cost of Living Comparison</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Compared to the national average, {job.city} is approximately <span className="font-bold text-green-600">15% more affordable</span>. 
                  This allows travel nurses to maximize their savings while enjoying a comfortable lifestyle.
                </p>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-green-200">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Lower housing costs mean more take-home pay for you!</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Apply Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="sticky top-28 space-y-5"
            >
              {/* Main Apply Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
                
                {/* Apply Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                  className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all mb-5 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Apply Now
                </motion.button>

                {/* Key Benefits */}
                <div className="space-y-3 mb-5 pb-5 border-b border-gray-200">
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">Quick application process</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">Response within 24-48 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm">Dedicated recruiter support</span>
                  </div>
                </div>

                {/* Compensation Highlight */}
                <div className="bg-primary-50 rounded-lg p-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Hourly Rate</span>
                    <span className="text-xl font-bold text-primary-600">{job.salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Weekly Pay</span>
                    <span className="text-lg font-bold text-gray-900">{job.weeklyPay}</span>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{job.city}, {job.state}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{job.shift} • {job.shiftHours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{job.duration} contract</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <a 
                    href={`tel:${job.contactPhone}`} 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-sm font-medium text-gray-900">{job.contactPhone}</div>
                    </div>
                  </a>
                  <a 
                    href={`mailto:${job.contactEmail}`} 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm font-medium text-gray-900 truncate">{job.contactEmail}</div>
                    </div>
                  </a>
                  <a 
                    href={`https://${job.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Website</div>
                      <div className="text-sm font-medium text-gray-900 truncate">{job.website}</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Key Requirements */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Key Requirements</h4>
                <ul className="space-y-2">
                  {job.requirements.slice(0, 4).map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Benefits */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Top Benefits</h4>
                <ul className="space-y-2">
                  {job.benefits.slice(0, 4).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <Award className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    }>
      <JobDetailsContent params={params} />
    </Suspense>
  )
}
