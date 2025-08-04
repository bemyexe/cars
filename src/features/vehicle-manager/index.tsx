import {useEffect} from 'react';
import clsx from 'clsx';

import {useAppDispatch, useAppSelector} from '../../shared/store';
import {carsSelectors, getCarsThunk} from '../../shared/store/cars';

import {CarsFilters} from './cars-filters';
import {CarsList} from './cars-list';

import './style.scss';

interface Props {
  className?: string;
}

export const VehicleManager = ({className}: Props) => {
  const cars = useAppSelector(carsSelectors.selectCars);
  const error = useAppSelector(carsSelectors.selectCarsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCarsThunk());
  }, [dispatch]);

  return (
    <div className={clsx('vehicle-manager', className)}>
      <CarsFilters />
      <CarsList cars={cars} />
      {error && <div>{error}</div>}
    </div>
  );
};
