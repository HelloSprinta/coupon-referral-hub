import React from 'react';
import { TrendingUp, Ticket, Eye, DollarSign, ChevronRight, Users, CreditCard, BarChart3, ArrowRight } from 'lucide-react';

interface CouponsStatsProps {
    stats: {
        totalCoupons: number;
        activeCoupons: number;
        totalViews: number;
        totalRevenue: number;
        freeUsers: number;
        paidUsers: number;
        conversionRate: number;
    };
    loading: boolean;
}

export const CouponsStats: React.FC<CouponsStatsProps> = ({ stats, loading }) => {
    const rankingData = [
        {
            id: 1,
            name: 'Usuario7',
            subtitle: 'Participante activo',
            points: 12,
            position: 1,
            status: 'active'
        },
        {
            id: 2,
            name: 'Usuario4',
            subtitle: 'Participante activo',
            points: 12,
            position: 2,
            status: 'active'
        },
        {
            id: 3,
            name: 'Tú (Sprinters de la semana) !',
            subtitle: 'Participante activo',
            points: 12,
            position: 3,
            status: 'highlighted'
        }
    ];

    const getPositionColor = (position: number) => {
        switch (position) {
            case 1: return 'text-yellow-600';
            case 2: return 'text-gray-600';
            case 3: return 'text-orange-600';
            default: return 'text-gray-600';
        }
    };

    const getPositionBg = (position: number) => {
        switch (position) {
            case 1: return 'bg-yellow-100';
            case 2: return 'bg-gray-100';
            case 3: return 'bg-orange-100';
            default: return 'bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="mb-8">
                <div className="mb-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card 1: Ingresos Totales */}
                <div className="bg-white p-6 rounded-lg shadow-sm h-80">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-emerald-600 font-medium">(Mes actual)</p>
                            <div className="flex items-center gap-2 mt-2">
                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                                <span className="text-xs text-emerald-600">+5%</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <h3 className="text-4xl font-bold text-gray-900">
                            ${stats.totalRevenue.toFixed(2)}
                        </h3>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between text-sm mb-3">
                            <span className="text-gray-600">Comparado con el mes anterior</span>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="text-emerald-600">Tendencia positiva</span>
                            </div>
                        </div>

                        <button className="flex items-center gap-1 text-emerald-600 text-sm hover:text-emerald-700">
                            Ver más <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Card 2: Mapeo de Usuarios */}
                <div className="bg-white p-6 rounded-lg shadow-sm h-80">
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center gap-4">
                                {/* FREE */}
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                                        <Users className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">FREE</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.freeUsers || 4}</h3>
                                    <p className="text-xs text-gray-500">usuarios</p>
                                </div>

                                {/* Arrow */}
                                <ArrowRight className="w-5 h-5 text-gray-400" />

                                {/* PLAN */}
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                                        <CreditCard className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">PLAN</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.paidUsers || 2}</h3>
                                    <p className="text-xs text-gray-500">conversiones</p>
                                </div>

                                {/* Arrow */}
                                <ArrowRight className="w-5 h-5 text-gray-400" />

                                {/* CONVERSIÓN */}
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">CONVERSIÓN</p>
                                    <h3 className="text-2xl font-bold text-emerald-500">{stats.conversionRate || 50}%</h3>
                                    <p className="text-xs text-gray-500">tasa de éxito</p>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-auto">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">(mes actual)</span>
                                <span className="text-sm text-gray-500">75%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Ranking */}
                <div className="bg-white p-6 rounded-lg shadow-sm h-80">
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-semibold text-gray-900">Ranking</h3>
                            </div>
                            <span className="text-xs text-gray-500">Top 3</span>
                        </div>

                        {/* Lista de ranking */}
                        <div className="flex-1 space-y-3">
                            {rankingData.map((user) => (
                                <div
                                    key={user.id}
                                    className={`flex items-center gap-3 p-2 rounded-lg ${user.status === 'highlighted' ? 'bg-emerald-50 border border-emerald-200' : ''
                                        }`}
                                >
                                    {/* Avatar/Position */}
                                    <div className={`w-8 h-8 rounded-full ${getPositionBg(user.position)} flex items-center justify-center`}>
                                        <span className={`text-sm font-bold ${getPositionColor(user.position)}`}>
                                            {user.position}
                                        </span>
                                    </div>

                                    {/* User info */}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${user.status === 'highlighted' ? 'text-emerald-700' : 'text-gray-900'
                                            }`}>
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">{user.subtitle}</p>
                                    </div>

                                    {/* Points */}
                                    <div className="text-right">
                                        <p className={`text-lg font-bold ${user.status === 'highlighted' ? 'text-emerald-600' : 'text-gray-900'
                                            }`}>
                                            {user.points}
                                        </p>
                                        <p className="text-xs text-gray-500">puntos</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Actualizado hace 5 min</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-green-600">En vivo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};