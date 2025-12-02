'use client'

import React, { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Camera, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

// Import the same data structure from the recruiter page
// In production, this would come from an API
const agencyData: { [key: string]: any } = {
  // This would need to match the structure from the recruiter page
  // For now, we'll handle it dynamically
}

const recruiterData: { [key: string]: any } = {
  // This would need to match the structure from the recruiter page
  // For now, we'll handle it dynamically
}

export default function RecruiterPhotosPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  
  const agencyId = params?.id as string
  const recruiterId = params?.recruiterId as string

  // Get recruiter data - similar logic to recruiter page
  const recruiter = useMemo(() => {
    // Try to find recruiter in agency data first
    if (agencyId && agencyData[agencyId]) {
      const agency = agencyData[agencyId]
      if (agency.recruiters) {
        const recruiterFromAgency = agency.recruiters.find((r: any) => r.id === recruiterId)
        if (recruiterFromAgency) {
          return {
            ...recruiterFromAgency,
            agency: agency.name,
            agencyId: agency.id,
            albums: recruiterFromAgency.albums || []
          }
        }
      }
    }
    // Fallback to standalone recruiter data
    const fallbackRecruiter = recruiterData[recruiterId]
    if (fallbackRecruiter) {
      return {
        ...fallbackRecruiter,
        albums: fallbackRecruiter.albums || []
      }
    }
    return null
  }, [agencyId, recruiterId])

  const selectedAlbumData = selectedAlbum && recruiter?.albums ? recruiter.albums.find((a: any) => a.id === selectedAlbum) : null

  const openAlbum = (albumId: string) => {
    setSelectedAlbum(albumId)
    setSelectedPhotoIndex(0)
  }

  const closeModal = () => {
    setSelectedAlbum(null)
    setSelectedPhotoIndex(0)
  }

  const nextPhoto = () => {
    if (selectedAlbumData && selectedPhotoIndex < selectedAlbumData.photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1)
    }
  }

  const prevPhoto = () => {
    if (selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1)
    }
  }

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAlbum) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedAlbum, selectedPhotoIndex])

  // Auto-scroll thumbnail strip to selected photo
  React.useEffect(() => {
    if (!selectedAlbum || !selectedAlbumData) return
    
    const thumbnailStrip = document.getElementById('thumbnail-strip-recruiter')
    if (thumbnailStrip) {
      const thumbnail = thumbnailStrip.children[selectedPhotoIndex] as HTMLElement
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [selectedPhotoIndex, selectedAlbum, selectedAlbumData])

  if (!recruiter) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="bg-white border-b border-gray-200 pt-32 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Recruiter photos page is not available at this time.
              </p>
              <Link
                href={`/agency-profile/${agencyId}/recruiter/${recruiterId}`}
                className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go back</span>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200 pt-32 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Photos
            </h1>
            <p className="text-gray-600 mb-4">
              by {recruiter.name}
              {recruiter.agency && (
                <span className="text-gray-500"> • {recruiter.agency}</span>
              )}
            </p>
            <Link
              href={`/agency-profile/${agencyId}/recruiter/${recruiterId}`}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {recruiter.albums && recruiter.albums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recruiter.albums.map((album: any, index: number) => (
                <motion.div
                  key={album.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => album.id && album.photos && album.photos.length > 0 && openAlbum(album.id)}
                >
                  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      {album.image ? (
                        <Image
                          src={album.image}
                          alt={album.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 flex items-center justify-center">
                          <Camera className="w-12 h-12 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-primary-600 transition-colors">
                        {album.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-auto">
                        <Camera className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 font-medium">
                          {album.photoCount || (album.photos ? album.photos.length : 0)} {(album.photoCount || (album.photos ? album.photos.length : 0)) === 1 ? 'Photo' : 'Photos'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No albums available at this time.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Photo Modal/Lightbox */}
      <AnimatePresence>
        {selectedAlbum && selectedAlbumData && selectedAlbumData.photos && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{selectedAlbumData.name}</h2>
                      <p className="text-white/80 text-sm">
                        {selectedPhotoIndex + 1} of {selectedAlbumData.photos.length}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <Image
                    src={selectedAlbumData.photos[selectedPhotoIndex]}
                    alt={`${selectedAlbumData.name} - Photo ${selectedPhotoIndex + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Navigation Arrows */}
                {selectedPhotoIndex > 0 && (
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors z-10"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}
                {selectedPhotoIndex < selectedAlbumData.photos.length - 1 && (
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors z-10"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Thumbnail Strip */}
                {selectedAlbumData.photos.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div 
                      id="thumbnail-strip-recruiter"
                      className="flex gap-2 overflow-x-auto scroll-smooth"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      {selectedAlbumData.photos.map((photo: string, index: number) => (
                        <button
                          key={index}
                          id={`thumbnail-recruiter-${index}`}
                          onClick={() => setSelectedPhotoIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === selectedPhotoIndex
                              ? 'border-white scale-110'
                              : 'border-white/30 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={photo}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

