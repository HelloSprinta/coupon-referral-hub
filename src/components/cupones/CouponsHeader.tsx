import React from 'react';
import { Plus } from 'lucide-react';

interface CouponsHeaderProps {
  onCreateClick: () => void;
}

export const CouponsHeader: React.FC<CouponsHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Programa Sprinters</h1>
        <p className="text-gray-600 mt-1">Gestiona tus cupones de descuento</p>
      </div>
      <button
        onClick={onCreateClick}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <Plus size={20} />
        Crear cupón
      </button>
    </div>
  );
};
