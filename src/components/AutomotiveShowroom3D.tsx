import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RotateCw, ZoomIn, ZoomOut, Eye, Sparkles, Zap, Shield, Gauge, Check } from 'lucide-react'

interface Hotspot {
  id: string
  title: string
  spec: string
  desc: string
  position: [number, number, number] // 3D coordinates in scene
  screenPos: { x: number; y: number }
  category: string
}

interface PaintColor {
  id: string
  name: string
  hex: string
  color: number
  accent: string
}

const PAINT_COLORS: PaintColor[] = [
  { id: 'gold', name: 'N10 Imperial Gold', hex: '#e5b042', color: 0xe5b042, accent: 'Champagne Metallic' },
  { id: 'black', name: 'Obsidian Carbon', hex: '#111216', color: 0x111216, accent: 'Deep Gloss' },
  { id: 'silver', name: 'Liquid Quicksilver', hex: '#d1d5db', color: 0xd1d5db, accent: 'Brushed Aluminum' },
  { id: 'red', name: 'Rosso Corsa Red', hex: '#dc2626', color: 0xdc2626, accent: 'Racing Spec' },
  { id: 'blue', name: 'Monaco Electric Blue', hex: '#0284c7', color: 0x0284c7, accent: 'Prismatic Pearl' },
]

const HOTSPOTS_DATA: Omit<Hotspot, 'screenPos'>[] = [
  {
    id: 'engine',
    title: 'Twin-Turbo V8 Powertrain',
    spec: '710 HP • 770 Nm Torque',
    desc: 'Bespoke hand-assembled 4.0L Bi-Turbo engine mounted mid-rear for optimal 44:56 weight distribution.',
    position: [0, 0.7, -0.6],
    category: 'Performance'
  },
  {
    id: 'headlights',
    title: 'Matrix Laser LED Optics',
    spec: '650m Adaptive High Beam',
    desc: 'Dynamic crystal daytime running lights with active curve illumination and welcome sequence.',
    position: [0.65, 0.45, 1.8],
    category: 'Optics'
  },
  {
    id: 'wheels',
    title: 'Carbon-Ceramic Braking & Forged Wheels',
    spec: '420mm Discs • 10-Piston Calipers',
    desc: 'Ultra-lightweight 21-inch forged monoblock rims with Brembo carbon-ceramic rotors.',
    position: [1.1, 0.1, 1.1],
    category: 'Chassis'
  },
  {
    id: 'cockpit',
    title: 'Handcrafted Carbon Cockpit',
    spec: 'Alcantara • OLED Glass Cockpit',
    desc: 'Full grain semi-aniline leather with contrast gold stitching, telemetry screen, and active sound suppression.',
    position: [0, 0.8, 0.3],
    category: 'Interior'
  },
  {
    id: 'aero',
    title: 'Active Aerodynamic Wing',
    spec: '480kg Downforce at 250 km/h',
    desc: 'Hydraulically actuated multi-position carbon wing with DRS (Drag Reduction System) braking air-flap.',
    position: [0, 0.9, -1.8],
    category: 'Aerodynamics'
  }
]

interface AutomotiveShowroom3DProps {
  onBookCar: (carName?: string) => void
}

export const AutomotiveShowroom3D: React.FC<AutomotiveShowroom3DProps> = ({ onBookCar }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedColor, setSelectedColor] = useState<PaintColor>(PAINT_COLORS[0])
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [cameraView, setCameraView] = useState<'3/4' | 'side' | 'front' | 'rear'>('3/4')

  // Refs for 3D state
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const carGroupRef = useRef<THREE.Group | null>(null)
  const bodyMeshRefs = useRef<THREE.Mesh[]>([])
  const isDraggingRef = useRef(false)
  const previousMousePositionRef = useRef({ x: 0, y: 0 })
  const rotationVelocityRef = useRef({ x: 0, y: 0 })
  const [hotspotScreenPositions, setHotspotScreenPositions] = useState<{ [id: string]: { x: number; y: number } }>({})

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0b0e, 0.04)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(3.6, 2.0, 4.2)
    camera.lookAt(0, 0.4, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    // Key Studio Light
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.2)
    keyLight.position.set(5, 8, 4)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    scene.add(keyLight)

    // Gold Accent Rim Light
    const rimLight = new THREE.DirectionalLight(0xe5b042, 2.5)
    rimLight.position.set(-5, 4, -4)
    scene.add(rimLight)

    // Cyan Fill Light
    const cyanLight = new THREE.DirectionalLight(0x0ea5e9, 1.2)
    cyanLight.position.set(4, 2, -5)
    scene.add(cyanLight)

    // Under-glow Light
    const underGlow = new THREE.PointLight(0xe5b042, 1.8, 4)
    underGlow.position.set(0, 0.15, 0)
    scene.add(underGlow)

    // Ground reflective floor
    const floorGeo = new THREE.PlaneGeometry(30, 30)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x07080a,
      roughness: 0.25,
      metalness: 0.6
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    floor.position.y = -0.01
    scene.add(floor)

    // Ground circular speed glow ring
    const ringGeo = new THREE.RingGeometry(2.4, 2.55, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe5b042,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.005
    scene.add(ring)

    // Build Procedural Supercar Model
    const carGroup = new THREE.Group()
    carGroupRef.current = carGroup
    scene.add(carGroup)

    bodyMeshRefs.current = []

    // Car Body Material
    const carPaintMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.color),
      metalness: 0.88,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95
    })

    // Carbon Fiber Material
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x141518,
      roughness: 0.35,
      metalness: 0.5
    })

    // Glass Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x050810,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.7,
      transparent: true,
      opacity: 0.85
    })

    // LED Glow Material
    const ledGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff
    })

    // Gold Caliper Material
    const goldCaliperMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5b042,
      metalness: 0.9,
      roughness: 0.2
    })

    // 1. Lower Chassis & Side Skirts
    const chassisGeo = new THREE.BoxGeometry(1.8, 0.22, 4.3)
    const chassis = new THREE.Mesh(chassisGeo, carbonMaterial)
    chassis.position.y = 0.22
    chassis.castShadow = true
    chassis.receiveShadow = true
    carGroup.add(chassis)

    // 2. Main Aerodynamic Body Shell
    const bodyGeo = new THREE.BoxGeometry(1.85, 0.44, 4.2)
    const bodyMesh = new THREE.Mesh(bodyGeo, carPaintMaterial)
    bodyMesh.position.y = 0.46
    bodyMesh.castShadow = true
    carGroup.add(bodyMesh)
    bodyMeshRefs.current.push(bodyMesh)

    // 3. Low-slung Sloped Front Hood & Aerodynamic Nose
    const hoodGeo = new THREE.BoxGeometry(1.72, 0.22, 1.5)
    const hoodMesh = new THREE.Mesh(hoodGeo, carPaintMaterial)
    hoodMesh.position.set(0, 0.42, 1.35)
    hoodMesh.rotation.x = 0.08
    hoodMesh.castShadow = true
    carGroup.add(hoodMesh)
    bodyMeshRefs.current.push(hoodMesh)

    // Sleek front nose cone
    const noseGeo = new THREE.BoxGeometry(1.6, 0.16, 0.7)
    const noseMesh = new THREE.Mesh(noseGeo, carPaintMaterial)
    noseMesh.position.set(0, 0.26, 2.05)
    noseMesh.castShadow = true
    carGroup.add(noseMesh)
    bodyMeshRefs.current.push(noseMesh)

    // Front Splitter
    const splitterGeo = new THREE.BoxGeometry(1.95, 0.06, 0.8)
    const splitter = new THREE.Mesh(splitterGeo, carbonMaterial)
    splitter.position.set(0, 0.12, 2.1)
    splitter.castShadow = true
    carGroup.add(splitter)

    // 4. Cockpit Cabin & Curved Low Greenhouse
    const cabinGeo = new THREE.BoxGeometry(1.36, 0.46, 1.85)
    const cabin = new THREE.Mesh(cabinGeo, glassMaterial)
    cabin.position.set(0, 0.72, -0.08)
    cabin.rotation.x = -0.06
    cabin.castShadow = true
    carGroup.add(cabin)

    // Roof Center Panel (in car paint)
    const roofGeo = new THREE.BoxGeometry(1.22, 0.05, 1.45)
    const roof = new THREE.Mesh(roofGeo, carPaintMaterial)
    roof.position.set(0, 0.96, -0.16)
    roof.castShadow = true
    carGroup.add(roof)
    bodyMeshRefs.current.push(roof)

    // 5. Rear Deck & Engine Cover Louvers
    const deckGeo = new THREE.BoxGeometry(1.65, 0.35, 1.5)
    const rearDeck = new THREE.Mesh(deckGeo, carPaintMaterial)
    rearDeck.position.set(0, 0.55, -1.35)
    rearDeck.castShadow = true
    carGroup.add(rearDeck)
    bodyMeshRefs.current.push(rearDeck)

    // Carbon Engine Louvers
    for (let i = 0; i < 4; i++) {
      const louverGeo = new THREE.BoxGeometry(0.9, 0.03, 0.12)
      const louver = new THREE.Mesh(louverGeo, carbonMaterial)
      louver.position.set(0, 0.74, -0.9 - i * 0.22)
      carGroup.add(louver)
    }

    // 6. Active Rear GT Wing
    const wingPillarGeo = new THREE.BoxGeometry(0.06, 0.45, 0.22)
    const pillarL = new THREE.Mesh(wingPillarGeo, carbonMaterial)
    pillarL.position.set(-0.55, 0.85, -1.8)
    const pillarR = new THREE.Mesh(wingPillarGeo, carbonMaterial)
    pillarR.position.set(0.55, 0.85, -1.8)
    carGroup.add(pillarL, pillarR)

    const wingBladeGeo = new THREE.BoxGeometry(1.95, 0.05, 0.45)
    const wingBlade = new THREE.Mesh(wingBladeGeo, carbonMaterial)
    wingBlade.position.set(0, 1.05, -1.8)
    wingBlade.rotation.x = -0.12
    wingBlade.castShadow = true
    carGroup.add(wingBlade)

    // 7. Quad Titanium Exhausts
    const exhaustGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.25, 16)
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.95, roughness: 0.2 })
    for (let i = -1.5; i <= 1.5; i += 1) {
      if (Math.abs(i) === 0.5) continue
      const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat)
      exhaust.rotation.x = Math.PI / 2
      exhaust.position.set(i * 0.18, 0.28, -2.15)
      carGroup.add(exhaust)
    }

    // 8. Headlights & Tail Lights
    const headlightGeo = new THREE.BoxGeometry(0.38, 0.08, 0.2)
    const hlLeft = new THREE.Mesh(headlightGeo, ledGlowMaterial)
    hlLeft.position.set(-0.68, 0.48, 1.95)
    hlLeft.rotation.y = -0.25
    const hlRight = new THREE.Mesh(headlightGeo, ledGlowMaterial)
    hlRight.position.set(0.68, 0.48, 1.95)
    hlRight.rotation.y = 0.25
    carGroup.add(hlLeft, hlRight)

    const tailLightGeo = new THREE.BoxGeometry(1.6, 0.05, 0.08)
    const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 })
    const tailLight = new THREE.Mesh(tailLightGeo, tailLightMat)
    tailLight.position.set(0, 0.55, -2.12)
    carGroup.add(tailLight)

    // 9. Wheels & Carbon Ceramic Calipers
    const tireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 32)
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x18191c, roughness: 0.85 })
    const rimGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.33, 16)
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xc4cbd4, metalness: 0.9, roughness: 0.15 })

    const wheelPositions: [number, number, number][] = [
      [-0.96, 0.42, 1.25],  // Front Left
      [0.96, 0.42, 1.25],   // Front Right
      [-0.98, 0.44, -1.25], // Rear Left
      [0.98, 0.44, -1.25]   // Rear Right
    ]

    wheelPositions.forEach((pos, idx) => {
      const wheelGroup = new THREE.Group()
      wheelGroup.position.set(...pos)
      wheelGroup.rotation.z = Math.PI / 2

      const tire = new THREE.Mesh(tireGeo, tireMat)
      tire.castShadow = true
      wheelGroup.add(tire)

      const rim = new THREE.Mesh(rimGeo, rimMat)
      wheelGroup.add(rim)

      // Golden Caliper
      const caliperGeo = new THREE.BoxGeometry(0.12, 0.22, 0.24)
      const caliper = new THREE.Mesh(caliperGeo, goldCaliperMaterial)
      caliper.position.set(0, 0.18, 0.1)
      wheelGroup.add(caliper)

      carGroup.add(wheelGroup)
    })

    // Animation loop & Hotspot screen projection
    let animationFrameId: number

    const updateHotspotScreenCoordinates = () => {
      if (!cameraRef.current || !carGroupRef.current) return
      const newCoords: { [id: string]: { x: number; y: number } } = {}

      HOTSPOTS_DATA.forEach((h) => {
        const localPos = new THREE.Vector3(...h.position)
        // Transform point by carGroup's world matrix
        localPos.applyMatrix4(carGroupRef.current!.matrixWorld)
        // Project to 2D screen NDC
        localPos.project(cameraRef.current!)

        const hw = container.clientWidth / 2
        const hh = container.clientHeight / 2
        const screenX = localPos.x * hw + hw
        const screenY = -(localPos.y * hh) + hh

        newCoords[h.id] = { x: screenX, y: screenY }
      })

      setHotspotScreenPositions(newCoords)
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (carGroupRef.current) {
        if (isAutoRotating && !isDraggingRef.current) {
          carGroupRef.current.rotation.y += 0.005
        } else if (!isDraggingRef.current) {
          // Inertia damping
          carGroupRef.current.rotation.y += rotationVelocityRef.current.x
          rotationVelocityRef.current.x *= 0.92
        }
      }

      updateHotspotScreenCoordinates()
      renderer.render(scene, camera)
    }
    animate()

    // Handle mouse drag orbit
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !carGroupRef.current) return
      const deltaX = e.clientX - previousMousePositionRef.current.x
      rotationVelocityRef.current = { x: deltaX * 0.006, y: 0 }
      carGroupRef.current.rotation.y += deltaX * 0.008
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDraggingRef.current = false
    }

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !carGroupRef.current || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x
      carGroupRef.current.rotation.y += deltaX * 0.008
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const onTouchEnd = () => {
      isDraggingRef.current = false
    }

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('resize', handleResize)
    const dom = renderer.domElement
    dom.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    dom.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('resize', handleResize)
      dom.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      dom.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      cancelAnimationFrame(animationFrameId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isAutoRotating])

  // Update Car Paint Color in Real Time
  useEffect(() => {
    bodyMeshRefs.current.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
        mesh.material.color.setHex(selectedColor.color)
      }
    })
  }, [selectedColor])

  // Handle Preset Camera Views
  const changeCameraView = (view: '3/4' | 'side' | 'front' | 'rear') => {
    setCameraView(view)
    if (!cameraRef.current || !carGroupRef.current) return

    const targetPos = new THREE.Vector3()
    if (view === '3/4') {
      targetPos.set(3.6, 1.8, 4.0)
    } else if (view === 'side') {
      targetPos.set(5.2, 1.2, 0)
    } else if (view === 'front') {
      targetPos.set(0, 1.4, 5.0)
    } else if (view === 'rear') {
      targetPos.set(0, 1.5, -4.8)
    }

    // Smooth camera repositioning
    let step = 0
    const startPos = cameraRef.current.position.clone()
    const moveCamera = () => {
      step += 0.05
      if (step <= 1 && cameraRef.current) {
        cameraRef.current.position.lerpVectors(startPos, targetPos, step)
        cameraRef.current.lookAt(0, 0.4, 0)
        requestAnimationFrame(moveCamera)
      }
    }
    moveCamera()
  }

  // Zoom helpers
  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return
    const newFov = THREE.MathUtils.clamp(cameraRef.current.fov + delta, 25, 60)
    cameraRef.current.fov = newFov
    cameraRef.current.updateProjectionMatrix()
  }

  return (
    <section id="experience" className="relative w-full min-h-screen bg-[#07080b] py-20 px-4 md:px-8 border-t border-b border-white/5 overflow-hidden">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-32 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Interactive 3D Virtual Showroom
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
          PRECISION ENGINEERING. <span className="text-gold-gradient">IN 360° GLORY.</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base">
          Rotate, explore bespoke finishes, and inspect racing-spec components. Experience why N10 fleet vehicles stand in an elite class of their own.
        </p>
      </div>

      {/* Main 3D Canvas & Interactive HUD Container */}
      <div className="max-w-7xl mx-auto relative">
        <div className="relative w-full h-[520px] md:h-[640px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#101218]/90 via-[#0a0b0e] to-[#060709] border border-white/10 shadow-2xl">
          {/* Three.js WebGL Mount */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive 3D Hotspot Overlay Pins */}
          {HOTSPOTS_DATA.map((hotspot) => {
            const pos = hotspotScreenPositions[hotspot.id]
            if (!pos) return null
            const isActive = activeHotspot?.id === hotspot.id

            return (
              <div
                key={hotspot.id}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-20 pointer-events-auto"
              >
                <button
                  onClick={() => setActiveHotspot(isActive ? null : ({ ...hotspot, screenPos: pos }))}
                  className={`relative group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-400 text-black scale-125 ring-4 ring-amber-400/30'
                      : 'bg-black/80 backdrop-blur-md border border-amber-400/60 text-amber-400 hover:scale-110 hover:border-amber-300'
                  }`}
                  title={hotspot.title}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping absolute inset-0 m-auto opacity-75" />
                  <span className="text-[11px] font-bold relative z-10">+</span>
                </button>
              </div>
            )
          })}

          {/* Active Hotspot Modal / Popup card */}
          {activeHotspot && (
            <div className="absolute top-6 left-6 z-30 max-w-sm bg-black/85 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-5 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {activeHotspot.category}
                </span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-white/10"
                >
                  ✕ Close
                </button>
              </div>
              <h4 className="text-white font-bold text-base mb-1">{activeHotspot.title}</h4>
              <p className="text-amber-400 font-semibold text-xs mb-2">{activeHotspot.spec}</p>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">{activeHotspot.desc}</p>
              <button
                onClick={() => onBookCar('Porsche 911 GT3 RS (Bespoke Spec)')}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Zap className="w-3.5 h-3.5" /> Book This Specification
              </button>
            </div>
          )}

          {/* Left HUD: Live Automotive Specs Matrix */}
          <div className="hidden lg:flex flex-col gap-3 absolute top-6 left-6 z-10 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-left min-w-[210px] pointer-events-auto">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Powertrain</div>
              <div className="text-lg font-bold text-white flex items-baseline gap-1">
                710 <span className="text-xs text-amber-400 font-medium">BHP</span>
              </div>
              <div className="text-[11px] text-slate-400">4.0L Bi-Turbo Boxer V8</div>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-left min-w-[210px] pointer-events-auto">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Acceleration</div>
              <div className="text-lg font-bold text-white flex items-baseline gap-1">
                2.9 <span className="text-xs text-amber-400 font-medium">SEC</span>
              </div>
              <div className="text-[11px] text-slate-400">0 - 100 km/h Launch Time</div>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-left min-w-[210px] pointer-events-auto">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Top Track Velocity</div>
              <div className="text-lg font-bold text-white flex items-baseline gap-1">
                340 <span className="text-xs text-amber-400 font-medium">KM/H</span>
              </div>
              <div className="text-[11px] text-slate-400">Electronic Speed Governor</div>
            </div>
          </div>

          {/* Right HUD: Quick Rental Rate & Spec */}
          <div className="hidden lg:flex flex-col gap-3 absolute top-6 right-6 z-10 pointer-events-none">
            <div className="bg-black/70 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 text-right min-w-[220px] pointer-events-auto shadow-xl">
              <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Exotic Track Class</div>
              <div className="text-xl font-black text-white mt-1">N10 APEX GT3</div>
              <div className="mt-2 flex items-baseline justify-end gap-1">
                <span className="text-2xl font-black text-amber-400">$1,150</span>
                <span className="text-xs text-slate-400">/ day</span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center justify-end gap-1 mt-1">
                <Check className="w-3.5 h-3.5" /> Instant Delivery Available
              </div>
              <button
                onClick={() => onBookCar('Porsche 911 GT3 RS')}
                className="mt-3 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-400/20"
              >
                Reserve Now
              </button>
            </div>
          </div>

          {/* Top Center: View Preset Toggles */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
            {(['3/4', 'side', 'front', 'rear'] as const).map((view) => (
              <button
                key={view}
                onClick={() => changeCameraView(view)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  cameraView === view
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          {/* Bottom Bar Controls: Paint Swatches & Camera Zoom / Rotate */}
          <div className="absolute bottom-4 inset-x-4 md:inset-x-8 z-20 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/80 backdrop-blur-lg border border-white/10">
            {/* Color Swatches */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">Exterior Finish:</span>
              <div className="flex items-center gap-2">
                {PAINT_COLORS.map((paint) => {
                  const isSelected = selectedColor.id === paint.id
                  return (
                    <button
                      key={paint.id}
                      onClick={() => setSelectedColor(paint)}
                      className={`relative w-7 h-7 rounded-full transition-all duration-200 ${
                        isSelected
                          ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black'
                          : 'opacity-70 hover:opacity-100 hover:scale-110'
                      }`}
                      style={{ backgroundColor: paint.hex }}
                      title={`${paint.name} (${paint.accent})`}
                    />
                  )
                })}
              </div>
              <span className="text-[11px] text-amber-400 font-semibold ml-1 hidden md:inline">
                {selectedColor.name}
              </span>
            </div>

            {/* Canvas Actions: Auto-Rotate, Zoom */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isAutoRotating
                    ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
                title="Toggle 360 Auto-Rotation"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                <span>{isAutoRotating ? 'Orbit Active' : 'Orbit Paused'}</span>
              </button>

              <button
                onClick={() => handleZoom(-5)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleZoom(5)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Spec Summary Card */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 lg:hidden">
          <div className="bg-[#12141a] border border-white/5 p-3 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 uppercase">Power</div>
            <div className="text-base font-bold text-white">710 BHP</div>
          </div>
          <div className="bg-[#12141a] border border-white/5 p-3 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 uppercase">0-100 km/h</div>
            <div className="text-base font-bold text-white">2.9 Sec</div>
          </div>
          <div className="bg-[#12141a] border border-white/5 p-3 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 uppercase">Top Speed</div>
            <div className="text-base font-bold text-white">340 km/h</div>
          </div>
          <div className="bg-[#12141a] border border-amber-500/20 p-3 rounded-xl text-center">
            <div className="text-[10px] text-amber-400 uppercase">Rate</div>
            <div className="text-base font-bold text-amber-400">$1,150/d</div>
          </div>
        </div>
      </div>
    </section>
  )
}
