import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  filters,
  handleFilterChange,
  handleSubmit,
  resetFilters,
  uniqueValues = {},
}) => {
  return (
    <div className="relative h-full">
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-gray-50 border-r transition-all duration-300 flex flex-col overflow-y-auto h-full`}
      >
        {/* Sidebar content */}
        {isSidebarOpen && (
          <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {Object.entries(uniqueValues || {}).map(([field, options]) => (
              <div key={field} className="mb-4">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {field.replace(/([A-Z])/g, ' $1').replace('.', ' ')}
                </label>
                <select
                  id={field}
                  name={field}
                  value={filters[field] || ''}
                  onChange={(e) => handleFilterChange(field, e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select {field.replace('.', ' ')}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mb-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="w-full bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition-colors"
            >
              Reset
            </button>
          </form>
        )}

        <div className="absolute top-1/2 -translate-y-1/2 right-0">
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 bg-blue-600 text-white rounded-full p-1.5 shadow-lg hover:bg-blue-700 transition-colors"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;