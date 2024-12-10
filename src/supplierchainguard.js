import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ViewToggle from './components/viewtoggle';
import TableView from './components/tableview';
import MapView from './components/mapview';
import supplierData from './mockdata/masterdata.json';

const SupplierDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedLat, setSelectedLat] = useState('');
  const [selectedLng, setSelectedLng] = useState('');

  useEffect(() => {
    setSuppliers(supplierData.data);
    setFilteredSuppliers(supplierData.data); // Initially set all suppliers as filtered
  }, []);

  // Correctly map latitudes and longitudes
  const latitudes = [...new Set(suppliers.map((item) => item.supplierLat))];
  const longitudes = [...new Set(suppliers.map((item) => item.supplierLong))];

  // Sidebar toggle handler
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Handle filter submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter logic based on selected latitude and longitude
    const filtered = suppliers.filter((supplier) => {
      const matchesLat = selectedLat ? supplier.supplierLat === selectedLat : true;
      const matchesLng = selectedLng ? supplier.supplierLong === selectedLng : true;
      return matchesLat && matchesLng;
    });

    setFilteredSuppliers(filtered);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          latitudes={latitudes}
          longitudes={longitudes}
          selectedLat={selectedLat}
          selectedLng={selectedLng}
          setSelectedLat={setSelectedLat}
          setSelectedLng={setSelectedLng}
          handleSubmit={handleSubmit}
        />
        <div className="flex-1 overflow-hidden flex flex-col">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          <div className="flex-1 overflow-auto p-4">
            {viewMode === 'table' ? (
              <TableView suppliers={filteredSuppliers} />
            ) : (
              <MapView suppliers={filteredSuppliers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
