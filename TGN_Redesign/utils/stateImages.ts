// State image URLs mapping from The Gypsy Nurse website
// Exact URLs extracted from https://www.thegypsynurse.com/states/
export const STATE_IMAGE_URLS: Record<string, string> = {
  'Alabama': 'https://static.thegypsynurse.com/2019/12/AL.jpg.webp',
  'Alaska': 'https://static.thegypsynurse.com/2019/12/Alaska-thumbnail-1.jpg.webp',
  'Arizona': 'https://static.thegypsynurse.com/2019/12/Arizona-1.jpg.webp',
  'Arkansas': 'https://static.thegypsynurse.com/2019/12/AR.jpg.webp',
  'California': 'https://static.thegypsynurse.com/2019/12/Califonia.jpg.webp',
  'Colorado': 'https://static.thegypsynurse.com/2019/12/Colorado-1.jpg.webp',
  'Connecticut': 'https://static.thegypsynurse.com/2019/12/CT.jpg.webp',
  'Delaware': 'https://static.thegypsynurse.com/2019/12/DE.jpg.webp',
  'Florida': 'https://static.thegypsynurse.com/2019/12/florida-thumbnail.jpg.webp',
  'Georgia': 'https://static.thegypsynurse.com/2024/10/georgia-skyline.jpg.webp',
  'Hawaii': 'https://static.thegypsynurse.com/2019/12/Hawaii-thumbnail.jpg.webp',
  'Idaho': 'https://static.thegypsynurse.com/2019/12/ID.jpg.webp',
  'Illinois': 'https://static.thegypsynurse.com/2019/12/Illinois-1.jpg.webp',
  'Indiana': 'https://static.thegypsynurse.com/2019/12/IN-2.jpg.webp',
  'Iowa': 'https://static.thegypsynurse.com/2019/12/IA.jpg.webp',
  'Kansas': 'https://static.thegypsynurse.com/2019/12/KS.jpg.webp',
  'Kentucky': 'https://static.thegypsynurse.com/2019/12/KY.jpg.webp',
  'Louisiana': 'https://static.thegypsynurse.com/2019/12/LA.jpg.webp',
  'Maine': 'https://static.thegypsynurse.com/2019/12/ME.jpg.webp',
  'Maryland': 'https://static.thegypsynurse.com/2019/12/MD.jpg.webp',
  'Massachusetts': 'https://static.thegypsynurse.com/2019/12/MA.jpg.webp',
  'Michigan': 'https://static.thegypsynurse.com/2019/12/MI.jpg.webp',
  'Minnesota': 'https://static.thegypsynurse.com/2019/12/MN.jpg.webp',
  'Mississippi': 'https://static.thegypsynurse.com/2019/12/MS.jpg.webp',
  'Missouri': 'https://static.thegypsynurse.com/2019/12/MO.jpg.webp',
  'Montana': 'https://static.thegypsynurse.com/2019/12/MT.jpg.webp',
  'Nebraska': 'https://static.thegypsynurse.com/2019/12/NE.jpg.webp',
  'Nevada': 'https://static.thegypsynurse.com/2019/12/NV.jpg.webp',
  'New Hampshire': 'https://static.thegypsynurse.com/2019/12/NH.jpg.webp',
  'New Jersey': 'https://static.thegypsynurse.com/2019/12/NJ.jpg.webp',
  'New Mexico': 'https://static.thegypsynurse.com/2019/12/NM.jpg.webp',
  'New York': 'https://static.thegypsynurse.com/2019/12/NY.jpg.webp',
  'North Carolina': 'https://static.thegypsynurse.com/2019/12/NC.jpg.webp',
  'North Dakota': 'https://static.thegypsynurse.com/2019/12/ND.jpg.webp',
  'Ohio': 'https://static.thegypsynurse.com/2019/12/OH.jpg.webp',
  'Oklahoma': 'https://static.thegypsynurse.com/2019/12/OK.jpg.webp',
  'Oregon': 'https://static.thegypsynurse.com/2021/12/6938-filevibra-specialty-hospital-wide-portland-oregonjpg-scaled-1.jpg.webp',
  'Pennsylvania': 'https://static.thegypsynurse.com/2019/12/PA.jpg.webp',
  'Rhode Island': 'https://static.thegypsynurse.com/2019/12/RI.jpg.webp',
  'South Carolina': 'https://static.thegypsynurse.com/2019/12/SC.jpg.webp',
  'South Dakota': 'https://static.thegypsynurse.com/2019/12/SD.jpg.webp',
  'Tennessee': 'https://static.thegypsynurse.com/2019/12/TN.jpg.webp',
  'Texas': 'https://static.thegypsynurse.com/2019/12/TX.jpg.webp',
  'Utah': 'https://static.thegypsynurse.com/2019/12/UT.jpg.webp',
  'Vermont': 'https://static.thegypsynurse.com/2019/12/VT.jpg.webp',
  'Virginia': 'https://static.thegypsynurse.com/2019/12/VA.jpg.webp',
  'Washington': 'https://static.thegypsynurse.com/2019/12/WA.jpg.webp',
  'West Virginia': 'https://static.thegypsynurse.com/2019/12/WV.jpg.webp',
  'Wisconsin': 'https://static.thegypsynurse.com/2019/12/WI.jpg.webp',
  'Wyoming': 'https://static.thegypsynurse.com/2019/12/WY.jpg.webp',
}

/**
 * Get state image URL from The Gypsy Nurse website
 * @param stateName - The name of the state (e.g., "California", "New York")
 * @returns The URL to the state image
 */
export const getStateImageUrl = (stateName: string): string => {
  if (!stateName) {
    // Fallback to a default image if no state name provided
    return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop'
  }

  // First, check if we have a direct URL mapping from The Gypsy Nurse
  if (STATE_IMAGE_URLS[stateName]) {
    return STATE_IMAGE_URLS[stateName]
  }
  
  // Fallback: Generate URL using the same pattern if not in mapping
  // Convert state name to format: "New York" -> "New-York"
  const formattedName = stateName.replace(/\s+/g, '-')
  return `https://static.thegypsynurse.com/2019/12/${formattedName}-1.jpg.webp`
}

/**
 * Get facility image with fallback to state image
 * @param facilityImage - The facility image URL from API (may be undefined, null, or empty)
 * @param stateName - The name of the state for fallback
 * @returns The facility image URL or state image URL as fallback
 */
export const getFacilityImageWithFallback = (facilityImage: string | undefined | null, stateName: string): string => {
  // If facility image doesn't exist, is null, or is empty, use state image as fallback
  if (!facilityImage || (typeof facilityImage === 'string' && facilityImage.trim() === '')) {
    return getStateImageUrl(stateName)
  }
  
  // Check if it's a placeholder/static image from Unsplash (common placeholder patterns)
  // These are generic placeholder images that should be replaced with state images
  const placeholderPatterns = [
    'photo-1519494026892-80bbd2d6fd0d', // Generic hospital placeholder
    'photo-1586773860418-d37222d8fce3', // Generic medical placeholder
    'photo-1551601651-2a8555f1a136'    // Generic healthcare placeholder
  ]
  
  const isPlaceholderImage = facilityImage.includes('images.unsplash.com') && 
    placeholderPatterns.some(pattern => facilityImage.includes(pattern))
  
  if (isPlaceholderImage) {
    return getStateImageUrl(stateName)
  }
  
  // Otherwise, use the provided facility image
  return facilityImage
}

