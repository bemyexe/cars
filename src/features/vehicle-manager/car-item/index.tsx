import clsx from 'clsx';

import type {Car} from '../api';

import './style.scss';

interface Props {
  car: Car;
  className?: string;
}

export const CarItem = ({car, className}: Props) => {
  return (
    <div className={clsx('car', className)}>
      <p className="car-field">
        <span className="car-field-title">Name:</span>
        {car.name}
      </p>
      <p className="car-field">
        <span className="car-field-title">Model:</span>
        {car.model}
      </p>
      <p className="car-field">
        <span className="car-field-title">Year:</span>
        {car.year}
      </p>
      <p className="car-field">
        <span className="car-field-title">Price:</span>
        {car.price}
      </p>
    </div>
  );
};
