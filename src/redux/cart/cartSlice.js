// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity } = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Update the quantity and total price of the existing item
        existingItem.quantity += quantity;
        existingItem.totalPrice += price * quantity;
      } else {
        // Add the new item to the cart
        state.items.push({
          id,
          name,
          price,
          quantity,
          totalPrice: price * quantity,
        });
      }

      // Update global cart stats
      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;

      // Find the item to remove
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Update global cart stats
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;

        // Remove the item from the cart
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    clearCart: (state) => {
      // Reset the cart
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
