import {Provider as RTKProvider} from 'react-redux';

import {store} from '../store';

interface Props {
  children: React.ReactNode;
}

export const AppProviders = ({children}: Props) => {
  return <RTKProvider store={store}>{children}</RTKProvider>;
};
