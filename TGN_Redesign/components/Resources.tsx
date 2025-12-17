'use client'

import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Home, HelpCircle, FileText, Award, ArrowRight } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

const resources = [
  {
    id: 1,
    title: 'Compact License',
    description: 'Everything you need to know about multi-state nursing licenses',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    title: 'Continuing Education',
    description: 'Access courses and certifications to advance your career',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 3,
    title: 'FAQs',
    description: 'Get answers to common travel nursing questions',
    icon: HelpCircle,
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 4,
    title: 'Housing',
    description: 'Find the perfect place to stay during your assignment',
    icon: Home,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
]

export default function Resources() {
  const isMobile = useIsMobile()
  return (
    <section id="resources" className={`${isMobile ? 'py-8 bg-white' : 'py-20 bg-white relative overflow-hidden'}`}>
      {/* Decorative Elements - Desktop Only */}
      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          <>
            {/* Mobile Header - Native App Style */}
            <div className="mb-5">
              <h2 className="text-[22px] font-bold text-gray-900 mb-1">
                Resources
              </h2>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Access trusted tools and resources designed for travel nurses
              </p>
            </div>

            {/* Mobile Resources - Horizontal Scrollable */}
            <div className="-mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {resources.map((resource, index) => {
                  const Icon = resource.icon
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-shrink-0 w-[160px] bg-white rounded-xl border border-gray-200 shadow-sm active:bg-gray-50 transition-all p-4 flex flex-col items-center text-center"
                    >
                      {/* Icon */}
                      <div className={`w-14 h-14 ${resource.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                        <Icon className={resource.iconColor} size={24} />
                      </div>

                      {/* Title */}
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-tight">
                        {resource.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] text-gray-600 line-clamp-2 leading-snug">
                        {resource.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Desktop Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                  Helpful Resources
                </span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to <span className="gradient-text">Succeed</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Access trusted tools and resources designed for travel nurses
              </p>
            </motion.div>

            {/* Desktop Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative"
                  >
                    <div className="glass-effect rounded-2xl p-6 h-full flex flex-col transition-shadow hover:shadow-2xl">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 ${resource.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}
                      >
                        <Icon className={resource.iconColor} size={32} />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-500 transition-colors">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 flex-1">
                        {resource.description}
                      </p>

                      {/* Learn More Link */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        className={`inline-flex items-center space-x-2 font-semibold ${resource.iconColor} group-hover:underline`}
                      >
                        <span>Learn More</span>
                        <ArrowRight size={18} />
                      </motion.button>

                      {/* Gradient Border on Hover */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${resource.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Desktop CTA Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl relative overflow-hidden shadow-2xl"
            >
              {/* Background Image with Overlay - No Theme Color */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&h=800&fit=crop&q=80')`
                  }}
                >
                  {/* Dark Overlay for White Text Readability Only */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/65 via-gray-900/45 to-gray-900/65"></div>
                </div>
              </div>
              
              <div className="relative z-10 p-8 md:p-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-2 border-white/40"
                >
                  <Award className="text-white" size={40} />
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Join the Gypsy Nurse Nation
                </h3>
                <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
                  Discover new travel nurse jobs, subscribe to customized job alerts and unlock unlimited resources for FREE.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    Join Now - It's Free
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold border-2 border-white/40 hover:bg-white/20 transition-all"
                  >
                    Learn More
                  </motion.button>
                </div>

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 max-w-3xl mx-auto"
                >
                  <p className="text-white/90 italic mb-2 text-lg">
                    "Since just recently joining The Gypsy Nurse, I have had so many questions answered about the world of travel nursing. This has been an excellent resource."
                  </p>
                  <p className="text-white font-semibold">
                    Meagan L. | Cath Lab
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

