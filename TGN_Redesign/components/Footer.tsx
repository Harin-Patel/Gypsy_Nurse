'use client'

import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function Footer() {
  const isMobile = useIsMobile()
  const [email, setEmail] = useState('')

  // Hide footer on mobile
  if (isMobile) return null

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const footerLinks = {
    'Quick Links': ['Search Jobs', 'Resources', 'Events', 'Blog', 'About Us'],
    'Resources': ['Compact License', 'Continuing Education', 'FAQs', 'Housing', 'Reviews'],
    'Company': ['About Us', 'Contact Us', 'Careers', 'Privacy Policy', 'Terms of Service'],
    'Support': ['Help Center', 'Member Benefits', 'For Employers', 'Submit Review', 'Feedback'],
  }

  return (
    <footer className="bg-white/90 backdrop-blur-xl border-t border-gray-200/50 relative overflow-hidden" style={{
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-2 text-gray-900">
                Stay in the <span className="gradient-text">Loop</span>
              </h3>
              <p className="text-gray-600">
                Get the latest jobs, tips, and travel nursing news delivered to your inbox
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white/80 backdrop-blur-lg border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <span>Subscribe</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="mb-4">
                <img 
                  src="/logo.svg" 
                  alt="The Gypsy Nurse Logo" 
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-gray-600 mb-6">
                The #1 travel nursing community serving 600,000+ travel nurses and healthcare professionals.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/TheGypsyNurseFan/' },
                  { icon: Twitter, label: 'Twitter', href: 'https://x.com/thegypsynurse' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/thegypsynurse/' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/gypsy-nurse-consulting-llc/' },
                ].map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-primary-50 backdrop-blur-lg border border-primary-200 rounded-lg flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIndex * 0.1 }}
            >
              <h4 className="font-bold mb-4 text-gray-900">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-8 border-t border-gray-200 grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: Mail, text: 'contact@thegypsynurse.com' },
            { icon: Phone, text: '1-800-GYPSY-RN' },
            { icon: MapPin, text: 'Wilmington, DE 19802' },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center space-x-3 text-gray-600">
                <Icon size={20} className="text-primary-500" />
                <span className="text-sm">{item.text}</span>
              </div>
            )
          })}
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 text-center md:text-left">
              <p>© 2025 All Rights Reserved. The Gypsy Nurse/TravCon</p>
              <p className="mt-1">
                The Gypsy Nurse® is a registered trademark of TGN Community, LLC
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-lg border border-gray-200 px-4 py-2 rounded-lg shadow-sm"
              >
                <span className="text-sm text-gray-700">🏆 Berxi Best Social Influencer</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-lg border border-gray-200 px-4 py-2 rounded-lg shadow-sm"
              >
                <span className="text-sm text-gray-700">🏆 Best Nursing Blog</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
