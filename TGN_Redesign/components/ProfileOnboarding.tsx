'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Search, Check, Shield, Award, Briefcase, GraduationCap, Users, ArrowLeft, Plus, Trash2, Edit } from 'lucide-react'
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

interface ProfileData {
  // Basic Info
  name: string
  email: string
  address: string
  dob: string
  ssn: string
  
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
  const [currentStep, setCurrentStep] = useState(5) // Start from step 5 (Basic Information) since first 4 steps are commented out
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
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    address: '',
    dob: '',
    ssn: '',
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
      if (user.name) setProfileData(prev => ({ ...prev, name: user.name }))
      if (user.email) setProfileData(prev => ({ ...prev, email: user.email }))
      if ((user as any).address) setProfileData(prev => ({ ...prev, address: (user as any).address }))
      if ((user as any).dob) setProfileData(prev => ({ ...prev, dob: (user as any).dob }))
      if ((user as any).ssn) setProfileData(prev => ({ ...prev, ssn: (user as any).ssn }))
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
      // Basic Information (now step 1 in visible flow)
      if (!profileData.name || !profileData.email) {
        toast.error('Please fill in your name and email')
        return false
      }
      return true
    }
    // Steps 6-11 (sections) don't require validation - user can proceed without adding items
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
      progressData.address = profileData.address
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
      address: profileData.address,
      dob: profileData.dob,
      ssn: profileData.ssn,
      licenses: profileData.licenses,
      certificates: profileData.certificates,
      specialties: profileData.specialties,
      workHistory: profileData.workHistory,
      education: profileData.education,
      references: profileData.references,
      profileComplete: true
    })

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
        address: updatedData.address,
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
  
  const validateFormData = (section: SectionType, data: any): boolean => {
    switch (section) {
      case 'licenses':
        if (!data.type) {
          toast.error('Please select license type')
          return false
        }
        return true
      case 'certificates':
        if (!data.type) {
          toast.error('Please select certificate type')
          return false
        }
        return true
      case 'specialties':
        if (!data.certification || !data.specialty) {
          toast.error('Please fill in all required fields')
          return false
        }
        return true
      case 'workHistory':
        if (!data.title) {
          toast.error('Please enter facility/company name')
          return false
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
  
  const getStepTitle = (step: number) => {
    switch (step) {
      // First 4 steps commented out
      // case 1: return 'Primary Profession'
      // case 2: return 'Specialty'
      // case 3: return 'Location'
      // case 4: return 'Job Role'
      case 5: return 'Basic Information'
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

  // First 4 steps commented out but keeping validation logic
  // For step 1, only check profession (otherLicensed auto-navigates, so Next button not needed)
  const canProceed = 
    // currentStep === 1 ? profession 
    // : currentStep === 2 ? specialties.length > 0 
    // : currentStep === 3 ? (location.city && location.state) 
    currentStep === 5 ? (profileData.name && profileData.email)
    : true

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
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-gray-900">
                          {editingItem ? `Edit ${sectionTitle}` : `Add ${sectionTitle}`}
                        </h1>
                        <p className="text-sm text-gray-600">
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
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
                  <div className="space-y-4">
                    {currentSection === 'licenses' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.type || ''}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      >
                        <option value="">Select license type</option>
                        {LICENSE_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                      <input type="text" value={formData.number || ''} onChange={(e) => setFormData({ ...formData, number: e.target.value })} placeholder="Enter license number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <select value={formData.state || ''} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none">
                        <option value="">Select state</option>
                        {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                      <input type="date" value={formData.expiration || ''} onChange={(e) => setFormData({ ...formData, expiration: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                  </>
                )}
                {currentSection === 'certificates' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type <span className="text-red-500">*</span></label>
                      <select value={formData.type || ''} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none">
                        <option value="">Select certificate type</option>
                        {CERTIFICATE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                      <input type="text" value={formData.number || ''} onChange={(e) => setFormData({ ...formData, number: e.target.value })} placeholder="Enter certificate number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                      <input type="date" value={formData.expiration || ''} onChange={(e) => setFormData({ ...formData, expiration: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                    </div>
                  </>
                )}
                {currentSection === 'specialties' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certification <span className="text-red-500">*</span></label>
                      <select value={formData.certification || ''} onChange={(e) => setFormData({ ...formData, certification: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none">
                        <option value="">Select certification</option>
                        {CERTIFICATIONS.map(cert => <option key={cert} value={cert}>{cert}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialty <span className="text-red-500">*</span></label>
                      <select value={formData.specialty || ''} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none">
                        <option value="">Select specialty</option>
                        {CERTIFICATION_SPECIALTIES.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                      </select>
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
                        <input type="date" value={formData.startDate || ''} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input type="date" value={formData.endDate || ''} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} disabled={formData.currentlyWorking} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none disabled:opacity-50" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="currentlyWorking" checked={formData.currentlyWorking || false} onChange={(e) => setFormData({ ...formData, currentlyWorking: e.target.checked })} className="w-4 h-4 text-primary-600 rounded" />
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
                      <select value={formData.status || 'Graduated'} onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Graduated' | 'Did Not Graduate' })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none">
                        <option value="Graduated">Graduated</option>
                        <option value="Did Not Graduate">Did Not Graduate</option>
                      </select>
                    </div>
                    {formData.status === 'Graduated' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date</label>
                          <input type="date" value={formData.graduated || ''} onChange={(e) => setFormData({ ...formData, graduated: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
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
                        <input type="date" value={formData.startDate || ''} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input type="date" value={formData.endDate || ''} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
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
                <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setShowDetailsPage(false)
                        setEditingItem(null)
                        setCurrentSection(null)
                        setFormData({})
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveItem} 
                      className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                    >
                      {editingItem ? 'Update' : 'Save'}
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

              {/* Progress Bar - Dynamic based on totalSteps */}
              <div className="flex gap-1 px-0">
                {Array.from({ length: totalSteps }).map((_, index) => {
                  // Map currentStep (5-12) to visual step (1-8) for progress bar
                  // Since we start from step 5, subtract 4 to get the visual step number
                  const visualStep = currentStep - 4
                  return (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        index + 1 <= visualStep
                          ? 'bg-primary-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
              {/* First 4 steps commented out but keeping code */}
              {/* Step 1: Primary Profession */}
              {false && currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                      Primary Profession
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      What is your Primary Profession
                    </p>
                  </div>

                  <div className="space-y-1">
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
                  </div>
                </motion.div>
              )}

              {/* Step 2: Specialty */}
              {false && currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                      Speciality
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      Select minimum one speciality
                    </p>
                    
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
                      </>
                    ) : null}
                  </div>

                  {profession || otherLicensed ? (
                    <>

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
              )}

              {/* Step 3: Location */}
              {false && currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                      Location
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      Where are you located?
                    </p>
                  </div>

                  <div className="space-y-4">
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
                  </div>
                </motion.div>
              )}

              {/* Step 4: Job Role */}
              {false && currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                      Job Role
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      What is your job role? (Optional)
                    </p>
                  </div>

                  <div className="space-y-4">
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
                  </div>
                </motion.div>
              )}

              {/* Step 5: Basic Information */}
              {currentStep === 5 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
                  <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Basic Information</h1>
                    <p className="text-lg text-gray-600 mb-4">Let's start with your basic profile information</p>
                  </div>
                  <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label><input type="text" value={profileData.name} onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your full name" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label><input type="email" value={profileData.email} onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Address</label><input type="text" value={profileData.address} onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))} placeholder="Enter your address" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label><input type="date" value={profileData.dob} onChange={(e) => setProfileData(prev => ({ ...prev, dob: e.target.value }))} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">SSN (Last 4 digits)</label><input type="text" value={profileData.ssn} onChange={(e) => setProfileData(prev => ({ ...prev, ssn: e.target.value }))} placeholder="****" maxLength={4} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" /></div>
                  </div>
                </motion.div>
              )}

              {/* Steps 6-11: Section Listings */}
              {currentStep >= 6 && currentStep <= 11 && (() => {
                const sectionMap: { [key: number]: SectionType } = { 6: 'licenses', 7: 'certificates', 8: 'specialties', 9: 'workHistory', 10: 'education', 11: 'references' }
                const section = sectionMap[currentStep]
                const items = profileData[section] || []
                const Icon = getSectionIcon(section)
                return (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
                    <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{getStepTitle(currentStep)}</h1>
                      <p className="text-lg text-gray-600 mb-4">Manage your {getStepTitle(currentStep).toLowerCase()}</p>
                    </div>
                    <div className="mb-6">
                      <button onClick={() => openAddForm(section)} className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-5 h-5" />Add {getStepTitle(currentStep).slice(0, -1)}
                      </button>
                    </div>
                    {items.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><Icon className="w-8 h-8 text-gray-400" /></div>
                        <p className="text-gray-600">No items added yet. Click the button above to add your first item.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {items.map((item: any) => (
                          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                {section === 'licenses' && <><h3 className="font-semibold text-gray-900 mb-1">{item.type}</h3><p className="text-sm text-gray-600">{item.state} • {item.number}</p>{item.expiration && <p className="text-xs text-gray-500 mt-1">Expires: {item.expiration}</p>}</>}
                                {section === 'certificates' && <><h3 className="font-semibold text-gray-900 mb-1">{item.type}</h3><p className="text-sm text-gray-600">{item.number}</p>{item.expiration && <p className="text-xs text-gray-500 mt-1">Expires: {item.expiration}</p>}</>}
                                {section === 'specialties' && <><h3 className="font-semibold text-gray-900 mb-1">{item.certification}</h3><p className="text-sm text-gray-600">{item.specialty}</p></>}
                                {section === 'workHistory' && <><h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3><p className="text-sm text-gray-600">{item.unit}</p><p className="text-xs text-gray-500 mt-1">{item.startDate} - {item.currentlyWorking ? 'Present' : item.endDate}</p></>}
                                {section === 'education' && <><h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3><p className="text-sm text-gray-600">{item.course} • {item.status}</p>{item.graduated && <p className="text-xs text-gray-500 mt-1">Graduated: {item.graduated}</p>}</>}
                                {section === 'references' && <><h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3><p className="text-sm text-gray-600">{item.title} at {item.company}</p><p className="text-xs text-gray-500 mt-1">{item.phone}</p></>}
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <button onClick={() => openEditForm(section, item)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => { if (confirm('Are you sure you want to delete this item?')) handleDeleteItem(section, item.id) }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })()}

              {/* Step 12: Summary */}
              {currentStep === 12 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-4xl mx-auto">
                  {/* Sticky Header */}
                  <div className="sticky top-0 bg-white z-20 pb-4 pt-2 border-b border-gray-200 shadow-sm">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                      Profile Summary
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      Review your profile information before completing
                    </p>
                  </div>

                  <div className="space-y-0">
                    {/* Step 5: Basic Information */}
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
                              {profileData.dob && <p className="text-sm text-gray-600"><span className="font-medium">Date of Birth:</span> {profileData.dob}</p>}
                              {profileData.ssn && <p className="text-sm text-gray-600"><span className="font-medium">SSN:</span> ****{profileData.ssn}</p>}
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
                                profileData.licenses.map((license: any, index: number) => (
                                  <div key={license.id || index} className="space-y-1">
                                    {license.type && <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {license.type}</p>}
                                    {license.state && <p className="text-sm text-gray-600"><span className="font-medium">State:</span> {license.state}</p>}
                                    {license.number && <p className="text-sm text-gray-600"><span className="font-medium">Number:</span> {license.number}</p>}
                                    {license.expiration && <p className="text-sm text-gray-600"><span className="font-medium">Expiration:</span> {license.expiration}</p>}
                                    {index < profileData.licenses.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
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
                                profileData.certificates.map((cert: any, index: number) => (
                                  <div key={cert.id || index} className="space-y-1">
                                    {cert.type && <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {cert.type}</p>}
                                    {cert.number && <p className="text-sm text-gray-600"><span className="font-medium">Number:</span> {cert.number}</p>}
                                    {cert.expiration && <p className="text-sm text-gray-600"><span className="font-medium">Expiration:</span> {cert.expiration}</p>}
                                    {index < profileData.certificates.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
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
                                profileData.specialties.map((spec: any, index: number) => (
                                  <div key={spec.id || index} className="space-y-1">
                                    {spec.certification && <p className="text-sm text-gray-600"><span className="font-medium">Certification:</span> {spec.certification}</p>}
                                    {spec.specialty && <p className="text-sm text-gray-600"><span className="font-medium">Specialty:</span> {spec.specialty}</p>}
                                    {index < profileData.specialties.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
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
                                profileData.workHistory.map((work: any, index: number) => (
                                  <div key={work.id || index} className="space-y-1">
                                    {work.title && <p className="text-sm text-gray-600"><span className="font-medium">Facility/Company:</span> {work.title}</p>}
                                    {work.unit && <p className="text-sm text-gray-600"><span className="font-medium">Unit/Position:</span> {work.unit}</p>}
                                    {work.startDate && <p className="text-sm text-gray-600"><span className="font-medium">Period:</span> {work.startDate} - {work.currentlyWorking ? 'Present' : work.endDate || 'N/A'}</p>}
                                    {work.agency && <p className="text-sm text-gray-600"><span className="font-medium">Agency:</span> {work.agency}</p>}
                                    {work.description && <p className="text-sm text-gray-600"><span className="font-medium">Description:</span> {work.description}</p>}
                                    {work.chargeExperience && <p className="text-sm text-gray-600"><span className="font-medium">Charge Experience:</span> {work.chargeExperience}</p>}
                                    {index < profileData.workHistory.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
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
                                profileData.education.map((edu: any, index: number) => (
                                  <div key={edu.id || index} className="space-y-1">
                                    {edu.title && <p className="text-sm text-gray-600"><span className="font-medium">School/Institution:</span> {edu.title}</p>}
                                    {edu.course && <p className="text-sm text-gray-600"><span className="font-medium">Course/Program:</span> {edu.course}</p>}
                                    {edu.status && <p className="text-sm text-gray-600"><span className="font-medium">Status:</span> {edu.status}</p>}
                                    {edu.graduated && <p className="text-sm text-gray-600"><span className="font-medium">Graduated:</span> {edu.graduated}</p>}
                                    {edu.degree && <p className="text-sm text-gray-600"><span className="font-medium">Degree:</span> {edu.degree}</p>}
                                    {index < profileData.education.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
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
                                profileData.references.map((ref: any, index: number) => (
                                  <div key={ref.id || index} className="space-y-1">
                                    {ref.name && <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {ref.name}</p>}
                                    {ref.title && <p className="text-sm text-gray-600"><span className="font-medium">Title:</span> {ref.title}</p>}
                                    {ref.company && <p className="text-sm text-gray-600"><span className="font-medium">Company:</span> {ref.company}</p>}
                                    {ref.startDate && <p className="text-sm text-gray-600"><span className="font-medium">Start Date:</span> {ref.startDate}</p>}
                                    {ref.endDate && <p className="text-sm text-gray-600"><span className="font-medium">End Date:</span> {ref.endDate}</p>}
                                    {ref.phone && <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {ref.phone}</p>}
                                    {ref.email && <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {ref.email}</p>}
                                    {index < profileData.references.length - 1 && <div className="h-px bg-gray-200 my-2"></div>}
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
                </motion.div>
              )}
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
  )
}
