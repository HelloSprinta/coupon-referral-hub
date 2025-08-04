import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

interface CouponsFiltersProps {
    filters: any;
    onFiltersChange: (filters: any) => void;
    totalResults: number;
}

export const CouponsFilters: React.FC<CouponsFiltersProps> = ({
    filters,
    onFiltersChange,
    totalResults
}) => {
    const updateFilter = (key: string, value: any) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filtros Avanzados</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Búsqueda */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Buscar cupón
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="NOMBRE DEL CUPÓN"
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                </div>

                {/* Canal */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Canal
                    </label>
                    <select
                        value={filters.canal}
                        onChange={(e) => updateFilter('canal', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="todos">Todos</option>
                        <option value="instagram">Instagram</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                    </select>
                </div>

                {/* Estado */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                    </label>
                    <select
                        value={filters.estado}
                        onChange={(e) => updateFilter('estado', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="todos">Todos</option>
                        <option value="activo">Activo</option>
                        <option value="expirado">Expirado</option>
                    </select>
                </div>

                {/* Tipo de Plan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Plan
                    </label>
                    <select
                        value={filters.tipoPlan}
                        onChange={(e) => updateFilter('tipoPlan', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="todos">Todos</option>
                        <option value="free">Free</option>
                        <option value="pro">Pro</option>
                        <option value="enterprise">Enterprise</option>
                    </select>
                </div>
            </div>

            {/* Filtros de fecha */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rango de Ingresos
                    </label>
                    <select
                        value={filters.rangoIngresos}
                        onChange={(e) => updateFilter('rangoIngresos', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="todos">Todos</option>
                        <option value="0-1000">$0 - $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="5000+">$5,000+</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha Inicio
                    </label>
                    <input
                        type="date"
                        value={filters.rangoFechas.start}
                        onChange={(e) => updateFilter('rangoFechas', { ...filters.rangoFechas, start: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha Fin
                    </label>
                    <input
                        type="date"
                        value={filters.rangoFechas.end}
                        onChange={(e) => updateFilter('rangoFechas', { ...filters.rangoFechas, end: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
            </div>

            {/* Indicadores de filtros activos */}
            <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        ● {totalResults} Activos ● 11 Inactivos ● {totalResults + 11} Total mostrados
                    </span>
                </div>
                <div className="text-sm text-gray-500">
                    de {totalResults} cupones totales
                </div>
            </div>
        </div>
    );
};