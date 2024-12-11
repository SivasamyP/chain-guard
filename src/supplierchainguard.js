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
  const [filters, setFilters] = useState({
    partName: '',
    supplierName: '',
    supplierId: '',
    supplierCountry: '',
    'countryRisk.overAll': '',
    'naturalHazardRisk.overAll': '',
    'financialRisk.overAll': '',
    'operationalRisk.overAll': '',
  });

  useEffect(() => {
    setSuppliers(supplierData.data || []);
    setFilteredSuppliers(supplierData.data || []);
  }, []);

  // Get unique values for filter dropdowns
  const getUniqueValues = (field, subField) => {
    if (subField) {
      return [...new Set(suppliers.map((item) => item[field]?.[subField]))]
        .filter(Boolean)
        .sort();
    }
    return [...new Set(suppliers.map((item) => item[field]))].filter(Boolean).sort();
  };

  // Create uniqueValues object for dropdowns
  const uniqueValues = {
    partName: getUniqueValues('partName'),
    supplierName: getUniqueValues('supplierName'),
    supplierId: getUniqueValues('supplierId'),
    supplierCountry: getUniqueValues('supplierCountry'),
    'countryRisk.overAll': getUniqueValues('countryRisk', 'overAll'),
    'naturalHazardRisk.overAll': getUniqueValues('naturalHazardRisk', 'overAll'),
    'financialRisk.overAll': getUniqueValues('financialRisk', 'overAll'),
    'operationalRisk.overAll': getUniqueValues('operationalRisk', 'overAll'),
  };

  // Sidebar toggle handler
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle filter submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = suppliers.filter((supplier) => {
      const matchesPartName =
        !filters.partName || supplier.partName === filters.partName;
      const matchesSupplierName =
        !filters.supplierName || supplier.supplierName === filters.supplierName;
      const matchesSupplierId =
        !filters.supplierId || supplier.supplierId === filters.supplierId;
      const matchesCountry =
        !filters.supplierCountry || supplier.supplierCountry === filters.supplierCountry;
      const matchesRisk = !filters['countryRisk.overAll'] ||
        supplier.countryRisk?.overAll === filters['countryRisk.overAll'];
      const matchesNaturalHazardRisk = !filters['naturalHazardRisk.overAll'] ||
        supplier.naturalHazardRisk?.overAll === filters['naturalHazardRisk.overAll'];
      const matchesFinancialRisk = !filters['financialRisk.overAll'] ||
        supplier.financialRisk?.overAll === filters['financialRisk.overAll'];
      const matchesOperationalRisk = !filters['operationalRisk.overAll'] ||
        supplier.operationalRisk?.overAll === filters['operationalRisk.overAll'];

      return (
        matchesPartName &&
        matchesSupplierName &&
        matchesSupplierId &&
        matchesCountry &&
        matchesRisk &&
        matchesNaturalHazardRisk &&
        matchesFinancialRisk &&
        matchesOperationalRisk
      );
    });

    setFilteredSuppliers(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      partName: '',
      supplierName: '',
      supplierId: '',
      supplierCountry: '',
      'countryRisk.overAll': '',
      'naturalHazardRisk.overAll': '',
      'financialRisk.overAll': '',
      'operationalRisk.overAll': '',
    });
    setFilteredSuppliers(suppliers);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleSubmit={handleSubmit}
          resetFilters={resetFilters}
          uniqueValues={uniqueValues}
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
