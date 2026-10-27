import React, { useState, useEffect } from 'react'
import {
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  CheckCircle,
  Car,
  Headphones,
  Check,
  CreditCard,
  MapPin,
  Calendar
} from 'lucide-react'
import { COMPANY_INFO } from '../data/company'

export const WhyChooseUs: React.FC = () => {
  // Animated number counters state
  const [carsCount, setCarsCount] = useState(0)
  const [clientsCount, setClientsCount] = useState(0)
  const [supportHours, setSupportHours] = useState(0)
  const [yearsCount, setYearsCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 50
    const interval = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      setCarsCount(Math.round(progress * 500))
      setClientsCount(Math.round(progress * 10))
      setSupportHours(24)
      setYearsCount(Math.round(progress * 12))

      if (currentStep >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const benefits = [
    {
      title: 'Premium & Well-Maintained Cars',
      desc: 'Factory-certified technicians inspect every engine, brake rotor, and tire tread before vehicle dispatch.',
      icon: Car
    },
    {
      title: 'Transparent Pricing & No Hidden Charges',
      desc: 'What you see is what you pay. Zero surprise admin fees, mandatory cleaning upsells, or fine-print penalties.',
      icon: CreditCard
    },
    {
      title: 'Flexible Rental Periods',
      desc: 'Seamless options ranging from single-day escapes and weekend track drives to monthly executive leases.',
      icon: Calendar
    },
    {
      title: 'Easy 2-Minute Booking',
      desc: 'Rapid paperless digital reservation with instant confirmation and fast license verification.',
      icon: CheckCircle
    },
    {
      title: '24/7 Dedicated Concierge Support',
      desc: 'Direct telephone and WhatsApp hotline to a dedicated fleet manager ready for any on-road request.',
      icon: Headphones
    },
    {
      title: 'Convenient Pickup & Drop-Off',
      desc: 'Complimentary terminal curbside handover, hotel delivery, or drive-away from our flagship downtown lounge.',
      icon: MapPin
    }
  ]

  return (
    <section id="why-us" className="w-full bg-[#0a0b0e] py-24 px-4 md:px-8 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Automotive Light Rays */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The N10 Standard
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            WHY CHOOSE <span className="text-gold-gradient">N10 RENTALS</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            We operate at the intersection of automotive passion and white-glove hospitality. Trust, velocity, and uncompromised luxury guide every handover.
          </p>
        </div>

        {/* Animated Statistics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="text-3xl sm:text-5xl font-black text-amber-400 font-mono">
              {carsCount}+
            </div>
            <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-2">
              Cars Available
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Exotics, Supercars &amp; SUVs</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="text-3xl sm:text-5xl font-black text-white font-mono">
              {clientsCount}K+
            </div>
            <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-2">
              Happy VIP Clients
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Global Travelers &amp; Executives</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="text-3xl sm:text-5xl font-black text-amber-400 font-mono">
              {supportHours}/7
            </div>
            <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-2">
              Customer Concierge
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Live Phone &amp; WhatsApp</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="text-3xl sm:text-5xl font-black text-white font-mono">
              {yearsCount}+
            </div>
            <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-2">
              Years of Excellence
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Established Heritage Since 2012</div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#12141c] border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified N10 Guarantee</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
