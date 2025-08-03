import React from 'react';
import clsx from 'clsx';

import './style.scss';

type ButtonTypes = 'button' | 'submit' | 'reset';

interface Props extends React.ComponentProps<'button'> {
  type: ButtonTypes;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({type, className, children, ...props}: Props) => {
  return (
    <button className={clsx('button', className)} type={type} {...props}>
      {children}
    </button>
  );
};
