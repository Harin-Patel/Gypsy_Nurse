'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Camera, X, ChevronLeft, ChevronRight, ExternalLink, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Mock data - in production this would come from an API
const agencyData: { [key: string]: any } = {
  'american-mobile': {
    id: 'american-mobile',
    name: 'AMN Healthcare Nurse',
    logo: 'https://static.thegypsynurse.com/2022/12/logo-resizing-4.png.webp',
    albums: [
      { 
        id: 'guatemala',
        name: 'Guatemala', 
        photoCount: 8,
        image: 'https://static.thegypsynurse.com/2023/05/Guatemala7.jpg.webp',
        photos: [
          'https://static.thegypsynurse.com/2023/05/Guatemala1.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala2.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala3.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala4.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala5.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala6.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala7.jpg',
          'https://static.thegypsynurse.com/2023/05/Guatemala8.jpg'
        ]
      },
      { 
        id: 'amn-nurses',
        name: 'AMN Nurses', 
        photoCount: 15,
        image: 'https://static.thegypsynurse.com/2023/05/UGC8.jpg.webp',
        photos: [
          'https://static.thegypsynurse.com/2023/05/UGC4.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC12.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC14.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC11.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC10.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC1.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC8.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC13.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC5.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC3.jpeg',
          'https://static.thegypsynurse.com/2023/05/UGC6.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC15.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC9.jpeg',
          'https://static.thegypsynurse.com/2023/05/UGC7.jpg',
          'https://static.thegypsynurse.com/2023/05/UGC2.jpeg'
        ]
      },
      { 
        id: 'dallas-pride',
        name: 'Dallas Pride 2022', 
        photoCount: 13,
        image: 'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-35.jpg.webp',
        photos: [
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-292.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-37-1.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-35.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-39.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-25.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-38.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-182.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-13.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-250.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-10.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-159.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-20.jpg',
          'https://static.thegypsynurse.com/2023/05/amn-pride-parade-2022-160.jpg'
        ]
      }
    ]
  }
}

export default function AgencyPhotosPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  
  const agencyId = params?.id as string
  const agency = agencyData[agencyId] || agencyData['american-mobile']
  const selectedAlbumData = selectedAlbum ? agency.albums.find((a: any) => a.id === selectedAlbum) : null

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
    
    const thumbnailStrip = document.getElementById('thumbnail-strip-photos')
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
              by {agency.name}
            </p>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {agency.albums && agency.albums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agency.albums.map((album: any, index: number) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => openAlbum(album.id)}
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
                          {album.photoCount} {album.photoCount === 1 ? 'Photo' : 'Photos'}
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
              <p className="text-gray-600 text-lg">No albums available at this time.</p>
            </div>
          )}
        </div>
      </section>

      {/* Photo Modal/Lightbox */}
      <AnimatePresence>
        {selectedAlbum && selectedAlbumData && (
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
                      id="thumbnail-strip-photos"
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
                          id={`thumbnail-photos-${index}`}
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

