import clsx from 'clsx';

import {useAppDispatch} from '../../../shared/store';
import {sortCars} from '../../../shared/store/cars/cars.slice';
import {Select} from '../../../shared/ui';

interface Props {
  className?: string;
}

const CARS_FILTERS_OPTIONS = [
  {label: 'default', value: 'default'},
  {
    label: 'Descent Price',
    value: 'descPrice',
  },
  {
    label: 'Ascendant Price',
    value: 'ascPrice',
  },
  {
    label: 'Descent Year',
    value: 'descYear',
  },
  {
    label: 'Ascendant Year',
    value: 'ascYear',
  },
] as const;

export type SortValues = (typeof CARS_FILTERS_OPTIONS)[number]['value'];

export const CarsFilters = ({className}: Props) => {
  const dispatch = useAppDispatch();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortCars(event.target.value as SortValues));
  };

  return (
    <div className={clsx('cars-filters', className)}>
      <Select
        label={'Sort by'}
        options={CARS_FILTERS_OPTIONS}
        onChange={(event) => handleSortChange(event)}
      />
    </div>
  );
};
