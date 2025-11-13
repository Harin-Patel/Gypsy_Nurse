'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (newPassword !== confirmPassword) {
      const errorMsg = "New passwords don't match"
      setError(errorMsg)
      toast.error(errorMsg)
      return
    }

    if (newPassword.length < 8) {
      const errorMsg = "New password must be at least 8 characters long"
      setError(errorMsg)
      toast.error(errorMsg)
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccessModal(true)
      toast.success('Password updated successfully!')
      // Reset form
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }, 2000)
  }

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' }
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' }
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'bg-orange-500' }
    if (password.length < 10) return { strength: 75, label: 'Good', color: 'bg-yellow-500' }
    return { strength: 100, label: 'Strong', color: 'bg-green-500' }
  }

  const strength = passwordStrength(newPassword)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Glassmorphic Change Password Card */}
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
                {/* Header with Animated Icon */}
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
                    <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Lock className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Change Password
                  </h1>
                  <p className="text-base text-gray-600">Update your account password</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Current Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="relative group"
                  >
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder=" "
                        required
                        className="peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="currentPassword"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Current Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </motion.div>
                  </motion.div>

                  {/* New Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="relative group"
                  >
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder=" "
                        required
                        className="peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="newPassword"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        New Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </motion.div>

                    {/* Password Strength Indicator */}
                    {newPassword && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Password Strength</span>
                          <span className={`text-xs font-semibold ${
                            strength.strength === 100 ? 'text-green-600' :
                            strength.strength === 75 ? 'text-yellow-600' :
                            strength.strength === 50 ? 'text-orange-600' :
                            'text-red-600'
                          }`}>{strength.label}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${strength.strength}%` }}
                            className={`h-full ${strength.color} transition-all duration-300`}
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Confirm Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="relative group"
                  >
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder=" "
                        required
                        className="peer w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:from-white focus:to-white focus:shadow-xl focus:shadow-primary-100/50 placeholder-transparent"
                      />
                      <label
                        htmlFor="confirmPassword"
                        className="absolute left-5 -top-3 px-2 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary-600 peer-focus:font-semibold"
                      >
                        Confirm New Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </motion.div>

                    {/* Match Indicator */}
                    {confirmPassword && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 flex items-center gap-2"
                      >
                        {newPassword === confirmPassword ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600">Passwords match</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-xs text-red-600">Passwords don't match</span>
                          </>
                        )}
                      </motion.div>
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

                  {/* Submit Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="relative w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-bold text-lg shadow-xl shadow-primary-500/30 transition-all overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: isLoading ? ['-200%', '200%'] : '-200%'
                      }}
                      transition={{
                        duration: 2,
                        repeat: isLoading ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Updating Password...
                        </>
                      ) : (
                        <>
                          Update Password
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>

                </form>

                {/* Password Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 p-4 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-100"
                >
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</h3>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full" />
                      At least 8 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full" />
                      Include uppercase and lowercase letters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full" />
                      Include at least one number
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full" />
                      Include at least one special character
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowSuccessModal(false)}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="w-full max-w-xs pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glassmorphic Card */}
                <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-green-400 via-green-500 to-green-600 opacity-20 pointer-events-none" />
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-2xl p-6">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-4">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-green-100 rounded-2xl blur-xl opacity-60" />
                        <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-7 h-7 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Password Updated!
                    </h3>
                    <p className="text-center text-gray-600 text-sm mb-5">
                      Your password has been successfully updated.
                    </p>

                    {/* Decorative Divider */}
                    <div className="mb-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowSuccessModal(false)}
                      className="w-full px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all shadow-lg text-sm"
                    >
                      Continue
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

