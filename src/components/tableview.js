import React, { useState } from "react";

const TableView = ({ suppliers }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const getRiskColor = (riskValue) => {
    if (riskValue === 'High') {
      return 'bg-red-500 text-black';
    } else if (riskValue === 'Medium') {
      return 'bg-yellow-500 text-black';
    } else if (riskValue === 'Low') {
      return 'bg-green-500 text-black';
    } else {
      return 'bg-gray-300 text-gray-800'; 
    }
  };

  const openPopup = (supplier) => {
    setSelectedSupplier(supplier);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedSupplier(null);
    setIsPopupOpen(false);
  };

  return (
    <>
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
              <td
                className="px-6 py-4 text-blue-600 cursor-pointer"
                onClick={() => openPopup(supplier)}
              >
                {supplier.supplierName}
              </td>
              <td
                className="px-6 py-4 text-blue-600 cursor-pointer"
                onClick={() => openPopup(supplier)}
              >
                {supplier.supplierId}
              </td>
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

      {isPopupOpen && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Supplier Risk Details</h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Country Risk</h3>
                <table className="w-full text-left text-sm">
                  <tbody>
                    {Object.entries(selectedSupplier.countryRisk || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td className="pr-4 font-medium capitalize">{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Natural Hazard Risk</h3>
                <table className="w-full text-left text-sm">
                  <tbody>
                    {Object.entries(selectedSupplier.naturalHazardRisk || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td className="pr-4 font-medium capitalize">{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Financial Risk</h3>
                <table className="w-full text-left text-sm">
                  <tbody>
                    {Object.entries(selectedSupplier.financialRisk || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td className="pr-4 font-medium capitalize">{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Operational Risk</h3>
                <table className="w-full text-left text-sm">
                  <tbody>
                    {Object.entries(selectedSupplier.operationalRisk || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td className="pr-4 font-medium capitalize">{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={closePopup}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableView;
