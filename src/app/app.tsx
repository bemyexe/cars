import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../shared/store';
import {carsSelectors, getCarsThunk} from '../shared/store/cars';

export const App = () => {
  const cars = useAppSelector(carsSelectors.selectCars);
  const error = useAppSelector(carsSelectors.selectCarsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCarsThunk());
  }, []);
  console.log(error);
  return (
    <div>
      {cars.map((car) => (
        <div key={car.id}>{car.name}</div>
      ))}
    </div>
  );
};
