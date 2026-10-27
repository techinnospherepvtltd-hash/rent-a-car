import React, { useState } from 'react'
import { Vehicle } from '../data/fleet'
import { LOCATION_HUBS } from '../data/company'
import {
  X,
  Gauge,
  Fuel,
  Users,
  Shield,
  Zap,
  Check,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  ChevronRight,
  Car
} from 'lucide-react'

interface VehicleDetailModalProps {
  vehicle: Vehicle | null
  onClose: () => void
  onProceedToBooking: (bookingDetails: {
    vehicle: Vehicle
    pickupLocation: string
    dropoffLocation: string
    pickupDate: string
    returnDate: string
    pickupTime: string
    returnTime: string
    insuranceTier: 'standard' | 'premium'
    totalPrice: number
    days: number
  }) => void
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onProceedToBooking
}) => {
  if (!vehicle) return null

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Booking Calculator State
  const today = new Date().toISOString().split('T')[0]
  const defaultReturn = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const [pickupLocation, setPickupLocation] = useState(LOCATION_HUBS[0].name)
  const [dropoffLocation, setDropoffLocation] = useState(LOCATION_HUBS[0].name)
  const [pickupDate, setPickupDate] = useState(today)
  const [returnDate, setReturnDate] = useState(defaultReturn)
  const [pickupTime, setPickupTime] = useState('10:00')
  const [returnTime, setReturnTime] = useState('10:00')
  const [insuranceTier, setInsuranceTier] = useState<'standard' | 'premium'>('premium')
  const [includeChauffeur, setIncludeChauffeur] = useState(false)
  const [includeChildSeat, setIncludeChildSeat] = useState(false)

  // Calculate rental duration in days
  const calculateDays = () => {
    const start = new Date(pickupDate).getTime()
    const end = new Date(returnDate).getTime()
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }

  const days = calculateDays()
  const baseRental = days * vehicle.pricePerDay
  const insurancePerDay = insuranceTier === 'premium' ? 45 : 0
  const insuranceTotal = insurancePerDay * days
  const chauffeurTotal = includeChauffeur ? 180 * days : 0
  const childSeatTotal = includeChildSeat ? 15 * days : 0
  const estimatedTotal = baseRental + insuranceTotal + chauffeurTotal + childSeatTotal

  const handleBookNow = () => {
    onProceedToBooking({
      vehicle,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      insuranceTier,
      totalPrice: estimatedTotal,
      days
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0e1017] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto text-left text-white max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 md:px-8 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              {vehicle.category}
            </span>
            <span className="text-slate-400 text-xs font-semibold">{vehicle.year} Specification</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 md:p-8 space-y-8 flex-1">
          {/* Main Hero & Gallery Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Left */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-lg">
                <img
                  src={vehicle.gallery[activeImageIndex] || vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-amber-400">
                  {vehicle.brand} Official Fleet
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3">
                {vehicle.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-amber-400 scale-105 shadow-md'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Details & Title Right */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                  {vehicle.brand}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                  {vehicle.name}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {vehicle.description}
                </p>

                {/* Daily Price Highlight */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                  <div className="text-xs text-slate-400 font-medium">Standard Daily Rate</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-black text-amber-400">${vehicle.pricePerDay}</span>
                    <span className="text-sm text-slate-400 font-semibold">/ day</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Refundable Security Deposit: ${vehicle.securityDeposit}
                  </div>
                </div>

                {/* Included Features */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Included Concierge Privileges
                  </div>
                  {vehicle.includedFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Specifications Matrix */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4" /> Technical Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Engine</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.engine}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Power</div>
                <div className="text-xs font-bold text-amber-400 mt-1">{vehicle.horsepower} Horsepower</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">0 - 100 km/h</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.acceleration}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Top Speed</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.topSpeed}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Transmission</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.transmission}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Drive Type</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.driveType}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Seating &amp; Doors</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.seats} Seats • {vehicle.doors} Doors</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Luggage Capacity</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.luggage} Full Bags</div>
              </div>
            </div>
          </div>

          {/* Interactive "RENT THIS CAR" Dynamic Booking Panel */}
          <div className="bg-gradient-to-br from-[#151722] to-[#0c0d12] border border-amber-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-400" />
                  Rent This Car: Instant Estimate &amp; Reservation
                </h3>
                <p className="text-xs text-slate-400">
                  Select your dates and locations to view transparent pricing breakdown.
                </p>
              </div>
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 self-start md:self-auto">
                <Shield className="w-4 h-4" /> 100% Price Lock Guarantee
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Pickup Location */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Pickup Location
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {LOCATION_HUBS.map((loc) => (
                    <option key={loc.id} value={loc.name} className="bg-slate-900 text-white">
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Drop-off Location */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Return Location
                </label>
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {LOCATION_HUBS.map((loc) => (
                    <option key={loc.id} value={loc.name} className="bg-slate-900 text-white">
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup Date & Time */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Pickup Date &amp; Time
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    min={today}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-2/3 bg-black/60 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-1/3 bg-black/60 border border-white/15 rounded-xl px-2 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Return Date & Time */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Return Date &amp; Time
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    min={pickupDate}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-2/3 bg-black/60 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-1/3 bg-black/60 border border-white/15 rounded-xl px-2 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Optional Add-ons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={insuranceTier === 'premium'}
                  onChange={(e) => setInsuranceTier(e.target.checked ? 'premium' : 'standard')}
                  className="rounded border-amber-500 text-amber-500 focus:ring-0"
                />
                <span>Zero-Excess Full Coverage (+${45}/day)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeChauffeur}
                  onChange={(e) => setIncludeChauffeur(e.target.checked)}
                  className="rounded border-amber-500 text-amber-500 focus:ring-0"
                />
                <span>Executive Chauffeur (+${180}/day)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeChildSeat}
                  onChange={(e) => setIncludeChildSeat(e.target.checked)}
                  className="rounded border-amber-500 text-amber-500 focus:ring-0"
                />
                <span>Child Safety Seat (+${15}/day)</span>
              </label>
            </div>

            {/* Price Breakdown & CTA Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-white/10 gap-4">
              <div className="space-y-1 text-xs">
                <div className="text-slate-400">
                  {days} {days === 1 ? 'Day' : 'Days'} Rental: <span className="text-white font-bold">${baseRental}</span>
                  {insuranceTotal > 0 && <span> + Zero-Excess Coverage (${insuranceTotal})</span>}
                  {chauffeurTotal > 0 && <span> + Chauffeur (${chauffeurTotal})</span>}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-400 font-semibold">Estimated Total:</span>
                  <span className="text-3xl font-black text-amber-400">${estimatedTotal}</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    (+ ${vehicle.securityDeposit} refundable hold)
                  </span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm tracking-wider uppercase transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <span>BOOK THIS CAR NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
