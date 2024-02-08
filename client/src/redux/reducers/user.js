import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserReq(state) {
      state.loading = true;
    },
    loadUserSuccess(state, action) {
      (state.loading = false), (state.isAuthenticated = true);

      state.user = action.payload;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { loadUserReq, loadUserFailed, loadUserSuccess, clearError } =
  userSlice.actions;

export default userSlice.reducer;
