'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Heart, Star, Briefcase, AlertCircle, Shield } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useIsMobile } from '@/hooks/useIsMobile'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { login } = useAuth()
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email address is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address'
        return ''
      case 'mobile':
        if (!value.trim()) return 'Mobile number is required'
        if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) return 'Please enter a valid 10-digit mobile number'
        return ''
      case 'password':
        if (!value) return 'Password is required'
        return ''
      case 'otp':
        if (!value.trim()) return 'OTP is required'
        if (!/^\d{6}$/.test(value)) return 'Please enter a valid 6-digit OTP'
        return ''
      default:
        return ''
    }
  }

  // Timer effect for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [otpTimer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate fields
    const errors: Record<string, string> = {}
    if (loginType === 'email') {
      const emailError = validateField('email', email)
      if (emailError) {
        errors.email = emailError
        setTouchedFields(prev => ({ ...prev, email: true }))
      }
      const passwordError = validateField('password', password)
      if (passwordError) {
        errors.password = passwordError
        setTouchedFields(prev => ({ ...prev, password: true }))
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        setIsLoading(false)
        return
      }
    } else {
      // Mobile login flow
      if (!otpSent) {
        // Send OTP
        const mobileError = validateField('mobile', mobile)
        if (mobileError) {
          errors.mobile = mobileError
          setTouchedFields(prev => ({ ...prev, mobile: true }))
        }

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors)
          setIsLoading(false)
          return
        }

        // Simulate sending OTP
        setTimeout(() => {
          toast.success('OTP sent successfully! Check your phone.')
          setOtpSent(true)
          setOtpTimer(30) // 30 seconds timer
          setIsLoading(false)
        }, 1000)
        return
      } else {
        // Verify OTP
        const otpError = validateField('otp', otp)
        if (otpError) {
          errors.otp = otpError
          setTouchedFields(prev => ({ ...prev, otp: true }))
        }

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors)
          setIsLoading(false)
          return
        }

        // Simulate OTP verification
        setTimeout(async () => {
          // After successful OTP verification, proceed with login
          const result = await login(mobile, '', 'jobseeker')
          if (result.success) {
            // Check if onboarding will be shown (profile incomplete)
            // Wait a bit for user state to update, then check
            setTimeout(() => {
              const currentUser = JSON.parse(localStorage.getItem('auth_user') || 'null')
              const willShowOnboarding = !currentUser || currentUser.profileComplete === false || currentUser.profileComplete === undefined
              if (!willShowOnboarding) {
                toast.success('Login successful! Welcome back!')
              }
            }, 100)
            router.push('/')
          } else {
            const errorMsg = result.error || 'OTP verification failed'
            setError(errorMsg)
            toast.error(errorMsg)
          }
          setIsLoading(false)
        }, 1000)
        return
      }
    }

    const result = await login(email, password, 'jobseeker')

    if (result.success) {
      // Check if onboarding will be shown (profile incomplete)
      // Wait a bit for user state to update, then check
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('auth_user') || 'null')
        const willShowOnboarding = !currentUser || currentUser.profileComplete === false || currentUser.profileComplete === undefined
        if (!willShowOnboarding) {
          toast.success('Login successful! Welcome back!')
        }
      }, 100)
      router.push('/')
    } else {
      const errorMsg = result.error || 'Login failed'
      setError(errorMsg)
      toast.error(errorMsg)
    }
    
    setIsLoading(false)
  }

  const handleResendOtp = () => {
    if (otpTimer > 0) return // Don't allow resend if timer is active
    
    setIsLoading(true)
    // Simulate resending OTP
    setTimeout(() => {
      toast.success('OTP resent successfully! Check your phone.')
      setOtpTimer(30) // Reset timer to 30 seconds
      setOtp('') // Clear OTP field
      setIsLoading(false)
    }, 1000)
  }

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
        <div className={`${isMobile ? 'w-full' : 'max-w-2xl mx-auto'}`}>
          {/* Glassmorphic Login Card */}
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
                      Job Seeker Login
                    </h1>
                    <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>Log in to your account</p>
                  </motion.div>

                {/* Email/Mobile Toggle */}
                <motion.div
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={isMobile ? { duration: 0 } : { delay: 0.4 }}
                  className="flex justify-center mb-6"
                >
                  <div className={`inline-flex rounded-xl bg-gray-100 p-1 ${isMobile ? 'w-full' : ''}`}>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setLoginType('email')
                        setOtpSent(false)
                        setOtp('')
                        setOtpTimer(0)
                      }}
                      className={`relative ${isMobile ? 'flex-1' : 'px-8'} py-3 rounded-lg font-semibold transition-all ${
                        loginType === 'email'
                          ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md'
                          : 'text-gray-600 bg-transparent'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {!isMobile && loginType === 'email' && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      <span className="relative z-10">Email</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setLoginType('mobile')
                        setOtpSent(false)
                        setOtp('')
                        setOtpTimer(0)
                      }}
                      className={`relative ${isMobile ? 'flex-1' : 'px-8'} py-3 rounded-lg font-semibold transition-all ${
                        loginType === 'mobile'
                          ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md'
                          : 'text-gray-600 bg-transparent'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {!isMobile && loginType === 'mobile' && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      <span className="relative z-10">Mobile</span>
                    </motion.button>
                  </div>
                </motion.div>

                <form onSubmit={handleSubmit} className={`${isMobile ? 'space-y-4' : 'space-y-5'}`} noValidate>
                  {/* Email or Mobile Field */}
                  {loginType === 'email' ? (
                    <motion.div
                      key="email-field"
                      initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={isMobile ? { duration: 0 } : { delay: 0.2, type: "spring" }}
                      className="relative group"
                    >
                      <motion.div 
                        className="relative"
                        whileHover={isMobile ? undefined : { scale: 1.01 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                      >
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (fieldErrors.email) {
                              setFieldErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors.email
                                return newErrors
                              })
                            }
                          }}
                          onBlur={(e) => {
                            setTouchedFields(prev => ({ ...prev, email: true }))
                            const error = validateField('email', e.target.value)
                            if (error) {
                              setFieldErrors(prev => ({ ...prev, email: error }))
                            }
                          }}
                          placeholder=" "
                          required
                          className={`peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 rounded-xl outline-none transition-all duration-300 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent ${
                            fieldErrors.email && touchedFields.email
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 focus:border-primary-500'
                          }`}
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                      </motion.div>
                      {fieldErrors.email && touchedFields.email && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.email}
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mobile-field"
                      initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={isMobile ? { duration: 0 } : { delay: 0.2, type: "spring" }}
                      className="relative group"
                    >
                      <motion.div 
                        className="relative"
                        whileHover={isMobile ? undefined : { scale: 1.01 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                      >
                        <input
                          id="mobile"
                          type="tel"
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value)
                            if (fieldErrors.mobile) {
                              setFieldErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors.mobile
                                return newErrors
                              })
                            }
                          }}
                          onBlur={(e) => {
                            setTouchedFields(prev => ({ ...prev, mobile: true }))
                            const error = validateField('mobile', e.target.value)
                            if (error) {
                              setFieldErrors(prev => ({ ...prev, mobile: error }))
                            }
                          }}
                          placeholder=" "
                          required
                          disabled={otpSent}
                          className={`peer w-full pl-12 pr-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 rounded-xl outline-none transition-all duration-300 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent ${
                            fieldErrors.mobile && touchedFields.mobile
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 focus:border-primary-500'
                          } ${otpSent ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                        />
                        <label
                          htmlFor="mobile"
                          className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:left-12 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:left-5 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                        >
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none peer-focus:text-primary-600 transition-colors">
                          +1
                        </div>
                      </motion.div>
                      {fieldErrors.mobile && touchedFields.mobile && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.mobile}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* OTP Field (Only for Mobile after OTP is sent) */}
                  {loginType === 'mobile' && otpSent && (
                    <motion.div
                      key="otp-field"
                      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={isMobile ? { duration: 0 } : { delay: 0.1, type: "spring" }}
                      className="relative group"
                    >
                      <motion.div 
                        className="relative"
                        whileHover={isMobile ? undefined : { scale: 1.01 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                      >
                        <input
                          id="otp"
                          type="text"
                          value={otp}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                            setOtp(value)
                            if (fieldErrors.otp) {
                              setFieldErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors.otp
                                return newErrors
                              })
                            }
                          }}
                          onBlur={(e) => {
                            setTouchedFields(prev => ({ ...prev, otp: true }))
                            const error = validateField('otp', e.target.value)
                            if (error) {
                              setFieldErrors(prev => ({ ...prev, otp: error }))
                            }
                          }}
                          placeholder=" "
                          required
                          maxLength={6}
                          className={`peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 rounded-xl outline-none transition-all duration-300 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent ${
                            fieldErrors.otp && touchedFields.otp
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 focus:border-primary-500'
                          }`}
                        />
                        <label
                          htmlFor="otp"
                          className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                        >
                          Enter OTP <span className="text-red-500">*</span>
                        </label>
                        <Shield className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                      </motion.div>
                      {fieldErrors.otp && touchedFields.otp && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {fieldErrors.otp}
                        </p>
                      )}
                      {/* Resend OTP */}
                      <div className="mt-2 text-right">
                        {otpTimer > 0 ? (
                          <p className="text-sm text-gray-600">
                            Resend OTP in <span className="font-semibold text-primary-600">{otpTimer}s</span>
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isLoading}
                            className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Password Field (Only for Email) */}
                  {loginType === 'email' && (
                    <motion.div
                      key="password-field"
                      initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={isMobile ? { duration: 0 } : { delay: 0.3, type: "spring" }}
                      className="relative group"
                    >
                      <motion.div 
                        className="relative"
                        whileHover={isMobile ? undefined : { scale: 1.01 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                      >
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            if (fieldErrors.password) {
                              setFieldErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors.password
                                return newErrors
                              })
                            }
                          }}
                          onBlur={(e) => {
                            setTouchedFields(prev => ({ ...prev, password: true }))
                            const error = validateField('password', e.target.value)
                            if (error) {
                              setFieldErrors(prev => ({ ...prev, password: error }))
                            }
                          }}
                          placeholder=" "
                          required
                          className={`peer w-full px-5 py-4 pr-24 bg-gradient-to-br from-gray-50 to-white border-2 rounded-xl outline-none transition-all duration-300 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent ${
                            fieldErrors.password && touchedFields.password
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 focus:border-primary-500'
                          }`}
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                        >
                          Password <span className="text-red-500">*</span>
                        </label>
                        <Lock className="absolute right-14 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 peer-focus:text-primary-500 transition-colors" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
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
                  )}

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

                  {/* Submit Button */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={isMobile ? { duration: 0 } : { delay: 0.4 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className={`relative w-full ${isMobile ? 'py-3.5' : 'py-4'} bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-lg overflow-hidden group disabled:opacity-70`}
                      whileHover={isMobile ? undefined : { scale: 1.02, boxShadow: "0 20px 40px rgba(127, 40, 96, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
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
                      
                      {/* Ripple Effect */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileTap={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`w-full h-full bg-white/20 ${isMobile ? 'rounded-xl' : 'rounded-2xl'}`} />
                      </motion.div>

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
                            <span>
                              {loginType === 'email' 
                                ? 'Logging in...' 
                                : otpSent 
                                  ? 'Verifying OTP...' 
                                  : 'Sending OTP...'}
                            </span>
                          </>
                        ) : (
                          <span>
                            {loginType === 'email' 
                              ? 'Log In' 
                              : otpSent 
                                ? 'Verify OTP' 
                                : 'Send OTP'}
                          </span>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Forgot Password */}
                  <motion.div
                    initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={isMobile ? { duration: 0 } : { delay: 0.5 }}
                    className="text-left -mt-2"
                  >
                    <Link href="/forgot-password">
                      <motion.span
                        className="text-sm text-primary-600 hover:text-primary-700 font-semibold cursor-pointer inline-block"
                        whileHover={isMobile ? undefined : { x: 5 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 300 }}
                      >
                        Forgot your password? →
                      </motion.span>
                    </Link>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={isMobile ? { duration: 0 } : { delay: 0.9 }}
                    className={`relative ${isMobile ? 'my-4' : 'my-5'}`}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className={`px-4 bg-white ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-500`}>
                        New to our platform?
                      </span>
                    </div>
                  </motion.div>

                  {/* Register Link */}
                  <motion.div
                    initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={isMobile ? { duration: 0 } : { delay: 1 }}
                    className="text-center"
                  >
                    <span className={`${isMobile ? 'text-sm' : ''} text-gray-600`}>Don't have an account? </span>
                    <Link href="/register">
                      <motion.span
                        className="text-primary-600 hover:text-primary-700 font-bold cursor-pointer inline-block"
                        whileHover={isMobile ? undefined : { scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Register here
                      </motion.span>
                    </Link>
                  </motion.div>

                  {/* Back to Dashboard - Simplified for Mobile */}
                  {!isMobile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="text-center mt-4"
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

                {/* Other Login Options */}
                <motion.div
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={isMobile ? { duration: 0 } : { delay: 1.2 }}
                  className={`mt-6 pt-6 ${isMobile ? 'border-t border-gray-200' : 'border-t-2 border-gray-100'}`}
                >
                  <p className={`text-center ${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-gray-700 mb-4`}>
                    Other Login Options
                  </p>
                  <div className={`${isMobile ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-3 gap-4'}`}>
                    {/* Recruiter Login Card */}
                    <Link href="/recruiter-login">
                      <motion.div
                        className={`relative ${isMobile ? 'p-3' : 'p-5'} ${isMobile ? 'bg-white border border-gray-200' : 'bg-white/40 backdrop-blur-md border border-white/60'} rounded-xl cursor-pointer group overflow-hidden ${isMobile ? 'shadow-sm' : 'shadow-lg'} h-full`}
                        style={!isMobile ? {
                          boxShadow: '0 8px 32px 0 rgba(127, 40, 96, 0.1)'
                        } : {}}
                        whileHover={isMobile ? undefined : { 
                          scale: 1.05,
                          y: -5,
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                          borderColor: "rgba(127, 40, 96, 0.3)",
                          boxShadow: "0 8px 32px 0 rgba(127, 40, 96, 0.25)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {/* Glass Shine Effect - Desktop Only */}
                        {!isMobile && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        <div className="relative flex flex-col items-center text-center">
                          {/* Simple Icon */}
                          <motion.div
                            className={`${isMobile ? 'mb-2' : 'mb-3'} bg-gradient-to-br from-primary-500 to-primary-600 ${isMobile ? 'p-2' : 'p-3'} rounded-xl shadow-lg`}
                            whileHover={isMobile ? undefined : { scale: 1.1 }}
                            transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                          >
                            <svg className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </motion.div>
                          
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-800 ${isMobile ? '' : 'group-hover:text-primary-600'} transition-colors`}>
                              {isMobile ? 'Recruiter' : 'Recruiter Login'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>

                    {/* Agency Login Card */}
                    <Link href="/agency-login">
                      <motion.div
                        className={`relative ${isMobile ? 'p-3' : 'p-5'} ${isMobile ? 'bg-white border border-gray-200' : 'bg-white/40 backdrop-blur-md border border-white/60'} rounded-xl cursor-pointer group overflow-hidden ${isMobile ? 'shadow-sm' : 'shadow-lg'} h-full`}
                        style={!isMobile ? {
                          boxShadow: '0 8px 32px 0 rgba(127, 40, 96, 0.1)'
                        } : {}}
                        whileHover={isMobile ? undefined : { 
                          scale: 1.05,
                          y: -5,
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                          borderColor: "rgba(127, 40, 96, 0.3)",
                          boxShadow: "0 8px 32px 0 rgba(127, 40, 96, 0.25)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {/* Glass Shine Effect - Desktop Only */}
                        {!isMobile && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        <div className="relative flex flex-col items-center text-center">
                          {/* Simple Icon */}
                          <motion.div
                            className={`${isMobile ? 'mb-2' : 'mb-3'} bg-gradient-to-br from-primary-500 to-primary-600 ${isMobile ? 'p-2' : 'p-3'} rounded-xl shadow-lg`}
                            whileHover={isMobile ? undefined : { scale: 1.1 }}
                            transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                          >
                            <svg className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </motion.div>
                          
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-800 ${isMobile ? '' : 'group-hover:text-primary-600'} transition-colors`}>
                              {isMobile ? 'Agency' : 'Agency Login'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>

                    {/* Admin Login Card */}
                    <Link href="/admin-login">
                      <motion.div
                        className={`relative ${isMobile ? 'p-3' : 'p-5'} ${isMobile ? 'bg-white border border-gray-200' : 'bg-white/40 backdrop-blur-md border border-white/60'} rounded-xl cursor-pointer group overflow-hidden ${isMobile ? 'shadow-sm' : 'shadow-lg'} h-full`}
                        style={!isMobile ? {
                          boxShadow: '0 8px 32px 0 rgba(127, 40, 96, 0.1)'
                        } : {}}
                        whileHover={isMobile ? undefined : { 
                          scale: 1.05,
                          y: -5,
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                          borderColor: "rgba(127, 40, 96, 0.3)",
                          boxShadow: "0 8px 32px 0 rgba(127, 40, 96, 0.25)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={isMobile ? undefined : { type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {/* Glass Shine Effect - Desktop Only */}
                        {!isMobile && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        <div className="relative flex flex-col items-center text-center">
                          {/* Simple Icon */}
                          <motion.div
                            className={`${isMobile ? 'mb-2' : 'mb-3'} bg-gradient-to-br from-primary-500 to-primary-600 ${isMobile ? 'p-2' : 'p-3'} rounded-xl shadow-lg`}
                            whileHover={isMobile ? undefined : { scale: 1.1 }}
                            transition={isMobile ? undefined : { type: "spring", stiffness: 400 }}
                          >
                            <svg className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </motion.div>
                          
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-800 ${isMobile ? '' : 'group-hover:text-primary-600'} transition-colors`}>
                              {isMobile ? 'Admin' : 'Admin Login'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

    </div>
  )
}
