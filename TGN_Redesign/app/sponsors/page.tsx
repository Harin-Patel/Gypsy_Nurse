'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Award,
  Users,
  Heart,
  CheckCircle,
  ArrowRight,
  Mail,
  Sparkles,
  Building2,
  Quote,
  Star,
  Shield,
  TrendingUp,
  Eye,
  MousePointerClick,
  Facebook,
  Instagram,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function SponsorsPage() {
  const router = useRouter()
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({})
  
  const toggleCard = (tierIndex: number, sponsorIndex: number) => {
    const key = `${tierIndex}-${sponsorIndex}`
    setExpandedCards(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const sponsorTiers = [
    {
      tier: 'Platinum Sponsors',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100/50',
      borderColor: 'border-yellow-200',
      sponsors: [
        {
          name: 'American Mobile',
          description: 'What makes American Mobile the best travel nursing company to work for? It is simple; experience. We take pride in having largest database of travel nurse jobs plus the most comprehensive salary and benefits packages. Our friendly team will listen to your needs and match you with the right job.',
          logo: 'https://static.thegypsynurse.com/2022/12/logo-resizing-4.png.webp'
        },
        {
          name: 'Travel Nurse Across America (TNAA)',
          description: 'Travel Nurse Across America places registered nurses on multi-week travel nursing assignments in healthcare facilities across all 50 states. Whatever adventure you seek – exciting locations, higher pay or the opportunity to advance your skills – TNAA\'s experienced recruiters are ready to help you grow your nursing career through travel nursing.',
          logo: 'https://static.thegypsynurse.com/2023/12/TNAA-red-logo-jpeg-002-200x200.jpg'
        },
        {
          name: 'Trustaff',
          description: 'Since 2002, Trustaff has been a leading force in healthcare staffing. We build lasting relationships with both the talented professionals looking for their next job and the companies that need their skills to succeed, offering the best travel nurse assignments all across the country. Trustaff is about more than just great jobs—it\'s about great people.',
          logo: 'https://static.thegypsynurse.com/2023/01/trusrtaff-200x200.png'
        }
      ]
    },
    {
      tier: 'Executive Sponsors',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-200',
      sponsors: [
        {
          name: 'AB Staffing Solutions',
          description: 'AB Staffing Solutions LLC is a nationwide leader in travel nurse and Healthcare Staffing. As a team, we create a positive experience for our Healthcare Providers while focusing on improving the quality of patient care in the Healthcare Facilities we work with Nationwide.',
          logo: 'https://static.thegypsynurse.com/2023/01/AB-Staffing.png.webp'
        },
        {
          name: 'Advantage Medical Professionals',
          description: 'Since 1984, Advantage Medical Professionals has connected top-quality nurses with leading healthcare organizations, all in places where we\'d want to be. Because we believe that your quality of life—especially with a career as challenging as nursing—is largely dependent on how much you enjoy where you live.',
          logo: 'https://static.thegypsynurse.com/2023/01/ad.png.webp'
        },
        {
          name: 'FlexCare',
          description: 'At FlexCare, we\'re here for the people behind patient care: travel nurses, allied health professionals, and therapists who show up every day for patients across the country. We started in 2006 with one goal: to do travel healthcare differently. That meant more transparency, better support, and real relationships. From the start, we believed clinicians deserve the same level of care and commitment they give to their patients.',
          logo: 'https://static.thegypsynurse.com/2025/08/FlexCare-Logo-300x300.png.webp'
        },
        {
          name: 'Host Healthcare',
          description: 'As the nation\'s third-largest travel nurse staffing company, we believe all nurses deserve the same quality, human-first service they give their patients. Our expert recruiters work to ensure you great pay and unlimited bonuses, industry-leading benefits, plus the freedom and flexibility to choose from tons of jobs in all 50 states, Washington, D.C, and Guam.',
          logo: 'https://static.thegypsynurse.com/2023/11/titan.webp'
        },
        {
          name: 'Medical Solutions',
          description: 'Your best interest is our best interest. We offer our clients the best in traveling medical professionals. The only way we can attract and maintain a good relationship with those professionals is to keep their best interests in mind. After all, our success relies on your success. That\'s why we always put your best interests in mind—from superior placements to finding great living accommodations and negotiating a fair price to providing the tools you need for success.',
          logo: 'https://static.thegypsynurse.com/2023/01/medi.png.webp'
        },
        {
          name: 'Tripod Partners USA',
          description: 'Your Career. Your Freedom. Your Partner. At Tripod Partners USA, we specialize in connecting travel healthcare providers, direct hires, and per diem professionals with top healthcare facilities across the States. Our mission is simple: to empower healthcare professionals to explore new opportunities, earn competitive pay, and enjoy the flexibility they deserve. With a nationwide network, transparent pay packages, and 24/7 recruiter support, we make your travel nursing journey stress-free and rewarding. Whether you\'re looking for adventure, financial growth, or career stability, Tripod Partners USA is your trusted partner every step of the way.',
          logo: 'https://static.thegypsynurse.com/2025/07/tripod-logo.jpg.webp'
        }
      ]
    },
    {
      tier: 'Premium Sponsors',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100/50',
      borderColor: 'border-blue-200',
      sponsors: [
        {
          name: 'A.T. Staffing Medical Careers',
          description: '',
          logo: 'https://static.thegypsynurse.com/2025/05/2025-LOGO-Medcial-Careers-200x200.png'
        },
        {
          name: 'Core Medical Group',
          description: '',
          logo: 'https://static.thegypsynurse.com/2024/12/core.jpg.webp'
        },
        {
          name: 'Fastaff Travel Nursing',
          description: '',
          logo: 'https://static.thegypsynurse.com/2022/03/logo-200x200.png.webp'
        },
        {
          name: 'Fusion Medical Staffing',
          description: '',
          logo: 'https://static.thegypsynurse.com/2023/10/Fusion-200-x-200.png.webp'
        },
        {
          name: 'HealthTrust Workforce Solutions',
          description: '',
          logo: 'https://static.thegypsynurse.com/2024/01/Logo-Resize.png.webp'
        },
        {
          name: 'Nomad Health',
          description: '',
          logo: 'https://static.thegypsynurse.com/2025/06/nomad_health_logo.jpg.webp'
        },
        {
          name: 'OneStaff Medical',
          description: '',
          logo: 'https://static.thegypsynurse.com/2019/12/onestaff.png.webp'
        },
        {
          name: 'Seven Healthcare',
          description: '',
          logo: 'https://static.thegypsynurse.com/2025/10/Seven-Healthcare-200-x-200%402x-150x150.png'
        },
        {
          name: 'Triage Staffing',
          description: '',
          logo: 'https://static.thegypsynurse.com/2020/01/logo-7.jpg.webp'
        },
        {
          name: 'Vibra Healthcare',
          description: '',
          logo: 'https://static.thegypsynurse.com/2024/01/vibra-square.jpg.webp'
        }
      ]
    },
    {
      tier: 'Standard Sponsors',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'from-gray-50 to-gray-100/50',
      borderColor: 'border-gray-200',
      sponsors: [
        { name: 'Ario Healthcare', description: '', logo: 'https://ariohealthcare.com/wp-content/uploads/2024/11/Ario-Website_logo.png' },
        { name: 'Health Advocates Network', description: '', logo: 'https://staffinghub.com/wp-content/uploads/2024/12/health-advocates-network-logo.jpeg' },
        { name: 'Rapid Temps', description: '', logo: 'https://www.rapidtemps.com/wp-content/uploads/2023/05/Rapid-Temps-Long-Blue-Logo.png' },
        { name: 'SambaTraveler', description: '', logo: 'https://scontent.fstv8-3.fna.fbcdn.net/v/t39.30808-6/470669180_2006975499716235_961297870068712149_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9t0bpxnbnjEQ7kNvwGnOXmo&_nc_oc=AdnvykjjJeE2RiV4sj9djZfKsjtq750SIziyfWqdmKZ29jCRdrF3QMdsiaMmiWwVYOcoKbxIdL-1bnhJi-ZW4CRQ&_nc_zt=23&_nc_ht=scontent.fstv8-3.fna&_nc_gid=wRO5tgrIRDPLymr4uG9nbQ&oh=00_AfjA-HFCRUp1kq8JLo-VbckviGmPF2SzYuLh3O1E8mApXQ&oe=692DE873' },
        { name: 'Trusted Health', description: '', logo: 'https://cdn.prod.website-files.com/6154ac78893abf1d1530f251/6154ac78893abf46c430f2b1_trusted.webp' }
      ]
    }
  ]

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
              backgroundImage: 'url("https://images.unsplash.com/photo-1584515933487-779824d29309?w=1920&h=1080&fit=crop&q=80")',
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
          <div className="max-w-5xl mx-auto text-center space-y-6">
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
                Supporting Our Community
              </span>
              <Heart className="w-5 h-5 text-red-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-white">Our</span>{' '}
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
                Valued Sponsors
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
            >
              TGN's mission is to support all travel healthcare professionals during their journey. We rely on our sponsors for financial support to maintain and manage our comprehensive resources and informational platform.
            </motion.p>

            {/* Sponsor Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              {[
                { value: '20+', label: 'Sponsor Agencies' },
                { value: '4', label: 'Sponsor Tiers' },
                { value: '100%', label: 'Community Focused' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 shadow-lg"
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="pt-4"
            >
              <motion.a
                href="#contact-information"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact-information')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-2xl hover:shadow-primary-500/50 transition-all group relative overflow-hidden cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">Become a Sponsor</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Sponsors Section */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 bg-white relative overflow-hidden">
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
            className="text-center mb-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                About Our Sponsors
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Supporting <span className="gradient-text">Travel Healthcare Professionals</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We know life on the road isn't easy, so our team strives every day to provide the best and most up-to-date resources for our community
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-0">
            {/* Left Side - Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 bg-white border-2 border-gray-100 shadow-md hover:shadow-lg hover:border-primary-200 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">TGN's Mission</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      TGN's mission is to support all travel healthcare professionals during their journey. We know life on the road isn't easy, so our team strives every day to provide the best and most up-to-date resources for our community, including jobs, housing, online tools, and great content.
                    </p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Comprehensive job board with thousands of opportunities</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Housing resources and tools</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Online tools and educational content</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Community support and networking</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Sponsors Support */}
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
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Why We Need Sponsors</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      To maintain and manage our comprehensive resources and informational platform, we rely on our sponsors for financial support. The following travel healthcare agencies support TGN organization, and we appreciate their business.
                    </p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-primary-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Platform maintenance and updates</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Content creation and resources</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Community support programs</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">Event hosting and webinars</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsors by Tier */}
      {sponsorTiers.map((tier, tierIndex) => (
        tier.sponsors.length > 0 && (
          <section key={tierIndex} className="pt-12 pb-12 md:pt-16 md:pb-16 relative overflow-hidden bg-white">
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Separator Line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8 opacity-40"></div>
              
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-4"
                >
                  <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                    {tier.tier === 'Platinum Sponsors' ? 'Platinum Tier' :
                     tier.tier === 'Executive Sponsors' ? 'Executive Tier' :
                     tier.tier === 'Premium Sponsors' ? 'Premium Tier' :
                     'Standard Tier'}
                  </span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {tier.tier === 'Platinum Sponsors' ? (
                    <>Platinum <span className="gradient-text">Sponsors</span></>
                  ) : tier.tier === 'Executive Sponsors' ? (
                    <>Executive <span className="gradient-text">Sponsors</span></>
                  ) : tier.tier === 'Premium Sponsors' ? (
                    <>Premium <span className="gradient-text">Sponsors</span></>
                  ) : (
                    <>Standard <span className="gradient-text">Sponsors</span></>
                  )}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {tier.tier === 'Standard Sponsors' 
                    ? 'We appreciate the support of our standard sponsors'
                    : tier.tier === 'Premium Sponsors'
                    ? 'We appreciate the support of our premium sponsors'
                    : 'Please visit our sponsoring travel healthcare agencies below'}
                </p>
              </motion.div>

              {/* Sponsors Grid */}
              <div className={`grid ${
                tier.tier === 'Standard Sponsors' 
                  ? 'md:grid-cols-3 lg:grid-cols-5' 
                  : tier.tier === 'Premium Sponsors'
                  ? 'md:grid-cols-2 lg:grid-cols-4'
                  : 'md:grid-cols-2 lg:grid-cols-3'
              } gap-6`}>
                {tier.sponsors.map((sponsor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`group relative bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 transition-all duration-300 overflow-hidden h-full flex flex-col ${
                      tier.tier === 'Standard Sponsors' || tier.tier === 'Premium Sponsors'
                        ? 'shadow-md hover:shadow-lg hover:border-primary-200'
                        : 'shadow-md hover:shadow-lg hover:border-primary-200'
                    }`}
                    style={tier.tier === 'Standard Sponsors' || tier.tier === 'Premium Sponsors' ? {
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 20px rgba(236, 72, 153, 0.15), inset 0 0 40px rgba(236, 72, 153, 0.1)'
                    } : undefined}
                  >
                    {tier.tier === 'Standard Sponsors' || tier.tier === 'Premium Sponsors' ? (
                      // Simple name display for standard and premium sponsors
                      <div className="text-center flex flex-col items-center justify-center h-full">
                        {sponsor.logo ? (
                          <div className={`flex items-center justify-center mb-5 relative ${
                            tier.tier === 'Premium Sponsors' ? 'h-28' : 'h-28'
                          } w-full`}>
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img 
                                src={sponsor.logo} 
                                alt={sponsor.name}
                                className={`max-w-[90%] object-contain transition-transform duration-300 group-hover:scale-110 ${
                                  tier.tier === 'Premium Sponsors' ? 'max-h-28' : 'max-h-28'
                                }`}
                                style={{
                                  height: sponsor.name === 'SambaTraveler' ? '112px' : 'auto',
                                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  const fallback = target.nextElementSibling as HTMLElement
                                  if (fallback) fallback.style.display = 'flex'
                                }}
                              />
                              <div className={`hidden items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${tier.color} shadow-lg`}>
                                <Building2 className="w-10 h-10 text-white" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={`flex items-center justify-center mb-5 ${
                            tier.tier === 'Premium Sponsors' ? 'h-28' : 'h-28'
                          }`}>
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${tier.color} shadow-lg`}>
                              <Building2 className="w-10 h-10 text-white" />
                            </div>
                          </div>
                        )}
                        <h3 className={`font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 ${
                          tier.tier === 'Premium Sponsors' ? 'text-lg md:text-xl' : 'text-base md:text-lg'
                        } leading-tight`}>
                          {sponsor.name}
                        </h3>
                      </div>
                    ) : (
                      // Modern professional card for Platinum and Executive sponsors
                      <div className="flex flex-col h-full relative overflow-hidden">
                        {/* Header Section with Logo and Name */}
                        <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50/30 p-4 md:p-5 border-b-2 border-gray-100">
                          <div className="flex flex-col items-center text-center space-y-3">
                            {sponsor.logo ? (
                              <div className="relative h-16 md:h-20 w-full flex items-center justify-center group/logo">
                                <Image 
                                  src={sponsor.logo} 
                                  alt={sponsor.name}
                                  width={300}
                                  height={300}
                                  className="max-h-16 md:max-h-20 max-w-[85%] object-contain transition-transform duration-300 group-hover/logo:scale-110"
                                  style={{
                                    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
                                  }}
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <div className={`inline-flex items-center justify-center w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br ${tier.color} shadow-lg`}>
                                <Award className="w-8 h-8 md:w-9 md:h-9 text-white" />
                              </div>
                            )}
                            <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 leading-tight">
                              {sponsor.name}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Description Section */}
                        {sponsor.description && (
                          <div className="flex-1 p-4 md:p-5 bg-white flex flex-col">
                            <p className={`text-sm text-gray-600 leading-relaxed ${expandedCards[`${tierIndex}-${index}`] ? '' : 'line-clamp-4 md:line-clamp-5'}`}>
                              {sponsor.description}
                            </p>
                            {sponsor.description.length > 150 && (
                              <button
                                onClick={() => toggleCard(tierIndex, index)}
                                className="mt-3 flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors self-start"
                              >
                                {expandedCards[`${tierIndex}-${index}`] ? (
                                  <>
                                    <span>Read Less</span>
                                    <ChevronUp className="w-4 h-4" />
                                  </>
                                ) : (
                                  <>
                                    <span>Read More</span>
                                    <ChevronDown className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )
      ))}

      {/* Contact Information Section */}
      <section id="contact-information" className="pt-4 pb-8 md:pt-6 md:pb-10 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -z-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Separator Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8 opacity-40"></div>
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3"
            >
              <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                Become a Sponsor
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Interested in <span className="gradient-text">Becoming a Sponsor?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Contact our team to learn more about sponsorship opportunities and how you can support the travel healthcare community
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
            <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-gray-100 hover:border-primary-200 shadow-xl transition-all">
              <div className="text-center space-y-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Email Us Directly
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our team is ready to discuss sponsorship opportunities with you
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
