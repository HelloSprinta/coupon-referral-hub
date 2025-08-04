import React from 'react';
import { BarChart3 } from 'lucide-react';

export const RankingWidget: React.FC = () => {
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

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 w-80">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-semibold text-gray-900">Ranking</h3>
                </div>
                <span className="text-xs text-gray-500">Top 3</span>
            </div>

            {/* Lista de ranking */}
            <div className="space-y-3">
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
            <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Actualizado hace 5 min</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600">En vivo</span>
                    </div>
                </div>
            </div>
        </div>
    );
};