import React from 'react';
import { TrendingUp, Ticket, Eye, DollarSign, ChevronRight } from 'lucide-react';

interface CouponsStatsProps {
    stats: {
        totalCoupons: number;
        activeCoupons: number;
        totalViews: number;
        totalRevenue: number;
    };
    loading: boolean;
}

export const CouponsStats: React.FC<CouponsStatsProps> = ({ stats, loading }) => {
    if (loading) {
        return (
            <div className="mb-8">
                <div className="mb-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Programa Sprinters</h1>
                <p className="text-gray-600 mt-1">Último mes</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-emerald-600 font-medium">Ingresos Totales</p>
                            <div className="flex items-center gap-2 mt-2">
                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                                <span className="text-xs text-emerald-600">+12%</span>
                            </div>
                        </div>
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <h3 className="text-3xl font-bold text-gray-900">
                            ${stats.totalRevenue.toFixed(2)}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Comparado con el mes anterior</span>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-emerald-600">Tendencia positiva</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-1 text-emerald-600 text-sm mt-3 hover:text-emerald-700">
                        Ver más <ChevronRight className="w-3 h-3" />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Ticket className="w-6 h-6 text-blue-600" />
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">CUPONES TOTALES</p>
                        <h3 className="text-3xl font-bold text-gray-900">
                            {stats.totalCoupons}
                        </h3>
                        <p className="text-xs text-gray-500">creados</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Ticket className="w-6 h-6 text-green-600" />
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">CUPONES ACTIVOS</p>
                        <h3 className="text-3xl font-bold text-gray-900">
                            {stats.activeCoupons}
                        </h3>
                        <p className="text-xs text-gray-500">disponibles</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Eye className="w-6 h-6 text-orange-600" />
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">VISUALIZACIONES</p>
                        <h3 className="text-3xl font-bold text-gray-900">
                            {stats.totalViews.toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-500">este mes</p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progreso del mes actual</span>
                        <span className="text-sm text-gray-500">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};