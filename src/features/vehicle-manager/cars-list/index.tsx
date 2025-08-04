import clsx from 'clsx';

import type {Car} from '../api';
import {CarItem} from '../car-item';

import './style.scss';

interface Props {
  cars: Car[];
  className?: string;
}

export const CarsList = ({cars, className}: Props) => {
  return (
    <ul className={clsx('cars-list', className)}>
      {cars.map((car) => {
        return (
          <li key={car.id}>
            <CarItem car={car} />
          </li>
        );
      })}
    </ul>
  );
};
