'use client';

import { CreateUnitRequest } from '@/types/unit';
import { apiService } from '@/services/api';
import { useState } from 'react';

interface AddUnitFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function AddUnitForm({ onSuccess, onError }: AddUnitFormProps) {
  const [formData, setFormData] = useState<CreateUnitRequest>({
    name: '',
    type: 'capsule',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      onError('Unit name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiService.createUnit(formData);
      setFormData({ name: '', type: 'capsule' });
      onSuccess();
    } catch (error: any) {
      onError(error.data?.detail || error.message || 'Failed to create unit');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-base font-medium text-gray-900 mb-3">Add New Unit</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Unit Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter unit name"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Unit Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'capsule' | 'cabin' })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          >
            <option value="capsule">Capsule</option>
            <option value="cabin">Cabin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-3 text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Unit'}
        </button>
      </form>
    </div>
  );
}
