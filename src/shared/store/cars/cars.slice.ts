import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {Car} from '../../../features/vehicle-manager/api';
import type {SortValues} from '../../../features/vehicle-manager/cars-filters';

import {getCarsThunk} from './cars.thunk';

export interface CarsState {
  cars: Car[];
  defaultCars: Car[];
  carsLoading: boolean;
  carsError: string | undefined;
}

const name = 'cars-state';

const initialState: CarsState = {
  cars: [],
  defaultCars: [],
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
    sortCars: (state, {payload}: PayloadAction<SortValues>) => {
      if (payload === 'default') {
        state.cars = [...state.defaultCars];
        return;
      }
      state.cars = [...state.cars].sort((a, b) => {
        switch (payload) {
          case 'ascPrice':
            return a.price - b.price;
          case 'descPrice':
            return b.price - a.price;
          case 'ascYear':
            return a.year - b.year;
          case 'descYear':
            return b.year - a.year;
          default: {
            const exhaustiveCheck: never = payload;
            throw new Error(`Unhandled sort case: ${exhaustiveCheck}`);
          }
        }
      });
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
        state.defaultCars = payload;
      })
      .addCase(getCarsThunk.rejected, (state, {payload}) => {
        state.carsLoading = false;
        state.carsError = payload;
      });
  },
});

export const {updateCar, removeCar, sortCars} = carsSlice.actions;

export const carsReducer = carsSlice.reducer;
