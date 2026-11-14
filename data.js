/**
 * ShowCase – Product Showcase Platform
 * data.js: Initial data structures, mock database, and localStorage persistence layer.
 * 
 * Free Web Development Internship – Data Alcott Systems
 * Task ID: WD-SW-003 (Product Showcase Platform)
 */

// ==========================================================================
// 1. CATEGORIES DATA MODEL
// ==========================================================================
// Main categories and sub-categories structured with parent_id for mega-menu and filtering.
const INITIAL_CATEGORIES = [
  // Main Categories
  {
    id: "cat-electronics",
    name: "Electronics",
    icon: "💻",
    faIcon: "fa-laptop",
    description: "Cutting-edge personal electronics, audio gear, wearables, and high-performance laptops.",
    parent_id: null
  },
  {
    id: "cat-fashion",
    name: "Fashion",
    icon: "👕",
    faIcon: "fa-shirt",
    description: "Contemporary, sustainable apparel, footwear, and designer accessories.",
    parent_id: null
  },
  {
    id: "cat-books",
    name: "Books",
    icon: "📚",
    faIcon: "fa-book-open",
    description: "Curated selections in software engineering, leadership, business, and speculative fiction.",
    parent_id: null
  },
  {
    id: "cat-home",
    name: "Home & Living",
    icon: "🏠",
    faIcon: "fa-house",
    description: "Smart automation devices, modern furniture, and culinary appliances for comfortable living.",
    parent_id: null
  },
  {
    id: "cat-sports",
    name: "Sports & Outdoors",
    icon: "🎯",
    faIcon: "fa-futbol",
    description: "Elite fitness equipment, rugged outdoor camping gear, and athletic mobility.",
    parent_id: null
  },
  {
    id: "cat-gaming",
    name: "Gaming",
    icon: "🎮",
    faIcon: "fa-gamepad",
    description: "Competitive gaming rigs, RGB mechanical gear, and immersive VR headsets.",
    parent_id: null
  },

  // Sub-Categories: Electronics
  { id: "sub-audio", name: "Audio & Headphones", icon: "🎧", parent_id: "cat-electronics" },
  { id: "sub-wearables", name: "Smart Wearables", icon: "⌚", parent_id: "cat-electronics" },
  { id: "sub-laptops", name: "Laptops & Computing", icon: "💻", parent_id: "cat-electronics" },

  // Sub-Categories: Fashion
  { id: "sub-men", name: "Men's Apparel", icon: "👔", parent_id: "cat-fashion" },
  { id: "sub-women", name: "Women's Apparel", icon: "👗", parent_id: "cat-fashion" },
  { id: "sub-acc", name: "Footwear & Accessories", icon: "👟", parent_id: "cat-fashion" },

  // Sub-Categories: Books
  { id: "sub-tech", name: "Technology & Coding", icon: "💻", parent_id: "cat-books" },
  { id: "sub-business", name: "Business & Leadership", icon: "📈", parent_id: "cat-books" },
  { id: "sub-fiction", name: "Fiction & Sci-Fi", icon: "🚀", parent_id: "cat-books" },

  // Sub-Categories: Home & Living
  { id: "sub-smarthome", name: "Smart Home & Lighting", icon: "💡", parent_id: "cat-home" },
  { id: "sub-kitchen", name: "Kitchen & Dining", icon: "☕", parent_id: "cat-home" },
  { id: "sub-furniture", name: "Ergonomic Furniture", icon: "🪑", parent_id: "cat-home" },

  // Sub-Categories: Sports & Outdoors
  { id: "sub-fitness", name: "Fitness & Training", icon: "🏋️", parent_id: "cat-sports" },
  { id: "sub-outdoor", name: "Outdoor Gear & Hiking", icon: "🏕️", parent_id: "cat-sports" },
  { id: "sub-cycling", name: "Cycling & Mobility", icon: "🚲", parent_id: "cat-sports" },

  // Sub-Categories: Gaming
  { id: "sub-consoles", name: "Gaming Consoles & Systems", icon: "🕹️", parent_id: "cat-gaming" },
  { id: "sub-peripherals", name: "Gaming Peripherals", icon: "⌨️", parent_id: "cat-gaming" },
  { id: "sub-vr", name: "VR & Mixed Reality", icon: "🥽", parent_id: "cat-gaming" }
];

// ==========================================================================
// 2. BRANDS DATA MODEL
// ==========================================================================
const INITIAL_BRANDS = [
  {
    id: "brand-audiotech",
    name: "AudioTech",
    logo: "🎧",
    tagline: "Sound in its Purest Form",
    description: "Pioneering high-fidelity acoustic engineering, spatial audio, and hybrid active noise cancellation.",
    country: "Germany",
    category: "cat-electronics"
  },
  {
    id: "brand-weartech",
    name: "WearTech",
    logo: "⌚",
    tagline: "Biometrics Meets Elegance",
    description: "Smart wearable tech with medical-grade health monitoring and battery life that outlasts the week.",
    country: "Switzerland",
    category: "cat-electronics"
  },
  {
    id: "brand-novacompute",
    name: "NovaCompute",
    logo: "💻",
    tagline: "Unleash Pure Performance",
    description: "Next-gen ultralight workstations tailored for engineers, digital creators, and AI researchers.",
    country: "USA",
    category: "cat-electronics"
  },
  {
    id: "brand-urbanstyle",
    name: "UrbanStyle",
    logo: "👕",
    tagline: "Sustainable Street Elegance",
    description: "Crafted with 100% organic and recycled textiles for durable, breathable all-season wear.",
    country: "Sweden",
    category: "cat-fashion"
  },
  {
    id: "brand-nexushome",
    name: "NexusHome",
    logo: "🏠",
    tagline: "Smart Living, Simplified",
    description: "Seamless Matter-compatible home automation and ergonomic interior craftsmanship.",
    country: "Japan",
    category: "cat-home"
  },
  {
    id: "brand-aerofit",
    name: "AeroFit",
    logo: "🎯",
    tagline: "Engineered for Peak Endurance",
    description: "Commercial-grade fitness training hardware and weather-sealed alpine adventure equipment.",
    country: "Canada",
    category: "cat-sports"
  },
  {
    id: "brand-titanplay",
    name: "TitanPlay",
    logo: "🎮",
    tagline: "Victory by Precision",
    description: "Tournament-grade esports peripherals featuring optical mechanical switches and sub-millisecond polling.",
    country: "South Korea",
    category: "cat-gaming"
  }
];

// ==========================================================================
// 3. PRODUCTS DATA MODEL (At least 15 products, rich details & specs)
// ==========================================================================
const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Wireless Headphones Pro",
    brand: "AudioTech",
    category: "cat-electronics",
    subcategory: "sub-audio",
    price: 199.99,
    rating: 4.8,
    stock_status: "In Stock",
    badges: ["Best Seller", "Featured"],
    description: "Flagship wireless over-ear headphones featuring Hybrid Active Noise Cancellation, custom 40mm titanium dynamic drivers, and up to 45 hours of continuous playback.",
    features: [
      "Hybrid Active Noise Cancellation with Transparency Mode",
      "Custom 40mm Titanium Drivers delivering Hi-Res certified audio",
      "45-Hour Battery Life with USB-C Quick Charge (5 mins = 4 hrs)",
      "Multipoint Bluetooth 5.3 connection to phone and laptop",
      "Memory foam ear cushions wrapped in breathable protein leather"
    ],
    specifications: {
      "Driver Size": "40mm Titanium Dynamic",
      "Frequency Response": "10Hz - 40,000Hz",
      "Bluetooth Version": "5.3 (AAC, LDAC, SBC)",
      "Battery Capacity": "850 mAh Li-ion",
      "Weight": "250g",
      "Warranty": "2 Years International"
    },
    images: [
      { emoji: "🎧", bg: "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)", label: "Studio Black" },
      { emoji: "🎧", bg: "linear-gradient(135deg, #A78BFA 0%, #6D28D9 100%)", label: "Titanium Silver" },
      { emoji: "🎧", bg: "linear-gradient(135deg, #C4B5FD 0%, #7C3AED 100%)", label: "Deep Violet" }
    ],
    tags: ["audio", "wireless", "anc", "headphones", "hi-res"],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "prod-2",
    name: "Smart Watch Series 5",
    brand: "WearTech",
    category: "cat-electronics",
    subcategory: "sub-wearables",
    price: 299.00,
    rating: 4.7,
    stock_status: "In Stock",
    badges: ["New Arrival", "Best Seller"],
    description: "Next-generation smartwatch featuring an ultra-bright Always-On AMOLED sapphire display, continuous ECG monitoring, dual-band GPS, and 50m water resistance.",
    features: [
      "1.43-inch Sapphire Glass Always-On AMOLED screen (1000 nits)",
      "Continuous Blood Oxygen (SpO2) and ECG health analytics",
      "Dual-frequency multi-satellite GPS for ultra-accurate trail tracking",
      "Over 120 professional workout profiles with auto-detection",
      "7-Day Battery life in standard mode, 14 days in battery saver"
    ],
    specifications: {
      "Display": "1.43\" AMOLED 466x466",
      "Water Resistance": "5 ATM / 50 meters",
      "Sensors": "Optical Heart Rate, ECG, SpO2, Barometer",
      "Connectivity": "Wi-Fi 5GHz, Bluetooth 5.3, NFC",
      "Strap Size": "22mm Quick Release",
      "Weight": "48g (without strap)"
    },
    images: [
      { emoji: "⌚", bg: "linear-gradient(135deg, #6366F1 0%, #3730A3 100%)", label: "Space Obsidian" },
      { emoji: "⌚", bg: "linear-gradient(135deg, #818CF8 0%, #4338CA 100%)", label: "Platinum Edition" },
      { emoji: "⌚", bg: "linear-gradient(135deg, #C7D2FE 0%, #6366F1 100%)", label: "Rose Gold Accent" }
    ],
    tags: ["watch", "smartwatch", "fitness", "gps", "health"],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "prod-3",
    name: "UltraBook Pro 15",
    brand: "NovaCompute",
    category: "cat-electronics",
    subcategory: "sub-laptops",
    price: 1299.99,
    rating: 4.9,
    stock_status: "In Stock",
    badges: ["Featured"],
    description: "Ultra-thin 15.6-inch CNC aluminum workstation engineered for software developers, content creators, and power users seeking workstation speed in a 1.3kg chassis.",
    features: [
      "15.6-inch 3.2K OLED 120Hz display with 100% DCI-P3 color gamut",
      "Next-Gen 16-Core AI processor with dedicated NPU neural engine",
      "32GB LPDDR5X 7500MHz RAM and 1TB PCIe 4.0 NVMe SSD",
      "Thunderbolt 4, HDMI 2.1, SD Card Reader, and Wi-Fi 7",
      "Vapor chamber cooling system running silently under heavy workloads"
    ],
    specifications: {
      "Screen": "15.6\" 3.2K OLED 120Hz (3200x2000)",
      "RAM": "32GB LPDDR5X",
      "Storage": "1TB Gen4 NVMe M.2 SSD",
      "Battery": "86Wh (Up to 16 Hours)",
      "Ports": "2x Thunderbolt 4, 1x USB-A 3.2, HDMI 2.1",
      "Weight": "1.38 kg"
    },
    images: [
      { emoji: "💻", bg: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)", label: "Lunar Gray" },
      { emoji: "💻", bg: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)", label: "Matte Black" }
    ],
    tags: ["laptop", "ultrabook", "oled", "developer", "computing"],
    demoVideo: ""
  },
  {
    id: "prod-4",
    name: "Classic Denim Jacket",
    brand: "UrbanStyle",
    category: "cat-fashion",
    subcategory: "sub-men",
    price: 89.50,
    rating: 4.5,
    stock_status: "In Stock",
    badges: ["Best Seller"],
    description: "A heritage trucker jacket crafted from 13.5oz organic ring-spun cotton denim. Pre-washed for a soft broken-in feel with timeless copper brass button accents.",
    features: [
      "100% Certified Organic Cotton ring-spun denim",
      "Reinforced double-needle stitching along stress seams",
      "Four functional utility pockets including interior chest slip",
      "Vintage indigo wash created using water-saving ozone technology"
    ],
    specifications: {
      "Material": "100% Organic Denim Cotton (13.5 oz)",
      "Fit": "Regular Tailored Fit",
      "Closure": "Heavy-Duty Brass Shank Buttons",
      "Care": "Machine wash cold inside out",
      "Origin": "Designed in Stockholm"
    },
    images: [
      { emoji: "🧥", bg: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)", label: "Vintage Blue" },
      { emoji: "🧥", bg: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)", label: "Faded Indigo" }
    ],
    tags: ["denim", "jacket", "fashion", "organic", "menswear"],
    demoVideo: ""
  },
  {
    id: "prod-5",
    name: "Silk Breeze Evening Dress",
    brand: "UrbanStyle",
    category: "cat-fashion",
    subcategory: "sub-women",
    price: 145.00,
    rating: 4.6,
    stock_status: "Limited Stock",
    badges: ["New Arrival"],
    description: "Luxurious mulberry silk blend evening gown tailored with an asymmetric drape neckline, concealed side zip, and subtle flutter hem for graceful movement.",
    features: [
      "70% Mulberry Silk, 30% Eco-Modal natural blend",
      "Breathable moisture-wicking weave for year-round galas",
      "Wrinkle-resistant weave requiring minimal steaming",
      "Artisan French seams for smooth skin contact"
    ],
    specifications: {
      "Fabric": "70% Silk, 30% Eco-Modal",
      "Length": "Midi / Ankle drape",
      "Lining": "100% Viscose breathable lining",
      "Care": "Dry clean or delicate cold hand wash"
    },
    images: [
      { emoji: "👗", bg: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)", label: "Orchid Violet" },
      { emoji: "👗", bg: "linear-gradient(135deg, #F472B6 0%, #DB2777 100%)", label: "Blush Champagne" }
    ],
    tags: ["dress", "silk", "evening", "fashion", "sustainable"],
    demoVideo: ""
  },
  {
    id: "prod-6",
    name: "Retro Heritage Sneakers",
    brand: "UrbanStyle",
    category: "cat-fashion",
    subcategory: "sub-acc",
    price: 110.00,
    rating: 4.7,
    stock_status: "In Stock",
    badges: ["Featured"],
    description: "Casual low-top court sneakers featuring supple Italian nappa leather, natural gum rubber cupsole, and antimicrobial cork cushioned insoles.",
    features: [
      "Full-grain sustainably tanned Italian leather upper",
      "Shock-absorbing natural cork and EVA molded footbed",
      "Vulcanized durable gum outsole with herringbone traction",
      "Recycled cotton laces and reinforced eyelets"
    ],
    specifications: {
      "Upper": "Full Grain Leather",
      "Sole": "100% Natural Rubber Gum",
      "Insole": "Orthopedic Cork + EVA",
      "Weight": "380g per shoe"
    },
    images: [
      { emoji: "👟", bg: "linear-gradient(135deg, #10B981 0%, #047857 100%)", label: "Cloud White / Gum" },
      { emoji: "👟", bg: "linear-gradient(135deg, #34D399 0%, #059669 100%)", label: "Forest Accent" }
    ],
    tags: ["shoes", "sneakers", "leather", "court", "footwear"],
    demoVideo: ""
  },
  {
    id: "prod-7",
    name: "Clean Architecture in Practice",
    brand: "NovaCompute",
    category: "cat-books",
    subcategory: "sub-tech",
    price: 42.00,
    rating: 4.9,
    stock_status: "In Stock",
    badges: ["Best Seller"],
    description: "A definitive software engineering manual exploring decoupled domain modeling, boundary interfaces, test-driven pipelines, and hexagonal microservices.",
    features: [
      "Over 450 pages of real-world production code diagrams",
      "Case studies comparing monoliths, microservices, and serverless",
      "Includes companion GitHub repository with full working examples",
      "High-quality lay-flat binding with bookmark ribbon"
    ],
    specifications: {
      "Format": "Hardcover / Matte Finish",
      "Pages": "488 pages",
      "Language": "English",
      "Publisher": "Data Alcott Press",
      "ISBN": "978-0134494166"
    },
    images: [
      { emoji: "📚", bg: "linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)", label: "Hardcover First Edition" },
      { emoji: "📖", bg: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)", label: "Digital Companion" }
    ],
    tags: ["book", "architecture", "coding", "software", "clean-code"],
    demoVideo: ""
  },
  {
    id: "prod-8",
    name: "Atomic Momentum & Habits",
    brand: "NovaCompute",
    category: "cat-books",
    subcategory: "sub-business",
    price: 24.99,
    rating: 4.8,
    stock_status: "In Stock",
    badges: ["Best Seller"],
    description: "A breakthrough psychology guide revealing the micro-routines that compound into monumental career leaps, deep focus states, and lifelong creative stamina.",
    features: [
      "Actionable 4-step framework: Cue, Friction, Reward, Identity",
      "Scientifically verified neuroscience and executive habit trackers",
      "Includes downloadable PDF daily accountability template"
    ],
    specifications: {
      "Format": "Paperback with Embossed Foil",
      "Pages": "320 pages",
      "Language": "English",
      "Dimensions": "6 x 9 inches"
    },
    images: [
      { emoji: "📘", bg: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", label: "Standard Edition" },
      { emoji: "📙", bg: "linear-gradient(135deg, #FBBF24 0%, #B45309 100%)", label: "Collector Foil" }
    ],
    tags: ["habits", "psychology", "business", "productivity", "mindset"],
    demoVideo: ""
  },
  {
    id: "prod-9",
    name: "Smart Ambient Light Bar Pro",
    brand: "NexusHome",
    category: "cat-home",
    subcategory: "sub-smarthome",
    price: 69.99,
    rating: 4.6,
    stock_status: "In Stock",
    badges: ["New Arrival", "Featured"],
    description: "Dual-zone ambient desktop and monitor light bar with 16 million colors, screen color sync technology, Matter Wi-Fi protocol, and touch slider controls.",
    features: [
      "Real-time screen-mirroring ambient lighting via desktop app",
      "Matter, Apple Home, Google Home, and Alexa native support",
      "Glare-free asymmetrical optical design protecting eyes",
      "Weighted aluminum base and magnetic ball-joint swivel"
    ],
    specifications: {
      "Power Output": "15 Watts (USB-C)",
      "Color Temp": "2700K - 6500K Tunable White + RGB",
      "Luminous Flux": "600 Lumens",
      "Connectivity": "Wi-Fi 2.4GHz / Matter / BLE 5.0",
      "Bar Length": "450 mm"
    },
    images: [
      { emoji: "💡", bg: "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)", label: "Dark Gunmetal" },
      { emoji: "✨", bg: "linear-gradient(135deg, #FDE047 0%, #A16207 100%)", label: "RGB Halo Glow" }
    ],
    tags: ["smart-home", "lighting", "ambient", "desk-setup", "matter"],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "prod-10",
    name: "Precision Cold Brew System",
    brand: "NexusHome",
    category: "cat-home",
    subcategory: "sub-kitchen",
    price: 79.00,
    rating: 4.7,
    stock_status: "In Stock",
    badges: ["Best Seller"],
    description: "Borosilicate glass slow-drip cold brew tower yielding smooth, low-acidity coffee concentrate with an ultra-fine 304 stainless steel laser mesh filter.",
    features: [
      "Hand-blown thermal shock resistant Borosilicate glass carafe",
      "Double-walled stainless steel laser etched fine filter mesh",
      "Airtight silicone seal locks freshness up to 14 days in fridge",
      "Adjustable flow valve for custom extraction strength"
    ],
    specifications: {
      "Capacity": "1.2 Liters (40 oz)",
      "Materials": "Borosilicate Glass, Food-Grade 304 Steel, BPA-Free Silicone",
      "Filter Mesh": "200 Micron Precision Mesh",
      "Dishwasher Safe": "Yes (Carafe & Filter)"
    },
    images: [
      { emoji: "☕", bg: "linear-gradient(135deg, #78350F 0%, #451A03 100%)", label: "Espresso Bronze" },
      { emoji: "🧊", bg: "linear-gradient(135deg, #92400E 0%, #78350F 100%)", label: "Frost Crystal" }
    ],
    tags: ["coffee", "cold-brew", "kitchen", "glass", "barista"],
    demoVideo: ""
  },
  {
    id: "prod-11",
    name: "Ergonomic Lumbar Office Chair",
    brand: "NexusHome",
    category: "cat-home",
    subcategory: "sub-furniture",
    price: 249.00,
    rating: 4.8,
    stock_status: "In Stock",
    badges: ["Featured"],
    description: "Executive mesh office chair designed with active auto-tuning dynamic lumbar support, 4D adjustable armrests, and 135-degree synchro-tilt mechanism.",
    features: [
      "Self-adjusting dynamic lumbar curve tracking your posture",
      "Aerospace-grade breathable elastomeric mesh backrest",
      "4-Directional padded armrests (Height, Angle, Depth, Width)",
      "BIFMA Class 4 hydraulic cylinder supporting up to 150kg"
    ],
    specifications: {
      "Max Capacity": "150 kg (330 lbs)",
      "Recline Range": "90° to 135° with 3 lock positions",
      "Wheel Casters": "65mm silent PU rollerblade style",
      "Warranty": "5 Year Structural Warranty"
    },
    images: [
      { emoji: "🪑", bg: "linear-gradient(135deg, #475569 0%, #1E293B 100%)", label: "Stealth Onyx" },
      { emoji: "🪑", bg: "linear-gradient(135deg, #94A3B8 0%, #334155 100%)", label: "Arctic Slate" }
    ],
    tags: ["chair", "ergonomic", "furniture", "desk", "lumbar"],
    demoVideo: ""
  },
  {
    id: "prod-12",
    name: "Adjustable Smart Dumbbell Set 24kg",
    brand: "AeroFit",
    category: "cat-sports",
    subcategory: "sub-fitness",
    price: 219.00,
    rating: 4.8,
    stock_status: "Limited Stock",
    badges: ["Best Seller"],
    description: "Compact rapid-dial adjustable dumbbell replacing 15 separate free weights. Select from 2.5kg to 24kg with an effortless single-hand twist mechanism.",
    features: [
      "Single-hand rapid dial selector switches weights in 1 second",
      "Replaces 15 pairs of traditional dumbbells to save floor space",
      "Laser-cut steel weight plates coated in high-impact quiet nylon",
      "Textured knurled steel handle for non-slip grip confidence"
    ],
    specifications: {
      "Weight Range": "2.5kg to 24kg per dumbbell (5.5 to 52.8 lbs)",
      "Increment Settings": "15 weight intervals",
      "Tray Dimensions": "42 x 21 x 22 cm",
      "Plate Material": "Solid Cast Steel with Polypropylene Shell"
    },
    images: [
      { emoji: "🏋️", bg: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)", label: "Crimson Forge" },
      { emoji: "💪", bg: "linear-gradient(135deg, #F87171 0%, #DC2626 100%)", label: "Carbon Shadow" }
    ],
    tags: ["fitness", "dumbbell", "weights", "workout", "gym"],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "prod-13",
    name: "All-Weather Alpine Backpack 45L",
    brand: "AeroFit",
    category: "cat-sports",
    subcategory: "sub-outdoor",
    price: 119.00,
    rating: 4.7,
    stock_status: "In Stock",
    badges: ["New Arrival"],
    description: "Lightweight 45-liter technical mountaineering pack built from waterproof Cordura ripstop nylon with integrated trekking pole loops and hydration sleeve.",
    features: [
      "Waterproof 420D Cordura Ripstop fabric with taped seam zippers",
      "Ergonomic aluminum internal frame distributes load to hips",
      "Dedicated 3L water bladder sleeve with insulated routing tube",
      "Concealed high-visibility rainfly pouch in bottom compartment"
    ],
    specifications: {
      "Volume": "45 Liters + 5L expandable collar",
      "Fabric": "420D Cordura Ballistic Nylon",
      "Weight": "1.15 kg empty",
      "Dimensions": "62 x 34 x 26 cm"
    },
    images: [
      { emoji: "🎒", bg: "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)", label: "Alpine Teal" },
      { emoji: "🏕️", bg: "linear-gradient(135deg, #2DD4BF 0%, #115E59 100%)", label: "Granite Storm" }
    ],
    tags: ["backpack", "hiking", "outdoor", "camping", "waterproof"],
    demoVideo: ""
  },
  {
    id: "prod-14",
    name: "Mechanical RGB Keyboard Pro",
    brand: "TitanPlay",
    category: "cat-gaming",
    subcategory: "sub-peripherals",
    price: 129.99,
    rating: 4.9,
    stock_status: "In Stock",
    badges: ["Best Seller", "Featured"],
    description: "Hot-swappable 75% mechanical esports keyboard with pre-lubed linear switches, sound-dampening silicone gasket mount, and per-key RGB backlighting.",
    features: [
      "Hot-swappable PCB compatible with 3-pin and 5-pin mechanical switches",
      "Double-shot PBT keycaps with crisp shine-through legends",
      "Gasket mount structure with Poron foam for creamy acoustic thock",
      "Multi-function programmable rotary encoder knob for volume & macros",
      "Tri-mode connectivity: 2.4GHz wireless, Bluetooth 5.1, and USB-C"
    ],
    specifications: {
      "Layout": "75% Compact (82 keys)",
      "Switches": "Titan Linear Pre-Lubed (45g actuation)",
      "Polling Rate": "1000Hz (1ms wired / 2.4G)",
      "Battery": "4000 mAh rechargeable (up to 200 hours RGB off)",
      "Weight": "960g"
    },
    images: [
      { emoji: "⌨️", bg: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)", label: "Cyber Violet" },
      { emoji: "🎮", bg: "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)", label: "Neon Twilight" }
    ],
    tags: ["keyboard", "gaming", "mechanical", "rgb", "hot-swap"],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "prod-15",
    name: "Apex Wireless Gaming Mouse 26K",
    brand: "TitanPlay",
    category: "cat-gaming",
    subcategory: "sub-peripherals",
    price: 79.99,
    rating: 4.6,
    stock_status: "In Stock",
    badges: ["New Arrival"],
    description: "Ultra-lightweight 52g symmetrical gaming mouse equipped with a flagship 26,000 DPI optical sensor, optical switches, and 100% virgin PTFE glides.",
    features: [
      "Ultralight 52-gram solid shell design without honeycomb holes",
      "Flagship 26,000 DPI Optical Sensor (650 IPS / 50G Acceleration)",
      "Optical Micro Switches rated for 90 million clicks with zero debounce delay",
      "Super-flex paracord charging cable and 80-hour battery endurance"
    ],
    specifications: {
      "Sensor": "PixArt PAW3395 26,000 DPI",
      "Weight": "52 grams",
      "Battery Life": "80 continuous hours at 1000Hz",
      "Buttons": "6 fully programmable macro buttons"
    },
    images: [
      { emoji: "🖱️", bg: "linear-gradient(135deg, #EC4899 0%, #9D174D 100%)", label: "Laser Pink" },
      { emoji: "⚡", bg: "linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)", label: "Ghost White" }
    ],
    tags: ["mouse", "gaming", "esports", "lightweight", "wireless"],
    demoVideo: ""
  },
  {
    id: "prod-16",
    name: "TitanVR Immersive Headset",
    brand: "TitanPlay",
    category: "cat-gaming",
    subcategory: "sub-vr",
    price: 499.00,
    rating: 4.8,
    stock_status: "Limited Stock",
    badges: ["Featured", "New Arrival"],
    description: "Next-generation standalone and PC-tethered VR headset featuring 4K pancake optics, inside-out 6DoF tracking, and color passthrough for mixed reality.",
    features: [
      "Dual 4K Pancake lenses (2160x2160 per eye) with 110-degree FOV",
      "Full-color high-definition stereoscopic passthrough for Mixed Reality",
      "6 Degrees of Freedom tracking with 4 integrated wide-angle optical cameras",
      "Active counterbalance battery strap for zero front-heavy strain"
    ],
    specifications: {
      "Resolution": "4320 x 2160 Combined (4K+)",
      "Refresh Rate": "90Hz / 120Hz Fast-Switch",
      "Processor": "Snapdragon XR2 Gen 2 Platform",
      "Storage": "256GB High-Speed Flash",
      "Weight": "470g balanced"
    },
    images: [
      { emoji: "🥽", bg: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)", label: "Cosmic Graphite" },
      { emoji: "🌌", bg: "linear-gradient(135deg, #818CF8 0%, #312E81 100%)", label: "Hyperion White" }
    ],
    tags: ["vr", "mixed-reality", "headset", "gaming", "4k"],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "prod-17",
    name: "SoundPulse Waterproof Speaker",
    brand: "AudioTech",
    category: "cat-electronics",
    subcategory: "sub-audio",
    price: 69.99,
    rating: 4.5,
    stock_status: "Out of Stock",
    badges: [],
    description: "Rugged 360-degree cylindrical Bluetooth speaker with IPX7 submersible waterproofing, dual passive bass radiators, and 24-hour party stamina.",
    features: [
      "IPX7 waterproof and dustproof submersible up to 1 meter for 30 mins",
      "30W dual drivers with dual opposed passive bass radiators",
      "PartyLink mode connects up to 50 speakers simultaneously",
      "Built-in power bank charging phone while playing music"
    ],
    specifications: {
      "Power Output": "30 Watts RMS",
      "Waterproof Rating": "IPX7 Certified",
      "Battery": "5200 mAh (24 hours playback)",
      "Weight": "620g"
    },
    images: [
      { emoji: "🔊", bg: "linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)", label: "Ocean Blue" },
      { emoji: "🎵", bg: "linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)", label: "Midnight Marine" }
    ],
    tags: ["speaker", "audio", "waterproof", "portable", "bluetooth"],
    demoVideo: ""
  }
];

// ==========================================================================
// 4. REVIEWS DATA MODEL (At least 2 per product, starting with John D.)
// ==========================================================================
const INITIAL_REVIEWS = [
  // Product 1: Wireless Headphones Pro (Required starter)
  {
    id: "rev-1",
    product_id: "prod-1",
    user: "John D.",
    rating: 5,
    comment: "Amazing sound quality! The noise cancellation completely blocks out train and airplane noise. Battery lasts all week for work.",
    date: "2026-06-15"
  },
  {
    id: "rev-2",
    product_id: "prod-1",
    user: "Sarah K.",
    rating: 5,
    comment: "Super comfortable memory foam pads. Tested LDAC with my phone and the instrument separation is phenomenal for the price.",
    date: "2026-06-20"
  },
  {
    id: "rev-3",
    product_id: "prod-1",
    user: "Vikram Mehta",
    rating: 4,
    comment: "Microphone clarity on Zoom calls is great. Only taking one star off because the carrying case is slightly bulky in my bag.",
    date: "2026-06-28"
  },

  // Product 2: Smart Watch Series 5
  {
    id: "rev-4",
    product_id: "prod-2",
    user: "Elena Rostova",
    rating: 5,
    comment: "The AMOLED display is gorgeous even in direct sunlight while running. GPS locked in within 5 seconds outdoors.",
    date: "2026-07-02"
  },
  {
    id: "rev-5",
    product_id: "prod-2",
    user: "Marcus Chen",
    rating: 4,
    comment: "Sleep tracking and SpO2 readings align accurately with my medical finger monitor. Solid 6 full days of battery.",
    date: "2026-07-08"
  },

  // Product 3: UltraBook Pro 15
  {
    id: "rev-6",
    product_id: "prod-3",
    user: "David Miller",
    rating: 5,
    comment: "Compiles massive full-stack repos in seconds. The 3.2K OLED panel makes reading code and color grading an absolute joy.",
    date: "2026-07-12"
  },
  {
    id: "rev-7",
    product_id: "prod-3",
    user: "Priya Nair",
    rating: 5,
    comment: "Trackpad feels seamless and keyboard travel is snappy. Quiet fans even when running Docker containers all day.",
    date: "2026-07-15"
  },

  // Product 4: Classic Denim Jacket
  {
    id: "rev-8",
    product_id: "prod-4",
    user: "Lucas Scott",
    rating: 5,
    comment: "Heavyweight organic denim that feels like it will last a decade. The vintage wash looks exactly like the photos.",
    date: "2026-07-18"
  },
  {
    id: "rev-9",
    product_id: "prod-4",
    user: "Arjun Verma",
    rating: 4,
    comment: "Great cut around the shoulders. Sleeves are half an inch long for me, but rolling them up looks effortless.",
    date: "2026-07-22"
  },

  // Product 5: Silk Breeze Evening Dress
  {
    id: "rev-10",
    product_id: "prod-5",
    user: "Camille Dupont",
    rating: 5,
    comment: "Received endless compliments at my friend's wedding gala! The drape is flattering and breathable all evening.",
    date: "2026-07-25"
  },
  {
    id: "rev-11",
    product_id: "prod-5",
    user: "Aisha Patel",
    rating: 4,
    comment: "Beautiful silk sheen and high-grade stitching. Note: strictly dry clean or delicate cold hand wash.",
    date: "2026-07-29"
  },

  // Product 6: Retro Heritage Sneakers
  {
    id: "rev-12",
    product_id: "prod-6",
    user: "Mateo Rossi",
    rating: 5,
    comment: "The cork footbed molded to my feet after two days. Butter-soft leather with no painful blister break-in period.",
    date: "2026-08-01"
  },
  {
    id: "rev-13",
    product_id: "prod-6",
    user: "Liam O'Connor",
    rating: 4,
    comment: "Timeless court sneaker aesthetic. Gum sole grips wet sidewalks nicely.",
    date: "2026-08-05"
  },

  // Product 7: Clean Architecture Book
  {
    id: "rev-14",
    product_id: "prod-7",
    user: "Software Lead Ankit",
    rating: 5,
    comment: "Mandatory reading for anyone architecting backend APIs or modern enterprise frontends. Clear separation of concerns.",
    date: "2026-08-09"
  },
  {
    id: "rev-15",
    product_id: "prod-7",
    user: "Chloe Martin",
    rating: 5,
    comment: "The companion repo made the concepts click instantly. Hardcover quality is durable for regular desktop reference.",
    date: "2026-08-11"
  },

  // Product 8: Atomic Momentum Book
  {
    id: "rev-16",
    product_id: "prod-8",
    user: "Kavita Rao",
    rating: 5,
    comment: "Shifted my daily productivity from burnout to steady sustainable output. The 2-minute rule chapter is pure gold.",
    date: "2026-08-14"
  },
  {
    id: "rev-17",
    product_id: "prod-8",
    user: "Ben Taylor",
    rating: 5,
    comment: "Practical worksheets and zero fluff. Read it over a weekend and revamped my daily habits immediately.",
    date: "2026-08-18"
  },

  // Product 9: Smart Ambient Light Bar
  {
    id: "rev-18",
    product_id: "prod-9",
    user: "Felix Baum",
    rating: 5,
    comment: "Syncs with my monitor games with zero lag. Added it to Apple HomeKit via Matter in 10 seconds flat.",
    date: "2026-08-20"
  },
  {
    id: "rev-19",
    product_id: "prod-9",
    user: "Siddharth Jain",
    rating: 4,
    comment: "Desk look upgraded instantly. Touch slider on top is responsive and smooth.",
    date: "2026-08-24"
  },

  // Product 10: Cold Brew System
  {
    id: "rev-20",
    product_id: "prod-10",
    user: "Hannah Becker",
    rating: 5,
    comment: "Silky smooth cold brew concentrate with zero sediment in the cup. Saves me $6 everyday at coffee shops.",
    date: "2026-08-27"
  },
  {
    id: "rev-21",
    product_id: "prod-10",
    user: "Rajesh K.",
    rating: 4,
    comment: "The borosilicate glass feels premium and fits neatly inside standard refrigerator door shelves.",
    date: "2026-08-30"
  },

  // Product 11: Ergonomic Lumbar Chair
  {
    id: "rev-22",
    product_id: "prod-11",
    user: "Gabriel Silva",
    rating: 5,
    comment: "Saved my lower back during 10-hour remote coding marathons. Lumbar cushion truly follows your spine.",
    date: "2026-09-02"
  },
  {
    id: "rev-23",
    product_id: "prod-11",
    user: "Nina Williams",
    rating: 5,
    comment: "Assembly took only 15 minutes. Breathable mesh stays cool in summer and rollerblade wheels glide silently.",
    date: "2026-09-05"
  },

  // Product 12: Adjustable Dumbbell Set
  {
    id: "rev-24",
    product_id: "prod-12",
    user: "Tom H.",
    rating: 5,
    comment: "The twist dial is crisp and locks plates securely. No clanking or rattling during heavy dumbbell bench presses.",
    date: "2026-09-08"
  },
  {
    id: "rev-25",
    product_id: "prod-12",
    user: "Manish Sharma",
    rating: 5,
    comment: "Best home workout investment. Replaced an entire wall rack in my apartment bedroom.",
    date: "2026-09-12"
  },

  // Product 13: Alpine Backpack
  {
    id: "rev-26",
    product_id: "prod-13",
    user: "Clara Weber",
    rating: 5,
    comment: "Hiked through three days of torrential rain in the Alps and every single dry sack inside stayed completely dry.",
    date: "2026-09-15"
  },
  {
    id: "rev-27",
    product_id: "prod-13",
    user: "Dmitri Volkov",
    rating: 4,
    comment: "Weight distribution system takes the load off shoulders and onto hips nicely. Solid zippers.",
    date: "2026-09-18"
  },

  // Product 14: Mechanical RGB Keyboard Pro
  {
    id: "rev-28",
    product_id: "prod-14",
    user: "Alex 'Viper' Novak",
    rating: 5,
    comment: "The factory lubed linear switches produce a deep, satisfying thock with zero spring ping. Rotary knob feels solid.",
    date: "2026-09-22"
  },
  {
    id: "rev-29",
    product_id: "prod-14",
    user: "Pooja Hegde",
    rating: 5,
    comment: "Switched seamlessly between my MacBook and gaming PC with Bluetooth. Battery lasts weeks without backlight.",
    date: "2026-09-26"
  },

  // Product 15: Apex Wireless Gaming Mouse
  {
    id: "rev-30",
    product_id: "prod-15",
    user: "Kenneth Wong",
    rating: 5,
    comment: "52 grams with no honeycomb holes! Flick shots in CS2 and Valorant feel weightless and pinpoint accurate.",
    date: "2026-09-29"
  },
  {
    id: "rev-31",
    product_id: "prod-15",
    user: "Samir Khan",
    rating: 4,
    comment: "Optical switches are crisp with zero double-clicking issues. PTFE feet glide like ice on my cloth pad.",
    date: "2026-10-02"
  },

  // Product 16: TitanVR Immersive Headset
  {
    id: "rev-32",
    product_id: "prod-16",
    user: "Dr. Evelyn Reed",
    rating: 5,
    comment: "Pancake optics eliminate god-rays and edge blurriness. Color passthrough makes spatial computing usable for work.",
    date: "2026-10-06"
  },
  {
    id: "rev-33",
    product_id: "prod-16",
    user: "Jordan Bell",
    rating: 5,
    comment: "Balanced weight strap means no forehead red marks after an hour of Flight Simulator. Stunning 4K visuals.",
    date: "2026-10-10"
  },

  // Product 17: SoundPulse Speaker
  {
    id: "rev-34",
    product_id: "prod-17",
    user: "Maya Lin",
    rating: 5,
    comment: "Took it kayaking and it fell right into the river. Floated, kept playing music, completely unaffected!",
    date: "2026-10-14"
  },
  {
    id: "rev-35",
    product_id: "prod-17",
    user: "Rohan Gupta",
    rating: 4,
    comment: "Powerful punchy bass for its small footprint. Waiting for stock to get another pair to link in stereo.",
    date: "2026-10-18"
  }
];

// ==========================================================================
// 5. USERS DATA MODEL (Simulated Authentication)
// ==========================================================================
const INITIAL_USERS = [
  {
    id: "user-admin",
    name: "Admin Moderator",
    email: "admin@showcase.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: "user-standard",
    name: "Paras Mishra",
    email: "user@showcase.com",
    password: "user123",
    role: "user"
  }
];

// ==========================================================================
// 6. INQUIRIES DATA MODEL
// ==========================================================================
const INITIAL_INQUIRIES = [
  {
    id: "inq-1",
    name: "Aarav Kapoor",
    email: "aarav@techstudio.in",
    product_id: "prod-1",
    product_name: "Wireless Headphones Pro",
    subject: "Bulk corporate order inquiry (50 units)",
    message: "We would like to order 50 units for our engineering team. Do you provide custom company logo laser engraving?",
    date: "2026-10-20",
    status: "Answered"
  },
  {
    id: "inq-2",
    name: "Deepa Krishnan",
    email: "deepa.k@venturecap.com",
    product_id: "prod-3",
    product_name: "UltraBook Pro 15",
    subject: "International warranty and Linux compatibility",
    message: "Does the hardware support Ubuntu 24.04 LTS out of the box with sleep state power management?",
    date: "2026-10-24",
    status: "Pending"
  }
];

// ==========================================================================
// 7. LOCALSTORAGE DATA HELPER FUNCTIONS
// ==========================================================================

const STORAGE_KEYS = {
  PRODUCTS: "showcase_products",
  CATEGORIES: "showcase_categories",
  BRANDS: "showcase_brands",
  REVIEWS: "showcase_reviews",
  USERS: "showcase_users",
  INQUIRIES: "showcase_inquiries",
  WISHLIST: "showcase_wishlist",
  COMPARE: "showcase_compare",
  RECENT: "showcase_recent",
  CURRENT_USER: "showcase_current_user",
  THEME: "showcase_theme"
};

/**
 * Initializes data in localStorage if not already present.
 */
function initShowCaseStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BRANDS)) {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(INITIAL_BRANDS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(["prod-1", "prod-2"]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMPARE)) {
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(["prod-1", "prod-2"]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RECENT)) {
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(["prod-1", "prod-2", "prod-3"]));
  }
}

// Data Getters & Setters
function getStoredProducts() {
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : INITIAL_PRODUCTS;
}
function saveStoredProducts(products) {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

function getStoredCategories() {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : INITIAL_CATEGORIES;
}

function getStoredBrands() {
  const data = localStorage.getItem(STORAGE_KEYS.BRANDS);
  return data ? JSON.parse(data) : INITIAL_BRANDS;
}

function getStoredReviews() {
  const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  return data ? JSON.parse(data) : INITIAL_REVIEWS;
}
function saveStoredReviews(reviews) {
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
}

function getStoredInquiries() {
  const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
  return data ? JSON.parse(data) : INITIAL_INQUIRIES;
}
function saveStoredInquiries(inquiries) {
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
}

function getStoredUsers() {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : INITIAL_USERS;
}
function saveStoredUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

// Wishlist Helpers
function getWishlist() {
  const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return data ? JSON.parse(data) : [];
}
function toggleWishlist(productId) {
  let list = getWishlist();
  const index = list.indexOf(productId);
  let added = false;
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(productId);
    added = true;
  }
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
  return { list, added };
}

// Compare Helpers (Max 3 products)
function getCompareList() {
  const data = localStorage.getItem(STORAGE_KEYS.COMPARE);
  return data ? JSON.parse(data) : [];
}
function toggleCompare(productId) {
  let list = getCompareList();
  const index = list.indexOf(productId);
  let added = false;
  if (index > -1) {
    list.splice(index, 1);
  } else {
    if (list.length >= 3) {
      return { list, error: "You can compare up to 3 products at a time." };
    }
    list.push(productId);
    added = true;
  }
  localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(list));
  return { list, added };
}
function removeFromCompare(productId) {
  let list = getCompareList().filter(id => id !== productId);
  localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(list));
  return list;
}
function clearCompare() {
  localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify([]));
  return [];
}

// Recently Viewed
function getRecentlyViewed() {
  const data = localStorage.getItem(STORAGE_KEYS.RECENT);
  return data ? JSON.parse(data) : [];
}
function addRecentlyViewed(productId) {
  let list = getRecentlyViewed().filter(id => id !== productId);
  list.unshift(productId); // add to front
  if (list.length > 8) list.pop(); // keep last 8
  localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(list));
  return list;
}

// Auth Helpers
function getCurrentUser() {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}
function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

// Theme Helpers
function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
}
function setStoredTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

// Factory Reset
function resetAllShowCaseData() {
  localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.BRANDS);
  localStorage.removeItem(STORAGE_KEYS.REVIEWS);
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  localStorage.removeItem(STORAGE_KEYS.WISHLIST);
  localStorage.removeItem(STORAGE_KEYS.COMPARE);
  localStorage.removeItem(STORAGE_KEYS.RECENT);
  initShowCaseStorage();
}

// Initialize on load
initShowCaseStorage();

