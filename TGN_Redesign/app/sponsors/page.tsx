'use client'

import React, { useState, useRef, useEffect } from 'react'
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
  const [activeTab, setActiveTab] = useState<string>('')
  const [isTabBarFixed, setIsTabBarFixed] = useState(false)
  
  const platinumRef = useRef<HTMLDivElement>(null)
  const executiveRef = useRef<HTMLDivElement>(null)
  const premiumRef = useRef<HTMLDivElement>(null)
  const standardRef = useRef<HTMLDivElement>(null)
  
  const toggleCard = (tierIndex: number, sponsorIndex: number) => {
    const key = `${tierIndex}-${sponsorIndex}`
    setExpandedCards(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const scrollToSection = (section: string) => {
    let ref: React.RefObject<HTMLDivElement | null> | null = null
    switch (section) {
      case 'platinum':
        ref = platinumRef
        break
      case 'executive':
        ref = executiveRef
        break
      case 'premium':
        ref = premiumRef
        break
      case 'standard':
        ref = standardRef
        break
    }
    
    if (ref?.current) {
      const offset = 100 // Account for sticky nav
      const elementPosition = ref.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveTab(section)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const aboutSection = document.getElementById('about-sponsors')
      
      if (aboutSection) {
        const aboutSectionTop = aboutSection.offsetTop
        setIsTabBarFixed(scrollPosition > aboutSectionTop - 100)
      }

      // Determine active tab based on scroll position
      const sections = [
        { ref: platinumRef, id: 'platinum' },
        { ref: executiveRef, id: 'executive' },
        { ref: premiumRef, id: 'premium' },
        { ref: standardRef, id: 'standard' }
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveTab(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          name: 'Medical Solutions',
          description: 'Medical Solutions is one of the nation\'s largest healthcare talent ecosystems. We connect nurses and allied health clinicians with hospitals and healthcare systems across the country. Since our beginning in 2001, Medical Solutions has grown organically, diversified our service offerings, and brought like-minded companies into our fold. In 2018, we acquired PPR Travel Nursing. Our 2019 purchase of C&A Industries was the largest acquisition in the history of the healthcare staffing industry, which expended our footprint into the allied health market. In 2022, we acquired Matchwell, to connect more clinicians and clients with local contract and per diem positions and HOST Healthcare, and in 2023, Worldwide HealthStaff Solutions. Our continued growth and expansion are supported by our partnership with Centerbridge Partners and CDPQ. Headquartered in Omaha, Nebraska, Medical Solutions now spans office locations across the U.S, coast to coast. We\'re an industry frontrunner, the third largest for healthcare staffing in the country (second largest in travel nursing and fourth largest in allied health). We\'re people who care connecting people who care, and we\'re not shy in saying we are the very best at what we do.',
          logo: 'https://static.thegypsynurse.com/2023/01/medi.png.webp'
        },
        {
          name: 'Titan Medical Group',
          description: 'Your best interest is our best interest. We offer our clients the best in traveling medical professionals. The only way we can attract and maintain a good relationship with those professionals is to keep their best interests in mind. After all, our success relies on your success. That\'s why we always put your best interests in mind—from superior placements to finding great living accommodations and negotiating a fair price to providing the tools you need for success. In 2001, Brian Wilke founded Titan Medical in Omaha, Nebraska. Since then, we\'ve become one of the top healthcare staffing agencies in the Midwest because of our uncompromising values and our dedication to filling positions with the best healthcare professionals available.',
          logo: 'https://static.thegypsynurse.com/2023/11/titan.webp'
        },
        {
          name: 'Tripod Partners USA',
          description: 'Tripod Partners USA – Your Career. Your Freedom. Your Partner. At Tripod Partners USA, we specialize in connecting travel healthcare providers, direct hires, and per diem professionals with top healthcare facilities across the States. Our mission is simple: to empower healthcare professionals to explore new opportunities, earn competitive pay, and enjoy the flexibility they deserve. With a nationwide network, transparent pay packages, and 24/7 recruiter support, we make your travel nursing journey stress-free and rewarding. Whether you\'re looking for adventure, financial growth, or career stability, Tripod Partners USA is your trusted partner every step of the way. Why Nurses Choose Us: ✔ Travel Nursing Expertise – Top assignments nationwide ✔ Flexible Options – Travel, Direct Hire, and Per Diem ✔ Transparent Pay & Benefits – No surprises, just rewards ✔ Personalized Support – Recruiters who care about your success Ready to start your next adventure? Your next assignment is just a Tripod away.',
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
          description: 'Over fifty years ago, the first A.T. Staffing office opened its doors in Tyler, Texas with a strong focus on innovation, dedication, integrity, and know-how. Over five decades later, we have multiple branch locations to serve our local communities and surrounding states. These branches also serve our rapidly growing travel nursing and allied health teams across the US. We employ and hire hundreds of medical professionals every year with a unique and personal approach to help you achieve your career and financial goals. We offer a comprehensive benefits plan and have hundreds of job openings in the medical areas of Specialty Nursing, Acute, Post Acute, Long-Term Care, Psychiatric, Rehabilitation, Radiology, Pharmacy, and Therapy.',
          logo: 'https://static.thegypsynurse.com/2025/05/2025-LOGO-Medcial-Careers-200x200.png'
        },
        {
          name: 'Core Medical Group',
          description: 'Why Choose CoreMedical For Travel Nursing & Travel Therapy With all the travel nursing and travel therapy companies out there, it is important that you choose the right medical staffing agency to advance your career. The best travel nursing companies and allied health recruiters will save you time and help you negotiate the best contract. Your healthcare recruiter will make the process of finding a travel contract simple and stress-free. Whether you are a travel nurse, travel physical therapist, travel occupational therapist, or travel speech language pathologist, CoreMedical Group is ready to assist you. What Makes CoreMedical Group Different? Our mission to Connect People, Improve Lives, and Give Back is a key part of everything we do at CoreMedical Group. Here, we put you first and treat you like family. That\'s why you will receive the same benefits available to our internal staff. From a healthcare reimbursement account to 401K matching, we offer some of the best benefits to our travelers. Plus, many of our benefits are made available to you on day one of your new travel contract. You are a part of our team as much as our internal employees! We value our travel nurses and travel therapists\' commitment to working with CoreMedical Group. Our traveling physical therapists and nurses have the opportunity to earn an all-inclusive trip to the Caribbean each year through our Club CoreMed loyalty program. You can earn points for the trip simply by working or providing referrals, and you can earn enough to bring a friend too! We have thousands of travel nursing jobs for RNs and LPNs and travel therapy jobs for PTs, OTs, and SLPs in locations like California, Texas, Hawaii, and more . In fact, we have travel nursing opportunities in all 50 states. When you travel with CoreMedical Group, we\'ll help you navigate licensing and credentialing, reimburse you for all medical services required for your assignment, and make sure you\'re set up for success from day one! Our dedicated staff will help you through the entire job placement process, from finding travel nursing and travel therapy opportunities to starting in new locations. You will always receive personalized service from your healthcare recruiter, credentialing specialist, and licensing coordinator, whether you are on your first or fiftieth medical travel assignment. We\'ll assist with your application, licensing, housing, and even set you up with a few places to visit at your new destination. CoreMedical Group has been placing travel nurses in new positions for over 25 years, and we have extensive knowledge and experience in the travel nursing and allied industries. Joint Commission Certified since 2007, we follow national standards to provide highly-qualified RNs, LPNs, PTs, OTs, SLPs and more to facilities throughout the U.S. We have continually been named one of the Largest Healthcare Staffing Firms in the U.S. by Staffing Industry Analysts. Last, but certainly not least, we\'re with you every step of the way. We will provide guidance and assistance throughout your traveling job placement processes, from your first interview to your facility orientation. Your healthcare recruiter will check-in periodically to make sure you are happy with your assignment, and you can contact us at any time throughout your travel nursing or travel therapy contract with questions or concerns. Create a profile or contact our experienced travel nurse or travel therapy healthcare recruiters at 800-995-2673 to join our travel nursing and allied family. We can\'t wait to find your ideal travel assignment!',
          logo: 'https://static.thegypsynurse.com/2024/12/core.jpg.webp'
        },
        {
          name: 'Fastaff Travel Nursing',
          description: 'We take great care to ensure that our travel nurses enjoy the freedom to work when they want, where they want, while maintaining the lifestyle they want, in addition to enjoying the excitement of travel nursing and the challenge of new experiences.',
          logo: 'https://static.thegypsynurse.com/2022/03/logo-200x200.png.webp'
        },
        {
          name: 'Fusion Medical Staffing',
          description: 'Fusion Medical Staffing provides career opportunities to healthcare professionals by helping medical facilities fill their staffing needs. Fusion staffs a variety of specialties within the nursing and allied healthcare fields. We offer competitive pay packages and benefits that travelers deserve. We pride ourselves on our communication skills, accurate job transparency and traveler first mentality. At Fusion, you can actually choose your own adventure! Fusion\'s purpose is to ensure that everyone we touch has a better life. We strive to be humble, driven and positive in all our actions!',
          logo: 'https://static.thegypsynurse.com/2023/10/Fusion-200-x-200.png.webp'
        },
        {
          name: 'HealthTrust Workforce Solutions',
          description: 'At HealthTrust Workforce Solutions, healthcare is not just about the four walls of a facility but about the people who provide and receive care. Our focus is empowering healthcare professionals to deliver exceptional patient experiences by providing them with the necessary skills, tools, and support. We partner with healthcare facilities nationwide to ensure the right professionals are in the right roles. We prioritize our clinicians by giving them a voice and access to opportunities to fulfill their mission of improving lives by providing quality patient care. We are committed to our core values of Trust, Innovation, adaptability, courage, and accountability. We are dedicated to positively impacting the healthcare industry by providing first-priority access to more than 200,000 jobs nationwide to our healthcare professionals. Join us and be part of the HealthTrust family, where you can make a difference every day.',
          logo: 'https://static.thegypsynurse.com/2025/06/HWS-Logo.png.webp'
        },
        {
          name: 'Nomad Health',
          description: 'At Nomad Health, we\'re redefining the travel healthcare experience by removing obstacles between clinicians and the bedside—so you can get where you want to go, faster. Whether you\'re chasing adventure, career growth, or a higher paycheck, your reason for traveling is yours—we\'re just here to help you get there. With transparent job listings, a seamless app experience, and a recruiter-free model that passes savings directly to you, Nomad empowers you to make informed, confident choices. Once you\'re on board, our team of expert Nomad Navigators supports you every step of the way—from credentialing to clinical questions—so you can focus on what matters most: your journey, your impact, and your next great assignment.',
          logo: 'https://static.thegypsynurse.com/2025/06/nomad_health_logo.jpg.webp'
        },
        {
          name: 'OneStaff Medical',
          description: 'YOUR ONESTAFF MEDICAL RESOURCES You deserve a partner that is working for you. Be bold and let us do just that. We\'ll take care of you while you are away from your own "home base" in every way we can, and ideally do more than you expect. If we don\'t, we want to hear your feedback (click here) so we constantly adjust how we are working with our clients. Your team at OneStaff is dedicated to finding the perfect assignments (for you), negotiate the best rates and handles any issues that may arise while you are on assignment. We take great pride in building relationships with our traveling professionals and we enjoy hearing about your experiences. Whatever the need, we are here to help along the journey. Our recruiters have decades of experience in the healthcare industry,as well as mucho \'people skills\' to ensure two goals; 1) getting you placed in your current dream assignment and 2) we all have fun doing it. By understanding what you need, and what you like, we help find the ideal facility for you. We won\'t stop until we are sure we\'re providing our healthcare professionals the most personal and professional service available. We understand you are the heart and soul of what we are. Whether it is housing, payroll, travel, benefits, or just a friendly voice to talk to, we are there every step of the way. The company you choose is the most important decision you will make in your traveling career. We get that, so we\'re committed to you 24 hours-a-day, 7 days-a-week. We\'re your "one" solution in travel assignments and here to assist whether helping with accelerating your trajectory towards your career goals or meeting your travel requirements. We guarantee to make every effort to ensure your experience with us is enjoyable, as well as personally fulfilling. If we make you happy, we are happy. We welcome you to the OneStaff team!',
          logo: 'https://static.thegypsynurse.com/2019/12/onestaff.png.webp'
        },
        {
          name: 'Seven Healthcare',
          description: 'Seven Healthcare is proud to be Joint Commission–certified, demonstrating our commitment to quality, safety, and excellence in healthcare staffing. If you are seeking an exciting new chapter in your healthcare career, our multi-award-winning team is here to help. With more than ten years of experience placing exceptional staff with employers across the USA, we have also built a strong track record of helping healthcare professionals from Canada secure rewarding travel contracts in the United States. From Travel Nurses, LPNs, LVNs, and CNAs to Allied Health professionals such as CT Technologists, Radiologic Technologists, MRI Technologists, Physical Therapists, and many more, we can help you take the next step in your career.',
          logo: 'https://static.thegypsynurse.com/2025/10/Seven-Healthcare-200-x-200@2x.png'
        },
        {
          name: 'Triage Staffing',
          description: 'At Triage, we believe sweet jobs don\'t need sugarcoating. And since even the best positions aren\'t 100% flawless, we\'re perfectly honest about what isn\'t perfect. Management consultants call it "setting expectations." We call it giving a damn—something we will always choose to do. When you take an assignment with Triage you can expect custom, competitive pay packages, a reliable recruiter and team who always has your back, and day one nationwide insurance benefits. Yeah, you read that right—benefits that benefit you day one on the job. Because we\'re not just here for a signature on the dotted line. We\'re here for the long haul and to get you exactly what you want out of your nursing career.',
          logo: 'https://static.thegypsynurse.com/2021/02/1to1_Ratio-002.png.webp'
        },
        {
          name: 'Vibra Travels',
          description: 'Regardless of the placement you\'re seeking, you\'ll experience the same great benefits when choosing Vibra Travels for your next contract. White-glove service, every step of the way: At Vibra Travels, we believe in providing top-notch service to our travel nurses. From the moment you first contact us, you\'ll experience a level of support and care that sets us apart from the rest. Your recruiter, your partner: Unlike other travel nursing agencies, we believe in building one-on-one relationships with our clinicians. Your dedicated recruiter will be your advocate, guiding you through the entire process and ensuring your needs are met. Clinical support at your fingertips: We understand that being a traveler can sometimes be challenging. That\'s why we have a dedicated clinical support team available to answer any questions or concerns you may have during your assignments. Nationwide placements, endless opportunities: With Vibra Travels, you\'ll have access to placements across the nation. Whether you\'re looking for an acute care, rehabilitation, critical care, or behavioral health hospital, we have opportunities waiting for you in every corner of the country. Join us today and experience traveling done different!',
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
        { name: 'Ario Healthcare', description: '', logo: 'https://static.thegypsynurse.com/2025/07/Ario-Logo.png.webp' },
        { name: 'Health Advocates Network', description: '', logo: 'https://static.thegypsynurse.com/2025/11/logo-han.jpg.webp' },
        { name: 'Rapid Temps by DocGo', description: '', logo: 'https://static.thegypsynurse.com/2023/01/rapidtemps.jpg.webp' },
        { name: 'SambaTraveler', description: '', logo: 'https://static.thegypsynurse.com/2025/02/sambastaffing.png.webp' },
        { name: 'Trusted Health', description: '', logo: 'https://static.thegypsynurse.com/2023/07/Trusted_Symbol_CMYK_Fresh-Mint_Black-Small.jpg.webp' }
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

      {/* Sticky Navigation Tabs */}
      <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm transition-all ${isTabBarFixed ? '' : 'hidden'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => scrollToSection('platinum')}
              className={`px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${
                activeTab === 'platinum'
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-primary-200'
              }`}
            >
              Platinum Sponsors
            </button>
            <button
              onClick={() => scrollToSection('executive')}
              className={`px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${
                activeTab === 'executive'
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-primary-200'
              }`}
            >
              Executive Sponsors
            </button>
            <button
              onClick={() => scrollToSection('premium')}
              className={`px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${
                activeTab === 'premium'
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-primary-200'
              }`}
            >
              Premium Sponsors
            </button>
            <button
              onClick={() => scrollToSection('standard')}
              className={`px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${
                activeTab === 'standard'
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-primary-200'
              }`}
            >
              Standard Sponsors
            </button>
          </div>
        </div>
      </div>

      {/* About Sponsors Section */}
      <section id="about-sponsors" className="pt-16 pb-8 md:pt-20 md:pb-10 bg-white relative overflow-hidden">
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
      {sponsorTiers.map((tier, tierIndex) => {
        const getSectionRef = () => {
          if (tier.tier === 'Platinum Sponsors') return platinumRef
          if (tier.tier === 'Executive Sponsors') return executiveRef
          if (tier.tier === 'Premium Sponsors') return premiumRef
          if (tier.tier === 'Standard Sponsors') return standardRef
          return null
        }
        
        const getSectionId = () => {
          if (tier.tier === 'Platinum Sponsors') return 'platinum'
          if (tier.tier === 'Executive Sponsors') return 'executive'
          if (tier.tier === 'Premium Sponsors') return 'premium'
          if (tier.tier === 'Standard Sponsors') return 'standard'
          return ''
        }
        
        if (tier.sponsors.length === 0) return null
        
        return (
          <section 
            key={tierIndex} 
            ref={getSectionRef()}
            id={getSectionId()}
            className="pt-12 pb-12 md:pt-16 md:pb-16 relative overflow-hidden bg-white scroll-mt-24"
          >
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
                {tier.sponsors.map((sponsor, index) => {
                  const slugMap: { [key: string]: string } = {
                    'American Mobile': 'american-mobile',
                    'Travel Nurse Across America (TNAA)': 'tnaa',
                    'Trustaff': 'trustaff',
                    'AB Staffing Solutions': 'ab-staffing',
                    'Advantage Medical Professionals': 'advantage-medical',
                    'FlexCare': 'flexcare',
                    'Titan Medical Group': 'titan-medical-group',
                    'Medical Solutions': 'medical-solutions',
                      'Tripod Partners USA': 'tripod-partners',
                      'A.T. Staffing Medical Careers': 'at-staffing',
                      'Core Medical Group': 'core-medical-group',
                      'Fastaff Travel Nursing': 'fastaff',
                      'Fusion Medical Staffing': 'fusion-medical-staffing',
                      'HealthTrust Workforce Solutions': 'healthtrust-workforce-solutions',
                      'Nomad Health': 'nomad-health',
                      'OneStaff Medical': 'onestaff-medical',
                      'Seven Healthcare': 'seven-healthcare',
                      'Triage Staffing': 'triage-staffing',
                      'Vibra Travels': 'vibra-travels',
                      'Ario Healthcare': 'ario-healthcare',
                      'Health Advocates Network': 'health-advocates-network',
                      'Rapid Temps by DocGo': 'rapid-temps',
                      'SambaTraveler': 'samba-traveler',
                      'Trusted Health': 'trusted-health'
                    }
                  
                  const getSponsorSlug = (name: string) => {
                    return slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                  }
                  
                  const sponsorSlug = getSponsorSlug(sponsor.name)
                  
                  // Platinum, Executive, Premium, and Standard sponsors are clickable (if they have a slug mapping)
                  const isClickable = (tier.tier === 'Platinum Sponsors' || tier.tier === 'Executive Sponsors' || tier.tier === 'Premium Sponsors' || tier.tier === 'Standard Sponsors') && sponsorSlug && slugMap[sponsor.name] !== undefined
                  
                  const CardWrapper = isClickable ? motion.a : motion.div
                  
                  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
                    const target = e.target as HTMLElement
                    if (target.closest('button') || target.tagName === 'BUTTON') {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }
                  
                  const wrapperProps = isClickable ? {
                    href: `/agency-profile/${sponsorSlug}`,
                    onClick: handleClick,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  } : {}
                  
                  return (
                  <CardWrapper
                    key={index}
                    {...(wrapperProps as any)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`group relative bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 transition-all duration-300 overflow-hidden h-full flex flex-col ${
                      tier.tier === 'Standard Sponsors' || tier.tier === 'Premium Sponsors'
                        ? 'shadow-md hover:shadow-lg hover:border-primary-200'
                        : 'shadow-md hover:shadow-lg hover:border-primary-200'
                    } ${isClickable ? 'cursor-pointer' : ''}`}
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
                                className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
                                  sponsor.name === 'SambaTraveler' 
                                    ? 'w-full max-w-full scale-110' 
                                    : 'max-w-[90%] max-h-28'
                                }`}
                                style={{
                                  height: sponsor.name === 'SambaTraveler' ? '120px' : 'auto',
                                  maxHeight: sponsor.name === 'SambaTraveler' ? '120px' : '112px',
                                  width: sponsor.name === 'SambaTraveler' ? 'auto' : 'auto',
                                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                                  transform: sponsor.name === 'SambaTraveler' ? 'scale(1.15)' : 'none'
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
                  </CardWrapper>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}

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
