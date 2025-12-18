'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'jobseeker' | 'recruiter' | 'admin' | 'agency'
  profession?: string
  specialty?: string
  jobRole?: string
  location?: {
    city?: string
    state?: string
    region?: string
  }
  profileComplete?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>
  logout: (redirectPath?: string) => void
  updateUser: (userData: Partial<User>) => void
  isProfileComplete: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    try {
      const storedUser = localStorage.getItem('auth_user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('auth_user')
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      if (user) {
        localStorage.setItem('auth_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('auth_user')
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [user])

  const login = async (email: string, password: string, role: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if this is a mobile/OTP login (identifier looks like a phone number)
    const isMobileLogin = /^\+?1?\d{10}$/.test(email.replace(/\D/g, ''))

    // Basic validation
    if (!email) {
      return { success: false, error: 'Email or mobile number is required' }
    }

    // For mobile/OTP login, password is not required
    if (!isMobileLogin) {
      if (!password) {
        return { success: false, error: 'Password is required' }
      }

      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' }
      }
    }

    // For demo purposes, accept any valid email/password
    // In production, this would call your actual API
    const userName = isMobileLogin 
      ? `User ${email.slice(-4)}` // Use last 4 digits for mobile
      : email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User'
    
    const avatarName = isMobileLogin 
      ? `User ${email.slice(-4)}`
      : email.split('@')[0]
    
    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name: userName,
      email: isMobileLogin ? `${email}@mobile.user` : email, // Store mobile as email format for compatibility
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarName)}&background=7f2860&color=fff&size=128`,
      role: role as User['role']
    }

    setUser(mockUser)
    return { success: true }
  }

  const signup = async (name: string, email: string, password: string, role: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Basic validation
    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required' }
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' }
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return { success: false, error: 'Invalid email address' }
    }

    // For demo purposes, create user immediately
    // In production, this would call your actual API
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7f2860&color=fff&size=128`,
      role: role as User['role']
    }

    setUser(newUser)
    return { success: true }
  }

  const logout = (redirectPath?: string) => {
    // Get user role BEFORE clearing user state
    const userRole = user?.role
    
    // Determine redirect path based on role if not provided
    if (!redirectPath) {
      if (userRole === 'agency') {
        redirectPath = '/agency-login'
      } else if (userRole === 'recruiter') {
        redirectPath = '/recruiter-login'
      } else if (userRole === 'admin') {
        redirectPath = '/admin-login'
      } else {
        // Default to job seeker login for jobseeker role or any undefined/null role
        redirectPath = '/login'
      }
    }
    
    // Store redirect path before clearing state
    const finalRedirectPath = redirectPath
    
    // Clear localStorage first
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('auth_user')
      } catch (error) {
        console.error('Error removing from localStorage:', error)
      }
    }
    
    // Clear user state
    setUser(null)
    
    // Show toast notification
    toast.success('Logged out successfully. See you soon!', {
      icon: '👋',
      duration: 2000,
    })
    
    // Use window.location.replace() for immediate hard redirect
    // This bypasses React router and ensures redirect happens immediately
    if (typeof window !== 'undefined') {
      // Use replace to avoid adding to browser history
      window.location.replace(finalRedirectPath)
    } else {
      // Fallback for SSR - use router
      router.replace(finalRedirectPath)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      // Only auto-mark profile as complete if profileComplete is not explicitly set in userData
      // This allows onboarding flow to prevent premature completion
      if (userData.profileComplete === undefined) {
        if (updatedUser.profession && updatedUser.specialty && updatedUser.location) {
          updatedUser.profileComplete = true
        }
      }
      setUser(updatedUser)
      // Note: localStorage is automatically saved via useEffect when user state changes
    }
  }

  const isProfileComplete = (): boolean => {
    if (!user) return false
    // Check the profileComplete flag first - if explicitly set, use that
    // Otherwise, check if all required fields are present
    if (user.profileComplete !== undefined) {
      return user.profileComplete
    }
    return !!(user.profession && user.specialty && user.location)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    isProfileComplete
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

