// Advanced Local Datasets for 5-Day Goa Itinerary with Budget-Specific Hotels & Food

export type BudgetLevel = 'Low' | 'Medium' | 'High';

export type DayPlan = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
};

export type BudgetDataset = {
  hotels: string[];
  food: string[];
  transport: string[];
};

// Complete 5-Day Itinerary (Day 1 to Day 5)
export const FIVE_DAY_ITINERARY: DayPlan[] = [
  {
    day: 1,
    title: 'Arrival & North Goa Beaches',
    morning: 'Arrive in Goa and check into your accommodation. Freshen up and head to Calangute Beach for a relaxing morning by the sea.',
    afternoon: 'Explore the vibrant Baga Beach. Try water sports like parasailing and jet skiing. Enjoy lunch at a beachside location.',
    evening: 'Visit Anjuna Beach for sunset and live music. Explore the local flea market if available.',
  },
  {
    day: 2,
    title: 'Old Goa Heritage & Panjim',
    morning: 'Visit the historic Basilica of Bom Jesus and Se Cathedral in Old Goa. Explore the rich Portuguese heritage and architecture.',
    afternoon: 'Head to Panjim, the capital city. Walk through the colorful Latin Quarter (Fontainhas) and enjoy a traditional Goan lunch.',
    evening: 'Take a sunset river cruise on the Mandovi River with cultural performances. Walk along the Miramar Beach promenade.',
  },
  {
    day: 3,
    title: 'Dudhsagar Waterfalls & Nature',
    morning: 'Early departure for Dudhsagar Waterfalls. Trek or take a jeep safari to the majestic waterfall.',
    afternoon: 'Visit a spice plantation with guided tour and traditional Goan lunch. Learn about local spices and herbs.',
    evening: 'Return to your accommodation and relax. Enjoy dinner at a local restaurant or your hotel.',
  },
  {
    day: 4,
    title: 'South Goa Beaches & Forts',
    morning: 'Drive to South Goa and visit the peaceful Palolem Beach. Enjoy swimming and relaxation.',
    afternoon: 'Explore Cabo de Rama Fort and have lunch at a local restaurant with scenic views.',
    evening: 'Visit Agonda Beach for a serene sunset and fresh seafood dinner at a beach shack.',
  },
  {
    day: 5,
    title: 'Water Sports & Beach Hopping',
    morning: 'Head to Candolim Beach for water sports - banana boat, bumper rides, speed boating.',
    afternoon: 'Visit Sinquerim Beach and explore Aguada Fort. Enjoy lunch with a view of the Arabian Sea.',
    evening: 'Explore Vagator Beach and the iconic Chapora Fort for sunset. End your trip with a memorable evening.',
  },
];

// Budget-Specific Datasets
export const BUDGET_DATASETS: Record<BudgetLevel, BudgetDataset> = {
  Low: {
    hotels: [
      'Backpacker Panda Hostel - Calangute (₹500-800/night) - Dorms and private rooms with AC',
      'Zostel Goa - Anjuna (₹600-900/night) - Social hostel with common areas and events',
      'Mango Tree Hostel - Palolem (₹550-850/night) - Beach-side budget accommodation',
      'Roadhouse Hostels - Panjim (₹700-1000/night) - Clean rooms with breakfast included',
      'Goan Heritage Guest House - Mapusa (₹800-1200/night) - Family-run budget stay',
    ],
    food: [
      'Street Food Stalls - Calangute Beach (₹50-150/meal) - Local snacks and quick bites',
      'Beach Shacks - Baga (₹150-300/meal) - Affordable seafood and Goan curry rice',
      'Local Eateries - Mapusa Market (₹100-200/meal) - Authentic Goan thalis and snacks',
      'Sunset Point Shacks - Anjuna (₹150-250/meal) - Budget-friendly beach dining',
      'Budget Cafes - Panjim (₹100-250/meal) - Simple meals and beverages',
    ],
    transport: [
      '🚗 Private Cars available (Self-drive & Chauffeur).',
      '🛵 Scooters & Bikes available for Couples & Solo Travelers.',
      '✨ Best Market Rates Guaranteed!',
      '✅ 24/7 Roadside Assistance Included.',
    ],
  },
  Medium: {
    hotels: [
      'Lemon Tree Hotel - Candolim (₹3000-5000/night) - 3-star with pool and restaurant',
      'Treebo Trend - Calangute (₹2500-4000/night) - Modern rooms with complimentary breakfast',
      'FabHotel Palm Grove - Baga (₹2800-4500/night) - Comfortable stay near beach',
      'The Baga Marina - Baga (₹3500-5500/night) - Beach resort with pool and spa',
      'Ginger Hotel - Panjim (₹2500-4000/night) - Business-friendly with good amenities',
    ],
    food: [
      'Artjuna - Organic Cafe, Anjuna (₹300-600/meal) - Healthy organic meals and smoothies',
      'Fisherman\'s Wharf - Panjim (₹500-1000/meal) - Popular seafood restaurant with river views',
      'Pousada by the Beach - Calangute (₹400-800/meal) - Multi-cuisine with beach ambiance',
      'Gunpowder - Assagao (₹400-700/meal) - Authentic South Indian cuisine',
      'Black Sheep Bistro - Panjim (₹600-1200/meal) - Contemporary European and Goan fusion',
    ],
    transport: [
      '🚗 Private Cars available (Self-drive & Chauffeur).',
      '🛵 Scooters & Bikes available for Couples & Solo Travelers.',
      '✨ Best Market Rates Guaranteed!',
      '✅ 24/7 Roadside Assistance Included.',
    ],
  },
  High: {
    hotels: [
      'Taj Exotica Resort & Spa - Benaulim (₹15000-30000/night) - Luxury beachfront resort with world-class amenities',
      'The Leela Goa - Cavelossim (₹18000-35000/night) - 5-star luxury with golf course and spa',
      'Alila Diwa Goa - Majorda (₹12000-25000/night) - Contemporary luxury resort with infinity pool',
      'Park Hyatt Goa Resort - Cansaulim (₹14000-28000/night) - Premium beachfront property',
      'W Goa - Vagator (₹20000-40000/night) - Ultra-modern luxury resort with private beach access',
    ],
    food: [
      'Thalassa - Greek Taverna, Siolim (₹1500-3000/meal) - Authentic Greek cuisine with stunning sunset views',
      'Antares - Vagator (₹1800-3500/meal) - Fine dining with beach views and international menu',
      'Bomra\'s - Candolim (₹1200-2500/meal) - Exquisite Burmese cuisine in elegant setting',
      'Sublime - Morjim (₹1500-3000/meal) - Rooftop fine dining with panoramic views',
      'Caravela - Vasco (₹2000-4000/meal) - Heritage fine dining with Portuguese-Goan specialties',
    ],
    transport: [
      '🚗 Private Cars available (Self-drive & Chauffeur).',
      '🛵 Scooters & Bikes available for Couples & Solo Travelers.',
      '✨ Best Market Rates Guaranteed!',
      '✅ 24/7 Roadside Assistance Included.',
    ],
  },
};
