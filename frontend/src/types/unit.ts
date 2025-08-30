export interface Unit {
  id: number;
  name: string;
  type: 'capsule' | 'cabin';
  status: 'Available' | 'Occupied' | 'Cleaning In Progress' | 'Maintenance Needed';
  lastUpdated: string;
}

export interface CreateUnitRequest {
  name: string;
  type: 'capsule' | 'cabin';
}

export interface UpdateUnitRequest {
  name?: string;
  type?: 'capsule' | 'cabin';
  status?: 'Available' | 'Occupied' | 'Cleaning In Progress' | 'Maintenance Needed';
}

export interface ApiResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface ApiError {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: any;
}
