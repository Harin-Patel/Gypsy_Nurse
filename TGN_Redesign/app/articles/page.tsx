'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock, ChevronLeft, ChevronRight, Tag, Mail, Search } from 'lucide-react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// Blog post data matching the reference site structure
const blogPosts = [
  {
    id: 1,
    title: 'Charting Made Easy: The SOAPI Note',
    author: 'Marina Matsiukhova',
    date: 'November 28, 2025',
    category: 'Travel Healthcare Industry Info',
    subCategory: 'Charting',
    excerpt: 'There are several different ways to write a nursing note, but this article will focus on one of the most popular and how it is written: the SOAPI note. This comprehensive guide will help you master the art of documentation. Learn the proper structure and format for effective patient charting.',
    readTime: '8 min read',
    image: 'https://static.thegypsynurse.com/2025/09/soapi-.jpg.webp',
  },
  {
    id: 2,
    title: 'Top Scrub Brands Travel Healthcare Professionals Love in 2025',
    author: 'TNAA- Travel Nurse Across America',
    date: 'November 26, 2025',
    category: 'Agency Perspectives',
    subCategory: 'Lifestyle',
    excerpt: 'What are the best scrub brands for healthcare travelers? As travel healthcare professionals, you spend a lot of time in your scrubs and a lot of money, especially when assignments require specific colors or styles. Discover the top-rated scrub brands that offer comfort, durability, and style for your travel assignments.',
    readTime: '6 min read',
    image: 'https://static.thegypsynurse.com/2025/11/best-scrub-brands-23232.jpg',
  },
  {
    id: 3,
    title: 'How Healthcare Travelers Can Score the Best Black Friday & Cyber Monday Deals',
    author: 'The Gypsy Nurse',
    date: 'November 24, 2025',
    category: 'Lifestyle',
    subCategory: '',
    excerpt: 'For healthcare travelers, staying on the move means every purchase needs to have a purpose. Whether it\'s a purchase for your assignment, tech to keep you entertained while on the road, or gear for your next adventure. Find the best Black Friday and Cyber Monday deals tailored for healthcare travelers.',
    readTime: '5 min read',
    image: 'https://static.thegypsynurse.com/2025/11/black-friday-fi.jpg.webp',
  },
  {
    id: 4,
    title: 'Young, Skilled, and Restless? Travel Nursing Could Be Your Perfect Fit.',
    author: 'ONESTAFF MEDICAL',
    date: 'November 21, 2025',
    category: 'Agency Perspectives',
    subCategory: '',
    excerpt: 'So, You\'re Wondering: Is Travel Nursing Right for Me? You\'ve put in the hours, earned your stripes, and now you\'re asking the big question: What\'s next? If you\'re a nurse with two-plus years of experience, travel nursing could be the perfect next step in your career journey.',
    readTime: '7 min read',
    image: 'https://static.thegypsynurse.com/2025/11/Featured-Images-3-2.jpg.webp',
  },
  {
    id: 5,
    title: 'Thanksgiving on the Road: Creative Ways Healthcare Travelers Celebrate Away from Home',
    author: 'The Gypsy Nurse',
    date: 'November 19, 2025',
    category: 'Holidays/Events',
    subCategory: 'Lifestyle',
    excerpt: 'Thanksgiving is a holiday that is built on tradition. Gathering with family and friends, sharing a massive meal, and being grateful. But, for healthcare travelers, the holiday can look and feel different. Discover creative ways to celebrate Thanksgiving while on assignment away from home.',
    readTime: '6 min read',
    image: 'https://static.thegypsynurse.com/2025/10/thanksgiving-on-the-road.jpg.webp',
  },
  {
    id: 6,
    title: 'Top 8 Reasons Nurses Choose Correctional Travel Assignments',
    author: 'AB Staffing Solutions',
    date: 'November 18, 2025',
    category: 'Agency Perspectives',
    subCategory: 'Travel Health Specialties',
    excerpt: 'Choosing a nursing assignment is a bit like picking a hiking trail. Some routes are familiar and well-traveled, while others are off the beaten path but offer unexpected rewards. Correctional nursing is one such path. Explore the top reasons why nurses are choosing correctional travel assignments.',
    readTime: '9 min read',
    image: 'https://static.thegypsynurse.com/2025/11/correctional-travel-nursing-fi.jpg',
  },
  {
    id: 7,
    title: 'What Questions to Ask the Facility During a Phone Interview',
    author: 'Amber Pickler',
    date: 'November 16, 2025',
    category: 'Travel Nursing',
    subCategory: 'New to Travel Nursing, Travel Healthcare Contracts, Travel Healthcare Tips',
    excerpt: 'The phone interview with the facility isn\'t just a time for the facility to get to know you; it is also a time for you to get information on the facility, the unit, and the assignment. Learn what questions to ask during your phone interview to make an informed decision.',
    readTime: '10 min read',
    image: 'https://static.thegypsynurse.com/2025/09/phone-interview-fi.jpg',
  },
  {
    id: 8,
    title: 'Best U.S. Cities for Fall Foliage Before Winter Hits: A Traveler\'s Guide to Late-Autumn Assignment',
    author: 'The Gypsy Nurse',
    date: 'November 15, 2025',
    category: 'Lifestyle',
    subCategory: '',
    excerpt: 'Autumn is one of the most magical times of the year for healthcare travelers. Crisp air, cozy layers, and streets painted in shades of red, orange, and gold make late-autumn assignments especially appealing. Discover the best U.S. cities for fall foliage before winter arrives.',
    readTime: '7 min read',
    image: 'https://static.thegypsynurse.com/2025/09/best-U.S.-cities-for-fall-foliage.jpg.webp',
  },
  {
    id: 9,
    title: '7 Major Benefits of Being an ER Travel Nurse',
    author: 'AMN Healthcare',
    date: 'November 13, 2025',
    category: 'Agency Perspectives',
    subCategory: '',
    excerpt: 'If you\'ve been working in the emergency department and you\'re ready to take your expertise on the road, becoming an ER travel nurse can open up a whole new level of professional and personal opportunities. Explore the major benefits of being an ER travel nurse.',
    readTime: '8 min read',
    image: 'https://static.thegypsynurse.com/2025/10/er-travel-nurse-12121.jpg.webp',
  },
]

const categories = [
  'Agency Perspectives',
  'Travel Healthcare Contracts',
  'Hot Topics',
  'Housing/RV Living',
  'Tax and Legal',
  'Travel Nursing Guide',
  'Travel Healthcare',
]

export default function ArticlesPage() {
  const isMobile = useIsMobile()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const postsPerPage = 6

  // Initialize page from URL query parameter
  useEffect(() => {
    const pageParam = searchParams.get('pagenum')
    if (pageParam) {
      const page = parseInt(pageParam, 10)
      if (page > 0) {
        setCurrentPage(page)
      }
    }
  }, [searchParams])

  // Filter posts by category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    router.push('/articles')
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    router.push('/articles')
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (page === 1) {
      router.push('/articles')
    } else {
      router.push(`/articles?pagenum=${page}`)
    }
    // Scroll to top of blog posts section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
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
            <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold text-gray-900 mb-4`}>
              Recent <span className="gradient-text">Blogs</span>
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-xl'} text-gray-600 max-w-3xl mx-auto leading-relaxed`}>
              TGN strives to bring the latest and greatest travel nursing blogs to our community. We have many articles written by industry experts, fellow travelers, travel nurse agencies, and other professionals. These blogs are here to help travel healthcare workers on their professional journeys.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-4"
          >
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="pt-4 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {currentPosts.length > 0 ? (
            <div className="space-y-8">
              {currentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 hover:border-primary-200 hover:shadow-lg transition-all group overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Featured Image */}
                    {post.image && (
                      <div className="relative w-full md:w-64 lg:w-80 h-48 md:h-48 lg:h-56 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 256px, 320px"
                          unoptimized
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1">
                      {/* Category Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                        {post.subCategory && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                            {post.subCategory}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h2>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Excerpt */}
                      <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt.endsWith('.') ? post.excerpt : `${post.excerpt}.`}
                      </p>

                      {/* Read More Link */}
                      <Link
                        href={`/articles/${post.id}`}
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group/link"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No articles found matching your criteria.</p>
            </div>
          )}

          {/* Pagination - Displayed below the blog list */}
          {totalPages > 1 ? (
            <nav className="navigation pagination mt-16 mb-8" aria-label="Pages">
              <h2 className="sr-only">Pages</h2>
              <div className="nav-links flex justify-center items-center gap-1 flex-wrap">
                {/* Previous button */}
                {currentPage > 1 && (
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage - 1)
                    }}
                    className="page-numbers"
                    href={`/articles${currentPage > 2 ? `?pagenum=${currentPage - 1}` : ''}`}
                  >
                    &lt;
                  </a>
                )}

                {/* Page numbers with smart ellipsis */}
                {(() => {
                  const pages: (number | 'ellipsis')[] = []
                  
                  if (totalPages <= 7) {
                    // Show all pages if 7 or fewer
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i)
                    }
                  } else {
                    // Always show first page
                    pages.push(1)
                    
                    if (currentPage <= 4) {
                      // Show pages 1-5, then ellipsis, then last
                      for (let i = 2; i <= 5; i++) {
                        pages.push(i)
                      }
                      pages.push('ellipsis')
                      pages.push(totalPages)
                    } else if (currentPage >= totalPages - 3) {
                      // Show first, ellipsis, then last 5 pages
                      pages.push('ellipsis')
                      for (let i = totalPages - 4; i <= totalPages; i++) {
                        pages.push(i)
                      }
                    } else {
                      // Show first, ellipsis, current-1, current, current+1, ellipsis, last
                      pages.push('ellipsis')
                      pages.push(currentPage - 1)
                      pages.push(currentPage)
                      pages.push(currentPage + 1)
                      pages.push('ellipsis')
                      pages.push(totalPages)
                    }
                  }
                  
                  return pages.map((page, index) => {
                    if (page === 'ellipsis') {
                      return (
                        <span key={`ellipsis-${index}`} className="page-numbers dots">
                          …
                        </span>
                      )
                    }
                    
                    const isCurrent = page === currentPage
                    
                    if (isCurrent) {
                      return (
                        <span
                          key={page}
                          aria-current="page"
                          className="page-numbers current"
                        >
                          {page}
                        </span>
                      )
                    }
                    
                    return (
                      <a
                        key={page}
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(page)
                        }}
                        className="page-numbers"
                        href={`/articles${page > 1 ? `?pagenum=${page}` : ''}`}
                      >
                        {page}
                      </a>
                    )
                  })
                })()}

                {/* Next button */}
                {currentPage < totalPages && (
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage + 1)
                    }}
                    className="next page-numbers"
                    href={`/articles?pagenum=${currentPage + 1}`}
                  >
                    &gt;
                  </a>
                )}
              </div>
            </nav>
          ) : null}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-primary-50/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white rounded-2xl p-8 md:p-12 border-2 border-primary-100 shadow-xl"
          >
            <div className="mb-6">
              <Mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Join The Gypsy Nurse Nation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
                Discover new travel nurse jobs, subscribe to customized job alerts and unlock unlimited resources for FREE.
              </p>
              <p className="text-sm text-gray-500 italic">
                "Since just recently joining The Gypsy Nurse, I have had so many questions answered about the world of travel nursing. This has been an excellent resource!"
              </p>
              <p className="text-sm text-gray-500 mt-1">—Meagan L. | Cath Lab</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
              >
                Join Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {!isMobile && <Footer />}
      {isMobile && <MobileBottomNav />}
    </div>
  )
}

