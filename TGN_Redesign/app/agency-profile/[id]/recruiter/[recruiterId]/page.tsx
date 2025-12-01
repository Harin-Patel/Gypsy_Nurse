'use client'

import React, { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, Mail, Phone, MapPin, Globe, FileText, Camera, MessageSquare, ImageIcon, Briefcase, ExternalLink, Users, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
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
  },
  'flexcare': {
    id: 'flexcare',
    name: 'FlexCare',
    recruiters: [
      {
        id: 'ashley-clegg',
        name: 'Ashley Clegg',
        image: 'https://static.thegypsynurse.com/2025/08/Ashley-Clegg-Headshot-300x300.jpg.webp',
        phone: '(916) 460-9687',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80179',
        overview: 'My name is Ashley have been in the Allied recruiting world at FlexCare for the past two years, matching awesome talent with even better assignments! When I am not busy making your career dreams come true, I hang out with my two spoiled cats, Olive and Martini — yes, they\'re as classy as they sound.',
        about: 'My name is Ashley have been in the Allied recruiting world at FlexCare for the past two years, matching awesome talent with even better assignments! When I am not busy making your career dreams come true, I hang out with my two spoiled cats, Olive and Martini — yes, they\'re as classy as they sound.',
        albums: [],
        jobs: []
      },
      {
        id: 'bailey-pollak',
        name: 'Bailey Pollak',
        image: 'https://static.thegypsynurse.com/2025/08/Bailey-Pollak-Headshot-150x150.jpg',
        phone: '(916) 245-8874',
        address: '1075 Creekside Ridge Dr Suite 100, Roseville, CA, 95678',
        website: 'http://flexcarestaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=80180',
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
        overview: 'As a Senior Executive Allied Recruiter with 2.5 years of experience, my priority is making sure clinicians feel supported, heard, and valued throughout their travel journey. I take the time to understand your goals; whether it\'s exploring new locations, growing your skills, or finding a contract that fits your lifestyle and work hard to match you with the right opportunities. My goal isn\'t just to place you in a job, but to be a partner you can rely on every step of the way. I\'m committed to transparency, open communication, and making your experience as smooth and rewarding as possible. I look forward to working with you.',
        about: 'As a Senior Executive Allied Recruiter with 2.5 years of experience, my priority is making sure clinicians feel supported, heard, and valued throughout their travel journey. I take the time to understand your goals; whether it\'s exploring new locations, growing your skills, or finding a contract that fits your lifestyle and work hard to match you with the right opportunities. My goal isn\'t just to place you in a job, but to be a partner you can rely on every step of the way. I\'m committed to transparency, open communication, and making your experience as smooth and rewarding as possible. I look forward to working with you.',
        albums: [],
        jobs: []
      }
    ]
  },
  'titan-medical-group': {
    id: 'titan-medical-group',
    name: 'Titan Medical Group',
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
  'tripod-partners': {
    id: 'tripod-partners',
    name: 'Tripod Partners USA',
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
        description: 'My name is Becca! I am a Team Lead in our nursing division! I have been in the staffing industry for over five years now and I can honestly say I LOVE my job!! Fusion has been a life changer for me! When I\'m not working, I\'m busy running around the house!! I have a two-year-old boy, Witten, and a sweet little girl, Monroe! They aren\'t kidding when they say time flies, enjoy the good and the crazy moments! If our house isn\'t crazy enough with two kids under two and two dogs… You can catch us yelling at the TV on Football Saturdays and Sundays! We are HUGE Dallas Cowboy and Michigan Wolverine fans!!! When I finally get a free minute, you can find me enjoying the pool, taking a spinning class, napping, or making a new dip! I love a good appetizer…oh and we cant forget about sipping on a Bacardi and diet!! 😊 I look forward to working with you! Company Benefits- • 1 point of contact • Competitive Pay Packages • Blue Cross Blue Shield Insurance • Short Term Disability Benefits • Vacation Hours (40 hours after 1,560 hours worked) • 401K options • Direct deposit • License, Certification, and Travel Reimbursements • Referral Bonuses • And you get to work with me!!! 😊',
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
        description: 'Hello! My name is Jake Berglund, I am a Senior Cath Lab Account Manager, Team Lead at Fusion Medical Staffing. I have been in the healthcare industry for 7 years, 1 year at Kearney Regional Medical Center in HR and 6 years at Fusion. I mainly work with RN\'s in Cath Lab, International Radiology, and Electrophysiology, and techs in those specialties as well. After graduation from college, I worked in Human Resources for a new and growing hospital in Central Nebraska. I was able to see firsthand the impact that travelers can have on a facility. The work you all do is very important to keep some of these facilities and units running. If you were to speak to one of my current travelers, they might use words such as knowledgeable, efficient, personable, punctual, and understanding to describe me. I will be sure to do everything that I can to make your travel experience the best one possible! I was born and raised in North Platte, NE which is a small town in Western Nebraska. I attended the University of Nebraska at Kearney where I graduated with my Bachelor of Science in Business Administration with an emphasis in Health Care Management. During my time in college, I met my wife, Lauryn, through Greek life. Lauryn, our two Berenedoodles, Tucker & Lily and I currently live in Denver, CO but are moving back to Omaha, NE to lay down some roots. I am a sports enthusiast and love to spend time outdoors. During my free time I enjoy spending time with friends and family. Playing and watching sports (Tennis, Golf, Basketball, Football and Soccer to name a few). We plan to make several trips back to Colorado to ski during the winter and hike during the Summer. I also enjoy going out and trying new breweries (big IPA fan) and restaurants.',
        overview: 'Hello! My name is Jake Berglund, I am a Senior Cath Lab Account Manager, Team Lead at Fusion Medical Staffing. I have been in the healthcare industry for 7 years, 1 year at Kearney Regional Medical Center in HR and 6 years at Fusion. I mainly work with RN\'s in Cath Lab, International Radiology, and Electrophysiology, and techs in those specialties as well.',
        about: 'Hello! My name is Jake Berglund, I am a Senior Cath Lab Account Manager, Team Lead at Fusion Medical Staffing. I have been in the healthcare industry for 7 years, 1 year at Kearney Regional Medical Center in HR and 6 years at Fusion. I mainly work with RN\'s in Cath Lab, International Radiology, and Electrophysiology, and techs in those specialties as well.',
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
        overview: 'Hello! My name is Jess Wieseler, I am a home health and hospice recruiter. I have been in the medical staffing industry for one year, prior to my time at Fusions I was a Special Education teacher. I mainly work with RN\'s and LPN\'s in home health and hospice.',
        about: 'Hello! My name is Jess Wieseler, I am a home health and hospice recruiter. I have been in the medical staffing industry for one year, prior to my time at Fusions I was a Special Education teacher. I mainly work with RN\'s and LPN\'s in home health and hospice.',
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
        description: 'Hello! My name is Megan Hamik, I am a cath lab recruiter at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for three and a half years, prior to that I was in corporate staffing. I mostly work with cath, IR and EP\'s, both RN\'s and Techs. Fusion as a company cares about it\'s employees, internal and external. That\'s why I think we are always the best choice when deciding on a staffing company to work with. They strive to make a difference in everyone\'s life! I love meeting new people and talking about travel opportunities. I try to really get to know my travelers because building that relationship always leads to the best experiences. I love this job and truly enjoy coming to work every day. My #1 job is to make sure to find the best assignment for you! A little about myself, I have been married to my husband, Tom for 9 years and we have two daughters together, Evelyn and Lindy. We have a 9 year old Great Dane German Shepherd mix, named Isla, she is a big giant baby! I was born and raised in Nebraska. I love spending time with my family and being outside as much as possible. Depending on the season you can find me at the lake or watching football.',
        overview: 'Hello! My name is Megan Hamik, I am a cath lab recruiter at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for three and a half years, prior to that I was in corporate staffing. I mostly work with cath, IR and EP\'s, both RN\'s and Techs.',
        about: 'Hello! My name is Megan Hamik, I am a cath lab recruiter at Fusion Medical Staffing. I have been at Fusion and in the medical staffing industry for three and a half years, prior to that I was in corporate staffing. I mostly work with cath, IR and EP\'s, both RN\'s and Techs.',
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
        overview: 'Hello! My name is Ron Hertzberg, I am a nursing recruiter at Fusion Medical Staffing. I have been in the medical staffing industry for 7 years now, two and a half of those at Fusion. I mainly work with hospital RN\'s, OR RN\'s, and CST\'s.',
        about: 'Hello! My name is Ron Hertzberg, I am a nursing recruiter at Fusion Medical Staffing. I have been in the medical staffing industry for 7 years now, two and a half of those at Fusion. I mainly work with hospital RN\'s, OR RN\'s, and CST\'s.',
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
        overview: 'Hello! My name is Scott Villotta, I am a Senior Cath Lab Account Manager at Fusion Medical Staffing. I have been in the industry and at Fusion for 8 years. I mainly work with cath lab, IR, EP nurses and technologists.',
        about: 'Hello! My name is Scott Villotta, I am a Senior Cath Lab Account Manager at Fusion Medical Staffing. I have been in the industry and at Fusion for 8 years. I mainly work with cath lab, IR, EP nurses and technologists.',
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
        overview: 'Hello! My name is Sue Randle, I am an account manager team lead in Fusion Medical Staffing\'s Home Health division. I have been in the medical staffing industry for 3 years and at Fusion for 2. I mainly work with home health and hospice nurses.',
        about: 'Hello! My name is Sue Randle, I am an account manager team lead in Fusion Medical Staffing\'s Home Health division. I have been in the medical staffing industry for 3 years and at Fusion for 2. I mainly work with home health and hospice nurses.',
        albums: [],
        jobs: []
      }
    ]
  },
  'healthtrust-workforce-solutions': {
    id: 'healthtrust-workforce-solutions',
    name: 'HealthTrust Workforce Solutions',
    recruiters: []
  },
  'nomad-health': {
    id: 'nomad-health',
    name: 'Nomad Health',
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
    recruiters: []
  },
  'triage-staffing': {
    id: 'triage-staffing',
    name: 'Triage Staffing',
    recruiters: []
  },
  'vibra-travels': {
    id: 'vibra-travels',
    name: 'Vibra Travels',
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
    recruiters: [
      {
        id: 'emeline-bisch',
        name: 'Emeline Bisch',
        image: 'https://static.thegypsynurse.com/2025/07/EB-Headshot2-150x150.jpg.webp',
        phone: '(347) 603-8623',
        address: '500 7th Ave, New York, NY, 10018',
        website: 'http://ariohealthcare.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79633',
        description: 'As a passionate and results-driven Senior Recruitment Consultant with over 8 years of experience in healthcare staffing, I specialize in connecting dedicated healthcare professionals with opportunities that align with their skills, values, and career aspirations. At Ario Healthcare, I focus on building meaningful, long-term partnerships with both clinicians and clients - ensuring every placement supports quality care and workforce stability. With a strong foundation in account management, strategic recruitment, and talent acquisition, I take pride in understanding the unique needs of each nurse and facility. My goal is to provide personalized, thoughtful solutions that empower healthcare professionals to thrive - whether they\'re seeking their next travel assignment or a long-term role.',
        overview: 'As a passionate and results-driven Senior Recruitment Consultant with over 8 years of experience in healthcare staffing, I specialize in connecting dedicated healthcare professionals with opportunities that align with their skills, values, and career aspirations. At Ario Healthcare, I focus on building meaningful, long-term partnerships with both clinicians and clients - ensuring every placement supports quality care and workforce stability. With a strong foundation in account management, strategic recruitment, and talent acquisition, I take pride in understanding the unique needs of each nurse and facility. My goal is to provide personalized, thoughtful solutions that empower healthcare professionals to thrive - whether they\'re seeking their next travel assignment or a long-term role.',
        about: 'As a passionate and results-driven Senior Recruitment Consultant with over 8 years of experience in healthcare staffing, I specialize in connecting dedicated healthcare professionals with opportunities that align with their skills, values, and career aspirations. At Ario Healthcare, I focus on building meaningful, long-term partnerships with both clinicians and clients - ensuring every placement supports quality care and workforce stability. With a strong foundation in account management, strategic recruitment, and talent acquisition, I take pride in understanding the unique needs of each nurse and facility. My goal is to provide personalized, thoughtful solutions that empower healthcare professionals to thrive - whether they\'re seeking their next travel assignment or a long-term role.',
        albums: [],
        jobs: []
      },
      {
        id: 'gerhaldine-mcknight',
        name: 'Gerhaldine McKnight',
        image: 'https://static.thegypsynurse.com/2025/07/Gerhaldine-300x300.jpg.webp',
        phone: '(347) 943-3443',
        address: '500 7th Ave, New York, NY, 10018',
        website: 'http://ariohealthcare.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=79634',
        description: 'Gerhaldine McKnight is a Staffing Manager and Talent Acquisition Specialist with over 15 years of experience in healthcare recruitment and workforce operations. She has led full cycle hiring across multiple states, managed applicant tracking systems like Paycom, and reviewed thousands of resumes. Her background includes roles at FCP Live-in Staffing, Thornbury Nursing Services (UK), and Elizabeth Seton Pediatric Center, where she improved hiring efficiency and compliance. Gerhaldine holds an MSc in International Management from Manhattanville University and a BBA, Magna cum Laude, from the College of Westchester. She is a SHRM member and passionate about building inclusive, mission-driven teams.',
        overview: 'Gerhaldine McKnight is a Staffing Manager and Talent Acquisition Specialist with over 15 years of experience in healthcare recruitment and workforce operations. She has led full cycle hiring across multiple states, managed applicant tracking systems like Paycom, and reviewed thousands of resumes. Her background includes roles at FCP Live-in Staffing, Thornbury Nursing Services (UK), and Elizabeth Seton Pediatric Center, where she improved hiring efficiency and compliance. Gerhaldine holds an MSc in International Management from Manhattanville University and a BBA, Magna cum Laude, from the College of Westchester. She is a SHRM member and passionate about building inclusive, mission-driven teams.',
        about: 'Gerhaldine McKnight is a Staffing Manager and Talent Acquisition Specialist with over 15 years of experience in healthcare recruitment and workforce operations. She has led full cycle hiring across multiple states, managed applicant tracking systems like Paycom, and reviewed thousands of resumes. Her background includes roles at FCP Live-in Staffing, Thornbury Nursing Services (UK), and Elizabeth Seton Pediatric Center, where she improved hiring efficiency and compliance. Gerhaldine holds an MSc in International Management from Manhattanville University and a BBA, Magna cum Laude, from the College of Westchester. She is a SHRM member and passionate about building inclusive, mission-driven teams.',
        albums: [],
        jobs: []
      }
    ]
  },
  'health-advocates-network': {
    id: 'health-advocates-network',
    name: 'Health Advocates Network',
    recruiters: [
      {
        id: 'adam-williams',
        name: 'Adam Williams',
        image: 'https://static.thegypsynurse.com/2025/11/adam-150x150.jpg',
        phone: '(214) 606-0153',
        address: '1875 NW Corporate Blvd Ste 120, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81376',
        description: 'Adam Williams brings over 21 years of healthcare experience in acute/hospital, geriatric care, rehab, mental health, senior living, long-term care, schools, and home health. President, VP and Director Leadership roles within Recruitment, GPO, MSP, and Business Development positions him as an industry leader who\'s been recognized by Forbes multiple years and Who\'s Who of Business for his success and capabilities. A proud father of 3 amazing kids, Adam resides in Little Elm, Texas just outside of Dallas. In his spare time, you can find him volunteering at U&I Achieve Center for Adults with Disabilities, working out, and enjoying music and movies from the 80\'s',
        overview: 'Adam Williams brings over 21 years of healthcare experience in acute/hospital, geriatric care, rehab, mental health, senior living, long-term care, schools, and home health. President, VP and Director Leadership roles within Recruitment, GPO, MSP, and Business Development positions him as an industry leader who\'s been recognized by Forbes multiple years and Who\'s Who of Business for his success and capabilities. A proud father of 3 amazing kids, Adam resides in Little Elm, Texas just outside of Dallas. In his spare time, you can find him volunteering at U&I Achieve Center for Adults with Disabilities, working out, and enjoying music and movies from the 80\'s',
        about: 'Adam Williams brings over 21 years of healthcare experience in acute/hospital, geriatric care, rehab, mental health, senior living, long-term care, schools, and home health. President, VP and Director Leadership roles within Recruitment, GPO, MSP, and Business Development positions him as an industry leader who\'s been recognized by Forbes multiple years and Who\'s Who of Business for his success and capabilities. A proud father of 3 amazing kids, Adam resides in Little Elm, Texas just outside of Dallas. In his spare time, you can find him volunteering at U&I Achieve Center for Adults with Disabilities, working out, and enjoying music and movies from the 80\'s',
        albums: [],
        jobs: []
      },
      {
        id: 'brian-hunziker',
        name: 'Brian Hunziker',
        image: 'https://static.thegypsynurse.com/2025/11/brian-150x150.png',
        phone: '(314) 312-2472',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81353',
        description: 'Hi this is Brian with Health Advocates Network. I\'ve been in the Healthcare field for over 14 years and thoroughly enjoy helping HCP\'s find their next great assignment! I specialize in Respiratory and all Allied Specialties. I look forward to connecting!',
        overview: 'Hi this is Brian with Health Advocates Network. I\'ve been in the Healthcare field for over 14 years and thoroughly enjoy helping HCP\'s find their next great assignment! I specialize in Respiratory and all Allied Specialties. I look forward to connecting!',
        about: 'Hi this is Brian with Health Advocates Network. I\'ve been in the Healthcare field for over 14 years and thoroughly enjoy helping HCP\'s find their next great assignment! I specialize in Respiratory and all Allied Specialties. I look forward to connecting!',
        albums: [],
        jobs: []
      },
      {
        id: 'corey-allen',
        name: 'Corey Allen',
        image: 'https://static.thegypsynurse.com/2025/11/corey-150x150.jpg',
        phone: '(551) 501-6066',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81086',
        description: 'With 7 years of experience in healthcare recruiting, Corey Allen has successfully placed professionals across a wide spectrum of specialties including MDs, CRNAs, RNs, PTs, OTs, SLPs, and Migrant Shelter Workers. A former Division I track athlete. Outside of recruiting, he\'s a passionate wedding photographer and an avid supporter of the Chicago Bears, St. Louis Blues, St. Louis City SC, Chicago Bulls, and Paris Saint-Germain.',
        overview: 'With 7 years of experience in healthcare recruiting, Corey Allen has successfully placed professionals across a wide spectrum of specialties including MDs, CRNAs, RNs, PTs, OTs, SLPs, and Migrant Shelter Workers. A former Division I track athlete. Outside of recruiting, he\'s a passionate wedding photographer and an avid supporter of the Chicago Bears, St. Louis Blues, St. Louis City SC, Chicago Bulls, and Paris Saint-Germain.',
        about: 'With 7 years of experience in healthcare recruiting, Corey Allen has successfully placed professionals across a wide spectrum of specialties including MDs, CRNAs, RNs, PTs, OTs, SLPs, and Migrant Shelter Workers. A former Division I track athlete. Outside of recruiting, he\'s a passionate wedding photographer and an avid supporter of the Chicago Bears, St. Louis Blues, St. Louis City SC, Chicago Bulls, and Paris Saint-Germain.',
        albums: [],
        jobs: []
      },
      {
        id: 'jennifer-mckisic',
        name: 'Jennifer McKisic',
        image: 'https://static.thegypsynurse.com/2025/11/Jen-pic-jpeg-150x150.png',
        phone: '(321) 329-8927',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81354',
        description: 'Jennifer is a seasoned Healthcare Recruiter with 20 plus years of experience connecting Healthcare professionals to their dream jobs nationally. My greatest strength is working with clinicians in every way to ensure that they have a successful contract.',
        overview: 'Jennifer is a seasoned Healthcare Recruiter with 20 plus years of experience connecting Healthcare professionals to their dream jobs nationally. My greatest strength is working with clinicians in every way to ensure that they have a successful contract.',
        about: 'Jennifer is a seasoned Healthcare Recruiter with 20 plus years of experience connecting Healthcare professionals to their dream jobs nationally. My greatest strength is working with clinicians in every way to ensure that they have a successful contract.',
        albums: [],
        jobs: []
      },
      {
        id: 'kalana-harger',
        name: 'Kalana Harger',
        image: 'https://static.thegypsynurse.com/2025/11/Viv-pic-150x150.jpg',
        phone: '(321) 329-8952',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81351',
        description: 'Kalana brings over 10 years of experience in healthcare recruiting and staffing, specializing in acute care, hospital settings, after-hours support, and home health. She holds a master\'s degree in Human Resources and is passionate about connecting nurses with the perfect contract—one placement at a time.',
        overview: 'Kalana brings over 10 years of experience in healthcare recruiting and staffing, specializing in acute care, hospital settings, after-hours support, and home health. She holds a master\'s degree in Human Resources and is passionate about connecting nurses with the perfect contract—one placement at a time.',
        about: 'Kalana brings over 10 years of experience in healthcare recruiting and staffing, specializing in acute care, hospital settings, after-hours support, and home health. She holds a master\'s degree in Human Resources and is passionate about connecting nurses with the perfect contract—one placement at a time.',
        albums: [],
        jobs: []
      },
      {
        id: 'latosha-buckner',
        name: 'Latosha Buckner',
        image: 'https://static.thegypsynurse.com/2025/11/latosha-150x150.jpg',
        phone: '(321) 735-2790',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81088',
        description: 'LaTosha Buckner, Healthcare Recruiter with 18 years of experience specializing in sourcing and placing nurses and clinical staff in fast-paced healthcare environments. I build strong relationships with nurses, ensuring candidates are matched appropriately to skill requirements, patient needs, and facility expectations. I am committed to finding you the perfect assignment while maintaining a positive candidate experience, open communication, and full transparency always. A Win - Win for all built off trust and honesty, your Career Advocate!',
        overview: 'LaTosha Buckner, Healthcare Recruiter with 18 years of experience specializing in sourcing and placing nurses and clinical staff in fast-paced healthcare environments. I build strong relationships with nurses, ensuring candidates are matched appropriately to skill requirements, patient needs, and facility expectations. I am committed to finding you the perfect assignment while maintaining a positive candidate experience, open communication, and full transparency always. A Win - Win for all built off trust and honesty, your Career Advocate!',
        about: 'LaTosha Buckner, Healthcare Recruiter with 18 years of experience specializing in sourcing and placing nurses and clinical staff in fast-paced healthcare environments. I build strong relationships with nurses, ensuring candidates are matched appropriately to skill requirements, patient needs, and facility expectations. I am committed to finding you the perfect assignment while maintaining a positive candidate experience, open communication, and full transparency always. A Win - Win for all built off trust and honesty, your Career Advocate!',
        albums: [],
        jobs: []
      },
      {
        id: 'laura-marcilliat',
        name: 'Laura Marcilliat',
        image: 'https://static.thegypsynurse.com/2025/11/laura-150x150.jpg',
        phone: '(308) 856-9034',
        address: '1875 NW Corporate Blvd, Suite 120, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81370',
        description: 'I have over 16+ years of staffing/recruiting experience in nursing. I would love to take my experience and put it to work for you. I look at my nurses\' experiences and help them find the best fit for them so that they can have a great and enjoyable travel experience.',
        overview: 'I have over 16+ years of staffing/recruiting experience in nursing. I would love to take my experience and put it to work for you. I look at my nurses\' experiences and help them find the best fit for them so that they can have a great and enjoyable travel experience.',
        about: 'I have over 16+ years of staffing/recruiting experience in nursing. I would love to take my experience and put it to work for you. I look at my nurses\' experiences and help them find the best fit for them so that they can have a great and enjoyable travel experience.',
        albums: [],
        jobs: []
      },
      {
        id: 'melissa-giles',
        name: 'Melissa Giles',
        image: 'https://static.thegypsynurse.com/2025/11/Melissa-Giles-Headshot-150x150.jpg',
        phone: '(330) 488-5709',
        address: '1875 Corporate Blvd NW Ste 120, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81068',
        description: 'Melissa Giles has over 18 years of experience in the recruiting and staffing industry. She believes being a recruiter in the healthcare industry is the best way for her to contribute to quality healthcare. As a service-oriented professional, she enjoys connecting with candidates and building relationships to help people achieve their goals. With her belief that there is no "one size fits all" approach to healthcare staffing, she likes to take an individual approach with each of her nurses to ensure she is helping them thrive during their travel journey.',
        overview: 'Melissa Giles has over 18 years of experience in the recruiting and staffing industry. She believes being a recruiter in the healthcare industry is the best way for her to contribute to quality healthcare. As a service-oriented professional, she enjoys connecting with candidates and building relationships to help people achieve their goals. With her belief that there is no "one size fits all" approach to healthcare staffing, she likes to take an individual approach with each of her nurses to ensure she is helping them thrive during their travel journey.',
        about: 'Melissa Giles has over 18 years of experience in the recruiting and staffing industry. She believes being a recruiter in the healthcare industry is the best way for her to contribute to quality healthcare. As a service-oriented professional, she enjoys connecting with candidates and building relationships to help people achieve their goals. With her belief that there is no "one size fits all" approach to healthcare staffing, she likes to take an individual approach with each of her nurses to ensure she is helping them thrive during their travel journey.',
        albums: [],
        jobs: []
      },
      {
        id: 'michael-tubbs',
        name: 'Michael Tubbs',
        image: 'https://static.thegypsynurse.com/2025/11/tubes-150x150.jpg',
        phone: '(210) 378-4557',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81352',
        description: 'As a passionate advocate and seasoned recruiter specializing in diagnostic imaging within the travel sector, I bring a unique blend of expertise and dedication to connecting talented professionals with rewarding opportunities across the nation. With a deep understanding of both the healthcare industry and the intricacies of travel recruitment, I strive to match exceptional candidates with positions that not only meet their career goals but also fulfill their desire to travel. With a focus on fostering lasting relationships and ensuring the perfect fit for both candidates and clients, I am committed to driving positive change in a dynamic market of healthcare staffing while facilitating unforgettable career journeys.',
        overview: 'As a passionate advocate and seasoned recruiter specializing in diagnostic imaging within the travel sector, I bring a unique blend of expertise and dedication to connecting talented professionals with rewarding opportunities across the nation. With a deep understanding of both the healthcare industry and the intricacies of travel recruitment, I strive to match exceptional candidates with positions that not only meet their career goals but also fulfill their desire to travel. With a focus on fostering lasting relationships and ensuring the perfect fit for both candidates and clients, I am committed to driving positive change in a dynamic market of healthcare staffing while facilitating unforgettable career journeys.',
        about: 'As a passionate advocate and seasoned recruiter specializing in diagnostic imaging within the travel sector, I bring a unique blend of expertise and dedication to connecting talented professionals with rewarding opportunities across the nation. With a deep understanding of both the healthcare industry and the intricacies of travel recruitment, I strive to match exceptional candidates with positions that not only meet their career goals but also fulfill their desire to travel. With a focus on fostering lasting relationships and ensuring the perfect fit for both candidates and clients, I am committed to driving positive change in a dynamic market of healthcare staffing while facilitating unforgettable career journeys.',
        albums: [],
        jobs: []
      },
      {
        id: 'paul-aelmore',
        name: 'Paul Aelmore',
        image: 'https://static.thegypsynurse.com/2025/11/thumbnail-PaulRita-150x150.jpg',
        phone: '(309) 249-8187',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81087',
        description: '20+ years as a recruiter. The last 14+ years in the medical field placing Allied & Nursing. I love helping people reach their travel & Financial goals. My wife and I have 14 Grandkids that we watch in our spare time. Life is precious so make the most of it!',
        overview: '20+ years as a recruiter. The last 14+ years in the medical field placing Allied & Nursing. I love helping people reach their travel & Financial goals. My wife and I have 14 Grandkids that we watch in our spare time. Life is precious so make the most of it!',
        about: '20+ years as a recruiter. The last 14+ years in the medical field placing Allied & Nursing. I love helping people reach their travel & Financial goals. My wife and I have 14 Grandkids that we watch in our spare time. Life is precious so make the most of it!',
        albums: [],
        jobs: []
      },
      {
        id: 'rob-cucchi',
        name: 'Rob Cucchi',
        image: 'https://static.thegypsynurse.com/2025/11/rob-150x150.jpg',
        phone: '(312) 488-2954',
        address: '20283 State Road 7 Ste 106, Boca Raton, FL, 33431',
        website: 'http://hanstaff.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=81089',
        description: 'I have been in recruiting for a little over 6 years and currently reside in the Chicago area. I have a passion and drive to assist Allied Health Professionals in finding their perfect travel assignment to help improve their quality of life and deliver excellent healthcare to our wonderful clients.',
        overview: 'I have been in recruiting for a little over 6 years and currently reside in the Chicago area. I have a passion and drive to assist Allied Health Professionals in finding their perfect travel assignment to help improve their quality of life and deliver excellent healthcare to our wonderful clients.',
        about: 'I have been in recruiting for a little over 6 years and currently reside in the Chicago area. I have a passion and drive to assist Allied Health Professionals in finding their perfect travel assignment to help improve their quality of life and deliver excellent healthcare to our wonderful clients.',
        albums: [],
        jobs: []
      }
    ]
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
    jobs: [],
    recruiters: [
      {
        id: 'lauren-giaramita',
        name: 'Lauren Giaramita',
        image: 'https://static.thegypsynurse.com/2025/02/Lauren-Headshot.png',
        phone: '(908) 882-5749',
        address: '250 Cedarbridge Ave, Lakewood, NJ, 08701',
        website: 'http://www.sambatraveler.com',
        profileUrl: 'https://www.thegypsynurse.com/my-profile/?uid=77984',
        description: 'Meet Lauren Giaramita, our warm and welcoming Recruiter at SambaTraveler! When she\'s not matching talented caregivers with those who need them, Lauren loves whipping up sweet treats through her cake and candy business. This Jersey girl enjoys campfires, family time, sports, and a NY Rangers game. At home, Lauren\'s adored twins, furry friends-keep her smiling. With a Pastry & Baking degree and pursuing a Bachelor\'s in Business and Marketing, Lauren brings her passion for helping others to SambaTraveler every day',
        overview: 'Meet Lauren Giaramita, our warm and welcoming Recruiter at SambaTraveler! When she\'s not matching talented caregivers with those who need them, Lauren loves whipping up sweet treats through her cake and candy business. This Jersey girl enjoys campfires, family time, sports, and a NY Rangers game. At home, Lauren\'s adored twins, furry friends-keep her smiling. With a Pastry & Baking degree and pursuing a Bachelor\'s in Business and Marketing, Lauren brings her passion for helping others to SambaTraveler every day',
        about: 'Meet Lauren Giaramita, our warm and welcoming Recruiter at SambaTraveler! When she\'s not matching talented caregivers with those who need them, Lauren loves whipping up sweet treats through her cake and candy business. This Jersey girl enjoys campfires, family time, sports, and a NY Rangers game. At home, Lauren\'s adored twins, furry friends-keep her smiling. With a Pastry & Baking degree and pursuing a Bachelor\'s in Business and Marketing, Lauren brings her passion for helping others to SambaTraveler every day',
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
  const [expandedAbout, setExpandedAbout] = useState(false)
  
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
          description: recruiterFromAgency.description || '',
          overview: recruiterFromAgency.overview || recruiterFromAgency.description || '',
          about: recruiterFromAgency.about || recruiterFromAgency.description || '',
          agency: agency.name,
          agencyId: agency.id,
          phone: (recruiterFromAgency.phone && recruiterFromAgency.phone.trim() !== '') ? recruiterFromAgency.phone : (agency.phone || ''),
          address: (recruiterFromAgency.address && recruiterFromAgency.address.trim() !== '') ? recruiterFromAgency.address : (agency.address || ''),
          website: (recruiterFromAgency.website && recruiterFromAgency.website.trim() !== '') ? recruiterFromAgency.website : (agency.website || ''),
          profileUrl: recruiterFromAgency.profileUrl || '',
          socialMedia: recruiterFromAgency.socialMedia || agency.socialMedia || null,
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

                {/* Social Media Links */}
                {recruiter.socialMedia && (
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-2 font-semibold">Connect With Me</div>
                    <div className="flex flex-wrap gap-2">
                      {recruiter.socialMedia.facebook && (
                        <motion.a
                          href={recruiter.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-9 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all"
                          aria-label="Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </motion.a>
                      )}
                      {recruiter.socialMedia.twitter && (
                        <motion.a
                          href={recruiter.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-9 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all"
                          aria-label="Twitter"
                        >
                          <Twitter className="w-4 h-4" />
                        </motion.a>
                      )}
                      {recruiter.socialMedia.linkedin && (
                        <motion.a
                          href={recruiter.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-9 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-700 hover:text-white hover:border-blue-600 transition-all"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </motion.a>
                      )}
                      {recruiter.socialMedia.instagram && (
                        <motion.a
                          href={recruiter.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-9 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white hover:border-transparent transition-all"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                )}
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
                <div className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  <p className={expandedOverview ? '' : 'line-clamp-4'}>
                    {recruiter.description || recruiter.overview}
                  </p>
                  {(recruiter.description || recruiter.overview) && (recruiter.description || recruiter.overview).length > 200 && (
                    <button
                      onClick={() => setExpandedOverview(!expandedOverview)}
                      className="mt-2 inline-block text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                    >
                      {expandedOverview ? 'Read Less' : 'Read More'}
                    </button>
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
                <div className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  <p className={expandedAbout ? '' : 'line-clamp-4'}>
                    {recruiter.description || recruiter.about}
                  </p>
                  {(recruiter.description || recruiter.about) && (recruiter.description || recruiter.about).length > 200 && (
                    <button
                      onClick={() => setExpandedAbout(!expandedAbout)}
                      className="mt-2 inline-block text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                    >
                      {expandedAbout ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>
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
