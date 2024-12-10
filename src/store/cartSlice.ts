import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodItem } from '../types/Data';

export interface CartItem extends FoodItem {
  quantity: number; // Extending FoodItem to include quantity
}

interface CartState {
  items: CartItem[]; // Use CartItem instead of FoodItem
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<FoodItem>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity += 1;
      } else {
        // Add new item with quantity: 1 if it doesn't exist
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    decrementItemQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item._id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Remove item if quantity reaches 0
          state.items = state.items.filter(item => item._id !== action.payload);
        }
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  decrementItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
