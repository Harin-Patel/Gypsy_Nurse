'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Search, Check } from 'lucide-react'
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

export default function ProfileOnboarding() {
  const { user, isAuthenticated, isLoading, updateUser, isProfileComplete } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
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

  const totalSteps = 4

  useEffect(() => {
    // Only show onboarding if user is authenticated, profile is not complete, and auth has finished loading
    // Check profileComplete flag explicitly - if it's false or undefined, show onboarding
    if (!isLoading && isAuthenticated && user && (user.profileComplete === false || user.profileComplete === undefined)) {
      setIsVisible(true)
      // Prevent body scrolling
      document.body.style.overflow = 'hidden'
      
      // Load saved progress if available
      if (user.profession) {
        setProfession(user.profession)
        professionRef.current = user.profession
      }
      if (user.specialty) {
        setSpecialties(user.specialty.split(', ').filter(s => s))
      }
      if (user.location?.city && user.location?.state) {
        setLocation({
          city: user.location.city,
          state: user.location.state
        })
      }
      if (user.jobRole) {
        setJobRole(user.jobRole)
      }
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
    if (step === 1) {
      // Only validate profession selection, not otherLicensed (which auto-navigates)
      if (!profession) {
        toast.error('Please select a profession')
        return false
      }
    } else if (step === 2) {
      if (specialties.length === 0) {
        toast.error('Please select at least one specialty')
        return false
      }
    } else if (step === 3) {
      if (!location.city || !location.state) {
        toast.error('Please enter your city and state')
        return false
      }
    } else if (step === 4) {
      // Job Role is optional, so no validation needed
      return true
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }

    // Save progress as user moves through steps
    saveProgress()

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  // Save progress incrementally as user completes each step
  const saveProgress = () => {
    const finalProfession = profession || otherLicensed
    const progressData: any = {}
    
    // Explicitly prevent profile from being marked complete during onboarding
    // Only handleComplete() should set profileComplete to true
    progressData.profileComplete = false
    
    if (currentStep >= 1 && finalProfession) {
      progressData.profession = finalProfession
    }
    
    if (currentStep >= 2 && specialties.length > 0) {
      progressData.specialty = specialties.join(', ')
    }
    
    if (currentStep >= 3 && location.city && location.state) {
      progressData.location = {
        city: location.city,
        state: location.state
      }
    }
    
    if (currentStep >= 4 && jobRole) {
      progressData.jobRole = jobRole
    }
    
    // Always update to ensure profileComplete is set to false
    updateUser(progressData)
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1
      // Clear otherLicensed when going back to step 1 to reset its visual state
      if (newStep === 1) {
        setOtherLicensed('')
        // Ensure profession state is preserved - restore from ref if state was lost
        if (professionRef.current && profession !== professionRef.current) {
          setProfession(professionRef.current)
        }
      }
      setCurrentStep(newStep)
    }
  }

  const handleComplete = () => {
    if (!validateStep(currentStep)) {
      return
    }

    // Use otherLicensed if profession is not selected
    const finalProfession = profession || otherLicensed

    // Update user profile
    updateUser({
      profession: finalProfession,
      specialty: specialties.join(', '), // Store as comma-separated string
      jobRole: jobRole || undefined,
      location: {
        city: location.city,
        state: location.state
      },
      profileComplete: true
    })

    toast.success('Profile updated successfully!')
    setIsVisible(false)
    document.body.style.overflow = ''
    
    // Small delay to show success message, then redirect
    setTimeout(() => {
      router.push('/')
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

  // For step 1, only check profession (otherLicensed auto-navigates, so Next button not needed)
  const canProceed = currentStep === 1 ? profession : currentStep === 2 ? specialties.length > 0 : currentStep === 3 ? (location.city && location.state) : true

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

              {/* Progress Bar - 4 Steps - Extended to edges */}
              <div className="flex gap-1 px-0">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      index + 1 <= currentStep
                        ? 'bg-primary-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
              {/* Step 1: Primary Profession */}
              {currentStep === 1 && (
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
              {currentStep === 2 && (
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
              {currentStep === 3 && (
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
              {currentStep === 4 && (
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
            </div>

            {/* Footer with Next Button */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-white">
              <div className="max-w-2xl mx-auto flex items-center gap-3">
                {currentStep > 1 && (
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
                  {currentStep === totalSteps ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          </div>

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
