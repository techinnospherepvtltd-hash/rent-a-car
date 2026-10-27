import React, { useState, useEffect } from 'react'
import { Menu, X, Phone, MessageSquare, ArrowRight, Sparkles } from 'lucide-react'
import { COMPANY_INFO } from '../data/company'

interface NavbarProps {
  onOpenBooking: () => void
  onContactClick: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'CARS', href: '#fleet' },
    { name: '3D EXPERIENCE', href: '#experience' },
    { name: 'SERVICES', href: '#services' },
    { name: 'HOW IT WORKS', href: '#how-it-works' },
    { name: 'WHY US', href: '#why-us' },
    { name: 'LOCATIONS', href: '#locations' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand Logo Left */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Custom N10 Metallic Shield Emblem */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c1e28] to-[#0c0d12] border border-amber-400/50 flex items-center justify-center shadow-lg group-hover:border-amber-300 transition-all">
              <span className="font-black text-amber-400 text-base tracking-tighter">N10</span>
              <div className="absolute -bottom-0.5 inset-x-2 h-[2px] bg-amber-400 rounded-full" />
            </div>

            <div className="flex flex-col text-left">
              <div className="text-lg font-black tracking-wider text-white flex items-center gap-1.5 leading-none">
                <span>N10</span>
                <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                  RENT A CAR
                </span>
              </div>
              <span className="text-[9px] text-slate-400 tracking-widest uppercase mt-0.5 font-medium">
                LUXURY &amp; EXOTIC FLEET
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links Center */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-wider text-slate-300 hover:text-amber-400 transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Direct WhatsApp Concierge Quick Pill */}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              title="Chat with Concierge"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>24/7 VIP Concierge</span>
            </a>

            {/* Primary BOOK NOW Button */}
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-amber-400/20 hover:scale-105 active:scale-95"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 text-black font-extrabold text-xs uppercase"
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 animate-in slide-in-from-top duration-300">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1c1e28] to-[#0c0d12] border border-amber-400/50 flex items-center justify-center">
                <span className="font-black text-amber-400 text-sm">N10</span>
              </div>
              <span className="text-white font-black text-base">N10 RENT A CAR</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4 py-8 text-left">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-slate-200 hover:text-amber-400 transition-colors uppercase py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Drawer Footer & Actions */}
          <div className="space-y-4 pt-6 border-t border-white/10 text-left">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenBooking()
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <span>BOOK A VEHICLE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <a href={`tel:${COMPANY_INFO.phoneClean}`} className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold">
                WhatsApp Live
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
