import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';
import orderReducer from '../features/orderSlice';
import categoryReducer from '../features/categorySlice';
import wishlistReducer from '../features/wishlistSlice';
import reviewReducer from '../features/reviewSlice';
import adminReducer from '../features/adminSlice';
import analyticsReducer from '../features/analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    reviews: reviewReducer,
    admin: adminReducer,
    analytics: analyticsReducer,
  },
});

export default store;