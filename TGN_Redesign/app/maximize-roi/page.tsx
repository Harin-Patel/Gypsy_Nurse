'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Award,
  Mail,
  Send,
  Eye,
  MousePointerClick,
  Globe,
  Network,
  FileText,
  DollarSign,
  Zap,
  Building2,
  Shield,
  Sparkles,
  Quote,
  Heart
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function MaximizeROIPage() {
  const router = useRouter()
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const roiWays = [
    {
      icon: Users,
      title: 'Access to a Large Community of Healthcare Professionals',
      description: 'The Gypsy Nurse has become the most-recognizable travel nursing brand today. With over 575,000 followers on our social platforms, 132k+ subscribers within our email database, and a website with over 65,000 visitors a month, our community is the largest gathering of travel nurses anywhere. According to Higher Logic, brands with communities see an average of +1,352% return on investment.',
      stats: {
        value: '+1,352%',
        label: 'Average ROI',
        detail: 'For brands with communities'
      },
      highlights: [
        '575,000+ followers on social platforms',
        '132k+ email subscribers',
        '65,000+ monthly website visitors',
        'Largest gathering of travel nurses',
        'Reduced marketing costs',
        'Larger pool of qualified candidates'
      ],
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Globe,
      title: 'Increased Brand Visibility',
      description: 'Gypsy Nurse has a strong brand presence in the travel nursing industry on and offline. Recently, The Gypsy Nurse acquired TravCon, the premier healthcare traveler conference, to form the largest community of travel nurses and healthcare travel professionals worldwide. 82% of consumers stated that interacting with companies or brands supporting a mission is essential.',
      stats: {
        value: '82%',
        label: 'Consumers Value',
        detail: 'Mission-driven brands'
      },
      highlights: [
        'Strong brand presence on and offline',
        'Acquired TravCon conference',
        'Largest community worldwide',
        'Trusted source among audiences',
        'Mission-driven approach',
        'Continuous brand recognition'
      ],
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Target,
      title: 'Generating More Leads and Conversions',
      description: 'The Gypsy Nurse is more than just a community; it\'s also a platform where healthcare staffing agencies can post jobs directly to get in front of travel nurses. This allows you to instantly put dollars into conversions and track cost per lead and cost per placement. Most companies should follow a 60/40 rule—60% on branding and 40% on direct lead generation.',
      stats: {
        value: '60/40',
        label: 'Marketing Split',
        detail: 'Branding vs Lead Gen'
      },
      highlights: [
        'Direct job posting platform',
        'Track cost per lead',
        'Track cost per placement',
        'Instant conversion tracking',
        '60% branding, 40% lead gen',
        'Measurable ROI metrics'
      ],
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: TrendingUp,
      title: 'Increased Website Traffic',
      description: 'Increased visibility will lead to increased visits to your website. Direct traffic is a clear, effective metric that showcases people who are familiar with your brand and are searching for your staffing agency. If you notice branded direct traffic is increasing, it correlates with communities putting in work for word of mouth.',
      stats: {
        value: '↑',
        label: 'Direct Traffic',
        detail: 'Brand recognition'
      },
      highlights: [
        'Increased website visits',
        'Direct traffic metrics',
        'Brand familiarity indicators',
        'Search volume data',
        'Referral traffic from TGN',
        'Word-of-mouth growth'
      ],
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: FileText,
      title: 'Strategic Collaboration on Industry Research',
      description: 'The Gypsy Nurse conducts industry research on travel nursing trends and best practices, providing agencies access to this research and helping them make more informed decisions about recruitment and retention strategies. Partnering with The Gypsy Nurse can provide agencies with opportunities for strategic partnerships with healthcare facilities and other organizations.',
      stats: {
        value: '↑',
        label: 'Strategic',
        detail: 'Partnerships'
      },
      highlights: [
        'Access to industry research',
        'Travel nursing trend insights',
        'Best practices data',
        'Informed recruitment decisions',
        'Strategic partnerships',
        'Higher bill rates potential'
      ],
      color: 'from-primary-500 to-primary-600'
    }
  ]

  const painPoints = [
    {
      title: 'Standing out in a crowded space',
      description: 'By building a community of healthcare professionals, staffing agencies can tap into a broader network of potential candidates. The Gypsy Nurse has cultivated a nurse traveler community through social media, expert content, and live and on-demand webinars and events.',
      icon: Target
    },
    {
      title: 'Retaining top talent',
      description: 'Agencies can create a sense of loyalty through community marketing. By consistently engaging with healthcare professionals meaningfully through providing support, resources, and advice, agencies can learn more about what motivates them and tailor recruitment strategies accordingly.',
      icon: Heart
    },
    {
      title: 'Keeping up with high demand for quality',
      description: 'Because they are gaining talent from a trusted source, an agency can access a pool of qualified, top-level healthcare professionals. Additionally, healthcare staffing agencies can build trust and credibility in their brand when quality candidates vouch for them.',
      icon: Award
    }
  ]

  const communityMetrics = [
    { icon: Users, value: '575,000+', label: 'Social Followers', color: 'from-primary-500 to-primary-600' },
    { icon: Mail, value: '132K+', label: 'Email Subscribers', color: 'from-primary-500 to-primary-600' },
    { icon: Eye, value: '65,000+', label: 'Monthly Visitors', color: 'from-primary-500 to-primary-600' },
    { icon: Award, value: '#1', label: 'Travel Nursing Brand', color: 'from-primary-500 to-primary-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navigation />
      
      {/* Hero Section - Updated to match sponsors page styling */}
      <section className="relative pt-32 pb-12 overflow-hidden min-h-[100vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=80")',
              backgroundPosition: 'center 30%',
              backgroundSize: 'cover',
            }}
          >
            {/* Dark Gradient Overlay - Lighter for better visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/50"></div>
            <div className="absolute inset-0 bg-primary-900/15"></div>
          </motion.div>
          
          {/* Animated Accents */}
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
          <div className="max-w-5xl mx-auto">
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
                    Maximize Your Investment
                  </span>
                  <Award className="w-5 h-5 text-yellow-400" />
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="text-white">Maximize ROI by</span>{' '}
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
                    Partnering with TGN
                  </motion.span>
                </motion.h1>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                    Healthcare staffing agencies play a vital role in filling open positions nationwide. Learn how The Gypsy Nurse can help you maximize your return on investment through community-based marketing.
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
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
                </motion.div>
              </motion.div>

              {/* Right Content - Metrics Grid */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  {communityMetrics.map((metric, index) => {
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What is ROI Section */}
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
                Understanding ROI
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              What Does It Mean to <span className="gradient-text">Maximize ROI</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maximizing ROI involves generating high financial returns while minimizing associated costs
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
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Maximizing Return on Investment</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Businesses achieve this by evaluating the costs and benefits of their investments, implementing cost-saving measures, improving productivity, and increasing customer satisfaction, retention, revenue, and profits.
                    </p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Evaluate costs and benefits of investments</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Implement cost-saving measures</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Improve productivity and efficiency</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Increase customer satisfaction and retention</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Risk & Reward */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary-50 to-primary-100/50 border-primary-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Balancing Risk and Reward</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Achieving a high ROI requires balancing risk and reward by analyzing the risks and benefits of each investment opportunity and taking calculated risks to pursue higher returns.
                    </p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-primary-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Analyze risks and benefits of opportunities</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Take calculated risks for higher returns</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Community marketing reduces risk</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Proven track record with measurable results</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
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
                Challenges
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              What Makes Maximizing ROI <span className="gradient-text">Tricky</span> in Healthcare Staffing?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              There are a few pain points when discussing managing return on investment in a highly competitive services industry like healthcare staffing
            </p>
          </motion.div>

          {/* Pain Points Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-md hover:shadow-lg transition-all h-full"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 border-2 border-primary-200">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5 Ways to Maximize ROI Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10 opacity-40"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                Key Strategies
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              5 Ways The Gypsy Nurse Can Help <span className="gradient-text">Maximize Your ROI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the best ways to maximize your ROI with community-based marketing stems from measuring specific KPIs while monitoring your brand awareness
            </p>
          </motion.div>

          {/* ROI Ways Cards */}
          <div className="space-y-6 max-w-6xl mx-auto">
            {roiWays.map((way, index) => {
              const Icon = way.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`bg-white rounded-2xl p-6 md:p-8 border-2 transition-all duration-300 ${
                    activeCard === index 
                      ? 'border-primary-300 shadow-xl' 
                      : 'border-gray-100 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="grid md:grid-cols-12 gap-6 items-start">
                    {/* Left: Number Badge with Icon */}
                    <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg">
                          <span className="text-2xl font-bold text-white">{index + 1}</span>
                        </div>
                        {/* Icon Badge */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md border-2 border-primary-200">
                          <Icon className="w-4 h-4 text-primary-600" />
                        </div>
                      </div>
                    </div>

                    {/* Middle: Content */}
                    <div className="md:col-span-7 space-y-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                          {way.title}
                        </h3>
                        <p className="text-base text-gray-600 leading-relaxed mb-4">
                          {way.description}
                        </p>
                      </div>

                      {/* Highlights List */}
                      <ul className="space-y-2">
                        {way.highlights.map((highlight, hIndex) => (
                          <motion.li
                            key={hIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 * hIndex }}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Stat Card */}
                    <div className="md:col-span-3">
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-6 border-2 border-primary-200 h-full flex flex-col items-center justify-center text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-3">
                          <BarChart3 className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="text-4xl font-bold text-primary-600 mb-2">
                          {way.stats.value}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {way.stats.label}
                        </div>
                        <div className="text-xs text-gray-600">
                          {way.stats.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Strong Partnerships Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10 opacity-40"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-3xl p-8 md:p-12 border-2 border-primary-200 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Strong Partnerships Lead to Maximized Results
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80">
                  <Quote className="w-10 h-10 text-primary-500/40 mb-4" />
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    By leveraging the resources and opportunities provided by The Gypsy Nurse, healthcare staffing agencies can increase efficiency, productivity, and client satisfaction, leading to improved financial performance. Return on investment can mean many things to people, but when interactions with your communities are tracked, heard, and addressed, you will reap the rewards of growth.
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-base font-semibold text-primary-600 italic">
                      "Connect with The Gypsy Nurse today to learn more about how we can help your agency take its next step toward success."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
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
                Get In Touch
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Ready to <span className="gradient-text">Maximize Your ROI?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Contact our team today to learn how we can help your agency take its next step toward success
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

      <Footer />
    </div>
  )
}

