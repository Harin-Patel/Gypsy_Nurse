'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Briefcase, Phone, Globe, MapPin, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AgencyRegisterPage() {
  const [formData, setFormData] = useState({
    agencyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    phoneNumber: '',
    address: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Navigation Bar */}
      <Navigation />

      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        {/* Background Image - Female Travel Nurse */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          {/* Dark Gradient Overlay - Same as Dashboard/Hero */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 via-40% to-gray-900/40"></div>
          
          {/* Subtle Brand Tint */}
          <div className="absolute inset-0 bg-primary-900/20"></div>
        </motion.div>
        
        {/* Animated Accents */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Glassmorphic Register Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            {/* Glow Effect Behind Card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 rounded-3xl blur-2xl" />
            
            {/* Main Card */}
            <div className="relative bg-white backdrop-blur-2xl rounded-3xl shadow-2xl border border-white overflow-hidden">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-30" />
              
              {/* Card Content */}
              <div className="relative bg-white rounded-3xl p-8">
                {/* Header with Animated Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  className="flex justify-center mb-6"
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    {/* Rotating Ring Effect */}
                    <motion.div
                      className="absolute inset-0 -m-3"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-primary-400/40 via-transparent to-primary-400/40 bg-clip-border" 
                           style={{ 
                             maskImage: 'linear-gradient(to right, transparent, white, transparent)',
                             WebkitMaskImage: 'linear-gradient(to right, transparent, white, transparent)'
                           }}
                      />
                    </motion.div>
                    
                    {/* Glass Reflection */}
                    <motion.div
                      className="absolute inset-0 -m-2 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <div className="relative">
                      <img 
                        src="/logo.svg" 
                        alt="The Gypsy Nurse Logo" 
                        className="h-16 w-auto"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-6"
                >
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Create Agency Account
                  </h1>
                  <p className="text-base text-gray-600">Register your agency to start posting jobs</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Agency Name */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="relative group">
                      <input
                        id="agencyName"
                        name="agencyName"
                        type="text"
                        value={formData.agencyName}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="agencyName"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Agency Name *
                      </label>
                      <Briefcase className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                    </div>
                  </motion.div>

                  {/* Email Address */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="relative group">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Email Address *
                      </label>
                      <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="relative group">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="peer w-full px-5 py-4 pr-12 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center justify-center"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.div>
                      </button>
                    </div>
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="relative group">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="peer w-full px-5 py-4 pr-12 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="confirmPassword"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Confirm Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center justify-center"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.div>
                      </button>
                    </div>
                  </motion.div>

                  {/* Website */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="relative group">
                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="website"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Website
                      </label>
                      <Globe className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                    </div>
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none peer-focus:text-primary-600 transition-colors">
                        +1
                      </div>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full pl-12 pr-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="phoneNumber"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:left-12 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:left-5 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Phone Number
                      </label>
                    </div>
                  </motion.div>

                  {/* Address */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="relative group">
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder=" "
                        rows={3}
                        className="peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent resize-none"
                      />
                      <label
                        htmlFor="address"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Address
                      </label>
                      <MapPin className="absolute right-5 top-4 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                    </div>
                  </motion.div>

                  {/* Create Agency Account Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="pt-2"
                  >
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="relative w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-2xl shadow-lg overflow-hidden group disabled:opacity-70"
                      whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: "0 20px 40px rgba(127, 40, 96, 0.3)" }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {/* Animated Wave Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 opacity-0 group-hover:opacity-100"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Ripple Effect */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileTap={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full h-full bg-white/20 rounded-2xl" />
                      </motion.div>

                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut"
                        }}
                      />

                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        {isLoading ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <span>Create Agency Account</span>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Already have an account? Log in to Agency Account */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-center pt-1"
                  >
                    <span className="text-gray-600">Already have an account? </span>
                    <Link href="/agency-login">
                      <motion.span
                        className="text-primary-600 hover:text-primary-700 font-bold cursor-pointer inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Log in to Agency Account
                      </motion.span>
                    </Link>
                  </motion.div>

                  {/* Back to User Login - Glassmorphism Design */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="text-center pt-1"
                  >
                    <Link href="/login">
                      <motion.div
                        className="inline-flex items-center space-x-3 px-6 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 cursor-pointer group overflow-hidden relative shadow-lg"
                        style={{
                          boxShadow: '0 8px 32px 0 rgba(127, 40, 96, 0.1)'
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                          borderColor: "rgba(127, 40, 96, 0.3)",
                          boxShadow: "0 8px 32px 0 rgba(127, 40, 96, 0.25)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {/* Glass Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Animated Arrow */}
                        <motion.span
                          className="relative text-primary-600 font-bold text-lg z-10"
                          animate={{ x: [0, -3, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          ←
                        </motion.span>
                        
                        {/* Text with Enhanced Color on Hover */}
                        <span className="relative font-semibold text-gray-800 group-hover:text-primary-700 transition-colors duration-300 z-10">
                          Back to User Login
                        </span>
                        
                        {/* Sparkle Effect */}
                        <motion.div
                          className="absolute top-1 right-1 z-10"
                          initial={{ scale: 0, rotate: 0 }}
                          whileHover={{ 
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <Sparkles className="w-4 h-4 text-primary-500" />
                        </motion.div>
                        
                        {/* Bottom Glow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

