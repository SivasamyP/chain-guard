import React, { useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import RiskDetailsPopuppup from './riskdetailspoup';

const MapView = ({suppliers}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = (supplier) => {
    setSelectedSupplier(supplier);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedSupplier(null);
    setIsPopupOpen(false);
  };
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Map 
        height="100%" 
        center={[41.8780, -87.6298]} // Default center (Chicago, USA)
        zoom={2}
        defaultWidth="70%"
      >
        {suppliers.map((supplier, index) => (
          <Marker
            key={index}
            anchor={[supplier.supplierLat, supplier.supplierLong]}
            payload={supplier}
            onClick={(e) => setSelectedSupplier(e.payload)}
            color={supplier.overAllRisk === "High" ? "red" : "green"}
          />
        ))}

        {selectedSupplier && (
          <Overlay
            anchor={[selectedSupplier.supplierLat, selectedSupplier.supplierLong]}
            offset={[0, -40]} // Optional: Adjust the position of the overlay
          >
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
              <h4>{selectedSupplier.supplierName}</h4>
              <p><strong>Part:</strong> {selectedSupplier.partName}</p>
              <p><strong>Risk:</strong> {selectedSupplier.overAllRisk}</p>
              <button onClick={() => openPopup(selectedSupplier)}>Details</button>
            </div>
          </Overlay>
        )}
      </Map>

      {isPopupOpen && selectedSupplier && (
        <RiskDetailsPopuppup supplier={selectedSupplier} closePopup={closePopup} />
      )}

      {/* {selectedSupplier && (
        <div style={{ width: '30%', padding: '20px' }}>
          <div>
            <h4>{selectedSupplier.supplierName}</h4>
            <p><strong>Part:</strong> {selectedSupplier.partName}</p>
            <p><strong>Overall Risk:</strong> {selectedSupplier.overAllRisk}</p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MapView;