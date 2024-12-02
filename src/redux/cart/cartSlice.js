// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartCount += 1;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    incrementCount: (state, action) => {
      // Receives the id of item to be increased
      const itemId = action.payload;
      // Find item to be increased
      const itemToIncrease = state.cartItems.find(
        (item) => item._id === itemId
      );
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        state.cartCount += 1;
      }
    },
    decrementCount: (state, action) => {
      // Same with increment
      const itemId = action.payload;
      // Find item to be increased
      const itemToDecrease = state.cartItems.find(
        (item) => item._id === itemId
      );
      if (itemToDecrease) {
        itemToDecrease.quantity -= 1;
        state.cartCount -= 1;
      }
      if (itemToDecrease.quantity < 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
      }
    },
    clearCart: (state) => {
      // Reset the cart
      state.cartItems = [];
      state.cartCount = 0;
      state.totalPrice = 0;
    },
    calculateTotal: (state) => {
      let total = 0;
      let count = 0;
      state.cartItems.forEach((item) => {
        total += item.quantity * item.price;
        count += item.quantity;
      });
      state.totalPrice = total;
      state.cartCount = count;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, calculateTotal, incrementCount, decrementCount } = cartSlice.actions;
export default cartSlice.reducer;
