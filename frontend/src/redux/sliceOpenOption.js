import { createSlice } from "@reduxjs/toolkit";

const openTableSlice = createSlice({
  name: "open",
  initialState: {
    tableAdd: false,
    tableClick: false,
    tableSetting: false,
  },
  reducers: {
    openTableAdd(state) {
      state.tableAdd = true;
    },
    openTableClick(state) {
      state.tableClick = true;
    },
    openSetting(state) {
      state.tableSetting = true;
    },
    closeTableAdd(state) {
      state.tableAdd = false;
    },
    closeTableClick(state) {
      state.tableClick = false;
    },
    closeSetting(state) {
      state.tableSetting = false;
    },
  },
});

export const {
  openTableAdd,
  openTableClick,
  openSetting,
  closeTableAdd,
  closeTableClick,
  closeSetting,
} = openTableSlice.actions;
export default openTableSlice.reducer;
