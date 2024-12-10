import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => (
  <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Menu className="h-6 w-6 text-white" />
      <h1 className="text-2xl font-bold text-white text-center">Supplier Dashboard</h1>
      <div className="w-6" /> {/* Placeholder for symmetry */}
    </div>
  </header>
);

export default Header;
