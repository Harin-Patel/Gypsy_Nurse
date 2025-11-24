// Utility functions to manage filter presets in localStorage

export interface FilterPreset {
  id: string
  name: string
  filters: {
    city: string
    zipCode: string
    states: string[]
    facility: string
    certification: string
    specialty: string
    minSalary: string
    maxSalary: string
    shift: string
    duration: string
    featuredOnly: boolean
  }
  createdAt: string
  updatedAt: string
}

const FILTER_STORAGE_KEY = 'gypsy_nurse_saved_filters'

export function getSavedFilters(): FilterPreset[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(FILTER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveFilter(preset: Omit<FilterPreset, 'id' | 'createdAt' | 'updatedAt'>): string {
  if (typeof window === 'undefined') return ''
  
  const savedFilters = getSavedFilters()
  
  // Check for duplicate name
  const duplicateName = savedFilters.find(
    f => f.name.toLowerCase().trim() === preset.name.toLowerCase().trim()
  )
  
  if (duplicateName) {
    throw new Error('A filter with this name already exists')
  }
  
  // Check for duplicate filter data (same filter settings)
  const duplicateData = savedFilters.find(f => {
    return JSON.stringify(f.filters) === JSON.stringify(preset.filters)
  })
  
  if (duplicateData) {
    throw new Error('A filter with these settings already exists')
  }
  
  const newPreset: FilterPreset = {
    ...preset,
    id: `filter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  const updated = [...savedFilters, newPreset]
  localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(updated))
  return newPreset.id
}

export function updateFilter(id: string, updates: Partial<FilterPreset>): void {
  if (typeof window === 'undefined') return
  
  const savedFilters = getSavedFilters()
  const updated = savedFilters.map(filter => 
    filter.id === id 
      ? { ...filter, ...updates, updatedAt: new Date().toISOString() }
      : filter
  )
  localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(updated))
}

export function deleteFilter(id: string): void {
  if (typeof window === 'undefined') return
  
  const savedFilters = getSavedFilters()
  const updated = savedFilters.filter(filter => filter.id !== id)
  localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(updated))
}

export function getFilterById(id: string): FilterPreset | null {
  const savedFilters = getSavedFilters()
  return savedFilters.find(filter => filter.id === id) || null
}

