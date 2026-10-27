import React from 'react'
import { ArrowRight, Phone, MessageSquare, Sparkles, Shield, Clock } from 'lucide-react'
import { COMPANY_INFO } from '../data/company'

interface FinalCtaProps {
  onBookCar: () => void
  onContactUs: () => void
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onBookCar, onContactUs }) => {
  return (
    <section className="relative w-full py-28 px-4 md:px-8 bg-black overflow-hidden border-t border-white/10 text-white">
      {/* Cinematic Golden Amber Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#252833_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">
            Start Your Journey Today
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-tight mb-6">
          READY TO <span className="text-gold-gradient">HIT THE ROAD?</span>
        </h2>

        {/* Supporting text */}
        <p className="max-w-2xl text-base sm:text-xl text-slate-300 font-light leading-relaxed mb-10">
          Choose your car. Choose your journey. We'll take care of the rest.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onBookCar}
            className="px-9 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl shadow-amber-400/25 hover:scale-105 flex items-center gap-2"
          >
            <span>BOOK A CAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactUs}
            className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md flex items-center gap-2"
          >
            <span>CONTACT US</span>
            <Phone className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Cinematic Supercar Visual Centerpiece */}
        <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85"
            alt="Lamborghini Urus &amp; Fleet Preview"
            className="w-full h-72 sm:h-96 object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

          {/* Bottom Trust Line */}
          <div className="absolute bottom-6 inset-x-6 flex flex-wrap items-center justify-between text-xs text-slate-300 z-10 gap-3 border-t border-white/15 pt-4">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Full Comprehensive Insurance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Doorstep Handover Within 60 Minutes</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span>N10 White-Glove Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
