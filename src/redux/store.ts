import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import tableReducer from './table/tableSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;