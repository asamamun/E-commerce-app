# Register 400 Error - Debugging Guide

## Changes Made

1. **Updated authSlice.js**:
   - Now uses shared `api` instance instead of axios directly
   - Improved error handling to check for both `error` and `message` properties
   - Added console.error for better debugging

2. **Updated Register.js**:
   - Added visual error message display
   - Shows password mismatch warning
   - Better error logging

## How to Debug

### 1. Check Browser Console
Open DevTools (F12) and look for:
- The actual error message from the backend
- Network request details
- Any validation errors

### 2. Check Network Tab
1. Open DevTools → Network tab
2. Try to register
3. Click on the `/auth/register` request
4. Check:
   - **Request Payload**: Should show `{ name, email, password }`
   - **Response**: Shows the actual error from backend
   - **Status Code**: 400 means validation or business logic error

### 3. Common 400 Errors

#### "User already exists"
- Email is already registered in database
- Solution: Use a different email or delete the user from MongoDB

#### "Please add a name"
- Name field is empty or missing
- Check form is sending the name field

#### "Please add an email"
- Email field is empty or missing
- Check form is sending the email field

#### "Please add a password"
- Password field is empty or missing
- Check form is sending the password field

#### "Password must be at least 6 characters"
- Password is too short
- Use a password with 6+ characters

#### "Please add a valid email"
- Email format is invalid
- Use proper email format: user@example.com

### 4. Test with Sample Data

Try registering with this data:
```
Name: Test User
Email: testuser@example.com
Password: password123
Confirm Password: password123
```

### 5. Check Backend Logs

In the terminal running the backend, you should see:
- The incoming request
- Any validation errors
- Stack traces if there's an error

### 6. Verify Backend is Running

```bash
# Test the register endpoint directly
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

Should return:
```json
{
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "role": "user",
  "token": "..."
}
```

Or error:
```json
{
  "success": false,
  "error": "User already exists"
}
```

### 7. Check MongoDB

If user already exists error:
```bash
# Connect to MongoDB
mongosh

# Use your database
use ecommerce

# Check if user exists
db.users.find({ email: "test@example.com" })

# Delete if needed
db.users.deleteOne({ email: "test@example.com" })
```

## Expected Flow

1. User fills form with name, email, password, confirm password
2. Frontend validates passwords match
3. Frontend sends POST to `/api/auth/register` with `{ name, email, password }`
4. Proxy forwards to `http://localhost:5000/api/auth/register`
5. Backend validates:
   - All required fields present
   - Email format valid
   - Password length >= 6
   - Email not already registered
6. Backend creates user and returns user data + token
7. Frontend stores token in localStorage
8. Frontend redirects to home page

## Troubleshooting Steps

### Step 1: Check Request Payload
In Network tab, verify the request is sending:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

NOT sending `password2` (confirm password) - that's frontend only!

### Step 2: Check Response
Look at the response body in Network tab:
```json
{
  "success": false,
  "error": "Actual error message here"
}
```

This error message should now appear in the red error box on the page.

### Step 3: Verify Proxy
Check the request URL in Network tab:
- Should be: `/api/auth/register` (relative)
- NOT: `http://localhost:5000/api/auth/register` (absolute)

If showing absolute URL, proxy isn't working - restart frontend!

### Step 4: Check Backend Validation
The User model requires:
- `name`: String, required, max 50 chars
- `email`: String, required, valid email format, unique
- `password`: String, required, min 6 chars

### Step 5: Test Different Scenarios

**Scenario 1: New User (Should Work)**
```
Name: John Smith
Email: johnsmith123@example.com
Password: password123
```

**Scenario 2: Existing User (Should Fail)**
```
Name: Admin User
Email: admin@example.com  (from seeder)
Password: admin123
```
Expected error: "User already exists"

**Scenario 3: Short Password (Should Fail)**
```
Name: Test User
Email: test@example.com
Password: 12345  (only 5 chars)
```
Expected error: "Password must be at least 6 characters"

**Scenario 4: Invalid Email (Should Fail)**
```
Name: Test User
Email: notanemail
Password: password123
```
Expected error: "Please add a valid email"

## Quick Fix Checklist

- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] Frontend was restarted after adding proxy
- [ ] Browser cache cleared
- [ ] Using a unique email (not already in database)
- [ ] Password is at least 6 characters
- [ ] Email is in valid format
- [ ] All form fields are filled
- [ ] Passwords match
- [ ] Network tab shows request to `/api/auth/register`
- [ ] Response shows actual error message

## Still Getting 400?

1. **Check the exact error message** in:
   - Browser console
   - Network tab response
   - Backend terminal logs

2. **Share the error details**:
   - Request payload
   - Response body
   - Backend console output

3. **Try curl command** to test backend directly:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test123@test.com","password":"test123"}'
   ```

If curl works but frontend doesn't, it's a frontend issue.
If curl also fails, it's a backend issue.
