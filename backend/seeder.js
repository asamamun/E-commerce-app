const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample Users
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Bob Wilson',
    email: 'bob@example.com',
    password: 'password123',
    role: 'user'
  }
];

// Sample Categories
const categories = [
  {
    name: 'Electronics',
    description: 'Electronic devices and gadgets including smartphones, laptops, and accessories',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
  },
  {
    name: 'Clothing',
    description: 'Fashion and apparel for men, women, and children',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400'
  },
  {
    name: 'Books',
    description: 'Wide selection of books across all genres',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'
  },
  {
    name: 'Home & Kitchen',
    description: 'Home decor, furniture, and kitchen appliances',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400'
  },
  {
    name: 'Sports & Outdoors',
    description: 'Sports equipment and outdoor gear',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'
  }
];

// Sample Products
const products = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features advanced audio technology for crystal clear sound.',
    price: 199.99,
    category: 'Electronics',
    brand: 'AudioTech',
    stock: 50,
    sold: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    ratings: 4.5,
    numReviews: 0
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and water resistance up to 50m.',
    price: 299.99,
    category: 'Electronics',
    brand: 'TechWear',
    stock: 30,
    sold: 15,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    ratings: 4.7,
    numReviews: 0
  },
  {
    name: 'Laptop Stand Aluminum',
    description: 'Ergonomic laptop stand made from premium aluminum. Adjustable height and angle for comfortable working.',
    price: 49.99,
    category: 'Electronics',
    brand: 'DeskPro',
    stock: 100,
    sold: 40,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    ratings: 4.3,
    numReviews: 0
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Perfect for work and gaming.',
    price: 29.99,
    category: 'Electronics',
    brand: 'TechGear',
    stock: 75,
    sold: 60,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    ratings: 4.4,
    numReviews: 0
  },
  
  // Clothing
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with a modern fit. Made from premium quality denim fabric.',
    price: 79.99,
    category: 'Clothing',
    brand: 'UrbanStyle',
    stock: 60,
    sold: 30,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    ratings: 4.6,
    numReviews: 0
  },
  {
    name: 'Cotton T-Shirt Pack',
    description: 'Pack of 3 premium cotton t-shirts. Comfortable, breathable, and perfect for everyday wear.',
    price: 39.99,
    category: 'Clothing',
    brand: 'ComfortWear',
    stock: 120,
    sold: 80,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    ratings: 4.5,
    numReviews: 0
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning technology. Perfect for long-distance running.',
    price: 89.99,
    category: 'Clothing',
    brand: 'SportFit',
    stock: 45,
    sold: 35,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    ratings: 4.8,
    numReviews: 0
  },
  
  // Books
  {
    name: 'The Art of Programming',
    description: 'Comprehensive guide to modern programming practices. Perfect for beginners and experienced developers.',
    price: 34.99,
    category: 'Books',
    brand: 'TechBooks',
    stock: 80,
    sold: 45,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    ratings: 4.7,
    numReviews: 0
  },
  {
    name: 'Mystery Novel Collection',
    description: 'Collection of bestselling mystery novels. Hours of thrilling entertainment.',
    price: 24.99,
    category: 'Books',
    brand: 'ReadMore',
    stock: 90,
    sold: 55,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    ratings: 4.4,
    numReviews: 0
  },
  
  // Home & Kitchen
  {
    name: 'Stainless Steel Cookware Set',
    description: '10-piece professional cookware set. Durable stainless steel construction with non-stick coating.',
    price: 149.99,
    category: 'Home & Kitchen',
    brand: 'ChefPro',
    stock: 35,
    sold: 20,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    ratings: 4.6,
    numReviews: 0
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe. Brew perfect coffee every morning.',
    price: 79.99,
    category: 'Home & Kitchen',
    brand: 'BrewMaster',
    stock: 50,
    sold: 30,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    ratings: 4.5,
    numReviews: 0
  },
  {
    name: 'Decorative Throw Pillows Set',
    description: 'Set of 4 decorative throw pillows. Soft, comfortable, and stylish home decor.',
    price: 44.99,
    category: 'Home & Kitchen',
    brand: 'HomeStyle',
    stock: 70,
    sold: 40,
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
    ratings: 4.3,
    numReviews: 0
  },
  
  // Sports & Outdoors
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with non-slip surface. Perfect for yoga, pilates, and floor exercises.',
    price: 34.99,
    category: 'Sports & Outdoors',
    brand: 'FitLife',
    stock: 85,
    sold: 50,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    ratings: 4.7,
    numReviews: 0
  },
  {
    name: 'Camping Tent 4-Person',
    description: 'Spacious 4-person camping tent. Waterproof, easy to set up, perfect for family camping trips.',
    price: 159.99,
    category: 'Sports & Outdoors',
    brand: 'OutdoorPro',
    stock: 25,
    sold: 12,
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400',
    ratings: 4.6,
    numReviews: 0
  },
  {
    name: 'Dumbbell Set Adjustable',
    description: 'Adjustable dumbbell set with multiple weight options. Perfect for home gym workouts.',
    price: 129.99,
    category: 'Sports & Outdoors',
    brand: 'PowerFit',
    stock: 40,
    sold: 25,
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    ratings: 4.8,
    numReviews: 0
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed...'.red.inverse);

    // Create users
    const createdUsers = await User.create(users);
    console.log('Users Imported...'.green.inverse);

    // Create categories
    const createdCategories = await Category.create(categories);
    console.log('Categories Imported...'.green.inverse);

    // Create products
    const createdProducts = await Product.create(products);
    console.log('Products Imported...'.green.inverse);

    // Create sample reviews
    const reviews = [
      {
        product: createdProducts[0]._id,
        user: createdUsers[1]._id,
        rating: 5,
        comment: 'Excellent headphones! Sound quality is amazing and battery life is great.'
      },
      {
        product: createdProducts[0]._id,
        user: createdUsers[2]._id,
        rating: 4,
        comment: 'Very good headphones, comfortable for long use. Noise cancellation works well.'
      },
      {
        product: createdProducts[1]._id,
        user: createdUsers[1]._id,
        rating: 5,
        comment: 'Best smartwatch I have ever owned. Fitness tracking is very accurate.'
      },
      {
        product: createdProducts[4]._id,
        user: createdUsers[2]._id,
        rating: 5,
        comment: 'Perfect fit and great quality denim. Highly recommend!'
      },
      {
        product: createdProducts[6]._id,
        user: createdUsers[3]._id,
        rating: 5,
        comment: 'Most comfortable running shoes ever. Great for marathon training.'
      }
    ];

    const createdReviews = await Review.create(reviews);
    console.log('Reviews Imported...'.green.inverse);

    // Update product review counts
    for (const review of createdReviews) {
      const product = await Product.findById(review.product);
      product.numReviews += 1;
      await product.save();
    }

    // Create sample orders
    const orders = [
      {
        user: createdUsers[1]._id,
        orderItems: [
          {
            product: createdProducts[0]._id,
            quantity: 1,
            price: createdProducts[0].price
          },
          {
            product: createdProducts[3]._id,
            quantity: 2,
            price: createdProducts[3].price
          }
        ],
        shippingAddress: {
          address: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'USA'
        },
        paymentMethod: 'PayPal',
        itemsPrice: 259.97,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 259.97,
        isPaid: true,
        paidAt: Date.now(),
        isDelivered: true,
        deliveredAt: Date.now()
      },
      {
        user: createdUsers[2]._id,
        orderItems: [
          {
            product: createdProducts[1]._id,
            quantity: 1,
            price: createdProducts[1].price
          }
        ],
        shippingAddress: {
          address: '456 Oak Ave',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA'
        },
        paymentMethod: 'Credit Card',
        itemsPrice: 299.99,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 299.99,
        isPaid: true,
        paidAt: Date.now(),
        isDelivered: false
      },
      {
        user: createdUsers[3]._id,
        orderItems: [
          {
            product: createdProducts[4]._id,
            quantity: 1,
            price: createdProducts[4].price
          },
          {
            product: createdProducts[6]._id,
            quantity: 1,
            price: createdProducts[6].price
          }
        ],
        shippingAddress: {
          address: '789 Pine Rd',
          city: 'Chicago',
          postalCode: '60601',
          country: 'USA'
        },
        paymentMethod: 'PayPal',
        itemsPrice: 169.98,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 169.98,
        isPaid: true,
        paidAt: Date.now(),
        isDelivered: true,
        deliveredAt: Date.now()
      }
    ];

    await Order.create(orders);
    console.log('Orders Imported...'.green.inverse);

    console.log('All Data Imported Successfully!'.green.bold);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use -i to import data or -d to delete data'.yellow);
  process.exit();
}
