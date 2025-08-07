import {createAsyncThunk} from '@reduxjs/toolkit';

import type {carsService} from '../../features/vehicle-manager/api';
import type {AppDispatch, RootState} from '../store';

interface ExtraArgument {
  carsService: typeof carsService;
}

export type AppThunk = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: ExtraArgument;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<AppThunk>();
