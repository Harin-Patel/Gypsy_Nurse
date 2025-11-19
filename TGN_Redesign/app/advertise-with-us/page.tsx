'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  MousePointerClick
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AdvertiseWithUsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    facilityType: '',
    message: ''
  })

  const audienceMetrics = [
    { icon: Users, value: '600K+', label: 'Travel Nurses & Healthcare Professionals', color: 'from-primary-500 to-primary-600' },
    { icon: Eye, value: 'Thousands', label: 'Daily Active Users', color: 'from-primary-500 to-primary-600' },
    { icon: Facebook, value: '150K+', label: 'Facebook Followers', color: 'from-primary-500 to-primary-600' },
    { icon: Instagram, value: '85K+', label: 'Instagram Followers', color: 'from-primary-500 to-primary-600' },
    { icon: Linkedin, value: '45K+', label: 'LinkedIn Connections', color: 'from-primary-500 to-primary-600' },
    { icon: Mail, value: 'Growing', label: 'Newsletter Subscribers', color: 'from-primary-500 to-primary-600' }
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
      description: 'Engage with our active social media community of over 630,000 followers across platforms, fostering active discussions and high engagement rates.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]


  const clientTestimonials = [
    {
      name: 'Chris Sund',
      role: 'Chief Operating Officer',
      company: 'Uniti Med',
      content: 'The Gypsy Nurse has been an invaluable partner in helping us address our staffing shortages. Their friendly team and extensive community of 500,000+ travel nurses and travel healthcare professionals have made a significant impact on our recruitment efforts.',
      logo: 'uniti-med',
      logoColor: 'red'
    },
    {
      name: 'Saundra Vild',
      role: 'DVP Training in Nursing Division',
      company: 'AMN Healthcare',
      content: 'I have thoroughly enjoyed working with Gypsy Nurse on their LIVE series! Rachel does such a great job with managing the back end and ensuring that we are set-up for success. These sessions give us such a great opportunity to connect with the community in a new way and help answer any questions they may have as they start traveling or continue their adventure. We love the time we get to spend with the Gypsy team and look forward to many more partnerships in the future.',
      logo: 'amn-healthcare',
      logoColor: 'blue'
    },
    {
      name: 'Chase Johnson',
      role: 'Interactive Marketing Manager',
      company: 'CRN',
      content: 'We believe that The Gypsy Nurse is one of the premium, non-biased hubs for travel nursing and that it is worth our efforts to have a presence in that community. The great thing about TGN is that they listen to what your organization can and can\'t do with their platform. We certainly don\'t use all of the tools that The Gypsy Nurse gives us (Facebook groups, quarterly article promotions, etc.); however, they still continually try to look for solutions to help us maximize the partnership without upselling us on anything. The result is a true feeling of a partnership. It is abundantly clear that The Gypsy Nurse cares deeply about their nurses and employers that help power the site.',
      logo: 'crn',
      logoColor: 'teal'
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
      
      {/* Top Banner */}
      <section className="bg-primary-100 py-3 border-b border-primary-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
            <p className="text-primary-800 font-semibold text-sm md:text-base">
              Book your advertising package with The Gypsy Nurse today!
            </p>
            <span className="hidden md:inline text-primary-400">•</span>
            <p className="text-primary-700 text-sm md:text-base">
              Contact us at <a href="mailto:sharper@thegypsynurse.com" className="font-semibold hover:underline">sharper@thegypsynurse.com</a>
            </p>
          </div>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden min-h-[90vh] flex items-center">
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
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-lg mt-12"
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
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
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
                <span className="text-white/90 text-4xl md:text-5xl lg:text-6xl">
                  Today
                </span>
              </motion.h1>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Connect with thousands of travel healthcare professionals daily across multiple digital platforms.
                </p>
                <p className="text-lg text-white/70">
                  The Gypsy Nurse is dedicated to providing powerful tools, information, and social connectivity to our 600,000+ travel nurses and travel healthcare professionals.
                </p>
              </motion.div>

              {/* Key Stats - Horizontal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 pt-4"
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
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-2xl hover:shadow-primary-500/50 transition-all flex items-center gap-2 group relative overflow-hidden"
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
                  className="px-8 py-4 bg-white/95 backdrop-blur-sm text-primary-600 rounded-xl font-semibold shadow-xl hover:shadow-2xl border-2 border-white/50 transition-all flex items-center gap-2 group"
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
              className="space-y-6"
            >
              {/* Top Metrics Row */}
              <div className="grid grid-cols-2 gap-4">
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
                      <div className="relative bg-white/15 backdrop-blur-2xl rounded-2xl p-6 shadow-xl border border-white/20 overflow-hidden h-full transition-all duration-300 group-hover:border-primary-300/50">
                        {/* Hover Glow Effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
                        />
                        <div className="relative z-10">
                          <div className={`inline-block p-3 bg-gradient-to-br ${metric.color} rounded-xl shadow-lg mb-3 transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                          <div className="text-xs text-white/80 font-medium leading-tight">{metric.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom Metrics Row */}
              <div className="grid grid-cols-2 gap-4">
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
                      <div className="relative bg-white/15 backdrop-blur-2xl rounded-2xl p-6 shadow-xl border border-white/20 overflow-hidden h-full transition-all duration-300 group-hover:border-primary-300/50">
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
                        />
                        <div className="relative z-10">
                          <div className={`inline-block p-3 bg-gradient-to-br ${metric.color} rounded-xl shadow-lg mb-3 transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
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
                className="relative bg-gradient-to-br from-primary-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1">Verified Platform</div>
                    <div className="text-white/70 text-sm">All credentials pre-verified</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-white to-primary-50/20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About The Gypsy Nurse</h2>
              <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 overflow-hidden">
                <div className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-3xl border border-primary-200/50 shadow-lg -z-10" />
                <div className="relative z-10 space-y-6 text-left">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    The Gypsy Nurse is dedicated to providing powerful tools, information, and social connectivity to our community of travel healthcare professionals.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We help nurses find travel nurse jobs, evaluate agencies, locate housing, access online career resources, and connect with colleagues across multiple digital platforms.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 pt-6">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                      <div className="text-3xl font-bold text-primary-600 mb-2">600,000+</div>
                      <div className="text-gray-700 font-medium">Travel Nurses & Healthcare Professionals</div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                      <div className="text-3xl font-bold text-primary-600 mb-2">#1</div>
                      <div className="text-gray-700 font-medium">Travel Nursing Community in the Industry</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary-700 mb-4">Client Testimonials</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl">
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
                    className="min-w-full px-4 flex-shrink-0"
                    style={{ width: '100%' }}
                  >
                    <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 h-full">
                      <div className="grid md:grid-cols-2 gap-8 items-stretch h-full">
                        {/* Testimonial Content */}
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <Quote className="w-12 h-12 text-primary-500/30 mb-4" />
                            <p className="text-lg text-gray-700 leading-relaxed mb-6 min-h-[200px]">
                              "{testimonial.content}"
                            </p>
                          </div>
                          <div className="border-t border-gray-200 pt-4 mt-auto">
                            <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                            <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
                          </div>
                        </div>

                        {/* Company Logo */}
                        <div className="flex items-center justify-center h-full">
                          <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 w-full max-w-sm">
                            {testimonial.logo === 'uniti-med' && (
                              <div className="flex items-center justify-center gap-3">
                                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Heart className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <span className="text-red-500 text-3xl font-bold lowercase">uniti</span>
                                  <span className="text-blue-900 text-3xl font-bold lowercase ml-1">med</span>
                                </div>
                              </div>
                            )}
                            {testimonial.logo === 'amn-healthcare' && (
                              <div className="flex flex-col items-center gap-4">
                                {/* AMN Healthcare Logo - Stylized Arrow */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex gap-0.5">
                                    <div className="w-8 h-3 bg-purple-600 rounded-tl-lg"></div>
                                    <div className="w-3 h-3 bg-blue-400 rounded-tr-lg"></div>
                                  </div>
                                  <div className="flex gap-0.5">
                                    <div className="w-6 h-3 bg-blue-400"></div>
                                    <div className="w-5 h-3 bg-green-500 rounded-br-lg"></div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-900">
                                    AMN<sup className="text-xs">®</sup>
                                  </div>
                                  <div className="text-sm text-blue-900 font-medium">Healthcare</div>
                                </div>
                              </div>
                            )}
                            {testimonial.logo === 'crn' && (
                              <div className="flex flex-col items-center gap-4">
                                {/* CRN Logo */}
                                <div className="w-24 h-24 bg-teal-500 rounded-xl flex items-center justify-center relative flex-shrink-0">
                                  <div className="text-white text-4xl font-bold">
                                    <span className="text-5xl">C</span>
                                    <span className="absolute left-8 top-2 text-3xl">RN</span>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-gray-900">CRN</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {clientTestimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-primary-600 w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
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
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Nurse Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Background Image - Nurse with Attire */}
                <div 
                  className="relative h-[500px] md:h-[600px] bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=1200&fit=crop&q=80")',
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-800/40 to-transparent"></div>
                  
                  {/* Decorative Elements */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-10 right-10 w-32 h-32 bg-primary-400/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1.1, 1, 1.1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"
                  />
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
                  className="absolute top-6 left-6 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-full shadow-xl border border-white/40"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-bold text-gray-900">600K+ Members</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content Box */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Glassmorphism Box */}
              <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 overflow-hidden">
                {/* Glass Effect Overlay */}
                <div className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-3xl border border-primary-200/50 shadow-lg -z-10">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ 
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-3xl -z-10" />
                
                <div className="relative z-10">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6"
                  >
                    <Zap className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-700">Free to Join</span>
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Join The Gypsy Nurse Nation
                  </h2>
                  
                  {/* Description */}
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                    Discover new travel nurse jobs, subscribe to customized job alerts and unlock unlimited resources for <span className="font-bold text-primary-600">FREE</span>.
                  </p>

                  {/* Testimonial Quote */}
                  <div className="relative bg-primary-50/50 rounded-2xl p-6 mb-8 border border-primary-100">
                    <Quote className="w-12 h-12 text-primary-300 absolute -top-2 -left-2" />
                    <p className="text-lg text-gray-700 italic leading-relaxed mb-4 pl-4">
                      "Since just recently joining The Gypsy Nurse, I have had so many questions answered about the world of travel nursing. This has been an excellent resource!"
                    </p>
                    <div className="flex items-center gap-3 pl-4">
                      <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-bold text-sm">ML</span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">Meagan L.</p>
                        <p className="text-gray-600 text-sm">Cath Lab Nurse</p>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: Briefcase, text: 'Job Alerts' },
                      { icon: FileText, text: 'Resources' },
                      { icon: Users, text: 'Community' },
                      { icon: Award, text: 'Free Access' }
                    ].map((feature, idx) => {
                      const Icon = feature.icon
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Icon className="w-4 h-4 text-primary-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Join Now Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                    onClick={() => window.location.href = '/register'}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative z-10">Join Now - It's Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50/30 to-transparent relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Nursing Specialties Covered</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find travel nurses across all specialties and experience levels
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative bg-white/20 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-2xl overflow-hidden">
              <div className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-3xl border border-primary-200/50 shadow-lg -z-10" />
              <div className="relative z-10">
                <div className="flex flex-wrap justify-center gap-3">
                  {specialties.map((specialty, index) => (
                    <motion.div
                      key={specialty}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-primary-200 rounded-xl text-primary-700 font-semibold text-sm hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer"
                    >
                      {specialty}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from travel nurses and healthcare facilities who trust The Gypsy Nurse platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/40 overflow-hidden h-full">
                  <div className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-2xl border border-primary-200/50 shadow-lg -z-10" />
                  <div className="relative z-10">
                    <Quote className="w-8 h-8 text-primary-500/50 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                    <div className="border-t border-gray-200/50 pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-primary-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-xl text-gray-600">
                  Fill out the form below and our team will contact you to discuss your advertising opportunities and partnership options
                </p>
              </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/20 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
                <div className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-3xl border border-primary-200/50 shadow-lg -z-10 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ 
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-all"
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
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-all"
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
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-all"
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
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Facility Type <span className="text-red-500">*</span></label>
                    <select
                      required
                      value={formData.facilityType}
                      onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-all"
                    >
                      <option value="">Select facility type</option>
                      <option value="hospital">Hospital</option>
                      <option value="clinic">Clinic</option>
                      <option value="staffing-agency">Staffing Agency</option>
                      <option value="long-term-care">Long-Term Care Facility</option>
                      <option value="home-health">Home Health</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tell Us About Your Advertising Needs *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-all resize-none"
                      placeholder="Tell us about your travel nurse staffing needs, specialties required, number of positions, locations, and any specific requirements..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>Submit Request</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
