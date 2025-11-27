'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Users,
  Target,
  TrendingUp,
  Award,
  Megaphone,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  DollarSign,
  ThumbsUp,
  Eye,
  MousePointerClick,
  BarChart3,
  Heart,
  Sparkles,
  UserCheck,
  MessageCircle,
  Send,
  Quote,
  Mail
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function BenefitsPage() {
  const router = useRouter()
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const benefits = [
    {
      icon: DollarSign,
      title: 'Reduces Dependency on Paid Advertising',
      description: 'The average person sees up to 10,000 advertisements a day, resulting in ad fatigue. Community marketing allows your travelers to become the best brand ambassadors, reducing your marketing costs while increasing effectiveness.',
      stats: {
        value: '37%',
        label: 'Higher Retention Rate',
        detail: 'When referred by peers'
      },
      color: 'from-green-500 to-green-600',
      highlights: [
        'On average, referred people have 37% higher retention rate',
        'Referred prospects have 70% higher conversion rate',
        'Lifetime value is 16% higher for referred prospects',
        'Communities are perfect for organic referrals',
        'Travelers become your best brand ambassadors',
        'Reduce budget allocated to paid advertising'
      ]
    },
    {
      icon: Target,
      title: 'Consistently Speaks Directly to a Target Audience',
      description: 'Community-based marketing speaks directly to your target audience by leveraging channels and platforms that travelers are already active in and engaging with, making your message more relevant and impactful.',
      stats: {
        value: '675K+',
        label: 'Active Members',
        detail: 'Engaged Community'
      },
      color: 'from-blue-500 to-blue-600',
      highlights: [
        'Authenticity and transparency in interactions',
        'Messages tailored to specific and current situations',
        'Personalization makes it more compelling',
        'Social proof through trusted community voices',
        'Marketing message amplified by influencers',
        'Recognized by community, held to standards'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Increases Retention Opportunities',
      description: 'Community-based marketing helps healthcare staffing agencies offer more support and resources to travel nurses, including specialized training, mentorship, career coaching, and other resources to help travelers succeed.',
      stats: {
        value: '98%',
        label: 'Fill Rate',
        detail: 'Industry Leading'
      },
      color: 'from-purple-500 to-purple-600',
      highlights: [
        'Access to specialized training and mentorship',
        'Career coaching and professional development',
        'Demonstrate expertise and commitment',
        'Build credibility as thought leaders',
        'Establish reputation as culture advocates',
        'Empower travelers with voice in growth direction'
      ]
    },
    {
      icon: UserCheck,
      title: 'Reaches Passive Candidates with Less Effort',
      description: 'Over 1.7 million healthcare travelers are currently employed in the United States. Only 2 out of 100 travelers are actively searching, while 98 are not searching but are open to options. Community presence ensures you\'re top of mind.',
      stats: {
        value: '98%',
        label: 'Passive but Open',
        detail: 'Not actively searching'
      },
      color: 'from-orange-500 to-orange-600',
      highlights: [
        'Missed opportunity to focus only on 2% actively searching',
        'Passive candidates less driven by money',
        'Opt for better work/life balance',
        'Have luxury of being choosy - don\'t need you, might want you',
        'See other travelers benefit from better partnerships',
        'Top-of-mind placement when ready to switch'
      ]
    },
    {
      icon: Award,
      title: 'Stand Out in a Very Crowded Space',
      description: 'It\'s hard to stand out in the healthcare staffing space. All agencies have the same goal, so it doesn\'t matter what you do—but how you do it. When you consistently acknowledge, support, and interact with your community, they give you their loyalty.',
      stats: {
        value: '80%',
        label: 'Experience Matters',
        detail: 'As vital as service'
      },
      color: 'from-pink-500 to-pink-600',
      highlights: [
        'How you do it matters, not just what you do',
        'Consistently acknowledge and support community',
        'Give value for free to community members',
        'They give loyalty by telling other travelers',
        '80% say experience is as vital as the service',
        'Word-of-mouth from satisfied travelers'
      ]
    }
  ]

  const communityMetrics = [
    { icon: Users, value: '575,000+', label: 'Community Members', color: 'from-primary-500 to-primary-600' },
    { icon: Award, value: '#1', label: 'Travel Nursing Brand', color: 'from-primary-500 to-primary-600' },
    { icon: Eye, value: '23,000+', label: 'Monthly Visitors', color: 'from-primary-500 to-primary-600' },
    { icon: MousePointerClick, value: '503,000+', label: 'Monthly Page Views', color: 'from-primary-500 to-primary-600' }
  ]

  const testimonial = {
    content: 'The Gypsy Nurse community has grown to 575,000 travelers as this is being written, making us the #1 recognized brand in travel nursing today. Our community of travelers lets their voices be heard in an annual survey to rate – based on their personal experience with agencies – key performance areas that the community had indicated were most important to them when working with a travel nurse staffing firm.',
    highlight: 'Travelers will always trust travelers over even the best marketing at the end of the day, so when the community speaks— it\'s wise to listen.'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden min-h-[100vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80")',
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
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6"
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
                  #1 Travel Nursing Community
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
                <span className="text-white">5 Benefits of</span>{' '}
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
                  Community Based
                </motion.span>
                <br />
                <span className="text-white">Marketing</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
              >
                Communities are a powerful thing. The non-intrusive nature of community marketing empowers individuals to invest because they're not just being told a narrative—they are actively taking part in shaping it.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center gap-4 pt-4"
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
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - What is Community-Based Marketing */}
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
                About Community Marketing
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              The Power of <span className="gradient-text">Community</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Communities are powerful. The non-intrusive nature of community marketing empowers individuals to invest because they're actively taking part in shaping the narrative.
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
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Why Community Marketing?</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      People are now much more apt to be swayed by peer reviews and testimonials. In the healthcare staffing industry, travelers lean on each other for transparency on agencies, recruiters, and hospitals. The importance of their community and opinions weighs heavily on an agency's investment in their trust.
                    </p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Ongoing success strategy vs. one-time campaigns</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Increases brand awareness over time</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Generates qualified leads organically</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Adds lasting value to your brand</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Peer Trust */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary-50 to-primary-100/50 border-primary-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Trust Through Peers</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Unlike standard marketing and ad campaigns, community marketing leverages the most powerful form of advertising: word-of-mouth from trusted peers who have real experience with your brand.
                    </p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-primary-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">37% higher retention rate when referred</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">70% higher conversion rate with referrals</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">16% higher lifetime value for referred prospects</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Travelers become your best brand ambassadors</p>
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
            {communityMetrics.map((metric, index) => {
              const Icon = metric.icon
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
                  <div className="text-3xl font-bold gradient-text mb-2">{metric.value}</div>
                  <div className="text-gray-700 text-sm font-medium">{metric.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
                Key Benefits
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              5 Benefits of <span className="gradient-text">Community Marketing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why community marketing is an ongoing success strategy that adds lasting value to your healthcare staffing agency
            </p>
          </motion.div>

          {/* Benefits Cards */}
          <div className="space-y-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
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
                          {benefit.title}
                        </h3>
                        <p className="text-base text-gray-600 leading-relaxed mb-4">
                          {benefit.description}
                        </p>
                      </div>

                      {/* Highlights List */}
                      <ul className="space-y-2">
                        {benefit.highlights.map((highlight, hIndex) => (
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
                          {benefit.stats.value}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {benefit.stats.label}
                        </div>
                        <div className="text-xs text-gray-600">
                          {benefit.stats.detail}
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

      {/* Community Power Section */}
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
                Community Feedback
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              The Power of <span className="gradient-text">Community Voice</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our annual survey lets travelers rate agencies based on their personal experience, helping agencies understand what's essential to the community
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-100 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Travelers Trust Travelers
                  </h3>
                  <p className="text-gray-600">
                    When the community speaks, it's wise to listen
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 md:p-8 border-2 border-gray-200">
                  <Quote className="w-10 h-10 text-primary-500/40 mb-4" />
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    {testimonial.content}
                  </p>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="text-base md:text-lg font-semibold text-primary-600 italic">
                      "{testimonial.highlight}"
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: Users, value: '600K+', label: 'Travel Healthcare Pros', color: 'from-blue-500 to-blue-600' },
                    { icon: BarChart3, value: 'Daily', label: 'Thousands Served', color: 'from-purple-500 to-purple-600' },
                    { icon: Award, value: '#1', label: 'Industry Community', color: 'from-green-500 to-green-600' }
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
                        className="bg-white rounded-xl p-5 text-center border-2 border-gray-100 shadow-md hover:shadow-lg transition-all"
                      >
                        <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg mb-3`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
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
              Ready to <span className="gradient-text">Partner with Us?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Contact our team to discuss advertising opportunities and partnership options
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

