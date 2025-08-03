import {createSlice} from '@reduxjs/toolkit';

import type {Car} from '../../../features/cars/api';

import {getCarsThunk} from './cars.thunk';

export interface CarsState {
  cars: Car[];
  carsLoading: boolean;
  carsError: string | undefined;
}

const name = 'cars-state';

const initialState: CarsState = {
  cars: [],
  carsLoading: false,
  carsError: undefined,
};

const carsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarsThunk.pending, (state) => {
        state.carsLoading = true;
        state.carsError = undefined;
      })
      .addCase(getCarsThunk.fulfilled, (state, {payload}) => {
        state.carsLoading = false;
        state.cars = payload;
      })
      .addCase(getCarsThunk.rejected, (state, {payload}) => {
        state.carsLoading = false;
        state.carsError = payload;
      });
  },
});

export const carsReducer = carsSlice.reducer;
