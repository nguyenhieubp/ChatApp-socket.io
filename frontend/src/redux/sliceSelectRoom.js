import { createSlice } from "@reduxjs/toolkit";

const sliceSelectRoom = createSlice({
  name: "room",
  initialState: {
    room: null,
  },
  reducers: {
    selectRoom(state, action) {
      state.room = action.payload;
    },
  },
});

export const { selectRoom } = sliceSelectRoom.actions;
export default sliceSelectRoom.reducer;
