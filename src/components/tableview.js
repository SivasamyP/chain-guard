import React from 'react';

const TableView = ({ suppliers }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Part Name</th>
        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Supplier Name</th>
        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Supplier ID</th>
        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Country</th>
        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Longitude</th>
        <th className="px-6 py-3 border-b text-left text-xs font-medium uppercase tracking-wider">Latitude</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      {suppliers.map((supplier, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap">{supplier.partName}</td>
          <td className="px-6 py-4 whitespace-nowrap">{supplier.supplierName}</td>
          <td className="px-6 py-4 whitespace-nowrap">{supplier.supplierId}</td>
          <td className="px-6 py-4 whitespace-nowrap">{supplier.supplierCountry}</td>
          <td className="px-6 py-4 whitespace-nowrap">{supplier.supplierLong}</td>
          <td className="px-6 py-4 whitespace-nowrap">{supplier.supplierLat}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableView;
