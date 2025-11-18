'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

const events = [
  {
    id: 1,
    name: 'TravCon 2025',
    subtitle: 'The Ultimate Travel Nursing Conference',
    date: 'Sept 21, 2025',
    location: 'Las Vegas, NV',
    daysUntil: 21,
    attendees: '2,500+',
    category: 'Conference',
    featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=80',
    description: 'Join thousands of travel nurses for networking, education, and celebration',
  },
  {
    id: 2,
    name: 'Nursing Conference 2025',
    subtitle: 'Professional Development Summit',
    date: 'Oct 15, 2025',
    location: 'Chicago, IL',
    daysUntil: 45,
    attendees: '500+',
    category: 'Conference',
    featured: false,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop&q=80',
    description: 'Connect with industry leaders and expand your professional network',
  },
  {
    id: 3,
    name: 'Healthcare Summit 2025',
    subtitle: 'Innovation in Healthcare',
    date: 'Nov 30, 2025',
    location: 'Miami, FL',
    daysUntil: 90,
    attendees: '750+',
    category: 'Summit',
    featured: false,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&q=80',
    description: 'Explore cutting-edge healthcare trends and breakthrough innovations',
  },
]

export default function Events() {
  const isMobile = useIsMobile()
  const featuredEvent = events.find(e => e.featured)
  const regularEvents = events.filter(e => !e.featured)

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={isMobile ? { duration: 0 } : {}}
            className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-primary-100 rounded-full"
          >
            <Sparkles className="text-primary-600" size={16} />
            <span className="text-sm font-semibold text-primary-600">
              Upcoming Events
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join Us at <span className="gradient-text">Amazing Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Network with fellow travel nurses, learn from experts, and advance your career
          </p>
        </motion.div>

        {/* Events Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Event - Large Card */}
          {featuredEvent && (
            <motion.div
              initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={isMobile ? { duration: 0 } : { duration: 0.6 }}
              className="lg:row-span-2"
            >
              <motion.div
                whileHover={isMobile ? undefined : { y: -8 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full"
              >
                {/* Featured Badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <Sparkles size={16} />
                  <span className="text-sm font-bold">Featured Event</span>
                </div>

                {/* Countdown Badge */}
                <motion.div
                  initial={isMobile ? { scale: 1 } : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={isMobile ? { duration: 0 } : { delay: 0.3, type: 'spring' }}
                  className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 text-center shadow-xl"
                >
                  <div className="text-primary-600 font-bold text-3xl leading-none">{featuredEvent.daysUntil}</div>
                  <div className="text-gray-600 text-xs mt-1 font-semibold">DAYS LEFT</div>
                </motion.div>

                {/* Image with Overlay */}
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  <img 
                    src={featuredEvent.image} 
                    alt={featuredEvent.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Category Badge on Image */}
                  <div className="absolute bottom-6 left-6">
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold border border-white/30">
                      {featuredEvent.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {featuredEvent.name}
                  </h3>
                  <p className="text-primary-600 font-semibold mb-4">{featuredEvent.subtitle}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredEvent.description}</p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <Calendar className="text-primary-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-semibold">{featuredEvent.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <MapPin className="text-primary-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold">{featuredEvent.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <Users className="text-primary-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expected Attendees</p>
                        <p className="font-semibold">{featuredEvent.attendees} Nurses</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={isMobile ? undefined : { scale: 1.02 }}
                    whileTap={isMobile ? { scale: 0.98 } : { scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 group"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10"></div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Regular Events - Smaller Cards */}
          <div className="space-y-8">
            {regularEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={isMobile ? undefined : { x: 8 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Image Section */}
                    <div className="relative sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                      <img 
                        src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-primary-700/80 opacity-90"></div>
                      
                      {/* Countdown on Image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            initial={isMobile ? { scale: 1 } : { scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={isMobile ? { duration: 0 } : { delay: index * 0.1 + 0.3, type: 'spring' }}
                            className="text-white font-bold text-4xl"
                          >
                            {event.daysUntil}
                          </motion.div>
                          <div className="text-white/90 text-sm font-semibold mt-1">DAYS</div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold border border-white/30">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {event.name}
                        </h3>
                        <p className="text-sm text-primary-600 font-semibold mb-3">{event.subtitle}</p>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                        {/* Mini Details */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar size={14} className="text-primary-500" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin size={14} className="text-primary-500" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Users size={14} className="text-primary-500" />
                            <span>{event.attendees} Attendees</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={isMobile ? undefined : { scale: 1.05 }}
                        whileTap={isMobile ? { scale: 0.98 } : { scale: 0.95 }}
                        className="mt-4 self-start flex items-center space-x-1 text-primary-600 font-semibold text-sm group-hover:space-x-2 transition-all"
                      >
                        <span>Learn More</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute inset-0 border-2 border-primary-500/50 rounded-2xl"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Events CTA */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0 } : { delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            whileHover={isMobile ? undefined : { scale: 1.05 }}
            whileTap={isMobile ? { scale: 0.98 } : { scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-all shadow-lg hover:shadow-xl"
          >
            <span>Explore All Events</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

