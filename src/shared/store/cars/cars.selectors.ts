import {createSelector} from '@reduxjs/toolkit';

import type {RootState} from '../store';

import type {CarsState} from './cars.slice';

const selectCarsState: (state: RootState) => CarsState = (state) =>
  state.carsState;

const selectCars = createSelector(selectCarsState, (state) => state.cars);

const selectCarsLoading = createSelector(
  selectCarsState,
  (state) => state.carsLoading
);
const selectCarsError = createSelector(
  selectCarsState,
  (state) => state.carsError
);

export const carsSelectors = {
  selectCars,
  selectCarsLoading,
  selectCarsError,
};
