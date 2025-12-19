'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Check, Shield, Award, Briefcase, GraduationCap, Users, Mail, MapPin, Calendar, Plus, Trash2, Edit, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Image from 'next/image'

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

const SPECIALTIES = [
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

interface ProfileCompletionFlowProps {
  forceShow?: boolean
  onComplete?: () => void
}

export default function ProfileCompletionFlow({ forceShow = false, onComplete }: ProfileCompletionFlowProps = {}) {
  const { user, isAuthenticated, isLoading, updateUser } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)
  const [showDetailsPage, setShowDetailsPage] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [currentSection, setCurrentSection] = useState<SectionType | null>(null)
  
  // Profile Data State
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
  
  // Form States for Details Page
  const [formData, setFormData] = useState<any>({})
  
  const totalSteps = 8 // Basic Info + 6 sections + Complete
  
  useEffect(() => {
    if (forceShow) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
      return
    }
    
    // Show ProfileCompletionFlow automatically after basic ProfileOnboarding is complete
    if (!isLoading && isAuthenticated && user) {
      // Check if basic onboarding is done (profileComplete === true)
      // This means ProfileOnboarding has completed
      if (user.profileComplete === true) {
        // Show the detailed profile completion flow
        // Add a small delay to ensure ProfileOnboarding has fully closed
        const timer = setTimeout(() => {
          setIsVisible(true)
          document.body.style.overflow = 'hidden'
        }, 100)
        
        return () => clearTimeout(timer)
      } else {
        // Hide if basic onboarding is not complete
        setIsVisible(false)
        document.body.style.overflow = ''
      }
    }
    
    // Load existing data if available
    if (user) {
      if (user.name) setProfileData(prev => ({ ...prev, name: user.name }))
      if (user.email) setProfileData(prev => ({ ...prev, email: user.email }))
      
      // Load existing detailed profile data from user object if available
      // These would be stored in the user object after being saved
      if ((user as any).licenses) setProfileData(prev => ({ ...prev, licenses: (user as any).licenses || [] }))
      if ((user as any).certificates) setProfileData(prev => ({ ...prev, certificates: (user as any).certificates || [] }))
      if ((user as any).specialties) setProfileData(prev => ({ ...prev, specialties: (user as any).specialties || [] }))
      if ((user as any).workHistory) setProfileData(prev => ({ ...prev, workHistory: (user as any).workHistory || [] }))
      if ((user as any).education) setProfileData(prev => ({ ...prev, education: (user as any).education || [] }))
      if ((user as any).references) setProfileData(prev => ({ ...prev, references: (user as any).references || [] }))
    }
  }, [isAuthenticated, isLoading, user, forceShow])
  
  const saveProgress = () => {
    const progressData: any = {
      profileComplete: false,
      ...profileData
    }
    updateUser(progressData)
  }
  
  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }
    
    saveProgress()
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setShowDetailsPage(false)
      setEditingItem(null)
      setCurrentSection(null)
    } else {
      handleComplete()
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setShowDetailsPage(false)
      setEditingItem(null)
      setCurrentSection(null)
    }
  }
  
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!profileData.name || !profileData.email) {
          toast.error('Please fill in your name and email')
          return false
        }
        return true
      default:
        return true
    }
  }
  
  const handleComplete = () => {
    saveProgress()
    
    updateUser({
      ...profileData,
      profileComplete: true
    })
    
    toast.success('Profile completed successfully!')
    setIsVisible(false)
    document.body.style.overflow = ''
    
    if (onComplete) {
      onComplete()
    } else {
      setTimeout(() => {
        router.push('/profile')
      }, 500)
    }
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
    
    if (editingItem) {
      // Update existing item
      setProfileData(prev => ({
        ...prev,
        [currentSection]: prev[currentSection].map((item: any) =>
          item.id === editingItem.id ? newItem : item
        )
      }))
      toast.success('Item updated successfully')
    } else {
      // Add new item
      setProfileData(prev => ({
        ...prev,
        [currentSection]: [...prev[currentSection], newItem]
      }))
      toast.success('Item added successfully')
    }
    
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
  
  if (!isVisible || isLoading || !isAuthenticated || !user) {
    return null
  }
  
  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Basic Information'
      case 2: return 'Professional Licenses'
      case 3: return 'Certificates'
      case 4: return 'Certification Specialties'
      case 5: return 'Work History'
      case 6: return 'Education History'
      case 7: return 'References'
      case 8: return 'Complete'
      default: return ''
    }
  }
  
  const canProceed = currentStep === 1 
    ? (profileData.name && profileData.email)
    : true
  
  // Render Details Page (Add/Edit Form)
  if (showDetailsPage && currentSection) {
    const Icon = getSectionIcon(currentSection)
    const sectionTitle = getSectionTitle(currentSection)
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setShowDetailsPage(false)
                    setEditingItem(null)
                    setCurrentSection(null)
                    setFormData({})
                  }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
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
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
              <div className="max-w-2xl mx-auto space-y-4">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Number
                      </label>
                      <input
                        type="text"
                        value={formData.number || ''}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        placeholder="Enter license number"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <select
                        value={formData.state || ''}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      >
                        <option value="">Select state</option>
                        {US_STATES.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        value={formData.expiration || ''}
                        onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}
                
                {currentSection === 'certificates' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.type || ''}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      >
                        <option value="">Select certificate type</option>
                        {CERTIFICATE_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Number
                      </label>
                      <input
                        type="text"
                        value={formData.number || ''}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        placeholder="Enter certificate number"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        value={formData.expiration || ''}
                        onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}
                
                {currentSection === 'specialties' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certification <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.certification || ''}
                        onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      >
                        <option value="">Select certification</option>
                        {CERTIFICATIONS.map(cert => (
                          <option key={cert} value={cert}>{cert}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialty <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.specialty || ''}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      >
                        <option value="">Select specialty</option>
                        {SPECIALTIES.map(spec => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                
                {currentSection === 'workHistory' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facility/Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter facility or company name"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit/Position
                      </label>
                      <input
                        type="text"
                        value={formData.unit || ''}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        placeholder="Enter unit or position"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={formData.startDate || ''}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={formData.endDate || ''}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          disabled={formData.currentlyWorking}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="currentlyWorking"
                        checked={formData.currentlyWorking || false}
                        onChange={(e) => setFormData({ ...formData, currentlyWorking: e.target.checked })}
                        className="w-4 h-4 text-primary-600 rounded"
                      />
                      <label htmlFor="currentlyWorking" className="text-sm text-gray-700">
                        I currently work here
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Agency (if applicable)
                      </label>
                      <input
                        type="text"
                        value={formData.agency || ''}
                        onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                        placeholder="Enter agency name"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter job description"
                        rows={3}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Charge Experience
                      </label>
                      <input
                        type="text"
                        value={formData.chargeExperience || ''}
                        onChange={(e) => setFormData({ ...formData, chargeExperience: e.target.value })}
                        placeholder="Enter charge experience"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}
                
                {currentSection === 'education' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        School/Institution Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter school or institution name"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course/Program
                      </label>
                      <input
                        type="text"
                        value={formData.course || ''}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        placeholder="Enter course or program"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status || 'Graduated'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Graduated' | 'Did Not Graduate' })}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      >
                        <option value="Graduated">Graduated</option>
                        <option value="Did Not Graduate">Did Not Graduate</option>
                      </select>
                    </div>
                    
                    {formData.status === 'Graduated' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Graduation Date
                          </label>
                          <input
                            type="date"
                            value={formData.graduated || ''}
                            onChange={(e) => setFormData({ ...formData, graduated: e.target.value })}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Degree
                          </label>
                          <input
                            type="text"
                            value={formData.degree || ''}
                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                            placeholder="Enter degree (e.g., Bachelor of Science)"
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
                
                {currentSection === 'references' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter reference name"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter job title"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Enter company name"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={formData.startDate || ''}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={formData.endDate || ''}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-white">
              <div className="max-w-2xl mx-auto flex items-center gap-3">
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
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }
  
  // Render Main Flow
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
                <div className="flex items-center ml-2 sm:ml-4">
                  <Image
                    src="/logo.svg"
                    alt="The Gypsy Nurse"
                    width={180}
                    height={60}
                    className="h-12 sm:h-16 w-auto"
                  />
                </div>
                <button
                  onClick={handleClose}
                  className="relative p-2.5 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Progress Bar */}
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
              <div className="max-w-2xl mx-auto">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Basic Information
                      </h1>
                      <p className="text-lg text-gray-600 mb-4">
                        Let's start with your basic profile information
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Enter your address"
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={profileData.dob}
                          onChange={(e) => setProfileData(prev => ({ ...prev, dob: e.target.value }))}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SSN (Last 4 digits)
                        </label>
                        <input
                          type="text"
                          value={profileData.ssn}
                          onChange={(e) => setProfileData(prev => ({ ...prev, ssn: e.target.value }))}
                          placeholder="****"
                          maxLength={4}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2-7: Section Listings */}
                {currentStep >= 2 && currentStep <= 7 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="sticky top-0 bg-white z-10 pb-4 pt-2">
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        {getStepTitle(currentStep)}
                      </h1>
                      <p className="text-lg text-gray-600 mb-4">
                        Manage your {getStepTitle(currentStep).toLowerCase()}
                      </p>
                    </div>
                    
                    {/* Add Button */}
                    <div className="mb-6">
                      <button
                        onClick={() => {
                          const sectionMap: { [key: number]: SectionType } = {
                            2: 'licenses',
                            3: 'certificates',
                            4: 'specialties',
                            5: 'workHistory',
                            6: 'education',
                            7: 'references'
                          }
                          openAddForm(sectionMap[currentStep])
                        }}
                        className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        Add {getStepTitle(currentStep).slice(0, -1)}
                      </button>
                    </div>
                    
                    {/* List Items */}
                    {(() => {
                      const sectionMap: { [key: number]: SectionType } = {
                        2: 'licenses',
                        3: 'certificates',
                        4: 'specialties',
                        5: 'workHistory',
                        6: 'education',
                        7: 'references'
                      }
                      const section = sectionMap[currentStep]
                      const items = profileData[section] || []
                      const Icon = getSectionIcon(section)
                      
                      if (items.length === 0) {
                        return (
                          <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Icon className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-600">No items added yet. Click the button above to add your first item.</p>
                          </div>
                        )
                      }
                      
                      return (
                        <div className="space-y-3">
                          {items.map((item: any) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  {section === 'licenses' && (
                                    <>
                                      <h3 className="font-semibold text-gray-900 mb-1">{item.type}</h3>
                                      <p className="text-sm text-gray-600">{item.state} • {item.number}</p>
                                      {item.expiration && (
                                        <p className="text-xs text-gray-500 mt-1">Expires: {item.expiration}</p>
                                      )}
                                    </>
                                  )}
                                  {section === 'certificates' && (
                                    <>
                                      <h3 className="font-semibold text-gray-900 mb-1">{item.type}</h3>
                                      <p className="text-sm text-gray-600">{item.number}</p>
                                      {item.expiration && (
                                        <p className="text-xs text-gray-500 mt-1">Expires: {item.expiration}</p>
                                      )}
                                    </>
                                  )}
                                  {section === 'specialties' && (
                                    <>
                                      <h3 className="font-semibold text-gray-900 mb-1">{item.certification}</h3>
                                      <p className="text-sm text-gray-600">{item.specialty}</p>
                                    </>
                                  )}
                                  {section === 'workHistory' && (
                                    <>
                                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                      <p className="text-sm text-gray-600">{item.unit}</p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {item.startDate} - {item.currentlyWorking ? 'Present' : item.endDate}
                                      </p>
                                    </>
                                  )}
                                  {section === 'education' && (
                                    <>
                                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                      <p className="text-sm text-gray-600">{item.course} • {item.status}</p>
                                      {item.graduated && (
                                        <p className="text-xs text-gray-500 mt-1">Graduated: {item.graduated}</p>
                                      )}
                                    </>
                                  )}
                                  {section === 'references' && (
                                    <>
                                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                                      <p className="text-sm text-gray-600">{item.title} at {item.company}</p>
                                      <p className="text-xs text-gray-500 mt-1">{item.phone}</p>
                                    </>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-2 ml-4">
                                  <button
                                    onClick={() => {
                                      const sectionMap: { [key: number]: SectionType } = {
                                        2: 'licenses',
                                        3: 'certificates',
                                        4: 'specialties',
                                        5: 'workHistory',
                                        6: 'education',
                                        7: 'references'
                                      }
                                      openEditForm(sectionMap[currentStep], item)
                                    }}
                                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      const sectionMap: { [key: number]: SectionType } = {
                                        2: 'licenses',
                                        3: 'certificates',
                                        4: 'specialties',
                                        5: 'workHistory',
                                        6: 'education',
                                        7: 'references'
                                      }
                                      if (confirm('Are you sure you want to delete this item?')) {
                                        handleDeleteItem(sectionMap[currentStep], item.id)
                                      }
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )
                    })()}
                  </motion.div>
                )}
                
                {/* Step 8: Complete */}
                {currentStep === 8 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12"
                  >
                    <div className="mb-6">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-12 h-12 text-white" strokeWidth={3} />
                      </motion.div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Profile Complete!
                      </h1>
                      <p className="text-lg text-gray-600">
                        You've successfully completed your profile setup
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-left max-w-md mx-auto">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>Basic information added</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{profileData.licenses.length} license(s) added</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{profileData.certificates.length} certificate(s) added</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{profileData.specialties.length} specialty(ies) added</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{profileData.workHistory.length} work history(ies) added</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{profileData.education.length} education(s) added</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{profileData.references.length} reference(s) added</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Footer */}
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
                  onClick={handleCancelClose}
                />
                <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="w-full max-w-md pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden p-8">
                      <div className="flex justify-center mb-6">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-primary-100 rounded-2xl blur-xl opacity-60" />
                          <div className="relative w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <X className="w-8 h-8 text-white" />
                          </div>
                        </motion.div>
                      </div>
                      <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Leave Profile Setup?
                      </h3>
                      <p className="text-center text-gray-600 mb-6">
                        Are you sure you want to leave? Your progress will be saved.
                      </p>
                      <div className="mb-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCancelClose}
                          className="flex-1 px-6 py-3.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all shadow-sm"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConfirmClose}
                          className="relative flex-1 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold transition-all shadow-lg overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                          />
                          <span className="relative z-10">Leave</span>
                        </motion.button>
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
