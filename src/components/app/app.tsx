import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchVehicles } from '../../store/slices/vehiclesSlice';
import {
  selectVehiclesCount,
  selectLoading,
  selectError,
  selectSortedVehicles
} from '../../store/selectors';
import VehicleTable from '../vehicle-table/vehicle-table';
import ModalWindow from '../modal-window/modal-window';
import Map from '../map/map';
import { Vehicle } from '../../types';

const VehicleManagementApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showMap, setShowMap] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
  
  const vehicles = useAppSelector(selectSortedVehicles);
  const vehiclesCount = useAppSelector(selectVehiclesCount);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="app">
        <div className="app__container">
          <div className="loading">Загрузка машин...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="app__container">
          <div className="error">Ошибка: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app__container">
        <header className="header">
          <h1 className="header__title">
            Таблица машин для Траектории
          </h1>
          <button
            className="toggle-view-button"
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? 'Показать таблицу' : 'Показать карту'}
          </button>
        </header>

        {!showMap ? (
          <VehicleTable 
            vehiclesCount={vehiclesCount} 
            onVehicleHover={setActiveVehicle}
          />
        ) : (
          <Map
            className="vehicles-map"
            vehicles={vehicles}
            activeVehicle={activeVehicle}
          />
        )}

        <ModalWindow />
      </div>
    </div>
  );
};

export default VehicleManagementApp;