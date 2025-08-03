import {createAsyncThunk} from '@reduxjs/toolkit';

import type {AppDispatch, RootState} from '../store';

export type AppThunk = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<AppThunk>();
