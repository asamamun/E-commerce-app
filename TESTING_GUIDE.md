# Testing Guide - Categories Feature

## Issue Fixed
The categories dropdown in the frontend navigation was not working properly due to CSS `group-hover` issues.

## Changes Made

### Frontend (Layout.js)
1. **Replaced CSS-only dropdown with state-based dropdown**
   - Added `showCategoriesDropdown` state
   - Used `onMouseEnter` and `onMouseLeave` events
   - Added visual chevron icon to indicate dropdown

2. **Added mobile menu with categories**
   - Full mobile navigation menu
   - Collapsible categories section
   - Better mobile user experience

3. **Improved dropdown styling**
   - Higher z-index (z-50) to ensure it appears above other content
   - Added border for better visibility
   - Click handler to close dropdown when category is selected

## How to Test

### 1. Start the Backend
```bash
cd backend
npm run dev
```

### 2. Seed the Database (if not done already)
```bash
cd backend
npm run seed
```

This will create 5 categories:
- Electronics
- Clothing
- Books
- Home & Kitchen
- Sports & Outdoors

### 3. Start the Frontend
```bash
cd frontend
npm start
```

### 4. Test Categories Dropdown

#### Desktop View:
1. Open http://localhost:3000
2. Hover over "Categories" in the navigation bar
3. You should see a dropdown with all 5 categories
4. Click on any category (e.g., "Electronics")
5. You should be redirected to `/categories/{categoryId}`
6. The page should display:
   - Category name
   - Category description
   - All products in that category

#### Mobile View:
1. Resize browser to mobile size (or use DevTools mobile view)
2. Click the hamburger menu icon (☰)
3. Click on "Categories" to expand
4. Click on any category
5. Menu should close and navigate to category page

### 5. Verify Category Page

When you click on a category, you should see:
- Category name as heading
- Category description
- Grid of products in that category
- Each product card with:
  - Product image
  - Product name
  - Product description (truncated)
  - Price
  - "Add to Cart" button

### 6. Test API Endpoints Directly

You can also test the backend API directly:

```bash
# Get all categories
curl http://localhost:5000/api/categories

# Get single category (replace {id} with actual category ID)
curl http://localhost:5000/api/categories/{id}
```

## Expected Behavior

### Categories Dropdown:
- ✅ Appears on hover (desktop)
- ✅ Shows all available categories
- ✅ Closes when mouse leaves
- ✅ Closes when category is clicked
- ✅ Navigates to correct category page

### Mobile Menu:
- ✅ Opens when hamburger icon is clicked
- ✅ Categories section expands/collapses
- ✅ Menu closes after navigation
- ✅ All links work correctly

### Category Page:
- ✅ Displays category information
- ✅ Shows products filtered by category
- ✅ Products can be added to cart
- ✅ Shows "No products" message if category is empty

## Troubleshooting

### Categories dropdown not showing:
1. Check browser console for errors
2. Verify backend is running on port 5000
3. Check if categories are loaded in Redux state (use Redux DevTools)
4. Ensure database has categories (run seeder)

### Categories empty:
1. Run the seeder: `npm run seed` in backend directory
2. Check MongoDB connection in backend/.env
3. Verify categories exist in database

### Navigation not working:
1. Clear browser cache
2. Check React Router configuration in App.js
3. Verify all routes are properly defined

### API errors:
1. Check backend console for errors
2. Verify MongoDB is running
3. Check CORS configuration in backend

## Additional Notes

- The categories dropdown now uses React state instead of CSS-only hover
- Mobile menu provides better UX on smaller screens
- All category links use React Router for client-side navigation
- Categories are loaded once when Layout component mounts
- Category data is cached in Redux store

## Sample Login Credentials

After running the seeder:
- **Admin**: admin@example.com / admin123
- **User**: john@example.com / password123

Use admin account to manage categories at `/admin/categories`
