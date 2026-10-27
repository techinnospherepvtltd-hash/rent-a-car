import React, { useState } from 'react'
import { Calendar, MapPin, ChevronDown, Search, ArrowRight, ShieldCheck, Sparkles, Star, Award, Zap } from 'lucide-react'
import { LOCATION_HUBS } from '../data/company'

interface HeroProps {
  onSearch: (criteria: {
    pickupLocation: string
    dropoffLocation: string
    pickupDate: string
    returnDate: string
    category: string
  }) => void
  onOpenBooking: () => void
  onExploreFleet: () => void
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenBooking, onExploreFleet }) => {
  // Today and 3 days later as defaults
  const today = new Date().toISOString().split('T')[0]
  const defaultReturn = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const [pickupLocation, setPickupLocation] = useState(LOCATION_HUBS[0].name)
  const [dropoffLocation, setDropoffLocation] = useState(LOCATION_HUBS[0].name)
  const [pickupDate, setPickupDate] = useState(today)
  const [returnDate, setReturnDate] = useState(defaultReturn)
  const [category, setCategory] = useState('ALL')
  const [isSameDropoff, setIsSameDropoff] = useState(true)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({
      pickupLocation,
      dropoffLocation: isSameDropoff ? pickupLocation : dropoffLocation,
      pickupDate,
      returnDate,
      category
    })
  }

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 bg-metallic-dark overflow-hidden">
      {/* Background Cinematic Lighting & Parallax Aura */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Subtle Speed Lines in background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Main Hero Visual & Copy Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto">
        {/* Left Column: Headlines & High-Impact Copy */}
        <div className="lg:col-span-6 text-left">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-300 tracking-wide">
              4.9/5 RATED • 10,000+ VIP RENTALS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase">
            DRIVE THE CAR <br />
            <span className="text-gold-gradient">YOU DESERVE.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl font-normal leading-relaxed">
            Premium cars. Flexible rentals. Exceptional journeys. Handpicked exotic supercars, executive sedans, and luxury SUVs ready for instantaneous delivery.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verified Supercars</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Zero Counter Delay</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Transparent Pricing</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-amber-400/20 hover:scale-[1.02] flex items-center gap-2"
            >
              <span>BOOK A CAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreFleet}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-md hover:border-amber-400/40"
            >
              EXPLORE OUR FLEET
            </button>
          </div>
        </div>

        {/* Right Column: Hero Car Centerpiece Visual with Floating Reflections & Headlight Glow */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Ambient Car Glow Disc */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-sky-500/10 to-transparent rounded-full blur-[80px] -z-10" />

          {/* Hero Vehicle Container with Subtle Floating Animation */}
          <div className="relative w-full max-w-xl group">
            {/* Pulsing Headlight Ray Effect */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-32 h-16 bg-white/20 rounded-full blur-2xl pointer-events-none" />

            {/* Vehicle Image */}
            <img
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85"
              alt="N10 Fleet Porsche 911 GT3 RS"
              className="w-full h-auto object-cover rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-105"
            />

            {/* Floating Spec Tag 1 */}
            <div className="absolute -top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-left shadow-2xl animate-pulse-subtle">
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Featured Supercar</div>
              <div className="text-sm font-bold text-white">Porsche 911 GT3 RS</div>
              <div className="text-xs text-slate-400 font-semibold">$1,150 / day • 518 HP</div>
            </div>

            {/* Floating Spec Tag 2 */}
            <div className="absolute -bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-left shadow-2xl">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Available Today
              </div>
              <div className="text-[11px] text-slate-300">Downtown &amp; Airport Valet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Booking / Search Interface */}
      <div className="max-w-7xl mx-auto w-full relative z-20 mt-10">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#12141c]/90 backdrop-blur-xl border border-white/15 p-4 sm:p-5 rounded-2xl shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Pickup Location */}
            <div className="text-left">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                {LOCATION_HUBS.map((loc) => (
                  <option key={loc.id} value={loc.name} className="bg-slate-900 text-white">
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Drop-off Location */}
            <div className="text-left">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Drop-off Location
                </label>
                <button
                  type="button"
                  onClick={() => setIsSameDropoff(!isSameDropoff)}
                  className="text-[10px] text-amber-400 hover:underline"
                >
                  {isSameDropoff ? 'Different Location?' : 'Same as Pickup'}
                </button>
              </div>
              {isSameDropoff ? (
                <div className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-400">
                  Same as pickup location
                </div>
              ) : (
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {LOCATION_HUBS.map((loc) => (
                    <option key={loc.id} value={loc.name} className="bg-slate-900 text-white">
                      {loc.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Pickup Date */}
            <div className="text-left">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Pickup Date
              </label>
              <input
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Return Date */}
            <div className="text-left">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Return Date
              </label>
              <input
                type="date"
                min={pickupDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Car Type & Submit Button */}
            <div className="flex flex-col justify-end gap-1.5">
              <div className="text-left">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Car Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors mb-1.5"
                >
                  <option value="ALL">All Categories</option>
                  <option value="SPORTS">Sports &amp; Supercars</option>
                  <option value="LUXURY">Luxury Sedans</option>
                  <option value="SUV">Executive SUVs</option>
                  <option value="7-SEATER">7-Seater VIP Vans</option>
                  <option value="PREMIUM">Premium Sedans</option>
                  <option value="ECONOMY">Executive Smart</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-400/20 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>SEARCH CARS</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <div className="mt-8 flex flex-col items-center justify-center gap-1.5 text-slate-400 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll to explore fleet</span>
        <div className="w-5 h-9 rounded-full border-2 border-slate-400/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-amber-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
