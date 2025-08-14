import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEmail: null,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userEmail = action.payload.email;
      state.items = action.payload.email
        ? JSON.parse(localStorage.getItem(`cart_${action.payload.email}`)) || []
        : [];
    },
    addToCart(state, action) {
      if (!state.userEmail) return;
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem(
        `cart_${state.userEmail}`,
        JSON.stringify(state.items)
      );
    },
    removeFromCart(state, action) {
      if (!state.userEmail) return;
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem(
        `cart_${state.userEmail}`,
        JSON.stringify(state.items)
      );
    },
    adjustQuantity(state, action) {
      if (!state.userEmail) return;
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity >= 0) {
        item.quantity = quantity;
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      localStorage.setItem(
        `cart_${state.userEmail}`,
        JSON.stringify(state.items)
      );
    },
    clearCart(state) {
      if (state.userEmail) {
        state.items = [];
        localStorage.removeItem(`cart_${state.userEmail}`);
      }
    },
    logout(state) {
      state.userEmail = null;
      state.items = [];
    },
  },
});

export const {
  setUser,
  addToCart,
  removeFromCart,
  adjustQuantity,
  clearCart,
  logout,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
