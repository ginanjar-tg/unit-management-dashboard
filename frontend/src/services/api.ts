import { Unit, CreateUnitRequest, UpdateUnitRequest, ApiResponse } from '@/types/unit';

const BASE_URL = 'http://localhost:8000';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: response.statusText,
        data: errorData,
      };
    }

    return response.json();
  }

  async getUnits(filters?: { type?: string; status?: string }): Promise<ApiResponse<Unit>> {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    
    const queryString = params.toString();
    const endpoint = `/api/units${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ApiResponse<Unit>>(endpoint);
  }

  async createUnit(unit: CreateUnitRequest): Promise<Unit> {
    return this.request<Unit>('/api/units', {
      method: 'POST',
      body: JSON.stringify(unit),
    });
  }

  async updateUnit(id: number, updates: UpdateUnitRequest): Promise<Unit> {
    const unit = await this.getUnit(id);
    const fullUpdate = { ...unit, ...updates };
    
    return this.request<Unit>(`/api/units/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fullUpdate),
    });
  }

  async getUnit(id: number): Promise<Unit> {
    return this.request<Unit>(`/api/units/${id}`);
  }
}

export const apiService = new ApiService();
