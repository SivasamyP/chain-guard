import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';  // A sample page
import SupplierDashboard from './supplierchainguard';  // Another sample page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
