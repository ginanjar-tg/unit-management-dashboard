'use client';

import { useState, useEffect } from 'react';
import { Unit } from '@/types/unit';
import { apiService } from '@/services/api';
import UnitCard from './UnitCard';
import AddUnitForm from './AddUnitForm';
import FilterControls from './FilterControls';

export default function UnitDashboard() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ type?: string; status?: string }>({});
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUnits(filters);
      setUnits(response.results);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch units');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [filters]);

  const handleFilterChange = (newFilters: { type?: string; status?: string }) => {
    setFilters(newFilters);
  };

  const handleUnitUpdate = () => {
    fetchUnits();
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchUnits();
  };

  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  if (loading && units.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading units...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Unit Management Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your capsule and cabin units</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm relative">
            <span className="block">{error}</span>
            <button
              onClick={() => setError(null)}
              className="absolute top-0 bottom-0 right-0 px-3 py-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-3">
            <FilterControls
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full bg-blue-600 text-white py-2 px-3 text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {showAddForm ? 'Cancel' : 'Add New Unit'}
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-6">
            <AddUnitForm
              onSuccess={handleAddSuccess}
              onError={handleError}
            />
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-base font-medium text-gray-900">
            Units ({units.length})
          </h2>
          {Object.keys(filters).length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {filters.type && (
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Type: {filters.type}
                </span>
              )}
              {filters.status && (
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Status: {filters.status}
                </span>
              )}
            </div>
          )}
        </div>

        {units.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-sm text-gray-600">No units found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                onUpdate={handleUnitUpdate}
                onError={handleError}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
