'use client';

import { Unit } from '@/types/unit';
import { apiService } from '@/services/api';
import { useState } from 'react';

interface UnitCardProps {
  unit: Unit;
  onUpdate: () => void;
  onError: (message: string) => void;
}

export default function UnitCard({ unit, onUpdate, onError }: UnitCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: Unit['status']) => {
    setIsUpdating(true);
    try {
      await apiService.updateUnit(unit.id, { status: newStatus });
      onUpdate();
    } catch (error: any) {
      onError(error.data?.status || error.data?.detail || error.message || 'Failed to update unit status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: Unit['status']) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-red-100 text-red-800';
      case 'Cleaning In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance Needed': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: Unit['type']) => {
    return type === 'capsule' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const allStatuses: Unit['status'][] = ['Available', 'Occupied', 'Cleaning In Progress', 'Maintenance Needed'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-base font-medium text-gray-900">{unit.name}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(unit.type)}`}>
            {unit.type}
          </span>
        </div>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(unit.status)}`}>
          {unit.status}
        </span>
      </div>
      
      <div className="mb-3">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(unit.lastUpdated).toLocaleString()}
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Update Status:
        </label>
        <select
          value={unit.status}
          onChange={(e) => handleStatusUpdate(e.target.value as Unit['status'])}
          disabled={isUpdating}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-100"
        >
          {allStatuses.map((status: Unit['status']) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
