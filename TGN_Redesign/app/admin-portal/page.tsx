'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  User,
  Search,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut,
  BarChart3,
  Settings,
  Shield,
  TrendingUp,
  FileEdit,
  Mail,
  MapPin,
  Activity,
  AlertCircle,
  Briefcase,
  ShoppingBag,
  BookOpen,
  Award,
  GraduationCap,
  CheckCircle,
  School,
  Database,
  Bookmark
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import toast from 'react-hot-toast'

type TabKey = 'dashboard' | 'users' | 'authors' | 'jobs' | 'vendors' | 'applications' | 'blogs' | 'facilities' | 'certifications' | 'specialties' | 'certificationSpecialties' | 'licenseTypes' | 'certificateTypes' | 'degrees' | 'courseOfStudy' | 'schools' | 'vectorSearch' | 'vectorAnalytics' | 'ragDocuments' | 'analytics'

interface Tab {
  key: TabKey
  label: string
  icon: React.ElementType
  badge?: number
}

interface MenuSection {
  id: string
  label: string
  icon: React.ElementType
  children: Tab[]
}

const menuSections: MenuSection[] = [
  {
    id: 'userManagement',
    label: 'User Management',
    icon: Users,
    children: [
      { key: 'users', label: 'Users', icon: Users },
      { key: 'authors', label: 'Authors', icon: Edit },
    ]
  },
  {
    id: 'contentManagement',
    label: 'Content Management',
    icon: FileText,
    children: [
      { key: 'jobs', label: 'Jobs', icon: Briefcase },
      { key: 'applications', label: 'Applications', icon: FileText },
      { key: 'blogs', label: 'Blogs', icon: BookOpen },
    ]
  },
  {
    id: 'organizations',
    label: 'Organizations',
    icon: Building2,
    children: [
      { key: 'vendors', label: 'Vendors', icon: ShoppingBag },
      { key: 'facilities', label: 'Facilities', icon: Building2 },
    ]
  },
  {
    id: 'education',
    label: 'Profile Management',
    icon: GraduationCap,
    children: [
      { key: 'certifications', label: 'Certifications', icon: Award },
      { key: 'specialties', label: 'Specialties', icon: GraduationCap },
      { key: 'certificationSpecialties', label: 'Certification Specialties', icon: CheckCircle },
      { key: 'licenseTypes', label: 'License Types', icon: CheckCircle },
      { key: 'certificateTypes', label: 'Certificate Types', icon: CheckCircle },
      { key: 'degrees', label: 'Degrees', icon: GraduationCap },
      { key: 'courseOfStudy', label: 'Course of Study', icon: Bookmark },
      { key: 'schools', label: 'Schools', icon: School },
    ]
  },
  {
    id: 'aiAnalytics',
    label: 'AI & Analytics',
    icon: Database,
    children: [
      { key: 'vectorSearch', label: 'Vector Search', icon: Search },
      { key: 'vectorAnalytics', label: 'Vector Analytics', icon: Database },
      { key: 'ragDocuments', label: 'RAG Documents', icon: FileText },
      { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    ]
  },
]

const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    details
  }: {
    title: string
    value: string
    icon: React.ElementType
    details?: Array<{ label: string; value: string; status: 'active' | 'inactive' | 'closed' }>
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="relative group cursor-pointer h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glass Card - Same as Menu Bar Hover Effect */}
        <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40 overflow-hidden h-full flex flex-col">
          {/* Glass Hover Effect - Same as Menu Bar */}
          <motion.div
            className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-2xl border border-primary-200/50 shadow-lg -z-10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.95
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Shine Effect */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
          
          {/* Subtle Gradient Overlay */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-2xl -z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1">
            <div className="flex items-center gap-4 mb-3">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="p-3 rounded-xl bg-primary-600 shadow-lg"
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">{value}</h3>
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            {details && details.length > 0 && (
              <div className="space-y-1 mt-auto pt-3 border-t border-gray-200/50">
                {details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    {detail.status === 'active' && <CheckCircle className="w-3 h-3 text-green-500" />}
                    {detail.status === 'inactive' && <X className="w-3 h-3 text-red-500" />}
                    {detail.status === 'closed' && <AlertCircle className="w-3 h-3 text-orange-500" />}
                    <span className="text-gray-600">
                      {detail.label}: <span className="font-semibold text-gray-900">{detail.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
}

export default function AdminPortalPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [isWelcomeHovered, setIsWelcomeHovered] = useState(false)
  const [hoveredActionIndex, setHoveredActionIndex] = useState<number | null>(null)
  const [hoveredModuleIndex, setHoveredModuleIndex] = useState<number | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  // Redirect if not admin user
  useEffect(() => {
    if (isAuthenticated && user && user.role !== 'admin') {
      router.push('/')
      toast.error('Access denied. Admin portal only.')
    }
  }, [user, isAuthenticated, router])

  const handleLogout = () => {
    setShowLogoutModal(false)
    logout('/admin-login')
  }

  // Helper function to get tab label
  const getTabLabel = (tabKey: TabKey): string => {
    if (tabKey === 'dashboard') return 'Dashboard'
    for (const section of menuSections) {
      const child = section.children.find(c => c.key === tabKey)
      if (child) return child.label
    }
    return 'Dashboard'
  }

  // Helper function to find parent section for a tab
  const getParentSectionId = (tabKey: TabKey): string | null => {
    if (tabKey === 'dashboard') return null
    for (const section of menuSections) {
      if (section.children.some(child => child.key === tabKey)) {
        return section.id
      }
    }
    return null
  }

  // Auto-expand parent section when a child tab is selected
  useEffect(() => {
    if (activeTab !== 'dashboard') {
      const parentId = getParentSectionId(activeTab)
      if (parentId) {
        setExpandedSections(prev => {
          if (!prev.has(parentId)) {
            return new Set([...prev, parentId])
          }
          return prev
        })
      }
    }
  }, [activeTab])

  const renderDashboard = () => (
    <div className="space-y-6">
        {/* Welcome Section - Transparent Glass with Theme Color - Fixed Effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Glass Card - Fixed Glass Effect */}
          <div className="relative bg-white/20 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* Glass Effect - Always Visible */}
            <div className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-3xl border border-primary-200/50 shadow-lg -z-10 overflow-hidden">
              {/* Continuous Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ 
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Subtle Gradient Overlay - Always Visible */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-3xl -z-10" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold mb-3 text-gray-900">
                  Welcome back, {user?.name || 'Admin'}! 👋
                </h1>
                <p className="text-gray-600 text-lg font-medium">
                  Here's what's happening with the platform today.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

      {/* Overview Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="Total Users"
            value="27"
            icon={Users}
          />
          <StatCard
            title="Total Authors"
            value="8"
            icon={Edit}
          />
          <StatCard
            title="Total Vendors"
            value="16"
            icon={ShoppingBag}
          />
          <StatCard
            title="Total Jobs"
            value="51863"
            icon={Briefcase}
          />
          <StatCard
            title="Total Applications"
            value="123"
            icon={FileText}
          />
        </div>
      </div>

      {/* Quick Actions - Glass Design */}
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 mb-6"
        >
          Quick Actions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Plus, title: 'Add New Job', description: 'Create a new job posting', onClick: () => {
              const parentId = getParentSectionId('jobs')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('jobs')
            }, color: 'from-blue-400 to-blue-500' },
            { icon: Edit, title: 'Manage Authors', description: 'View and manage blog authors', onClick: () => {
              const parentId = getParentSectionId('authors')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('authors')
            }, color: 'from-purple-400 to-purple-500' },
            { icon: Search, title: 'Vector Search', description: 'AI-powered semantic job search', onClick: () => {
              const parentId = getParentSectionId('vectorSearch')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('vectorSearch')
            }, color: 'from-blue-400 to-blue-500' },
            { icon: TrendingUp, title: 'Vector Analytics', description: 'Monitor embedding performance', onClick: () => {
              const parentId = getParentSectionId('vectorAnalytics')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('vectorAnalytics')
            }, color: 'from-blue-400 to-blue-500' },
          ].map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.onClick}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredActionIndex(index)}
                onMouseLeave={() => setHoveredActionIndex(null)}
              >
                {/* Glass Card - Same as Menu Bar Hover Effect */}
                <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40 overflow-hidden">
                  {/* Glass Hover Effect - Same as Menu Bar */}
                  <motion.div
                    className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-2xl border border-primary-200/50 shadow-lg -z-10 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: hoveredActionIndex === index ? 1 : 0,
                      scale: hoveredActionIndex === index ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Shine Effect */}
                    {hoveredActionIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Subtle Gradient Overlay */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-2xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredActionIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="p-3 rounded-xl bg-primary-600 shadow-lg"
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Admin Modules - Enhanced Glass Design */}
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 mb-6"
        >
          Admin Modules
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'User Management', description: 'Manage users, roles, and permissions', color: 'from-blue-400 to-blue-500', glow: 'rgba(59, 130, 246, 0.1)', onClick: () => {
              const parentId = getParentSectionId('users')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('users')
            }},
            { icon: Edit, title: 'Author Management', description: 'Manage blog authors and content', color: 'from-purple-400 to-purple-500', glow: 'rgba(168, 85, 247, 0.1)', onClick: () => {
              const parentId = getParentSectionId('authors')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('authors')
            }},
            { icon: Briefcase, title: 'Job Management', description: 'Create, edit, and manage job postings', color: 'from-green-400 to-green-500', glow: 'rgba(34, 197, 94, 0.1)', onClick: () => {
              const parentId = getParentSectionId('jobs')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('jobs')
            }},
            { icon: FileText, title: 'Applications', description: 'Review and manage job applications', color: 'from-purple-400 to-purple-500', glow: 'rgba(168, 85, 247, 0.1)', onClick: () => {
              const parentId = getParentSectionId('applications')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('applications')
            }},
            { icon: Settings, title: 'System Settings', description: 'Configure system parameters and settings', color: 'from-orange-400 to-orange-500', glow: 'rgba(249, 115, 22, 0.1)', onClick: () => setShowSettingsModal(true) },
            { icon: Award, title: 'Licence Types', description: 'Manage licence types for user credentials', color: 'from-blue-400 to-blue-500', glow: 'rgba(59, 130, 246, 0.1)', onClick: () => {
              const parentId = getParentSectionId('licenseTypes')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('licenseTypes')
            }},
            { icon: Award, title: 'Certificate Types', description: 'Manage certificate types for user credentials', color: 'from-green-400 to-green-500', glow: 'rgba(34, 197, 94, 0.1)', onClick: () => {
              const parentId = getParentSectionId('certificateTypes')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('certificateTypes')
            }},
            { icon: Database, title: 'RAG Documents', description: 'Manage AI knowledge base documents', color: 'from-blue-400 to-blue-500', glow: 'rgba(59, 130, 246, 0.1)', onClick: () => {
              const parentId = getParentSectionId('ragDocuments')
              if (parentId) setExpandedSections(prev => new Set([...prev, parentId]))
              setActiveTab('ragDocuments')
            }},
          ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={module.onClick}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group cursor-pointer h-full"
                onMouseEnter={() => setHoveredModuleIndex(index)}
                onMouseLeave={() => setHoveredModuleIndex(null)}
              >
                {/* Glass Card - Same as Menu Bar Hover Effect */}
                <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40 overflow-hidden h-full flex flex-col">
                  {/* Glass Hover Effect - Same as Menu Bar */}
                  <motion.div
                    className="absolute -inset-1 bg-white/70 backdrop-blur-xl rounded-2xl border border-primary-200/50 shadow-lg -z-10 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: hoveredModuleIndex === index ? 1 : 0,
                      scale: hoveredModuleIndex === index ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Shine Effect */}
                    {hoveredModuleIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Subtle Gradient Overlay */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-2xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredModuleIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="p-3 rounded-xl bg-primary-600 shadow-lg"
                      >
                        <module.icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-600 flex-1">{module.description}</p>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage all platform users</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add User
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Job Seeker', status: 'active', joined: 'Jan 15, 2025' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'Agency', status: 'active', joined: 'Jan 10, 2025' },
                { name: 'Mike Johnson', email: 'mike@example.com', role: 'Recruiter', status: 'active', joined: 'Jan 8, 2025' },
                { name: 'Sarah Williams', email: 'sarah@example.com', role: 'Job Seeker', status: 'inactive', joined: 'Dec 20, 2024' },
              ].map((userItem, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {userItem.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-semibold text-gray-900">{userItem.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{userItem.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {userItem.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      userItem.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {userItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{userItem.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderAgencies = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agency Management</h1>
          <p className="text-gray-600">Manage all agency accounts</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Agency
        </motion.button>
      </div>

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Healthcare Staffing Inc', email: 'contact@healthcare.com', recruiters: 12, jobs: 45, status: 'active' },
          { name: 'Nurse Recruiters Pro', email: 'info@nurserecruiters.com', recruiters: 8, jobs: 32, status: 'active' },
          { name: 'Travel Nurse Agency', email: 'hello@travelnurse.com', recruiters: 15, jobs: 67, status: 'active' },
          { name: 'Medical Staffing Co', email: 'contact@medicalstaff.com', recruiters: 6, jobs: 23, status: 'inactive' },
        ].map((agency, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {agency.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{agency.name}</h3>
                <p className="text-sm text-gray-600">{agency.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Recruiters</p>
                <p className="text-xl font-bold text-gray-900">{agency.recruiters}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Jobs</p>
                <p className="text-xl font-bold text-gray-900">{agency.jobs}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                agency.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {agency.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors">
                View Details
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Platform Name</label>
            <input
              type="text"
              defaultValue="The Gypsy Nurse"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Maintenance Mode</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                <span className="text-gray-700">Enable maintenance mode</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password Requirements</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded" />
                <span className="text-gray-700">Minimum 8 characters</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded" />
                <span className="text-gray-700">Require uppercase letter</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded" />
                <span className="text-gray-700">Require number</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Placeholder render functions for all new tabs
  const renderAuthors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authors</h1>
          <p className="text-gray-600">Manage blog authors and content creators</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Author
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Author management interface coming soon...</p>
      </div>
    </div>
  )

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs</h1>
          <p className="text-gray-600">Manage all job postings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Job
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Job management interface coming soon...</p>
      </div>
    </div>
  )

  const renderVendors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendors</h1>
          <p className="text-gray-600">Manage vendor accounts</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Vendor
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Vendor management interface coming soon...</p>
      </div>
    </div>
  )

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
          <p className="text-gray-600">Manage job applications</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Application management interface coming soon...</p>
      </div>
    </div>
  )

  const renderBlogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blogs</h1>
          <p className="text-gray-600">Manage blog posts and content</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Blog
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Blog management interface coming soon...</p>
      </div>
    </div>
  )

  const renderFacilities = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Facilities</h1>
          <p className="text-gray-600">Manage healthcare facilities</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Facility
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Facility management interface coming soon...</p>
      </div>
    </div>
  )

  const renderCertifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certifications</h1>
          <p className="text-gray-600">Manage certifications</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Certification
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Certification management interface coming soon...</p>
      </div>
    </div>
  )

  const renderSpecialties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Specialties</h1>
          <p className="text-gray-600">Manage medical specialties</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Specialty
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Specialty management interface coming soon...</p>
      </div>
    </div>
  )

  const renderCertificationSpecialties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certification Specialties</h1>
          <p className="text-gray-600">Manage certification specialties</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Certification Specialty
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Certification specialty management interface coming soon...</p>
      </div>
    </div>
  )

  const renderLicenseTypes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">License Types</h1>
          <p className="text-gray-600">Manage license types</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add License Type
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">License type management interface coming soon...</p>
      </div>
    </div>
  )

  const renderCertificateTypes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Types</h1>
          <p className="text-gray-600">Manage certificate types</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Certificate Type
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Certificate type management interface coming soon...</p>
      </div>
    </div>
  )

  const renderDegrees = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Degrees</h1>
          <p className="text-gray-600">Manage degree types</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Degree
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Degree management interface coming soon...</p>
      </div>
    </div>
  )

  const renderCourseOfStudy = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course of Study</h1>
          <p className="text-gray-600">Manage courses of study</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Course
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Course of study management interface coming soon...</p>
      </div>
    </div>
  )

  const renderSchools = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schools</h1>
          <p className="text-gray-600">Manage educational institutions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add School
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">School management interface coming soon...</p>
      </div>
    </div>
  )

  const renderVectorSearch = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vector Search</h1>
          <p className="text-gray-600">Search using vector embeddings</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Vector search interface coming soon...</p>
      </div>
    </div>
  )

  const renderVectorAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vector Analytics</h1>
          <p className="text-gray-600">Analyze vector data and embeddings</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Vector analytics interface coming soon...</p>
      </div>
    </div>
  )

  const renderRAGDocuments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RAG Documents</h1>
          <p className="text-gray-600">Manage RAG (Retrieval-Augmented Generation) documents</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Upload Document
        </motion.button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">RAG document management interface coming soon...</p>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">View platform analytics and insights</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">Analytics dashboard coming soon...</p>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex items-center gap-6 pb-6 border-b border-gray-200"
      >
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-primary-500 rounded-full -z-10"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name || 'Admin'}</h2>
          <p className="text-gray-600">{user?.email || 'admin@example.com'}</p>
          <p className="text-sm text-gray-500 mt-1">Administrator Account</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="space-y-5">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"
          >
            <User className="w-5 h-5 text-primary-600" />
            Profile Information
          </motion.h3>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 text-primary-600" />
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user?.name || ''}
              className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 text-primary-600" />
              Email Address
            </label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50 hover:border-gray-300 font-medium text-gray-700"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard()
      case 'users': return renderUsers()
      case 'authors': return renderAuthors()
      case 'jobs': return renderJobs()
      case 'vendors': return renderVendors()
      case 'applications': return renderApplications()
      case 'blogs': return renderBlogs()
      case 'facilities': return renderFacilities()
      case 'certifications': return renderCertifications()
      case 'specialties': return renderSpecialties()
      case 'certificationSpecialties': return renderCertificationSpecialties()
      case 'licenseTypes': return renderLicenseTypes()
      case 'certificateTypes': return renderCertificateTypes()
      case 'degrees': return renderDegrees()
      case 'courseOfStudy': return renderCourseOfStudy()
      case 'schools': return renderSchools()
      case 'vectorSearch': return renderVectorSearch()
      case 'vectorAnalytics': return renderVectorAnalytics()
      case 'ragDocuments': return renderRAGDocuments()
      case 'analytics': return renderAnalytics()
      default: return renderDashboard()
    }
  }

  // Don't render if user is authenticated but not an admin
  if (isAuthenticated && user && user.role !== 'admin') {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar with Glass Effect */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className={`${
            isSidebarCollapsed ? 'w-20' : 'w-64'
          } fixed h-screen z-50 transition-all duration-300`}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%)',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            boxShadow: '0 8px 32px 0 rgba(127, 40, 96, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
            borderRight: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {/* Background Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237f2860' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-purple-50/20 pointer-events-none" />
          
          <div className="flex flex-col h-full relative z-10">
            {/* Logo/Header */}
            <div className={`border-b border-white/30 backdrop-blur-sm ${
              isSidebarCollapsed ? 'p-3' : 'p-6'
            }`}>
              {!isSidebarCollapsed ? (
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Admin Portal</h2>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className={`flex-1 space-y-1 overflow-y-auto scrollbar-hide ${
              isSidebarCollapsed ? 'p-2' : 'p-4'
            }`} style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
              {/* Dashboard - Standalone */}
              <motion.button
                onClick={() => {
                  setActiveTab('dashboard')
                }}
                whileHover={{ x: isSidebarCollapsed ? 0 : 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full flex items-center rounded-xl transition-all overflow-hidden group mb-2 ${
                  isSidebarCollapsed 
                    ? 'px-2 py-3 justify-center' 
                    : 'gap-4 px-4 py-3'
                } ${
                  activeTab === 'dashboard'
                    ? 'text-primary-700 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {/* Active Background with Glass Effect */}
                <AnimatePresence mode="wait">
                  {activeTab === 'dashboard' && (
                    <motion.div
                      key="dashboard-active"
                      layoutId="activeTabBg"
                      initial={false}
                      className="absolute inset-0 rounded-xl overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl border border-primary-200/50"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -inset-0.5 bg-gradient-to-r from-primary-400/30 to-primary-600/30 rounded-xl blur-md -z-10"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Hover Background */}
                {activeTab !== 'dashboard' && (
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity border border-white/50" />
                )}
                
                {/* Content */}
                <div className={`relative z-10 flex items-center w-full ${
                  isSidebarCollapsed ? 'justify-center' : 'gap-4'
                }`}>
                  <div className={`rounded-lg transition-colors ${
                    isSidebarCollapsed 
                      ? 'p-2.5' 
                      : 'p-2'
                  } ${
                    activeTab === 'dashboard'
                      ? 'bg-primary-500/20 text-primary-600' 
                      : 'bg-white/50 text-gray-500 group-hover:bg-primary-100/50 group-hover:text-primary-600'
                  }`}>
                    <LayoutDashboard className={isSidebarCollapsed ? "w-5 h-5" : "w-5 h-5"} />
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="flex-1 text-left font-medium">Dashboard</span>
                  )}
                </div>
              </motion.button>

              {/* Collapsible Sections */}
              {!isSidebarCollapsed && menuSections.map((section) => {
                const SectionIcon = section.icon
                const isExpanded = expandedSections.has(section.id)
                const hasActiveChild = section.children.some(child => child.key === activeTab)
                
                return (
                  <div key={section.id} className="mb-1">
                    {/* Parent Section Header */}
                    <motion.button
                      onClick={() => {
                        const newExpanded = new Set(expandedSections)
                        if (isExpanded) {
                          newExpanded.delete(section.id)
                        } else {
                          newExpanded.add(section.id)
                        }
                        setExpandedSections(newExpanded)
                      }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative w-full flex items-center rounded-xl transition-all overflow-hidden group ${
                        hasActiveChild
                          ? 'text-primary-700 font-semibold'
                          : 'text-gray-700'
                      } gap-4 px-4 py-3`}
                    >
                      {/* Active Background with Glass Effect - Only when child is active */}
                      <AnimatePresence mode="wait">
                        {hasActiveChild && (
                          <motion.div
                            key={`section-active-${section.id}`}
                            layoutId={`sectionBg-${section.id}`}
                            initial={false}
                            className="absolute inset-0 rounded-xl overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl border border-primary-200/50"
                            />
                            <motion.div
                              animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.5, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="absolute -inset-0.5 bg-gradient-to-r from-primary-400/30 to-primary-600/30 rounded-xl blur-md -z-10"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Expanded but not active - Subtle effect */}
                      {isExpanded && !hasActiveChild && (
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl border border-gray-200/30" />
                      )}
                      
                      {/* Hover Background */}
                      {!hasActiveChild && !isExpanded && (
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity border border-white/50" />
                      )}
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center w-full gap-4">
                        <div className={`rounded-lg transition-colors p-2 ${
                          hasActiveChild
                            ? 'bg-primary-500/20 text-primary-600' 
                            : isExpanded
                            ? 'bg-primary-100/30 text-primary-500'
                            : 'bg-white/50 text-gray-500 group-hover:bg-primary-100/50 group-hover:text-primary-600'
                        }`}>
                          <SectionIcon className="w-5 h-5" />
                        </div>
                        <span className="flex-1 text-left font-medium">{section.label}</span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </motion.div>
                      </div>
                    </motion.button>

                    {/* Children Tabs */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary-200/30 pl-3">
                            {section.children.map((child) => {
                              const ChildIcon = child.icon
                              const isActive = activeTab === child.key
                              return (
                                <motion.button
                                  key={child.key}
                                  onClick={() => {
                                    setActiveTab(child.key)
                                  }}
                                  whileHover={{ x: 5, scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`relative w-full flex items-center rounded-lg transition-all overflow-hidden group gap-3 px-3 py-2 ${
                                    isActive
                                      ? 'text-primary-700 font-semibold'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  {/* Active Background - Different style for child */}
                                  <AnimatePresence mode="wait">
                                    {isActive && (
                                      <motion.div
                                        key={`child-active-${child.key}`}
                                        layoutId="activeChildTabBg"
                                        initial={false}
                                        className="absolute inset-0 rounded-lg overflow-hidden"
                                      >
                                        <motion.div
                                          className="absolute inset-0 bg-gradient-to-r from-primary-100/60 via-primary-50/40 to-primary-100/60 rounded-lg"
                                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-lg border-l-4 border-primary-500 shadow-sm"
                                        />
                                        <motion.div
                                          animate={{
                                            scale: [1, 1.02, 1],
                                            opacity: [0.4, 0.6, 0.4],
                                          }}
                                          transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                          }}
                                          className="absolute -inset-0.5 bg-primary-200/20 rounded-lg blur-sm -z-10"
                                        />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                  
                                  {/* Hover Background - Subtle for child */}
                                  {!isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50/40 to-primary-50/30 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border-l-2 border-transparent group-hover:border-primary-300/50" />
                                  )}
                                  
                                  {/* Content */}
                                  <div className="relative z-10 flex items-center w-full gap-3">
                                    <div className={`rounded-md transition-all p-1.5 ${
                                      isActive 
                                        ? 'bg-primary-500/30 text-primary-700 shadow-sm' 
                                        : 'bg-gray-100/60 text-gray-500 group-hover:bg-primary-100/60 group-hover:text-primary-600 group-hover:shadow-sm'
                                    }`}>
                                      <ChildIcon className="w-4 h-4" />
                                    </div>
                                    <span className={`flex-1 text-left text-sm transition-colors ${
                                      isActive ? 'font-semibold text-primary-800' : 'font-medium text-gray-700 group-hover:text-primary-700'
                                    }`}>{child.label}</span>
                                  </div>
                                </motion.button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {/* Collapsed Sidebar - Show only icons */}
              {isSidebarCollapsed && menuSections.map((section) => {
                const SectionIcon = section.icon
                const hasActiveChild = section.children.some(child => child.key === activeTab)
                
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      const newExpanded = new Set(expandedSections)
                      if (expandedSections.has(section.id)) {
                        newExpanded.delete(section.id)
                      } else {
                        newExpanded.add(section.id)
                      }
                      setExpandedSections(newExpanded)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative w-full flex items-center justify-center rounded-xl transition-all overflow-hidden group px-2 py-3 mb-1 ${
                      hasActiveChild
                        ? 'text-primary-700'
                        : 'text-gray-700'
                    }`}
                  >
                    <div className={`rounded-lg transition-colors p-2.5 ${
                      hasActiveChild
                        ? 'bg-primary-500/20 text-primary-600' 
                        : 'bg-white/50 text-gray-500 group-hover:bg-primary-100/50 group-hover:text-primary-600'
                    }`}>
                      <SectionIcon className="w-5 h-5" />
                    </div>
                  </motion.button>
                )
              })}
            </nav>

          </div>
        </motion.aside>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          {/* Top Bar */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {getTabLabel(activeTab)}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                {/* Profile Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                >
                  <motion.button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-3 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl transition-all shadow-sm group"
                  >
                    {/* Profile Picture */}
                    <div className="relative z-10">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                      </div>
                    </div>
                    
                    {/* Username */}
                    <span className="relative z-10 text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                      {user?.name || 'Admin'}
                    </span>
                    
                    {/* Chevron */}
                    <motion.div
                      className="relative z-10"
                      animate={{ rotate: showProfileDropdown ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} className="text-gray-500 group-hover:text-primary-600 transition-colors" />
                    </motion.div>

                    {/* Glass Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-xl border-2 border-primary-200/50 shadow-lg -z-10 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: isProfileHovered ? 1 : 0, 
                        scale: isProfileHovered ? 1 : 0.9 
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    {/* Subtle Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-primary-50/30 to-transparent rounded-xl -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: isProfileHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {showProfileDropdown && (
                      <>
                        {/* Backdrop */}
                        <div 
                          className="fixed inset-0 bg-transparent z-[45]" 
                          onClick={() => setShowProfileDropdown(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full right-0 mt-4 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-[60]"
                        >
                          {/* User Info Header */}
                          <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-br from-primary-50/50 to-purple-50/50">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{user?.name || 'Admin'}</p>
                                <p className="text-xs text-gray-600">{user?.email || 'admin@example.com'}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="p-2">
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0 }}
                              onClick={() => {
                                setShowProfileDropdown(false)
                                setShowProfileModal(true)
                              }}
                              className="w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3 group"
                              whileHover={{ x: 4 }}
                            >
                              <User className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors" />
                              <span className="flex-1">My Profile</span>
                              <motion.span
                                className="opacity-0 group-hover:opacity-100 text-primary-600"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </motion.button>

                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 }}
                              onClick={() => {
                                setShowProfileDropdown(false)
                                setShowSettingsModal(true)
                              }}
                              className="w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3 group"
                              whileHover={{ x: 4 }}
                            >
                              <Settings className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors" />
                              <span className="flex-1">Settings</span>
                              <motion.span
                                className="opacity-0 group-hover:opacity-100 text-primary-600"
                                initial={{ x: -5 }}
                                whileHover={{ x: 0 }}
                              >
                                →
                              </motion.span>
                            </motion.button>

                            <div className="my-2 h-px bg-gray-200"></div>

                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                              onClick={() => {
                                setShowProfileDropdown(false)
                                setShowLogoutModal(true)
                              }}
                              className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-medium text-left flex items-center gap-3"
                              whileHover={{ x: 4 }}
                            >
                              <LogOut className="w-4 h-4" />
                              <span className="flex-1">Log Out</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Profile Modal - Matching Add License Modal Style */}
        <AnimatePresence>
          {showProfileModal && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowProfileModal(false)}
              >
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative w-full max-w-4xl"
                  style={{ maxHeight: '90vh' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Glow effect behind modal */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
                  
                  {/* Main modal container */}
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    
                    {/* Header Section */}
                    <div className="relative px-8 pt-8 pb-6">
                      {/* Icon and Title */}
                      <div className="flex items-start gap-5">
                        {/* Animated Icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.1
                          }}
                          className="relative"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <Shield className="w-8 h-8 text-white" />
                          </div>
                          {/* Pulsing ring */}
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-primary-500 rounded-2xl"
                          />
                        </motion.div>
                        
                        {/* Title and Description */}
                        <div className="flex-1 pt-1">
                          <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="text-2xl font-bold text-gray-900 mb-1"
                          >
                            My Profile
                          </motion.h2>
                          <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="text-sm text-gray-600"
                          >
                            Manage your admin profile and account settings
                          </motion.p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="px-8">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    {/* Content Area - Scrollable */}
                    <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                      {renderProfile()}
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                      <div className="flex items-center justify-between gap-4">
                        {/* Info text */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.9 }}
                          className="text-xs text-gray-500 flex items-center gap-1.5"
                        >
                          <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Your information is secure and encrypted
                        </motion.p>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-3">
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1.0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowProfileModal(false)}
                            className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                          >
                            Cancel
                          </motion.button>
                          
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              toast.success('Profile updated successfully')
                              setShowProfileModal(false)
                            }}
                            className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <FileEdit className="w-5 h-5" />
                              Save Changes
                            </span>
                            {/* Shine effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                              animate={{ x: ['-200%', '200%'] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettingsModal && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowSettingsModal(false)}
              >
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative w-full max-w-4xl"
                  style={{ maxHeight: '90vh' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Glow effect behind modal */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-3xl blur-3xl" />
                  
                  {/* Main modal container */}
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    
                    {/* Header Section */}
                    <div className="relative px-8 pt-8 pb-6">
                      {/* Icon and Title */}
                      <div className="flex items-start gap-5">
                        {/* Animated Icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.1
                          }}
                          className="relative"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <Settings className="w-8 h-8 text-white" />
                          </div>
                          {/* Pulsing ring */}
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-primary-500 rounded-2xl"
                          />
                        </motion.div>
                        
                        {/* Title and Description */}
                        <div className="flex-1 pt-1">
                          <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="text-2xl font-bold text-gray-900 mb-1"
                          >
                            System Settings
                          </motion.h2>
                          <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="text-sm text-gray-600"
                          >
                            Configure platform settings and preferences
                          </motion.p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="px-8">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    {/* Content Area - Scrollable */}
                    <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                      {renderSettings()}
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                      <div className="flex items-center justify-between gap-4">
                        {/* Info text */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.9 }}
                          className="text-xs text-gray-500 flex items-center gap-1.5"
                        >
                          <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Your settings are secure and encrypted
                        </motion.p>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-3">
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1.0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowSettingsModal(false)}
                            className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-all shadow-sm hover:shadow"
                          >
                            Cancel
                          </motion.button>
                          
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 1.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              toast.success('Settings saved successfully')
                              setShowSettingsModal(false)
                            }}
                            className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Settings className="w-5 h-5" />
                              Save Settings
                            </span>
                            {/* Shine effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                              animate={{ x: ['-200%', '200%'] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                onClick={() => setShowLogoutModal(false)}
              />

              {/* Modal Container - Centered */}
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="w-full max-w-md pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Glassmorphic Card */}
                  <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-20 pointer-events-none" />
                    
                    {/* Card Content */}
                    <div className="relative bg-white rounded-3xl p-8">
                      {/* Icon with Gradient Background */}
                      <div className="flex justify-center mb-6">
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
                          <div className="absolute inset-0 bg-red-100 rounded-2xl blur-xl opacity-60" />
                          <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <LogOut className="w-8 h-8 text-white" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Log Out
                      </h3>
                      <p className="text-center text-gray-600 mb-6">
                        Are you sure you want to log out from your account?
                      </p>

                      {/* Decorative Divider */}
                      <div className="mb-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowLogoutModal(false)}
                          className="flex-1 px-6 py-3.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all shadow-sm"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          className="relative flex-1 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all shadow-lg overflow-hidden group"
                        >
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-200%', '200%']
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                              ease: "easeInOut"
                            }}
                          />
                          <span className="relative z-10">Log Out</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </ProtectedRoute>
  )
}

