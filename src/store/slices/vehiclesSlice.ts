import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle, EditVehicle, SortField, SortDirection } from '../../types';

interface VehiclesState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  editingVehicle: EditVehicle | null;
  sortField: SortField;
  sortDirection: SortDirection;
}

const initialState: VehiclesState = {
  vehicles: [],
  loading: false,
  error: null,
  editingVehicle: null,
  sortField: 'year',
  sortDirection: 'asc',
};

// Санки для загрузки данных
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      const data: Vehicle[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    // Сортировка
    setSorting: (state, action: PayloadAction<{ field: SortField; direction?: SortDirection }>) => {
      const { field, direction } = action.payload;
      if (state.sortField === field && !direction) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = field;
        state.sortDirection = direction || 'asc';
      }
    },
    
    // Удаление
    deleteVehicle: (state, action: PayloadAction<number>) => {
      state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload);
    },
    
    // Редактирование
    startEditing: (state, action: PayloadAction<Vehicle>) => {
      const vehicle = action.payload;
      state.editingVehicle = {
        id: vehicle.id,
        name: vehicle.name,
        price: vehicle.price
      };
    },
    
    // Обновление
    updateEditingVehicle: (state, action: PayloadAction<Partial<EditVehicle>>) => {
      if (state.editingVehicle) {
        state.editingVehicle = { ...state.editingVehicle, ...action.payload };
      }
    },
    
    // Сохранение
    saveEdit: (state) => {
      if (state.editingVehicle) {
        const index = state.vehicles.findIndex(v => v.id === state.editingVehicle!.id);
        if (index !== -1) {
          state.vehicles[index] = {
            ...state.vehicles[index],
            name: state.editingVehicle.name,
            price: state.editingVehicle.price
          };
        }
        state.editingVehicle = null;
      }
    },
    
    // Отменить редактирование
    cancelEdit: (state) => {
      state.editingVehicle = null;
    },
    
    // Сброс ошибки
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setSorting,
  deleteVehicle,
  startEditing,
  updateEditingVehicle,
  saveEdit,
  cancelEdit,
  clearError
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;