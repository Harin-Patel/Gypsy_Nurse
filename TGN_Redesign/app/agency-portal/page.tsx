'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  User,
  Bell,
  Search,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Building2,
  BarChart3,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  FileEdit,
  Building
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import toast from 'react-hot-toast'

type TabKey = 'dashboard' | 'recruiters' | 'jobs' | 'applications'

interface Tab {
  key: TabKey
  label: string
  icon: React.ElementType
  badge?: number
}

const tabs: Tab[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'recruiters', label: 'My Recruiters', icon: Users },
  { key: 'jobs', label: 'My Jobs', icon: Briefcase },
  { key: 'applications', label: 'My Applications', icon: FileText },
]

export default function AgencyPortalPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  // Redirect if not agency user (only after authentication is confirmed)
  useEffect(() => {
    if (isAuthenticated && user && user.role !== 'agency') {
      router.push('/')
      toast.error('Access denied. Agency portal only.')
    }
  }, [user, isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push('/agency-login')
    toast.success('Logged out successfully')
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color = 'blue' 
  }: {
    title: string
    value: string
    icon: React.ElementType
    color?: 'green' | 'blue' | 'purple' | 'orange'
  }) => {
    const colorClasses = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl ${colorClasses[color]} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </motion.div>
    )
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Agency'}! 👋</h1>
            <p className="text-primary-100 text-lg">Here's what's happening with your agency today.</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('jobs')}
              className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post New Job
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Overview Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Jobs"
            value="0"
            icon={Briefcase}
            color="blue"
          />
          <StatCard
            title="Active Jobs"
            value="0"
            icon={TrendingUp}
            color="green"
          />
          <StatCard
            title="Applications"
            value="0"
            icon={FileText}
            color="purple"
          />
          <StatCard
            title="Recruiters"
            value="0"
            icon={Users}
            color="orange"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Plus, title: 'Create New Job', description: 'Post a new job opening', onClick: () => setActiveTab('jobs') },
            { icon: Users, title: 'Manage Recruiters', description: 'Add and manage your team', onClick: () => setActiveTab('recruiters') },
            { icon: FileText, title: 'View Applications', description: 'Review candidate applications', onClick: () => setActiveTab('applications') },
            { icon: FileEdit, title: 'Edit Profile', description: 'Update agency information', onClick: () => setShowProfileModal(true) },
          ].map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={action.onClick}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  <action.icon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Agency Modules */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Agency Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Briefcase, title: 'Job Management', description: 'Create, edit, and manage job postings', color: 'green', onClick: () => setActiveTab('jobs') },
            { icon: Users, title: 'Recruiter Management', description: 'Manage your recruitment team', color: 'blue', onClick: () => setActiveTab('recruiters') },
            { icon: FileText, title: 'Application Review', description: 'Review and manage job applications', color: 'purple', onClick: () => setActiveTab('applications') },
            { icon: Building, title: 'Agency Profile', description: 'Update agency information and settings', color: 'orange', onClick: () => setShowProfileModal(true) },
          ].map((module, index) => {
            const colorClasses = {
              green: 'bg-green-500',
              blue: 'bg-blue-500',
              purple: 'bg-purple-500',
              orange: 'bg-orange-500',
            }
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={module.onClick}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 rounded-xl ${colorClasses[module.color as keyof typeof colorClasses]} shadow-lg`}>
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{module.title}</h3>
                <p className="text-sm text-gray-600">{module.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
          <p className="text-gray-600">Manage and track all your job postings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
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

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Applications</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Posted</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { title: 'ICU Travel Nurse', location: 'Phoenix, AZ', applications: 24, status: 'active', posted: '2 days ago' },
                { title: 'ER Registered Nurse', location: 'Boston, MA', applications: 18, status: 'active', posted: '5 days ago' },
                { title: 'Med-Surg RN', location: 'Seattle, WA', applications: 12, status: 'active', posted: '1 week ago' },
                { title: 'ICU Travel Nurse', location: 'Miami, FL', applications: 8, status: 'paused', posted: '2 weeks ago' },
              ].map((job, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{job.title}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{job.location}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {job.applications}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{job.posted}</td>
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

  const renderProfile = () => (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">Manage your agency profile and account settings</p>
      <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name || 'Agency Name'}</h2>
            <p className="text-gray-600">{user?.email || 'agency@example.com'}</p>
            <p className="text-sm text-gray-500 mt-1">Agency Account</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agency Name</label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
              <input
                type="url"
                placeholder="https://www.example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
              <textarea
                rows={4}
                placeholder="Tell us about your agency..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="City, State"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Save Changes
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRecruiters = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Recruiters</h1>
          <p className="text-gray-600">Manage your recruiting team members</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Recruiter
        </motion.button>
      </div>

      {/* Recruiters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Sarah Johnson', email: 'sarah@agency.com', jobs: 12, status: 'active' },
          { name: 'Michael Chen', email: 'michael@agency.com', jobs: 8, status: 'active' },
          { name: 'Emily Davis', email: 'emily@agency.com', jobs: 15, status: 'active' },
          { name: 'David Wilson', email: 'david@agency.com', jobs: 6, status: 'inactive' },
          { name: 'Jessica Brown', email: 'jessica@agency.com', jobs: 10, status: 'active' },
          { name: 'Robert Taylor', email: 'robert@agency.com', jobs: 9, status: 'active' },
        ].map((recruiter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {recruiter.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{recruiter.name}</h3>
                <p className="text-sm text-gray-600">{recruiter.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-xl font-bold text-gray-900">{recruiter.jobs}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                recruiter.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {recruiter.status}
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

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Review and manage job applications</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { candidate: 'Sarah Johnson', job: 'ICU Travel Nurse', location: 'Phoenix, AZ', date: 'Nov 10, 2025', status: 'pending' },
                { candidate: 'Michael Chen', job: 'ER Registered Nurse', location: 'Boston, MA', date: 'Nov 9, 2025', status: 'reviewed' },
                { candidate: 'Emily Davis', job: 'Med-Surg RN', location: 'Seattle, WA', date: 'Nov 8, 2025', status: 'shortlisted' },
                { candidate: 'David Wilson', job: 'ICU Travel Nurse', location: 'Miami, FL', date: 'Nov 7, 2025', status: 'rejected' },
                { candidate: 'Jessica Brown', job: 'ER Registered Nurse', location: 'Chicago, IL', date: 'Nov 6, 2025', status: 'pending' },
              ].map((app, index) => (
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
                        {app.candidate.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-semibold text-gray-900">{app.candidate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{app.job}</td>
                  <td className="px-6 py-4 text-gray-600">{app.location}</td>
                  <td className="px-6 py-4 text-gray-600">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                      app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard()
      case 'recruiters': return renderRecruiters()
      case 'jobs': return renderJobs()
      case 'applications': return renderApplications()
      default: return renderDashboard()
    }
  }

  // Don't render if user is authenticated but not an agency
  if (isAuthenticated && user && user.role !== 'agency') {
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
            <div className="p-6 border-b border-white/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                {!isSidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Agency Portal</h2>
                      <p className="text-xs text-gray-500">Dashboard</p>
                    </div>
                  </motion.div>
                )}
                <motion.button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(127, 40, 96, 0.3) transparent',
            }}>
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.key
                return (
                  <motion.button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key)
                      setIsMobileMenuOpen(false)
                    }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all overflow-hidden group ${
                      isActive
                        ? 'text-primary-700 font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    {/* Active Background with Glass Effect */}
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="activeTabBg"
                          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl border border-primary-200/50" />
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
                      </>
                    )}
                    
                    {/* Hover Background */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity border border-white/50" />
                    )}
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-4 w-full">
                      <div className={`p-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary-500/20 text-primary-600' 
                          : 'bg-white/50 text-gray-500 group-hover:bg-primary-100/50 group-hover:text-primary-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {!isSidebarCollapsed && (
                        <span className="flex-1 text-left">{tab.label}</span>
                      )}
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
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {tabs.find(t => t.key === activeTab)?.label}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
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
                      {user?.name || 'Agency'}
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
                                <p className="font-bold text-gray-900">{user?.name || 'Agency'}</p>
                                <p className="text-xs text-gray-600">{user?.email || 'agency@example.com'}</p>
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

                            <div className="my-2 h-px bg-gray-200"></div>

                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                              onClick={() => {
                                setShowProfileDropdown(false)
                                handleLogout()
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

        {/* Profile Modal */}
        <AnimatePresence>
          {showProfileModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                onClick={() => setShowProfileModal(false)}
              />
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
                    <button
                      onClick={() => setShowProfileModal(false)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6">
                    {renderProfile()}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 shadow-2xl lg:hidden"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Menu</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
                <nav className="p-4 space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.key
                    return (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setActiveTab(tab.key)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  )
}

