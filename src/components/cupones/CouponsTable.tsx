import React from 'react';
import { MoreHorizontal, RefreshCw } from 'lucide-react';

interface Coupon {
    id: string;
    code: string;
    start_date?: string;
    end_date?: string;
    discount_percentage?: number;
    description?: string;
    created_at: string;
    organization?: {
        name: string;
    };
}

interface CouponsTableProps {
    coupons: Coupon[];
    loading: boolean;
    onRefresh: () => void;
}

export const CouponsTable: React.FC<CouponsTableProps> = ({
    coupons,
    loading,
    onRefresh
}) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Indefinido';
        return new Date(dateString).toLocaleDateString('es-ES');
    };

    const getStatus = (endDate?: string) => {
        if (!endDate) return 'Activo';
        const now = new Date();
        const end = new Date(endDate);
        return end > now ? 'Activo' : 'Expirado';
    };

    const getStatusColor = (status: string) => {
        return status === 'Activo'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    const getChannelIcon = (index: number) => {
        const channels = ['📧', '📱', '📋', '💬', '🎯', '🔗', '📊', '⚙️'];
        return channels[index % channels.length];
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex space-x-4 py-3">
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Análisis completo de cupones y conversiones por canal digital
                    </h3>
                    <button
                        onClick={onRefresh}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-emerald-600 text-white">
                                <th className="text-left py-3 px-4 font-medium">Fecha de Creación</th>
                                <th className="text-left py-3 px-4 font-medium">Nombre Cupón</th>
                                <th className="text-left py-3 px-4 font-medium">Fecha Inicio</th>
                                <th className="text-left py-3 px-4 font-medium">Fecha Expiración</th>
                                <th className="text-left py-3 px-4 font-medium">Canal</th>
                                <th className="text-left py-3 px-4 font-medium"># Plan Free</th>
                                <th className="text-left py-3 px-4 font-medium"># Plan Pago</th>
                                <th className="text-left py-3 px-4 font-medium">$ Ingreso Acumulado</th>
                                <th className="text-left py-3 px-4 font-medium">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon, index) => {
                                const status = getStatus(coupon.end_date);
                                return (
                                    <tr key={coupon.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm">
                                            {formatDate(coupon.created_at)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="font-medium text-emerald-600">
                                                {coupon.code}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            {formatDate(coupon.start_date)}
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            {formatDate(coupon.end_date)}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className="text-2xl">
                                                {getChannelIcon(index)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm">
                                            {Math.floor(Math.random() * 100)}
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm">
                                            {Math.floor(Math.random() * 50)}
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-emerald-600">
                                            ${(Math.random() * 10000).toFixed(0)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {coupons.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No se encontraron cupones</p>
                    </div>
                )}

                {/* Footer stats */}
                <div className="mt-6 pt-4 border-t">
                    <div className="grid grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">10</div>
                            <div className="text-sm text-gray-600">Total Usuarios</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">5</div>
                            <div className="text-sm text-gray-600">Plan Free</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">3</div>
                            <div className="text-sm text-gray-600">Plan Pago</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">45</div>
                            <div className="text-sm text-gray-600">Ingresando Totales</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};