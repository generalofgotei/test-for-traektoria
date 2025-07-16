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

export interface Location {
  latitude: number;
  longitude: number;
}

export interface City {
  name: string;
  location: Location & {
    zoom: number;
  };
}

export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  price: number;
  color: string;
  // Новые поля для карты
  location: Location;
  city: City;
}