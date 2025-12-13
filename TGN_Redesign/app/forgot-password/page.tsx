'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import toast from 'react-hot-toast'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ForgotPasswordPage() {
  const isMobile = useIsMobile()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailError, setEmailError] = useState('')

  const validateEmail = (emailValue: string): string => {
    if (!emailValue.trim()) {
      return 'Email address is required'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (emailError) {
      setEmailError(validateEmail(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateEmail(email)
    if (error) {
      setEmailError(error)
      return
    }
    
    setEmailError('')
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast.success(`Password reset link sent to ${email}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Navigation Bar */}
      <Navigation />

      {/* Background - Desktop Only */}
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
        <div className={`${isMobile ? 'w-full' : 'max-w-xl mx-auto'}`}>
          {/* Glassmorphic Card */}
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
                    {/* Glow Effect */}
                    <motion.div 
                      className="absolute -inset-4 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-full blur-2xl opacity-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 2,
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

                {!isSubmitted ? (
                  <>
                    <motion.div
                      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={isMobile ? { duration: 0 } : { delay: 0.3 }}
                      className="text-center mb-6"
                    >
                      <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-2`}>
                        Forgot Password?
                      </h1>
                      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                        Enter your email address and we'll send you a link to reset your password.
                      </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className={`${isMobile ? 'space-y-4' : 'space-y-5'}`} noValidate>
                      {/* Email Field with Floating Label */}
                      <motion.div
                        initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={isMobile ? { duration: 0 } : { delay: 0.4, type: "spring" }}
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
                            onChange={handleEmailChange}
                            onBlur={() => setEmailError(validateEmail(email))}
                            placeholder=" "
                            required
                            className={`peer w-full ${isMobile ? 'px-4 py-3' : 'px-5 py-4'} bg-gradient-to-br from-gray-50 to-white border-2 ${
                              emailError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                            } ${isMobile ? 'rounded-lg' : 'rounded-xl'} outline-none transition-all duration-300 focus:from-white focus:to-white ${isMobile ? '' : 'focus:shadow-xl focus:shadow-primary-100/50'} placeholder-transparent`}
                          />
                          <label
                            htmlFor="email"
                            className={`absolute ${isMobile ? 'left-4' : 'left-5'} -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base ${isMobile ? 'peer-placeholder-shown:top-3' : 'peer-placeholder-shown:top-4'} peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold`}
                          >
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <Mail className={`absolute ${isMobile ? 'right-4' : 'right-5'} top-1/2 -translate-y-1/2 w-5 h-5 ${
                            emailError ? 'text-red-400' : 'text-gray-400 peer-focus:text-primary-500'
                          } transition-colors`} />
                        </motion.div>
                        
                        {/* Validation Error Message */}
                        <AnimatePresence>
                          {emailError && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: 'auto' }}
                              exit={{ opacity: 0, y: -10, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 flex items-start gap-2"
                            >
                              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-red-600 leading-relaxed break-words">
                                {emailError}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Send Reset Link Button */}
                      <motion.div
                        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={isMobile ? { duration: 0 } : { delay: 0.5 }}
                      >
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          className={`relative w-full ${isMobile ? 'py-3' : 'py-4'} bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-lg overflow-hidden group disabled:opacity-70`}
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
                                <span>Sending...</span>
                              </>
                            ) : (
                              <span>Send Reset Link</span>
                            )}
                          </span>
                        </motion.button>
                      </motion.div>

                      {/* Remember your password? Back to Login */}
                      <motion.div
                        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={isMobile ? { duration: 0 } : { delay: 0.6 }}
                        className="text-center pt-2"
                      >
                        <span className={`${isMobile ? 'text-sm' : ''} text-gray-600`}>Remember your password? </span>
                        <Link href="/login">
                          <motion.span
                            className="text-primary-600 hover:text-primary-700 font-bold cursor-pointer inline-block"
                            whileHover={isMobile ? undefined : { scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Back to Login
                          </motion.span>
                        </Link>
                      </motion.div>

                      {/* Back to Dashboard - Desktop Only */}
                      {!isMobile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
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
                  </>
                ) : (
                  // Success Message
                  <motion.div
                    initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={isMobile ? { duration: 0 } : { type: "spring", stiffness: 150 }}
                    className={`text-center ${isMobile ? 'py-6' : 'py-8'}`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className={`${isMobile ? 'mb-4' : 'mb-6'} flex justify-center`}
                    >
                      <div className="relative">
                        {!isMobile && (
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-green-400 rounded-full blur-xl"
                        />
                        )}
                        <div className={`relative bg-gradient-to-br from-green-400 to-green-600 ${isMobile ? 'p-3' : 'p-4'} rounded-full`}>
                          <svg className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 ${isMobile ? 'mb-2' : 'mb-3'}`}>
                      Check Your Email
                    </h2>
                    <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 ${isMobile ? 'mb-4' : 'mb-6'} leading-relaxed`}>
                      We've sent a password reset link to{' '}
                      <span className="font-semibold text-primary-600 break-all">{email}</span>
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 ${isMobile ? 'mb-6' : 'mb-8'} leading-relaxed`}>
                      Didn't receive the email? Check your spam folder or try again.
                    </p>

                    <Link href="/login">
                      <motion.button
                        className={`${isMobile ? 'px-6 py-2.5 rounded-lg' : 'px-8 py-3 rounded-xl'} bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold shadow-lg`}
                        whileHover={isMobile ? undefined : { scale: 1.05, boxShadow: "0 10px 30px rgba(127, 40, 96, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Back to Login
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
