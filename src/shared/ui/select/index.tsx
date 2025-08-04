import type React from 'react';
import {useId} from 'react';
import clsx from 'clsx';

import './styte.scss';

interface SelectOptions {
  label: string;
  value: string;
}

interface Props extends React.ComponentProps<'select'> {
  options: readonly SelectOptions[];
  label?: React.ReactNode;
  className?: string;
}

export const Select = ({options, label, className, ...props}: Props) => {
  const id = useId();
  return (
    <div className={clsx('select-wrapper', className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} {...props}>
        {options.map((option) => {
          return (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
