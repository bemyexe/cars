import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../shared/store';
import {carsSelectors, getCarsThunk} from '../shared/store/cars';

export const App = () => {
  const cars = useAppSelector(carsSelectors.selectCars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCarsThunk());
  }, []);

  return (
    <div>
      {cars.map((car) => (
        <div key={car.id}>{car.name}</div>
      ))}
    </div>
  );
};
