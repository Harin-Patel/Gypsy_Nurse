'use client'

import React, { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, Mail, Phone, MapPin, Globe, FileText, Camera, MessageSquare, ImageIcon, Briefcase, ExternalLink, Users } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Import agency data to get recruiter information dynamically
const agencyData: { [key: string]: any } = {
  'tnaa': {
    id: 'tnaa',
    name: 'TNAA Healthcare',
    recruiters: [
      {
        id: 'gena-deaton',
        name: 'Gena Deaton',
        image: 'https://static.thegypsynurse.com/2019/12/Gena-Deaton.png.webp',
        phone: '(800) 240-2526',
        address: '',
        website: '',
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
        overview: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        about: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
        albums: [],
        jobs: []
      }
    ]
  },
  'ab-staffing': {
    id: 'ab-staffing',
    name: 'AB Staffing Solutions',
    recruiters: [
      {
        id: 'elias-rodriguez',
        name: 'Elias Rodriguez',
        image: 'https://static.thegypsynurse.com/2019/12/Elias.png.webp',
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
        phone: '(480) 719-4890',
        address: '',
        website: 'https://www.abstaffing.com/',
        overview: 'I was born and raised in Dubuque, Iowa. Go Hawkeyes!! After graduating college, I relocated to Arizona, where I have lived for about 9 years now. I love it here, my only wish is that my family was closer, but now, they have an amazing vacation spot that they surly take advantage of! In my spare time I enjoy, spending time with my better half and his family, the pool, working out, volleyball and snowboarding up north in the winter.',
        about: 'I was born and raised in Dubuque, Iowa. Go Hawkeyes!! After graduating college, I relocated to Arizona, where I have lived for about 9 years now. I love it here, my only wish is that my family was closer, but now, they have an amazing vacation spot that they surly take advantage of! In my spare time I enjoy, spending time with my better half and his family, the pool, working out, volleyball and snowboarding up north in the winter.',
        albums: [],
        jobs: []
      }
    ]
  },
  'advantage-medical': {
    id: 'advantage-medical',
    name: 'Advantage Medical Professionals',
    recruiters: [
      {
        id: 'aerin-alexander',
        name: 'Aerin Alexander',
        image: 'https://static.thegypsynurse.com/2022/04/Aerin-300x300.jpg.webp',
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
        phone: '(504) 883-8714',
        address: '195 Greenbrier Blvd, Suite 101, Covington, LA, 70433',
        website: 'http://www.advantagemedicalprofessionals.com',
        overview: 'I\'m originally from the New Orleans, Louisiana area. I moved to Folsom, Louisiana to complete Junior High and High School. My college degrees are from SLU and LSUS. The last degree I earned was my MBA from LSUS. I have experience in HR/Recruiting, Office Management, Accounting, and Customer Service. With this wide range of experience, I have come to learn that I love recruiting! Some of my hobbies include spending time with my family and helping coach our kids in sports. I coached cheer for girls ages 5-12 for a few years while earning my MBA at LSUS. I have a passion for helping and coaching, which I believe plays a big role with my passion for recruiting. I look forward to continuing the recruiting journey and see where it takes me.',
        about: 'I\'m originally from the New Orleans, Louisiana area. I moved to Folsom, Louisiana to complete Junior High and High School. My college degrees are from SLU and LSUS. The last degree I earned was my MBA from LSUS. I have experience in HR/Recruiting, Office Management, Accounting, and Customer Service. With this wide range of experience, I have come to learn that I love recruiting! Some of my hobbies include spending time with my family and helping coach our kids in sports. I coached cheer for girls ages 5-12 for a few years while earning my MBA at LSUS. I have a passion for helping and coaching, which I believe plays a big role with my passion for recruiting. I look forward to continuing the recruiting journey and see where it takes me.',
        albums: [],
        jobs: []
      }
    ]
  }
}

// Fallback recruiter data - in production this would come from an API
const recruiterData: { [key: string]: any } = {
  'gena-deaton': {
    id: 'gena-deaton',
    name: 'Gena Deaton',
    image: 'https://static.thegypsynurse.com/2019/12/Gena-Deaton.png.webp',
    phone: '(800) 240-2526',
    address: '',
    website: '',
    agency: 'TNAA Healthcare',
    agencyId: 'tnaa',
    overview: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
    about: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
    albums: [],
    jobs: []
  },
  'nichole-graham': {
    id: 'nichole-graham',
    name: 'Nichole Graham',
    image: 'https://static.thegypsynurse.com/2019/12/Nichole-Graham.png.webp',
    phone: '(180) 024-02526',
    address: '',
    website: '',
    agency: 'TNAA Healthcare',
    agencyId: 'tnaa',
    overview: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
    about: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
    albums: [],
    jobs: []
  },
  'tana-babcock': {
    id: 'tana-babcock',
    name: 'Tana Babcock',
    image: 'https://static.thegypsynurse.com/2019/12/Tana-Babcock.png.webp',
    phone: '(180) 024-02526',
    address: '',
    website: '',
    agency: 'TNAA Healthcare',
    agencyId: 'tnaa',
    overview: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
    about: '8-26 week assignments all over the country at some of the best facilities in the US! Personal service like no other company out there! We cover all licenses, certification and all pre-employment expenses! Free day one insurance with the best medical coverage offered in the industry! TNAA Is a NATHO member and Joint Commission certified. Check out our website and see what our travelers have to say about us! Ask me why I choose to work for this amazing company!',
    albums: [],
    jobs: []
  }
}

export default function RecruiterProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedOverview, setExpandedOverview] = useState(false)
  
  const agencyId = params?.id as string
  const recruiterId = params?.recruiterId as string
  
  // Get recruiter data dynamically from agency data first, then fallback to standalone data
  const recruiter = useMemo(() => {
    // First, try to get from agency's recruiter list
    const agency = agencyData[agencyId]
    if (agency && agency.recruiters) {
      const recruiterFromAgency = agency.recruiters.find((r: any) => r.id === recruiterId)
      if (recruiterFromAgency) {
        // Map description to overview and about if they don't exist
        // For phone, address, and website, use recruiter's value if it exists and is not empty, otherwise fallback to agency
        return {
          ...recruiterFromAgency,
          overview: recruiterFromAgency.overview || recruiterFromAgency.description || '',
          about: recruiterFromAgency.about || recruiterFromAgency.description || '',
          agency: agency.name,
          agencyId: agency.id,
          phone: (recruiterFromAgency.phone && recruiterFromAgency.phone.trim() !== '') ? recruiterFromAgency.phone : (agency.phone || ''),
          address: (recruiterFromAgency.address && recruiterFromAgency.address.trim() !== '') ? recruiterFromAgency.address : (agency.address || ''),
          website: (recruiterFromAgency.website && recruiterFromAgency.website.trim() !== '') ? recruiterFromAgency.website : (agency.website || ''),
          albums: recruiterFromAgency.albums || [],
          jobs: recruiterFromAgency.jobs || []
        }
      }
    }
    // Fallback to standalone recruiter data
    const fallbackRecruiter = recruiterData[recruiterId] || recruiterData['gena-deaton']
    return {
      ...fallbackRecruiter,
      agency: fallbackRecruiter.agency || 'TNAA Healthcare',
      agencyId: fallbackRecruiter.agencyId || agencyId
    }
  }, [agencyId, recruiterId])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'about', label: 'About', icon: Users },
    { id: 'photos-videos', label: 'Photos & Videos', icon: Camera },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'photos', label: 'Photos', icon: ImageIcon }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200 pt-32 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            {/* Recruiter Image and Info */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Recruiter Image */}
              {recruiter.image && (
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-md flex-shrink-0">
                  <Image
                    src={recruiter.image}
                    alt={recruiter.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                    unoptimized
                  />
                </div>
              )}
              
              {/* Name and Contact Information */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {recruiter.name}
                </h1>
                
                {/* Contact Information */}
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {recruiter.address && recruiter.address.trim() !== '' && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Address:</span>
                      <span className="text-sm text-gray-700">{recruiter.address}</span>
                    </div>
                  )}
                  {recruiter.phone && recruiter.phone.trim() !== '' && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Phone:</span>
                      <span className="text-sm text-gray-700">{recruiter.phone}</span>
                    </div>
                  )}
                  {recruiter.website && recruiter.website.trim() !== '' && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Website:</span>
                      <a href={recruiter.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:text-primary-700 underline">
                        {recruiter.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50/30 border-b border-gray-200/50 overflow-x-hidden overflow-y-visible">
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
                  className="relative group flex-shrink-0"
                >
                  <div className={`relative px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 overflow-visible ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}>
                    {/* Active Background */}
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
            <div className="space-y-6 overflow-y-auto max-h-[600px] pr-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {recruiter.name}
                </h4>
                <div className="text-gray-700 leading-relaxed text-sm md:text-base">
                  <p className={expandedOverview ? '' : 'line-clamp-4'}>
                    {recruiter.overview}
                  </p>
                  {recruiter.overview.length > 200 && (
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
              
              {recruiter.albums && recruiter.albums.length > 0 ? (
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                    Recent albums from {recruiter.name}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recruiter.albums.map((album: any, index: number) => (
                      <div key={index} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                        <div className="aspect-video relative overflow-hidden bg-gray-100">
                          <Camera className="w-12 h-12 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">{album.name}</h5>
                          <p className="text-sm text-gray-600">{album.photoCount} Photos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link 
                      href={`/agency-profile/${agencyId}/recruiter/${recruiterId}/photos`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                    >
                      See all albums
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                    Recent albums from {recruiter.name}
                  </h4>
                  <p className="text-gray-600 text-sm md:text-base mb-4">No photo albums have been created yet.</p>
                  <Link 
                    href={`/agency-profile/${agencyId}/recruiter/${recruiterId}/photos`}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                  >
                    See all albums
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {recruiter.jobs && recruiter.jobs.length > 0 && (
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Open Jobs</h4>
                  <div className="overflow-x-auto border border-gray-300">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b-2 border-gray-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Job Title</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Specialty</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Start Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recruiter.jobs.map((job: any, index: number) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-3 text-sm text-gray-900">{job.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{job.specialty}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{job.location}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{job.startDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6 overflow-y-auto max-h-[600px] pr-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Bio</h4>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {recruiter.about}
                </p>
              </div>
            </div>
          )}

          {/* Photos & Videos Tab */}
          {activeTab === 'photos-videos' && (
            <div className="overflow-y-auto max-h-[600px] pr-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Photos & Videos</h4>
              <p className="text-gray-600 text-sm md:text-base">No photos or videos available at this time.</p>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 overflow-y-auto max-h-[600px] pr-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Reviews</h4>
                <p className="text-gray-600 text-sm md:text-base mb-4">No reviews available yet.</p>
                
                <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
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
                  <p className="text-gray-600 text-sm md:text-base">Sorry, {recruiter.name} has not made any blog posts yet.</p>
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

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="overflow-y-auto max-h-[600px] pr-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Photos</h4>
              <p className="text-gray-600 text-sm md:text-base">No photos available at this time.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
