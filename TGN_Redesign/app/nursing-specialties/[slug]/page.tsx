'use client'

import { use, useState, useEffect, useRef } from 'react'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronRight,
  ChevronLeft,
  Briefcase,
  GraduationCap,
  DollarSign,
  CheckCircle,
  ArrowRight,
  BookOpen,
  MapPin,
  Clock,
  Building2,
  DollarSign as DollarIcon,
  Heart,
  Users,
  Sparkles,
  Award,
  TrendingUp,
  Search,
  X,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  AlertCircle,
  Star,
  Calendar,
  Sun
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useAuth } from '@/contexts/AuthContext'
import {
  getLikedJobs,
  getDislikedJobs,
  getBookmarkedJobs,
  getPendingJobs,
  addLikedJob,
  removeLikedJob,
  addDislikedJob,
  removeDislikedJob,
  addBookmarkedJob,
  removeBookmarkedJob
} from '@/utils/jobStorage'
import { SPECIALTY_IMAGE_URLS, specialties } from '../page'
import { SAMPLE_JOBS, Job } from '@/app/jobs/page'
import { getFacilityImageWithFallback } from '@/utils/stateImages'
import { formatShiftHoursForMobile } from '@/utils/jobData'

// Format date with year
const formatDateWithYear = (date: string | undefined): string => {
  if (!date) return ''
  if (/\d{4}/.test(date)) {
    return date
  }
  const currentYear = new Date().getFullYear()
  return `${date}, ${currentYear}`
}

interface SpecialtyDetail {
  slug: string
  name: string
  title: string
  subtitle: string
  description: string
  overview: string
  rolesAndResponsibilities: {
    title: string
    content: string[]
  }
  careerOpportunities: {
    title: string
    content: string[]
  }
  benefits: {
    title: string
    content: string[]
  }
  challenges: {
    title: string
    content: string[]
  }
  educationAndTraining: {
    title: string
    requirements: string[]
    steps: string[]
  }
  salary: {
    title: string
    content: string[]
  }
  faqs: {
    question: string
    answer: string
  }[]
}

// Specialty details data - based on The Gypsy Nurse website structure
const SPECIALTY_DETAILS: Record<string, SpecialtyDetail> = {
  'acute-care-nurse-practitioner': {
    slug: 'acute-care-nurse-practitioner',
    name: 'Acute Care Nurse Practitioner',
    title: 'What is an Acute Care Nurse Practitioner?',
    subtitle: 'What is an Acute Care Nurse Practitioner?',
    description: 'An Acute Care Travel Nurse Practitioner is a specialized advanced practice nurse who provides comprehensive care to patients with acute illnesses. They assess, diagnose, and manage treatment plans for acutely ill individuals in various healthcare settings.',
    overview: 'An Acute Care Travel Nurse Practitioner is a specialized advanced practice nurse who provides comprehensive care to patients with acute illnesses. They assess, diagnose, and manage treatment plans for acutely ill individuals in various healthcare settings. These professionals excel in managing complex patient cases, collaborating with physicians and healthcare teams, and providing advanced care in urgent settings. They conduct thorough assessments, administer treatments, and monitor outcomes closely, ensuring optimal patient well-being.',
    rolesAndResponsibilities: {
      title: 'Roles & Responsibilities of an Acute Care Nurse Practitioner',
      content: [
        'Acute Care Travel Nurse Practitioners excel in managing complex patient cases, collaborating with physicians and healthcare teams, and providing advanced care in urgent settings.',
        'They conduct thorough assessments, administer treatments, and monitor outcomes closely, ensuring optimal patient well-being.',
        'Their responsibilities include ordering diagnostic tests, developing care plans, and offering education to patients and families.',
        'Acute Care Travel Nurse Practitioners play a pivotal role in delivering high-quality and efficient care, often in critical or intensive care environments.'
      ]
    },
    careerOpportunities: {
      title: 'Career Opportunities for Acute Care Nurse Practitioner',
      content: [
        'Acute Care Nurse Practitioners have a plethora of career opportunities in various healthcare settings. They can work in critical care units, emergency departments, or specialty clinics, providing advanced patient care.',
        'Acute Care NPs also have the flexibility to pursue roles in education, research, or leadership positions within healthcare organizations.',
        'With the increasing demand for healthcare professionals, the job outlook for Acute Care Nurse Practitioners remains promising, offering diverse avenues for professional growth and development.'
      ]
    },
    benefits: {
      title: 'Benefits of Being an Acute Care Nurse Practitioner',
      content: [
        'Competitive salaries reflecting advanced practice roles in critical care',
        'Opportunity to work in diverse healthcare settings including critical care units, emergency departments, and specialty clinics',
        'Flexibility to pursue roles in education, research, or leadership positions',
        'Promising job outlook with increasing demand for healthcare professionals',
        'Diverse avenues for professional growth and development'
      ]
    },
    challenges: {
      title: 'Challenges & Considerations in Acute Care Practitioner Nursing',
      content: [
        'Navigating the realm of acute care travel nurse practitioner nursing presents a myriad of challenges and considerations.',
        'From managing high-stress critical care scenarios to staying abreast of the latest clinical knowledge and treatment modalities, the role demands continuous learning.',
        'Balancing the complex needs of patients with acute and chronic conditions while collaborating with interdisciplinary teams can be demanding.',
        'Additionally, ensuring optimal health outcomes and patient satisfaction amidst the evolving landscape of healthcare adds another layer of complexity.',
        'Staying resilient and adaptable is key to meeting the diverse demands of this dynamic field.'
      ]
    },
    educationAndTraining: {
      title: 'Education & Training Requirements',
      requirements: [
        'Bachelor\'s Degree in Nursing (BSN)',
        'Master of Science in Nursing (MSN) with a specialization in acute care',
        'Doctor of Nursing Practice (DNP) degree for further advancement (optional)',
        'Clinical experience in acute care settings',
        'Certification from the American Nurses Credentialing Center (ANCC) or other relevant bodies'
      ],
      steps: [
        'Obtain a Bachelor\'s Degree in Nursing (BSN)',
        'Complete a Master of Science in Nursing (MSN) with a specialization in acute care',
        'Gain clinical experience in acute care settings to prepare for treating acute and chronic health conditions',
        'Obtain certification from the American Nurses Credentialing Center (ANCC) or other relevant bodies',
        'Consider pursuing a Doctor of Nursing Practice (DNP) degree for further advancement',
        'Apply for Acute Care Nurse Practitioner positions in various healthcare settings'
      ]
    },
    salary: {
      title: 'Acute Care Nurse Practitioner Salary',
      content: [
        'Acute Care Travel Nurse Practitioners earn competitive salaries, reflecting their advanced practice roles in critical care.',
        'In the United States, an Acute Care Travel Nurse Practitioner can expect a base salary that aligns with their specialized skills and scope of care provided.',
        'With additional certifications and clinical experience, these professionals may further enhance their earning potential.',
        'Factors such as location, specific field of practice (like cardiology or oncology), and level of education can influence their overall compensation package.'
      ]
    },
    faqs: [
      {
        question: 'What is an acute care nurse practitioner?',
        answer: 'An Acute Care Travel Nurse Practitioner specializes in managing patients with acute or chronic illnesses, offering advanced care in various healthcare settings. They assess, diagnose, and provide treatment plans for individuals requiring immediate medical attention.'
      },
      {
        question: 'What is the difference between acute care NP and primary care NP?',
        answer: 'Acute care travel NPs focus on treating acute illnesses in various settings like hospitals, while primary care NPs provide preventive and routine care in outpatient settings. The key difference lies in the scope and setting of patient care they specialize in.'
      },
      {
        question: 'Can acute care NP intubate?',
        answer: 'Acute Care Nurse Practitioners (NPs) can intubate patients as part of their scope of practice. This critical skill allows them to manage airways in emergencies, ensuring patient safety and stabilization. Intubation proficiency is a valuable asset that enhances the capabilities of Acute Care NPs, including acute care travel nurse practitioners.'
      },
      {
        question: 'How do you transition from FNP to ACNP?',
        answer: 'Transitioning from FNP to ACNP involves pursuing a post-master\'s certificate or a specialized ACNP program. Enhance skills in acute care management through clinical experience and additional training. Obtain certification as an ACNP to practice in the acute care setting as an acute care travel nurse practitioner.'
      }
    ]
  },
  'interventional-radiology-travel-nurse': {
    slug: 'interventional-radiology-travel-nurse',
    name: 'Interventional Radiology Travel Nurse',
    title: 'Top-Paying Interventional Radiology Travel Nurse Jobs',
    subtitle: 'What is an Interventional Radiology Travel Nurse?',
    description: 'Travel nursing provides many great job options. Interventional radiology offers some of the highest pay. This area allows travel nurses to experience difficult critical care work while working in different locations. Nurses who focus on dermatology interventional radiology help provide essential care for patients needing specific skin treatment procedures.',
    overview: 'These nurses collaborate with doctors on several tasks. They assist with biopsies, remove tumors, and treat blood vessel issues. Their main goal is to keep patients safe. They monitor vital signs, give medications, and maintain cleanliness during key procedures. Their skills in interventional radiology make them an important part of the healthcare team. They really help patients feel better and recover well. Travel nurses in interventional radiology have very important jobs. They guide patients on what to do after procedures and inform them about possible side effects. These nurses have many skills. Their caring attitude helps patients feel better during treatment. This often leads to quicker recovery and more happy feelings about their care. By mixing their strong skills with warm support, these travel nurses help patients heal much better.',
    rolesAndResponsibilities: {
      title: 'Roles & Responsibilities of an Interventional Radiology Travel Nurse',
      content: [
        'Interventional Radiology travel nurses play a crucial role during procedures like angioplasties and biopsies. They are responsible for ensuring patient safety and delivering excellent care.',
        'These nurses work closely with radiologists and other healthcare professionals while utilizing advanced imaging techniques to diagnose and treat patients effectively.',
        'Following procedures, Interventional Radiology travel nurses have important responsibilities. They must closely monitor patients and guide post-treatment care.',
        'Strong critical thinking skills are essential for these nurses, as they often encounter complex medical situations that require quick decision-making.',
        'Staying abreast of the latest trends in interventional radiology is vital for healthcare professionals. They must continually update their knowledge of new technologies and methods.'
      ]
    },
    careerOpportunities: {
      title: 'Career Opportunities for Interventional Radiology Travel Nurse',
      content: [
        'Interventional Radiology travel nurses have many job choices in the United States. Many healthcare facilities, from big hospitals to small clinics, need skilled nurses.',
        'Travel nurse jobs typically last about 13 weeks, but they can sometimes last longer. This allows nurses to balance their work with their career goals and personal lives.',
        'One main reason people like to travel nursing is the chance to work in various healthcare settings. Nurses can learn in different places and use the newest medical technology.',
        'Travel nurses in interventional radiology are very important. They give special care and support for new medical methods. Their work involves joining different teams, helping with complex radiology procedures, and providing high-quality care to patients in various healthcare locations.',
        'Travel nursing offers great pay. It also helps with housing and provides money for travel. You can get training and learn new skills too. This can help your career grow and give you useful experience in clinical work.'
      ]
    },
    benefits: {
      title: 'Benefits of Being an Interventional Radiology Travel Nurse',
      content: [
        'Starting a career as a travel nurse in interventional radiology is special and rewarding. It offers many chances to grow in your work and your personal life.',
        'You can explore new places and learn about different cultures. This job pays well and lets you pick assignments that fit your interests and lifestyle.',
        'One big plus of being a travel nurse in interventional radiology is the practice you get at different healthcare facilities in the United States. This practice helps you improve your clinical skills.',
        'You will learn about various healthcare systems and how to care for patients in the best way. These experiences can increase your skills and knowledge.',
        'Travel nursing allows you to learn and enhance your skills. While you are traveling, you can complete education units. These units cover the most recent updates in interventional radiology.'
      ]
    },
    challenges: {
      title: 'Challenges & Considerations Interventional Radiology Travel Nurse',
      content: [
        'Being a travel nurse in interventional radiology has its good sides and some tough spots, too. A travel nurse takes care of very sick patients who need complex treatments.',
        'This job requires nurses to have strong skills and be flexible. A travel nurse should be ready to adapt to new places and rules.',
        'Travel assignments for nurses can change a lot, which means they need to be flexible and open to new experiences.',
        'It can be hard to connect with new coworkers while also providing good care to patients, but these challenges usually feel minor next to the benefits.',
        'Working as an interventional radiology travel nurse can offer both personal happiness and job satisfaction.'
      ]
    },
    educationAndTraining: {
      title: 'Education and Training Interventional Radiology Travel Nurse',
      requirements: [
        'Bachelor of Science in Nursing (BSN) from a good school',
        'Active Registered Nurse (RN) license',
        'Certified Radiology Nurse (CRN) credential (preferred but not always required)',
        'Experience in critical care or a related field',
        'BLS and ACLS certifications'
      ],
      steps: [
        'Earn a BSN degree and get your RN license',
        'Pass the National Council Licensure Examination (NCLEX-RN)',
        'Obtain BLS and ACLS certifications',
        'Work for 1-2 years in critical care or interventional radiology',
        'Consider obtaining CRN certification',
        'Contact a reliable travel nursing agency'
      ]
    },
    salary: {
      title: 'Salary of Interventional Radiology Travel Nurse',
      content: [
        'Interventional radiology is a unique area in nursing. It pays well for travel nurses. The pay can be different based on several factors.',
        'These include where you work, your experience, any certifications you have, and your employer.',
        'AMN Healthcare states that interventional radiology is one of the highest-paying jobs for travel nurses. This makes it a fantastic option for nurses who want to earn more money.',
        'To make sure you earn a fair amount for your skills, you should compare pay from different agencies and healthcare facilities.',
        'By looking at several options, you can negotiate better contracts and increase your earnings.'
      ]
    },
    faqs: [
      {
        question: 'What makes interventional radiology nursing unique?',
        answer: 'Interventional radiology is unique. It mixes diagnostic imaging with smaller and simpler procedures, setting it apart from regular radiology. In interventional radiology, doctors use images to help them when they perform tasks, which means patients can have treatments that are easier on their bodies.'
      },
      {
        question: 'How do I get started in interventional radiology travel nursing?',
        answer: 'To start your career in travel interventional radiology, you first need to get your RN license. You can achieve this by passing the National Council Licensure Examination (NCLEX-RN). After that, it\'s good to work for 1 to 2 years in critical care or interventional radiology. Once you have this experience, contact a reliable travel nursing agency.'
      },
      {
        question: 'What are the requirements for becoming an interventional radiology travel nurse?',
        answer: 'To get this job, you need to have a valid RN license. It would be best if you also had BLS and ACLS certifications. Most employers prefer candidates with a BSN degree. Additional certifications, like the CRN, can be very helpful. Having experience in interventional radiology or critical care will also benefit you greatly.'
      }
    ]
  }
}

// Full descriptions from The Gypsy Nurse website for each specialty
const FULL_DESCRIPTIONS: Record<string, string> = {
  'cardiac-icu-nurse': 'A Cardiac ICU Nurse is a specialized nurse who focuses on caring for patients with heart conditions in the Intensive Care Unit (ICU). Cardiac ICU Travel Nurse positions offer competitive pay and require nurses to monitor vital signs, administer medications, and work closely with healthcare teams to ensure the best outcomes for cardiac patients.',
  'cath-lab-nurse': 'Registered nurses who focus on working in cardiac catheterization labs are referred to as cath lab nurses or cath lab RNs. This specialized team is in charge of using minimally invasive methods to diagnose and treat cardiovascular diseases. Cath lab nurses collaborate closely with physicians and other medical specialists to offer patients receiving valvuloplasties, angioplasties, and cardiac catheterizations the best possible care.',
  'clinical-nurse-specialist': 'Clinical Nurse Specialists, known as CNSs, are key experts in their areas of specialization. They provide advanced nursing care, serve as consultants to healthcare teams, and often take on leadership roles in improving patient outcomes and healthcare systems.',
  'critical-care-nurse': 'A critical care nurse, often recognized as one of the pillars of the medical community, specializes in providing care to patients who are in life-threatening conditions. These professionals are stationed in high-stress environments like intensive care units (ICUs), trauma centers, and emergency rooms. With an emphasis on critical care nursing, they offer treatments and interventions for patients who suffer from a myriad of severe medical conditions. Their advanced knowledge and specialized training make them adept at dealing with complex and urgent cases.',
  'dermatology-travel-nurse': 'A dermatology travel nurse is a registered nurse focused on skin care. These nurses aid patients with skin issues and travel to different areas to care for many people. They are important in dermatology clinics, hospitals, and health centers that need extra support. Unlike regular nurses who work in one place, dermatology travel nurses take short-term jobs in several locations. This lets them experience new work setups and build different skills.',
  'emergency-room-travel-nurse': 'Are you a travel nurse in the emergency room? If yes, you should look for new jobs and exciting experiences in healthcare. Travel nursing allows skilled Registered Nurses to work in new cities and at top hospitals. You can make good money while you do this. It\'s a great way to take control of your nursing career. You will also learn about healthcare practices in different areas.',
  'family-nurse-practitioner': 'The healthcare field is changing a lot. We need skilled and caring workers more than ever. Family nurse practitioners play a crucial role in providing primary care and important healthcare services. They focus on the patient and meet many needs of patients of all ages. This makes being a family nurse practitioner both rewarding and a great way to earn money.',
  'forensic-nurse': 'Travel forensic nursing is an important and special field in healthcare. It combines caring for patients with the challenging aspects of the legal system. This guide will take you into the world of travel forensic nursing. We will look at its details, the difficulties it brings, and the benefits it offers.',
  'flight-nurse': 'A flight nurse is a specialized healthcare professional trained to provide acute care to patients during aircraft transportation, such as helicopters or airplanes.',
  'geriatric-travel-nurse': 'The healthcare industry is growing quickly. There is a big need for skilled workers, especially to care for older adults. Recruiters want kind people with good customer service skills for these important jobs. Geriatric travel nursing is a great opportunity to help seniors and offers a flexible and rewarding career.',
  'home-health-nurse': 'Are you a travel nurse who loves adventure? You might want to try home health travel! Fusion Medical Staffing can help nurses find great travel jobs all over the country. This special type of nursing lets you care for people in their homes. You can enjoy the freedom of travel nursing while making a difference in people\'s lives.',
  'holistic-registered-nurse': 'In today\'s healthcare world, holistic nursing is a caring and effective way to help patients. It is inspired by Florence Nightingale\'s ideas. Holistic nursing looks at all aspects of a person\'s health, not just physical problems. It aims to understand and treat the whole person. This approach improves patient care and makes it more personalized.',
  'hospice-nurse': 'A hospice nurse specializes in caring for patients in the final stages of terminal illnesses, ensuring they live their last days in dignity and comfort. This form of care prioritizes quality of life over curative treatments. Hospice nursing isn\'t just about alleviating physical pain; it extends to emotional, social, and spiritual support tailored to each patient\'s needs and preferences.',
  'icu-nurse': 'An ICU nurse, also known as an intensive care unit nurse, is a registered nurse (RN) who focuses on delivering critical care to patients. These highly trained healthcare personnel operate in critical care units, managing and monitoring patients with life-threatening diseases.',
  'infection-control-travel-nurse': 'Infection control is crucial in all healthcare settings, especially with the increasing prevalence of infectious diseases. Travel nurses specializing in infection control play a vital role in maintaining public health. These dedicated professionals work tirelessly to ensure the well-being of both patients and staff across various healthcare facilities.',
  'labor-and-delivery-nurse': 'A labor and delivery nurse (L&D) is a healthcare professional who specializes in caring for women during childbirth. They play an important role in the safety and well-being of both the mother and the baby. These nurses, with their special skills and commitment, are trained to assist women at all stages of labor, including prenatal, labor, and postpartum care. They aid in the birth process and assist in bringing new life into the world.',
  'infusion-nurse': 'An infusion nurse is a medical professional who provides patients with intravenous lines or injections of medications, fluids, and blood products. They are crucial to the safe and efficient administration of therapies in various healthcare settings.',
  'neonatal-travel-nurse': 'A neonatal travel nurse is an RN who takes care of newborns. They work in the neonatal intensive care unit (NICU). What makes them different from regular NICU nurses is that they travel to various healthcare facilities across the United States. They usually have short-term jobs that last from 13 to 26 weeks. These nurses offer intensive care for newborns, especially for those who are premature or have birth defects and serious health issues. To do well in this tough but rewarding job, neonatal travel nurses must have strong technical skills. They also need to be emotionally strong and able to adjust to new places.',
  'neurology-nurse': 'The field of neurology is a great option for nurse practitioners. If you want to assist people and understand how the nervous system works, this job is perfect for you. If you enjoy helping patients with difficult neurological problems, becoming a neurology NP might be the right path for you. This summary will provide helpful details about what nurse practitioners can do in the role of neurology NP in healthcare.',
  'nurse-anesthetist': 'A certified registered nurse anesthetist (CRNA), also known as a travel nurse anesthetist, is a highly qualified medical professional who specializes in anesthesia care. They collaborate closely with anesthesiologists, surgeons, and other members of the healthcare team to ensure the safety and comfort of patients before, during, and after surgical procedures. CRNAs are just one example of the many nursing specialties that can also be pursued as a travel nurse.',
  'nurse-educator': 'At the crossroads of clinical expertise and passion for teaching lies the role of a nurse educator. These professionals bridge the gap between the practical world of nursing and the academic arena. A nurse educator is tasked with training the next generation of nurses, ensuring they\'re equipped with the knowledge and skills to provide top-notch patient care.',
  'nurse-practitioner': 'A nurse practitioner (NP) represents a higher echelon in the nursing profession, providing advanced clinical care with greater autonomy. NPs can diagnose conditions, prescribe medications, order diagnostic tests, and provide comprehensive healthcare services across various specialties and settings.',
  'nicu-nurse': 'Explore Exciting NICU Travel Nurse Opportunities. NICU nurses specialize in caring for critically ill or premature newborns in the Neonatal Intensive Care Unit. These highly skilled nurses provide specialized care, monitor delicate infants, and support families during challenging times.',
  'obstetric-nursing': 'If you like women\'s health, you might want to become an obstetric nurse or OB nurse. Obstetric nurses care for women during pregnancy, labor, delivery, and postpartum. They monitor maternal and fetal health, assist during childbirth, and provide education and support throughout the pregnancy journey.',
  'occupational-nurse': 'Occupational health nursing is a specialized field within nursing that focuses on the promotion and maintenance of health in the workplace. Occupational nurses provide health screenings, manage workplace injuries, develop wellness programs, and ensure compliance with health and safety regulations.',
  'orthopedic-nurse': 'Orthopedic nursing is a specialized branch of nursing focused on the treatment and care of patients with musculoskeletal conditions. These nurses assist with joint replacements, fracture care, rehabilitation, and help patients recover from orthopedic surgeries and injuries.',
  'oncology-nurse': 'An oncology nurse is a licensed nurse who has received specialized training in cancer care. These nurses work in a variety of healthcare settings, including outpatient clinics, hospitals, and cancer treatment centers. Their primary goal is to support patients throughout their cancer journey, from diagnosis to survivorship or end-of-life care.',
  'or-nurse': 'OR Travel Nurse Jobs: Roles & Responsibilities. Operating room (OR) nurses, also known as perioperative nurses, assist surgeons during surgical procedures. They prepare operating rooms, manage surgical instruments, maintain sterile fields, and ensure patient safety throughout surgical procedures.',
  'pain-management-nurse': 'Navigating pain management nursing is a key journey. This field supports patients dealing with acute or chronic pain conditions. Pain management nurses assess pain levels, develop treatment plans, administer pain medications, and use various techniques to help patients achieve better quality of life.',
  'palliative-care-nurse-practitioner': 'Palliative nursing care is a key area that focuses on improving the quality of life for people with serious illnesses. Palliative care nurse practitioners provide comprehensive care that addresses physical, emotional, and spiritual needs, helping patients and families navigate serious illness with dignity and comfort.',
  'pediatric-nurse': 'A pediatric nurse specializes in the medical care of newborns, children, and adolescents. They collaborate closely with pediatricians to evaluate patients, dispense prescriptions, and teach families about good healthcare practices. Pediatric nurses perform an important role in safeguarding the health of young children.',
  'perioperative-nurse': 'Find Your Dream Role: Top Perioperative Nurse Jobs. Perioperative nurses work in the operating room, providing care before, during, and after surgery. They prepare patients for procedures, assist surgeons, manage surgical equipment, and ensure optimal patient outcomes throughout the surgical experience.',
  'physical-therapy-nurse': 'Physical Therapy Travel Jobs: Exciting Opportunities Await. Physical therapy nurses work alongside physical therapists to help patients recover from injuries, surgeries, or illnesses. They assist with rehabilitation exercises, monitor patient progress, and provide support during the recovery process.',
  'picu-nurse': 'Explore PICU Travel Nurse Jobs & Salaries. PICU (Pediatric Intensive Care Unit) nurses provide critical care to critically ill or injured children. These highly specialized nurses manage complex pediatric cases, work with advanced life support equipment, and provide compassionate care to young patients and their families.',
  'plastic-surgery-nurse': 'This guide will help you understand what a plastic surgery nurse does. Plastic surgery nurses assist in both reconstructive and cosmetic surgical procedures. They prepare patients, assist surgeons during procedures, manage post-operative care, and help patients achieve their aesthetic and reconstructive goals.',
  'psychiatric-nurse': 'A psychiatric nurse, rooted in the realm of mental health, specializes in caring for patients with mental health disorders. These nurses provide therapeutic interventions, administer psychiatric medications, conduct mental health assessments, and support patients on their journey to mental wellness.',
  'postpartum-nurse': 'Postpartum nurses are essential in helping new mothers and their infants after giving birth. These specialized nurses provide care during the recovery period, assist with breastfeeding, monitor maternal and infant health, and educate new parents on infant care and postpartum recovery.',
  'public-health-nurse': 'Travel public health nursing combines traditional nursing with public health. Public health nurses focus on community health, disease prevention, health education, and promoting wellness at the population level. They work in various settings including health departments, schools, and community organizations.',
  'rehab-travel-nurse': 'The field of healthcare offers numerous opportunities for registered nurses seeking an exciting and fulfilling career. Rehab travel nurses work in rehabilitation facilities, helping patients recover from injuries, strokes, surgeries, and other conditions through comprehensive rehabilitation programs.',
  'school-nurse': 'Occupational health nursing is a specialized field within nursing that focuses on the promotion and maintenance of health in the workplace. School nurses provide health services in educational settings, managing student health needs, administering medications, responding to emergencies, and promoting health education.',
  'surgical-nurse': 'A surgical nurse, also known as an operating room nurse, is a registered nurse who specializes in perioperative care. These nurses work in operating rooms, preparing patients for surgery, assisting surgeons during procedures, and ensuring patient safety throughout the surgical process.',
  'telemetry-nurse': 'Telemetry nurses use advanced medical technology to monitor patients\' vital signs. These specialized nurses work in telemetry units, continuously monitoring cardiac rhythms, blood pressure, and other vital signs to detect changes and respond quickly to patient needs.',
  'trauma-nurse': 'Top Trauma Nurse Jobs: High-Paying Opportunities Await. Trauma nurses work in emergency departments and trauma centers, providing immediate care to patients with life-threatening injuries. They are experts in rapid assessment, stabilization, and critical care for trauma patients.',
  'transplant-nurse': 'A transplant nurse is very important in the transplant team. They help patients before, during, and after organ transplantation procedures. These specialized nurses coordinate care, manage immunosuppressive medications, monitor for rejection, and support patients through the complex transplant journey.',
  'travel-dialysis-nurse': 'A registered nurse with expertise in administering dialysis to patients suffering from kidney failure. Dialysis nurses operate dialysis machines, monitor patients during treatment, manage vascular access, and provide education and support to patients with end-stage renal disease.',
  'travel-nursing': 'Discover the Best Travel Jobs for Your Career. Travel nursing offers registered nurses the opportunity to work temporary assignments in various locations across the country. Travel nurses enjoy competitive pay, housing stipends, and the flexibility to explore new places while advancing their careers.',
  'travel-research-nurse': 'A career as a travel research nurse means being a specialized registered nurse who conducts clinical research while traveling to different locations. These nurses coordinate research studies, collect data, ensure protocol compliance, and contribute to advancing medical knowledge.',
  'ultrasound-nurse': 'See the World While You Make a Difference: Explore Ultrasound Travel Jobs. Ultrasound nurses assist with diagnostic imaging procedures, preparing patients for ultrasounds, operating equipment, and working alongside sonographers and physicians to obtain diagnostic images for medical evaluation.',
  'wound-care-nurse': 'A wound care nurse is an expert in managing and treating a variety of wounds. These specialized nurses assess wounds, develop treatment plans, perform wound care procedures, and use advanced techniques to promote healing and prevent complications.',
  'x-ray-nurse': 'Highly Paid Travel Positions in X-ray and Radiology. X-ray nurses work in radiology departments, assisting with diagnostic imaging procedures. They prepare patients for X-rays and other imaging studies, ensure radiation safety, and work alongside radiologists to provide quality diagnostic care.',
}

// Get specialty detail or return default structure
const getSpecialtyDetail = (slug: string): SpecialtyDetail | null => {
  if (SPECIALTY_DETAILS[slug]) {
    // Use the exact description from the website (not overview)
    const detail = SPECIALTY_DETAILS[slug]
    return detail
  }

  // Find the specialty from the listing page to get its description
  const listingSpecialty = specialties.find(s => s.slug === slug)
  const specialtyName = listingSpecialty?.name || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  // Use full description from mapping if available, otherwise use listing description
  let specialtyDescription = FULL_DESCRIPTIONS[slug] || listingSpecialty?.description || 'Travel nursing provides many great job options in this specialty area.'
  
  // If description ends with "…" and we don't have a full description, expand it
  if (specialtyDescription.endsWith('…') && !FULL_DESCRIPTIONS[slug]) {
    const baseDescription = specialtyDescription.replace('…', '').trim()
    specialtyDescription = `${baseDescription} This specialty offers unique opportunities for travel nurses to work in various healthcare settings across the United States. Travel nurses in this field provide specialized care, gain valuable clinical experience, and have the flexibility to explore new locations while advancing their careers. The demand for skilled professionals in this area continues to grow, making it an excellent choice for those seeking rewarding travel nursing opportunities with competitive compensation and diverse work environments.`
  }

  // Return a default structure for specialties without specific details
  return {
    slug,
    name: specialtyName,
    title: `${specialtyName} Jobs`,
    subtitle: `What is a ${specialtyName}?`,
    description: specialtyDescription,
    overview: specialtyDescription,
    rolesAndResponsibilities: {
      title: 'Roles & Responsibilities',
      content: [
        'Provide specialized nursing care in this field',
        'Work closely with healthcare professionals',
        'Ensure patient safety and deliver excellent care',
        'Monitor patients and guide post-treatment care'
      ]
    },
    careerOpportunities: {
      title: 'Career Opportunities',
      content: [
        'Many job choices available across the United States',
        'Travel assignments typically last 13 weeks or longer',
        'Opportunity to work in various healthcare settings',
        'Access to the newest medical technology'
      ]
    },
    benefits: {
      title: 'Benefits',
      content: [
        'Competitive pay and benefits',
        'Housing assistance and travel stipends',
        'Opportunity to explore new places',
        'Professional growth and skill development'
      ]
    },
    challenges: {
      title: 'Challenges & Considerations',
      content: [
        'Requires flexibility and adaptability',
        'Need to adapt to new places and rules',
        'Building relationships with new teams',
        'Managing work-life balance while traveling'
      ]
    },
    educationAndTraining: {
      title: 'Education and Training',
      requirements: [
        'Bachelor of Science in Nursing (BSN)',
        'Active Registered Nurse (RN) license',
        'Relevant certifications',
        'Experience in the specialty area'
      ],
      steps: [
        'Earn a BSN degree and get your RN license',
        'Obtain required certifications',
        'Gain experience in the specialty',
        'Contact a reliable travel nursing agency'
      ]
    },
    salary: {
      title: 'Salary Information',
      content: [
        'Salary varies based on location, experience, and certifications',
        'Travel nursing typically offers competitive compensation',
        'Compare offers from different agencies',
        'Negotiate contracts to maximize earnings'
      ]
    },
    faqs: [
      {
        question: 'What are the requirements for this specialty?',
        answer: 'Requirements typically include an RN license, relevant certifications, and experience in the specialty area.'
      },
      {
        question: 'How do I get started?',
        answer: 'Start by obtaining your RN license, gaining experience in the specialty, and then contacting a travel nursing agency.'
      }
    ]
  }
}

function SpecialtyDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params)
  const slug = unwrappedParams?.slug || ''
  const specialty = getSpecialtyDetail(slug)
  const router = useRouter()
  const isMobile = useIsMobile()
  const { isAuthenticated } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [likedJobs, setLikedJobs] = useState<string[]>([])
  const [dislikedJobs, setDislikedJobs] = useState<string[]>([])
  const [pendingJobs, setPendingJobs] = useState<string[]>([])
  const mobileHeaderRef = useRef<HTMLDivElement>(null)
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(80)

  // Load job status from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedJobs(getBookmarkedJobs())
      setLikedJobs(getLikedJobs())
      setDislikedJobs(getDislikedJobs())
      setPendingJobs(getPendingJobs())
    }
  }, [])

  // Measure mobile header height for accurate spacing
  useEffect(() => {
    if (isMobile && mobileHeaderRef.current) {
      const updateHeaderHeight = () => {
        if (mobileHeaderRef.current) {
          const height = mobileHeaderRef.current.offsetHeight || 200
          setMobileHeaderHeight(height)
        }
      }
      
      updateHeaderHeight()
      window.addEventListener('resize', updateHeaderHeight)
      
      return () => {
        window.removeEventListener('resize', updateHeaderHeight)
      }
    }
  }, [isMobile])

  // Job interaction handlers
  const toggleLikeJob = (jobId: string) => {
    if (likedJobs.includes(jobId)) {
      removeLikedJob(jobId)
      setLikedJobs(prev => prev.filter(id => id !== jobId))
    } else {
      addLikedJob(jobId)
      setLikedJobs(prev => [...prev, jobId])
      if (dislikedJobs.includes(jobId)) {
        removeDislikedJob(jobId)
        setDislikedJobs(prev => prev.filter(id => id !== jobId))
      }
    }
  }

  const toggleDislikeJob = (jobId: string) => {
    if (dislikedJobs.includes(jobId)) {
      removeDislikedJob(jobId)
      setDislikedJobs(prev => prev.filter(id => id !== jobId))
    } else {
      addDislikedJob(jobId)
      setDislikedJobs(prev => [...prev, jobId])
      if (likedJobs.includes(jobId)) {
        removeLikedJob(jobId)
        setLikedJobs(prev => prev.filter(id => id !== jobId))
      }
    }
  }

  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      removeBookmarkedJob(jobId)
      setSavedJobs(prev => prev.filter(id => id !== jobId))
    } else {
      addBookmarkedJob(jobId)
      setSavedJobs(prev => [...prev, jobId])
    }
  }
  
  // Filter jobs by specialty dynamically
  useEffect(() => {
    if (!slug || !specialty) {
      setLoading(false)
      return
    }

    setLoading(true)
    
    // Mapping between specialty names/slugs and job licenseSpecialty values
    const specialtyToJobMapping: Record<string, string[]> = {
      'emergency-room-travel-nurse': ['Emergency Room', 'Emergency Department', 'ER', 'ED'],
      'icu-nurse': ['ICU', 'Intensive Care', 'Critical Care'],
      'critical-care-nurse': ['ICU', 'Intensive Care', 'Critical Care', 'CCU'],
      'cardiac-icu-nurse': ['Cardiac ICU', 'Cardiac Intensive Care', 'CVICU', 'CICU'],
      'pediatric-nurse': ['Pediatric', 'Peds', 'Pediatrics'],
      'neonatal-travel-nurse': ['NICU', 'Neonatal', 'Neonatal ICU'],
      'nicu-nurse': ['NICU', 'Neonatal', 'Neonatal ICU'],
      'labor-and-delivery-nurse': ['Labor and Delivery', 'L&D', 'Labor & Delivery', 'OB'],
      'or-nurse': ['OR', 'Operating Room', 'Surgery', 'Surgical'],
      'surgical-nurse': ['OR', 'Operating Room', 'Surgery', 'Surgical'],
      'medical-surgical': ['Medical-Surgical', 'Med-Surg', 'Med Surg'],
      'oncology-nurse': ['Oncology', 'Cancer', 'Oncology Unit'],
      'telemetry-nurse': ['Telemetry', 'Tele', 'Cardiac Telemetry'],
      'trauma-nurse': ['Trauma', 'Trauma Center', 'Trauma Unit'],
      'psychiatric-nurse': ['Psychiatric', 'Psych', 'Mental Health', 'Behavioral Health'],
      'rehab-travel-nurse': ['Rehabilitation', 'Rehab', 'Physical Therapy'],
      'home-health-nurse': ['Home Health', 'Home Care'],
      'hospice-nurse': ['Hospice', 'Palliative Care'],
      'travel-dialysis-nurse': ['Dialysis', 'Renal', 'Kidney'],
      'orthopedic-nurse': ['Orthopedic', 'Ortho', 'Orthopedics'],
      'neurology-nurse': ['Neurology', 'Neuro', 'Neurological'],
    }
    
    // Get specialty name variations
    const specialtyName = specialty.name.toLowerCase()
    let matchingKeywords: string[] = []
    
    // Check if we have a direct mapping
    if (specialtyToJobMapping[slug]) {
      matchingKeywords = specialtyToJobMapping[slug].map(k => k.toLowerCase())
    } else {
      // Generate keywords from specialty name
      matchingKeywords.push(specialtyName)
      
      // Remove common suffixes
      if (specialtyName.includes('travel nurse')) {
        matchingKeywords.push(specialtyName.replace(' travel nurse', '').trim())
      }
      if (specialtyName.includes(' nurse')) {
        matchingKeywords.push(specialtyName.replace(' nurse', '').trim())
      }
      
      // Add individual significant words
      specialtyName.split(' ').forEach(word => {
        if (word.length > 3 && !['travel', 'nurse', 'and', 'the', 'care'].includes(word)) {
          matchingKeywords.push(word)
        }
      })
      
      // Add slug variations
      matchingKeywords.push(slug.replace(/-/g, ' '))
    }
    
    // Remove duplicates and filter
    const uniqueKeywords = [...new Set(matchingKeywords)].filter(k => k.length > 2)
    
    // Filter jobs based on licenseSpecialty field (format: "RN - Emergency Room")
    let filtered = SAMPLE_JOBS.filter(job => {
      if (!job.licenseSpecialty) return false
      
      // Extract specialty from licenseSpecialty (format: "RN - Emergency Room")
      const parts = job.licenseSpecialty.split(' - ')
      const jobSpecialty = parts.length > 1 ? parts.slice(1).join(' - ').toLowerCase() : job.licenseSpecialty.toLowerCase()
      const jobTitle = job.title.toLowerCase()
      
      // Check for matches in specialty field
      const matchesSpecialty = uniqueKeywords.some(keyword => {
        const keywordLower = keyword.toLowerCase()
        return jobSpecialty.includes(keywordLower) || keywordLower.includes(jobSpecialty) || 
               jobSpecialty === keywordLower
      })
      
      // Check for matches in title
      const matchesTitle = uniqueKeywords.some(keyword => 
        jobTitle.includes(keyword.toLowerCase())
      )
      
      return matchesSpecialty || matchesTitle
    })
    
    // Sort by relevance (exact specialty matches first)
    filtered = filtered.sort((a, b) => {
      const aSpecialty = a.licenseSpecialty.split(' - ').slice(1).join(' - ').toLowerCase()
      const bSpecialty = b.licenseSpecialty.split(' - ').slice(1).join(' - ').toLowerCase()
      
      // Check for exact or close matches
      const aExactMatch = uniqueKeywords.some(k => {
        const kLower = k.toLowerCase()
        return aSpecialty === kLower || aSpecialty.includes(kLower) || kLower.includes(aSpecialty)
      })
      const bExactMatch = uniqueKeywords.some(k => {
        const kLower = k.toLowerCase()
        return bSpecialty === kLower || bSpecialty.includes(kLower) || kLower.includes(bSpecialty)
      })
      
      if (aExactMatch && !bExactMatch) return -1
      if (!aExactMatch && bExactMatch) return 1
      
      // Secondary sort: featured jobs first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      return 0
    })
    
    setJobs(filtered)
    setLoading(false)
  }, [slug, specialty?.name])
  
  if (!specialty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Specialty Not Found</h1>
          <Link href="/nursing-specialties" className="text-primary-600 hover:text-primary-700">
            Return to Nursing Specialties
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = SPECIALTY_IMAGE_URLS[slug] || SPECIALTY_IMAGE_URLS.default

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      {/* Mobile Header - Fixed at top */}
      {isMobile && (
        <div 
          ref={mobileHeaderRef}
          className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200"
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
            top: '56px', // Below Navigation
          }}
        >
          <div className="px-4 py-3">
            {/* Back Button and Title Row */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => router.push('/nursing-specialties')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 active:bg-gray-200 transition-colors flex-shrink-0"
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </motion.button>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-900">
                  {specialty.name}
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header Section */}
      {!isMobile && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 pt-32 pb-6">
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
            <Link href="/nursing-specialties" className="group">
              <span className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors relative">
                Nursing Specialties
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50/80 backdrop-blur-md border border-primary-200/60 rounded-full">
              <Briefcase className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                {specialty.name}
              </span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              >
                {specialty.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-600 mb-6"
              >
                {specialty.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-0"
              >
                <Link href={`/jobs?specialty=${slug}`}>
                  <button className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all">
                    <Briefcase className="w-5 h-5" />
                    <span>View Job Opportunities</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative h-64 lg:h-72 rounded-lg overflow-hidden bg-gray-100"
              >
                <Image
                  src={imageUrl}
                  alt={specialty.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  unoptimized
                />
              </motion.div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Mobile Hero Section - Full Width Image */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full overflow-hidden bg-white"
          style={{
            marginTop: `calc(56px + ${mobileHeaderHeight}px + env(safe-area-inset-top, 0px))`,
          }}
        >
          <div className="relative h-64 w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={specialty.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isMobile ? 'px-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'}`}
        style={isMobile ? {
          position: 'relative',
          zIndex: 1,
          paddingTop: '0px',
          paddingBottom: '0px',
        } : {}}
      >
        {isMobile ? (
          <>
            {/* Mobile: Native App Style Specialty Details */}
            <div data-specialty-details="true" style={{ display: 'none' }} />
            
            {/* About Section - Seamless Native Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="px-4 pt-6 pb-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About {specialty.name}</h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {specialty.overview}
              </p>
            </motion.div>

            {/* Roles & Responsibilities - Seamless Native Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="px-4 pb-6 border-t border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pt-6">{specialty.rolesAndResponsibilities.title}</h2>
              <div className="space-y-3">
                {specialty.rolesAndResponsibilities.content.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed text-[15px] flex-1">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits - Seamless Native Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="px-4 pb-6 border-t border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pt-6">Why Choose This Specialty</h2>
              <ul className="space-y-3">
                {specialty.benefits.content.slice(0, 4).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-[15px] flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Job Listings - Compact Native Style */}
            <div className="px-4 pt-4 pb-6 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pt-6">Available Jobs</h2>
              {jobs.length > 0 ? (
                <div className="space-y-3">
                  {jobs.map((job, index) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}?from=specialty&specialty=${slug}`}
                    className="block no-underline"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.03,
                      }}
                      className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md active:bg-gray-50 transition-all"
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Card Body */}
                      <div className="p-4 flex gap-4">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header Row */}
                          <div className="mb-3">
                            <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 mb-1.5">
                              {job.licenseSpecialty || job.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{job.location}, {job.state}</span>
                            </div>
                          </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500 truncate">Start Date</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">{formatDateWithYear(job.startDate || job.postedDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500 truncate">Shift</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">
                              {job.shift}{job.shiftHours ? ` • ${formatShiftHoursForMobile(job.shiftHours)}` : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500 truncate">Agency</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">{job.staffingCompany}</p>
                          </div>
                        </div>
                        {job.daysAgo !== undefined && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs text-gray-500 truncate">Posted</p>
                              <p className="text-xs font-semibold text-gray-900 truncate">{job.daysAgo} {job.daysAgo === 1 ? 'day' : 'days'} ago</p>
                            </div>
                          </div>
                        )}
                      </div>
                        </div>

                        {/* Right Side - Facility Image & Actions */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {/* Facility Image */}
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                            <img
                              src={getFacilityImageWithFallback(job.facilityImage, job.state)}
                              alt={job.facilityName}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {/* Featured Badge */}
                            {job.featured && (
                              <div className="absolute top-0 right-0 inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-500 rounded-bl-lg rounded-tr-lg shadow-sm">
                                <Star className="w-2.5 h-2.5 text-white fill-white" />
                              </div>
                            )}
                          </div>


                          {/* PENDING Badge */}
                          {pendingJobs.includes(job.id) && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded-md border border-orange-200">
                              <AlertCircle className="w-3 h-3 text-orange-600" />
                              <span className="text-xs font-semibold text-orange-900">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pay Row - Full Width */}
                      <div className="px-4 pb-4 pt-3 border-t border-gray-100 flex justify-end">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Weekly Pay</p>
                          <div className="flex items-baseline justify-end gap-1">
                            <span className="text-xl font-bold text-gray-900">{job.payPerWeek}</span>
                            <span className="text-sm font-medium text-gray-600">/week</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    We don't have any {specialty.name} jobs available at the moment.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Desktop Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Stats Cards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{jobs.length}</h3>
              <p className="text-sm text-gray-600">Available Jobs</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">High</h3>
              <p className="text-sm text-gray-600">Demand</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">$$$</h3>
              <p className="text-sm text-gray-600">Competitive Pay</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">13+</h3>
              <p className="text-sm text-gray-600">Week Contracts</p>
            </div>
          </motion.section>

          {/* Job Opportunities Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {specialty.name} Job Opportunities
                  </h2>
                  <p className="text-gray-600">
                    Showing {jobs.length} of {jobs.length} jobs
                  </p>
                </div>
                <Link href={`/jobs?specialty=${slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>View All Jobs</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading jobs...</p>
                </div>
              ) : jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.slice(0, 5).map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <time className="text-sm text-gray-500">
                              Posted on {job.postedDate}
                            </time>
                            {job.featured && (
                              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="mb-2">
                            <span className="text-sm font-medium text-gray-600">{job.staffingCompany}</span>
                          </div>
                          <Link href={`/jobs/${job.id}`} className="block mb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {job.title}
                            </h3>
                          </Link>
                          <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-medium mb-4">
                            {specialty.name}
                          </span>
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary-600" />
                              <span><strong>Start:</strong> {job.startDate || 'ASAP'}</span>
                            </div>
                            {job.shift && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary-600" />
                                <span><strong>Shift:</strong> {job.shift}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary-600" />
                              <span><strong>Location:</strong> {job.location}, {job.state}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-6 flex flex-col items-end gap-4">
                          <Link href={`/jobs/${job.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                              Apply Now
                            </motion.button>
                          </Link>
                          <div className="text-right">
                            <span className="text-sm text-gray-600 block mb-1">Pay:</span>
                            <strong className="text-2xl text-gray-900">{job.payPerWeek || `${job.salary}/hr`}</strong>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-6">
                    We don't have any {specialty.name} jobs available at the moment.
                  </p>
                  <Link href="/jobs">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl">
                      Browse All Jobs
                    </button>
                  </Link>
                </div>
              )}

              {jobs.length > 5 && (
                <div className="mt-6 text-center">
                  <Link href={`/jobs?specialty=${slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                      Load more listings
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {specialty.name}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {specialty.overview}
              </p>
            </div>
          </motion.section>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Roles & Responsibilities */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{specialty.rolesAndResponsibilities.title}</h2>
              </div>
              <div className="space-y-4">
                {specialty.rolesAndResponsibilities.content.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Career Opportunities */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{specialty.careerOpportunities.title}</h2>
              </div>
              <div className="space-y-4">
                {specialty.careerOpportunities.content.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Benefits & Challenges */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Benefits */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100 p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{specialty.benefits.title}</h2>
              </div>
              <ul className="space-y-3">
                {specialty.benefits.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Challenges */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-100 p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{specialty.challenges.title}</h2>
              </div>
              <div className="space-y-4">
                {specialty.challenges.content.map((item, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">{item}</p>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Education & Salary */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{specialty.educationAndTraining.title}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To pursue a career as an {specialty.name}, individuals need a strong educational foundation. 
                Typically, this involves obtaining a Bachelor's Degree in Nursing (BSN), followed by a Master of Science in Nursing (MSN) with a specialization in acute care. 
                Further advancement can be achieved through a Doctor of Nursing Practice (DNP) degree.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {specialty.educationAndTraining.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Steps</h3>
                  <ol className="space-y-2 list-decimal list-inside text-sm text-gray-700">
                    {specialty.educationAndTraining.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.section>

            {/* Salary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-2xl p-8 text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{specialty.salary.title}</h2>
              </div>
              <div className="space-y-4">
                {specialty.salary.content.map((item, index) => (
                  <p key={index} className="text-white/95 leading-relaxed">{item}</p>
                ))}
              </div>
            </motion.section>
          </div>

          {/* FAQs Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">FAQs about {specialty.name}</h2>
              </div>
              <div className="space-y-4">
                {specialty.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      </motion.div>
                    </div>
                    {expandedFaq === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-gray-700 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-2xl shadow-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Start Your {specialty.name} Career?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Explore exciting travel nursing opportunities and find your next assignment
                </p>
                <Link href={`/jobs?specialty=${slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all"
                  >
                    <Briefcase className="w-5 h-5" />
                    <span>Browse {specialty.name} Jobs</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.section>
            </div>
          </>
        )}
      </main>

      {/* Footer - Desktop only */}
      {!isMobile && <Footer />}
      
      {/* Mobile Bottom Nav */}
      {isMobile && <MobileBottomNav />}
    </div>
  )
}

export default function SpecialtyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading specialty details...</p>
        </div>
      </div>
    }>
      <SpecialtyDetailContent params={params} />
    </Suspense>
  )
}
