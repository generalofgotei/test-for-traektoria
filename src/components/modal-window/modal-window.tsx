import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  updateEditingVehicle,
  saveEdit,
  cancelEdit
} from '../../store/slices/vehiclesSlice';
import { selectEditingVehicle } from '../../store/selectors';

const ModalWindow: React.FC = () => {
  const dispatch = useAppDispatch();
  const editingVehicle = useAppSelector(selectEditingVehicle);

  if (!editingVehicle) {
    return null;
  }

  const handleUpdateEditingVehicle = (updates: { name?: string; price?: number }) => {
    dispatch(updateEditingVehicle(updates));
  };

  const handleSaveEdit = () => {
    dispatch(saveEdit());
  };

  const handleCancelEdit = () => {
    dispatch(cancelEdit());
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h3 className="modal__title">Edit Vehicle</h3>
        <div className="form__group">
          <label className="form__label">
            Name
          </label>
          <input
            type="text"
            value={editingVehicle.name}
            onChange={(e) => handleUpdateEditingVehicle({ name: e.target.value })}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label className="form__label">
            Price ($)
          </label>
          <input
            type="number"
            value={editingVehicle.price}
            onChange={(e) => handleUpdateEditingVehicle({ price: parseInt(e.target.value) || 0 })}
            className="form__input"
          />
        </div>
        <div className="modal__actions">
          <button
            onClick={handleSaveEdit}
            className="button button--primary"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            className="button button--secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;