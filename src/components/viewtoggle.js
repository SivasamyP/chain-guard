import React from 'react';
import { Table, MapPin, Cpu } from 'lucide-react'; // Cpu for GenAI icon

const ViewToggle = ({ viewMode, setViewMode }) => (
  <div className="bg-gray-100 p-4 flex justify-center space-x-4">
    <button
      onClick={() => setViewMode('table')}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        viewMode === 'table'
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Table className="h-4 w-4" />
      Tabular View
    </button>
    <button
      onClick={() => setViewMode('map')}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        viewMode === 'map'
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      <MapPin className="h-4 w-4" />
      Map View
    </button>
    <button
      onClick={() => setViewMode('genai')}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        viewMode === 'genai'
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Cpu className="h-4 w-4" />
      GenAI Powered Solution
    </button>
  </div>
);

export default ViewToggle;
