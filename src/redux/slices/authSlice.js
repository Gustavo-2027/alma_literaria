import { createSlice } from "@reduxjs/toolkit";

const getStoredAuthUser = () => {
  try {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Erro ao ler authUser do localStorage:", error);
    return null;
  }
};

const initialState = {
  user: getStoredAuthUser(),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { id, email, name } = action.payload;

      state.user = { id, email, name };
      state.error = null;

      localStorage.setItem("authUser", JSON.stringify(state.user));
    },

    logout(state) {
      state.user = null;
      state.error = null;

      localStorage.removeItem("authUser");
    },

    setAuthError(state, action) {
      state.error = action.payload;
    },

    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, setAuthError, clearAuthError } =
  authSlice.actions;

export const authReducer = authSlice.reducer;