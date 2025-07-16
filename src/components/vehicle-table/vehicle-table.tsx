import React from 'react';
import { TrashIcon, EditIcon, SortAscIcon, SortDescIcon } from '../icons/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Vehicle } from '../../types';
import { SortField } from '../../types';
import {
  setSorting,
  deleteVehicle,
  startEditing
} from '../../store/slices/vehiclesSlice';
import {
  selectSortedVehicles,
  selectSortField,
  selectSortDirection
} from '../../store/selectors';

interface VehicleTableProps {
  vehiclesCount: number;
  onVehicleHover?: (vehicle: Vehicle | null) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ vehiclesCount, onVehicleHover }) => {
  const dispatch = useAppDispatch();
  
  const sortedVehicles = useAppSelector(selectSortedVehicles);
  const sortField = useAppSelector(selectSortField);
  const sortDirection = useAppSelector(selectSortDirection);

  const handleSort = (field: SortField) => {
    dispatch(setSorting({ field }));
  };

  const handleDeleteVehicle = (id: number) => {
    dispatch(deleteVehicle(id));
  };

  const handleStartEditing = (vehicle: Vehicle) => {
    dispatch(startEditing(vehicle));
  };

  return (
    <div className="table">
      <div className="table__header">
        <h2 className="table__title">Машины ({vehiclesCount})</h2>
      </div>
      
      <div className="table__wrapper">
        <table className="table__content">
          <thead className="table__head">
            <tr>
              <th className="table__head-cell">Name</th>
              <th className="table__head-cell">Model</th>
              <th className="table__head-cell">
                <button
                  onClick={() => handleSort('year')}
                  className="table__sort-button"
                >
                  Year
                  {sortField === 'year' && (
                    sortDirection === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />
                  )}
                </button>
              </th>
              <th className="table__head-cell">
                <button
                  onClick={() => handleSort('price')}
                  className="table__sort-button"
                >
                  Price
                  {sortField === 'price' && (
                    sortDirection === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />
                  )}
                </button>
              </th>
              <th className="table__head-cell">Color</th>
              <th className="table__head-cell table__cell--actions">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {sortedVehicles.map((vehicle) => (
              <tr 
                key={vehicle.id} 
                className="table__row"
                onMouseEnter={() => onVehicleHover?.(vehicle)}
                onMouseLeave={() => onVehicleHover?.(null)}
              >
                <td className="table__cell">
                  <div className="vehicle__name">{vehicle.name}</div>
                </td>
                <td className="table__cell">
                  <div className="vehicle__model">{vehicle.model}</div>
                </td>
                <td className="table__cell">{vehicle.year}</td>
                <td className="table__cell">${vehicle.price.toLocaleString()}</td>
                <td className="table__cell">
                  <div className="vehicle__color">
                    <div 
                      className="vehicle__color-indicator"
                      style={{ backgroundColor: vehicle.color }}
                    ></div>
                    <span className="vehicle__color-text">{vehicle.color}</span>
                  </div>
                </td>
                <td className="table__cell table__cell--actions">
                  <button
                    onClick={() => handleStartEditing(vehicle)}
                    className="action-button action-button--edit"
                  >
                    <EditIcon size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="action-button action-button--delete"
                  >
                    <TrashIcon size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;