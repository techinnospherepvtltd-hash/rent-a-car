import React, { useState } from 'react'
import { Vehicle, FLEET_DATA } from './data/fleet'
import { ServiceItem } from './data/company'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AutomotiveShowroom3D } from './components/AutomotiveShowroom3D'
import { FleetSection } from './components/FleetSection'
import { VehicleDetailModal } from './components/VehicleDetailModal'
import { BookingModal } from './components/BookingModal'
import { HowItWorks } from './components/HowItWorks'
import { WhyChooseUs } from './components/WhyChooseUs'
import { CinematicExperience } from './components/CinematicExperience'
import { ServicesSection } from './components/ServicesSection'
import { CorporateSection } from './components/CorporateSection'
import { CorporateModal } from './components/CorporateModal'
import { TestimonialsSection } from './components/TestimonialsSection'
import { LocationsSection } from './components/LocationsSection'
import { FaqSection } from './components/FaqSection'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { LoadingScreen } from './components/LoadingScreen'

export function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null)
  const [bookingDates, setBookingDates] = useState<{
    pickupDate?: string
    returnDate?: string
    pickupLocation?: string
    dropoffLocation?: string
  }>({})

  // Detail Modal State
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null)

  // Corporate Modal State
  const [isCorporateOpen, setIsCorporateOpen] = useState(false)

  // Fleet Category Filter State
  const [fleetCategoryFilter, setFleetCategoryFilter] = useState('ALL')

  // Search from Hero
  const handleHeroSearch = (criteria: {
    pickupLocation: string
    dropoffLocation: string
    pickupDate: string
    returnDate: string
    category: string
  }) => {
    setBookingDates({
      pickupLocation: criteria.pickupLocation,
      dropoffLocation: criteria.dropoffLocation,
      pickupDate: criteria.pickupDate,
      returnDate: criteria.returnDate
    })
    setFleetCategoryFilter(criteria.category)

    // Smooth scroll to fleet section
    const fleetEl = document.getElementById('fleet')
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Explore fleet button handler
  const handleExploreFleet = () => {
    const fleetEl = document.getElementById('fleet')
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Open booking with a specific car
  const handleOpenBookingWithVehicle = (vehicle: Vehicle) => {
    setBookingVehicle(vehicle)
    setIsBookingOpen(true)
  }

  // Open booking from generic buttons
  const handleOpenGeneralBooking = () => {
    setBookingVehicle(FLEET_DATA[0])
    setIsBookingOpen(true)
  }

  // Book car by name (e.g. from 3D showroom)
  const handleBookCarByName = (carName?: string) => {
    if (carName) {
      const match = FLEET_DATA.find((c) =>
        c.name.toLowerCase().includes(carName.toLowerCase().split(' ')[0])
      )
      setBookingVehicle(match || FLEET_DATA[0])
    } else {
      setBookingVehicle(FLEET_DATA[0])
    }
    setIsBookingOpen(true)
  }

  // Proceed to booking from Vehicle Detail Modal
  const handleProceedFromDetail = (details: {
    vehicle: Vehicle
    pickupLocation: string
    dropoffLocation: string
    pickupDate: string
    returnDate: string
  }) => {
    setDetailVehicle(null)
    setBookingVehicle(details.vehicle)
    setBookingDates({
      pickupLocation: details.pickupLocation,
      dropoffLocation: details.dropoffLocation,
      pickupDate: details.pickupDate,
      returnDate: details.returnDate
    })
    setIsBookingOpen(true)
  }

  // Handle service inquiry
  const handleServiceSelect = (service: ServiceItem) => {
    if (service.id === 'corporate-rentals') {
      setIsCorporateOpen(true)
    } else {
      handleOpenGeneralBooking()
    }
  }

  // Handle location booking
  const handleLocationBooking = (locationName: string) => {
    setBookingDates((prev) => ({
      ...prev,
      pickupLocation: locationName,
      dropoffLocation: locationName
    }))
    setIsBookingOpen(true)
  }

  return (
    <div className="relative min-h-screen bg-[#0a0b0e] text-slate-100 flex flex-col font-sans">
      {/* Automotive Loading Screen */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Sticky Navigation */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onContactClick={() => {
          const faqEl = document.getElementById('faq')
          if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Search Interface */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenBooking={handleOpenGeneralBooking}
          onExploreFleet={handleExploreFleet}
        />

        {/* 2. 3D Automotive Experience (WebGL / Three.js) */}
        <AutomotiveShowroom3D onBookCar={handleBookCarByName} />

        {/* 3. Our Fleet Section (Clean, high-contrast) */}
        <FleetSection
          onSelectVehicleForDetail={(car) => setDetailVehicle(car)}
          onSelectVehicleForBooking={handleOpenBookingWithVehicle}
          selectedCategoryFilter={fleetCategoryFilter}
        />

        {/* 4. How It Works 3-Step Guide */}
        <HowItWorks onStartBooking={handleOpenGeneralBooking} />

        {/* 5. Why Choose Us & Animated Counters */}
        <WhyChooseUs />

        {/* 6. Cinematic Driving Experience */}
        <CinematicExperience onFindCar={handleExploreFleet} />

        {/* 7. Bespoke Services Section */}
        <ServicesSection onSelectService={handleServiceSelect} />

        {/* 8. Corporate & Business Rentals */}
        <CorporateSection onOpenCorporateModal={() => setIsCorporateOpen(true)} />

        {/* 9. Verified Testimonials */}
        <TestimonialsSection />

        {/* 10. Strategic Handover Locations & Map */}
        <LocationsSection onSelectLocationForBooking={handleLocationBooking} />

        {/* 11. Frequently Asked Questions */}
        <FaqSection />

        {/* 12. Final High-Impact CTA */}
        <FinalCta
          onBookCar={handleOpenGeneralBooking}
          onContactUs={() => {
            const faqEl = document.getElementById('faq')
            if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Vehicle Detail Product Experience Modal */}
      {detailVehicle && (
        <VehicleDetailModal
          vehicle={detailVehicle}
          onClose={() => setDetailVehicle(null)}
          onProceedToBooking={handleProceedFromDetail}
        />
      )}

      {/* Interactive Booking Checkout Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialVehicle={bookingVehicle}
        initialDates={bookingDates}
      />

      {/* Corporate Fleet Enquiry Modal */}
      <CorporateModal
        isOpen={isCorporateOpen}
        onClose={() => setIsCorporateOpen(false)}
      />
    </div>
  )
}

export default App
