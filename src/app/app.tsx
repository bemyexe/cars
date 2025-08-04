import {Map} from '../features/map';
import {VehicleManager} from '../features/vehicle-manager';

import './app.scss';

export const App = () => {
  return (
    <div className="app">
      <VehicleManager />
      <Map />
    </div>
  );
};
