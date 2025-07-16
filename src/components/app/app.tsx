import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchVehicles } from '../../store/slices/vehiclesSlice';
import {
  selectVehiclesCount,
  selectLoading,
  selectError
} from '../../store/selectors';
import VehicleTable from '../vehicle-table/vehicle-table';
import ModalWindow from '../modal-window/modal-window';

const VehicleManagementApp: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Селекторы для получения данных из Redux store
  const vehiclesCount = useAppSelector(selectVehiclesCount);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  // Рендер состояния загрузки
  if (loading) {
    return (
      <div className="app">
        <div className="app__container">
          <div className="loading">Загрузка машин...</div>
        </div>
      </div>
    );
  }

  // Рендер состояния ошибки
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
        </header>

        <VehicleTable vehiclesCount={vehiclesCount} />
        <ModalWindow />
      </div>
    </div>
  );
};

export default VehicleManagementApp;