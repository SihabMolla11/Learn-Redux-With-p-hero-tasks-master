import { configureStore } from '@reduxjs/toolkit';
import baseApi from './features/Api/baseApi';
import tasksSlice from './features/tasks/tasksSlice';
import userSlice from './features/user/userSlice';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    tasksSlice: tasksSlice,
    userSlice: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
});


export default store;
