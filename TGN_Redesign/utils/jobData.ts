// Shared job data - in production, this would come from an API
// Import job data from jobs page
import { SAMPLE_JOBS } from '@/app/jobs/page'

// Re-export job data for use in other pages
export { SAMPLE_JOBS }

interface Job {
  id: string
  title: string
  location: string
  state: string
  shift: string
  shiftHours: string
  salary: string
  postedDate: string
  facilityAvailable: boolean
  staffingCompany: string
  tags: string[]
}

// Helper function to get job by ID from the jobs listing
export function getJobById(jobId: string) {
  return SAMPLE_JOBS.find(job => job.id === jobId)
}

// Helper function to convert Job to Application format
export function jobToApplication(job: Job, appliedDate?: string): any {
  const duration = job.tags.find((tag: string) => tag.includes('Weeks')) || '13 Weeks'
  const salaryPerWeek = job.salary ? `$${parseInt(job.salary.replace('$', '')) * 40}/week` : undefined
  
  return {
    id: job.id,
    jobTitle: job.title,
    facility: job.facilityAvailable ? 'Facility information available' : 'Facility information not available',
    facilityAvailable: job.facilityAvailable,
    jobType: job.tags[0] || 'Registered Nurse',
    appliedDate: appliedDate || new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    location: `${job.location}, ${job.state}`,
    status: 'pending' as const,
    coverLetter: `Interested in this ${job.tags[0] || 'position'} opportunity.`,
    salary: salaryPerWeek,
    duration: duration
  }
}

// Helper function to convert Job to BookmarkedJob format
export function jobToBookmarkedJob(job: Job, savedDate?: string): any {
  const duration = job.tags.find((tag: string) => tag.includes('Weeks')) || '13 Weeks'
  const salaryPerWeek = job.salary ? `$${parseInt(job.salary.replace('$', '')) * 40}/week` : undefined
  
  return {
    id: job.id,
    jobTitle: job.title,
    facility: job.facilityAvailable ? 'Facility information available' : 'Facility information not available',
    facilityAvailable: job.facilityAvailable,
    jobType: job.tags[0] || 'Registered Nurse',
    location: job.state,
    salary: salaryPerWeek,
    duration: duration,
    savedDate: savedDate || new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    staffingCompany: job.staffingCompany
  }
}

