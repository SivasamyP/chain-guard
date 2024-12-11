import React from 'react';

const TableView = ({ suppliers }) => {
  const getRiskColor = (riskValue) => {
    if (riskValue === 'High') {
      return 'bg-red-500 text-white';
    } else if (riskValue === 'Medium') {
      return 'bg-yellow-500 text-white';
    } else if (riskValue === 'Low') {
      return 'bg-green-500 text-white';
    } else {
      return 'bg-gray-300 text-gray-800'; // Default color for undefined risk values
    }
  };

  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
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
            <td className="px-6 py-4 whitespace-nowrap">{supplier.partName}</td>
            <td className="px-6 py-4 whitespace-normal max-w-xs break-words">
              {supplier.supplierName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{supplier.supplierId}</td>
            <td className="px-6 py-4 whitespace-nowrap max-w-xs break-words">
              {supplier.supplierCountry}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-block px-3 py-1 rounded-full ${getRiskColor(supplier.overAllRisk)}`}>
                {supplier.overAllRisk}
              </span>
            </td>
            <td className="border px-4 py-2">
              <span className={`inline-block px-3 py-1 rounded-full ${getRiskColor(supplier.countryRisk?.overAllInd)}`}>
                {supplier.countryRisk?.overAllInd}
              </span>
            </td>
            <td className="border px-4 py-2">
              <span className={`inline-block px-3 py-1 rounded-full ${getRiskColor(supplier.naturalHazardRisk?.overAllInd)}`}>
                {supplier.naturalHazardRisk?.overAllInd}
              </span>
            </td>
            <td className="border px-4 py-2">
              <span className={`inline-block px-3 py-1 rounded-full ${getRiskColor(supplier.financialRisk?.overAllInd)}`}>
                {supplier.financialRisk?.overAllInd}
              </span>
            </td>
            <td className="border px-4 py-2">
              <span className={`inline-block px-3 py-1 rounded-full ${getRiskColor(supplier.operationalRisk?.overAllInd)}`}>
                {supplier.operationalRisk?.overAllInd}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
