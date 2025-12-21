'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Search, Check, Shield, Award, Briefcase, GraduationCap, Users, ArrowLeft, Plus, Trash2, Edit, MapPin, Calendar, ChevronDown, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'

const PROFESSIONS = [
  'Registered Nurse',
  'Allied Health',
  'Certified Nursing Assistant',
  'LVN/LPN',
  'Other - No License Required'
]

const SPECIALTIES = {
  'Registered Nurse': [
    'Medical-Surgical',
    'Emergency Room',
    'Intensive Care Unit (ICU)',
    'Operating Room',
    'Pediatrics',
    'Labor & Delivery',
    'Oncology',
    'Cardiac',
    'Psychiatric',
    'Home Health',
    'Other'
  ],
  'Allied Health': [
    'Physical Therapist',
    'Occupational Therapist',
    'Respiratory Therapist',
    'Radiologic Technologist',
    'Medical Laboratory Technician',
    'Other'
  ],
  'Certified Nursing Assistant': [
    'Long-term Care',
    'Home Health',
    'Hospice',
    'Other'
  ],
  'LVN/LPN': [
    'Long-term Care',
    'Rehabilitation',
    'Home Health',
    'Hospice',
    'Other'
  ],
  'Other - No License Required': ['Other']
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

const LICENSE_TYPES = [
  'Registered Nurse (RN)',
  'Licensed Practical Nurse (LPN)',
  'Certified Nursing Assistant (CNA)',
  'Nurse Practitioner (NP)',
  'Clinical Nurse Specialist (CNS)'
]

const CERTIFICATE_TYPES = [
  'Basic Life Support (BLS)',
  'Advanced Cardiovascular Life Support (ACLS)',
  'Pediatric Advanced Life Support (PALS)',
  'Critical Care Registered Nurse (CCRN)',
  'Certified Emergency Nurse (CEN)'
]

const CERTIFICATIONS = [
  'Basic Life Support (BLS)',
  'Advanced Cardiovascular Life Support (ACLS)',
  'Pediatric Advanced Life Support (PALS)',
  'Critical Care Registered Nurse (CCRN)',
  'Certified Emergency Nurse (CEN)',
  'Neonatal Resuscitation Program (NRP)'
]

const CERTIFICATION_SPECIALTIES = [
  'Emergency Department',
  'Intensive Care Unit (ICU)',
  'Cardiac Care Unit (CCU)',
  'Pediatric Emergency',
  'Neonatal Intensive Care Unit (NICU)',
  'Medical-Surgical'
]

// Map certifications to their available specialties
const CERTIFICATION_SPECIALTIES_MAP: { [key: string]: string[] } = {
  'Basic Life Support (BLS)': [
    'Emergency Department',
    'Intensive Care Unit (ICU)',
    'Cardiac Care Unit (CCU)',
    'Medical-Surgical'
  ],
  'Advanced Cardiovascular Life Support (ACLS)': [
    'Emergency Department',
    'Intensive Care Unit (ICU)',
    'Cardiac Care Unit (CCU)',
    'Medical-Surgical'
  ],
  'Pediatric Advanced Life Support (PALS)': [
    'Pediatric Emergency',
    'Neonatal Intensive Care Unit (NICU)',
    'Emergency Department'
  ],
  'Critical Care Registered Nurse (CCRN)': [
    'Intensive Care Unit (ICU)',
    'Cardiac Care Unit (CCU)',
    'Emergency Department',
    'Medical-Surgical'
  ],
  'Certified Emergency Nurse (CEN)': [
    'Emergency Department',
    'Pediatric Emergency'
  ],
  'Neonatal Resuscitation Program (NRP)': [
    'Neonatal Intensive Care Unit (NICU)',
    'Pediatric Emergency'
  ]
}

interface ProfileData {
  // Basic Info
  name: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  streetAddress: string
  additionalAddress: string
  city: string
  state: string
  zipCode: string
  dob: string
  ssn: string
  yearsOfExperience: string
  
  // Licenses
  licenses: Array<{
    id: string
    type: string
    number: string
    state: string
    expiration: string
  }>
  
  // Certificates
  certificates: Array<{
    id: string
    type: string
    number: string
    expiration: string
  }>
  
  // Specialties
  specialties: Array<{
    id: string
    certification: string
    specialty: string
  }>
  
  // Work History
  workHistory: Array<{
    id: string
    title: string
    unit: string
    startDate: string
    endDate: string
    currentlyWorking: boolean
    agency: string
    description: string
    chargeExperience: string
    travelAssignment: boolean
    perDiem: boolean
  }>
  
  // Education
  education: Array<{
    id: string
    title: string
    course: string
    status: 'Graduated' | 'Did Not Graduate'
    graduated: string
    degree: string
  }>
  
  // References
  references: Array<{
    id: string
    name: string
    title: string
    company: string
    startDate: string
    endDate: string
    phone: string
    email: string
  }>
}

type SectionType = 'licenses' | 'certificates' | 'specialties' | 'workHistory' | 'education' | 'references'

export default function ProfileOnboarding() {
  const { user, isAuthenticated, isLoading, updateUser, isProfileComplete } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(5) // Start from step 5 (Personal Information) since first 4 steps are commented out
  const [profession, setProfession] = useState('')
  const [otherLicensed, setOtherLicensed] = useState('')
  const professionRef = useRef('')
  const [specialties, setSpecialties] = useState<string[]>([])
  const [specialtySearch, setSpecialtySearch] = useState('')
  const [location, setLocation] = useState({ city: '', state: '' })
  const [jobRole, setJobRole] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const selectedStateRef = useRef<HTMLButtonElement | null>(null)
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null)

  // Profile section states
  const [showDetailsPage, setShowDetailsPage] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [currentSection, setCurrentSection] = useState<SectionType | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [isEditingFromSummary, setIsEditingFromSummary] = useState(false) // Track if editing from summary screen
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; section: SectionType | null; itemId: string | null }>({ show: false, section: null, itemId: null })
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    streetAddress: '',
    additionalAddress: '',
    city: '',
    state: '',
    zipCode: '',
    dob: '',
    ssn: '',
    yearsOfExperience: '',
    licenses: [],
    certificates: [],
    specialties: [],
    workHistory: [],
    education: [],
    references: []
  })
  
  // Use ref to track latest profileData for async operations
  const profileDataRef = useRef(profileData)
  useEffect(() => {
    profileDataRef.current = profileData
  }, [profileData])

  const totalSteps = 8 // 1 basic info + 6 sections + 1 complete (first 4 steps commented out)

  useEffect(() => {
    // Only show onboarding if user is authenticated, profile is not complete, and auth has finished loading
    // Check profileComplete flag explicitly - if it's false or undefined, show onboarding
    if (!isLoading && isAuthenticated && user && (user.profileComplete === false || user.profileComplete === undefined)) {
      setIsVisible(true)
      // Prevent body scrolling
      document.body.style.overflow = 'hidden'
      
      // Load saved progress if available (first 4 steps commented out but keeping logic)
      // if (user.profession) {
      //   setProfession(user.profession)
      //   professionRef.current = user.profession
      // }
      // if (user.specialty) {
      //   setSpecialties(user.specialty.split(', ').filter(s => s))
      // }
      // if (user.location?.city && user.location?.state) {
      //   setLocation({
      //     city: user.location.city,
      //     state: user.location.state
      //   })
      // }
      // if (user.jobRole) {
      //   setJobRole(user.jobRole)
      // }
      
      // Load profile data
      if (user.name) {
        const nameParts = user.name.split(' ')
        setProfileData(prev => ({ 
          ...prev, 
          name: user.name,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || ''
        }))
      }
      if (user.email) setProfileData(prev => ({ ...prev, email: user.email }))
      if ((user as any).phoneNumber) setProfileData(prev => ({ ...prev, phoneNumber: (user as any).phoneNumber }))
      if ((user as any).address) setProfileData(prev => ({ ...prev, address: (user as any).address }))
      if ((user as any).dob) setProfileData(prev => ({ ...prev, dob: (user as any).dob }))
      if ((user as any).ssn) setProfileData(prev => ({ ...prev, ssn: (user as any).ssn }))
      if ((user as any).firstName) setProfileData(prev => ({ ...prev, firstName: (user as any).firstName }))
      if ((user as any).lastName) setProfileData(prev => ({ ...prev, lastName: (user as any).lastName }))
      if ((user as any).streetAddress) setProfileData(prev => ({ ...prev, streetAddress: (user as any).streetAddress }))
      if ((user as any).city) setProfileData(prev => ({ ...prev, city: (user as any).city }))
      if ((user as any).state) setProfileData(prev => ({ ...prev, state: (user as any).state }))
      if ((user as any).zipCode) setProfileData(prev => ({ ...prev, zipCode: (user as any).zipCode }))
      if ((user as any).yearsOfExperience) setProfileData(prev => ({ ...prev, yearsOfExperience: (user as any).yearsOfExperience }))
      if ((user as any).licenses) setProfileData(prev => ({ ...prev, licenses: (user as any).licenses || [] }))
      if ((user as any).certificates) setProfileData(prev => ({ ...prev, certificates: (user as any).certificates || [] }))
      if ((user as any).specialties) setProfileData(prev => ({ ...prev, specialties: (user as any).specialties || [] }))
      if ((user as any).workHistory) setProfileData(prev => ({ ...prev, workHistory: (user as any).workHistory || [] }))
      if ((user as any).education) setProfileData(prev => ({ ...prev, education: (user as any).education || [] }))
      if ((user as any).references) setProfileData(prev => ({ ...prev, references: (user as any).references || [] }))
    } else if (user?.profileComplete === true) {
      // Only hide if profile is explicitly marked as complete
      setIsVisible(false)
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isAuthenticated, isLoading, user])

  // Position dropdown to show selected state when it opens
  useEffect(() => {
    if (showStateDropdown && selectedStateRef.current && dropdownContainerRef.current) {
      // Set scroll position directly without animation
      const container = dropdownContainerRef.current
      const selectedButton = selectedStateRef.current
      const containerRect = container.getBoundingClientRect()
      const buttonRect = selectedButton.getBoundingClientRect()
      const scrollTop = container.scrollTop
      const buttonOffsetTop = selectedButton.offsetTop
      const containerHeight = container.clientHeight
      const buttonHeight = selectedButton.offsetHeight
      
      // Calculate the position to center the selected item
      const targetScroll = buttonOffsetTop - (containerHeight / 2) + (buttonHeight / 2)
      
      // Set scroll position immediately
      container.scrollTop = targetScroll
    }
  }, [showStateDropdown])

  const validateStep = (step: number): boolean => {
    // First 4 steps commented out but keeping validation logic
    // if (step === 1) {
    //   // Only validate profession selection, not otherLicensed (which auto-navigates)
    //   if (!profession) {
    //     toast.error('Please select a profession')
    //     return false
    //   }
    // } else if (step === 2) {
    //   if (specialties.length === 0) {
    //     toast.error('Please select at least one specialty')
    //     return false
    //   }
    // } else if (step === 3) {
    //   if (!location.city || !location.state) {
    //     toast.error('Please enter your city and state')
    //     return false
    //   }
    // } else if (step === 4) {
    //   // Job Role is optional, so no validation needed
    //   return true
    // } else 
    if (step === 5) {
      // Personal Information - validate all required fields
      const requiredFields = [
        { field: profileData.firstName, name: 'First Name' },
        { field: profileData.lastName, name: 'Last Name' },
        { field: profileData.email, name: 'Email' },
        { field: profileData.dob, name: 'Date of Birth' },
        { field: profileData.ssn, name: 'Social Security Number' },
        { field: profileData.yearsOfExperience, name: 'Years of Experience' },
        { field: profileData.streetAddress, name: 'Street Address' },
        { field: profileData.city, name: 'City' },
        { field: profileData.state, name: 'State' },
        { field: profileData.zipCode, name: 'ZIP Code' }
      ]

      const missingField = requiredFields.find(f => !f.field || f.field.trim() === '')
      if (missingField) {
        toast.error(`Please fill in ${missingField.name}`)
        return false
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(profileData.email)) {
        toast.error('Please enter a valid email address')
        return false
      }

      // Validate SSN (exactly 9 digits)
      if (profileData.ssn.length !== 9 || !/^\d+$/.test(profileData.ssn)) {
        toast.error('Please enter a valid 9-digit Social Security Number')
        return false
      }

      // Validate years of experience (1-50)
      const years = parseInt(profileData.yearsOfExperience)
      if (isNaN(years) || years < 1 || years > 50) {
        toast.error('Years of experience must be between 1 and 50')
        return false
      }

      // Validate ZIP code (5 digits minimum)
      if (!/^\d{5,}$/.test(profileData.zipCode)) {
        toast.error('Please enter a valid ZIP code (at least 5 digits)')
        return false
      }

      return true
    }
    // Steps 6-11 (sections) don't require validation - user can proceed without adding items
    // Step 12 (summary) doesn't require validation - user can complete
    return true
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }

    // Save progress as user moves through steps
    saveProgress()

    // If editing from summary, redirect back to summary after updating
    if (isEditingFromSummary) {
      setIsEditingFromSummary(false)
      setCurrentStep(12) // Go back to summary screen
      setShowDetailsPage(false)
      setEditingItem(null)
      setCurrentSection(null)
      return
    }

    if (currentStep < 12) {
      setCurrentStep(currentStep + 1)
      setShowDetailsPage(false)
      setEditingItem(null)
      setCurrentSection(null)
    } else {
      handleComplete()
    }
  }
  
  const handlePrevious = () => {
    // If editing from summary and going back, return to summary
    if (isEditingFromSummary) {
      setIsEditingFromSummary(false)
      setCurrentStep(12)
      setShowDetailsPage(false)
      setEditingItem(null)
      setCurrentSection(null)
      return
    }

    if (currentStep > 5) { // Start from step 5 since first 4 steps are commented out
      const newStep = currentStep - 1
      // Clear otherLicensed when going back to step 1 to reset its visual state (commented out)
      // if (newStep === 1) {
      //   setOtherLicensed('')
      //   // Ensure profession state is preserved - restore from ref if state was lost
      //   if (professionRef.current && profession !== professionRef.current) {
      //     setProfession(professionRef.current)
      //   }
      // }
      setCurrentStep(newStep)
      setShowDetailsPage(false)
      setEditingItem(null)
      setCurrentSection(null)
    }
  }

  // Save progress incrementally as user completes each step
  const saveProgress = () => {
    // const finalProfession = profession || otherLicensed
    const progressData: any = {}
    
    // Explicitly prevent profile from being marked complete during onboarding
    // Only handleComplete() should set profileComplete to true
    progressData.profileComplete = false
    
    // First 4 steps commented out but keeping save logic
    // if (currentStep >= 1 && finalProfession) {
    //   progressData.profession = finalProfession
    // }
    // 
    // if (currentStep >= 2 && specialties.length > 0) {
    //   progressData.specialty = specialties.join(', ')
    // }
    // 
    // if (currentStep >= 3 && location.city && location.state) {
    //   progressData.location = {
    //     city: location.city,
    //     state: location.state
    //   }
    // }
    // 
    // if (currentStep >= 4 && jobRole) {
    //   progressData.jobRole = jobRole
    // }
    
    // Include profile data from step 5 onwards (now step 1 in visible flow)
    if (currentStep >= 5) {
      progressData.name = profileData.name
      progressData.email = profileData.email
      progressData.dob = profileData.dob
      progressData.ssn = profileData.ssn
      progressData.licenses = profileData.licenses
      progressData.certificates = profileData.certificates
      progressData.specialties = profileData.specialties
      progressData.workHistory = profileData.workHistory
      progressData.education = profileData.education
      progressData.references = profileData.references
    }
    
    // Always update to ensure profileComplete is set to false
    updateUser(progressData)
  }

  const handleComplete = () => {
    if (!validateStep(currentStep)) {
      return
    }

    // First 4 steps commented out but keeping completion logic
    // const finalProfession = profession || otherLicensed

    // Update user profile with all data
    updateUser({
      // profession: finalProfession,
      // specialty: specialties.join(', '), // Store as comma-separated string
      // jobRole: jobRole || undefined,
      // location: {
      //   city: location.city,
      //   state: location.state
      // },
      name: profileData.name,
      email: profileData.email,
      dob: profileData.dob,
      ssn: profileData.ssn,
      licenses: profileData.licenses,
      certificates: profileData.certificates,
      specialties: profileData.specialties,
      workHistory: profileData.workHistory,
      education: profileData.education,
      references: profileData.references,
      profileComplete: true
    } as any)

    toast.success('Profile completed successfully!')
    setIsVisible(false)
    document.body.style.overflow = ''
    
    setTimeout(() => {
      router.push('/profile')
    }, 500)
  }

  const handleClose = () => {
    setShowCloseConfirm(true)
  }

  const handleConfirmClose = () => {
    setIsVisible(false)
    document.body.style.overflow = ''
    setShowCloseConfirm(false)
  }

  const handleCancelClose = () => {
    setShowCloseConfirm(false)
  }

  // CRUD Operations for profile sections
  const openAddForm = (section: SectionType) => {
    setCurrentSection(section)
    setEditingItem(null)
    setFormData(getDefaultFormData(section))
    setShowDetailsPage(true)
  }
  
  const openEditForm = (section: SectionType, item: any) => {
    setCurrentSection(section)
    setEditingItem(item)
    setFormData(item)
    setShowDetailsPage(true)
  }
  
  const getDefaultFormData = (section: SectionType) => {
    switch (section) {
      case 'licenses':
        return { type: '', number: '', state: '', expiration: '' }
      case 'certificates':
        return { type: '', number: '', expiration: '' }
      case 'specialties':
        return { certification: '', specialty: '' }
      case 'workHistory':
        return {
          title: '', unit: '', startDate: '', endDate: '', currentlyWorking: false,
          agency: '', description: '', chargeExperience: '', travelAssignment: false, perDiem: false
        }
      case 'education':
        return { title: '', course: '', status: 'Graduated' as const, graduated: '', degree: '' }
      case 'references':
        return { name: '', title: '', company: '', startDate: '', endDate: '', phone: '', email: '' }
      default:
        return {}
    }
  }
  
  const handleSaveItem = () => {
    if (!currentSection) return
    
    // Validate required fields
    if (!validateFormData(currentSection, formData)) {
      return
    }
    
    const newItem = {
      ...formData,
      id: editingItem?.id || `${currentSection}-${Date.now()}`
    }
    
    // Update local state and save to backend
    setProfileData(prev => {
      const updatedData = editingItem
        ? {
            ...prev,
            [currentSection]: prev[currentSection].map((item: any) =>
              item.id === editingItem.id ? newItem : item
            )
          }
        : {
            ...prev,
            [currentSection]: [...prev[currentSection], newItem]
          }
      
      // Save progress to backend with updated data immediately
      // Use the updatedData directly to avoid stale state issues
      const progressData: any = {
        profileComplete: false, // Explicitly prevent auto-completion
        name: updatedData.name,
        email: updatedData.email,
        dob: updatedData.dob,
        ssn: updatedData.ssn,
        licenses: updatedData.licenses,
        certificates: updatedData.certificates,
        specialties: updatedData.specialties,
        workHistory: updatedData.workHistory,
        education: updatedData.education,
        references: updatedData.references
      }
      // Use setTimeout to ensure state update is processed before saving
      setTimeout(() => {
        updateUser(progressData)
      }, 0)
      
      return updatedData
    })
    
    toast.success(editingItem ? 'Item updated successfully' : 'Item added successfully')
    
    setShowDetailsPage(false)
    setEditingItem(null)
    setCurrentSection(null)
    setFormData({})
  }
  
  // Helper function to check if a date is in the past
  const isDateInPast = (dateString: string): boolean => {
    if (!dateString) return false
    const date = formatDateToYYYYMMDD(dateString)
    if (!date) return false
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to compare dates only
    selectedDate.setHours(0, 0, 0, 0)
    return selectedDate < today
  }

  // Helper function to check if a date is in the future
  const isDateInFuture = (dateString: string): boolean => {
    if (!dateString) return false
    const date = formatDateToYYYYMMDD(dateString)
    if (!date) return false
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to compare dates only
    selectedDate.setHours(0, 0, 0, 0)
    return selectedDate > today
  }

  // Helper function to check if end date is before start date
  const isEndDateBeforeStartDate = (startDate: string, endDate: string): boolean => {
    if (!startDate || !endDate) return false
    const start = formatDateToYYYYMMDD(startDate)
    const end = formatDateToYYYYMMDD(endDate)
    if (!start || !end) return false
    const startDateObj = new Date(start)
    const endDateObj = new Date(end)
    startDateObj.setHours(0, 0, 0, 0)
    endDateObj.setHours(0, 0, 0, 0)
    return endDateObj < startDateObj
  }

  // Check if form data is valid (for enabling/disabling button) without showing errors
  const isFormDataValid = (section: SectionType, data: any): boolean => {
    switch (section) {
      case 'licenses':
        if (!data.type?.trim()) return false
        // If expiration date is provided, validate it's not in the past
        if (data.expiration?.trim() && isDateInPast(data.expiration)) return false
        return true
      case 'certificates':
        if (!data.type?.trim()) return false
        // If expiration date is provided, validate it's not in the past
        if (data.expiration?.trim() && isDateInPast(data.expiration)) return false
        return true
      case 'specialties':
        if (!data.certification?.trim() || !data.specialty?.trim()) return false
        // Validate that specialty is available for the selected certification
        const availableSpecialties = CERTIFICATION_SPECIALTIES_MAP[data.certification] || []
        return availableSpecialties.includes(data.specialty)
      case 'workHistory':
        if (!data.title?.trim()) return false
        // If start date is provided, it shouldn't be in the future
        if (data.startDate && isDateInFuture(data.startDate)) return false
        // If not currently working and end date is provided, validate it
        if (!data.currentlyWorking && data.endDate) {
          if (isDateInFuture(data.endDate)) return false
          if (data.startDate && isEndDateBeforeStartDate(data.startDate, data.endDate)) return false
        }
        return true
      case 'education':
        return !!(data.title?.trim())
      case 'references':
        if (!data.name?.trim()) return false
        // If start date is provided, it shouldn't be in the future
        if (data.startDate && isDateInFuture(data.startDate)) return false
        // If end date is provided, validate it
        if (data.endDate) {
          if (isDateInFuture(data.endDate)) return false
          if (data.startDate && isEndDateBeforeStartDate(data.startDate, data.endDate)) return false
        }
        return true
      default:
        return true
    }
  }

  const validateFormData = (section: SectionType, data: any): boolean => {
    switch (section) {
      case 'licenses':
        if (!data.type) {
          toast.error('Please select license type')
          return false
        }
        // If expiration date is provided, validate it's not in the past
        if (data.expiration && isDateInPast(data.expiration)) {
          toast.error('Expiration date cannot be in the past')
          return false
        }
        return true
      case 'certificates':
        if (!data.type) {
          toast.error('Please select certificate type')
          return false
        }
        // If expiration date is provided, validate it's not in the past
        if (data.expiration && isDateInPast(data.expiration)) {
          toast.error('Expiration date cannot be in the past')
          return false
        }
        return true
      case 'specialties':
        if (!data.certification) {
          toast.error('Please select a certification')
          return false
        }
        if (!data.specialty) {
          toast.error('Please select a specialty')
          return false
        }
        // Validate that specialty is available for the selected certification
        const availableSpecialties = CERTIFICATION_SPECIALTIES_MAP[data.certification] || []
        if (availableSpecialties.length === 0) {
          toast.error('No specialties available for the selected certification')
          return false
        }
        if (!availableSpecialties.includes(data.specialty)) {
          toast.error('Selected specialty is not available for the selected certification')
          return false
        }
        return true
      case 'workHistory':
        if (!data.title) {
          toast.error('Please enter facility/company name')
          return false
        }
        // Validate start date is not in the future
        if (data.startDate && isDateInFuture(data.startDate)) {
          toast.error('Start date cannot be in the future')
          return false
        }
        // If not currently working, end date should be provided and valid
        if (!data.currentlyWorking) {
          if (data.endDate) {
            if (isDateInFuture(data.endDate)) {
              toast.error('End date cannot be in the future')
              return false
            }
            if (data.startDate && isEndDateBeforeStartDate(data.startDate, data.endDate)) {
              toast.error('End date cannot be before start date')
              return false
            }
          }
        }
        return true
      case 'education':
        if (!data.title) {
          toast.error('Please enter school/institution name')
          return false
        }
        return true
      case 'references':
        if (!data.name) {
          toast.error('Please enter reference name')
          return false
        }
        // Validate start date is not in the future
        if (data.startDate && isDateInFuture(data.startDate)) {
          toast.error('Start date cannot be in the future')
          return false
        }
        // If end date is provided, validate it
        if (data.endDate) {
          if (isDateInFuture(data.endDate)) {
            toast.error('End date cannot be in the future')
            return false
          }
          if (data.startDate && isEndDateBeforeStartDate(data.startDate, data.endDate)) {
            toast.error('End date cannot be before start date')
            return false
          }
        }
        return true
      default:
        return true
    }
  }
  
  const handleDeleteItem = (section: SectionType, itemId: string) => {
    setProfileData(prev => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== itemId)
    }))
    toast.success('Item deleted successfully')
  }
  
  const getSectionIcon = (section: SectionType) => {
    switch (section) {
      case 'licenses': return Shield
      case 'certificates': return Award
      case 'specialties': return Award
      case 'workHistory': return Briefcase
      case 'education': return GraduationCap
      case 'references': return Users
    }
  }
  
  const getSectionTitle = (section: SectionType) => {
    switch (section) {
      case 'licenses': return 'Professional License'
      case 'certificates': return 'Certificate'
      case 'specialties': return 'Certification Specialty'
      case 'workHistory': return 'Work History'
      case 'education': return 'Education'
      case 'references': return 'Reference'
    }
  }
  
  // Date formatting helpers
  const formatDateToDDMMYYYY = (dateString: string): string => {
    if (!dateString) return ''
    // If already in YYYY-MM-DD format, convert to DD/MM/YYYY
    if (dateString.includes('-') && dateString.length === 10) {
      const [year, month, day] = dateString.split('-')
      return `${day}/${month}/${year}`
    }
    // If already in DD/MM/YYYY format, return as is
    if (dateString.includes('/')) {
      return dateString
    }
    return dateString
  }

  const formatDateToYYYYMMDD = (dateString: string): string => {
    if (!dateString) return ''
    // If in DD/MM/YYYY format, convert to YYYY-MM-DD
    if (dateString.includes('/') && dateString.length === 10) {
      const [day, month, year] = dateString.split('/')
      return `${year}-${month}-${day}`
    }
    // If already in YYYY-MM-DD format, return as is
    if (dateString.includes('-') && dateString.length === 10) {
      return dateString
    }
    return dateString
  }

  const validateDDMMYYYY = (dateString: string): boolean => {
    if (!dateString) return true
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    if (!regex.test(dateString)) return false
    const [, day, month, year] = dateString.match(regex) || []
    const dayNum = parseInt(day, 10)
    const monthNum = parseInt(month, 10)
    const yearNum = parseInt(year, 10)
    if (monthNum < 1 || monthNum > 12) return false
    if (dayNum < 1 || dayNum > 31) return false
    if (yearNum < 1900 || yearNum > 2100) return false
    return true
  }

  // Custom Date Picker Component
  const CustomDatePicker = ({ value, onChange, placeholder = "Select date", disabled = false, showFormat = true, minDate, maxDate }: { value: string, onChange: (value: string) => void, placeholder?: string, disabled?: boolean, showFormat?: boolean, minDate?: string, maxDate?: string }) => {
    const dateInputRef = useRef<HTMLInputElement>(null)
    const formattedValue = value ? formatDateToDDMMYYYY(value) : ''
    
    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    // Handle minDate: if empty string, use today; if undefined, no restriction; if provided, use it
    let minDateValue: string | undefined = undefined
    if (minDate !== undefined) {
      if (minDate === '') {
        minDateValue = getTodayDate()
      } else if (minDate === 'today') {
        minDateValue = getTodayDate()
      } else {
        minDateValue = formatDateToYYYYMMDD(minDate) || minDate
      }
    }

    // Handle maxDate: if 'today', use today; if provided, use it
    let maxDateValue: string | undefined = undefined
    if (maxDate !== undefined) {
      if (maxDate === 'today') {
        maxDateValue = getTodayDate()
      } else {
        maxDateValue = formatDateToYYYYMMDD(maxDate) || maxDate
      }
    }
    
    const handleFieldClick = () => {
      if (!disabled && dateInputRef.current) {
        // Try to show native picker, fallback to focus
        if (dateInputRef.current.showPicker) {
          dateInputRef.current.showPicker()
        } else {
          dateInputRef.current.focus()
          dateInputRef.current.click()
        }
      }
    }

    return (
      <div className="relative">
        <div
          onClick={handleFieldClick}
          className={`w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus-within:border-primary-500 focus-within:outline-none cursor-pointer transition-all duration-200 flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Calendar className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {formattedValue ? (
              <span className="text-base text-gray-900">{formattedValue}</span>
            ) : (
              <span className="text-base text-gray-400">{placeholder}</span>
            )}
          </div>
          <input
            ref={dateInputRef}
            type="date"
            value={formatDateToYYYYMMDD(value) || value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            min={minDateValue}
            max={maxDateValue}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            style={{ colorScheme: 'light' }}
          />
        </div>
        {showFormat && (
          <p className="mt-1.5 text-xs text-gray-500">Format: DD/MM/YYYY</p>
        )}
      </div>
    )
  }

  // Custom Select Component
  const CustomSelect = ({ value, onChange, placeholder = "Select option", disabled = false, children, icon: Icon }: { value: string, onChange: (value: string) => void, placeholder?: string, disabled?: boolean, children: any, icon?: any }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0, isAbove: false })
    const [isPositionCalculated, setIsPositionCalculated] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const selectedOptionRef = useRef<HTMLButtonElement>(null)
    
    // Extract options from children (handle both array and single child)
    const extractOptions = (children: any): any[] => {
      if (!children) return []
      if (Array.isArray(children)) {
        return children.flatMap((child: any) => extractOptions(child))
      }
      if (children?.props?.value !== undefined) {
        return [children]
      }
      if (children?.props?.children) {
        return extractOptions(children.props.children)
      }
      return []
    }
    const options = extractOptions(children).filter((child: any) => child?.props?.value !== '')
    
    // Get selected option text
    const selectedOption = options.find((opt: any) => opt?.props?.value === value)
    const selectedText = selectedOption?.props?.children || value || ''
    
    // Recalculate dropdown position on window resize (fallback)
    useEffect(() => {
      if (isOpen && buttonRef.current && isPositionCalculated) {
        const handleResize = () => {
          if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - buttonRect.bottom
            const spaceAbove = buttonRect.top
            const estimatedDropdownHeight = Math.min(256, options.length * 48 + 16)
            const isAbove = spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow
            
            setDropdownPosition({
              top: isAbove ? buttonRect.top - estimatedDropdownHeight - 8 : buttonRect.bottom + 8,
              left: buttonRect.left,
              width: buttonRect.width,
              isAbove
            })
          }
        }
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }
    }, [isOpen, isPositionCalculated, options.length])
    
    // Auto-scroll to selected option when dropdown opens
    useEffect(() => {
      if (isOpen && value && isPositionCalculated && dropdownRef.current) {
        // Use requestAnimationFrame to ensure the dropdown is fully rendered
        requestAnimationFrame(() => {
          if (selectedOptionRef.current && dropdownRef.current) {
            selectedOptionRef.current.scrollIntoView({
              behavior: 'auto', // No animation
              block: 'nearest',
              inline: 'nearest'
            })
          }
        })
      }
    }, [isOpen, value, isPositionCalculated])
    
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && buttonRef.current && 
            !dropdownRef.current.contains(event.target as Node) && 
            !buttonRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setIsPositionCalculated(false)
        }
      }
      
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    const handleOptionClick = (optionValue: string) => {
      onChange(optionValue)
      setIsOpen(false)
      setIsPositionCalculated(false)
    }

    return (
      <div className="relative">
        <div
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) {
              if (!isOpen && buttonRef.current) {
                // Calculate position synchronously before opening
                const buttonRect = buttonRef.current.getBoundingClientRect()
                const spaceBelow = window.innerHeight - buttonRect.bottom
                const spaceAbove = buttonRect.top
                const estimatedDropdownHeight = Math.min(256, options.length * 48 + 16)
                const isAbove = spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow
                
                setDropdownPosition({
                  top: isAbove ? buttonRect.top - estimatedDropdownHeight - 8 : buttonRect.bottom + 8,
                  left: buttonRect.left,
                  width: buttonRect.width,
                  isAbove
                })
                setIsPositionCalculated(true)
                setIsOpen(true)
              } else {
                setIsOpen(false)
                setIsPositionCalculated(false)
              }
            }
          }}
          className={`w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus-within:border-primary-500 focus-within:outline-none cursor-pointer transition-all duration-200 flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${isOpen ? 'border-primary-500' : ''}`}
        >
          {Icon && <Icon className="w-5 h-5 text-primary-600 flex-shrink-0" />}
          <div className="flex-1 min-w-0">
            {value && selectedText ? (
              <span className="text-base text-gray-900">{selectedText}</span>
            ) : (
              <span className="text-base text-gray-400">{placeholder}</span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 pointer-events-none" />
          </motion.div>
        </div>

        {/* Custom Dropdown Menu */}
        {isOpen && !disabled && isPositionCalculated && (
          <>
            {/* Backdrop - Completely invisible, only for click handling */}
            <div 
              className="fixed inset-0 z-[100004]" 
              style={{ pointerEvents: 'auto', backgroundColor: 'transparent' }}
              onClick={() => {
                setIsOpen(false)
                setIsPositionCalculated(false)
              }}
            />
            
            <div
              ref={dropdownRef}
              style={{
                position: 'fixed',
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                opacity: 1,
                transform: 'scale(1)',
              }}
              className="bg-white/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-[100005] max-h-64 overflow-y-auto"
            >
                <div className="p-2 space-y-1">
                  {options.map((option: any, idx: number) => {
                    const optionValue = option?.props?.value
                    const optionText = option?.props?.children
                    const isSelected = value === optionValue
                    
                    return (
                      <button
                        key={optionValue}
                        ref={isSelected ? selectedOptionRef : null}
                        type="button"
                        onClick={() => handleOptionClick(optionValue)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all text-left ${
                          isSelected
                            ? 'bg-primary-50 text-primary-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="truncate">{optionText}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
      </div>
    )
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      // First 4 steps commented out
      // case 1: return 'Primary Profession'
      // case 2: return 'Specialty'
      // case 3: return 'Location'
      // case 4: return 'Job Role'
      case 5: return 'Personal Information'
      case 6: return 'Professional Licenses'
      case 7: return 'Certificates'
      case 8: return 'Certification Specialties'
      case 9: return 'Work History'
      case 10: return 'Education History'
      case 11: return 'References'
      case 12: return 'Complete'
      default: return ''
    }
  }

  const getAddButtonText = (step: number) => {
    switch (step) {
      case 6: return 'Professional License'
      case 7: return 'Certificate'
      case 8: return 'Certification Specialty'
      case 9: return 'Work History'
      case 10: return 'Education History'
      case 11: return 'Reference'
      default: return 'Item'
    }
  }

  const getEmptyStateMessage = (section: SectionType) => {
    switch (section) {
      case 'licenses':
        return {
          title: 'No Professional Licenses Added',
          description: 'Add your professional licenses to showcase your qualifications and credentials.'
        }
      case 'certificates':
        return {
          title: 'No Certificates Added',
          description: 'Add your certificates to highlight your specialized training and certifications.'
        }
      case 'specialties':
        return {
          title: 'No Certification Specialties Added',
          description: 'Add your certification specialties to display your areas of expertise.'
        }
      case 'workHistory':
        return {
          title: 'No Work History Added',
          description: 'Add your work history to demonstrate your professional experience and career journey.'
        }
      case 'education':
        return {
          title: 'No Education History Added',
          description: 'Add your education history to showcase your academic background and qualifications.'
        }
      case 'references':
        return {
          title: 'No References Added',
          description: 'Add professional references to strengthen your profile and credibility.'
        }
      default:
        return {
          title: 'No Items Added',
          description: 'Click the button above to add your first item.'
        }
    }
  }

  if (!isVisible || isLoading || !isAuthenticated || !user) {
    return null
  }

  const availableSpecialties = profession ? (SPECIALTIES[profession as keyof typeof SPECIALTIES] || ['Other']) : []
  const filteredSpecialties = specialtySearch
    ? availableSpecialties.filter(spec => 
        spec.toLowerCase().includes(specialtySearch.toLowerCase())
      )
    : availableSpecialties

  const toggleSpecialty = (spec: string) => {
    setSpecialties(prev => 
      prev.includes(spec) 
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    )
  }

  // Dynamic validation check for enabling/disabling Next button
  const canProceed = (() => {
    // First 4 steps commented out but keeping validation logic
    // if (currentStep === 1) {
    //   return !!profession
    // } else if (currentStep === 2) {
    //   return specialties.length > 0
    // } else if (currentStep === 3) {
    //   return !!(location.city && location.state)
    // } else if (currentStep === 4) {
    //   return true // Job Role is optional
    // } else 
    if (currentStep === 5) {
      // Personal Information - check all required fields
      const hasRequiredFields = 
        profileData.firstName?.trim() &&
        profileData.lastName?.trim() &&
        profileData.email?.trim() &&
        profileData.dob?.trim() &&
        profileData.ssn?.trim() &&
        profileData.yearsOfExperience?.trim() &&
        profileData.streetAddress?.trim() &&
        profileData.city?.trim() &&
        profileData.state?.trim() &&
        profileData.zipCode?.trim()

      if (!hasRequiredFields) return false

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(profileData.email)) return false

      // Validate SSN (exactly 9 digits)
      if (profileData.ssn.length !== 9 || !/^\d+$/.test(profileData.ssn)) return false

      // Validate years of experience (1-50)
      const years = parseInt(profileData.yearsOfExperience)
      if (isNaN(years) || years < 1 || years > 50) return false

      // Validate ZIP code (5 digits minimum)
      if (!/^\d{5,}$/.test(profileData.zipCode)) return false

      return true
    }
    // Steps 6-11 (sections) - always allow proceeding (no items required)
    // Step 12 (summary) - always allow completing
    // Disable Next button if modal is open
    if (showDetailsPage) return false
    return true
  })()

  // Render Details Page Modal (Add/Edit Form)
  const renderDetailsModal = () => {
    if (!showDetailsPage || !currentSection) return null
    
    const Icon = getSectionIcon(currentSection)
    const sectionTitle = getSectionTitle(currentSection)
    
    return (
      <AnimatePresence>
        {showDetailsPage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
              onClick={() => {
                setShowDetailsPage(false)
                setEditingItem(null)
                setCurrentSection(null)
                setFormData({})
              }}
            />
            
            {/* Modal Container */}
            <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-primary-50 via-primary-50/80 to-white border-b border-primary-100/50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          {editingItem ? `Edit ${sectionTitle}` : `Add ${sectionTitle}`}
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          {getStepTitle(currentStep)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowDetailsPage(false)
                        setEditingItem(null)
                        setCurrentSection(null)
                        setFormData({})
                      }}
                      className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    {currentSection === 'licenses' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Type <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={formData.type || ''}
                        onChange={(value) => setFormData({ ...formData, type: value })}
                        placeholder="Select license type"
                        icon={Shield}
                      >
                        <option value="">Select license type</option>
                        {LICENSE_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </CustomSelect>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                      <input type="text" value={formData.number || ''} onChange={(e) => setFormData({ ...formData, number: e.target.value })} placeholder="Enter license number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <CustomSelect
                        value={formData.state || ''}
                        onChange={(value) => setFormData({ ...formData, state: value })}
                        placeholder="Select state"
                        icon={MapPin}
                      >
                        <option value="">Select state</option>
                        {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                      </CustomSelect>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                      <CustomDatePicker
                        value={formData.expiration || ''}
                        onChange={(value) => setFormData({ ...formData, expiration: value })}
                        placeholder="Select expiration date"
                        showFormat={true}
                      />
                    </div>
                  </>
                )}
                {currentSection === 'certificates' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type <span className="text-red-500">*</span></label>
                      <CustomSelect
                        value={formData.type || ''}
                        onChange={(value) => setFormData({ ...formData, type: value })}
                        placeholder="Select certificate type"
                        icon={Award}
                      >
                        <option value="">Select certificate type</option>
                        {CERTIFICATE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                      </CustomSelect>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                      <input type="text" value={formData.number || ''} onChange={(e) => setFormData({ ...formData, number: e.target.value })} placeholder="Enter certificate number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                      <CustomDatePicker
                        value={formData.expiration || ''}
                        onChange={(value) => setFormData({ ...formData, expiration: value })}
                        placeholder="Select expiration date"
                        showFormat={true}
                      />
                    </div>
                  </>
                )}
                {currentSection === 'specialties' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certification <span className="text-red-500">*</span></label>
                      <CustomSelect
                        value={formData.certification || ''}
                        onChange={(value) => {
                          // Clear specialty when certification changes
                          setFormData({ ...formData, certification: value, specialty: '' })
                        }}
                        placeholder="Select certification"
                        icon={Award}
                      >
                        <option value="">Select certification</option>
                        {CERTIFICATIONS.map(cert => <option key={cert} value={cert}>{cert}</option>)}
                      </CustomSelect>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialty <span className="text-red-500">*</span></label>
                      {(() => {
                        const selectedCertification = formData.certification || ''
                        const availableSpecialties = selectedCertification 
                          ? (CERTIFICATION_SPECIALTIES_MAP[selectedCertification] || [])
                          : []
                        const hasNoSpecialties = selectedCertification && availableSpecialties.length === 0
                        
                        return (
                          <>
                            <CustomSelect
                              value={formData.specialty || ''}
                              onChange={(value) => setFormData({ ...formData, specialty: value })}
                              placeholder={selectedCertification ? "Select specialty" : "Select certification first"}
                              icon={Award}
                              disabled={!selectedCertification || hasNoSpecialties}
                            >
                              <option value="">Select specialty</option>
                              {availableSpecialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                            </CustomSelect>
                            {hasNoSpecialties && (
                              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                <span>⚠</span>
                                <span>No specialties available for the selected certification.</span>
                              </p>
                            )}
                            {selectedCertification && availableSpecialties.length > 0 && !formData.specialty && (
                              <p className="mt-1.5 text-xs text-gray-500">
                                Please select a specialty from the available options.
                              </p>
                            )}
                          </>
                        )
                      })()}
                    </div>
                  </>
                )}
                {currentSection === 'workHistory' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facility/Company Name <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter facility or company name" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Unit/Position</label>
                      <input type="text" value={formData.unit || ''} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} placeholder="Enter unit or position" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <CustomDatePicker
                          value={formData.startDate || ''}
                          onChange={(value) => setFormData({ ...formData, startDate: value, endDate: formData.endDate && isEndDateBeforeStartDate(value, formData.endDate) ? '' : formData.endDate })}
                          placeholder="Select start date"
                          showFormat={false}
                          maxDate="today"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <CustomDatePicker
                          value={formData.endDate || ''}
                          onChange={(value) => setFormData({ ...formData, endDate: value })}
                          placeholder="Select end date"
                          disabled={formData.currentlyWorking}
                          showFormat={false}
                          minDate={formData.startDate || undefined}
                          maxDate="today"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="currentlyWorking" checked={formData.currentlyWorking || false} onChange={(e) => setFormData({ ...formData, currentlyWorking: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })} className="w-4 h-4 text-primary-600 rounded" />
                      <label htmlFor="currentlyWorking" className="text-sm text-gray-700">I currently work here</label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Agency (if applicable)</label>
                      <input type="text" value={formData.agency || ''} onChange={(e) => setFormData({ ...formData, agency: e.target.value })} placeholder="Enter agency name" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter job description" rows={3} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Charge Experience</label>
                      <input type="text" value={formData.chargeExperience || ''} onChange={(e) => setFormData({ ...formData, chargeExperience: e.target.value })} placeholder="Enter charge experience" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="travelAssignment" checked={formData.travelAssignment || false} onChange={(e) => setFormData({ ...formData, travelAssignment: e.target.checked })} className="w-4 h-4 text-primary-600 rounded" />
                        <label htmlFor="travelAssignment" className="text-sm text-gray-700">Travel Assignment</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="perDiem" checked={formData.perDiem || false} onChange={(e) => setFormData({ ...formData, perDiem: e.target.checked })} className="w-4 h-4 text-primary-600 rounded" />
                        <label htmlFor="perDiem" className="text-sm text-gray-700">Per Diem</label>
                      </div>
                    </div>
                  </>
                )}
                {currentSection === 'education' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">School/Institution Name <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter school or institution name" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course/Program</label>
                      <input type="text" value={formData.course || ''} onChange={(e) => setFormData({ ...formData, course: e.target.value })} placeholder="Enter course or program" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <CustomSelect
                        value={formData.status || 'Graduated'}
                        onChange={(value) => setFormData({ ...formData, status: value as 'Graduated' | 'Did Not Graduate' })}
                        placeholder="Select status"
                        icon={GraduationCap}
                      >
                        <option value="Graduated">Graduated</option>
                        <option value="Did Not Graduate">Did Not Graduate</option>
                      </CustomSelect>
                    </div>
                    {formData.status === 'Graduated' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date</label>
                          <CustomDatePicker
                            value={formData.graduated || ''}
                            onChange={(value) => setFormData({ ...formData, graduated: value })}
                            placeholder="Select graduation date"
                            showFormat={false}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                          <input type="text" value={formData.degree || ''} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} placeholder="Enter degree (e.g., Bachelor of Science)" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                        </div>
                      </>
                    )}
                  </>
                )}
                {currentSection === 'references' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter reference name" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter job title" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input type="text" value={formData.company || ''} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Enter company name" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <CustomDatePicker
                          value={formData.startDate || ''}
                          onChange={(value) => setFormData({ ...formData, startDate: value, endDate: formData.endDate && isEndDateBeforeStartDate(value, formData.endDate) ? '' : formData.endDate })}
                          placeholder="Select start date"
                          showFormat={false}
                          maxDate="today"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <CustomDatePicker
                          value={formData.endDate || ''}
                          onChange={(value) => setFormData({ ...formData, endDate: value })}
                          placeholder="Select end date"
                          showFormat={false}
                          minDate={formData.startDate || undefined}
                          maxDate="today"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter phone number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email address" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                  </>
                    )}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        setShowDetailsPage(false)
                        setEditingItem(null)
                        setCurrentSection(null)
                        setFormData({})
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveItem}
                      disabled={!currentSection || !isFormDataValid(currentSection, formData)}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        currentSection && isFormDataValid(currentSection, formData)
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      {editingItem ? 'Update' : 'Add'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <>
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] bg-white"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh',
          }}
        >
          <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="pt-4 pb-3">
              <div className="px-4 sm:px-6 flex items-center justify-between mb-3">
                {/* Logo */}
                <div className="flex items-center ml-2 sm:ml-4">
                  <Image
                    src="/logo.svg"
                    alt="The Gypsy Nurse"
                    width={180}
                    height={60}
                    className="h-12 sm:h-16 w-auto"
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="relative p-2.5 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar - Clean Professional Design */}
              <div className="px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 font-medium">
                      Step {currentStep - 4} of {totalSteps}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: totalSteps }).map((_, index) => {
                      const visualStep = currentStep - 4
                      const stepNumber = index + 1
                      const isCompleted = stepNumber < visualStep
                      const isActive = stepNumber === visualStep
                      
                      return (
                        <div
                          key={index}
                          className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                            isCompleted
                              ? 'bg-primary-600'
                              : isActive
                              ? 'bg-primary-600'
                              : 'bg-gray-200'
                          }`}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto relative">
              <AnimatePresence mode="wait">
              {/* First 4 steps commented out but keeping code */}
              {/* Step 1: Primary Profession */}
              {false && currentStep === 1 && (
                <>
                  <div className="sticky top-0 z-50 bg-white">
                    <div className="px-4 sm:px-6 pt-6 pb-4">
                      <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                          Primary Profession
                        </h1>
                        <p className="text-lg text-gray-600">
                          What is your Primary Profession
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 pb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-2xl mx-auto space-y-1"
                    >
                    {PROFESSIONS.map((prof) => {
                      const isSelected = profession === prof
                      return (
                        <label
                          key={prof}
                          className="flex items-center p-4 pl-0 cursor-pointer transition-colors hover:bg-gray-50/50"
                        >
                          <input
                            type="radio"
                            name="profession"
                            value={prof}
                            checked={isSelected}
                            onChange={(e) => {
                              const value = e.target.value
                              setProfession(value)
                              professionRef.current = value
                              setOtherLicensed('') // Clear other licensed when selecting a profession
                            }}
                            onBlur={(e) => e.target.blur()}
                            className="w-5 h-5 mr-4 cursor-pointer appearance-none rounded-full border-2 transition-all focus:outline-none focus:ring-0 focus-visible:outline-none"
                            style={{
                              borderColor: isSelected ? '#7F2860' : '#d1d5db',
                              backgroundColor: isSelected ? '#7F2860' : 'transparent',
                              backgroundImage: isSelected ? 'radial-gradient(circle, white 35%, transparent 35%)' : 'none',
                              outline: 'none',
                              boxShadow: 'none',
                            }}
                          />
                          <span className={`text-base font-medium flex-1 ${
                            isSelected ? 'text-primary-700' : 'text-gray-700'
                          }`}>
                            {prof}
                          </span>
                        </label>
                      )
                    })}
                    
                    {/* Other Licensed Input */}
                    <label 
                      className="relative flex items-center p-4 pl-8 rounded-xl cursor-pointer transition-all"
                      onClick={(e) => {
                        e.preventDefault()
                        // Clear any selected profession
                        setProfession('')
                        professionRef.current = ''
                        // Set a temporary value to pass validation
                        if (!otherLicensed) {
                          setOtherLicensed('Other')
                        }
                        // Navigate directly to next step (bypass validation for otherLicensed)
                        if (currentStep < totalSteps) {
                          setCurrentStep(currentStep + 1)
                        }
                      }}
                    >
                      {/* Glassmorphic Background */}
                      <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                        otherLicensed && !profession
                          ? 'bg-primary-500/10 backdrop-blur-sm border-2 border-primary-500/50'
                          : 'bg-white/60 backdrop-blur-sm border-2 border-gray-200/50'
                      }`}
                      style={{
                        backdropFilter: 'blur(10px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                      }}
                      />

                      {/* Content */}
                      <div className="relative z-10 flex items-center w-full">
                        <input
                          type="text"
                          value={otherLicensed}
                          onChange={(e) => {
                            setOtherLicensed(e.target.value)
                            setProfession('') // Clear profession when entering other
                            professionRef.current = ''
                          }}
                          onFocus={(e) => {
                            e.preventDefault()
                            // Clear any selected profession
                            setProfession('')
                            // Set a temporary value
                            if (!otherLicensed) {
                              setOtherLicensed('Other')
                            }
                            // Navigate directly to next step (bypass validation for otherLicensed)
                            if (currentStep < totalSteps) {
                              setCurrentStep(currentStep + 1)
                            }
                          }}
                          placeholder="Other Licensed"
                          className="flex-1 bg-transparent border-0 outline-none text-base font-medium text-gray-700 placeholder:text-gray-400 pr-8 pointer-events-none"
                          readOnly
                        />
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </label>
                    </motion.div>
                  </div>
                </>
              )}

              {/* Step 2: Specialty */}
              {false && currentStep === 2 && (
                <>
                  <div className="sticky top-0 z-50 bg-white">
                    <div className="px-4 sm:px-6 pt-6 pb-4">
                      <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                          Speciality
                        </h1>
                        <p className="text-lg text-gray-600">
                          Select minimum one speciality
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 pb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-2xl mx-auto"
                    >
                      {profession || otherLicensed ? (
                        <>
                          {/* Search Bar */}
                          <div className="relative mb-3">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                              <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={specialtySearch}
                              onChange={(e) => setSpecialtySearch(e.target.value)}
                              placeholder="Search speciality"
                              className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:border-primary-500/50 focus:outline-none text-base relative"
                              style={{
                                backdropFilter: 'blur(10px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                              }}
                            />
                          </div>

                          {/* Selected Specialties Chips */}
                          {specialties.length > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-end mb-2">
                                <button
                                  onClick={() => setSpecialties([])}
                                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                                >
                                  Clear all
                                </button>
                              </div>
                              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {specialties.map((spec) => (
                                  <div
                                    key={spec}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 backdrop-blur-sm border border-primary-500/30 rounded-lg flex-shrink-0"
                                    style={{
                                      backdropFilter: 'blur(10px) saturate(180%)',
                                      WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                                    }}
                                  >
                                    <span className="text-sm font-medium text-primary-700 whitespace-nowrap">
                                      {spec}
                                    </span>
                                    <button
                                      onClick={() => toggleSpecialty(spec)}
                                      className="text-primary-600 hover:text-primary-700 transition-colors flex-shrink-0"
                                      aria-label={`Remove ${spec}`}
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Speciality List */}
                          <div 
                            className="space-y-0"
                            style={{
                              maxHeight: '400px',
                              overflowY: 'auto',
                            }}
                          >
                            {filteredSpecialties.length > 0 ? (
                              filteredSpecialties.map((spec, index) => {
                                const isSelected = specialties.includes(spec)
                                return (
                                  <div key={spec}>
                                    <div
                                      onClick={() => toggleSpecialty(spec)}
                                      className="flex items-center justify-between px-4 py-4 cursor-pointer transition-all hover:bg-gray-50/50"
                                    >
                                      <span className={`text-base font-medium flex-1 ${
                                        isSelected ? 'text-primary-700' : 'text-gray-700'
                                      }`}>
                                        {spec}
                                      </span>
                                      {isSelected && (
                                        <Check className="w-5 h-5 text-primary-600 flex-shrink-0 ml-4" strokeWidth={3} />
                                      )}
                                    </div>
                                    {index < filteredSpecialties.length - 1 && (
                                      <div className="h-px bg-gray-200/50" />
                                    )}
                                  </div>
                                )
                              })
                            ) : (
                              <div className="px-4 py-8 text-center text-gray-500">
                                <p>No specialities found</p>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <p>Please select a profession first</p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </>
              )}

              {/* Step 3: Location */}
              {false && currentStep === 3 && (
                <>
                  <div className="sticky top-0 z-50 bg-white">
                    <div className="px-4 sm:px-6 pt-6 pb-4">
                      <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                          Location
                        </h1>
                        <p className="text-lg text-gray-600">
                          Where are you located?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 pb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-2xl mx-auto space-y-4"
                    >
                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        {/* Custom Dropdown Button */}
                        <motion.button
                          type="button"
                          onClick={() => setShowStateDropdown(!showStateDropdown)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 rounded-xl focus:outline-none cursor-pointer text-left relative flex items-center ${
                            showStateDropdown ? 'border-primary-500/50' : 'border-gray-200/50'
                          } ${!location.state ? 'text-gray-400' : 'text-gray-700'}`}
                          style={{
                            backdropFilter: 'blur(10px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                          }}
                        >
                          <span className="flex-1 text-left truncate">
                            {location.state || 'Select state'}
                          </span>
                          <motion.div
                            animate={{ rotate: showStateDropdown ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-3 pointer-events-none"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                          </motion.div>
                        </motion.button>

                        {/* Custom Dropdown Menu */}
                        <AnimatePresence>
                          {showStateDropdown && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setShowStateDropdown(false)}
                              />
                              <motion.div
                                ref={dropdownContainerRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-20 w-full mt-1 bg-white/95 backdrop-blur-lg border-2 border-gray-200/50 rounded-xl shadow-xl max-h-60 overflow-y-auto outline-none"
                                style={{
                                  backdropFilter: 'blur(20px) saturate(180%)',
                                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                }}
                              >
                                {US_STATES.map((state) => (
                                  <button
                                    key={state}
                                    ref={location.state === state ? selectedStateRef : null}
                                    type="button"
                                    onClick={() => {
                                      setLocation({ ...location, state })
                                      setShowStateDropdown(false)
                                    }}
                                    className={`w-full px-4 py-2.5 text-left transition-colors text-sm ${
                                      location.state === state
                                        ? 'bg-primary-500/10 text-primary-700 font-medium'
                                        : 'hover:bg-primary-50/50 text-gray-700'
                                    }`}
                                  >
                                    {state}
                                  </button>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={location.city}
                          onChange={(e) => setLocation({ ...location, city: e.target.value })}
                          placeholder="Enter city"
                          className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:border-primary-500/50 focus:outline-none"
                          style={{
                            backdropFilter: 'blur(10px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                          }}
                        />
                      </div>
                    </div>
                    </motion.div>
                  </div>
                </>
              )}

              {/* Step 4: Job Role */}
              {false && currentStep === 4 && (
                <>
                  <div className="sticky top-0 z-50 bg-white">
                    <div className="px-4 sm:px-6 pt-6 pb-4">
                      <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                          Job Role
                        </h1>
                        <p className="text-lg text-gray-600">
                          What is your job role? (Optional)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 pb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-2xl mx-auto space-y-4"
                    >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Role
                      </label>
                      <input
                        type="text"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        placeholder="Enter job role"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    </motion.div>
                  </div>
                </>
              )}

              {/* Step 5: Personal Information */}
              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="sticky top-0 z-50 bg-white">
                    <div className="px-4 sm:px-6 pt-6 pb-4">
                      <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Personal Information</h1>
                        <p className="text-lg text-gray-600">Let's start with your personal information</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 pb-6">
                    <div className="max-w-2xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            value={profileData.firstName} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))} 
                            placeholder="Enter first name" 
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                        </div>
                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            value={profileData.lastName} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))} 
                            placeholder="Enter last name" 
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                          <input 
                            type="email" 
                            value={profileData.email} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))} 
                            placeholder="Enter your email" 
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                        </div>
                        {/* Phone Number */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input 
                            type="tel" 
                            value={profileData.phoneNumber} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))} 
                            placeholder="Enter phone number" 
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Date of Birth */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                          <CustomDatePicker
                            value={profileData.dob}
                            onChange={(value) => setProfileData(prev => ({ ...prev, dob: value }))}
                            placeholder="Select date of birth"
                            showFormat={true}
                          />
                        </div>
                        {/* Social Security Number */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Social Security Number <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            value={profileData.ssn} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, ssn: e.target.value }))} 
                            placeholder="123456789" 
                            maxLength={9}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                          <p className="mt-1.5 text-xs text-gray-500">Enter exactly 9 digits</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        {/* Years of Experience */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience <span className="text-red-500">*</span></label>
                          <input 
                            type="number" 
                            value={profileData.yearsOfExperience} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, yearsOfExperience: e.target.value }))} 
                            placeholder="Enter years of experience" 
                            min="1"
                            max="50"
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                          <p className="mt-1.5 text-xs text-gray-500">Must be between 1 and 50 years</p>
                        </div>
                      </div>

                      {/* Address Information Header */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary-600" />
                          Address Information
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {/* Street Address */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            value={profileData.streetAddress} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, streetAddress: e.target.value }))} 
                            placeholder="Enter street address" 
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                        </div>
                        {/* Additional Address Line */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Address Line</label>
                          <input 
                            type="text" 
                            value={profileData.additionalAddress} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, additionalAddress: e.target.value }))} 
                            placeholder="Apartment, suite, etc. (optional)" 
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                        </div>
                        {/* City & State */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              value={profileData.city} 
                              onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))} 
                              placeholder="Enter city" 
                              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State <span className="text-red-500">*</span></label>
                            <CustomSelect
                              value={profileData.state}
                              onChange={(value) => setProfileData(prev => ({ ...prev, state: value }))}
                              placeholder="Select state"
                              icon={MapPin}
                            >
                              <option value="">Select state</option>
                              {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                            </CustomSelect>
                          </div>
                        </div>
                        {/* ZIP Code */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            value={profileData.zipCode} 
                            onChange={(e) => setProfileData(prev => ({ ...prev, zipCode: e.target.value }))} 
                            placeholder="Enter ZIP code" 
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Steps 6-11: Section Listings */}
              {currentStep >= 6 && currentStep <= 11 && (() => {
                const sectionMap: { [key: number]: SectionType } = { 6: 'licenses', 7: 'certificates', 8: 'specialties', 9: 'workHistory', 10: 'education', 11: 'references' }
                const section = sectionMap[currentStep]
                // Sort items in descending order (newest first) - reverse the array since items are added to the end
                const items = [...(profileData[section] || [])].reverse()
                const Icon = getSectionIcon(section)
                return (
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="sticky top-0 z-50 bg-white">
                      <div className="px-4 sm:px-6 pt-6 pb-4">
                        <div className="max-w-2xl mx-auto">
                          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{getStepTitle(currentStep)}</h1>
                          <p className="text-lg text-gray-600 mb-4">Manage your {getStepTitle(currentStep).toLowerCase()}</p>
                          <button onClick={() => openAddForm(section)} className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 min-h-[48px]">
                            <Plus className="w-5 h-5 flex-shrink-0" />
                            <span className="text-center">Add {getAddButtonText(currentStep)}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 sm:px-6 pb-6">
                      <div className="max-w-2xl mx-auto">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 min-h-[300px]">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Icon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                          {getEmptyStateMessage(section).title}
                        </h3>
                        <p className="text-gray-600 text-center max-w-md">
                          {getEmptyStateMessage(section).description}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {items.map((item: any, index: number) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.03
                            }}
                            className="group"
                          >
                            {/* Main card - Clean professional design */}
                            <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                              <div className="p-5">
                                {/* Header with title and action buttons */}
                                <div className="flex items-start justify-between mb-4">
                                  <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                                    {section === 'licenses' && item.type}
                                    {section === 'certificates' && item.type}
                                    {section === 'specialties' && item.certification}
                                    {section === 'workHistory' && item.title}
                                    {section === 'education' && item.title}
                                    {section === 'references' && item.name}
                                  </h3>
                                  
                                  {/* Action buttons */}
                                  <div className="flex-shrink-0 flex items-center gap-2">
                                    <motion.button
                                      onClick={() => openEditForm(section, item)}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                      title="Edit"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                      onClick={() => setDeleteConfirm({ show: true, section, itemId: item.id })}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </div>

                                {/* Content - Vertical layout with each field on separate line (matching modal order) */}
                                <div className="space-y-2">
                                    {section === 'licenses' && (
                                      <>
                                        {item.number && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">License Number:</span> <span className="ml-2">{item.number}</span></div>}
                                        {item.state && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">State:</span> <span className="ml-2">{item.state}</span></div>}
                                        {item.expiration && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Expiration Date:</span> <span className="ml-2">{formatDateToDDMMYYYY(item.expiration)}</span></div>}
                                      </>
                                    )}
                                    {section === 'certificates' && (
                                      <>
                                        {item.number && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Certificate Number:</span> <span className="ml-2">{item.number}</span></div>}
                                        {item.expiration && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Expiration Date:</span> <span className="ml-2">{formatDateToDDMMYYYY(item.expiration)}</span></div>}
                                      </>
                                    )}
                                    {section === 'specialties' && (
                                      <>
                                        {item.specialty && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Specialty:</span> <span className="ml-2">{item.specialty}</span></div>}
                                      </>
                                    )}
                                    {section === 'workHistory' && (
                                      <>
                                        {item.unit && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Unit/Position:</span> <span className="ml-2">{item.unit}</span></div>}
                                        {item.startDate && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Start Date:</span> <span className="ml-2">{formatDateToDDMMYYYY(item.startDate)}</span></div>}
                                        {!item.currentlyWorking && item.endDate && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">End Date:</span> <span className="ml-2">{formatDateToDDMMYYYY(item.endDate)}</span></div>}
                                        {item.currentlyWorking && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Currently Working:</span> <span className="ml-2">Yes</span></div>}
                                        {item.agency && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Agency:</span> <span className="ml-2">{item.agency}</span></div>}
                                        {item.description && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Description:</span> <span className="ml-2">{item.description}</span></div>}
                                        {item.chargeExperience && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Charge Experience:</span> <span className="ml-2">{item.chargeExperience}</span></div>}
                                        {(item.travelAssignment || item.perDiem) && (
                                          <div className="flex flex-wrap gap-2 pt-1">
                                            {item.travelAssignment && <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-medium border border-blue-100">Travel Assignment</span>}
                                            {item.perDiem && <span className="text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-md font-medium border border-green-100">Per Diem</span>}
                                          </div>
                                        )}
                                      </>
                                    )}
                                    {section === 'education' && (
                                      <>
                                        {item.course && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Course/Program:</span> <span className="ml-2">{item.course}</span></div>}
                                        {item.status && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Status:</span> <span className="ml-2">{item.status}</span></div>}
                                        {item.status === 'Graduated' && item.graduated && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Graduation Date:</span> <span className="ml-2">{formatDateToDDMMYYYY(item.graduated)}</span></div>}
                                        {item.status === 'Graduated' && item.degree && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Degree:</span> <span className="ml-2">{item.degree}</span></div>}
                                      </>
                                    )}
                                    {section === 'references' && (
                                      <>
                                        {item.title && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Title:</span> <span className="ml-2">{item.title}</span></div>}
                                        {item.company && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Company:</span> <span className="ml-2">{item.company}</span></div>}
                                        {item.startDate && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Start Date:</span> <span className="ml-2">{formatDateToDDMMYYYY(item.startDate)}</span></div>}
                                        {item.endDate && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">End Date:</span> <span className="ml-2">{formatDateToDDMMYYYY(item.endDate)}</span></div>}
                                        {item.phone && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Phone:</span> <span className="ml-2">{item.phone}</span></div>}
                                        {item.email && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Email:</span> <span className="ml-2">{item.email}</span></div>}
                                      </>
                                    )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                      </div>
                    </div>
                  </motion.div>
                )
              })()}

              {/* Step 12: Summary */}
              {currentStep === 12 && (
                <motion.div
                  key="step-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Sticky Header */}
                  <div className="sticky top-0 z-50 bg-white">
                    <div className="px-4 sm:px-6 pt-6 pb-4">
                      <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                          Profile Summary
                        </h1>
                        <p className="text-lg text-gray-600">
                          Review your profile information before completing
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 pb-6">
                    <div className="max-w-2xl mx-auto">

                  <div className="space-y-0">
                    {/* Step 5: Personal Information */}
                    <div className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-base font-bold text-gray-900 mb-1">Personal information</h2>
                            <div className="space-y-1">
                              {profileData.name && <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {profileData.name}</p>}
                              {profileData.email && <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {profileData.email}</p>}
                              {profileData.address && <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {profileData.address}</p>}
                              {profileData.dob && <p className="text-sm text-gray-600"><span className="font-medium">Date of Birth:</span> {formatDateToDDMMYYYY(profileData.dob)}</p>}
                              {profileData.ssn && <p className="text-sm text-gray-600"><span className="font-medium">SSN:</span> ****{profileData.ssn.slice(-4)}</p>}
                              {!profileData.name && !profileData.email && !profileData.address && !profileData.dob && !profileData.ssn && (
                                <p className="text-sm text-gray-400 italic">No information added</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsEditingFromSummary(true)
                            setCurrentStep(5)
                          }}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200"></div>

                    {/* Step 6: Licenses */}
                    <div className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-base font-bold text-gray-900 mb-1">Professional Licenses</h2>
                            <div className="space-y-1">
                              {profileData.licenses.length > 0 ? (
                                [...profileData.licenses].reverse().map((license: any, index: number, array: any[]) => (
                                  <div key={license.id || index} className="space-y-1">
                                    {license.type && <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {license.type}</p>}
                                    {license.state && <p className="text-sm text-gray-600"><span className="font-medium">State:</span> {license.state}</p>}
                                    {license.number && <p className="text-sm text-gray-600"><span className="font-medium">Number:</span> {license.number}</p>}
                                    {license.expiration && <p className="text-sm text-gray-600"><span className="font-medium">Expiration:</span> {formatDateToDDMMYYYY(license.expiration)}</p>}
                                    {index < array.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-400 italic">No licenses added</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsEditingFromSummary(true)
                            setCurrentStep(6)
                          }}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200"></div>

                    {/* Step 7: Certificates */}
                    <div className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-base font-bold text-gray-900 mb-1">Certificates</h2>
                            <div className="space-y-1">
                              {profileData.certificates.length > 0 ? (
                                [...profileData.certificates].reverse().map((cert: any, index: number, array: any[]) => (
                                  <div key={cert.id || index} className="space-y-1">
                                    {cert.type && <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {cert.type}</p>}
                                    {cert.number && <p className="text-sm text-gray-600"><span className="font-medium">Number:</span> {cert.number}</p>}
                                    {cert.expiration && <p className="text-sm text-gray-600"><span className="font-medium">Expiration:</span> {formatDateToDDMMYYYY(cert.expiration)}</p>}
                                    {index < array.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-400 italic">No certificates added</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsEditingFromSummary(true)
                            setCurrentStep(7)
                          }}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200"></div>

                    {/* Step 8: Certification Specialties */}
                    <div className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-base font-bold text-gray-900 mb-1">Certification Specialties</h2>
                            <div className="space-y-1">
                              {profileData.specialties.length > 0 ? (
                                [...profileData.specialties].reverse().map((spec: any, index: number, array: any[]) => (
                                  <div key={spec.id || index} className="space-y-1">
                                    {spec.certification && <p className="text-sm text-gray-600"><span className="font-medium">Certification:</span> {spec.certification}</p>}
                                    {spec.specialty && <p className="text-sm text-gray-600"><span className="font-medium">Specialty:</span> {spec.specialty}</p>}
                                    {index < array.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-400 italic">No specialties added</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsEditingFromSummary(true)
                            setCurrentStep(8)
                          }}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200"></div>

                    {/* Step 9: Work History */}
                    <div className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-base font-bold text-gray-900 mb-1">Work History</h2>
                            <div className="space-y-1">
                              {profileData.workHistory.length > 0 ? (
                                [...profileData.workHistory].reverse().map((work: any, index: number, array: any[]) => (
                                  <div key={work.id || index} className="space-y-1">
                                    {work.title && <p className="text-sm text-gray-600"><span className="font-medium">Facility/Company:</span> {work.title}</p>}
                                    {work.unit && <p className="text-sm text-gray-600"><span className="font-medium">Unit/Position:</span> {work.unit}</p>}
                                    {work.startDate && <p className="text-sm text-gray-600"><span className="font-medium">Period:</span> {formatDateToDDMMYYYY(work.startDate)} - {work.currentlyWorking ? 'Present' : (work.endDate ? formatDateToDDMMYYYY(work.endDate) : 'N/A')}</p>}
                                    {work.agency && <p className="text-sm text-gray-600"><span className="font-medium">Agency:</span> {work.agency}</p>}
                                    {work.description && <p className="text-sm text-gray-600"><span className="font-medium">Description:</span> {work.description}</p>}
                                    {work.chargeExperience && <p className="text-sm text-gray-600"><span className="font-medium">Charge Experience:</span> {work.chargeExperience}</p>}
                                    {index < array.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-400 italic">No work history added</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsEditingFromSummary(true)
                            setCurrentStep(9)
                          }}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200"></div>

                    {/* Step 10: Education */}
                    <div className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-base font-bold text-gray-900 mb-1">Education History</h2>
                            <div className="space-y-1">
                              {profileData.education.length > 0 ? (
                                [...profileData.education].reverse().map((edu: any, index: number, array: any[]) => (
                                  <div key={edu.id || index} className="space-y-1">
                                    {edu.title && <p className="text-sm text-gray-600"><span className="font-medium">School/Institution:</span> {edu.title}</p>}
                                    {edu.course && <p className="text-sm text-gray-600"><span className="font-medium">Course/Program:</span> {edu.course}</p>}
                                    {edu.status && <p className="text-sm text-gray-600"><span className="font-medium">Status:</span> {edu.status}</p>}
                                    {edu.graduated && <p className="text-sm text-gray-600"><span className="font-medium">Graduated:</span> {formatDateToDDMMYYYY(edu.graduated)}</p>}
                                    {edu.degree && <p className="text-sm text-gray-600"><span className="font-medium">Degree:</span> {edu.degree}</p>}
                                    {index < array.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-400 italic">No education added</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsEditingFromSummary(true)
                            setCurrentStep(10)
                          }}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200"></div>

                    {/* Step 11: References */}
                    <div className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-base font-bold text-gray-900 mb-1">References</h2>
                            <div className="space-y-1">
                              {profileData.references.length > 0 ? (
                                [...profileData.references].reverse().map((ref: any, index: number, array: any[]) => (
                                  <div key={ref.id || index} className="space-y-1">
                                    {ref.name && <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {ref.name}</p>}
                                    {ref.title && <p className="text-sm text-gray-600"><span className="font-medium">Title:</span> {ref.title}</p>}
                                    {ref.company && <p className="text-sm text-gray-600"><span className="font-medium">Company:</span> {ref.company}</p>}
                                    {ref.startDate && <p className="text-sm text-gray-600"><span className="font-medium">Start Date:</span> {formatDateToDDMMYYYY(ref.startDate)}</p>}
                                    {ref.endDate && <p className="text-sm text-gray-600"><span className="font-medium">End Date:</span> {formatDateToDDMMYYYY(ref.endDate)}</p>}
                                    {ref.phone && <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {ref.phone}</p>}
                                    {ref.email && <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {ref.email}</p>}
                                    {index < array.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-400 italic">No references added</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsEditingFromSummary(true)
                            setCurrentStep(11)
                          }}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            {/* Footer with Next Button */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-white">
              <div className="max-w-2xl mx-auto flex items-center gap-3">
                {(currentStep > 5 || isEditingFromSummary) && ( // Show Previous if not on step 5, or if editing from summary
                  <button
                    onClick={handlePrevious}
                    className="relative px-6 py-3 h-[48px] text-gray-600 hover:text-gray-900 border-2 border-gray-200 rounded-xl transition-all duration-200 flex items-center justify-center hover:border-gray-300"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`flex-1 px-6 py-3 h-[48px] font-medium rounded-xl transition-colors flex items-center justify-center ${
                    canProceed
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentStep === 12 ? 'Complete' : isEditingFromSummary ? 'Update' : 'Next'}
                </button>
              </div>
            </div>
          </div>

          {/* Details Page Modal */}
          {renderDetailsModal()}

          {/* Close Confirmation Dialog */}
          <AnimatePresence>
            {showCloseConfirm && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
                  onClick={handleCancelClose}
                />

                {/* Modal Container - Centered */}
                <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 pointer-events-none">
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
                      <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-20 pointer-events-none" />
                      
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
                            <div className="absolute inset-0 bg-primary-100 rounded-2xl blur-xl opacity-60" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <X className="w-8 h-8 text-white" />
                            </div>
                          </motion.div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          Leave Profile Setup?
                        </h3>
                        <p className="text-center text-gray-600 mb-6">
                          Are you sure you want to leave? Your data will not be saved.
                        </p>

                        {/* Decorative Divider */}
                        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCancelClose}
                            className="flex-1 px-6 py-3.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all shadow-sm text-center box-border"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleConfirmClose}
                            className="relative flex-1 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold transition-all shadow-lg overflow-hidden group text-center box-border border-2 border-transparent"
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
                            <span className="relative z-10">Leave</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Delete Confirmation Dialog */}
    <AnimatePresence>
      {deleteConfirm.show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100002]"
            onClick={() => setDeleteConfirm({ show: false, section: null, itemId: null })}
          />

          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-[100003] flex items-center justify-center p-4 pointer-events-none">
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
                    Delete {deleteConfirm.section ? getSectionTitle(deleteConfirm.section) : 'Item'}
                  </h3>
                  <p className="text-center text-gray-600 mb-6">
                    Are you sure you want to delete this {deleteConfirm.section ? getSectionTitle(deleteConfirm.section).toLowerCase() : 'item'}? This action cannot be undone.
                  </p>

                  {/* Decorative Divider */}
                  <div className="mb-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDeleteConfirm({ show: false, section: null, itemId: null })}
                      className="flex-1 px-6 py-3.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all shadow-sm text-center box-border"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (deleteConfirm.section && deleteConfirm.itemId) {
                          handleDeleteItem(deleteConfirm.section, deleteConfirm.itemId)
                        }
                        setDeleteConfirm({ show: false, section: null, itemId: null })
                      }}
                      className="relative flex-1 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all shadow-lg overflow-hidden group text-center box-border border-2 border-transparent"
                    >
                      {/* Shine Effect */}
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                      <span className="relative z-10">Delete</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  )
}
