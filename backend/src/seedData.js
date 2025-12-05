require('dotenv').config();
const mongoose = require('mongoose');
const ItemReport = require('./models/ItemReport');

const sampleReports = [
  {
    type: 'lost',
    title: 'Lost Black Wallet',
    description: 'Black leather wallet with ID and cards. Lost near Central Park.',
    category: 'Accessories',
    location: 'Central Park, New York',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=250&fit=crop',
    ],
    status: 'open'
  },
  {
    type: 'found',
    title: 'Found iPhone 13',
    description: 'Found an iPhone 13 in black case at the airport. Looking for owner.',
    category: 'Electronics',
    location: 'JFK Airport, New York',
    images: [
      'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=250&fit=crop',
    ],
    status: 'open'
  },
  {
    type: 'lost',
    title: 'Lost AirPods Pro',
    description: 'White AirPods Pro with charging case. Very important to me.',
    category: 'Electronics',
    location: 'Times Square, New York',
    images: [
      'https://images.unsplash.com/photo-1606841838395-a3e81c1f3a15?w=400&h=250&fit=crop',
    ],
    status: 'open'
  },
  {
    type: 'found',
    title: 'Found House Keys',
    description: 'Found a bunch of house keys with a blue keychain at the subway station.',
    category: 'Keys',
    location: '42nd Street Subway, New York',
    images: [
      'https://images.unsplash.com/photo-1606933248051-5ce98e3e8435?w=400&h=250&fit=crop',
    ],
    status: 'open'
  },
  {
    type: 'lost',
    title: 'Lost Gold Watch',
    description: 'Vintage gold watch with sentimental value. Lost at coffee shop.',
    category: 'Accessories',
    location: 'Brooklyn, New York',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=250&fit=crop',
    ],
    status: 'open'
  },
  {
    type: 'found',
    title: 'Found Passport',
    description: 'Found a US passport near the train station. Need to find the owner.',
    category: 'Documents',
    location: 'Penn Station, New York',
    images: [
      'https://images.unsplash.com/photo-1615543824999-13df49479dc1?w=400&h=250&fit=crop',
    ],
    status: 'open'
  },
  {
    type: 'lost',
    title: 'Lost Pet - Golden Retriever',
    description: 'Missing golden retriever named Max. Last seen in the park on Sunday.',
    category: 'Pets',
    location: 'Prospect Park, Brooklyn',
    images: [
      'https://images.unsplash.com/photo-1633722715463-d30628cca1e5?w=400&h=250&fit=crop',
    ],
    status: 'open'
  },
  {
    type: 'found',
    title: 'Found Backpack',
    description: 'Found a blue backpack at the bus terminal. Contains school supplies.',
    category: 'Bags',
    location: 'Port Authority, New York',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=250&fit=crop',
    ],
    status: 'open'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing reports
    await ItemReport.deleteMany({});
    console.log('Cleared existing reports');

    // Insert sample reports
    const result = await ItemReport.insertMany(sampleReports);
    console.log(`Successfully inserted ${result.length} sample reports`);

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
