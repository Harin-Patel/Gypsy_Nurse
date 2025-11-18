'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  GraduationCap, 
  Home, 
  HelpCircle, 
  FileText, 
  Award,
  ChevronRight,
  Building2,
  Users,
  Headphones,
  School,
  DollarSign,
  Stethoscope,
  UserCheck,
  Briefcase
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import MobileBottomNav from '@/components/MobileBottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'

const resources = [
  {
    id: 'blog',
    title: 'Blog',
    icon: BookOpen,
    description: 'Read the latest articles and insights from travel nursing experts',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'compact-license',
    title: 'Compact License',
    icon: FileText,
    description: 'Everything you need to know about multi-state nursing licenses',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'continuing-education',
    title: 'Continuing Education',
    icon: GraduationCap,
    description: 'Access courses and certifications to advance your career',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'discounts',
    title: 'Discounts',
    icon: DollarSign,
    description: 'Exclusive discounts and deals for travel nurses',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'faqs',
    title: 'FAQs',
    icon: HelpCircle,
    description: 'Get answers to common travel nursing questions',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'hospital-directory',
    title: 'Hospital Directory',
    icon: Stethoscope,
    description: 'Browse hospitals and facilities across the country',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'housing',
    title: 'Housing',
    icon: Home,
    description: 'Find the perfect place to stay during your assignment',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'mentors',
    title: 'Mentors',
    icon: UserCheck,
    description: 'Connect with experienced travel nurses for guidance',
    color: 'from-primary-500 to-primary-600',
  },
  {
    id: 'member-benefits',
    title: 'Member Benefits',
    icon: Award,
    description: 'Explore exclusive benefits for Gypsy Nurse members',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'nursing-boards',
    title: 'Nursing Boards',
    icon: Building2,
    description: 'Information about state nursing boards and requirements',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'podcast',
    title: 'Podcast',
    icon: Headphones,
    description: 'Listen to travel nursing stories and expert advice',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'travel-nurse-101',
    title: 'Travel Nurse 101',
    icon: School,
    description: 'Essential guides for new and experienced travel nurses',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'agencies',
    title: 'Agencies',
    icon: Briefcase,
    description: 'Find trusted staffing agencies for your next assignment',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 'professionals',
    title: 'Professionals',
    icon: Users,
    description: 'Connect with healthcare professionals in your field',
    color: 'from-blue-500 to-indigo-500',
  },
]

export default function ResourcesPage() {
  const isMobile = useIsMobile()

  const handleResourceClick = (resourceId: string) => {
    // Handle resource item click - can navigate to specific resource page
    console.log('Clicked resource:', resourceId)
    // For now, just scroll or navigate as needed
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Desktop Header */}
      {!isMobile && (
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
            <p className="text-xl text-gray-600">Access trusted tools and resources designed for travel nurses</p>
          </div>
        </div>
      )}

      {/* Resources Grid */}
      <div 
        className={`${isMobile ? 'px-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'}`}
        style={isMobile ? {
          paddingTop: `calc(8.7rem + env(safe-area-inset-top))`,
          paddingBottom: `0`,
          marginTop: `calc(-2.5rem)`,
          marginBottom: `calc(-3rem - env(safe-area-inset-bottom))`,
        } : {}}
      >
        <div className={`${isMobile ? 'space-y-3 [&>*:last-child]:mb-0' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.button
                key={resource.id}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.2, delay: index * 0.03 }}
                onClick={() => handleResourceClick(resource.id)}
                className={`w-full ${isMobile ? 'active:scale-[0.98]' : ''}`}
                whileTap={isMobile ? { scale: 0.98 } : undefined}
              >
                {/* Mobile App Standard Card with Glassmorphism */}
                {isMobile ? (
                  <div 
                    className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-4 border border-white/80 shadow-lg active:shadow-xl transition-all overflow-hidden"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    {/* Gradient Background Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 active:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Subtle Border Glow with Pink Shadow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${resource.color} opacity-0 active:opacity-15 transition-opacity duration-300 blur-md`} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 opacity-0 active:opacity-100 transition-opacity duration-300 blur-sm" />
                    
                    <div className="relative flex items-center gap-4">
                      {/* Icon Container with Theme Color */}
                      <div className="relative flex-shrink-0">
                        <div className="relative w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shadow-sm active:shadow-md transition-all active:scale-105">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1 text-left active:text-primary-700 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-snug text-left line-clamp-2">
                          {resource.description}
                        </p>
                      </div>
                      
                      {/* Forward Arrow Icon - Centered */}
                      <div className="flex-shrink-0 flex items-center">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-5 border border-white/80 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    {/* Gradient Background Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-active:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Subtle Border Glow with Pink Shadow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${resource.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300 blur-md`} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    
                    {/* Content */}
                    <div className="relative flex flex-col">
                      {/* Icon Container with Theme Color */}
                      <div className="relative mb-4">
                        <div className="relative w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                          <Icon className="w-7 h-7 text-primary-600" />
                        </div>
                      </div>
                      
                      {/* Text Content */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors text-left">
                        {resource.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed text-left">
                        {resource.description}
                      </p>
                      
                      {/* Forward Arrow Icon */}
                      <div className="mt-4 flex items-center justify-end">
                        <motion.div
                          className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ChevronRight className="w-4 h-4 text-primary-600" />
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Shine Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}

