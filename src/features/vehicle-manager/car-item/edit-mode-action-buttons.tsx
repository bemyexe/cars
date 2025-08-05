import {Check, X} from 'lucide-react';

import {Button} from '../../../shared/ui';
import type {Car} from '../api';

import type {EditableFields} from '.';

interface Props {
  saveAction: (
    editedField: EditableFields,
    newValue: Car['name'] | Car['price']
  ) => void;
  closeAction: () => void;
}

export const EditModeActionButtons = ({saveAction, closeAction}: Props) => {
  return (
    <>
      <Button type="button" onClick={() => saveAction}>
        <Check />
      </Button>
      <Button type="button" onClick={closeAction}>
        <X />
      </Button>
    </>
  );
};
