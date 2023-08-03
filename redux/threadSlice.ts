import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread } from '@/Types';
import { generateThreads } from '@/Data/Data';


const initialState: Thread[] = generateThreads();

const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
});

export default threadSlice.reducer;
