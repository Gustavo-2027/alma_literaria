import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: null,
  profile: null,
  loading: true,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
    setSession(state, action) {
      state.session = action.payload;
      state.user = action.payload?.user ?? null;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.session = null;
      state.profile = null;
      state.loading = false;
      state.initialized = true;
    },
  },
});

export const {
  setAuthLoading,
  setInitialized,
  setSession,
  setProfile,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;