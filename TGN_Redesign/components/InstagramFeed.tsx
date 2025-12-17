'use client'

import { motion } from 'framer-motion'
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop&q=80',
    likes: '4.9K',
    comments: 63,
    caption: 'Ready for another amazing shift! 💙 #TravelNurseLife',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80',
    likes: '5.7K',
    comments: 127,
    caption: 'Caring for our patients with compassion every day 💕',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=400&fit=crop&q=80',
    likes: '2.9K',
    comments: 76,
    caption: 'Team huddle before the shift! Best crew ever 👩‍⚕️',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80',
    likes: '2.1K',
    comments: 45,
    caption: 'Hospital views and healing hearts ❤️ #NursingLife',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop&q=80',
    likes: '3.2K',
    comments: 89,
    caption: 'Making a difference one patient at a time 🩺',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop&q=80',
    likes: '1.8K',
    comments: 34,
    caption: 'New city, new adventure, same passion for care 🌟',
  },
]

export default function InstagramFeed() {
  const isMobile = useIsMobile()
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  return (
    <section className={`${isMobile ? 'py-8 bg-white' : 'py-20 bg-gradient-to-br from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          <>
            {/* Mobile Header - Native App Style */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Instagram className="text-primary-600" size={20} />
                <h2 className="text-[22px] font-bold text-gray-900">
                  Follow Our Journey
                </h2>
              </div>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Join our community and share your travel nursing adventures
              </p>
            </div>

            {/* Mobile Instagram Feed - Horizontal Scrollable */}
            <div className="mb-6 -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {instagramPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-shrink-0 w-[140px]"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Engagement Stats Overlay - Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-1.5">
                            <Heart size={12} fill="white" />
                            <span className="text-[10px] font-semibold">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MessageCircle size={12} />
                            <span className="text-[10px] font-semibold">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Caption below image */}
                    <p className="text-[11px] text-gray-600 mt-2 line-clamp-2 leading-tight">
                      {post.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Follow Button - Native Style */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary-600 text-white py-3.5 px-4 font-semibold text-[15px] rounded-xl active:bg-primary-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              style={{ touchAction: 'manipulation' }}
            >
              <Instagram size={18} />
              <span>Follow @TheGypsyNurse</span>
            </motion.button>
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
                className="inline-flex items-center space-x-2 mb-4"
              >
                <Instagram className="text-primary-500" size={28} />
                <span className="px-4 py-2 bg-primary-100 text-primary-500 rounded-full text-sm font-semibold">
                  Follow Our Journey
                </span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Follow us on <span className="gradient-text">@TheGypsyNurse</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join our community and share your travel nursing adventures
              </p>
            </motion.div>

            {/* Desktop Instagram Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {instagramPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onHoverStart={() => setHoveredPost(post.id)}
                  onHoverEnd={() => setHoveredPost(null)}
                  className="relative aspect-square group cursor-pointer"
                >
                  {/* Image */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.caption}
                      animate={{
                        scale: hoveredPost === post.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                    className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1 text-white">
                        <Heart size={20} fill="white" />
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white">
                        <MessageCircle size={20} />
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </div>
                    <p className="text-white text-xs text-center line-clamp-2">
                      {post.caption}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="mt-3 p-2 bg-white/20 rounded-full backdrop-blur-sm"
                    >
                      <ExternalLink className="text-white" size={16} />
                    </motion.button>
                  </motion.div>

                  {/* Border Animation */}
                  <motion.div
                    animate={{
                      opacity: hoveredPost === post.id ? 1 : 0,
                    }}
                    className="absolute inset-0 rounded-2xl border-2 border-white"
                  />
                </motion.div>
              ))}
            </div>

            {/* Desktop Follow Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center space-x-2 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <Instagram size={24} />
                <span>Follow @TheGypsyNurse</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

