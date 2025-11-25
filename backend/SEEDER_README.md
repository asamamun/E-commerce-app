# Database Seeder

This seeder file populates your MongoDB database with sample data for testing and development.

## What's Included

The seeder creates:

### Users (4 users)
- **Admin User**: admin@example.com (password: admin123) - Admin role
- **John Doe**: john@example.com (password: password123) - Regular user
- **Jane Smith**: jane@example.com (password: password123) - Regular user
- **Bob Wilson**: bob@example.com (password: password123) - Regular user

### Categories (5 categories)
- Electronics
- Clothing
- Books
- Home & Kitchen
- Sports & Outdoors

### Products (15 products)
- Various products across all categories with realistic data
- Includes images, prices, stock quantities, and ratings

### Reviews (5 reviews)
- Sample reviews from users on various products

### Orders (3 orders)
- Sample orders with different statuses (paid, delivered, pending)

## Usage

### Import Data (Seed Database)
```bash
cd backend
node seeder.js -i
```

This will:
1. Delete all existing data
2. Import all sample data
3. Display success messages for each data type

### Delete Data (Clear Database)
```bash
cd backend
node seeder.js -d
```

This will remove all data from the database.

## Important Notes

- Make sure your MongoDB connection is configured in the `.env` file
- The seeder will **DELETE ALL EXISTING DATA** before importing
- Passwords are automatically hashed using bcrypt
- All sample data uses placeholder images from Unsplash

## Testing the Application

After seeding, you can:
1. Login as admin: admin@example.com / admin123
2. Login as user: john@example.com / password123
3. Browse products across different categories
4. View existing orders and reviews
5. Test all CRUD operations

## Customization

To add more sample data, edit the arrays in `seeder.js`:
- `users` - Add more user accounts
- `categories` - Add more product categories
- `products` - Add more products
- `reviews` - Add more product reviews
- `orders` - Add more sample orders
