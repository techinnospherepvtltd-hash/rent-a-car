export interface LocationHub {
  id: string
  name: string
  type: 'Flagship Showroom' | 'Airport VIP Hub' | 'Concierge Station' | 'Direct Delivery'
  address: string
  hours: string
  phone: string
  coordinates: { lat: number; lng: number }
  features: string[]
  badge?: string
}

export interface ServiceItem {
  id: string
  title: string
  shortDesc: string
  fullDesc: string
  iconName: string
  popular?: boolean
  features: string[]
}

export interface TestimonialItem {
  id: string
  author: string
  role: string
  company?: string
  location: string
  avatar: string
  rating: number
  vehicleRented: string
  date: string
  quote: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: 'Booking' | 'Requirements' | 'Pricing' | 'Locations'
}

export const COMPANY_INFO = {
  name: 'N10 Rent A Car',
  tagline: 'Drive The Car You Deserve',
  subtitle: 'Premium cars. Flexible rentals. Exceptional journeys.',
  phone: '+1 (800) 555-0199',
  phoneClean: '+18005550199',
  whatsapp: '+1 (800) 555-0199',
  whatsappUrl: 'https://wa.me/18005550199?text=Hello%20N10%20Rent%20A%20Car%2C%20I%20would%20like%20to%20inquire%20about%20renting%20a%20luxury%20vehicle.',
  email: 'concierge@n10rentacar.com',
  corporateEmail: 'corporate@n10rentacar.com',
  address: 'Grand Luxury Boulevard, Suite 100, Downtown Hub',
  city: 'Beverly Hills / Downtown Metro',
  hours: 'Open 24 Hours / 7 Days a Week',
  yearEstablished: 2012,
  yearsOfExperience: '12+',
  fleetCount: '500+',
  happyCustomers: '10K+',
  supportHours: '24/7 Dedicated Concierge'
}

export const LOCATION_HUBS: LocationHub[] = [
  {
    id: 'downtown-flagship',
    name: 'Downtown Flagship Lounge & Showroom',
    type: 'Flagship Showroom',
    address: 'Grand Luxury Boulevard, Suite 100, Downtown Hub',
    hours: '24/7 Client Lounge & Key Handover',
    phone: '+1 (800) 555-0199',
    coordinates: { lat: 34.0736, lng: -118.4003 },
    features: ['Private VIP Fitting Lounge', 'Complimentary Barista & Champagne', 'Direct Drive-Away Valet', 'Supercharging Stations'],
    badge: 'FLAGSHIP'
  },
  {
    id: 'airport-terminal-1',
    name: 'International Airport Terminal 1 VIP Valet',
    type: 'Airport VIP Hub',
    address: 'Arrivals Level - VIP Curbside Bay 4, Terminal 1',
    hours: '24/7 Flight Meet & Greet',
    phone: '+1 (800) 555-0199',
    coordinates: { lat: 33.9416, lng: -118.4085 },
    features: ['Flight Tracking & Dynamic Meet', 'Curbside Handover in 90 Seconds', 'Luggage Assistance', 'Zero Terminal Wait Time'],
    badge: 'AIRPORT VIP'
  },
  {
    id: 'airport-terminal-3',
    name: 'International Airport Terminal 3 / Private Jet Terminal',
    type: 'Airport VIP Hub',
    address: 'Signature Flight Support & VIP Tarmac Access',
    hours: '24/7 On-Demand Tarmac Service',
    phone: '+1 (800) 555-0199',
    coordinates: { lat: 33.9425, lng: -118.4110 },
    features: ['Direct Tarmac Car Delivery', 'FBO Private Aviation Coordination', 'Chauffeur On-Demand', 'High Security Protocol'],
    badge: 'PRIVATE JET'
  },
  {
    id: 'marina-waterfront',
    name: 'Waterfront Marina Pier & Yacht Club Concierge',
    type: 'Concierge Station',
    address: 'Marina Promenade, Pier 7 Luxury Berth Hub',
    hours: '8:00 AM – 11:00 PM Daily',
    phone: '+1 (800) 555-0199',
    coordinates: { lat: 33.9803, lng: -118.4517 },
    features: ['Yacht-to-Supercar Transfers', 'Sunset Drive Specialists', 'Valet Parking', 'Coastal Route Guides'],
    badge: 'WATERFRONT'
  },
  {
    id: 'hotel-villa-delivery',
    name: 'Doorstep Hotel & Private Villa Delivery',
    type: 'Direct Delivery',
    address: 'Direct Handover to Any Luxury Hotel or Residence within 50km',
    hours: '24/7 Scheduled White-Glove Handover',
    phone: '+1 (800) 555-0199',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    features: ['Vehicle Delivered Sanitized & Polished', 'Full Tank Fuel / 100% Charge', 'Personal Vehicle Orientation', 'Return Collection Anywhere'],
    badge: 'WHITE-GLOVE'
  }
]

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'car-rental',
    title: 'Car Rental',
    shortDesc: 'Daily and weekend rentals for high-end personal driving and city cruising.',
    fullDesc: 'Select from our premier fleet for day-to-day luxury, weekend escapes, or special events with zero mileage anxiety and full insurance coverage.',
    iconName: 'Car',
    popular: true,
    features: ['Flexible 24-Hour Rental Cycles', 'Complimentary 250km / day allowance', 'Instant Confirmation', 'Sanitized & Hand-Polished']
  },
  {
    id: 'luxury-car-rental',
    title: 'Luxury Car Rental',
    shortDesc: 'Exclusive access to the world’s most prestigious marques: Rolls-Royce, Maybach, and Bentley.',
    fullDesc: 'Command the grandest luxury sedans and limousines designed for uncompromised prestige, executive discretion, and unrivaled comfort.',
    iconName: 'Crown',
    popular: true,
    features: ['Bespoke Leather & Starlight Headliners', 'First-Class Reclining Seats', 'Champagne Chiller Amenities', 'Discreet VIP Delivery']
  },
  {
    id: 'supercar-sports',
    title: 'Supercar & Sports Rentals',
    shortDesc: 'Feel pure adrenaline with Porsche GT3 RS, Ferrari, and Lamborghini.',
    fullDesc: 'Engineered for speed and sensory ecstasy. Every supercar in our fleet is maintained to track-ready standards with carbon ceramic brakes and active aero.',
    iconName: 'Gauge',
    popular: true,
    features: ['700+ Horsepower Machinery', 'Launch Control & Sport Exhaust', 'Track-Trained Handover Specialist', 'Complimentary GoPro Mount']
  },
  {
    id: 'suv-7-seater',
    title: 'SUV & 7-Seater Rentals',
    shortDesc: 'Spacious power with Cadillac Escalade ESV, G-Wagon, and Range Rover SV.',
    fullDesc: 'Travel in commanding safety and boundless comfort. Ideal for families, delegations, ski trips, and luxury group transportation.',
    iconName: 'ShieldCheck',
    features: ['Captain Chairs & Dual 4K Screens', 'Vast Luggage Cargo Volume', 'All-Wheel Drive Capability', 'Child Safety Seats Available']
  },
  {
    id: 'corporate-rentals',
    title: 'Corporate & Executive Rentals',
    shortDesc: 'Tailored mobility solutions for businesses, executive visitors, and corporate VIPs.',
    fullDesc: 'Streamlined account management, priority reservation access, consolidated monthly tax invoicing, and flexible multi-vehicle fleet allocations.',
    iconName: 'Briefcase',
    features: ['Dedicated Account Director', 'Consolidated Billing & GST/VAT Invoicing', 'No-Deposit Corporate Accounts', 'VIP Client Meet & Greet']
  },
  {
    id: 'airport-pickup',
    title: 'Airport VIP Pickup & Drop-Off',
    shortDesc: 'Skip lines with flight-monitored curbside handover at airport terminals.',
    fullDesc: 'Your luxury car will be waiting right at the terminal curbside or private aviation tarmac the moment your wheels touch down. Zero counter wait.',
    iconName: 'Plane',
    features: ['Real-Time Commercial & FBO Flight Tracking', 'VIP Curbside Valet in 90 Seconds', 'Luggage Assistance', 'Flight Delay Guarantee']
  },
  {
    id: 'chauffeur-services',
    title: 'Chauffeur Services',
    shortDesc: 'Licensed, uniformed executive chauffeurs for effortless point-to-point travel.',
    fullDesc: 'Relax in the rear lounge while our professionally trained chauffeurs handle navigation, city traffic, and executive schedules with utmost discretion.',
    iconName: 'UserCheck',
    features: ['Security-Vetted Professional Chauffeurs', 'Multilingual Concierge Staff', 'Hourly As-Directed Bookings', 'Complimentary Refreshments']
  },
  {
    id: 'long-term-rental',
    title: 'Long-Term & Monthly Leasing',
    shortDesc: 'Substantial savings on weekly, monthly, and seasonal luxury vehicle rentals.',
    fullDesc: 'Enjoy the perks of luxury car ownership without long-term depreciation, insurance hurdles, or maintenance headaches. Swap models every 30 days.',
    iconName: 'CalendarCheck',
    features: ['Discounts Up to 40% Off Daily Rates', 'Vehicle Swap Options Monthly', 'Full Maintenance & Tire Wear Included', 'Comprehensive Premium Insurance']
  }
]

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    author: 'Alexander Vance',
    role: 'Managing Partner',
    company: 'Apex Horizon Capital',
    location: 'New York / Beverly Hills',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    vehicleRented: 'Rolls-Royce Ghost Black Badge',
    date: 'Verified VIP Rental • October 2026',
    quote: 'N10 Rent A Car operates on another level. The Ghost was delivered directly to our private jet hangar spotless and fueled. The concierge walked us through the bespoke features in two minutes flat. Immaculate service.'
  },
  {
    id: 't-2',
    author: 'Elena Rostova',
    role: 'Creative Director',
    company: 'Maison Lumière',
    location: 'Monaco / London',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    vehicleRented: 'Porsche 911 GT3 RS',
    date: 'Verified VIP Rental • September 2026',
    quote: 'Finding a genuine 992 GT3 RS in pristine mechanical condition for a coastal weekend seemed impossible until I contacted N10. Zero friction booking, crystal clear terms, and the car performed flawlessly through every canyon curve.'
  },
  {
    id: 't-3',
    author: 'Marcus Sterling',
    role: 'Chief Technology Officer',
    company: 'Vanguard Cyber Tech',
    location: 'Silicon Valley',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    vehicleRented: 'Cadillac Escalade ESV Sport Platinum',
    date: 'Verified VIP Rental • October 2026',
    quote: 'We booked the Escalade ESV for a 5-day executive summit with international investors. The 38-inch curved display, spacious captain seating, and white-glove airport handover made a tremendous impression on our delegation.'
  },
  {
    id: 't-4',
    author: 'Sophia Chen',
    role: 'Architectural Director',
    company: 'Studio Chen & Partners',
    location: 'Singapore / Los Angeles',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    vehicleRented: 'Mercedes-AMG G63 Stronger Edition',
    date: 'Verified VIP Rental • August 2026',
    quote: 'The G63 is a presence machine. What impressed me most was N10’s transparent pricing — the price shown on the screen was exactly the amount charged. No hidden cleaning fees, no surprise insurance traps. True luxury trust.'
  }
]

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Requirements',
    question: 'What documents are required to rent a vehicle?',
    answer: 'For domestic renters: A valid driver’s license (held for at least 1–2 years depending on supercar category) and a major credit card in the primary renter’s name. For international visitors: An international driving permit (or recognized domestic license in English), a valid passport, and an entry stamp or tourist visa. Our team verifies your documentation digitally in advance so your handover takes less than two minutes.'
  },
  {
    id: 'faq-2',
    category: 'Booking',
    question: 'What is the minimum rental period?',
    answer: 'Our standard minimum rental duration is 24 hours. However, we also provide specialized 4-hour and 8-hour executive packages for commercial photo shoots, weddings, and VIP corporate escorts upon inquiry with our concierge desk.'
  },
  {
    id: 'faq-3',
    category: 'Booking',
    question: 'Can I extend my rental while on the road?',
    answer: 'Absolutely. Rental extensions can be arranged effortlessly by contacting your assigned 24/7 concierge via WhatsApp or phone. As long as the vehicle is not reserved for another client immediately following your term, we will extend your contract at our favorable daily or multi-day rates.'
  },
  {
    id: 'faq-4',
    category: 'Pricing',
    question: 'Is a security deposit required, and how is it handled?',
    answer: 'Yes, a refundable security deposit is placed as a pre-authorization hold on your credit card at the time of vehicle handover. Deposits range from $600 for executive sedans to $3,500 for exotic supercars and Rolls-Royce models. The hold is automatically released within 7 to 14 business days after return following vehicle inspection and standard toll/traffic clearance.'
  },
  {
    id: 'faq-5',
    category: 'Pricing',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), wire bank transfers, debit cards (for select vehicle classes), and cryptocurrency payments (BTC, ETH, USDT) via our secure corporate checkout channel.'
  },
  {
    id: 'faq-6',
    category: 'Locations',
    question: 'Can I choose a different pickup and drop-off location?',
    answer: 'Yes, one-way rentals and split locations are fully supported. You can collect your car at the International Airport VIP terminal and return it to your hotel, private villa, or our Downtown Flagship showroom. Simply select different pickup and drop-off locations when reserving.'
  },
  {
    id: 'faq-7',
    category: 'Pricing',
    question: 'Is there a mileage limit on rentals?',
    answer: 'Our daily rentals include a generous standard allowance of 250 kilometers (approximately 155 miles) per day, which accumulates across your entire booking period. Extra kilometers are billed at a clear, nominal per-kilometer rate. Unlimited mileage packages are also available upon request for multi-day rentals.'
  },
  {
    id: 'faq-8',
    category: 'Booking',
    question: 'What is your cancellation policy?',
    answer: 'We offer full flexibility. Cancellations made at least 48 hours prior to your scheduled pickup time receive a 100% refund or full reservation credit. For cancellations within 24–48 hours, a single-day deposit applies, or you can reschedule your dates anytime within 12 months with zero penalty.'
  },
  {
    id: 'faq-9',
    category: 'Locations',
    question: 'Do you offer airport pickup and tarmac delivery?',
    answer: 'Yes. Our Airport VIP Valet service monitors your flight in real time. As soon as you exit baggage claim or step off your private aircraft at the FBO, our representative will be waiting curbside with your vehicle cooled, luggage loaded, and keys in hand.'
  },
  {
    id: 'faq-10',
    category: 'Booking',
    question: 'Can I rent a car for long-term or monthly use?',
    answer: 'Yes, our N10 Platinum Monthly Subscription and Long-Term Lease programs provide significant cost savings of up to 40% compared to standard daily rates. Monthly clients also enjoy complimentary vehicle exchanges every 30 days, bundled comprehensive maintenance, and dedicated account support.'
  }
]
