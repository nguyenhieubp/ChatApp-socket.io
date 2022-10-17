import { configureStore } from "@reduxjs/toolkit";
import tableOpenSlice from "./sliceOpenOption";
import roomSlice from "./sliceSelectRoom";
import userSlice from "./sliceCurrentUser";
export const store = configureStore({
  reducer: {
    open: tableOpenSlice,
    room: roomSlice,
    user: userSlice,
  },
});
export default store;
