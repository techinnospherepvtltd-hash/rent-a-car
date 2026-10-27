export interface Vehicle {
  id: string
  name: string
  brand: string
  category: 'LUXURY' | 'SPORTS' | 'SUV' | 'PREMIUM' | '7-SEATER' | 'ECONOMY'
  year: number
  pricePerDay: number
  securityDeposit: number
  seats: number
  transmission: 'Automatic PDK' | 'Automatic 8-Speed' | 'Dual-Clutch' | '9G-Tronic' | 'Automatic'
  fuel: 'Twin-Turbo Petrol' | 'V12 Petrol' | 'Electric' | 'Hybrid' | 'Petrol'
  engine: string
  horsepower: number
  acceleration: string // e.g. "2.9s"
  topSpeed: string // e.g. "340 km/h"
  luggage: number // count of bags
  driveType: 'AWD' | 'RWD' | '4WD'
  doors: number
  badge?: 'HOT DEAL' | 'MOST POPULAR' | 'NEW 2025' | 'VIP EXCLUSIVE' | 'ZERO DEPOSIT'
  description: string
  includedFeatures: string[]
  image: string
  gallery: string[]
  isHeroFeatured?: boolean
}

export const FLEET_DATA: Vehicle[] = [
  {
    id: 'porsche-911-gt3-rs',
    name: 'Porsche 911 GT3 RS',
    brand: 'Porsche',
    category: 'SPORTS',
    year: 2025,
    pricePerDay: 1150,
    securityDeposit: 2500,
    seats: 2,
    transmission: 'Automatic PDK',
    fuel: 'Twin-Turbo Petrol',
    engine: '4.0L Naturally Aspirated Boxer-6',
    horsepower: 518,
    acceleration: '3.0s',
    topSpeed: '296 km/h',
    luggage: 2,
    driveType: 'RWD',
    doors: 2,
    badge: 'HOT DEAL',
    description: 'The pinnacle of road-legal track engineering. Aerodynamic downforce, atmospheric flat-six howl, and unmatched apex precision for the discerning enthusiast.',
    includedFeatures: ['Clubsport Package', 'Carbon Ceramic Brakes (PCCB)', 'Sport Chrono', 'Weissach Package Accents', 'Free Doorstep Delivery'],
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85'
    ],
    isHeroFeatured: true
  },
  {
    id: 'rolls-royce-ghost-black-badge',
    name: 'Rolls-Royce Ghost Black Badge',
    brand: 'Rolls-Royce',
    category: 'LUXURY',
    year: 2025,
    pricePerDay: 1650,
    securityDeposit: 3500,
    seats: 5,
    transmission: 'Automatic 8-Speed',
    fuel: 'V12 Petrol',
    engine: '6.75L Twin-Turbocharged V12',
    horsepower: 592,
    acceleration: '4.5s',
    topSpeed: '250 km/h',
    luggage: 4,
    driveType: 'AWD',
    doors: 4,
    badge: 'VIP EXCLUSIVE',
    description: 'The darker alter-ego of luxury. Effortless planetary power, starlight headliner, and whisper-quiet acoustic insulation for royalty and business titans.',
    includedFeatures: ['Shooting Star Headliner', 'Rear Theater Displays', 'Champagne Chiller & Flutes', 'Bespoke Audio System', 'VIP Concierge Escort'],
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85'
    ],
    isHeroFeatured: false
  },
  {
    id: 'mercedes-amg-g63',
    name: 'Mercedes-AMG G63 Stronger Edition',
    brand: 'Mercedes-Benz',
    category: 'SUV',
    year: 2025,
    pricePerDay: 890,
    securityDeposit: 2000,
    seats: 5,
    transmission: '9G-Tronic',
    fuel: 'Twin-Turbo Petrol',
    engine: '4.0L V8 BiTurbo with Sidepipes',
    horsepower: 577,
    acceleration: '4.2s',
    topSpeed: '240 km/h',
    luggage: 4,
    driveType: '4WD',
    doors: 5,
    badge: 'MOST POPULAR',
    description: 'An iconic silhouette commanding unmatched presence. Twin side exhaust pipes, diamond-quilted Nappa leather, and triple-differential locking capability.',
    includedFeatures: ['AMG Night Package II', 'Burmester High-End 3D Sound', 'Performance Exhaust System', '22-inch Forged Wheels', 'Instant Airport Pickup'],
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85'
    ],
    isHeroFeatured: false
  },
  {
    id: 'ferrari-f8-tributo',
    name: 'Ferrari F8 Tributo Spider',
    brand: 'Ferrari',
    category: 'SPORTS',
    year: 2024,
    pricePerDay: 1350,
    securityDeposit: 3000,
    seats: 2,
    transmission: 'Dual-Clutch',
    fuel: 'Twin-Turbo Petrol',
    engine: '3.9L Twin-Turbo V8',
    horsepower: 710,
    acceleration: '2.9s',
    topSpeed: '340 km/h',
    luggage: 1,
    driveType: 'RWD',
    doors: 2,
    badge: 'NEW 2025',
    description: 'An homage to the most powerful V8 in Ferrari history. Retractable hard top, instant throttle response, and razor-sharp aerodynamic sculpting.',
    includedFeatures: ['Scuderia Ferrari Shields', 'Carbon Racing Seats', 'JBL Professional Sound', 'Passenger Display Screen', '24/7 Roadside Assistance'],
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'lamborghini-urus-performante',
    name: 'Lamborghini Urus Performante',
    brand: 'Lamborghini',
    category: 'SUV',
    year: 2025,
    pricePerDay: 1250,
    securityDeposit: 2500,
    seats: 5,
    transmission: 'Automatic 8-Speed',
    fuel: 'Twin-Turbo Petrol',
    engine: '4.0L Twin-Turbocharged V8',
    horsepower: 657,
    acceleration: '3.3s',
    topSpeed: '306 km/h',
    luggage: 4,
    driveType: 'AWD',
    doors: 5,
    badge: 'HOT DEAL',
    description: 'The Super SUV redefined with lightweight carbon-fiber hood, aggressive aero fins, Akrapovič titanium exhaust, and adrenaline-inducing Rally mode.',
    includedFeatures: ['Akrapovič Titanium Exhaust', 'Carbon Fiber Exterior Package', 'Bang & Olufsen 3D Sound', 'Rally Drive Mode', 'Doorstep Delivery'],
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'cadillac-escalade-esv',
    name: 'Cadillac Escalade ESV Sport Platinum',
    brand: 'Cadillac',
    category: '7-SEATER',
    year: 2025,
    pricePerDay: 620,
    securityDeposit: 1500,
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '6.2L V8 EcoTec3',
    horsepower: 420,
    acceleration: '5.9s',
    topSpeed: '210 km/h',
    luggage: 6,
    driveType: '4WD',
    doors: 5,
    badge: 'MOST POPULAR',
    description: 'Unmatched 7-passenger grand luxury with extended wheelbase. Curved 38-inch OLED display, AKG Studio Reference 36-speaker sound, and executive captain chairs.',
    includedFeatures: ['38-inch Curved OLED Cockpit', '36-Speaker AKG Studio Sound', 'Rear Dual Entertainment 12.6"', 'Panoramic Sunroof', 'Full Luggage Capacity'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'mercedes-maybach-s680',
    name: 'Mercedes-Maybach S680 V12 First Class',
    brand: 'Mercedes-Benz',
    category: 'LUXURY',
    year: 2025,
    pricePerDay: 1200,
    securityDeposit: 3000,
    seats: 4,
    transmission: '9G-Tronic',
    fuel: 'V12 Petrol',
    engine: '6.0L BiTurbo V12 4MATIC',
    horsepower: 621,
    acceleration: '4.4s',
    topSpeed: '250 km/h',
    luggage: 3,
    driveType: 'AWD',
    doors: 4,
    badge: 'VIP EXCLUSIVE',
    description: 'First-Class travel on four wheels. Two-tone bespoke paint, reclining executive rear suites with hot stone massage, silver-plated flutes, and active noise canceling.',
    includedFeatures: ['First-Class Rear Executive Suite', 'Refrigerated Compartment', 'Burmester 4D Surround Sound', 'Rear Axle Steering', 'Chauffeur Option Available'],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'range-rover-autobiography',
    name: 'Range Rover SV Autobiography Long Wheelbase',
    brand: 'Land Rover',
    category: 'SUV',
    year: 2025,
    pricePerDay: 750,
    securityDeposit: 2000,
    seats: 5,
    transmission: 'Automatic 8-Speed',
    fuel: 'Twin-Turbo Petrol',
    engine: '4.4L Twin-Turbo V8',
    horsepower: 523,
    acceleration: '4.6s',
    topSpeed: '250 km/h',
    luggage: 4,
    driveType: 'AWD',
    doors: 5,
    badge: 'HOT DEAL',
    description: 'Peerless refinement and peerless capability. Executive Class Comfort Plus seating, Meridian Signature sound, and electronic air suspension for floating ride quality.',
    includedFeatures: ['SV Serenity Theme', 'Executive Class Comfort Plus', 'Meridian Signature Sound (1600W)', 'All-Wheel Steering', 'Airport Terminal Delivery'],
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'bmw-m5-competition',
    name: 'BMW M5 Competition Sedan',
    brand: 'BMW',
    category: 'PREMIUM',
    year: 2025,
    pricePerDay: 540,
    securityDeposit: 1500,
    seats: 5,
    transmission: 'Automatic 8-Speed',
    fuel: 'Hybrid',
    engine: '4.4L M TwinPower V8 + e-Motor',
    horsepower: 717,
    acceleration: '3.4s',
    topSpeed: '305 km/h',
    luggage: 3,
    driveType: 'AWD',
    doors: 4,
    badge: 'NEW 2025',
    description: 'The super-sedan supreme. Electrified M Hybrid architecture delivering relentless acceleration, carbon ceramic brakes, and M xDrive switchable to pure rear-wheel drive.',
    includedFeatures: ['M Driver Package', 'Bowers & Wilkins Diamond Surround', 'Carbon Fiber Roof', 'M Compound Brakes', 'Curved Display OS 8.5'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'mercedes-v-class-vip',
    name: 'Mercedes-Benz V-Class VIP Jet Edition',
    brand: 'Mercedes-Benz',
    category: '7-SEATER',
    year: 2025,
    pricePerDay: 480,
    securityDeposit: 1200,
    seats: 7,
    transmission: '9G-Tronic',
    fuel: 'Petrol',
    engine: '2.0L Turbocharged 4-Cylinder',
    horsepower: 231,
    acceleration: '7.8s',
    topSpeed: '210 km/h',
    luggage: 6,
    driveType: 'RWD',
    doors: 5,
    badge: 'ZERO DEPOSIT',
    description: 'Private aviation luxury on four wheels. Partition screen with 42-inch smart television, reclining Maybach-style massage seats, PlayStation 5, and refrigerated bar.',
    includedFeatures: ['Private Jet Partition', '42-inch 4K Cinema Display', 'Reclining Maybach Ottoman Seats', 'Mini Bar & Espresso Maker', 'Professional Driver Option'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'audi-rs6-avant',
    name: 'Audi RS6 Avant Carbon Black',
    brand: 'Audi',
    category: 'PREMIUM',
    year: 2025,
    pricePerDay: 490,
    securityDeposit: 1500,
    seats: 5,
    transmission: 'Automatic 8-Speed',
    fuel: 'Twin-Turbo Petrol',
    engine: '4.0L Twin-Turbo V8 Mild Hybrid',
    horsepower: 621,
    acceleration: '3.3s',
    topSpeed: '305 km/h',
    luggage: 5,
    driveType: 'AWD',
    doors: 5,
    badge: 'HOT DEAL',
    description: 'The ultimate wolf in sheep clothing. Wide-body stance, twin-turbo V8 thrust, legendary Quattro grip, and vast estate wagon luggage capacity for luxury road trips.',
    includedFeatures: ['RS Dynamic Package Plus', 'Bang & Olufsen Advanced Sound', 'Valcona Leather RS Seats', 'HD Matrix LED Headlights', 'All-Wheel Steering'],
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'tesla-model-s-plaid',
    name: 'Tesla Model S Plaid Tri-Motor',
    brand: 'Tesla',
    category: 'PREMIUM',
    year: 2025,
    pricePerDay: 380,
    securityDeposit: 1000,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    engine: 'Tri-Motor All-Wheel Drive',
    horsepower: 1020,
    acceleration: '1.99s',
    topSpeed: '322 km/h',
    luggage: 4,
    driveType: 'AWD',
    doors: 5,
    badge: 'NEW 2025',
    description: 'The fastest accelerating production car in existence. 1,020 horsepower tri-motor powertrain, yoke steering, carbon-sleeved rotors, and 600km range.',
    includedFeatures: ['Full Self-Driving Capability (Supervised)', 'Gaming Computer 10 Teraflops', 'Yoke Steering Wheel', '22-Speaker Premium Sound', 'Free Supercharging Included'],
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'bmw-330i-m-sport',
    name: 'BMW 330i M-Sport Shadowline',
    brand: 'BMW',
    category: 'ECONOMY',
    year: 2025,
    pricePerDay: 145,
    securityDeposit: 600,
    seats: 5,
    transmission: 'Automatic 8-Speed',
    fuel: 'Petrol',
    engine: '2.0L TwinPower Turbo 4-Cylinder',
    horsepower: 255,
    acceleration: '5.6s',
    topSpeed: '250 km/h',
    luggage: 3,
    driveType: 'RWD',
    doors: 4,
    badge: 'ZERO DEPOSIT',
    description: 'Smart executive mobility with dynamic sports pedigree. M Aerodynamic package, iDrive 8 curved screen, sports suspension, and superior fuel economy.',
    includedFeatures: ['M Sport Aerodynamics', 'BMW Live Cockpit Professional', 'Wireless Apple CarPlay & Android Auto', 'Parking Assistant Plus', 'Zero Hidden Fees'],
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'audi-a4-s-line',
    name: 'Audi A4 S-Line Quattro',
    brand: 'Audi',
    category: 'ECONOMY',
    year: 2025,
    pricePerDay: 135,
    securityDeposit: 600,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    engine: '2.0L TFSI Turbocharged Quattro',
    horsepower: 201,
    acceleration: '6.4s',
    topSpeed: '240 km/h',
    luggage: 3,
    driveType: 'AWD',
    doors: 4,
    badge: 'MOST POPULAR',
    description: 'Refined German engineering for daily luxury travel. Quattro all-wheel drive, Audi virtual cockpit, acoustic glass, and premium leather interior.',
    includedFeatures: ['Audi Virtual Cockpit Plus', 'Matrix LED Headlights', 'Quattro All-Wheel Drive', 'Heated Leather Sports Seats', 'Complimentary Child Seat Option'],
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85'
    ]
  }
]
