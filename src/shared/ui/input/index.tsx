import React, {type HTMLInputTypeAttribute} from 'react';
import clsx from 'clsx';

import './style.scss';

type InputTypes = HTMLInputTypeAttribute;

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  type: InputTypes;
  className?: string;
}

export const Input = ({label, type, className, ...props}: Props) => {
  const id = React.useId();

  return (
    <div className={clsx('input', className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} {...props} />
    </div>
  );
};
