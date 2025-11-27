import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from '../services/orderService';

const initialState = {
  orders: [],
  order: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Create new order
export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, thunkAPI) => {
    try {
      const response = await OrderService.createOrder(orderData);
      return response.data.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get order by ID
export const getOrder = createAsyncThunk(
  'orders/get',
  async (orderId, thunkAPI) => {
    try {
      const response = await OrderService.getOrder(orderId);
      return response.data.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get logged in user orders
export const getMyOrders = createAsyncThunk(
  'orders/getMyOrders',
  async (_, thunkAPI) => {
    try {
      const response = await OrderService.getMyOrders();
      return response.data.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all orders (admin)
export const getOrders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await OrderService.getOrders();
      return response.data.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update order to delivered (admin)
export const updateOrderToDelivered = createAsyncThunk(
  'orders/updateToDelivered',
  async (orderId, thunkAPI) => {
    try {
      const response = await OrderService.deliverOrder(orderId);
      return response.data.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update order status (admin)
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await OrderService.updateOrderStatus(orderId, status);
      return response.data.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateOrderToDelivered.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderToDelivered.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        );
        // Also update the single order if it's in state
        if (state.order._id === action.payload._id) {
          state.order = action.payload;
        }
      })
      .addCase(updateOrderToDelivered.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        );
        // Also update the single order if it's in state
        if (state.order._id === action.payload._id) {
          state.order = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;