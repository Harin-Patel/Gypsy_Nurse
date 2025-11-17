// Utility functions to manage job status in localStorage

export const JOB_STORAGE_KEYS = {
  LIKED: 'gypsy_nurse_liked_jobs',
  DISLIKED: 'gypsy_nurse_disliked_jobs',
  BOOKMARKED: 'gypsy_nurse_bookmarked_jobs',
  PENDING: 'gypsy_nurse_pending_jobs',
}

export function getLikedJobs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(JOB_STORAGE_KEYS.LIKED)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function getDislikedJobs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(JOB_STORAGE_KEYS.DISLIKED)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function getBookmarkedJobs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(JOB_STORAGE_KEYS.BOOKMARKED)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function getPendingJobs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(JOB_STORAGE_KEYS.PENDING)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function addLikedJob(jobId: string): void {
  if (typeof window === 'undefined') return
  try {
    const liked = getLikedJobs()
    if (!liked.includes(jobId)) {
      liked.push(jobId)
      localStorage.setItem(JOB_STORAGE_KEYS.LIKED, JSON.stringify(liked))
    }
  } catch (error) {
    console.error('Error adding liked job:', error)
  }
}

export function removeLikedJob(jobId: string): void {
  if (typeof window === 'undefined') return
  try {
    const liked = getLikedJobs().filter(id => id !== jobId)
    localStorage.setItem(JOB_STORAGE_KEYS.LIKED, JSON.stringify(liked))
  } catch (error) {
    console.error('Error removing liked job:', error)
  }
}

export function addDislikedJob(jobId: string): void {
  if (typeof window === 'undefined') return
  try {
    const disliked = getDislikedJobs()
    if (!disliked.includes(jobId)) {
      disliked.push(jobId)
      localStorage.setItem(JOB_STORAGE_KEYS.DISLIKED, JSON.stringify(disliked))
    }
  } catch (error) {
    console.error('Error adding disliked job:', error)
  }
}

export function removeDislikedJob(jobId: string): void {
  if (typeof window === 'undefined') return
  try {
    const disliked = getDislikedJobs().filter(id => id !== jobId)
    localStorage.setItem(JOB_STORAGE_KEYS.DISLIKED, JSON.stringify(disliked))
  } catch (error) {
    console.error('Error removing disliked job:', error)
  }
}

export function addBookmarkedJob(jobId: string): void {
  if (typeof window === 'undefined') return
  try {
    const bookmarked = getBookmarkedJobs()
    if (!bookmarked.includes(jobId)) {
      bookmarked.push(jobId)
      localStorage.setItem(JOB_STORAGE_KEYS.BOOKMARKED, JSON.stringify(bookmarked))
    }
  } catch (error) {
    console.error('Error adding bookmarked job:', error)
  }
}

export function removeBookmarkedJob(jobId: string): void {
  if (typeof window === 'undefined') return
  try {
    const bookmarked = getBookmarkedJobs().filter(id => id !== jobId)
    localStorage.setItem(JOB_STORAGE_KEYS.BOOKMARKED, JSON.stringify(bookmarked))
  } catch (error) {
    console.error('Error removing bookmarked job:', error)
  }
}

export function addPendingJob(jobId: string): void {
  if (typeof window === 'undefined') return
  try {
    const pending = getPendingJobs()
    if (!pending.includes(jobId)) {
      pending.push(jobId)
      localStorage.setItem(JOB_STORAGE_KEYS.PENDING, JSON.stringify(pending))
    }
  } catch (error) {
    console.error('Error adding pending job:', error)
  }
}

export function isJobPending(jobId: string): boolean {
  return getPendingJobs().includes(jobId)
}

export function isJobLiked(jobId: string): boolean {
  return getLikedJobs().includes(jobId)
}

export function isJobDisliked(jobId: string): boolean {
  return getDislikedJobs().includes(jobId)
}

export function isJobBookmarked(jobId: string): boolean {
  return getBookmarkedJobs().includes(jobId)
}

