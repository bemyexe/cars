import React from 'react';
import clsx from 'clsx';
import {PencilLine} from 'lucide-react';

import {useAppDispatch} from '../../../shared/store';
import {removeCar, updateCar} from '../../../shared/store/cars/cars.slice';
import {Button, Input} from '../../../shared/ui';
import type {Car} from '../api';

import {EditModeActionButtons} from './edit-mode-action-buttons';

import './style.scss';

type EditableFields = keyof Pick<Car, 'name' | 'price'>;

interface Props {
  car: Car;
  className?: string;
}

const EDITABLE_FIELDS = {
  name: 'name',
  price: 'price',
} as const;

export const CarItem = ({car, className}: Props) => {
  const [isEditModeActivated, setIsEditModeActivated] = React.useState(false);
  const [selectedFieldToEdit, setSelectedFieldToEdit] = React.useState<
    EditableFields | ''
  >('');

  let initialValues: Pick<Car, 'name' | 'price'> = {
    name: car.name,
    price: car.price,
  };

  const [inputValues, setInputValues] = React.useState<
    Pick<Car, 'name' | 'price'>
  >({
    name: car.name,
    price: car.price,
  });

  const dispatch = useAppDispatch();

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.type === 'number'
          ? Number(event.target.value)
          : event.target.value,
    }));
  };
  const handleActiveEditMode = (fieldToEdit: EditableFields) => {
    setIsEditModeActivated(true);
    setSelectedFieldToEdit(fieldToEdit);
  };

  const handleCloseEditMode = () => {
    setInputValues((prev) => ({...prev, ...initialValues}));
    setIsEditModeActivated(false);
    setSelectedFieldToEdit('');
  };

  const handleSaveEditedField = (
    editedField: EditableFields,
    newValue: Car['name'] | Car['price']
  ) => {
    const editedCar = {
      ...car,
      [editedField]: newValue,
    };
    initialValues = {...inputValues};
    dispatch(updateCar(editedCar));
    handleCloseEditMode();
  };

  const handleDeleteCar = (carId: Car['id']) => {
    dispatch(removeCar(carId));
  };

  return (
    <div className={clsx('car', className)}>
      <div className="car-field">
        <div className="car-field-content">
          <span className="car-field-content-title">Name:</span>
          {isEditModeActivated &&
          selectedFieldToEdit === EDITABLE_FIELDS.name ? (
            <Input
              autoFocus
              type="text"
              name="name"
              value={inputValues.name}
              onChange={(event) => handleChangeInputValue(event)}
            />
          ) : (
            <span>{car.name}</span>
          )}
        </div>

        {isEditModeActivated && selectedFieldToEdit === EDITABLE_FIELDS.name ? (
          <div className="car-field-edit-mode">
            <EditModeActionButtons
              saveAction={() =>
                handleSaveEditedField(EDITABLE_FIELDS.name, inputValues.name)
              }
              closeAction={handleCloseEditMode}
            />
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => handleActiveEditMode(EDITABLE_FIELDS.name)}>
            <PencilLine />
          </Button>
        )}
      </div>
      <div className="car-field">
        <div className="car-field-content">
          <span className="car-field-content-title">Model:</span>
          <span>{car.model}</span>
        </div>
      </div>
      <div className="car-field">
        <div className="car-field-content">
          <span className="car-field-content-title">Year:</span>
          <span>{car.year}</span>
        </div>
      </div>
      <div className="car-field">
        <div className="car-field-content">
          <span className="car-field-content-title">Price:</span>
          {isEditModeActivated &&
          selectedFieldToEdit === EDITABLE_FIELDS.price ? (
            <Input
              autoFocus
              name="price"
              type="number"
              value={inputValues.price}
              onChange={(event) => handleChangeInputValue(event)}
            />
          ) : (
            <span>{car.price}</span>
          )}
        </div>

        {isEditModeActivated &&
        selectedFieldToEdit === EDITABLE_FIELDS.price ? (
          <div className="car-field-edit-mode">
            <EditModeActionButtons
              saveAction={() =>
                handleSaveEditedField(EDITABLE_FIELDS.price, inputValues.price)
              }
              closeAction={handleCloseEditMode}
            />
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => handleActiveEditMode(EDITABLE_FIELDS.price)}>
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
