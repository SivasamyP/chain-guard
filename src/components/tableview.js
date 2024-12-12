import React, { useState, useEffect } from "react";
import RiskDetailsPopup from './riskdetailspoup';


const TableView = ({ suppliers }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  useEffect(() => {
    const savedSupplierId = localStorage.getItem('selectedSupplierId');
    if (savedSupplierId) {
      const supplier = suppliers.find(s => s.supplierId === savedSupplierId);
      if (supplier) {
        setSelectedSupplier(supplier);
        setIsPopupOpen(true);
      }
    }
  }, [suppliers]);

  const getRiskColor = (riskValue) => {
    switch (riskValue) {
      case 'High':
        return 'bg-red-500 text-black';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-black';
      default:
        return 'bg-gray-300 text-gray-800';
    }

  };

  const openPopup = (supplier) => {
    setSelectedSupplier(supplier);
    setIsPopupOpen(true);
    // Save supplier ID to localStorage
    localStorage.setItem('selectedSupplierId', supplier.supplierId);
  };

  const closePopup = () => {
    setSelectedSupplier(null);
    setIsPopupOpen(false);
    // Remove supplier ID from localStorage
    localStorage.removeItem('selectedSupplierId');
  };

  // Handle beforeunload to prevent stale data
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isPopupOpen) {
        localStorage.removeItem('selectedSupplierId');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPopupOpen]);

  return (
    <>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Part Number</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Part Name</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Supplier Name</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Supplier ID</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Country</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">OverAll Risk</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Country Risk</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Natural Hazard Risk</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Financial Risk</th>
            <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Operational Risk</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {suppliers.map((supplier, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 whitespace-nowrap ">{supplier.partNumber}</td>

              <td className="border px-4 py-2 whitespace-nowrap max-w-xs break-words">{supplier.partName}</td>
              <td
                className="border px-4 py-2 text-blue-600 cursor-pointer"
                onClick={() => openPopup(supplier)}
              >
                {supplier.supplierName}
              </td>
              <td
                className="border px-4 py-2 text-blue-600 cursor-pointer"
                onClick={() => openPopup(supplier)}
              >
                {supplier.supplierId}
              </td>
              <td className="border px-4 py-2 whitespace-nowrap max-w-xs break-words">
                {supplier.supplierCountry}
              </td><td className="border px-4 py-2 whitespace-nowrap">
                <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.overAllRisk)}`}>
                  {supplier.overAllRisk}
                </span>
              </td>
              <td className="border px-4 py-2">
                <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.countryRisk?.overAllInd)}`}>
                  {supplier.countryRisk?.overAllInd}
                </span>
              </td>
              <td className="border px-4 py-2">
                <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.naturalHazardRisk?.overAllInd)}`}>
                  {supplier.naturalHazardRisk?.overAllInd}
                </span>
              </td>
              <td className="border px-4 py-2">
                <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.financialRisk?.overAllInd)}`}>
                  {supplier.financialRisk?.overAllInd}
                </span>
              </td>
              <td className="border px-4 py-2">
                <span className={`inline-flex items-center justify-center w-24 h-8 text-center rounded-full ${getRiskColor(supplier.operationalRisk?.overAllInd)}`}>
                  {supplier.operationalRisk?.overAllInd}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && selectedSupplier && (
        <RiskDetailsPopup supplier={selectedSupplier} closePopup={closePopup} />
      )}

    </>
  );
};

export default TableView;
