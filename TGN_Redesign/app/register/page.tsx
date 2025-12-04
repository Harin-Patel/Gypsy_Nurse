'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone, Briefcase, MapPin, ArrowRight, Sparkles, Heart, Star, Zap, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useIsMobile } from '@/hooks/useIsMobile'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required'
        if (value.trim().length < 2) return 'First name must be at least 2 characters'
        return ''
      case 'lastName':
        if (!value.trim()) return 'Last name is required'
        if (value.trim().length < 2) return 'Last name must be at least 2 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email address is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address'
        return ''
      case 'password':
        if (!value) return 'Password is required'
        if (value.length < 6) return 'Password must be at least 6 characters'
        return ''
      case 'confirmPassword':
        if (!value) return 'Please confirm your password'
        if (value !== formData.password) return 'Passwords do not match'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouchedFields(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    if (error) {
      setFieldErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate all fields
    const errors: Record<string, string> = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        errors[key] = error
        setTouchedFields(prev => ({ ...prev, [key]: true }))
      }
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Passwords don't match"
      setError(errorMsg)
      setFieldErrors(prev => ({ ...prev, confirmPassword: errorMsg }))
      toast.error(errorMsg)
      setIsLoading(false)
      return
    }

    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    const result = await signup(fullName, formData.email, formData.password, 'jobseeker')

    if (result.success) {
      toast.success('Registration successful! Welcome to The Gypsy Nurse!')
      router.push('/')
    } else {
      const errorMsg = result.error || 'Registration failed'
      setError(errorMsg)
      toast.error(errorMsg)
    }
    
    setIsLoading(false)
  }

  const professions = [
    'Registered Nurse (RN)',
    'Licensed Practical Nurse (LPN)',
    'Certified Nursing Assistant (CNA)',
    'Nurse Practitioner (NP)',
    'Allied Health Professional',
    'Other'
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-50">
      {/* Navigation Bar */}
      <Navigation />

      {/* Background - Simplified for Mobile */}
      {!isMobile && (
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
      )}

      {/* Main Content */}
      <main className={`relative z-10 ${isMobile ? 'pt-20 pb-8 px-4' : 'pt-32 pb-16 px-4'}`}
        style={isMobile ? {
          paddingTop: `calc(6.5rem + env(safe-area-inset-top))`,
          paddingBottom: `calc(2rem + env(safe-area-inset-bottom))`,
        } : {}}
      >
        <div className={`${isMobile ? 'w-full' : 'max-w-3xl mx-auto'}`}>
          {/* Glassmorphic Register Card */}
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.8, type: "spring" }}
            className="relative"
          >
            {/* Glow Effect Behind Card - Desktop Only */}
            {!isMobile && (
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 rounded-3xl blur-2xl" />
            )}
            
            {/* Main Card */}
            <div className={`relative bg-white ${isMobile ? 'rounded-2xl shadow-lg border border-gray-200' : 'backdrop-blur-2xl rounded-3xl shadow-2xl border border-white'} overflow-hidden`}>
              {/* Gradient Border Effect - Desktop Only */}
              {!isMobile && (
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-30" />
              )}
              
              {/* Card Content */}
              <div className={`relative bg-white ${isMobile ? 'rounded-2xl p-6' : 'rounded-3xl p-8'}`}>
                {/* Header with Logo */}
                <motion.div
                  initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={isMobile ? { duration: 0 } : { delay: 0.2, type: "spring", stiffness: 150 }}
                  className="flex justify-center mb-6"
                >
                  {isMobile ? (
                    <div className="relative">
                      <img 
                        src="/logo.svg" 
                        alt="The Gypsy Nurse Logo" 
                        className="h-12 w-auto"
                      />
                    </div>
                  ) : (
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
                  )}
                </motion.div>

                <motion.div
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={isMobile ? { duration: 0 } : { delay: 0.3 }}
                  className="text-center mb-6"
                >
                  <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-2`}>
                    Join The Gypsy Nurse
                  </h1>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>Start your travel nursing adventure today</p>
                </motion.div>

                <form onSubmit={handleSubmit} className={`${isMobile ? 'space-y-4' : 'space-y-4'}`} noValidate>
                  {/* Name Fields */}
                  <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                    <motion.div
                      initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={isMobile ? { duration: 0 } : { delay: 0.5 }}
                      className="relative group"
                    >
                      <motion.div 
                        className="relative"
                        whileHover={isMobile ? undefined : { scale: 1.01 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                      >
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=" "
                          required
                          className={`peer w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl outline-none transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-primary-100 placeholder-transparent ${
                            fieldErrors.firstName && touchedFields.firstName
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 focus:border-primary-500'
                          }`}
                        />
                        <label
                          htmlFor="firstName"
                          className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
                        >
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                      </motion.div>
                      {fieldErrors.firstName && touchedFields.firstName && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.firstName}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={isMobile ? { duration: 0 } : { delay: 0.5 }}
                      className="relative group"
                    >
                      <motion.div 
                        className="relative"
                        whileHover={isMobile ? undefined : { scale: 1.01 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                      >
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=" "
                          required
                          className={`peer w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl outline-none transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-primary-100 placeholder-transparent ${
                            fieldErrors.lastName && touchedFields.lastName
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 focus:border-primary-500'
                          }`}
                        />
                        <label
                          htmlFor="lastName"
                          className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
                        >
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                      </motion.div>
                      {fieldErrors.lastName && touchedFields.lastName && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.lastName}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Mobile Number */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={isMobile ? { duration: 0 } : { delay: 0.6 }}
                    className="relative group"
                  >
                    <motion.div 
                      className="relative"
                      whileHover={isMobile ? undefined : { scale: 1.01 }}
                      transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                    >
                      <input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100 placeholder-transparent"
                      />
                      <label
                        htmlFor="mobileNumber"
                        className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:left-12 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-primary-600"
                      >
                        Mobile Number
                      </label>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none peer-focus:text-primary-600 transition-colors">
                        +1
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={isMobile ? { duration: 0 } : { delay: 0.7 }}
                    className="relative group"
                  >
                    <motion.div 
                      className="relative"
                      whileHover={isMobile ? undefined : { scale: 1.01 }}
                      transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                    >
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        required
                        className={`peer w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl outline-none transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-primary-100 placeholder-transparent ${
                          fieldErrors.email && touchedFields.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                    </motion.div>
                    {fieldErrors.email && touchedFields.email && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={isMobile ? { duration: 0 } : { delay: 0.8 }}
                    className="relative group"
                  >
                    <motion.div 
                      className="relative"
                      whileHover={isMobile ? undefined : { scale: 1.01 }}
                      transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                    >
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        required
                        className={`peer w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl outline-none transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-primary-100 placeholder-transparent ${
                          fieldErrors.password && touchedFields.password
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
                      >
                        Password <span className="text-red-500">*</span>
                      </label>
                      <Lock className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        {isMobile ? (
                          <div className="flex items-center justify-center">
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </motion.div>
                        )}
                      </button>
                    </motion.div>
                    {fieldErrors.password && touchedFields.password && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {fieldErrors.password}
                      </p>
                    )}
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={isMobile ? { duration: 0 } : { delay: 0.9 }}
                    className="relative group"
                  >
                    <motion.div 
                      className="relative"
                      whileHover={isMobile ? undefined : { scale: 1.01 }}
                      transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                    >
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        required
                        className={`peer w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl outline-none transition-all duration-300 focus:bg-white focus:shadow-lg focus:shadow-primary-100 placeholder-transparent ${
                          fieldErrors.confirmPassword && touchedFields.confirmPassword
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      <label
                        htmlFor="confirmPassword"
                        className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <Lock className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        {isMobile ? (
                          <div className="flex items-center justify-center">
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </motion.div>
                        )}
                      </button>
                    </motion.div>
                    {fieldErrors.confirmPassword && touchedFields.confirmPassword && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {fieldErrors.confirmPassword}
                      </p>
                    )}
                  </motion.div>


                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-red-600">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Create Account Button */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={isMobile ? { duration: 0 } : { delay: 1.1 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className={`relative w-full ${isMobile ? 'py-3.5' : 'py-4'} bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-lg overflow-hidden group disabled:opacity-50`}
                      whileHover={isMobile ? undefined : { scale: isLoading ? 1 : 1.02, boxShadow: "0 20px 40px rgba(127, 40, 96, 0.3)" }}
                      whileTap={isMobile ? { scale: 0.98 } : { scale: isLoading ? 1 : 0.98 }}
                    >
                      {/* Animated Wave Effect - Desktop Only */}
                      {!isMobile && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 opacity-0 group-hover:opacity-100"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      {/* Ripple Effect - Desktop Only */}
                      {!isMobile && (
                        <motion.div
                          className="absolute inset-0"
                          initial={{ scale: 0, opacity: 0.5 }}
                          whileTap={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className={`w-full h-full bg-white/20 ${isMobile ? 'rounded-xl' : 'rounded-2xl'}`} />
                        </motion.div>
                      )}

                      {/* Shimmer Effect - Desktop Only */}
                      {!isMobile && (
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
                      )}

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
                          <span>Register</span>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Already have an account? Log in here */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={isMobile ? { duration: 0 } : { delay: 1.2 }}
                    className="text-center pt-1"
                  >
                    <span className={`${isMobile ? 'text-sm' : ''} text-gray-600`}>Already have an account? </span>
                    <Link href="/login">
                      <motion.span
                        className="text-primary-600 hover:text-primary-700 font-bold cursor-pointer inline-block"
                        whileHover={isMobile ? undefined : { scale: 1.05 }}
                        whileTap={isMobile ? { scale: 0.95 } : { scale: 0.95 }}
                      >
                        Log in here
                      </motion.span>
                    </Link>
                  </motion.div>

                  {/* Back to Dashboard - Desktop Only */}
                  {!isMobile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="text-center pt-1"
                    >
                    <Link href="/">
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
                          Back to Dashboard
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
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

    </div>
  )
}
