'use client';

import { useState, useEffect, useRef } from 'react';

// SVG Icon Components
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

// Types - UPDATED
interface RentalItem {
  id: string;
  name: string;
  category: 'camera' | 'sony-lens' | 'canon-lens';
  type: string;
  image: string; // Added image property
}

interface CartItem extends RentalItem {
  quantity: number;
  rentalDays: number;
}

// Photography Services Data with Detailed Content (keep as is)
const photographyServices = [
  { 
    id: 1, 
    name: 'Maternity Photography', 
    icon: '👶',
    description: 'Capture the beautiful journey of motherhood with our sensitive and artistic maternity photography sessions.',
    detailedDescription: 'Our maternity photography sessions are designed to celebrate the miracle of life. We create intimate, beautiful portraits that capture the special bond between mother and unborn child. Using soft lighting, elegant poses, and comfortable studio settings, we ensure you feel relaxed and beautiful throughout the session.',
    features: [
      'Studio and outdoor location options',
      'Multiple outfit changes',
      'Partner and family inclusion',
      'Professional hair and makeup available',
      'Digital gallery with high-resolution images',
      'Custom albums and prints'
    ],
    image: '/images/services/maternity.png'
  },
  { 
    id: 2, 
    name: 'Wedding & Pre-Wedding', 
    icon: '💍',
    description: 'Timeless wedding photography that tells your unique love story with elegance and emotion.',
    detailedDescription: 'From pre-wedding shoots to the grand celebration, we document every precious moment of your love story. Our candid and traditional approach ensures we capture both the planned moments and spontaneous emotions that make your wedding day truly special.',
    features: [
      'Full-day wedding coverage',
      'Pre-wedding and engagement shoots',
      'Candid and traditional photography',
      'Drone photography for aerial shots',
      'Same-day edits for social media',
      'Complete wedding album design'
    ],
    image: '/images/services/wedding.png'
  },
  { 
    id: 3, 
    name: 'Baby Shoots', 
    icon: '🍼',
    description: 'Adorable baby photography that captures those precious early moments and milestones.',
    detailedDescription: 'Capture your baby\'s first smiles, tiny fingers, and precious milestones. Our baby photography sessions are conducted in a warm, safe environment with props and setups designed specifically for infants. We work around your baby\'s schedule to ensure they\'re comfortable and happy.',
    features: [
      'Newborn to toddler photography',
      'Themed setups and props',
      'Family inclusion options',
      'Safety-first approach',
      'Milestone packages (3, 6, 9, 12 months)',
      'Custom birth announcements'
    ],
    image: '/images/services/baby.png'
  },
  { 
    id: 4, 
    name: 'Modeling Shoots', 
    icon: '💃',
    description: 'Professional modeling portfolios that showcase talent and personality for aspiring and established models.',
    detailedDescription: 'Create stunning portfolios that get you noticed in the competitive modeling industry. We work with aspiring and professional models to create diverse portfolio images that showcase versatility, personality, and marketability.',
    features: [
      'Portfolio development consultation',
      'Multiple looks and styles',
      'Professional makeup and styling',
      'Digital and print portfolio options',
      'Industry-standard editing',
      'Comp card design'
    ],
    image: '/images/services/modeling.png'
  },
  { 
    id: 5, 
    name: 'Portfolio Shoots', 
    icon: '📁',
    description: 'Professional portfolio photography for artists, actors, and professionals looking to make an impact.',
    detailedDescription: 'Whether you\'re an actor, musician, dancer, or corporate professional, we create portfolios that showcase your unique talents and professionalism. Our portfolio shoots are tailored to your specific industry requirements.',
    features: [
      'Industry-specific portfolio planning',
      'Headshots and full-body shots',
      'Action and performance shots',
      'Corporate and professional portraits',
      'Digital and physical portfolio options',
      'Resume integration'
    ],
    image: '/images/services/portfolio.png'
  },
  { 
    id: 6, 
    name: 'Food Photography', 
    icon: '🍽️',
    description: 'Mouth-watering food photography that makes dishes look as delicious as they taste.',
    detailedDescription: 'We specialize in food photography that makes viewers crave your dishes. From restaurant menus to food blogs and advertising campaigns, we capture food in its most appetizing form using specialized lighting and styling techniques.',
    features: [
      'Menu photography for restaurants',
      'Product shots for food brands',
      'Step-by-step recipe photography',
      'Food styling services',
      'Commercial food advertising',
      'Social media food content'
    ],
    image: '/images/services/food.png'
  },
  { 
    id: 7, 
    name: 'Commercial & Brand', 
    icon: '🏢',
    description: 'Powerful brand photography that communicates your business values and attracts customers.',
    detailedDescription: 'Elevate your brand with professional commercial photography that tells your business story. We work with companies of all sizes to create visual content that strengthens brand identity, showcases products, and engages customers.',
    features: [
      'Brand storytelling photography',
      'Product and catalog photography',
      'Corporate event coverage',
      'Office and workplace photography',
      'Team and executive portraits',
      'Marketing campaign visuals'
    ],
    image: '/images/services/commercial.png'
  },
];

// Rental Products Data - UPDATED with image paths
const rentalProducts: RentalItem[] = [
  // Sony Cameras
  { id: 'cam-1', name: 'Sony FX3', category: 'camera', type: 'Full-Frame Cinema Camera', image: '/images/products/cameras/sony-fx3.png' },
  { id: 'cam-2', name: 'Sony FX6', category: 'camera', type: 'Professional Cinema Camera', image: '/images/products/cameras/sony-fx6.png' },
  { id: 'cam-3', name: 'Sony A7 V', category: 'camera', type: 'Mirrorless Photography Camera', image: '/images/products/cameras/sony-a7v.png' },
  { id: 'cam-4', name: 'Sony FX9', category: 'camera', type: '6K Full-Frame Cinema Camera', image: '/images/products/cameras/sony-fx9.png' },
  { id: 'cam-5', name: 'Sony A7 III', category: 'camera', type: 'Full-Frame Mirrorless', image: '/images/products/cameras/sony-a7iii.png' },
  { id: 'cam-6', name: 'Sony A7 IV', category: 'camera', type: 'Advanced Mirrorless', image: '/images/products/cameras/sony-a7iv.png' },
  { id: 'cam-7', name: 'Sony A7S III', category: 'camera', type: 'Low-Light Specialist', image: '/images/products/cameras/sony-a7siii.png' },
  { id: 'cam-8', name: 'Sony A7R IV', category: 'camera', type: 'High-Resolution 61MP', image: '/images/products/cameras/sony-a7riv.png' },
  { id: 'cam-9', name: 'Sony A7R V', category: 'camera', type: '61MP AI-Powered', image: '/images/products/cameras/sony-a7rv.png' },
  
  // Canon Cameras
  { id: 'cam-10', name: 'Canon EOS R5 Mark II', category: 'camera', type: '8K Mirrorless Camera', image: '/images/products/cameras/canon-r5-mkii.png' },
  { id: 'cam-11', name: 'Canon EOS R5', category: 'camera', type: '45MP Full-Frame', image: '/images/products/cameras/canon-r5.png' },
  { id: 'cam-12', name: 'Canon EOS R6 Mark II', category: 'camera', type: '24MP All-Rounder', image: '/images/products/cameras/canon-r6-mkii.png' },
  { id: 'cam-13', name: 'Canon EOS R6', category: 'camera', type: '20MP Performance Camera', image: '/images/products/cameras/canon-r6.png' },
  
  // Sony Lenses
  { id: 'sony-1', name: 'Sony FE 14mm F1.8 GM', category: 'sony-lens', type: 'Ultra Wide Prime - Astrophotography', image: '/images/products/lenses/sony/sony-fe-14mm-f1-8-gm.png' },
  { id: 'sony-2', name: 'Sony FE 24mm F1.4 GM', category: 'sony-lens', type: 'Wide Prime - Street & Landscape', image: '/images/products/lenses/sony/sony-fe-24mm-f1-4-gm.png' },
  { id: 'sony-3', name: 'Sony FE 35mm F1.4 GM', category: 'sony-lens', type: 'Standard Prime - Documentary', image: '/images/products/lenses/sony/sony-fe-35mm-f1-4-gm.png' },
  { id: 'sony-4', name: 'Sony FE 50mm F1.2 GM', category: 'sony-lens', type: 'Standard Prime - Portrait & Low Light', image: '/images/products/lenses/sony/sony-fe-50mm-f1-2-gm.png' },
  { id: 'sony-5', name: 'Sony FE 85mm F1.4 GM', category: 'sony-lens', type: 'Portrait Prime - Professional Portraits', image: '/images/products/lenses/sony/sony-fe-85mm-f1-4-gm.png' },
  { id: 'sony-6', name: 'Sony FE 135mm F1.8 GM', category: 'sony-lens', type: 'Telephoto Prime - Sports & Wildlife', image: '/images/products/lenses/sony/sony-fe-135mm-f1-8-gm.png' },
  { id: 'sony-7', name: 'Sony FE 16-35mm F2.8 GM', category: 'sony-lens', type: 'Wide Zoom - Architecture & Real Estate', image: '/images/products/lenses/sony/sony-fe-16-35mm-f2-8-gm.png' },
  { id: 'sony-8', name: 'Sony FE 24-70mm F2.8 GM II', category: 'sony-lens', type: 'Standard Zoom - Wedding & Events', image: '/images/products/lenses/sony/sony-fe-24-70mm-f2-8-gm-ii.png' },
  { id: 'sony-9', name: 'Sony FE 70-200mm F2.8 GM II', category: 'sony-lens', type: 'Telephoto Zoom - Sports & Wildlife', image: '/images/products/lenses/sony/sony-fe-70-200mm-f2-8-gm-ii.png' },
  { id: 'sony-10', name: 'Sony FE 100-400mm F4.5-5.6 GM', category: 'sony-lens', type: 'Super Telephoto - Bird & Wildlife', image: '/images/products/lenses/sony/sony-fe-100-400mm-f4-5-5-6-gm.png' },
  
  // Canon Lenses
  { id: 'canon-1', name: 'Canon RF 50mm F1.2', category: 'canon-lens', type: 'Standard Prime - Ultimate Portrait Lens', image: '/images/products/lenses/canon/canon-rf-50mm-f1-2.png' },
  { id: 'canon-2', name: 'Canon RF 85mm F1.2L USM', category: 'canon-lens', type: 'Portrait Prime - Creamy Bokeh', image: '/images/products/lenses/canon/canon-rf-85mm-f1-2l.png' },
  { id: 'canon-3', name: 'Canon RF 24-70mm F2.8L IS', category: 'canon-lens', type: 'Standard Zoom - Professional Workhorse', image: '/images/products/lenses/canon/canon-rf-24-70mm-f2-8l.png' },
  { id: 'canon-4', name: 'Canon RF 70-200mm F2.8L IS', category: 'canon-lens', type: 'Telephoto Zoom - Event & Sports', image: '/images/products/lenses/canon/canon-rf-70-200mm-f2-8l.png' },
  { id: 'canon-5', name: 'Canon RF 15-35mm F2.8L IS', category: 'canon-lens', type: 'Wide Zoom - Landscape & Architecture', image: '/images/products/lenses/canon/canon-rf-15-35mm-f2-8l.png' },
  { id: 'canon-6', name: 'Canon RF 28-70mm F2', category: 'canon-lens', type: 'Standard Zoom - Constant F2 Aperture', image: '/images/products/lenses/canon/canon-rf-28-70mm-f2.png' },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Maternity Client',
    content: 'The Clicky Clicks captured the most beautiful moments of my pregnancy journey. The photos are absolutely magical!',
    rating: 5
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Wedding Client',
    content: 'Our wedding photos are stunning! They captured every emotion perfectly. Highly recommended for any special occasion.',
    rating: 5
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Model Portfolio',
    content: 'The portfolio they created for me got me signed with a major agency. Professional, creative, and absolutely worth it!',
    rating: 5
  },
  {
    id: 4,
    name: 'Suresh Kumar',
    role: 'Restaurant Owner',
    content: 'Our menu photography increased orders by 40%! The food looks so delicious in their photos.',
    rating: 5
  }
];

export default function HomePage() {
  // State - UPDATED
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [rentalDays, setRentalDays] = useState<{[key: string]: number}>({});
  const [logoError, setLogoError] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
  // Refs for sections
  const homeRef = useRef<HTMLDivElement>(null);
  const photographyRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  const rentalsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle image error
  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Handle adding to cart
  const addToCart = (product: RentalItem) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, rentalDays: rentalDays[product.id] || 1 }]);
    }
  };

  // Handle removing from cart
  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Handle rental days change
  const handleRentalDaysChange = (id: string, days: number) => {
    setRentalDays(prev => ({ ...prev, [id]: days }));
    setCart(cart.map(item => 
      item.id === id ? { ...item, rentalDays: days } : item
    ));
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const message = `Hello! I'm interested in renting the following equipment from The Clicky Clicks:\n\n${cart.map(item => 
      `• ${item.name} (${item.type}) - ${item.quantity} unit(s) for ${item.rentalDays} day(s)`
    ).join('\n')}\n\nPlease share availability and booking details.`;
    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '9880736666';
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  // Scroll to section - FIXED VERSION
  const scrollToSection = (section: string) => {
    setIsMenuOpen(false);
    setActiveSection(section);
    
    // Fixed: Added | null to the type definition
    const refs: {[key: string]: React.RefObject<HTMLDivElement | null>} = {
      'home': homeRef,
      'photography': photographyRef,
      'about': aboutRef,
      'process': processRef,
      'testimonials': testimonialsRef,
      'studio': studioRef,
      'rentals': rentalsRef,
      'contact': contactRef
    };
    
    const ref = refs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'photography', label: 'Photography', icon: <CameraIcon /> },
    { id: 'about', label: 'About', icon: <UsersIcon /> },
    { id: 'process', label: 'Process', icon: <CalendarIcon /> },
    { id: 'testimonials', label: 'Reviews', icon: <StarIcon /> },
    { id: 'studio', label: 'Studio', icon: <VideoIcon /> },
    { id: 'rentals', label: 'Rentals', icon: <ShoppingCartIcon /> },
    { id: 'contact', label: 'Contact', icon: <PhoneIcon /> },
  ];

  // Preloader
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-6">
            {/* Actual logo with fallback */}
            {!logoError ? (
              <img 
                src="/images/logo.png" 
                alt="The Clicky Clicks"
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                <div className="text-white text-3xl">📸</div>
              </div>
            )}
          </div>
          <div className="text-gray-300 text-2xl font-bold mb-2">The Clicky Clicks</div>
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-40 border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with Image */}
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                {/* Actual logo image */}
                {!logoError ? (
                  <img 
                    src="/images/logo.png" 
                    alt="The Clicky Clicks Logo"
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="text-white">📸</div>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">The Clicky Clicks</h1>
                <p className="text-xs text-gray-400">Professional Photography</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                      activeSection === item.id 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section 
          ref={homeRef} 
          className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        >
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto text-center">
              <div className="mb-10">
                <div className="inline-block px-8 py-3 bg-gray-800 rounded-full text-gray-300 mb-8 text-lg">
                  Professional Photography & Studio Rentals in Bangalore
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-8">
                  <span className="text-white">We don&apos;t just click photos</span>
                  <br />
                  <span className="text-gray-300">we create visual stories that last.</span>
                </h1>
                <p className="text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                  From personal milestones to powerful brand campaigns, The Clicky Clicks delivers high-quality photography and fully equipped studio rentals, crafted for creators, professionals, and businesses that value excellence in Bangalore.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => scrollToSection('photography')}
                  className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-lg"
                >
                  Explore Photography Services
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-10 py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 text-lg"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section 
          ref={aboutRef} 
          className="py-24 bg-gray-950"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">About The Clicky Clicks</h2>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                  Your trusted partner for professional photography and equipment rentals in Bangalore
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div>
                  <h3 className="text-3xl font-bold mb-8 text-white">Our Story & Philosophy</h3>
                  <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                    <p>
                      Founded with a passion for visual storytelling, The Clicky Clicks has grown from a small photography studio to Bangalore&apos;s premier photography and rentals destination. We believe that every moment has a story, and every story deserves a perfect frame.
                    </p>
                    <p>
                      Our philosophy centers around quality over quantity and creativity over shortcuts. We don&apos;t just take pictures—we create visual narratives that stand the test of time, capturing emotions, preserving memories, and building brand identities.
                    </p>
                    <p>
                      Based in the heart of Bangalore, we serve individuals, couples, families, models, businesses, and creators who demand excellence and appreciate the art of photography.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 border border-gray-700">
                  <h4 className="text-2xl font-bold mb-8 text-white">What Sets Us Apart</h4>
                  <div className="space-y-6">
                    {[
                      '15+ years of combined photography experience',
                      'State-of-the-art equipment and technology',
                      'Personalized approach for every client',
                      'Professional post-production editing',
                      'Multiple award-winning photographers',
                      'Dedicated customer support team'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckIcon />
                        </div>
                        <span className="text-gray-300 text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                  <div className="text-4xl font-bold text-white mb-2">1500+</div>
                  <div className="text-gray-400">Happy Clients</div>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                  <div className="text-4xl font-bold text-white mb-2">8+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-400">Professional Shoots/Month</div>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photography Services Section - Detailed */}
        <section 
          ref={photographyRef} 
          className="py-24 bg-black"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">📸 Professional Photography Services</h2>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                  Specializing in capturing meaningful moments and impactful visuals through creativity, technical precision, and professional production standards.
                </p>
              </div>

              {/* Services Grid with Detailed Content */}
              <div className="space-y-16 mb-20">
                {photographyServices.map((service) => (
                  <div 
                    key={service.id}
                    className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative h-80 lg:h-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <div className="text-gray-600 text-6xl">{service.icon}</div>
                        </div>
                        <div className="absolute top-6 left-6 text-4xl bg-black/50 p-3 rounded-xl">
                          {service.icon}
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-10">
                        <h3 className="text-3xl font-bold mb-6 text-white">{service.name}</h3>
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                          {service.detailedDescription}
                        </p>
                        
                        <div className="mb-8">
                          <h4 className="text-xl font-semibold mb-4 text-white">Service Features:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <span className="text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => scrollToSection('contact')}
                          className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Book {service.name} →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Photography Approach */}
              <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 border border-gray-800 mb-16">
                <h3 className="text-3xl font-bold mb-10 text-white text-center">Our Photography Approach</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">🎯</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Creative Direction</h4>
                    <p className="text-gray-400">
                      Every shoot begins with a creative consultation to understand your vision, style preferences, and desired outcomes.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">⚡</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Technical Excellence</h4>
                    <p className="text-gray-400">
                      Using state-of-the-art equipment and lighting techniques to ensure technically perfect images in any condition.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">🎨</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Professional Editing</h4>
                    <p className="text-gray-400">
                      Every image undergoes professional editing for color correction, retouching, and enhancement to deliver stunning results.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us - Detailed */}
              <div>
                <h3 className="text-3xl font-bold mb-10 text-white text-center">Why Choose The Clicky Clicks for Photography</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    'Professional lighting & camera equipment',
                    'Creative direction for every shoot',
                    'Studio & outdoor shoot options',
                    'High-resolution, professionally edited images',
                    'Trusted by individuals, creators, and businesses',
                    'Modern studio spaces available',
                    'Quick turnaround times (7-10 days)',
                    'Flexible shooting packages',
                    'Experienced photography team',
                    'Multiple location options across Bangalore',
                    'Backup equipment for reliability',
                    'Online gallery for easy sharing'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-6 bg-gray-900/50 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckIcon />
                      </div>
                      <span className="text-gray-300 text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section 
          ref={processRef} 
          className="py-24 bg-gray-950"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our 5-Step Photography Process</h2>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                  A systematic approach to ensure exceptional results from consultation to delivery
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
                {[
                  {
                    step: '01',
                    title: 'Consultation',
                    description: 'We discuss your vision, requirements, and create a custom photography plan'
                  },
                  {
                    step: '02',
                    title: 'Planning',
                    description: 'Location scouting, theme selection, outfit planning, and schedule preparation'
                  },
                  {
                    step: '03',
                    title: 'Shooting',
                    description: 'Professional photography session with creative direction and technical expertise'
                  },
                  {
                    step: '04',
                    title: 'Editing',
                    description: 'Professional editing, retouching, and enhancement of selected images'
                  },
                  {
                    step: '05',
                    title: 'Delivery',
                    description: 'High-resolution image delivery via online gallery with printing options'
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-700">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-white">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Process Timeline */}
              <div className="bg-gray-900 rounded-3xl p-12 border border-gray-800">
                <h3 className="text-2xl font-bold mb-8 text-white">Typical Project Timeline</h3>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">Initial Consultation</div>
                    <div className="text-gray-400">1-2 days</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">Planning & Preparation</div>
                    <div className="text-gray-400">3-7 days</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">Photography Session</div>
                    <div className="text-gray-400">1 day (varies by package)</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">Image Selection</div>
                    <div className="text-gray-400">2-3 days</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">Editing & Delivery</div>
                    <div className="text-gray-400">7-10 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section 
          ref={testimonialsRef} 
          className="py-24 bg-black"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What Our Clients Say</h2>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                  Trusted by individuals, couples, families, and businesses across Bangalore
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 text-lg italic">&ldquo;{testimonial.content}&rdquo;</p>
                    <div>
                      <div className="text-white font-bold text-lg">{testimonial.name}</div>
                      <div className="text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-lg"
                >
                  Join Our Happy Clients
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Studio & Production Section */}
        <section 
          ref={studioRef} 
          className="py-24 bg-gray-950"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Professional Studio</h2>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                  Modern studio spaces and production facilities for all your creative needs
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                <div>
                  <h3 className="text-3xl font-bold mb-8 text-white">Studio Features & Amenities</h3>
                  <div className="space-y-6 text-gray-300 text-lg">
                    <p>
                      Our 1500 sq. ft. studio in central Bangalore is equipped with professional photography and videography facilities. Designed for comfort and creativity, it&apos;s the perfect space for all types of shoots.
                    </p>
                    <div className="space-y-4">
                      {[
                        'Professional LED and strobe lighting systems',
                        'Multiple cyc wall options (white, black, green)',
                        'High-speed internet and charging stations',
                        'Climate-controlled environment',
                        'Changing rooms and makeup area',
                        'Client lounge with refreshments',
                        'Equipment rental on-site',
                        'Ample parking space'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <CheckIcon />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-8 text-white">Production Services</h3>
                  <div className="space-y-6 text-gray-300 text-lg">
                    <p>
                      Beyond photography, we offer complete production support for videography, content creation, and multimedia projects.
                    </p>
                    <div className="space-y-4">
                      {[
                        '4K videography services',
                        'Content creation for social media',
                        'Professional video editing suites',
                        'Audio recording and podcast facilities',
                        'Green screen and chroma key setup',
                        'Drone photography and videography',
                        'Live streaming setup',
                        'Equipment rental packages'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <CheckIcon />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio Packages */}
              <div className="bg-gray-900 rounded-3xl p-12 border border-gray-800">
                <h3 className="text-2xl font-bold mb-10 text-white text-center">Studio Rental Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-800 rounded-2xl p-8 text-center">
                    <h4 className="text-xl font-bold mb-4 text-white">Basic</h4>
                    <div className="text-gray-400 mb-6">4 hours studio access</div>
                    <div className="space-y-3 mb-8">
                      <div className="text-gray-300">Basic lighting setup</div>
                      <div className="text-gray-300">2 backdrop options</div>
                      <div className="text-gray-300">Changing room access</div>
                    </div>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Inquire Now
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl p-8 text-center">
                    <h4 className="text-xl font-bold mb-4 text-black">Professional</h4>
                    <div className="text-gray-600 mb-6">8 hours studio access</div>
                    <div className="space-y-3 mb-8">
                      <div className="text-gray-700">Full lighting setup</div>
                      <div className="text-gray-700">4 backdrop options</div>
                      <div className="text-gray-700">Makeup station included</div>
                      <div className="text-gray-700">Equipment assistant</div>
                    </div>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Popular Choice
                    </button>
                  </div>
                  <div className="bg-gray-800 rounded-2xl p-8 text-center">
                    <h4 className="text-xl font-bold mb-4 text-white">Premium</h4>
                    <div className="text-gray-400 mb-6">Full day (12 hours)</div>
                    <div className="space-y-3 mb-8">
                      <div className="text-gray-300">Complete studio access</div>
                      <div className="text-gray-300">All backdrop options</div>
                      <div className="text-gray-300">Production support</div>
                      <div className="text-gray-300">Equipment discounts</div>
                    </div>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rentals Section - Nagarjun's Rental House - UPDATED WITH IMAGES */}
        <section 
          ref={rentalsRef} 
          className="py-24 bg-black"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <div className="inline-block px-8 py-3 bg-gray-800 rounded-full text-gray-300 mb-6 text-lg">
                  Nagarjun&apos;s Rental House
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Capture Without Limits
                </h2>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                  Premium cameras, professional lenses, and industry-standard filmmaking equipment — all under one roof in Bangalore.
                </p>
              </div>

              {/* Rental Introduction */}
              <div className="max-w-4xl mx-auto text-center mb-20">
                <p className="text-gray-300 text-xl leading-relaxed mb-8">
                  At The Clicky Clicks Rentals, we empower creators with reliable, high-performance gear, so you can focus entirely on your vision — not the equipment. From photography projects to cinematic productions, our rental inventory is carefully curated for professionals who demand quality, consistency, and creative freedom.
                </p>
                <p className="text-gray-400 text-lg">
                  Whether you&apos;re shooting a boutique commercial, a fashion campaign, a wedding film, or a full-scale cinematic feature, we provide the glass, the lights, and the tech to bring your frames to life.
                </p>
              </div>

              {/* Rental Categories with Detailed Descriptions */}
              <div className="space-y-24">
                {/* Cameras Section */}
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-4xl font-bold text-white">🎥 Professional Cameras</h3>
                    <div className="text-gray-400 text-lg">From entry-level to cinema-grade</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rentalProducts
                      .filter(item => item.category === 'camera')
                      .slice(0, 9)
                      .map((camera) => (
                        <div 
                          key={camera.id}
                          className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"
                        >
                          {/* Product Image */}
                          <div className="relative h-48 w-full mb-6 bg-gray-800 rounded-xl overflow-hidden">
                            {!imageErrors[camera.id] ? (
                              <img 
                                src={camera.image} 
                                alt={camera.name}
                                className="w-full h-full object-contain p-4"
                                onError={() => handleImageError(camera.id)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="text-gray-500 text-5xl">📷</div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-bold mb-2 text-white">{camera.name}</h4>
                              <p className="text-gray-400 text-sm">{camera.type}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-6 text-sm">
                            Professional-grade camera suitable for {camera.type.toLowerCase()} photography and videography needs.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-gray-400 text-xs">
                              Includes: Battery, charger, body cap
                            </div>
                            <button
                              onClick={() => addToCart(camera)}
                              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Sony Lenses Section */}
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-4xl font-bold text-white">🔍 Sony FE Lenses</h3>
                    <div className="text-gray-400 text-lg">G Master & premium series</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rentalProducts
                      .filter(item => item.category === 'sony-lens')
                      .slice(0, 9)
                      .map((lens) => (
                        <div 
                          key={lens.id}
                          className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"
                        >
                          {/* Product Image */}
                          <div className="relative h-48 w-full mb-6 bg-gray-800 rounded-xl overflow-hidden">
                            {!imageErrors[lens.id] ? (
                              <img 
                                src={lens.image} 
                                alt={lens.name}
                                className="w-full h-full object-contain p-4"
                                onError={() => handleImageError(lens.id)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="text-gray-500 text-5xl">🔭</div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-bold mb-2 text-white">{lens.name}</h4>
                              <p className="text-gray-400 text-sm">{lens.type}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-6 text-sm">
                            Premium Sony lens perfect for {lens.type.split(' - ')[1]?.toLowerCase() || 'professional photography'} with exceptional optical quality.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-gray-400 text-xs">
                              Includes: Front & rear caps, lens pouch
                            </div>
                            <button
                              onClick={() => addToCart(lens)}
                              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Canon Lenses Section */}
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-4xl font-bold text-white">🔴 Canon RF Lenses</h3>
                    <div className="text-gray-400 text-lg">L-series professional optics</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rentalProducts
                      .filter(item => item.category === 'canon-lens')
                      .map((lens) => (
                        <div 
                          key={lens.id}
                          className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"
                        >
                          {/* Product Image */}
                          <div className="relative h-48 w-full mb-6 bg-gray-800 rounded-xl overflow-hidden">
                            {!imageErrors[lens.id] ? (
                              <img 
                                src={lens.image} 
                                alt={lens.name}
                                className="w-full h-full object-contain p-4"
                                onError={() => handleImageError(lens.id)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="text-gray-500 text-5xl">📸</div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-bold mb-2 text-white">{lens.name}</h4>
                              <p className="text-gray-400 text-sm">{lens.type}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-6 text-sm">
                            Professional Canon RF lens designed for {lens.type.split(' - ')[1]?.toLowerCase() || 'excellent performance'} with superior image quality.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-gray-400 text-xs">
                              Includes: Lens hood, caps, case
                            </div>
                            <button
                              onClick={() => addToCart(lens)}
                              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Why Rent Section - Detailed */}
              <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 border border-gray-800 mt-20">
                <h3 className="text-3xl font-bold mb-12 text-white text-center">Why Rent From Nagarjun&apos;s House</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">🔧</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Professionally Maintained</h4>
                    <p className="text-gray-400">
                      All equipment is regularly cleaned, calibrated, and tested to ensure optimal performance.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">✨</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Latest Generation</h4>
                    <p className="text-gray-400">
                      We regularly update our inventory with the latest cameras and lenses for cutting-edge results.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">📅</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Flexible Durations</h4>
                    <p className="text-gray-400">
                      Rent by the day, week, or month with flexible pickup and return options in Bangalore.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">🎬</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Ideal for Productions</h4>
                    <p className="text-gray-400">
                      Complete kits available for film shoots, ads, weddings, and content creation projects.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">🤝</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Trusted in Bangalore</h4>
                    <p className="text-gray-400">
                      Recommended by professional photographers and filmmakers across the city.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-3xl">📦</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Complete Kits</h4>
                    <p className="text-gray-400">
                      Pre-configured production kits with cameras, lenses, lighting, and accessories.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rental Packages */}
              <div className="mt-20">
                <h3 className="text-3xl font-bold mb-10 text-white text-center">Popular Rental Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                    <h4 className="text-xl font-bold mb-4 text-white">Beginner Kit</h4>
                    <div className="text-gray-400 mb-6">Perfect for starting photographers</div>
                    <div className="space-y-3 mb-8">
                      <div className="text-gray-300">Camera body + kit lens</div>
                      <div className="text-gray-300">Extra battery</div>
                      <div className="text-gray-300">Memory card (32GB)</div>
                      <div className="text-gray-300">Basic camera bag</div>
                    </div>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Inquire Now
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl p-8 border border-gray-300">
                    <h4 className="text-xl font-bold mb-4 text-black">Professional Kit</h4>
                    <div className="text-gray-600 mb-6">For working photographers</div>
                    <div className="space-y-3 mb-8">
                      <div className="text-gray-700">Pro camera body</div>
                      <div className="text-gray-700">2 professional lenses</div>
                      <div className="text-gray-700">External flash</div>
                      <div className="text-gray-700">Tripod & filters</div>
                      <div className="text-gray-700">Carrying case</div>
                    </div>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Most Popular
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                    <h4 className="text-xl font-bold mb-4 text-white">Cinema Kit</h4>
                    <div className="text-gray-400 mb-6">For film & video production</div>
                    <div className="space-y-3 mb-8">
                      <div className="text-gray-300">Cinema camera</div>
                      <div className="text-gray-300">3 cine lenses</div>
                      <div className="text-gray-300">Follow focus system</div>
                      <div className="text-gray-300">ND filter set</div>
                      <div className="text-gray-300">Shoulder rig</div>
                    </div>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shopping Cart Sidebar - UPDATED WITH IMAGES */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 z-30">
            <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl w-80 max-h-[80vh] overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <ShoppingCartIcon />
                    <span className="ml-2">Rental Cart ({cart.length})</span>
                  </h3>
                  <button
                    onClick={() => setCart([])}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="p-4 overflow-y-auto max-h-64">
                {cart.map((item) => (
                  <div key={item.id} className="mb-3 pb-3 border-b border-gray-800 last:border-0">
                    <div className="flex items-start space-x-3">
                      {/* Cart Item Image */}
                      <div className="w-12 h-12 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
                        {!imageErrors[item.id] ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-contain p-1"
                            onError={() => handleImageError(item.id)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-500 text-lg">
                              {item.category === 'camera' ? '📷' : item.category === 'sony-lens' ? '🔭' : '📸'}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-white text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-400">{item.type}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-white ml-2"
                          >
                            <XIcon />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    setCart(cart.map(cartItem => 
                                      cartItem.id === item.id 
                                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                        : cartItem
                                    ));
                                  } else {
                                    removeFromCart(item.id);
                                  }
                                }}
                                className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center hover:bg-gray-700 text-xs"
                              >
                                -
                              </button>
                              <span className="text-white text-sm">{item.quantity}</span>
                              <button
                                onClick={() => {
                                  setCart(cart.map(cartItem => 
                                    cartItem.id === item.id 
                                      ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                      : cartItem
                                  ));
                                }}
                                className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center hover:bg-gray-700 text-xs"
                              >
                                +
                              </button>
                            </div>
                            
                            <select
                              value={item.rentalDays}
                              onChange={(e) => handleRentalDaysChange(item.id, parseInt(e.target.value))}
                              className="bg-gray-800 text-white rounded px-2 py-1 text-xs border border-gray-700"
                            >
                              {[1, 2, 3, 4, 5, 6, 7].map(days => (
                                <option key={days} value={days}>{days} day{days > 1 ? 's' : ''}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-800">
                <div className="mb-3">
                  <p className="text-sm text-gray-400">
                    Items selected: {cart.length} equipment
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Contact us for pricing and availability
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  WhatsApp for Booking
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  You&apos;ll be redirected to WhatsApp to confirm your rental inquiry
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section 
          ref={contactRef} 
          className="py-24 bg-gray-950"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h2>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                  Ready to create something amazing? Get in touch with our team for photography services or equipment rentals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {/* Photography Contact */}
                <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-8">
                    <CameraIcon />
                  </div>
                  <h3 className="text-2xl font-bold mb-8 text-white">Photography & Studio Bookings</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Contact Person</div>
                      <div className="text-white font-bold text-lg">Vedanth Koushik</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Phone Number</div>
                      <a 
                        href="tel:7975163441"
                        className="text-white font-bold text-lg hover:text-gray-300 transition-colors flex items-center space-x-3"
                      >
                        <span>📞</span>
                        <span>7975163441</span>
                      </a>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Location</div>
                      <div className="text-white">Bangalore, Karnataka</div>
                    </div>
                    <a
                      href="https://maps.app.goo.gl/nseBHa3zvMqa1AnTA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <span>📍 View on Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Rentals Contact */}
                <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-8">
                    <ShoppingCartIcon />
                  </div>
                  <h3 className="text-2xl font-bold mb-8 text-white">Equipment Rentals</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Contact Person</div>
                      <div className="text-white font-bold text-lg">Nagarjun S</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Phone / WhatsApp</div>
                      <a 
                        href="tel:9880736666"
                        className="text-white font-bold text-lg hover:text-gray-300 transition-colors flex items-center space-x-3"
                      >
                        <span>📱</span>
                        <span>9880736666</span>
                      </a>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Location</div>
                      <div className="text-white">Bangalore, Karnataka</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Services</div>
                      <div className="text-white">
                        Call or WhatsApp to check availability, pricing, and custom rental packages
                      </div>
                    </div>
                  </div>
                </div>

                {/* General Enquiries */}
                <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-8">
                    <PhoneIcon />
                  </div>
                  <h3 className="text-2xl font-bold mb-8 text-white">General Enquiries</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Email</div>
                      <div className="text-white">info@clickyclicks.com</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Business Hours</div>
                      <div className="text-white">Monday - Sunday: 9AM - 9PM</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Response Time</div>
                      <div className="text-white">Within 2 hours during business hours</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Studio Visits</div>
                      <div className="text-white">By appointment only</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 md:p-16 border border-gray-800">
                  <h3 className="text-3xl font-bold mb-6 text-white">Start Your Creative Journey Today</h3>
                  <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
                    Whether you need professional photography services or high-quality equipment rentals, The Clicky Clicks is your one-stop destination in Bangalore.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <a
                      href="tel:7975163441"
                      className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-lg"
                    >
                      📞 Call for Photography
                    </a>
                    <a
                      href="https://wa.me/9880736666"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 text-lg"
                    >
                      💬 WhatsApp for Rentals
                    </a>
                  </div>
                  <p className="text-gray-500 mt-8">
                    Response guaranteed within 2 hours during business hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-12 h-12">
                  {/* Actual logo image */}
                  {!logoError ? (
                    <img 
                      src="/images/logo.png" 
                      alt="The Clicky Clicks Logo"
                      className="w-full h-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="text-white text-2xl">📸</div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">The Clicky Clicks</div>
                  <div className="text-sm text-gray-400">Professional Photography & Studio Rentals</div>
                </div>
              </div>
              <p className="text-gray-500 max-w-md">
                Creating visual stories that last. Based in Bangalore, serving clients across India.
              </p>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p className="text-lg">© {new Date().getFullYear()} The Clicky Clicks. All rights reserved.</p>
              <p className="mt-2">Bangalore, Karnataka, India</p>
              <p className="mt-4 text-sm text-gray-500">
                Professional Photography & Nagarjun&apos;s Rental House
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Floating Button */}
      {cart.length === 0 && (
        <button
          onClick={() => scrollToSection('rentals')}
          className="fixed bottom-6 right-6 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-200 transition-colors z-20"
        >
          <ShoppingCartIcon />
        </button>
      )}
    </div>
  );
}