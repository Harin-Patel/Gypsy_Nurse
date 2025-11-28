'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Camera, Globe, Phone, MapPin, Mail, Star, Building2, ExternalLink, FileText, Users, MessageSquare, Briefcase, ImageIcon, X, ChevronLeft, ChevronRight, Calendar, Sun, Bookmark, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react'
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
    website: 'https://www.flexcarestaff.com',
    phone: '(866) 871-8519',
    address: '2999 Olympus Blvd., Suite 500, Dallas, TX, 75019',
    jobApplicationEmail: 'info@flexcarestaff.com',
    logo: 'https://static.thegypsynurse.com/2025/08/FlexCare-Logo-300x300.png.webp',
    overview: 'At FlexCare, we\'re here for the people behind patient care: travel nurses, allied health professionals, and therapists who show up every day for patients across the country. We started in 2006 with one goal: to do travel healthcare differently. That meant more transparency, better support, and real relationships. From the start, we believed clinicians deserve the same level of care and commitment they give to their patients.',
    aboutUs: 'At FlexCare, we\'re here for the people behind patient care: travel nurses, allied health professionals, and therapists who show up every day for patients across the country. We started in 2006 with one goal: to do travel healthcare differently. That meant more transparency, better support, and real relationships. From the start, we believed clinicians deserve the same level of care and commitment they give to their patients.',
    benefits: [
      'Agency Housing',
      'Health Insurance',
      '401K',
      'Continuing Education',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [],
    albums: []
  },
  'host-healthcare': {
    id: 'host-healthcare',
    name: 'Host Healthcare',
    website: 'https://www.hosthealthcare.com',
    phone: '(866) 871-8519',
    address: '2999 Olympus Blvd., Suite 500, Dallas, TX, 75019',
    jobApplicationEmail: 'info@hosthealthcare.com',
    logo: 'https://static.thegypsynurse.com/2023/11/titan.webp',
    overview: 'As the nation\'s third-largest travel nurse staffing company, we believe all nurses deserve the same quality, human-first service they give their patients. Our expert recruiters work to ensure you great pay and unlimited bonuses, industry-leading benefits, plus the freedom and flexibility to choose from tons of jobs in all 50 states, Washington, D.C, and Guam.',
    aboutUs: 'As the nation\'s third-largest travel nurse staffing company, we believe all nurses deserve the same quality, human-first service they give their patients. Our expert recruiters work to ensure you great pay and unlimited bonuses, industry-leading benefits, plus the freedom and flexibility to choose from tons of jobs in all 50 states, Washington, D.C, and Guam.',
    benefits: [
      'Agency Housing',
      'Health Insurance',
      '401K',
      'Continuing Education',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [],
    albums: []
  },
  'medical-solutions': {
    id: 'medical-solutions',
    name: 'Medical Solutions',
    website: 'https://www.medicalsolutions.com',
    phone: '(866) 871-8519',
    address: '2999 Olympus Blvd., Suite 500, Dallas, TX, 75019',
    jobApplicationEmail: 'info@medicalsolutions.com',
    logo: 'https://static.thegypsynurse.com/2023/01/medi.png.webp',
    overview: 'Your best interest is our best interest. We offer our clients the best in traveling medical professionals. The only way we can attract and maintain a good relationship with those professionals is to keep their best interests in mind. After all, our success relies on your success. That\'s why we always put your best interests in mind—from superior placements to finding great living accommodations and negotiating a fair price to providing the tools you need for success.',
    aboutUs: 'Your best interest is our best interest. We offer our clients the best in traveling medical professionals. The only way we can attract and maintain a good relationship with those professionals is to keep their best interests in mind. After all, our success relies on your success. That\'s why we always put your best interests in mind—from superior placements to finding great living accommodations and negotiating a fair price to providing the tools you need for success.',
    benefits: [
      'Agency Housing',
      'Health Insurance',
      '401K',
      'Continuing Education',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [],
    albums: []
  },
  'tripod-partners': {
    id: 'tripod-partners',
    name: 'Tripod Partners USA',
    website: 'https://www.tripodpartners.com',
    phone: '(866) 871-8519',
    address: '2999 Olympus Blvd., Suite 500, Dallas, TX, 75019',
    jobApplicationEmail: 'info@tripodpartners.com',
    logo: 'https://static.thegypsynurse.com/2025/07/tripod-logo.jpg.webp',
    overview: 'Your Career. Your Freedom. Your Partner. At Tripod Partners USA, we specialize in connecting travel healthcare providers, direct hires, and per diem professionals with top healthcare facilities across the States. Our mission is simple: to empower healthcare professionals to explore new opportunities, earn competitive pay, and enjoy the flexibility they deserve. With a nationwide network, transparent pay packages, and 24/7 recruiter support, we make your travel nursing journey stress-free and rewarding. Whether you\'re looking for adventure, financial growth, or career stability, Tripod Partners USA is your trusted partner every step of the way.',
    aboutUs: 'Your Career. Your Freedom. Your Partner. At Tripod Partners USA, we specialize in connecting travel healthcare providers, direct hires, and per diem professionals with top healthcare facilities across the States. Our mission is simple: to empower healthcare professionals to explore new opportunities, earn competitive pay, and enjoy the flexibility they deserve. With a nationwide network, transparent pay packages, and 24/7 recruiter support, we make your travel nursing journey stress-free and rewarding. Whether you\'re looking for adventure, financial growth, or career stability, Tripod Partners USA is your trusted partner every step of the way.',
    benefits: [
      'Agency Housing',
      'Health Insurance',
      '401K',
      'Continuing Education',
      'Referral Bonuses'
    ],
    reviews: [],
    jobs: [],
    albums: []
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
    'host-healthcare': ['Host Healthcare', 'Host'],
    'medical-solutions': ['Medical Solutions', 'MedSol'],
    'tripod-partners': ['Tripod Partners', 'Tripod Partners USA']
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
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation - Unique Design */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50/30 border-b border-gray-200/50 overflow-x-hidden overflow-y-visible">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-4 pl-1">
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
                  <div className={`relative px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 overflow-visible ${
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
      <section className="bg-white py-6 md:py-8">
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
