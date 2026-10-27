import React, { useState } from 'react'
import { ArrowRight, Volume2, VolumeX, Sparkles, Compass, Gauge, Zap } from 'lucide-react'

interface CinematicExperienceProps {
  onFindCar: () => void
}

export const CinematicExperience: React.FC<CinematicExperienceProps> = ({ onFindCar }) => {
  const [speedLevel, setSpeedLevel] = useState<number>(65)
  const [timeOfDay, setTimeOfDay] = useState<'midnight' | 'sunset' | 'dawn'>('midnight')

  const environments = {
    midnight: {
      name: 'Midnight Neon Metropolis',
      bgGrad: 'from-[#050608] via-[#090b12] to-[#040507]',
      accentColor: '#38bdf8',
      skylineGlow: 'bg-cyan-500/10',
      tag: '01:00 AM • HIGHWAY CRUISE'
    },
    sunset: {
      name: 'Sunset Coastal Boulevard',
      bgGrad: 'from-[#140b08] via-[#1a0e10] to-[#080406]',
      accentColor: '#f97316',
      skylineGlow: 'bg-orange-500/10',
      tag: '07:30 PM • GOLDEN HOUR'
    },
    dawn: {
      name: 'Alpine Sunrise Pass',
      bgGrad: 'from-[#0a0f18] via-[#111927] to-[#080b12]',
      accentColor: '#e5b042',
      skylineGlow: 'bg-amber-500/10',
      tag: '05:45 AM • CANYON RUN'
    }
  }

  const currentEnv = environments[timeOfDay]

  return (
    <section className="relative w-full py-28 px-4 md:px-8 bg-black overflow-hidden border-t border-b border-white/10">
      {/* Background Gradient & Animated City Backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-b ${currentEnv.bgGrad} transition-colors duration-1000`} />
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 ${currentEnv.skylineGlow} blur-[140px] pointer-events-none rounded-full transition-colors duration-1000`} />

      {/* Parallax Road Speed Lines */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Environment Switcher Tabs */}
        <div className="inline-flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          {(['midnight', 'sunset', 'dawn'] as const).map((time) => (
            <button
              key={time}
              onClick={() => setTimeOfDay(time)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                timeOfDay === time
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {time === 'midnight' ? 'Midnight Run' : time === 'sunset' ? 'Sunset Coast' : 'Dawn Canyon'}
            </button>
          ))}
        </div>

        {/* Cinematic Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            {currentEnv.tag}
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-tight">
            YOUR JOURNEY <br />
            <span className="text-gold-gradient">STARTS HERE.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-lg font-light leading-relaxed">
            When the open horizon beckons, ordinary will never suffice. Command world-class machinery engineered for effortless velocity, sensory precision, and peerless prestige.
          </p>
        </div>

        {/* Centerpiece Cinematic Vehicle in Motion */}
        <div className="relative w-full max-w-4xl my-12 group">
          {/* Headlight Beams */}
          <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-64 h-32 bg-white/20 blur-3xl pointer-events-none rounded-full transform -skew-x-12" />

          {/* Luxury Car Image with subtle dynamic speed float */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
              alt="Cinematic Driving Experience"
              className="w-full h-[320px] sm:h-[460px] object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Cinematic Letterbox vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

            {/* Overlaid telemetry HUD in car view */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between text-left text-white z-10 gap-4">
              <div>
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  N10 Autonomous Concierge Active
                </div>
                <div className="text-lg sm:text-2xl font-black">
                  Coastal Route 1 • Beverly Hills to Malibu
                </div>
              </div>

              {/* Speed Controller Slider */}
              <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-white min-w-[50px]">
                  {speedLevel} MPH
                </span>
                <input
                  type="range"
                  min="30"
                  max="160"
                  value={speedLevel}
                  onChange={(e) => setSpeedLevel(Number(e.target.value))}
                  className="w-24 accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onFindCar}
            className="px-9 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl shadow-amber-400/20 hover:scale-105 flex items-center gap-2"
          >
            <span>FIND YOUR CAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
