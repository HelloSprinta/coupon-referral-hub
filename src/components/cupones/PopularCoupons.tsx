import React from 'react';
import { Copy, Plus } from 'lucide-react';
import { TOP_CHANNELS, getChannelGradient } from '@/config/channels';

interface PopularCoupon {
    id: string;
    channelId: string;
    channelName: string;
    name: string;
    status: 'Activo' | 'Vencido';
    users: number;
    link: string;
    growth: 'GROWTH' | null;
    performance: string;
}

const mockData: PopularCoupon[] = [
    {
        id: '1',
        channelId: 'instagram',
        channelName: 'Instagram',
        name: 'DESCUENTO ESPECIAL PRIMAVERA',
        status: 'Activo',
        users: 1247,
        link: 'https://mejorofertas.com/descuento-30',
        growth: 'GROWTH',
        performance: '85/100'
    },
    {
        id: '2',
        channelId: 'tiktok',
        channelName: 'TikTok',
        name: 'OFERTAS TRENDING VERANO',
        status: 'Activo',
        users: 956,
        link: 'https://mejorofertas.com/descuento-25',
        growth: 'GROWTH',
        performance: '78/100'
    },
    {
        id: '3',
        channelId: 'youtube',
        channelName: 'YouTube',
        name: 'CUPÓN EXCLUSIVO SUSCRIPTORES',
        status: 'Activo',
        users: 743,
        link: 'https://mejorofertas.com/descuento-40',
        growth: 'GROWTH',
        performance: '92/100'
    }
];

const getChannelInfo = (channelId: string) => {
    const channel = TOP_CHANNELS.find(c => c.id === channelId);
    return {
        icon: channel?.icon,
        gradient: channel?.gradient || 'from-gray-500 to-gray-600'
    };
};

interface PopularCouponsProps {
    onCreateClick?: () => void;
}

export const PopularCoupons: React.FC<PopularCouponsProps> = ({ onCreateClick }) => {
    const copyToClipboard = (link: string) => {
        navigator.clipboard.writeText(link);
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Más Populares</h2>
                <button 
                    onClick={onCreateClick}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    Crear cupón
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockData.map((coupon) => (
                    <div key={coupon.id} className="bg-white rounded-lg shadow-sm border p-4">
                        {/* Header con ícono de canal */}
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getChannelInfo(coupon.channelId).gradient} flex items-center justify-center text-white`}>
                                {React.createElement(getChannelInfo(coupon.channelId).icon || Copy, { size: 20 })}
                            </div>
                            {coupon.growth && (
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
                                    {coupon.growth}
                                </span>
                            )}
                        </div>
                        
                        {/* Canal y estado */}
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                {coupon.channelName}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                                coupon.status === 'Activo' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {coupon.status}
                            </span>
                        </div>

                        {/* Título */}
                        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                            {coupon.name}
                        </h3>

                        {/* Estadísticas */}
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                            <span>{coupon.users.toLocaleString()} usuarios</span>
                            <span className="text-xs font-medium text-emerald-600">
                                {coupon.performance}
                            </span>
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
            
            {/* Ver más button centered below */}
            <div className="flex justify-center mt-6">
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
                    Ver más
                </button>
            </div>
        </div>
    );
};