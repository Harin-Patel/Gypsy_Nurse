'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Info, 
  ExternalLink,
  Shield,
  Globe,
  Users,
  AlertCircle,
  BookOpen
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'

// NLC States - 43 states as of August 7, 2025 (per thegypsynurse.com)
const participatingStates = [
  { name: 'Alabama', status: 'active' },
  { name: 'Arizona', status: 'active' },
  { name: 'Arkansas', status: 'active' },
  { name: 'Colorado', status: 'active' },
  { name: 'Connecticut', status: 'pending', note: 'Enacted, awaiting implementation (October 1, 2025)' },
  { name: 'Delaware', status: 'active' },
  { name: 'Florida', status: 'active' },
  { name: 'Georgia', status: 'active' },
  { name: 'Guam', status: 'special', note: 'Allows nurses with active, unencumbered, multi-state licenses from NLC member states to practice' },
  { name: 'Idaho', status: 'active' },
  { name: 'Indiana', status: 'active' },
  { name: 'Iowa', status: 'active' },
  { name: 'Kansas', status: 'active' },
  { name: 'Kentucky', status: 'active' },
  { name: 'Louisiana', status: 'active', note: 'RN & LPN' },
  { name: 'Maine', status: 'active' },
  { name: 'Maryland', status: 'active' },
  { name: 'Mississippi', status: 'active' },
  { name: 'Missouri', status: 'active' },
  { name: 'Montana', status: 'active' },
  { name: 'Nebraska', status: 'active' },
  { name: 'New Hampshire', status: 'active' },
  { name: 'New Jersey', status: 'active' },
  { name: 'New Mexico', status: 'active' },
  { name: 'North Carolina', status: 'active' },
  { name: 'North Dakota', status: 'active' },
  { name: 'Ohio', status: 'active' },
  { name: 'Oklahoma', status: 'active' },
  { name: 'Pennsylvania', status: 'active' },
  { name: 'Rhode Island', status: 'active' },
  { name: 'South Carolina', status: 'active' },
  { name: 'South Dakota', status: 'active' },
  { name: 'Tennessee', status: 'active' },
  { name: 'Texas', status: 'active' },
  { name: 'Utah', status: 'active' },
  { name: 'Vermont', status: 'active' },
  { name: 'Virginia', status: 'active' },
  { name: 'Washington', status: 'active' },
  { name: 'West Virginia', status: 'active', note: 'RN & LPN' },
  { name: 'Wisconsin', status: 'active' },
  { name: 'Wyoming', status: 'active' }
]

const pendingStates = [
  { name: 'Massachusetts', status: 'pending' },
  { name: 'Guam', status: 'pending', note: 'Pending tentative implementation. Nurses holding a multistate license in other NLC states may now practice in Guam. Guam residents cannot obtain a multistate license until implementation is complete.' },
  { name: 'Virgin Islands', status: 'pending', note: 'NLC enacted Dec. 6, 2021. Pending tentative implementation. Criminal background checks must also be implemented. VI residents cannot obtain a multistate license until implementation is completed. Nurses in other NLC states with a multistate license may not practice in the Virgin Islands until implementation is complete.' }
]

const nonParticipatingStates = [
  'Alaska', 'Hawaii', 'Illinois', 'Michigan', 'Minnesota', 'Nevada', 'New York', 'Oregon', 'Washington, D.C.'
]

const benefits = [
  {
    icon: Globe,
    title: 'Multi-State Practice',
    description: 'Practice in any participating compact state with a single multistate license, eliminating the need for multiple state licenses.'
  },
  {
    icon: Users,
    title: 'Perfect for Travel Nurses',
    description: 'Ideal for travel nurses who frequently move between states, reducing administrative burden and costs.'
  },
  {
    icon: Shield,
    title: 'Telehealth Expansion',
    description: 'Provide telehealth services across member states without obtaining additional licenses.'
  },
  {
    icon: CheckCircle2,
    title: 'Emergency Response',
    description: 'Facilitates rapid deployment of nursing resources during emergencies and natural disasters.'
  }
]

const requirements = [
  'Legally reside in an NLC state',
  'Hold an active RN or LPN/VN nursing license in good standing. (APRNs are not included in this compact.)',
  'Declare an NLC state as your primary state of residency',
  'Meet the licensure requirements in your home state'
]

const considerations = [
  {
    icon: AlertCircle,
    title: 'State Practice Laws',
    description: 'You must follow the practice laws and regulations of the state where the patient is located at the time care is provided, not your home state.'
  },
  {
    icon: Info,
    title: 'APRN Limitations',
    description: 'The NLC currently applies only to RNs and LPN/VNs. Advanced Practice Registered Nurses (APRNs) must obtain separate licenses for each state.'
  },
  {
    icon: MapPin,
    title: 'Primary State of Residence',
    description: 'Your PSOR is typically determined by where you file taxes, vote, and hold a driver\'s license. You can only have one PSOR at a time.'
  }
]

export default function CompactLicensePage() {
  const isMobile = useIsMobile()
  const [selectedTab, setSelectedTab] = useState<'overview' | 'states' | 'how-to'>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className={`relative ${isMobile ? 'pt-24 pb-8' : 'pt-32 pb-16'} px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-primary-50/30`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-6">
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold text-gray-900 mb-4`}>
              Nurse Compact <span className="text-primary-600">License</span>
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-xl'} text-gray-600 max-w-3xl mx-auto leading-relaxed`}>
              Your guide to states, application, and processing times. Everything you need to know about the Enhanced Nurse Licensure Compact (eNLC) and how it can benefit your travel nursing career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-10 bg-white/90 backdrop-blur-2xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors focus:outline-none focus:ring-0 ${
                selectedTab === 'overview'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('states')}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors focus:outline-none focus:ring-0 ${
                selectedTab === 'states'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Participating States
            </button>
            <button
              onClick={() => setSelectedTab('how-to')}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors focus:outline-none focus:ring-0 ${
                selectedTab === 'how-to'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              How to Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {selectedTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* What is NLC */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Nurse Compact License</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Requirements for a nurse compact license are similar across states. However, each state may determine and vary its own licensure requirements. The states that participate in the compact have agreed that the licensing requirements in the individual states are compliant with their own licensing requirements. Therefore, these states allow you to work in their state without any additional licensing.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Over the years, the nurse compact license has evolved. Now referred to as the eNLC (Enhanced Nurse Licensure Compact). There are currently 43 states that have passed legislation as of August 7, 2025.
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Key Benefits</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-5 bg-gradient-to-br from-primary-50 to-primary-100/30 rounded-xl border border-primary-200 hover:border-primary-300 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                              <p className="text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Important Considerations */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Important Considerations</h2>
                  <div className="space-y-3">
                    {considerations.map((consideration, index) => {
                      const Icon = consideration.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-300 hover:shadow-sm transition-all"
                        >
                          <Icon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{consideration.title}</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">{consideration.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {selectedTab === 'states' && (
              <motion.div
                key="states"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Participating States */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">NLC States</h2>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Over the years, the nurse compact license has evolved. Now referred to as the eNLC. There are currently 43 states that have passed legislation as of August 7, 2025.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {participatingStates.map((state, index) => (
                      <motion.div
                        key={state.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.01 }}
                        className={`p-3 rounded-lg border text-sm font-medium text-gray-900 transition-all hover:shadow-sm ${
                          state.status === 'active' 
                            ? 'bg-green-50 border-green-200 hover:border-green-300' 
                            : state.status === 'pending'
                            ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-300'
                            : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                        }`}
                        title={state.note || ''}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span>{state.name}</span>
                            {state.status === 'pending' && (
                              <span className="text-xs text-yellow-700 font-semibold">(Pending)</span>
                            )}
                          </div>
                          {state.note && (
                            <p className="text-xs text-gray-600 mt-1 leading-tight">{state.note}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pending States */}
                {pendingStates.length > 0 && (
                  <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="w-7 h-7 text-yellow-600" />
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Pending States</h2>
                    </div>
                    <div className="space-y-3">
                      {pendingStates.map((state, index) => (
                        <motion.div
                          key={state.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:border-yellow-300 hover:shadow-sm transition-all"
                        >
                          <h3 className="font-bold text-gray-900 mb-2">{state.name}</h3>
                          {state.note && (
                            <p className="text-gray-700 text-sm leading-relaxed">{state.note}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Non-Participating States */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-7 h-7 text-amber-600" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Non-Participating States ({nonParticipatingStates.length})</h2>
                  </div>
                  <p className="text-gray-700 mb-6">
                    These states have not enacted NLC legislation. Nurses must obtain individual state licenses to practice in these states.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {nonParticipatingStates.map((state, index) => (
                      <motion.div
                        key={state}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.01 }}
                        className="p-3 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-300 hover:shadow-sm text-sm font-medium text-gray-900 transition-all"
                      >
                        {state}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {selectedTab === 'how-to' && (
              <motion.div
                key="how-to"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Eligibility Requirements */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Nurse Compact License Requirements</h2>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Who's Eligible?</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Currently, the Compact license is available for LPNs and RNs. Additionally, there is current legislation attempting to provide a compact for Advance Practice Nurses.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                    According to NCSBN, The following are necessary in order to qualify for a Compact License:
                  </p>
                  
                  <div className="space-y-2.5 mb-6">
                    {requirements.map((requirement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-primary-50 rounded-lg border border-primary-200 hover:border-primary-300 hover:shadow-sm transition-all"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 text-sm leading-relaxed">{requirement}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <strong>Note:</strong> Additionally, some states have additional requirements in order to qualify. Check each state board's website for details.
                    </p>
                  </div>
                </div>

                {/* How to Apply */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How to Apply for a Multistate License</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100/50 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">Determine Your Primary State of Residence (PSOR)</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Your PSOR is typically determined by where you file taxes, vote, and hold a driver's license. You can only have one PSOR at a time.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100/50 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">Apply for Licensure in Your PSOR</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Apply for an initial license or renew your existing license in your PSOR through your state's board of nursing.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100/50 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                        3
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">Meet All Requirements</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Ensure you meet all uniform licensure requirements, including education, examination, and background check requirements.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100/50 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                        4
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">Receive Your Multistate License</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Once approved, you'll receive a multistate license that allows you to practice in all NLC member states.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Reading */}
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-md hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-7 h-7 text-primary-600" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Additional Reading</h2>
                  </div>
                  <div className="space-y-3">
                    <a
                      href="https://www.thegypsynurse.com/blog/what-travel-rns-need-to-know-about-the-enhanced-nurse-licensure-compact/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <ExternalLink className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span className="font-semibold text-gray-900 text-sm">What Travel RNs Need to Know About the Enhanced Nurse Licensure Compact</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0 ml-2" />
                    </a>
                    <a
                      href="https://www.thegypsynurse.com/blog/state-spotlight-travel-nursing-in-iowa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <ExternalLink className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span className="font-semibold text-gray-900 text-sm">State Spotlight: Travel Nursing in Iowa</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0 ml-2" />
                    </a>
                    <a
                      href="https://www.thegypsynurse.com/blog/rn-license-timeline-infographic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <ExternalLink className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span className="font-semibold text-gray-900 text-sm">RN License Timeline – Infographic</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0 ml-2" />
                    </a>
                  </div>
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      All information on this page was obtained via nurse.org. Please check back often for updates.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      {!isMobile && <Footer />}
      {isMobile && <MobileBottomNav />}
    </div>
  )
}

