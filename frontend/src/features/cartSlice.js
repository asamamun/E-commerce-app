import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return {
        cartItems: [],
        totalQuantity: 0,
        totalAmount: 0,
      };
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return {
      cartItems: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (cartItems, totalQuantity, totalAmount) => {
  try {
    const serializedCart = JSON.stringify({
      cartItems,
      totalQuantity,
      totalAmount,
    });
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Could not save cart to localStorage', err);
  }
};

const cartFromStorage = loadCartFromLocalStorage();

const initialState = {
  cartItems: cartFromStorage.cartItems,
  totalQuantity: cartFromStorage.totalQuantity,
  totalAmount: cartFromStorage.totalAmount,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      
      state.totalQuantity += 1;
      state.totalAmount += item.price;
      
      saveCartToLocalStorage(state.cartItems, state.totalQuantity, state.totalAmount);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === itemId);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((i) => i._id !== itemId);
      }
      
      saveCartToLocalStorage(state.cartItems, state.totalQuantity, state.totalAmount);
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === itemId);
      
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += existingItem.price;
      }
      
      saveCartToLocalStorage(state.cartItems, state.totalQuantity, state.totalAmount);
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
      }
      
      saveCartToLocalStorage(state.cartItems, state.totalQuantity, state.totalAmount);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      saveCartToLocalStorage([], 0, 0);
    },
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, reset } = cartSlice.actions;
export default cartSlice.reducer;