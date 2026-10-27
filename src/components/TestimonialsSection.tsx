import React, { useState, useEffect } from 'react'
import { TESTIMONIALS_DATA } from '../data/company'
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, ShieldCheck } from 'lucide-react'

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const current = TESTIMONIALS_DATA[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length)
  }

  return (
    <section className="w-full bg-[#f1f5f9] text-slate-900 py-24 px-4 md:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Client Endorsements
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase">
            TRUSTED BY <span className="text-amber-600">LEADERS &amp; ENTHUSIASTS</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Read verified feedback from global business executives, visiting dignitaries, and automotive connoisseurs who rely on N10.
          </p>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl relative overflow-hidden">
          {/* Subtle Decorative Quote Icon */}
          <Quote className="absolute -top-4 -right-4 w-32 h-32 text-slate-100 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            {/* Author Avatar & Car Badge */}
            <div className="flex flex-col items-center text-center shrink-0">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-amber-400/40 shadow-lg mb-3">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center text-amber-500 mb-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified VIP Client
              </div>
            </div>

            {/* Quote and Author Details */}
            <div className="flex-1 space-y-4">
              <p className="text-base sm:text-xl text-slate-800 italic font-medium leading-relaxed">
                "{current.quote}"
              </p>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-slate-950">{current.author}</h4>
                  <div className="text-xs text-slate-500">
                    {current.role} {current.company && `• ${current.company}`}
                  </div>
                  <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                    Vehicle Rented: {current.vehicleRented}
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-slate-400 font-medium">
                  {current.date}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Arrows & Indicators */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
