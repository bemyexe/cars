import {type ChangeEvent, useState} from 'react';
import clsx from 'clsx';
import {Check, PencilLine, X} from 'lucide-react';

import {useAppDispatch} from '../../../shared/store';
import {removeCar, updateCar} from '../../../shared/store/cars/cars.slice';
import {Button} from '../../../shared/ui';
import type {Car} from '../api';

import './style.scss';

interface Props {
  car: Car;
  className?: string;
}

const EDITABLE_FIELDS = {
  name: 'name',
  price: 'price',
} as const;

export const CarItem = ({car, className}: Props) => {
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [clickedFieldToEdit, setClickedFieldToEdit] = useState('');
  const [inputName, setInputName] = useState(car.name);
  const [inputPrice, setInputrPrice] = useState(String(car.price));
  const dispatch = useAppDispatch();
  const handleEditButtonClick = (
    carId: Car['id'],
    fieldToEdit: keyof Pick<Car, 'name' | 'price'>
  ) => {
    setIsEditButtonClicked(true);
    setClickedFieldToEdit(fieldToEdit);
    console.log(carId, fieldToEdit);
  };

  const handleChangeInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleChangeInputPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setInputrPrice(event.target.value);
  };

  const handleCloseEditMode = () => {
    setIsEditButtonClicked(false);
    setClickedFieldToEdit('');
  };

  const handleSaveEdit = (
    editedField: keyof Pick<Car, 'name' | 'price'>,
    newValue: string
  ) => {
    const editedCar = {
      ...car,
      [editedField]: newValue,
    };
    console.log(editedCar);
    dispatch(updateCar(editedCar));
    handleCloseEditMode();
  };

  const handleDeleteCar = (carId: Car['id']) => {
    dispatch(removeCar(carId));
  };

  return (
    <div className={clsx('car', className)}>
      <div className="car-field">
        <span className="car-field-title">Name:</span>
        {isEditButtonClicked && clickedFieldToEdit === EDITABLE_FIELDS.name ? (
          <input
            value={inputName}
            onChange={(event) => handleChangeInputName(event)}
          />
        ) : (
          <span>{car.name}</span>
        )}

        {isEditButtonClicked && clickedFieldToEdit === EDITABLE_FIELDS.name ? (
          <div className="car-field-edit-mode">
            <Button
              type="button"
              onClick={() => handleSaveEdit(EDITABLE_FIELDS.name, inputName)}>
              <Check />
            </Button>

            <Button type="button" onClick={handleCloseEditMode}>
              <X />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => handleEditButtonClick(car.id, EDITABLE_FIELDS.name)}>
            <PencilLine />
          </Button>
        )}
      </div>
      <div className="car-field">
        <span className="car-field-title">Model:</span>
        <span>{car.model}</span>
      </div>
      <div className="car-field">
        <span className="car-field-title">Year:</span>
        <span>{car.year}</span>
      </div>
      <div className="car-field">
        <span className="car-field-title">Price:</span>

        {isEditButtonClicked && clickedFieldToEdit === EDITABLE_FIELDS.price ? (
          <input
            type="number"
            value={inputPrice}
            onChange={(event) => handleChangeInputPrice(event)}
          />
        ) : (
          <span>{car.price}</span>
        )}

        {isEditButtonClicked && clickedFieldToEdit === EDITABLE_FIELDS.price ? (
          <div className="car-field-edit-mode">
            <Button
              type="button"
              onClick={() => handleSaveEdit(EDITABLE_FIELDS.price, inputPrice)}>
              <Check />
            </Button>
            <Button type="button" onClick={handleCloseEditMode}>
              <X />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={() =>
              handleEditButtonClick(car.id, EDITABLE_FIELDS.price)
            }>
            <PencilLine />
          </Button>
        )}
      </div>
      <Button type="button" onClick={() => handleDeleteCar(car.id)}>
        Delete car
      </Button>
    </div>
  );
};
