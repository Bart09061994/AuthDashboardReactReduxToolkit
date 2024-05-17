// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   token: null,
//   status: "idle",
//   error: null,
// };

// export const register = createAsyncThunk(
//   "auth/register",
//   async (userData, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/register", userData);
//       const token = response.data.token;
//       localStorage.setItem("token", token); // Salva il token nel localStorage
//       return { token };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "auth/login",
//   async (userData, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/login", userData);
//       const token = response.data.token;
//       localStorage.setItem("token", token); // Salva il token nel localStorage
//       return { token };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//       state.status = "idle";
//       state.error = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.token = action.payload.token;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(login.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;
