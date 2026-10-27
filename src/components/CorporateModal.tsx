import React, { useState } from 'react'
import { X, Building2, Send, CheckCircle2, Shield, Phone, Mail } from 'lucide-react'
import { COMPANY_INFO } from '../data/company'

interface CorporateModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CorporateModal: React.FC<CorporateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fleetRequirement, setFleetRequirement] = useState('Executive Sedans & Limousines')
  const [duration, setDuration] = useState('Monthly / Long-term')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f1118] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-left text-white max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">N10 Corporate</div>
              <h3 className="text-lg font-bold text-white">Enterprise Fleet &amp; Executive Rental Inquiry</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Inquiry Received Successfully</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{contactPerson}</strong>. Our Senior Corporate Fleet Director has received your request for <strong>{companyName}</strong> and will contact you within 2 business hours with custom enterprise terms.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs uppercase"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Company / Organization Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Ventures"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Contact Person &amp; Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Hayes, Head of Logistics"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. r.hayes@apexglobal.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Direct Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Fleet Category Required</label>
                <select
                  value={fleetRequirement}
                  onChange={(e) => setFleetRequirement(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option>Executive Sedans &amp; Limousines (Maybach, S-Class, 7-Series)</option>
                  <option>7-Seater VIP Passenger Vans (V-Class, Escalade)</option>
                  <option>Supercars &amp; Event Showpieces</option>
                  <option>Executive SUVs (G-Wagon, Range Rover)</option>
                  <option>Mixed Multi-Vehicle Fleet</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Estimated Rental Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option>Single Event / Summit (1–3 Days)</option>
                  <option>Weekly Delegation (1–2 Weeks)</option>
                  <option>Monthly / Long-term Subscription (30+ Days)</option>
                  <option>Standing Corporate Account (On-Demand)</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-[11px] flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes priority airport tarmac escorts, zero security deposit options, and monthly VAT invoicing.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <span>Submit Corporate Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
