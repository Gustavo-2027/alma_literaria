import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("authUser")) || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { id, email, nome } = action.payload;
      state.user = { id, email, nome };
      state.error = null;
      localStorage.setItem("authUser", JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem("authUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
