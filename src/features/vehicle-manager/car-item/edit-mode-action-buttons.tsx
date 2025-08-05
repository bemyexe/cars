import {Check, X} from 'lucide-react';

import {Button} from '../../../shared/ui';

interface Props {
  saveAction: () => void;
  closeAction: () => void;
}

export const EditModeActionButtons = ({saveAction, closeAction}: Props) => {
  return (
    <>
      <Button type="button" onClick={saveAction}>
        <Check />
      </Button>
      <Button type="button" onClick={closeAction}>
        <X />
      </Button>
    </>
  );
};
