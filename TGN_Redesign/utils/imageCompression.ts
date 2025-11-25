/**
 * Image compression utility
 * Compresses images while maintaining good quality
 */

interface CompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  maxSizeMB?: number
}

/**
 * Compress an image file
 * @param file The image file to compress
 * @param options Compression options
 * @returns Promise that resolves to a compressed base64 string
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<string> {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.85, // Higher quality (0.85) to avoid dull appearance
    maxSizeMB = 1 // Target max size
  } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width
        let height = img.height
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = width * ratio
          height = height * ratio
        }
        
        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        
        // Draw image on canvas
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }
        
        // Use high-quality image rendering
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        
        // Draw the image
        ctx.drawImage(img, 0, 0, width, height)
        
        // Convert to blob with quality
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'))
              return
            }
            
            // If still too large, reduce quality further
            const sizeMB = blob.size / (1024 * 1024)
            if (sizeMB > maxSizeMB) {
              // Recursively compress with lower quality
              const newQuality = Math.max(0.5, quality - 0.1)
              canvas.toBlob(
                (newBlob) => {
                  if (!newBlob) {
                    reject(new Error('Failed to compress image'))
                    return
                  }
                  const reader = new FileReader()
                  reader.onload = () => resolve(reader.result as string)
                  reader.onerror = () => reject(new Error('Failed to read compressed image'))
                  reader.readAsDataURL(newBlob)
                },
                'image/jpeg',
                newQuality
              )
            } else {
              // Convert blob to base64
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result as string)
              reader.onerror = () => reject(new Error('Failed to read compressed image'))
              reader.readAsDataURL(blob)
            }
          },
          'image/jpeg', // Use JPEG for better compression
          quality
        )
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

