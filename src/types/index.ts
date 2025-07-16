export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

export interface EditVehicle {
  id: number;
  name: string;
  price: number;
}

export type SortField = 'year' | 'price';
export type SortDirection = 'asc' | 'desc';