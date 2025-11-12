'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { 
  MapPin, Calendar, Briefcase, Eye, Heart, ThumbsDown,
  Building2, FileText, Clock, TrendingUp, Sparkles,
  CheckCircle2, XCircle, AlertCircle, ArrowUpRight
} from 'lucide-react'

interface Application {
  id: string
  jobTitle: string
  facility: string
  facilityAvailable: boolean
  jobType: string
  appliedDate: string
  location: string
  status: 'pending' | 'approved' | 'rejected'
  coverLetter: string
  salary?: string
  duration?: string
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<'applied' | 'liked' | 'disliked'>('applied')

  const appliedJobs: Application[] = [
    {
      id: '1',
      jobTitle: 'Travel ER (Emergency Room) RN (Registered Nurse)',
      facility: 'Facility information not available',
      facilityAvailable: false,
      jobType: 'Emergency Room - Registered Nurse',
      appliedDate: '11/7/2025',
      location: 'South Dakota',
      status: 'pending',
      coverLetter: 'Testing Cover Letter',
      salary: '$2,800/week',
      duration: '13 weeks'
    },
    {
      id: '2',
      jobTitle: 'Emergency Room Job in Greenbrae, CA',
      facility: 'Facility information not available',
      facilityAvailable: false,
      jobType: 'Emergency Room - Registered Nurse',
      appliedDate: '11/6/2025',
      location: 'California',
      status: 'pending',
      coverLetter: "I'm an experienced registered nurse with a background in Medical-Surgical nursing, seeking a travel opportunity with Travel Nurs...",
      salary: '$3,200/week',
      duration: '13 weeks'
    },
    {
      id: '3',
      jobTitle: 'Strike',
      facility: 'Aspirus Merrill',
      facilityAvailable: true,
      jobType: 'Strike - Clinical Lab Scientist',
      appliedDate: '10/11/2025',
      location: 'New Mexico',
      status: 'pending',
      coverLetter: 'Testing Cover Letter',
      salary: '$2,500/week',
      duration: '8 weeks'
    }
  ]

  const likedJobs: Application[] = [
    {
      id: '4',
      jobTitle: 'ICU Travel Nurse - Phoenix, AZ',
      facility: 'Banner Health System',
      facilityAvailable: true,
      jobType: 'ICU - Registered Nurse',
      appliedDate: '11/10/2025',
      location: 'Arizona',
      status: 'pending',
      coverLetter: 'Interested in this ICU position with excellent benefits and competitive pay.',
      salary: '$3,500/week',
      duration: '13 weeks'
    },
    {
      id: '5',
      jobTitle: 'Med-Surg RN - Seattle, WA',
      facility: 'Seattle Medical Center',
      facilityAvailable: true,
      jobType: 'Medical-Surgical - Registered Nurse',
      appliedDate: '11/9/2025',
      location: 'Washington',
      status: 'pending',
      coverLetter: 'Great opportunity in the Pacific Northwest with housing stipend included.',
      salary: '$3,000/week',
      duration: '13 weeks'
    }
  ]
  
  const dislikedJobs: Application[] = [
    {
      id: '6',
      jobTitle: 'ER Night Shift - Remote Location',
      facility: 'Rural Community Hospital',
      facilityAvailable: true,
      jobType: 'Emergency Room - Registered Nurse',
      appliedDate: '11/8/2025',
      location: 'Montana',
      status: 'pending',
      coverLetter: 'Too far from major cities, limited amenities in the area.',
      salary: '$2,600/week',
      duration: '13 weeks'
    }
  ]

  const tabs = [
    { key: 'applied' as const, label: 'Applied', count: appliedJobs.length, icon: Briefcase, color: 'from-primary-500 to-primary-600' },
    { key: 'liked' as const, label: 'Liked', count: likedJobs.length, icon: Heart, color: 'from-primary-500 to-primary-700' },
    { key: 'disliked' as const, label: 'Disliked', count: dislikedJobs.length, icon: ThumbsDown, color: 'from-primary-600 to-primary-800' }
  ]

  const getCurrentJobs = () => {
    switch (activeTab) {
      case 'applied': return appliedJobs
      case 'liked': return likedJobs
      case 'disliked': return dislikedJobs
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'PENDING',
          icon: AlertCircle,
          gradient: 'from-yellow-400 to-orange-500',
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200'
        }
      case 'approved':
        return {
          label: 'APPROVED',
          icon: CheckCircle2,
          gradient: 'from-green-400 to-emerald-500',
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200'
        }
      case 'rejected':
        return {
          label: 'REJECTED',
          icon: XCircle,
          gradient: 'from-red-400 to-rose-500',
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200'
        }
      default:
        return {
          label: 'PENDING',
          icon: AlertCircle,
          gradient: 'from-yellow-400 to-orange-500',
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 mt-20">
        {/* Enhanced Header with Better UX */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-10"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-3xl -z-10" />

          <div className="text-center">
            {/* Career Badge - Cleaner Design */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-5 bg-primary-50 border border-primary-200 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">Career Management</span>
            </motion.div>

            {/* Main Title - Better Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-3 tracking-tight"
            >
              My Applications
            </motion.h1>

            {/* Decorative Underline - More Prominent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-20 h-1 bg-primary-600 mx-auto mb-4 rounded-full"
            />

            {/* Subtitle - Better Readability */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-gray-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            >
              Track and manage all your job applications in one place
            </motion.p>
          </div>
        </motion.div>

        {/* Glass Tabs Navigation with Theme Color */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-10 flex justify-center"
        >
          <div className="relative inline-flex gap-3 p-3 bg-white/50 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60">
            {/* Ambient glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-1 bg-gradient-to-r from-primary-400/30 via-primary-600/30 to-primary-400/30 rounded-2xl blur-xl -z-10"
            />

            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.key
              const Icon = tab.icon
              
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileHover={{ scale: isActive ? 1 : 1.03, y: isActive ? 0 : -3 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + (0.1 * index), type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  <div className={`relative px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-700 hover:text-primary-600'
                  }`}>
                    {/* Active gradient background with glass effect */}
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl shadow-xl`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                        {/* Glass overlay */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl" />
                        {/* Animated glow for active tab */}
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={`absolute -inset-0.5 bg-gradient-to-r ${tab.color} rounded-xl blur-md -z-10`}
                        />
                      </>
                    )}

                    {/* Inactive hover background with glass */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-primary-50/50 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-3">
                      <motion.div
                        animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'}`} />
                      </motion.div>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <motion.span
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold transition-all ${
                          isActive 
                            ? 'bg-white/25 text-white backdrop-blur-sm shadow-lg' 
                            : 'bg-primary-100/80 text-primary-700 group-hover:bg-primary-200'
                        }`}
                      >
                        {tab.count}
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Job Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getCurrentJobs().length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-xl"
                >
                  {activeTab === 'applied' && <Briefcase className="w-16 h-16 text-gray-400" />}
                  {activeTab === 'liked' && <Heart className="w-16 h-16 text-gray-400" />}
                  {activeTab === 'disliked' && <ThumbsDown className="w-16 h-16 text-gray-400" />}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No {activeTab === 'applied' ? 'Applications' : activeTab === 'liked' ? 'Liked Jobs' : 'Disliked Jobs'} Yet
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  {activeTab === 'applied' 
                    ? 'Start applying to jobs to see them here'
                    : activeTab === 'liked'
                    ? 'Like jobs you are interested in to save them for later'
                    : 'Jobs you dislike will appear here'}
                </p>
              </motion.div>
            ) : (
              getCurrentJobs().map((job, index) => {
                const statusConfig = getStatusConfig(job.status)
                const StatusIcon = statusConfig.icon

                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1
                    }}
                    whileHover={{
                      y: -6,
                      boxShadow: '0 12px 24px rgba(127, 40, 96, 0.15)',
                      transition: { duration: 0.2 }
                    }}
                    className="group relative bg-white rounded-xl border-2 border-gray-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                    style={{
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Card Header */}
                    <div className="relative p-5 border-b border-gray-100">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        {/* Briefcase Icon */}
                        <motion.div
                          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center"
                          whileHover={{
                            scale: 1.1,
                            rotate: [0, -5, 5, 0],
                            transition: { duration: 0.3 }
                          }}
                        >
                          <Briefcase className="w-6 h-6 text-primary-600" />
                        </motion.div>

                        <div className="flex items-center gap-2">
                          {/* Like/Dislike Tag */}
                          {activeTab === 'liked' && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold">
                              <Heart className="w-3.5 h-3.5 fill-current" />
                              <span>LIKED</span>
                            </div>
                          )}
                          {activeTab === 'disliked' && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold">
                              <ThumbsDown className="w-3.5 h-3.5 fill-current" />
                              <span>DISLIKED</span>
                            </div>
                          )}

                          {/* Status Badge - Only show in Applied tab */}
                          {activeTab === 'applied' && (
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border} rounded-lg text-xs font-bold`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              {statusConfig.label}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Job Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                        {job.jobTitle}
                      </h3>

                      {/* Job Type */}
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {job.jobType}
                      </p>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Job Details */}
                      <div className="space-y-3 mb-4">{job.facilityAvailable ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-xs">{job.facility}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-500">{job.facility}</span>
                          </div>
                        )}

                        {job.salary && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              <span className="font-bold text-green-600">{job.salary}</span>
                            </div>
                            <span className="text-xs text-gray-500">{job.duration || 'per week'}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-xs">Applied {job.appliedDate}</span>
                        </div>
                      </div>

                      {/* Cover Letter */}
                      {job.coverLetter && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-xs font-semibold text-gray-600">Cover Letter</span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 pl-6">
                            {job.coverLetter}
                          </p>
                        </div>
                      )}

                      {/* View Details Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-auto w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
                      >
                        <span>View Details</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}
