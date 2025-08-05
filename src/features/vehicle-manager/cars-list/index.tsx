import clsx from 'clsx';

import type {Car} from '../api';
import {CarItem} from '../car-item';

import './style.scss';

interface Props {
  cars: Car[];
  className?: string;
}

const CarListItem = ({carItem}: {carItem: Car}) => {
  return (
    <li>
      <CarItem car={carItem} />
    </li>
  );
};

export const CarsList = ({cars, className}: Props) => {
  return (
    <ul className={clsx('cars-list', className)}>
      {cars.map((car) => {
        return <CarListItem key={car.id} carItem={car} />;
      })}
    </ul>
  );
};
