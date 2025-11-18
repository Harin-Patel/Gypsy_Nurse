'use client'

import { motion } from 'framer-motion'
import { MapPin, DollarSign, Clock, Heart, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

const jobs = [
  {
    id: 1,
    title: 'Allied Health',
    company: 'Vibra Travels',
    role: 'Cath Lab Technologist',
    location: 'KNOXVILLE, TN',
    state: 'TN',
    weeklyPay: '$25.50',
    status: 'Competitive salary',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Travel Nurse - ER',
    company: 'Ario Healthcare',
    role: 'Emergency Room',
    location: 'BROWNSVILLE, TX',
    state: 'TX',
    weeklyPay: '$21.15',
    status: 'Competitive salary',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'LPN Job in Roanoke, VA',
    company: 'AB Staffing Solutions',
    role: 'LPN',
    location: 'ROANOKE, VA',
    state: 'VA',
    weeklyPay: '$14.74',
    status: 'Competitive salary',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&q=80'
  },
]

export default function FeaturedJobs() {
  const isMobile = useIsMobile()
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <section id="jobs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={isMobile ? { duration: 0 } : {}}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-primary-100 text-primary-500 rounded-full text-sm font-semibold">
              Featured Opportunities
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Next <span className="gradient-text">Adventure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore top-paying travel nursing positions across the country
          </p>
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isMobile ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              whileHover={isMobile ? undefined : { y: -5 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              {/* Hospital Image */}
              <div className="h-56 overflow-hidden">
                <img 
                  src={job.image} 
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Job Content */}
              <div className="p-6">
                {/* Company Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">{job.company.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{job.role}</p>
                </div>

                {/* Job Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {job.title}
                </h3>

                {/* Salary */}
                <div className="flex items-start space-x-3 mb-3 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{job.weeklyPay} per week</p>
                    <p className="text-sm text-gray-500">{job.status}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-red-500" size={20} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">{job.location}</p>
                    <p className="text-sm text-gray-500">{job.state}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0 } : {}}
          className="text-center"
        >
          <motion.button
            whileHover={isMobile ? undefined : { scale: 1.05 }}
            whileTap={isMobile ? { scale: 0.98 } : { scale: 0.95 }}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>View All Jobs</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

