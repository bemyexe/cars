import {useEffect} from 'react';
import clsx from 'clsx';

import {useAppDispatch, useAppSelector} from '../../shared/store';
import {carsSelectors, getCarsThunk} from '../../shared/store/cars';

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
  console.log(cars);
  return (
    <div className={clsx('vehicle-manager', className)}>
      <CarsList cars={cars} />
      {error && <div>{error}</div>}
    </div>
  );
};
