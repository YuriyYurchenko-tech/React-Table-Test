import { createSlice } from '@reduxjs/toolkit';
import { fetchData, addRow, updateRow, deleteRow } from './tableAsyncThunk';
import type { DocumentDataType } from '../../types/documentTypes';

interface TableState {
  data: DocumentDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  data: [],
  loading: false,
  error: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch data';
      state.data = [];
    })
      .addCase(addRow.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.unshift(action.payload);
        }
      })
      .addCase(updateRow.fulfilled, (state, action) => {
        const index = state.data.findIndex((row) => row.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteRow.fulfilled, (state, action) => {
        state.data = state.data.filter((row) => row.id !== action.payload);
      });
  },
});

export default tableSlice.reducer;