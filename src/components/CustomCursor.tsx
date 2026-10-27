import React, { useEffect, useState, useRef } from 'react'

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'card' | 'button'>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mousePosition = useRef({ x: -100, y: -100 })
  const cursorPosition = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Check if device supports touch
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Check element under cursor for contextual labels
      const target = e.target as HTMLElement | null
      if (!target) return

      const closestCar = target.closest('[data-cursor="view"]') || target.closest('.group')
      const closestBook = target.closest('button') || target.closest('[data-cursor="book"]')
      const closestLink = target.closest('a')
      const closestImg = target.closest('img')

      if (closestBook && closestBook.textContent?.toLowerCase().includes('book')) {
        setCursorText('BOOK')
        setCursorVariant('button')
      } else if (closestCar && closestCar.classList.contains('group')) {
        setCursorText('VIEW')
        setCursorVariant('card')
      } else if (closestLink || closestBook) {
        setCursorText('')
        setCursorVariant('hover')
      } else if (closestImg) {
        setCursorText('ZOOM')
        setCursorVariant('card')
      } else {
        setCursorText('')
        setCursorVariant('default')
      }
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    // Smooth animation loop for cursor lag/inertia
    let rafId: number
    const render = () => {
      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * 0.22
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * 0.22

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [isVisible])

  if (isTouchDevice || !isVisible) return null

  // Styles based on variant
  let sizeClasses = 'w-6 h-6 border-white/60 bg-transparent'
  if (cursorVariant === 'hover') {
    sizeClasses = 'w-10 h-10 border-amber-400 bg-amber-400/10 scale-125'
  } else if (cursorVariant === 'card' || cursorVariant === 'button') {
    sizeClasses = 'w-14 h-14 bg-amber-400 border-amber-300 text-black font-extrabold text-[10px] scale-110 shadow-lg shadow-amber-400/30'
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 rounded-full border transition-all duration-150 flex items-center justify-center tracking-wider uppercase font-mono ${sizeClasses}`}
      style={{ willChange: 'transform' }}
    >
      {cursorText && <span className="select-none">{cursorText}</span>}
    </div>
  )
}
