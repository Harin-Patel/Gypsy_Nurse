'use client'

import { motion } from 'framer-motion'
import { 
  Calendar,
  ChevronRight,
  CalendarDays,
  FileText,
  Plus,
  Sparkles
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import MobileBottomNav from '@/components/MobileBottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'

const events = [
  {
    id: 'event-calendar',
    title: 'Event Calendar',
    icon: CalendarDays,
    description: 'View upcoming events and mark your calendar for travel nursing conferences and meetups',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'event-recaps',
    title: 'Event Recaps',
    icon: FileText,
    description: 'Read summaries and highlights from past travel nursing events and conferences',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'submit-event',
    title: 'Submit an Event',
    icon: Plus,
    description: 'Share your travel nursing event with the community',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'travcon',
    title: 'TravCon',
    icon: Sparkles,
    description: 'The ultimate travel nursing conference - connect, learn, and grow',
    color: 'from-primary-500 to-primary-600',
  },
]

export default function EventsPage() {
  const isMobile = useIsMobile()

  const handleEventClick = (eventId: string) => {
    // Handle event item click - can navigate to specific event page
    console.log('Clicked event:', eventId)
    // For now, just scroll or navigate as needed
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Desktop Header */}
      {!isMobile && (
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Events</h1>
            <p className="text-xl text-gray-600">Discover and join travel nursing events, conferences, and meetups</p>
          </div>
        </div>
      )}

      {/* Events Grid */}
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
          {events.map((event, index) => {
            const Icon = event.icon
            return (
              <motion.button
                key={event.id}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.2, delay: index * 0.03 }}
                onClick={() => handleEventClick(event.id)}
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 active:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Subtle Border Glow with Pink Shadow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${event.color} opacity-0 active:opacity-15 transition-opacity duration-300 blur-md`} />
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
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-snug text-left line-clamp-2">
                          {event.description}
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-active:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Subtle Border Glow with Pink Shadow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${event.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300 blur-md`} />
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
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed text-left">
                        {event.description}
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

