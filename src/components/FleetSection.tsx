import React, { useState, useMemo } from 'react'
import { Vehicle, FLEET_DATA } from '../data/fleet'
import { Fuel, Users, Gauge, ArrowRight, Sparkles, Filter, SlidersHorizontal, Check, Zap } from 'lucide-react'

interface FleetSectionProps {
  onSelectVehicleForDetail: (vehicle: Vehicle) => void
  onSelectVehicleForBooking: (vehicle: Vehicle) => void
  selectedCategoryFilter?: string
}

type SortOption = 'POPULAR' | 'PRICE_ASC' | 'PRICE_DESC' | 'NEWEST'

export const FleetSection: React.FC<FleetSectionProps> = ({
  onSelectVehicleForDetail,
  onSelectVehicleForBooking,
  selectedCategoryFilter = 'ALL'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter)
  const [sortBy, setSortBy] = useState<SortOption>('POPULAR')

  // Keep internal category in sync if parent changes
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter)
    }
  }, [selectedCategoryFilter])

  const categories = ['ALL', 'SPORTS', 'LUXURY', 'SUV', '7-SEATER', 'PREMIUM', 'ECONOMY']

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let list = FLEET_DATA.filter((v) => {
      if (activeCategory === 'ALL') return true
      return v.category === activeCategory
    })

    return list.sort((a, b) => {
      if (sortBy === 'PRICE_ASC') return a.pricePerDay - b.pricePerDay
      if (sortBy === 'PRICE_DESC') return b.pricePerDay - a.pricePerDay
      if (sortBy === 'NEWEST') return b.year - a.year
      // POPULAR default:
      if (a.badge === 'MOST POPULAR') return -1
      if (b.badge === 'MOST POPULAR') return 1
      return 0
    })
  }, [activeCategory, sortBy])

  return (
    <section id="fleet" className="w-full bg-[#f8fafc] text-slate-900 py-24 px-4 md:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Prestige Collection
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase">
              OUR LUXURY <span className="text-amber-600">FLEET</span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl">
              Every vehicle in our collection is meticulously inspected, factory-maintained, and prepared to concours-level cleanliness before every rental.
            </p>
          </div>

          {/* Quick Fleet Count Pill */}
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Showing {filteredVehicles.length} Available Vehicles
          </div>
        </div>

        {/* Filters and Sorting Controls Bar */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200/80 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-slate-950 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'ALL' ? 'All Cars' : cat}
                </button>
              )
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="POPULAR">Most Popular</option>
              <option value="PRICE_ASC">Price: Low → High</option>
              <option value="PRICE_DESC">Price: High → Low</option>
              <option value="NEWEST">Newest Model Year</option>
            </select>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((car) => {
            return (
              <div
                key={car.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-1.5 text-left"
              >
                {/* Vehicle Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-950">
                  <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badge */}
                  {car.badge && (
                    <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
                      {car.badge}
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md border border-white/20">
                    {car.category}
                  </div>

                  {/* Hover Quick Specs Floating Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold drop-shadow-md">{car.year} Model</span>
                    <span className="text-amber-300 font-extrabold drop-shadow-md flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> 0-100: {car.acceleration}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Brand & Name */}
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                      {car.brand}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {car.name}
                    </h3>

                    {/* Specification Badges */}
                    <div className="grid grid-cols-3 gap-2 mt-4 py-3 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{car.horsepower} HP</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fuel className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{car.transmission.split(' ')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>{car.seats} Seats</span>
                      </div>
                    </div>

                    {/* Key Included Perk */}
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{car.includedFeatures[0]}</span>
                    </div>
                  </div>

                  {/* Pricing and Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Daily Rate</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-950">
                          ${car.pricePerDay}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">/ day</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ${car.securityDeposit} deposit
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectVehicleForDetail(car)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold tracking-wide transition-colors"
                      >
                        DETAILS
                      </button>

                      <button
                        onClick={() => onSelectVehicleForBooking(car)}
                        className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold tracking-wider uppercase shadow-md hover:shadow-amber-400/30 transition-all flex items-center gap-1.5"
                      >
                        <span>BOOK</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
