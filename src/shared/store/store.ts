import {useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {carsService} from '../../features/vehicle-manager/api';

import {carsReducer} from './cars/cars.slice';

export const store = configureStore({
  reducer: {
    carsState: carsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {carsService},
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
