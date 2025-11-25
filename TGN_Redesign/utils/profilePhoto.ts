/**
 * Utility functions for managing user profile photo
 */

const PROFILE_PHOTO_KEY = 'userProfilePhoto'

/**
 * Get the user's profile photo from localStorage
 * @returns The profile photo URL or null if not set
 */
export function getProfilePhoto(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(PROFILE_PHOTO_KEY)
}

/**
 * Set the user's profile photo in localStorage
 * @param photoUrl The photo URL (base64 or URL string)
 */
export function setProfilePhoto(photoUrl: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PROFILE_PHOTO_KEY, photoUrl)
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('profilePhotoUpdated', { detail: photoUrl }))
}

/**
 * Remove the user's profile photo from localStorage
 */
export function removeProfilePhoto(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PROFILE_PHOTO_KEY)
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('profilePhotoUpdated', { detail: null }))
}

/**
 * Get the profile photo with fallback to default avatar
 * @param defaultAvatar The default avatar URL to use if no photo is set
 * @returns The profile photo URL or default avatar
 */
export function getProfilePhotoWithFallback(defaultAvatar?: string): string {
  const photo = getProfilePhoto()
  if (photo) return photo
  return defaultAvatar || 'https://ui-avatars.com/api/?name=User&background=7f2860&color=fff&size=256'
}

