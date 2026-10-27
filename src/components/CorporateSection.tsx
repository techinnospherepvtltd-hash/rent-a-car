import React from 'react'
import { Briefcase, Building2, Users2, Shield, FileText, ArrowRight, CheckCircle2, Clock } from 'lucide-react'

interface CorporateSectionProps {
  onOpenCorporateModal: () => void
}

export const CorporateSection: React.FC<CorporateSectionProps> = ({ onOpenCorporateModal }) => {
  const corporatePerks = [
    {
      title: 'Executive Client Meetings',
      desc: 'Make an indelible impression on high-net-worth clients with chauffeured Rolls-Royce, Maybach, or S-Class arrivals.',
      icon: Users2
    },
    {
      title: 'Corporate Travel & Delegations',
      desc: 'Multi-passenger luxury fleets with Cadillac Escalade ESV and Mercedes V-Class VIP suites for summits and roadshows.',
      icon: Building2
    },
    {
      title: 'Employee & Executive Relocation',
      desc: 'Turnkey monthly executive leases with vehicle swaps, full maintenance, and priority replacement guarantees.',
      icon: Clock
    },
    {
      title: 'Streamlined GST/VAT Invoicing',
      desc: 'Centralized corporate billing, itemized expense breakdowns, and flexible credit terms with zero deposit requirements.',
      icon: FileText
    }
  ]

  return (
    <section className="w-full bg-[#f8fafc] text-slate-900 py-24 px-4 md:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                Enterprise Fleet Solutions
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                BUSINESS TRAVELS, <br />
                <span className="text-gold-gradient">MADE SIMPLE.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Elevate your corporate mobility. Whether hosting international partners, outfitting executive leadership with bespoke vehicles, or managing enterprise group transfers, N10 Corporate delivers dedicated account management and unmatched discretion.
              </p>

              {/* Verified Enterprise Guarantee list */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Senior Account Concierge 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Consolidated Monthly Invoicing &amp; Tax Compliance</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Security Deposit on Approved Corporate Accounts</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenCorporateModal}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-400/20 flex items-center gap-2"
                >
                  <span>ENQUIRE FOR BUSINESS RENTALS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 2x2 Feature Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corporatePerks.map((perk, idx) => {
                const Icon = perk.icon
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1.5">{perk.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{perk.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
