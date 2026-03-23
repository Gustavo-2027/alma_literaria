import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/model/authSlice";
import cartReducer from "../../entities/cart/model/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});