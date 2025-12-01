'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Camera, Globe, Phone, MapPin, Mail, Star, Building2, ExternalLink, FileText, Users, MessageSquare, Briefcase, ImageIcon, X, ChevronLeft, ChevronRight, Calendar, Sun, Bookmark, ThumbsUp, ThumbsDown, AlertCircle, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getFacilityImageWithFallback } from '@/utils/stateImages'
import { useAuth } from '@/contexts/AuthContext'
import { getLikedJobs, getDislikedJobs, getBookmarkedJobs, getPendingJobs, addLikedJob, removeLikedJob, addDislikedJob, removeDislikedJob, addBookmarkedJob, removeBookmarkedJob } from '@/utils/jobStorage'
import { Job, SAMPLE_JOBS } from '@/app/jobs/page'

// Seeded random function for consistent positioning
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Mock data - in production this would come from an API
const agencyData: { [key: string]: any } = {
  'american-mobile': {
    id: 'american-mobile',
    name: 'AMN Healthcare Nurse',
    website: 'https://www.amnhealthcare.com/careers/nursing/',
    phone: '(866) 871-8519',
    address: '2999 Olympus Blvd. , Suite 500, Dallas, TX, 75019',
    jobApplicationEmail: 'PSGNursingLeads@amnhealthcare.com',
    logo: 'https://static.thegypsynurse.com/2022/12/logo-resizing-4.png.webp',
    overview: 'At AMN Healthcare, we take pride in staffing leading healthcare facilities and hospitals with the nation\'s best nurses. In the past two decades, our travel nurses have taken over 150,000 assignments across the U.S. We are a proud and culturally diverse team that\'s willing and ready to support the nation\'s healthcare staffing needs with the most qualified and genuine nurses. We are committed to helping nurses help others in the communities they serve. No matter where their location, our 24/7 clinical support team is available to answer questions that nurses may have throughout the day and night. Our recruiters, many of which have work experience in healthcare, are also readily available to help nurses design their ideal travel nursing assignment. Nurses also have the freedom to easily book an assignment, upload important documents, and track time and pay with the AMN Passport App. There\'s truly never been a better time to take your nursing career to the next level.',
    aboutUs: 'At AMN Healthcare, we take pride in staffing leading healthcare facilities and hospitals with the nation\'s best nurses. In the past two decades, our travel nurses have taken over 150,000 assignments across the U.S. We are a proud and culturally diverse team that\'s willing and ready to support the nation\'s healthcare staffing needs with the most qualified and genuine nurses. We are committed to helping nurses help others in the communities they serve. No matter where their location, our 24/7 clinical support team is available to answer questions that nurses may have throughout the day and night. Our recruiters, many of which have work experience in healthcare, are also readily available to help nurses design their ideal travel nursing assignment. Nurses also have the freedom to easily book an assignment, upload important documents, and track time and pay with the AMN Passport App. There\'s truly never been a better time to take your nursing career to the next level.',
    benefits: [
      'Agency Housing',
      'Health Insurance',
      '401K',
      'Continuing Education',
      'Referral Bonuses'
    ],
    reviews: [
      {
        date: '30-06-2022',
        title: 'Never Again',
        author: 'Liz, ICU RN Massachusetts',
        content: 'From the beginning I had issues with this agency. I agreed to a contract and was then told I had to either work more hours or take a 50% pay cut.... what? I agreed to more hours but requested a bonus. The bonus was a laughable $500. I tried to contact my recruiter and it turns out she had me sign the contract and then QUIT the company... my first week on assignment I did not have a recruiter. The recruiter I randomly got assigned couldn\'t care less throughout my contract. Every single paycheck I got was incorrect... short on hours or missing stipends. I was working 48 hours a week and getting paid for 24 hours. Every single week I had to call payroll to get it corrected... and the check would be "next week". The one time i requested to be paid immediately and I had to pay a penalty for early pay. At one point during my assignment I was owed 2 weeks worth of corrections... thousands of dollars. At the end of my assignment I had difficulty getting reimbursements paid. Needless to say, AMN is shady and will steal money/withhold money that you earned! WE DESERVE MORE THAN THIS. The disrespect leaves a bad feeling for me. I will never ever work for this company again and I recommend that none of my Travel RN friends do either. I would never want my friends or coworkers to be treated as I was.'
      }
    ],
    jobs: [
      { title: 'Registered Nurse – Perioperative Nurse - Operating Room - Travel - (OR RN)', specialty: 'Operating Room', location: 'GREENVILLE, OH', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse – Telemetry - Travel - (Tele RN)', specialty: 'Tele', location: 'SAVANNAH, GA', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Registered Nurse – Medical Surgical - Travel - (MS RN)', specialty: 'MedSurg', location: 'MARTINSBURG, WV', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse – Telemetry - Travel - (Tele RN)', specialty: 'Tele', location: 'COLUMBUS, OH', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse - Outpatient Oncology - Travel - (RN-OPOnc)', specialty: 'Oncology', location: 'PALO ALTO, CA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse – Labor & Delivery - Travel - (LD RN)', specialty: 'Labor & Delivery', location: 'TACOMA, WA', startDate: 'Starts: January 12, 2026', endDate: '' },
      { title: 'Registered Nurse – Telemetry - Travel - (Tele RN)', specialty: 'Tele', location: 'CHANDLER, AZ', startDate: 'Starts: January 5, 2026', endDate: '' },
      { title: 'Registered Nurse – Telemetry - Travel - (Tele RN)', specialty: 'Tele', location: 'CHANDLER, AZ', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse – Oncology - Travel - (Onc RN)', specialty: 'Oncology', location: 'SAN BERNARDINO, CA', startDate: 'Starts: October 27, 2025', endDate: '' },
      { title: 'Registered Nurse – Telemetry - Travel - (Tele RN)', specialty: 'Tele', location: 'GILBERT, AZ', startDate: 'Starts: December 8, 2025', endDate: '' },
      { title: 'Registered Nurse – Telemetry - Travel - (Tele RN)', specialty: 'Tele', location: 'GILBERT, AZ', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse – Intensive Care - ICU - Travel - (ICU RN)', specialty: 'ICU', location: 'INDIANAPOLIS, IN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse – Emergency Room - Travel - (ER RN)', specialty: 'Emergency Room', location: 'CHANDLER, AZ', startDate: 'Starts: October 27, 2025', endDate: '' },
      { title: 'Registered Nurse – Perioperative Nurse - Operating Room - Travel - (OR RN)', specialty: 'Operating Room', location: 'ROCHESTER, NY', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse – Telemetry - Travel - (Tele RN)', specialty: 'Tele', location: 'COLUMBUS, OH', startDate: 'Starts: ASAP', endDate: '' }
    ],
    albums: [
      { 
        id: 'guatemala',
        name: 'Guatemala', 
        photoCount: 8,
        image: 'https://static.thegypsynurse.com/2023/05/Guatemala7.jpg.webp',
        photos: [
          'https://static.thegypsynurse.com/2023/05/Guatemala1.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala2.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala3.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala4.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala5.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala6.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala7.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala8.jpg'
        ]
      },
      { 
        id: 'amn-nurses',
        name: 'AMN Nurses', 
        photoCount: 15,
        image: 'https://static.thegypsynurse.com/2023/05/UGC8.jpg.webp',
        photos: [
          'https://static.thegypsynurse.com/2023/05/UGC4.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC12.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC14.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC11.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC10.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC1.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC8.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC13.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC5.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC3.jpeg',
          'https://static.thegypsynurse.com/2023/05/UGC6.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC15.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC9.jpeg',
          'https://static.thegypsynurse.com/2023/05/UGC7.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC2.jpeg'
        ]
      },
      { 
        id: 'dallas-pride',
        name: 'Dallas Pride 2022', 
        photoCount: 13,
        image: 'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-35.jpg.webp',
        photos: [
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-292.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-37-1.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-35.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-39.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-25.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-38.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-182.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-13.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-250.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-10.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-159.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-20.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-160.jpg'
        ]
      }
    ]
  },
  'tnaa': {
    id: 'tnaa',
    name: 'TNAA Healthcare',
    website: 'https://tnaa.com/',
    phone: '(800) 240-2526',
    address: '5020 North Shore Dr. , Suite 2, North Little Rock, AR, 72118',
    jobApplicationEmail: 'leads@tnaa.com',
    logo: 'https://static.thegypsynurse.com/2023/12/TNAA-red-logo-jpeg-002-200x200.jpg',
    socialMedia: {
      facebook: 'https://www.facebook.com/TNAAHealthcare',
      twitter: 'https://twitter.com/TNAAHealthcare',
      linkedin: 'https://www.linkedin.com/company/tnaa',
      instagram: 'https://www.instagram.com/tnaahealthcare/',
    },
    overview: 'Travel Nurse Across America Setting the Standard in Service! At Travel Nurse Across America, we take pride in doing things differently. We place our nurses on high-paying jobs in exciting locations across the country, but it\'s our service before, during and after your assignment that sets us apart. Our dedicated, supportive staff understands how stressful preparing for a travel nursing job can be, and that\'s why we put our experience to work for you to remove the headaches and send you smoothly on your way. Across our recruiting, clinical, quality assurance, payroll and housing teams, we promise to go out of our way to offer you an exceptional customer service experience. Let Us Show You the Difference Our Service Can Make!',
    aboutUs: 'Travel Nurse Across America Setting the Standard in Service! At Travel Nurse Across America, we take pride in doing things differently. We place our nurses on high-paying jobs in exciting locations across the country, but it\'s our service before, during and after your assignment that sets us apart. Our dedicated, supportive staff understands how stressful preparing for a travel nursing job can be, and that\'s why we put our experience to work for you to remove the headaches and send you smoothly on your way. Across our recruiting, clinical, quality assurance, payroll and housing teams, we promise to go out of our way to offer you an exceptional customer service experience. Let Us Show You the Difference Our Service Can Make!',
    benefits: [
      'Housing Stipend',
      'Paid Time Off',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance',
      'Certification Reimbursement',
      'Tuition Reimbursement',
      'License Reimbursement',
      'Continuing Education',
      'Referral Bonuses'
    ],
    recruiters: [
      {
        id: 'gena-deaton',
        name: 'Gena Deaton',
        image: 'https://static.thegypsynurse.com/2019/12/Gena-Deaton.png.webp',
        phone: '(800) 240-2526',
        address: '',
        website: '',
        description: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        overview: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        about: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        albums: [],
        jobs: []
      },
      {
        id: 'nichole-graham',
        name: 'Nichole Graham',
        image: 'https://static.thegypsynurse.com/2019/12/Nichole-Graham.png.webp',
        phone: '(180) 024-02526',
        address: '',
        website: '',
        description: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        overview: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        about: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        albums: [],
        jobs: []
      },
      {
        id: 'tana-babcock',
        name: 'Tana Babcock',
        image: 'https://static.thegypsynurse.com/2019/12/Tana-Babcock.png.webp',
        phone: '(180) 024-02526',
        address: '',
        website: '',
        description: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        overview: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        about: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        albums: [],
        jobs: []
      }
    ],
    reviewsCount: 7,
    reviews: [
      {
        date: '25-08-2022',
        title: '',
        author: 'Robb McClune, ICU Idaho Falls, ID',
        content: 'I have over 26 assignments with TNAA. I had always had the support I needed. Strong internal staff has made every new assignment painless to get started at. From QA to payroll the entire company works with you and together for a smooth start, and best of all they do not forget about you after you get started with them. They stay in touch, checking up making sure you are ok and your needs are being met. This is not the company I started traveling with, but as long as they stay amazing they likely will be the company I am with until I stop traveling.'
      },
      {
        date: '23-02-2022',
        title: 'regidtered nurse',
        author: 'Guy A D\'Arezzo, telemetry florida',
        content: ''
      },
      {
        date: '23-02-2022',
        title: '',
        author: 'Melissa Jones, Tele/PCU RN',
        content: 'I have been traveling with TNAA for two years. It has been an amazing experience. My recruiter is very attentive and always finds a job that is a perfect fit for my family and I. TNAA has an amazing support staff that helps you every step of the way including housing, continuing education, any clinical experience and compliances. I have been able to travel all over from New Jersey to New Mexico. I have enjoyed seeing some beautiful parts of the country that I never would have been able to experience without working for this company. It is obvious that this company cares about their employees and does everything possible to make it a positive experience.'
      },
      {
        date: '23-02-2022',
        title: 'Sarah, Rebekah, TNAA rocks!',
        author: 'Wayne Williams, PCU RN San Antonio, Texas',
        content: 'This company is awesome! Particularly Sarah Chisholm and Rebekah Fanale! They have both been incredibly helpful, pleasant, prompt, kind, and genuinely excited throughout the process from start to assignment and beyond. If you can be so lucky as to have them as your Recruiter(s), you can be set up well. I\'m excited to see what the future holds! Thank you Sarah! Thank you Rebekah! Thank you TNAA! ❤️'
      }
    ],
    jobs: [
      { title: 'RN TELE - Travel Nurse', specialty: 'Tele', location: 'Tuscaloosa, AL', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN MedSurg - Travel Nurse', specialty: 'MedSurg', location: 'Riverton, WY', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN MedSurg - Travel Nurse', specialty: 'MedSurg', location: 'Riverton, WY', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN MedSurg - Travel Nurse', specialty: 'MedSurg', location: 'Lubbock, TX', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN TELE - Travel Nurse', specialty: 'Tele', location: 'Saint Louis, MO', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN TELE - Travel Nurse', specialty: 'Tele', location: 'Akron, OH', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN LD - Travel Nurse', specialty: 'Labor & Delivery', location: 'Templeton, CA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN ER - Travel Nurse', specialty: 'Emergency Room', location: 'Weston, WV', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN LD - Travel Nurse', specialty: 'Labor & Delivery', location: 'Templeton, CA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN Rehab - Travel Nurse', specialty: 'Rehab', location: 'Charleston, WV', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN ICU - Travel Nurse', specialty: 'ICU', location: 'Indianapolis, IN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN PCU - Travel Nurse', specialty: 'PCU', location: 'Shreveport, LA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN Home Health - Travel Nurse', specialty: 'Home Health', location: 'Norwood, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN LD - Travel Nurse', specialty: 'Labor & Delivery', location: 'Pratt, KS', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN OR - Travel Nurse', specialty: 'Operating Room', location: 'Weston, WV', startDate: 'Starts: ASAP', endDate: '' }
    ],
    albums: []
  },
  'trustaff': {
    id: 'trustaff',
    name: 'Trustaff',
    website: 'https://www.trustaff.com/',
    phone: '(877) 880-0346',
    address: '4675 Cornell Rd, Suite 100, Cincinnati, Ohio, 45241',
    jobApplicationEmail: 'processednursingleads@trustaff.com',
    logo: 'https://static.thegypsynurse.com/2023/01/trusrtaff-200x200.png',
    socialMedia: {
      facebook: 'https://www.facebook.com/Trustaff',
      twitter: 'https://twitter.com/Trustaff',
      linkedin: 'https://www.linkedin.com/company/trustaff',
      instagram: 'https://www.instagram.com/trustaff/',
    },
    overview: 'Since 2002, Trustaff has been a leading force in healthcare staffing. We build lasting relationships with both the talented professionals looking for their next job and the companies that need their skills to succeed, offering the best travel nurse assignments all across the country. Trustaff is about more than just great jobs—it\'s about great people.',
    aboutUs: 'Since 2002, Trustaff has been a leading force in healthcare staffing. We build lasting relationships with both the talented professionals looking for their next job and the companies that need their skills to succeed, offering the best travel nurse assignments all across the country. Trustaff is about more than just great jobs—it\'s about great people.',
    benefits: [
      'Weekly Pay',
      'Health Insurance',
      '401K',
      'License Reimbursement',
      'Workers Compensation',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviewsCount: 1,
    recruiters: [],
    reviews: [
      {
        date: '18-07-2023',
        title: '',
        author: 'Kimberly Ottmers-Orman, ICU nurse',
        content: 'I want to give a huge shoutout and thank you to Sondra Ryle, Trustaff Recruiter! Sondra is the epitome of professional and is truly an advocate for her nurses she represents! I have heard horror stories from other travel nurses regarding no communication or dishonesty during the process - this is not the case with Sondra! She communicates clearly and timely! She is working with the nurse to ensure an excellent experience with every assignment! I tell everyone I have the best recruiter!'
      }
    ],
    jobs: [
      { title: 'ICU RN', specialty: 'ICU', location: 'Indianapolis, IN', startDate: 'Starts: December 7, 2025', endDate: 'Ends: March 7, 2026' },
      { title: 'Cath Lab Tech', specialty: 'Cath Lab', location: 'Louisville, KY', startDate: 'Starts: November 26, 2025', endDate: 'Ends: February 25, 2026' },
      { title: 'Cath Lab RN', specialty: 'Cath Lab', location: 'Louisville, KY', startDate: 'Starts: November 26, 2025', endDate: 'Ends: February 25, 2026' },
      { title: 'Emergency Room / Peds RN', specialty: 'Emergency Room', location: 'Dallas, TX', startDate: 'Starts: November 5, 2025', endDate: 'Ends: February 4, 2026' },
      { title: 'Operating Room - CVOR RN', specialty: 'CVOR', location: 'Milwaukee, WI', startDate: 'Starts: December 21, 2025', endDate: 'Ends: March 21, 2026' },
      { title: 'Cath Lab RN', specialty: 'Cath Lab', location: 'Milwaukee, WI', startDate: 'Starts: December 21, 2025', endDate: 'Ends: March 21, 2026' },
      { title: 'Cardiac Rehab RN', specialty: 'Cardiac', location: 'Winston Salem, NC', startDate: 'Starts: November 10, 2025', endDate: 'Ends: February 7, 2026' },
      { title: 'Labor & Delivery RN', specialty: 'Labor & Delivery', location: 'Greenbrae, CA', startDate: 'Starts: November 19, 2025', endDate: 'Ends: February 18, 2026' },
      { title: 'Radiation Therapist', specialty: 'Radiology', location: 'Mechanicsburg, PA', startDate: 'Starts: November 17, 2025', endDate: 'Ends: February 15, 2026' },
      { title: 'Physical Therapist', specialty: 'Physical Therapy', location: 'Horse Cave, KY', startDate: 'Starts: December 1, 2025', endDate: 'Ends: March 1, 2026' },
      { title: 'Cardiac Rehab RN', specialty: 'Cardiac', location: 'Winston Salem, NC', startDate: 'Starts: November 10, 2025', endDate: 'Ends: February 7, 2026' },
      { title: 'Occupational Therapist', specialty: 'Occupational Therapy', location: 'San Francisco, CA', startDate: 'Starts: November 3, 2025', endDate: 'Ends: February 2, 2026' },
      { title: 'Emergency Room RN', specialty: 'Emergency Room', location: 'Columbus, OH', startDate: 'Starts: January 5, 2026', endDate: 'Ends: April 6, 2026' },
      { title: 'Operating Room RN', specialty: 'Operating Room', location: 'Rochester, NY', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 15, 2026' },
      { title: 'Interventional Radiology Tech', specialty: 'Interventional Radiology', location: 'Plano, TX', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 15, 2026' }
    ],
    albums: []
  },
  'ab-staffing': {
    id: 'ab-staffing',
    name: 'AB Staffing Solutions',
    website: 'https://www.abstaffing.com/',
    phone: '(844) 975-4227',
    address: '3451 Mercy Rd. #102, Gilbert, AZ, 85297',
    jobApplicationEmail: 'vmiddlebooks@abstaffing.com',
    logo: 'https://static.thegypsynurse.com/2023/01/AB-Staffing.png.webp',
    socialMedia: {
      facebook: 'https://www.facebook.com/ABStaffingSolutions',
      linkedin: 'https://www.linkedin.com/company/ab-staffing-solutions',
    },
    overview: 'AB Staffing Solutions LLC is a nationwide leader in travel nurse and Healthcare Staffing. ABSS is accredited and certified by The Joint Commission and has been providing strategic healthcare solutions since 2002. Our clients rely upon our innovative solutions to meet their Healthcare Staffing needs. As a team, we create a positive experience for our Healthcare Providers while focusing on improving the quality of patient care in the Healthcare Facilities we work with Nationwide. We strive to be the leading provider of healthcare personnel at government and commercial medical facilities across the country. Creating a customized experience for each provider and understanding how to create solutions for our clients is at the heart of what we do.',
    aboutUs: 'AB Staffing Solutions LLC is a nationwide leader in travel nurse and Healthcare Staffing. ABSS is accredited and certified by The Joint Commission and has been providing strategic healthcare solutions since 2002. Our clients rely upon our innovative solutions to meet their Healthcare Staffing needs. As a team, we create a positive experience for our Healthcare Providers while focusing on improving the quality of patient care in the Healthcare Facilities we work with Nationwide. We strive to be the leading provider of healthcare personnel at government and commercial medical facilities across the country. Creating a customized experience for each provider and understanding how to create solutions for our clients is at the heart of what we do.',
    benefits: [
      'Paid Time Off',
      'Weekly Pay',
      'Health Insurance',
      '401K',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviewsCount: 3,
    recruiters: [
      {
        id: 'elias-rodriguez',
        name: 'Elias Rodriguez',
        image: 'https://static.thegypsynurse.com/2019/12/Elias.png.webp',
        description: 'AB STAFFING has been a leader in providing Travel Healthcare Professionals to Federal Facilities since 2002. Our personal approach to both our Clients\' and Employees\' needs make us one of the most desirable employers in the nation. Our Clients include Veterans Affairs Facilities, Military Hospitals and Clinics, Indian Healthcare Facilities, and many others located throughout the US',
        phone: '(480) 345-6668',
        address: '',
        website: 'https://www.abstaffing.com/',
        overview: 'AB STAFFING has been a leader in providing Travel Healthcare Professionals to Federal Facilities since 2002. Our personal approach to both our Clients\' and Employees\' needs make us one of the most desirable employers in the nation. Our Clients include Veterans Affairs Facilities, Military Hospitals and Clinics, Indian Healthcare Facilities, and many others located throughout the US',
        about: 'AB STAFFING has been a leader in providing Travel Healthcare Professionals to Federal Facilities since 2002. Our personal approach to both our Clients\' and Employees\' needs make us one of the most desirable employers in the nation. Our Clients include Veterans Affairs Facilities, Military Hospitals and Clinics, Indian Healthcare Facilities, and many others located throughout the US',
        albums: [],
        jobs: []
      },
      {
        id: 'kirsten-fothergill',
        name: 'Kirsten Fothergill',
        image: 'https://static.thegypsynurse.com/2019/12/Kirsten-Fothergill.png.webp',
        description: 'Born and raised in Germany. Lived in the Northeast, FL, and then relocated to AZ 7 years ago. Huge Patriots fan, enjoy attending sporting events, outdoor concerts, hiking, trips to the beach, visiting family in FL to include the newest addition, my nephew Liam, and of course being a recruiter.',
        phone: '(480) 376-2198',
        address: '',
        website: 'http://abstaffing.com',
        overview: 'Born and raised in Germany. Lived in the Northeast, FL, and then relocated to AZ 7 years ago. Huge Patriots fan, enjoy attending sporting events, outdoor concerts, hiking, trips to the beach, visiting family in FL to include the newest addition, my nephew Liam, and of course being a recruiter.',
        about: 'Born and raised in Germany. Lived in the Northeast, FL, and then relocated to AZ 7 years ago. Huge Patriots fan, enjoy attending sporting events, outdoor concerts, hiking, trips to the beach, visiting family in FL to include the newest addition, my nephew Liam, and of course being a recruiter.',
        albums: [],
        jobs: []
      },
      {
        id: 'marie-fury',
        name: 'Marie Fury',
        image: 'https://static.thegypsynurse.com/2019/12/Marie-Fury.png.webp',
        description: 'I was born and raised in Dubuque, Iowa. Go Hawkeyes!! After graduating college, I relocated to Arizona, where I have lived for about 9 years now. I love it here, my only wish is that my family was closer, but now, they have an amazing vacation spot that they surly take advantage of! In my spare time I enjoy, spending time with my better half and his family, the pool, working out, volleyball and snowboarding up north in the winter.',
        phone: '(480) 719-4890',
        address: '',
        website: 'https://www.abstaffing.com/',
        overview: 'I was born and raised in Dubuque, Iowa. Go Hawkeyes!! After graduating college, I relocated to Arizona, where I have lived for about 9 years now. I love it here, my only wish is that my family was closer, but now, they have an amazing vacation spot that they surly take advantage of! In my spare time I enjoy, spending time with my better half and his family, the pool, working out, volleyball and snowboarding up north in the winter.',
        about: 'I was born and raised in Dubuque, Iowa. Go Hawkeyes!! After graduating college, I relocated to Arizona, where I have lived for about 9 years now. I love it here, my only wish is that my family was closer, but now, they have an amazing vacation spot that they surly take advantage of! In my spare time I enjoy, spending time with my better half and his family, the pool, working out, volleyball and snowboarding up north in the winter.',
        albums: [],
        jobs: []
      }
    ],
    reviews: [
      {
        date: '12-06-2023',
        title: '',
        author: 'arnold dela cruz, dialysis nurse AUSTIN TEXAS',
        content: ''
      },
      {
        date: '21-09-2021',
        title: '',
        author: '',
        content: ''
      },
      {
        date: '26-05-2021',
        title: '',
        author: '',
        content: ''
      }
    ],
    jobs: [
      { title: 'Physician Job in Des Moines, IA', specialty: 'Other', location: 'Des Moines, IA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Physician Job in West Des Moines, IA', specialty: 'Other', location: 'West Des Moines, IA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Paraprofessional / Instructional Assistant Job in Phoenix, AZ', specialty: '', location: 'Baton Rouge, LA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Occupational Therapist – School Based Job in Phoenix, AZ', specialty: '', location: 'Stockton, CA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Physician Job in West Des Moines, IA', specialty: 'Other', location: 'West Des Moines, IA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Physician Job in Seattle, WA', specialty: 'Other', location: 'Seattle, WA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Speech Language Pathologist Job in Lawrence, MA', specialty: 'SLP', location: 'Lawrence, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Physical Therapist Job in Plains, MT', specialty: 'Physical Therapy', location: 'Plains, MT', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Physical Therapist Job in Plains, MT', specialty: 'Physical Therapy', location: 'Plains, MT', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Social Worker Job in Harrisburg, PA', specialty: 'Other', location: 'Harrisburg, PA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'LPN Job in York, PA', specialty: 'LPN', location: 'York, PA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'LPN Job in York, PA', specialty: 'LPN', location: 'York, PA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Radiologic Technologist Job in Vail, CO', specialty: 'Radiology', location: 'Vail, CO', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Labor and Delivery Job in Lincoln City, OR', specialty: 'Labor & Delivery', location: 'Lincoln City, OR', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN Job in Hermiston, OR', specialty: 'Registered Nurse', location: 'Hermiston, OR', startDate: 'Starts: ASAP', endDate: '' }
    ],
    albums: []
  },
  'advantage-medical': {
    id: 'advantage-medical',
    name: 'Advantage Medical Professionals',
    website: 'https://advantagemedicalprofessionals.com/',
    phone: '(800) 749-1122',
    address: '3340 Severn Ave, # 320, Metairie, LA, 70002',
    jobApplicationEmail: 'info@ampstaffing.com',
    logo: 'https://static.thegypsynurse.com/2023/01/ad.png.webp',
    overview: 'Since 1984, Advantage Medical Professionals has connected top-quality nurses with leading healthcare organizations, all in places where we\'d want to be. Because we believe that your quality of life—especially with a career as challenging as nursing—is largely dependent on how much you enjoy where you live. With Advantage Medical Professionals, you\'re not just getting an assignment or fulfilling a staffing need. You\'re joining a family of professionals. You can trust us to be open and honest with you, we truly care to give you the attention you need and deserve.',
    aboutUs: 'Since 1984, Advantage Medical Professionals has connected top-quality nurses with leading healthcare organizations, all in places where we\'d want to be. Because we believe that your quality of life—especially with a career as challenging as nursing—is largely dependent on how much you enjoy where you live. With Advantage Medical Professionals, you\'re not just getting an assignment or fulfilling a staffing need. You\'re joining a family of professionals. You can trust us to be open and honest with you, we truly care to give you the attention you need and deserve.',
    benefits: [
      'Disability Insurance',
      'Housing Stipend',
      'Meals and Incidentals',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance',
      'Workers Compensation',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviewsCount: 2,
    recruiters: [
      {
        id: 'aerin-alexander',
        name: 'Aerin Alexander',
        image: 'https://static.thegypsynurse.com/2022/04/Aerin-300x300.jpg.webp',
        description: 'After graduating with my BSN, I became a better nurse advocate than a patient advocate and have been in healthcare recruiter for over 20 years helping my nurses to work smarter versus harder in their career.',
        phone: '(205) 456-9322',
        address: '',
        website: 'https://advantagemedicalprofessionals.com/',
        overview: 'After graduating with my BSN, I became a better nurse advocate than a patient advocate and have been in healthcare recruiter for over 20 years helping my nurses to work smarter versus harder in their career.',
        about: 'After graduating with my BSN, I became a better nurse advocate than a patient advocate and have been in healthcare recruiter for over 20 years helping my nurses to work smarter versus harder in their career.',
        albums: [],
        jobs: []
      },
      {
        id: 'barbie-landwehr',
        name: 'Barbie Landwehr',
        image: 'https://static.thegypsynurse.com/2023/03/Barbie-Landwehr-scaled.jpg.webp',
        description: 'I enjoy spending time outside. We now raise chickens, and do alot of gardening, growing our our food. My husband told me you can\'t name the chickens when we got them but so much for that, they all have names. I have a wonderful beautiful 14 year old daughter and a great husband who I thank God for everyday, plus our 3 fur babies, one cat by the name of Kitty Poe and two German Shepherds Fritz and Saache and oops, I can\'t forget our 18 chicken(but I am not suppose to call them pets). I enjoy meeting new people and building relationships. It is also a great pleasure for me to be able to help someone find that perfect assignment. When I am not working, you can find me by the pool or my back patio enjoying the sun with a cocktail or two.',
        phone: '(985) 327-2665',
        address: '195 Greenbrier Blvd, Suite 101, Covington, LA, 70433',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'I enjoy spending time outside. We now raise chickens, and do alot of gardening, growing our our food. My husband told me you can\'t name the chickens when we got them but so much for that, they all have names. I have a wonderful beautiful 14 year old daughter and a great husband who I thank God for everyday, plus our 3 fur babies, one cat by the name of Kitty Poe and two German Shepherds Fritz and Saache and oops, I can\'t forget our 18 chicken(but I am not suppose to call them pets). I enjoy meeting new people and building relationships. It is also a great pleasure for me to be able to help someone find that perfect assignment. When I am not working, you can find me by the pool or my back patio enjoying the sun with a cocktail or two.',
        about: 'I enjoy spending time outside. We now raise chickens, and do alot of gardening, growing our our food. My husband told me you can\'t name the chickens when we got them but so much for that, they all have names. I have a wonderful beautiful 14 year old daughter and a great husband who I thank God for everyday, plus our 3 fur babies, one cat by the name of Kitty Poe and two German Shepherds Fritz and Saache and oops, I can\'t forget our 18 chicken(but I am not suppose to call them pets). I enjoy meeting new people and building relationships. It is also a great pleasure for me to be able to help someone find that perfect assignment. When I am not working, you can find me by the pool or my back patio enjoying the sun with a cocktail or two.',
        albums: [],
        jobs: []
      },
      {
        id: 'chris-ballay',
        name: 'Chris Ballay',
        image: 'https://static.thegypsynurse.com/2023/03/Chris-Ballay-scaled.jpg.webp',
        description: 'I have been a Clinical Recruiter for over 5 years. Since my time at Advantage, I have worked extensively with a variety of different clinicians across the country. I specialize in finding short-term contracts nationwide for RN\'s, LPN\'s, RRT\'s and ORTECHs. What I enjoy the most about being a recruiter is working closely with medical professionals on finding the best positions for them. The excitement of finding a new opportunity and city is a great experience for all parties. I\'ve been a New Orleans resident for the last 10+ years, my interests outside of recruiting include spending time with my wife and 2 daughters, traveling, running and LSU football.',
        phone: '(504) 883-8733',
        address: '3340 Severn Avenue, Suite 320, Metairie, LA, 70002',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'I have been a Clinical Recruiter for over 5 years. Since my time at Advantage, I have worked extensively with a variety of different clinicians across the country. I specialize in finding short-term contracts nationwide for RN\'s, LPN\'s, RRT\'s and ORTECHs. What I enjoy the most about being a recruiter is working closely with medical professionals on finding the best positions for them. The excitement of finding a new opportunity and city is a great experience for all parties. I\'ve been a New Orleans resident for the last 10+ years, my interests outside of recruiting include spending time with my wife and 2 daughters, traveling, running and LSU football.',
        about: 'I have been a Clinical Recruiter for over 5 years. Since my time at Advantage, I have worked extensively with a variety of different clinicians across the country. I specialize in finding short-term contracts nationwide for RN\'s, LPN\'s, RRT\'s and ORTECHs. What I enjoy the most about being a recruiter is working closely with medical professionals on finding the best positions for them. The excitement of finding a new opportunity and city is a great experience for all parties. I\'ve been a New Orleans resident for the last 10+ years, my interests outside of recruiting include spending time with my wife and 2 daughters, traveling, running and LSU football.',
        albums: [],
        jobs: []
      },
      {
        id: 'crystal-shaffner',
        name: 'Crystal Shaffner',
        image: 'https://static.thegypsynurse.com/2023/03/Crystal.jpg.webp',
        description: 'I have been in the staffing industry for almost 20 years. I love the flexibility that agencies can provide for a clinician and hospital. Helping my nurses find a position that fits their lives is truly rewarding. I love building long lasting relationship with my nurses and want to play a role in bettering the lives of the clinicians that give so much of themselves helping their patients and their families. I live in a small town in Texas where my family has resided since the 1860\'s. Growing up, I had the privilege of living all over the United States. The beauty of the mountains of Virginia and Arkansas Ozarks has inspired my joy of traveling. I have 9 adult kid and 18 beautiful grandchildren. I spend my time swimming, cooking, gardening, and with my grandkids. I am a very active grandmother and love creating adventures to share with the kids. I love the beach and we have an annual beach vacation, the entire huge family each year for my birthday.',
        phone: '(214) 983-3033',
        address: '3340 Severn Avenue, Suite 320, Metairie, LA, 70002',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'I have been in the staffing industry for almost 20 years. I love the flexibility that agencies can provide for a clinician and hospital. Helping my nurses find a position that fits their lives is truly rewarding. I love building long lasting relationship with my nurses and want to play a role in bettering the lives of the clinicians that give so much of themselves helping their patients and their families. I live in a small town in Texas where my family has resided since the 1860\'s. Growing up, I had the privilege of living all over the United States. The beauty of the mountains of Virginia and Arkansas Ozarks has inspired my joy of traveling. I have 9 adult kid and 18 beautiful grandchildren. I spend my time swimming, cooking, gardening, and with my grandkids. I am a very active grandmother and love creating adventures to share with the kids. I love the beach and we have an annual beach vacation, the entire huge family each year for my birthday.',
        about: 'I have been in the staffing industry for almost 20 years. I love the flexibility that agencies can provide for a clinician and hospital. Helping my nurses find a position that fits their lives is truly rewarding. I love building long lasting relationship with my nurses and want to play a role in bettering the lives of the clinicians that give so much of themselves helping their patients and their families. I live in a small town in Texas where my family has resided since the 1860\'s. Growing up, I had the privilege of living all over the United States. The beauty of the mountains of Virginia and Arkansas Ozarks has inspired my joy of traveling. I have 9 adult kid and 18 beautiful grandchildren. I spend my time swimming, cooking, gardening, and with my grandkids. I am a very active grandmother and love creating adventures to share with the kids. I love the beach and we have an annual beach vacation, the entire huge family each year for my birthday.',
        albums: [],
        jobs: []
      },
      {
        id: 'erica-mcgary',
        name: 'Erica McGary',
        image: 'https://static.thegypsynurse.com/2023/03/Erica-McGary-scaled.jpg.webp',
        description: 'I was born and raised in Louisiana. I can not imagine living any where else, I love our unique food, culture, and traditions. I am the wife of an AirForce Veteran and a mom of seven. My family and I spend a lot of time outdoors. On the weekends we enjoy many outdoor activities including fishing and boating. I truly enjoy building relationships, meeting people from all over the United States and helping clinicians reach their career goals.',
        phone: '(504) 883-8731',
        address: '195 Greenbrier Blvd, Suite 101, Covington, LA, 70433',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'I was born and raised in Louisiana. I can not imagine living any where else, I love our unique food, culture, and traditions. I am the wife of an AirForce Veteran and a mom of seven. My family and I spend a lot of time outdoors. On the weekends we enjoy many outdoor activities including fishing and boating. I truly enjoy building relationships, meeting people from all over the United States and helping clinicians reach their career goals.',
        about: 'I was born and raised in Louisiana. I can not imagine living any where else, I love our unique food, culture, and traditions. I am the wife of an AirForce Veteran and a mom of seven. My family and I spend a lot of time outdoors. On the weekends we enjoy many outdoor activities including fishing and boating. I truly enjoy building relationships, meeting people from all over the United States and helping clinicians reach their career goals.',
        albums: [],
        jobs: []
      },
      {
        id: 'jay-laine',
        name: 'Jay Laine',
        image: 'https://static.thegypsynurse.com/2023/03/Jay-Laine-Headshot-scaled.jpg.webp',
        description: 'Born and raised in New Orleans, I have worked in the greater New Orleans area the majority of my life as well. I grew up in a family owned business, working there since I was old enough to walk and talk which has given me my drive and work ethic. I have a great sense of humor which serves me well in both my personal and professional life. I enjoy watching sports like football, UFC and basketball. I enjoy going to games, cooking, eating at nice restaurants, attending concerts, playing fantasy football, and spending time with family and friends. I am always the entertainment where ever I go. I love visiting Destin, Florida and Gulf Shores, Alabama. My dream vacation is anywhere near water. I have a few things on my bucket list; I would love to attend the South by Southwest music festival in Austin, Texas, learn to play the guitar, drive a race car over 200 miles an hour and open a small restaurant.',
        phone: '(504) 883-8734',
        address: '3340 Severn Avenue, Suite 320, Metairie, LA, 70002',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'Born and raised in New Orleans, I have worked in the greater New Orleans area the majority of my life as well. I grew up in a family owned business, working there since I was old enough to walk and talk which has given me my drive and work ethic. I have a great sense of humor which serves me well in both my personal and professional life. I enjoy watching sports like football, UFC and basketball. I enjoy going to games, cooking, eating at nice restaurants, attending concerts, playing fantasy football, and spending time with family and friends. I am always the entertainment where ever I go. I love visiting Destin, Florida and Gulf Shores, Alabama. My dream vacation is anywhere near water. I have a few things on my bucket list; I would love to attend the South by Southwest music festival in Austin, Texas, learn to play the guitar, drive a race car over 200 miles an hour and open a small restaurant.',
        about: 'Born and raised in New Orleans, I have worked in the greater New Orleans area the majority of my life as well. I grew up in a family owned business, working there since I was old enough to walk and talk which has given me my drive and work ethic. I have a great sense of humor which serves me well in both my personal and professional life. I enjoy watching sports like football, UFC and basketball. I enjoy going to games, cooking, eating at nice restaurants, attending concerts, playing fantasy football, and spending time with family and friends. I am always the entertainment where ever I go. I love visiting Destin, Florida and Gulf Shores, Alabama. My dream vacation is anywhere near water. I have a few things on my bucket list; I would love to attend the South by Southwest music festival in Austin, Texas, learn to play the guitar, drive a race car over 200 miles an hour and open a small restaurant.',
        albums: [],
        jobs: []
      },
      {
        id: 'katrina-dunson',
        name: 'Katrina Dunson',
        image: 'https://static.thegypsynurse.com/2023/03/katrina-dunson-img.jpg.webp',
        description: 'Hi! I\'m Katrina. I have lived in quite a few places, including the Midwest, the West Coast, and the South. I\'ve been in recruiting since 2015, so it\'s my pleasure to answer any questions you have, especially from first time travelers. Prior to recruiting, I spent nearly 15 years in hospitality building relationships with VIPs and planning travel packages. I\'ve taken the scenic route, so I also have healthcare experience working as a Hospice Account Executive and a CNA. I love to recruit because it allows me the opportunity to help you reach your career and financial goals. It\'s great meeting new people and building lasting relationships. Recruiting is a like a puzzle; it\'s rewarding to help great clinicians like you find a contract that fits!',
        phone: '(504) 635-4175',
        address: '3340 Severn Avenue, Suite 320, Metairie, LA, 70002',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'Hi! I\'m Katrina. I have lived in quite a few places, including the Midwest, the West Coast, and the South. I\'ve been in recruiting since 2015, so it\'s my pleasure to answer any questions you have, especially from first time travelers. Prior to recruiting, I spent nearly 15 years in hospitality building relationships with VIPs and planning travel packages. I\'ve taken the scenic route, so I also have healthcare experience working as a Hospice Account Executive and a CNA. I love to recruit because it allows me the opportunity to help you reach your career and financial goals. It\'s great meeting new people and building lasting relationships. Recruiting is a like a puzzle; it\'s rewarding to help great clinicians like you find a contract that fits!',
        about: 'Hi! I\'m Katrina. I have lived in quite a few places, including the Midwest, the West Coast, and the South. I\'ve been in recruiting since 2015, so it\'s my pleasure to answer any questions you have, especially from first time travelers. Prior to recruiting, I spent nearly 15 years in hospitality building relationships with VIPs and planning travel packages. I\'ve taken the scenic route, so I also have healthcare experience working as a Hospice Account Executive and a CNA. I love to recruit because it allows me the opportunity to help you reach your career and financial goals. It\'s great meeting new people and building lasting relationships. Recruiting is a like a puzzle; it\'s rewarding to help great clinicians like you find a contract that fits!',
        albums: [],
        jobs: []
      },
      {
        id: 'nancy-mumphrey',
        name: 'Nancy Mumphrey',
        image: 'https://static.thegypsynurse.com/2023/03/Nancy-Mumphrey-Headshot-scaled.jpg.webp',
        description: 'Originally from Connecticut, I moved to Louisiana 21 years ago. That was a culture shock. For the most part, I have lost all of my "northerness", except for pronouncing the letter O. I can\'t pronounce it without it sounding like an A. I do still drink "soda", not "cold drinks", and eat "lollipops", not suckers. That thing you push at the grocery store - it\'s a cart, not a buggy. I have a B.A. in Psychology, with a minor in Social Work. I have 3 teenagers. When I am not dealing with that drama, I love to read and paint in my free time. I would love to visit Australia, and meet the Irwins. I joined AMP back in 2006. I\'ve worked in almost every aspect of staffing. Recruiting has been the most rewarding out of all of them because I get to meet nurses all over the US.',
        phone: '(504) 883-8722',
        address: '3340 Severn Avenue, Suite 320, Metairie, LA, 70002',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'Originally from Connecticut, I moved to Louisiana 21 years ago. That was a culture shock. For the most part, I have lost all of my "northerness", except for pronouncing the letter O. I can\'t pronounce it without it sounding like an A. I do still drink "soda", not "cold drinks", and eat "lollipops", not suckers. That thing you push at the grocery store - it\'s a cart, not a buggy. I have a B.A. in Psychology, with a minor in Social Work. I have 3 teenagers. When I am not dealing with that drama, I love to read and paint in my free time. I would love to visit Australia, and meet the Irwins. I joined AMP back in 2006. I\'ve worked in almost every aspect of staffing. Recruiting has been the most rewarding out of all of them because I get to meet nurses all over the US.',
        about: 'Originally from Connecticut, I moved to Louisiana 21 years ago. That was a culture shock. For the most part, I have lost all of my "northerness", except for pronouncing the letter O. I can\'t pronounce it without it sounding like an A. I do still drink "soda", not "cold drinks", and eat "lollipops", not suckers. That thing you push at the grocery store - it\'s a cart, not a buggy. I have a B.A. in Psychology, with a minor in Social Work. I have 3 teenagers. When I am not dealing with that drama, I love to read and paint in my free time. I would love to visit Australia, and meet the Irwins. I joined AMP back in 2006. I\'ve worked in almost every aspect of staffing. Recruiting has been the most rewarding out of all of them because I get to meet nurses all over the US.',
        albums: [],
        jobs: []
      },
      {
        id: 'richard-jones',
        name: 'Richard Jones',
        image: 'https://static.thegypsynurse.com/2022/04/Rick-300x300.jpg.webp',
        description: 'I have spent my entire working life recruiting people(one way or another). I\'m from Gulf Shores, Alabama and enjoy spending time on the beach. My favorite city to visit is Georgetown, Grand Cayman. Dream vacation, Fiji. I\'ve always wanted to fly a plane, it\'s on my bucket list. For 7 years I led one of the top Executive Search firms in the Southeast. We grew to 13 offices, in 6 states, placing candidates in the hospitality, IT, engineering and medical industries. The firm was sold to a large national company in 2005 and I made the decision to go into the restaurant business. Over the next 15 years, I worked as an operational executive for both Sonic and Hardee\'s in Tennessee, Alabama, Mississippi and Louisiana. In 2017, I was chosen to lead one of Louisiana\'s most ICONIC brands, VooDoo BBQ out of financial difficulty. I spent the next 3 years growing and developing teams and positioning the brand for future growth. Now I am back doing what I love, which is recruiting AMAZING nurses and helping our clients provide the best possible care for patients.',
        phone: '(504) 883-8704',
        address: '',
        website: 'https://advantagemedicalprofessionals.com/',
        overview: 'I have spent my entire working life recruiting people(one way or another). I\'m from Gulf Shores, Alabama and enjoy spending time on the beach. My favorite city to visit is Georgetown, Grand Cayman. Dream vacation, Fiji. I\'ve always wanted to fly a plane, it\'s on my bucket list. For 7 years I led one of the top Executive Search firms in the Southeast. We grew to 13 offices, in 6 states, placing candidates in the hospitality, IT, engineering and medical industries. The firm was sold to a large national company in 2005 and I made the decision to go into the restaurant business. Over the next 15 years, I worked as an operational executive for both Sonic and Hardee\'s in Tennessee, Alabama, Mississippi and Louisiana. In 2017, I was chosen to lead one of Louisiana\'s most ICONIC brands, VooDoo BBQ out of financial difficulty. I spent the next 3 years growing and developing teams and positioning the brand for future growth. Now I am back doing what I love, which is recruiting AMAZING nurses and helping our clients provide the best possible care for patients.',
        about: 'I have spent my entire working life recruiting people(one way or another). I\'m from Gulf Shores, Alabama and enjoy spending time on the beach. My favorite city to visit is Georgetown, Grand Cayman. Dream vacation, Fiji. I\'ve always wanted to fly a plane, it\'s on my bucket list. For 7 years I led one of the top Executive Search firms in the Southeast. We grew to 13 offices, in 6 states, placing candidates in the hospitality, IT, engineering and medical industries. The firm was sold to a large national company in 2005 and I made the decision to go into the restaurant business. Over the next 15 years, I worked as an operational executive for both Sonic and Hardee\'s in Tennessee, Alabama, Mississippi and Louisiana. In 2017, I was chosen to lead one of Louisiana\'s most ICONIC brands, VooDoo BBQ out of financial difficulty. I spent the next 3 years growing and developing teams and positioning the brand for future growth. Now I am back doing what I love, which is recruiting AMAZING nurses and helping our clients provide the best possible care for patients.',
        albums: [],
        jobs: []
      },
      {
        id: 'roxanne-zamin',
        name: 'Roxanne Zamin',
        image: 'https://static.thegypsynurse.com/2023/03/Roxanne-Zamin-Headshot.jpg.webp',
        description: 'I\'m originally from the New Orleans, Louisiana area. I moved to Folsom, Louisiana to complete Junior High and High School. My college degrees are from SLU and LSUS. The last degree I earned was my MBA from LSUS. I have experience in HR/Recruiting, Office Management, Accounting, and Customer Service. With this wide range of experience, I have come to learn that I love recruiting! Some of my hobbies include spending time with my family and helping coach our kids in sports. I coached cheer for girls ages 5-12 for a few years while earning my MBA at LSUS. I have a passion for helping and coaching, which I believe plays a big role with my passion for recruiting. I look forward to continuing the recruiting journey and see where it takes me.',
        phone: '(504) 883-8714',
        address: '195 Greenbrier Blvd, Suite 101, Covington, LA, 70433',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'I\'m originally from the New Orleans, Louisiana area. I moved to Folsom, Louisiana to complete Junior High and High School. My college degrees are from SLU and LSUS. The last degree I earned was my MBA from LSUS. I have experience in HR/Recruiting, Office Management, Accounting, and Customer Service. With this wide range of experience, I have come to learn that I love recruiting! Some of my hobbies include spending time with my family and helping coach our kids in sports. I coached cheer for girls ages 5-12 for a few years while earning my MBA at LSUS. I have a passion for helping and coaching, which I believe plays a big role with my passion for recruiting. I look forward to continuing the recruiting journey and see where it takes me.',
        about: 'I\'m originally from the New Orleans, Louisiana area. I moved to Folsom, Louisiana to complete Junior High and High School. My college degrees are from SLU and LSUS. The last degree I earned was my MBA from LSUS. I have experience in HR/Recruiting, Office Management, Accounting, and Customer Service. With this wide range of experience, I have come to learn that I love recruiting! Some of my hobbies include spending time with my family and helping coach our kids in sports. I coached cheer for girls ages 5-12 for a few years while earning my MBA at LSUS. I have a passion for helping and coaching, which I believe plays a big role with my passion for recruiting. I look forward to continuing the recruiting journey and see where it takes me.',
        albums: [],
        jobs: []
      }
    ],
    reviews: [
      {
        date: '20-06-2023',
        title: 'Very impressed!',
        author: 'Jessica S., LPN New Orleans, LA',
        content: 'I got the fastest response and acceptance! I have been so tired of being submitted and never hearing back from other agencies. I was credentialed and submitted so fast and I was kept in communication. My recruiter follows up regularly and asks how I\'m doing and always responds so fast.'
      },
      {
        date: '27-03-2023',
        title: '',
        author: 'Trish Sissac',
        content: ''
      }
    ],
    jobs: [
      { title: 'RN - Med/Surg', specialty: 'MedSurg', location: 'Newnan, GA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Johnson City, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - Med/Surg', specialty: 'MedSurg', location: 'Kingsport, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Johnson City, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Johnson City, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - Med/Surg', specialty: 'MedSurg', location: 'Newnan, GA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Johnson City, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Roanoke, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - Med/Surg', specialty: 'MedSurg', location: 'Kingsport, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Roanoke, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Johnson City, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Johnson City, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Cartersvile, GA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - ER', specialty: 'Emergency Room', location: 'Conyers, GA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - TEL', specialty: 'Tele', location: 'Augusta, GA', startDate: 'Starts: ASAP', endDate: '' }
    ],
    albums: []
  },
  'flexcare': {
    id: 'flexcare',
    name: 'FlexCare',
    website: 'http://www.flexcarestaff.com',
    phone: '(866) 564-3589',
    address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
    jobApplicationEmail: 'rncandidates@flexcarestaff.com',
    logo: 'https://static.thegypsynurse.com/2025/08/FlexCare-Logo-300x300.png.webp',
    overview: 'At FlexCare, we\'re here for the people behind patient care: travel nurses, allied health professionals, and therapists who show up every day for patients across the country. We started in 2006 with one goal: to do travel healthcare differently. That meant more transparency, better support, and real relationships. From the start, we believed clinicians deserve the same level of care and commitment they give to their patients. Over 300,000 clinicians and more than 3,300 healthcare facilities later, our focus remains the same. An experience where clinicians feel heard, respected, and supported. FlexCare is proud to be a trusted partner to both clinicians and healthcare leaders. For travelers, we offer flexibility, advocacy, and support to build a career on your terms. Whether you\'re chasing new experiences or long-term stability, we\'re with you every step of the way. With our Pay Package Peace of Mind, you can trust that what you see is what you get. Our S1ngle Point of Contact model ensures clear, consistent communication, and our Award-Winning Team That Goes Above & Beyond provides the guidance and support you deserve. For healthcare organizations, we deliver top-tier clinical talent, along with the insight and partnership needed to solve complex workforce challenges. We lead with trust, move with urgency, and never lose sight of the human impact of our work. That\'s why our partners stay, and why our clinicians thrive.',
    aboutUs: 'At FlexCare, we\'re here for the people behind patient care: travel nurses, allied health professionals, and therapists who show up every day for patients across the country. We started in 2006 with one goal: to do travel healthcare differently. That meant more transparency, better support, and real relationships. From the start, we believed clinicians deserve the same level of care and commitment they give to their patients. Over 300,000 clinicians and more than 3,300 healthcare facilities later, our focus remains the same. An experience where clinicians feel heard, respected, and supported. FlexCare is proud to be a trusted partner to both clinicians and healthcare leaders. For travelers, we offer flexibility, advocacy, and support to build a career on your terms. Whether you\'re chasing new experiences or long-term stability, we\'re with you every step of the way. With our Pay Package Peace of Mind, you can trust that what you see is what you get. Our S1ngle Point of Contact model ensures clear, consistent communication, and our Award-Winning Team That Goes Above & Beyond provides the guidance and support you deserve. For healthcare organizations, we deliver top-tier clinical talent, along with the insight and partnership needed to solve complex workforce challenges. We lead with trust, move with urgency, and never lose sight of the human impact of our work. That\'s why our partners stay, and why our clinicians thrive.',
    benefits: [
      'Agency Housing',
      'Housing Stipend',
      'Meals and Incidentals',
      'Rental Car Payment',
      'Paid Time Off',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance',
      'Certification Reimbursement',
      '401K',
      'License Reimbursement',
      'Workers Compensation',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    recruiters: [
      {
        id: 'ashley-clegg',
        name: 'Ashley Clegg',
        image: 'https://static.thegypsynurse.com/2025/08/Ashley-Clegg-Headshot-300x300.jpg.webp',
        phone: '(866) 564-3589',
        address: '',
        website: '',
        description: 'My name is Ashley have been in the Allied recruiting world at FlexCare for the past two years, matching awesome talent with even better assignments! When I am not busy making your career dreams come true, I hang out with my two spoiled cats, Olive and Martini — yes, they\'re as classy as they sound.',
        overview: 'My name is Ashley have been in the Allied recruiting world at FlexCare for the past two years, matching awesome talent with even better assignments! When I am not busy making your career dreams come true, I hang out with my two spoiled cats, Olive and Martini — yes, they\'re as classy as they sound.',
        about: 'My name is Ashley have been in the Allied recruiting world at FlexCare for the past two years, matching awesome talent with even better assignments! When I am not busy making your career dreams come true, I hang out with my two spoiled cats, Olive and Martini — yes, they\'re as classy as they sound.',
        albums: [],
        jobs: []
      },
      {
        id: 'bailey-pollak',
        name: 'Bailey Pollak',
        image: 'https://static.thegypsynurse.com/2025/08/Bailey-Pollak-Headshot-150x150.jpg',
        phone: '(866) 564-3589',
        address: '',
        website: '',
        description: 'Hi, I\'m Bailey! I\'ve been a recruiter with FlexCare for over three years and love helping nurses find assignments that match their goals and lifestyle. I focus on building real relationships, listening to what matters most, and making the process simple and transparent. Whether you\'re new to traveling or experienced, my goal is to take the stress off your plate so you can focus on what you do best, caring for patients. When I\'m not helping nurses land their dream jobs, I enjoy spending time with family and friends, being outdoors, reading, and catching a happy hour. Let\'s find your next adventure together!',
        overview: 'Hi, I\'m Bailey! I\'ve been a recruiter with FlexCare for over three years and love helping nurses find assignments that match their goals and lifestyle. I focus on building real relationships, listening to what matters most, and making the process simple and transparent. Whether you\'re new to traveling or experienced, my goal is to take the stress off your plate so you can focus on what you do best, caring for patients. When I\'m not helping nurses land their dream jobs, I enjoy spending time with family and friends, being outdoors, reading, and catching a happy hour. Let\'s find your next adventure together!',
        about: 'Hi, I\'m Bailey! I\'ve been a recruiter with FlexCare for over three years and love helping nurses find assignments that match their goals and lifestyle. I focus on building real relationships, listening to what matters most, and making the process simple and transparent. Whether you\'re new to traveling or experienced, my goal is to take the stress off your plate so you can focus on what you do best, caring for patients. When I\'m not helping nurses land their dream jobs, I enjoy spending time with family and friends, being outdoors, reading, and catching a happy hour. Let\'s find your next adventure together!',
        albums: [],
        jobs: []
      },
      {
        id: 'devon-golden',
        name: 'DeVon Golden',
        image: 'https://static.thegypsynurse.com/2025/08/DeVon-Golden-Headshot-150x150.jpg.webp',
        phone: '(916) 537-4202',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80175',
        description: 'With over 7 years of professional experience, currently contributing to FlexCare as an Allied Senior Recruiter, blending leadership and teamwork to support talent acquisition efforts. Alongside this, actively coaching as a Pitching Coach at Golden Arm, leveraging open communication and mentoring skills to develop athletes. Passionate about fostering collaboration and empowering teams, combining recruitment expertise with coaching insights to drive impactful results. Dedicated to aligning with organizational values and creating growth opportunities for individuals and teams alike. I recently got my open water scuba diving certification and love exploring warm ocean waters.',
        overview: 'With over 7 years of professional experience, currently contributing to FlexCare as an Allied Senior Recruiter, blending leadership and teamwork to support talent acquisition efforts. Alongside this, actively coaching as a Pitching Coach at Golden Arm, leveraging open communication and mentoring skills to develop athletes. Passionate about fostering collaboration and empowering teams, combining recruitment expertise with coaching insights to drive impactful results. Dedicated to aligning with organizational values and creating growth opportunities for individuals and teams alike. I recently got my open water scuba diving certification and love exploring warm ocean waters.',
        about: 'With over 7 years of professional experience, currently contributing to FlexCare as an Allied Senior Recruiter, blending leadership and teamwork to support talent acquisition efforts. Alongside this, actively coaching as a Pitching Coach at Golden Arm, leveraging open communication and mentoring skills to develop athletes. Passionate about fostering collaboration and empowering teams, combining recruitment expertise with coaching insights to drive impactful results. Dedicated to aligning with organizational values and creating growth opportunities for individuals and teams alike. I recently got my open water scuba diving certification and love exploring warm ocean waters.',
        albums: [],
        jobs: []
      },
      {
        id: 'hannah-difelice',
        name: 'Hannah DiFelice',
        image: 'https://static.thegypsynurse.com/2025/08/Hannah-DeFelice-Headshot-150x150.jpg.webp',
        phone: '(980) 265-3983',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80187',
        description: 'Hi, I\'m Hannah! I am an Executive Healthcare Recruiter with FlexCare! I\'m a go getter who genuinely loves working with Registered Nurses. Building strong, lasting relationships with my nurses is at the heart of what I do. I\'m here to help you reach your personal and professional goals and I\'m going to work incredibly hard to make that happen. You can count on me to be as responsive and communicative as possible, because I believe a seamless, stress-free experience starts with trust and connection. I am excited to work with you!',
        overview: 'Hi, I\'m Hannah! I am an Executive Healthcare Recruiter with FlexCare! I\'m a go getter who genuinely loves working with Registered Nurses. Building strong, lasting relationships with my nurses is at the heart of what I do. I\'m here to help you reach your personal and professional goals and I\'m going to work incredibly hard to make that happen. You can count on me to be as responsive and communicative as possible, because I believe a seamless, stress-free experience starts with trust and connection. I am excited to work with you!',
        about: 'Hi, I\'m Hannah! I am an Executive Healthcare Recruiter with FlexCare! I\'m a go getter who genuinely loves working with Registered Nurses. Building strong, lasting relationships with my nurses is at the heart of what I do. I\'m here to help you reach your personal and professional goals and I\'m going to work incredibly hard to make that happen. You can count on me to be as responsive and communicative as possible, because I believe a seamless, stress-free experience starts with trust and connection. I am excited to work with you!',
        albums: [],
        jobs: []
      },
      {
        id: 'jessica-watson',
        name: 'Jessica Watson',
        image: 'https://static.thegypsynurse.com/2025/08/Jessica-Watson-Headshot-150x150.jpg.webp',
        phone: '(916) 460-9761',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80181',
        description: 'Hi there! My name is Jessica, and I am a nursing recruiter at FlexCare! I have been with the company for a little over 3 years now, and it has been an absolute blast helping qualified clinicians find amazing assignments throughout the country. I pride myself in understanding that we are all individuals and have specific personal and professional goals. Being able to help the nurses I work with achieve such goals is rewarding, and I genuinely love what I do. Getting the opportunity to work with some amazing individuals along the way, while building strong working relationships is something I personally strive for. I look forward to working with you!!',
        overview: 'Hi there! My name is Jessica, and I am a nursing recruiter at FlexCare! I have been with the company for a little over 3 years now, and it has been an absolute blast helping qualified clinicians find amazing assignments throughout the country. I pride myself in understanding that we are all individuals and have specific personal and professional goals. Being able to help the nurses I work with achieve such goals is rewarding, and I genuinely love what I do. Getting the opportunity to work with some amazing individuals along the way, while building strong working relationships is something I personally strive for. I look forward to working with you!!',
        about: 'Hi there! My name is Jessica, and I am a nursing recruiter at FlexCare! I have been with the company for a little over 3 years now, and it has been an absolute blast helping qualified clinicians find amazing assignments throughout the country. I pride myself in understanding that we are all individuals and have specific personal and professional goals. Being able to help the nurses I work with achieve such goals is rewarding, and I genuinely love what I do. Getting the opportunity to work with some amazing individuals along the way, while building strong working relationships is something I personally strive for. I look forward to working with you!!',
        albums: [],
        jobs: []
      },
      {
        id: 'kaela-randolph',
        name: 'Kaela Randolph',
        image: 'https://static.thegypsynurse.com/2025/08/Kaela-Randolf-Headshot-150x150.png.webp',
        phone: '(916) 341-9650',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80182',
        description: 'Kaela | Senior Allied Recruiter Experienced and driven Senior Allied Recruiter with a passion for connecting skilled professionals with rewarding opportunities. I bring a strategic, people-first approach to recruitment and thrive in fast-paced environments. Outside of work, I stay energized through fitness, paddle boarding, travel, and the occasional reality TV binge. Always committed to excellence both in work and in life.',
        overview: 'Kaela | Senior Allied Recruiter Experienced and driven Senior Allied Recruiter with a passion for connecting skilled professionals with rewarding opportunities. I bring a strategic, people-first approach to recruitment and thrive in fast-paced environments. Outside of work, I stay energized through fitness, paddle boarding, travel, and the occasional reality TV binge. Always committed to excellence both in work and in life.',
        about: 'Kaela | Senior Allied Recruiter Experienced and driven Senior Allied Recruiter with a passion for connecting skilled professionals with rewarding opportunities. I bring a strategic, people-first approach to recruitment and thrive in fast-paced environments. Outside of work, I stay energized through fitness, paddle boarding, travel, and the occasional reality TV binge. Always committed to excellence both in work and in life.',
        albums: [],
        jobs: []
      },
      {
        id: 'kailey-blair',
        name: 'Kailey Blair',
        image: 'https://static.thegypsynurse.com/2025/08/Kailey-Blair-Headshot-1-150x150.jpg.webp',
        phone: '(916) 547-2416',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80183',
        description: 'Hi, I am Kailey! As a dedicated recruiter with FlexCare, I\'m passionate about helping nurses find opportunities that align with their goals and dreams. I take pride in building genuine relationships and being a trusted partner throughout every step of their travel journey. Whether it\'s finding the perfect assignment or offering support along the way, I\'m here to make sure every nurse feels valued, heard, and empowered. Helping others succeed is more than a job, it\'s what I love to do.',
        overview: 'Hi, I am Kailey! As a dedicated recruiter with FlexCare, I\'m passionate about helping nurses find opportunities that align with their goals and dreams. I take pride in building genuine relationships and being a trusted partner throughout every step of their travel journey. Whether it\'s finding the perfect assignment or offering support along the way, I\'m here to make sure every nurse feels valued, heard, and empowered. Helping others succeed is more than a job, it\'s what I love to do.',
        about: 'Hi, I am Kailey! As a dedicated recruiter with FlexCare, I\'m passionate about helping nurses find opportunities that align with their goals and dreams. I take pride in building genuine relationships and being a trusted partner throughout every step of their travel journey. Whether it\'s finding the perfect assignment or offering support along the way, I\'m here to make sure every nurse feels valued, heard, and empowered. Helping others succeed is more than a job, it\'s what I love to do.',
        albums: [],
        jobs: []
      },
      {
        id: 'kimmie-baker',
        name: 'Kimmie Baker',
        image: 'https://static.thegypsynurse.com/2025/08/Kimmie-Baker-Headshot-150x150.jpg.webp',
        phone: '(916) 288-8965',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80184',
        description: 'Hi, I\'m Kimmie! For the past 4 years, I\'ve worked as an Allied Health Recruiter, helping travel clinicians find assignments that fit not only their career goals but also their lifestyle. I love connecting with people, learning what drives them, and matching them with opportunities where they can truly shine. When I\'m not recruiting, you\'ll probably find me training for an endurance run, lifting at the gym, hanging out with my family and dogs, or exploring new cities—especially if they have a local distillery where I can try a new whisky!',
        overview: 'Hi, I\'m Kimmie! For the past 4 years, I\'ve worked as an Allied Health Recruiter, helping travel clinicians find assignments that fit not only their career goals but also their lifestyle. I love connecting with people, learning what drives them, and matching them with opportunities where they can truly shine. When I\'m not recruiting, you\'ll probably find me training for an endurance run, lifting at the gym, hanging out with my family and dogs, or exploring new cities—especially if they have a local distillery where I can try a new whisky!',
        about: 'Hi, I\'m Kimmie! For the past 4 years, I\'ve worked as an Allied Health Recruiter, helping travel clinicians find assignments that fit not only their career goals but also their lifestyle. I love connecting with people, learning what drives them, and matching them with opportunities where they can truly shine. When I\'m not recruiting, you\'ll probably find me training for an endurance run, lifting at the gym, hanging out with my family and dogs, or exploring new cities—especially if they have a local distillery where I can try a new whisky!',
        albums: [],
        jobs: []
      },
      {
        id: 'robyn-ramsey',
        name: 'Robyn Ramsey',
        image: 'https://static.thegypsynurse.com/2025/08/Robyn-Ramsey-Headshot-150x150.jpg.webp',
        phone: '(916) 341-9723',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80176',
        description: 'Hi, my name is Robyn, nursing was my background and now I\'m enjoying matching the right jobs for travel nurses! I have been working as a RN recruiter for 4 years now and at FlexCare we work with 97% of the facilities all over the U.S. I enjoy working as a team with nurses and facilities to make sure the position is a great fit for all. I am here to offer support through the entire process and help answer any questions you may have.',
        overview: 'Hi, my name is Robyn, nursing was my background and now I\'m enjoying matching the right jobs for travel nurses! I have been working as a RN recruiter for 4 years now and at FlexCare we work with 97% of the facilities all over the U.S. I enjoy working as a team with nurses and facilities to make sure the position is a great fit for all. I am here to offer support through the entire process and help answer any questions you may have.',
        about: 'Hi, my name is Robyn, nursing was my background and now I\'m enjoying matching the right jobs for travel nurses! I have been working as a RN recruiter for 4 years now and at FlexCare we work with 97% of the facilities all over the U.S. I enjoy working as a team with nurses and facilities to make sure the position is a great fit for all. I am here to offer support through the entire process and help answer any questions you may have.',
        albums: [],
        jobs: []
      },
      {
        id: 'sarah-johnston',
        name: 'Sarah Johnston',
        image: 'https://static.thegypsynurse.com/2025/08/Sarah-Johnston-Headshot-150x150.jpg.webp',
        phone: '(279) 214-0041',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80185',
        description: 'As a Senior Executive Allied Recruiter with 2.5 years of experience, my priority is making sure clinicians feel supported, heard, and valued throughout their travel journey. I take the time to understand your goals; whether it\'s exploring new locations, growing your skills, or finding a contract that fits your lifestyle and work hard to match you with the right opportunities. My goal isn\'t just to place you in a job, but to be a partner you can rely on every step of the way. I\'m committed to transparency, open communication, and making your experience as smooth and rewarding as possible. I look forward to working with you.',
        overview: 'As a Senior Executive Allied Recruiter with 2.5 years of experience, my priority is making sure clinicians feel supported, heard, and valued throughout their travel journey. I take the time to understand your goals; whether it\'s exploring new locations, growing your skills, or finding a contract that fits your lifestyle and work hard to match you with the right opportunities. My goal isn\'t just to place you in a job, but to be a partner you can rely on every step of the way. I\'m committed to transparency, open communication, and making your experience as smooth and rewarding as possible. I look forward to working with you.',
        about: 'As a Senior Executive Allied Recruiter with 2.5 years of experience, my priority is making sure clinicians feel supported, heard, and valued throughout their travel journey. I take the time to understand your goals; whether it\'s exploring new locations, growing your skills, or finding a contract that fits your lifestyle and work hard to match you with the right opportunities. My goal isn\'t just to place you in a job, but to be a partner you can rely on every step of the way. I\'m committed to transparency, open communication, and making your experience as smooth and rewarding as possible. I look forward to working with you.',
        albums: [],
        jobs: []
      }
    ],
    reviews: [],
    jobs: [
      { title: 'Healthcare Travel Assignment: Travel Stepdown in Indianapolis, IN - $1682.02/wk', specialty: 'Stepdown', location: 'Indianapolis, IN', startDate: 'Starts: January 5, 2026', endDate: 'Ends: April 6, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Labor and Delivery in San Leandro, CA - $3254.16/wk', specialty: 'Labor & Delivery', location: 'San Leandro, CA', startDate: 'Starts: December 29, 2025', endDate: 'Ends: March 30, 2026' },
      { title: 'Healthcare Travel Assignment: Travel ICU in Anchorage, AK - $2984.48/wk', specialty: 'ICU', location: 'Anchorage, AK', startDate: 'Starts: December 1, 2025', endDate: 'Ends: March 2, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Med/Surg in Richmond, VA - $1877.90/wk', specialty: 'MedSurg', location: 'Richmond, VA', startDate: 'Starts: December 1, 2025', endDate: 'Ends: March 2, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Labor and Delivery in Asheville, NC - $2355.08/wk', specialty: 'Labor & Delivery', location: 'Asheville, NC', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Med/Surg in Mayfield, KY - $1750.50/wk', specialty: 'MedSurg', location: 'Mayfield, KY', startDate: 'Starts: December 1, 2025', endDate: 'Ends: March 2, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Med/Surg in Richmond, VA - $1877.90/wk', specialty: 'MedSurg', location: 'Richmond, VA', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Med/Surg in Richmond, VA - $1877.90/wk', specialty: 'MedSurg', location: 'Richmond, VA', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Healthcare Travel Assignment: Travel ICU in Elizabeth City, NC - $2090.92/wk', specialty: 'ICU', location: 'Elizabeth City, NC', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 23, 2026' },
      { title: 'Healthcare Travel Assignment: Travel ICU in Elizabeth City, NC - $2090.92/wk', specialty: 'ICU', location: 'Elizabeth City, NC', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 23, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Labor and Delivery in Framingham, MA - $2539.16/wk', specialty: 'Labor & Delivery', location: 'Framingham, MA', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Telemetry in Salisbury, MD - $1971.40/wk', specialty: 'Tele', location: 'Salisbury, MD', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Telemetry in Salisbury, MD - $1971.40/wk', specialty: 'Tele', location: 'Salisbury, MD', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Healthcare Travel Assignment: Travel Med/Surg in Atlanta, GA - $1573.96/wk', specialty: 'MedSurg', location: 'Atlanta, GA', startDate: 'Starts: January 12, 2026', endDate: 'Ends: April 13, 2026' },
      { title: 'Healthcare Travel Assignment: Travel ICU in Gallatin, TN - $1687.90/wk', specialty: 'ICU', location: 'Gallatin, TN', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' }
    ],
    albums: []
  },
  'titan-medical-group': {
    id: 'titan-medical-group',
    name: 'Titan Medical Group',
    website: 'http://www.titanmed.com/',
    phone: '(866) 332-9600',
    address: '2110 S 169th, Plaza #100, Omaha, NE, 68130',
    jobApplicationEmail: 'gypsyapp@titanmed.com',
    logo: 'https://static.thegypsynurse.com/2023/11/titan.webp',
    overview: 'Your best interest is our best interest. We offer our clients the best in traveling medical professionals. The only way we can attract and maintain a good relationship with those professionals is to keep their best interests in mind. After all, our success relies on your success. That\'s why we always put your best interests in mind—from superior placements to finding great living accommodations and negotiating a fair price to providing the tools you need for success. In 2001, Brian Wilke founded Titan Medical in Omaha, Nebraska. Since then, we\'ve become one of the top healthcare staffing agencies in the Midwest because of our uncompromising values and our dedication to filling positions with the best healthcare professionals available. Those professionals include the best in the fields of nursing and allied health, and they work at a variety of healthcare institutions—from leading national and regional medical centers to traditional hospitals, specialty care clinics and other centers of care. Do you have the values of a Titan? At Titan Medical, we hold ourselves to the highest standards. We deliver on our promises, and we expect the same from the talent we place into professional positions. Our company is based on a few core values. We don\'t cut corners. We do the job right the first time. We do it to our best ability. We strive for nothing less than perfection. This is always what\'s best in the long term, even if it could be easier in the short term. We do what we say we\'re going to do. If we say we\'re going to do something, it gets done—as fast and as close to perfect as possible. Making promises is easy. Keeping promises takes hard work. But working hard is what we do. We work hard. No excuses. Doing the job right takes a lot of work. We don\'t back down. We roll up our sleeves and dig in—as individuals and as a team. Services Find the right place. Titan Medical has placed traveling nurses and allied health professionals across the nation for more than 15 years. We\'re confident we can place you, too. Our assignment opportunities cover numerous degrees and certifications, and they\'re available in a variety of locations—from large metropolitan areas to more remote towns. When it comes to placing healthcare professionals, you won\'t find many other companies with more experience and a larger portfolio of assignments.',
    aboutUs: 'Your best interest is our best interest. We offer our clients the best in traveling medical professionals. The only way we can attract and maintain a good relationship with those professionals is to keep their best interests in mind. After all, our success relies on your success. That\'s why we always put your best interests in mind—from superior placements to finding great living accommodations and negotiating a fair price to providing the tools you need for success. In 2001, Brian Wilke founded Titan Medical in Omaha, Nebraska. Since then, we\'ve become one of the top healthcare staffing agencies in the Midwest because of our uncompromising values and our dedication to filling positions with the best healthcare professionals available. Those professionals include the best in the fields of nursing and allied health, and they work at a variety of healthcare institutions—from leading national and regional medical centers to traditional hospitals, specialty care clinics and other centers of care. Do you have the values of a Titan? At Titan Medical, we hold ourselves to the highest standards. We deliver on our promises, and we expect the same from the talent we place into professional positions. Our company is based on a few core values. We don\'t cut corners. We do the job right the first time. We do it to our best ability. We strive for nothing less than perfection. This is always what\'s best in the long term, even if it could be easier in the short term. We do what we say we\'re going to do. If we say we\'re going to do something, it gets done—as fast and as close to perfect as possible. Making promises is easy. Keeping promises takes hard work. But working hard is what we do. We work hard. No excuses. Doing the job right takes a lot of work. We don\'t back down. We roll up our sleeves and dig in—as individuals and as a team. Services Find the right place. Titan Medical has placed traveling nurses and allied health professionals across the nation for more than 15 years. We\'re confident we can place you, too. Our assignment opportunities cover numerous degrees and certifications, and they\'re available in a variety of locations—from large metropolitan areas to more remote towns. When it comes to placing healthcare professionals, you won\'t find many other companies with more experience and a larger portfolio of assignments.',
    benefits: [
      'Paid Time Off',
      'Health Insurance',
      '401K',
      'License Reimbursement',
      'Continuing Education',
      'Referral Bonuses'
    ],
    reviews: [
      {
        date: '10-09-2022',
        title: 'CT Tech',
        author: 'Carla McCarthy, Travel Tech Pennsylvania',
        content: 'I Love this company, the entire team works well together. They helped me get a job in Florida, quickly, when my father was diagnosed with cancer. Everyone is so very supportive. The pay is exactly what it is, no funny business and they break it down for you. Titan offers what many other companies do, I stay with them because I feel as if I am part of the Titan family. I am so happy where I am for the first time, and I have been a CT Tech for 20 years. I recommend Titan to everyone!'
      }
    ],
    jobs: [
      { title: 'Med Surg', specialty: 'MedSurg', location: 'Charlotte, NC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Cath Lab RN', specialty: 'Cath Lab', location: 'Rolla, MO', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'CVOR', specialty: 'CVOR', location: 'Milwaukee, WI', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Cath Lab RN', specialty: 'Cath Lab', location: 'Milwaukee, WI', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Med Surg', specialty: 'MedSurg', location: 'Aiken, SC', startDate: 'Starts: October 20, 2025', endDate: '' },
      { title: 'L&D', specialty: 'Labor & Delivery', location: 'Rapid City, SD', startDate: 'Starts: November 17, 2025', endDate: '' },
      { title: 'NICU', specialty: 'NICU', location: 'Shawnee Mission, KS', startDate: 'Starts: November 3, 2025', endDate: '' },
      { title: 'Home Health', specialty: 'Home Health', location: 'San Marcos, CA', startDate: 'Starts: October 13, 2025', endDate: '' },
      { title: 'L&D', specialty: 'Labor & Delivery', location: 'Springfield, TN', startDate: 'Starts: October 7, 2025', endDate: '' },
      { title: 'L&D', specialty: 'Labor & Delivery', location: 'San Antonio, TX', startDate: 'Starts: November 3, 2025', endDate: '' },
      { title: 'ICU', specialty: 'ICU', location: 'Dothan, AL', startDate: 'Starts: October 27, 2025', endDate: '' },
      { title: 'OR', specialty: 'Operating Room', location: 'Goodyear, AZ', startDate: 'Starts: October 27, 2025', endDate: '' },
      { title: 'ER', specialty: 'Emergency Room', location: 'Riverside, CA', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Stepdown', specialty: 'Stepdown', location: 'Shreveport, LA', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'ER', specialty: 'Emergency Room', location: 'Hyannis, MA', startDate: 'Starts: November 24, 2025', endDate: '' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'alisha-buna',
        name: 'Alisha Buna',
        image: 'https://static.thegypsynurse.com/2022/10/1-300x300.png.webp',
        phone: '(866) -33-2-96001157',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46151',
        description: 'Hello! My name is Alisha and I am a CNA/LPN Recruiter with Titan Medical! I have been with Titan for almost 2 years now and absolutely love my job! I live in Omaha, NE. I enjoy traveling, walking and Fall! I love getting to know my travelers and finding the best assignment for them! I hope to get to know you and find the best assignment for you!',
        overview: 'Hello! My name is Alisha and I am a CNA/LPN Recruiter with Titan Medical! I have been with Titan for almost 2 years now and absolutely love my job! I live in Omaha, NE. I enjoy traveling, walking and Fall! I love getting to know my travelers and finding the best assignment for them! I hope to get to know you and find the best assignment for you!',
        about: 'Hello! My name is Alisha and I am a CNA/LPN Recruiter with Titan Medical! I have been with Titan for almost 2 years now and absolutely love my job! I live in Omaha, NE. I enjoy traveling, walking and Fall! I love getting to know my travelers and finding the best assignment for them! I hope to get to know you and find the best assignment for you!',
        albums: [],
        jobs: []
      },
      {
        id: 'amanda-jobe',
        name: 'Amanda Jobe',
        image: 'https://static.thegypsynurse.com/2022/11/profile-pic-1-300x300.jpg.webp',
        phone: '(402) 332--52001252',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46152',
        description: 'Amanda Jobe Nursing Recruiter Titan Medical Group Text: (402) 389-3289 Call: (402) 332-5200 ext. 1252',
        overview: 'Amanda Jobe Nursing Recruiter Titan Medical Group Text: (402) 389-3289 Call: (402) 332-5200 ext. 1252',
        about: 'Amanda Jobe Nursing Recruiter Titan Medical Group Text: (402) 389-3289 Call: (402) 332-5200 ext. 1252',
        albums: [],
        jobs: []
      },
      {
        id: 'bailey-bennett',
        name: 'Bailey Bennett',
        image: 'https://static.thegypsynurse.com/2022/10/2-295x300.png.webp',
        phone: '(866) -33-2-96001071',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46153',
        description: 'I\'ve been recruiting with Titan Medical Group for 3 years. I originally worked with RNs but for the last 2 years I have been working specifically with LPNs and CNAs and have loved every minute of it!',
        overview: 'I\'ve been recruiting with Titan Medical Group for 3 years. I originally worked with RNs but for the last 2 years I have been working specifically with LPNs and CNAs and have loved every minute of it!',
        about: 'I\'ve been recruiting with Titan Medical Group for 3 years. I originally worked with RNs but for the last 2 years I have been working specifically with LPNs and CNAs and have loved every minute of it!',
        albums: [],
        jobs: []
      },
      {
        id: 'brandon-thunn',
        name: 'Brandon Thunn',
        image: 'https://static.thegypsynurse.com/2022/10/3-2-300x300.jpg.webp',
        phone: '(866) -33-2-96001174',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46154',
        description: 'Titan Medical is a privately owned medical staffing company located in Omaha, NE. I strive to find you the most elite assignments that are tailored to you.',
        overview: 'Titan Medical is a privately owned medical staffing company located in Omaha, NE. I strive to find you the most elite assignments that are tailored to you.',
        about: 'Titan Medical is a privately owned medical staffing company located in Omaha, NE. I strive to find you the most elite assignments that are tailored to you.',
        albums: [],
        jobs: []
      },
      {
        id: 'cadence-hollers',
        name: 'Cadence Hollers',
        image: 'https://static.thegypsynurse.com/2022/10/4-2-300x300.jpg.webp',
        phone: '(866) -33-2-9600 ext1093',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46155',
        description: 'I\'m a dynamic individual with the ability to work effectively and efficiently in varying environments while recognizing opportunities and implementing solutions, through excellent interpersonal communication skills and an extraordinary work ethic. Through my relationship skills, I establish credibility and gain the trust of others by consistently delivering and providing.',
        overview: 'I\'m a dynamic individual with the ability to work effectively and efficiently in varying environments while recognizing opportunities and implementing solutions, through excellent interpersonal communication skills and an extraordinary work ethic. Through my relationship skills, I establish credibility and gain the trust of others by consistently delivering and providing.',
        about: 'I\'m a dynamic individual with the ability to work effectively and efficiently in varying environments while recognizing opportunities and implementing solutions, through excellent interpersonal communication skills and an extraordinary work ethic. Through my relationship skills, I establish credibility and gain the trust of others by consistently delivering and providing.',
        albums: [],
        jobs: []
      },
      {
        id: 'jeff-misiolek',
        name: 'Jeff Misiolek',
        image: 'https://static.thegypsynurse.com/2022/10/7-3-300x300.jpg.webp',
        phone: '(866) -33-2-9600 ext. 1187',
        address: '17225 Burt St., Omaha, NE, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46199',
        description: 'I have been a CNA/LPN recruiter at Titan for over a year. Titan Medical is the best company I have ever worked for, and I enjoy every single minute of it. I spend most of my free time chasing after my 4 kids aged 8 months to 9 years!',
        overview: 'I have been a CNA/LPN recruiter at Titan for over a year. Titan Medical is the best company I have ever worked for, and I enjoy every single minute of it. I spend most of my free time chasing after my 4 kids aged 8 months to 9 years!',
        about: 'I have been a CNA/LPN recruiter at Titan for over a year. Titan Medical is the best company I have ever worked for, and I enjoy every single minute of it. I spend most of my free time chasing after my 4 kids aged 8 months to 9 years!',
        albums: [],
        jobs: []
      },
      {
        id: 'kari-swanson',
        name: 'Kari Swanson',
        image: 'https://static.thegypsynurse.com/2022/10/5-2-283x300.jpg.webp',
        phone: '(866) -33-2-96001250',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46156',
        description: 'I\'m a dynamic individual with the ability to work effectively in diverse environments while identifying opportunities and implementing solutions, through excellent interpersonal communication skills and an outstanding work ethic. Through my relationship skills, I establish credibility and gain the trust of others by consistently delivering.',
        overview: 'I\'m a dynamic individual with the ability to work effectively in diverse environments while identifying opportunities and implementing solutions, through excellent interpersonal communication skills and an outstanding work ethic. Through my relationship skills, I establish credibility and gain the trust of others by consistently delivering.',
        about: 'I\'m a dynamic individual with the ability to work effectively in diverse environments while identifying opportunities and implementing solutions, through excellent interpersonal communication skills and an outstanding work ethic. Through my relationship skills, I establish credibility and gain the trust of others by consistently delivering.',
        albums: [],
        jobs: []
      },
      {
        id: 'kate-trerice',
        name: 'Kate Trerice',
        image: 'https://static.thegypsynurse.com/2022/10/1-2-300x300.jpg.webp',
        phone: '(866) -33-2-96001254',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46150',
        description: 'Hi! My name is Kate. I was born and raised in Omaha, Nebraska. I went on to attended Iowa State University receiving a BS in Kinesiology in 2008. I have always had a passion for medicine, as my grandfather was a pharmacist during World War II. He helped research and developed drugs throughout his pharmaceutical career. I played sports my whole life, and then in high school receiving injuries that ended my athletic career. This ultimately is how I found myself working in athletics and medicine. My love for healthcare continued to blossom from there! I worked as a Head Athletic Trainer in Omaha Public Schools for 12 years before deciding that I wanted to see what else the world had to offer. I know am I new to this career, but I\'m nowhere close to being new to healthcare. I have cared for student athletes for over a decade and know what it takes to be a successful caretaker! I truly believe that because of my experiences, I would be an asset to any nurse who is looking to travel. I would look after my travelers as I have my athletes… providing them with TOP OF THE LINE service and compassion. I would love to be able to support you through your journey in Travel Nursing!',
        overview: 'Hi! My name is Kate. I was born and raised in Omaha, Nebraska. I went on to attended Iowa State University receiving a BS in Kinesiology in 2008. I have always had a passion for medicine, as my grandfather was a pharmacist during World War II. He helped research and developed drugs throughout his pharmaceutical career. I played sports my whole life, and then in high school receiving injuries that ended my athletic career. This ultimately is how I found myself working in athletics and medicine. My love for healthcare continued to blossom from there! I worked as a Head Athletic Trainer in Omaha Public Schools for 12 years before deciding that I wanted to see what else the world had to offer. I know am I new to this career, but I\'m nowhere close to being new to healthcare. I have cared for student athletes for over a decade and know what it takes to be a successful caretaker! I truly believe that because of my experiences, I would be an asset to any nurse who is looking to travel. I would look after my travelers as I have my athletes… providing them with TOP OF THE LINE service and compassion. I would love to be able to support you through your journey in Travel Nursing!',
        about: 'Hi! My name is Kate. I was born and raised in Omaha, Nebraska. I went on to attended Iowa State University receiving a BS in Kinesiology in 2008. I have always had a passion for medicine, as my grandfather was a pharmacist during World War II. He helped research and developed drugs throughout his pharmaceutical career. I played sports my whole life, and then in high school receiving injuries that ended my athletic career. This ultimately is how I found myself working in athletics and medicine. My love for healthcare continued to blossom from there! I worked as a Head Athletic Trainer in Omaha Public Schools for 12 years before deciding that I wanted to see what else the world had to offer. I know am I new to this career, but I\'m nowhere close to being new to healthcare. I have cared for student athletes for over a decade and know what it takes to be a successful caretaker! I truly believe that because of my experiences, I would be an asset to any nurse who is looking to travel. I would look after my travelers as I have my athletes… providing them with TOP OF THE LINE service and compassion. I would love to be able to support you through your journey in Travel Nursing!',
        albums: [],
        jobs: []
      },
      {
        id: 'kelly-bousum',
        name: 'Kelly Bousum',
        image: 'https://static.thegypsynurse.com/2022/10/6-3-300x298.jpg.webp',
        phone: '(866) -33-2-96001265',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46157',
        description: 'I have been with Titan Medical for almost a month now! I live in Omaha, NE and strive to place candidates in jobs they want to be at. Ensuring that my travelers enjoy all the benefits Titan has to offer to them is always a goal of mine. The medical field is extremely difficult & I want to make sure people are happy doing what they love and are passionate for!',
        overview: 'I have been with Titan Medical for almost a month now! I live in Omaha, NE and strive to place candidates in jobs they want to be at. Ensuring that my travelers enjoy all the benefits Titan has to offer to them is always a goal of mine. The medical field is extremely difficult & I want to make sure people are happy doing what they love and are passionate for!',
        about: 'I have been with Titan Medical for almost a month now! I live in Omaha, NE and strive to place candidates in jobs they want to be at. Ensuring that my travelers enjoy all the benefits Titan has to offer to them is always a goal of mine. The medical field is extremely difficult & I want to make sure people are happy doing what they love and are passionate for!',
        albums: [],
        jobs: []
      },
      {
        id: 'marissa-hernandez',
        name: 'Marissa Hernandez',
        image: 'https://static.thegypsynurse.com/2022/10/nong-vang-L0cbdz6_eYU-unsplash-1-900x444-1-300x300.jpg.webp',
        phone: '(866) -33-2-96001159',
        address: '17225 Burt St., Omaha, Nebraska, 68118',
        website: 'http://www.titanmed.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=46158',
        description: 'Hello, my name is Marissa Hernandez. I have been with Titan for a year and a half. I started in the credentialing department and transferred over to the recruiting side. In my "previous life" LOL, I worked as a cosmetologist for 11 years. So, working with people has always been my passion. I love the atmosphere at Titan and everyone I work with.',
        overview: 'Hello, my name is Marissa Hernandez. I have been with Titan for a year and a half. I started in the credentialing department and transferred over to the recruiting side. In my "previous life" LOL, I worked as a cosmetologist for 11 years. So, working with people has always been my passion. I love the atmosphere at Titan and everyone I work with.',
        about: 'Hello, my name is Marissa Hernandez. I have been with Titan for a year and a half. I started in the credentialing department and transferred over to the recruiting side. In my "previous life" LOL, I worked as a cosmetologist for 11 years. So, working with people has always been my passion. I love the atmosphere at Titan and everyone I work with.',
        albums: [],
        jobs: []
      }
    ]
  },
  'medical-solutions': {
    id: 'medical-solutions',
    name: 'Medical Solutions',
    website: 'https://www.medicalsolutions.com/',
    phone: '(866) 633-3548',
    address: '1010 N. 102nd Street, Suite 300, Omaha, NE, 68114',
    jobApplicationEmail: 'leads-omatic@medicalsolutions.com',
    logo: 'https://static.thegypsynurse.com/2023/01/medi.png.webp',
    overview: 'Medical Solutions is one of the nation\'s largest healthcare talent ecosystems. We connect nurses and allied health clinicians with hospitals and healthcare systems across the country. Since our beginning in 2001, Medical Solutions has grown organically, diversified our service offerings, and brought like-minded companies into our fold. In 2018, we acquired PPR Travel Nursing. Our 2019 purchase of C&A Industries was the largest acquisition in the history of the healthcare staffing industry, which expended our footprint into the allied health market. In 2022, we acquired Matchwell, to connect more clinicians and clients with local contract and per diem positions and HOST Healthcare, and in 2023, Worldwide HealthStaff Solutions. Our continued growth and expansion are supported by our partnership with Centerbridge Partners and CDPQ. Headquartered in Omaha, Nebraska, Medical Solutions now spans office locations across the U.S, coast to coast. We\'re an industry frontrunner, the third largest for healthcare staffing in the country (second largest in travel nursing and fourth largest in allied health). We\'re people who care connecting people who care, and we\'re not shy in saying we are the very best at what we do.',
    aboutUs: 'Medical Solutions is one of the nation\'s largest healthcare talent ecosystems. We connect nurses and allied health clinicians with hospitals and healthcare systems across the country. Since our beginning in 2001, Medical Solutions has grown organically, diversified our service offerings, and brought like-minded companies into our fold. In 2018, we acquired PPR Travel Nursing. Our 2019 purchase of C&A Industries was the largest acquisition in the history of the healthcare staffing industry, which expended our footprint into the allied health market. In 2022, we acquired Matchwell, to connect more clinicians and clients with local contract and per diem positions and HOST Healthcare, and in 2023, Worldwide HealthStaff Solutions. Our continued growth and expansion are supported by our partnership with Centerbridge Partners and CDPQ. Headquartered in Omaha, Nebraska, Medical Solutions now spans office locations across the U.S, coast to coast. We\'re an industry frontrunner, the third largest for healthcare staffing in the country (second largest in travel nursing and fourth largest in allied health). We\'re people who care connecting people who care, and we\'re not shy in saying we are the very best at what we do.',
    benefits: [
      'Disability Insurance',
      'Agency Housing',
      'Housing Stipend',
      'Paid Time Off',
      'Health Insurance',
      'Certification Reimbursement',
      '401K',
      'Tuition Reimbursement',
      'License Reimbursement',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'Travel ICU (Intensive Care Unit) RN (Registered Nurse) in Omaha, NE', specialty: 'ICU', location: 'Omaha, NE', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Travel ICU (Intensive Care Unit) RN (Registered Nurse) in Omaha, NE', specialty: 'ICU', location: 'Omaha, NE', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Travel ICU (Intensive Care Unit) RN (Registered Nurse) in Omaha, NE', specialty: 'ICU', location: 'Omaha, NE', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Local NICU (Neonatal Intensive Care Unit) RN (Registered Nurse) in Los Angeles, CA', specialty: 'NICU', location: 'Los Angeles, CA', startDate: 'Starts: December 8, 2025', endDate: 'Ends: March 9, 2026' },
      { title: 'Travel NICU (Neonatal Intensive Care Unit) RN (Registered Nurse) in Los Angeles, CA', specialty: 'NICU', location: 'Los Angeles, CA', startDate: 'Starts: December 8, 2025', endDate: 'Ends: March 9, 2026' },
      { title: 'Travel ICU (Intensive Care Unit) RN (Registered Nurse) in Anchorage, AK', specialty: 'ICU', location: 'Anchorage, AK', startDate: 'Starts: November 30, 2025', endDate: 'Ends: March 1, 2026' },
      { title: 'Travel Cardiac Cath Lab RN (Registered Nurse) in Arlington, TX', specialty: 'Cath Lab', location: 'Arlington, TX', startDate: 'Starts: November 30, 2025', endDate: 'Ends: March 1, 2026' },
      { title: 'Travel Med Surg (Medical Surgical) RN (Registered Nurse) in North Chesterfield, VA', specialty: 'MedSurg', location: 'North Chesterfield, VA', startDate: 'Starts: November 30, 2025', endDate: 'Ends: March 1, 2026' },
      { title: 'Local L&D (Labor and Delivery) RN (Registered Nurse) in Asheville, NC', specialty: 'Labor & Delivery', location: 'Asheville, NC', startDate: 'Starts: November 30, 2025', endDate: 'Ends: March 1, 2026' },
      { title: 'Travel L&D (Labor and Delivery) RN (Registered Nurse) in Asheville, NC', specialty: 'Labor & Delivery', location: 'Asheville, NC', startDate: 'Starts: November 30, 2025', endDate: 'Ends: March 1, 2026' },
      { title: 'Local Med Surg (Medical Surgical) RN (Registered Nurse) in Mayfield, KY', specialty: 'MedSurg', location: 'Mayfield, KY', startDate: 'Starts: November 30, 2025', endDate: 'Ends: March 1, 2026' },
      { title: 'Travel Med Surg (Medical Surgical) RN (Registered Nurse) in Mayfield, KY', specialty: 'MedSurg', location: 'Mayfield, KY', startDate: 'Starts: November 30, 2025', endDate: 'Ends: March 1, 2026' },
      { title: 'Travel ICU (Intensive Care Unit) RN (Registered Nurse) in Chandler, AZ', specialty: 'ICU', location: 'Chandler, AZ', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Travel Telemetry RN (Registered Nurse) in Chandler, AZ', specialty: 'Tele', location: 'Chandler, AZ', startDate: 'Starts: January 5, 2026', endDate: 'Ends: April 6, 2026' },
      { title: 'Travel Med Surg (Medical Surgical) RN (Registered Nurse) in Oakes, ND', specialty: 'MedSurg', location: 'Oakes, ND', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 23, 2026' }
    ],
    albums: [],
    recruiters: []
  },
  'tripod-partners': {
    id: 'tripod-partners',
    name: 'Tripod Partners USA',
    website: 'https://www.tripodpartners.com/us/',
    phone: '(737) 245-8678',
    address: '5900 Balcones Drive, Austin, TX, 78731',
    jobApplicationEmail: 'contact@tripodpartners.com',
    logo: 'https://static.thegypsynurse.com/2025/07/tripod-logo.jpg.webp',
    overview: 'Tripod Partners USA – Your Career. Your Freedom. Your Partner. At Tripod Partners USA, we specialize in connecting travel healthcare providers, direct hires, and per diem professionals with top healthcare facilities across the States. Our mission is simple: to empower healthcare professionals to explore new opportunities, earn competitive pay, and enjoy the flexibility they deserve. With a nationwide network, transparent pay packages, and 24/7 recruiter support, we make your travel nursing journey stress-free and rewarding. Whether you\'re looking for adventure, financial growth, or career stability, Tripod Partners USA is your trusted partner every step of the way. Why Nurses Choose Us: ✔ Travel Nursing Expertise – Top assignments nationwide ✔ Flexible Options – Travel, Direct Hire, and Per Diem ✔ Transparent Pay & Benefits – No surprises, just rewards ✔ Personalized Support – Recruiters who care about your success Ready to start your next adventure? Your next assignment is just a Tripod away.',
    aboutUs: 'Tripod Partners USA – Your Career. Your Freedom. Your Partner. At Tripod Partners USA, we specialize in connecting travel healthcare providers, direct hires, and per diem professionals with top healthcare facilities across the States. Our mission is simple: to empower healthcare professionals to explore new opportunities, earn competitive pay, and enjoy the flexibility they deserve. With a nationwide network, transparent pay packages, and 24/7 recruiter support, we make your travel nursing journey stress-free and rewarding. Whether you\'re looking for adventure, financial growth, or career stability, Tripod Partners USA is your trusted partner every step of the way. Why Nurses Choose Us: ✔ Travel Nursing Expertise – Top assignments nationwide ✔ Flexible Options – Travel, Direct Hire, and Per Diem ✔ Transparent Pay & Benefits – No surprises, just rewards ✔ Personalized Support – Recruiters who care about your success Ready to start your next adventure? Your next assignment is just a Tripod away.',
    benefits: [
      'Housing Stipend',
      'Meals and Incidentals',
      'Weekly Pay',
      'Health Insurance',
      'Certification Reimbursement',
      '401K',
      'License Reimbursement',
      'Workers Compensation',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviewsCount: 1,
    reviews: [],
    jobs: [
      { title: 'MedSurg (Medical-Surgical Nurse)', specialty: 'MedSurg', location: '', startDate: 'Starts: November 26, 2025', endDate: '' },
      { title: 'L&D (Labor and Delivery Nurse)', specialty: 'L&D', location: '', startDate: 'Starts: November 26, 2025', endDate: '' },
      { title: 'Psychiatric', specialty: 'Psychiatric', location: '', startDate: 'Starts: November 26, 2025', endDate: '' },
      { title: 'ICU (Critical Care Nurse)', specialty: 'ICU', location: '', startDate: 'Starts: November 26, 2025', endDate: '' },
      { title: 'QSW (Qualified Social Worker)', specialty: 'Social Work', location: '', startDate: 'Starts: November 5, 2025', endDate: '' },
      { title: 'QSW (Qualified Social Worker)', specialty: 'Social Work', location: '', startDate: 'Starts: November 6, 2025', endDate: '' },
      { title: 'QSW (Qualified Social Worker)', specialty: 'Social Work', location: '', startDate: 'Starts: November 3, 2025', endDate: '' },
      { title: 'Senior Social Worker', specialty: 'Social Work', location: '', startDate: 'Starts: November 5, 2025', endDate: '' },
      { title: 'QSW (Qualified Social Worker)', specialty: 'Social Work', location: '', startDate: 'Starts: November 4, 2025', endDate: '' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'brian-koga',
        name: 'Brian Koga',
        image: 'https://static.thegypsynurse.com/2025/07/Brian-Picture-300x300.jpg.webp',
        phone: '(737) 345-9732',
        address: '5900 Balcones Drive, Austin, TX, 78731',
        website: 'https://www.tripodpartners.com/us/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79935',
        description: 'I\'m Brian Robert Koga, an experienced and results-driven Travel Nurse Recruiter with Tripod Partners USA. Since 2018, I\'ve been connecting top-tier nursing professionals with leading healthcare facilities across the United States. I specialize in understanding each nurse\'s unique goals and guiding them through every step of the travel journey—from job search and compliance to placement and ongoing support. At Tripod Partners USA, I\'m committed to delivering personalized, high-touch service that empowers nurses to thrive in their careers while exploring new opportunities nationwide.',
        overview: 'I\'m Brian Robert Koga, an experienced and results-driven Travel Nurse Recruiter with Tripod Partners USA. Since 2018, I\'ve been connecting top-tier nursing professionals with leading healthcare facilities across the United States. I specialize in understanding each nurse\'s unique goals and guiding them through every step of the travel journey—from job search and compliance to placement and ongoing support. At Tripod Partners USA, I\'m committed to delivering personalized, high-touch service that empowers nurses to thrive in their careers while exploring new opportunities nationwide.',
        about: 'I\'m Brian Robert Koga, an experienced and results-driven Travel Nurse Recruiter with Tripod Partners USA. Since 2018, I\'ve been connecting top-tier nursing professionals with leading healthcare facilities across the United States. I specialize in understanding each nurse\'s unique goals and guiding them through every step of the travel journey—from job search and compliance to placement and ongoing support. At Tripod Partners USA, I\'m committed to delivering personalized, high-touch service that empowers nurses to thrive in their careers while exploring new opportunities nationwide.',
        albums: [],
        jobs: []
      },
      {
        id: 'caleb-nganmoue',
        name: 'Caleb Nganmoue',
        image: 'https://static.thegypsynurse.com/2025/07/Caleb-Picture.png.webp',
        phone: '(737) 215-3007',
        address: '5900 Balcones Drive, Austin, TX, 78731',
        website: 'https://www.tripodpartners.com/us/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79937',
        description: 'With over 4 years in the healthcare recruitment world, I\'ve built my name on loyalty, transparency, and being always available – day or night. I believe nurses come first, always. Whether you\'re a seasoned traveler or just starting your journey, I\'m here to listen, guide, and fight for the best opportunities that match your goals. Let\'s build something long-term. Reach out anytime – (737) 215-3007',
        overview: 'With over 4 years in the healthcare recruitment world, I\'ve built my name on loyalty, transparency, and being always available – day or night. I believe nurses come first, always. Whether you\'re a seasoned traveler or just starting your journey, I\'m here to listen, guide, and fight for the best opportunities that match your goals. Let\'s build something long-term. Reach out anytime – (737) 215-3007',
        about: 'With over 4 years in the healthcare recruitment world, I\'ve built my name on loyalty, transparency, and being always available – day or night. I believe nurses come first, always. Whether you\'re a seasoned traveler or just starting your journey, I\'m here to listen, guide, and fight for the best opportunities that match your goals. Let\'s build something long-term. Reach out anytime – (737) 215-3007',
        albums: [],
        jobs: []
      },
      {
        id: 'chris-marie-bonthuys',
        name: 'Chris-Marie Bonthuys',
        image: 'https://static.thegypsynurse.com/2025/07/CMB-Foto-1-300x300.jpg.webp',
        phone: '(737) 361-1363',
        address: '5900 Balcones Drive, Austin, TX, 78731',
        website: 'https://www.tripodpartners.com/us/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79936',
        description: 'I\'m Chris-Marie Bonthuys, an experienced Travel Nurse Recruiter with a passion for connecting exceptional nurses with rewarding opportunities. With a strong background in recruitment since 2018, and a focus on travel nurse placements since 2022, I specialize in understanding each nurse\'s unique goals and helping them navigate the ever-changing healthcare landscape. From securing top assignments and handling compliance to providing ongoing support on the road, my mission is to make every travel nurse\'s journey as smooth and successful as possible. At Tripod Partners, I pride myself on offering personalized service that empowers nurses to excel, explore new horizons, and grow both professionally and personally.',
        overview: 'I\'m Chris-Marie Bonthuys, an experienced Travel Nurse Recruiter with a passion for connecting exceptional nurses with rewarding opportunities. With a strong background in recruitment since 2018, and a focus on travel nurse placements since 2022, I specialize in understanding each nurse\'s unique goals and helping them navigate the ever-changing healthcare landscape. From securing top assignments and handling compliance to providing ongoing support on the road, my mission is to make every travel nurse\'s journey as smooth and successful as possible. At Tripod Partners, I pride myself on offering personalized service that empowers nurses to excel, explore new horizons, and grow both professionally and personally.',
        about: 'I\'m Chris-Marie Bonthuys, an experienced Travel Nurse Recruiter with a passion for connecting exceptional nurses with rewarding opportunities. With a strong background in recruitment since 2018, and a focus on travel nurse placements since 2022, I specialize in understanding each nurse\'s unique goals and helping them navigate the ever-changing healthcare landscape. From securing top assignments and handling compliance to providing ongoing support on the road, my mission is to make every travel nurse\'s journey as smooth and successful as possible. At Tripod Partners, I pride myself on offering personalized service that empowers nurses to excel, explore new horizons, and grow both professionally and personally.',
        albums: [],
        jobs: []
      },
      {
        id: 'cyle-carelse',
        name: 'Cyle Carelse',
        image: 'https://static.thegypsynurse.com/2025/07/Cyle-Picture-300x300.jpg.webp',
        phone: '(737) 265-1165',
        address: '5900 Balcones Drive, Austin, TX, 78731',
        website: 'https://www.tripodpartners.com/us/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79938',
        description: 'Hey, I\'m Cyle — Team Leader & Travel Nurse Recruiter at Tripod Partners I work with some of the most amazing travel nurses out there, helping them get placed in the right assignments and making sure they\'re supported from start to finish. I\'m part of Tripod Partners — the #1 agency out there (yes, we\'re claiming it 😎) — and we take pride in doing things the right way. I keep it real — clear communication, being available when you need me, and making your journey as smooth as possible. Whether you\'re brand new to travel nursing or have done it all, I\'m here to make sure you\'re in the right place, with the right support. If you\'re looking for a recruiter who listens, follows through, and actually cares — let\'s talk. Let\'s get you that next great assignment with a team that\'s got your back.',
        overview: 'Hey, I\'m Cyle — Team Leader & Travel Nurse Recruiter at Tripod Partners I work with some of the most amazing travel nurses out there, helping them get placed in the right assignments and making sure they\'re supported from start to finish. I\'m part of Tripod Partners — the #1 agency out there (yes, we\'re claiming it 😎) — and we take pride in doing things the right way. I keep it real — clear communication, being available when you need me, and making your journey as smooth as possible. Whether you\'re brand new to travel nursing or have done it all, I\'m here to make sure you\'re in the right place, with the right support. If you\'re looking for a recruiter who listens, follows through, and actually cares — let\'s talk. Let\'s get you that next great assignment with a team that\'s got your back.',
        about: 'Hey, I\'m Cyle — Team Leader & Travel Nurse Recruiter at Tripod Partners I work with some of the most amazing travel nurses out there, helping them get placed in the right assignments and making sure they\'re supported from start to finish. I\'m part of Tripod Partners — the #1 agency out there (yes, we\'re claiming it 😎) — and we take pride in doing things the right way. I keep it real — clear communication, being available when you need me, and making your journey as smooth as possible. Whether you\'re brand new to travel nursing or have done it all, I\'m here to make sure you\'re in the right place, with the right support. If you\'re looking for a recruiter who listens, follows through, and actually cares — let\'s talk. Let\'s get you that next great assignment with a team that\'s got your back.',
        albums: [],
        jobs: []
      },
      {
        id: 'neil-swager',
        name: 'Neil Swager',
        image: 'https://static.thegypsynurse.com/2025/07/ChatGPT-Image-Jul-30-2025-09_45_02-AM-683x1024.jpg.webp',
        phone: '(074) 859-29386',
        address: 'Suffolk Enterprise Centre, 3.12 Felaw Maltings, 44 Felaw Street, Ipswich, United Kingdom, IP2 8SJ',
        website: 'https://www.tripodpartners.com/us/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79943',
        description: 'I began my recruitment career in 2017, initially specialising in psychology recruitment. After nine months, I transitioned into mental health nurse recruitment—a field I focused on for over five years, building strong networks and deep sector knowledge. In 2022, I joined a sister company to lead international recruitment across all healthcare professions, helping clients access global talent in a competitive market. Following that, I returned to the parent company to establish and grow their doctor division, building it from the ground up over the course of a year. Since September 2024, I\'ve been part of the nursing division at Tripod Partners, where I continue to match skilled nurses with NHS and private sector roles across the UK. With experience across multiple healthcare verticals and both domestic and international recruitment, I bring a well-rounded, strategic approach to every placement.',
        overview: 'I began my recruitment career in 2017, initially specialising in psychology recruitment. After nine months, I transitioned into mental health nurse recruitment—a field I focused on for over five years, building strong networks and deep sector knowledge. In 2022, I joined a sister company to lead international recruitment across all healthcare professions, helping clients access global talent in a competitive market. Following that, I returned to the parent company to establish and grow their doctor division, building it from the ground up over the course of a year. Since September 2024, I\'ve been part of the nursing division at Tripod Partners, where I continue to match skilled nurses with NHS and private sector roles across the UK. With experience across multiple healthcare verticals and both domestic and international recruitment, I bring a well-rounded, strategic approach to every placement.',
        about: 'I began my recruitment career in 2017, initially specialising in psychology recruitment. After nine months, I transitioned into mental health nurse recruitment—a field I focused on for over five years, building strong networks and deep sector knowledge. In 2022, I joined a sister company to lead international recruitment across all healthcare professions, helping clients access global talent in a competitive market. Following that, I returned to the parent company to establish and grow their doctor division, building it from the ground up over the course of a year. Since September 2024, I\'ve been part of the nursing division at Tripod Partners, where I continue to match skilled nurses with NHS and private sector roles across the UK. With experience across multiple healthcare verticals and both domestic and international recruitment, I bring a well-rounded, strategic approach to every placement.',
        albums: [],
        jobs: []
      },
      {
        id: 'shane-theobald',
        name: 'Shane Theobald',
        image: 'https://static.thegypsynurse.com/2025/07/shaneee-768x1024.jpg.webp',
        phone: '(079) 032-47135',
        address: '5900 Balcones Drive, Austin, TX, 78731',
        website: 'https://www.tripodpartners.com/us/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79944',
        description: 'Hey there! I\'ve been in the recruiting world since 2011, and over the years, I\'ve found my passion in helping travel nurses find the right assignments across the country. I love getting to know the people I work with, learning what really matters to them, and connecting them with opportunities that truly fit. For me, it\'s all about building real relationships and making the process as smooth and personal as possible. Whether you\'re new to travel nursing or have done it all, I\'m here to help you land your ideal placement and support you every step of the way. Let\'s chat and find your next great gig!',
        overview: 'Hey there! I\'ve been in the recruiting world since 2011, and over the years, I\'ve found my passion in helping travel nurses find the right assignments across the country. I love getting to know the people I work with, learning what really matters to them, and connecting them with opportunities that truly fit. For me, it\'s all about building real relationships and making the process as smooth and personal as possible. Whether you\'re new to travel nursing or have done it all, I\'m here to help you land your ideal placement and support you every step of the way. Let\'s chat and find your next great gig!',
        about: 'Hey there! I\'ve been in the recruiting world since 2011, and over the years, I\'ve found my passion in helping travel nurses find the right assignments across the country. I love getting to know the people I work with, learning what really matters to them, and connecting them with opportunities that truly fit. For me, it\'s all about building real relationships and making the process as smooth and personal as possible. Whether you\'re new to travel nursing or have done it all, I\'m here to help you land your ideal placement and support you every step of the way. Let\'s chat and find your next great gig!',
        albums: [],
        jobs: []
      }
    ]
  },
  'at-staffing': {
    id: 'at-staffing',
    name: 'A.T. Staffing',
    website: 'http://www.advtemp.com',
    phone: '(903) 561-0927',
    address: 'P.O. Box 8022, Tyler, TX, 75711',
    jobApplicationEmail: 'MedicalDivision@advtemp.com',
    logo: 'https://static.thegypsynurse.com/2025/05/2025-LOGO-Medcial-Careers-200x200.png',
    overview: 'Over fifty years ago, the first A.T. Staffing office opened its doors in Tyler, Texas with a strong focus on innovation, dedication, integrity, and know-how. Over five decades later, we have multiple branch locations to serve our local communities and surrounding states. These branches also serve our rapidly growing travel nursing and allied health teams across the US. We employ and hire hundreds of medical professionals every year with a unique and personal approach to help you achieve your career and financial goals. We offer a comprehensive benefits plan and have hundreds of job openings in the medical areas of Specialty Nursing, Acute, Post Acute, Long-Term Care, Psychiatric, Rehabilitation, Radiology, Pharmacy, and Therapy.',
    aboutUs: 'Over fifty years ago, the first A.T. Staffing office opened its doors in Tyler, Texas with a strong focus on innovation, dedication, integrity, and know-how. Over five decades later, we have multiple branch locations to serve our local communities and surrounding states. These branches also serve our rapidly growing travel nursing and allied health teams across the US. We employ and hire hundreds of medical professionals every year with a unique and personal approach to help you achieve your career and financial goals. We offer a comprehensive benefits plan and have hundreds of job openings in the medical areas of Specialty Nursing, Acute, Post Acute, Long-Term Care, Psychiatric, Rehabilitation, Radiology, Pharmacy, and Therapy.',
    benefits: [
      'Housing Stipend',
      'Meals and Incidentals',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance',
      'Workers Compensation',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'Registered Nurse-RN ICU - ICU', specialty: 'ICU', location: 'North Richland Hills, TX', startDate: 'Starts: November 5, 2025', endDate: 'Ends: February 4, 2026' },
      { title: 'Registered Nurse-RN ER - Emergency Dept', specialty: 'Emergency Room', location: 'Santa Fe, NM', startDate: 'Starts: January 26, 2026', endDate: 'Ends: April 26, 2026' },
      { title: 'LPN/LVN-MED SURG - Med Surg', specialty: 'MedSurg', location: 'Round Rock, TX', startDate: 'Starts: November 24, 2025', endDate: 'Ends: February 23, 2026' },
      { title: 'Registered Nurse-RN Cardiac Cath Lab - Cardiac Cath Lab', specialty: 'Cath Lab', location: 'Austin, TX', startDate: 'Starts: December 1, 2025', endDate: 'Ends: March 2, 2026' },
      { title: 'Registered Nurse-RN TELEMETRY - Tele', specialty: 'Tele', location: 'Austin, TX', startDate: 'Starts: December 1, 2025', endDate: 'Ends: March 2, 2026' },
      { title: 'EP TECH - Electrophysiology (EP)', specialty: 'Electrophysiology', location: 'Austin, TX', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Registered Nurse-RN TELEMETRY - Tele', specialty: 'Tele', location: 'Austin, TX', startDate: 'Starts: December 1, 2025', endDate: 'Ends: March 2, 2026' },
      { title: 'Ultrasound Tech/Sonographer-Radiology - Radiology', specialty: 'Radiology', location: 'Austin, TX', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Registered Nurse-RN LABOR & DELIVERY - L&D', specialty: 'Labor & Delivery', location: 'Austin, TX', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 23, 2026' },
      { title: 'Registered Nurse-RN TELEMETRY - Tele', specialty: 'Tele', location: 'Alexandria, LA', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 15, 2026' },
      { title: 'FIRST ASSIST - First Assist', specialty: 'First Assistant', location: 'Longview, TX', startDate: 'Starts: March 2, 2026', endDate: 'Ends: May 31, 2026' },
      { title: 'Registered Nurse-RN OR - Surgery', specialty: 'Operating Room', location: 'San Antonio, TX', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 22, 2026' },
      { title: '- 340.13101.2019 | Surg Perfusionist - 340.13101.2019 | Surg Perfusionist', specialty: 'Surg Perfusionist', location: 'TEXARKANA, TX', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 15, 2026' },
      { title: 'Registered Nurse-RN TELEMETRY - Tele', specialty: 'Tele', location: 'Marshall, TX', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 15, 2026' },
      { title: 'Registered Nurse-RN PCU - PCU', specialty: 'PCU', location: 'Denton, TX', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 23, 2026' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'casey-boggs',
        name: 'Casey Boggs',
        image: 'https://static.thegypsynurse.com/2025/08/Casey-Boggs-Profile-300x300.jpg.webp',
        phone: '(903) 561-0927',
        address: 'P.O. Box 8022, Tyler, TX, 75711',
        website: 'http://www.advtemp.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80138',
        description: 'As a dedicated healthcare recruiter, I specialize in connecting exceptional talent with meaningful roles that make a difference in people\'s lives. With a strong understanding of both the technical and human sides of healthcare, I take pride in building relationships based on trust, empathy and open communication. My approach is thoughtful and people-centered – because I believe every candidate deserves to be seen, heard, and supported, and every healthcare facility deserves team members who align with their mission. Whether I am helping a new grad take tier first steps or placing a seasoned clinician in a new role, my goal is always to create matches that serve both the heart and the healthcare system.',
        overview: 'As a dedicated healthcare recruiter, I specialize in connecting exceptional talent with meaningful roles that make a difference in people\'s lives. With a strong understanding of both the technical and human sides of healthcare, I take pride in building relationships based on trust, empathy and open communication. My approach is thoughtful and people-centered – because I believe every candidate deserves to be seen, heard, and supported, and every healthcare facility deserves team members who align with their mission. Whether I am helping a new grad take tier first steps or placing a seasoned clinician in a new role, my goal is always to create matches that serve both the heart and the healthcare system.',
        about: 'As a dedicated healthcare recruiter, I specialize in connecting exceptional talent with meaningful roles that make a difference in people\'s lives. With a strong understanding of both the technical and human sides of healthcare, I take pride in building relationships based on trust, empathy and open communication. My approach is thoughtful and people-centered – because I believe every candidate deserves to be seen, heard, and supported, and every healthcare facility deserves team members who align with their mission. Whether I am helping a new grad take tier first steps or placing a seasoned clinician in a new role, my goal is always to create matches that serve both the heart and the healthcare system.',
        albums: [],
        jobs: []
      },
      {
        id: 'chris-cotner',
        name: 'Chris Cotner',
        image: 'https://static.thegypsynurse.com/2025/05/Chris-1-266x300.jpg.webp',
        phone: '(903) 561-0927',
        address: 'P.O. Box 8022, Tyler, TX, 75711',
        website: 'http://www.advtemp.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=78757',
        description: 'Chris is an experienced medical recruiter with over 10 years at A.T. Staffing, dedicated to connecting healthcare professionals with rewarding opportunities. Based in East Texas, he brings a deep understanding of the industry and a passion for helping others succeed in their careers.',
        overview: 'Chris is an experienced medical recruiter with over 10 years at A.T. Staffing, dedicated to connecting healthcare professionals with rewarding opportunities. Based in East Texas, he brings a deep understanding of the industry and a passion for helping others succeed in their careers.',
        about: 'Chris is an experienced medical recruiter with over 10 years at A.T. Staffing, dedicated to connecting healthcare professionals with rewarding opportunities. Based in East Texas, he brings a deep understanding of the industry and a passion for helping others succeed in their careers.',
        albums: [],
        jobs: []
      },
      {
        id: 'jamie-mcdaniel',
        name: 'Jamie McDaniel',
        image: 'https://static.thegypsynurse.com/2025/05/Jamie-McDaniel-Head-Shot-150x150.jpeg',
        phone: '(903) 561-0927',
        address: 'P.O. Box 8022, Tyler, TX, 75711',
        website: 'http://www.advtemp.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=78758',
        description: 'I specialize in sourcing, evaluating, and placing top-tier candidates across a wide range of medical and allied health disciplines. With a strong understanding of the evolving healthcare landscape, I work closely with hospitals, clinics, and care facilities to ensure staffing needs are met with precision and care. I bring a relationship-focused approach to recruitment—prioritizing clear communication, cultural fit, and long-term success. Whether I\'m guiding a new graduate through their first role or partnering with a healthcare system on critical hiring needs, I thrive on making impactful matches that improve both patient care and workplace satisfaction.',
        overview: 'I specialize in sourcing, evaluating, and placing top-tier candidates across a wide range of medical and allied health disciplines. With a strong understanding of the evolving healthcare landscape, I work closely with hospitals, clinics, and care facilities to ensure staffing needs are met with precision and care. I bring a relationship-focused approach to recruitment—prioritizing clear communication, cultural fit, and long-term success. Whether I\'m guiding a new graduate through their first role or partnering with a healthcare system on critical hiring needs, I thrive on making impactful matches that improve both patient care and workplace satisfaction.',
        about: 'I specialize in sourcing, evaluating, and placing top-tier candidates across a wide range of medical and allied health disciplines. With a strong understanding of the evolving healthcare landscape, I work closely with hospitals, clinics, and care facilities to ensure staffing needs are met with precision and care. I bring a relationship-focused approach to recruitment—prioritizing clear communication, cultural fit, and long-term success. Whether I\'m guiding a new graduate through their first role or partnering with a healthcare system on critical hiring needs, I thrive on making impactful matches that improve both patient care and workplace satisfaction.',
        albums: [],
        jobs: []
      }
    ]
  },
  'core-medical-group': {
    id: 'core-medical-group',
    name: 'Core Medical Group',
    website: 'https://www.coremedicalgroup.com/',
    phone: '(800) 995-2673',
    address: '655 South Willow Street, Suite 128, Manchester, NH, 03103',
    jobApplicationEmail: 'Nicole.Richard@CoreMedicalGroup.com',
    logo: 'https://static.thegypsynurse.com/2024/12/core.jpg.webp',
    overview: 'Why Choose CoreMedical For Travel Nursing & Travel Therapy With all the travel nursing and travel therapy companies out there, it is important that you choose the right medical staffing agency to advance your career. The best travel nursing companies and allied health recruiters will save you time and help you negotiate the best contract. Your healthcare recruiter will make the process of finding a travel contract simple and stress-free. Whether you are a travel nurse, travel physical therapist, travel occupational therapist, or travel speech language pathologist, CoreMedical Group is ready to assist you. What Makes CoreMedical Group Different? Our mission to Connect People, Improve Lives, and Give Back is a key part of everything we do at CoreMedical Group. Here, we put you first and treat you like family. That\'s why you will receive the same benefits available to our internal staff. From a healthcare reimbursement account to 401K matching, we offer some of the best benefits to our travelers. Plus, many of our benefits are made available to you on day one of your new travel contract. You are a part of our team as much as our internal employees! We value our travel nurses and travel therapists\' commitment to working with CoreMedical Group. Our traveling physical therapists and nurses have the opportunity to earn an all-inclusive trip to the Caribbean each year through our Club CoreMed loyalty program. You can earn points for the trip simply by working or providing referrals, and you can earn enough to bring a friend too! We have thousands of travel nursing jobs for RNs and LPNs and travel therapy jobs for PTs, OTs, and SLPs in locations like California, Texas, Hawaii, and more . In fact, we have travel nursing opportunities in all 50 states. When you travel with CoreMedical Group, we\'ll help you navigate licensing and credentialing, reimburse you for all medical services required for your assignment, and make sure you\'re set up for success from day one! Our dedicated staff will help you through the entire job placement process, from finding travel nursing and travel therapy opportunities to starting in new locations. You will always receive personalized service from your healthcare recruiter, credentialing specialist, and licensing coordinator, whether you are on your first or fiftieth medical travel assignment. We\'ll assist with your application, licensing, housing, and even set you up with a few places to visit at your new destination. CoreMedical Group has been placing travel nurses in new positions for over 25 years, and we have extensive knowledge and experience in the travel nursing and allied industries. Joint Commission Certified since 2007, we follow national standards to provide highly-qualified RNs, LPNs, PTs, OTs, SLPs and more to facilities throughout the U.S. We have continually been named one of the Largest Healthcare Staffing Firms in the U.S. by Staffing Industry Analysts. Last, but certainly not least, we\'re with you every step of the way. We will provide guidance and assistance throughout your traveling job placement processes, from your first interview to your facility orientation. Your healthcare recruiter will check-in periodically to make sure you are happy with your assignment, and you can contact us at any time throughout your travel nursing or travel therapy contract with questions or concerns. Create a profile or contact our experienced travel nurse or travel therapy healthcare recruiters at 800-995-2673 to join our travel nursing and allied family. We can\'t wait to find your ideal travel assignment!',
    aboutUs: 'Why Choose CoreMedical For Travel Nursing & Travel Therapy With all the travel nursing and travel therapy companies out there, it is important that you choose the right medical staffing agency to advance your career. The best travel nursing companies and allied health recruiters will save you time and help you negotiate the best contract. Your healthcare recruiter will make the process of finding a travel contract simple and stress-free. Whether you are a travel nurse, travel physical therapist, travel occupational therapist, or travel speech language pathologist, CoreMedical Group is ready to assist you. What Makes CoreMedical Group Different? Our mission to Connect People, Improve Lives, and Give Back is a key part of everything we do at CoreMedical Group. Here, we put you first and treat you like family. That\'s why you will receive the same benefits available to our internal staff. From a healthcare reimbursement account to 401K matching, we offer some of the best benefits to our travelers. Plus, many of our benefits are made available to you on day one of your new travel contract. You are a part of our team as much as our internal employees! We value our travel nurses and travel therapists\' commitment to working with CoreMedical Group. Our traveling physical therapists and nurses have the opportunity to earn an all-inclusive trip to the Caribbean each year through our Club CoreMed loyalty program. You can earn points for the trip simply by working or providing referrals, and you can earn enough to bring a friend too! We have thousands of travel nursing jobs for RNs and LPNs and travel therapy jobs for PTs, OTs, and SLPs in locations like California, Texas, Hawaii, and more . In fact, we have travel nursing opportunities in all 50 states. When you travel with CoreMedical Group, we\'ll help you navigate licensing and credentialing, reimburse you for all medical services required for your assignment, and make sure you\'re set up for success from day one! Our dedicated staff will help you through the entire job placement process, from finding travel nursing and travel therapy opportunities to starting in new locations. You will always receive personalized service from your healthcare recruiter, credentialing specialist, and licensing coordinator, whether you are on your first or fiftieth medical travel assignment. We\'ll assist with your application, licensing, housing, and even set you up with a few places to visit at your new destination. CoreMedical Group has been placing travel nurses in new positions for over 25 years, and we have extensive knowledge and experience in the travel nursing and allied industries. Joint Commission Certified since 2007, we follow national standards to provide highly-qualified RNs, LPNs, PTs, OTs, SLPs and more to facilities throughout the U.S. We have continually been named one of the Largest Healthcare Staffing Firms in the U.S. by Staffing Industry Analysts. Last, but certainly not least, we\'re with you every step of the way. We will provide guidance and assistance throughout your traveling job placement processes, from your first interview to your facility orientation. Your healthcare recruiter will check-in periodically to make sure you are happy with your assignment, and you can contact us at any time throughout your travel nursing or travel therapy contract with questions or concerns. Create a profile or contact our experienced travel nurse or travel therapy healthcare recruiters at 800-995-2673 to join our travel nursing and allied family. We can\'t wait to find your ideal travel assignment!',
    benefits: [
      'Housing Stipend',
      'Health Insurance',
      '401K',
      'License Reimbursement',
      'Workers Compensation'
    ],
    reviews: [],
    jobs: [
      { title: 'Registered Nurse - Rehab', specialty: 'Rehab', location: 'Boston, MA', startDate: 'Starts: December 1, 2025', endDate: '' },
      { title: 'Registered Nurse - Critical Care/ICU', specialty: 'ICU', location: 'Hilo, HI', startDate: 'Starts: December 2, 2025', endDate: '' },
      { title: 'Registered Nurse - Critical Care/ICU', specialty: 'ICU', location: 'Lawrenceville, GA', startDate: 'Starts: December 1, 2025', endDate: '' },
      { title: 'Physical Therapist - Outpatient/Clinic', specialty: 'Clinic', location: 'Fairfield, CA', startDate: 'Starts: December 2, 2025', endDate: '' },
      { title: 'Registered Nurse - Critical Care/ICU', specialty: 'ICU', location: 'Boston, MA', startDate: 'Starts: December 3, 2025', endDate: '' },
      { title: 'Speech Language Pathologist - School System', specialty: 'School Nursing', location: 'Algonquin, IL', startDate: 'Starts: November 30, 2025', endDate: '' },
      { title: 'Speech Language Pathologist - School System', specialty: 'School Nursing', location: 'Rockford, IL', startDate: 'Starts: November 30, 2025', endDate: '' },
      { title: 'Physical Therapist - LTC/SNF', specialty: 'LTC', location: 'Wichita, KS', startDate: 'Starts: December 1, 2025', endDate: '' },
      { title: 'Registered Nurse - Emergency Room', specialty: 'Emergency Room', location: 'Phoenix, AZ', startDate: 'Starts: November 30, 2025', endDate: '' },
      { title: 'Physical Therapist - Outpatient/Clinic', specialty: 'Clinic', location: 'Hampstead, MD', startDate: 'Starts: November 30, 2025', endDate: '' },
      { title: 'Registered Nurse - Emergency Room', specialty: 'Emergency Room', location: 'Springfield, MO', startDate: 'Starts: December 2, 2025', endDate: '' },
      { title: 'Registered Nurse - Med/Surg', specialty: 'MedSurg', location: 'Greeley, CO', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Registered Nurse - Emergency Room', specialty: 'Emergency Room', location: 'Wichita Falls, TX', startDate: 'Starts: January 12, 2026', endDate: '' },
      { title: 'Registered Nurse - Med/Surg', specialty: 'MedSurg', location: 'Phoenix, AZ', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Registered Nurse - First Assistant', specialty: 'First Assistant', location: 'Bakersfield, CA', startDate: 'Starts: December 15, 2025', endDate: '' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'crislenny-ynfante',
        name: 'Crislenny Ynfante',
        image: 'https://static.thegypsynurse.com/2025/01/Crislenny-Ynfante-2.jpg.webp',
        phone: '(603) 681-9289',
        address: '655 South Willow Street Suite 128 , Manchester, NH, 03103',
        website: 'http://www.coremedicalgroup.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=77665',
        description: 'I am so happy your here. I have a passion for people, chocolate and of course traveling. After some time away and taking in a different way of doing life, I am back with Core! (still adventuring I might add) I would love to point you in the right direction as a trusted recruiter/friend. Here at Core, we love to get to know you, your needs and how we can best serve you. You have a seat at our table. Let\'s embrace the joy in the process.',
        overview: 'I am so happy your here. I have a passion for people, chocolate and of course traveling. After some time away and taking in a different way of doing life, I am back with Core! (still adventuring I might add) I would love to point you in the right direction as a trusted recruiter/friend. Here at Core, we love to get to know you, your needs and how we can best serve you. You have a seat at our table. Let\'s embrace the joy in the process.',
        about: 'I am so happy your here. I have a passion for people, chocolate and of course traveling. After some time away and taking in a different way of doing life, I am back with Core! (still adventuring I might add) I would love to point you in the right direction as a trusted recruiter/friend. Here at Core, we love to get to know you, your needs and how we can best serve you. You have a seat at our table. Let\'s embrace the joy in the process.',
        albums: [],
        jobs: []
      },
      {
        id: 'holly-mccay',
        name: 'Holly McCay',
        image: 'https://static.thegypsynurse.com/2024/12/Holly-McCay-296x300.jpg.webp',
        phone: '(603) 681-9028',
        address: '655 South Willow Street Suite 128 , Manchester, NH, 03103',
        website: 'http://www.coremedicalgroup.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=77246',
        description: 'I am a Senior Recruiter at CoreMedical Group and have been a part of this incredible team for the past five years. During this time, I\'ve had the honor of becoming the top recruiter for the Travel Nursing Division, a recognition that I\'m deeply proud of. It\'s been an amazing journey to assist clinicians in embarking on life-changing travel assignments across the country. Communication is key in all aspects of my life. I believe that open conversations before, during, and after assignments are vital for success. Being receptive to new ideas, adaptable, and ready to tackle challenges is crucial for everyone!',
        overview: 'I am a Senior Recruiter at CoreMedical Group and have been a part of this incredible team for the past five years. During this time, I\'ve had the honor of becoming the top recruiter for the Travel Nursing Division, a recognition that I\'m deeply proud of. It\'s been an amazing journey to assist clinicians in embarking on life-changing travel assignments across the country. Communication is key in all aspects of my life. I believe that open conversations before, during, and after assignments are vital for success. Being receptive to new ideas, adaptable, and ready to tackle challenges is crucial for everyone!',
        about: 'I am a Senior Recruiter at CoreMedical Group and have been a part of this incredible team for the past five years. During this time, I\'ve had the honor of becoming the top recruiter for the Travel Nursing Division, a recognition that I\'m deeply proud of. It\'s been an amazing journey to assist clinicians in embarking on life-changing travel assignments across the country. Communication is key in all aspects of my life. I believe that open conversations before, during, and after assignments are vital for success. Being receptive to new ideas, adaptable, and ready to tackle challenges is crucial for everyone!',
        albums: [],
        jobs: []
      },
      {
        id: 'rebecca-hoffman',
        name: 'Rebecca Hoffman',
        image: 'https://static.thegypsynurse.com/2025/01/Rebecca-Hoffman-295x300.jpg.webp',
        phone: '(603) 681-9212',
        address: '655 South Willow Street Suite 128 , Manchester, NH, 03103',
        website: 'http://www.coremedicalgroup.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=77666',
        description: 'For me, success in placement isn\'t just about filling a position—it\'s about ensuring that my candidates thrive in their environment. I prioritize providing support to my travelers, creating a sense of collaboration between myself, CoreMedical Group, and the facilities they work in. A positive experience for both candidate and client is crucial in my book. Success as a traveler varies for each individual, but I\'ve found that effective communication, transparency, and a willingness to embrace new experiences are key components for everyone.',
        overview: 'For me, success in placement isn\'t just about filling a position—it\'s about ensuring that my candidates thrive in their environment. I prioritize providing support to my travelers, creating a sense of collaboration between myself, CoreMedical Group, and the facilities they work in. A positive experience for both candidate and client is crucial in my book. Success as a traveler varies for each individual, but I\'ve found that effective communication, transparency, and a willingness to embrace new experiences are key components for everyone.',
        about: 'For me, success in placement isn\'t just about filling a position—it\'s about ensuring that my candidates thrive in their environment. I prioritize providing support to my travelers, creating a sense of collaboration between myself, CoreMedical Group, and the facilities they work in. A positive experience for both candidate and client is crucial in my book. Success as a traveler varies for each individual, but I\'ve found that effective communication, transparency, and a willingness to embrace new experiences are key components for everyone.',
        albums: [],
        jobs: []
      },
      {
        id: 'sarah-rosenfelder',
        name: 'Sarah Rosenfelder',
        image: 'https://static.thegypsynurse.com/2024/12/Sarah-Rosenfelder-300x288.jpg.webp',
        phone: '(603) 681-9210',
        address: '655 South Willow Street Suite 128 , Manchester, NH, 03103',
        website: 'http://www.coremedicalgroup.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=77247',
        description: 'Hey y\'all! My name is Sarah and I\'m a home health and hospice travel nurse recruiter here at CoreMedical. I love connecting with nurses to find them their next great travel contract experience! Aside from recruiting, I\'m a passionate dog mom, cat mom, and plant mom! I love helping my nurses find their dream contract: Exploring new areas they haven\'t been, growing as professional medical superheroes, and helping them make money.',
        overview: 'Hey y\'all! My name is Sarah and I\'m a home health and hospice travel nurse recruiter here at CoreMedical. I love connecting with nurses to find them their next great travel contract experience! Aside from recruiting, I\'m a passionate dog mom, cat mom, and plant mom! I love helping my nurses find their dream contract: Exploring new areas they haven\'t been, growing as professional medical superheroes, and helping them make money.',
        about: 'Hey y\'all! My name is Sarah and I\'m a home health and hospice travel nurse recruiter here at CoreMedical. I love connecting with nurses to find them their next great travel contract experience! Aside from recruiting, I\'m a passionate dog mom, cat mom, and plant mom! I love helping my nurses find their dream contract: Exploring new areas they haven\'t been, growing as professional medical superheroes, and helping them make money.',
        albums: [],
        jobs: []
      }
    ]
  },
  'fastaff': {
    id: 'fastaff',
    name: 'Fastaff',
    website: 'https://www.fastaff.com/',
    phone: '(800) 736-8773',
    address: '5700 South Quebec Street, Suite 300, Greenwood Village, CO, 80111',
    jobApplicationEmail: 'kj.rigli@fastaff.com',
    logo: 'https://static.thegypsynurse.com/2022/03/logo-200x200.png.webp',
    overview: 'We take great care to ensure that our travel nurses enjoy the freedom to work when they want, where they want, while maintaining the lifestyle they want, in addition to enjoying the excitement of travel nursing and the challenge of new experiences.',
    aboutUs: 'We take great care to ensure that our travel nurses enjoy the freedom to work when they want, where they want, while maintaining the lifestyle they want, in addition to enjoying the excitement of travel nursing and the challenge of new experiences.',
    benefits: [
      'Housing Stipend',
      'Travel Pay',
      'Health Insurance',
      '401K',
      'License Reimbursement',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'Labor & Delivery RN', specialty: 'Labor & Delivery', location: 'ND 58601', startDate: 'Starts: November 30, 2025', endDate: '' },
      { title: 'Operating Room - CVOR RN', specialty: 'CVOR', location: 'PA 17101', startDate: 'Starts: November 17, 2025', endDate: '' },
      { title: 'Stepdown - General RN', specialty: 'Stepdown', location: 'FL 32901', startDate: 'Starts: January 5, 2026', endDate: '' },
      { title: 'CT Tech', specialty: 'CT Scan Tech', location: 'NE 68510', startDate: 'Starts: January 19, 2026', endDate: '' },
      { title: 'CT Tech', specialty: 'CT Scan Tech', location: 'OR 97471', startDate: 'Starts: December 22, 2025', endDate: '' },
      { title: 'Med Surgical Tele RN', specialty: 'MedSurg', location: 'NE 68122', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Respiratory Technician', specialty: 'Respiratory Therapist', location: 'MN 56601', startDate: 'Starts: January 19, 2026', endDate: '' },
      { title: 'Med Surgical RN', specialty: 'MedSurg', location: 'NE 68124', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Med Surgical RN', specialty: 'MedSurg', location: 'NE 68124', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'ICU RN', specialty: 'ICU', location: 'NE 68124', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Operating Room - CVOR RN', specialty: 'CVOR', location: 'TX 77030', startDate: 'Starts: January 13, 2026', endDate: '' },
      { title: 'Med Surgical Tele RN', specialty: 'MedSurg', location: 'GA 30058', startDate: 'Starts: January 12, 2026', endDate: '' },
      { title: 'Med Surgical Tele RN', specialty: 'MedSurg', location: 'GA 30058', startDate: 'Starts: January 12, 2026', endDate: '' },
      { title: 'Stepdown - General RN', specialty: 'Stepdown', location: 'GA 30033', startDate: 'Starts: January 12, 2026', endDate: '' },
      { title: 'Stepdown - General RN', specialty: 'Stepdown', location: 'GA 30033', startDate: 'Starts: January 12, 2026', endDate: '' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'jackie-lewis',
        name: 'Jackie Lewis',
        image: 'https://static.thegypsynurse.com/2023/05/Jackie.jpg.webp',
        phone: '(720) 593-7493',
        address: '5700 S Quebec Street, Suite 300, Greenwood Village, CO, 80111',
        website: 'http://www.Fastaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=58795',
        description: 'For over 8 years I have been a recruiter with Fastaff Travel Nursing. I specialize in working with nurses and allied professionals to find them lucrative positions across the country. I\'m always available to talk through different options, pay rates, locations, etc. to help find the perfect next contract. The best part of my job is the relationships I get to have with my nurses. As a recruiter for Fastaff, I\'m able to be myself and connect with nurses as people, not numbers. Our nurses are hard-working, ambitious, and knowledgeable. They\'re enthusiastic, talented, and tenured. Most of our nurses know what to expect with Fastaff and they want to work with us for a reason. I believe working in healthcare is one of the most rewarding professions to be in, and I\'m thankful every day that I get to do what I do. When I\'m not working, I like to lead an active lifestyle by running, doing yoga, spending time outdoors, and having fun with my husband and 6 month old baby boy.',
        overview: 'For over 8 years I have been a recruiter with Fastaff Travel Nursing. I specialize in working with nurses and allied professionals to find them lucrative positions across the country. I\'m always available to talk through different options, pay rates, locations, etc. to help find the perfect next contract. The best part of my job is the relationships I get to have with my nurses. As a recruiter for Fastaff, I\'m able to be myself and connect with nurses as people, not numbers. Our nurses are hard-working, ambitious, and knowledgeable. They\'re enthusiastic, talented, and tenured. Most of our nurses know what to expect with Fastaff and they want to work with us for a reason. I believe working in healthcare is one of the most rewarding professions to be in, and I\'m thankful every day that I get to do what I do. When I\'m not working, I like to lead an active lifestyle by running, doing yoga, spending time outdoors, and having fun with my husband and 6 month old baby boy.',
        about: 'For over 8 years I have been a recruiter with Fastaff Travel Nursing. I specialize in working with nurses and allied professionals to find them lucrative positions across the country. I\'m always available to talk through different options, pay rates, locations, etc. to help find the perfect next contract. The best part of my job is the relationships I get to have with my nurses. As a recruiter for Fastaff, I\'m able to be myself and connect with nurses as people, not numbers. Our nurses are hard-working, ambitious, and knowledgeable. They\'re enthusiastic, talented, and tenured. Most of our nurses know what to expect with Fastaff and they want to work with us for a reason. I believe working in healthcare is one of the most rewarding professions to be in, and I\'m thankful every day that I get to do what I do. When I\'m not working, I like to lead an active lifestyle by running, doing yoga, spending time outdoors, and having fun with my husband and 6 month old baby boy.',
        albums: [],
        jobs: []
      }
    ]
  },
  'fusion-medical-staffing': {
    id: 'fusion-medical-staffing',
    name: 'Fusion Medical Staffing',
    website: 'https://www.fusionmedstaff.com',
    phone: '(877) 230-3885',
    address: '18881 W Dodge Rd. STE 300E, Elkhorn, NE, 68022',
    jobApplicationEmail: 'taylor.beyke@fusionmedstaff.com',
    logo: 'https://static.thegypsynurse.com/2023/10/fusion-150x150-1.png.webp',
    overview: 'Fusion Medical Staffing provides career opportunities to healthcare professionals by helping medical facilities fill their staffing needs. Fusion staffs a variety of specialties within the nursing and allied healthcare fields. We offer competitive pay packages and benefits that travelers deserve. We pride ourselves on our communication skills, accurate job transparency and traveler first mentality. At Fusion, you can actually choose your own adventure! Fusion\'s purpose is to ensure that everyone we touch has a better life. We strive to be humble, driven and positive in all our actions!',
    aboutUs: 'Fusion Medical Staffing provides career opportunities to healthcare professionals by helping medical facilities fill their staffing needs. Fusion staffs a variety of specialties within the nursing and allied healthcare fields. We offer competitive pay packages and benefits that travelers deserve. We pride ourselves on our communication skills, accurate job transparency and traveler first mentality. At Fusion, you can actually choose your own adventure! Fusion\'s purpose is to ensure that everyone we touch has a better life. We strive to be humble, driven and positive in all our actions!',
    benefits: [
      'Disability Insurance',
      'Housing Stipend',
      'Health Insurance',
      'Certification Reimbursement',
      '401K',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviewsCount: 24,
    reviews: [],
    jobs: [
      { title: 'Physical Therapist - PT', specialty: 'Physical Therapy', location: 'Hampstead, MD', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Speech Language Pathologist - SLP', specialty: 'SLP', location: 'Novato, CA', startDate: 'Starts: October 27, 2025', endDate: 'Ends: January 26, 2026' },
      { title: 'Physical Therapist - PT', specialty: 'Physical Therapy', location: 'Louisville, KY', startDate: 'Starts: October 13, 2025', endDate: 'Ends: January 12, 2026' },
      { title: 'Physical Therapist - PT', specialty: 'Physical Therapy', location: 'Cheyenne, WY', startDate: 'Starts: October 6, 2025', endDate: 'Ends: January 5, 2026' },
      { title: 'L&D RN', specialty: 'Labor & Delivery', location: 'Baltimore, MD', startDate: 'Starts: October 28, 2025', endDate: 'Ends: January 27, 2026' },
      { title: 'PICU RN', specialty: 'PICU', location: 'Denver, CO', startDate: 'Starts: October 20, 2025', endDate: 'Ends: January 19, 2026' },
      { title: 'Physical Therapist - PT', specialty: 'Physical Therapy', location: 'Richmond, KY', startDate: 'Starts: October 13, 2025', endDate: 'Ends: January 12, 2026' },
      { title: 'L&D RN', specialty: 'Labor & Delivery', location: 'Fairfield, CA', startDate: 'Starts: December 15, 2025', endDate: 'Ends: February 9, 2026' },
      { title: 'Home Health LPN', specialty: 'LPN', location: 'Portage, MI', startDate: 'Starts: October 20, 2025', endDate: 'Ends: January 19, 2026' },
      { title: 'Physical Therapist - PT', specialty: 'Physical Therapy', location: 'Ashland, KY', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'CT Tech', specialty: 'CT Scan Tech', location: 'Pittsburgh, PA', startDate: 'Starts: October 13, 2025', endDate: 'Ends: January 12, 2026' },
      { title: 'CVOR RN', specialty: 'CVOR', location: 'Harrisburg, PA', startDate: 'Starts: November 17, 2025', endDate: 'Ends: February 16, 2026' },
      { title: 'Ultrasound Echo/Vascular', specialty: 'Ultrasound', location: 'Apple Valley, CA', startDate: 'Starts: January 12, 2026', endDate: 'Ends: April 13, 2026' },
      { title: 'ICU RN', specialty: 'ICU', location: 'Meridian, ID', startDate: 'Starts: October 17, 2025', endDate: 'Ends: January 23, 2026' },
      { title: 'Surgical Tech', specialty: 'Surgical Tech', location: 'Lone Tree, CO', startDate: 'Starts: November 3, 2025', endDate: 'Ends: February 2, 2026' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'amanda-butera',
        name: 'Amanda Butera',
        image: 'https://static.thegypsynurse.com/2023/06/amanda.butera%40fusionmedstaff.com_-scaled.jpg.webp',
        phone: '(877) 230-3885',
        address: '11808 Grant St. , Omaha, NE, 68164',
        website: 'https://www.fusionmedstaff.com/?utm_source=google_gmb&utm_medium=organic',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=58055',
        description: 'I am a Radiology Recruiter! I have been at Fusion and in the medical staffing industry for 3 years. Prior to this, I worked in healthcare as a Clinical Microbiology Tech at UNMC. I work with all Rad Modalities including, but not limited to, X-Ray/Radiology Techs, CT Techs, MRI Techs, Ultrasound Techs, and Radiation Therapists. I believe that transparency and strong communication leads to the best teams. I love that my role allows me to help people live their dreams and gain new experiences. I work hard to help my travelers find the perfect assignment and communicate through the entire process. Kindness goes a long way and I want to ensure that my travelers know how important they are to the medical field and why what they do matters! Personal Info: I was born and raised in Papillion, NE and grew up playing softball. I am now coaching high school softball at my alma mater, Papillion LaVista High School. I played college softball at University of Nebraska- Kearney for a short time and finished my education at the University of Nebraska – Lincoln, graduating with a Bachelors of Science in Microbiology with a Minor in Biochemistry. I also received my MBA in the fall of 2023 from Bellevue University. I am a dog momma to 2 Sheepadoodle sisters, Harper and Frankie! We LOVE to go on walks, go for car rides to Starbucks for a pup-cup and a coffee, and hang with our Grammy!! I spend a lot of my free time reading (send me all the book recommendations) and traveling!! I love to travel and have been fortunate enough to visit many places within the borders of the United States and abroad. I spent 2 weeks in Cusco, Peru working at a mobile clinic and doing community renovation. Following my college graduation, I spent a month in Padua, Italy doing a medical fellowship at a local hospital. My goal in life is to see all 7 Wonders of the World. I have 2 so far, the Roman Colosseum and Machu Picchu. Within the country, I love traveling to places that I can enjoy the beauty of the outdoors, Arizona, Washington, and Colorado being a few of my favorites!! I love sending travelers to places they have never been before. Seeing new things and experience new places is one of my favorite things to do, so getting to share that with them is the best part of this job!!',
        overview: 'I am a Radiology Recruiter! I have been at Fusion and in the medical staffing industry for 3 years. Prior to this, I worked in healthcare as a Clinical Microbiology Tech at UNMC. I work with all Rad Modalities including, but not limited to, X-Ray/Radiology Techs, CT Techs, MRI Techs, Ultrasound Techs, and Radiation Therapists. I believe that transparency and strong communication leads to the best teams. I love that my role allows me to help people live their dreams and gain new experiences. I work hard to help my travelers find the perfect assignment and communicate through the entire process. Kindness goes a long way and I want to ensure that my travelers know how important they are to the medical field and why what they do matters!',
        about: 'I am a Radiology Recruiter! I have been at Fusion and in the medical staffing industry for 3 years. Prior to this, I worked in healthcare as a Clinical Microbiology Tech at UNMC. I work with all Rad Modalities including, but not limited to, X-Ray/Radiology Techs, CT Techs, MRI Techs, Ultrasound Techs, and Radiation Therapists. I believe that transparency and strong communication leads to the best teams. I love that my role allows me to help people live their dreams and gain new experiences. I work hard to help my travelers find the perfect assignment and communicate through the entire process. Kindness goes a long way and I want to ensure that my travelers know how important they are to the medical field and why what they do matters!',
        albums: [],
        jobs: []
      },
      {
        id: 'becca-jacobs',
        name: 'Becca Jacobs',
        image: 'https://static.thegypsynurse.com/2020/12/Becca-150x150.png.webp',
        phone: '(877) 230-3885241',
        address: '11808 Grant Street, Suite 100 Omaha, NE 68164',
        website: 'https://www.fusionmedstaff.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=32593',
        description: 'My name is Becca! I am a Team Lead in our nursing division! I have been in the staffing industry for over five years now and I can honestly say I LOVE my job!! Fusion has been a life changer for me! When I\'m not working, I\'m busy running around the house!! I have a two-year-old boy, Witten, and a sweet little girl, Monroe! They aren\'t kidding when they say time flies, enjoy the good and the crazy moments! If our house isn\'t crazy enough with two kids under two and two dogs… You can catch us yelling at the TV on Football Saturdays and Sundays! We are HUGE Dallas Cowboy and Michigan Wolverine fans!!! When I finally get a free minute, you can find me enjoying the pool, taking a spinning class, napping, or making a new dip! I love a good appetizer…oh and we cant forget about sipping on a Bacardi and diet!! 😊 I look forward to working with you!',
        overview: 'My name is Becca! I am a Team Lead in our nursing division! I have been in the staffing industry for over five years now and I can honestly say I LOVE my job!! Fusion has been a life changer for me!',
        about: 'My name is Becca! I am a Team Lead in our nursing division! I have been in the staffing industry for over five years now and I can honestly say I LOVE my job!! Fusion has been a life changer for me!',
        albums: [],
        jobs: []
      },
      {
        id: 'becki-johnson',
        name: 'Becki Johnson',
        image: 'https://static.thegypsynurse.com/2023/05/Becki-Johnson-Headshot-scaled.jpg.webp',
        phone: '(531) 200-5091',
        address: '18881 W Dodge Rd STE 300W, Elkhorn, NE, 68022',
        website: 'https://www.fusionmedstaff.com/?utm_source=google_gmb&utm_medium=organic',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=58057',
        description: 'Hello! My name is Becki Johnson, I am a Home Health Account Manager at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for 1 year. Prior to my position at Fusion, I was a child welfare worker for 10+ years, working to support and advocate for children in foster care. I mostly deal with home health, hospice RN\'s and hospice LPN\'s. My personal "why" in life and at Fusion, is to be a positive support and offer help to those around me. Being a nurse is hard work! As a recruiter, I feel my purpose is to help make your travel experience as seamless as possible. My travelers have left reviews stating I\'m professional, supportive, friendly, personable, and quick to respond. I\'d love the opportunity to learn more about you and your experience! I am originally from a small town in Northeast Nebraska, I went to college in Kearney, NE. My husband and I now live in Omaha, he owns and operates a chiropractic clinic. Together, we have two small kids who keep us very busy! We enjoy spending time with our families and friends, as well as being outside any chance we have.',
        overview: 'Hello! My name is Becki Johnson, I am a Home Health Account Manager at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for 1 year. Prior to my position at Fusion, I was a child welfare worker for 10+ years, working to support and advocate for children in foster care. I mostly deal with home health, hospice RN\'s and hospice LPN\'s.',
        about: 'Hello! My name is Becki Johnson, I am a Home Health Account Manager at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for 1 year. Prior to my position at Fusion, I was a child welfare worker for 10+ years, working to support and advocate for children in foster care. I mostly deal with home health, hospice RN\'s and hospice LPN\'s.',
        albums: [],
        jobs: []
      },
      {
        id: 'jake-berglund',
        name: 'Jake Berglund',
        image: 'https://static.thegypsynurse.com/2023/06/Jake-Berglund-scaled.jpg.webp',
        phone: '(877) 230-3885',
        address: '11808 Grant St. , Omaha, NE, 68164',
        website: 'https://www.fusionmedstaff.com/?utm_source=google_gmb&utm_medium=organic',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=58058',
        description: 'Hello! My name is Jake Berglund, I am a Senior Cath Lab Account Manager, Team Lead at Fusion Medical Staffing. I have been in the healthcare industry for 7 years, 1 year at Kearney Regional Medical Center in HR and 6 years at Fusion. I mainly work with RN\'s in Cath Lab, International Radiology, and Electrophysiology, and techs in those specialties as well. After graduation from college, I worked in Human Resources for a new and growing hospital in Central Nebraska. I was able to see firsthand the impact that travelers can have on a facility. The work you all do is very important to keep some of these facilities and units running. If you were to speak to one of my current travelers, they might use words such as knowledgeable, efficient, personable, punctual, and understanding to describe me. I will be sure to do everything that I can to make your travel experience the best one possible!',
        overview: 'Hello! My name is Jake Berglund, I am a Senior Cath Lab Account Manager, Team Lead at Fusion Medical Staffing. I have been in the healthcare industry for 7 years, 1 year at Kearney Regional Medical Center in HR and 6 years at Fusion.',
        about: 'Hello! My name is Jake Berglund, I am a Senior Cath Lab Account Manager, Team Lead at Fusion Medical Staffing. I have been in the healthcare industry for 7 years, 1 year at Kearney Regional Medical Center in HR and 6 years at Fusion.',
        albums: [],
        jobs: []
      },
      {
        id: 'jess-wieseler',
        name: 'Jess Wieseler',
        image: 'https://static.thegypsynurse.com/2023/06/Jess-Wieseler-Headshot.jpg.webp',
        phone: '(877) 230-3885',
        address: '11808 Grant St. , Omaha, NE, 68164',
        website: 'https://www.fusionmedstaff.com/?utm_source=google_gmb&utm_medium=organic',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=60146',
        description: 'Hello! My name is Jess Wieseler, I am a home health and hospice recruiter. I have been in the medical staffing industry for one year, prior to my time at Fusions I was a Special Education teacher. I mainly work with RN\'s and LPN\'s in home health and hospice. I pride myself on being a recruiter that travelers can count on. I value my travelers\' time, I respect their hard work and communicate regularly so they always feel supported! A little bit about me: I love to read, my goal is to read books for 2023. I love going on walks, hiking and traveling. Another fun fact about me, I lived in South Korea for one and a half years.',
        overview: 'Hello! My name is Jess Wieseler, I am a home health and hospice recruiter. I have been in the medical staffing industry for one year, prior to my time at Fusions I was a Special Education teacher.',
        about: 'Hello! My name is Jess Wieseler, I am a home health and hospice recruiter. I have been in the medical staffing industry for one year, prior to my time at Fusions I was a Special Education teacher.',
        albums: [],
        jobs: []
      },
      {
        id: 'megan-hamik',
        name: 'Megan Hamik',
        image: 'https://static.thegypsynurse.com/2023/05/Megan-Hamik-Headshot-scaled.jpg.webp',
        phone: '(877) 230-3885',
        address: '11808 Grant St., Omaha, NE, 68164',
        website: 'https://www.fusionmedstaff.com/?utm_source=google_gmb&utm_medium=organic',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=58059',
        description: 'Hello! My name is Megan Hamik, I am a cath lab recruiter at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for three and a half years, prior to that I was in corporate staffing. I mostly work with cath, IR and EP\'s, both RN\'s and Techs. Fusion as a company cares about it\'s employees, internal and external. That\'s why I think we are always the best choice when deciding on a staffing company to work with. They strive to make a difference in everyone\'s life! I love meeting new people and talking about travel opportunities. I try to really get to know my travelers because building that relationship always leads to the best experiences. I love this job and truly enjoy coming to work every day. My #1 job is to make sure to find the best assignment for you!',
        overview: 'Hello! My name is Megan Hamik, I am a cath lab recruiter at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for three and a half years, prior to that I was in corporate staffing.',
        about: 'Hello! My name is Megan Hamik, I am a cath lab recruiter at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for three and a half years, prior to that I was in corporate staffing.',
        albums: [],
        jobs: []
      },
      {
        id: 'ron-hertzberg',
        name: 'Ron Hertzberg',
        image: 'https://static.thegypsynurse.com/2023/05/Ron-Hertzberg-Headshot-scaled.jpg.webp',
        phone: '(877) 230-3885',
        address: '11808 Grant St. , Omaha, NE, 68164',
        website: 'http://Fusionmedstaff.com ',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=32639',
        description: 'Hello! My name is Ron Hertzberg, I am a nursing recruiter at Fusion Medical Staffing. I have been in the medical staffing industry for 7 years now, two and a half of those at Fusion. I mainly work with hospital RN\'s, OR RN\'s, and CST\'s. Fusions reputation speaks for itself, I continually hear travelers talking about how our attention to the care of our travelers is second to none and I take that to heart. I work hard to take amazing care of my nurses and techs in hopes that they will continue to work with me for their entire travel career. I always work hard to truly learn about my travelers and learn what is important to each individual person. A little more about me, I have three kids, two kid in-laws and one grandkid. I work fully remote from Southern California, where I was born and raised. When I am not working, I enjoy time with my family and friends, heading to the beach, city festivals, the gym and just about anything creative.',
        overview: 'Hello! My name is Ron Hertzberg, I am a nursing recruiter at Fusion Medical Staffing. I have been in the medical staffing industry for 7 years now, two and a half of those at Fusion.',
        about: 'Hello! My name is Ron Hertzberg, I am a nursing recruiter at Fusion Medical Staffing. I have been in the medical staffing industry for 7 years now, two and a half of those at Fusion.',
        albums: [],
        jobs: []
      },
      {
        id: 'scott-villotta',
        name: 'Scott Villotta',
        image: 'https://static.thegypsynurse.com/2023/06/scott-villotta-Pic-1-scaled.jpg.webp',
        phone: '(877) 230-3885',
        address: '11808 Grant St. , Omaha, NE, 68164',
        website: 'https://www.fusionmedstaff.com/?utm_source=google_gmb&utm_medium=organic',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=60177',
        description: 'Hello! My name is Scott Villotta, I am a Senior Cath Lab Account Manager at Fusion Medical Staffing. I have been in the industry and at Fusion for 8 years. I mainly work with cath lab, IR, EP nurses and technologists. In the last 8 years there have been a lot of ups and downs, if I didn\'t work with so many wonderful traveling professionals, I would not have made it this long. Our travelers are the foundation of Fusion\'s success. I personally believe trust and urgency are the two most important pieces to the puzzle when navigating the adventures of being a traveling medical professional. I am married to a beautiful RN with two wonderful sons. I enjoy time with my family, friends, coaching my sons teams and golfing.',
        overview: 'Hello! My name is Scott Villotta, I am a Senior Cath Lab Account Manager at Fusion Medical Staffing. I have been in the industry and at Fusion for 8 years.',
        about: 'Hello! My name is Scott Villotta, I am a Senior Cath Lab Account Manager at Fusion Medical Staffing. I have been in the industry and at Fusion for 8 years.',
        albums: [],
        jobs: []
      },
      {
        id: 'sue-randle',
        name: 'Sue Randle',
        image: 'https://static.thegypsynurse.com/2023/05/Sue-Randle-Headshot.png.webp',
        phone: '(877) 230-3885',
        address: '11808 Grant St. , Omaha, NE, 68164',
        website: 'https://www.fusionmedstaff.com/?utm_source=google_gmb&utm_medium=organic',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=58061',
        description: 'Hello! My name is Sue Randle, I am an account manager team lead in Fusion Medical Staffing\'s Home Health division. I have been in the medical staffing industry for 3 years and at Fusion for 2. I mainly work with home health and hospice nurses. I consider myself a genuine, transparent, and realistic recruiter and I think my travelers would agree. I am married and have two teenage boys and two big dogs, I love them all!',
        overview: 'Hello! My name is Sue Randle, I am an account manager team lead in Fusion Medical Staffing\'s Home Health division. I have been in the medical staffing industry for 3 years and at Fusion for 2.',
        about: 'Hello! My name is Sue Randle, I am an account manager team lead in Fusion Medical Staffing\'s Home Health division. I have been in the medical staffing industry for 3 years and at Fusion for 2.',
        albums: [],
        jobs: []
      }
    ]
  },
  'healthtrust-workforce-solutions': {
    id: 'healthtrust-workforce-solutions',
    name: 'HealthTrust Workforce Solutions',
    website: 'https://www.healthtrustjobs.com/',
    phone: '(800) 737-8661',
    address: '1000 Sawgrass Corporate Parkway, Sunrise, FL, 33323',
    jobApplicationEmail: 'htwsrecruitmentmailbox@hcahealthcare.com',
    logo: 'https://static.thegypsynurse.com/2025/06/HWS-Logo.png.webp',
    overview: 'At HealthTrust Workforce Solutions, healthcare is not just about the four walls of a facility but about the people who provide and receive care. Our focus is empowering healthcare professionals to deliver exceptional patient experiences by providing them with the necessary skills, tools, and support. We partner with healthcare facilities nationwide to ensure the right professionals are in the right roles. We prioritize our clinicians by giving them a voice and access to opportunities to fulfill their mission of improving lives by providing quality patient care. We are committed to our core values of Trust, Innovation, adaptability, courage, and accountability. We are dedicated to positively impacting the healthcare industry by providing first-priority access to more than 200,000 jobs nationwide to our healthcare professionals. Join us and be part of the HealthTrust family, where you can make a difference every day.',
    aboutUs: 'At HealthTrust Workforce Solutions, healthcare is not just about the four walls of a facility but about the people who provide and receive care. Our focus is empowering healthcare professionals to deliver exceptional patient experiences by providing them with the necessary skills, tools, and support. We partner with healthcare facilities nationwide to ensure the right professionals are in the right roles. We prioritize our clinicians by giving them a voice and access to opportunities to fulfill their mission of improving lives by providing quality patient care. We are committed to our core values of Trust, Innovation, adaptability, courage, and accountability. We are dedicated to positively impacting the healthcare industry by providing first-priority access to more than 200,000 jobs nationwide to our healthcare professionals. Join us and be part of the HealthTrust family, where you can make a difference every day.',
    benefits: [
      'Disability Insurance',
      'Agency Housing',
      'Housing Stipend',
      'Meals and Incidentals',
      'Rental Car Payment',
      'Paid Time Off',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance',
      'Certification Reimbursement',
      '401K',
      'Tuition Reimbursement',
      'License Reimbursement',
      'Continuing Education',
      'Workers Compensation',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'Cath Lab Technologist - General - Cath Lab Tech', specialty: 'Cath Lab', location: 'Aventura, FL', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - Labor & Delivery', specialty: 'Labor & Delivery', location: 'Myrtle Beach, SC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - Emergency Room', specialty: 'Emergency Room', location: 'Ft. Walton Bch, FL', startDate: 'Starts: November 20, 2025', endDate: 'Ends: February 19, 2026' },
      { title: 'RN - Burn Unit ICU', specialty: 'Burn', location: 'Denver, CO', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - Emergency Room', specialty: 'Emergency Room', location: 'Wichita, KS', startDate: 'Starts: November 3, 2025', endDate: 'Ends: February 2, 2026' },
      { title: 'RN - Medical-Surgical', specialty: 'MedSurg', location: 'Anchorage, AK', startDate: 'Starts: October 27, 2025', endDate: 'Ends: January 26, 2026' },
      { title: 'RN - General - Cath Lab Tech', specialty: 'Cath Lab', location: 'Austin, TX', startDate: 'Starts: October 20, 2025', endDate: 'Ends: January 19, 2026' },
      { title: 'RN - Postpartum', specialty: 'Postpartum', location: 'Wichita, KS', startDate: 'Starts: October 27, 2025', endDate: 'Ends: January 26, 2026' },
      { title: 'RN - Emergency Room', specialty: 'Emergency Room', location: 'Franklin, NC', startDate: 'Starts: December 21, 2025', endDate: 'Ends: March 22, 2026' },
      { title: 'RN - Labor & Delivery', specialty: 'Labor & Delivery', location: 'Savannah, GA', startDate: 'Starts: October 28, 2025', endDate: 'Ends: January 27, 2026' },
      { title: 'RN - Emergency Room', specialty: 'Emergency Room', location: 'Asheville, NC', startDate: 'Starts: October 20, 2025', endDate: 'Ends: January 19, 2026' },
      { title: 'RN - Psychiatry', specialty: 'Psychiatric', location: 'Kansas City, MO', startDate: 'Starts: December 15, 2025', endDate: 'Ends: December 16, 2025' },
      { title: 'Behavior Health Technician - Psychiatry', specialty: 'Psychiatric', location: 'Kansas City, MO', startDate: 'Starts: December 15, 2025', endDate: 'Ends: December 16, 2025' },
      { title: 'RN - Labor & Delivery', specialty: 'Labor & Delivery', location: 'Nashville, TN', startDate: 'Starts: October 6, 2025', endDate: 'Ends: January 5, 2026' },
      { title: 'RN - Medical-Surgical', specialty: 'MedSurg', location: 'Lone Tree, CO', startDate: 'Starts: December 15, 2025', endDate: 'Ends: December 16, 2025' }
    ],
    albums: [],
    recruiters: []
  },
  'nomad-health': {
    id: 'nomad-health',
    name: 'Nomad Health',
    website: 'http://www.nomadhealth.com',
    phone: '(866) 656-6623',
    address: '27 E 28th Street, Suite 1754, New York, NY, 10016',
    jobApplicationEmail: 'dalton.smith@nomadhealth.com',
    logo: 'https://static.thegypsynurse.com/2025/06/nomad_health_logo.jpg.webp',
    overview: 'At Nomad Health, we\'re redefining the travel healthcare experience by removing obstacles between clinicians and the bedside—so you can get where you want to go, faster. Whether you\'re chasing adventure, career growth, or a higher paycheck, your reason for traveling is yours—we\'re just here to help you get there. With transparent job listings, a seamless app experience, and a recruiter-free model that passes savings directly to you, Nomad empowers you to make informed, confident choices. Once you\'re on board, our team of expert Nomad Navigators supports you every step of the way—from credentialing to clinical questions—so you can focus on what matters most: your journey, your impact, and your next great assignment.',
    aboutUs: 'At Nomad Health, we\'re redefining the travel healthcare experience by removing obstacles between clinicians and the bedside—so you can get where you want to go, faster. Whether you\'re chasing adventure, career growth, or a higher paycheck, your reason for traveling is yours—we\'re just here to help you get there. With transparent job listings, a seamless app experience, and a recruiter-free model that passes savings directly to you, Nomad empowers you to make informed, confident choices. Once you\'re on board, our team of expert Nomad Navigators supports you every step of the way—from credentialing to clinical questions—so you can focus on what matters most: your journey, your impact, and your next great assignment.',
    benefits: [
      'Housing Stipend',
      'Meals and Incidentals',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance',
      'Certification Reimbursement',
      '401K',
      'Tuition Reimbursement',
      'License Reimbursement',
      'Continuing Education',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'RN - Cardiovascular OR', specialty: 'CVOR', location: 'Harrisburg, PA', startDate: 'Starts: November 17, 2025', endDate: 'Ends: February 15, 2026' },
      { title: 'RN - Emergency Room', specialty: 'Emergency Room', location: 'Meriden, CT', startDate: 'Starts: November 17, 2025', endDate: 'Ends: February 15, 2026' },
      { title: 'occupational_therapist - Rehabilitation', specialty: 'Rehab', location: 'Belle Fourche, SD', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'physical_therapist - General', specialty: 'Generalist', location: 'Kaplan, LA', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'radiology_technologist - Cardiovascular Interventional Radiology', specialty: 'Cardiovascular Technologist', location: 'Newton, NJ', startDate: 'Starts: November 10, 2025', endDate: 'Ends: February 14, 2026' },
      { title: 'RN - Pediatric ICU (PICU)', specialty: 'Pediatric Intensive Care', location: 'Springfield, IL', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 15, 2026' },
      { title: 'RN - Cardiac ICU', specialty: 'ICU', location: 'Springfield, IL', startDate: 'Starts: January 19, 2026', endDate: 'Ends: March 15, 2026' },
      { title: 'RN - Telemetry', specialty: 'Tele', location: 'Springfield, IL', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 15, 2026' },
      { title: 'RN - Telemetry', specialty: 'Tele', location: 'Springfield, IL', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 15, 2026' },
      { title: 'RN - Medical-Surgical', specialty: 'MedSurg', location: 'Springfield, IL', startDate: 'Starts: November 24, 2025', endDate: 'Ends: March 15, 2026' },
      { title: 'RN - Pediatric ICU (PICU)', specialty: 'Pediatric Intensive Care', location: 'Springfield, MO', startDate: 'Starts: October 13, 2025', endDate: 'Ends: January 12, 2026' },
      { title: 'RN - Labor & Delivery', specialty: 'Labor & Delivery', location: 'Baltimore, MD', startDate: 'Starts: January 5, 2026', endDate: 'Ends: April 6, 2026' },
      { title: 'RN - Emergency Room', specialty: 'Emergency Room', location: 'Colebrook, NH', startDate: 'Starts: January 26, 2026', endDate: 'Ends: April 27, 2026' },
      { title: 'RN - Medical-Surgical', specialty: 'MedSurg', location: 'Colebrook, NH', startDate: 'Starts: January 19, 2026', endDate: 'Ends: April 20, 2026' },
      { title: 'respiratory_therapist - General', specialty: 'Generalist', location: 'Bemidji, MN', startDate: 'Starts: January 19, 2026', endDate: 'Ends: April 20, 2026' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'amber-maryniewski',
        name: 'Amber Maryniewski',
        image: 'https://static.thegypsynurse.com/2025/06/Amber-Maryniewski-headshott-150x150.jpg.webp',
        phone: '(716) 907-0152',
        address: '27 E 28th Street, Suite 1754, New York, NY, 10016',
        website: 'http://nomadhealth.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79245',
        description: 'I have almost 8 years experience in Staffing/Recruiting Healthcare Professionals! I absolutely love what I do and enjoy partnering up with some of the toughest people in the world to give their family stability and support! Let\'s work together to find a position that fits you financially but also helps you grow!',
        overview: 'I have almost 8 years experience in Staffing/Recruiting Healthcare Professionals! I absolutely love what I do and enjoy partnering up with some of the toughest people in the world to give their family stability and support! Let\'s work together to find a position that fits you financially but also helps you grow!',
        about: 'I have almost 8 years experience in Staffing/Recruiting Healthcare Professionals! I absolutely love what I do and enjoy partnering up with some of the toughest people in the world to give their family stability and support! Let\'s work together to find a position that fits you financially but also helps you grow!',
        albums: [],
        jobs: []
      },
      {
        id: 'ashland-motley',
        name: 'Ashland Motley',
        image: 'https://static.thegypsynurse.com/2025/07/Ashland-headshot-150x150.jpg.webp',
        phone: '(980) 890-7250',
        address: '27 E 28th Street, Suite 1754, New York, NY, 10016',
        website: 'http://nomadhealth.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79614',
        description: 'Hi! My name is Ashland Motley. I have been in the healthcare staffing industry for almost 4 years now and I have loved every second of it. I have worked a few agencies prior gaining experience with Allied, Locum Tenens, Nursing, Travel, and Per Diem work. I graduated from Clemson University (Go Tigers!) with a Bachelor of Science in Food Science & Nutrition and I am originally from South Carolina. I enjoy cooking, walks, spending time with family + friends, and doing puzzles with my grandmother. I have a 1.5 year old Aussiedoodle name Lucy that loves to be outside & keeping me busy in my free time!',
        overview: 'Hi! My name is Ashland Motley. I have been in the healthcare staffing industry for almost 4 years now and I have loved every second of it. I have worked a few agencies prior gaining experience with Allied, Locum Tenens, Nursing, Travel, and Per Diem work.',
        about: 'Hi! My name is Ashland Motley. I have been in the healthcare staffing industry for almost 4 years now and I have loved every second of it. I have worked a few agencies prior gaining experience with Allied, Locum Tenens, Nursing, Travel, and Per Diem work.',
        albums: [],
        jobs: []
      },
      {
        id: 'joshua-moore',
        name: 'Joshua Moore',
        image: 'https://static.thegypsynurse.com/2025/06/Josh-Moore-150x150.jpg.webp',
        phone: '(980) 294-4805',
        address: '27 E 28th Street, Suite 1754, New York, NY, 10016',
        website: 'http://nomadhealth.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79243',
        description: 'Joshua Moore is a Premier Navigator at Nomad Health, where he helps connect travelers with assignments that match their goals and lifestyles. A 17-year U.S. Army veteran, Joshua brings discipline, empathy, and a mission-driven mindset to healthcare staffing. He\'s currently pursuing a Bachelor of Arts in Social Media, blending his background in service and recruitment with a passion for digital communication. Whether supporting clinicians or building meaningful connections, Joshua is committed to making a lasting impact in the healthcare community.',
        overview: 'Joshua Moore is a Premier Navigator at Nomad Health, where he helps connect travelers with assignments that match their goals and lifestyles. A 17-year U.S. Army veteran, Joshua brings discipline, empathy, and a mission-driven mindset to healthcare staffing.',
        about: 'Joshua Moore is a Premier Navigator at Nomad Health, where he helps connect travelers with assignments that match their goals and lifestyles. A 17-year U.S. Army veteran, Joshua brings discipline, empathy, and a mission-driven mindset to healthcare staffing.',
        albums: [],
        jobs: []
      },
      {
        id: 'liz-leras',
        name: 'Liz Leras',
        image: 'https://static.thegypsynurse.com/2025/06/Liz-Leras--150x150.jpeg.webp',
        phone: '(980) 246-3270',
        address: '27 E 28th Street, Suite 1754, New York, NY, 10016',
        website: 'http://nomadhealth.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79244',
        description: 'I\'ve been in the health care industry for over 20 years, and a healthcare recruiter for almost 8 years. I love getting to know my travelers and being a part of their adventure. I\'m a mom to an awesome teenager, 2 rescue dogs, and a chinchilla. In my free time I love reading, going to the gym, going to concerts, spending time with my friends and family, making entomology art, and volunteering.',
        overview: 'I\'ve been in the health care industry for over 20 years, and a healthcare recruiter for almost 8 years. I love getting to know my travelers and being a part of their adventure.',
        about: 'I\'ve been in the health care industry for over 20 years, and a healthcare recruiter for almost 8 years. I love getting to know my travelers and being a part of their adventure.',
        albums: [],
        jobs: []
      },
      {
        id: 'melody-ferrell',
        name: 'Melody Ferrell',
        image: 'https://static.thegypsynurse.com/2025/07/Melody-headshot-150x150.jpg.webp',
        phone: '(980) 325-3595',
        address: '27 E 28th Street, Suite 1754, New York, NY, 10016',
        website: 'http://nomadhealth.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79615',
        description: 'I\'m a Senior Healthcare Recruiter with over 5 years of experience in Healthcare Staffing, based in the Atlanta, GA area. I\'m passionate about helping clinicians reach their professional goals by building strong, transparent partnerships. I believe in clear, honest communication and take pride in working closely with providers to find the right opportunities that align with their skills and aspirations.',
        overview: 'I\'m a Senior Healthcare Recruiter with over 5 years of experience in Healthcare Staffing, based in the Atlanta, GA area. I\'m passionate about helping clinicians reach their professional goals by building strong, transparent partnerships.',
        about: 'I\'m a Senior Healthcare Recruiter with over 5 years of experience in Healthcare Staffing, based in the Atlanta, GA area. I\'m passionate about helping clinicians reach their professional goals by building strong, transparent partnerships.',
        albums: [],
        jobs: []
      }
    ]
  },
  'onestaff-medical': {
    id: 'onestaff-medical',
    name: 'OneStaff Medical',
    website: 'https://www.onestaffmedical.com/traveljobs',
    phone: '(877) 783-1483',
    address: '10802 Farnam Dr., Omaha, NE, 68154',
    jobApplicationEmail: 'gypsynurse@onestaffmedical.com',
    logo: 'https://static.thegypsynurse.com/2019/12/onestaff.png.webp',
    overview: 'YOUR ONESTAFF MEDICAL RESOURCES You deserve a partner that is working for you. Be bold and let us do just that. We\'ll take care of you while you are away from your own "home base" in every way we can, and ideally do more than you expect. If we don\'t, we want to hear your feedback (click here) so we constantly adjust how we are working with our clients. Your team at OneStaff is dedicated to finding the perfect assignments (for you), negotiate the best rates and handles any issues that may arise while you are on assignment. We take great pride in building relationships with our traveling professionals and we enjoy hearing about your experiences. Whatever the need, we are here to help along the journey. Our recruiters have decades of experience in the healthcare industry,as well as mucho \'people skills\' to ensure two goals; 1) getting you placed in your current dream assignment and 2) we all have fun doing it. By understanding what you need, and what you like, we help find the ideal facility for you. We won\'t stop until we are sure we\'re providing our healthcare professionals the most personal and professional service available. We understand you are the heart and soul of what we are. Whether it is housing, payroll, travel, benefits, or just a friendly voice to talk to, we are there every step of the way. The company you choose is the most important decision you will make in your traveling career. We get that, so we\'re committed to you 24 hours-a-day, 7 days-a-week. We\'re your "one" solution in travel assignments and here to assist whether helping with accelerating your trajectory towards your career goals or meeting your travel requirements. We guarantee to make every effort to ensure your experience with us is enjoyable, as well as personally fulfilling. If we make you happy, we are happy. We welcome you to the OneStaff team!',
    aboutUs: 'YOUR ONESTAFF MEDICAL RESOURCES You deserve a partner that is working for you. Be bold and let us do just that. We\'ll take care of you while you are away from your own "home base" in every way we can, and ideally do more than you expect. If we don\'t, we want to hear your feedback (click here) so we constantly adjust how we are working with our clients. Your team at OneStaff is dedicated to finding the perfect assignments (for you), negotiate the best rates and handles any issues that may arise while you are on assignment. We take great pride in building relationships with our traveling professionals and we enjoy hearing about your experiences. Whatever the need, we are here to help along the journey. Our recruiters have decades of experience in the healthcare industry,as well as mucho \'people skills\' to ensure two goals; 1) getting you placed in your current dream assignment and 2) we all have fun doing it. By understanding what you need, and what you like, we help find the ideal facility for you. We won\'t stop until we are sure we\'re providing our healthcare professionals the most personal and professional service available. We understand you are the heart and soul of what we are. Whether it is housing, payroll, travel, benefits, or just a friendly voice to talk to, we are there every step of the way. The company you choose is the most important decision you will make in your traveling career. We get that, so we\'re committed to you 24 hours-a-day, 7 days-a-week. We\'re your "one" solution in travel assignments and here to assist whether helping with accelerating your trajectory towards your career goals or meeting your travel requirements. We guarantee to make every effort to ensure your experience with us is enjoyable, as well as personally fulfilling. If we make you happy, we are happy. We welcome you to the OneStaff team!',
    benefits: [
      'Agency Housing',
      'Housing Stipend',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'Travel Registered Nurse RN Labor and Delivery L&D', specialty: 'Labor & Delivery', location: 'Hibbing, MN', startDate: 'Starts: December 22, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Labor and Delivery L&D', specialty: 'Labor & Delivery', location: 'Fairfield, CA', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Neonatal Intensive Care Unit NICU', specialty: 'NICU', location: 'Walnut Creek, CA', startDate: 'Starts: January 6, 2026', endDate: '' },
      { title: 'Travel Registered Nurse RN Skilled Nursing', specialty: 'Skilled Nursing', location: 'Winnemucca, NV', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Telemetry', specialty: 'Tele', location: 'Bridgeport, WV', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Progressive Care Unit PCU', specialty: 'PCU', location: 'Quincy, IL', startDate: 'Starts: January 7, 2026', endDate: '' },
      { title: 'Travel Registered Nurse RN Medical Surgical', specialty: 'MedSurg', location: 'Peoria, IL', startDate: 'Starts: January 5, 2026', endDate: '' },
      { title: 'Travel Registered Nurse RN Hospice', specialty: 'Hospice', location: 'Baltimore, MD', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Emergency Room ER', specialty: 'Emergency Room', location: 'Providence, RI', startDate: 'Starts: December 22, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Intensive Care Unit ICU', specialty: 'ICU', location: 'Skowhegan, ME', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Labor and Delivery L&D', specialty: 'Labor & Delivery', location: 'Framingham, MA', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Intensive Care Unit ICU', specialty: 'ICU', location: 'Meadville, PA', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Telemetry', specialty: 'Tele', location: 'Uniontown, PA', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Travel Registered Nurse RN Medical Surgical', specialty: 'MedSurg', location: 'Colebrook, NH', startDate: 'Starts: January 19, 2026', endDate: '' },
      { title: 'Travel Registered Nurse RN Emergency Room ER', specialty: 'Emergency Room', location: 'Colebrook, NH', startDate: 'Starts: January 26, 2026', endDate: '' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'abby-sindt',
        name: 'Abby Sindt',
        image: 'https://static.thegypsynurse.com/2021/06/ABBYEDITED-150x150.jpg.webp',
        phone: '(877) 783-1483268',
        address: '',
        website: '',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=14278',
        description: 'A veteran recruiter here at OneStaff Medical, I bring over 16 years of experience in the medical field to the partnerships I create with my travelers.',
        overview: 'A veteran recruiter here at OneStaff Medical, I bring over 16 years of experience in the medical field to the partnerships I create with my travelers.',
        about: 'A veteran recruiter here at OneStaff Medical, I bring over 16 years of experience in the medical field to the partnerships I create with my travelers.',
        albums: [],
        jobs: []
      },
      {
        id: 'denise-christensen',
        name: 'Denise Christensen',
        image: 'https://static.thegypsynurse.com/2021/06/DENISE-CHRISTENSEN-150x150.jpg.webp',
        phone: '(877) 783-1483287',
        address: '',
        website: '',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=14276',
        description: 'I am passionate about helping others. I want to be a positive change for others. Life is short my goal is to enjoy every single moment!',
        overview: 'I am passionate about helping others. I want to be a positive change for others. Life is short my goal is to enjoy every single moment!',
        about: 'I am passionate about helping others. I want to be a positive change for others. Life is short my goal is to enjoy every single moment!',
        albums: [],
        jobs: []
      },
      {
        id: 'henry-kelpe',
        name: 'Henry Kelpe',
        image: 'https://static.thegypsynurse.com/2021/06/HENRY-EDIT-1-150x150.jpg.webp',
        phone: '(877) 783-1483240',
        address: '',
        website: '',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=14294',
        description: 'I enjoy traveling and the outdoors. I also tend to gravitate to whatever sports I can be involved in. I coach and enjoy spreading the enjoyment of sports to all! I love to work with travelers and I don\'t feel like I "come to work" on a daily basis. *2017 Employee of the Year *American Heart Association Instructor',
        overview: 'I enjoy traveling and the outdoors. I also tend to gravitate to whatever sports I can be involved in. I coach and enjoy spreading the enjoyment of sports to all! I love to work with travelers and I don\'t feel like I "come to work" on a daily basis.',
        about: 'I enjoy traveling and the outdoors. I also tend to gravitate to whatever sports I can be involved in. I coach and enjoy spreading the enjoyment of sports to all! I love to work with travelers and I don\'t feel like I "come to work" on a daily basis.',
        albums: [],
        jobs: []
      },
      {
        id: 'jenny-nelson',
        name: 'Jenny Nelson',
        image: 'https://static.thegypsynurse.com/2021/06/Jenni-Nelson-Headshot-150x150.png.webp',
        phone: '',
        address: '',
        website: '',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=33524',
        description: 'Outgoing, energetic, Love meeting new people and helping people find their potential!',
        overview: 'Outgoing, energetic, Love meeting new people and helping people find their potential!',
        about: 'Outgoing, energetic, Love meeting new people and helping people find their potential!',
        albums: [],
        jobs: []
      },
      {
        id: 'kayla-cash',
        name: 'Kayla Cash',
        image: 'https://static.thegypsynurse.com/2021/06/KAYLACASH-150x150.jpg.webp',
        phone: '(531) 484-2862',
        address: '',
        website: '',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=32926',
        description: 'I\'m a 6 Year RN Recruiter & 2019s Recruiter of the Year for HealthCare Travelers Take Conference. I thoroughly enjoy what I do as I feel that it aides in contributing to the care of others. Having the back of the travelers I work with is my way of doing just that! On a personal note, I have 3 large pups that are my world!',
        overview: 'I\'m a 6 Year RN Recruiter & 2019s Recruiter of the Year for HealthCare Travelers Take Conference. I thoroughly enjoy what I do as I feel that it aides in contributing to the care of others.',
        about: 'I\'m a 6 Year RN Recruiter & 2019s Recruiter of the Year for HealthCare Travelers Take Conference. I thoroughly enjoy what I do as I feel that it aides in contributing to the care of others.',
        albums: [],
        jobs: []
      },
      {
        id: 'payton-parks',
        name: 'Payton Parks',
        image: 'https://static.thegypsynurse.com/2021/04/Payton-Headshot-150x150.png.webp',
        phone: '(402) 515-3508',
        address: '',
        website: '',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=33523',
        description: 'I am our Resident Social Media-holic. I connect with travelers on Facebook and LinkedIn, and I will post OneStaff updates on my personal Instagram story. Any social media news, job posts, or \'tea\' that you see travel industry or otherwise, I would love to discuss and help out. Give me a shout on any of my social media links and let\'s get you on the OneStaff Medical Team',
        overview: 'I am our Resident Social Media-holic. I connect with travelers on Facebook and LinkedIn, and I will post OneStaff updates on my personal Instagram story.',
        about: 'I am our Resident Social Media-holic. I connect with travelers on Facebook and LinkedIn, and I will post OneStaff updates on my personal Instagram story.',
        socialMedia: {
          facebook: 'https://www.facebook.com/payton.parks',
          linkedin: 'https://www.linkedin.com/in/payton-parks',
          instagram: 'https://www.instagram.com/paytonparks',
        },
        albums: [],
        jobs: []
      },
      {
        id: 'sammi-berch',
        name: 'Sammi Berch',
        image: 'https://static.thegypsynurse.com/2021/04/Samantha-headshot.jpg.webp',
        phone: '',
        address: '',
        website: '',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=33521',
        description: 'Hey! I am a senior nursing recruiter with OneStaff, native Nebraskan, and proud mama of one human child and three fur babies. Some of my favorite things include Oreos, TV, rescuing critters, and finding travelers the position they\'re looking for! I\'m excited to build an even bigger team of amazing healthcare professionals and finding you, your perfect job match!',
        overview: 'Hey! I am a senior nursing recruiter with OneStaff, native Nebraskan, and proud mama of one human child and three fur babies. Some of my favorite things include Oreos, TV, rescuing critters, and finding travelers the position they\'re looking for!',
        about: 'Hey! I am a senior nursing recruiter with OneStaff, native Nebraskan, and proud mama of one human child and three fur babies. Some of my favorite things include Oreos, TV, rescuing critters, and finding travelers the position they\'re looking for!',
        albums: [],
        jobs: []
      },
      {
        id: 'steve-barnes',
        name: 'Steve Barnes',
        image: 'https://static.thegypsynurse.com/2021/06/Steve-headshot-150x150.jpg.webp',
        phone: '',
        address: '',
        website: '',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=33522',
        description: 'I am a fun-loving guy who enjoys his career very much. I get to have a good time making friends with nurses who in turn help hospitals take care of people. In my free time I like to play with my kids, watch Syracuse Basketball and hang out with my best friend Louie Brezina.',
        overview: 'I am a fun-loving guy who enjoys his career very much. I get to have a good time making friends with nurses who in turn help hospitals take care of people.',
        about: 'I am a fun-loving guy who enjoys his career very much. I get to have a good time making friends with nurses who in turn help hospitals take care of people.',
        albums: [],
        jobs: []
      }
    ]
  },
  'seven-healthcare': {
    id: 'seven-healthcare',
    name: 'Seven Healthcare',
    website: 'https://www.seven-healthcare.com/',
    phone: '(305) 990-1587',
    address: '1221 Brickell Avenue, Brickell Suite 900 - #246, Miami, FL, 33131',
    jobApplicationEmail: 'b.roadknight@seven-resourcing.com',
    logo: 'https://static.thegypsynurse.com/2025/10/Seven-Healthcare-200-x-200@2x.png',
    overview: 'Seven Healthcare is proud to be Joint Commission–certified, demonstrating our commitment to quality, safety, and excellence in healthcare staffing. If you are seeking an exciting new chapter in your healthcare career, our multi-award-winning team is here to help. With more than ten years of experience placing exceptional staff with employers across the USA, we have also built a strong track record of helping healthcare professionals from Canada secure rewarding travel contracts in the United States. From Travel Nurses, LPNs, LVNs, and CNAs to Allied Health professionals such as CT Technologists, Radiologic Technologists, MRI Technologists, Physical Therapists, and many more, we can help you take the next step in your career.',
    aboutUs: 'Seven Healthcare is proud to be Joint Commission–certified, demonstrating our commitment to quality, safety, and excellence in healthcare staffing. If you are seeking an exciting new chapter in your healthcare career, our multi-award-winning team is here to help. With more than ten years of experience placing exceptional staff with employers across the USA, we have also built a strong track record of helping healthcare professionals from Canada secure rewarding travel contracts in the United States. From Travel Nurses, LPNs, LVNs, and CNAs to Allied Health professionals such as CT Technologists, Radiologic Technologists, MRI Technologists, Physical Therapists, and many more, we can help you take the next step in your career.',
    benefits: [
      'Housing Stipend',
      'Meals and Incidentals',
      'Weekly Pay',
      'Health Insurance',
      'Certification Reimbursement',
      'License Reimbursement',
      'Continuing Education',
      'Workers Compensation',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'Travel Registered Nurse - Geriatrics (RN)', specialty: 'Geriatrics', location: 'Jacksonville, NC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - MedSurg/Tele', specialty: 'MS Tele', location: 'Plymouth, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - Surgical Intensive Care (SICU)', specialty: 'SICU', location: 'Boston, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - CVICU', specialty: 'CVICU', location: 'Boston, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - Labor and Delivery', specialty: 'Labor & Delivery', location: 'Beverly, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - Emergency Room (RN)', specialty: 'Emergency Room', location: 'Brockton, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - LDRP (RN)', specialty: 'LDRP', location: 'Brockton, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - Post Anesthetic Care (PACU)', specialty: 'PACU', location: 'Brockton, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - Intensive Care Unit (ICU)', specialty: 'ICU', location: 'Beverly, MA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse - Post Anesthetic Care (PACU)', specialty: 'PACU', location: 'Plymouth, MA', startDate: 'Starts: ASAP', endDate: '' }
    ],
    albums: [],
    recruiters: []
  },
  'triage-staffing': {
    id: 'triage-staffing',
    name: 'Triage Staffing',
    website: 'https://triagestaff.com/',
    phone: '(800) 259-9897',
    address: '12020 Pacific Street, Omaha, NE, 68154',
    jobApplicationEmail: 'csideris@triagestaff.com',
    logo: 'https://static.thegypsynurse.com/2021/02/1to1_Ratio-002.png.webp',
    overview: 'At Triage, we believe sweet jobs don\'t need sugarcoating. And since even the best positions aren\'t 100% flawless, we\'re perfectly honest about what isn\'t perfect. Management consultants call it "setting expectations." We call it giving a damn—something we will always choose to do. When you take an assignment with Triage you can expect custom, competitive pay packages, a reliable recruiter and team who always has your back, and day one nationwide insurance benefits. Yeah, you read that right—benefits that benefit you day one on the job. Because we\'re not just here for a signature on the dotted line. We\'re here for the long haul and to get you exactly what you want out of your nursing career.',
    aboutUs: 'At Triage, we believe sweet jobs don\'t need sugarcoating. And since even the best positions aren\'t 100% flawless, we\'re perfectly honest about what isn\'t perfect. Management consultants call it "setting expectations." We call it giving a damn—something we will always choose to do. When you take an assignment with Triage you can expect custom, competitive pay packages, a reliable recruiter and team who always has your back, and day one nationwide insurance benefits. Yeah, you read that right—benefits that benefit you day one on the job. Because we\'re not just here for a signature on the dotted line. We\'re here for the long haul and to get you exactly what you want out of your nursing career.',
    benefits: [
      'Agency Housing',
      'Housing Stipend',
      'Paid Time Off',
      'Weekly Pay',
      'Health Insurance',
      'Certification Reimbursement',
      '401K',
      'License Reimbursement',
      'Continuing Education',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviewsCount: 5,
    reviews: [],
    jobs: [
      { title: 'Travel L&D RN | Springfield, TN', specialty: 'Labor & Delivery', location: 'Springfield, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel OR Tech | North Adams, MA', specialty: 'OR Tech', location: 'North Adams, MA', startDate: 'Starts: January 5, 2026', endDate: '' },
      { title: 'Travel OR RN | Mount Holly, NJ', specialty: 'Operating Room', location: 'Mount Holly, NJ', startDate: 'Starts: January 5, 2026', endDate: '' },
      { title: 'Travel Stepdown/PCU RN | Greenville, NC', specialty: 'Stepdown', location: 'Greenville, NC', startDate: 'Starts: December 29, 2025', endDate: '' },
      { title: 'Travel ICU RN | Lake Placid, FL', specialty: 'ICU', location: 'Lake Placid, FL', startDate: 'Starts: December 1, 2025', endDate: '' },
      { title: 'Travel OR Tech | Portsmouth, NH', specialty: 'OR Tech', location: 'Portsmouth, NH', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel ER RN | Hershey, PA', specialty: 'Emergency Room', location: 'Hershey, PA', startDate: 'Starts: December 23, 2025', endDate: '' },
      { title: 'Travel Stepdown/PCU RN | Sebring, FL', specialty: 'Stepdown', location: 'Sebring, FL', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Stepdown/PCU RN | Rock Island, IL', specialty: 'Stepdown', location: 'Rock Island, IL', startDate: 'Starts: December 29, 2025', endDate: '' },
      { title: 'Travel LPN/LVN | Keene, NH', specialty: 'LPN', location: 'Keene, NH', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Travel OR Tech | Everett, MA', specialty: 'OR Tech', location: 'Everett, MA', startDate: 'Starts: January 6, 2026', endDate: '' },
      { title: 'Travel CVOR RN | Camden, NJ', specialty: 'CVOR', location: 'Camden, NJ', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Travel CT Tech | Camden, NJ', specialty: 'CT Scan Tech', location: 'Camden, NJ', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Travel L&D RN | Auburn, WA', specialty: 'Labor & Delivery', location: 'Auburn, WA', startDate: 'Starts: January 12, 2026', endDate: '' },
      { title: 'Travel Stepdown/PCU RN | Muscatine, IA', specialty: 'Stepdown', location: 'Muscatine, IA', startDate: 'Starts: December 29, 2025', endDate: '' }
    ],
    albums: [],
    recruiters: []
  },
  'vibra-travels': {
    id: 'vibra-travels',
    name: 'Vibra Travels',
    website: 'https://www.vibratravels.com/',
    phone: '(717) 591-5700',
    address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
    jobApplicationEmail: 'travel@vibratravels.com',
    logo: 'https://static.thegypsynurse.com/2024/01/vibra-square.jpg.webp',
    overview: 'Regardless of the placement you\'re seeking, you\'ll experience the same great benefits when choosing Vibra Travels for your next contract. White-glove service, every step of the way: At Vibra Travels, we believe in providing top-notch service to our travel nurses. From the moment you first contact us, you\'ll experience a level of support and care that sets us apart from the rest. Your recruiter, your partner: Unlike other travel nursing agencies, we believe in building one-on-one relationships with our clinicians. Your dedicated recruiter will be your advocate, guiding you through the entire process and ensuring your needs are met. Clinical support at your fingertips: We understand that being a traveler can sometimes be challenging. That\'s why we have a dedicated clinical support team available to answer any questions or concerns you may have during your assignments. Nationwide placements, endless opportunities: With Vibra Travels, you\'ll have access to placements across the nation. Whether you\'re looking for an acute care, rehabilitation, critical care, or behavioral health hospital, we have opportunities waiting for you in every corner of the country. Join us today and experience traveling done different!',
    aboutUs: 'Regardless of the placement you\'re seeking, you\'ll experience the same great benefits when choosing Vibra Travels for your next contract. White-glove service, every step of the way: At Vibra Travels, we believe in providing top-notch service to our travel nurses. From the moment you first contact us, you\'ll experience a level of support and care that sets us apart from the rest. Your recruiter, your partner: Unlike other travel nursing agencies, we believe in building one-on-one relationships with our clinicians. Your dedicated recruiter will be your advocate, guiding you through the entire process and ensuring your needs are met. Clinical support at your fingertips: We understand that being a traveler can sometimes be challenging. That\'s why we have a dedicated clinical support team available to answer any questions or concerns you may have during your assignments. Nationwide placements, endless opportunities: With Vibra Travels, you\'ll have access to placements across the nation. Whether you\'re looking for an acute care, rehabilitation, critical care, or behavioral health hospital, we have opportunities waiting for you in every corner of the country. Join us today and experience traveling done different!',
    benefits: [
      'Housing Stipend',
      'Tuition Reimbursement',
      'License Reimbursement',
      'Continuing Education',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'Allied Health', specialty: 'Radiology', location: 'Georgetown, KY', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'PTA', location: 'hays, KS', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'MRI Tech', location: 'Lake Havasu City, AZ', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'CT Scan Tech', location: 'Mayfield, KY', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'PTA', location: 'Syla, NC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'CT Scan Tech', location: 'Georgetown, KY', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'CT Scan Tech', location: 'Orangeburg, SC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'Cath Lab', location: 'Kennewick, WA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'Cath Lab', location: 'Marquette, MI', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'Cath Lab', location: 'charleston, SC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'Surgical Assistant', location: 'Lake Havasu City, AZ', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'Radiology', location: 'Florence, SC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'Nuclear Medicine', location: 'charleston, SC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'Other', location: 'greenville, SC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Allied Health', specialty: 'Other', location: 'charleston, SC', startDate: 'Starts: ASAP', endDate: '' }
    ],
    albums: [],
    recruiters: [
      {
        id: 'aaron-waller',
        name: 'Aaron Waller',
        image: 'https://static.thegypsynurse.com/2025/06/Aaron-Waller-150x150.jpeg.webp',
        phone: '(717) 906-8362',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'http://awaller@vibrahealth.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=76319',
        description: 'Aaron is a Talent Acquisition Partner with Vibra Travels. He has 5+ years recruiting experience within behavioral health, education, engineering, financial, & construction industries. He has a bachelor\'s degree in Human Resource Management from Liberty University, where he was a student athlete (D1 Football). He was also appointed to team leadership his senior year. He is passionate about building relationships with his candidates and peers, as well as being a trusted partner to his stakeholders. Outside of work, he enjoys spending time with his family (wife, 2 daughters, and dog), traveling, and watching NFL football (hardcore Los Angeles Chargers fan)!'
      },
      {
        id: 'brittany-freyer-xenidis',
        name: 'Brittany Freyer-Xenidis',
        image: 'https://static.thegypsynurse.com/2025/06/Brittany-Freyer-Xenidis-150x150.jpeg.webp',
        phone: '(915) 205-1282',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=70654',
        description: 'Brittany is a talent acquisition partner with Vibra Travels. She has been in the healthcare industry for over 11 years in various settings. Brittany has a bachelor\'s degree in sports medicine, health, and exercise science from Guilford College, along with an associate\'s degree in physical therapist assistant from Carroll Community College. She builds trusting relationships quickly and enjoys the process of finding the perfect match for both the candidate and the hospital. When she is not working with her candidates, Brittany enjoys spending time with her two children and husband, CrossFit, and reading.'
      },
      {
        id: 'brittany-hulsman',
        name: 'Brittany Hulsman',
        image: 'https://static.thegypsynurse.com/2025/06/Brittany-Hulsman-150x150.jpeg.webp',
        phone: '(717) 241-8383',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=70655',
        description: 'Brittany has worked in the healthcare field since 2015 as a Certified Occupational Therapy Assistant. She has experience working in skilled nursing facilities and home health, providing fun and exceptional treatments to her patients. In 2022, she decided to pivot her career into her new role as a talent acquisition partner with Vibra Travels. Brittany loves building relationships with travelers and always provides a positive attitude! When she is not working with her travelers, Brittany loves spending time with her two sons and husband!'
      },
      {
        id: 'ellen-purtell',
        name: 'Ellen Purtell',
        image: 'https://static.thegypsynurse.com/2025/04/Ellen-Purtell-150x150.jpeg.webp',
        phone: '(605) 430-8550',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=78609',
        description: 'Ellen is a talent acquisition partner with Vibra Travels. She graduated from Coastal Carolina University with a degree in Psychology and has worked in healthcare staffing since 2018. She uses industry insight and experience to guide clinicians toward the best opportunities to match their goals and lifestyle. Outside of work, Ellen enjoys spending time with her rescue animals, gardening, and exploring the local food scene in Charleston SC.'
      },
      {
        id: 'haley-laughlin',
        name: 'Haley Laughlin',
        image: 'https://static.thegypsynurse.com/2025/06/Haley-Laughlin-150x150.jpeg.webp',
        phone: '(724) 841-4434',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79266',
        description: 'Haley is a dedicated Talent Acquisition Partner with over four years of experience in allied and nurse recruitment. Haley earned her bachelor\'s degree in Public Health from Slippery Rock University, where she also served as the captain of the Co-ed Cheerleading team.'
      },
      {
        id: 'heather-dugan',
        name: 'Heather Dugan',
        image: 'https://static.thegypsynurse.com/2025/06/Heather-Dugan-150x150.jpeg.webp',
        phone: '(717) 280-0180',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=70656',
        description: 'Heather is a talent acquisition partner with Vibra Travels. Heather originally started as a radiographer and worked in a clinical/hospital setting for seven years before transitioning to healthcare recruiting. Using her healthcare knowledge and drive, Heather\'s goal is to get you the best placement possible. Outside of work, Heather enjoys spending time with her husband and two young children. Heather also enjoys camping, hiking, and breweries.'
      },
      {
        id: 'jennifer-bieda',
        name: 'Jennifer Bieda',
        image: 'https://static.thegypsynurse.com/2025/06/Jennifer-Bieda-150x150.jpeg.webp',
        phone: '(717) 241-8929',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=70659',
        description: 'Jennifer works as a talent acquisition partner based in southern California. She holds a Bachelor\'s degree in Spanish Language and Literature and a Master of Arts in Speech-Language Pathology. After years of helping adults in the hospital setting as a speech-language pathologist, she ventured into a new field with Vibra Travels, helping healthcare providers find fulfilling travel roles. Jennifer uses her clinical experience and focus on patient care to help candidates and hospitals find the best matches for the overall benefit of the patient. Outside of work, Jennifer enjoys running, surfing, traveling, spoiling her rescue dog, and fostering other pups.'
      },
      {
        id: 'kylie-georgiana',
        name: 'Kylie Georgiana',
        image: 'https://static.thegypsynurse.com/2025/08/Kylie-Headshot-150x150.jpg.webp',
        phone: '(717) 241-8224',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80144',
        description: 'Kylie is a Talent Acquisition Partner at Vibra Travels with over 6 years of recruiting experience in healthcare, behavioral health, and nonprofit organizations. She has a passion for helping people find careers they\'re truly excited about, and she brings a thoughtful, people-first approach to every search. Kylie holds a Master\'s degree in Human Resources Management from Purdue University Global and a Bachelor\'s degree in Psychology from Penn State University. Kylie prides herself on her ability to build strong, genuine relationships with both candidates and teams, and she\'s always looking for ways to make hiring processes more efficient, engaging, and human. Outside of work, Kylie loves spending time with her family, reading, and taking care of her two very spoiled dogs, Crouton and Hope, who happily run the household!'
      },
      {
        id: 'lauren-demyen',
        name: 'Lauren Demyen',
        image: 'https://static.thegypsynurse.com/2025/08/Lauren-Demyen-150x150.jpg.webp',
        phone: '(717) 433-8159',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80145',
        description: 'Lauren is a Talent Acquisition Partner who has a background in Recruitment specializing in Allied Health. She has worked within healthcare for close to over 4 years. She enjoys connecting with candidates and building long term relationships with them while finding them their perfect assignment!'
      },
      {
        id: 'mallory-krazer',
        name: 'Mallory Krazer',
        image: 'https://static.thegypsynurse.com/2025/06/Mallory-Krazer-150x150.jpeg.webp',
        phone: '(717) 706-5306',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=73169',
        description: 'Mallory is a Talent Acquisition Partner with Vibra Travels. She is a Fort Worth, TX city dweller who loves to volunteer, travel, partake in outdoor activities, and find new adventures along the way. She has experience working in industries ranging from Physical Therapy Clinics to High Volume Healthcare Recruiting. She enjoys meeting new people, developing new relationships, solving problems, and contributing to the overall growth and core values of a business.'
      },
      {
        id: 'marcie-schartz',
        name: 'Marcie Schartz',
        image: 'https://static.thegypsynurse.com/2025/06/Marcie-Schartz-150x150.jpg.webp',
        phone: '(223) 533-8307',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=70660',
        description: 'After obtaining a bachelor\'s degree in psychology, Marcie embarked on a journey in the social work field for several years. Her passion for making a difference in the lives of others eventually led her to healthcare recruiting. With an understanding of healthcare dynamics and a passion for helping others, Marcie\'s mission is to create an exceptional candidate experience. Her goal is not only to match clinicians with their dream placements but to foster enduring, mutually beneficial professional relationships. Outside of work, Marcie is an avid traveler and is dedicated to maintaining her physical and mental well-being with a passion for weightlifting and walks with her dog. Marcie also cherishes moments spent with her family and friends.'
      },
      {
        id: 'sara-hinze',
        name: 'Sara Hinze',
        image: 'https://static.thegypsynurse.com/2025/06/Sara-Hinze-150x150.jpeg',
        phone: '(608) 479-1677',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79265',
        description: 'Sara is a dedicated healthcare recruiter with over 10 years of experience specializing in placing both nursing and allied health professionals in positions that align with their unique skills and career goals. She is passionate about building strong relationships with clinicians and takes pride in helping them find assignments that are the best fit.'
      },
      {
        id: 'sarah-osborne',
        name: 'Sarah Osborne',
        image: 'https://static.thegypsynurse.com/2025/01/Sarah-Osborne-150x150.jpg.webp',
        phone: '(717) 706-2781',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=77584',
        description: 'Sarah is a dedicated Talent Acquisition Partner with over five years of experience staffing healthcare professionals across a variety of settings. She specializes in working with long-term acute care and rehabilitation facilities, leveraging her expertise to connect top-tier talent with facilities that need their skills most. Sarah thrives on building meaningful relationships with travelers and healthcare facilities alike. Her commitment to fostering strong connections ensures facilities receive exceptional staffing solutions while travelers enjoy seamless and rewarding experiences. Outside of work Sarah loves spending time with her husband and two young boys. She enjoys camping, wineries, and perfecting her sourdough baking skills.'
      },
      {
        id: 'taylor-jones',
        name: 'Taylor Jones',
        image: 'https://static.thegypsynurse.com/2025/01/Taylor-Jones-150x150.jpeg.webp',
        phone: '(717) 934-0354',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=77585',
        description: 'Taylor is a dedicated healthcare staffing professional with over nine years of experience in the industry. She began her career specializing in physician staffing, where she honed her skills in matching healthcare providers with the right opportunities. Taylor earned her Bachelor\'s degree in Psychology from Shippensburg University, where she also served as the captain of the field hockey team. Priding herself on her relationship-building skills, Taylor aims to be the best resource possible for her clinicians. She understands that effective communication and trust are essential in the staffing process, and she works diligently to foster strong connections with both clients and candidates. Outside of work, Taylor enjoys spending time with her family and dog, Luna. She enjoys traveling and is a huge sports fan.'
      },
      {
        id: 'tj-riddle',
        name: 'TJ Riddle',
        image: 'https://static.thegypsynurse.com/2025/06/Anthony-TJ-Riddle-150x150.jpeg.webp',
        phone: '(717) 514-7931',
        address: '4600 Lena Drive, Mechanicsburg, PA, 17055',
        website: 'https://www.vibratravels.com/',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=70661',
        description: 'TJ is a talent acquisition partner at Vibra Travels. He started out in the industrial and manufacturing industries and has been working in the healthcare industry for almost a year. He loves what he does and is always excited to help healthcare professionals progress in their careers. He is a happy-go-lucky mix of introvert and extrovert depending on the day. Most days are spent working and doing chores, but beyond the daily grind, he is a fitness enthusiast and a sweets connoisseur (Reese\'s are the GOAT), and he is currently becoming a better cook. Some days, he\'s outdoors going on a hike, playing sports, fishing, or spending quality time with his dog, Madden.'
      }
    ]
  },
  'ario-healthcare': {
    id: 'ario-healthcare',
    name: 'Ario Healthcare',
    website: 'http://ariohealthcare.com',
    phone: '(347) 614-4142',
    address: '500 7th Ave, New York, NY, 10018',
    jobApplicationEmail: 'Jobs@ariohealthcare.com',
    logo: 'https://static.thegypsynurse.com/2025/07/Ario-Logo.png.webp',
    overview: 'At Ario Healthcare, putting people over profits is more than a principle. It is the foundation of everything we do for healthcare professionals. We embrace a genuine, human-centered approach to staffing. Your career is more than a job; it\'s a calling built on compassion, dedication, and skill. Our mission is to ensure you\'re valued, supported, and respected every step of your travel healthcare journey. Our team takes the time to understand your individual goals, matching you with travel placements that truly align with your aspirations. We offer competitive pay, seamless onboarding, and complete transparency, allowing you to focus fully on delivering exceptional patient care. While travel roles are our specialty, we also provide options for local assignments and permanent placements to accommodate your changing needs. When you join Ario Healthcare, you become part of a community grounded in inclusion, collaboration, and mutual support. Your voice and experiences matter here, and we\'re committed to helping you thrive both professionally and personally. Ario Healthcare isn\'t just another staffing company. We\'re your partner, dedicated to creating meaningful connections that enrich your career and positively impact the communities you serve. Join us in reshaping the future of healthcare staffing, where your wellbeing and career goals always come first.',
    aboutUs: 'At Ario Healthcare, putting people over profits is more than a principle. It is the foundation of everything we do for healthcare professionals. We embrace a genuine, human-centered approach to staffing. Your career is more than a job; it\'s a calling built on compassion, dedication, and skill. Our mission is to ensure you\'re valued, supported, and respected every step of your travel healthcare journey. Our team takes the time to understand your individual goals, matching you with travel placements that truly align with your aspirations. We offer competitive pay, seamless onboarding, and complete transparency, allowing you to focus fully on delivering exceptional patient care. While travel roles are our specialty, we also provide options for local assignments and permanent placements to accommodate your changing needs. When you join Ario Healthcare, you become part of a community grounded in inclusion, collaboration, and mutual support. Your voice and experiences matter here, and we\'re committed to helping you thrive both professionally and personally. Ario Healthcare isn\'t just another staffing company. We\'re your partner, dedicated to creating meaningful connections that enrich your career and positively impact the communities you serve. Join us in reshaping the future of healthcare staffing, where your wellbeing and career goals always come first.',
    benefits: [
      'Housing Stipend',
      'Meals and Incidentals',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance'
    ],
    reviews: [],
    jobs: [
      { title: 'Travel LPN/LVN with Completion Bonus – Med Surg', specialty: 'LPN', location: 'Richmond, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel LPN/LVN with Completion Bonus – Rehab', specialty: 'LPN', location: 'Richmond, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse with Completion Bonus – Rehab', specialty: 'Rehab', location: 'Salem, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse with Completion Bonus – PCU/Cardiac Stepdown Unit', specialty: 'PCU', location: 'Richmond, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse with Completion Bonus – Oncology', specialty: 'Oncology', location: 'Richmond, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse with Completion Bonus – Med Surg', specialty: 'MedSurg', location: 'Richmond, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse with Completion Bonus – ER', specialty: 'Emergency Room', location: 'Salem, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Registered Nurse (RN) – Cath Lab, Completion Bonus Included', specialty: 'Cardio Cath', location: 'Richmond, VA', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse - Completion Bonus Included', specialty: 'Registered Nurse', location: 'CO', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse with Completion Bonus', specialty: 'Registered Nurse', location: 'TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse - Completion Bonus Available', specialty: 'Registered Nurse', location: 'TX', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse - PCU', specialty: 'PCU', location: 'Smyrna, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse - PCU', specialty: 'PCU', location: 'Nashville, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse - Tele', specialty: 'Tele', location: 'Chattanooga, TN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Travel Nurse - NICU', specialty: 'NICU', location: 'Webster, TX', startDate: 'Starts: ASAP', endDate: '' }
    ],
    recruiters: [
      {
        id: 'emeline-bisch',
        name: 'Emeline Bisch',
        image: 'https://static.thegypsynurse.com/2025/07/EB-Headshot2-150x150.jpg.webp',
        phone: '(347) 603-8623',
        address: '500 7th Ave, New York, NY, 10018',
        website: 'http://ariohealthcare.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79633',
        description: 'As a passionate and results-driven Senior Recruitment Consultant with over 8 years of experience in healthcare staffing, I specialize in connecting dedicated healthcare professionals with opportunities that align with their skills, values, and career aspirations. At Ario Healthcare, I focus on building meaningful, long-term partnerships with both clinicians and clients - ensuring every placement supports quality care and workforce stability. With a strong foundation in account management, strategic recruitment, and talent acquisition, I take pride in understanding the unique needs of each nurse and facility. My goal is to provide personalized, thoughtful solutions that empower healthcare professionals to thrive - whether they\'re seeking their next travel assignment or a long-term role.'
      },
      {
        id: 'gerhaldine-mcknight',
        name: 'Gerhaldine McKnight',
        image: 'https://static.thegypsynurse.com/2025/07/Gerhaldine-300x300.jpg.webp',
        phone: '(347) 943-3443',
        address: '500 7th Ave, New York, NY, 10018',
        website: 'http://ariohealthcare.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79634',
        description: 'Gerhaldine McKnight is a Staffing Manager and Talent Acquisition Specialist with over 15 years of experience in healthcare recruitment and workforce operations. She has led full cycle hiring across multiple states, managed applicant tracking systems like Paycom, and reviewed thousands of resumes. Her background includes roles at FCP Live-in Staffing, Thornbury Nursing Services (UK), and Elizabeth Seton Pediatric Center, where she improved hiring efficiency and compliance. Gerhaldine holds an MSc in International Management from Manhattanville University and a BBA, Magna cum Laude, from the College of Westchester. She is a SHRM member and passionate about building inclusive, mission-driven teams.'
      }
    ]
  },
  'health-advocates-network': {
    id: 'health-advocates-network',
    name: 'Health Advocates Network',
    website: 'http://hanstaff.com',
    phone: '(214) 606-0153',
    address: '1875 NW Corporate Blvd, Suite 120, Boca Raton, FL, 33431',
    jobApplicationEmail: 'TravelLeadership@hanstaff.com',
    logo: 'https://static.thegypsynurse.com/2025/11/logo-han.jpg.webp',
    overview: 'Health Advocates Network is a healthcare staffing agency made for nurses, by nurses. We understand the needs of healthcare professionals and advocate for them every step of the way. From short- and long-term travel contracts to per diem, local staffing, provisional staffing, direct hire, and temp-to-perm placements, we offer flexible workforce solutions for every healthcare setting. Recognized as a ClearlyRated Best of Staffing winner and one of SIA\'s fastest-growing firms, we\'re proud to empower the professionals who make healthcare possible.',
    aboutUs: 'Health Advocates Network is a healthcare staffing agency made for nurses, by nurses. We understand the needs of healthcare professionals and advocate for them every step of the way. From short- and long-term travel contracts to per diem, local staffing, provisional staffing, direct hire, and temp-to-perm placements, we offer flexible workforce solutions for every healthcare setting. Recognized as a ClearlyRated Best of Staffing winner and one of SIA\'s fastest-growing firms, we\'re proud to empower the professionals who make healthcare possible.',
    benefits: [
      'Housing Stipend',
      'Meals and Incidentals',
      'Paid Time Off',
      'Weekly Pay',
      'Health Insurance',
      '401K',
      'Continuing Education',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [
      { title: 'RN - Med-Surg', specialty: 'MedSurg', location: 'Atlanta, GA', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'RN - M/S Tele', specialty: 'MS Tele', location: 'Farmville, VA', startDate: 'Starts: January 12, 2026', endDate: '' },
      { title: 'RN - Pediatric Step Down', specialty: 'Pediatric', location: 'Baltimore, MD', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Respiratory Therapist - Registered Respiratory Therapist', specialty: 'Respiratory Therapist', location: 'Carmel, IN', startDate: 'Starts: December 14, 2025', endDate: '' },
      { title: 'RN - ER', specialty: 'Emergency Room', location: 'WICHITA, KS', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - CVICU', specialty: 'CVICU', location: 'Wichita, KS', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'RN - ER', specialty: 'Emergency Room', location: 'Sabetha, KS', startDate: 'Starts: January 4, 2026', endDate: '' },
      { title: 'RN - PCU', specialty: 'PCU', location: 'Wichita, KS', startDate: 'Starts: December 21, 2025', endDate: '' },
      { title: 'Respiratory Therapist - Registered Respiratory Therapist', specialty: 'Respiratory Therapist', location: 'Grosse Pointe Woods, MI', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'RN - Med-Surg', specialty: 'MedSurg', location: 'Natchez, MS', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN - ICU', specialty: 'ICU', location: 'Natchez, MS', startDate: 'Starts: December 8, 2025', endDate: '' },
      { title: 'Respiratory Therapist - Registered Respiratory Therapist', specialty: 'Respiratory Therapist', location: 'Saint Louis, MO', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Respiratory Therapist - Registered Respiratory Therapist', specialty: 'Respiratory Therapist', location: 'Saint Louis, MO', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'Respiratory Therapist - Registered Respiratory Therapist', specialty: 'Respiratory Therapist', location: 'Miles City, MT', startDate: 'Starts: December 15, 2025', endDate: '' },
      { title: 'RN - ER', specialty: 'Emergency Room', location: 'Baltimore, MD', startDate: 'Starts: December 15, 2025', endDate: '' }
    ],
    recruiters: [
      {
        id: 'adam-williams',
        name: 'Adam Williams',
        image: 'https://static.thegypsynurse.com/2025/11/adam-150x150.jpg',
        phone: '(214) 606-0153',
        address: '1875 NW Corporate Blvd Ste 120, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81376',
        description: 'Adam Williams brings over 21 years of healthcare experience in acute/hospital, geriatric care, rehab, mental health, senior living, long-term care, schools, and home health. President, VP and Director Leadership roles within Recruitment, GPO, MSP, and Business Development positions him as an industry leader who\'s been recognized by Forbes multiple years and Who\'s Who of Business for his success and capabilities. A proud father of 3 amazing kids, Adam resides in Little Elm, Texas just outside of Dallas. In his spare time, you can find him volunteering at U&I Achieve Center for Adults with Disabilities, working out, and enjoying music and movies from the 80\'s'
      },
      {
        id: 'brian-hunziker',
        name: 'Brian Hunziker',
        image: 'https://static.thegypsynurse.com/2025/11/brian-150x150.png',
        phone: '(314) 312-2472',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81353',
        description: 'Hi this is Brian with Health Advocates Network. I\'ve been in the Healthcare field for over 14 years and thoroughly enjoy helping HCP\'s find their next great assignment! I specialize in Respiratory and all Allied Specialties. I look forward to connecting!'
      },
      {
        id: 'corey-allen',
        name: 'Corey Allen',
        image: 'https://static.thegypsynurse.com/2025/11/corey-150x150.jpg',
        phone: '(551) 501-6066',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81086',
        description: 'With 7 years of experience in healthcare recruiting, Corey Allen has successfully placed professionals across a wide spectrum of specialties including MDs, CRNAs, RNs, PTs, OTs, SLPs, and Migrant Shelter Workers. A former Division I track athlete. Outside of recruiting, he\'s a passionate wedding photographer and an avid supporter of the Chicago Bears, St. Louis Blues, St. Louis City SC, Chicago Bulls, and Paris Saint-Germain.'
      },
      {
        id: 'jennifer-mckisic',
        name: 'Jennifer McKisic',
        image: 'https://static.thegypsynurse.com/2025/11/Jen-pic-jpeg-150x150.png',
        phone: '(321) 329-8927',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81354',
        description: 'Jennifer is a seasoned Healthcare Recruiter with 20 plus years of experience connecting Healthcare professionals to their dream jobs nationally. My greatest strength is working with clinicians in every way to ensure that they have a successful contract.'
      },
      {
        id: 'kalana-harger',
        name: 'Kalana Harger',
        image: 'https://static.thegypsynurse.com/2025/11/Viv-pic-150x150.jpg',
        phone: '(321) 329-8952',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81351',
        description: 'Kalana brings over 10 years of experience in healthcare recruiting and staffing, specializing in acute care, hospital settings, after-hours support, and home health. She holds a master\'s degree in Human Resources and is passionate about connecting nurses with the perfect contract—one placement at a time.'
      },
      {
        id: 'latosha-buckner',
        name: 'Latosha Buckner',
        image: 'https://static.thegypsynurse.com/2025/11/latosha-150x150.jpg',
        phone: '(321) 735-2790',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81088',
        description: 'LaTosha Buckner, Healthcare Recruiter with 18 years of experience specializing in sourcing and placing nurses and clinical staff in fast-paced healthcare environments. I build strong relationships with nurses, ensuring candidates are matched appropriately to skill requirements, patient needs, and facility expectations. I am committed to finding you the perfect assignment while maintaining a positive candidate experience, open communication, and full transparency always. A Win - Win for all built off trust and honesty, your Career Advocate!'
      },
      {
        id: 'laura-marcilliat',
        name: 'Laura Marcilliat',
        image: 'https://static.thegypsynurse.com/2025/11/laura-150x150.jpg',
        phone: '(308) 856-9034',
        address: '1875 NW Corporate Blvd, Suite 120, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81370',
        description: 'I have over 16+ years of staffing/recruiting experience in nursing. I would love to take my experience and put it to work for you. I look at my nurses\' experiences and help them find the best fit for them so that they can have a great and enjoyable travel experience.'
      },
      {
        id: 'melissa-giles',
        name: 'Melissa Giles',
        image: 'https://static.thegypsynurse.com/2025/11/Melissa-Giles-Headshot-150x150.jpg',
        phone: '(330) 488-5709',
        address: '1875 Corporate Blvd NW Ste 120, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81068',
        description: 'Melissa Giles has over 18 years of experience in the recruiting and staffing industry. She believes being a recruiter in the healthcare industry is the best way for her to contribute to quality healthcare. As a service-oriented professional, she enjoys connecting with candidates and building relationships to help people achieve their goals. With her belief that there is no "one size fits all" approach to healthcare staffing, she likes to take an individual approach with each of her nurses to ensure she is helping them thrive during their travel journey.'
      },
      {
        id: 'michael-tubbs',
        name: 'Michael Tubbs',
        image: 'https://static.thegypsynurse.com/2025/11/tubes-150x150.jpg',
        phone: '(210) 378-4557',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81352',
        description: 'As a passionate advocate and seasoned recruiter specializing in diagnostic imaging within the travel sector, I bring a unique blend of expertise and dedication to connecting talented professionals with rewarding opportunities across the nation. With a deep understanding of both the healthcare industry and the intricacies of travel recruitment, I strive to match exceptional candidates with positions that not only meet their career goals but also fulfill their desire to travel. With a focus on fostering lasting relationships and ensuring the perfect fit for both candidates and clients, I am committed to driving positive change in a dynamic market of healthcare staffing while facilitating unforgettable career journeys.'
      },
      {
        id: 'paul-aelmore',
        name: 'Paul Aelmore',
        image: 'https://static.thegypsynurse.com/2025/11/thumbnail-PaulRita-150x150.jpg',
        phone: '(309) 249-8187',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81087',
        description: '20+ years as a recruiter. The last 14+ years in the medical field placing Allied & Nursing. I love helping people reach their travel & Financial goals. My wife and I have 14 Grandkids that we watch in our spare time. Life is precious so make the most of it!'
      },
      {
        id: 'rob-cucchi',
        name: 'Rob Cucchi',
        image: 'https://static.thegypsynurse.com/2025/11/rob-150x150.jpg',
        phone: '(312) 488-2954',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81089',
        description: 'I have been in recruiting for a little over 6 years and currently reside in the Chicago area. I have a passion and drive to assist Allied Health Professionals in finding their perfect travel assignment to help improve their quality of life and deliver excellent healthcare to our wonderful clients.'
      }
    ]
  },
  'rapid-temps': {
    id: 'rapid-temps',
    name: 'Rapid Temps by DocGo',
    website: 'http://rapidtemps.com',
    phone: '(800) 581-4846',
    address: '9670 Eagle Ranch Rd NW, Albuquerque, New Mexico, 87114',
    jobApplicationEmail: 'xae.sanchez@docgo.com',
    logo: 'https://static.thegypsynurse.com/2023/01/rapidtemps.jpg.webp',
    overview: 'Rapid Temps is a full service medical staffing company, providing nationwide services for 20 years. We can assist you with medical personnel for exactly what you need whether it is for one day, a few days, several weeks or permanently. We are experienced in helping cover shortages in both Rural & Metro areas all across America.',
    aboutUs: 'Rapid Temps is a full service medical staffing company, providing nationwide services for 20 years. We can assist you with medical personnel for exactly what you need whether it is for one day, a few days, several weeks or permanently. We are experienced in helping cover shortages in both Rural & Metro areas all across America.',
    benefits: [
      'Disability Insurance',
      'Paid Time Off',
      'Health Insurance',
      'Workers Compensation',
      'Direct Deposit'
    ],
    jobs: []
  },
  'samba-traveler': {
    id: 'samba-traveler',
    name: 'SambaTraveler',
    website: 'http://www.sambatraveler.com',
    phone: '(908) 882-5750',
    address: '250 Cedarbridge Ave , Lakewood, NJ, 08701',
    jobApplicationEmail: 'jobs@sambatraveler.com',
    logo: 'https://static.thegypsynurse.com/2025/02/sambastaffing.png.webp',
    overview: 'Since 2016, we\'ve eschewed corporate norms in favor of embracing more dynamic, innovative practices. We pride ourselves on being fiercely competitive, and on constantly pushing boundaries to exceed expectations and set new standards in healthcare staffing. Fueled by passion and the pursuit of excellence, we work tirelessly to foster a culture of collaboration and can-do determination. Join Samba to be a part of a warm network of healthcare professionals, where every placement is seen, not as a transaction, but as a partnership of mutual growth, respect, and success.',
    aboutUs: 'Since 2016, we\'ve eschewed corporate norms in favor of embracing more dynamic, innovative practices. We pride ourselves on being fiercely competitive, and on constantly pushing boundaries to exceed expectations and set new standards in healthcare staffing. Fueled by passion and the pursuit of excellence, we work tirelessly to foster a culture of collaboration and can-do determination. Join Samba to be a part of a warm network of healthcare professionals, where every placement is seen, not as a transaction, but as a partnership of mutual growth, respect, and success.',
    benefits: [
      'Housing Stipend',
      'Meals and Incidentals',
      'Paid Time Off',
      'Weekly Pay',
      'Travel Pay',
      'Health Insurance',
      'Certification Reimbursement',
      '401K',
      'License Reimbursement',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    jobs: [
      { title: 'Registered Respiratory Tech (RRT) - Registered Respiratory Tech (RRT)', specialty: 'RRT', location: 'Urbana, IL', startDate: 'Starts: November 24, 2025', endDate: 'Ends: February 21, 2026' },
      { title: 'Dental Assistant - Dental Assistant', specialty: 'Other', location: 'Hopkins, MN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Patient Services Representative - Patient Services Representative', specialty: 'Other', location: 'Green Bay, WI', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Dental Hygienist - Dental Hygienist', specialty: 'Other', location: 'Green Bay, WI', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Dental Hygienist - Dental Hygienist', specialty: 'Other', location: 'Hopkins, MN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'Registered Nurse - NICU', specialty: 'NICU', location: 'Newark, NJ', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 23, 2026' },
      { title: 'Certified Nursing Assistant (CNA) - Long Term Care (LTC)', specialty: 'LTAC', location: 'Baltimore, MD', startDate: 'Starts: January 5, 2026', endDate: 'Ends: April 13, 2026' },
      { title: 'Social Worker - Social Worker', specialty: 'Other', location: 'Randallstown, MD', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 23, 2026' },
      { title: 'Registered Nurse - Post Anesthesia Care Unit (PACU)', specialty: 'PACU', location: 'Huntington, WV', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Registered Nurse - Emergency Room', specialty: 'Emergency Room', location: 'Weston, WV', startDate: 'Starts: December 15, 2025', endDate: 'Ends: March 16, 2026' },
      { title: 'Registered Nurse - Operating Room', specialty: 'Operating Room', location: 'Weston, WV', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 23, 2026' },
      { title: 'Surgical Tech (CST) - Cardiovascular (CVOR)', specialty: 'CVOR', location: 'Newark, NJ', startDate: 'Starts: December 22, 2025', endDate: 'Ends: March 23, 2026' },
      { title: 'Registered Nurse - Medical Surgical', specialty: 'MedSurg', location: 'Charleston, WV', startDate: 'Starts: December 18, 2025', endDate: 'Ends: March 19, 2026' }
    ],
    recruiters: [
      {
        id: 'lauren-giaramita',
        name: 'Lauren Giaramita',
        image: 'https://static.thegypsynurse.com/2025/02/Lauren-Headshot.png',
        phone: '(908) 882-5749',
        address: '250 Cedarbridge Ave, Lakewood, NJ, 08701',
        website: 'http://www.sambatraveler.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=77984',
        description: 'Meet Lauren Giaramita, our warm and welcoming Recruiter at SambaTraveler! When she\'s not matching talented caregivers with those who need them, Lauren loves whipping up sweet treats through her cake and candy business. This Jersey girl enjoys campfires, family time, sports, and a NY Rangers game. At home, Lauren\'s adored twins, furry friends-keep her smiling. With a Pastry & Baking degree and pursuing a Bachelor\'s in Business and Marketing, Lauren brings her passion for helping others to SambaTraveler every day'
      }
    ]
  },
  'trusted-health': {
    id: 'trusted-health',
    name: 'Trusted Health',
    website: 'https://www.trustedhealth.com/',
    phone: '(415) 466-1466',
    address: '201 California Street, Ste 950, San Francisco, CA, 94111',
    jobApplicationEmail: 'tgn_leads@trustedhealth.com',
    logo: 'https://static.thegypsynurse.com/2023/07/Trusted_Symbol_CMYK_Fresh-Mint_Black-Small.jpg.webp',
    overview: 'Trusted Health is helping travel nurses and allied health professionals build the lives they want. Discover and apply to flexible nursing and allied health jobs anytime, anywhere. We offer personalized job matching, transparency, Clinician-led support with your Care Team, easy-apply with one click, and timecard tracking at your fingertips. Trusted is dedicated to supporting clinicians in our Community through forums and events connecting you with other clinicians, resources like our salary explorer, city guides, CEU tracker, resume builder, and credential management ensuring you are guided throughout your career. Day 1: Benefit options include medical, dental, and vision. There are various health plans to allow nurses to select the coverage that best fits their needs. The cost of these plans is subsidized by Trusted, with the remaining amount deducted from your paycheck on a pre-tax basis. In addition to traditional healthcare benefits, we also offer mental health and wellness benefits - such as therapy, meditation, and fitness services - through various partners. Trusted also provides Liability Insurance, Workers Compensation Insurance, and a 401k retirement plan.',
    aboutUs: 'Trusted Health is helping travel nurses and allied health professionals build the lives they want. Discover and apply to flexible nursing and allied health jobs anytime, anywhere. We offer personalized job matching, transparency, Clinician-led support with your Care Team, easy-apply with one click, and timecard tracking at your fingertips. Trusted is dedicated to supporting clinicians in our Community through forums and events connecting you with other clinicians, resources like our salary explorer, city guides, CEU tracker, resume builder, and credential management ensuring you are guided throughout your career. Day 1: Benefit options include medical, dental, and vision. There are various health plans to allow nurses to select the coverage that best fits their needs. The cost of these plans is subsidized by Trusted, with the remaining amount deducted from your paycheck on a pre-tax basis. In addition to traditional healthcare benefits, we also offer mental health and wellness benefits - such as therapy, meditation, and fitness services - through various partners. Trusted also provides Liability Insurance, Workers Compensation Insurance, and a 401k retirement plan.',
    benefits: [
      'Meals and Incidentals',
      'Health Insurance',
      '401K',
      'Workers Compensation',
      'Direct Deposit',
      'Referral Bonuses'
    ],
    jobs: [
      { title: 'RN', specialty: 'MedSurg', location: 'Evansville, IN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN', specialty: 'MedSurg', location: 'Evansville, IN', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN', specialty: 'Other', location: 'Fayetteville, NC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN', specialty: 'Tele', location: 'Fayetteville, NC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN', specialty: 'Tele', location: 'Fayetteville, NC', startDate: 'Starts: ASAP', endDate: '' },
      { title: 'RN', specialty: 'Other', location: 'Fayetteville, NC', startDate: 'Starts: ASAP', endDate: '' }
    ],
    recruiters: []
  }
}

// Format date with year helper
const formatDateWithYear = (date: string | undefined): string => {
  if (!date) return ''
  // Check if date already has a year (contains comma followed by 4 digits)
  if (/\d{4}/.test(date)) {
    return date
  }
  // Add current year if not present
  const currentYear = new Date().getFullYear()
  return `${date}, ${currentYear}`
}

export default function AgencyProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedOverview, setExpandedOverview] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [likedJobs, setLikedJobs] = useState<string[]>([])
  const [dislikedJobs, setDislikedJobs] = useState<string[]>([])
  const [pendingJobs, setPendingJobs] = useState<string[]>([])
  
  const agencyId = params?.id as string
  const agency = agencyData[agencyId] || agencyData['american-mobile']
  const selectedAlbumData = selectedAlbum ? agency.albums?.find((a: any) => a.id === selectedAlbum) : null

  // Mapping between agency names and staffing company names
  const agencyToStaffingCompanyMap: { [key: string]: string[] } = {
    'american-mobile': ['AMN Healthcare', 'AMN', 'American Mobile'],
    'tnaa': ['TNAA', 'Travel Nurse Across America'],
    'trustaff': ['Trustaff', 'Trustaff Healthcare'],
    'ab-staffing': ['AB Staffing', 'AB Staffing Solutions'],
    'advantage-medical': ['Advantage Medical', 'Advantage Medical Professionals'],
    'flexcare': ['FlexCare', 'FlexCare Medical Staffing'],
    'titan-medical-group': ['Titan Medical Group', 'Titan Medical'],
    'medical-solutions': ['Medical Solutions', 'MedSol'],
    'tripod-partners': ['Tripod Partners', 'Tripod Partners USA'],
    'at-staffing': ['A.T. Staffing', 'A.T. Staffing Medical Careers'],
    'core-medical-group': ['Core Medical Group', 'CoreMedical Group'],
    'fastaff': ['Fastaff', 'Fastaff Travel Nursing'],
    'fusion-medical-staffing': ['Fusion Medical Staffing', 'Fusion'],
    'healthtrust-workforce-solutions': ['HealthTrust Workforce Solutions', 'HealthTrust', 'HWS'],
    'nomad-health': ['Nomad Health', 'Nomad'],
    'onestaff-medical': ['OneStaff Medical', 'OneStaff'],
    'seven-healthcare': ['Seven Healthcare', 'Seven'],
    'triage-staffing': ['Triage Staffing', 'Triage'],
    'vibra-travels': ['Vibra Travels', 'Vibra'],
    'ario-healthcare': ['Ario Healthcare', 'Ario'],
    'health-advocates-network': ['Health Advocates Network', 'HAN']
  }

  // Get staffing company names for this agency
  const staffingCompanyNames = agencyToStaffingCompanyMap[agencyId] || [agency.name]

  // Filter jobs by agency name
  const agencyJobs = SAMPLE_JOBS.filter(job => 
    staffingCompanyNames.some(companyName => 
      job.staffingCompany.toLowerCase().includes(companyName.toLowerCase()) ||
      companyName.toLowerCase().includes(job.staffingCompany.toLowerCase())
    )
  )

  // Load job status from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSavedJobs(getBookmarkedJobs())
      setLikedJobs(getLikedJobs())
      setDislikedJobs(getDislikedJobs())
      setPendingJobs(getPendingJobs())
    }
  }, [])

  // Toggle like job
  const toggleLikeJob = (jobId: string) => {
    if (likedJobs.includes(jobId)) {
      removeLikedJob(jobId)
      setLikedJobs(prev => prev.filter(id => id !== jobId))
    } else {
      addLikedJob(jobId)
      setLikedJobs(prev => [...prev, jobId])
      // Remove from disliked if present
      if (dislikedJobs.includes(jobId)) {
        removeDislikedJob(jobId)
        setDislikedJobs(prev => prev.filter(id => id !== jobId))
      }
    }
  }

  // Toggle dislike job
  const toggleDislikeJob = (jobId: string) => {
    if (dislikedJobs.includes(jobId)) {
      removeDislikedJob(jobId)
      setDislikedJobs(prev => prev.filter(id => id !== jobId))
    } else {
      addDislikedJob(jobId)
      setDislikedJobs(prev => [...prev, jobId])
      // Remove from liked if present
      if (likedJobs.includes(jobId)) {
        removeLikedJob(jobId)
        setLikedJobs(prev => prev.filter(id => id !== jobId))
      }
    }
  }

  // Toggle save job
  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      removeBookmarkedJob(jobId)
      setSavedJobs(prev => prev.filter(id => id !== jobId))
    } else {
      addBookmarkedJob(jobId)
      setSavedJobs(prev => [...prev, jobId])
    }
  }

  const openAlbum = (albumId: string) => {
    setSelectedAlbum(albumId)
    setSelectedPhotoIndex(0)
  }

  const closeModal = () => {
    setSelectedAlbum(null)
    setSelectedPhotoIndex(0)
  }

  const nextPhoto = () => {
    if (selectedAlbumData && selectedPhotoIndex < selectedAlbumData.photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1)
    }
  }

  const prevPhoto = () => {
    if (selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!selectedAlbum || !selectedAlbumData) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAlbum(null)
        setSelectedPhotoIndex(0)
      } else if (e.key === 'ArrowRight' && selectedPhotoIndex < selectedAlbumData.photos.length - 1) {
        setSelectedPhotoIndex(selectedPhotoIndex + 1)
      } else if (e.key === 'ArrowLeft' && selectedPhotoIndex > 0) {
        setSelectedPhotoIndex(selectedPhotoIndex - 1)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedAlbum, selectedPhotoIndex, selectedAlbumData])

  // Auto-scroll thumbnail strip to selected photo
  useEffect(() => {
    if (!selectedAlbum || !selectedAlbumData) return
    
    const thumbnailStrip = document.getElementById('thumbnail-strip')
    if (thumbnailStrip) {
      const thumbnail = thumbnailStrip.children[selectedPhotoIndex] as HTMLElement
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [selectedPhotoIndex, selectedAlbum, selectedAlbumData])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'about-us', label: 'About Us', icon: Building2 },
    { id: 'recruiters', label: 'Our Recruiters', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'photos', label: 'Photos', icon: ImageIcon }
  ]

  return (
    <div className="min-h-screen bg-white">
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
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl"
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => {
            const seed = i * 1000 + 12345 // Deterministic seed based on index
            const left = seededRandom(seed) * 100
            const top = seededRandom(seed + 1) * 100
            const duration = 3 + seededRandom(seed + 2) * 2
            const delay = seededRandom(seed + 3) * 2
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                }}
              />
            )
          })}
        </div>
        
        {/* Hero Content - Unique Design */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              {/* Main Glass Card */}
              <div className="bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-2xl rounded-3xl border-2 border-white/30 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                {/* Animated Gradient Overlay */}
                <motion.div
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.1), transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1), transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.1), transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute inset-0 pointer-events-none"
                />
                
                {/* Decorative Corner Accents */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-transparent rounded-br-full blur-2xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-tl-full blur-2xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
                  {/* Left Side - Logo with Unique Styling */}
                  {agency.logo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                      className="flex-shrink-0 relative"
                    >
                      {/* Glowing Ring Effect */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(139, 92, 246, 0.3)',
                            '0 0 40px rgba(59, 130, 246, 0.4)',
                            '0 0 20px rgba(139, 92, 246, 0.3)',
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl"
                      />
                      
                      <div className="relative w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 bg-gradient-to-br from-white via-white/95 to-white/90 backdrop-blur-md rounded-2xl border-2 border-white/40 p-5 flex items-center justify-center shadow-2xl">
                        <Image
                          src={agency.logo}
                          alt={agency.name}
                          width={240}
                          height={240}
                          className="max-w-full max-h-full object-contain"
                          unoptimized
                        />
                      </div>
                      
                      {/* Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        Travel Agency
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {/* Right Side - Content with Icon Cards */}
                  <div className="flex-1 space-y-6">
                    {/* Agency Name */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2">
                        <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                          {agency.name}
                        </span>
                      </h2>
                      {(agency.reviewsCount || (agency.reviews && agency.reviews.length > 0)) && (
                        <div className="flex items-center gap-2 mt-3">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-white/90 font-semibold">
                            {agency.reviewsCount || agency.reviews.length} Reviews
                          </span>
                        </div>
                      )}
                    </motion.div>
                    
                    {/* Contact Info Cards */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="grid sm:grid-cols-2 gap-4"
                    >
                      {agency.website && (
                        <motion.a
                          href={agency.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="group bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/15 transition-all flex items-start gap-3"
                        >
                          <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-lg shadow-lg">
                            <Globe className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-white/70 mb-1">Website</div>
                            <div className="text-white font-semibold text-sm truncate group-hover:text-primary-200 transition-colors flex items-center gap-1">
                              {agency.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </motion.a>
                      )}
                      
                      {agency.phone && (
                        <motion.a
                          href={`tel:${agency.phone}`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="group bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/15 transition-all flex items-start gap-3"
                        >
                          <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-lg shadow-lg">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-white/70 mb-1">Phone</div>
                            <div className="text-white font-semibold text-sm group-hover:text-primary-200 transition-colors">
                              {agency.phone}
                            </div>
                          </div>
                        </motion.a>
                      )}
                      
                      {agency.address && (
                        <motion.div
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="group bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/15 transition-all flex items-start gap-3"
                        >
                          <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-2.5 rounded-lg shadow-lg">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-white/70 mb-1">Address</div>
                            <div className="text-white font-semibold text-sm">
                              {agency.address}
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {agency.jobApplicationEmail && (
                        <motion.a
                          href={`mailto:${agency.jobApplicationEmail}`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="group bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/15 transition-all flex items-start gap-3"
                        >
                          <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-lg shadow-lg">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-white/70 mb-1">Job Applications</div>
                            <div className="text-white font-semibold text-sm truncate group-hover:text-primary-200 transition-colors">
                              {agency.jobApplicationEmail}
                            </div>
                          </div>
                        </motion.a>
                      )}
                    </motion.div>

                    {/* Social Media Links */}
                    {agency.socialMedia && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6"
                      >
                        <div className="text-xs text-white/70 mb-3 font-semibold">Follow Us</div>
                        <div className="flex flex-wrap gap-3">
                          {agency.socialMedia.facebook && (
                            <motion.a
                              href={agency.socialMedia.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all"
                              aria-label="Facebook"
                            >
                              <Facebook className="w-5 h-5" />
                            </motion.a>
                          )}
                          {agency.socialMedia.twitter && (
                            <motion.a
                              href={agency.socialMedia.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-black hover:border-black transition-all"
                              aria-label="Twitter"
                            >
                              <Twitter className="w-5 h-5" />
                            </motion.a>
                          )}
                          {agency.socialMedia.linkedin && (
                            <motion.a
                              href={agency.socialMedia.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-blue-700 hover:border-blue-600 transition-all"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="w-5 h-5" />
                            </motion.a>
                          )}
                          {agency.socialMedia.instagram && (
                            <motion.a
                              href={agency.socialMedia.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-transparent transition-all"
                              aria-label="Instagram"
                            >
                              <Instagram className="w-5 h-5" />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation - Unique Design */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50/30 border-b border-gray-200/50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide py-4 pb-6 pl-1">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300
                  }}
                  className="relative group"
                >
                  <div className={`relative px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}>
                    {/* Active Background with Glass Effect */}
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/30"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(127, 40, 96, 0.3)',
                              '0 0 30px rgba(127, 40, 96, 0.5)',
                              '0 0 20px rgba(127, 40, 96, 0.3)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-xl"
                        />
                      </>
                    )}
                    
                    {/* Hover Background */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    
                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-primary-600'}`} />
                      <span>{tab.label}</span>
                    </span>
                    
                    {/* Active Indicator Dot */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-lg"
                      />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="bg-white py-6 md:py-8 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {agency.name}
                </h4>
                <div className="text-gray-700 leading-relaxed text-sm md:text-base">
                  <p className={expandedOverview ? '' : 'line-clamp-4'}>
                    {agency.overview}
                  </p>
                  {agency.overview.length > 200 && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setExpandedOverview(!expandedOverview)
                      }}
                      className="mt-2 inline-block text-primary-600 hover:text-primary-700 font-semibold text-sm"
                    >
                      {expandedOverview ? 'Read Less' : 'Read More'}
                    </a>
                  )}
                </div>
              </div>
              {agency.benefits && agency.benefits.length > 0 && (
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Benefits</h4>
                  <ul className="space-y-1 text-sm md:text-base">
                    {agency.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="text-gray-700">
                        • {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {agency.albums && agency.albums.length > 0 && (
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                    Recent albums from {agency.name}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agency.albums.map((album: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group cursor-pointer"
                        onClick={() => album.id && album.photos && album.photos.length > 0 && openAlbum(album.id)}
                      >
                        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                          <div className="aspect-video relative overflow-hidden bg-gray-100">
                            {album.image ? (
                              <Image
                                src={album.image}
                                alt={album.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                unoptimized
                              />
                            ) : (
                              <div className="h-full bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center">
                                <Camera className="w-12 h-12 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h5 className="font-semibold text-gray-900 mb-2 text-base group-hover:text-primary-600 transition-colors">
                              {album.name}
                            </h5>
                            <div className="flex items-center gap-2 mt-auto">
                              <Camera className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 font-medium">
                                {album.photoCount} {album.photoCount === 1 ? 'Photo' : 'Photos'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <a 
                      href={`/agency-profile/${agencyId}/photos`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                    >
                      View all albums
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* About Us Tab */}
          {activeTab === 'about-us' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Our Agency</h4>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {agency.aboutUs}
                </p>
              </div>
              {agency.benefits && agency.benefits.length > 0 && (
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Our Benefits</h4>
                  <ul className="space-y-1 text-sm md:text-base">
                    {agency.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="text-gray-700">
                        • {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Our Recruiters Tab */}
          {activeTab === 'recruiters' && (
            <div className="overflow-y-auto max-h-[600px] pr-4 pb-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Recruiters</h4>
              {agency.recruiters && agency.recruiters.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-1 pb-2">
                  {agency.recruiters.map((recruiter: any, index: number) => (
                    <Link
                      key={recruiter.id || index}
                      href={`/agency-profile/${agencyId}/recruiter/${recruiter.id || `recruiter-${index}`}`}
                      className="block h-full no-underline"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group bg-white rounded-xl border-2 border-gray-200 overflow-visible shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer h-full"
                      >
                        {/* Portrait Image - Circular */}
                        <div className="flex justify-center pt-4 pb-2">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-gray-200 shadow-md transition-colors">
                            {recruiter.image ? (
                              <>
                                <Image
                                  src={recruiter.image}
                                  alt={recruiter.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  sizes="128px"
                                  unoptimized
                                />
                              </>
                            ) : (
                              <div className="h-full bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center">
                                <Users className="w-10 h-10 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Content - Compact */}
                        <div className="p-3 flex-1 flex flex-col">
                          <h5 className="text-sm font-semibold text-gray-900 mb-1.5 group-hover:text-primary-600 transition-colors">
                            {recruiter.name}
                          </h5>
                          <p className="text-gray-700 leading-relaxed text-xs line-clamp-2 mb-2">
                            {recruiter.description}
                          </p>
                          {/* View Profile Link */}
                          <div className="mt-auto pt-2 border-t border-gray-100">
                            <span className="text-primary-600 text-xs font-semibold group-hover:text-primary-700 transition-colors flex items-center gap-1">
                              View Profile
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm md:text-base">No recruiters information available at this time.</p>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  Reviews
                  {(agency.reviewsCount || (agency.reviews && agency.reviews.length > 0)) && (
                    <span className="text-base font-normal text-gray-600 ml-2">
                      ({agency.reviewsCount || agency.reviews.length})
                    </span>
                  )}
                </h4>
                
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3 mt-4">
                  Hidden
                </h4>
                
                {agency.reviews && agency.reviews.length > 0 ? (
                  <div className="space-y-4 mb-4">
                    {agency.reviews.map((review: any, index: number) => (
                      <div key={index} className="border-l-4 border-gray-400 pl-4 py-2 space-y-2">
                        <div className="text-sm text-gray-600 font-semibold">
                          {review.date} {review.title}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                          {review.content}
                        </p>
                        <div className="text-sm text-gray-600 font-medium">
                          {review.author}
                        </div>
                      </div>
                    ))}
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                      Load more
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm md:text-base mb-4">No reviews available yet.</p>
                )}
                
                <div className="mb-6 p-3 bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-700 mb-2">
                    You must be logged in to submit a review.
                  </p>
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                    Click to login or register.
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">My Blog Posts</h4>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-sm md:text-base">Sorry, {agency.name} has not made any blog posts yet.</p>
                  <button
                    onClick={() => router.back()}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                  >
                    Go Back
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">My Video Chat Rooms</h4>
                <p className="text-gray-600 text-sm md:text-base mb-3">You don't have any active video chat room.</p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors font-semibold text-sm">
                  Create a video chat room.
                </button>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">My Invites</h4>
                <p className="text-gray-600 text-sm md:text-base">You don't have any active video chat room invites.</p>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Articles for You</h4>
                <p className="text-gray-600 text-sm md:text-base">No articles available at this time.</p>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Open Jobs</h4>
              
              {agencyJobs && agencyJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agencyJobs.map((job, index) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="block h-full no-underline"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="group relative bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden flex flex-col cursor-pointer h-full shadow-xl border border-gray-200/50 hover:border-primary-300/50 transition-all duration-300"
                        style={{
                          backdropFilter: 'saturate(180%) blur(20px)',
                          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                        }}
                        whileHover={{
                          y: -4,
                          scale: 1.02,
                          boxShadow: '0 20px 40px rgba(127, 40, 96, 0.15)',
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                      >
                        {/* Facility Image Header with Gradient Overlay */}
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={getFacilityImageWithFallback(job.facilityImage, job.state)}
                            alt={job.facilityName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          
                          {/* Black Overlay from Four Corners (Vignette Effect) */}
                          <div 
                            className="absolute inset-0 pointer-events-none" 
                            style={{
                              background: `
                                radial-gradient(circle at top left, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at top right, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at bottom left, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at bottom right, rgba(0, 0, 0, 0.4) 0%, transparent 50%)
                              `
                            }}
                          />
                          
                          {/* Gradient Overlay for better text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
                          
                          {/* Featured Tag - Top Left */}
                          {job.featured && (
                            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-md border border-amber-200 z-10">
                              <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                              <span className="text-xs font-semibold text-amber-900">Featured</span>
                            </div>
                          )}

                          {/* Action Buttons - Top Right (if authenticated) */}
                          {isAuthenticated && !pendingJobs.includes(job.id) && (
                            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                              {/* Like Button */}
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleLikeJob(job.id)
                                }}
                                style={{ pointerEvents: 'auto', zIndex: 20 }}
                                className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${
                                  likedJobs.includes(job.id)
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white/30 text-white hover:bg-primary-500'
                                }`}
                              >
                                <ThumbsUp className={`w-4 h-4 ${likedJobs.includes(job.id) ? 'fill-white' : 'text-white'}`} />
                              </motion.button>

                              {/* Dislike Button */}
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.15, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleDislikeJob(job.id)
                                }}
                                style={{ pointerEvents: 'auto', zIndex: 20 }}
                                className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${
                                  dislikedJobs.includes(job.id)
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white/30 text-white hover:bg-primary-500'
                                }`}
                              >
                                <ThumbsDown className={`w-4 h-4 ${dislikedJobs.includes(job.id) ? 'fill-white' : 'text-white'}`} />
                              </motion.button>

                              {/* Bookmark Button */}
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.15, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleSaveJob(job.id)
                                }}
                                style={{ pointerEvents: 'auto', zIndex: 20 }}
                                className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg ${
                                  savedJobs.includes(job.id)
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white/30 text-white hover:bg-primary-500'
                                }`}
                              >
                                <Bookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-white' : 'text-white'}`} />
                              </motion.button>
                            </div>
                          )}

                          {/* PENDING Badge */}
                          {pendingJobs.includes(job.id) && (
                            <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-md border border-orange-200 z-10">
                              <AlertCircle className="w-3 h-3 text-orange-600" />
                              <span className="text-xs font-semibold text-orange-900">Pending</span>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-3 bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
                          {/* Title and Days Ago */}
                          <div className="flex items-center justify-between mb-1.5 gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words leading-tight">
                                {job.licenseSpecialty}
                              </h3>
                            </div>
                            {job.daysAgo !== undefined && (
                              <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 self-start pt-0.5">
                                {job.daysAgo} {job.daysAgo === 1 ? 'day' : 'days'} ago
                              </span>
                            )}
                          </div>

                          {/* Location */}
                          <div className="mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                            <p className="text-xs text-gray-700">
                              {job.location}, {job.state}
                            </p>
                          </div>

                          {/* Details - Simple Three Rows */}
                          <div className="space-y-2 mb-3">
                            {/* Posted Date */}
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500">Start Date</p>
                                <p className="text-xs font-semibold text-gray-900">{formatDateWithYear(job.startDate || job.postedDate)}</p>
                              </div>
                            </div>

                            {/* Shift Type with Hours */}
                            <div className="flex items-center gap-2">
                              <Sun className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500">Shift</p>
                                <p className="text-xs font-semibold text-gray-900">{job.shift} • {job.shiftHours}</p>
                              </div>
                            </div>

                            {/* Facility Name */}
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500">Facility</p>
                                <p className="text-xs font-semibold text-gray-900">{job.facilityName}</p>
                              </div>
                            </div>
                          </div>

                          {/* Pay - Simple Display */}
                          <div className="mt-auto pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-end gap-2">
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Weekly Pay</p>
                                <div className="flex items-baseline justify-end gap-1">
                                  <span className="text-xl font-bold text-gray-900">{job.payPerWeek}</span>
                                  <span className="text-sm font-medium text-gray-600">/week</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm md:text-base">No open jobs available at this time.</p>
              )}
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Photos</h4>
              {agency.albums && agency.albums.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agency.albums.map((album: any, index: number) => (
                      <motion.div
                        key={album.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group cursor-pointer"
                        onClick={() => album.id && album.photos && album.photos.length > 0 && openAlbum(album.id)}
                      >
                        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                          <div className="aspect-video relative overflow-hidden bg-gray-100">
                            {album.image ? (
                              <Image
                                src={album.image}
                                alt={album.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                unoptimized
                              />
                            ) : (
                              <div className="h-full bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center">
                                <Camera className="w-12 h-12 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-primary-600 transition-colors">
                              {album.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-auto">
                              <Camera className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 font-medium">
                                {album.photoCount} {album.photoCount === 1 ? 'Photo' : 'Photos'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link 
                      href={`/agency-profile/${agencyId}/photos`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                    >
                      View all albums
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  {/* Comments Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Comments</h4>
                    <div className="mb-6 p-3 bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-700 mb-2">
                        You must be logged in to view and post comments.
                      </p>
                      <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                        Click to login or register.
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base">No comments yet. Be the first to comment!</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No albums available at this time.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Photo Modal/Lightbox */}
      <AnimatePresence>
        {selectedAlbum && selectedAlbumData && selectedAlbumData.photos && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{selectedAlbumData.name}</h2>
                      <p className="text-white/80 text-sm">
                        {selectedPhotoIndex + 1} of {selectedAlbumData.photos.length}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <Image
                    src={selectedAlbumData.photos[selectedPhotoIndex]}
                    alt={`${selectedAlbumData.name} - Photo ${selectedPhotoIndex + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Navigation Arrows */}
                {selectedPhotoIndex > 0 && (
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors z-10"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}
                {selectedPhotoIndex < selectedAlbumData.photos.length - 1 && (
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors z-10"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Thumbnail Strip */}
                {selectedAlbumData.photos.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div 
                      id="thumbnail-strip"
                      className="flex gap-2 overflow-x-auto scroll-smooth"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      {selectedAlbumData.photos.map((photo: string, index: number) => (
                        <button
                          key={index}
                          id={`thumbnail-${index}`}
                          onClick={() => setSelectedPhotoIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === selectedPhotoIndex
                              ? 'border-white scale-110'
                              : 'border-white/30 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={photo}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
