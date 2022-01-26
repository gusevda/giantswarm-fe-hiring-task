import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchApps } from './appCatalogAPI';

export interface IAppCatalogState {
  apps: IApp[];
  status: 'idle' | 'loading' | 'failed';
  error?: string;
  searchQuery: string;
  filters: IAppCatalogFilters;
}

const initialState: IAppCatalogState = {
  apps: [],
  status: 'idle',
  searchQuery: '',
  filters: {},
};

export const fetchAppsAsync = createAsyncThunk(
  'appCatalog/fetchApps',
  fetchApps
);

export const appCatalogSlice = createSlice({
  name: 'appCatalog',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilter: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilter: (state, action: PayloadAction<string>) => {
      delete state.filters[action.payload];
    },
    clearAllFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAppsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.apps = action.payload;
      });
  },
});

export const { setSearchQuery, setFilter, clearFilter, clearAllFilters } =
  appCatalogSlice.actions;

export const selectApps = (state: RootState) => state.appCatalog.apps;
export const selectStatus = (state: RootState) => ({
  status: state.appCatalog.status,
  error: state.appCatalog.error,
});
export const selectSearchQuery = (state: RootState) =>
  state.appCatalog.searchQuery;
export const selectFilters = (state: RootState) => state.appCatalog.filters;

export default appCatalogSlice.reducer;
