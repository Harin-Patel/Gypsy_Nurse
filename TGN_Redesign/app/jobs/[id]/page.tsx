'use client'

import { useState, useEffect, useRef, Suspense, use } from 'react'
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
  ChevronRight,
  AlertCircle,
  Users,
  Package,
  Eye,
  Shirt,
  Infinity,
  Star,
  CloudRain,
  Wind,
  X,
  FileText,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'
import { useDisableBodyScroll } from '@/utils/useDisableBodyScroll'
import {
  getLikedJobs,
  getDislikedJobs,
  getBookmarkedJobs,
  isJobPending,
  addPendingJob,
  addLikedJob,
  removeLikedJob,
  addDislikedJob,
  removeDislikedJob,
  addBookmarkedJob,
  removeBookmarkedJob
} from '@/utils/jobStorage'
import { getFacilityImageWithFallback } from '@/utils/stateImages'
import { Job, SAMPLE_JOBS } from '../page'
import { useIsMobile } from '@/hooks/useIsMobile'
import { formatShiftHoursForMobile } from '@/utils/jobData'

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
  facilityImage?: string
  facilityType: string
  facilityAvailable: boolean
  featured?: boolean
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

// Function to map Job from listing to JobDetails format
function mapJobToJobDetails(job: Job): JobDetails {
  // Extract city from location if it contains a comma
  const city = job.location.split(',')[0].trim()
  const zipCode = job.location.split(',').length > 1 ? job.location.split(',')[1].trim().split(' ')[1] || '' : ''
  
  // Calculate duration from tags
  const durationTag = job.tags.find(tag => tag.includes('Week'))
  const duration = durationTag ? durationTag.replace(' Weeks', ' weeks').replace(' Week', ' week') : '13 weeks'
  
  // Parse pay per week to extract numeric value for calculations
  const payValue = parseFloat(job.payPerWeek.replace(/[^0-9.]/g, '')) || 0
  const grossWeeklyPay = `$${(payValue * 1.15).toFixed(2)}` // Add 15% for gross
  const taxFreeStipend = `$${(payValue * 0.3).toFixed(2)}/week` // 30% as tax-free stipend
  
  return {
    id: job.id,
    title: job.title,
    location: `${job.location}, ${job.state}`,
    state: job.state,
    city: city,
    zipCode: zipCode,
    shift: job.shift,
    shiftHours: job.shiftHours,
    salary: job.salary,
    weeklyPay: job.payPerWeek,
    grossWeeklyPay: grossWeeklyPay,
    taxFreeStipend: taxFreeStipend,
    postedDate: job.postedDate,
    facilityName: job.facilityName,
    facilityImage: job.facilityImage,
    facilityType: 'Hospital',
    facilityAvailable: job.facilityAvailable,
    featured: job.featured,
    staffingCompany: job.staffingCompany,
    tags: job.tags,
    description: `${job.title} position in ${job.location}, ${job.state}. This is an excellent opportunity for experienced healthcare professionals to work in a dynamic healthcare setting. You will be responsible for providing high-quality patient care, working alongside a dedicated team of healthcare professionals.`,
    requirements: [
      `Valid license in ${job.state} (or compact state license)`,
      `Minimum 1 year of ${job.licenseSpecialty} experience required`,
      'BLS certification required',
      'ACLS certification preferred',
      'Strong clinical skills',
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
    contactEmail: 'jobs@abstaffing.com',
    contactPhone: '(555) 123-4567',
    website: 'www.abstaffing.com',
    duration: duration,
    startDate: job.startDate || 'TBD',
    endDate: undefined,
    specialtyRequired: job.licenseSpecialty,
    profession: job.licenseSpecialty.split(' - ')[0] || 'Registered Nurse',
    certifications: ['BLS', 'ACLS'],
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
    licensureRequired: [`${job.state} License or Compact License`],
    vaccineRequirements: ['COVID-19', 'Flu (seasonal)', 'MMR', 'Hepatitis B'],
    parkingInfo: 'Free employee parking',
    orientationPeriod: '3-5 days paid orientation',
    housingStipend: '$1,400/week tax-free',
    travelReimbursement: true,
    mealAllowance: 'Cafeteria available',
    extensionOptions: 'Available',
    shiftDifferential: 'Evening: $3/hr, Night: $5/hr, Weekend: $4/hr'
  }
}

// Create job details data from SAMPLE_JOBS
const SAMPLE_JOB_DATA: Record<string, JobDetails> = {}
SAMPLE_JOBS.forEach(job => {
  SAMPLE_JOB_DATA[job.id] = mapJobToJobDetails(job)
})

// Legacy sample job data - keeping for backward compatibility
const LEGACY_SAMPLE_JOB_DATA: Record<string, JobDetails> = {
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
// These are now managed via localStorage, but keeping for initial state
const LIKED_JOB_IDS = ['4', '5']
const DISLIKED_JOB_IDS = ['6']
const BOOKMARKED_JOB_IDS = ['4', '5', '7']

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

function JobDetailsContent({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params Promise FIRST - must be called before any other hooks
  const unwrappedParams = use(params)
  
  // Other hooks must come after use()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuth()
  const isMobile = useIsMobile()
  
  // Check if user came from applications, bookmarks, specialty, or state page
  const fromApplications = searchParams?.get('from') === 'applications'
  const fromBookmarks = searchParams?.get('from') === 'bookmarks'
  const fromSpecialty = searchParams?.get('from') === 'specialty'
  const specialtySlug = searchParams?.get('specialty') || ''
  const fromState = searchParams?.get('from') === 'state'
  const stateName = searchParams?.get('state') || ''
  
  const job = unwrappedParams?.id ? SAMPLE_JOB_DATA[unwrappedParams.id] : null
  
  // Initialize state - will be updated from localStorage in useEffect
  const [isPending, setIsPending] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  
  // Apply modal state
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeFileName, setResumeFileName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
  
  // Disable body scroll when modals are open
  useDisableBodyScroll(showApplyModal)
  useDisableBodyScroll(showRemoveConfirm)
  
  // Cost of Living state
  const [costOfLivingData, setCostOfLivingData] = useState<any>(null)
  const [costOfLivingLoading, setCostOfLivingLoading] = useState(false)
  const [isRentExpanded, setIsRentExpanded] = useState(false)
  const [isUtilitiesExpanded, setIsUtilitiesExpanded] = useState(false)
  const [isGroceriesExpanded, setIsGroceriesExpanded] = useState(false)
  const [isTransportationExpanded, setIsTransportationExpanded] = useState(false)
  const [isRestaurantsExpanded, setIsRestaurantsExpanded] = useState(false)
  const [isSportsLeisureExpanded, setIsSportsLeisureExpanded] = useState(false)
  const [isClothingExpanded, setIsClothingExpanded] = useState(false)
  const [isEarningsExpanded, setIsEarningsExpanded] = useState(false)

  // Weather state
  const [weatherData, setWeatherData] = useState<any>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)

  // Transportation & Crime state
  const [transportationCrimeData, setTransportationCrimeData] = useState<any>(null)
  const [transportationCrimeLoading, setTransportationCrimeLoading] = useState(false)
  
  // Load job status from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined' || !job) return
    
    setIsPending(isJobPending(job.id))
    setIsSaved(getBookmarkedJobs().includes(job.id) || BOOKMARKED_JOB_IDS.includes(job.id))
    setIsLiked(getLikedJobs().includes(job.id) || LIKED_JOB_IDS.includes(job.id))
    setIsDisliked(getDislikedJobs().includes(job.id) || DISLIKED_JOB_IDS.includes(job.id))
  }, [job])

  // Fetch cost of living data from Numbeo API
  useEffect(() => {
    if (!job || !job.city || !job.state) return
    
    const fetchCostOfLiving = async () => {
      setCostOfLivingLoading(true)
      
      try {
        const numbeoApiKey = process.env.NEXT_PUBLIC_NUMBEO_API_KEY || ''
        const query = `${job.city}, ${job.state}, United States`
        
        // Fetch from Numbeo API
        const response = await fetch(
          `https://www.numbeo.com/api/city_prices?api_key=${numbeoApiKey}&query=${encodeURIComponent(query)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        
        if (response.ok) {
          const data = await response.json()
          
          // Map Numbeo API response to our structure
          if (data.prices && Array.isArray(data.prices)) {
            const mappedData: any = {
              currency: data.currency || 'USD',
              familyMonthlyCosts: '$3,907.57',
              singleMonthlyCosts: '$1,041.67',
              rent: {
                percentage: -41.76,
                oneBedroomCity: '$1,500.00',
                oneBedroomOutside: '$1,300.00',
                threeBedroomCity: '$4,200.00',
                threeBedroomOutside: '$3,000.00'
              },
              utilities: {
                percentage: 4.28,
                basic: '$211.42',
                internet: '$70.00'
              },
              groceries: {
                percentage: -16.63
              },
              transportation: {
                percentage: -89.47,
                oneWay: '$2.50',
                monthlyPass: '$60.00',
                gasoline: '$3.50'
              },
              restaurants: {
                percentage: -33.52
              },
              sportsLeisure: {
                percentage: -25.00
              },
              clothing: {
                percentage: -16.47
              },
              earnings: {
                percentage: -18.34
              }
            }
            
            // Map prices to our structure from Numbeo API
            data.prices.forEach((item: any) => {
              const itemName = item.item_name?.toLowerCase() || ''
              const price = item.average_price || 0
              
              // Rent mapping
              if (itemName.includes('apartment (1 bedroom)') && itemName.includes('city center')) {
                mappedData.rent.oneBedroomCity = `$${price.toFixed(2)}`
              } else if (itemName.includes('apartment (1 bedroom)') && itemName.includes('outside')) {
                mappedData.rent.oneBedroomOutside = `$${price.toFixed(2)}`
              } else if (itemName.includes('apartment (3 bedrooms)') && itemName.includes('city center')) {
                mappedData.rent.threeBedroomCity = `$${price.toFixed(2)}`
              } else if (itemName.includes('apartment (3 bedrooms)') && itemName.includes('outside')) {
                mappedData.rent.threeBedroomOutside = `$${price.toFixed(2)}`
              }
              
              // Utilities mapping
              if (itemName.includes('utilities') && (itemName.includes('basic') || itemName.includes('1 bedroom'))) {
                mappedData.utilities.basic = `$${price.toFixed(2)}`
              } else if (itemName.includes('internet')) {
                mappedData.utilities.internet = `$${price.toFixed(2)}`
              }
              
              // Transportation mapping
              if (itemName.includes('one-way ticket') || itemName.includes('local transport')) {
                mappedData.transportation.oneWay = `$${price.toFixed(2)}`
              } else if (itemName.includes('monthly pass')) {
                mappedData.transportation.monthlyPass = `$${price.toFixed(2)}`
              } else if (itemName.includes('gasoline') || itemName.includes('gas (1 gallon)')) {
                mappedData.transportation.gasoline = `$${price.toFixed(2)}`
              }
            })
            
            setCostOfLivingData(mappedData)
          }
        }
      } catch (error) {
        console.warn('Error fetching cost of living data from Numbeo:', error)
        // Silently fail - will use fallback static data
      } finally {
        setCostOfLivingLoading(false)
      }
    }
    
    fetchCostOfLiving()
  }, [job])

  // Fetch weather data from OpenWeatherMap API
  useEffect(() => {
    if (!job || !job.city || !job.state) return
    
    const fetchWeather = async () => {
      setWeatherLoading(true)
      
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ''
        const cityName = `${job.city},${job.state},US`
        
        // Create AbortController for timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        // Fetch current weather
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=imperial`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal
          }
        )
        
        // Fetch 5-day/3-hour forecast for hourly data
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=imperial`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal
          }
        )
        
        clearTimeout(timeoutId)
        
        let currentData = null
        let forecastData = null
        
        if (currentResponse.ok) {
          currentData = await currentResponse.json()
        }
        
        if (forecastResponse.ok) {
          forecastData = await forecastResponse.json()
        }
        
        // Process temperature data for bar chart (Morning, Afternoon, Evening, Night)
        const now = new Date()
        const currentHour = now.getHours()
        const temperaturePeriods = []
        
        if (forecastData?.list) {
          // Get temperatures for different periods of the day
          const morningTemp = forecastData.list.find((item: any) => {
            const hour = new Date(item.dt * 1000).getHours()
            return hour >= 6 && hour < 12
          })?.main?.temp || currentData?.main?.temp || 15
          
          const afternoonTemp = forecastData.list.find((item: any) => {
            const hour = new Date(item.dt * 1000).getHours()
            return hour >= 12 && hour < 18
          })?.main?.temp || currentData?.main?.temp || 14
          
          const eveningTemp = forecastData.list.find((item: any) => {
            const hour = new Date(item.dt * 1000).getHours()
            return hour >= 18 && hour < 22
          })?.main?.temp || currentData?.main?.temp || 16
          
          const nightTemp = forecastData.list.find((item: any) => {
            const hour = new Date(item.dt * 1000).getHours()
            return hour >= 22 || hour < 6
          })?.main?.temp || currentData?.main?.temp || 12
          
          temperaturePeriods.push(
            { period: 'Morning', temp: Math.round(morningTemp) },
            { period: 'Afternoon', temp: Math.round(afternoonTemp) },
            { period: 'Evening', temp: Math.round(eveningTemp) },
            { period: 'Night', temp: Math.round(nightTemp) }
          )
        }
        
        // Map API response to our structure
        const mappedData: any = {
          current: currentData ? {
            location: `${job.city}, ${job.state}`,
            temperature: Math.round(currentData.main.temp),
            condition: currentData.weather[0]?.main || 'Clear',
            description: currentData.weather[0]?.description || 'Mostly Clear',
            icon: currentData.weather[0]?.icon || '01d',
            realFeel: Math.round(currentData.main.feels_like),
            humidity: currentData.main?.humidity || 0,
            pressure: Math.round((currentData.main?.pressure || 1013)), // Pressure in hPa (OpenWeatherMap returns in hPa)
            wind: currentData.wind?.speed || 0,
            windDirection: currentData.wind?.deg || 0,
            uvIndex: 0, // Requires separate API call
            chanceOfRain: currentData.rain?.['1h'] ? Math.min(100, Math.round((currentData.rain['1h'] / 10) * 100)) : (currentData.main.humidity > 70 ? Math.round(currentData.main.humidity * 0.3) : 0),
            date: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
          } : null,
          temperaturePeriods: temperaturePeriods.length > 0 ? temperaturePeriods : [
            { period: 'Morning', temp: 15 },
            { period: 'Afternoon', temp: 14 },
            { period: 'Evening', temp: 16 },
            { period: 'Night', temp: 12 }
          ]
        }
        
        setWeatherData(mappedData)
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.warn('Weather API request timed out')
        } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
          console.warn('Network error fetching weather data')
        } else {
          console.warn('Error fetching weather data:', error)
        }
        // Use fallback static data
        const now = new Date()
        setWeatherData({
          current: {
            location: `${job.city}, ${job.state}`,
            temperature: 14,
            condition: 'Clear',
            description: 'Mostly Clear',
            icon: '01d',
            realFeel: 14,
            humidity: 32,
            pressure: 720,
            wind: 12,
            windDirection: 45,
            uvIndex: 2,
            chanceOfRain: 24,
            date: now.toLocaleDateString('en-US', { weekday: 'long' }),
            time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
          },
          temperaturePeriods: [
            { period: 'Morning', temp: 15 },
            { period: 'Afternoon', temp: 14 },
            { period: 'Evening', temp: 16 },
            { period: 'Night', temp: 12 }
          ]
        })
      } finally {
        setWeatherLoading(false)
      }
    }
    
    fetchWeather()
  }, [job])

  // Fetch Transportation & Crime data from Numbeo API
  useEffect(() => {
    if (!job || !job.city || !job.state) return
    
    const fetchTransportationAndCrime = async () => {
      setTransportationCrimeLoading(true)
      
      try {
        const cityName = `${job.city}, ${job.state}, United States`
        
        // Create AbortController for timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        // Fetch city prices (includes transportation) and crime data
        const pricesResponse = await fetch(
          `https://www.numbeo.com/api/city_prices?api_key=${process.env.NEXT_PUBLIC_NUMBEO_API_KEY || ''}&query=${encodeURIComponent(cityName)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal
          }
        )
        
        const crimeResponse = await fetch(
          `https://www.numbeo.com/api/city_crime?api_key=${process.env.NEXT_PUBLIC_NUMBEO_API_KEY || ''}&query=${encodeURIComponent(cityName)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal
          }
        )
        
        clearTimeout(timeoutId)
        
        let pricesData = null
        let crimeResponseData = null
        
        if (pricesResponse.ok) {
          pricesData = await pricesResponse.json()
        }
        
        if (crimeResponse.ok) {
          crimeResponseData = await crimeResponse.json()
        }
        
        // Process transportation data
        const oneWayTicket = pricesData?.prices?.find((p: any) => p.item_name === 'One-way Ticket (Local Transport)')?.average_price
        const monthlyPass = pricesData?.prices?.find((p: any) => p.item_name === 'Monthly Pass (Regular Price)')?.average_price
        const gasoline = pricesData?.prices?.find((p: any) => p.item_name === 'Gasoline (1 liter)')?.average_price
        // Convert gasoline from per liter to per gallon (1 gallon = 3.78541 liters)
        const gasolinePerGallon = gasoline ? (gasoline * 3.78541) : null
        
        const transportation = {
          oneWayTicket: oneWayTicket ? `$${oneWayTicket.toFixed(2)}` : null,
          monthlyPass: monthlyPass ? `$${monthlyPass.toFixed(2)}` : null,
          gasoline: gasolinePerGallon ? `$${gasolinePerGallon.toFixed(2)}` : null,
          averageCommute: '15-20 minutes',
          parking: job.parkingInfo || 'Available on-site',
          rideshareAvailable: true,
          publicTransitAvailable: monthlyPass ? true : false,
          bikeFriendly: true,
        }
        
        // Process crime data
        const crimeIndex = crimeResponseData?.crime_index || null
        const safetyIndex = crimeResponseData?.safety_index || null
        
        const getCrimeIndexLevel = (index: number) => {
          if (index < 20) return 'Very Low'
          if (index < 40) return 'Low'
          if (index < 60) return 'Moderate'
          if (index < 80) return 'High'
          return 'Very High'
        }
        
        const getSafetyLevel = (index: number) => {
          if (index > 80) return 'Very Safe'
          if (index > 60) return 'Safe'
          if (index > 40) return 'Moderate'
          if (index > 20) return 'Unsafe'
          return 'Very Unsafe'
        }
        
        const crime = crimeResponseData ? {
          crimeIndex: crimeIndex,
          crimeIndexLevel: crimeIndex ? getCrimeIndexLevel(crimeIndex) : 'Low',
          safetyIndex: safetyIndex,
          safetyLevel: safetyIndex ? getSafetyLevel(safetyIndex) : 'Safe',
          concerns: {
            crimeIncreasing: crimeResponseData.crime_increasing_in_the_past_3_years || 'Stable',
            homeBreakAndTheft: crimeResponseData.home_broken_and_things_stolen || 'Low',
            muggingAndRobbery: crimeResponseData.mugging_and_robbery || 'Low',
            carTheft: crimeResponseData.car_stolen || 'Low',
            propertyCrimes: crimeResponseData.property_crimes_vandalism_and_theft || 'Low',
            violentCrimes: crimeResponseData.violent_crimes_assault_and_armed_robbery || 'Low',
          }
        } : null
        
        setTransportationCrimeData({
          transportation,
          crime
        })
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.warn('Transportation & Crime API request timed out')
        } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
          console.warn('Network error fetching transportation & crime data')
        } else {
          console.warn('Error fetching transportation & crime data:', error)
        }
        // Use fallback static data
        setTransportationCrimeData({
          transportation: {
            oneWayTicket: '$2.50',
            monthlyPass: '$60.00',
            gasoline: '$3.50',
            averageCommute: '15-20 minutes',
            parking: job.parkingInfo || 'Available on-site',
            rideshareAvailable: true,
            publicTransitAvailable: true,
            bikeFriendly: true,
          },
          crime: {
            crimeIndex: 25.0,
            crimeIndexLevel: 'Low',
            safetyIndex: 75.0,
            safetyLevel: 'Safe',
            concerns: {
              crimeIncreasing: 'Stable',
              homeBreakAndTheft: 'Low',
              muggingAndRobbery: 'Low',
              carTheft: 'Low',
              propertyCrimes: 'Low',
              violentCrimes: 'Low',
            }
          }
        })
      } finally {
        setTransportationCrimeLoading(false)
      }
    }
    
    fetchTransportationAndCrime()
  }, [job])
  
  const [activeTab, setActiveTab] = useState('overview')
  const [isTabBarFixed, setIsTabBarFixed] = useState(false)
  const [navHeight, setNavHeight] = useState(isMobile ? 0 : 80) // 0 on mobile since nav is hidden
  const [tabBarPosition, setTabBarPosition] = useState({ left: 0, width: 0 })
  const isProgrammaticScrollRef = useRef(false)
  
  // Refs for scroll tracking
  const overviewRef = useRef<HTMLDivElement>(null)
  const facilityDetailsRef = useRef<HTMLDivElement>(null)
  const weatherRef = useRef<HTMLDivElement>(null)
  const transportationRef = useRef<HTMLDivElement>(null)
  const costOfLivingRef = useRef<HTMLDivElement>(null)
  const tabBarRef = useRef<HTMLDivElement>(null)
  const tabBarPlaceholderRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Calculate navigation height and tab bar position
  useEffect(() => {
    const updateNavHeight = () => {
      if (isMobile) {
        // Navigation is hidden on mobile for job details page
        setNavHeight(0)
        return
      }
      const nav = document.querySelector('nav')
      if (nav) {
        const height = nav.getBoundingClientRect().height
        setNavHeight(height)
      }
    }
    
    const updateTabBarPosition = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setTabBarPosition({ left: rect.left, width: rect.width })
      }
    }
    
    updateNavHeight()
    updateTabBarPosition()
    
    window.addEventListener('resize', () => {
      updateNavHeight()
      updateTabBarPosition()
    })
    window.addEventListener('scroll', updateNavHeight)
    
    return () => {
      window.removeEventListener('resize', updateNavHeight)
      window.removeEventListener('scroll', updateNavHeight)
    }
  }, [])

  // Update state when job ID changes (user navigates to different job)
  useEffect(() => {
    if (!job || typeof window === 'undefined') return
    
    // Re-check job status from localStorage and update state
    setIsPending(isJobPending(job.id))
    setIsSaved(getBookmarkedJobs().includes(job.id) || BOOKMARKED_JOB_IDS.includes(job.id))
    setIsLiked(getLikedJobs().includes(job.id) || LIKED_JOB_IDS.includes(job.id))
    setIsDisliked(getDislikedJobs().includes(job.id) || DISLIKED_JOB_IDS.includes(job.id))
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

    let rafId: number | null = null
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          // Recalculate if needed
          if (!isTabBarFixed && tabBarInitialTop === 0) {
            updateTabBarPosition()
          }

          // Update tab bar position when card is available
          if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            setTabBarPosition({ left: rect.left, width: rect.width })
          }

          // Check if tab bar should be fixed
          const scrollPosition = window.scrollY
          // Tab bar should become fixed when its natural position would be at navHeight from viewport top
          // On mobile, make it sticky earlier for better UX
          const threshold = isMobile ? tabBarInitialTop - navHeight - 20 : tabBarInitialTop - navHeight
          const shouldBeFixed = scrollPosition >= threshold
          
          if (shouldBeFixed !== isTabBarFixed) {
            setIsTabBarFixed(shouldBeFixed)
          }

          // Update active tab based on scroll position (only if not programmatic scroll)
          if (!isProgrammaticScrollRef.current) {
            const sections = [
              { ref: overviewRef, id: 'overview' },
              { ref: facilityDetailsRef, id: 'facility-details' },
              { ref: costOfLivingRef, id: 'cost-of-living' },
              { ref: weatherRef, id: 'weather' },
              { ref: transportationRef, id: 'transportation' }
            ]

            // Account for navigation + tab bar + buffer
            // Use a threshold to determine when a section is "active"
            const scrollPos = window.scrollY
            const threshold = isTabBarFixed ? navHeight + 100 : navHeight + 84

            for (let i = sections.length - 1; i >= 0; i--) {
              const section = sections[i]
              if (section.ref.current) {
                const rect = section.ref.current.getBoundingClientRect()
                const sectionTop = rect.top + scrollPos
                // Check if section is in viewport with threshold
                if (scrollPos + threshold >= sectionTop - 50) {
                  setActiveTab(section.id)
                  break
                }
              }
            }
          }

          ticking = false
        })
        ticking = true
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
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateTabBarPosition)
    }
  }, [isTabBarFixed, job, navHeight])

  // Smooth scroll to section
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>, tabId?: string) => {
    if (sectionRef.current) {
      // Set active tab immediately when clicked
      if (tabId) {
        setActiveTab(tabId)
      }
      
      // Set flag to prevent scroll handler from updating active tab
      isProgrammaticScrollRef.current = true
      
      // Mobile-specific scroll handling
      if (isMobile) {
        // Use requestAnimationFrame to ensure DOM is ready on mobile
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!sectionRef.current) {
              isProgrammaticScrollRef.current = false
              return
            }
            
            // On mobile, nav is hidden, so only account for tab bar
            const tabBarHeight = 48
            const offset = tabBarHeight + 15  // Tab bar + buffer
            
            // Get element position relative to document
            const elementRect = sectionRef.current.getBoundingClientRect()
            const elementPosition = elementRect.top + window.scrollY
            const offsetPosition = Math.max(0, elementPosition - offset)

            // Use scrollIntoView for better mobile compatibility
            sectionRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            })
            
            // Adjust for offset after initial scroll
            setTimeout(() => {
              if (sectionRef.current) {
                const currentScroll = window.scrollY
                const elementRect = sectionRef.current.getBoundingClientRect()
                const adjustment = elementRect.top - offset
                if (Math.abs(adjustment) > 5) {
                  window.scrollTo({
                    top: currentScroll + adjustment,
                    behavior: 'smooth'
                  })
                }
              }
            }, 100)
            
            // Reset flag after scroll completes
            const scrollDistance = Math.abs(window.scrollY - offsetPosition)
            const estimatedDuration = Math.min(Math.max(scrollDistance * 1.2, 800), 2000)
            setTimeout(() => {
              isProgrammaticScrollRef.current = false
            }, estimatedDuration + 300)
          })
        })
        return // Exit early for mobile, don't execute desktop code
      }
      
      // Desktop scroll handling (unchanged)
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (!sectionRef.current) return
        
        // Calculate offset based on whether tab bar is fixed
        // If tab bar is fixed, we need more offset (nav + tab bar height)
        // If not fixed, just nav height
        const tabBarHeight = 64 // Approximate tab bar height
        const offset = isTabBarFixed 
          ? navHeight + tabBarHeight + 20  // Nav + fixed tab bar + buffer
          : navHeight + 74  // Nav + buffer when not fixed
        
        // Get element position relative to document
        const elementRect = sectionRef.current.getBoundingClientRect()
        const elementPosition = elementRect.top + window.pageYOffset
        const offsetPosition = Math.max(0, elementPosition - offset)

        // Scroll to position
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        // Reset flag after scroll completes (estimate based on scroll distance)
        const scrollDistance = Math.abs(window.scrollY - offsetPosition)
        const estimatedDuration = Math.min(scrollDistance / 2, 1500) // Max 1.5 seconds
        
        setTimeout(() => {
          isProgrammaticScrollRef.current = false
        }, estimatedDuration + 200) // Add buffer
      })
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    if (isSaved) {
      removeBookmarkedJob(job?.id || '')
    } else {
      addBookmarkedJob(job?.id || '')
    }
    toast.success(isSaved ? 'Job removed from bookmarks' : 'Job saved to bookmarks', {
      duration: 3000,
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
        duration: 3000,
      })
    }
  }

  const handleApply = () => {
    if (!job) return
    if (!isAuthenticated) {
      toast.error('Please log in to apply for jobs.', {
        duration: 3000,
      })
      return
    }
    // Open apply modal
    setShowApplyModal(true)
  }

  const validateFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const allowedExtensions = ['.pdf', '.doc', '.docx']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toast.error('Please upload a valid file format (PDF, DOC, or DOCX)', {
        duration: 3000,
      })
      return false
    }
    
    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB', {
        duration: 3000,
      })
      return false
    }
    
    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (validateFile(file)) {
        setResumeFile(file)
        setResumeFileName(file.name)
      } else {
        // Reset input
        e.target.value = ''
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (isSubmitting) return
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (validateFile(file)) {
        setResumeFile(file)
        setResumeFileName(file.name)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isSubmitting) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleRemoveFile = () => {
    setShowRemoveConfirm(true)
  }

  const confirmRemoveFile = () => {
    setResumeFile(null)
    setResumeFileName('')
    setShowRemoveConfirm(false)
    // Reset file input
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const cancelRemoveFile = () => {
    setShowRemoveConfirm(false)
  }

  const handleSubmitApplication = () => {
    // Validate that Resume/CV is mandatory
    if (!resumeFile) {
      toast.error('Please upload your Resume/CV to continue.', {
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      // Add job to pending list
      setIsPending(true)
      addPendingJob(job!.id)
      
      // Reset form
      setCoverLetter('')
      setResumeFile(null)
      setResumeFileName('')
      setShowApplyModal(false)
      setIsSubmitting(false)
      
      // Set flag in sessionStorage to show toast on jobs page
      sessionStorage.setItem('showAppliedToast', 'true')
      
      // Redirect to job listing page immediately
      window.location.href = '/jobs'
    }, 1000)
  }

  const handleCloseApplyModal = () => {
    if (!isSubmitting) {
      setShowApplyModal(false)
      setCoverLetter('')
      setResumeFile(null)
      setResumeFileName('')
    }
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to like jobs.', {
        duration: 3000,
      })
      router.push('/login')
      return
    }
    if (isLiked) {
      setIsLiked(false)
      removeLikedJob(job?.id || '')
      toast.success('Job removed from liked jobs', {
        duration: 3000,
      })
    } else {
      setIsLiked(true)
      setIsDisliked(false)
      addLikedJob(job?.id || '')
      removeDislikedJob(job?.id || '')
      toast.success('Job added to liked jobs', {
        duration: 3000,
      })
    }
  }

  const handleDislike = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to dislike jobs.', {
        duration: 3000,
      })
      router.push('/login')
      return
    }
    if (isDisliked) {
      setIsDisliked(false)
      removeDislikedJob(job?.id || '')
      toast.error('Job removed from disliked jobs', {
        duration: 3000,
      })
    } else {
      setIsDisliked(true)
      setIsLiked(false)
      addDislikedJob(job?.id || '')
      removeLikedJob(job?.id || '')
      toast.error('Job added to disliked jobs', {
        duration: 3000,
      })
    }
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
        <p className="text-lg mb-8">The job you are looking for does not exist.</p>
        <Link href={fromSpecialty && specialtySlug ? `/nursing-specialties/${specialtySlug}` : fromState && stateName ? `/jobs-by-state?state=${encodeURIComponent(stateName)}` : fromApplications ? "/applications" : fromBookmarks ? "/bookmarks" : "/jobs"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-colors"
          >
            {fromSpecialty ? "Back to Specialty" : fromState ? "Back to State Jobs" : fromApplications ? "Back to My Applications" : fromBookmarks ? "Back to My Bookmarks" : "Back to Job Listings"}
          </motion.button>
        </Link>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex flex-col ${isMobile ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {!isMobile && <Navigation />}
      
      {/* Main Content Container */}
      <div className={`flex-1 ${isMobile ? 'w-full' : 'max-w-[1600px] mx-auto'} ${isMobile ? 'px-0' : 'px-4 sm:px-6 lg:px-12 xl:px-16'} ${isMobile ? 'pt-0 pb-20' : 'pt-24 pb-8'} w-full`}>
        <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-12'} ${isMobile ? '' : 'gap-8 items-start'}`}>
          {/* Left Column - Main Card with Image, Tabs, and Sections */}
          <div className={isMobile ? 'w-full' : 'lg:col-span-9'}>
            <div ref={cardRef} className={`bg-white ${isMobile ? 'rounded-none shadow-none border-0' : 'rounded-2xl shadow-lg border border-gray-200'} overflow-hidden ${isMobile ? 'mt-0' : 'mt-8'}`}>
              {/* Facility Image */}
              <div className={`relative w-full ${isMobile ? 'h-64' : 'h-80'} overflow-hidden`}>
                <img 
                  src={getFacilityImageWithFallback(job.facilityImage, job.state)} 
                  alt={job.facilityName || job.title}
                  className="w-full h-full object-cover"
                />
                {/* Black Overlay from Four Corners (Vignette Effect) - Desktop only */}
                {!isMobile && (
                  <>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </>
                )}
                {/* Simple gradient overlay for mobile */}
                {isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                )}

                {/* Back Button - Top Left */}
                <div className={`absolute ${isMobile ? 'top-3 left-3' : 'top-4 left-4'} ${isMobile ? 'z-[110]' : 'z-20'}`}>
                  <motion.button
                    onClick={() => {
                      if (fromSpecialty && specialtySlug) {
                        router.push(`/nursing-specialties/${specialtySlug}`)
                      } else if (fromState && stateName) {
                        router.push(`/jobs-by-state?state=${encodeURIComponent(stateName)}`)
                      } else if (fromApplications) {
                        router.push("/applications")
                      } else if (fromBookmarks) {
                        router.push("/bookmarks")
                      } else {
                        router.back()
                      }
                    }}
                    whileHover={isMobile ? { scale: 1.15, rotate: -5 } : { scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={isMobile ? `p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg bg-white/30 text-white hover:bg-primary-500` : `group w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center`}
                    style={!isMobile ? {
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    } : {}}
                  >
                    <ArrowLeft className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5 text-white drop-shadow-lg transition-transform duration-200 group-hover:-translate-x-1'}`} />
                  </motion.button>
                </div>

                {/* Action Buttons - Top Right */}
                {isAuthenticated && (
                  <div className={`absolute ${isMobile ? 'top-3 right-3' : 'top-4 right-4'} flex items-center ${isMobile ? 'gap-1.5' : 'gap-2'} ${isMobile ? 'z-[110]' : 'z-10'}`}>
                    {/* Like Button */}
                    <motion.button
                      type="button"
                      disabled={isPending}
                      whileHover={isMobile ? (isPending ? {} : { scale: 1.15, rotate: 5 }) : (isPending ? {} : { scale: 1.1 })}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        if (isPending) {
                          e.preventDefault()
                          e.stopPropagation()
                          return
                        }
                        e.preventDefault()
                        e.stopPropagation()
                        handleLike()
                      }}
                      className={isMobile ? `p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${isPending ? 'cursor-not-allowed opacity-70' : ''} ${isLiked ? 'bg-primary-500 text-white' : 'bg-white/30 text-white hover:bg-primary-500'}` : `${isPending ? 'cursor-not-allowed opacity-70' : ''} ${isMobile ? 'w-9 h-9 rounded-lg' : 'w-12 h-12 rounded-xl'} transition-all flex items-center justify-center`}
                      style={!isMobile ? (isLiked ? {
                        background: isPending ? 'rgba(127, 40, 96, 0.6)' : 'rgba(127, 40, 96, 0.9)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(127, 40, 96, 0.5)',
                        boxShadow: '0 8px 32px rgba(127, 40, 96, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      } : {
                        background: isPending ? 'rgba(200, 200, 200, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: isPending ? '1px solid rgba(200, 200, 200, 0.5)' : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: isPending ? '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }) : {}}
                    >
                      <ThumbsUp className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} ${isLiked ? 'fill-white text-white' : isPending ? (isMobile ? 'text-white' : 'text-gray-300') : (isMobile ? 'text-white' : 'text-white drop-shadow-lg')}`} />
                    </motion.button>

                    {/* Dislike Button */}
                    <motion.button
                      type="button"
                      disabled={isPending}
                      whileHover={isMobile ? (isPending ? {} : { scale: 1.15, rotate: -5 }) : (isPending ? {} : { scale: 1.1 })}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        if (isPending) {
                          e.preventDefault()
                          e.stopPropagation()
                          return
                        }
                        e.preventDefault()
                        e.stopPropagation()
                        handleDislike()
                      }}
                      className={isMobile ? `p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${isPending ? 'cursor-not-allowed opacity-70' : ''} ${isDisliked ? 'bg-primary-500 text-white' : 'bg-white/30 text-white hover:bg-primary-500'}` : `${isPending ? 'cursor-not-allowed opacity-70' : ''} ${isMobile ? 'w-9 h-9 rounded-lg' : 'w-12 h-12 rounded-xl'} transition-all flex items-center justify-center`}
                      style={!isMobile ? (isDisliked ? {
                        background: isPending ? 'rgba(127, 40, 96, 0.6)' : 'rgba(127, 40, 96, 0.9)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(127, 40, 96, 0.5)',
                        boxShadow: '0 8px 32px rgba(127, 40, 96, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      } : {
                        background: isPending ? 'rgba(200, 200, 200, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: isPending ? '1px solid rgba(200, 200, 200, 0.5)' : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: isPending ? '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }) : {}}
                    >
                      <ThumbsDown className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} ${isDisliked ? 'fill-white text-white' : isPending ? (isMobile ? 'text-white' : 'text-gray-300') : (isMobile ? 'text-white' : 'text-white drop-shadow-lg')}`} />
                    </motion.button>

                    {/* Bookmark Button */}
                    <motion.button
                      type="button"
                      disabled={isPending}
                      whileHover={isMobile ? (isPending ? {} : { scale: 1.15, rotate: -5 }) : (isPending ? {} : { scale: 1.1 })}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        if (isPending) {
                          e.preventDefault()
                          e.stopPropagation()
                          return
                        }
                        e.preventDefault()
                        e.stopPropagation()
                        handleSave()
                      }}
                      className={isMobile ? `p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${isPending ? 'cursor-not-allowed opacity-70' : ''} ${isSaved ? 'bg-primary-500 text-white' : 'bg-white/30 text-white hover:bg-primary-500'}` : `${isPending ? 'cursor-not-allowed opacity-70' : ''} ${isMobile ? 'w-9 h-9 rounded-lg' : 'w-12 h-12 rounded-xl'} transition-all flex items-center justify-center`}
                      style={!isMobile ? (isSaved ? {
                        background: isPending ? 'rgba(127, 40, 96, 0.6)' : 'rgba(127, 40, 96, 0.9)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(127, 40, 96, 0.5)',
                        boxShadow: '0 8px 32px rgba(127, 40, 96, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      } : {
                        background: isPending ? 'rgba(200, 200, 200, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: isPending ? '1px solid rgba(200, 200, 200, 0.5)' : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: isPending ? '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }) : {}}
                    >
                      <Bookmark className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} ${isSaved ? 'fill-white text-white' : isPending ? (isMobile ? 'text-white' : 'text-gray-300') : (isMobile ? 'text-white' : 'text-white drop-shadow-lg')}`} />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Tab Bar Container */}
              <div ref={tabBarPlaceholderRef} className="relative">
                <motion.div 
                  ref={tabBarRef}
                  layout={false}
                  transition={{ 
                    duration: 0.15, 
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className={`${isMobile ? 'border-b' : 'border-b-2'} transition-colors duration-150 ${
                    isTabBarFixed 
                      ? `${isMobile ? 'bg-white border-gray-200' : 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-2xl'}`
                      : 'bg-white border-gray-200'
                  }`}
                  style={
                    isTabBarFixed
                      ? { 
                          position: 'fixed', 
                          top: `${isMobile ? navHeight : navHeight}px`, 
                          left: isMobile ? '0' : `${tabBarPosition.left}px`,
                          width: isMobile ? '100%' : `${tabBarPosition.width}px`,
                          zIndex: isMobile ? 100 : 40,
                          boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.08)',
                          willChange: 'transform',
                          transform: 'translateZ(0)',
                        }
                      : { 
                          position: isMobile ? 'sticky' : 'relative',
                          top: isMobile ? '0px' : 'auto', // No nav offset on mobile since nav is hidden
                          zIndex: isMobile ? 100 : 'auto',
                          willChange: 'auto'
                        }
                  }
                >
                  <div className={isMobile ? 'px-4' : 'px-6'}>
                    <div className={`flex items-center ${isMobile ? 'gap-0' : 'gap-4'}`}>
                      {/* Tabs */}
                      <div className={`flex ${isMobile ? 'gap-0' : 'gap-1'} overflow-x-auto flex-1 ${isMobile ? '-mx-4 px-4' : ''}`}>
                        {[
                          { id: 'overview', label: 'Overview', ref: overviewRef },
                          { id: 'facility-details', label: 'Facility Details', ref: facilityDetailsRef },
                          { id: 'cost-of-living', label: 'Cost of Living', ref: costOfLivingRef },
                          { id: 'weather', label: 'Weather', ref: weatherRef },
                          { id: 'transportation', label: 'Transportation and Crime', ref: transportationRef }
                        ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.ref, tab.id)}
                  whileHover={isMobile ? {} : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative ${isMobile ? 'px-4 py-3 text-xs' : 'px-6 py-4 text-sm'} font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {/* Background glow on active tab */}
                  <motion.div
                    className="absolute inset-0 bg-primary-50/50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: activeTab === tab.id ? 1 : 0,
                      scale: activeTab === tab.id ? 1 : 0.95
                    }}
                    transition={{ 
                      duration: 0.2,
                      ease: 'easeOut'
                    }}
                    style={{ pointerEvents: 'none' }}
                  />
                  
                  <span className="relative z-10">{tab.label}</span>
                  
                  {/* Active indicator line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 rounded-t-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                      scaleX: activeTab === tab.id ? 1 : 0,
                      opacity: activeTab === tab.id ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.2,
                      ease: 'easeOut'
                    }}
                    style={{
                      boxShadow: '0 -2px 10px rgba(127, 40, 96, 0.3)',
                      transformOrigin: 'center'
                    }}
                  />
                  
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
                    </div>
                  </div>
        </motion.div>
        
        {/* Invisible spacer to maintain layout when tab bar is fixed */}
        {isTabBarFixed && !isMobile && <div style={{ height: '64px' }} aria-hidden="true"></div>}
      </div>

              {/* Tab Content Sections - Inside the card */}
              <div className={isMobile ? 'p-4' : 'p-6'}>
                <div className={isMobile ? 'space-y-6' : 'space-y-12'}>
                {/* Overview Section */}
                <div ref={overviewRef} id="overview" className={isMobile ? 'scroll-mt-20' : 'scroll-mt-44'}>
                  <div className={`${isMobile ? 'bg-white rounded-none border-0 shadow-none' : 'bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg'} ${isMobile ? 'p-0' : 'p-6'}`}>
                    {/* Main Header - License-Specialty */}
                    <div className={`${isMobile ? 'mb-4 pb-4' : 'mb-6 pb-6'} border-b border-gray-200`}>
                      <div className={`flex items-start justify-between ${isMobile ? 'gap-2' : 'gap-4'} mb-2`}>
                        <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-gray-900 flex-1 min-w-0 break-words`}>
                          {job.specialtyRequired || job.title}
                        </h1>
                        {/* Badges - Featured and Pending */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {job.featured && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-md border border-amber-200">
                              <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                              <span className="text-xs font-semibold text-amber-900">Featured</span>
                            </div>
                          )}
                          {isPending && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-md border border-orange-200">
                              <AlertCircle className="w-3 h-3 text-orange-600" />
                              <span className="text-xs font-semibold text-orange-900">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 text-gray-600`}>
                        <MapPin className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                        <span className={isMobile ? 'text-sm' : 'text-base'}>{job.city}, {job.state}</span>
                        </div>
                      </div>

                    {/* Key Information Grid */}
                    <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4'} ${isMobile ? 'mb-4' : 'mb-6'}`}>
                      {/* Estimated Start Date */}
                      <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        <Calendar className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0 mt-0.5`} />
                        <div className="flex flex-col">
                          <span className={`${isMobile ? 'text-[11px]' : 'text-xs'} text-gray-500 mb-1`}>Estimated Start Date</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>{job.startDate ? formatDateWithYear(job.startDate) : 'TBD'}</span>
                        </div>
                      </div>

                      {/* Facility Name */}
                      <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        <Building2 className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0 mt-0.5`} />
                        <div className="flex flex-col">
                          <span className={`${isMobile ? 'text-[11px]' : 'text-xs'} text-gray-500 mb-1`}>Facility Name</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>{job.facilityName || 'Not specified'}</span>
                        </div>
                      </div>

                      {/* Type of Shift */}
                      <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        <Clock className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0 mt-0.5`} />
                        <div className="flex flex-col">
                          <span className={`${isMobile ? 'text-[11px]' : 'text-xs'} text-gray-500 mb-1`}>Type of Shift</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>{job.shift || 'Not specified'}</span>
                        </div>
                      </div>

                      {/* Shift Length */}
                      <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        <Clock className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0 mt-0.5`} />
                        <div className="flex flex-col">
                          <span className={`${isMobile ? 'text-[11px]' : 'text-xs'} text-gray-500 mb-1`}>Shift Length</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>{job.shiftHours || 'Not specified'}</span>
                        </div>
                      </div>

                      {/* Assignment Length */}
                      <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        <Infinity className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0 mt-0.5`} />
                        <div className="flex flex-col">
                          <span className={`${isMobile ? 'text-[11px]' : 'text-xs'} text-gray-500 mb-1`}>Assignment Length</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>{job.duration || 'Not specified'}</span>
                        </div>
                      </div>

                      {/* Expected Shift Time */}
                      <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        <Clock className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0 mt-0.5`} />
                        <div className="flex flex-col">
                          <span className={`${isMobile ? 'text-[11px]' : 'text-xs'} text-gray-500 mb-1`}>Expected Shift Time</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>08:00 - 16:30</span>
                        </div>
                      </div>

                      {/* Weekly Hours */}
                      {job.guaranteedHours && (
                        <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                          <Clock className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0 mt-0.5`} />
                          <div className="flex flex-col">
                            <span className={`${isMobile ? 'text-[11px]' : 'text-xs'} text-gray-500 mb-1`}>Weekly Hours</span>
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>{job.guaranteedHours} hours/week</span>
                        </div>
                      </div>
                      )}

                      {/* Shifts Per Week */}
                      {job.guaranteedHours && job.shiftHours && (
                        <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                          <Clock className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0 mt-0.5`} />
                          <div className="flex flex-col">
                            <span className={`${isMobile ? 'text-[11px]' : 'text-xs'} text-gray-500 mb-1`}>Shifts Per Week</span>
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-900`}>
                              {(() => {
                                const hours = parseFloat(job.shiftHours.replace(/[^0-9.]/g, '')) || 8
                                const weeklyHours = job.guaranteedHours || 36
                                const shifts = Math.round(weeklyHours / hours)
                                return `${shifts} shifts/week`
                              })()}
                            </span>
                        </div>
                        </div>
                      )}
                      </div>

                      {/* Call-Off Policy */}
                      {job.callRequirements && (
                      <div className="pt-6 mt-6 border-t border-gray-200 flex items-start gap-3">
                        <Eye className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">Call-Off Policy</span>
                          <span className="text-sm text-gray-900">{job.callRequirements}</span>
                          </div>
                        </div>
                      )}

                    {/* Job Description */}
                    {job.description && (
                      <div className="pt-6 mt-6 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="w-5 h-5 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-700">Job Description</span>
                    </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{job.description}</p>
                  </div>
                    )}

                    {/* Agency Overview */}
                    <div className="pt-6 mt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700">Agency Overview</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          {/* Agency Thumbnail */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md overflow-hidden">
                              {job.staffingCompany ? (
                                <img 
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(job.staffingCompany)}&size=64&background=3b82f6&color=ffffff&bold=true&font-size=0.4`}
                                  alt={job.staffingCompany}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.style.display = 'none'
                                    if (target.parentElement) {
                                      target.parentElement.innerHTML = `<span class="text-white font-bold text-lg">${job.staffingCompany.charAt(0)}</span>`
                                    }
                                  }}
                                />
                              ) : (
                                <Building2 className="w-8 h-8 text-white" />
                              )}
                        </div>
                      </div>

                          {/* Agency Name and Location */}
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">{job.staffingCompany}</h4>
                            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.city}, {job.state}
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              A leading healthcare staffing agency connecting talented healthcare professionals with rewarding travel assignments across the United States.
                            </p>
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* Requirements Section */}
                    {((job.requirements?.length ?? 0) > 0 || (job.licensureRequired?.length ?? 0) > 0 || (job.certifications?.length ?? 0) > 0 || (job.vaccineRequirements?.length ?? 0) > 0) && (
                      <div className="pt-6 mt-6 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-700">Requirements</span>
                </div>
                        
                        <div className="space-y-2.5">
                          {/* Licensure */}
                          {job.licensureRequired?.map((license, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></div>
                              <p className="text-sm text-gray-700">{license}</p>
                </div>
                          ))}
                          
                          {/* Key Requirements */}
                          {job.requirements?.slice(0, 4).map((requirement, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></div>
                              <p className="text-sm text-gray-700">{requirement}</p>
                  </div>
                          ))}
                        </div>

                        {/* Certifications & Vaccines - Compact */}
                        {((job.certifications?.length ?? 0) > 0 || (job.vaccineRequirements?.length ?? 0) > 0) && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap gap-1.5">
                              {job.certifications?.map((cert, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {cert}
                                </span>
                              ))}
                              {job.vaccineRequirements?.map((vaccine, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {vaccine}
                                </span>
                              ))}
                  </div>
                  </div>
                        )}
                  </div>
                    )}
                  </div>
                  </div>

                </div>

            {/* Section Separator */}
            <div className="my-12 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-400 font-medium">Facility Details</div>
              <div className="flex-1 border-t border-gray-200"></div>
                </div>

            {/* Facility Details Section */}
            <div ref={facilityDetailsRef} id="facility-details" className={isMobile ? 'scroll-mt-20 space-y-6' : 'scroll-mt-44 space-y-6'}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Facility Details</h2>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg p-6">
                {/* Facility Name and Image */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-start gap-4">
                    <img 
                      src={getFacilityImageWithFallback(job.facilityImage, job.state)} 
                      alt={job.facilityName || 'Facility'} 
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {job.facilityName || 'Facility information not available'}
              </h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{job.city}, {job.state}</span>
                    </div>
                    </div>
                  </div>
                </div>

                {/* Facility Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Facility Type */}
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">Facility Type</span>
                      <span className="text-sm font-semibold text-gray-900">{job.facilityType || 'Not specified'}</span>
                </div>
              </div>

                  {/* Bed Count */}
                  {job.beds && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Bed Count</span>
                        <span className="text-sm font-semibold text-gray-900">{job.beds} beds</span>
                </div>
                    </div>
                  )}

                  {/* EMR System */}
                  {job.emrSystem && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">EMR/EHR System</span>
                        <span className="text-sm font-semibold text-gray-900">{job.emrSystem}</span>
                </div>
                    </div>
                  )}

                  {/* Patient Population */}
                  {job.patientPopulation && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Patient Population</span>
                        <span className="text-sm font-semibold text-gray-900">{job.patientPopulation}</span>
                  </div>
                </div>
              )}

                  {/* Patient Ratio */}
                  {job.patientRatio && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Patient Ratio</span>
                        <span className="text-sm font-semibold text-gray-900">{job.patientRatio}</span>
                      </div>
                    </div>
                  )}

                  {/* Scrub Color */}
                  {job.scrubColor && (
                    <div className="flex items-start gap-3">
                      <Shirt className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Scrub Color</span>
                        <span className="text-sm font-semibold text-gray-900">{job.scrubColor}</span>
                  </div>
                </div>
              )}

                  {/* Float Requirements */}
                  {job.floatRequirements && (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Float Requirements</span>
                        <span className="text-sm font-semibold text-gray-900">{job.floatRequirements}</span>
                    </div>
                    </div>
                  )}

                  {/* Call Requirements */}
                  {job.callRequirements && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Call Requirements</span>
                        <span className="text-sm font-semibold text-gray-900">{job.callRequirements}</span>
                    </div>
                  </div>
                )}

                  {/* Weekend Requirements */}
                  {job.weekendRequirements && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Weekend Requirements</span>
                        <span className="text-sm font-semibold text-gray-900">{job.weekendRequirements}</span>
                      </div>
                    </div>
                  )}

                  {/* Parking Info */}
                  {job.parkingInfo && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Parking</span>
                        <span className="text-sm font-semibold text-gray-900">{job.parkingInfo}</span>
                    </div>
                    </div>
                  )}

                  {/* Orientation Period */}
                  {job.orientationPeriod && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Orientation Period</span>
                        <span className="text-sm font-semibold text-gray-900">{job.orientationPeriod}</span>
                    </div>
                  </div>
                )}
                    </div>

                {/* Contact Information */}
                {(job.contactPhone || job.contactEmail || job.website) && (
                  <div className="pt-6 mt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {job.contactPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${job.contactPhone}`} className="text-sm text-gray-900 hover:text-primary-600">
                            {job.contactPhone}
                          </a>
                    </div>
                      )}
                      {job.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${job.contactEmail}`} className="text-sm text-gray-900 hover:text-primary-600">
                            {job.contactEmail}
                          </a>
                  </div>
                )}
                      {job.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <a href={job.website.startsWith('http') ? job.website : `https://${job.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-900 hover:text-primary-600">
                            {job.website}
                          </a>
                    </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section Separator */}
            <div className="my-12 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-400 font-medium">Cost of Living</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Cost of Living Section */}
            <div ref={costOfLivingRef} id="cost-of-living" className={isMobile ? 'scroll-mt-20 space-y-6' : 'scroll-mt-44 space-y-6'}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost of Living</h2>
              
              {costOfLivingLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-700">Family of Four - Monthly Costs without Rent</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {costOfLivingData?.familyMonthlyCosts || '$3,907.57'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-700">Single Person - Monthly Costs without Rent</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {costOfLivingData?.singleMonthlyCosts || '$1,041.67'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Categories */}
                  <div className="space-y-3">
                    {/* Rent Section */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <button
                        onClick={() => setIsRentExpanded(!isRentExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <span className="text-base font-semibold text-gray-900">Rent</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-semibold ${costOfLivingData?.rent?.percentage < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {costOfLivingData?.rent?.percentage || '-41.76'}%
                          </span>
              <motion.div
                            animate={{ rotate: isRentExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </motion.div>
                  </div>
                      </button>
                      <AnimatePresence>
                        {isRentExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-3 border-t border-gray-100">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-700">1 Bedroom Apartment in the City</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.rent?.oneBedroomCity || '$1,500.00'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">1 Bedroom Apartment outside the City</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.rent?.oneBedroomOutside || '$1,300.00'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">3 Bedroom Apartment in the City</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.rent?.threeBedroomCity || '$4,200.00'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">3 Bedroom Apartment outside the City</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.rent?.threeBedroomOutside || '$3,000.00'}
                                </span>
                              </div>
                            </div>
              </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Utilities Section */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <button
                        onClick={() => setIsUtilitiesExpanded(!isUtilitiesExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <span className="text-base font-semibold text-gray-900">Utilities</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-semibold ${costOfLivingData?.utilities?.percentage < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {costOfLivingData?.utilities?.percentage || '4.28'}%
                          </span>
              <motion.div
                            animate={{ rotate: isUtilitiesExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </motion.div>
                  </div>
                      </button>
                      <AnimatePresence>
                        {isUtilitiesExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-3 border-t border-gray-100">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-700">Basic Utilities (1 Bedroom Apartment)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.utilities?.basic || '$211.42'}
                                </span>
                  </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">Internet</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.utilities?.internet || '$70.00'}
                                </span>
                  </div>
                  </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                  </div>

                    {/* Groceries Section */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <button
                        onClick={() => setIsGroceriesExpanded(!isGroceriesExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <span className="text-base font-semibold text-gray-900">Groceries</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-semibold ${costOfLivingData?.groceries?.percentage < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {costOfLivingData?.groceries?.percentage || '-16.63'}%
                          </span>
                          <motion.div
                            animate={{ rotate: isGroceriesExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </motion.div>
                        </div>
                      </button>
                      <AnimatePresence>
                        {isGroceriesExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-3 border-t border-gray-100">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-700">Milk (regular), (1 gallon)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.groceries?.milk || '$3.50'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">Loaf of Fresh White Bread (1 lb)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.groceries?.bread || '$2.50'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">Rice (white), (1 lb)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.groceries?.rice || '$1.20'}
                                </span>
                  </div>
                </div>
              </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Transportation Section */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <button
                        onClick={() => setIsTransportationExpanded(!isTransportationExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <span className="text-base font-semibold text-gray-900">Transportation</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-semibold ${costOfLivingData?.transportation?.percentage < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {costOfLivingData?.transportation?.percentage || '-89.47'}%
                          </span>
              <motion.div
                            animate={{ rotate: isTransportationExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </motion.div>
                  </div>
                      </button>
                      <AnimatePresence>
                        {isTransportationExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-3 border-t border-gray-100">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-700">One-way Ticket (Local Transport)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.transportation?.oneWay || '$2.50'}
                                </span>
                  </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">Monthly Pass (Regular Price)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.transportation?.monthlyPass || '$60.00'}
                                </span>
                  </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">Gasoline (1 gallon)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.transportation?.gasoline || '$3.50'}
                                </span>
                    </div>
                    </div>
                          </motion.div>
                  )}
                      </AnimatePresence>
                    </div>

                    {/* Restaurants Section */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <button
                        onClick={() => setIsRestaurantsExpanded(!isRestaurantsExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <span className="text-base font-semibold text-gray-900">Restaurants</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-red-600">
                            {costOfLivingData?.restaurants?.percentage || '-33.52'}%
                          </span>
                          <motion.div
                            animate={{ rotate: isRestaurantsExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </motion.div>
                    </div>
                      </button>
                      <AnimatePresence>
                        {isRestaurantsExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-3 border-t border-gray-100">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-700">Meal, Inexpensive Restaurant</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.restaurants?.inexpensive || '$15.00'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">Meal for 2 People, Mid-range Restaurant</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.restaurants?.midRange || '$60.00'}
                                </span>
                              </div>
                </div>
              </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Sports and Leisure Section */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <button
                        onClick={() => setIsSportsLeisureExpanded(!isSportsLeisureExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <span className="text-base font-semibold text-gray-900">Sports and Leisure</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-red-600">
                            {costOfLivingData?.sportsLeisure?.percentage || '-25.00'}%
                          </span>
              <motion.div
                            animate={{ rotate: isSportsLeisureExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </motion.div>
                    </div>
                      </button>
                      <AnimatePresence>
                        {isSportsLeisureExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-3 border-t border-gray-100">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-700">Fitness Club, Monthly Fee for 1 Adult</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.sportsLeisure?.fitness || '$40.00'}
                                </span>
                    </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">Tennis Court Rent (1 Hour on Weekend)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.sportsLeisure?.tennis || '$25.00'}
                                </span>
                    </div>
                    </div>
                          </motion.div>
                  )}
                      </AnimatePresence>
                    </div>

                    {/* Clothing and Shoes Section */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <button
                        onClick={() => setIsClothingExpanded(!isClothingExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <span className="text-base font-semibold text-gray-900">Clothing and Shoes</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-red-600">
                            {costOfLivingData?.clothing?.percentage || '-16.47'}%
                          </span>
                          <motion.div
                            animate={{ rotate: isClothingExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </motion.div>
                    </div>
                      </button>
                      <AnimatePresence>
                        {isClothingExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-3 border-t border-gray-100">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-700">1 Pair of Jeans (Levis 501 Or Similar)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.clothing?.jeans || '$50.00'}
                                </span>
                    </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">1 Summer Dress in a Chain Store</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.clothing?.dress || '$35.00'}
                                </span>
                    </div>
                </div>
              </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Earnings and Financing Section */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg overflow-hidden">
                      <button
                        onClick={() => setIsEarningsExpanded(!isEarningsExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                      >
                        <span className="text-base font-semibold text-gray-900">Earnings and Financing</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-red-600">
                            {costOfLivingData?.earnings?.percentage || '-18.34'}%
                          </span>
              <motion.div
                            animate={{ rotate: isEarningsExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          </motion.div>
                  </div>
                      </button>
                      <AnimatePresence>
                        {isEarningsExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-3 border-t border-gray-100">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-700">Average Monthly Net Salary (After Tax)</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.earnings?.averageSalary || '$4,500.00'}
                                </span>
                  </div>
                              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                <span className="text-sm text-gray-700">Mortgage Interest Rate in Percentages (%), Yearly</span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {costOfLivingData?.earnings?.mortgageRate || '4.50%'}
                                </span>
                  </div>
                  </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                  </div>
                </div>
                </>
              )}
                </div>
              </div>
            </div>

            {/* Section Separator */}
            <div className="my-12 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-400 font-medium">Weather</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Weather Section */}
            <div ref={weatherRef} id="weather" className={isMobile ? 'scroll-mt-20' : 'scroll-mt-44'}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Weather</h2>
              
              {weatherLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg p-6">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <span className="text-base font-semibold text-gray-900">
                        {weatherData?.current?.location || `${job.city}, ${job.state}`}
                      </span>
                  </div>
                    <span className="text-sm text-gray-600">
                      Today {weatherData?.current?.time || new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </span>
                  </div>

                  {/* Main Content - Current Weather & Bar Chart */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Left - Current Weather */}
                    <div>
                      <div className="mb-4">
                        <div className="text-5xl font-bold text-gray-900 mb-2">
                          {weatherData?.current?.temperature || 14}°
                        </div>
                        <div className="text-sm text-gray-600 capitalize flex items-center gap-2">
                          {weatherData?.current?.icon && (
                            <img 
                              src={`https://openweathermap.org/img/wn/${weatherData.current.icon}@2x.png`}
                              alt={weatherData.current.condition}
                              className="w-8 h-8"
                            />
                          )}
                          {weatherData?.current?.description || 'Mostly Clear'}
                  </div>
                </div>

                      {/* Data points */}
                      <div className="flex items-center gap-4 text-xs text-gray-600 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-1">
                          {weatherData?.current?.icon && (
                            <img 
                              src={`https://openweathermap.org/img/wn/${weatherData.current.icon}.png`}
                              alt="Pressure"
                              className="w-4 h-4"
                            />
                          )}
                          <span>{weatherData?.current?.pressure || 720}hpa</span>
                  </div>
                        <div className="flex items-center gap-1">
                          {weatherData?.current?.icon && (
                            <img 
                              src="https://openweathermap.org/img/wn/09d.png"
                              alt="Humidity"
                              className="w-4 h-4"
                            />
                          )}
                          <span>{weatherData?.current?.humidity || 32}%</span>
                  </div>
                        <div className="flex items-center gap-1">
                          {weatherData?.current?.icon && (
                            <img 
                              src="https://openweathermap.org/img/wn/50d.png"
                              alt="Wind"
                              className="w-4 h-4"
                            />
                          )}
                          <span>{weatherData?.current?.wind ? `${Math.round(weatherData.current.wind * 1.60934)}km/h` : '12km/h'}</span>
                  </div>
                </div>
                    </div>

                    {/* Right - Temperature Bar Chart */}
                  <div>
                      <div className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        Temperature
                  </div>
                      <div className="flex items-end justify-between gap-3 h-32">
                        {weatherData?.temperaturePeriods?.map((period: any, index: number) => {
                          const maxTemp = Math.max(...(weatherData.temperaturePeriods.map((p: any) => p.temp)))
                          const minTemp = Math.min(...(weatherData.temperaturePeriods.map((p: any) => p.temp)))
                          const range = maxTemp - minTemp || 1
                          const heightPercentage = ((period.temp - minTemp) / range) * 70 + 30
                          
                          return (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div className="w-full flex flex-col items-center mb-2">
                                <div 
                                  className="w-full bg-gradient-to-t from-primary-600 to-primary-500 rounded-t"
                                  style={{ height: `${heightPercentage}%`, minHeight: '30px' }}
                                ></div>
                  </div>
                              <div className="text-xs font-semibold text-gray-900 mb-1">{period.temp}°</div>
                              <div className="text-xs text-gray-600">{period.period}</div>
                </div>
                          )
                        })}
                      </div>
                    </div>
            </div>

                  {/* Weather Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                    {/* Wind Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-sm p-4">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Wind</div>
                      <div className="text-xs text-gray-500 mb-4">Today wind speed</div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">
                          {weatherData?.current?.wind ? `${Math.round(weatherData.current.wind * 1.60934)}` : '12'}
                          <span className="text-sm text-gray-600">km/h</span>
                        </div>
                        <div className="relative w-14 h-14">
                          <svg className="w-14 h-14 transform" style={{ transform: `rotate(${weatherData?.current?.windDirection || 45}deg)` }}>
                            <circle cx="28" cy="28" r="24" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                            <line x1="28" y1="28" x2="28" y2="6" stroke="#6b1f51" strokeWidth="2.5" strokeLinecap="round"/>
                            <circle cx="28" cy="28" r="2" fill="#6b1f51"/>
                          </svg>
                        </div>
                      </div>
            </div>

                    {/* Rain Chance Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-sm p-4">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Rain Chance</div>
                      <div className="text-xs text-gray-500 mb-4">Today rain chance</div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">
                          {weatherData?.current?.chanceOfRain || 24}
                          <span className="text-sm text-gray-600">%</span>
                  </div>
                        <div className="relative w-14 h-14">
                          <svg className="w-14 h-14 transform -rotate-90">
                            <circle cx="28" cy="28" r="24" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
                            <circle 
                              cx="28" 
                              cy="28" 
                              r="24" 
                              fill="none" 
                              stroke="#6b1f51"
                              strokeWidth="3"
                              strokeDasharray={`${2 * Math.PI * 24}`}
                              strokeDashoffset={`${2 * Math.PI * 24 * (1 - (weatherData?.current?.chanceOfRain || 24) / 100)}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-700">
                              {(() => {
                                const chance = weatherData?.current?.chanceOfRain ?? 24;
                                if (chance < 30) return 'Low';
                                if (chance < 60) return 'Mod';
                                return 'High';
                              })()}
                            </span>
                  </div>
                </div>
                      </div>
                    </div>

                    {/* Pressure Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-sm p-4">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Pressure</div>
                      <div className="text-xs text-gray-500 mb-4">Today Pressure</div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">
                          {weatherData?.current?.pressure || 720}
                          <span className="text-sm text-gray-600"> hpa</span>
                  </div>
                        <div className="relative w-14 h-14">
                          <svg className="w-14 h-14">
                            <path 
                              d="M 14 28 A 14 14 0 0 1 42 28" 
                              fill="none" 
                              stroke="#e5e7eb" 
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                            <line 
                              x1="28" 
                              y1="28" 
                              x2="28" 
                              y2="18" 
                              stroke="#6b1f51"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              transform={`rotate(${(weatherData?.current?.pressure || 720) / 10} 28 28)`}
                            />
                            <circle cx="28" cy="28" r="2" fill="#6b1f51"/>
                          </svg>
                  </div>
                </div>
                    </div>

                    {/* UV Index Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-sm p-4">
                      <div className="text-sm font-semibold text-gray-900 mb-1">UV Index</div>
                      <div className="text-xs text-gray-500 mb-4">Today UV Index</div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">
                          {weatherData?.current?.uvIndex !== undefined ? weatherData.current.uvIndex : 2}
                    </div>
                        <div className="relative w-14 h-14">
                          <svg className="w-14 h-14 transform -rotate-90">
                            <circle cx="28" cy="28" r="24" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
                            <circle 
                              cx="28" 
                              cy="28" 
                              r="24" 
                              fill="none" 
                              stroke={(() => {
                                const uvIndex = weatherData?.current?.uvIndex ?? 2;
                                if (uvIndex < 3) return '#7F2860';
                                if (uvIndex < 6) return '#6b1f51';
                                return '#581a43';
                              })()}
                              strokeWidth="3"
                              strokeDasharray={`${2 * Math.PI * 24}`}
                              strokeDashoffset={`${2 * Math.PI * 24 * (1 - ((weatherData?.current?.uvIndex ?? 2) / 11))}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-700">
                              {(() => {
                                const uvIndex = weatherData?.current?.uvIndex ?? 2;
                                if (uvIndex < 3) return 'Low';
                                if (uvIndex < 6) return 'Mod';
                                return 'High';
                              })()}
                            </span>
                  </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section Separator */}
            <div className="my-12 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-400 font-medium">Transportation and Crime</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Transportation and Crime Section */}
            <div ref={transportationRef} id="transportation" className={isMobile ? 'scroll-mt-20 space-y-6' : 'scroll-mt-44 space-y-6'}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Transportation and Crime</h2>
              
              {transportationCrimeLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-gray-200/50 shadow-lg p-6">
                  {/* Transportation Section */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-gray-400" />
                      Transportation Options
                </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* One-way Ticket */}
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">One-way Ticket (Local Transport)</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.transportation?.oneWayTicket || '$2.50'}
                          </span>
                  </div>
                  </div>
                      {/* Monthly Pass */}
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">Monthly Pass (Regular Price)</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.transportation?.monthlyPass || '$60.00'}
                          </span>
                  </div>
                  </div>
                      {/* Gasoline */}
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">Gasoline (1 gallon)</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.transportation?.gasoline || '$3.50'}
                          </span>
                </div>
                  </div>
                      {/* Average Commute */}
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">Average Commute</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.transportation?.averageCommute || '15-20 minutes'}
                          </span>
                  </div>
                  </div>
                      {/* Parking */}
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">Parking</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.transportation?.parking || job.parkingInfo || 'Available on-site'}
                          </span>
                  </div>
                </div>
                    </div>
                    {/* Transportation Options */}
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Available Services</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {transportationCrimeData?.transportation?.rideshareAvailable && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">Rideshare Services</span>
                    </div>
                        )}
                        {transportationCrimeData?.transportation?.publicTransitAvailable && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">Public Transit</span>
                  </div>
                        )}
                        {transportationCrimeData?.transportation?.bikeFriendly && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">Bike-Friendly</span>
                    </div>
                        )}
                    </div>
                  </div>
                </div>

                  {/* Crime & Safety Section */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                      Safety & Crime
                    </h3>
                    
                    {/* Crime and Safety Indices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Crime Index */}
                      <div className="p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">Crime Index</span>
                          <span className={`text-sm font-semibold ${
                            (transportationCrimeData?.crime?.crimeIndex || 25) < 20 ? 'text-green-600' :
                            (transportationCrimeData?.crime?.crimeIndex || 25) < 40 ? 'text-green-500' :
                            (transportationCrimeData?.crime?.crimeIndex || 25) < 60 ? 'text-yellow-600' :
                            (transportationCrimeData?.crime?.crimeIndex || 25) < 80 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {transportationCrimeData?.crime?.crimeIndex?.toFixed(1) || '25.0'}
                          </span>
                </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {transportationCrimeData?.crime?.crimeIndexLevel || 'Low'}
                </div>
              </div>
                      {/* Safety Index */}
                      <div className="p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">Safety Index</span>
                          <span className={`text-sm font-semibold ${
                            (transportationCrimeData?.crime?.safetyIndex || 75) > 80 ? 'text-green-600' :
                            (transportationCrimeData?.crime?.safetyIndex || 75) > 60 ? 'text-green-500' :
                            (transportationCrimeData?.crime?.safetyIndex || 75) > 40 ? 'text-yellow-600' :
                            (transportationCrimeData?.crime?.safetyIndex || 75) > 20 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {transportationCrimeData?.crime?.safetyIndex?.toFixed(1) || '75.0'}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {transportationCrimeData?.crime?.safetyLevel || 'Safe'}
                        </div>
                      </div>
                    </div>
                    {/* Crime Concerns */}
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Crime Concerns</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-700">Crime Increasing (Last 3 Years)</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.crime?.concerns?.crimeIncreasing || 'Stable'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-700">Home Break & Theft</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.crime?.concerns?.homeBreakAndTheft || 'Low'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-700">Mugging & Robbery</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.crime?.concerns?.muggingAndRobbery || 'Low'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-700">Car Theft</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.crime?.concerns?.carTheft || 'Low'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-700">Property Crimes</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.crime?.concerns?.propertyCrimes || 'Low'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-700">Violent Crimes</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {transportationCrimeData?.crime?.concerns?.violentCrimes || 'Low'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Job Card */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 mt-8">
              {/* Job Summary Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Header - Posted Date and Estimated Weekly Pay Title */}
                <div className="px-4 py-3 flex items-center justify-between">
                  <p className="text-xs text-gray-500">Estimated weekly pay</p>
                  <span className="text-xs text-gray-500">Posted {formatDateWithYear(job.postedDate)}</span>
                </div>

                {/* Card Body */}
                <div className="p-4 pt-0">
                  {/* Amount Per Week - Left Aligned */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1 hidden">Estimated weekly pay</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {(() => {
                          // Extract numeric value from job.weeklyPay and format with 2 decimals
                          const payValue = parseFloat((job.weeklyPay || '0').replace(/[^0-9.]/g, '')) || 0
                          return payValue > 0 
                            ? `$${payValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : 'N/A'
                        })()}
                      </span>
                      <span className="text-sm font-normal text-gray-500">/week</span>
                    </div>
                  </div>

                  {/* Shift Information - Left Aligned */}
                  {job.shift && (
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Shift</p>
                      <p className="text-sm text-gray-900">
                        {job.shiftHours && `${isMobile ? formatShiftHoursForMobile(job.shiftHours) : job.shiftHours} `}{job.shift}
                        {job.startDate && ` | ${formatDateWithYear(job.startDate)}`}
                      </p>
                    </div>
                  )}

                  {/* Job ID */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Job ID</p>
                    <p className="text-sm font-medium text-gray-900">{job.id}</p>
                  </div>

                  {/* Estimated Pay - Matching Right Column Theme */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Estimated Pay</p>
                    
                    {/* Weekly Total Section */}
                    <div className="mb-4 pb-3 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">Weekly Total*</p>
                        <span className="text-lg font-bold text-gray-900">
                          {(() => {
                            // Extract numeric value from job.weeklyPay (e.g., "$2,800" -> 2800)
                            const payValue = parseFloat((job.weeklyPay || '0').replace(/[^0-9.]/g, '')) || 0
                            // Format with 2 decimal places to match the Estimated weekly pay format
                            return `$${payValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          })()}
                  </span>
                      </div>
                </div>

                    {/* Pay Components */}
                    {(() => {
                      // Extract weekly pay value
                      const weeklyPayValue = parseFloat((job.weeklyPay || '0').replace(/[^0-9.]/g, '')) || 0
                      const rate = parseFloat((job.salary || '53.11').replace(/[^0-9.]/g, '')) || 53.11
                      
                      // Fixed per diem amounts
                      const mniPerDiem = 518.00
                      const housingPerDiem = 994.00
                      
                      // Calculate regular hours (40 hours)
                      const regularHoursPay = 40 * rate
                      
                      // Calculate OT hours (8 hours at 2x rate)
                      const otHoursPay = 8 * rate * 2
                      
                      // Calculate remaining amount for Call Back/Holiday to make total match weekly pay
                      const callBackHolidayPay = weeklyPayValue - regularHoursPay - otHoursPay - mniPerDiem - housingPerDiem
                      
                      return (
                        <div className="space-y-2.5 mb-4">
                          {/* 40 Hours */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">40 Hours</span>
                              <span className="text-gray-500 text-xs">x {job.salary || '$53.11/hr'}</span>
                            </div>
                            <span className="font-semibold text-gray-900">
                              ${regularHoursPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>

                          {/* 8 OT Hours */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">8 OT Hours</span>
                              <span className="text-gray-500 text-xs">x ${(rate * 2).toFixed(2)}/hr</span>
                            </div>
                            <span className="font-semibold text-gray-900">
                              ${otHoursPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>

                          {/* Call Back/Holiday */}
                          {callBackHolidayPay > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Call Back/Holiday</span>
                              <span className="font-semibold text-gray-900">
                                ${callBackHolidayPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                            </div>
                          )}

                          {/* Weekly M&I Per Diem */}
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Weekly M&I Per Diem</span>
                            <span className="font-semibold text-gray-900">${mniPerDiem.toFixed(2)}</span>
                          </div>

                          {/* Weekly Housing Per Diem */}
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Weekly Housing Per Diem</span>
                            <span className="font-semibold text-gray-900">${housingPerDiem.toFixed(2)}</span>
                          </div>
                        </div>
                      )
                    })()}

                    {/* Disclaimer/Footnote */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        * Weekly Total is for informational purposes, based on contracted weekly hours, and includes hourly wages plus reimbursements for housing, meal and incidental expenses.
                      </p>
                  </div>
                </div>

                  {/* Apply Now / Applied Button */}
                  {isPending ? (
                    <button
                      disabled
                      className="relative w-full py-3.5 bg-gray-300 text-gray-600 font-bold rounded-xl shadow-sm cursor-not-allowed"
                    >
                      <span className="relative z-10">Applied</span>
                    </button>
                  ) : (
                    <motion.button
                      onClick={handleApply}
                      className="relative w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-xl shadow-lg overflow-hidden group"
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(127, 40, 96, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated Wave Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 opacity-0 group-hover:opacity-100"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Ripple Effect */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileTap={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full h-full bg-white/20 rounded-xl" />
                      </motion.div>

                      {/* Button Text */}
                      <span className="relative z-10">Apply Now</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseApplyModal}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl mx-4 sm:mx-0"
                style={{ maxHeight: '90vh' }}
              >
                {/* Glow effect behind modal */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
                
                {/* Main modal container */}
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
                  {/* Header Section */}
                  <div className="relative px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary-100 rounded-2xl blur-xl opacity-60" />
                          <div className="relative p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg">
                            <Send className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        
                        <div>
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                            Apply for Position
                          </h2>
                          <p className="text-sm text-gray-600 mt-1">
                            {job?.title}
                          </p>
                        </div>
                      </div>
                      
                      {/* Close Button */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCloseApplyModal}
                        disabled={isSubmitting}
                        className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="px-4 sm:px-6 md:px-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="px-4 sm:px-6 md:px-8 py-6 space-y-6 overflow-y-auto flex-1">
                  {/* Cover Letter Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                      <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                    </label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Write your cover letter here..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Resume/CV Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume/CV
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={isSubmitting}
                        className="hidden"
                      />
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`flex items-center gap-3 px-4 py-3 border-2 border-dashed rounded-lg transition-all ${
                          isDragging
                            ? 'border-primary-500 bg-primary-50 scale-105'
                            : resumeFile
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => !isSubmitting && !resumeFile && document.getElementById('resume-upload')?.click()}
                      >
                        <div className={`p-2 rounded-lg ${resumeFile ? 'bg-primary-100' : 'bg-gray-100'}`}>
                          {resumeFile ? (
                            <FileText className="w-5 h-5 text-primary-600" />
                          ) : (
                            <Upload className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          {resumeFileName ? (
                            <div>
                              <p className="text-sm font-medium text-gray-900">{resumeFileName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {resumeFile ? ((resumeFile.size / (1024 * 1024)).toFixed(2)) : '0.00'} MB
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {isDragging ? 'Drop file here' : 'Click to upload or drag and drop'}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                PDF, DOC, DOCX (Max 10MB)
                              </p>
                            </div>
                          )}
                        </div>
                        {resumeFile && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveFile()
                            }}
                            disabled={isSubmitting}
                            className="p-1 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                            title="Remove file"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>
                    {!resumeFile && (
                      <p className="text-xs text-red-500 mt-1">Resume/CV is required</p>
                    )}
                  </div>
                </div>

                  {/* Footer */}
                  <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-gray-200 flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={handleCloseApplyModal}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <motion.button
                      onClick={handleSubmitApplication}
                      disabled={isSubmitting || !resumeFile}
                      whileHover={{ scale: isSubmitting || !resumeFile ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting || !resumeFile ? 1 : 0.98 }}
                      className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Remove File Confirmation Dialog */}
      <AnimatePresence>
        {showRemoveConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[120] flex items-center justify-center p-4"
              onClick={cancelRemoveFile}
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
                  <h3 className="text-xl font-bold text-gray-900">Remove File?</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to remove the uploaded file? You'll need to upload a new file to continue.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={cancelRemoveFile}
                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={confirmRemoveFile}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
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
