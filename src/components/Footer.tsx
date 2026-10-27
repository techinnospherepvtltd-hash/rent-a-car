import React from 'react'
import { COMPANY_INFO } from '../data/company'
import { Phone, Mail, MapPin, MessageSquare, Shield, ArrowUp } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#08090d] text-slate-400 text-xs border-t border-white/10 pt-16 pb-12 px-4 md:px-8 text-left">
      <div className="max-w-7xl mx-auto">
        {/* Top Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1c1e28] to-[#0c0d12] border border-amber-400/50 flex items-center justify-center">
                <span className="font-black text-amber-400 text-sm">N10</span>
              </div>
              <span className="text-white font-black text-lg tracking-wider">
                N10 RENT A CAR
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed pr-6">
              The premier destination for exotic supercars, luxury executive limousines, and prestige SUVs. Engineered for those who demand uncompromised performance and white-glove hospitality.
            </p>

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-400 font-semibold text-[11px]">
              <Shield className="w-3.5 h-3.5" />
              <span>Licensed &amp; Fully Insured Luxury Fleet</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (Cols 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              Quick Links
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Home Showroom</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Our Fleet</a></li>
              <li><a href="#experience" className="hover:text-amber-400 transition-colors">3D Automotive Lab</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#locations" className="hover:text-amber-400 transition-colors">Pickup Locations</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Frequently Asked</a></li>
            </ul>
          </div>

          {/* Fleet Categories (Cols 7-8) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              Fleet Marques
            </div>
            <ul className="space-y-2">
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Supercars &amp; Track Spec</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Rolls-Royce &amp; Maybach</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">G-Wagon &amp; Urus SUVs</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">7-Seater VIP Vans</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Executive Sports Sedans</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Electric Performance</a></li>
            </ul>
          </div>

          {/* Direct 24/7 Contact (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              24/7 VIP Concierge &amp; Hubs
            </div>

            <div className="space-y-2.5 pt-1">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.phone} (24/7 Telephone Desk)</span>
              </a>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY_INFO.whatsapp} (WhatsApp Priority Desk)</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-300 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            © {new Date().getFullYear()} N10 Rent A Car. All rights reserved. Premium Automotive Technologies.
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Rental Agreement</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
