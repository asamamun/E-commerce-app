# E-commerce App

A full-featured MERN Stack e-commerce application with user authentication, product management, shopping cart, order processing, and admin dashboard.

## Features

- User authentication and authorization (JWT)
- Product browsing with categories
- Shopping cart functionality
- Order management
- Payment processing
- Product reviews and ratings
- Admin dashboard with analytics
- User profile management
- Wishlist functionality
- Search and filter products

## Tech Stack

**Frontend:**
- React 19
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Cloudinary for image uploads

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd E-commerce-app
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Configure environment variables

Copy the example environment file and update with your values:
```bash
cd backend
cp .env.example .env
```

Then edit `backend/.env` with your actual configuration:
```env
MONGO_URI=mongodb://localhost:27017/ecommerce  # or your MongoDB Atlas URI
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development

# Stripe Keys (if using Stripe for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

**Important:** Never commit your `.env` file to git. It contains sensitive credentials.

### Seed Database with Sample Data

To populate your database with sample data (users, products, categories, orders, reviews):

```bash
cd backend
npm run seed
```

To clear all data from the database:
```bash
npm run seed:destroy
```

**Sample Login Credentials:**
- Admin: admin@example.com / admin123
- User: john@example.com / password123

See `backend/SEEDER_README.md` for more details about the sample data.

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

2. Start the frontend development server
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

## Project Structure

```
E-commerce-app/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── seeder.js        # Database seeder
│   └── server.js        # Express app entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── features/    # Redux slices
│       ├── pages/       # Page components
│       ├── services/    # API services
│       └── App.js       # Main app component
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/forgotpassword` - Request password reset
- PUT `/api/auth/resetpassword/:resettoken` - Reset password

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (Admin)
- PUT `/api/products/:id` - Update product (Admin)
- DELETE `/api/products/:id` - Delete product (Admin)

### Orders
- GET `/api/orders` - Get user orders
- GET `/api/orders/:id` - Get single order
- POST `/api/orders` - Create order
- PUT `/api/orders/:id` - Update order (Admin)

### Reviews
- GET `/api/reviews/product/:productId` - Get product reviews
- POST `/api/reviews` - Create review
- PUT `/api/reviews/:id` - Update review
- DELETE `/api/reviews/:id` - Delete review

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create category (Admin)
- PUT `/api/categories/:id` - Update category (Admin)
- DELETE `/api/categories/:id` - Delete category (Admin)

## License

This project is licensed under the ISC License.
