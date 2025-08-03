import React, {useEffect} from 'react';

import {type Car, carsService} from '../features/cars/api';

export const App = () => {
  const [cars, setCars] = React.useState<Car[]>([]);
  useEffect(() => {
    const getCars = async () => {
      const res = await carsService.getCars();
      setCars(res);
    };

    getCars();
  }, []);

  return (
    <div>
      {cars.map((car) => (
        <div>{car.name}</div>
      ))}
    </div>
  );
};
