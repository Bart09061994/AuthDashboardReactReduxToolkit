import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from './auth/cardSlice'
import authReducer from "./auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    card: cardsReducer,
  },
});
