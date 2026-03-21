import { createSlice } from "@reduxjs/toolkit";

const getStoredCart = (email) => {
  if (!email) return [];

  try {
    const raw = localStorage.getItem(`cart_${email}`);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Erro ao ler carrinho do localStorage:", error);
    return [];
  }
};

const saveCart = (email, items) => {
  if (!email) return;

  try {
    localStorage.setItem(`cart_${email}`, JSON.stringify(items));
  } catch (error) {
    console.error("Erro ao salvar carrinho no localStorage:", error);
  }
};

const removeStoredCart = (email) => {
  if (!email) return;

  try {
    localStorage.removeItem(`cart_${email}`);
  } catch (error) {
    console.error("Erro ao remover carrinho do localStorage:", error);
  }
};

const initialState = {
  userEmail: null,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUser(state, action) {
      const email = action.payload?.email ?? null;

      state.userEmail = email;
      state.items = email ? getStoredCart(email) : [];
    },

    clearUser(state) {
      state.userEmail = null;
      state.items = [];
    },

    addToCart(state, action) {
      if (!state.userEmail) return;

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCart(state.userEmail, state.items);
    },

    removeFromCart(state, action) {
      if (!state.userEmail) return;

      state.items = state.items.filter((item) => item.id !== action.payload);

      saveCart(state.userEmail, state.items);
    },

    adjustQuantity(state, action) {
      if (!state.userEmail) return;

      const { id, quantity } = action.payload;
      const item = state.items.find((product) => product.id === id);

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((product) => product.id !== id);
      } else {
        item.quantity = quantity;
      }

      saveCart(state.userEmail, state.items);
    },

    clearCart(state) {
      if (!state.userEmail) return;

      state.items = [];
      removeStoredCart(state.userEmail);
    },
  },
});

export const {
  setUser,
  clearUser,
  addToCart,
  removeFromCart,
  adjustQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;