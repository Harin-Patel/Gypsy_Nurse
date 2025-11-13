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
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>
  logout: (redirectPath?: string) => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('auth_user')
    }
  }, [user])

  const login = async (email: string, password: string, role: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Basic validation
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' }
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' }
    }

    // For demo purposes, accept any valid email/password
    // In production, this would call your actual API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User',
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=7f2860&color=fff&size=128`,
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
      id: Math.random().toString(36).substr(2, 9),
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
    
    // Clear user state and localStorage
    setUser(null)
    localStorage.removeItem('auth_user')
    
    toast.success('Logged out successfully. See you soon!', {
      icon: '👋',
      duration: 3000,
    })
    
    // Use window.location.href for immediate hard redirect (bypasses React router)
    // This ensures the redirect happens before ProtectedRoute can interfere
    window.location.href = finalRedirectPath
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser
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

