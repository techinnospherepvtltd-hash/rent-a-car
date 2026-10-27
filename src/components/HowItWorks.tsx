import React from 'react'
import { Car, CalendarCheck, KeyRound, Sparkles, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react'

interface HowItWorksProps {
  onStartBooking: () => void
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartBooking }) => {
  const steps = [
    {
      step: '01',
      title: 'CHOOSE YOUR CAR',
      subtitle: 'Browse our fleet & select the perfect vehicle.',
      description: 'Explore our prestigious collection of verified supercars, executive sedans, and luxury SUVs. Filter by power, passenger capacity, or brand prestige.',
      icon: Car,
      perks: ['Over 500+ verified vehicles', 'Detailed mechanical specs', 'High-res 360° virtual preview']
    },
    {
      step: '02',
      title: 'BOOK YOUR RIDE',
      subtitle: 'Choose your dates & complete your booking.',
      description: 'Select your preferred dates, delivery hub, and bespoke protection tier. Complete your reservation online in under 2 minutes with zero paper delays.',
      icon: CalendarCheck,
      perks: ['Instant reservation confirmation', 'Transparent zero-hidden pricing', 'Flexible deposit options']
    },
    {
      step: '03',
      title: 'DRIVE AWAY',
      subtitle: 'Pick up your car & enjoy your journey.',
      description: 'Collect your sanitized, fully fueled vehicle at our luxury flagship showroom, or experience white-glove curbside handover at the airport or your hotel.',
      icon: KeyRound,
      perks: ['Curbside handover in 90 seconds', 'Full tank of premium fuel included', '24/7 Concierge & Roadside Support']
    }
  ]

  return (
    <section id="how-it-works" className="w-full bg-[#f1f5f9] text-slate-900 py-24 px-4 md:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Effortless 3-Step Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase">
            HOW IT <span className="text-amber-600">WORKS</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            We have stripped away bureaucratic counter delays and generic paperwork. Renting a world-class automotive masterpiece is as effortless as ordering a private jet.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 font-mono font-black text-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    {item.step}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 text-slate-700 group-hover:text-amber-600 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-black text-slate-950 tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    {item.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Road Connector Arrow for step 1 & 2 */}
                {idx < 2 && (
                  <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-slate-200 shadow-md text-amber-600">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              Guaranteed White-Glove Handover
            </div>
            <h4 className="text-xl sm:text-2xl font-bold">
              Ready to embark on an exceptional drive?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Select your vehicle today and receive doorstep delivery anywhere in the city.
            </p>
          </div>

          <button
            onClick={onStartBooking}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-400/20 shrink-0 flex items-center gap-2"
          >
            <span>CHOOSE YOUR CAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
