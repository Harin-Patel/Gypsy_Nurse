'use client'

import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRouter } from 'next/navigation'

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Cities for Travel Nurses in 2025',
    excerpt: 'Discover the best destinations offering great pay, amazing experiences, and unforgettable adventures for travel nurses.',
    author: 'Sarah Johnson',
    date: 'Nov 8, 2025',
    readTime: '5 min read',
    category: 'Destinations',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Essential Packing Tips for Your First Assignment',
    excerpt: 'Learn what to pack and what to leave behind for your first travel nursing assignment. Expert tips from seasoned travelers.',
    author: 'Mike Chen',
    date: 'Nov 6, 2025',
    readTime: '7 min read',
    category: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Maximizing Your Travel Nursing Salary',
    excerpt: 'Smart strategies to increase your income and build wealth while working as a travel nurse. Financial planning made simple.',
    author: 'Emily Davis',
    date: 'Nov 4, 2025',
    readTime: '6 min read',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop&q=80',
  },
]

export default function Blog() {
  const isMobile = useIsMobile()
  const router = useRouter()
  return (
    <section id="blog" className={`${isMobile ? 'py-8 bg-white' : 'py-20 bg-gradient-to-br from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          <>
            {/* Mobile Header - Native App Style */}
            <div className="mb-5">
              <h2 className="text-[22px] font-bold text-gray-900 mb-1">
                The Gypsy Journal Blog
              </h2>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Travel nursing insights, tips, and stories
              </p>
            </div>

            {/* Mobile Blog List - Vertical Scroll */}
            <div className="space-y-3 mb-5">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm active:bg-gray-50 transition-all overflow-hidden"
                >
                  {/* Horizontal Layout: Image + Content */}
                  <div className="flex gap-3 p-3">
                    {/* Featured Image */}
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category Badge */}
                      <div className="mb-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 bg-primary-100 text-primary-600 rounded text-[10px] font-semibold">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 mb-1 leading-tight">
                        {post.title}
                      </h3>

                      {/* Meta Info - Compact Row */}
                      <div className="flex items-center gap-2.5 text-[11px] text-gray-500 mt-1.5">
                        <div className="flex items-center gap-1">
                          <Clock size={10} className="text-gray-400 flex-shrink-0" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={10} className="text-gray-400 flex-shrink-0" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Mobile CTA Button - Native Style */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/articles')}
              className="w-full bg-gray-50 text-gray-900 py-3.5 px-4 font-semibold text-[15px] rounded-xl border border-gray-200 active:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              style={{ touchAction: 'manipulation' }}
            >
              <span>View All Blogs</span>
              <ArrowRight size={16} />
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
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-primary-100 text-primary-500 rounded-full text-sm font-semibold">
                  The Gypsy Journal
                </span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Travel Nursing <span className="gradient-text">Insights</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From packing hacks to contract tips, get the advice you need to make travel life smoother
              </p>
            </motion.div>

            {/* Desktop Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="glass-effect rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col">
                    {/* Featured Image */}
                    <div className="h-56 relative overflow-hidden">
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-600 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Read More */}
                      <motion.div
                        className="flex items-center justify-between pt-4 border-t border-gray-200"
                      >
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2 transition-all shadow-md hover:shadow-lg group/btn"
                        >
                          <span>Read More</span>
                          <motion.div
                            className="group-hover/btn:translate-x-1 transition-transform"
                          >
                            <ArrowRight size={16} />
                          </motion.div>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Desktop CTA Section with Background Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl relative overflow-hidden shadow-2xl mt-16"
            >
              {/* Background Image with Overlay - No Theme Color */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&h=800&fit=crop&q=80')`
                  }}
                >
                  {/* Dark Overlay for White Text Readability Only */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/65 via-gray-900/45 to-gray-900/65"></div>
                </div>
              </div>
              
              <div className="relative z-10 p-8 md:p-16 text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Stay Updated with Travel Nursing Insights
                </h3>
                <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
                  Get the latest tips, advice, and stories from experienced travel nurses delivered to your inbox.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center space-x-2"
                  >
                    <span>View All Articles</span>
                    <ArrowRight size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold border-2 border-white/40 hover:bg-white/20 transition-all"
                  >
                    Subscribe to Newsletter
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

