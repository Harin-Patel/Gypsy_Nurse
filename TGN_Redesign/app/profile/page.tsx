'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Mail, MapPin, Calendar, Shield, Award, Briefcase, 
  GraduationCap, Users, Edit, Download, Upload,
  Plus, Trash2, Clock, ArrowUpRight, FileX, Inbox, X,
  Camera, Image as ImageIcon, ChevronDown, ChevronLeft
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useDisableBodyScroll } from '@/utils/useDisableBodyScroll'
import { getProfilePhoto, setProfilePhoto as saveProfilePhoto, removeProfilePhoto as deleteProfilePhoto, getProfilePhotoWithFallback } from '@/utils/profilePhoto'
import { compressImage } from '@/utils/imageCompression'
import { SAMPLE_JOBS } from '@/utils/jobData'

// Constants from onboarding
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

const SCHOOLS = [
  'University of California, Los Angeles',
  'Johns Hopkins University',
  'University of Pennsylvania',
  'Duke University',
  'University of Michigan',
  'New York University',
  'Columbia University',
  'University of North Carolina',
  'Ohio State University',
  'University of Texas',
  'University of Washington',
  'Emory University',
  'Vanderbilt University',
  'Georgetown University',
  'Boston University',
  'University of Southern California',
  'Northwestern University',
  'University of Chicago',
  'Yale University',
  'Harvard University'
]

const COURSE_OF_STUDY = [
  'Bachelor of Science in Nursing (BSN)',
  'Associate Degree in Nursing (ADN)',
  'Master of Science in Nursing (MSN)',
  'Doctor of Nursing Practice (DNP)',
  'Licensed Practical Nurse (LPN) Program',
  'Diploma in Nursing',
  'Bachelor of Science in Health Sciences',
  'Master of Public Health (MPH)',
  'Doctor of Philosophy in Nursing (PhD)'
]

const DEGREES = [
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate',
  'Certificate',
  'Diploma'
]

const REFERENCE_JOB_TITLES = [
  'Manager',
  'Supervisor',
  'Director',
  'Charge Nurse',
  'Clinical Manager',
  'Unit Manager',
  'Department Head',
  'Nurse Manager',
  'Assistant Manager',
  'Clinical Coordinator',
  'Head Nurse',
  'Lead Nurse',
  'Administrator',
  'Chief Nursing Officer',
  'Vice President',
  'Other'
]

export default function ProfilePage() {
  const isMobile = useIsMobile()
  const router = useRouter()
  const { user: authUser } = useAuth()
  const [activeTab, setActiveTab] = useState('Professional Licenses')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAddCertificateModal, setShowAddCertificateModal] = useState(false)
  const [showAddSpecialtyModal, setShowAddSpecialtyModal] = useState(false)
  const [showAddWorkHistoryModal, setShowAddWorkHistoryModal] = useState(false)
  const [showAddEducationModal, setShowAddEducationModal] = useState(false)
  const [showAddReferenceModal, setShowAddReferenceModal] = useState(false)
  
  // Edit Modal States
  const [showEditLicenseModal, setShowEditLicenseModal] = useState(false)
  const [showEditCertificateModal, setShowEditCertificateModal] = useState(false)
  const [showEditSpecialtyModal, setShowEditSpecialtyModal] = useState(false)
  const [showEditWorkHistoryModal, setShowEditWorkHistoryModal] = useState(false)
  const [showEditEducationModal, setShowEditEducationModal] = useState(false)
  const [showEditReferenceModal, setShowEditReferenceModal] = useState(false)
  
  // Selected Item for Editing
  const [selectedItem, setSelectedItem] = useState<any>(null)
  
  // Delete Confirmation Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState<any>(null)
  const [deleteSection, setDeleteSection] = useState<string>('')
  
  // Profile Photo States
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  
  // State Dropdown - Initialize from user data
  const [selectedState, setSelectedState] = useState(() => {
    if (authUser?.state) {
      // Check if already in "XX - State Name" format
      if (authUser.state.includes(' - ')) {
        return authUser.state
      }
      // Map state names to abbreviations (common states)
      const stateAbbreviations: { [key: string]: string } = {
        'Maryland': 'MD',
        'California': 'CA',
        'New York': 'NY',
        'Texas': 'TX',
        'Florida': 'FL',
        'Illinois': 'IL',
        'Pennsylvania': 'PA',
        'Ohio': 'OH',
        'Georgia': 'GA',
        'North Carolina': 'NC',
        'Michigan': 'MI',
        'New Jersey': 'NJ',
        'Virginia': 'VA',
        'Washington': 'WA',
        'Arizona': 'AZ',
        'Massachusetts': 'MA',
        'Tennessee': 'TN',
        'Indiana': 'IN',
        'Missouri': 'MO',
        'Colorado': 'CO'
      }
      const abbreviation = stateAbbreviations[authUser.state] || authUser.state.substring(0, 2).toUpperCase()
      return `${abbreviation} - ${authUser.state}`
    }
    return 'MD - Maryland'
  })
  
  // Update selectedState when authUser changes
  useEffect(() => {
    if (authUser?.state) {
      if (authUser.state.includes(' - ')) {
        setSelectedState(authUser.state)
      } else {
        const stateAbbreviations: { [key: string]: string } = {
          'Maryland': 'MD',
          'California': 'CA',
          'New York': 'NY',
          'Texas': 'TX',
          'Florida': 'FL',
          'Illinois': 'IL',
          'Pennsylvania': 'PA',
          'Ohio': 'OH',
          'Georgia': 'GA',
          'North Carolina': 'NC',
          'Michigan': 'MI',
          'New Jersey': 'NJ',
          'Virginia': 'VA',
          'Washington': 'WA',
          'Arizona': 'AZ',
          'Massachusetts': 'MA',
          'Tennessee': 'TN',
          'Indiana': 'IN',
          'Missouri': 'MO',
          'Colorado': 'CO'
        }
        const abbreviation = stateAbbreviations[authUser.state] || authUser.state.substring(0, 2).toUpperCase()
        setSelectedState(`${abbreviation} - ${authUser.state}`)
      }
    }
  }, [authUser?.state])
  
  // Disable body scroll when any modal is open
  useDisableBodyScroll(showEditModal)
  useDisableBodyScroll(showAddModal)
  useDisableBodyScroll(showAddCertificateModal)
  useDisableBodyScroll(showAddSpecialtyModal)
  useDisableBodyScroll(showAddWorkHistoryModal)
  useDisableBodyScroll(showAddEducationModal)
  useDisableBodyScroll(showAddReferenceModal)
  useDisableBodyScroll(showEditLicenseModal)
  useDisableBodyScroll(showEditCertificateModal)
  useDisableBodyScroll(showEditSpecialtyModal)
  useDisableBodyScroll(showEditWorkHistoryModal)
  useDisableBodyScroll(showEditEducationModal)
  useDisableBodyScroll(showEditReferenceModal)
  useDisableBodyScroll(showDeleteModal)
  useDisableBodyScroll(showPhotoUploadModal)
  
  // Add Modal Form States
  const [addLicenseType, setAddLicenseType] = useState('')
  const [addLicenseNumber, setAddLicenseNumber] = useState('')
  const [addLicenseState, setAddLicenseState] = useState('')
  const [addLicenseExpiration, setAddLicenseExpiration] = useState('')
  
  const [addCertificateType, setAddCertificateType] = useState('')
  const [addCertificateNumber, setAddCertificateNumber] = useState('')
  const [addCertificateExpiration, setAddCertificateExpiration] = useState('')
  
  const [addSpecialtyCertification, setAddSpecialtyCertification] = useState('')
  const [addSpecialtySpecialty, setAddSpecialtySpecialty] = useState('')
  
  const [addEducationTitle, setAddEducationTitle] = useState('')
  const [addEducationCourse, setAddEducationCourse] = useState('')
  const [addEducationGraduated, setAddEducationGraduated] = useState('')
  const [addEducationDegree, setAddEducationDegree] = useState('')
  
  const [addReferenceName, setAddReferenceName] = useState('')
  const [addReferenceTitle, setAddReferenceTitle] = useState('')
  const [addReferenceWorkHistoryId, setAddReferenceWorkHistoryId] = useState('')
  const [addReferencePhone, setAddReferencePhone] = useState('')
  const [addReferenceEmail, setAddReferenceEmail] = useState('')
  
  // Work History Modal States (Add)
  const [workHistoryTitle, setWorkHistoryTitle] = useState('')
  const [workHistoryUnit, setWorkHistoryUnit] = useState('')
  const [workHistoryStartDate, setWorkHistoryStartDate] = useState('')
  const [workHistoryEndDate, setWorkHistoryEndDate] = useState('')
  const [currentlyWorking, setCurrentlyWorking] = useState(false)
  const [workHistoryAgency, setWorkHistoryAgency] = useState('')
  const [workHistoryDescription, setWorkHistoryDescription] = useState('')
  const [chargeExperience, setChargeExperience] = useState(false)
  const [chargeExperienceComment, setChargeExperienceComment] = useState('')
  const [travelAssignment, setTravelAssignment] = useState(false)
  const [perDiem, setPerDiem] = useState(false)
  
  // Work History Modal States (Edit)
  const [editWorkHistoryTitle, setEditWorkHistoryTitle] = useState('')
  const [editWorkHistoryUnit, setEditWorkHistoryUnit] = useState('')
  const [editWorkHistoryStartDate, setEditWorkHistoryStartDate] = useState('')
  const [editWorkHistoryEndDate, setEditWorkHistoryEndDate] = useState('')
  const [editCurrentlyWorking, setEditCurrentlyWorking] = useState(false)
  const [editWorkHistoryAgency, setEditWorkHistoryAgency] = useState('')
  const [editWorkHistoryDescription, setEditWorkHistoryDescription] = useState('')
  const [editChargeExperience, setEditChargeExperience] = useState(false)
  const [editChargeExperienceComment, setEditChargeExperienceComment] = useState('')
  const [editTravelAssignment, setEditTravelAssignment] = useState(false)
  const [editPerDiem, setEditPerDiem] = useState(false)
  
  // Education Modal States (Add)
  const [didGraduate, setDidGraduate] = useState(false)
  
  // Education Modal States (Edit)
  const [editDidGraduate, setEditDidGraduate] = useState(false)
  
  // Edit Modal Form States
  const [editLicenseType, setEditLicenseType] = useState('')
  const [editLicenseNumber, setEditLicenseNumber] = useState('')
  const [editLicenseState, setEditLicenseState] = useState('')
  const [editLicenseExpiration, setEditLicenseExpiration] = useState('')
  
  const [editCertificateType, setEditCertificateType] = useState('')
  const [editCertificateNumber, setEditCertificateNumber] = useState('')
  const [editCertificateExpiration, setEditCertificateExpiration] = useState('')
  
  const [editSpecialtyCertification, setEditSpecialtyCertification] = useState('')
  const [editSpecialtySpecialty, setEditSpecialtySpecialty] = useState('')
  
  const [editEducationTitle, setEditEducationTitle] = useState('')
  const [editEducationCourse, setEditEducationCourse] = useState('')
  const [editEducationGraduated, setEditEducationGraduated] = useState('')
  const [editEducationDegree, setEditEducationDegree] = useState('')
  
  const [editReferenceName, setEditReferenceName] = useState('')
  const [editReferenceTitle, setEditReferenceTitle] = useState('')
  const [editReferenceWorkHistoryId, setEditReferenceWorkHistoryId] = useState('')
  const [editReferencePhone, setEditReferencePhone] = useState('')
  const [editReferenceEmail, setEditReferenceEmail] = useState('')

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

  // Searchable Dropdown Component
  const SearchableDropdown = ({ 
    value, 
    onChange, 
    placeholder = "Search...", 
    options, 
    disabled = false 
  }: { 
    value: string, 
    onChange: (value: string) => void, 
    placeholder?: string, 
    options: string[], 
    disabled?: boolean 
  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0, isAbove: false })
    const [isPositionCalculated, setIsPositionCalculated] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Calculate dropdown position
    useEffect(() => {
      if (isOpen && containerRef.current && !isPositionCalculated) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - containerRect.bottom
        const spaceAbove = containerRect.top
        const estimatedDropdownHeight = Math.min(256, filteredOptions.length * 48 + 16)
        const isAbove = spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow
        
        setDropdownPosition({
          top: isAbove ? containerRect.top - estimatedDropdownHeight - 8 : containerRect.bottom + 8,
          left: containerRect.left,
          width: containerRect.width,
          isAbove
        })
        setIsPositionCalculated(true)
      }
    }, [isOpen, filteredOptions.length, isPositionCalculated])

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && containerRef.current && 
            !dropdownRef.current.contains(event.target as Node) && 
            !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setIsPositionCalculated(false)
          setSearchTerm('')
        }
      }
      
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    // Focus input when dropdown opens
    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus()
      }
    }, [isOpen])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setSearchTerm(newValue)
      onChange(newValue)
      if (!isOpen) {
        setIsOpen(true)
      }
    }

    const handleInputFocus = () => {
      setIsOpen(true)
    }

    const handleOptionClick = (option: string) => {
      onChange(option)
      setSearchTerm('')
      setIsOpen(false)
      setIsPositionCalculated(false)
    }

    return (
      <div className="relative" ref={containerRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400 pr-10"
          />
          <ChevronDown 
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && !disabled && isPositionCalculated && filteredOptions.length > 0 && (
          <>
            <div 
              className="fixed inset-0 z-[100004]" 
              style={{ pointerEvents: 'auto', backgroundColor: 'transparent' }}
              onClick={() => {
                setIsOpen(false)
                setIsPositionCalculated(false)
                setSearchTerm('')
              }}
            />
            <div
              ref={dropdownRef}
              style={{
                position: 'fixed',
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
              }}
              className="bg-white/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-[100005] max-h-64 overflow-y-auto"
            >
              <div className="p-2 space-y-1">
                {filteredOptions.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all text-left ${
                      value === option
                        ? 'bg-primary-50 text-primary-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
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
    
    // Extract options from children
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
    
    // Recalculate dropdown position on window resize
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
        requestAnimationFrame(() => {
          if (selectedOptionRef.current && dropdownRef.current) {
            selectedOptionRef.current.scrollIntoView({
              behavior: 'auto',
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

  // Helper function to save user data to localStorage
  const saveUserDataToLocalStorage = (section: string, newItem: any, isUpdate: boolean = false, itemId?: string) => {
    if (typeof window === 'undefined') return
    
    try {
      const storedUser = localStorage.getItem('auth_user')
      if (!storedUser) return
      
      const user = JSON.parse(storedUser)
      
      // Initialize section array if it doesn't exist
      if (!user[section]) {
        user[section] = []
      }
      
      if (isUpdate && itemId) {
        // Update existing item
        user[section] = user[section].map((item: any) => 
          item.id === itemId ? { ...newItem, id: itemId } : item
        )
      } else {
        // Add new item
        const itemWithId = {
          ...newItem,
          id: newItem.id || `${section}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }
        user[section] = [...(user[section] || []), itemWithId]
      }
      
      // Save back to localStorage
      localStorage.setItem('auth_user', JSON.stringify(user))
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('userDataUpdated', { detail: { section, user } }))
      
      // Force a page reload to refresh the data
      window.location.reload()
    } catch (error) {
      console.error('Error saving user data:', error)
      toast.error('Failed to save data. Please try again.')
    }
  }

  // Validation functions
  const isValidPhone = (phone: string): boolean => {
    return /^\d{10}$/.test(phone.replace(/\D/g, ''))
  }

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Check if form data is valid (for enabling/disabling button) without showing errors
  const isFormDataValid = (section: string, data: any): boolean => {
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
        if (!data.unit?.trim()) return false
        if (!data.startDate?.trim()) return false
        // If start date is provided, it shouldn't be in the future
        if (data.startDate && isDateInFuture(data.startDate)) return false
        // If not currently working, end date is required
        if (!data.currentlyWorking) {
          if (!data.endDate?.trim()) return false
          if (isDateInFuture(data.endDate)) return false
          if (data.startDate && isEndDateBeforeStartDate(data.startDate, data.endDate)) return false
        }
        // If travel assignment is checked, agency is required
        if (data.travelAssignment && !data.agency?.trim()) return false
        // If charge experience is checked, comment is required
        if (data.chargeExperience && !data.chargeExperienceComment?.trim()) return false
        return true
      case 'education':
        if (!data.title?.trim()) return false
        if (!data.course?.trim()) return false
        // If didGraduate is checked, graduation date and degree are required
        if (data.didGraduate) {
          if (!data.graduated?.trim()) return false
          if (!data.degree?.trim()) return false
        }
        return true
      case 'references':
        if (!data.name?.trim()) return false
        if (!data.title?.trim()) return false
        // At least one contact method (phone or email) is required
        if (!data.phone?.trim() && !data.email?.trim()) return false
        // If phone is provided, it must be exactly 10 digits
        if (data.phone?.trim() && !isValidPhone(data.phone)) return false
        // If email is provided, it must be valid format
        if (data.email?.trim() && !isValidEmail(data.email)) return false
        return true
      default:
        return true
    }
  }

  // Initialize edit states when modals open
  useEffect(() => {
    if (showEditWorkHistoryModal && selectedItem) {
      setEditWorkHistoryTitle(selectedItem.facility || '')
      setEditWorkHistoryUnit(selectedItem.unit || '')
      setEditWorkHistoryStartDate(selectedItem.startDate || '')
      setEditWorkHistoryEndDate(selectedItem.endDate || '')
      setEditCurrentlyWorking(selectedItem.period?.includes('Present') || false)
      setEditWorkHistoryAgency(selectedItem.agency || '')
      setEditWorkHistoryDescription(selectedItem.description || '')
      setEditChargeExperience(!!(selectedItem.chargeExperience || selectedItem.chargeExperienceComment))
      setEditChargeExperienceComment(selectedItem.chargeExperienceComment || selectedItem.chargeExperience || '')
      setEditTravelAssignment(selectedItem.travelAssignment || false)
      setEditPerDiem(selectedItem.perDiem || false)
    }
  }, [showEditWorkHistoryModal, selectedItem])

  useEffect(() => {
    if (showEditLicenseModal && selectedItem) {
      setEditLicenseType(selectedItem.type || selectedItem.title || '')
      setEditLicenseNumber(selectedItem.number || '')
      setEditLicenseState(selectedItem.state || '')
      setEditLicenseExpiration(selectedItem.expiration || '')
    }
  }, [showEditLicenseModal, selectedItem])

  useEffect(() => {
    if (showEditCertificateModal && selectedItem) {
      setEditCertificateType(selectedItem.type || selectedItem.title || '')
      setEditCertificateNumber(selectedItem.number || '')
      setEditCertificateExpiration(selectedItem.expiration || '')
    }
  }, [showEditCertificateModal, selectedItem])

  useEffect(() => {
    if (showEditSpecialtyModal && selectedItem) {
      setEditSpecialtyCertification(selectedItem.certification || selectedItem.title || '')
      setEditSpecialtySpecialty(selectedItem.specialty || '')
    }
  }, [showEditSpecialtyModal, selectedItem])

  useEffect(() => {
    if (showEditEducationModal && selectedItem) {
      setEditDidGraduate(!!(selectedItem.graduated || selectedItem.degree))
      setEditEducationTitle(selectedItem.title || '')
      setEditEducationCourse(selectedItem.course || '')
      setEditEducationGraduated(selectedItem.graduated || '')
      setEditEducationDegree(selectedItem.degree || '')
    }
  }, [showEditEducationModal, selectedItem])

  useEffect(() => {
    if (showEditReferenceModal && selectedItem) {
      setEditReferenceName(selectedItem.name || '')
      setEditReferenceTitle(selectedItem.title || '')
      setEditReferenceWorkHistoryId(selectedItem.workHistoryId || '')
      setEditReferencePhone(selectedItem.phone || '')
      setEditReferenceEmail(selectedItem.email || '')
    }
  }, [showEditReferenceModal, selectedItem])

  // Delete Handler
  const handleDeleteClick = (item: any, section: string) => {
    setDeleteItem(item)
    setDeleteSection(section)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    // Here you would typically call an API to delete the item
    console.log(`Deleting ${deleteSection}:`, deleteItem)
    toast.success(`${deleteSection} deleted successfully`)
    setShowDeleteModal(false)
    setDeleteItem(null)
    setDeleteSection('')
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setDeleteItem(null)
    setDeleteSection('')
  }

  // Update Handlers for Edit Modals
  const handleUpdateLicense = () => {
    const formData = {
      type: editLicenseType,
      number: editLicenseNumber,
      state: editLicenseState,
      expiration: editLicenseExpiration
    }
    if (!isFormDataValid('licenses', formData)) {
      if (!editLicenseType?.trim()) {
        toast.error('Please select license type')
        return
      }
      if (editLicenseExpiration?.trim() && isDateInPast(editLicenseExpiration)) {
        toast.error('Expiration date cannot be in the past')
        return
      }
      return
    }
    toast.success('License updated successfully!')
    setShowEditLicenseModal(false)
    setSelectedItem(null)
  }

  const handleUpdateCertificate = () => {
    const formData = {
      type: editCertificateType,
      number: editCertificateNumber,
      expiration: editCertificateExpiration
    }
    if (!isFormDataValid('certificates', formData)) {
      if (!editCertificateType?.trim()) {
        toast.error('Please select certificate type')
        return
      }
      if (editCertificateExpiration?.trim() && isDateInPast(editCertificateExpiration)) {
        toast.error('Expiration date cannot be in the past')
        return
      }
      return
    }
    toast.success('Certificate updated successfully!')
    setShowEditCertificateModal(false)
    setSelectedItem(null)
  }

  const handleUpdateSpecialty = () => {
    const formData = {
      certification: editSpecialtyCertification,
      specialty: editSpecialtySpecialty
    }
    if (!isFormDataValid('specialties', formData)) {
      if (!editSpecialtyCertification?.trim()) {
        toast.error('Please select a certification')
        return
      }
      if (!editSpecialtySpecialty?.trim()) {
        toast.error('Please select a specialty')
        return
      }
      const availableSpecialties = CERTIFICATION_SPECIALTIES_MAP[editSpecialtyCertification] || []
      if (availableSpecialties.length === 0) {
        toast.error('No specialties available for the selected certification')
        return
      }
      if (!availableSpecialties.includes(editSpecialtySpecialty)) {
        toast.error('Selected specialty is not available for the selected certification')
        return
      }
      return
    }
    toast.success('Specialty updated successfully!')
    setShowEditSpecialtyModal(false)
    setSelectedItem(null)
  }

  // Validate work history form data
  const validateWorkHistory = (data: {
    title: string
    unit: string
    startDate: string
    endDate: string
    currentlyWorking: boolean
    travelAssignment: boolean
    agency: string
    chargeExperience: boolean
    chargeExperienceComment: string
  }): boolean => {
    if (!data.title?.trim()) {
      toast.error('Please enter employer full name')
      return false
    }
    if (!data.unit?.trim()) {
      toast.error('Please enter unit')
      return false
    }
    if (!data.startDate?.trim()) {
      toast.error('Please select start date')
      return false
    }
    // Validate start date is not in the future
    if (data.startDate && isDateInFuture(data.startDate)) {
      toast.error('Start date cannot be in the future')
      return false
    }
    // If not currently working, end date is required
    if (!data.currentlyWorking) {
      if (!data.endDate?.trim()) {
        toast.error('Please select end date')
        return false
      }
      if (isDateInFuture(data.endDate)) {
        toast.error('End date cannot be in the future')
        return false
      }
      if (data.startDate && isEndDateBeforeStartDate(data.startDate, data.endDate)) {
        toast.error('End date cannot be before start date')
        return false
      }
    }
    // If travel assignment is checked, agency is required
    if (data.travelAssignment && !data.agency?.trim()) {
      toast.error('Please enter staffing agency name')
      return false
    }
    // If charge experience is checked, comment is required
    if (data.chargeExperience && !data.chargeExperienceComment?.trim()) {
      toast.error('Please describe your charge experience')
      return false
    }
    return true
  }

  const handleAddWorkHistory = () => {
    const workHistoryData = {
      title: workHistoryTitle,
      unit: workHistoryUnit,
      startDate: workHistoryStartDate,
      endDate: workHistoryEndDate,
      currentlyWorking: currentlyWorking,
      travelAssignment: travelAssignment,
      agency: workHistoryAgency,
      description: workHistoryDescription,
      chargeExperience: chargeExperience,
      chargeExperienceComment: chargeExperienceComment,
      perDiem: perDiem
    }

    if (!validateWorkHistory(workHistoryData)) {
      return
    }

    // Save to localStorage
    saveUserDataToLocalStorage('workHistory', workHistoryData)
    toast.success('Work history added successfully')
    setShowAddWorkHistoryModal(false)
    // Reset all form fields
    setWorkHistoryTitle('')
    setWorkHistoryUnit('')
    setWorkHistoryStartDate('')
    setWorkHistoryEndDate('')
    setCurrentlyWorking(false)
    setWorkHistoryAgency('')
    setWorkHistoryDescription('')
    setChargeExperience(false)
    setChargeExperienceComment('')
    setTravelAssignment(false)
    setPerDiem(false)
  }

  const handleUpdateWorkHistory = () => {
    const workHistoryData = {
      title: editWorkHistoryTitle,
      unit: editWorkHistoryUnit,
      startDate: editWorkHistoryStartDate,
      endDate: editWorkHistoryEndDate,
      currentlyWorking: editCurrentlyWorking,
      travelAssignment: editTravelAssignment,
      agency: editWorkHistoryAgency,
      chargeExperience: editChargeExperience,
      chargeExperienceComment: editChargeExperienceComment
    }

    if (!validateWorkHistory(workHistoryData)) {
      return
    }

    // Here you would typically call an API to update the work history
    toast.success('Work history updated successfully!')
    setShowEditWorkHistoryModal(false)
    setSelectedItem(null)
    // Reset all form fields
    setEditWorkHistoryTitle('')
    setEditWorkHistoryUnit('')
    setEditWorkHistoryStartDate('')
    setEditWorkHistoryEndDate('')
    setEditCurrentlyWorking(false)
    setEditWorkHistoryAgency('')
    setEditWorkHistoryDescription('')
    setEditChargeExperience(false)
    setEditChargeExperienceComment('')
    setEditTravelAssignment(false)
    setEditPerDiem(false)
  }

  const handleUpdateEducation = () => {
    const formData = {
      title: editEducationTitle,
      course: editEducationCourse,
      didGraduate: editDidGraduate,
      graduated: editEducationGraduated,
      degree: editEducationDegree
    }
    if (!isFormDataValid('education', formData)) {
      if (!editEducationTitle?.trim()) {
        toast.error('Please enter school name')
        return
      }
      if (!editEducationCourse?.trim()) {
        toast.error('Please select course of study')
        return
      }
      if (editDidGraduate) {
        if (!editEducationGraduated?.trim()) {
          toast.error('Please select graduation date')
          return
        }
        if (!editEducationDegree?.trim()) {
          toast.error('Please select degree')
          return
        }
      }
      return
    }
    toast.success('Education updated successfully!')
    setShowEditEducationModal(false)
    setSelectedItem(null)
    setEditDidGraduate(false)
  }

  const handleUpdateReference = () => {
    const formData = {
      name: editReferenceName,
      title: editReferenceTitle,
      workHistoryId: editReferenceWorkHistoryId,
      phone: editReferencePhone,
      email: editReferenceEmail
    }
    if (!isFormDataValid('references', formData)) {
      if (!editReferenceName?.trim()) {
        toast.error('Please enter full name')
        return
      }
      if (!editReferenceTitle?.trim()) {
        toast.error('Please select reference job title')
        return
      }
      if (!editReferencePhone?.trim() && !editReferenceEmail?.trim()) {
        toast.error('Please provide at least one contact method (phone number or email)')
        return
      }
      if (editReferencePhone?.trim() && !isValidPhone(editReferencePhone)) {
        toast.error('Please enter a valid 10-digit phone number')
        return
      }
      if (editReferenceEmail?.trim() && !isValidEmail(editReferenceEmail)) {
        toast.error('Please enter a valid email address')
        return
      }
      return
    }
    toast.success('Professional Reference updated successfully!')
    setShowEditReferenceModal(false)
    setSelectedItem(null)
  }

  // Profile Photo Handlers
  const handlePhotoClick = () => {
    // Load current photo when opening modal
    const currentPhoto = getProfilePhoto()
    if (currentPhoto) {
      setPhotoPreview(currentPhoto)
    }
    setShowPhotoUploadModal(true)
  }

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB before compression)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setPhotoFile(file)
    
    try {
      // Compress and create preview
      const compressedImage = await compressImage(file, {
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.85, // High quality to avoid dull appearance
        maxSizeMB: 1
      })
      setPhotoPreview(compressedImage)
    } catch (error) {
      console.error('Error compressing image:', error)
      toast.error('Failed to process image. Please try again.')
      // Fallback to original if compression fails
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSavePhoto = () => {
    if (!photoPreview) return

    // Save to localStorage using utility function
    saveProfilePhoto(photoPreview)
    setProfilePhoto(photoPreview)
    setShowPhotoUploadModal(false)
    setPhotoFile(null)
    setPhotoPreview(null)
    toast.success('Profile photo updated successfully')
  }

  const handleRemovePhoto = () => {
    deleteProfilePhoto()
    setProfilePhoto(null)
    setShowPhotoUploadModal(false)
    setPhotoFile(null)
    setPhotoPreview(null)
    toast.success('Profile photo removed successfully')
  }

  const handleCancelPhotoUpload = () => {
    setShowPhotoUploadModal(false)
    // Reset to current photo if user cancels without saving
    const currentPhoto = getProfilePhoto()
    setPhotoPreview(currentPhoto)
    setPhotoFile(null)
  }

  // Load profile photo from localStorage on mount
  useEffect(() => {
    const savedPhoto = getProfilePhoto()
    if (savedPhoto) {
      setProfilePhoto(savedPhoto)
    }
  }, [])

  // Listen for profile photo updates from other components
  useEffect(() => {
    const handlePhotoUpdate = (e: CustomEvent) => {
      setProfilePhoto(e.detail)
    }
    
    window.addEventListener('profilePhotoUpdated', handlePhotoUpdate as EventListener)
    return () => {
      window.removeEventListener('profilePhotoUpdated', handlePhotoUpdate as EventListener)
    }
  }, [])

  // Debug: Log full user object on mount and when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('auth_user')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          console.log('Profile page - Full user object from localStorage:', {
            hasReferences: !!parsedUser.references,
            referencesType: typeof parsedUser.references,
            referencesIsArray: Array.isArray(parsedUser.references),
            referencesCount: parsedUser.references?.length || 0,
            references: parsedUser.references,
            fullUser: parsedUser
          })
        }
      } catch (error) {
        console.error('Error reading localStorage:', error)
      }
    }
  }, [authUser])

  // Helper function to format date from DD/MM/YYYY to readable format
  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    // Check if already in readable format (contains month name like "Jan", "Feb", etc.)
    if (dateString.match(/[A-Za-z]{3}\s+\d{1,2},\s+\d{4}/)) {
      return dateString
    }
    // Parse DD/MM/YYYY format
    const parts = dateString.split('/')
    if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
      const [day, month, year] = parts
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      // Validate the date is valid
      if (isNaN(date.getTime())) {
        return dateString
      }
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }
    return dateString
  }

  // Helper function to format date range for work history
  const formatDateRange = (startDate: string, endDate: string, currentlyWorking: boolean): string => {
    const start = formatDate(startDate)
    if (currentlyWorking) {
      return `${start} - Present`
    }
    const end = formatDate(endDate)
    return `${start} - ${end}`
  }

  // Helper function to check if expiration date is active
  const getExpirationStatus = (expiration: string): 'active' | 'expired' => {
    if (!expiration) return 'active'
    // Parse DD/MM/YYYY format
    const parts = expiration.split('/')
    if (parts.length === 3) {
      const [day, month, year] = parts
      const expDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      expDate.setHours(0, 0, 0, 0)
      return expDate >= today ? 'active' : 'expired'
    }
    return 'active'
  }

  // Helper function to get work history title from workHistoryId
  const getWorkHistoryTitle = (workHistoryId: string): string => {
    const workHistoryItem = (authUser?.workHistory || []).find((wh: any) => wh.id === workHistoryId)
    return workHistoryItem?.title || ''
  }

  // Helper function to convert DD/MM/YYYY to YYYY-MM-DD for date input
  const convertDateForInput = (dateString: string): string => {
    if (!dateString) return ''
    // Check if already in YYYY-MM-DD format
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString
    }
    // Parse DD/MM/YYYY format
    const parts = dateString.split('/')
    if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
      const [day, month, year] = parts
      return `${year}-${month}-${day}`
    }
    return ''
  }

  // Helper function to format state name to "XX - State Name" format
  const formatStateForDropdown = (stateName: string): string => {
    if (!stateName) return 'MD - Maryland'
    // Check if already in "XX - State Name" format
    if (stateName.includes(' - ')) {
      return stateName
    }
    // Map state names to abbreviations (common states)
    const stateAbbreviations: { [key: string]: string } = {
      'Maryland': 'MD',
      'California': 'CA',
      'New York': 'NY',
      'Texas': 'TX',
      'Florida': 'FL',
      'Illinois': 'IL',
      'Pennsylvania': 'PA',
      'Ohio': 'OH',
      'Georgia': 'GA',
      'North Carolina': 'NC',
      'Michigan': 'MI',
      'New Jersey': 'NJ',
      'Virginia': 'VA',
      'Washington': 'WA',
      'Arizona': 'AZ',
      'Massachusetts': 'MA',
      'Tennessee': 'TN',
      'Indiana': 'IN',
      'Missouri': 'MO',
      'Colorado': 'CO'
    }
    const abbreviation = stateAbbreviations[stateName] || stateName.substring(0, 2).toUpperCase()
    return `${abbreviation} - ${stateName}`
  }

  // Use real user data with defaults - dynamically update avatar when profilePhoto changes
  const user = {
    name: authUser?.name || 'User',
    email: authUser?.email || 'user@example.com',
    avatar: profilePhoto || getProfilePhotoWithFallback(authUser?.avatar),
    experience: authUser?.yearsOfExperience ? `${authUser.yearsOfExperience} Years Experience` : '25 Years Experience',
    address: authUser?.address || authUser?.streetAddress || '3371 Columbia Boulevard, Baltimore, Maryland 21218',
    dob: authUser?.dob || '03/20/1997',
    ssn: authUser?.ssn ? `***-**-${authUser.ssn.slice(-4)}` : '***-**-4321'
  }

  // Map licenses from user data
  const licenses = (authUser?.licenses || []).map((license: any) => ({
    title: license.type || '',
    number: license.number || '',
    state: license.state || '',
    expiration: formatDate(license.expiration || ''),
    status: getExpirationStatus(license.expiration || '')
  }))

  // Map certificates from user data
  const certificates = (authUser?.certificates || []).map((cert: any) => ({
    title: cert.type || '',
    number: cert.number || '',
    expiration: formatDate(cert.expiration || ''),
    status: getExpirationStatus(cert.expiration || '')
  }))

  // Map specialties from user data
  const specialties = (authUser?.specialties || []).map((spec: any) => ({
    title: spec.certification || '',
    specialty: spec.specialty || ''
  }))

  // Map work history from user data
  const workHistory = (authUser?.workHistory || []).map((wh: any) => ({
    title: wh.title || '',
    unit: wh.unit || '',
    period: formatDateRange(wh.startDate || '', wh.endDate || '', wh.currentlyWorking || false),
    agency: wh.agency || '',
    description: wh.description || '',
    chargeExperience: wh.chargeExperience ? wh.chargeExperienceComment || '' : ''
  }))

  // Map education from user data
  const education = (authUser?.education || []).map((edu: any) => ({
    title: edu.title || '',
    course: edu.course || '',
    status: edu.didGraduate ? 'Graduated' : 'Did Not Graduate',
    graduated: edu.didGraduate ? formatDate(edu.graduated || '') : '',
    degree: edu.degree || ''
  }))

  // Direct state for references - read from localStorage
  const [referencesState, setReferencesState] = useState<any[]>([])
  
  // Function to load references directly from localStorage
  const loadReferences = useCallback(() => {
    if (typeof window === 'undefined') return []
    
    try {
      const storedUser = localStorage.getItem('auth_user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser.references && Array.isArray(parsedUser.references)) {
          return parsedUser.references
        }
      }
    } catch (error) {
      console.error('Error loading references:', error)
    }
    return []
  }, [])
  
  // Load references on mount and when authUser changes
  useEffect(() => {
    // Try authUser first
    if (authUser?.references && Array.isArray(authUser.references) && authUser.references.length > 0) {
      setReferencesState(authUser.references)
      return
    }
    
    // Fallback to localStorage
    const refs = loadReferences()
    setReferencesState(refs)
  }, [authUser?.references, loadReferences])
  
  // Also check localStorage periodically and on focus
  useEffect(() => {
    const checkReferences = () => {
      const refs = loadReferences()
      if (refs.length > 0) {
        setReferencesState(refs)
      }
    }
    
    // Check on mount
    checkReferences()
    
    // Check when window gains focus (user might have completed onboarding in another tab)
    window.addEventListener('focus', checkReferences)
    
    // Check periodically (every 2 seconds) to catch updates
    const interval = setInterval(checkReferences, 2000)
    
    return () => {
      window.removeEventListener('focus', checkReferences)
      clearInterval(interval)
    }
  }, [loadReferences])
  
  // Map references for display
  const references = useMemo(() => {
    // Use referencesState (from localStorage) or authUser.references
    const sourceRefs = referencesState.length > 0 
      ? referencesState 
      : (authUser?.references && Array.isArray(authUser.references) ? authUser.references : [])
    
    // Debug: Log what we found
    if (process.env.NODE_ENV === 'development') {
      console.log('Profile page - References mapping:', {
        referencesState,
        authUserReferences: authUser?.references,
        sourceRefs,
        count: sourceRefs.length
      })
    }
    
    // If no references found, return empty array
    if (!sourceRefs || sourceRefs.length === 0) {
      return []
    }
    
    // Map all references - accept any object
    return sourceRefs
      .filter((ref: any) => {
        // Only filter out null/undefined
        if (!ref) {
          return false
        }
        // Accept any object - be very lenient
        return typeof ref === 'object'
      })
      .map((ref: any, index: number) => {
        // Find the associated work history item
        const workHistoryItem = (authUser?.workHistory || []).find((wh: any) => wh && wh.id === ref.workHistoryId)
        const period = workHistoryItem 
          ? formatDateRange(workHistoryItem.startDate || '', workHistoryItem.endDate || '', workHistoryItem.currentlyWorking || false)
          : ''
        return {
          id: ref.id || `ref-${index}-${Date.now()}`,
          name: ref.name || 'Professional Reference',
          title: ref.title || '',
          company: getWorkHistoryTitle(ref.workHistoryId || ''),
          period: period,
          phone: ref.phone || '',
          email: ref.email || '',
          workHistoryId: ref.workHistoryId || ''
        }
      })
  }, [referencesState, authUser?.references, authUser?.workHistory])

  // Calculate dynamic stats counts
  const stats = [
    { label: 'Professional Licenses', count: licenses.length, icon: Shield },
    { label: 'Certificates', count: certificates.length, icon: Award },
    { label: 'Certification Specialties', count: specialties.length, icon: Award },
    { label: 'Work Histories', count: workHistory.length, icon: Briefcase },
    { label: 'Education Histories', count: education.length, icon: GraduationCap },
    { label: 'Professional References', count: references.length, icon: Users },
  ]

  const tabs = [
    'Professional Licenses',
    'Certificates',
    'Specialties',
    'Work History',
    'Education',
    'Professional References'
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navigation />

      <div className={isMobile ? 'pt-0 pb-24' : 'pt-32 pb-12 px-4 max-w-7xl mx-auto'}
        style={isMobile ? {
          paddingTop: `calc(3.5rem + env(safe-area-inset-top))`,
          paddingBottom: `calc(6rem + env(safe-area-inset-bottom))`,
        } : {}}
      >
        {/* Profile Header - Mobile Native Full Screen Style */}
        {isMobile ? (
          <div className="bg-white">
            {/* Back Button - Mobile Only */}
            <div className="px-4 pt-4 pb-2">
              <motion.button
                onClick={() => router.back()}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </motion.button>
            </div>
            {/* Profile Header Section */}
            <div className="px-4 pt-2 pb-4">
              <div className="flex flex-col items-center gap-4">
                {/* Profile Picture - Mobile Native Style */}
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group cursor-pointer"
                  onClick={handlePhotoClick}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="relative w-28 h-28 rounded-full object-cover ring-2 ring-primary-200 shadow-md"
                  />
                  {/* Camera Icon Overlay */}
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 active:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </motion.div>

                {/* User Info */}
                <div className="w-full text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {user.name}
                  </h1>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-full shadow-sm mb-4"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm font-semibold">{user.experience}</span>
                  </motion.div>

                  {/* Action Buttons - Mobile Native Style */}
                  <div className="flex items-center gap-2 w-full">
                    <motion.button
                      onClick={() => setShowEditModal(true)}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm active:bg-primary-700"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm active:bg-gray-200"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Info - Mobile Native Style */}
            <div className="px-4 pb-4 space-y-2">
              {[
                { icon: Mail, label: 'Email', value: user.email },
                { icon: MapPin, label: 'Address', value: user.address },
                { icon: Calendar, label: 'DOB', value: user.dob },
                { icon: Shield, label: 'SSN', value: user.ssn },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium mb-0.5">{item.label}</p>
                      <p className="text-sm text-gray-900 font-semibold truncate">{item.value}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Desktop Profile Header Card */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-6"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-400/10 to-primary-500/10 pointer-events-none" />
          
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                {/* Profile Picture */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group cursor-pointer"
                onClick={handlePhotoClick}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl blur-xl opacity-40" />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="relative w-28 h-28 rounded-3xl object-cover ring-4 ring-white/50 shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </motion.div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-3">
                      {user.name}
                    </h1>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50/80 backdrop-blur-md border border-primary-200/60 text-primary-700 rounded-full shadow-sm"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm font-semibold">{user.experience}</span>
                    </motion.div>
                  </div>

                    {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => setShowEditModal(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-gradient-to-r from-white/90 to-primary-50/50 backdrop-blur-md border border-primary-200/60 hover:border-primary-400/60 text-primary-700 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-gradient-to-r from-white/90 to-primary-50/50 backdrop-blur-md border border-primary-200/60 hover:border-primary-400/60 text-primary-700 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>PDF</span>
                    </motion.button>
                  </div>
                </div>
                  {/* Contact Info Grid - Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  {[
                    { icon: Mail, label: 'Email', value: user.email, color: 'from-primary-500 to-primary-600' },
                    { icon: MapPin, label: 'Address', value: user.address, color: 'from-primary-400 to-primary-500' },
                    { icon: Calendar, label: 'DOB', value: user.dob, color: 'from-primary-600 to-primary-700' },
                    { icon: Shield, label: 'SSN', value: user.ssn, color: 'from-primary-500 to-primary-700' },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="p-3 bg-white/60 backdrop-blur-md rounded-xl border border-white/50 hover:border-primary-200 transition-all hover:shadow-lg"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`p-1.5 bg-gradient-to-br ${item.color} rounded-lg`}>
                            <Icon className="w-3 h-3 text-white" />
                          </div>
                          <p className="text-xs text-gray-600 font-medium">{item.label}</p>
                        </div>
                        <p className="text-gray-900 font-semibold text-xs truncate">{item.value}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        )}

        {isMobile ? (
          <div className="px-0">
            {/* Mobile Content */}
            <div className="space-y-0">
            {/* Integrated Tabs and Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
                className="relative bg-white"
            >
                {/* Tabs Navigation - Mobile Native Style */}
                <div className="flex overflow-x-auto gap-2 px-4 pt-4 pb-3 border-b border-gray-200 scrollbar-hide relative z-10">
                {tabs.map((tab, index) => {
                  const isActive = activeTab === tab
                  
                  return (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      whileHover={{ y: isActive ? 0 : -3 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.05 * index,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="relative group"
                    >
                      <div className={`relative px-4 py-2.5 font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                        isActive
                          ? 'text-white rounded-xl' 
                          : 'text-gray-600 rounded-xl bg-gray-50'
                      }`}>
                        
                        {/* Active tab - Mobile Native Style */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTabBg"
                            className="absolute inset-0 rounded-xl overflow-hidden"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          >
                            {/* Solid gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700" />
                          </motion.div>
                        )}
                        
                        {/* Tab text with icon */}
                        <span className="relative z-10 flex items-center gap-2">
                          {tab}
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", delay: 0.15, duration: 0.5 }}
                              className="inline-flex items-center justify-center w-5 h-5 bg-white/30 rounded-full text-xs font-bold"
                            >
                              ✓
                            </motion.span>
                          )}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
              
              {/* Content Area - Mobile Native Full Screen Style */}
              <motion.div
                layout
                className="bg-white px-4 py-4 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold text-gray-900">
                      {activeTab}
                    </h2>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="inline-flex items-center justify-center min-w-[2rem] h-8 px-3 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 backdrop-blur-sm border border-primary-300/30 text-primary-700 text-sm font-bold rounded-full shadow-sm"
                    >
            {activeTab === 'Professional Licenses' ? licenses.length : 
             activeTab === 'Certificates' ? certificates.length :
             activeTab === 'Specialties' ? specialties.length :
             activeTab === 'Work History' ? workHistory.length :
             activeTab === 'Education' ? education.length :
             activeTab === 'Professional References' ? references.length : 0}
                    </motion.span>
                  </div>
                  <p className="text-gray-600">Manage your professional credentials and certifications</p>
                </div>
                <motion.button
                  onClick={() => {
                    if (activeTab === 'Certificates') {
                      setShowAddCertificateModal(true)
                    } else if (activeTab === 'Specialties') {
                      setShowAddSpecialtyModal(true)
                    } else if (activeTab === 'Work History') {
                      setShowAddWorkHistoryModal(true)
                    } else if (activeTab === 'Education') {
                      setShowAddEducationModal(true)
                    } else if (activeTab === 'Professional References') {
                      setShowAddReferenceModal(true)
                    } else {
                      setShowAddModal(true)
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold active:bg-primary-700 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">
                    {activeTab === 'Professional Licenses' ? 'Add License' :
                     activeTab === 'Certificates' ? 'Add Certificate' :
                     activeTab === 'Specialties' ? 'Add Specialty' :
                     activeTab === 'Work History' ? 'Add Work History' :
                     activeTab === 'Education' ? 'Add Education' :
                     activeTab === 'Professional References' ? 'Add Professional Reference' : 'Add Item'}
                  </span>
                </motion.button>
              </div>

              {/* Dynamic Content Based on Active Tab */}
              {activeTab === 'Professional Licenses' && (
                <>
                  {licenses.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-16 px-4"
                    >
                      <div className="relative mb-6">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                        >
                          <Shield className="w-16 h-16 text-primary-600" />
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                          <FileX className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Professional Licenses Found</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        You haven't added any professional licenses yet. Click the button above to add your first license.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {licenses.map((license, index) => {
                        // Find the original license data to get all fields
                        const originalLicense = (authUser?.licenses || []).find((l: any) => l.type === license.title)
                        return (
                    <motion.div
                      key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                              duration: 0.3, 
                              delay: index * 0.03
                            }}
                            className="group"
                          >
                            <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                              <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                  <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                            {license.title}
                          </h3>
                                  <div className="flex-shrink-0 flex items-center gap-2">
                          <motion.button
                            onClick={() => {
                              setSelectedItem(license)
                              setShowEditLicenseModal(true)
                            }}
                                      whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                                      className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                      title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClick(license, 'License')}
                                      whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                                      className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                      title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                          </div>
                        </div>
                            <div className="space-y-2">
                                  {license.number && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">License Number:</span> <span className="ml-2">{license.number}</span></div>}
                                  {license.state && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">State:</span> <span className="ml-2">{license.state}</span></div>}
                                  {license.expiration && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Expiration Date:</span> <span className="ml-2">{license.expiration}</span></div>}
                                </div>
                              </div>
                      </div>
                      </motion.div>
                        )
                      })}
                    </div>
                  )}
                </>
              )}

              {/* Certificates Section with Creative UI */}
              {activeTab === 'Certificates' && (
                <>
                  {certificates.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-16 px-4"
                    >
                      <div className="relative mb-6">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                        >
                          <Award className="w-16 h-16 text-primary-600" />
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                          <FileX className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Found</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        You haven't added any certificates yet. Click the button above to add your first certificate.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {certificates.map((cert, index) => (
                    <motion.div
                      key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                            duration: 0.3, 
                            delay: index * 0.03
                          }}
                          className="group"
                        >
                          <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                            <div className="p-5">
                              <div className="flex items-start justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                            {cert.title}
                          </h3>
                                <div className="flex-shrink-0 flex items-center gap-2">
                          <motion.button
                            onClick={() => {
                              setSelectedItem(cert)
                              setShowEditCertificateModal(true)
                            }}
                                    whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                                    className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                    title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClick(cert, 'Certificate')}
                                    whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                                    className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                    title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                                </div>
                              <div className="space-y-2">
                                {cert.number && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Certificate Number:</span> <span className="ml-2">{cert.number}</span></div>}
                                {cert.expiration && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Expiration Date:</span> <span className="ml-2">{cert.expiration}</span></div>}
                              </div>
                            </div>
                      </div>
                      </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Certification Specialties Section with Creative UI */}
              {activeTab === 'Specialties' && (
                <>
                  {specialties.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-16 px-4"
                    >
                      <div className="relative mb-6">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                        >
                          <Award className="w-16 h-16 text-primary-600" />
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                          <FileX className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certification Specialties Found</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        You haven't added any certification specialties yet. Click the button above to add your first specialty.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {specialties.map((specialty, index) => {
                        // Find the original specialty data to get all fields
                        const originalSpecialty = (authUser?.specialties || []).find((s: any) => s.certification === specialty.title)
                        return (
                    <motion.div
                      key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                              duration: 0.3, 
                              delay: index * 0.03
                            }}
                            className="group"
                          >
                            <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                              <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                  <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                            {specialty.title}
                          </h3>
                                  <div className="flex-shrink-0 flex items-center gap-2">
                          <motion.button
                            onClick={() => {
                              setSelectedItem(specialty)
                              setShowEditSpecialtyModal(true)
                            }}
                                      whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                                      className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                      title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClick(specialty, 'Specialty')}
                                      whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                                      className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                      title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                                </div>
                                <div className="space-y-2">
                                  {specialty.specialty && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Specialty:</span> <span className="ml-2">{specialty.specialty}</span></div>}
                              </div>
                            </div>
                      </div>
                      </motion.div>
                        )
                      })}
                    </div>
                  )}
                </>
              )}

              {/* Work History Section */}
              {activeTab === 'Work History' && (
                <>
                  {workHistory.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-16 px-4"
                    >
                      <div className="relative mb-6">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                        >
                          <Briefcase className="w-16 h-16 text-primary-600" />
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                          <Inbox className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Work History Found</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        You haven't added any work history yet. Start building your professional profile by adding your work experience.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {workHistory.map((work, index) => {
                        // Find the original work history data to get all fields
                        const originalWork = (authUser?.workHistory || []).find((wh: any) => wh.title === work.title)
                        return (
                        <motion.div
                          key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                              duration: 0.3, 
                              delay: index * 0.03
                            }}
                            className="group"
                          >
                            <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                              <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                  <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                                {work.title}
                              </h3>
                                  <div className="flex-shrink-0 flex items-center gap-2">
                              <motion.button
                                onClick={() => {
                                  setSelectedItem(work)
                                  setShowEditWorkHistoryModal(true)
                                }}
                                      whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                      className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                      title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteClick(work, 'Work History')}
                                      whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                      className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                      title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                                    </div>
                                <div className="space-y-2">
                                  {work.unit && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Unit:</span> <span className="ml-2">{work.unit}</span></div>}
                                  {originalWork?.startDate && (
                                    <div className="text-sm text-gray-700">
                                      <span className="text-gray-500 font-medium">Period:</span> 
                                      <span className="ml-2">
                                        {formatDateToDDMMYYYY(originalWork.startDate)} - {originalWork.currentlyWorking ? 'Present' : (originalWork.endDate ? formatDateToDDMMYYYY(originalWork.endDate) : 'N/A')}
                                      </span>
                                  </div>
                                )}
                                  {originalWork?.travelAssignment && originalWork?.agency && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Agency:</span> <span className="ml-2">{work.agency}</span></div>}
                                  {work.description && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Description:</span> <span className="ml-2">{work.description}</span></div>}
                                  {originalWork?.chargeExperienceComment && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Charge Experience:</span> <span className="ml-2">{originalWork.chargeExperienceComment}</span></div>}
                                  {(originalWork?.travelAssignment || originalWork?.perDiem) && (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {originalWork.travelAssignment && (
                                        <span className="inline-flex items-center text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded">
                                          Travel Assignment
                                        </span>
                                      )}
                                      {originalWork.perDiem && (
                                        <span className="inline-flex items-center text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded">
                                          Per Diem
                                        </span>
                                      )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        )
                      })}
                    </div>
                  )}
                </>
              )}

              {/* Education History Section with Empty State */}
              {activeTab === 'Education' && (
                <>
                  {education.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-16 px-4"
                    >
                      <div className="relative mb-6">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                        >
                          <GraduationCap className="w-16 h-16 text-primary-600" />
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                          <Inbox className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Education History Found</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        You haven't added any education history yet. Showcase your academic achievements and qualifications.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {education.map((edu, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.1,
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                          whileHover={{
                            y: -10,
                            rotateY: 2,
                            transition: { duration: 0.3 }
                          }}
                          className="group relative"
                        >
                          {/* Animated background glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500" />
                          
                          {/* Main card */}
                          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 pb-3 border-2 border-gray-200 group-hover:border-primary-300 transition-all duration-300 overflow-hidden shadow-lg group-hover:shadow-2xl h-full flex flex-col">
                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-[100px] transition-all duration-300 group-hover:from-primary-500/20" />
                            
                            {/* Title at top-left */}
                            <div className="relative">
                              <h3 className="text-lg font-semibold text-gray-900 mb-6 pr-24 leading-tight">
                                {edu.title}
                              </h3>
                            </div>

                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                              <motion.button
                                onClick={() => {
                                  setSelectedItem(edu)
                                  setShowEditEducationModal(true)
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-white/90 backdrop-blur-md hover:bg-primary-50 border border-gray-200 hover:border-primary-300 text-primary-600 rounded-lg transition-all shadow-md"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteClick(edu, 'Education')}
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-white/90 backdrop-blur-md hover:bg-red-50 border border-gray-200 hover:border-red-300 text-red-600 rounded-lg transition-all shadow-md"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>

                            {/* Content */}
                            <div className="relative flex-grow">
                              {/* Education details with modern styling */}
                              <div className="space-y-3">
                                {/* Course */}
                                <div className="group/item">
                                  <p className="text-xs text-gray-500 mb-1.5 font-semibold">Course</p>
                                  <div className="relative overflow-hidden">
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                      <p className="text-sm font-semibold text-gray-900">{edu.course}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Status */}
                                <div className="group/item">
                                  <p className="text-xs text-gray-500 mb-1.5 font-semibold">Status</p>
                                  <div className="relative overflow-hidden">
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                      <p className="text-sm font-semibold text-gray-900">{edu.status}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Graduated Date - only show if status is Graduated */}
                                {edu.graduated && (
                                  <div className="group/item">
                                    <p className="text-xs text-gray-500 mb-1.5 font-semibold">Graduated</p>
                                    <div className="relative overflow-hidden">
                                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{edu.graduated}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Degree - only show if not empty */}
                                {edu.degree && (
                                  <div className="group/item">
                                    <p className="text-xs text-gray-500 mb-1.5 font-semibold">Degree</p>
                                    <div className="relative overflow-hidden">
                                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{edu.degree}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Animated bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Professional References Section */}
              {activeTab === 'Professional References' && (
                <>
                  {references.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-16 px-4"
                    >
                      <div className="relative mb-6">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                        >
                          <Users className="w-16 h-16 text-primary-600" />
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                          <Inbox className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Professional References Found</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        You haven't added any professional references yet. Add professional references to strengthen your profile.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {references.map((ref, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.1,
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                          whileHover={{
                            y: -10,
                            rotateY: 2,
                            transition: { duration: 0.3 }
                          }}
                          className="group relative"
                        >
                          {/* Animated background glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500" />
                          
                          {/* Main card */}
                          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 pb-3 border-2 border-gray-200 group-hover:border-primary-300 transition-all duration-300 overflow-hidden shadow-lg group-hover:shadow-2xl h-full flex flex-col">
                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-[100px] transition-all duration-300 group-hover:from-primary-500/20" />
                            
                            {/* Name at top-left */}
                            <div className="relative">
                              <h3 className="text-lg font-semibold text-gray-900 mb-6 pr-24 leading-tight">
                                {ref.name}
                              </h3>
                            </div>

                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                              <motion.button
                                onClick={() => {
                                  setSelectedItem(ref)
                                  setShowEditReferenceModal(true)
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-white/90 backdrop-blur-md hover:bg-primary-50 border border-gray-200 hover:border-primary-300 text-primary-600 rounded-lg transition-all shadow-md"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteClick(ref, 'Reference')}
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-white/90 backdrop-blur-md hover:bg-red-50 border border-gray-200 hover:border-red-300 text-red-600 rounded-lg transition-all shadow-md"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>

                            {/* Content */}
                            <div className="relative flex-grow">
                              {/* Reference details with modern styling */}
                              <div className="space-y-3">
                                {/* Title */}
                                <div className="group/item">
                                  <p className="text-xs text-gray-500 mb-1.5 font-semibold">Title</p>
                                  <div className="relative overflow-hidden">
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                      <p className="text-sm font-semibold text-gray-900">{ref.title}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Company */}
                                <div className="group/item">
                                  <p className="text-xs text-gray-500 mb-1.5 font-semibold">Company</p>
                                  <div className="relative overflow-hidden">
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                      <p className="text-sm font-semibold text-gray-900">{ref.company}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Period */}
                                <div className="group/item">
                                  <p className="text-xs text-gray-500 mb-1.5 font-semibold">Period</p>
                                  <div className="relative overflow-hidden">
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                      <p className="text-sm font-semibold text-gray-900">{ref.period}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Phone */}
                                <div className="group/item">
                                  <p className="text-xs text-gray-500 mb-1.5 font-semibold">Phone</p>
                                  <div className="relative overflow-hidden">
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                      <p className="text-sm font-semibold text-gray-900">{ref.phone}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Email - only show if not empty */}
                                {ref.email && (
                                  <div className="group/item">
                                    <p className="text-xs text-gray-500 mb-1.5 font-semibold">Email</p>
                                    <div className="relative overflow-hidden">
                                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{ref.email}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Animated bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
              </motion.div>
            </motion.div>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Content - Original Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Integrated Tabs and Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                {/* Tabs Navigation */}
                <div className="flex overflow-x-auto gap-3 px-2 scrollbar-hide mb-[-1px] relative z-10">
                  {tabs.map((tab, index) => {
                    const isActive = activeTab === tab
                    
                    return (
                      <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        whileHover={{ y: isActive ? 0 : -3 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.05 * index,
                          type: "spring",
                          stiffness: 300
                        }}
                        className="relative group"
                      >
                        <div className={`relative px-6 py-3.5 font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                          isActive
                            ? 'text-white rounded-t-2xl'
                            : 'text-gray-600 hover:text-primary-700 rounded-2xl'
                        }`}>
                          
                          {/* Active tab with refined glass effect */}
                          {isActive && (
                            <motion.div
                              layoutId="activeTabBg"
                              className="absolute inset-0 rounded-t-2xl overflow-hidden"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            >
                              {/* Solid gradient background */}
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700" />
                              
                              {/* Subtle glass overlay */}
                              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
                              
                              {/* Refined shine effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ 
                                  duration: 3,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                  ease: "easeInOut"
                                }}
                              />
                              
                              {/* Subtle top border highlight */}
                              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30" />
                            </motion.div>
                          )}
                          
                          {/* Inactive tab hover effect */}
                          {!isActive && (
                            <motion.div
                              className="absolute inset-0 bg-white/50 rounded-2xl opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                              transition={{ duration: 0.2 }}
                            />
                          )}
                          
                          {/* Tab text with icon */}
                          <span className="relative z-10 flex items-center gap-2">
                            {tab}
                            {isActive && (
                              <motion.span
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", delay: 0.15, duration: 0.5 }}
                                className="inline-flex items-center justify-center w-5 h-5 bg-white/30 rounded-full text-xs font-bold"
                              >
                                ✓
                              </motion.span>
                            )}
                          </span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
                
                {/* Content Area - Integrated with active tab */}
                <motion.div
                  layout
                  className="bg-white/70 backdrop-blur-xl rounded-2xl rounded-tl-none shadow-lg border border-white/50 p-6 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                          {activeTab}
                        </h2>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          className="inline-flex items-center justify-center min-w-[2rem] h-8 px-3 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 backdrop-blur-sm border border-primary-300/30 text-primary-700 text-sm font-bold rounded-full shadow-sm"
                        >
                          {activeTab === 'Professional Licenses' ? licenses.length : 
                           activeTab === 'Certificates' ? certificates.length :
                           activeTab === 'Specialties' ? specialties.length :
                           activeTab === 'Work History' ? workHistory.length :
                           activeTab === 'Education' ? education.length :
                           activeTab === 'Professional References' ? references.length : 0}
                        </motion.span>
                      </div>
                      <p className="text-gray-600">Manage your professional credentials and certifications</p>
                    </div>
                    <motion.button
                      onClick={() => {
                        if (activeTab === 'Certificates') {
                          setShowAddCertificateModal(true)
                        } else if (activeTab === 'Specialties') {
                          setShowAddSpecialtyModal(true)
                        } else if (activeTab === 'Work History') {
                          setShowAddWorkHistoryModal(true)
                        } else if (activeTab === 'Education') {
                          setShowAddEducationModal(true)
                        } else if (activeTab === 'Professional References') {
                          setShowAddReferenceModal(true)
                        } else {
                          setShowAddModal(true)
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 bg-gradient-to-r from-white/90 to-primary-50/50 backdrop-blur-md border border-primary-200/60 hover:border-primary-400/60 text-primary-700 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Plus className="w-5 h-5" />
                      <span>
                        {activeTab === 'Professional Licenses' ? 'Add License' :
                         activeTab === 'Certificates' ? 'Add Certificate' :
                         activeTab === 'Specialties' ? 'Add Specialty' :
                         activeTab === 'Work History' ? 'Add Work History' :
                         activeTab === 'Education' ? 'Add Education' :
                         activeTab === 'Professional References' ? 'Add Professional Reference' : 'Add Item'}
                      </span>
                    </motion.button>
                  </div>

                  {/* Dynamic Content Based on Active Tab - Desktop (same content as mobile but with desktop styling) */}
                  {activeTab === 'Professional Licenses' && (
                    <>
                      {licenses.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center py-16 px-4"
                        >
                          <div className="relative mb-6">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                            >
                              <Shield className="w-16 h-16 text-primary-600" />
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                              <FileX className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Professional Licenses Found</h3>
                          <p className="text-gray-600 text-center max-w-md">
                            You haven't added any professional licenses yet. Click the button above to add your first license.
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-3">
                          {licenses.map((license, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: index * 0.03
                              }}
                              className="group"
                            >
                              <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                                <div className="p-5">
                                  <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                                    {license.title}
                                  </h3>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                  <motion.button
                                    onClick={() => {
                                      setSelectedItem(license)
                                      setShowEditLicenseModal(true)
                                    }}
                                        whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                        title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleDeleteClick(license, 'License')}
                                        whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                        title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                                          </div>
                                  <div className="space-y-2">
                                    {license.number && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">License Number:</span> <span className="ml-2">{license.number}</span></div>}
                                    {license.state && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">State:</span> <span className="ml-2">{license.state}</span></div>}
                                    {license.expiration && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Expiration Date:</span> <span className="ml-2">{license.expiration}</span></div>}
                                        </div>
                                      </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* Other tabs content for desktop - same structure as mobile but with desktop styling */}
                  {activeTab === 'Certificates' && (
                    <>
                      {certificates.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center py-16 px-4"
                        >
                          <div className="relative mb-6">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                            >
                              <Award className="w-16 h-16 text-primary-600" />
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                              <FileX className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Found</h3>
                          <p className="text-gray-600 text-center max-w-md">
                            You haven't added any certificates yet. Click the button above to add your first certificate.
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-3">
                          {certificates.map((cert, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: index * 0.03
                              }}
                              className="group"
                            >
                              <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                                <div className="p-5">
                                  <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                                    {cert.title}
                                  </h3>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                  <motion.button
                                    onClick={() => {
                                      setSelectedItem(cert)
                                      setShowEditCertificateModal(true)
                                    }}
                                        whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                        title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleDeleteClick(cert, 'Certificate')}
                                        whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                        className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                        title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                                        </div>
                                  <div className="space-y-2">
                                    {cert.number && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Certificate Number:</span> <span className="ml-2">{cert.number}</span></div>}
                                    {cert.expiration && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Expiration Date:</span> <span className="ml-2">{cert.expiration}</span></div>}
                                      </div>
                                    </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* Add other tab sections for desktop (Specialties, Work History, Education, References) - same pattern */}
                  {activeTab === 'Specialties' && (
                    <>
                      {specialties.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center py-16 px-4"
                        >
                          <div className="relative mb-6">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                            >
                              <Award className="w-16 h-16 text-primary-600" />
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                              <FileX className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certification Specialties Found</h3>
                          <p className="text-gray-600 text-center max-w-md">
                            You haven't added any certification specialties yet. Click the button above to add your first specialty.
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-3">
                          {specialties.map((specialty, index) => {
                            // Find the original specialty data to get all fields
                            const originalSpecialty = (authUser?.specialties || []).find((s: any) => s.certification === specialty.title)
                            return (
                            <motion.div
                              key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                  duration: 0.3, 
                                  delay: index * 0.03
                                }}
                                className="group"
                              >
                                <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                                  <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                      <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                                    {specialty.title}
                                  </h3>
                                      <div className="flex-shrink-0 flex items-center gap-2">
                                  <motion.button
                                    onClick={() => {
                                      setSelectedItem(specialty)
                                      setShowEditSpecialtyModal(true)
                                    }}
                                          whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                          title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleDeleteClick(specialty, 'Specialty')}
                                          whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                          className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                          title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                                        </div>
                                    <div className="space-y-2">
                                      {specialty.specialty && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Specialty:</span> <span className="ml-2">{specialty.specialty}</span></div>}
                                      </div>
                                    </div>
                              </div>
                            </motion.div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}

                  {/* Work History, Education, References sections for desktop - using same pattern */}
                  {activeTab === 'Work History' && (
                    <>
                      {workHistory.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center py-16 px-4"
                        >
                          <div className="relative mb-6">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                            >
                              <Briefcase className="w-16 h-16 text-primary-600" />
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                              <Inbox className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Work History Found</h3>
                          <p className="text-gray-600 text-center max-w-md">
                            You haven't added any work history yet. Start building your professional profile by adding your work experience.
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-3">
                          {workHistory.map((work, index) => {
                            // Find the original work history data to get all fields
                            const originalWork = (authUser?.workHistory || []).find((wh: any) => wh.title === work.title)
                            return (
                            <motion.div
                              key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                  duration: 0.3, 
                                  delay: index * 0.03
                                }}
                                className="group"
                              >
                                <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                                  <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                      <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                                    {work.title}
                                  </h3>
                                      <div className="flex-shrink-0 flex items-center gap-2">
                                  <motion.button
                                    onClick={() => {
                                      setSelectedItem(work)
                                      setShowEditWorkHistoryModal(true)
                                    }}
                                          whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                          title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleDeleteClick(work, 'Work History')}
                                          whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                          className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                          title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                                        </div>
                                    <div className="space-y-2">
                                      {work.unit && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Unit:</span> <span className="ml-2">{work.unit}</span></div>}
                                      {originalWork?.startDate && (
                                        <div className="text-sm text-gray-700">
                                          <span className="text-gray-500 font-medium">Period:</span> 
                                          <span className="ml-2">
                                            {formatDateToDDMMYYYY(originalWork.startDate)} - {originalWork.currentlyWorking ? 'Present' : (originalWork.endDate ? formatDateToDDMMYYYY(originalWork.endDate) : 'N/A')}
                                          </span>
                                      </div>
                                    )}
                                      {originalWork?.travelAssignment && originalWork?.agency && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Agency:</span> <span className="ml-2">{work.agency}</span></div>}
                                      {work.description && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Description:</span> <span className="ml-2">{work.description}</span></div>}
                                      {originalWork?.chargeExperienceComment && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Charge Experience:</span> <span className="ml-2">{originalWork.chargeExperienceComment}</span></div>}
                                      {(originalWork?.travelAssignment || originalWork?.perDiem) && (
                                        <div className="flex flex-wrap gap-2 mt-1">
                                          {originalWork.travelAssignment && (
                                            <span className="inline-flex items-center text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded">
                                              Travel Assignment
                                            </span>
                                          )}
                                          {originalWork.perDiem && (
                                            <span className="inline-flex items-center text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded">
                                              Per Diem
                                            </span>
                                          )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === 'Education' && (
                    <>
                      {education.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center py-16 px-4"
                        >
                          <div className="relative mb-6">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                            >
                              <GraduationCap className="w-16 h-16 text-primary-600" />
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                              <Inbox className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Education History Found</h3>
                          <p className="text-gray-600 text-center max-w-md">
                            You haven't added any education history yet. Showcase your academic achievements and qualifications.
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-3">
                          {education.map((edu, index) => {
                            // Find the original education data to get all fields
                            const originalEdu = (authUser?.education || []).find((e: any) => e.title === edu.title)
                            return (
                            <motion.div
                              key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                  duration: 0.3, 
                                  delay: index * 0.03
                                }}
                                className="group"
                              >
                                <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                                  <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                      <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                                    {edu.title}
                                  </h3>
                                      <div className="flex-shrink-0 flex items-center gap-2">
                                  <motion.button
                                    onClick={() => {
                                      setSelectedItem(edu)
                                      setShowEditEducationModal(true)
                                    }}
                                          whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                          title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleDeleteClick(edu, 'Education')}
                                          whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                          className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                          title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                                        </div>
                                    <div className="space-y-2">
                                      {edu.course && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Course of Study:</span> <span className="ml-2">{edu.course}</span></div>}
                                      {originalEdu?.didGraduate && originalEdu?.graduated && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Graduation Date:</span> <span className="ml-2">{formatDateToDDMMYYYY(originalEdu.graduated)}</span></div>}
                                      {originalEdu?.didGraduate && originalEdu?.degree && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Degree:</span> <span className="ml-2">{edu.degree}</span></div>}
                                      </div>
                                    </div>
                              </div>
                            </motion.div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === 'Professional References' && (
                    <>
                      {references.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center py-16 px-4"
                        >
                          <div className="relative mb-6">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                            >
                              <Users className="w-16 h-16 text-primary-600" />
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                              <Inbox className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">No References Found</h3>
                          <p className="text-gray-600 text-center max-w-md">
                            You haven't added any professional references yet. Add references to strengthen your profile.
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-3">
                          {references.map((ref, index) => {
                            // Find the original reference data to get all fields
                            const originalRef = (referencesState.length > 0 ? referencesState : (authUser?.references || [])).find((r: any) => r.name === ref.name)
                            return (
                            <motion.div
                              key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                  duration: 0.3, 
                                  delay: index * 0.03
                                }}
                                className="group"
                              >
                                <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                                  <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                      <h3 className="text-base font-semibold text-gray-900 leading-snug pr-4">
                                    {ref.name}
                                  </h3>
                                      <div className="flex-shrink-0 flex items-center gap-2">
                                  <motion.button
                                    onClick={() => {
                                      setSelectedItem(ref)
                                      setShowEditReferenceModal(true)
                                    }}
                                          whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-primary-600 rounded-md transition-colors"
                                          title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleDeleteClick(ref, 'Reference')}
                                          whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                          className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors"
                                          title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                                        </div>
                                    <div className="space-y-2">
                                      {ref.title && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Reference Job Title:</span> <span className="ml-2">{ref.title}</span></div>}
                                      {originalRef?.workHistoryId && (() => {
                                        const workHistory = (authUser?.workHistory || []).find((wh: any) => wh.id === originalRef.workHistoryId)
                                        return workHistory ? (
                                          <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Where did you work together?:</span> <span className="ml-2">{workHistory.title}{workHistory.unit ? ` - ${workHistory.unit}` : ''}</span></div>
                                        ) : null
                                      })()}
                                      {ref.phone && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Phone Number:</span> <span className="ml-2">+1 {ref.phone}</span></div>}
                                      {ref.email && <div className="text-sm text-gray-700"><span className="text-gray-500 font-medium">Email:</span> <span className="ml-2">{ref.email}</span></div>}
                                      </div>
                                    </div>
                          </div>
                        </motion.div>
                            )
                          })}
                    </div>
                  )}
                </>
              )}
              </motion.div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Statistics with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6"
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-5">
                Account Statistics
              </h3>
              <div className="space-y-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md rounded-xl border border-white/50 hover:border-primary-200 transition-all cursor-pointer shadow-md hover:shadow-lg group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                        {stat.count}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                        {stat.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Upload Resume with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-gradient-to-br from-primary-500/20 via-primary-400/20 to-primary-500/20 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 overflow-hidden"
            >
              {/* Animated Background Orbs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Resume</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Upload your resume to automatically populate your profile information
                </p>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 backdrop-blur-sm border border-primary-300/30 text-primary-700 text-xs font-bold rounded-full mb-4 shadow-sm">
                  ✨ AI Powered
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full px-5 py-3.5 bg-gradient-to-r from-primary-600/90 to-primary-700/90 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 overflow-hidden"
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    animate={{
                      x: ['-200%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <Upload className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="relative z-10">Choose File</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
          </>
        )}
      </div>


      {/* Edit Profile Modal */}
      {showEditModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${isMobile ? 'z-[10001]' : 'z-[9999]'} ${isMobile ? '' : 'flex items-center justify-center'} p-4 sm:p-6`}
            onClick={() => setShowEditModal(false)}
          >
            {/* Modal - Bottom Sheet on Mobile, Centered on Desktop */}
            <motion.div
              initial={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={isMobile ? { duration: 0.3, ease: [0.32, 0.72, 0, 1] } : { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className={`relative ${isMobile ? 'fixed left-0 right-0 w-full' : 'w-full max-w-2xl mx-4 sm:mx-0'}`}
              style={isMobile ? { 
                bottom: 0,
                top: 'calc(3.5rem + env(safe-area-inset-top, 0px))',
                height: 'auto',
                maxHeight: 'calc(100vh - 3.5rem - env(safe-area-inset-top, 0px))',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                zIndex: 10002
              } : { maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal - Desktop Only */}
              {!isMobile && (
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              )}
              
              {/* Main modal container */}
              <div className={`relative bg-white ${isMobile ? 'rounded-t-3xl shadow-2xl' : 'rounded-2xl sm:rounded-3xl shadow-2xl'} overflow-hidden ${isMobile ? 'border-t border-gray-200' : 'border border-gray-100'} ${isMobile ? '' : 'max-h-[90vh]'} flex flex-col`}
                style={isMobile ? { 
                  maxHeight: 'calc(100vh - 3.5rem - env(safe-area-inset-top, 0px))'
                } : {}}
              >
                
                {/* Mobile Drag Handle */}
                {isMobile && (
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                  </div>
                )}
                
                {/* Header */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-primary-50 via-primary-50/80 to-white border-b border-primary-100/50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <Edit className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          Edit Profile Information
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Personal Information
                        </p>
                      </div>
                      </div>
                    </div>
                </div>

              {/* Content Area - Scrollable */}
              <div className={`${isMobile ? 'px-4 py-4' : 'px-4 sm:px-6 md:px-8 py-4 sm:py-6'} overflow-y-auto flex-1`} style={{ maxHeight: isMobile ? 'calc(90vh - 180px)' : 'calc(90vh - 200px)' }}>
                <div className={`max-w-2xl ${isMobile ? '' : 'mx-auto'}`}>
                  <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-4 mb-4`}>
                  {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                        defaultValue={authUser?.firstName || ''}
                        placeholder="Enter first name"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                    />
                    </div>

                  {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                        defaultValue={authUser?.lastName || ''}
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
                        defaultValue={authUser?.email || ''}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">+1</div>
                        <input
                          type="tel"
                          defaultValue={authUser?.phoneNumber || ''}
                          placeholder="Enter 10 digits"
                          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                          maxLength={10}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                        defaultValue={convertDateForInput(authUser?.dob || '')}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  {/* Social Security Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Social Security Number <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                        defaultValue={authUser?.ssn || ''}
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
                        defaultValue={authUser?.yearsOfExperience || ''}
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
                        defaultValue={authUser?.streetAddress || authUser?.address || ''}
                        placeholder="Enter street address"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                    />
                    </div>
                  {/* Additional Address Line */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Address Line</label>
                    <input
                      type="text"
                        defaultValue={authUser?.additionalAddress || ''}
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
                          defaultValue={authUser?.city || ''}
                          placeholder="Enter city"
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State <span className="text-red-500">*</span></label>
                        <CustomSelect
                          value={selectedState}
                          onChange={(value) => setSelectedState(value)}
                          placeholder="Select state"
                          icon={MapPin}
                        >
                          <option value="">Select state</option>
                          {US_STATES.map(state => {
                            // Create abbreviation for state
                            const stateAbbreviations: { [key: string]: string } = {
                              'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
                              'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
                              'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
                              'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
                              'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
                              'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
                              'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
                              'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
                              'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
                              'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
                              'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
                              'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
                              'Wisconsin': 'WI', 'Wyoming': 'WY'
                            }
                            const abbreviation = stateAbbreviations[state] || state.substring(0, 2).toUpperCase()
                            const stateValue = `${abbreviation} - ${state}`
                            return <option key={state} value={stateValue}>{stateValue}</option>
                          })}
                        </CustomSelect>
                                      </div>
                  </div>

                    {/* ZIP Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                        defaultValue={authUser?.zipCode || ''}
                        placeholder="Enter ZIP code"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>
                    </div>
                  </div>

              {/* Footer */}
              <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4">
                  <button 
                      onClick={() => setShowEditModal(false)}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                    >
                      Cancel
                  </button>
                  <button 
                      onClick={() => {
                        toast.success('Profile updated successfully')
                        setShowEditModal(false)
                      }}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30"
                    >
                        Update Profile
                  </button>
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Add License Modal */}
      {showAddModal && (
        <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => setShowAddModal(false)}
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
                        <Shield className="w-6 h-6 text-white" />
                  </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          Add Professional License
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Professional Licenses
                        </p>
                      </div>
                      </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Type <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={addLicenseType}
                        onChange={(value) => setAddLicenseType(value)}
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
                      <input type="text" value={addLicenseNumber} onChange={(e) => setAddLicenseNumber(e.target.value)} placeholder="Enter license number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                      </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <CustomSelect
                        value={addLicenseState}
                        onChange={(value) => setAddLicenseState(value)}
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
                        value={addLicenseExpiration}
                        onChange={(value) => setAddLicenseExpiration(value)}
                        placeholder="Select expiration date"
                        showFormat={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        setShowAddModal(false)
                        setAddLicenseType('')
                        setAddLicenseNumber('')
                        setAddLicenseState('')
                        setAddLicenseExpiration('')
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                        const formData = {
                          type: addLicenseType,
                          number: addLicenseNumber,
                          state: addLicenseState,
                          expiration: addLicenseExpiration
                        }
                        if (!isFormDataValid('licenses', formData)) {
                          if (!addLicenseType?.trim()) {
                            toast.error('Please select license type')
                            return
                          }
                          if (addLicenseExpiration?.trim() && isDateInPast(addLicenseExpiration)) {
                            toast.error('Expiration date cannot be in the past')
                            return
                          }
                          return
                        }
                        // Save to localStorage
                        saveUserDataToLocalStorage('licenses', formData)
                          toast.success('License added successfully')
                          setShowAddModal(false)
                        setAddLicenseType('')
                        setAddLicenseNumber('')
                        setAddLicenseState('')
                        setAddLicenseExpiration('')
                      }}
                      disabled={!isFormDataValid('licenses', {
                        type: addLicenseType,
                        number: addLicenseNumber,
                        state: addLicenseState,
                        expiration: addLicenseExpiration
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('licenses', {
                          type: addLicenseType,
                          number: addLicenseNumber,
                          state: addLicenseState,
                          expiration: addLicenseExpiration
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      Add
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Add Certificate Modal */}
      {showAddCertificateModal && (
        <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => setShowAddCertificateModal(false)}
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
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          Add Certificate
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Professional Certificates
                        </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Type <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={addCertificateType}
                        onChange={(value) => setAddCertificateType(value)}
                        placeholder="Select certificate type"
                        icon={Award}
                      >
                        <option value="">Select certificate type</option>
                        {CERTIFICATE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                      </CustomSelect>
                        </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                      <input type="text" value={addCertificateNumber} onChange={(e) => setAddCertificateNumber(e.target.value)} placeholder="Enter certificate number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                      </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                      <CustomDatePicker
                        value={addCertificateExpiration}
                        onChange={(value) => setAddCertificateExpiration(value)}
                        placeholder="Select expiration date"
                        showFormat={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        setShowAddCertificateModal(false)
                        setAddCertificateType('')
                        setAddCertificateNumber('')
                        setAddCertificateExpiration('')
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                        const formData = {
                          type: addCertificateType,
                          number: addCertificateNumber,
                          expiration: addCertificateExpiration
                        }
                        if (!isFormDataValid('certificates', formData)) {
                          if (!addCertificateType?.trim()) {
                            toast.error('Please select certificate type')
                            return
                          }
                          if (addCertificateExpiration?.trim() && isDateInPast(addCertificateExpiration)) {
                            toast.error('Expiration date cannot be in the past')
                            return
                          }
                          return
                        }
                        // Save to localStorage
                        saveUserDataToLocalStorage('certificates', formData)
                          toast.success('Certificate added successfully')
                          setShowAddCertificateModal(false)
                        setAddCertificateType('')
                        setAddCertificateNumber('')
                        setAddCertificateExpiration('')
                      }}
                      disabled={!isFormDataValid('certificates', {
                        type: addCertificateType,
                        number: addCertificateNumber,
                        expiration: addCertificateExpiration
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('certificates', {
                          type: addCertificateType,
                          number: addCertificateNumber,
                          expiration: addCertificateExpiration
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      Add
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Add Specialty Modal */}
      {showAddSpecialtyModal && (
        <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => setShowAddSpecialtyModal(false)}
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
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Add Certification Specialty
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Nursing Specialties
                        </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certification <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={addSpecialtyCertification}
                        onChange={(value) => {
                          setAddSpecialtyCertification(value)
                          setAddSpecialtySpecialty('') // Clear specialty when certification changes
                        }}
                        placeholder="Select certification"
                        icon={Award}
                      >
                          <option value="">Select certification</option>
                        {CERTIFICATIONS.map(cert => <option key={cert} value={cert}>{cert}</option>)}
                      </CustomSelect>
                        </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialty <span className="text-red-500">*</span>
                      </label>
                      {(() => {
                        const selectedCertification = addSpecialtyCertification
                        const availableSpecialties = selectedCertification 
                          ? (CERTIFICATION_SPECIALTIES_MAP[selectedCertification] || [])
                          : []
                        const hasNoSpecialties = selectedCertification && availableSpecialties.length === 0
                        
                        return (
                          <>
                            <CustomSelect
                              value={addSpecialtySpecialty}
                              onChange={(value) => setAddSpecialtySpecialty(value)}
                              placeholder={selectedCertification ? "Select specialty" : "Select certification first"}
                              icon={Award}
                              disabled={!selectedCertification || !!hasNoSpecialties}
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
                            {selectedCertification && availableSpecialties.length > 0 && !addSpecialtySpecialty && (
                              <p className="mt-1.5 text-xs text-gray-500">
                                Please select a specialty from the available options.
                              </p>
                            )}
                          </>
                        )
                      })()}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        setShowAddSpecialtyModal(false)
                        setAddSpecialtyCertification('')
                        setAddSpecialtySpecialty('')
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                        const formData = {
                          certification: addSpecialtyCertification,
                          specialty: addSpecialtySpecialty
                        }
                        if (!isFormDataValid('specialties', formData)) {
                          if (!addSpecialtyCertification?.trim()) {
                            toast.error('Please select a certification')
                            return
                          }
                          if (!addSpecialtySpecialty?.trim()) {
                            toast.error('Please select a specialty')
                            return
                          }
                          const availableSpecialties = CERTIFICATION_SPECIALTIES_MAP[addSpecialtyCertification] || []
                          if (availableSpecialties.length === 0) {
                            toast.error('No specialties available for the selected certification')
                            return
                          }
                          if (!availableSpecialties.includes(addSpecialtySpecialty)) {
                            toast.error('Selected specialty is not available for the selected certification')
                            return
                          }
                          return
                        }
                        // Save to localStorage
                        saveUserDataToLocalStorage('specialties', formData)
                          toast.success('Specialty added successfully')
                          setShowAddSpecialtyModal(false)
                        setAddSpecialtyCertification('')
                        setAddSpecialtySpecialty('')
                      }}
                      disabled={!isFormDataValid('specialties', {
                        certification: addSpecialtyCertification,
                        specialty: addSpecialtySpecialty
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('specialties', {
                          certification: addSpecialtyCertification,
                          specialty: addSpecialtySpecialty
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      Add
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Add Work History Modal */}
      {showAddWorkHistoryModal && (
        <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => {
              setShowAddWorkHistoryModal(false)
                // Reset all form fields
                setWorkHistoryTitle('')
                setWorkHistoryUnit('')
                setWorkHistoryStartDate('')
                setWorkHistoryEndDate('')
              setCurrentlyWorking(false)
                setWorkHistoryAgency('')
                setWorkHistoryDescription('')
                setChargeExperience(false)
                setChargeExperienceComment('')
              setTravelAssignment(false)
              setPerDiem(false)
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
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Add Work History
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Work History
                        </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    {(() => {
                      // Get unique facilities from jobs
                      const uniqueFacilities = Array.from(new Set(SAMPLE_JOBS.map(job => job.facilityName).filter(Boolean))).sort()
                      
                      // Get unique specialties from jobs
                      const uniqueSpecialties = Array.from(new Set(
                        SAMPLE_JOBS.map(job => {
                          const parts = job.licenseSpecialty?.split(' - ') || []
                          return parts.length > 1 ? parts.slice(1).join(' - ') : parts[0] || ''
                        }).filter(s => s.trim() !== '')
                      )).sort()
                      
                      return (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Employer Full Name <span className="text-red-500">*</span></label>
                            <SearchableDropdown
                              value={workHistoryTitle}
                              onChange={(value) => setWorkHistoryTitle(value)}
                        placeholder="Search facilities..."
                              options={uniqueFacilities}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Unit <span className="text-red-500">*</span></label>
                            <SearchableDropdown
                              value={workHistoryUnit}
                              onChange={(value) => setWorkHistoryUnit(value)}
                        placeholder="Search specialties..."
                              options={uniqueSpecialties}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                              <CustomDatePicker
                                value={workHistoryStartDate}
                                onChange={(value) => {
                                  setWorkHistoryStartDate(value)
                                  if (workHistoryEndDate && isEndDateBeforeStartDate(value, workHistoryEndDate)) {
                                    setWorkHistoryEndDate('')
                                  }
                                }}
                        placeholder="Select start date"
                                showFormat={false}
                                maxDate="today"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date {!currentlyWorking && <span className="text-red-500">*</span>}
                      </label>
                              <CustomDatePicker
                                value={workHistoryEndDate}
                                onChange={(value) => setWorkHistoryEndDate(value)}
                        placeholder="Select end date"
                        disabled={currentlyWorking}
                                showFormat={false}
                                minDate={workHistoryStartDate || undefined}
                                maxDate="today"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                              id="currentlyWorking" 
                          checked={currentlyWorking}
                              onChange={(e) => {
                                setCurrentlyWorking(e.target.checked)
                                if (e.target.checked) {
                                  setWorkHistoryEndDate('')
                                }
                              }} 
                              className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                              style={{ accentColor: '#7F2860' }}
                            />
                            <label htmlFor="currentlyWorking" className="text-sm text-gray-700 cursor-pointer">Currently working here</label>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description / Special Skills / Experience</label>
                      <textarea
                              value={workHistoryDescription} 
                              onChange={(e) => setWorkHistoryDescription(e.target.value)} 
                        placeholder="Describe your role and responsibilities..."
                              rows={3} 
                              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                                id="travelAssignment" 
                          checked={travelAssignment}
                                onChange={(e) => {
                                  setTravelAssignment(e.target.checked)
                                  if (e.target.checked) {
                                    setPerDiem(false)
                                  }
                                }} 
                                className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                                style={{ accentColor: '#7F2860' }}
                              />
                              <label htmlFor="travelAssignment" className="text-sm text-gray-700 cursor-pointer">Travel Assignment</label>
                            </div>
                            <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                                id="chargeExperience" 
                                checked={chargeExperience} 
                                onChange={(e) => setChargeExperience(e.target.checked)} 
                                className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                                style={{ accentColor: '#7F2860' }}
                              />
                              <label htmlFor="chargeExperience" className="text-sm text-gray-700 cursor-pointer">Charge Experience?</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                id="perDiem" 
                          checked={perDiem}
                          onChange={(e) => {
                            setPerDiem(e.target.checked)
                            if (e.target.checked) {
                              setTravelAssignment(false)
                            }
                          }}
                                className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                                style={{ accentColor: '#7F2860' }}
                              />
                              <label htmlFor="perDiem" className="text-sm text-gray-700 cursor-pointer">Per Diem</label>
                            </div>
                          </div>
                    {travelAssignment && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Staffing Agency Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                                value={workHistoryAgency} 
                                onChange={(e) => setWorkHistoryAgency(e.target.value)} 
                          placeholder="Enter staffing agency name"
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                        />
                            </div>
                    )}
                    {chargeExperience && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
                        <textarea
                                value={chargeExperienceComment} 
                                onChange={(e) => setChargeExperienceComment(e.target.value)} 
                          placeholder="Describe your charge experience..."
                                rows={3} 
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                        />
                            </div>
                    )}
                        </>
                      )
                    })()}

                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                        onClick={() => {
                          setShowAddWorkHistoryModal(false)
                        // Reset all form fields
                        setWorkHistoryTitle('')
                        setWorkHistoryUnit('')
                        setWorkHistoryStartDate('')
                        setWorkHistoryEndDate('')
                          setCurrentlyWorking(false)
                        setWorkHistoryAgency('')
                        setWorkHistoryDescription('')
                        setChargeExperience(false)
                        setChargeExperienceComment('')
                          setTravelAssignment(false)
                          setPerDiem(false)
                        }}
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                      onClick={handleAddWorkHistory}
                      disabled={!isFormDataValid('workHistory', {
                        title: workHistoryTitle,
                        unit: workHistoryUnit,
                        startDate: workHistoryStartDate,
                        endDate: workHistoryEndDate,
                        currentlyWorking: currentlyWorking,
                        travelAssignment: travelAssignment,
                        agency: workHistoryAgency,
                        chargeExperience: chargeExperience,
                        chargeExperienceComment: chargeExperienceComment
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('workHistory', {
                          title: workHistoryTitle,
                          unit: workHistoryUnit,
                          startDate: workHistoryStartDate,
                          endDate: workHistoryEndDate,
                          currentlyWorking: currentlyWorking,
                          travelAssignment: travelAssignment,
                          agency: workHistoryAgency,
                          chargeExperience: chargeExperience,
                          chargeExperienceComment: chargeExperienceComment
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      Add
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Add Education Modal */}
      {showAddEducationModal && (
        <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => {
              setShowAddEducationModal(false)
              setDidGraduate(false)
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
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          Add Education
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Education
                        </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">School Name <span className="text-red-500">*</span></label>
                      <SearchableDropdown
                        value={addEducationTitle}
                        onChange={(value) => setAddEducationTitle(value)}
                        placeholder="Search schools..."
                        options={SCHOOLS}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course of Study <span className="text-red-500">*</span></label>
                      <CustomSelect
                        value={addEducationCourse}
                        onChange={(value) => setAddEducationCourse(value)}
                        placeholder="Select course of study"
                        icon={GraduationCap}
                      >
                          <option value="">Select course of study</option>
                        {COURSE_OF_STUDY.map(course => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </CustomSelect>
                        </div>
                    <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                        id="didGraduate" 
                          checked={didGraduate}
                        onChange={(e) => {
                          setDidGraduate(e.target.checked)
                          if (!e.target.checked) {
                            setAddEducationGraduated('')
                            setAddEducationDegree('')
                          }
                        }} 
                        className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                        style={{ accentColor: '#7F2860' }}
                      />
                      <label htmlFor="didGraduate" className="text-sm text-gray-700 cursor-pointer">Did you Graduate?</label>
                    </div>
                    {didGraduate && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date <span className="text-red-500">*</span></label>
                          <CustomDatePicker
                            value={addEducationGraduated}
                            onChange={(value) => setAddEducationGraduated(value)}
                          placeholder="dd/mm/yyyy"
                            showFormat={true}
                            maxDate="today"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Degree <span className="text-red-500">*</span></label>
                          <CustomSelect
                            value={addEducationDegree}
                            onChange={(value) => setAddEducationDegree(value)}
                            placeholder="Select degree"
                            icon={GraduationCap}
                          >
                            <option value="">Select degree</option>
                            {DEGREES.map(degree => (
                              <option key={degree} value={degree}>{degree}</option>
                            ))}
                          </CustomSelect>
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
                          setShowAddEducationModal(false)
                          setDidGraduate(false)
                        setAddEducationTitle('')
                        setAddEducationCourse('')
                        setAddEducationGraduated('')
                        setAddEducationDegree('')
                        }}
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                        const formData = {
                          title: addEducationTitle,
                          course: addEducationCourse,
                          didGraduate: didGraduate,
                          graduated: addEducationGraduated,
                          degree: addEducationDegree
                        }
                        if (!isFormDataValid('education', formData)) {
                          if (!addEducationTitle?.trim()) {
                            toast.error('Please enter school name')
                            return
                          }
                          if (!addEducationCourse?.trim()) {
                            toast.error('Please select course of study')
                            return
                          }
                          if (didGraduate) {
                            if (!addEducationGraduated?.trim()) {
                              toast.error('Please select graduation date')
                              return
                            }
                            if (!addEducationDegree?.trim()) {
                              toast.error('Please select degree')
                              return
                            }
                          }
                          return
                        }
                        // Save to localStorage
                        const educationData = {
                          title: addEducationTitle,
                          course: addEducationCourse,
                          didGraduate: didGraduate,
                          graduated: addEducationGraduated,
                          degree: addEducationDegree
                        }
                        saveUserDataToLocalStorage('education', educationData)
                          toast.success('Education added successfully')
                          setShowAddEducationModal(false)
                          setDidGraduate(false)
                        setAddEducationTitle('')
                        setAddEducationCourse('')
                        setAddEducationGraduated('')
                        setAddEducationDegree('')
                      }}
                      disabled={!isFormDataValid('education', {
                        title: addEducationTitle,
                        course: addEducationCourse,
                        didGraduate: didGraduate,
                        graduated: addEducationGraduated,
                        degree: addEducationDegree
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('education', {
                          title: addEducationTitle,
                          course: addEducationCourse,
                          didGraduate: didGraduate,
                          graduated: addEducationGraduated,
                          degree: addEducationDegree
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      Add
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Add Professional Reference Modal */}
      {showAddReferenceModal && (
        <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => setShowAddReferenceModal(false)}
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
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Add Professional Reference
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Professional References
                        </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    {(() => {
                      // Get work history items for the dropdown
                      const workHistoryOptions = (authUser?.workHistory || []).map((work: any) => ({
                        id: work.id,
                        label: `${work.title || work.facility || ''}${work.unit ? ` - ${work.unit}` : ''}${work.startDate ? ` (${formatDateToDDMMYYYY(work.startDate)} - ${work.currentlyWorking ? 'Present' : (work.endDate ? formatDateToDDMMYYYY(work.endDate) : 'N/A')})` : ''}`
                      }))
                      
                      return (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                              value={addReferenceName}
                              onChange={(e) => setAddReferenceName(e.target.value)}
                        placeholder="Enter full name"
                              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Reference Job Title <span className="text-red-500">*</span></label>
                            <CustomSelect
                              value={addReferenceTitle}
                              onChange={(value) => setAddReferenceTitle(value)}
                              placeholder="Select job title"
                              icon={Briefcase}
                            >
                              <option value="">Select job title</option>
                              {REFERENCE_JOB_TITLES.map(title => (
                                <option key={title} value={title}>{title}</option>
                              ))}
                            </CustomSelect>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Where did you work together?</label>
                            <CustomSelect
                              value={addReferenceWorkHistoryId}
                              onChange={(value) => setAddReferenceWorkHistoryId(value)}
                              placeholder="Select from your work history"
                              icon={Briefcase}
                              disabled={workHistoryOptions.length === 0}
                            >
                          <option value="">Select from your work history</option>
                              {workHistoryOptions.map(work => (
                                <option key={work.id} value={work.id}>{work.label}</option>
                              ))}
                            </CustomSelect>
                            {workHistoryOptions.length === 0 && (
                              <p className="mt-1.5 text-xs text-gray-500">Add work history first to select a reference</p>
                            )}
                        </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                              <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">+1</div>
                          <input
                            type="tel"
                                  value={addReferencePhone}
                                  onChange={(e) => {
                                    // Only allow digits and limit to 10 digits
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                                    setAddReferencePhone(value)
                                  }}
                            placeholder="Enter 10 digits"
                                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                            maxLength={10}
                          />
                        </div>
                      </div>
                      <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                                value={addReferenceEmail}
                                onChange={(e) => setAddReferenceEmail(e.target.value)}
                          placeholder="Enter email address"
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                        />
                      </div>
                        </div>
                        </>
                      )
                    })()}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        setShowAddReferenceModal(false)
                        setAddReferenceName('')
                        setAddReferenceTitle('')
                        setAddReferenceWorkHistoryId('')
                        setAddReferencePhone('')
                        setAddReferenceEmail('')
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                        const formData = {
                          name: addReferenceName,
                          title: addReferenceTitle,
                          workHistoryId: addReferenceWorkHistoryId,
                          phone: addReferencePhone,
                          email: addReferenceEmail
                        }
                        if (!isFormDataValid('references', formData)) {
                          if (!addReferenceName?.trim()) {
                            toast.error('Please enter full name')
                            return
                          }
                          if (!addReferenceTitle?.trim()) {
                            toast.error('Please select reference job title')
                            return
                          }
                          if (!addReferencePhone?.trim() && !addReferenceEmail?.trim()) {
                            toast.error('Please provide at least one contact method (phone number or email)')
                            return
                          }
                          if (addReferencePhone?.trim() && !isValidPhone(addReferencePhone)) {
                            toast.error('Please enter a valid 10-digit phone number')
                            return
                          }
                          if (addReferenceEmail?.trim() && !isValidEmail(addReferenceEmail)) {
                            toast.error('Please enter a valid email address')
                            return
                          }
                          return
                        }
                        // Save to localStorage
                        saveUserDataToLocalStorage('references', formData)
                          toast.success('Reference added successfully')
                          setShowAddReferenceModal(false)
                        setAddReferenceName('')
                        setAddReferenceTitle('')
                        setAddReferenceWorkHistoryId('')
                        setAddReferencePhone('')
                        setAddReferenceEmail('')
                      }}
                      disabled={!isFormDataValid('references', {
                        name: addReferenceName,
                        title: addReferenceTitle,
                        workHistoryId: addReferenceWorkHistoryId,
                        phone: addReferencePhone,
                        email: addReferenceEmail
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('references', {
                          name: addReferenceName,
                          title: addReferenceTitle,
                          workHistoryId: addReferenceWorkHistoryId,
                          phone: addReferencePhone,
                          email: addReferenceEmail
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      Add
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Edit License Modal */}
      {showEditLicenseModal && selectedItem && (
        <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => {
              setShowEditLicenseModal(false)
              setSelectedItem(null)
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
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Edit Professional License
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Professional Licenses
                        </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Type <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={editLicenseType}
                        onChange={(value) => setEditLicenseType(value)}
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
                      <input type="text" value={editLicenseNumber} onChange={(e) => setEditLicenseNumber(e.target.value)} placeholder="Enter license number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                      </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <CustomSelect
                        value={editLicenseState}
                        onChange={(value) => setEditLicenseState(value)}
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
                        value={editLicenseExpiration}
                        onChange={(value) => setEditLicenseExpiration(value)}
                        placeholder="Select expiration date"
                        showFormat={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                        onClick={() => {
                          setShowEditLicenseModal(false)
                          setSelectedItem(null)
                        }}
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                        onClick={handleUpdateLicense}
                      disabled={!isFormDataValid('licenses', {
                        type: editLicenseType,
                        number: editLicenseNumber,
                        state: editLicenseState,
                        expiration: editLicenseExpiration
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('licenses', {
                          type: editLicenseType,
                          number: editLicenseNumber,
                          state: editLicenseState,
                          expiration: editLicenseExpiration
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                          Update
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Edit Professional Certificate Modal */}
      {showEditCertificateModal && selectedItem && (
        <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => {
              setShowEditCertificateModal(false)
              setSelectedItem(null)
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
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          Edit Certificate
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Professional Certificates
                        </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Type <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={editCertificateType}
                        onChange={(value) => setEditCertificateType(value)}
                        placeholder="Select certificate type"
                        icon={Award}
                        >
                          <option value="">Select certificate type</option>
                        {CERTIFICATE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                      </CustomSelect>
                        </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                      <input type="text" value={editCertificateNumber} onChange={(e) => setEditCertificateNumber(e.target.value)} placeholder="Enter certificate number" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" />
                      </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                      <CustomDatePicker
                        value={editCertificateExpiration}
                        onChange={(value) => setEditCertificateExpiration(value)}
                        placeholder="Select expiration date"
                        showFormat={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                        onClick={() => {
                          setShowEditCertificateModal(false)
                          setSelectedItem(null)
                        }}
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                        onClick={handleUpdateCertificate}
                      disabled={!isFormDataValid('certificates', {
                        type: editCertificateType,
                        number: editCertificateNumber,
                        expiration: editCertificateExpiration
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('certificates', {
                          type: editCertificateType,
                          number: editCertificateNumber,
                          expiration: editCertificateExpiration
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                          Update
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Edit Certification Specialty Modal */}
      {showEditSpecialtyModal && selectedItem && (
        <AnimatePresence>
        <>
            {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => {
              setShowEditSpecialtyModal(false)
              setSelectedItem(null)
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
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Edit Certification Specialty
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Nursing Specialties
                        </p>
                    </div>
                  </div>
                </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certification <span className="text-red-500">*</span>
                      </label>
                      {(() => {
                        const availableSpecialties = editSpecialtyCertification 
                          ? (CERTIFICATION_SPECIALTIES_MAP[editSpecialtyCertification] || [])
                          : []
                        const hasNoSpecialties = editSpecialtyCertification && availableSpecialties.length === 0
                        
                        return (
                          <>
                            <CustomSelect
                              value={editSpecialtyCertification}
                              onChange={(value) => {
                                setEditSpecialtyCertification(value)
                                setEditSpecialtySpecialty('') // Clear specialty when certification changes
                              }}
                              placeholder="Select certification"
                              icon={Award}
                      >
                        <option value="">Select certification</option>
                              {CERTIFICATIONS.map(cert => <option key={cert} value={cert}>{cert}</option>)}
                            </CustomSelect>
                            {hasNoSpecialties && (
                              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                <span>⚠</span>
                                <span>No specialties available for the selected certification.</span>
                              </p>
                            )}
                          </>
                        )
                      })()}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialty <span className="text-red-500">*</span>
                      </label>
                      {(() => {
                        const availableSpecialties = editSpecialtyCertification 
                          ? (CERTIFICATION_SPECIALTIES_MAP[editSpecialtyCertification] || [])
                          : []
                        const hasNoSpecialties = Boolean(editSpecialtyCertification && availableSpecialties.length === 0)
                        
                        return (
                          <>
                            <CustomSelect
                              value={editSpecialtySpecialty}
                              onChange={(value) => setEditSpecialtySpecialty(value)}
                              placeholder={editSpecialtyCertification ? "Select specialty" : "Select certification first"}
                              icon={Award}
                              disabled={!editSpecialtyCertification || hasNoSpecialties}
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
                            {editSpecialtyCertification && availableSpecialties.length > 0 && !editSpecialtySpecialty && (
                              <p className="mt-1.5 text-xs text-gray-500">
                                Please select a specialty from the available options.
                              </p>
                            )}
                          </>
                        )
                      })()}
                  </div>
                </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                        onClick={() => {
                          setShowEditSpecialtyModal(false)
                          setSelectedItem(null)
                        }}
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        Cancel
                    </button>
                    <button 
                        onClick={handleUpdateSpecialty}
                      disabled={!isFormDataValid('specialties', {
                        certification: editSpecialtyCertification,
                        specialty: editSpecialtySpecialty
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('specialties', {
                          certification: editSpecialtyCertification,
                          specialty: editSpecialtySpecialty
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                          Update
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Edit Work History Modal */}
      {showEditWorkHistoryModal && selectedItem && (
        <AnimatePresence>
        <>
            {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => {
              setShowEditWorkHistoryModal(false)
              setSelectedItem(null)
                // Reset all form fields
                setEditWorkHistoryTitle('')
                setEditWorkHistoryUnit('')
                setEditWorkHistoryStartDate('')
                setEditWorkHistoryEndDate('')
              setEditCurrentlyWorking(false)
                setEditWorkHistoryAgency('')
                setEditWorkHistoryDescription('')
                setEditChargeExperience(false)
                setEditChargeExperienceComment('')
              setEditTravelAssignment(false)
              setEditPerDiem(false)
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
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Edit Work History
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Work History
                        </p>
                    </div>
                  </div>
                </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    {(() => {
                      // Get unique facilities from jobs
                      const uniqueFacilities = Array.from(new Set(SAMPLE_JOBS.map(job => job.facilityName).filter(Boolean))).sort()
                      
                      // Get unique specialties from jobs
                      const uniqueSpecialties = Array.from(new Set(
                        SAMPLE_JOBS.map(job => {
                          const parts = job.licenseSpecialty?.split(' - ') || []
                          return parts.length > 1 ? parts.slice(1).join(' - ') : parts[0] || ''
                        }).filter(s => s.trim() !== '')
                      )).sort()
                      
                      return (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Employer Full Name <span className="text-red-500">*</span></label>
                            <SearchableDropdown
                              value={editWorkHistoryTitle}
                              onChange={(value) => setEditWorkHistoryTitle(value)}
                              placeholder="Search facilities..."
                              options={uniqueFacilities}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Unit <span className="text-red-500">*</span></label>
                            <SearchableDropdown
                              value={editWorkHistoryUnit}
                              onChange={(value) => setEditWorkHistoryUnit(value)}
                              placeholder="Search specialties..."
                              options={uniqueSpecialties}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                              <CustomDatePicker
                                value={editWorkHistoryStartDate}
                                onChange={(value) => {
                                  setEditWorkHistoryStartDate(value)
                                  if (editWorkHistoryEndDate && isEndDateBeforeStartDate(value, editWorkHistoryEndDate)) {
                                    setEditWorkHistoryEndDate('')
                                  }
                                }}
                                placeholder="Select start date"
                                showFormat={false}
                                maxDate="today"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date {!editCurrentlyWorking && <span className="text-red-500">*</span>}
                      </label>
                              <CustomDatePicker
                                value={editWorkHistoryEndDate}
                                onChange={(value) => setEditWorkHistoryEndDate(value)}
                                placeholder="Select end date"
                        disabled={editCurrentlyWorking}
                                showFormat={false}
                                minDate={editWorkHistoryStartDate || undefined}
                                maxDate="today"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                              id="editCurrentlyWorking" 
                          checked={editCurrentlyWorking}
                              onChange={(e) => {
                                setEditCurrentlyWorking(e.target.checked)
                                if (e.target.checked) {
                                  setEditWorkHistoryEndDate('')
                                }
                              }} 
                              className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                              style={{ accentColor: '#7F2860' }}
                            />
                            <label htmlFor="editCurrentlyWorking" className="text-sm text-gray-700 cursor-pointer">Currently working here</label>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description / Special Skills / Experience</label>
                            <textarea 
                              value={editWorkHistoryDescription} 
                              onChange={(e) => setEditWorkHistoryDescription(e.target.value)} 
                              placeholder="Describe your role and responsibilities..."
                              rows={3} 
                              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                                id="editTravelAssignment" 
                          checked={editTravelAssignment}
                                onChange={(e) => {
                                  setEditTravelAssignment(e.target.checked)
                                  if (e.target.checked) {
                                    setEditPerDiem(false)
                                  }
                                }} 
                                className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                                style={{ accentColor: '#7F2860' }}
                              />
                              <label htmlFor="editTravelAssignment" className="text-sm text-gray-700 cursor-pointer">Travel Assignment</label>
                            </div>
                            <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                                id="editChargeExperience" 
                                checked={editChargeExperience} 
                                onChange={(e) => setEditChargeExperience(e.target.checked)} 
                                className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                                style={{ accentColor: '#7F2860' }}
                              />
                              <label htmlFor="editChargeExperience" className="text-sm text-gray-700 cursor-pointer">Charge Experience?</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                id="editPerDiem" 
                          checked={editPerDiem}
                          onChange={(e) => {
                            setEditPerDiem(e.target.checked)
                                  if (e.target.checked) {
                                    setEditTravelAssignment(false)
                                  }
                                }} 
                                className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                                style={{ accentColor: '#7F2860' }}
                              />
                              <label htmlFor="editPerDiem" className="text-sm text-gray-700 cursor-pointer">Per Diem</label>
                            </div>
                          </div>
                          {editTravelAssignment && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Staffing Agency Name <span className="text-red-500">*</span></label>
                        <input 
                                type="text" 
                                value={editWorkHistoryAgency} 
                                onChange={(e) => setEditWorkHistoryAgency(e.target.value)} 
                                placeholder="Enter staffing agency name" 
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                              />
                            </div>
                          )}
                    {editChargeExperience && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
                              <textarea 
                                value={editChargeExperienceComment} 
                                onChange={(e) => setEditChargeExperienceComment(e.target.value)} 
                                placeholder="Describe your charge experience..."
                                rows={3} 
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                              />
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => { 
                        setShowEditWorkHistoryModal(false)
                        setSelectedItem(null)
                        // Reset all form fields
                        setEditWorkHistoryTitle('')
                        setEditWorkHistoryUnit('')
                        setEditWorkHistoryStartDate('')
                        setEditWorkHistoryEndDate('')
                        setEditCurrentlyWorking(false)
                        setEditWorkHistoryAgency('')
                        setEditWorkHistoryDescription('')
                        setEditChargeExperience(false)
                        setEditChargeExperienceComment('')
                        setEditTravelAssignment(false)
                        setEditPerDiem(false)
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleUpdateWorkHistory}
                      disabled={!isFormDataValid('workHistory', {
                        title: editWorkHistoryTitle,
                        unit: editWorkHistoryUnit,
                        startDate: editWorkHistoryStartDate,
                        endDate: editWorkHistoryEndDate,
                        currentlyWorking: editCurrentlyWorking,
                        travelAssignment: editTravelAssignment,
                        agency: editWorkHistoryAgency,
                        chargeExperience: editChargeExperience,
                        chargeExperienceComment: editChargeExperienceComment
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('workHistory', {
                          title: editWorkHistoryTitle,
                          unit: editWorkHistoryUnit,
                          startDate: editWorkHistoryStartDate,
                          endDate: editWorkHistoryEndDate,
                          currentlyWorking: editCurrentlyWorking,
                          travelAssignment: editTravelAssignment,
                          agency: editWorkHistoryAgency,
                          chargeExperience: editChargeExperience,
                          chargeExperienceComment: editChargeExperienceComment
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                          Update
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Edit Education History Modal */}
      {showEditEducationModal && selectedItem && (
        <AnimatePresence>
        <>
            {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => {
              setShowEditEducationModal(false)
              setSelectedItem(null)
              setEditDidGraduate(false)
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
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          Edit Education
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Education History
                        </p>
                    </div>
                  </div>
                </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">School Name <span className="text-red-500">*</span></label>
                      <SearchableDropdown
                        value={selectedItem.title || ''}
                        onChange={() => {}}
                        placeholder="Search schools..."
                        options={SCHOOLS}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course of Study <span className="text-red-500">*</span></label>
                      <CustomSelect
                        value={selectedItem.course || ''}
                        onChange={() => {}}
                        placeholder="Select course of study"
                        icon={GraduationCap}
                      >
                        <option value="">Select course of study</option>
                        {COURSE_OF_STUDY.map(course => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </CustomSelect>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                        id="editDidGraduate" 
                          checked={editDidGraduate}
                          onChange={(e) => setEditDidGraduate(e.target.checked)}
                        className="w-4 h-4 text-primary-600 rounded border-2 border-gray-300 focus:ring-primary-500 cursor-pointer accent-primary-600"
                        style={{ accentColor: '#7F2860' }}
                      />
                      <label htmlFor="editDidGraduate" className="text-sm text-gray-700 cursor-pointer">Did you Graduate?</label>
                    </div>
                    {editDidGraduate && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date <span className="text-red-500">*</span></label>
                          <CustomDatePicker
                            value={selectedItem.graduated || ''}
                            onChange={() => {}}
                            placeholder="dd/mm/yyyy"
                            showFormat={true}
                            maxDate="today"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Degree <span className="text-red-500">*</span></label>
                          <CustomSelect
                            value={selectedItem.degree || ''}
                            onChange={() => {}}
                            placeholder="Select degree"
                            icon={GraduationCap}
                          >
                            <option value="">Select degree</option>
                            {DEGREES.map(degree => (
                              <option key={degree} value={degree}>{degree}</option>
                            ))}
                          </CustomSelect>
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
                        setShowEditEducationModal(false)
                        setSelectedItem(null)
                        setEditDidGraduate(false)
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleUpdateEducation}
                      disabled={!isFormDataValid('education', {
                        title: editEducationTitle,
                        course: editEducationCourse,
                        didGraduate: editDidGraduate,
                        graduated: editEducationGraduated,
                        degree: editEducationDegree
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('education', {
                          title: editEducationTitle,
                          course: editEducationCourse,
                          didGraduate: editDidGraduate,
                          graduated: editEducationGraduated,
                          degree: editEducationDegree
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                          Update
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Edit Professional Reference Modal */}
      {showEditReferenceModal && selectedItem && (
        <AnimatePresence>
        <>
            {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100000]"
            onClick={() => {
              setShowEditReferenceModal(false)
              setSelectedItem(null)
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
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          Edit Professional Reference
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                          Professional References
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 bg-white">
                  <div className="space-y-4">
                    {(() => {
                      // Get work history items for the dropdown
                      const workHistoryOptions = (authUser?.workHistory || []).map((work: any) => ({
                        id: work.id,
                        label: `${work.title || work.facility || ''}${work.unit ? ` - ${work.unit}` : ''}${work.startDate ? ` (${formatDateToDDMMYYYY(work.startDate)} - ${work.currentlyWorking ? 'Present' : (work.endDate ? formatDateToDDMMYYYY(work.endDate) : 'N/A')})` : ''}`
                      }))
                      
                      return (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              defaultValue={selectedItem.name || ''} 
                              onChange={() => {}} 
                              placeholder="Enter full name" 
                              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Reference Job Title <span className="text-red-500">*</span></label>
                            <CustomSelect
                              value={selectedItem.title || ''}
                              onChange={() => {}}
                              placeholder="Select job title"
                              icon={Briefcase}
                            >
                              <option value="">Select job title</option>
                              {REFERENCE_JOB_TITLES.map(title => (
                                <option key={title} value={title}>{title}</option>
                              ))}
                            </CustomSelect>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Where did you work together?</label>
                            <CustomSelect
                              value={selectedItem.workHistoryId || ''}
                              onChange={() => {}}
                              placeholder="Select from your work history"
                              icon={Briefcase}
                              disabled={workHistoryOptions.length === 0}
                            >
                              <option value="">Select from your work history</option>
                              {workHistoryOptions.map(work => (
                                <option key={work.id} value={work.id}>{work.label}</option>
                              ))}
                            </CustomSelect>
                            {workHistoryOptions.length === 0 && (
                              <p className="mt-1.5 text-xs text-gray-500">Add work history first to select a reference</p>
                            )}
                    </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                              <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">+1</div>
                                <input 
                                  type="tel" 
                                  defaultValue={selectedItem.phone || ''} 
                                  onChange={() => {}} 
                                  placeholder="Enter 10 digits" 
                                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                                  maxLength={10}
                                />
                  </div>
                </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                              <input 
                                type="email" 
                                defaultValue={selectedItem.email || ''} 
                                onChange={() => {}} 
                                placeholder="Enter email address" 
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none" 
                              />
                </div>
                  </div>
                        </>
                      )
                    })()}
                </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-t from-gray-50/50 via-white to-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => { 
                        setShowEditReferenceModal(false)
                        setSelectedItem(null)
                      }} 
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleUpdateReference}
                      disabled={!isFormDataValid('references', {
                        name: editReferenceName,
                        title: editReferenceTitle,
                        workHistoryId: editReferenceWorkHistoryId,
                        phone: editReferencePhone,
                        email: editReferenceEmail
                      })}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-lg ${
                        isFormDataValid('references', {
                          name: editReferenceName,
                          title: editReferenceTitle,
                          workHistoryId: editReferenceWorkHistoryId,
                          phone: editReferencePhone,
                          email: editReferenceEmail
                        })
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-xl shadow-primary-500/30'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                          Update
                    </button>
                </div>
              </div>
            </motion.div>
            </div>
        </>
        </AnimatePresence>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6"
            onClick={handleDeleteCancel}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-lg mx-4 sm:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-red-400/10 to-red-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
                
                {/* Header Section */}
                <div className="relative px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 flex-shrink-0">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-5">
                    {/* Animated Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1
                      }}
                      className="relative"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                        <Trash2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      {/* Pulsing ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-red-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-xl sm:text-2xl font-bold text-gray-900 mb-1"
                      >
                        Delete {deleteSection}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Are you sure you want to delete this {deleteSection.toLowerCase()}? This action cannot be undone.
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Footer */}
                <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                  <div className="flex items-center justify-center gap-3">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteCancel}
                      className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow text-sm sm:text-base"
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteConfirm}
                      className="group relative px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Trash2 className="w-5 h-5" />
                        Delete
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
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Profile Photo Upload Modal */}
      <AnimatePresence>
        {showPhotoUploadModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
              onClick={handleCancelPhotoUpload}
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200 bg-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Camera className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Change Profile Photo</h2>
                      <p className="text-sm text-gray-500 mt-0.5">Upload a new profile picture</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCancelPhotoUpload}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {!photoPreview ? (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-primary-400 transition-colors">
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mb-4">PNG, JPG, GIF up to 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium cursor-pointer transition-colors"
                      >
                        Select Image
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-4 border-gray-200 mb-4">
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileChange}
                        className="hidden"
                        id="photo-upload-change"
                      />
                      <label
                        htmlFor="photo-upload-change"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
                      >
                        Choose Different Image
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
                <button
                  onClick={handleCancelPhotoUpload}
                  className="px-4 py-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                {photoPreview && (
                  <button
                    onClick={handleRemovePhoto}
                    className="px-4 py-2 bg-white border border-red-300 hover:border-red-400 text-red-600 rounded-lg font-medium text-sm transition-colors"
                  >
                    Remove Photo
                  </button>
                )}
                <button
                  onClick={handleSavePhoto}
                  disabled={!photoPreview}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Save Photo
                </button>
              </div>
            </motion.div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </ProtectedRoute>
  )
}

