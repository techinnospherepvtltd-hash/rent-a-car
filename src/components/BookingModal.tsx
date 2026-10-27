import React, { useState } from 'react'
import { Vehicle, FLEET_DATA } from '../data/fleet'
import { LOCATION_HUBS, COMPANY_INFO } from '../data/company'
import {
  X,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Shield,
  CreditCard,
  User,
  Phone,
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'
import confetti from 'canvas-confetti'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialVehicle?: Vehicle | null
  initialDates?: {
    pickupDate?: string
    returnDate?: string
    pickupLocation?: string
    dropoffLocation?: string
  }
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialVehicle = null,
  initialDates
}) => {
  if (!isOpen) return null

  const today = new Date().toISOString().split('T')[0]
  const defaultReturn = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  // Steps: 1: Car & Dates, 2: Protection & Extras, 3: Driver Details, 4: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)

  // Selected State
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    initialVehicle || FLEET_DATA[0]
  )
  const [pickupLocation, setPickupLocation] = useState(
    initialDates?.pickupLocation || LOCATION_HUBS[0].name
  )
  const [dropoffLocation, setDropoffLocation] = useState(
    initialDates?.dropoffLocation || LOCATION_HUBS[0].name
  )
  const [pickupDate, setPickupDate] = useState(initialDates?.pickupDate || today)
  const [returnDate, setReturnDate] = useState(initialDates?.returnDate || defaultReturn)
  const [pickupTime, setPickupTime] = useState('10:00')
  const [returnTime, setReturnTime] = useState('10:00')

  // Protection & Extras
  const [coverageTier, setCoverageTier] = useState<'standard' | 'zeroExcess'>('zeroExcess')
  const [needChauffeur, setNeedChauffeur] = useState(false)
  const [needChildSeat, setNeedChildSeat] = useState(false)
  const [needGps, setNeedGps] = useState(false)

  // Driver Details
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [licenseCountry, setLicenseCountry] = useState('United States')
  const [flightNumber, setFlightNumber] = useState('')
  const [notes, setNotes] = useState('')

  // Confirmation result
  const [bookingRef, setBookingRef] = useState('')
  const [copied, setCopied] = useState(false)

  // Calculations
  const calculateDays = () => {
    const start = new Date(pickupDate).getTime()
    const end = new Date(returnDate).getTime()
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }

  const days = calculateDays()
  const baseRental = days * selectedVehicle.pricePerDay
  const coverageRate = coverageTier === 'zeroExcess' ? 45 * days : 0
  const chauffeurTotal = needChauffeur ? 180 * days : 0
  const childSeatTotal = needChildSeat ? 15 * days : 0
  const gpsTotal = needGps ? 10 * days : 0
  const subtotal = baseRental + coverageRate + chauffeurTotal + childSeatTotal + gpsTotal
  const taxEst = Math.round(subtotal * 0.05) // 5% standard municipal tax
  const grandTotal = subtotal + taxEst
  const securityDeposit = selectedVehicle.securityDeposit

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate Booking Ref
    const ref = `N10-${Math.floor(1000 + Math.random() * 9000)}-${selectedVehicle.brand.substring(0, 2).toUpperCase()}`
    setBookingRef(ref)
    setStep(4)

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e5b042', '#ffd778', '#ffffff']
      })
    } catch {
      // safe fallback
    }
  }

  const copyConfirmation = () => {
    const text = `N10 RENT A CAR - BOOKING CONFIRMATION
Ref: ${bookingRef}
Car: ${selectedVehicle.name}
Pickup: ${pickupLocation} on ${pickupDate} @ ${pickupTime}
Return: ${dropoffLocation} on ${returnDate} @ ${returnTime}
Primary Driver: ${fullName} (${phone}, ${email})
Estimated Total: $${grandTotal} (Deposit hold: $${securityDeposit})
24/7 Concierge: ${COMPANY_INFO.phone}`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const generateWhatsAppUrl = () => {
    const msg = `Hello N10 Concierge, I just booked ${selectedVehicle.name} (Ref: ${bookingRef}) for ${pickupDate}. Name: ${fullName}. Please send my digital rental agreement.`
    return `https://wa.me/18005550199?text=${encodeURIComponent(msg)}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f1118] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto text-left text-white max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 md:px-8 border-b border-white/10 bg-black/40">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
              N10 VIP RESERVATION
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {step === 4 ? 'Booking Confirmed' : 'Instant Luxury Vehicle Booking'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (Steps 1 to 3) */}
        {step < 4 && (
          <div className="grid grid-cols-3 border-b border-white/10 text-center text-xs font-bold">
            <div
              className={`py-3 transition-colors ${
                step === 1 ? 'bg-amber-400/20 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400'
              }`}
            >
              1. Car &amp; Dates
            </div>
            <div
              className={`py-3 transition-colors ${
                step === 2 ? 'bg-amber-400/20 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400'
              }`}
            >
              2. Protection &amp; Extras
            </div>
            <div
              className={`py-3 transition-colors ${
                step === 3 ? 'bg-amber-400/20 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400'
              }`}
            >
              3. Driver &amp; Review
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 md:p-8 flex-1">
          {/* STEP 1: CAR & DATES */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Selected Car Preview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Selected Machine
                </label>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl items-center">
                  <div className="md:col-span-4 h-28 rounded-xl overflow-hidden bg-slate-950">
                    <img
                      src={selectedVehicle.image}
                      alt={selectedVehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-amber-400 uppercase">
                        {selectedVehicle.brand} • {selectedVehicle.category}
                      </div>
                      <div className="text-lg font-bold text-white">{selectedVehicle.name}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {selectedVehicle.horsepower} HP • {selectedVehicle.transmission} • {selectedVehicle.seats} Seats
                      </div>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-xl font-black text-amber-400">${selectedVehicle.pricePerDay}</span>
                      <span className="text-xs text-slate-400">/ day</span>
                      <span className="text-xs text-slate-400 ml-4">
                        Deposit: ${selectedVehicle.securityDeposit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Change car dropdown if desired */}
                <div className="mt-3">
                  <label className="text-[11px] text-slate-400 font-semibold">Change Vehicle:</label>
                  <select
                    value={selectedVehicle.id}
                    onChange={(e) => {
                      const found = FLEET_DATA.find((c) => c.id === e.target.value)
                      if (found) setSelectedVehicle(found)
                    }}
                    className="w-full mt-1 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {FLEET_DATA.map((c) => (
                      <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                        {c.name} (${c.pricePerDay}/day)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Locations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    {LOCATION_HUBS.map((loc) => (
                      <option key={loc.id} value={loc.name} className="bg-slate-900 text-white">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Drop-off Location
                  </label>
                  <select
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    {LOCATION_HUBS.map((loc) => (
                      <option key={loc.id} value={loc.name} className="bg-slate-900 text-white">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Pickup Date &amp; Time
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      min={today}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-2/3 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-1/3 bg-black/60 border border-white/10 rounded-xl px-2 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Return Date &amp; Time
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      min={pickupDate}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-2/3 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-1/3 bg-black/60 border border-white/10 rounded-xl px-2 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Duration and estimated daily total */}
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-semibold">
                  Rental Period: {days} {days === 1 ? 'Day' : 'Days'}
                </span>
                <span className="text-white font-bold">
                  Base Total: ${baseRental}
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: PROTECTION & EXTRAS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Select Protection Plan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Standard */}
                  <div
                    onClick={() => setCoverageTier('standard')}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      coverageTier === 'standard'
                        ? 'bg-white/10 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white text-sm">Standard Protection</span>
                      <span className="text-xs text-emerald-400 font-bold">Included</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Covers mechanical breakdown and standard liability with statutory deductible.
                    </p>
                  </div>

                  {/* Zero Excess VIP */}
                  <div
                    onClick={() => setCoverageTier('zeroExcess')}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      coverageTier === 'zeroExcess'
                        ? 'bg-amber-400/15 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white text-sm">N10 Zero-Excess VIP</span>
                      <span className="text-xs text-amber-400 font-bold">+$45 / day</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Zero customer deductible liability. Full wheel, tire, and glass coverage + complimentary replacement vehicle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bespoke Extras */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Tailored Enhancements
                </label>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={needChauffeur}
                        onChange={(e) => setNeedChauffeur(e.target.checked)}
                        className="rounded border-amber-400 text-amber-400 focus:ring-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">Uniformed Executive Chauffeur</div>
                        <div className="text-[11px] text-slate-400">Professional chauffeur for carefree city &amp; airport journeys</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400">+$180 / day</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={needChildSeat}
                        onChange={(e) => setNeedChildSeat(e.target.checked)}
                        className="rounded border-amber-400 text-amber-400 focus:ring-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">ISOFIX Luxury Child Safety Seat</div>
                        <div className="text-[11px] text-slate-400">Sanitized infant or booster seat pre-fitted into vehicle</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400">+$15 / day</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={needGps}
                        onChange={(e) => setNeedGps(e.target.checked)}
                        className="rounded border-amber-400 text-amber-400 focus:ring-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">Unlimited High-Speed 5G Wi-Fi Hotspot</div>
                        <div className="text-[11px] text-slate-400">Portable pocket hotspot supporting up to 10 connected devices</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400">+$10 / day</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DRIVER DETAILS & PRICE BREAKDOWN */}
          {step === 3 && (
            <form id="booking-form" onSubmit={handleConfirmBooking} className="space-y-6">
              {/* Driver Form Fields */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Primary Driver Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johnathan Sterling"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. j.sterling@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Driver's License Issuing Country
                    </label>
                    <input
                      type="text"
                      value={licenseCountry}
                      onChange={(e) => setLicenseCountry(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Flight Number (For Airport Delivery)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. EK 215 / BA 283"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Special Requests / Delivery Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cold water in car, child seat rear left"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Transparent Price Summary Table */}
              <div className="p-5 rounded-2xl bg-black/50 border border-amber-500/20 space-y-2 text-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Transparent Price Breakdown
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>
                    {selectedVehicle.name} ({days} {days === 1 ? 'day' : 'days'} @ ${selectedVehicle.pricePerDay}/d)
                  </span>
                  <span className="font-semibold text-white">${baseRental}</span>
                </div>
                {coverageRate > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>N10 Zero-Excess VIP Coverage</span>
                    <span className="font-semibold text-white">${coverageRate}</span>
                  </div>
                )}
                {chauffeurTotal > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Dedicated Chauffeur Service</span>
                    <span className="font-semibold text-white">${chauffeurTotal}</span>
                  </div>
                )}
                {childSeatTotal > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Child Safety Seat</span>
                    <span className="font-semibold text-white">${childSeatTotal}</span>
                  </div>
                )}
                {gpsTotal > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>5G Wi-Fi Hotspot</span>
                    <span className="font-semibold text-white">${gpsTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 pt-2 border-t border-white/10">
                  <span>Municipal &amp; Fleet Service Fee (5%)</span>
                  <span>${taxEst}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/20 text-sm">
                  <span className="font-bold text-white">TOTAL RENTAL CHARGE:</span>
                  <span className="text-2xl font-black text-amber-400">${grandTotal}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Refundable Security Deposit (Hold upon handover):</span>
                  <span className="font-medium text-slate-300">${securityDeposit}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION SUCCESS */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                  Reservation Received
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Ready For The Road!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
                  Your reservation for the <strong className="text-white">{selectedVehicle.name}</strong> has been secured in our VIP dispatch system.
                </p>
              </div>

              {/* Reference Card */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-slate-400">Booking Reference:</span>
                  <span className="font-mono text-base font-black text-amber-400">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="font-bold text-white">{selectedVehicle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pickup Date &amp; Time:</span>
                  <span className="font-medium text-white">{pickupDate} @ {pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Handover Location:</span>
                  <span className="font-medium text-white truncate max-w-[200px]">{pickupLocation}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 font-bold">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-amber-400 font-black">${grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={copyConfirmation}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Summary' : 'Copy Summary'}</span>
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1 to 3) */}
        {step < 4 && (
          <div className="p-4 md:px-8 border-t border-white/10 bg-black/40 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-amber-400/20"
              >
                <span>CONFIRM BOOKING</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
