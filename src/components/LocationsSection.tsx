import React, { useState } from 'react'
import { LOCATION_HUBS, LocationHub } from '../data/company'
import { MapPin, Clock, Phone, CheckCircle, Navigation, Sparkles, ArrowRight } from 'lucide-react'

interface LocationsSectionProps {
  onSelectLocationForBooking: (locationName: string) => void
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectLocationForBooking }) => {
  const [activeLocation, setActiveLocation] = useState<LocationHub>(LOCATION_HUBS[0])

  return (
    <section id="locations" className="w-full bg-[#0c0d12] text-white py-24 px-4 md:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Strategic Handover Hubs
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              LOCATIONS &amp; <span className="text-gold-gradient">PICKUP POINTS</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl">
              From our flagship downtown lounge to commercial airport terminals, private aviation hangars, and doorstep hotel delivery.
            </p>
          </div>

          <button
            onClick={() => onSelectLocationForBooking(activeLocation.name)}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-400/20 self-start md:self-auto flex items-center gap-2"
          >
            <span>FIND A PICKUP LOCATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Location Hub Selector and Interactive Map Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Location Hubs List (Left) */}
          <div className="lg:col-span-5 space-y-3">
            {LOCATION_HUBS.map((hub) => {
              const isSelected = activeLocation.id === hub.id

              return (
                <div
                  key={hub.id}
                  onClick={() => setActiveLocation(hub)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-white/10 border-amber-400 shadow-xl ring-1 ring-amber-400/40 -translate-y-0.5'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-400 border border-amber-400/30">
                      {hub.badge || hub.type}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> 24/7 Available
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {hub.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{hub.address}</span>
                  </p>
                </div>
              )
            })}
          </div>

          {/* Interactive Visual Map Station & Details (Right) */}
          <div className="lg:col-span-7 bg-[#14161f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Map Graphical Vector Simulation */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 p-4 mb-6 flex items-center justify-center">
              {/* Map Grid Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

              {/* Highway Arterial Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30 stroke-amber-400" fill="none">
                <path d="M 0 100 Q 150 50, 300 120 T 600 80" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M 50 250 Q 200 180, 450 220 T 700 160" strokeWidth="2" />
                <path d="M 180 0 L 220 280" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 420 0 L 390 280" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>

              {/* Pin markers */}
              {LOCATION_HUBS.map((h, i) => {
                const isCurrent = h.id === activeLocation.id
                // Spread mock visual pins across the graphic
                const leftPositions = [25, 65, 80, 35, 50]
                const topPositions = [40, 25, 70, 75, 55]

                return (
                  <div
                    key={h.id}
                    onClick={() => setActiveLocation(h)}
                    style={{ left: `${leftPositions[i]}%`, top: `${topPositions[i]}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                      isCurrent ? 'scale-125 z-20' : 'opacity-60 hover:opacity-100 z-10'
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`w-3.5 h-3.5 rounded-full ${isCurrent ? 'bg-amber-400 animate-ping' : 'bg-slate-400'}`} />
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-lg ${
                        isCurrent ? 'bg-amber-400 text-black border-white' : 'bg-slate-800 text-white border-white/20'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Map Floating HUD Overlay */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-slate-300 font-mono">
                Lat: {activeLocation.coordinates.lat}° N, Lng: {activeLocation.coordinates.lng}° W
              </div>
            </div>

            {/* Hub Detail Information */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2 mb-4">
                <div>
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {activeLocation.type}
                  </div>
                  <h4 className="text-xl font-bold text-white mt-0.5">
                    {activeLocation.name}
                  </h4>
                </div>
                <div className="text-xs text-slate-300">
                  {activeLocation.hours}
                </div>
              </div>

              {/* Station perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {activeLocation.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Direct Booking for this location */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs text-slate-400">
                  Phone Concierge: <strong className="text-white">{activeLocation.phone}</strong>
                </div>

                <button
                  onClick={() => onSelectLocationForBooking(activeLocation.name)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Select This Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
