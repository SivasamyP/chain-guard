import React from "react";

const RiskDetailsPopup = ({ supplier, closePopup }) => {
  if (!supplier) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Supplier Risk Details</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Country Risk</h3>
            <table className="w-full text-left text-sm">
              <tbody>
                {Object.entries(supplier.countryRisk || {}).map(([key, value]) => (
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
                {Object.entries(supplier.naturalHazardRisk || {}).map(([key, value]) => (
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
                {Object.entries(supplier.financialRisk || {}).map(([key, value]) => (
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
                {Object.entries(supplier.operationalRisk || {}).map(([key, value]) => (
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
  );
};

export default RiskDetailsPopup;
