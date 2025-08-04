import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {Car} from '../../../features/vehicle-manager/api';

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
  reducers: {
    updateCar: (state, {payload}: PayloadAction<Car>) => {
      state.cars = state.cars.map((car) =>
        car.id === payload.id ? {...car, ...payload} : car
      );
    },
    removeCar: (state, {payload}: PayloadAction<Car['id']>) => {
      state.cars = state.cars.filter((car) => car.id !== payload);
    },
  },
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

export const {updateCar, removeCar} = carsSlice.actions;

export const carsReducer = carsSlice.reducer;
