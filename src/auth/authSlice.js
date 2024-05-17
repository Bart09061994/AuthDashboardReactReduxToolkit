import { createSlice } from "@reduxjs/toolkit";

const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};



// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromLocalStorage(),
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.status = "idle";
      state.error = null;
      saveUserToLocalStorage(action.payload);
    },
    login: (state, action) => {
      state.token = action.payload.token;
      state.status = "idle";
      state.error = null;
      localStorage.setItem("token", action.payload);

    },
    logout: (state) => {
            state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  register,
  login,
  logout,
  setError,
  clearError,
} = authSlice.actions;

export const selectError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;


export default authSlice.reducer;
