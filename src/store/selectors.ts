import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

// Базовые селекторы
export const selectVehicles = (state: RootState) => state.vehicles.vehicles;
export const selectLoading = (state: RootState) => state.vehicles.loading;
export const selectError = (state: RootState) => state.vehicles.error;
export const selectEditingVehicle = (state: RootState) => state.vehicles.editingVehicle;
export const selectSortField = (state: RootState) => state.vehicles.sortField;
export const selectSortDirection = (state: RootState) => state.vehicles.sortDirection;

// селектор для отсортированных машин
export const selectSortedVehicles = createSelector(
  [selectVehicles, selectSortField, selectSortDirection],
  (vehicles, sortField, sortDirection) => {
    return [...vehicles].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }
);

// Селектор для количества машин
export const selectVehiclesCount = createSelector(
  [selectVehicles],
  (vehicles) => vehicles.length
);