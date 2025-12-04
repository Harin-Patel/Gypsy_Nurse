'use client'

import { Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedProfession, setSelectedProfession] = useState('')
  const [selectedSpecialties, setSelectedSpecialties] = useState('')
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false)
  const [showSpecialtiesDropdown, setShowSpecialtiesDropdown] = useState(false)
  const [newsletterChecked, setNewsletterChecked] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', { firstName, lastName, email, selectedProfession, selectedSpecialties, newsletterChecked })
    setFirstName('')
    setLastName('')
    setEmail('')
    setSelectedProfession('')
    setSelectedSpecialties('')
    setNewsletterChecked(false)
  }

  const professions = [
    'Registered Nurse (RN)',
    'Licensed Practical Nurse (LPN)',
    'Certified Nursing Assistant (CNA)',
    'Nurse Practitioner (NP)',
    'Physical Therapist (PT)',
    'Occupational Therapist (OT)',
    'Respiratory Therapist (RT)',
    'Medical Technologist (MT)',
    'Other'
  ]

  const specialties = [
    'Emergency Room',
    'Intensive Care Unit (ICU)',
    'Medical-Surgical',
    'Operating Room',
    'Labor and Delivery',
    'Pediatrics',
    'Oncology',
    'Cardiac Care',
    'Other'
  ]

  const footerLinks = [
    { name: 'About Us', href: '/more' },
    { name: 'Blog', href: '/articles' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Events', href: '/events' },
    { name: 'Find a Job', href: '/jobs' },
    { name: 'Member Benefits', href: '/benefits' },
    { name: 'Resources', href: '/resources' },
    { name: 'Submit Reviews', href: '/more' },
  ]

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content - 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Left Column - Logo, Description, Social Icons */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo.svg" 
                alt="The Gypsy Nurse Logo" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              The Gypsy Nurse is dedicated to providing powerful tools, information, and social connectivity to our 600,000 travel nurses and travel healthcare professionals. We're the #1 travel nursing community in the industry, serving thousands of travel nurses daily across multiple digital platforms.
            </p>

            {/* Social Media Icons - 6 icons in circular format */}
            <div className="flex gap-3 flex-nowrap">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/TheGypsyNurseFan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* Twitter/X */}
              <a
                href="https://x.com/thegypsynurse"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a
                href="https://www.instagram.com/thegypsynurse/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm relative overflow-hidden flex-shrink-0"
                style={{
                  background: 'linear-gradient(45deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)'
                }}
                aria-label="Instagram"
              >
                <Instagram size={20} className="relative z-10" />
              </a>
              
              {/* Pinterest */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#BD081C] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.487.535 6.624 0 12-5.373 12-12S18.627.001 12 .001z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/gypsy-nurse-consulting-llc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              
              {/* YouTube */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Middle-Left Column - Navigation Links */}
          <div className="ml-6">
            <h4 className="font-semibold text-primary-600 mb-4 text-base">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-primary-600 transition-colors font-medium no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle-Right Column - Awards */}
          <div>
            <h4 className="font-semibold text-primary-600 mb-4 text-base">Awards</h4>
            <div className="flex flex-col">
              {/* Berxi's Best Social Influencer Award */}
              <div className="flex items-start">
                <img 
                  src="https://tgn-static-files.s3.amazonaws.com/uploads/2023/03/2023-Badge_SInfluencer_Nursing.jpg.webp"
                  alt="Berxi's Best Social Influencer Award 2023 - Nursing"
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Berxi's Best Blogs Award */}
              <div className="flex items-start -mt-2">
                <img 
                  src="https://tgn-static-files.s3.amazonaws.com/uploads/2023/03/1080x1080_2023-Badge_BlogNursing.jpg.webp"
                  alt="Berxi's Best Blog Award 2023 - Nursing"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-primary-600 mb-4">
              Sign Up for Our Community Newsletter Today
            </h3>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              {/* First Name */}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />

              {/* Last Name */}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />

              {/* Email Address */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />

              {/* Select Profession */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfessionDropdown(!showProfessionDropdown)
                    setShowSpecialtiesDropdown(false)
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-left flex items-center justify-between text-sm transition-colors bg-white ${
                    showProfessionDropdown 
                      ? 'border-primary-500 ring-2 ring-primary-200' 
                      : 'border-gray-300 hover:border-primary-500'
                  }`}
                >
                  <span className={selectedProfession ? "text-gray-900" : "text-gray-500"}>
                    {selectedProfession || "Select Profession"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfessionDropdown ? 'rotate-180 text-primary-500' : ''}`} />
                </button>
                
                {showProfessionDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowProfessionDropdown(false)}
                    />
                    <div className="absolute z-20 w-full mt-1 bg-white border-2 border-primary-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {professions.map((profession) => (
                        <button
                          key={profession}
                          type="button"
                          onClick={() => {
                            setSelectedProfession(profession)
                            setShowProfessionDropdown(false)
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-primary-50 hover:text-primary-700 transition-colors text-sm"
                        >
                          {profession}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Select Specialties */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowSpecialtiesDropdown(!showSpecialtiesDropdown)
                    setShowProfessionDropdown(false)
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-left flex items-center justify-between text-sm transition-colors bg-white ${
                    showSpecialtiesDropdown 
                      ? 'border-primary-500 ring-2 ring-primary-200' 
                      : 'border-gray-300 hover:border-primary-500'
                  }`}
                >
                  <span className={selectedSpecialties ? "text-gray-900" : "text-gray-500"}>
                    {selectedSpecialties || "Select Specialties"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSpecialtiesDropdown ? 'rotate-180 text-primary-500' : ''}`} />
                </button>
                
                {showSpecialtiesDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowSpecialtiesDropdown(false)}
                    />
                    <div className="absolute z-20 w-full mt-1 bg-white border-2 border-primary-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {specialties.map((specialty) => (
                        <button
                          key={specialty}
                          type="button"
                          onClick={() => {
                            setSelectedSpecialties(specialty)
                            setShowSpecialtiesDropdown(false)
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-primary-50 hover:text-primary-700 transition-colors text-sm"
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="newsletter-consent"
                  checked={newsletterChecked}
                  onChange={(e) => setNewsletterChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                  style={{ accentColor: '#7F2860' }}
                />
                <label htmlFor="newsletter-consent" className="ml-2 text-sm text-gray-700 cursor-pointer">
                  I would like to receive emails from The Gypsy Nurse!
                </label>
              </div>

              {/* Subscribe Button */}
              <button
                type="submit"
                className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-sm hover:shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Copyright and Legal */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex flex-col gap-3">
            {/* Copyright and Address */}
            <div className="text-sm text-gray-600">
              <p>© 2025 All Rights Reserved. The Gypsy Nurse/TravCon, 2810 N Church St, PMB 84205, Wilmington, DE 19802-4447</p>
              <p className="mt-2">
                The Gypsy Nurse® is a registered trademark of TGN Community, LLC and The Gypsy Nurse logo is a trademark of TGN Community, LLC.
              </p>
            </div>

            {/* Privacy Policy & User Agreement Links */}
            <div className="flex items-center gap-2">
              <Link href="/more" className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium">
                Privacy Policy
              </Link>
              <span className="text-primary-600">&</span>
              <Link href="/more" className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium">
                User Agreement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
