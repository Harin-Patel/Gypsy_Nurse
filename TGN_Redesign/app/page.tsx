'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturedJobs from '@/components/FeaturedJobs'
import Events from '@/components/Events'
import Employers from '@/components/Employers'
import InstagramFeed from '@/components/InstagramFeed'
import Resources from '@/components/Resources'
import Blog from '@/components/Blog'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <FeaturedJobs />
      {/* Hidden sections - accessible via top menu bar */}
      {/* <Events /> */}
      {/* <Employers /> */}
      <InstagramFeed />
      {/* <Resources /> */}
      <Blog />
      <Footer />
    </main>
  )
}

