import { createSlice } from "@reduxjs/toolkit";

/* =========================
   STORAGE HELPERS
========================= */
function getCartStorageKey(email) {
  return email ? `cart_${email}` : null;
}

function readStoredCart(email) {
  const storageKey = getCartStorageKey(email);
  if (!storageKey || typeof window === "undefined") return [];

  try {
    const rawCart = window.localStorage.getItem(storageKey);
    if (!rawCart) return [];

    const parsedCart = JSON.parse(rawCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

function writeStoredCart(email, items) {
  const storageKey = getCartStorageKey(email);
  if (!storageKey || typeof window === "undefined") return;

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  } catch {
    // noop
  }
}

function clearStoredCart(email) {
  const storageKey = getCartStorageKey(email);
  if (!storageKey || typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // noop
  }
}

/* =========================
   CART HELPERS
========================= */
function findCartItem(items, id) {
  return items.find((item) => item.id === id);
}

function persistCartState(state) {
  if (!state.userEmail) return;
  writeStoredCart(state.userEmail, state.items);
}

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
      state.items = email ? readStoredCart(email) : [];
    },

    clearUser(state) {
      state.userEmail = null;
      state.items = [];
    },

    addToCart(state, action) {
      if (!state.userEmail) return;

      const incomingItem = action.payload;
      if (!incomingItem?.id) return;

      const existingItem = findCartItem(state.items, incomingItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...incomingItem,
          quantity: 1,
        });
      }

      persistCartState(state);
    },

    removeFromCart(state, action) {
      if (!state.userEmail) return;

      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      persistCartState(state);
    },

    adjustQuantity(state, action) {
      if (!state.userEmail) return;

      const { id, quantity } = action.payload ?? {};
      if (!id || typeof quantity !== "number") return;

      const existingItem = findCartItem(state.items, id);
      if (!existingItem) return;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity = quantity;
      }

      persistCartState(state);
    },

    clearCart(state) {
      if (!state.userEmail) return;

      state.items = [];
      clearStoredCart(state.userEmail);
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

export default cartSlice.reducer;


