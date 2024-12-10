import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  latitudes,
  longitudes,
  selectedLat,
  selectedLng,
  setSelectedLat,
  setSelectedLng,
  handleSubmit,
}) => {
  return (
    <div>
      <div
        className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-50 border-r transition-all duration-300 flex flex-col`}
      >
        <form onSubmit={handleSubmit} className="p-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Latitude dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <select
              value={selectedLat}
              onChange={(e) => setSelectedLat(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              {latitudes.map((lat) => (
                <option key={lat} value={lat}>
                  {lat}
                </option>
              ))}
            </select>
          </div>

          {/* Longitude dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <select
              value={selectedLng}
              onChange={(e) => setSelectedLng(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              {longitudes.map((lng) => (
                <option key={lng} value={lng}>
                  {lng}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="relative -left-3 top-4 z-10 bg-white border rounded-full p-1 shadow-sm"
      >
        {isSidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
