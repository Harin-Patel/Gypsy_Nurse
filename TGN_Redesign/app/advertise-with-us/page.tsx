'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Zap,
  Globe,
  Mail,
  Phone,
  MapPin,
  Send,
  Briefcase,
  Heart,
  Stethoscope,
  Building2,
  Calendar,
  Clock,
  Shield,
  FileText,
  DollarSign,
  Network,
  Facebook,
  Instagram,
  Linkedin,
  Download,
  Quote,
  ThumbsUp,
  Eye,
  MousePointerClick,
  ChevronDown
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AdvertiseWithUsPage() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showFacilityTypeDropdown, setShowFacilityTypeDropdown] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    facilityType: '',
    message: ''
  })

  const audienceMetrics = [
    { icon: Users, value: '675,000+', label: 'Followers & Members', color: 'from-primary-500 to-primary-600' },
    { icon: Eye, value: '23,000+', label: 'Monthly Website Visitors', color: 'from-primary-500 to-primary-600' },
    { icon: MousePointerClick, value: '503,000+', label: 'Monthly Page Views', color: 'from-primary-500 to-primary-600' },
    { icon: Award, value: '#1', label: 'Travel Healthcare Destination', color: 'from-primary-500 to-primary-600' },
    { icon: Facebook, value: '150K+', label: 'Facebook Followers', color: 'from-primary-500 to-primary-600' },
    { icon: Instagram, value: '85K+', label: 'Instagram Followers', color: 'from-primary-500 to-primary-600' }
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Community-Based Marketing',
      description: 'Leverage our extensive reach to connect with qualified travel nurses through community-based marketing that builds trust and engagement.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Maximize ROI',
      description: 'Partner with The Gypsy Nurse to maximize your return on investment by reaching thousands of travel healthcare professionals daily across multiple digital platforms.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Megaphone,
      title: 'Sponsored Content',
      description: 'Feature your brand in articles and blog posts that reach our active community of travel nurses seeking opportunities and resources.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Eye,
      title: 'Display Advertising',
      description: 'Prominent ad placements across our website attract thousands of unique visitors monthly seeking travel nursing opportunities and resources.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Reach our growing list of subscribers who receive regular updates and insights about travel nursing opportunities and industry news.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Network,
      title: 'Social Media Promotion',
      description: 'Engage with our active social media community of over 675,000 followers across platforms, fostering active discussions and high engagement rates.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]


  const clientTestimonials = [
    {
      name: 'Chris Sund',
      role: 'Chief Operating Officer of Uniti Med',
      company: 'Uniti Med',
      content: 'We are very proud of our partnership with The Gypsy Nurse. From the very beginning, their friendly team has been attentive and responsive to all of our questions and requests. Working with The Gypsy Nurse, has helped us showcase our agency to their community of 500,000+ travel nurses and travel healthcare professionals. With the increasing demand for healthcare professionals needed to help with the staffing shortage, we have been able to help more of our clients fill their needs by getting their jobs in front of thousands of interested candidates.',
      logo: 'uniti-med',
      logoUrl: 'https://static.thegypsynurse.com/2023/01/unitimed-150x150.png.webp'
    },
    {
      name: 'Saundra Vild',
      role: 'DVP Training in Nursing Division at AMN Healthcare',
      company: 'AMN Healthcare',
      content: 'I have thoroughly enjoyed working with Gypsy Nurse on their LIVE series! Rachel does such a great job with managing the back end and ensuring that we are set-up for success. These sessions give us such a great opportunity to connect with the community in a new way and help answer any questions they may have as they start traveling or continue their adventure. We love the time we get to spend with the Gypsy team and look forward to many more partnerships in the future.',
      logo: 'amn-healthcare',
      logoUrl: 'https://static.thegypsynurse.com/2021/02/AMN-Logo-150x150.png.webp'
    },
    {
      name: 'Chase Johnson',
      role: 'Interactive Marketing Manager',
      company: 'RN Network',
      content: 'We believe that The Gypsy Nurse is one of the premium, non-biased hubs for travel nursing and that it is worth our efforts to have a presence in that community. The great thing about TGN is that they listen to what your organization can and can\'t do with their platform. We certainly don\'t use all of the tools that The Gypsy Nurse gives us (Facebook groups, quarterly article promotions, etc.); however, they still continually try to look for solutions to help us maximize the partnership without upselling us on anything. The result is a true feeling of a partnership. It is abundantly clear that The Gypsy Nurse cares deeply about their nurses and employers that help power the site.',
      logo: 'rn-network',
      logoUrl: 'https://static.thegypsynurse.com/2021/07/RnNetwork.jpg.webp'
    }
  ]

  const testimonials = [
    {
      name: 'Meagan L.',
      role: 'Cath Lab Nurse',
      company: 'The Gypsy Nurse Member',
      content: 'Since joining The Gypsy Nurse, I have had so many questions answered about the world of travel nursing. This has been an excellent resource!',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'Memorial Hospital',
      content: 'Partnering with The Gypsy Nurse has been instrumental in connecting us with qualified travel nurses. The community engagement and reach is unmatched.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'VP of Staffing',
      company: 'Premier Healthcare Staffing',
      content: 'The ROI from our partnership with The Gypsy Nurse has been exceptional. We\'ve seen significant improvements in our recruitment efforts and brand visibility.',
      rating: 5
    }
  ]

  const partners = [
    { 
      name: 'AMN Healthcare', 
      color: 'from-blue-600 to-blue-700',
      initials: 'AMN'
    },
    { 
      name: 'TNAA', 
      color: 'from-green-600 to-green-700',
      initials: 'TNAA'
    },
    { 
      name: 'TotalMed', 
      color: 'from-purple-600 to-purple-700',
      initials: 'TM'
    },
    { 
      name: 'Cross Country', 
      color: 'from-red-600 to-red-700',
      initials: 'CC'
    },
    { 
      name: 'Aya Healthcare', 
      color: 'from-indigo-600 to-indigo-700',
      initials: 'AYA'
    },
    { 
      name: 'Fastaff', 
      color: 'from-orange-600 to-orange-700',
      initials: 'FS'
    }
  ]

  const specialties = [
    'ICU/CCU', 'Emergency Room', 'Operating Room', 'Med-Surg', 'Labor & Delivery',
    'NICU', 'Pediatrics', 'Oncology', 'Cardiac Care', 'Psychiatric', 'Home Health', 'Telemetry'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1920&h=1080&fit=crop&q=80")',
            }}
          >
            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/75 to-gray-900/60"></div>
            
            {/* Subtle Brand Tint */}
            <div className="absolute inset-0 bg-primary-900/25"></div>
          </motion.div>
          
          {/* Animated Accents - Multiple Layers */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-400/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl"
          />
          
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Main Hero */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-5"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20 shadow-lg"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                />
                <span className="text-white font-semibold text-sm">
                  Trusted by 5,000+ Healthcare Facilities
                </span>
                <Award className="w-5 h-5 text-yellow-400" />
              </motion.div>

              {/* Main Heading with Gradient */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="text-white">Partner with the</span>{' '}
                <motion.span
                  className="bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  #1 Travel Nursing
                </motion.span>
                <br />
                <span className="text-white">Community</span>
                <br />
                <span className="text-white/90 text-3xl md:text-4xl lg:text-5xl">
                  Today
                </span>
              </motion.h1>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Get your firm in front of the thousands of active and passive travel healthcare job seekers every day and ensure a consistent pipeline of travel healthcare professionals for your business.
                </p>
                 <p className="text-base text-white/70">
                   The Gypsy Nurse is dedicated to providing powerful tools, information, and social connectivity to our 675,000+ travel nurses and travel healthcare professionals.
                 </p>
              </motion.div>

              {/* Key Stats - Horizontal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                {[
                  { value: '48hrs', label: 'Avg. Time to Fill' },
                  { value: '98%', label: 'Fill Rate' },
                  { value: '250K+', label: 'Active Nurses' }
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/20 shadow-lg">
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-2xl hover:shadow-primary-500/50 transition-all flex items-center gap-2 group relative overflow-hidden"
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative z-10">Get Started Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/95 backdrop-blur-sm text-primary-600 rounded-xl font-semibold shadow-xl hover:shadow-2xl border-2 border-white/50 transition-all flex items-center gap-2 group"
                >
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Download Media Kit</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Top Metrics Row */}
              <div className="grid grid-cols-2 gap-3">
                {audienceMetrics.slice(0, 4).map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="relative group cursor-pointer"
                    >
                      <div className="relative bg-white/15 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-white/20 overflow-hidden h-full transition-all duration-300 group-hover:border-primary-300/50">
                        {/* Hover Glow Effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
                        />
                        <div className="relative z-10">
                          <div className={`inline-block p-2.5 bg-gradient-to-br ${metric.color} rounded-xl shadow-lg mb-2.5 transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                          <div className="text-xs text-white/80 font-medium leading-tight">{metric.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom Metrics Row */}
              <div className="grid grid-cols-2 gap-3">
                {audienceMetrics.slice(4).map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="relative group cursor-pointer"
                    >
                      <div className="relative bg-white/15 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-white/20 overflow-hidden h-full transition-all duration-300 group-hover:border-primary-300/50">
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
                        />
                        <div className="relative z-10">
                          <div className={`inline-block p-2.5 bg-gradient-to-br ${metric.color} rounded-xl shadow-lg mb-2.5 transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                          <div className="text-xs text-white/80 font-medium leading-tight">{metric.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="relative bg-gradient-to-br from-primary-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/20 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base mb-1">Verified Platform</div>
                    <div className="text-white/70 text-xs">All credentials pre-verified</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                About Us
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              About <span className="gradient-text">The Gypsy Nurse</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering travel healthcare professionals with the tools, resources, and community they need to thrive
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* Left Side - Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 bg-white border-2 border-gray-100 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">About The Gypsy Nurse</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      With a community of over <span className="font-semibold text-primary-600">675,000 followers and members</span> across our digital platforms, <span className="font-semibold text-primary-600">23,000+ website visitors per month</span>, and over <span className="font-semibold text-primary-600">503,000 page views per month</span> to our website, The Gypsy Nurse is the <span className="font-semibold text-primary-600">#1 destination</span> for the travel healthcare community.
                    </p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Comprehensive job board with thousands of travel healthcare opportunities</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Active community forums and networking platforms</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Educational resources and career development tools</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Agency reviews and ratings from travel healthcare professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - TravCon Acquisition */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary-50 to-primary-100/50 border-primary-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">TravCon Acquisition</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      TGN has acquired TravCon, the premier healthcare traveler conference, to form the <span className="font-semibold text-primary-600">largest community of travel healthcare professionals worldwide</span>! This dynamic combination benefits our community and clients with more opportunities for connection, support, and resources.
                    </p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-primary-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Expanded reach through premier conference platform</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Enhanced networking and engagement opportunities</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Unified platform for maximum brand visibility</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Access to exclusive conference attendees and exhibitors</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Integrated marketing solutions across events and digital channels</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Users, value: '675,000+', label: 'Followers & Members' },
              { icon: Eye, value: '23,000+', label: 'Monthly Visitors' },
              { icon: MousePointerClick, value: '503,000+', label: 'Monthly Page Views' },
              { icon: Award, value: '#1', label: 'Travel Healthcare Destination' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-effect rounded-2xl p-6 text-center bg-white border-2 border-gray-100 shadow-md hover:shadow-lg hover:border-primary-200 transition-all"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 rounded-xl flex items-center justify-center border-2 border-primary-200">
                    <Icon className="text-primary-600" size={26} />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-700 text-sm font-medium">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10 opacity-40"></div>
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                Testimonials
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our partners say about working with The Gypsy Nurse
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden py-2">
              <motion.div
                className="flex"
                animate={{ 
                  x: `-${currentTestimonial * 100}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
                style={{ willChange: 'transform' }}
              >
                {clientTestimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="min-w-full flex-shrink-0 w-full"
                    style={{ width: '100%' }}
                  >
                    <div className="relative bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 h-[500px] flex flex-col">
                      <div className="grid md:grid-cols-2 gap-6 items-stretch h-full flex-1">
                        {/* Testimonial Content */}
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <Quote className="w-10 h-10 text-primary-500/30 mb-3" />
                            <p className="text-base text-gray-700 leading-relaxed mb-4">
                              "{testimonial.content}"
                            </p>
                          </div>
                          <div className="border-t border-gray-200 pt-3 mt-auto">
                            <p className="font-bold text-gray-900 text-base">{testimonial.name}</p>
                            <p className="text-gray-600 text-sm">
                              {testimonial.role.includes('at') || testimonial.role.includes('of') 
                                ? testimonial.role 
                                : `${testimonial.role} of ${testimonial.company}`}
                            </p>
                          </div>
                        </div>

                        {/* Company Logo */}
                        <div className="flex items-center justify-center h-full">
                          <div className="relative bg-gray-50 rounded-xl p-6 border-2 border-gray-200 w-full max-w-[250px]">
                            <div className="flex items-center justify-center">
                              <img 
                                src={testimonial.logoUrl} 
                                alt={`${testimonial.company} Logo`} 
                                className="max-w-full h-auto max-h-32 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div className="hidden items-center justify-center">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-gray-900">{testimonial.company}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center items-center gap-3 mt-6">
              {clientTestimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    currentTestimonial === index 
                      ? 'bg-primary-600 w-10 h-2.5 shadow-md' 
                      : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={currentTestimonial === index ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? clientTestimonials.length - 1 : prev - 1))}
                className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-primary-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowRight className="w-5 h-5 text-gray-700 rotate-180" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial((prev) => (prev === clientTestimonials.length - 1 ? 0 : prev + 1))}
                className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-primary-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Join The Gypsy Nurse Nation Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10 opacity-40"></div>
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                Community
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Join The <span className="gradient-text">Gypsy Nurse Nation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover new travel nurse jobs, subscribe to customized job alerts and unlock unlimited resources for FREE
            </p>
          </motion.div>

          {/* Card with Image and Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto bg-transparent rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-[400px] md:h-[500px] bg-primary-200 overflow-hidden" style={{ isolation: 'isolate', contain: 'layout style paint' }}>
                <img 
                  src="/group-doctors-standing-conference-portrait-medical-team.jpg"
                  alt="Healthcare professionals community"
                  className="w-full h-full object-cover"
                  style={{ 
                    imageRendering: 'auto',
                    filter: 'none !important',
                    willChange: 'auto',
                    backfaceVisibility: 'visible',
                    WebkitBackfaceVisibility: 'visible',
                    WebkitTransform: 'translateZ(0)',
                    transform: 'translateZ(0)'
                  }}
                  loading="eager"
                  decoding="sync"
                />
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-full shadow-xl border border-white/40 z-10"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-bold text-gray-900">675K+ Members</span>
                  </div>
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="relative flex flex-col justify-center p-8 md:p-10 bg-white/30 backdrop-blur-xl border-l border-white/40 shadow-2xl">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 space-y-6">
                  {/* Testimonial Quote */}
                  <div className="relative bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/50 shadow-lg">
                    <Quote className="w-10 h-10 text-primary-500/60 mb-4" />
                    <p className="text-lg text-gray-900 leading-relaxed mb-6 font-medium italic drop-shadow-sm">
                      "Since just recently joining The Gypsy Nurse, I have had so many questions answered about the world of travel nursing. This has been an excellent resource!"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-300/60">
                      <div className="w-12 h-12 bg-primary-100/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white/50">
                        <span className="text-primary-700 font-bold">ML</span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold drop-shadow-sm">Meagan L.</p>
                        <p className="text-gray-700 text-sm">Cath Lab</p>
                      </div>
                    </div>
                  </div>

                  {/* Join Now Button */}
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all items-center justify-center gap-2 group"
                      onClick={() => router.push('/register')}
                    >
                      <span>Join Now - It's Free</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10 opacity-40"></div>
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                Specialties
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              All Nursing <span className="gradient-text">Specialties Covered</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find travel nurses across all specialties and experience levels
            </p>
          </motion.div>

          {/* Specialties Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 shadow-md hover:shadow-lg transition-all"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {specialties.map((specialty, index) => (
                <motion.div
                  key={specialty}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-800 font-medium text-sm">
                    {specialty}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10 opacity-40"></div>
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                Testimonials
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              What Our <span className="gradient-text">Community Says</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from travel nurses and healthcare facilities who trust The Gypsy Nurse platform
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-md hover:shadow-lg transition-all h-full flex flex-col"
              >
                <Quote className="w-8 h-8 text-primary-500/50 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic flex-1">"{testimonial.content}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-primary-600 font-medium">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Information Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10 opacity-40"></div>
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                Get In Touch
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Ready to <span className="gradient-text">Advertise with Us?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Contact our team today to book your advertising package and reach thousands of qualified healthcare professionals
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-gray-100 shadow-xl">
              <div className="text-center space-y-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Email Us Directly
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our team is ready to help you reach 675,000+ travel healthcare professionals
                  </p>
                  <motion.a
                    href="mailto:sharper@thegypsynurse.com"
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="underline decoration-2 underline-offset-4">sharper@thegypsynurse.com</span>
                  </motion.a>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  {[
                    { value: '675K+', label: 'Members' },
                    { value: '48hrs', label: 'Response Time' },
                    { value: '98%', label: 'Satisfaction' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                      <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Contact Form Section */}
      <section id="contact-form" className="pt-4 pb-12 md:pt-6 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10 opacity-40"></div>
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                Contact
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="gradient-text">Contact Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will contact you to discuss your advertising opportunities and partnership options
            </p>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-gray-100 shadow-md hover:shadow-lg transition-all">
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:bg-white transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:bg-white transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company/Facility Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:bg-white transition-all"
                        placeholder="Hospital, Clinic, or Agency name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:bg-white transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Facility Type <span className="text-red-500">*</span></label>
                    <div className="relative">
                      {/* Custom Dropdown Button */}
                      <motion.button
                        type="button"
                        onClick={() => setShowFacilityTypeDropdown(!showFacilityTypeDropdown)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:bg-white transition-all cursor-pointer text-left relative flex items-center"
                      >
                        <span className={`flex-1 text-left truncate leading-normal ${formData.facilityType ? "text-gray-900" : "text-gray-400"}`}>
                          {formData.facilityType 
                            ? formData.facilityType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                            : "Select facility type"}
                        </span>
                        <motion.div
                          animate={{ rotate: showFacilityTypeDropdown ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-4 pointer-events-none flex items-center"
                          style={{ height: '1.25rem', top: '50%', marginTop: '-0.625rem' }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </motion.button>

                      {/* Custom Dropdown Menu */}
                      <AnimatePresence>
                        {showFacilityTypeDropdown && (
                          <>
                            {/* Backdrop to close on outside click */}
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setShowFacilityTypeDropdown(false)}
                            />
                            
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute top-full left-0 mt-2 w-full bg-white/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
                            >
                              <div className="p-2">
                                {[
                                  { value: '', label: 'Select facility type' },
                                  { value: 'hospital', label: 'Hospital' },
                                  { value: 'clinic', label: 'Clinic' },
                                  { value: 'staffing-agency', label: 'Staffing Agency' },
                                  { value: 'long-term-care', label: 'Long-Term Care Facility' },
                                  { value: 'home-health', label: 'Home Health' },
                                  { value: 'other', label: 'Other' }
                                ].map((option, idx) => (
                                  <motion.button
                                    key={option.value || 'empty'}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, facilityType: option.value })
                                      setShowFacilityTypeDropdown(false)
                                    }}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.02 }}
                                    whileHover={{ x: 4, backgroundColor: 'rgba(127, 40, 96, 0.05)' }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                                      formData.facilityType === option.value
                                        ? 'bg-primary-50 text-primary-700 font-semibold'
                                        : option.value === '' 
                                        ? 'text-gray-400'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    {option.value !== '' && (
                                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                        formData.facilityType === option.value
                                          ? 'border-primary-600 bg-primary-600'
                                          : 'border-gray-300'
                                      }`}>
                                        {formData.facilityType === option.value && (
                                          <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                          </motion.svg>
                                        )}
                                      </div>
                                    )}
                                    <span>{option.label}</span>
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tell Us About Your Advertising Needs *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:bg-white transition-all resize-none"
                      placeholder="Tell us about your travel nurse staffing needs, specialties required, number of positions, locations, and any specific requirements..."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span>Submit Request</span>
                    </motion.button>
                  </div>
                </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
