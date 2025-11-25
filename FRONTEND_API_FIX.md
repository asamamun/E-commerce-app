# Frontend API Connection Fix

## Issues Fixed

1. **Missing Proxy Configuration**
   - Added `"proxy": "http://localhost:5000"` to `frontend/package.json`
   - This allows the frontend to make API calls to `/api/*` which will be proxied to `http://localhost:5000/api/*`

2. **Service Response Handling**
   - Fixed `categoryService.js` and `productService.js` to return the full response object
   - Redux slices will extract `response.data.data` to get the actual data array

## What Changed

### frontend/package.json
```json
{
  ...
  "proxy": "http://localhost:5000"
}
```

### frontend/src/services/categoryService.js & productService.js
Changed from:
```javascript
return response.data;  // Returns { success: true, data: [...] }
```

To:
```javascript
return response;  // Returns full axios response, Redux slice will extract response.data.data
```

## IMPORTANT: Restart Required

**You MUST restart the frontend development server for the proxy to take effect!**

### Steps to Apply Fix:

1. **Stop the frontend server** (Ctrl+C in the terminal running `npm start`)

2. **Restart the frontend server**:
   ```bash
   cd frontend
   npm start
   ```

3. **Verify the fix**:
   - Open browser console (F12)
   - Go to Network tab
   - Refresh the page
   - You should see requests to `/api/categories` and `/api/products`
   - These should return 200 status with data

## How to Test

### 1. Check Backend is Running
```bash
# In one terminal
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

### 2. Test Backend API Directly
Open browser or use curl:
```bash
curl http://localhost:5000/api/categories
```

Should return:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "name": "Electronics",
      "description": "...",
      ...
    },
    ...
  ]
}
```

### 3. Start Frontend (FRESH START)
```bash
# Stop if running, then start fresh
cd frontend
npm start
```

### 4. Check Browser Console
1. Open http://localhost:3000
2. Open DevTools (F12)
3. Go to Console tab
4. Look for any errors
5. Go to Network tab
6. Refresh page
7. Look for `/api/categories` and `/api/products` requests
8. They should show status 200

### 5. Check Redux State
If you have Redux DevTools installed:
1. Open Redux DevTools
2. Look at the state tree
3. Check `category.categories` - should have array of 5 categories
4. Check `product.products` - should have array of 15 products

## Expected Behavior After Fix

### Categories Dropdown:
- ✅ Loads 5 categories from database
- ✅ Displays in dropdown menu
- ✅ Clicking navigates to category page

### Products Page:
- ✅ Loads 15 products from database
- ✅ Displays in grid layout
- ✅ Shows product images, names, prices

### Home Page:
- ✅ May show featured products
- ✅ Categories section populated

## Troubleshooting

### Still not working after restart?

1. **Clear browser cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear cache in DevTools

2. **Check backend is actually running**:
   ```bash
   curl http://localhost:5000/api/categories
   ```

3. **Check MongoDB has data**:
   ```bash
   cd backend
   node seeder.js -i
   ```

4. **Check for CORS errors in console**:
   - If you see CORS errors, the proxy might not be working
   - Make sure you restarted the frontend server

5. **Check the actual API calls**:
   - Open Network tab in DevTools
   - Look at the request URL - should be `/api/categories` not `http://localhost:3000/api/categories`
   - Check response - should have data

### Common Errors:

**Error: "Cannot GET /api/categories"**
- Backend is not running
- Start backend: `cd backend && npm run dev`

**Error: "Network Error" or "ERR_CONNECTION_REFUSED"**
- Proxy not working
- Restart frontend server completely

**Error: "categories is not iterable" or "Cannot read property 'map' of undefined"**
- Data structure mismatch
- Check Redux state in DevTools
- Verify response format matches expected structure

**Categories array is empty []**
- Database not seeded
- Run: `cd backend && npm run seed`

## Data Flow

```
1. Component mounts
   ↓
2. Dispatches Redux action (e.g., getCategories())
   ↓
3. Redux thunk calls CategoryService.getCategories()
   ↓
4. Service makes axios call to '/api/categories'
   ↓
5. Proxy forwards to 'http://localhost:5000/api/categories'
   ↓
6. Backend returns: { success: true, data: [...] }
   ↓
7. Axios returns full response object
   ↓
8. Redux thunk extracts response.data.data = [...]
   ↓
9. Redux state updated with categories array
   ↓
10. Component re-renders with data
```

## Verification Checklist

- [ ] Backend running on port 5000
- [ ] Database seeded with sample data
- [ ] Frontend package.json has proxy configuration
- [ ] Frontend server restarted after adding proxy
- [ ] Browser cache cleared
- [ ] Network tab shows successful API calls
- [ ] Redux state contains categories and products
- [ ] Categories dropdown shows items
- [ ] Products page displays items
