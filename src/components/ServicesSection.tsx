import React from 'react'
import { SERVICES_DATA, ServiceItem } from '../data/company'
import {
  Car,
  Crown,
  Gauge,
  ShieldCheck,
  Briefcase,
  Plane,
  UserCheck,
  CalendarCheck,
  ArrowRight,
  Check,
  Sparkles
} from 'lucide-react'

// Icon mapping helper
const iconMap: { [key: string]: React.ElementType } = {
  Car,
  Crown,
  Gauge,
  ShieldCheck,
  Briefcase,
  Plane,
  UserCheck,
  CalendarCheck
}

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="w-full bg-[#12141c] text-white py-24 px-4 md:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive Luxury Mobility
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              OUR BESPOKE <span className="text-gold-gradient">SERVICES</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl">
              From daily supercar thrill drives to corporate fleet management and airport tarmac escorts, every service is delivered with white-glove precision.
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-black/40 border border-white/10 px-4 py-3 rounded-2xl self-start md:self-auto">
            <span className="font-bold text-white">8 Confirmed Services</span> • 24/7 Dedicated Concierge
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => {
            const IconComponent = iconMap[service.iconName] || Car

            return (
              <div
                key={service.id}
                className="group relative bg-[#181a24] rounded-2xl p-6 border border-white/10 hover:border-amber-400/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Popular Pill */}
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-amber-400/20 text-amber-400 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    POPULAR
                  </div>
                )}

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Short Desc */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 pt-3 border-t border-white/5 mb-6">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <Check className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-black text-slate-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 group-hover:bg-amber-400 group-hover:text-black"
                >
                  <span>Inquire Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
