import React from 'react';
import { ExternalLink, Copy } from 'lucide-react';

interface PopularCoupon {
    id: string;
    platform: 'instagram' | 'tiktok' | 'youtube';
    name: string;
    status: 'Activo' | 'Vencido';
    users: number;
    link: string;
    growth: 'GROWTH' | null;
}

const mockData: PopularCoupon[] = [
    {
        id: '1',
        platform: 'instagram',
        name: 'NOMBRE DE CUPONES REFERENCIALES',
        status: 'Activo',
        users: 7,
        link: 'https://mejorofertas.com/descuento-30',
        growth: 'GROWTH'
    },
    {
        id: '2',
        platform: 'tiktok',
        name: 'NOMBRE DE CUPONES REFERENCIALES',
        status: 'Activo',
        users: 7,
        link: 'https://mejorofertas.com/descuento-30',
        growth: 'GROWTH'
    },
    {
        id: '3',
        platform: 'youtube',
        name: 'NOMBRE DE CUPONES REFERENCIALES',
        status: 'Vencido',
        users: 7,
        link: 'https://mejorofertas.com/descuento-30',
        growth: 'GROWTH'
    }
];

const getPlatformIcon = (platform: string) => {
    const icons = {
        instagram: '📷',
        tiktok: '🎵',
        youtube: '▶️'
    };
    return icons[platform as keyof typeof icons] || '📱';
};

const getPlatformColor = (platform: string) => {
    const colors = {
        instagram: 'from-pink-500 to-purple-600',
        tiktok: 'from-gray-800 to-gray-900',
        youtube: 'from-red-500 to-red-600'
    };
    return colors[platform as keyof typeof colors] || 'from-gray-500 to-gray-600';
};

export const PopularCoupons: React.FC = () => {
    const copyToClipboard = (link: string) => {
        navigator.clipboard.writeText(link);
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Más Populares</h2>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    Ver más
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockData.map((coupon) => (
                    <div key={coupon.id} className="bg-white rounded-lg shadow-sm border p-4">
                        {/* Header con ícono de plataforma */}
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getPlatformColor(coupon.platform)} flex items-center justify-center text-white text-xl`}>
                                {getPlatformIcon(coupon.platform)}
                            </div>
                            {coupon.growth && (
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
                                    {coupon.growth}
                                </span>
                            )}
                        </div>

                        {/* Título */}
                        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                            {coupon.name}
                        </h3>

                        {/* Estadísticas */}
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                            <span>{coupon.users} cupones</span>
                        </div>

                        {/* Información adicional */}
                        <div className="text-xs text-gray-500 mb-3">
                            10/100
                        </div>

                        {/* Link */}
                        <div className="flex items-center justify-between bg-gray-50 rounded p-2">
                            <span className="text-xs text-emerald-600 truncate flex-1">
                                {coupon.link}
                            </span>
                            <button
                                onClick={() => copyToClipboard(coupon.link)}
                                className="ml-2 p-1 hover:bg-gray-200 rounded"
                            >
                                <Copy size={12} className="text-gray-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};