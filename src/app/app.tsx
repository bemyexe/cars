import React from 'react';

import './app.scss';

const LazyMap = React.lazy(() => import('../features/map'));
const LazyVehicleManager = React.lazy(
  () => import('../features/vehicle-manager')
);

export const App = () => {
  return (
    <div className="app">
      <React.Suspense fallback={<div>VehicleManager LOAD!!!</div>}>
        <LazyVehicleManager />
      </React.Suspense>

      <React.Suspense fallback={<div>MAP LOAD!!!</div>}>
        <LazyMap />
      </React.Suspense>
    </div>
  );
};
