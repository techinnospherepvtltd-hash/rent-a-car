import React, { useEffect, useState } from 'react'
import { Sparkles, Zap } from 'lucide-react'

interface LoadingScreenProps {
  onLoaded: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Fast, crisp animation under 1.2 seconds total
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsFadingOut(true)
            setTimeout(() => {
              onLoaded()
            }, 350)
          }, 150)
          return 100
        }
        return prev + 12
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onLoaded])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080b] text-white transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Background Glow */}
      <div className="absolute w-72 h-72 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Logo & Speed Sequence Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* N10 Metallic Shield Badge */}
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1c1e28] to-[#0c0d12] border-2 border-amber-400 flex items-center justify-center shadow-2xl mb-6">
          <span className="font-black text-amber-400 text-3xl tracking-tighter">N10</span>
          <div className="absolute -bottom-1 inset-x-3 h-1 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50" />
        </div>

        {/* Brand Headline */}
        <div className="text-xl font-black tracking-widest uppercase text-white mb-1">
          N10 RENT A CAR
        </div>
        <div className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold mb-8">
          LUXURY &amp; EXOTIC AUTOMOTIVE FLEET
        </div>

        {/* Road Speed Line & Progress Indicator */}
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden relative mb-3">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tachometer Percentage */}
        <div className="text-[11px] font-mono text-slate-400 font-semibold flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>STARTING ENGINES... {progress}%</span>
        </div>
      </div>
    </div>
  )
}
