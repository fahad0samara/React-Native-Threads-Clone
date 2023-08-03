import {configureStore} from "@reduxjs/toolkit";
import threadReducer from "./threadSlice";

import { Thread } from "@/Types";

const store = configureStore({
  reducer: {
    threads: threadReducer,
  },
});

export default store;

// Use the RootState type for useSelector in components
export type AppDispatch = typeof store.dispatch;
export interface RootState {
  threads: Thread[];
}


