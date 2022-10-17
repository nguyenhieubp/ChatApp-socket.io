import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getUserCurrent = createAsyncThunk(
  "fetchUser/getUserCurrent",
  async (token) => {
    const response = await axios.get("/api/v1/auth/userCurrent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  }
);

export const userCurrentSlice = createSlice({
  name: "fetchUser",
  initialState: {
    user: null,
  },
  extraReducers: {
    [getUserCurrent.pending]: (state) => {
      state.user = null;
    },
    [getUserCurrent.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [getUserCurrent.rejected]: (state) => {
      state.user = null;
    },
  },
});
export default userCurrentSlice.reducer;
