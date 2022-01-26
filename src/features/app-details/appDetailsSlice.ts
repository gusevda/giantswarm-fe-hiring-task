import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchApp, fetchReadme } from './appAPI';

export interface IAppState {
  app?: IApp;
  status: 'idle' | 'loading' | 'failed';
  error?: string;
  readme?: string;
  readmeStatus: 'idle' | 'loading' | 'failed';
  readmeError?: string;
}

const initialState: IAppState = {
  status: 'idle',
  readme: undefined,
  readmeStatus: 'idle',
};

export const fetchAppAsync = createAsyncThunk('appDetails/fetchApps', fetchApp);
export const fetchReadmeAsync = createAsyncThunk(
  'appDetails/fetchReadme',
  fetchReadme
);

export const appDetailsSlice = createSlice({
  name: 'appDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAppAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.app = action.payload;
      })
      .addCase(fetchReadmeAsync.pending, (state) => {
        state.readmeStatus = 'loading';
      })
      .addCase(fetchReadmeAsync.rejected, (state, action) => {
        state.readmeStatus = 'failed';
        state.readmeError = action.error.message;
      })
      .addCase(fetchReadmeAsync.fulfilled, (state, action) => {
        state.readmeStatus = 'idle';
        state.readme = action.payload;
      });
  },
});

export const selectApp = (state: RootState) => state.appDetails.app;
export const selectStatus = (state: RootState) => ({
  status: state.appDetails.status,
  error: state.appDetails.error,
});
export const selectReadme = (state: RootState) => state.appDetails.readme;
export const selectReadmeStatus = (state: RootState) => ({
  status: state.appDetails.readmeStatus,
  error: state.appDetails.readmeError,
});

export default appDetailsSlice.reducer;
