'use client'

import { motion } from 'framer-motion'
import { Building2, Users, TrendingUp, Award } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

const employers = [
  { name: 'AMN Healthcare', logo: 'AMN' },
  { name: 'TNAA', logo: 'TNAA' },
  { name: 'TotalMed', logo: 'TM' },
  { name: 'Cross Country', logo: 'CC' },
]

export default function Employers() {
  const isMobile = useIsMobile()
  return (
    <section id="employers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect with <span className="gradient-text">Top Healthcare Employers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Partner with leading healthcare staffing agencies nationwide
          </p>
        </motion.div>

        {/* Employers Logos */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0 } : {}}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {employers.map((employer, index) => (
            <motion.div
              key={index}
              initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={isMobile ? { duration: 0 } : { delay: index * 0.1 }}
              whileHover={isMobile ? undefined : { scale: 1.05, y: -5 }}
              className="glass-effect rounded-2xl p-8 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{employer.logo}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">{employer.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Users, value: '600K+', label: 'Active Members' },
            { icon: Building2, value: '500+', label: 'Partner Employers' },
            { icon: TrendingUp, value: '10K+', label: 'Jobs Posted' },
            { icon: Award, value: '#1', label: 'Travel Nursing Site' },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={isMobile ? { duration: 0 } : { delay: index * 0.1 }}
                whileHover={isMobile ? undefined : { y: -5 }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Icon className="text-primary-600" size={24} />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

