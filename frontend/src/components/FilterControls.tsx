'use client';

interface FilterControlsProps {
  onFilterChange: (filters: { type?: string; status?: string }) => void;
  currentFilters: { type?: string; status?: string };
}

export default function FilterControls({ onFilterChange, currentFilters }: FilterControlsProps) {
  const handleTypeChange = (type: string) => {
    onFilterChange({
      ...currentFilters,
      type: type === 'all' ? undefined : type,
    });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...currentFilters,
      status: status === 'all' ? undefined : status,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-base font-medium text-gray-900 mb-3">Filter Units</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={currentFilters.type || 'all'}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="capsule">Capsule</option>
            <option value="cabin">Cabin</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={currentFilters.status || 'all'}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Cleaning In Progress">Cleaning In Progress</option>
            <option value="Maintenance Needed">Maintenance Needed</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full bg-gray-600 text-white py-2 px-3 text-sm rounded hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
