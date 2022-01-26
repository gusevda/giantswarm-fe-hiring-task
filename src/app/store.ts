import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appCatalogReducer from '../features/app-catalog/appCatalogSlice';
import appDetailsSlice from '../features/app-details/appDetailsSlice';

export const store = configureStore({
  reducer: {
    appCatalog: appCatalogReducer,
    appDetails: appDetailsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
