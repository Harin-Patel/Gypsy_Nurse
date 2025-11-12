'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Mail, MapPin, Calendar, Shield, Award, Briefcase, 
  GraduationCap, Users, Edit, Download, Upload,
  Plus, Trash2, Clock, ArrowUpRight, FileX, Inbox, X
} from 'lucide-react'

export default function ProfilePage() {
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
  
  // Work History Modal States (Add)
  const [currentlyWorking, setCurrentlyWorking] = useState(false)
  const [travelAssignment, setTravelAssignment] = useState(false)
  const [perDiem, setPerDiem] = useState(false)
  const [chargeExperience, setChargeExperience] = useState(false)
  
  // Work History Modal States (Edit)
  const [editCurrentlyWorking, setEditCurrentlyWorking] = useState(false)
  const [editTravelAssignment, setEditTravelAssignment] = useState(false)
  const [editPerDiem, setEditPerDiem] = useState(false)
  const [editChargeExperience, setEditChargeExperience] = useState(false)
  
  // Education Modal States (Add)
  const [didGraduate, setDidGraduate] = useState(false)
  
  // Education Modal States (Edit)
  const [editDidGraduate, setEditDidGraduate] = useState(false)

  // Initialize edit states when modals open
  useEffect(() => {
    if (showEditWorkHistoryModal && selectedItem) {
      setEditCurrentlyWorking(selectedItem.period?.includes('Present') || false)
      setEditTravelAssignment(!!(selectedItem.agency))
      setEditPerDiem(false)
      setEditChargeExperience(!!(selectedItem.chargeExperience))
    }
  }, [showEditWorkHistoryModal, selectedItem])

  useEffect(() => {
    if (showEditEducationModal && selectedItem) {
      setEditDidGraduate(!!(selectedItem.graduated || selectedItem.degree))
    }
  }, [showEditEducationModal, selectedItem])

  // Delete Handler
  const handleDeleteClick = (item: any, section: string) => {
    setDeleteItem(item)
    setDeleteSection(section)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    // Here you would typically call an API to delete the item
    console.log(`Deleting ${deleteSection}:`, deleteItem)
    setShowDeleteModal(false)
    setDeleteItem(null)
    setDeleteSection('')
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setDeleteItem(null)
    setDeleteSection('')
  }

  // Use real user data with defaults
  const user = {
    name: authUser?.name || 'User',
    email: authUser?.email || 'user@example.com',
    avatar: authUser?.avatar || 'https://ui-avatars.com/api/?name=User&background=7f2860&color=fff&size=256',
    experience: '25 Years Experience',
    address: '3371 Columbia Boulevard, Baltimore, Maryland 21218',
    dob: '03/20/1997',
    ssn: '***-**-4321'
  }

  const stats = [
    { label: 'Professional Licenses', count: 4, icon: Shield },
    { label: 'Certificates', count: 4, icon: Award },
    { label: 'Certification Specialties', count: 4, icon: Award },
    { label: 'Work Histories', count: 4, icon: Briefcase },
    { label: 'Education Histories', count: 4, icon: GraduationCap },
    { label: 'References', count: 4, icon: Users },
  ]

  const tabs = [
    'Professional Licenses',
    'Certificates',
    'Specialties',
    'Work History',
    'Education',
    'References'
  ]

  const licenses = [
    {
      title: 'Qualified Medication Assistant',
      number: 'QUALITY1234ASDF',
      state: 'Washington',
      expiration: 'Nov 25, 2025',
      status: 'active'
    },
    {
      title: 'Certified Occupational Therapy Assistant',
      state: 'New Hampshire',
      expiration: 'Nov 30, 2025',
      status: 'active'
    },
    {
      title: 'Customer Service',
      state: 'California',
      expiration: 'Dec 15, 2025',
      status: 'active'
    },
    {
      title: 'Data Analyst',
      state: 'Texas',
      expiration: 'Jan 10, 2026',
      status: 'active'
    },
  ]

  const certificates = [
    {
      title: 'Advanced Cardiac Life Support',
      number: 'ACLS123456ACLS',
      expiration: 'Nov 23, 2025',
      status: 'active'
    },
    {
      title: 'Pediatric Advanced Life Support',
      number: 'PALS12345TEST',
      expiration: 'Dec 15, 2025',
      status: 'active'
    },
    {
      title: 'Pediatric Advanced Life Support',
      number: 'PALS123456',
      expiration: 'Jan 20, 2026',
      status: 'active'
    },
    {
      title: 'Basic Life Support',
      number: 'BLS789012',
      expiration: 'Feb 10, 2026',
      status: 'active'
    },
  ]

  const specialties = [
    {
      title: 'Medical Assistant',
      specialty: 'Internal Use Only'
    },
    {
      title: 'Registered Nurse',
      specialty: 'Case Manager'
    },
    {
      title: 'Administrative Assistant',
      specialty: 'Home Health'
    },
    {
      title: 'Registered Nurse',
      specialty: 'Emergency Room'
    },
  ]

  const workHistory = [
    {
      title: '11603 - CHRISTUS Trinity Mother Frances Canton HealthPark',
      unit: 'Acute Care Social Worker (Medical) Licensed/Clin',
      period: 'Oct 11, 2024 - Oct 10, 2025',
      agency: '',
      description: '',
      chargeExperience: ''
    },
    {
      title: '6822 CHC PR & MSA NE GEORGIA - 2500 Limestone Pkwy Gainesville',
      unit: 'Animal Technician',
      period: 'Aug 1, 2024 - Aug 14, 2025',
      agency: 'Staffing Agency',
      description: 'Special Skills and Experience',
      chargeExperience: ''
    },
    {
      title: 'Banner - Wyoming Medical Center',
      unit: 'Animal Technician',
      period: 'Feb 11, 2022 - Oct 30, 2025',
      agency: 'Testing Staffing Agency',
      description: 'Testing Special Skills',
      chargeExperience: 'Testing Charge Experience'
    },
    {
      title: '13101 - CHRISTUS St Michael Health System',
      unit: 'Acute Care Social Worker (Medical) Licensed/Clin',
      period: 'Dec 19, 2019 - Oct 1, 2025',
      agency: 'Testing Agency',
      description: 'Testing Desc',
      chargeExperience: 'Testing Comment'
    },
  ]

  const education = [
    {
      title: 'Global International School',
      course: 'High School Diploma',
      status: 'Graduated',
      graduated: 'Jul 1, 2021',
      degree: 'Master of Science'
    },
    {
      title: 'Western Oklahoma State College',
      course: 'Information Technology',
      status: 'Did Not Graduate',
      graduated: '',
      degree: ''
    },
    {
      title: 'South Aiken High School',
      course: 'Information Technology',
      status: 'Graduated',
      graduated: 'Sep 28, 2018',
      degree: 'Master of Science'
    },
    {
      title: 'Testing School',
      course: 'High School Diploma',
      status: 'Did Not Graduate',
      graduated: '',
      degree: ''
    },
  ]

  const references = [
    {
      name: 'Jack Sparrow',
      title: 'Preceptor',
      company: 'Banner - Wyoming Medical Center',
      period: '02/11/2022 - 10/30/2025',
      phone: '2066578147',
      email: 'jack@gmail.com'
    },
    {
      name: 'Testing Ref',
      title: 'Director',
      company: '13101 - CHRISTUS St Michael Health System',
      period: '12/19/2019 - 10/01/2025',
      phone: '2066578174',
      email: ''
    },
    {
      name: 'Halen Johnson',
      title: 'Doctor',
      company: 'CommonSpirit Mountain Region - 1010 Three Springs Blvd, Mercy Regional Medical Center, 063 MRMC Dura',
      period: '08/12/2019 - 06/04/2020',
      phone: '2084359012',
      email: 'halen@mailnesia.com'
    },
    {
      name: 'Host User Testing',
      title: 'Nurse',
      company: '2nd Street - St Mary\'s Medical Center - Duluth',
      period: '05/01/2012 - 04/23/2019',
      phone: '2066578174',
      email: 'host@mailnesia.com'
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navigation />

      <div className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
        {/* Profile Header Card with Glass Effect */}
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
              {/* Profile Picture with Glass Effect */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl blur-xl opacity-40" />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="relative w-28 h-28 rounded-3xl object-cover ring-4 ring-white/50 shadow-2xl"
                />
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

                  {/* Action Buttons with Glass Effect */}
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

                {/* Contact Info Grid with Glass Effect */}
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
             activeTab === 'References' ? references.length : 0}
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
                    } else if (activeTab === 'References') {
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
                     activeTab === 'References' ? 'Add Reference' : 'Add Item'}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {licenses.map((license, index) => (
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
                            {license.title}
                          </h3>
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                          <motion.button
                            onClick={() => {
                              setSelectedItem(license)
                              setShowEditLicenseModal(true)
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/90 backdrop-blur-md hover:bg-primary-50 border border-gray-200 hover:border-primary-300 text-primary-600 rounded-lg transition-all shadow-md"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClick(license, 'License')}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/90 backdrop-blur-md hover:bg-red-50 border border-gray-200 hover:border-red-300 text-red-600 rounded-lg transition-all shadow-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Content */}
                        <div className="relative flex-grow">

                          {/* License details with modern styling */}
                          <div className="space-y-3">
                            {/* License Number */}
                            {license.number && (
                              <div className="group/item">
                                <p className="text-xs text-gray-500 mb-1.5 font-semibold">License Number</p>
                                <div className="relative overflow-hidden">
                                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                    <p className="text-sm font-semibold text-gray-900">{license.number}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* State */}
                            <div className="group/item">
                              <p className="text-xs text-gray-500 mb-1.5 font-semibold">State</p>
                              <div className="relative overflow-hidden">
                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{license.state}</p>
                                </div>
                              </div>
                            </div>

                            {/* Expiration Date */}
                            <div className="group/item">
                              <p className="text-xs text-gray-500 mb-1.5 font-semibold">Expiration Date</p>
                              <div className="relative overflow-hidden">
                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{license.expiration}</p>
                                </div>
                              </div>
                            </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {certificates.map((cert, index) => (
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
                            {cert.title}
                          </h3>
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                          <motion.button
                            onClick={() => {
                              setSelectedItem(cert)
                              setShowEditCertificateModal(true)
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/90 backdrop-blur-md hover:bg-primary-50 border border-gray-200 hover:border-primary-300 text-primary-600 rounded-lg transition-all shadow-md"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClick(cert, 'Certificate')}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/90 backdrop-blur-md hover:bg-red-50 border border-gray-200 hover:border-red-300 text-red-600 rounded-lg transition-all shadow-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Content */}
                        <div className="relative flex-grow">

                          {/* Certificate details with modern styling */}
                          <div className="space-y-3">
                            {/* Certificate Number */}
                            <div className="group/item">
                              <p className="text-xs text-gray-500 mb-1.5 font-semibold">Certificate Number</p>
                              <div className="relative overflow-hidden">
                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{cert.number}</p>
                                </div>
                              </div>
                            </div>

                            {/* Expiration Date */}
                            <div className="group/item">
                              <p className="text-xs text-gray-500 mb-1.5 font-semibold">Expiration Date</p>
                              <div className="relative overflow-hidden">
                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{cert.expiration}</p>
                                </div>
                              </div>
                            </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {specialties.map((specialty, index) => (
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
                            {specialty.title}
                          </h3>
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                          <motion.button
                            onClick={() => {
                              setSelectedItem(specialty)
                              setShowEditSpecialtyModal(true)
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/90 backdrop-blur-md hover:bg-primary-50 border border-gray-200 hover:border-primary-300 text-primary-600 rounded-lg transition-all shadow-md"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClick(specialty, 'Specialty')}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-white/90 backdrop-blur-md hover:bg-red-50 border border-gray-200 hover:border-red-300 text-red-600 rounded-lg transition-all shadow-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Content */}
                        <div className="relative flex-grow">
                          {/* Specialty details with modern styling */}
                          <div className="space-y-3">
                            {/* Specialty */}
                            <div className="group/item">
                              <p className="text-xs text-gray-500 mb-1.5 font-semibold">Specialty</p>
                              <div className="relative overflow-hidden">
                                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{specialty.specialty}</p>
                                </div>
                              </div>
                            </div>
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

              {/* Work History Section with Creative UI */}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workHistory.map((work, index) => (
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
                                {work.title}
                              </h3>
                            </div>

                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                              <motion.button
                                onClick={() => {
                                  setSelectedItem(work)
                                  setShowEditWorkHistoryModal(true)
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-white/90 backdrop-blur-md hover:bg-primary-50 border border-gray-200 hover:border-primary-300 text-primary-600 rounded-lg transition-all shadow-md"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteClick(work, 'Work History')}
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-white/90 backdrop-blur-md hover:bg-red-50 border border-gray-200 hover:border-red-300 text-red-600 rounded-lg transition-all shadow-md"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>

                            {/* Content */}
                            <div className="relative flex-grow">
                              {/* Work details with modern styling */}
                              <div className="space-y-3">
                                {/* Unit */}
                                <div className="group/item">
                                  <p className="text-xs text-gray-500 mb-1.5 font-semibold">Unit</p>
                                  <div className="relative overflow-hidden">
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                      <p className="text-sm font-semibold text-gray-900">{work.unit}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Period */}
                                <div className="group/item">
                                  <p className="text-xs text-gray-500 mb-1.5 font-semibold">Period</p>
                                  <div className="relative overflow-hidden">
                                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                      <p className="text-sm font-semibold text-gray-900">{work.period}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Agency - only show if not empty */}
                                {work.agency && (
                                  <div className="group/item">
                                    <p className="text-xs text-gray-500 mb-1.5 font-semibold">Agency</p>
                                    <div className="relative overflow-hidden">
                                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{work.agency}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Description - only show if not empty */}
                                {work.description && (
                                  <div className="group/item">
                                    <p className="text-xs text-gray-500 mb-1.5 font-semibold">Description</p>
                                    <div className="relative overflow-hidden">
                                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{work.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Charge Experience - only show if not empty */}
                                {work.chargeExperience && (
                                  <div className="group/item">
                                    <p className="text-xs text-gray-500 mb-1.5 font-semibold">Charge Experience</p>
                                    <div className="relative overflow-hidden">
                                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl transition-all duration-300 group-hover/item:border-primary-200 group-hover/item:from-primary-50/30 group-hover/item:to-primary-100/30">
                                        <p className="text-sm font-semibold text-gray-900">{work.chargeExperience}</p>
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

              {/* References Section */}
              {activeTab === 'References' && (
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
      </div>

      <Footer />

      {/* Edit Profile Modal */}
      {showEditModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Edit className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Edit Profile Information
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Update your personal and address information
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

              {/* Content Area - Scrollable */}
              <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      First Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="Julia"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
                    />
                  </motion.div>

                  {/* Last Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Last Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="Roberts"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
                    />
                  </motion.div>

                  {/* Date of Birth */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 text-primary-600" />
                      Date of Birth
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      defaultValue="1997-03-20"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
                    />
                    <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Format: MM/DD/YYYY
                    </p>
                  </motion.div>

                  {/* Social Security Number */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Social Security Number
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="987654321"
                      placeholder="123456789"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">Enter exactly 9 digits (e.g., 123456789)</p>
                  </motion.div>

                  {/* Years of Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 text-primary-600" />
                      Years of Experience
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      defaultValue="25"
                      min="1"
                      max="50"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">Must be between 1 and 50 years</p>
                  </motion.div>

                  {/* Address Information Header */}
                  <div className="md:col-span-2 pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <h3 className="text-lg font-bold text-gray-900">Address Information</h3>
                    </div>
                  </div>

                  {/* Street Address */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="3371 Columbia Boulevard"
                      className="w-full px-4 py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-lg focus:shadow-primary-100/50"
                    />
                  </motion.div>

                  {/* Additional Address Line */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Additional Address Line
                    </label>
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full px-4 py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-lg focus:shadow-primary-100/50"
                    />
                  </motion.div>

                  {/* City & State */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue="Baltimore"
                        className="w-full px-4 py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-lg focus:shadow-primary-100/50"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        State
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select
                          defaultValue="MD - Maryland"
                          className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700"
                        >
                          <option>MD - Maryland</option>
                          <option>CA - California</option>
                          <option>NY - New York</option>
                          <option>TX - Texas</option>
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Zipcode */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Zipcode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="21218"
                      placeholder="12345"
                      className="w-full px-4 py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-lg focus:shadow-primary-100/50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: 12345 (5 digits only)</p>
                  </motion.div>
                    </div>
                  </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between gap-4">
                  {/* Info text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="text-xs text-gray-500 flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Your information is secure and encrypted
                  </motion.p>
                  
                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowEditModal(false)}
                      className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Update Profile
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

      {/* Add License Modal */}
      {showAddModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Shield className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Add Professional License
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Fill in your license information to add it to your profile
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Content Area - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* License Type - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 text-primary-600" />
                        License Type
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700">
                          <option value="">Select license type</option>
                          <option>Registered Nurse (RN)</option>
                          <option>Licensed Practical Nurse (LPN)</option>
                          <option>Certified Nursing Assistant (CNA)</option>
                          <option>Nurse Practitioner (NP)</option>
                          <option>Clinical Nurse Specialist (CNS)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Choose the type of professional license you want to add
                      </p>
                    </motion.div>

                    {/* License Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        License Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., RN123456"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* State */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="Search states..."
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Expiration Date - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
                      />
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        We'll send you a reminder before your license expires
                      </p>
                    </motion.div>

                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddModal(false)}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add License
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

      {/* Add Certificate Modal */}
      {showAddCertificateModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddCertificateModal(false)}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Award className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Add Professional Certificate
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Fill in your certificate information to add it to your profile
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Content Area - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Certificate Type - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 text-primary-600" />
                        Certificate Type
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700">
                          <option value="">Select Certificate Type</option>
                          <option>Basic Life Support (BLS)</option>
                          <option>Advanced Cardiovascular Life Support (ACLS)</option>
                          <option>Pediatric Advanced Life Support (PALS)</option>
                          <option>Critical Care Registered Nurse (CCRN)</option>
                          <option>Certified Emergency Nurse (CEN)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Choose the type of certificate you want to add
                      </p>
                    </motion.div>

                    {/* Certificate Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        Certificate Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., RN305437"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Expiration Date */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        placeholder="Select expiration date"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
                      />
                    </motion.div>

                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddCertificateModal(false)}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Certificate
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

      {/* Add Specialty Modal */}
      {showAddSpecialtyModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddSpecialtyModal(false)}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Award className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Add Certification Specialty
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Select your certification and specialty
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Content Area - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 gap-6">
                    
                    {/* Certification */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 text-primary-600" />
                        Certification
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700">
                          <option value="">Select certification</option>
                          <option>Basic Life Support (BLS)</option>
                          <option>Advanced Cardiovascular Life Support (ACLS)</option>
                          <option>Pediatric Advanced Life Support (PALS)</option>
                          <option>Critical Care Registered Nurse (CCRN)</option>
                          <option>Certified Emergency Nurse (CEN)</option>
                          <option>Neonatal Resuscitation Program (NRP)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Select the certification first
                      </p>
                    </motion.div>

                    {/* Specialty */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 text-primary-600" />
                        Specialty
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700">
                          <option value="">Select certification first</option>
                          <option>Emergency Department</option>
                          <option>Intensive Care Unit (ICU)</option>
                          <option>Cardiac Care Unit (CCU)</option>
                          <option>Pediatric Emergency</option>
                          <option>Neonatal Intensive Care Unit (NICU)</option>
                          <option>Medical-Surgical</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Choose your area of specialty
                      </p>
                    </motion.div>

                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddSpecialtyModal(false)}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Specialty
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

      {/* Add Work History Modal */}
      {showAddWorkHistoryModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddWorkHistoryModal(false)
              setCurrentlyWorking(false)
              setTravelAssignment(false)
              setPerDiem(false)
              setChargeExperience(false)
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-3xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Briefcase className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Add Work History
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Enter your work experience details
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Content Area - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Employer Full Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 text-primary-600" />
                        Employer Full Name
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Search facilities..."
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Unit */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        Unit
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Search specialties..."
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Start Date */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        Start Date
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        placeholder="Select start date"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
                      />
                    </motion.div>

                    {/* End Date */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        End Date
                      </label>
                      <input
                        type="date"
                        placeholder="Select end date"
                        disabled={currentlyWorking}
                        className={`w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 font-medium text-gray-700 ${
                          currentlyWorking 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300'
                        }`}
                      />
                    </motion.div>

                    {/* Currently working here - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={currentlyWorking}
                          onChange={(e) => setCurrentlyWorking(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer accent-primary-600"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                          Currently working here
                        </span>
                      </label>
                    </motion.div>

                    {/* Description - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.0 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        Description / Special Skills / Experience
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe your role and responsibilities..."
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400 resize-none"
                      />
                    </motion.div>

                    {/* Travel Assignment, Per Diem & Charge Experience */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.1 }}
                      className="md:col-span-2 flex items-center justify-center gap-12"
                    >
                      <label className={`flex items-center gap-3 group ${perDiem ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        <input
                          type="checkbox"
                          checked={travelAssignment}
                          disabled={perDiem}
                          onChange={(e) => setTravelAssignment(e.target.checked)}
                          className={`w-5 h-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-0 focus:ring-offset-0 transition-all accent-primary-600 ${
                            perDiem ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                        />
                        <span className={`text-sm font-medium transition-colors ${
                          perDiem ? 'text-gray-400' : 'text-gray-700 group-hover:text-primary-600'
                        }`}>
                          Travel Assignment
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={perDiem}
                          onChange={(e) => {
                            setPerDiem(e.target.checked)
                            if (e.target.checked) {
                              setTravelAssignment(false)
                            }
                          }}
                          className="w-5 h-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer accent-primary-600"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                          Per Diem
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={chargeExperience}
                          onChange={(e) => setChargeExperience(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer accent-primary-600"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                          Charge Experience?
                        </span>
                      </label>
                    </motion.div>

                    {/* Staffing Agency Name - Full Width - Only show if Travel Assignment is checked */}
                    {travelAssignment && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-2"
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Briefcase className="w-4 h-4 text-primary-600" />
                          Staffing Agency Name
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter staffing agency name"
                          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                        />
                      </motion.div>
                    )}

                    {/* Comment - Full Width - Only show if Charge Experience is checked */}
                    {chargeExperience && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-2"
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          Comment
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Describe your charge experience..."
                          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400 resize-none"
                        />
                      </motion.div>
                    )}

                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.5 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowAddWorkHistoryModal(false)
                          setCurrentlyWorking(false)
                          setTravelAssignment(false)
                          setPerDiem(false)
                          setChargeExperience(false)
                        }}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Work History
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

      {/* Add Education Modal */}
      {showAddEducationModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddEducationModal(false)
              setDidGraduate(false)
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <GraduationCap className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Add Education History
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Enter your education history details
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Content Area - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* School Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <GraduationCap className="w-4 h-4 text-primary-600" />
                        School Name
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Search schools..."
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Course of Study */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Course of Study
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700">
                          <option value="">Select course of study</option>
                          <option>Bachelor of Science in Nursing (BSN)</option>
                          <option>Associate Degree in Nursing (ADN)</option>
                          <option>Master of Science in Nursing (MSN)</option>
                          <option>Doctor of Nursing Practice (DNP)</option>
                          <option>Licensed Practical Nurse (LPN) Program</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Did you Graduate? - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={didGraduate}
                          onChange={(e) => setDidGraduate(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer accent-primary-600"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                          Did you Graduate?
                        </span>
                      </label>
                    </motion.div>

                    {/* Graduation Date - Only show if graduated */}
                    {didGraduate && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-2"
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 text-primary-600" />
                          Graduation Date
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
                        />
                      </motion.div>
                    )}

                    {/* Degree - Only show if graduated */}
                    {didGraduate && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-2"
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Award className="w-4 h-4 text-primary-600" />
                          Degree
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <select className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700">
                            <option value="">Select degree</option>
                            <option>Associate Degree</option>
                            <option>Bachelor's Degree</option>
                            <option>Master's Degree</option>
                            <option>Doctoral Degree</option>
                            <option>Certificate/Diploma</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowAddEducationModal(false)
                          setDidGraduate(false)
                        }}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Education
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

      {/* Add Reference Modal */}
      {showAddReferenceModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddReferenceModal(false)}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Users className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Add Professional Reference
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Enter your professional reference details
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Content Area - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 gap-6">
                    
                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Users className="w-4 h-4 text-primary-600" />
                        Full Name
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Reference Job Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 text-primary-600" />
                        Reference Job Title
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter job title"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Where did you work together? */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        Where did you work together?
                      </label>
                      <div className="relative group">
                        <select className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700">
                          <option value="">Select from your work history</option>
                          <option>Johns Hopkins Hospital - ICU (2020-2023)</option>
                          <option>Mayo Clinic - Emergency Department (2018-2020)</option>
                          <option>Cleveland Clinic - Cardiac Care (2015-2018)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mobile Phone & Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {/* Mobile Phone */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Mobile Phone
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value="+1"
                            disabled
                            className="w-16 px-3 py-3.5 bg-gray-100 border-2 border-gray-200 rounded-xl font-medium text-gray-700 text-center"
                          />
                          <input
                            type="tel"
                            placeholder="Enter 10 digits"
                            maxLength={10}
                            className="flex-1 px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 text-primary-600" />
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter email address"
                          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                        />
                      </div>
                    </motion.div>

                    {/* Note */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      className="bg-pink-50 border border-pink-200 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-pink-800 mb-1">Note:</p>
                          <p className="text-sm text-pink-700">At least one contact method (mobile phone or email) is required.</p>
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.0 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddReferenceModal(false)}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Reference
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

      {/* Edit License Modal */}
      {showEditLicenseModal && selectedItem && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEditLicenseModal(false)
              setSelectedItem(null)
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Shield className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Edit Professional License
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Update your license information
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Content Area - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* License Type - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 text-primary-600" />
                        License Type
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select 
                          defaultValue={selectedItem.title || ''}
                          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700"
                        >
                          <option value="">Select license type</option>
                          <option value="Qualified Medication Assistant">Qualified Medication Assistant</option>
                          <option value="Certified Occupational Therapy Assistant">Certified Occupational Therapy Assistant</option>
                          <option value="Customer Service">Customer Service</option>
                          <option value="Registered Nurse (RN)">Registered Nurse (RN)</option>
                          <option value="Licensed Practical Nurse (LPN)">Licensed Practical Nurse (LPN)</option>
                          <option value="Certified Nursing Assistant (CNA)">Certified Nursing Assistant (CNA)</option>
                          <option value="Nurse Practitioner (NP)">Nurse Practitioner (NP)</option>
                          <option value="Clinical Nurse Specialist (CNS)">Clinical Nurse Specialist (CNS)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Choose the type of professional license
                      </p>
                    </motion.div>

                    {/* License Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        License Number
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedItem.number || ''}
                        placeholder="e.g., RN123456"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* State */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        State
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedItem.state || ''}
                        placeholder="Search states..."
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Expiration Date - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedItem.expiration || ''}
                        placeholder="e.g., Nov 25, 2025"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        We'll send you a reminder before your license expires
                      </p>
                    </motion.div>

                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowEditLicenseModal(false)
                          setSelectedItem(null)
                        }}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Update
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

      {/* Edit Professional Certificate Modal */}
      {showEditCertificateModal && selectedItem && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEditCertificateModal(false)
              setSelectedItem(null)
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Award className="w-8 h-8 text-white" />
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
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Edit Professional Certificate
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Update your certificate information
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Content Area - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Certificate Type - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 text-primary-600" />
                        Certificate Type
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <select 
                          defaultValue={selectedItem.title || ''}
                          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700"
                        >
                          <option value="">Select certificate type</option>
                          <option value="Basic Life Support">Basic Life Support</option>
                          <option value="Advanced Cardiac Life Support">Advanced Cardiac Life Support</option>
                          <option value="Pediatric Advanced Life Support">Pediatric Advanced Life Support</option>
                          <option value="Neonatal Resuscitation Program">Neonatal Resuscitation Program</option>
                          <option value="Critical Care Registered Nurse">Critical Care Registered Nurse</option>
                          <option value="Basic Life Support (BLS)">Basic Life Support (BLS)</option>
                          <option value="Advanced Cardiovascular Life Support (ACLS)">Advanced Cardiovascular Life Support (ACLS)</option>
                          <option value="Pediatric Advanced Life Support (PALS)">Pediatric Advanced Life Support (PALS)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Choose the type of professional certificate
                      </p>
                    </motion.div>

                    {/* Certificate Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        Certificate Number
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedItem.number || ''}
                        placeholder="e.g., BLS123456"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>

                    {/* Expiration Date - Full Width */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="md:col-span-2"
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedItem.expiration || ''}
                        placeholder="e.g., Nov 25, 2025"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        We'll send you a reminder before your certificate expires
                      </p>
                    </motion.div>

                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    {/* Info text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowEditCertificateModal(false)
                          setSelectedItem(null)
                        }}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Update
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

      {/* Edit Certification Specialty Modal */}
      {showEditSpecialtyModal && selectedItem && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEditSpecialtyModal(false)
              setSelectedItem(null)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="relative px-8 pt-8 pb-6">
                  <div className="flex items-start gap-5">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Edit Certification Specialty
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Update your certification and specialty
                      </motion.p>
                    </div>
                  </div>
                </div>
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 text-primary-600" />
                        Certification
                      </label>
                      <select 
                        defaultValue={selectedItem.title || ''}
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 appearance-none cursor-pointer hover:border-gray-300 font-medium text-gray-700"
                      >
                        <option value="">Select certification</option>
                        <option value="Medical Assistant">Medical Assistant</option>
                        <option value="Registered Nurse">Registered Nurse</option>
                        <option value="Administrative Assistant">Administrative Assistant</option>
                        <option value="Licensed Practical Nurse">Licensed Practical Nurse</option>
                        <option value="Certified Nursing Assistant">Certified Nursing Assistant</option>
                        <option value="ACLS">ACLS</option>
                        <option value="BLS">BLS</option>
                        <option value="PALS">PALS</option>
                        <option value="NRP">NRP</option>
                        <option value="CCRN">CCRN</option>
                      </select>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Specialty
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedItem.specialty || ''}
                        placeholder="e.g., Emergency Care"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </motion.p>
                    <div className="flex items-center gap-3">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowEditSpecialtyModal(false)
                          setSelectedItem(null)
                        }}
                        className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Update
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
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

      {/* Edit Work History Modal */}
      {showEditWorkHistoryModal && selectedItem && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEditWorkHistoryModal(false)
              setSelectedItem(null)
              setEditCurrentlyWorking(false)
              setEditTravelAssignment(false)
              setEditPerDiem(false)
              setEditChargeExperience(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="relative px-8 pt-8 pb-6">
                  <div className="flex items-start gap-5">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Edit Work History
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Update your work experience details
                      </motion.p>
                    </div>
                  </div>
                </div>
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 text-primary-600" />
                        Employer Full Name
                      </label>
                      <input type="text" defaultValue={selectedItem.title || ''} placeholder="e.g., City Hospital" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        Unit
                      </label>
                      <input type="text" defaultValue={selectedItem.unit || ''} placeholder="e.g., ICU" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        Start Date
                      </label>
                      <input type="text" defaultValue={selectedItem.period?.split(' - ')[0] || ''} placeholder="e.g., Jan 2020" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        End Date
                      </label>
                      <input 
                        type="text" 
                        defaultValue={selectedItem.period?.split(' - ')[1] || ''} 
                        placeholder="e.g., Present" 
                        disabled={editCurrentlyWorking}
                        className={`w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400 ${editCurrentlyWorking ? 'opacity-50 cursor-not-allowed' : ''}`} 
                      />
                    </motion.div>
                    
                    {/* Currently Working Here Checkbox */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={editCurrentlyWorking}
                          onChange={(e) => setEditCurrentlyWorking(e.target.checked)}
                          className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer accent-primary-600" 
                        />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">Currently working here</span>
                      </label>
                    </motion.div>

                    {selectedItem.description && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.9 }} className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                          Description
                        </label>
                        <textarea defaultValue={selectedItem.description || ''} rows={3} placeholder="Describe your responsibilities..." className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400 resize-none" />
                      </motion.div>
                    )}

                    {/* Travel Assignment, Per Diem, Charge Experience Checkboxes */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.0 }} className="md:col-span-2 flex items-center justify-center gap-12">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={editTravelAssignment}
                          onChange={(e) => setEditTravelAssignment(e.target.checked)}
                          disabled={editPerDiem}
                          className={`w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer accent-primary-600 ${editPerDiem ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <span className={`text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors ${editPerDiem ? 'opacity-50' : ''}`}>Travel Assignment</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={editPerDiem}
                          onChange={(e) => {
                            setEditPerDiem(e.target.checked)
                            if (e.target.checked) setEditTravelAssignment(false)
                          }}
                          className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer accent-primary-600" 
                        />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">Per Diem</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={editChargeExperience}
                          onChange={(e) => setEditChargeExperience(e.target.checked)}
                          className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer accent-primary-600" 
                        />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">Charge Experience</span>
                      </label>
                    </motion.div>

                    {/* Staffing Agency Name - Conditional */}
                    {editTravelAssignment && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }} 
                        className="md:col-span-2"
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Briefcase className="w-4 h-4 text-primary-600" />
                          Staffing Agency Name
                        </label>
                        <input type="text" defaultValue={selectedItem.agency || ''} placeholder="e.g., Healthcare Staffing Solutions" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                      </motion.div>
                    )}

                    {/* Comment - Conditional */}
                    {editChargeExperience && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }} 
                        className="md:col-span-2"
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                          Comment
                        </label>
                        <textarea rows={3} defaultValue={selectedItem.chargeExperience || ''} placeholder="Add any additional comments..." className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400 resize-none" />
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.9 }} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      Your information is secure and encrypted
                    </motion.p>
                    <div className="flex items-center gap-3">
                      <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 1.0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowEditWorkHistoryModal(false); setSelectedItem(null); setEditCurrentlyWorking(false); setEditTravelAssignment(false); setEditPerDiem(false); setEditChargeExperience(false); }} className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow">Cancel</motion.button>
                      <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 1.1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Update
                        </span>
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Edit Education History Modal */}
      {showEditEducationModal && selectedItem && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEditEducationModal(false)
              setSelectedItem(null)
              setEditDidGraduate(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="relative px-8 pt-8 pb-6">
                  <div className="flex items-start gap-5">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Edit Education History
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Update your education details
                      </motion.p>
                    </div>
                  </div>
                </div>
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <GraduationCap className="w-4 h-4 text-primary-600" />
                        School Name
                      </label>
                      <input type="text" defaultValue={selectedItem.title || ''} placeholder="e.g., University of California" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        Course of Study
                      </label>
                      <input type="text" defaultValue={selectedItem.course || ''} placeholder="e.g., Bachelor of Science in Nursing" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    
                    {/* Did you Graduate Checkbox */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={editDidGraduate}
                          onChange={(e) => setEditDidGraduate(e.target.checked)}
                          className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer accent-primary-600" 
                        />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">Did you Graduate?</span>
                      </label>
                    </motion.div>

                    {editDidGraduate && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 text-primary-600" />
                            Graduation Date
                          </label>
                          <input type="text" defaultValue={selectedItem.graduated || ''} placeholder="e.g., May 2020" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Award className="w-4 h-4 text-primary-600" />
                            Degree
                          </label>
                          <input type="text" defaultValue={selectedItem.degree || ''} placeholder="e.g., BSN" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.8 }} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      Your information is secure and encrypted
                    </motion.p>
                    <div className="flex items-center gap-3">
                      <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.9 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowEditEducationModal(false); setSelectedItem(null); setEditDidGraduate(false); }} className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow">Cancel</motion.button>
                      <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 1.0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Update
                        </span>
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Edit Professional Reference Modal */}
      {showEditReferenceModal && selectedItem && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEditReferenceModal(false)
              setSelectedItem(null)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-2xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="relative px-8 pt-8 pb-6">
                  <div className="flex items-start gap-5">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary-500 rounded-2xl"
                      />
                    </motion.div>
                    <div className="flex-1 pt-1">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-2xl font-bold text-gray-900 mb-1"
                      >
                        Edit Professional Reference
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-sm text-gray-600"
                      >
                        Update your reference details
                      </motion.p>
                    </div>
                  </div>
                </div>
                <div className="px-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Users className="w-4 h-4 text-primary-600" />
                        Full Name
                      </label>
                      <input type="text" defaultValue={selectedItem.name || ''} placeholder="e.g., John Smith" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 text-primary-600" />
                        Reference Job Title
                      </label>
                      <input type="text" defaultValue={selectedItem.title || ''} placeholder="e.g., Nurse Manager" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }} className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        Company
                      </label>
                      <input type="text" defaultValue={selectedItem.company || ''} placeholder="e.g., City Hospital" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 }}>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        Mobile Phone
                      </label>
                      <input type="tel" defaultValue={selectedItem.phone || ''} placeholder="e.g., (555) 123-4567" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 }}>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Email
                      </label>
                      <input type="email" defaultValue={selectedItem.email || ''} placeholder="e.g., john@example.com" className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700 placeholder:text-gray-400" />
                    </motion.div>
                  </div>
                </div>
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.9 }} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      Your information is secure and encrypted
                    </motion.p>
                    <div className="flex items-center gap-3">
                      <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 1.0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowEditReferenceModal(false); setSelectedItem(null); }} className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow">Cancel</motion.button>
                      <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 1.1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Update
                        </span>
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleDeleteCancel}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect behind modal */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-red-400/10 to-red-500/10 rounded-3xl blur-3xl" />
              
              {/* Main modal container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="relative px-8 pt-8 pb-6">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                        <Trash2 className="w-8 h-8 text-white" />
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
                        className="text-2xl font-bold text-gray-900 mb-1"
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
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-3">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteCancel}
                      className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
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
      </div>
    </ProtectedRoute>
  )
}
