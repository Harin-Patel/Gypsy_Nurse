'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Syringe,
  Shield,
  Sparkles,
  ArrowRight,
  GraduationCap,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useIsMobile } from '@/hooks/useIsMobile'

interface Specialty {
  id: string
  name: string
  description: string
  slug: string
  image?: string
}

// Specialty image URL mapping from The Gypsy Nurse website
// These are the actual image URLs used on The Gypsy Nurse website for each specialty
// Extracted from https://www.thegypsynurse.com/nursing-specialties/
export const SPECIALTY_IMAGE_URLS: Record<string, string> = {
  // Mapped from The Gypsy Nurse website
  'acute-care-nurse-practitioner': 'https://static.thegypsynurse.com/2021/12/345-select-specialty-hospital-canton.jpg',
  'cardiac-icu-nurse': 'https://static.thegypsynurse.com/2017/07/Heart-Stethscope-scaled.jpg',
  'cath-lab-nurse': 'https://static.thegypsynurse.com/2021/09/Braveheart-2.jpg',
  'clinical-nurse-specialist': 'https://static.thegypsynurse.com/2024/11/wilkes-university-nurses-under-stress.jpeg',
  'critical-care-nurse': 'https://static.thegypsynurse.com/2023/09/Critical-Care-Nurse-2.jpg',
  'dermatology-travel-nurse': 'https://static.thegypsynurse.com/2024/10/pexels-karolina-grabowska-4210660.jpg',
  'emergency-room-travel-nurse': 'https://static.thegypsynurse.com/2020/01/1018-emergency-room-in-north-logan-ut-cache-valley-hospital-north.jpg',
  'family-nurse-practitioner': 'https://static.thegypsynurse.com/2020/04/FeaturedArticletalemedfamily-1.png',
  'forensic-nurse': 'https://static.thegypsynurse.com/2024/10/pexels-pixabay-268460.jpg',
  'flight-nurse': 'https://static.thegypsynurse.com/2023/10/specialtiespics-1-1024x598.jpg',
  'geriatric-travel-nurse': 'https://static.thegypsynurse.com/2020/08/featuredarticlesgeriatricnurse-1.png',
  'home-health-nurse': 'https://static.thegypsynurse.com/2024/04/home-care.jpg',
  'holistic-registered-nurse': 'https://static.thegypsynurse.com/2019/11/shutterstock_377270038.jpg',
  'hospice-nurse': 'https://static.thegypsynurse.com/2023/09/Home-Health-Nurse.jpg',
  'icu-nurse': 'https://static.thegypsynurse.com/2024/06/pexels-pixabay-263402.jpg',
  'infection-control-travel-nurse': 'https://static.thegypsynurse.com/2014/10/ebola-virus2-300x209.jpg',
  'infusion-nurse': 'https://static.thegypsynurse.com/2022/09/iStock-1147637116.jpeg',
  'interventional-radiology-travel-nurse': 'https://static.thegypsynurse.com/2016/08/a-nurse-with-clipboard-768x512.jpg.webp',
  'labor-and-delivery-nurse': 'https://static.thegypsynurse.com/2024/05/travel-nurse-mom.jpg',
  'neonatal-travel-nurse': 'https://static.thegypsynurse.com/2024/10/pexels-vidalbalielojrfotografia-4005611.jpg',
  'neurology-nurse': 'https://static.thegypsynurse.com/2024/12/human-brain-digital-illustration-electrical-activity-flashes-lightning-blue-background-electrical-activity-human-132829448.webp',
  'nurse-anesthetist': 'https://static.thegypsynurse.com/2016/08/sleep-matters.jpg',
  'nurse-educator': 'https://static.thegypsynurse.com/2023/09/Nurse-Educator.png',
  'nurse-practitioner': 'https://static.thegypsynurse.com/2023/09/Nurse-Practioner.jpg',
  'nicu-nurse': 'https://static.thegypsynurse.com/2023/10/childrens-care-1.png',
  'obstetric-nursing': 'https://static.thegypsynurse.com/2017/02/shutterstock_377739718.jpg',
  'occupational-nurse': 'https://static.thegypsynurse.com/2023/09/Occupational-Nurse-Jobs.png',
  'orthopedic-nurse': 'https://static.thegypsynurse.com/2023/09/Orthopedic-Nurse.png',
  'oncology-nurse': 'https://static.thegypsynurse.com/2022/01/featuredarticleclinicalinstructor.png',
  'or-nurse': 'https://static.thegypsynurse.com/2021/12/6691-modern-medicine-grafton-to-upgrade-60yearold-hospital-with-12.jpg',
  'pain-management-nurse': 'https://static.thegypsynurse.com/2017/02/shutterstock_390289480.jpg',
  'palliative-care-nurse-practitioner': 'https://static.thegypsynurse.com/2017/12/shutterstock_254280913.jpg',
  'pediatric-nurse': 'https://static.thegypsynurse.com/2020/01/5129-ranken-jordan-pediatric-bridge-hospital-doubles-in-size-to-help-more.jpg',
  'perioperative-nurse': 'https://static.thegypsynurse.com/2017/10/shutterstock_649722556.jpg',
  'physical-therapy-nurse': 'https://static.thegypsynurse.com/2021/12/2886-integris-jim-thorpe-center-for-rehabilitation-and-physical-therapy.jpg',
  'picu-nurse': 'https://static.thegypsynurse.com/2020/03/FeaturedArticletravelwithtoddler.png',
  'plastic-surgery-nurse': 'https://static.thegypsynurse.com/2021/12/6691-modern-medicine-grafton-to-upgrade-60yearold-hospital-with-12.jpg',
  'psychiatric-nurse': 'https://static.thegypsynurse.com/2023/09/psychiatric.webp',
  'postpartum-nurse': 'https://static.thegypsynurse.com/2019/11/FeaturedArticleFAFChildcare.png',
  'public-health-nurse': 'https://static.thegypsynurse.com/2021/03/featuredarticlewellnesswarriors.png',
  'rehab-travel-nurse': 'https://static.thegypsynurse.com/2020/01/5203-rehabilitation-hospital-of-rhode-island-hospitals-116-eddie.jpg',
  'school-nurse': 'https://static.thegypsynurse.com/2023/09/School-Nurse.png',
  'surgical-nurse': 'https://static.thegypsynurse.com/2017/02/shutterstock_390289480.jpg',
  'telemetry-nurse': 'https://static.thegypsynurse.com/2021/12/1605-the-first-robotic-doctor-announced-by-cornerstone-hospital-medical.jpg',
  'trauma-nurse': 'https://static.thegypsynurse.com/2017/12/shutterstock_168812303.jpg',
  'transplant-nurse': 'https://static.thegypsynurse.com/2017/12/shutterstock_168812303.jpg',
  'travel-dialysis-nurse': 'https://static.thegypsynurse.com/2019/01/FeaturedArticle-Explorn_emcheng.png',
  'travel-nursing': 'https://static.thegypsynurse.com/2020/10/fastaff-nurse.jpg',
  'travel-research-nurse': 'https://static.thegypsynurse.com/2024/10/travel-nursing-agencies-45.png',
  'ultrasound-nurse': 'https://static.thegypsynurse.com/2017/10/shutterstock_384576880.jpg',
  'wound-care-nurse': 'https://static.thegypsynurse.com/2024/01/group-doctors-cooperating-while-analyzing-xray-medical-clinic-1.jpg',
  'x-ray-nurse': 'https://static.thegypsynurse.com/2024/01/group-doctors-cooperating-while-analyzing-xray-medical-clinic-1.jpg',
  // Default fallback image (used for specialties without specific mappings)
  default: 'https://static.thegypsynurse.com/2021/12/345-select-specialty-hospital-canton.jpg',
}

// Get specialty image URL from The Gypsy Nurse website
const getSpecialtyImageUrl = (slug: string, name: string): string => {
  // Return specialty-specific URL if available, otherwise use default
  return SPECIALTY_IMAGE_URLS[slug] || SPECIALTY_IMAGE_URLS.default
}

export const specialties: Specialty[] = [
  {
    id: 'acute-care-nurse-practitioner',
    name: 'Acute Care Nurse Practitioner',
    description: 'An Acute Care Travel Nurse Practitioner is a specialized advanced practice nurse…',
    slug: 'acute-care-nurse-practitioner'
  },
  {
    id: 'cardiac-icu-nurse',
    name: 'Cardiac ICU Nurse',
    description: 'A Cardiac ICU Nurse is a specialized nurse who focuses on caring for patients with…',
    slug: 'cardiac-icu-nurse'
  },
  {
    id: 'cath-lab-nurse',
    name: 'Cath Lab Nurse',
    description: 'Registered nurses who focus on working in cardiac catheterization labs are referred to as cath lab…',
    slug: 'cath-lab-nurse'
  },
  {
    id: 'clinical-nurse-specialist',
    name: 'Clinical Nurse Specialist',
    description: 'Clinical Nurse Specialists, known as CNSs, are key experts in their areas…',
    slug: 'clinical-nurse-specialist'
  },
  {
    id: 'critical-care-nurse',
    name: 'Critical Care Nurse',
    description: 'A critical care nurse, often recognized as one of the pillars of the medical community, specializes in providing…',
    slug: 'critical-care-nurse'
  },
  {
    id: 'dermatology-travel-nurse',
    name: 'Dermatology Travel Nurse',
    description: 'A dermatology travel nurse is a registered nurse focused on skin care…',
    slug: 'dermatology-travel-nurse'
  },
  {
    id: 'emergency-room-travel-nurse',
    name: 'Emergency Room Travel Nurse',
    description: 'Are you a travel nurse in the emergency room? If yes, you should look for new jobs…',
    slug: 'emergency-room-travel-nurse'
  },
  {
    id: 'family-nurse-practitioner',
    name: 'Family Nurse Practitioner',
    description: 'Family nurse practitioners play a crucial role in providing primary care and important healthcare services…',
    slug: 'family-nurse-practitioner'
  },
  {
    id: 'forensic-nurse',
    name: 'Forensic Nurse',
    description: 'Travel forensic nursing is an important and special field in healthcare…',
    slug: 'forensic-nurse'
  },
  {
    id: 'flight-nurse',
    name: 'Flight Nurse',
    description: 'A flight nurse is a specialized healthcare professional trained to provide acute care to patients during…',
    slug: 'flight-nurse'
  },
  {
    id: 'geriatric-travel-nurse',
    name: 'Geriatric Travel Nurse',
    description: 'Geriatric travel nursing is a great opportunity to help seniors and offers a flexible and rewarding career…',
    slug: 'geriatric-travel-nurse'
  },
  {
    id: 'home-health-nurse',
    name: 'Home Health Nurse',
    description: 'Home health care is important in the healthcare system. It helps patients get good care at home…',
    slug: 'home-health-nurse'
  },
  {
    id: 'holistic-registered-nurse',
    name: 'Holistic Registered Nurse',
    description: 'In today\'s healthcare world, holistic nursing is a caring and effective way to help patients…',
    slug: 'holistic-registered-nurse'
  },
  {
    id: 'hospice-nurse',
    name: 'Hospice Nurse',
    description: 'A hospice nurse specializes in caring for patients in the final stages of terminal illnesses, ensuring they live their…',
    slug: 'hospice-nurse'
  },
  {
    id: 'icu-nurse',
    name: 'ICU Nurse',
    description: 'Best ICU Travel Nurse Jobs: Salary, Benefits, FAQs…',
    slug: 'icu-nurse'
  },
  {
    id: 'infection-control-travel-nurse',
    name: 'Infection Control Travel Nurse',
    description: 'Travel nurses specializing in infection control play a vital role in maintaining public health…',
    slug: 'infection-control-travel-nurse'
  },
  {
    id: 'infusion-nurse',
    name: 'Infusion Nurse',
    description: 'An infusion nurse is a medical professional who provides patients with intravenous…',
    slug: 'infusion-nurse'
  },
  {
    id: 'interventional-radiology-travel-nurse',
    name: 'Interventional Radiology Travel Nurse',
    description: 'Nurses who focus on dermatology interventional radiology help provide essential care…',
    slug: 'interventional-radiology-travel-nurse'
  },
  {
    id: 'labor-and-delivery-nurse',
    name: 'Labor and Delivery Nurse',
    description: 'Labor and delivery nurses not only care for patients but also educate new mothers…',
    slug: 'labor-and-delivery-nurse'
  },
  {
    id: 'neonatal-travel-nurse',
    name: 'Neonatal Travel Nurse',
    description: 'A neonatal travel nurse is an RN who takes care of newborns…',
    slug: 'neonatal-travel-nurse'
  },
  {
    id: 'neurology-nurse',
    name: 'Neurology Nurse',
    description: 'The field of neurology is a great option for nurse practitioners. If you…',
    slug: 'neurology-nurse'
  },
  {
    id: 'nurse-anesthetist',
    name: 'Nurse Anesthetist',
    description: 'Lucrative Travel Nurse Anesthetist Job Openings Unveiled…',
    slug: 'nurse-anesthetist'
  },
  {
    id: 'nurse-educator',
    name: 'Nurse Educator',
    description: 'At the crossroads of clinical expertise and passion for teaching lies the role of a nurse educator….',
    slug: 'nurse-educator'
  },
  {
    id: 'nurse-practitioner',
    name: 'Nurse Practitioner',
    description: 'A nurse practitioner (NP) represents a higher echelon in the nursing profession…',
    slug: 'nurse-practitioner'
  },
  {
    id: 'nicu-nurse',
    name: 'NICU Nurse',
    description: 'Explore Exciting NICU Travel Nurse Opportunities…',
    slug: 'nicu-nurse'
  },
  {
    id: 'obstetric-nursing',
    name: 'Obstetric Nursing',
    description: 'If you like women\'s health, you might want to become an obstetric nurse or OB nurse…',
    slug: 'obstetric-nursing'
  },
  {
    id: 'occupational-nurse',
    name: 'Occupational Nurse',
    description: 'Occupational health nursing is a specialized field within nursing that focuses on the promotion and…',
    slug: 'occupational-nurse'
  },
  {
    id: 'orthopedic-nurse',
    name: 'Orthopedic Nurse',
    description: 'Orthopedic nursing is a specialized branch of nursing focused on the treatment and care…',
    slug: 'orthopedic-nurse'
  },
  {
    id: 'oncology-nurse',
    name: 'Oncology Nurse',
    description: 'An oncology nurse is a licensed nurse who has received specialized training in cancer care…',
    slug: 'oncology-nurse'
  },
  {
    id: 'or-nurse',
    name: 'OR Nurse',
    description: 'OR Travel Nurse Jobs: Roles & Responsibilities…',
    slug: 'or-nurse'
  },
  {
    id: 'pain-management-nurse',
    name: 'Pain Management Nurse',
    description: 'Navigating pain management nursing is a key journey. This field supports…',
    slug: 'pain-management-nurse'
  },
  {
    id: 'palliative-care-nurse-practitioner',
    name: 'Palliative Care Nurse Practitioner',
    description: 'Palliative nursing care is a key area that focuses on improving the quality of life for people with serious illnesses…',
    slug: 'palliative-care-nurse-practitioner'
  },
  {
    id: 'pediatric-nurse',
    name: 'Pediatric Nurse',
    description: 'A pediatric nurse specializes in the medical care of newborns, children, and adolescents…',
    slug: 'pediatric-nurse'
  },
  {
    id: 'perioperative-nurse',
    name: 'Perioperative Nurse',
    description: 'Find Your Dream Role: Top Perioperative Nurse Jobs…',
    slug: 'perioperative-nurse'
  },
  {
    id: 'physical-therapy-nurse',
    name: 'Physical Therapy Nurse',
    description: 'Physical Therapy Travel Jobs: Exciting Opportunities Await…',
    slug: 'physical-therapy-nurse'
  },
  {
    id: 'picu-nurse',
    name: 'PICU Nurse',
    description: 'Explore PICU Travel Nurse Jobs & Salaries…',
    slug: 'picu-nurse'
  },
  {
    id: 'plastic-surgery-nurse',
    name: 'Plastic Surgery Nurse',
    description: 'This guide will help you understand what a plastic surgery nurse does…',
    slug: 'plastic-surgery-nurse'
  },
  {
    id: 'psychiatric-nurse',
    name: 'Psychiatric Nurse',
    description: 'A psychiatric nurse, rooted in the realm of mental health, specializes in caring for patients…',
    slug: 'psychiatric-nurse'
  },
  {
    id: 'postpartum-nurse',
    name: 'Postpartum Nurse',
    description: 'Postpartum nurses are essential in helping new mothers and their infants after giving birth…',
    slug: 'postpartum-nurse'
  },
  {
    id: 'public-health-nurse',
    name: 'Public Health Nurse',
    description: 'Travel public health nursing combines traditional nursing with public health…',
    slug: 'public-health-nurse'
  },
  {
    id: 'rehab-travel-nurse',
    name: 'Rehab Travel Nurse',
    description: 'The field of healthcare offers numerous opportunities for registered nurses seeking an exciting and fulfilling career…',
    slug: 'rehab-travel-nurse'
  },
  {
    id: 'school-nurse',
    name: 'School Nurse',
    description: 'Occupational health nursing is a specialized field within nursing that focuses on the promotion and…',
    slug: 'school-nurse'
  },
  {
    id: 'surgical-nurse',
    name: 'Surgical Nurse',
    description: 'A surgical nurse, also known as an operating room nurse, is a registered nurse who specializes…',
    slug: 'surgical-nurse'
  },
  {
    id: 'telemetry-nurse',
    name: 'Telemetry Nurse',
    description: 'Telemetry nurses use advanced medical technology to monitor patients\' vital signs…',
    slug: 'telemetry-nurse'
  },
  {
    id: 'trauma-nurse',
    name: 'Trauma Nurse',
    description: 'Top Trauma Nurse Jobs: High-Paying Opportunities Await…',
    slug: 'trauma-nurse'
  },
  {
    id: 'transplant-nurse',
    name: 'Transplant Nurse',
    description: 'A transplant nurse is very important in the transplant team. They help…',
    slug: 'transplant-nurse'
  },
  {
    id: 'travel-dialysis-nurse',
    name: 'Travel Dialysis Nurse',
    description: 'A registered nurse with expertise in administering dialysis to patients suffering from…',
    slug: 'travel-dialysis-nurse'
  },
  {
    id: 'travel-nursing',
    name: 'Travel Nursing',
    description: 'Discover the Best Travel Jobs for Your Career…',
    slug: 'travel-nursing'
  },
  {
    id: 'travel-research-nurse',
    name: 'Travel Research Nurse',
    description: 'A career as a travel research nurse means being a specialized registered nurse…',
    slug: 'travel-research-nurse'
  },
  {
    id: 'ultrasound-nurse',
    name: 'Ultrasound Nurse',
    description: 'See the World While You Make a Difference: Explore Ultrasound Travel Jobs…',
    slug: 'ultrasound-nurse'
  },
  {
    id: 'wound-care-nurse',
    name: 'Wound Care Nurse',
    description: 'A wound care nurse is an expert in managing and treating a variety of wounds…',
    slug: 'wound-care-nurse'
  },
  {
    id: 'x-ray-nurse',
    name: 'X-Ray Nurse',
    description: 'Highly Paid Travel Positions in X-ray and Radiology…',
    slug: 'x-ray-nurse'
  }
]

export default function NursingSpecialtiesPage() {
  const isMobile = useIsMobile()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    specialty.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <Link href="/" className="group">
              <span className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors relative">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/jobs" className="group">
              <span className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors relative">
                Jobs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50/80 backdrop-blur-md border border-primary-200/60 rounded-full">
              <Stethoscope className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                Nursing Specialties
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          >
            Explore Nursing Specialties
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 mb-6"
          >
            With the nursing field constantly evolving, there are various paths you can take as a nurse, from a Nurse Practitioner to a Flight Nurse. The demand for nurses is continually growing, and the nursing career path offers many worthwhile benefits such as salary, rewarding opportunities, and the sense of fulfillment that comes from impacting someone's life.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-white rounded-xl shadow-md border border-gray-200 p-2 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-purple-50/30 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex-1 flex items-center gap-3 px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nursing specialties..."
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <main className="pb-16">

        {/* Specialties Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {filteredSpecialties.length} {filteredSpecialties.length === 1 ? 'Specialty' : 'Specialties'} Found
              </h2>
              <p className="text-gray-600">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Browse all available nursing specialties'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecialties.map((specialty, index) => (
                <motion.div
                  key={specialty.id}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.2 }}
                  whileHover={isMobile ? undefined : { y: -4, scale: 1.02 }}
                  className="group h-full"
                >
                  <Link href={`/nursing-specialties/${specialty.slug}`} className="block h-full">
                    <div className="bg-white rounded-2xl border-2 border-gray-200 h-full flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden relative">
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                        <Image
                          src={getSpecialtyImageUrl(specialty.slug, specialty.name)}
                          alt={specialty.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                          onError={(e) => {
                            // If image fails to load, use fallback
                            const target = e.currentTarget as HTMLImageElement
                            target.src = SPECIALTY_IMAGE_URLS.default
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                          {specialty.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                          {specialty.description}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center text-primary-600 font-semibold text-sm mt-auto pt-2 group-hover:gap-2 transition-all">
                          <span>Read more</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredSpecialties.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No specialties found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary-600 font-semibold hover:text-primary-700"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

