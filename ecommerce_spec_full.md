# Single Vendor Monolithic MERN based E-Commerce Application -- Technical Specification

## 1. Technology Stack

### **Frontend**

-   React.js
-   TailwindCSS (styling)
-   Redux Toolkit (state management)
-   Redux Toolkit + Local Storage (cart management)
-   React Router DOM (routing)
-   Axios (API state management)
-   React Helmet (SEO optimization)
-   Framer Motion (component animations)
-   React Hook Form + Yup (form handling & validation)
-   React Toastify (toast notifications)
-   Swiper (image sliders/carousels)
-   React Modal (modals)
-   React Icons (icons)
-   React.lazy (lazy loading)

### **Backend**

-   Node.js
-   Express.js
-   MongoDB (database)
-   JSON Web Token (user authentication)
-   Nodemailer (email verification)
-   Cloudinary (file upload handling)
-   SSLCommerz (payment gateway integration)
-   Sharp (image compression)
-   Multer (file receiving before compression)

### **Testing**

-   Jest (unit testing)

### **Hosting & Storage**

-   Self-hosted backend server
-   Images stored in server filesystem
-   CDN layer via NGINX caching
-   Compressed images using Sharp
-   MongoDB stores image URLs only

------------------------------------------------------------------------

## 2. Functional Requirements

### **User Features**

-   User registration, login, logout (JWT based)
-   Email verification via Nodemailer
-   Profile management
-   Product browsing, search, filtering, sorting
-   Add to cart, remove, update quantity
-   Cart stored in Redux + LocalStorage
-   Checkout processing using SSLCommerz
-   View order history
-   Wishlist (optional)
-   Product reviews and ratings
-   Responsive UI

### **Admin Features**

-   Product CRUD with image upload
-   Category management
-   Order management
-   Inventory management
-   Dashboard overview
-   Email notifications for orders

------------------------------------------------------------------------

## 3. Non-Functional Requirements

-   Mobile responsive UI
-   SEO optimized frontend
-   High performance with lazy loading
-   Secure authentication
-   Sanitized inputs
-   Scalable folder structure
-   Accessibility compliance
-   CDN accelerated image delivery

------------------------------------------------------------------------

## 4. Frontend Architecture

### **Routing**

-   Public routes
-   Private routes (JWT protected)
-   Admin routes (role-based)
-   Lazy loaded pages

### **State Structure (Redux Toolkit)**

-   User Slice
-   Cart Slice (persists to local storage)
-   Product Slice
-   Order Slice
-   Category Slice

### **UI Components**

-   Reusable modals
-   Reusable buttons & inputs
-   Toast notification system
-   Hero sliders using Swiper
-   Animations using Framer Motion

------------------------------------------------------------------------

## 5. Backend Architecture

### **API Structure**

-   `/api/auth` → login, register, email verify
-   `/api/products` → CRUD, search, filter
-   `/api/orders` → create order, update status
-   `/api/categories` → CRUD
-   `/api/payments` → SSLCommerz integration
-   `/api/uploads` → image upload & compression
-   `/api/users` → profile & roles

### **Middleware**

-   JWT authentication
-   Admin role protection
-   Multer file parser
-   Sharp compression middleware
-   Error handling middleware
-   Request input validation

------------------------------------------------------------------------

## 6. Database Schema (MongoDB)

### **Collections**

-   Users
-   Products
-   Categories
-   Orders
-   Email verification tokens
-   Cart (optional)
-   Reviews

Products store: - Title, Description - Images (URLs only) - Pricing -
Stock - Categories - Reviews (subdocuments)

Orders store: - Product list - Payment status - Transaction ID
(SSLCommerz) - Shipping details - User reference

------------------------------------------------------------------------

## 7. Image Handling Specification

### **Flow**

1.  Client uploads image → Axios\

2.  Express receives file via Multer\

3.  Sharp compresses it:

    -   Resize width max 1000px
    -   Convert to WebP (quality 75--80)

4.  Compressed file saved into:

        /uploads/products/
        /uploads/users/
        /uploads/banners/

5.  Serve via NGINX CDN layer\

6.  MongoDB stores only:

        https://yourdomain.com/uploads/products/filename.webp

### **Advantages**

-   Fast delivery due to CDN caching\
-   Low storage footprint due to compression\
-   No vendor lock-in (self-hosted)\
-   Scales horizontally

------------------------------------------------------------------------

## 8. Payment Integration (SSLCommerz)/ It will be on final phase

### **Features**

-   Payment initialization
-   Payment success callback
-   Payment failure handling
-   Order confirmation email via Nodemailer

------------------------------------------------------------------------

## 9. Email Verification (Nodemailer) - It will be on final phase


-   Send verification link after registration\
-   Link contains JWT token\
-   Verify user → activate account

------------------------------------------------------------------------

## 10. Testing Strategy

-   Unit tests using Jest\
-   API testing using Thunder Client or Bruno

------------------------------------------------------------------------

## 11. Deployment & DevOps

### **Environment**

-   NGINX reverse proxy + CDN caching\
-   PM2 process manager\
-   SSL certificate (Let's Encrypt)\
-   Cron job for filesystem + DB backup

### **Build**

-   React built with Vite or CRA\
-   Backend run on Node.js + PM2

------------------------------------------------------------------------

## 12. Summary

This spec defines a complete, self-hosted, single-vendor e-commerce
platform using MERN technologies, modern animation & validation tools,
SSLCommerz payment integration, Nodemailer email verification,
Cloudinary uploads, and optimized filesystem image storage with CDN
caching.
